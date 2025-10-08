<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import '../assets/css/thumbnail-bar.css'

import { computed, onMounted, ref, watchEffect } from 'vue'

import { stripSpecialChars } from '@/composables/useDateURI'
import { getThumbImageURI } from "@/composables/useThumbnailURI"

const props = defineProps({
  currentImage: Object,
  totalThumbnails: Number
})

const isLoading = ref(true)
const thumbnails = ref([])
const triggerResize = ref()

const thumbnailsDisplayed = computed(() => {
  const dummy = triggerResize.value

  const thumbnailGap = 16
  const thumbnailWidth = 200
  const windowWidth = window.innerWidth
  const maximumThumbnails = Math.floor(windowWidth / (thumbnailGap * 2 + thumbnailWidth))
  const thumbnailsNumber = maximumThumbnails % 2 === 0 ? maximumThumbnails - 1 : maximumThumbnails

  if (thumbnailsNumber < thumbnails.value.length) {
    let thumbnailsEndIndex = 0
    let thumbnailsStartIndex = 0

    const activeThumbnailIndex = thumbnails.value.findIndex(obj => obj.datetime === props.currentImage.datetime)
    const centerThumbnailIndex = Math.floor(thumbnails.value.length / 2)

    if (activeThumbnailIndex === centerThumbnailIndex) {
      const thumbnailsOffset = (thumbnails.value.length - thumbnailsNumber) / 2
      thumbnailsEndIndex = thumbnails.value.length - thumbnailsOffset
      thumbnailsStartIndex = thumbnailsOffset
    } else {
      if (activeThumbnailIndex < centerThumbnailIndex) {
        thumbnailsEndIndex = thumbnailsNumber
        thumbnailsStartIndex = 0
      } else {
        // TODO: Fix the API to return all the thumbnails requested when sarting from the first post
        thumbnailsEndIndex = thumbnails.value.length - 1
        thumbnailsStartIndex = thumbnails.value.length - thumbnailsNumber
      }
    }
    return thumbnails.value.slice(thumbnailsStartIndex, thumbnailsEndIndex)
  } else {
    return [...thumbnails.value]
  }
})

const thumbnailBarResizeObserver = new ResizeObserver(entries => {
  const [ entry ] = entries
  triggerResize.value = entry
})

onMounted (() => {
  setTimeout(() => {
    thumbnailBarResizeObserver.observe(document.getElementsByClassName('thumbnails-wrapper')[0])
  }, 200)
})

watchEffect (async () => {
  if (props.currentImage.datetime) {
    const datetime = encodeURI(stripSpecialChars(props.currentImage.datetime))
    const responseAfter = await fetch(`${apiBaseUrl}/posts/after/${datetime}?limit=${props.totalThumbnails}`)
    const { data : thumbnailsAfter } = await responseAfter.json()

    const thumbnailsHalf = Math.floor(props.totalThumbnails / 2)
    if (thumbnailsAfter.length > thumbnailsHalf) {
      const count = thumbnailsAfter.length - thumbnailsHalf
      thumbnailsAfter.splice(0, count)
    }

    const thumbnailsBeforeLimit = props.totalThumbnails - thumbnailsAfter.length - 1
    const responseBefore = await fetch(`${apiBaseUrl}/posts/before/${datetime}?limit=${thumbnailsBeforeLimit}`)
    const { data: thumbnailsBefore } = await responseBefore.json()

    const thumbnailsTemp = []
    thumbnailsTemp.push(...thumbnailsAfter)
    thumbnailsTemp.push(props.currentImage)
    thumbnailsTemp.push(...thumbnailsBefore)

    thumbnails.value = thumbnailsTemp
  }
})

</script>
<template>
  <div class="thumbnail-bar">
    <p>
      More Photographs
    </p>
    <div class="thumbnails-wrapper">
      <div class="thumbnail" v-for="thumbnail in thumbnailsDisplayed">
        <router-link :to="`/post/${thumbnail.slug}`">
          <img
            :alt="`${thumbnail.headline} thumbnail`"
            :src="getThumbImageURI(thumbnail.image)"
            :class="props.currentImage.datetime === thumbnail.datetime ? 'activeThumb' : 'inactiveThumb'"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>
