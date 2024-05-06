<template>
  <div class="addBook">
    <form @submit.prevent="onSubmit">
      <!-- Pour le titre -->
      <label for="titre">Titre du livre :</label> <br />
      <input type="text" name="titre" id="titre" v-model="book.titre" maxlength="60" /> <br />

      <!-- Pour les catégories -->
      <label for="categorie">La catégorie :</label> <br />
      <select name="categorie" id="categorie" v-model="book.categorie">
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
        v-model.number="book.nmbPage"
        oninput="
        if (this.value.length > 4) {
          this.value = this.value.slice(0, 4)
        }
        if (parseInt(this.value) <= 0) {
          this.value = 1
        }"
      />
      <br />

      <!-- Pour un extrait -->
      <label for="extrait">Extrait :</label> <br />
      <input type="url" name="extrait" id="extrait" v-model="book.extrait" /> <br />

      <!-- Un résumé de l'ouvrage -->
      <label for="resume">Résumé de l'ouvrage</label> <br />
      <textarea
        name="resume"
        id="resume"
        cols="40"
        rows="5"
        v-model="book.resume"
        maxlength="1024"
      ></textarea>
      <br />

      <!-- Le nom et le prénom de l'écrivain -->
      <label for="nomAuteur">Nom de l'auteur :</label> <br />
      <input type="text" name="nomAuteur" id="nomAuteur" v-model="book.nomAuteur" /> <br />

      <label for="prenomAuteur">Prénom de l'auteur :</label> <br />
      <input type="text" name="prenomAuteur" id="prenomAuteur" v-model="book.prenomAuteur" />
      <br />

      <!-- Le nom de l'éditeur -->
      <label for="nomEditeur">Nom de l'éditeur :</label> <br />
      <input type="text" name="nomEditeur" id="nomEditeur" v-model="book.nomEditeur" /> <br />

      <!-- L'année de l'édition -->
      <label for="anneeEdition">Année de l'édition :</label> <br />
      <input
        type="number"
        name="anneeEdition"
        id="anneeEdition"
        v-model="book.anneeEdition"
        oninput="
        if (this.value.length > 4) {
          this.value = this.value.slice(0, 4)
        }
        if (this.value <= 0) {
          this.value = 1
        }"
      />
      <br />

      <!-- Image de couverture -->
      <label for="image">Image de la couverture :</label> <br />
      <input type="file" name="image" id="image" accept=".jpg, .png" @change="handleImage" />
      <br />

      <!-- Bouton pour submit le form -->
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup>
import axios, { formToJSON } from 'axios'
import { ref } from 'vue'

let book = ref({
  titre: '',
  categorie: '',
  nmbPage: null,
  resume: '',
  nomAuteur: '',
  prenomAuteur: '',
  nomEditeur: '',
  anneeEdition: null,
  image: null,
  extrait: null
})

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDEzNzYyOSwiZXhwIjoxNzQ1Njk1MjI5fQ.vRalmBymJvo8HAEe5JSgMdl_O-tRNuot2YjS-LXW4HI'

function handleImage(e) {
  let file = e.target.files[0]
  let accceptedType = ['image/png', 'image/jpg']

  if (!accceptedType.includes(file.type)) {
    alert('The wrong type of image is choose')
    return
  }
  book.value.image = file
}

async function getCategoryByName(name) {
  const response = await axios.get('http://localhost:3000/api/categorys', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const categories = response.data.data

  for (const categ of categories) {
    if (categ.name == name) {
      return categ.id.toString()
    }
  }
}

async function getEditorByName(name) {
  const response = await axios.get('http://localhost:3000/api/editors', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const editors = response.data.data

  for (const edit of editors) {
    if (edit.nameEdit == name) {
      return edit.id.toString()
    }
  }
}

async function getAuthorByName(firstname, lastname) {
  const response = await axios.get('http://localhost:3000/api/authors', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const authors = response.data.data

  for (const auth of authors) {
    if (auth.firstname == firstname && auth.lastname == lastname) {
      return auth.id.toString()
    }
  }
}

async function postBook(form) {
  return await axios
    .post('http://localhost:3000/api/books', formToJSON(form), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.data)
}

async function onSubmit() {
  book.value.nmbPage = book.value.nmbPage.toString()
  book.value.anneeEdition = book.value.anneeEdition.toString()

  if (book.value.titre.trim().length == 0) {
    alert(`The input titre du livre cannot be empty`)
    return
  } else if (book.value.categorie.trim().length == 0) {
    alert(`The input catégorie cannot be empty`)
    return
  } else if (book.value.nmbPage.trim().length == 0) {
    alert(`The input nombre de page cannot be empty`)
    return
  } else if (book.value.extrait.trim().length == 0) {
    alert(`The input extrait cannot be empty`)
    return
  } else if (book.value.resume.trim().length == 0) {
    alert(`The input resume cannot be empty`)
    return
  } else if (book.value.nomAuteur.trim().length == 0) {
    alert(`The input nom de l'auteur cannot be empty`)
    return
  } else if (book.value.nomEditeur.trim().length == 0) {
    alert(`The input nom de l'éditeur cannot be empty`)
    return
  } else if (book.value.prenomAuteur.trim().length == 0) {
    alert(`The input prénom de l'auteur cannot be empty`)
    return
  } else if (book.value.anneeEdition.trim().length == 0) {
    alert(`The input annee de l'édition cannot be empty`)
    return
  }

  let authorId = await getAuthorByName(book.value.prenomAuteur, book.value.nomAuteur)

  let editorId = await getEditorByName(book.value.nomEditeur)

  let categoryId = await getCategoryByName(book.value.categorie)

  book.value.extrait = book.value.extrait.toString()

  if (authorId == undefined) {
    alert(`L'auteur n'existe pas`)
    return
  }

  if (editorId == undefined) {
    alert(`L'éditeur n'existe pas`)
    return
  }

  let form = new FormData()

  form.set('title', book.value.titre.trimStart().trimEnd())
  form.set('category', parseInt(categoryId.trimStart().trimEnd()))
  form.set('nmbPage', parseInt(book.value.nmbPage.trimStart().trimEnd()))
  form.set('extrait', book.value.extrait.trimStart().trimEnd())
  form.set('resume', book.value.resume.trimStart().trimEnd())
  form.set('author', parseInt(authorId.trimStart().trimEnd()))
  form.set('editor', parseInt(editorId.trimStart().trimEnd()))
  form.set("annee de l'edition", parseInt(book.value.anneeEdition.trimStart().trimEnd()))
  form.set('image', book.value.image)

  postBook(form)

  book.value.titre = ''
  book.value.categorie = ''
  book.value.nmbPage = ''
  book.value.resume = ''
  book.value.nomAuteur = ''
  book.value.prenomAuteur = ''
  book.value.nomEditeur = ''
  book.value.anneeEdition = ''
  book.value.image = null
  book.value.extrait = ''
}
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}

label {
  font-weight: bold;
}

input[type='text'],
input[type='number'],
input[type='date'],
input[type='url'],
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
