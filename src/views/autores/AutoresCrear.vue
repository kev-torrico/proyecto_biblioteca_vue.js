<template>
  <div class="container mt-2">
    <form @submit.prevent="emitir($event)" novalidate>
      <div class="mb-3">
        <label class="form-label">Nombre *</label>
        <input
          v-model="item.nombre"
          type="text"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El valor es requerido.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Nacionalidad *</label>
        <input
          v-model="item.nacionalidad"
          type="text"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El valor es requerido.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Fecha de Nacimiento *</label>
        <input
          v-model="item.fechaNacimiento"
          type="date"
          class="form-control"
          required
        />
        <div class="invalid-feedback">El valor es requerido.</div>
      </div>

      <button type="submit" class="btn btn-success">
        <i class="bi bi-check-lg me-1"></i> Guardar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AutoresCrear",
  data() {
    return {
      title: "Agregar Autor",
      item: {
        nombre: "",
        nacionalidad: "",
        fechaNacimiento: "",
      },
    };
  },
  methods: {
    emitir(event) {
      const form = event.target;

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      this.$emit("created", this.item);
    },
  },
  emits: ["created"],
};
</script>

<style></style>
