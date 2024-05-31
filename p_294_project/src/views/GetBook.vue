<template>
  <div class="GetBook">
    <div class="form-container">
      <form @submit.prevent="onSubmit" class="search-form">
        <!-- Champ principal -->
        <label for="titre">Titre du livre :</label> <br />
        <input type="text" name="titre" id="titre" v-model="titre" /> <br />

        <!-- Bouton pour afficher/masquer les autres champs -->
        <button type="button" @click="toggleFields" class="toggle-button">
          {{ showFields ? 'Masquer les autres champs' : 'Afficher les autres champs' }}
        </button>

        <!-- Champs supplémentaires -->
        <div v-show="showFields" class="additional-fields">
          <label for="categoryName">La catégorie :</label> <br />
          <input type="text" name="categoryName" id="categoryName" v-model="categoryName" />
          <br />

          <label for="nmbPage">Nombre de Page :</label> <br />
          <input type="number" name="nmbPage" id="nmbPage" v-model.number="nmbPage" /> <br />

          <label for="nomAuteur">Nom de l'auteur :</label> <br />
          <input type="text" name="nomAuteur" id="nomAuteur" v-model="nomAuteur" /> <br />

          <label for="prenomAuteur">Prénom de l'auteur :</label> <br />
          <input type="text" name="prenomAuteur" id="prenomAuteur" v-model="prenomAuteur" /> <br />

          <label for="nomEditeur">Nom de l'éditeur :</label> <br />
          <input type="text" name="nomEditeur" id="nomEditeur" v-model="nomEditeur" /> <br />

          <label for="anneeEdition">Année de l'édition :</label> <br />
          <input
            type="number"
            name="anneeEdition"
            id="anneeEdition"
            v-model.number="anneeEdition"
          />
          <br />
        </div>

        <br />

        <!-- Bouton de soumission -->
        <input type="submit" value="Submit" class="submit-button" />
      </form>
    </div>
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
import api from '@/service/Axios.js'
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
const showFields = ref(false)
function toggleFields() {
  showFields.value = !showFields.value
}

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
    const response = await api.getBooksWithParams(params)
    books.value = response.data.books.filter((book) => book !== null) || []
    console.log('Livres trouvés:', books.value)
  } catch (error) {
    console.error('Erreur lors de la recherche des livres:', error)
  }
}

async function fetchBookById(id) {
  try {
    const response = await api.getBookById(id)
    bookDetails.value = response.data.book
    console.log('Détails du livre:', bookDetails.value)
    showModal.value = true
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre:', error)
  }
}

async function onSubmit() {
  await fetchBooks()
}

async function selectBook(id) {
  await fetchBookById(id)
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
    await api.deleteBook(id)
    books.value = books.value.filter((book) => book.id !== id)
    closeModal()
    showConfirmDialog.value = false
  } catch (error) {
    console.error('Erreur lors de la suppression du livre:', error)
  }
}

async function addComment(bookId) {
  try {
    const response = await api.addComment(
      comment.value,
      note.value,
      localStorage.getItem('userId'),
      bookId
    )
    console.log('Commentaire ajouté:', response.data)
    await fetchBookById(bookId)
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
</script>

<style>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.search-form input[type='text'],
.search-form input[type='number'],
.search-form input[type='submit'],
.search-form button.toggle-button {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.search-form input[type='text']:focus,
.search-form input[type='number']:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
  outline: none;
}

.search-form input[type='submit'],
.search-form button.toggle-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-form input[type='submit']:hover,
.search-form button.toggle-button:hover {
  background-color: #0056b3;
}

.additional-fields {
  margin-top: 20px;
}

p {
  color: black;
}
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
