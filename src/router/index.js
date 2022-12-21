import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/',
        name: 'Home',
        component: () => import('../views/home-view.vue')
    },
    { 
        path: '/about',
        name: 'About',
        component: () => import('../views/about-view.vue')
    },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router