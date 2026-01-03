<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

import { ref, watch } from 'vue'

import { useRoute } from 'vue-router'

import '../assets/css/characteristics-view.css'

const attributes = ref([])
const classes = ref(5)
const classification = ref('logrithmic')
const countMinimum = ref(24)
const isLoading = ref(true)

const route = useRoute()

const collator = new Intl.Collator('en')

watch(
  route,
  async () => {
    isLoading.value = true

    try {
      const response = await fetch(`${apiBaseUrl}/attributes/values?classification=${classification.value}&classes=${classes.value}&minimum=${countMinimum.value}`)
      const result = await response.json()

      const { status } = result

      if (status === 'success') {
        const { data } = result
        attributes.value = data
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
  <div class="characteristics-view">
    <ul class="characteristic-names">
      <li v-for="(value, key) in attributes">
        {{ key }}
        <ul class="characteristic-values">
          <li v-for="item in value" :class="`characteristic-classification-${item.class}`">
            <router-link :to="`/characteristic/${encodeURI(item.value)}`">{{ item.value }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
