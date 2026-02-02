<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const imagePath = import.meta.env.VITE_IMAGE_PATH

import { onMounted, ref, watch } from 'vue'

import { useRoute } from 'vue-router'

import { titleCase } from '@/composables/useStringFormat'

import '../assets/css/post-view.css'

import ListLinks from '@/components/list-links.vue'
import PostPanel from '@/components/post-panel.vue'
import ThumbnailBar from '@/components/thumbnail-bar.vue'

const props = defineProps({
  slug: String
})

const isLoading = ref(true)
const isLoadingLeastDiscussed = ref (true)
const isLoadingMostDiscussed = ref(true)
const post = ref({})
const linksLeastDiscussed = ref({})
const linksMostDiscussed = ref({})
const slugPrev = ref('')
const slugNext = ref('')

const route = useRoute()

onMounted( async() => {
  const responseLeastDiscussed = await fetch(`${apiBaseUrl}/posts/discussed/before?count=least&limit=6`)
  const resultLeastDiscussed = await responseLeastDiscussed.json()

  const { status: statusLeastDiscussed } = resultLeastDiscussed

  if (statusLeastDiscussed === 'success') {
    const { data: dataLeastDiscussed } = resultLeastDiscussed
    linksLeastDiscussed.value = dataLeastDiscussed
    isLoadingLeastDiscussed.value = false
  }

  const responseMostDiscussed = await fetch(`${apiBaseUrl}/posts/discussed/before?count=most&limit=6`)
  const resultMostDiscussed = await responseMostDiscussed.json()

  const { status: statusMostDiscussed } = resultMostDiscussed

  if (statusMostDiscussed === 'success') {
    const { data: dataMostDiscussed } = resultMostDiscussed
    linksMostDiscussed.value = dataMostDiscussed
    isLoadingMostDiscussed.value = false
  }
})

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

        const { datetime, headline } = data

        document.title += ` / ${titleCase(headline)}`

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
    <div class="post-view-navigation-container">
      <div class="post-view-item-previous">
        <div v-if="slugPrev" class="previous-image">
          <router-link :to="`/post/${slugPrev}`"><div class="chevron-left"></div></router-link>
        </div>
      </div>
      <div class="post-view-item-next">
        <div v-if="slugNext" class="next-image">
          <router-link :to="`/post/${slugNext}`"><div class="chevron-right"></div></router-link>
        </div>
      </div>
    </div>
    <PostPanel
      v-if="!isLoading"
      :imagePath="imagePath"
      :post="post"
    >
    </PostPanel>
  </div>
  <div class="links-wrapper">
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
  </div>
  <ThumbnailBar
    :current-image="post"
    :total-thumbnails=9
  >
  </ThumbnailBar>
</template>
