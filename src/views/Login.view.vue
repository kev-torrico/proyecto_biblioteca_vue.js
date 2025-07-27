<template>
  <div class="login-container">
    <div class="card">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="ejemplo@correo.com"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="••••••••"
          />
        </div>
        <button type="submit">Entrar</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.get(
          process.env.VUE_APP_API_URL + "/usuarios?email=" + this.email
        );
        if (res.data.length === 0) {
          this.error = "Credenciales incorrectas";
        } else {
          const usuario = res.data[0];
          localStorage.setItem("nombre", usuario.nombre);
          localStorage.setItem("rol", usuario.rol);
          localStorage.setItem("token", "token-falso-falso-falso");

          this.$store.dispatch("setNombre", usuario.nombre);
          this.$store.dispatch("setRol", usuario.rol);
          this.$store.dispatch("setToken", "token-falso-falso-falso");
          this.$router.push("/usuarios");
        }
      } catch (err) {
        console.error(err);
        this.error = "Error al intentar iniciar sesión";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background-color: #fff;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
  font-weight: 700;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #555;
}

input {
  width: 100%;
  padding: 0.65rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.4);
}

button {
  width: 100%;
  padding: 0.75rem 0;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(66, 185, 131, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #36936c;
  box-shadow: 0 8px 20px rgba(54, 147, 108, 0.6);
}

.error {
  color: #e74c3c;
  font-weight: 600;
  margin-top: 1.25rem;
  user-select: none;
}
</style>
