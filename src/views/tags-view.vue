<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import { ref, watch } from 'vue'

import { useRoute } from 'vue-router'

import '../assets/css/tags-view.css'

const tags = ref([])
const tagsSorted = ref([])
const classes = ref(5)
const classification = ref('logrithmic')
const isLoading = ref(true)
const totalTags = ref(100)

const route = useRoute()

const collator = new Intl.Collator('en', { numeric: true })

watch(
  route,
  async () => {
    isLoading.value = true

    try {
      const response = await fetch(`${apiBaseUrl}/tags?classification=${classification.value}&classes=${classes.value}&limit=${totalTags.value}`)
      const result = await response.json()

      const { status } = result

      if (status === 'success') {
        const { data } = result
        tags.value = data
        const tagsSortedTemp = tags.value.toSorted((a, b) => collator.compare(a.tag, b.tag))
        tagsSorted.value = tagsSortedTemp
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
  <div class="tags-view">
    <ul class="tag-names">
      <li v-for="tagSorted in tagsSorted" :class="`tag-classification-${tagSorted.class}`">
        <router-link :to="`/tag/${encodeURI(tagSorted.tag)}`">{{ tagSorted.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
