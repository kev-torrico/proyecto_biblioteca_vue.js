<template>
  <header class="navbar">
    <h1 class="titulo">
      <router-link to="/">BIBLIOTECA</router-link>
    </h1>
    <nav class="nav-links">
      <router-link
        v-if="isLogin && tieneAutorizacion(['administrador'])"
        to="/usuarios"
      >
        Usuarios
      </router-link>
      <router-link
        v-if="isLogin && tieneAutorizacion(['administrador'])"
        to="/autores"
      >
        Autores
      </router-link>
      <router-link
        v-if="isLogin && tieneAutorizacion(['administrador'])"
        to="/libros"
      >
        Libros
      </router-link>
      <router-link v-if="!isLogin" to="/login">Login</router-link>
    </nav>
  </header>

  <div v-if="isLogin" class="barra-usuario">
    {{ getNombre }} | {{ getRol }} |
    <a @click="logout()" class="logout-link">[ Salir ]</a>
  </div>

  <div class="contenedor-principal">
    <router-view />
  </div>

  <footer class="footer">
    <p>&copy; 2025 Biblioteca para la vida. Todos los derechos reservados.</p>
  </footer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "AppView",
  data() {
    return {};
  },
  components: {
    // Registro de componentes que se utilizaran.
  },
  methods: {
    // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
    ...mapActions(["clearToken", "setRol"]),
    logout() {
      localStorage.removeItem("rol");
      localStorage.removeItem("token");
      this.clearToken();
      this.setRol("");
      this.$router.push("/login");
    },
    tieneAutorizacion(roles) {
      return roles.includes(this.getRol);
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(["rol"]),
    ...mapGetters(["isLogin", "getRol", "getNombre"]),
  },
  props: {
    // propiedades que el componente puede recibir.
  },
  emits: [], // los eventos personalizados que el componente puede emitir.
};
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004080;
  color: white;
  padding: 10px 20px;
  font-size: 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.titulo {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
}

.titulo a {
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffcc00;
}

.barra-usuario {
  background-color: #f0f0f0;
  color: #333;
  padding: 8px 20px;
  font-size: 0.95rem;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
}

.logout-link {
  color: #d60000;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
}

.logout-link:hover {
  text-decoration: underline;
}

.contenedor-principal {
  padding: 20px;
  min-height: 80vh;
}

.footer {
  text-align: center;
  background-color: #004080;
  color: white;
  padding: 15px;
  margin-top: 30px;
}
</style>
