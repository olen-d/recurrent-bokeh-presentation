<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import { ref, watch } from "vue"

import { useRoute } from 'vue-router'

import CardGeneric from "@/components/card-generic.vue"

const posts = ref([])
const isLoading = ref(true)

const route = useRoute()

// TODO: Fix this later to pull the site url from .env or database configuration
const getThumbImageUri = filename => {
  return `http://recurrentbokeh.local/assets/thumbnails/thumb_${filename}`
}

watch(
  route,
  async () => {
    isLoading.value = true
    try {
      const response = await fetch(`${apiBaseUrl}/posts`)
      const result = await response.json()

      const { status } = result

      if (status === 'success') {
        const { data } = result
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
    <div class="archive-cards">
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
  </div>
</template>

<style scoped>
.archive-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6rem 2rem;
}
</style>
