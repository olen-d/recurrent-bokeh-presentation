<script setup>
import '../assets/css/navigation-bar.css'

const siteName = import.meta.env.VITE_SITE_NAME

defineProps({
  menu: Array
})
</script>

<template>
  <div class="navigation-bar">
    <div class="logo">
      <h1 class="site-title"><router-link :to="{ name: 'home' }">{{ siteName }}</router-link></h1>
    </div>
    <ul class="menu">
      <li class="item" v-for="item in menu">
        <router-link :to="`${item.path}`">{{ item.label }}</router-link>
      </li>
    </ul>
  </div>
</template>
