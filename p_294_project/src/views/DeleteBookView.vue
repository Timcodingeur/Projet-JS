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

async function fetchBooks() {
  const params = {
    titre,
    nmbPage,
    nomAuteur,
    prenomAuteur,
    nomEditeur,
    anneeEdition
  }

  Object.keys(params).forEach((key) => params[key] === '' && delete params[key])

  try {
    const response = await axios.get('http://localhost:3000/api/books', {
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Livres trouvés:', response.data)
    return response.data // Ajout de cette ligne pour renvoyer les données
  } catch (error) {
    console.error('Erreur lors de la recherche des livres:', error)
    return null // Renvoyer null ou une valeur par défaut en cas d'erreur
  }
}

//faire un delet (pour supp le livre)
//
</script>
