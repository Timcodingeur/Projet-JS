<template>
  <div class="SeeBooks">
    <button v-on:click="getallbook">See Books</button>
    <div v-for="(ABook, index) in bookdisplay" v-bind:key="index">
      <img v-bind:src="ABook.image" />
      <h1>{{ ABook.title }}</h1>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect } from 'vue'
import {
  getBooks,
  DeleteBook,
  AddComment,
  getCategories,
  getEditorByName,
  getAuthorByName,
  postBook
} from '../../service/Axios'

let bookdisplay = ref([])

async function getallbook() {
  let responce = await getBooks()
  let responce2 = responce.data.books
  bookdisplay.value = responce2
  console.log(bookdisplay)
}
</script>

<style scoped>
button {
  width: 100px;
  height: 20px;
}

img {
  max-width: 20%;
  height: auto;
}
</style>
