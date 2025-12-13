<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import { onMounted, ref } from 'vue'

const categories = ref([])
const isLoading = ref(true)

onMounted(async() => {
  try {
    const response = await fetch(`${apiBaseUrl}/categories`)
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
})

</script>
<template>
 <div class="categories-vue">
  <ul>
    <li v-for="category in categories">
      <router-link :to="`/category/${category.slug}`">{{ category.name }}</router-link>
    </li>
  </ul>
 </div>
</template>
