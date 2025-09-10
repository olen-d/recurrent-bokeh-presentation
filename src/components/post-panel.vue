<script setup>
const props = defineProps({
  post: Object
})

// TODO: Fix this later to pull the site url from .env or database configuration
const getImageUri = filename => {
  return `http://recurrentbokeh.local/assets/images/${filename}`
}
</script>

<template>
  <div class="image-panel">
    <img
      :alt="post.headline"
      :src="getImageUri(post.image)"
    />
    <h2>
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
