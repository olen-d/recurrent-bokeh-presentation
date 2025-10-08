<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const imagePath = import.meta.env.VITE_IMAGE_PATH

import { onMounted, ref } from 'vue'

import '../assets/css/home-view.css'

import ListLinks from '@/components/list-links.vue'
import PostPanel from '@/components/post-panel.vue'
import ThumbnailBar from '@/components/thumbnail-bar.vue'

const post = ref({})
const slugPrev = ref('')
const isLoading = ref(true)

onMounted(async () => {
  const response = await fetch(`${apiBaseUrl}/post`)
  const result = await response.json()

  const { status } = result

  if (status === 'success') {
    const { data } = result
    post.value = data

    const { datetime } = data
    const datetimeEncoded = encodeURIComponent(datetime)

    const responsePrevious = await fetch(`${apiBaseUrl}/posts/previous/${datetimeEncoded}`)
    const resultPrevious = await responsePrevious.json()
    const { data: [{ slug: slugP }], } = resultPrevious

    slugPrev.value = slugP
    isLoading.value = false
  }
})
</script>

<template>
  <div class="home-view">
    <div class="previous-image">
      <router-link :to="`/post/${slugPrev}`"><div class="arrow-left"></div></router-link>
    </div>
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
  <ListLinks></ListLinks>
  <ThumbnailBar
    :current-image="post"
    :total-thumbnails=9
  >
  </ThumbnailBar>
</template>
