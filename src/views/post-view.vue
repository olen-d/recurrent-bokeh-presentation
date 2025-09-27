<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const imagePath = import.meta.env.VITE_IMAGE_PATH

import { ref, watch } from 'vue'

import { useRoute } from 'vue-router'

import '../assets/css/post-view.css'

import ListLinks from '@/components/list-links.vue'
import PostPanel from '@/components/post-panel.vue'
import ThumbnailBar from '@/components/thumbnail-bar.vue'

const props = defineProps({
  slug: String
})

const post = ref({})
const slugPrev = ref('')
const slugNext = ref('')
const isLoading = ref(true)

const route = useRoute()

watch(
  route,
  async () => {
    isLoading.value = true
    try {
      const response = await fetch(`${apiBaseUrl}/post/${props.slug}`)
      const result = await response.json()

      const { status } = result

      if (status === 'success') {
        const { data } = result
        post.value = data

        const { datetime } = data
        const datetimeEncoded = encodeURIComponent(datetime)

        const responsePrevious = await fetch(`${apiBaseUrl}/posts/previous/${datetimeEncoded}`)
        const resultPrevious = await responsePrevious.json()

        if (resultPrevious.data.length > 0) {
          const { data: [{ slug: slugP }], } = resultPrevious
          slugPrev.value = slugP
        } else {
          slugPrev.value = false;
        }

        const responseNext = await fetch(`${apiBaseUrl}/posts/next/${datetimeEncoded}`)
        const resultNext= await responseNext.json()

        if (resultNext.data.length > 0) {
          const { data: [{ slug: slugN }], } = resultNext
          slugNext.value = slugN
        } else {
          slugNext.value = false;
        }

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
  <div class="post-view">
    <div v-if="slugPrev" class="previous-image">
      <router-link :to="`/post/${slugPrev}`"><div class="arrow-left"></div></router-link>
    </div>
    <PostPanel
      v-if="!isLoading"
      :imagePath="imagePath"
      :post="post"
    >
    </PostPanel>
    <div v-if="slugNext" class="next-image">
      <router-link :to="`/post/${slugNext}`"><div class="arrow-right"></div></router-link>
    </div>
    <div v-if="!slugNext" class="next-image">
      &nbsp;
    </div>
  </div>
  <ListLinks></ListLinks>
  <ThumbnailBar></ThumbnailBar>
</template>
