import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '@/views/app-home.vue';
import AddUser from '@/components/add-user.vue'
import UserList from '@/components/user-list.vue'

const routes = [
    {
      path: '/',
      component: AppHome
    },
    {
      path: '/add-user',
      component: AddUser
    },
    {
      path: '/user-list',
      component: UserList
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router
