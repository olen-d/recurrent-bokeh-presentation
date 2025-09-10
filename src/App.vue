<script setup>
const siteName = import.meta.env.VITE_SITE_NAME

import NavigationBar from './components/navigation-bar.vue';

const navigationMenu = [
  { path: '/archive', label: 'Archive', key: 'archive'  }
]
</script>

<template>
  <h1><router-link :to="{ name: 'home' }">{{ siteName }}</router-link></h1>
  <p>
    I hate people, but I'm in it for the audience.
  </p>
  <NavigationBar :menu="navigationMenu"></NavigationBar>
  <RouterView />
</template>

<style scoped></style>
