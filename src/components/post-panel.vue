<script setup>
import { computed } from 'vue'

import { dateObjFromMySQL } from '@/composables/useDateURI'

import '../assets/css/post-panel.css'

const props = defineProps({
  imagePath: String,
  post: Object
})

const postDateTimeFormatted = computed(() => {
  const postDateObj = dateObjFromMySQL(props.post.datetime)
  const postDateFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    dayPeriod: 'short'
  }

  const postDateFormatter = new Intl.DateTimeFormat('en-US', postDateFormatOptions)
  const postDateFormatted = postDateFormatter.format(postDateObj)

  // Remove hour for non-specific time. Remember to make this an option in the future
  const reHour = /at \d+/
  const postDateHourRemoved = postDateFormatted.replace(reHour, '')

  return postDateHourRemoved
})

// TODO: Fix this later to pull the site url from .env or database configuration
const getImageUri = filename => {
  return `${props.imagePath}/${filename}`
}
</script>

<template>
  <div class="post-panel">
    <div class="post-panel-container">
      <div class="post-panel-item-image">
        <img
          class="post-panel-image"
          :alt="post.headline"
          :src="getImageUri(post.image)"
        />
      </div>
      <div class="post-panel-meta-container">
        <div class="post-panel-item-headline">
          <h2>
            {{ post.headline }}
          </h2>
        </div>
        <div class="post-panel-item-meta">
          <div v-if="post.body" class="post-panel-body">
            {{ post.body }}
          </div>
          <div class="post-panel-date-time">
            {{ postDateTimeFormatted }}
          </div>
        </div>
        <div class="post-panel-item-taxonomy">
          <div v-if="post.categories" class="post-panel-categories">
            <p>
              {{ post.categories.length > 1 ? "Categories" : "Category" }}:
            </p>
            <ul>
              <li class="post-category" v-for="category in post.categories">
                <router-link :to="`/category/${category.slug}`">{{ category.name }}</router-link>
              </li>
            </ul>
          </div>
          <div class="post-panel-tags">
            <ul v-if="post.tags">
              <li class="post-panel-tags" v-for="tag in post.tags">
                <router-link :to="`/tag/${encodeURI(tag.tag)}`">{{ tag.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="post-panel-item-attributes">
          <p class="post-panel-attribute" v-for="attribute in post.attributes">
            <span class="post-panel-attribute-name">{{ attribute.name }}</span>: <router-link :to="`/characteristic/${encodeURI(attribute.value)}`">{{ attribute.value }}</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
