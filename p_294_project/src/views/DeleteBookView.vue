<template>
  <div>
    <!-- Textarea pour saisir l'ID du livre -->
    <textarea v-model="user.id" placeholder="supprime ou je te supprime"></textarea>
    <button @click="deleteBook">Clique ou je te clique</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/service/Axios.js'

let user = ref({ id: null })

async function deleteBook() {
  await api.deleteBook(user.value.id)
}
</script>
