<template>
  <form @submit.prevent="onSubmit">
    <label for="username">Nom d'utilisateur :</label> <br />
    <input type="text" name="username" id="username" v-model="book.username" /><br />

    <label for="password">Mot de passe :</label> <br />
    <input type="password" name="password" id="password" v-model="book.password" /> <br />

    <input type="submit" value="Submit" />
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { login } from '../../service/Axios.js'

let book = ref({ username: null, password: null })

let token = ''

function onSubmit() {
  if (book.value.username.trim().length == 0) {
    alert('Le username est vide.')
    return
  }

  if (book.value.password.trim().length == 0) {
    alert('Le password est vide')
    return
  }

  token = login(book.value.username, book.value.password)

  book.value.username = ''
  book.value.password = ''
}
</script>
