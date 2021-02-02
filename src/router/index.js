import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {
      title: "Dukcapil Browser"
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const hasTitle = to.matched.slice().reverse().find((e) => e.meta && e.meta.title)

  if (hasTitle) {
    document.title = hasTitle.meta.title
  }
  // console.log('hasTitle', hasTitle)
  next()
})

export default router
