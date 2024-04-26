import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/addBook',
      name: 'addBook',
      component: () => import('../views/AddBookView.vue')
    },
    {
      path: '/modifyBook',
      name: 'modifyBook',
      component: () => import('../views/ModifyBookView.vue')
    },
    {
      path: '/deleteBook',
      name: 'deleteBook',
      component: () => import('../views/DeleteBookView.vue')
    },
    {
      path: '/addComment',
      name: 'addComment',
      component: () => import('../views/AddCommentView.vue')
    },
    {
      path: '/getBookByCategory',
      name: 'getBookByCategory',
      component: () => import('../views/GetBookByCategoryView.vue')
    }
  ]
})

export default router
