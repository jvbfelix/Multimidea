import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListsView from "../views/ListsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/new",
    name: "Nova Trilha",
    component: HomeView,
  },
  {
    path: "/",
    name: "Trilhas",
    component: ListsView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
