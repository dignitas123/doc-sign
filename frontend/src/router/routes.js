const routes = [
  {
    path: "/",
    redirect: "/documents",
  },
  {
    path: "/documents",
    component: () => import("src/pages/maintabs/Documents.vue"),
  },
  {
    path: "/documents/create",
    component: () => import("src/pages/create-document/Index.vue"),
  },
  { path: "/signs", component: () => import("src/pages/maintabs/Signs.vue") },
  {
    path: "/playground",
    component: () => import("src/pages/maintabs/Playground.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
