import axios from 'axios'

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDEzNzYyOSwiZXhwIjoxNzQ1Njk1MjI5fQ.vRalmBymJvo8HAEe5JSgMdl_O-tRNuot2YjS-LXW4HI'

async function getBooks() {
  return await axios.get('http://localhost:3000/api/books', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

async function AddBook(
  titles,
  extraits,
  years,
  editors,
  categorys,
  authors,
  images,
  resumes,
  createds
) {
  return await axios.post(
    'http://localhost:3000/api/books',
    {
      title: titles,
      extrait: extraits,
      year: years,
      editor: editors,
      category: categorys,
      author: authors,
      image: images,
      resume: resumes,
      created: createds
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
}

async function DeleteBook(id) {
  return await axios.delete(
    'http://localhost:3000/api/books',
    {
      id: id
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
}

async function AddComment(comment, note, user, book) {
  return await axios.post(
    'http://localhost:3000/api/comments',
    {
      comment: comment,
      note: note,
      user: user,
      book: book
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
}

async function getCategories() {
  return await axios.get('http://localhost:3000/api/categorys', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

async function getEditorByName() {
  return await axios.get('http://localhost:3000/api/editors', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

async function getAuthorByName() {
  return await axios.get('http://localhost:3000/api/authors', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

async function postBook(data) {
  return await axios.post('http://localhost:3000/api/books', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  getBooks,
  AddBook,
  DeleteBook,
  AddComment,
  getCategories,
  getEditorByName,
  getAuthorByName,
  postBook
}
