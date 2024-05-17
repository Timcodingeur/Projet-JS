<template>
  <div class="addReview">
    <form @submit.prevent="onSubmit">
      <!-- Un résumé de l'ouvrage -->
      <label for="comment">Commentaire :</label> <br />
      <textarea name="comment" id="comment" cols="40" rows="5" v-model="comment"></textarea>
      <br />

      <!-- Pour les catégories -->
      <label for="note">Note</label> <br />
      <select name="note" id="note" v-model="note">
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

let comment = ''
let note = '5'

async function onSubmit() {
  let comments = {
    comment: comment,
    note: note,
    user: 1,
    book: 1
  }

  if (comments.comment == '') {
    alert(`The input titre du livre cannot be empty`)
  } else if (comments.note == '') {
    alert(`The input catégorie cannot be empty`)
  }

  await api.addComment()
}
</script>
