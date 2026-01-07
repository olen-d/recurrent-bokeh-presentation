import { createRouter, createWebHistory } from 'vue-router'

import ArchiveView from '@/views/archive-view.vue'
import CategoryView from '@/views/category-view.vue'
import CategoriesView from '@/views/categories-view.vue'
import CharacteristicView from '@/views/characteristic-view.vue'
import CharacteristicsView from '@/views/characteristics-view.vue'
import DiscussedView from '@/views/discussed-view.vue'
import HomeView from '@/views/home-view.vue'
import PostView from '@/views/post-view.vue'
import TagView from '@/views/tag-view.vue'
import TagsView from '@/views/tags-view.vue'


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
      path: '/archive/:direction?/:datetime?',
      name: 'archive',
      component: ArchiveView,
      props: true,
      meta: {
        title: 'Archive'
      }
    },
    {
      path: '/category/:slug/:direction?/:datetime?',
      name: 'category',
      component: CategoryView,
      props: true,
      meta: {
        title: 'Category'
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
      meta: {
        title: 'Categories'
      }
    },
    {
      path: '/characteristic/:slug/:direction?/:datetime?',
      name: 'characteristic',
      component: CharacteristicView,
      props: true,
      meta: {
        title: 'Characteristic'
      }
    },
    {
      path: '/characteristics',
      name: 'characteristics',
      component: CharacteristicsView,
      meta: {
        title: 'Characteristics'
      }
    },
    {
      path: '/discussed/:direction?/:dbKey?',
      name: 'discussed',
      component: DiscussedView,
      props: true,
      meta: {
        title: 'Discussed'
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
    },
    {
      path: '/tag/:slug/:direction?/:datetime?',
      name: 'tag',
      component: TagView,
      props: true,
      meta: {
        title: 'Tag'
      }
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagsView,
      meta: {
        title: 'Tags'
      }
    },
  ],
})

export default router
