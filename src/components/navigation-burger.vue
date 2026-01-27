<script setup>
import { ref } from 'vue'

import '../assets/css/navigation-burger.css'

const siteName = import.meta.env.VITE_SITE_NAME

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

defineProps({
  menu: Array
})
</script>

<template>
  <div class="navigation-burger">
    <div class="navigation-burger-bar">
      <div class="logo">
        <h1 class="site-title"><router-link :to="{ name: 'home' }">{{ siteName }}</router-link></h1>
      </div>
      <div class="hamburger-menu-shape" @click="toggleMenu"></div>
    </div>
    <div class="burger-menu-container" v-if="showMenu">
      <ul class="burger-menu-items">
        <li class="burger-menu-item" v-for="item in menu">
          <router-link :to="`${item.path}`" @click="toggleMenu">{{ item.label }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
