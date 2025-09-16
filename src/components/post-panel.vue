<script setup>
const props = defineProps({
  imagePath: String,
  post: Object
})


import '../assets/css/post-panel.css'

// TODO: Fix this later to pull the site url from .env or database configuration
const getImageUri = filename => {
  return `${props.imagePath}/${filename}`
}
</script>

<template>
  <div class="post-panel">
    <img
      :alt="post.headline"
      :src="getImageUri(post.image)"
    />
    <h2 class="post-panel-headline">
      <router-link :to="`/post/${post.slug}`">{{ post.headline }}</router-link>
    </h2>
    <p>
      {{ post.body }}
    </p>
    <p>
      {{ post.datetime }}
    </p>
  </div>
</template>

<style scoped>
.image-panel {
  background-color: white;
}
</style>
