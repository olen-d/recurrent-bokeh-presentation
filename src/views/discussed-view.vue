<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const thumbnailPageSize = import.meta.env.VITE_THUMBNAIL_PAGE_SIZE


import { ref, watch } from "vue"

import { useRoute } from 'vue-router'
import { formatDateURI } from '@/composables/useDateURI'
import { getThumbImageURI } from "@/composables/useThumbnailURI"

import '../assets/css/discussed-view.css'

import CardGeneric from "@/components/card-generic.vue"

const props = defineProps({
  dbKey: String,
  direction: String,
})

const hasPreviousPage = ref(false)
const hasNextPage = ref(false)
const isLoading = ref(true)
const previousKey = ref('')
const nextKey = ref('')
const posts = ref([])

const route = useRoute()

watch(
  route,
  async () => {
    isLoading.value = true

    const count = route.query?.count || 'most'
    const totalThumbnails = route.query?.limit || thumbnailPageSize
    const dbKey = props.dbKey ? `/${props.dbKey}` : ''
    const direction = props.direction || 'before'

    try {
      const response = await fetch(`${apiBaseUrl}/posts/discussed/${direction}${dbKey}?count=${count}&limit=${totalThumbnails}`)
      const result = await response.json()

      const { status } = result

      if (status === 'success') {
        const { data, pagination: { hasPreviousPage: hpp, hasNextPage: hnp }, } = result
        hasPreviousPage.value = hpp
        hasNextPage.value = hnp
        previousKey.value = hpp ? result.pagination.previousKey : ''
        nextKey.value = hnp ? result.pagination.nextKey : ''
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
  <div class="discussed-view">
    <div class="archive-cards" v-if="!isLoading">
        <CardGeneric v-for="post in posts">
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
            {{ post.datetime }}
          </template>
        </CardGeneric>
    </div>
    <div class="archive-pagination">
      <div class="archive-pagination-previous" v-if="hasPreviousPage">
        <router-link :to="`/discussed/before/${previousKey}`">&laquo; Previous Posts</router-link>
      </div>
      <div class="archive-pagination-next" v-if="hasNextPage">
        <router-link :to="`/discussed/after/${nextKey}`">Next Posts &raquo;</router-link>
      </div>
    </div>
  </div>
</template>
