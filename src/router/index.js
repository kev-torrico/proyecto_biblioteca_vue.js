import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsuariosList from "@/views/usuarios/UsuariosList.vue";
import LibrosList from "@/views/libros/LibrosList.vue";
import AutoresList from "@/views/autores/AutoresList.vue";
import LoginView from "@/views/Login.view.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: UsuariosList,
    meta: { requiresAuth: true, role: ["administrador"] },
  },
  {
    path: "/libros",
    name: "libros",
    component: LibrosList,
    meta: {
      requiresAuth: true,
      role: ["administrador"],
    },
  },
  {
    path: "/autores",
    name: "autores",
    component: AutoresList,
    meta: {
      requiresAuth: true,
      role: ["administrador"],
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem("rol") || "";
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.meta.role.length > 0 && to.meta.role.includes(userRole)) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
