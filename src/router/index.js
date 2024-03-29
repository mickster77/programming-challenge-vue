import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login'
import Signup from '../views/auth/Signup'
import Admin from '../views/Admin'
import firebase from 'firebase'
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import Rosters from '../views/Rosters.vue'
import Scoreboard from '../views/Scoreboard.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: false,
      requiresAdmin: true
    },
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/rosters',
    name: 'Rosters',
    component: Rosters,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/scoreboard',
    name: 'Scoreboard',
    component: Scoreboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  // check to see if route requres Auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {

    // check Auth state of user
    let user = firebase.auth().currentUser

    // offline testing uncomment below and comment above
    // let user = true

    if (user) {
      // user is signed in, proceed
      next()
    } else {
      // no user is signed in, redirect login
      alert('you need to be logged in to access this page')
      next({ name: 'Login' })
    }
  } else if (to.matched.some(rec => rec.meta.requiresAdmin)) {
    // alert("admin only...")
    // let isAdmin = 
    let user = firebase.auth().currentUser
    if (user.displayName == "mickster" || user.displayName == "mrplants" || user.displayName == "mgann" || user.displayName == "poster515") {
      next()

    } else {
      alert('no no  no ...')
      next({ name: 'Login' })
    }

    // if (isAdmin) {
    //   next()
    // } else {
    //   alert('no no no,,, you need to be admin')
    //   next({ name: 'Login' })
    // }
  } else {
    // selected route does not require a user to be logged in, so send to disired route
    next()
  }
})

export default router


// import Vue from 'vue'
// import Router from 'vue-router'
// import Login from '@/views/auth/Login'
// import Signup from '@/views/auth/Signup'
// import Tidbits from '@/views/Tidbits'
// import ToDo from '@/views/ToDo'
// import Test from '@/views/Test'
// import FAQ from '@/views/FAQ'
// import Burnlist from '@/views/Burnlist'
// import Letters from '@/views/Letters'
// import firebase from 'firebase'

// Vue.use(Router)

// const router = new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       redirect: '/login'
//     },

//     {
//       path: '/signup',
//       name: 'Signup',
//       component: Signup
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login,
//     },
//     {
//       path: '/test',
//       name: 'Test',
//       component: Test,
//     },
//     {
//       path: '/Burnlist',
//       name: 'Burnlist',
//       component: Burnlist,
//     },
//     {
//       path: '/FAQ',
//       name: 'FAQ',
//       component: FAQ,
//     },
//     {
//       path: '/letters',
//       name: 'Letters',
//       component: Letters,
//     },
//     {
//       path: '/:uid',
//       name: 'Tidbits',
//       component: Tidbits,
//       meta: {
//         requiresAuth: true,
//       },
//     },
//     {
//       path: '/todo/:uid',
//       name: 'ToDo',
//       component: ToDo,
//       meta: {
//         requiresAuth: true,
//       },
//     },

//   ]
// })

// router.beforeEach((to, from, next) => {
//   // check to see if route requres Auth
//   if (to.matched.some(rec => rec.meta.requiresAuth)) {

//     // check Auth state of user
//     let user = firebase.auth().currentUser

//     // offline testing uncomment below and comment above
//     // let user = true

//     if (user) {
//       // user is signed in, proceed
//       next()
//     } else {
//       // no user is signed in, redirect login
//       alert('you need to be logged in to access this page')
//       next({ name: 'Login' })
//     }
//   } else {
//     // selected route does not require a user to be logged in, so send to disired route
//     next()
//   }
// })

// export default router