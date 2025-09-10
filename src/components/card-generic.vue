<script setup>
</script>

<template>
  <div class="card-generic">
    <slot name="image"></slot>
    <slot name="author"></slot>
    <h2>
      <slot name="headline"></slot>
    </h2>
    <slot name="body"></slot>
    <slot name="date"></slot>
  </div>
</template>

<style scoped>
.card-generic {
  width: 200px;
  background-color: white;
}
</style>
