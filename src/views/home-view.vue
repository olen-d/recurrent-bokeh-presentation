<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const imagePath = import.meta.env.VITE_IMAGE_PATH

import { computed, onMounted, ref } from 'vue'

import { dateObjFromMySQL } from '@/composables/useDateURI'
import { getThumbImageURI } from "@/composables/useThumbnailURI"

import '../assets/css/home-view.css'

import CardGeneric from '@/components/card-generic.vue'
import ListLinks from '@/components/list-links.vue'
import PostPanel from '@/components/post-panel.vue'
import ThumbnailBar from '@/components/thumbnail-bar.vue'

const post = ref({})
const linksLeastDiscussed = ref({})
const linksMostDiscussed = ref({})
// const slugPrev = ref('')
const isLoading = ref(true)
const isLoadingLeastDiscussed = ref (true)
const isLoadingMostDiscussed = ref(true)
const isLoadingPostsFavorite = ref(true)
const postsFavoriteAll = ref([])
const oddAlternateWidthZero = ref()

const thumbDateTimeFormatted = dateTimeMySQL => {
  const thumbDateObj = dateObjFromMySQL(dateTimeMySQL)
  const thumbDateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const thumbDateFormatter = new Intl.DateTimeFormat('en-US', thumbDateFormatOptions)
  const thumbDateFormatted = thumbDateFormatter.format(thumbDateObj)

  return thumbDateFormatted
}

const oddAlternateContentObserver = new ResizeObserver(entries => {
  const [{ contentBoxSize: [ {inlineSize }] }] = entries
  oddAlternateWidthZero.value = inlineSize;
})

onMounted(async () => {
  const response = await fetch(`${apiBaseUrl}/post`)
  const result = await response.json()

  const { status } = result

  if (status === 'success') {
    const { data } = result
    post.value = data

    // const { datetime } = data
    // const datetimeEncoded = encodeURIComponent(datetime)

    // const responsePrevious = await fetch(`${apiBaseUrl}/posts/previous/${datetimeEncoded}`)
    // const resultPrevious = await responsePrevious.json()
    // const { data: [{ slug: slugP }], } = resultPrevious

    // slugPrev.value = slugP
    isLoading.value = false
  }

  const responseMostDiscussed = await fetch(`${apiBaseUrl}/posts/discussed/before?count=most&limit=6`)
  const resultMostDiscussed = await responseMostDiscussed.json()

  const { status: statusMostDiscussed } = resultMostDiscussed

  if (statusMostDiscussed === 'success') {
    const { data: dataMostDiscussed } = resultMostDiscussed
    linksMostDiscussed.value = dataMostDiscussed
    isLoadingMostDiscussed.value = false
  }

  const responseLeastDiscussed = await fetch(`${apiBaseUrl}/posts/discussed/before?count=least&limit=6`)
  const resultLeastDiscussed = await responseLeastDiscussed.json()

  const { status: statusLeastDiscussed } = resultLeastDiscussed

  if (statusLeastDiscussed === 'success') {
    const { data: dataLeastDiscussed } = resultLeastDiscussed
    linksLeastDiscussed.value = dataLeastDiscussed
    isLoadingLeastDiscussed.value = false
  }

  const responsePostsFavorite = await fetch(`${apiBaseUrl}/posts/favorite?limit=14`)
  const resultPostsFavorite = await responsePostsFavorite.json()

  const { status: statusPostsFavorite } = resultPostsFavorite

  if (statusPostsFavorite === 'success') {
    const { data: dataPostsFavorite } = resultPostsFavorite
    postsFavoriteAll.value = dataPostsFavorite
    isLoadingPostsFavorite.value = false
  }

  oddAlternateContentObserver.observe(document.getElementsByClassName('odd-alternate-content')[0])
})

const postsFavoriteSliced = computed(() => {
  const rows = 2
  const totalWidth = oddAlternateWidthZero.value
  const maxThumbnails = Math.floor(oddAlternateWidthZero.value / 200)
  const spaceBetween = (maxThumbnails - 1) * 32
  const spaceNeeded = maxThumbnails * 200 + spaceBetween
  const totalThumbnails = spaceNeeded > totalWidth ? maxThumbnails - 1 : maxThumbnails
  const sliced = postsFavoriteAll.value.slice(0, totalThumbnails * rows)
  return sliced
})

</script>

<template>
  <div class="home-view">
    <!-- <div class="previous-image">
      <router-link :to="`/post/${slugPrev}`"><div class="arrow-left"></div></router-link>
    </div> -->
    <PostPanel
      v-if="!isLoading"
      :imagePath="imagePath"
      :post="post"
    >
    </PostPanel>
    <div class="spacer">
      &nbsp;
    </div>
  </div>
  <div class="odd-alternate-wrapper">
    <div class="odd-alternate-heading">
      <p>
        Photographer's Favorites
      </p>
    </div>
    <div class="odd-alternate-content">
      <CardGeneric v-for="post in postsFavoriteSliced" type="low-contrast" density="compressed">
        <template #image>
          <router-link :to="`/post/${post.slug}`"><img :alt="`${post.headline} thumbnail`" :src="getThumbImageURI(post.image)" /></router-link>
        </template>
        <template #headline>
          <router-link :to="`/post/${post.slug}`">{{ post.headline }}</router-link>
        </template>
        <template #body>
          {{ post.body }}
        </template>
        <template #date>
          {{ thumbDateTimeFormatted(post.datetime) }}
        </template>
      </CardGeneric>
    </div>

    <div>

    </div>
  </div>
  <!-- <div class="links-wrapper">
    <ListLinks
      v-if="!isLoadingMostDiscussed"
      heading="Most Discussed"
      route="/discussed/before?count=most"
      :links="linksMostDiscussed"
    >
    </ListLinks>
    <ListLinks
      v-if="!isLoadingLeastDiscussed"
      heading="Least Discussed"
      route="/discussed/before?count=least"
      :links="linksLeastDiscussed"
    >
    </ListLinks>
  </div> -->
  <ThumbnailBar
    :current-image="post"
    :total-thumbnails=9
  >
</ThumbnailBar>
</template>
