<script setup>
defineProps({
  menu: Array
})
</script>

<template>
  <div class="navigation-bar">
    <ul>
      <li v-for="item in menu">
        <router-link :to="`${item.path}`">{{ item.label }}</router-link>
      </li>
    </ul>
  </div>
</template>
