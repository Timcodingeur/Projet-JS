<template>
  <div class="modifyBook">
    <h2>Modifier le livre</h2>
    <form @submit.prevent="onSubmit">
      <!-- Titre -->
      <label for="title">Titre :</label>
      <input type="text" id="title" v-model="book.title" />

      <!-- Auteur -->
      <label for="author">Auteur :</label>
      <input type="text" id="author" v-model="authorName" @input="fetchAuthors" list="authors" />
      <datalist id="authors">
        <option v-for="author in authors" :key="author.id" :value="author.lastname">
          {{ author.firstname }}
        </option>
      </datalist>

      <!-- Éditeur -->
      <label for="editor">Éditeur :</label>
      <input type="text" id="editor" v-model="editorName" @input="fetchEditors" list="editors" />
      <datalist id="editors">
        <option v-for="editor in editors" :key="editor.id" :value="editor.nameEdit"></option>
      </datalist>

      <!-- Catégorie -->
      <label for="category">Catégorie :</label>
      <input type="text" id="category" v-model="categoryName" />

      <!-- Année -->
      <label for="year">Année :</label>
      <input type="number" id="year" v-model="book.year" />

      <!-- Nombre de pages -->
      <label for="nmbPage">Nombre de pages :</label>
      <input type="number" id="nmbPage" v-model="book.nmbPage" />

      <!-- Bouton pour submit le form -->
      <input type="submit" value="Modifier" />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const bookId = route.params.id
const book = ref({})
const authors = ref([])
const editors = ref([])
const authorName = ref('')
const authorId = ref(null)
const editorName = ref('')
const editorId = ref(null)
const categoryName = ref('')
const categoryId = ref(null)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcxNDEzOTA2MywiZXhwIjoxNzQ1Njk2NjYzfQ.Jij32qCOGqXA8YrWYe-De22vMJwo9f1eEfPu8JFu920'

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/books/${bookId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    book.value = response.data.book
    if (response.data.book.author) {
      authorName.value = response.data.book.author.lastname
      authorId.value = response.data.book.author.id
    }
    if (response.data.book.editor) {
      editorName.value = response.data.book.editor.nameEdit
      editorId.value = response.data.book.editor.id
    }
    if (response.data.book.category) {
      categoryName.value = response.data.book.category.name
      categoryId.value = response.data.book.category.id
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du livre:', error)
  }
})

async function fetchAuthors() {
  if (authorName.value.length < 2) return
  try {
    const response = await axios.get(
      `http://localhost:3000/api/authors?lastname=${authorName.value}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    authors.value = response.data.data
  } catch (error) {
    console.error('Erreur lors de la récupération des auteurs:', error)
  }
}

async function fetchEditors() {
  if (editorName.value.length < 2) return
  try {
    const response = await axios.get(
      `http://localhost:3000/api/editors?nameEdit=${editorName.value}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    editors.value = response.data.data
  } catch (error) {
    console.error('Erreur lors de la récupération des éditeurs:', error)
  }
}

async function onSubmit() {
  try {
    const updatedBook = {
      ...book.value,
      author: authorId.value,
      editor: editorId.value,
      category: categoryId.value
    }

    console.log('Données envoyées:', updatedBook)

    await axios.put(`http://localhost:3000/api/books/${bookId}`, updatedBook, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    alert('Le livre a été modifié avec succès')
    router.push({ name: 'getBookByCategory' })
  } catch (error) {
    console.error('Erreur lors de la modification du livre:', error)
  }
}
</script>

<style>
.modifyBook {
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
</style>
