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

    <input
      type="text"
      v-model="textoBuscar"
      placeholder="Buscar por título"
      class="form-control mb-3"
    />

    <select v-model="generoSeleccionado" class="form-select mb-3">
      <option value="">Todos los géneros</option>
      <option v-for="gen in generosUnicos" :key="gen" :value="gen">
        {{ gen }}
      </option>
    </select>

    <div class="table-responsive shadow-sm rounded">
      <table class="table table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Género</th>
            <th scope="col">Año Publicación</th>
            <th scope="col">Autor ID</th>
            <th scope="col">Usuario ID</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in librosFiltrados" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.titulo }}</td>
            <td>{{ item.genero }}</td>
            <td>{{ item.anioPublicacion }}</td>
            <td>{{ item.autorId }}</td>
            <td>{{ item.usuarioId }}</td>
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
          <tr v-if="librosFiltrados.length === 0">
            <td colspan="7" class="text-center">No hay libros disponibles.</td>
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
              {{ modalMode === "crear" ? "Crear Libro" : "Editar Libro" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <libros-crear
              v-if="modalMode === 'crear'"
              @created="nuevo($event)"
            />
            <libros-editar
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
import LibrosCrear from "./LibrosCrear.vue";
import LibrosEditar from "./LibrosEditar.vue";
export default {
  name: "LibrosList",
  components: {
    LibrosCrear,
    LibrosEditar,
  },
  data() {
    return {
      title: "Libros",
      items: [],
      modalBootstrapInstance: null,
      modalMode: "crear",
      itemSeleccionado: null,
      textoBuscar: "",
      generoSeleccionado: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.modalRef) {
        this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
      } else {
        console.error("No se encontró el ref modalRef");
      }
    });
    this.obtenerLista();
  },
  methods: {
    obtenerLista() {
      this.axios
        .get(process.env.VUE_APP_API_URL + "/libros")
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
      this.axios
        .post(process.env.VUE_APP_API_URL + "/libros", value)
        .then(() => {
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
        .patch(process.env.VUE_APP_API_URL + "/libros/" + value.id, value)
        .then(() => {
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
          .delete(process.env.VUE_APP_API_URL + "/libros/" + value.id)
          .then(() => {
            this.obtenerLista();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  computed: {
    generosUnicos() {
      const generos = this.items.map((libro) => libro.genero);
      return [...new Set(generos)];
    },
    librosFiltrados() {
      let resultado = this.items;

      if (this.generoSeleccionado) {
        resultado = resultado.filter(
          (libro) => libro.genero === this.generoSeleccionado
        );
      }

      if (this.textoBuscar) {
        const texto = this.textoBuscar.toLowerCase();
        resultado = resultado.filter((libro) =>
          libro.titulo.toLowerCase().includes(texto)
        );
      }

      return resultado;
    },
  },
};
</script>

<style></style>
