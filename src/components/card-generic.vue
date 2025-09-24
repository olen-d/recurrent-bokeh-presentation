<script setup>

import '../assets/css/card-generic.css'

</script>

<template>
  <div class="card-generic">
    <slot name="image"></slot>
    <p class="meta">
      <slot name="author"></slot>
    </p>
    <h2>
      <slot name="headline"></slot>
    </h2>
    <p class="body">
      <slot name="body"></slot>
    </p>
    <p class="meta">
      <slot name="date"></slot>
    </p>
  </div>
</template>
