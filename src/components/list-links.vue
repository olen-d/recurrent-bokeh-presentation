<script setup>
import '../assets/css/list-links.css'

const props = defineProps({
  links: Array,
  route: String,
  heading: String
})

</script>
<template>
  <div class="links-wrapper">
    <h2>
      <router-link :to="route">{{ heading }}</router-link>
    </h2>
    <ol>
      <li v-for="link in links">
        <router-link :to="`/post/${link.slug}`">{{ link.headline }}</router-link>
      </li>
    </ol>
  </div>
</template>
