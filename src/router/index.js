import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/UserLogin";
import RaidBoard from "@/views/RaidBoard";
import CreateRoom from "@/views/CreateRoom";

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
  },
  {
    path: '/createRoom',
    name: 'CreateRoom',
    component: CreateRoom
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

