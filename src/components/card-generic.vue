<script setup>
import { useSlots } from 'vue'

import '../assets/css/card-generic.css'

defineProps({
  density: {
    type: String,
    default: 'default'
  },
  type: {
    type: String,
    default: 'default'
  }
})

const slots = useSlots()

</script>

<template>
  <div class="card-generic">
    <div
      v-if="slots.image"
      :class="[
        'card-generic-image',
        'card-generic-image-' + type
      ]"
    >
      <slot name="image"></slot>
    </div>
    <div
      v-if="slots.headline"
      :class="[
        'card-generic-headline',
        'card-generic-headline-' + type,
        'card-generic-headline-density-' + density
      ]"
    >
      <h2>
        <slot name="headline"></slot>
      </h2>
    </div>
    <div
      v-if="slots.author"
      :class="[
        'card-generic-author',
        'card-generic-author-' + type,
        'card-generic-author-density-' + density
      ]"
    >
      <p>
        <slot name="author"></slot>
      </p>
    </div>
    <div
      v-if="slots.body"
      :class="[
        'card-generic-body',
        'card-generic-body-' + type,
        'card-generic-body-density-' + density
      ]"
    >
      <p>
        <slot name="body"></slot>
      </p>
    </div>
    <div
      v-if="slots.date"
      :class="[
        'card-generic-date',
        'card-generic-date-' + type,
        'card-generic-date-density-' + density
      ]"
    >
      <p>
        <slot name="date"></slot>
      </p>
    </div>
  </div>
</template>
