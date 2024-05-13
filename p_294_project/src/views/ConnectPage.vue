<template>
  <form method="">
    <label for="username">Nom d'utilisateur :</label> <br />
    <input type="text" name="username" id="username" /><br />

    <label for="password">Mot de passe :</label> <br />
    <input type="password" name="password" id="password" /> <br />

    <input type="submit" value="Submit" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../../service/Axios.js'

let user = ref({ username: null, password: null })

function onSubmit() {
  if (user.value.username.trim().length == 0) {
    alert('Le username est vide.')
    return
  }

  if (user.value.password.trim().length == 0) {
    alert('Le password est vide')
    return
  }

  let token = login(book.value.username, book.value.password)

  user.value.username = ''
  user.value.password = ''
}
</script>
