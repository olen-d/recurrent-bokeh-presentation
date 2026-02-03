<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const thumbnailPageSize = import.meta.env.VITE_THUMBNAIL_PAGE_SIZE


import { ref, watch } from 'vue'

import { useRoute } from 'vue-router'

import { formatDateURI } from '@/composables/useDateURI'
import { getThumbImageURI } from '@/composables/useThumbnailURI'
import { titleCase } from '@/composables/useStringFormat'

import '../assets/css/category-view.css'

import CardGeneric from "@/components/card-generic.vue"

const props = defineProps({
  direction: String,
  datetime: String,
  slug: String
})

const hasPreviousPage = ref(false)
const hasNextPage = ref(false)
const isLoading = ref(true)
const previousDatetime = ref('')
const nextDatetime = ref('')
const posts = ref([])

const route = useRoute()

watch(
  route,
  async () => {
    isLoading.value = true

    const datetime = props.datetime || encodeURI(formatDateURI(new Date()))
    const direction = props.direction || 'before'



    try {
      const response = await fetch(`${apiBaseUrl}/posts/category/${props.slug}/${direction}/${datetime}?limit=${thumbnailPageSize}`)
      const result = await response.json()

      const { status } = result

      if (status === 'success') {
        const { data, pagination: { hasPreviousPage: hpp, hasNextPage: hnp }, meta: { 'cat_name': catName }, } = result
        hasPreviousPage.value = hpp
        hasNextPage.value = hnp
        previousDatetime.value = hpp ? result.pagination.previousDatetime : ''
        nextDatetime.value = hnp ? result.pagination.nextDatetime : ''
        posts.value = data
        isLoading.value = false

        const categoryName = titleCase(catName)
        document.title += ` / ${categoryName}`
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
  <div class="category-view">
    <div class="category-cards" v-if="!isLoading">
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
    <div class="category-pagination">
      <div class="category-pagination-previous" v-if="hasPreviousPage">
        <router-link :to="`/category/${slug}/before/${previousDatetime}`">&laquo; Previous Posts</router-link>
      </div>
      <div class="category-pagination-next" v-if="hasNextPage">
        <router-link :to="`/category/${slug}/after/${nextDatetime}`">Next Posts &raquo;</router-link>
      </div>
    </div>
  </div>
</template>
