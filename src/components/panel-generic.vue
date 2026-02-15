<script setup>
import { useSlots } from 'vue'

import { formatDateYearMonthDay } from '@/composables/useDateURI'
import { getThumbImageURI } from "@/composables/useThumbnailURI"

import '../assets/css/panel-generic.css'

import CardGeneric from './card-generic.vue'

defineProps({
  density: {
    type: String,
    default: 'default'
  },
  posts: {
    type: Array
  },
  type: {
    type: String,
    default: 'default'
  }
})

const slots = useSlots()

</script>

<template>
  <div class="panel-generic">
    <div v-if="slots.title" class="panel-generic-title-wrapper">
      <div
        :class="[
          'panel-generic-title',
          'panel-generic-title-' + type,
          'panel-generic-title-density-' + density
        ]"
      >
        <h2>
          <slot name="title"></slot>
        </h2>
      </div>
    </div>
    <CardGeneric v-for="post in posts">
      <template #image>
        <router-link :to="`/post/${post.slug}`"><img :alt="`${post.headline} thumbnail`" :src="getThumbImageURI(post.image)" /></router-link>
      </template>
      <template #headline>
        <router-link :to="`/post/${post.slug}`">{{ post.headline }}</router-link>
      </template>
      <template #body>
        {{ post.body }}
      </template>
      <template #date>
        {{ formatDateYearMonthDay(post.datetime) }}
      </template>
    </CardGeneric>
  </div>
</template>
