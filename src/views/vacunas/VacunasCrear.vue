<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form v-if="mascotasList.length > 0 && usuariosList.length > 0" @submit.prevent="emitir($event)" novalidate>

            <div class="mb-3">
                <label class="form-label">Mascota *</label>
                <select v-model="item.mascotaId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in mascotasList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Veterinario *</label>
                <select v-model="item.usuarioId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in usuariosList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Fecha *</label>
                <input v-model="item.fecha" type="date" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Tipo *</label>
                <select v-model="item.tipo" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in tiposList" :key="index" :value="value">{{ value }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>


            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'ConsultasCrear',
    data() {
        return {
            title: 'Agregar consulta',
            item: {},
            mascotasList: [],
            usuariosList: [],
            tiposList:[
                "Rabia",
                "Parvovirus",
                "Leucemia felina"
            ]
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
    },
    created() {
        // Componente creado
    },
    mounted() {
        // Componente montado
        this.obtenerMascotas();
        this.obtenerUsuarios();
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

            // Si no es válido, muestra los errores con Bootstrap
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            // Si es válido, puedes enviar los datos
            this.$emit('created', this.item);
        },
        obtenerMascotas() {
            this.axios.get(process.env.VUE_APP_API_URL + '/mascotas')
                .then((response) => {
                    this.mascotasList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        obtenerUsuarios() {
            this.axios.get(process.env.VUE_APP_API_URL + '/usuarios?rol=veterinario')
                .then((response) => {
                    this.usuariosList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>