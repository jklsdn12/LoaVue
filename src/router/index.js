import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/UserLogin";
import RaidBoard from "@/views/RaidBoard";

const routes = [
  {
    path: '/userLogin',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'RaidBoard',
    component: RaidBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

