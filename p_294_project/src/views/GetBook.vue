<template>
  <div class="GetBook">
    <form @submit.prevent="onSubmit">
      <!-- Pour le titre -->
      <label for="titre">Titre du livre :</label> <br />
      <input type="text" name="titre" id="titre" v-model="titre" />
      <br />

      <!--v-for pour afficher les résultats avec v-on:???="onModification"-->
      <div v-for="sug in suggestion">{{ sug }}</div>

      <!-- Pour les catégories -->

      <label for="categoryName">La catégorie :</label> <br />
      <input type="text" name="categoryName" id="categoryName" v-model="categoryName" />

      <br />

      <!-- Pour le nombre de pages -->
      <label for="nmbPage">Nombre de Page :</label> <br />
      <input type="number" name="nmbPage" id="nmbPage" v-model.number="nmbPage" /> <br />

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
      <input type="number" name="anneeEdition" id="anneeEdition" v-model.number="anneeEdition" />
      <br />

      <br />

      <!-- Bouton pour submit le form -->
      <input type="submit" value="Submit" />
    </form>

    <div v-for="book in filteredBooks" :key="book.id">
      <h3>{{ book.title }}</h3>
      <button @click="selectBook(book.id)">Voir détails</button>
    </div>

    <!-- Fenêtre modale pour afficher les détails du livre -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="bookDetails">
          <h2>{{ bookDetails.title }}</h2>
          <p><strong>Extrait :</strong> {{ bookDetails.extrait }}</p>
          <p><strong>Résumé :</strong> {{ bookDetails.resume }}</p>
          <p><strong>Année :</strong> {{ bookDetails.year }}</p>
          <p><strong>Nombre de pages :</strong> {{ bookDetails.nmbPage }}</p>
          <p>
            <strong>Auteur :</strong>
            {{
              bookDetails.author
                ? bookDetails.author.firstname + ' ' + bookDetails.author.lastname
                : 'N/A'
            }}
          </p>
          <p>
            <strong>Éditeur :</strong>
            {{ bookDetails.editor ? bookDetails.editor.nameEdit : 'N/A' }}
          </p>
          <p>
            <strong>Catégorie :</strong>
            {{ bookDetails.category ? bookDetails.category.name : 'N/A' }}
          </p>
          <img v-if="bookDetails.image" :src="bookDetails.image" alt="Image du livre" />
          <div v-if="bookDetails.comments && bookDetails.comments.length">
            <h3>Commentaires</h3>
            <ul>
              <li v-for="comment in bookDetails.comments" :key="comment.id">
                {{ comment.comment }} - Note: {{ comment.note }}
              </li>
            </ul>
          </div>
          <button @click="confirmDeleteBook(bookDetails.id)">Supprimer</button>
          <button @click="modifyBook(bookDetails.id)">Modifier</button>
          <button @click="showCommentForm = true">Ajouter un commentaire</button>

          <!-- Formulaire d'ajout de commentaire -->
          <div v-if="showCommentForm" class="addReview">
            <form @submit.prevent="addComment(bookDetails.id)">
              <label for="comment">Commentaire :</label> <br />
              <textarea name="comment" id="comment" cols="40" rows="5" v-model="comment"></textarea>
              <br />
              <label for="note">Note</label> <br />
              <select name="note" id="note" v-model="note">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Boîte de dialogue de confirmation -->
    <div v-if="showConfirmDialog" class="confirm-dialog">
      <div class="confirm-dialog-content">
        <p>Êtes-vous sûr de vouloir supprimer ce livre ?</p>
        <button @click="deleteBook(selectedBookId)">Oui</button>
        <button @click="showConfirmDialog = false">Non</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const titre = ref('')
const categoryName = ref('')
const nmbPage = ref('')
const nomAuteur = ref('')
const prenomAuteur = ref('')
const nomEditeur = ref('')
const anneeEdition = ref('')
const selectedBookId = ref('')
const books = ref([])
const bookDetails = ref(null)
const showModal = ref(false)
const showConfirmDialog = ref(false)
const showCommentForm = ref(false)
const comment = ref('')
const note = ref('5')


import api from '@/service/Axios.js'


const filteredBooks = computed(() => books.value.filter((book) => book !== null))

async function fetchBooks() {
  const params = {
    title: titre.value,
    categoryName: categoryName.value,
    nomAuteur: nomAuteur.value,
    prenomAuteur: prenomAuteur.value,
    nomEditeur: nomEditeur.value,
    anneeEdition: anneeEdition.value.toString(),
    nmbPage: nmbPage.value.toString()
  }

  Object.keys(params).forEach((key) => {
    if (params[key] === '') {
      delete params[key]
    }
  })

  try {

    const response = await api.getBooks()
    books = response.data.books || []
    console.log('Livres trouvés:', books)
    return books

  } catch (error) {
    console.error('Erreur lors de la recherche des livres:', error)
  }
}

async function fetchBookById(id) {
  try {

    const response = await api.getBookById(selectedBookId)
    bookDetails = response.data
    console.log('Détails du livre:', bookDetails)
    return bookDetails
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre:', error)
  }
}

async function onSubmit() {
  await fetchBooks()
}

function selectBook(id) {
  fetchBookById(id)
}

function closeModal() {
  showModal.value = false
  showCommentForm.value = false
}

function confirmDeleteBook(id) {
  selectedBookId.value = id
  showConfirmDialog.value = true
}

async function deleteBook(id) {
  try {
    await axios.delete(`http://localhost:3000/api/books/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    books.value = books.value.filter((book) => book.id !== id)
    closeModal()
    showConfirmDialog.value = false
  } catch (error) {
    console.error('Erreur lors de la suppression du livre:', error)
  }
}

async function addComment(bookId) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/comments',
      {
        comment: comment.value,
        note: note.value,
        user: 1, // quentin fini
        book: bookId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('Commentaire ajouté:', response.data)
    fetchBookById(bookId)
    showCommentForm.value = false
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire:", error)
  }
}

function modifyBook(id) {
  if (id) {
    router.push({ name: 'modifyBook', params: { id } })
  } else {
    console.error('ID de livre invalide')
  }
}

async function onModification() {
  suggestion.push('ret')
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

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.confirm-dialog {
  display: block;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  padding-top: 60px;
}

.confirm-dialog-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  text-align: center;
}
</style>
