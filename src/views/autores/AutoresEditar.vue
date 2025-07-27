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
        <label class="form-label">Nacionalidad *</label>
        <input
          v-model="itemLocal.nacionalidad"
          type="text"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El valor es requerido.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Fecha de Nacimiento *</label>
        <input
          v-model="itemLocal.fechaNacimiento"
          type="date"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El valor es requerido.</div>
      </div>

      <button type="submit" class="btn btn-success">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AutoresEditar",
  data() {
    return {
      title: "Editar autores",
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
    emitir(event) {
      const form = event.target;

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      this.$emit("updated", this.itemLocal);
    },
  },
  computed: {},
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
