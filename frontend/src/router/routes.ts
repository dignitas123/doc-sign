import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "/documents",
    children: [
      { path: "documents", component: () => import("pages/Documents.vue")},
      { path: "documents/create", component: () => import("components/CreateDocument.vue")},
      { path: "signs", component: () => import("pages/Signs.vue") },
      {
        path: "playground",
        component: () => import("src/pages/Playground.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
