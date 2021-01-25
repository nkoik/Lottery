const routes = [
  {
    path: '/',
    component: () => import('layouts/InitialLayout.vue'),
    redirect: '/login',
    children: [
      {
        path: 'login/:success?',
        name: 'Login',
        component: () => import('pages/Initial/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Initial/Register.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Main/Home.vue')
      },
      {
        path: 'draw',
        name: 'Draw',
        component: () => import('pages/Main/Draw.vue')
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('pages/Main/History.vue'),
        children: [
          {
            path: '',
            name: 'HistoryDrawList',
            component: () => import('pages/Main/HistoryDrawList.vue')
          },
          {
            path: ':id',
            name: 'HistoryDrawDetails',
            component: () => import('pages/Main/HistoryDrawDetails.vue'),
            props: true
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
