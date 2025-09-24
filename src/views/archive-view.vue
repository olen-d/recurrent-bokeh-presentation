<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const thumbnailPageSize = import.meta.env.VITE_THUMBNAIL_PAGE_SIZE
const thumbnailPath = import.meta.env.VITE_THUMBNAIL_PATH
const thumbnailPrefix = import.meta.env.VITE_THUMBNAIL_PREFIX

import { ref, watch } from "vue"

import { useRoute } from 'vue-router'

import '../assets/css/archive-view.css'

import CardGeneric from "@/components/card-generic.vue"

const props = defineProps({
  direction: String,
  datetime: String
})

const hasPreviousPage = ref(false)
const hasNextPage = ref(false)
const isLoading = ref(true)
const previousDatetime = ref('')
const nextDatetime = ref('')
const posts = ref([])

const route = useRoute()

const formatDateURI = (dateObj) => {
  const dayRaw = dateObj.getDate()
  const hoursRaw = dateObj.getHours()
  const minutesRaw = dateObj.getMinutes()
  const monthRaw = dateObj.getMonth() + 1
  const secondsRaw = dateObj.getSeconds()
  const day = dayRaw.toString().padStart(2, '0')
  const hours = hoursRaw.toString().padStart(2, '0')
  const minutes = minutesRaw.toString().padStart(2, '0')
  const month = monthRaw.toString().padStart(2, '0')
  const seconds = secondsRaw.toString().padStart(2, '0')
  const year = dateObj.getFullYear()

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

const getThumbImageUri = filename => {
  return `${thumbnailPath}/${thumbnailPrefix}${filename}`
}

watch(
  route,
  async () => {
    isLoading.value = true

    const datetime = props.datetime || encodeURI(formatDateURI(new Date()))
    const direction = props.direction || 'before'

    try {
      const response = await fetch(`${apiBaseUrl}/posts/${direction}/${datetime}?limit=${thumbnailPageSize}`)
      const result = await response.json()

      const { status } = result

      if (status === 'success') {
        const { data, pagination: { hasPreviousPage: hpp, hasNextPage: hnp }, } = result
        hasPreviousPage.value = hpp
        hasNextPage.value = hnp
        previousDatetime.value = hpp ? result.pagination.previousDatetime : ''
        nextDatetime.value = hnp ? result.pagination.nextDatetime : ''
        posts.value = data
        isLoading.value = false
      }
    } catch (error) {
      // TODO return an intelligent error
      console.log(error)
    }
  },
  { immediate: true}
)
</script>

<template>
  <div class="archive-view">
    <div class="archive-cards" v-if="!isLoading">
        <CardGeneric v-for="post in posts">
          <template #image>
            <router-link :to="`/post/${post.slug}`"><img :alt="`${post.headline} thumbnail`" :src="getThumbImageUri(post.image)" /></router-link>
          </template>
          <template #headline>
            <router-link :to="`/post/${post.slug}`">{{ post.headline }}</router-link>
          </template>
          <template #body>
            {{ post.body }}
          </template>
          <template #date>
            {{ post.datetime }}
          </template>
        </CardGeneric>
    </div>
    <div class="archive-pagination">
      <div class="archive-pagination-previous" v-if="hasPreviousPage">
        <router-link :to="`/archive/before/${previousDatetime}`">&laquo; Previous Posts</router-link>
      </div>
      <div class="archive-pagination-next" v-if="hasNextPage">
        <router-link :to="`/archive/after/${nextDatetime}`">Next Posts &raquo;</router-link>
      </div>
    </div>
  </div>
</template>
