<template>
  <div class="addBook">
    <form @submit.prevent="onSubmit">
      <!-- Pour le titre -->
      <label for="titre">Titre du livre :</label> <br />
      <input type="text" name="titre" id="titre" v-model="titre" maxlength="60" /> <br />

      <!-- Pour les catégories -->
      <label for="categorie">La catégorie :</label> <br />
      <select name="categorie" id="categorie" v-model="categorie">
        <option value=""></option>
        <option value="Bande dessinée">Bande dessinée</option>
        <option value="Manga">Manga</option>
        <option value="Roman">Roman</option>
        <option value="Livre">Livre</option>
      </select>
      <br />

      <!-- Pour le nombre de pages -->
      <label for="nmbPage">Nombre de Page :</label> <br />
      <input
        type="number"
        name="nmbPage"
        id="nmbPage"
        v-model.number="nmbPage"
        min="1"
        oninput="if (this.value.length > 5) {
          this.value = this.value.slice(0, 5)
        }"
      />
      <br />

      <!-- Pour un extrait -->
      <label for="extrait">Extrait :</label> <br />
      <input type="file" name="extrait" id="extrait" accept=".pdf" /> <br />

      <!-- Un résumé de l'ouvrage -->
      <label for="resume">Résumé de l'ouvrage</label> <br />
      <textarea name="resume" id="resume" cols="40" rows="5" v-model="resume"></textarea>
      <br />

      <!-- Le nom et le prénom de l'écrivain -->
      <label for="nomAuteur">Nom de l'auteur :</label> <br />
      <input type="text" name="nomAuteur" id="nomAuteur" v-model="nomAuteur" /> <br />

      <label for="prenomAuteur">Prénom de l'auteur :</label> <br />
      <input type="text" name="prenomAuteur" id="prenomAuteur" v-model="prenomAuteur" /> <br />

      <!-- Le nom de l'éditeur -->
      <label for="nomEditeur">Nom de l'éditeur :</label> <br />
      <input type="text" name="nomEditeur" id="nomEditeur" v-model="nomEditeur" /> <br />

      <!-- L'année de l'édition -->
      <label for="anneeEdition">Année de l'édition :</label> <br />
      <input
        type="number"
        name="anneeEdition"
        id="anneeEdition"
        v-model.number="anneeEdition"
        min="1900"
        oninput="if (this.value.length > 4) {
          this.value = this.value.slice(0, 4)
        }"
      />
      <br />

      <!-- Image de couverture -->
      <label for="image">Image de la couverture :</label> <br />
      <input
        type="file"
        name="image"
        id="image"
        accept=".avif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .webp, .bmp, .ico, .cur"
      />
      <br />

      <!-- Bouton pour submit le form -->
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'

let titre = ''
let categorie = ''
let nmbPage = ''
let resume = ''
let nomAuteur = ''
let prenomAuteur = ''
let nomEditeur = ''
let anneeEdition = ''

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDEzNzYyOSwiZXhwIjoxNzQ1Njk1MjI5fQ.vRalmBymJvo8HAEe5JSgMdl_O-tRNuot2YjS-LXW4HI'

async function getBook() {
  return await axios
    .get('http://localhost:3000/api/books', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response)
}

async function onSubmit() {
  let book = {
    titre: titre,
    categorie: categorie,
    nmbPage: nmbPage,
    resume: resume,
    nomAuteur: nomAuteur,
    prenomAuteur: prenomAuteur,
    nomAuteur: nomAuteur,
    nomEditeur: nomEditeur,
    anneeEdition: anneeEdition
  }

  const data = await (await getBook()).data.data

  if (book.titre == '') {
    alert(`The input titre du livre cannot be empty`)
  } else if (book.categorie == '') {
    alert(`The input catégorie cannot be empty`)
  } else if (book.nmbPage == '') {
    alert(`The input nombre de page cannot be empty`)
  } else if (book.resume == '') {
    alert(`The input resume cannot be empty`)
  } else if (book.nomAuteur == '') {
    alert(`The input nom de l'auteur cannot be empty`)
  } else if (book.nomEditeur == '') {
    alert(`The input nom de l'éditeur cannot be empty`)
  } else if (book.prenomAuteur == '') {
    alert(`The input prénom de l'auteur cannot be empty`)
  } else if (book.resume == '') {
    alert(`The input resume cannot be empty`)
  } else if (book.anneeEdition == '') {
    alert(`The input annee de l'édition cannot be empty`)
  }
}
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
  margin-bottom: 10px;
}

input:invalid,
select:invalid,
textarea:invalid {
  border-color: red;
}
</style>
