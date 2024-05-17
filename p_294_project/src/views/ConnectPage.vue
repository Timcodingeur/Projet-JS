<template>
  <form @submit.prevent="onSubmit">
    <label for="username">Nom d'utilisateur :</label> <br />
    <input type="text" name="username" id="username" v-model="user.username" /><br />

    <label for="password">Mot de passe :</label> <br />
    <input type="password" name="password" id="password" v-model="user.password" /> <br />

    <input type="submit" value="Submit" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/service/Axios.js'

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

  api.login(user.value.username, user.value.password)

  user.value.username = ''
  user.value.password = ''
}
</script>
