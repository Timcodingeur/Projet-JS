<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="main">
    <div id="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/addBook">Ajouer un livre</RouterLink>
        <RouterLink to="/modifyBook">Modifier un livre</RouterLink>
        <RouterLink to="/deleteBook">Supprimer un livre</RouterLink>
        <RouterLink to="/addComment">Ajouter un commentaire</RouterLink>
        <RouterLink to="/getBook">Rechercher des livres via des paramètres</RouterLink>
      </nav>
    </div>
    <div id="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

#header {
  position: fixed;
  top: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border: 1px solid #a2a2a2;
  background-color: #f4f4f4;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
}

#content {
  margin-top: 5em;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
  #header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  #header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: 1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
