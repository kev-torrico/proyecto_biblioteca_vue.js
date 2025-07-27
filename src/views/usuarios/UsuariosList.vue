<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold text-primary m-0">{{ title }}</h2>
      <button
        type="button"
        class="btn btn-primary shadow-sm"
        @click="abrirModalParaCrear()"
      >
        <i class="bi bi-plus-lg me-1"></i> Nuevo
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded">
      <table class="table table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Rol</th>
            <th scope="col">Email</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.rol }}</td>
            <td>{{ item.email }}</td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary me-1"
                @click="abrirModalParaEditar(item)"
                title="Editar"
              >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click="eliminar(item)"
                title="Eliminar"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

   
    <div
      class="modal fade"
      id="modalAutoEditar"
      tabindex="-1"
      aria-labelledby="modalAutoEditarLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary" id="modalAutoEditarLabel">
              {{ modalMode === "crear" ? "Crear Usuario" : "Editar Usuario" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <usuarios-crear
              v-if="modalMode === 'crear'"
              @created="nuevo($event)"
            />
            <usuarios-editar
              v-if="modalMode === 'editar'"
              :item="itemSeleccionado"
              @updated="modificar($event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsuariosCrear from "./UsuariosCrear.vue";
import UsuariosEditar from "./UsuariosEditar.vue";
export default {
  name: "UsuariosList",
  data() {
    return {
      title: " Usuarios",
      items: [],
      modalBootstrapInstance: null,
      modalMode: "crear",
      itemSeleccionado: null,
    };
  },
  components: {
    // Registro de componentes que se utilizaran.
    UsuariosCrear,
    UsuariosEditar,
  },
  created() {
    // Componente creado
  },
  mounted() {
    // Componente montado
    this.$nextTick(() => {
      if (this.$refs.modalRef) {
        this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
      } else {
        console.error("No se encontró el ref modalRef");
      }
    });
    this.obtenerLista();
  },
  updated() {
    // Componente actualizado
  },
  destroyed() {
    // Componente destruido
  },
  methods: {
    // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.

    obtenerLista() {
      this.axios
        .get(process.env.VUE_APP_API_URL + "/usuarios")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    abrirModalParaCrear() {
      this.modalMode = "crear";
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.show();
      } else {
        console.error("modalBootstrapInstance no está inicializado");
      }
    },
    cerrarModal() {
      if (this.modalBootstrapInstance) {
        this.modalBootstrapInstance.hide();
      }
    },
    nuevo(value) {
      console.log("Enviando al backend:", value);
      this.axios
        .post(process.env.VUE_APP_API_URL + "/usuarios", value)
        .then((response) => {
          console.log("Respuesta backend:", response.data);
          this.cerrarModal();
          this.obtenerLista();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    abrirModalParaEditar(item) {
      this.itemSeleccionado = { ...item };
      this.modalMode = "none";
      setTimeout(() => {
        if (this.modalBootstrapInstance) {
          this.modalBootstrapInstance.show();
          this.modalMode = "editar";
        } else {
          console.error("modalBootstrapInstance no está inicializado");
        }
      });
    },
    modificar(value) {
      this.axios
        .patch(process.env.VUE_APP_API_URL + "/usuarios/" + value.id, value)
        .then((response) => {
          this.cerrarModal();
          this.obtenerLista();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    eliminar(value) {
      if (confirm("¿Está seguro de eliminar este ítem?")) {
        this.axios
          .delete(process.env.VUE_APP_API_URL + "/usuarios/" + value.id, value)
          .then((response) => {
            this.obtenerLista();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
  },
  props: {
    // propiedades que el componente puede recibir.
  },
  emits: [], // los eventos personalizados que el componente puede emitir.
};
</script>

<style></style>
