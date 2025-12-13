<script setup>
import AppFooter from './components/app-footer.vue';
import NavigationBar from './components/navigation-bar.vue';

import './assets/css/app.css'

const navigationMenu = [
  { path: '/archive', label: 'Archive', key: 'archive' },
  { path: '/categories', label: 'Categories', key: 'categories' }
]
</script>

<template>
  <div class="app">
    <NavigationBar :menu="navigationMenu"></NavigationBar>
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped></style>
