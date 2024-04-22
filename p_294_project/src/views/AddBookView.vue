<template>
  <div class="addBook">
    <form @submit.prevent="onSubmit">
      <!-- Pour le titre-->
      <label for="titre">Titre du livre :</label> <br />
      <input type="text" name="titre" id="titre" v-model="titre" /> <br />
      <!-- Pour les catégories-->
      <label for="categorie">La catégorie :</label> <br />
      <select name="categorie" id="categorie">
        <option value=""></option>
        <option value="Bande dessinée">Bande dessinée</option>
        <option value="Manga">Manga</option>
        <option value="Roman">Roman</option>
        <option value="Livre">Livre</option>
      </select>
      <br />
      <!-- Pour le nombre de pages -->
      <label for="nmbPage">Nombre de Page :</label> <br />
      <input type="number" name="nmbPage" id="nmbPage" v-model.number="nmbPage" /> <br />
      <!-- Pour un extrait -->
      <label for="extrait">Extarit :</label> <br />
      <input type="file" name="extrait" id="extrait" /> <br />
      <!-- Un résumé de l'ouvrage -->
      <label for="resume">Résumé de l'ouvrage</label> <br />
      <textarea name="resume" id="resume" cols="40" rows="5" v-model="resume"></textarea>
      <br />
      <!-- Le nom et le prénom de l'écrivain-->
      <label for="nomAuteur">Nom de l'auteur :</label> <br />
      <input type="text" name="nomAuteur" id="nomAuteur" v-model="nomAuteur" /> <br />

      <label for="prenomAuteur">Prénom de l'auteur :</label> <br />
      <input type="text" name="prenomAuteur" id="prenomAuteur" v-model="prenomAuteur" /> <br />
      <!-- Le nom de l'éditeur -->
      <label for="nomEditeur">Nom de l'éditeur :</label> <br />
      <input type="text" name="nomEditeur" id="nomEditeur" v-model="nomEditeur" /> <br />
      <!-- L'année de l'édition -->
      <label for="anneeEdition">Année de l'édition :</label> <br />
      <input type="number" name="anneeEdition" id="anneeEdition" v-model.number="anneeEdition" />
      <br />
      <!-- Image de couverture-->
      <label for="image">Image de la couverture :</label> <br />
      <input type="file" name="image" id="image" /> <br />

      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup>
let titre = ''
let nmbPage = ''
let resume = ''
let nomAuteur = ''
let prenomAuteur = ''
let nomEditeur = ''
let anneeEdition = ''

function onSubmit() {
  let book = {
    title: titre,
    extrait: 'Hello',
    year: anneeEdition,
    editor: 1,
    image: 'An url',
    resume: resume,
    created: new Date()
  }

  // addBook(book, 'http://localhost:3000/api/')

  titre = ''
  nmbPage = ''
  resume = ''
  nomAuteur = ''
  prenomAuteur = ''
  nomEditeur = ''
  anneeEdition = ''
}

/*async function addBook(book: { title: string; extrait: string; year: string; editor: number; image: string; resume: string; created: Date }, BASE_URL: string) {
  await fetch(`${BASE_URL}books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 123'
    },
    body: JSON.stringify(book)
  })
    .then(async (response) => await response.json())
    .then((data) => alert(data))
    .catch((error) => console.log(error))
}*/
</script>

<style>
form {
  max-width: 500px;
  margin: 0 auto;
}

label {
  font-weight: bold;
}

input[type='text'],
input[type='number'],
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

select {
  width: calc(100% - 2px);
}

textarea {
  resize: vertical;
}

input[type='submit'] {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

input[type='submit']:hover {
  background-color: #45a049;
}

input[type='file'] {
  margin-top: 5px;
}

input:invalid,
select:invalid,
textarea:invalid {
  border-color: red;
}
</style>
