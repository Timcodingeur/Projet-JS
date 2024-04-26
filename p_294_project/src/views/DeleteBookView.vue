<template>
  <div class="addBook">
    <form @submit.prevent="onSubmit">
      <input type="text" name="text" class="search" placeholder="Recherchez ici!" /> <br />
      <label for="titre">Titre du livre :</label> <br />
      <input type="text" name="titre" id="titre" v-model="titre" /> <br />

      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup>
let titre = ''

function checkForm() {
  //detecter que ce que le user a chercher fait pas trops de caractère
  
}

function onSubmit() {
  let book = {
    title: titre,
    created: new Date()
  }

  titre = ''
}
//faire un delet (pour supp le livre)
//

</script>
