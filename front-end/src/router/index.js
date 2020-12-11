import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Toread from '../views/Toread.vue'
import Admin from '../views/Admin.vue'
import Myadmin from '../views/Myadmin.vue'
import EditToReads from '../views/EditToReads.vue'
import Christmas from '../views/Christmas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/toRead',
    name: 'Toread',
    component: Toread
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/myadmin',
    name: 'Myadmin',
    component: Myadmin
  },
  {
    path: '/editToReads',
    name: 'EditToReads',
    component: EditToReads
  },
  {
    path: '/christmas',
    name: 'Christmas',
    componenet: Christmas
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
