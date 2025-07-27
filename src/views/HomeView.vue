<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Bienvenido al Gestor Literario</h1>
      <p>
        Explora y administra tu colección de libros y autores con facilidad.
      </p>
      <img
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
        alt="Libros"
      />
    </div>
  </section>

  <section id="features">
    <h2>Nuestras funcionalidades</h2>
    <div class="cards">
      <div class="card card-small">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80"
          alt="Gestionar libros"
        />
        <div class="card-content">
          <h3>Gestionar Libros</h3>
          <p>
            Agrega, edita o elimina libros para mantener tu biblioteca
            organizada.
          </p>
        </div>
      </div>

      <div class="card card-small">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80"
          alt="Administrar autores"
        />
        <div class="card-content">
          <h3>Administrar Autores</h3>
          <p>
            Registra y edita información de autores y vincúlalos a sus libros.
          </p>
        </div>
      </div>

      <div class="card card-small">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80"
          alt="Buscar y filtrar"
        />
        <div class="card-content">
          <h3>Buscar y Filtrar</h3>
          <p>
            Encuentra libros por título o filtra por autor y género rápidamente.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="about">
    <h2>Sobre este proyecto</h2>
    <p>
      Este sistema fue desarrollado como proyecto educativo para manejar CRUDs,
      relaciones entre entidades, y uso de Vue.js con JSON Server. Ideal para
      gestionar bibliotecas pequeñas o colecciones personales.
    </p>
  </section>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.hero {
  background: linear-gradient(90deg, #4a90e2, #50e3c2);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero-content {
  max-width: 600px;
}

.hero img {
  max-width: 350px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

#features {
  padding: 3rem 2rem;
  background-color: #f9f9f9;
  text-align: center;
}

#features h2 {
  margin-bottom: 2rem;
  color: #333;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: 320px;
  gap: 1.8rem;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.card img {
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.card-content {
  padding: 1rem 1.2rem;
  flex-grow: 1;
  text-align: left;
}

.card-large {
  grid-row: span 2;
}

.card-small {
  grid-row: span 1;
}

#about {
  padding: 3rem 2rem;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  text-align: center;
}
</style>
