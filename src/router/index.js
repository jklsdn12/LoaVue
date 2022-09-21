import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/UserLogin";
import RaidBoard from "@/views/RaidBoard";
import CreateRoom from "@/views/CreateRoom";
import UpdateRoom from "@/views/UpdateRoom";
import ChangePwd from "@/views/ChangePwd";

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
  {
    path: '/updateRoom',
    name: 'UpdateRoom',
    component: UpdateRoom
  },
  {
    path: '/changePwd',
    name: 'ChangePwd',
    component: ChangePwd
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

