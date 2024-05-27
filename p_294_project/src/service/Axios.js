import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default {
  async login(username, password) {
    await api
      .post(
        '/api/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.data.id)
      })
  },
  async getBooks() {
    return await api.get('/api/books')
  },
  async getBookById(id) {
    return await api.get('/api/books/' + id)
  },
  async postBook(data) {
    return await api.post('/api/books', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  async putBook(id, data) {
    return await api.put('/api/books/' + id, data)
  },
  async deleteBook(id) {
    return await api.delete('/api/books/' + id)
  },
  async getComment() {
    return await api.get('/api/comments')
  },
  async addComment(comment, note, user, book) {
    return await api.post('/api/comments', { comment, note, user, book })
  },
  async getCategories() {
    return await api.get('/api/categorys')
  },
  async getEditorByName(name) {
    const editors = await api.get('/api/editors').then((response) => response.data.data)

    const editor = editors.find((editor) => name == editor.nameEdit)

    return editor.id.toString()
  },
  async getAuthorByName(name) {
    const authors = await api.get('/api/authors').then((response) => response.data.data)

    const author = authors.find((author) => author.firstname + ' ' + author.lastname == name)

    return author.id.toString()
  },
  async getCategoryByName(name) {
    const categories = await api.get('/api/categorys').then((response) => response.data.data)

    const category = categories.find((category) => category.name == name)

    return category.id.toString()
  },
  async getAuthorByNames(authorName) {
    return await api.get('/api/authors?lastname=' + authorName)
  },
  async getEditorByNames(editorName) {
    return await api.get('/api/editors?nameEdit=' + editorName)
  },
  async getBooksWithParams(params) {
    return await api.get('/api/books', { params: params })
  }
}
