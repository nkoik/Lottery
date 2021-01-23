
const routes = [
  {
    path: '/',
    component: () => import('layouts/InitialLayout.vue'),
    redirect: '/login',
    children: [
      { path: 'login', component: () => import('pages/Initial/Login.vue') },
      { path: 'register', component: () => import('pages/Initial/Register.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main/Index.vue') }
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
