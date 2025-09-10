import { createRouter, createWebHistory } from 'vue-router'

import ArchiveView from '@/views/archive-view.vue'
import HomeView from '@/views/home-view.vue'
import PostView from '@/views/post-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
      meta: {
        title: 'Archive'
      }
    },
    {
      path: '/post/:slug?',
      name: 'post',
      component: PostView,
      props: true,
      meta: {
        title: 'Post'
      }
    }
  ],
})

export default router
