import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "/documents",
    children: [
      { path: "todo", component: () => import("pages/Todo.vue") },
      { path: "documents", component: () => import("pages/Documents.vue") },
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
