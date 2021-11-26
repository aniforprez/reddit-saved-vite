import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import SavedListPage from "@/views/SavedListPage.vue";
import AuthenticatePage from "@/views/AuthenticatePage.vue";
import UnauthenticatedPage from "@/views/UnauthenticatedPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "SavedList",
    component: SavedListPage,
  },
  {
    path: "/authenticate",
    name: "Authenticate",
    component: AuthenticatePage,
  },
  {
    path: "/authorize",
    name: "Unauthenticated",
    component: UnauthenticatedPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
