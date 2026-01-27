<script setup>
import AppFooter from './components/app-footer.vue'
import NavigationBar from './components/navigation-bar.vue'
import NavigationBurger from './components/navigation-burger.vue'

import './assets/css/app.css'

import { useWindowResize } from '@/composables/useWindowResize'

const { width, height } = useWindowResize()

const navigationMenu = [
  { path: '/archive', label: 'Archive', key: 'archive' },
  { path: '/categories', label: 'Categories', key: 'categories' },
  { path: '/characteristics', label: 'Characteristics', key: 'characteristics' },
  { path: '/tags', label: 'Tags', key: 'tags' }
]
</script>

<template>
  <div class="app">
    <NavigationBar v-if="width >= 992" :menu="navigationMenu"></NavigationBar>
    <NavigationBurger v-else :menu="navigationMenu"></NavigationBurger>
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped></style>
