<template>
  <div class="container mt-2">
    <form @submit.prevent="emitir($event)" novalidate>
      <div class="mb-3">
        <label class="form-label">Nombre *</label>
        <input
          v-model="itemLocal.nombre"
          type="text"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El valor es requerido.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Rol *</label>
        <select v-model="itemLocal.rol" class="form-select" required>
          <option value="">Seleccione</option>
          <option value="veterinario">veterinario</option>
          <option value="recepcion">recepcion</option>
          <option value="administrador">administrador</option>
        </select>
        <div class="invalid-feedback">El valor es requerido.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email *</label>
        <input
          v-model="itemLocal.email"
          type="email"
          class="form-control"
          required
        />
        <div class="invalid-feedback">
          El valor es requerido, o no tiene el formato.
        </div>
      </div>

      <button type="submit" class="btn btn-success">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "UsuariosEditar",
  data() {
    return {
      title: "Editar usuario",
      itemLocal: { ...this.item },
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
  },
  created() {
    // Componente creado
  },
  mounted() {
    // Componente montado
  },
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
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
  },
  props: {
    // propiedades que el componente puede recibir.
    item: {
      type: Object,
      required: true,
    },
  },
  emits: [],
};
</script>

<style></style>
