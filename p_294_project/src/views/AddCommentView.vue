<template>
  <div class="addReview">
    <form @submit.prevent="onSubmit">
      <!-- Un résumé de l'ouvrage -->
      <label for="comment">Commentaire :</label> <br />
      <textarea
        placeholder="Ajouter un commentaire"
        name="comment"
        id="comment"
        cols="40"
        rows="5"
        v-model="comments.comment"
      ></textarea>
      <br />

      <!-- Pour les catégories -->
      <label for="note">Note</label> <br />
      <select name="note" id="note" v-model="comments.note">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br />

      <!-- Bouton pour submit le form -->
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup>
import api from '@/service/Axios.js'
import { ref } from 'vue'

let comments = ref({
  comment: '',
  note: 5,
  user: 1,
  book: 1
})

async function onSubmit() {
  if (comments.comment == '') {
    alert(`The input titre du livre cannot be empty`)
  } else if (comments.note == '') {
    alert(`The input catégorie cannot be empty`)
  }

  await api.addComment(
    comments.value.comment,
    comments.value.note,
    comments.value.user,
    comments.value.book
  )
  comments.value.comment = ''
  comments.value.note = '5'
}
</script>
