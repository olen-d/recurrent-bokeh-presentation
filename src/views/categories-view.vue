<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import { computed, onMounted, ref } from 'vue'

import '../assets/css/categories-view.css'

import PanelGeneric from '@/components/panel-generic.vue'

const categories = ref([])
const categoriesViewWidthZero = ref()
const isLoading = ref(true)

const categoriesViewContentObserver = new ResizeObserver(entries => {
  const [{ contentBoxSize: [ {inlineSize }] }] = entries
  categoriesViewWidthZero.value = inlineSize;
})

onMounted(async() => {
  try {
    const response = await fetch(`${apiBaseUrl}/categories/posts?limit=12`)
    const result = await response.json()

    const { status } = result

    if (status === 'success') {
      const { data } = result
      categories.value = data
      isLoading.value = false
    }
  } catch (error) {
    // TODO return an intelligent error
    console.log(error)
  }

    categoriesViewContentObserver.observe(document.getElementsByClassName('categories-view')[0])
})

const categoriesSliced = computed(() => {
  const rows = 1
  const totalWidth = categoriesViewWidthZero.value
  const maxThumbnails = Math.floor(categoriesViewWidthZero.value / 200)
  const spaceBetween = (maxThumbnails - 1) * 32
  const spaceNeeded = maxThumbnails * 200 + spaceBetween
  const totalThumbnails = spaceNeeded > totalWidth ? maxThumbnails - 1 : maxThumbnails

  const sliced = categories.value.map(({ posts, ...rest }) => {
    const postsSliced = posts.slice(0, totalThumbnails * rows)

    return { rest, posts: postsSliced }
  })
  return sliced
})

</script>
<template>
  <div class="categories-view">
    <div v-if="!isLoading">
      <PanelGeneric :posts="category.posts" v-for="category in categoriesSliced">
        <template #title>
          <router-link :to="`/category/${category.catSlug}`">{{ category.catName }}</router-link>
        </template>
      </PanelGeneric>
    </div>
    <pre>{{ categoriesSliced }}</pre>
  </div>
</template>
