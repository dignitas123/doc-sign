const routes = [
  {
    path: '/',
    redirect: '/documents',
  },
  {
    path: '/documents',
    component: () => import('src/pages/maintabs/documents-tab.vue'),
  },
  {
    path: '/documents/create',
    component: () => import('src/pages/create-document/create-document.vue'),
  },
  { path: '/signs', component: () => import('src/pages/maintabs/Signs.vue') },
  {
    path: '/playground',
    component: () => import('src/pages/maintabs/Playground.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
