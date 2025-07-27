<template>
  <h4>{{ title }}</h4>
  <div class="container mt-4">
    <form @submit.prevent="emitir($event)" novalidate>
      <div class="mb-3">
        <label class="form-label">Título *</label>
        <input
          v-model="itemLocal.titulo"
          type="text"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El título es requerido.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Género *</label>
        <input
          v-model="itemLocal.genero"
          type="text"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El género es requerido.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Año de Publicación *</label>
        <input
          v-model="itemLocal.anioPublicacion"
          type="number"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El año de publicación es requerido.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Autor *</label>
        <select v-model="itemLocal.autorId" class="form-select" required>
          <option value="">Seleccione un autor</option>
          <option
            v-for="autor in autoresList"
            :key="autor.id"
            :value="autor.id"
          >
            {{ autor.nombre }}
          </option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un autor.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Usuario *</label>
        <select v-model="itemLocal.usuarioId" class="form-select" required>
          <option value="">Seleccione un usuario</option>
          <option
            v-for="usuario in usuariosList"
            :key="usuario.id"
            :value="usuario.id"
          >
            {{ usuario.nombre }}
          </option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un usuario.</div>
      </div>

      <button type="submit" class="btn btn-success">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LibrosEditar",
  data() {
    return {
      title: "Editar libro",
      itemLocal: { ...this.item },
      autoresList: [],
      usuariosList: [],
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
  },
  created() {
    this.obtenerAutores();
    this.obtenerUsuarios();
  },
  mounted() {},
  updated() {
    // Componente actualizado
  },
  destroyed() {
    // Componente destruido
  },
  methods: {
    // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
    emitir(event) {
      const form = event.target;
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      this.$emit("updated", this.itemLocal);
    },
    obtenerAutores() {
      this.axios
        .get(process.env.VUE_APP_API_URL + "/autores")
        .then((res) => {
          this.autoresList = res.data;
        })
        .catch((err) => console.error("Error al obtener autores:", err));
    },
    obtenerUsuarios() {
      this.axios
        .get(process.env.VUE_APP_API_URL + "/usuarios")
        .then((res) => {
          this.usuariosList = res.data;
        })
        .catch((err) => console.error("Error al obtener usuarios:", err));
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: [],
};
</script>

<style></style>
