<script setup>
import { onMounted, ref } from 'vue'
import api from '@/service/Axios.js'

const recentBooks = ref(null)

onMounted(async () => {
  let books = await api
    .getBooks()
    .then((response) => response.data.books)
    .catch((error) => console.log('Please log in before'))

  if (books.length <= 5) {
    recentBooks.value = books
    return
  }

  const sortedBooks = books.sort((a, b) => new Date(b.created) - new Date(a.created))
  recentBooks.value = sortedBooks.slice(0, 5)
})
</script>

<template>
    <p>
        Passion-lecture est un site web dédié à la sauvegarde et à la préservation des livres numériques. 
        Ce portail offre une plateforme sécurisée où les utilisateurs peuvent stocker, organiser et accéder à leurs collections de livres électroniques. 
        Grâce à des technologies de pointe en matière de sauvegarde et de cryptage, Passion-lecture garantit que chaque livre est protégé contre les pertes de données et les accès non autorisés.
    </p>
    <div style="display: flex">
        <div v-for="book in recentBooks" :key="book.id">
            <h3>{{ book.title }}</h3>
            <img :src="book.image" style="width: 200px; height: 300px; margin-right: 10px;"></img>
        </div>
  </div>
</template>
