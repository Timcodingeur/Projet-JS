import express from "express";
import { Author, Book, Category, Editor, Comment } from "../db/sequelize.mjs";
import { sucess } from "./helper.mjs";
import { ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.mjs";

const booksRouter = express();

/**
 * @swagger
 * /api/books/:
 *  get:
 *    tags: [Books]
 *    security :
 *      - bearerAuth: []
 *    summary: Retrieve all books.
 *    description: Retrieve all books. Can be used to populate a select HTML tag.
 *    responses:
 *      200:
 *        description: All books
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  propreties:
 *                    id:
 *                      type: integer
 *                      description: The book ID.
 *                      example: 1
 *                    title:
 *                      type: string
 *                      description: The book's title.
 *                      example: OnePiece n°1
 *                    extrait:
 *                      type: string
 *                      description: A extract of the book.
 *                      example: Je deviendrais le rois des pirate
 *                    year:
 *                      type: date
 *                      format: date-time
 *                      description: The book's creation date.
 *                      example: null
 *                    editor:
 *                      type: integer
 *                      description: The book's editor ID.
 *                      example: 2
 *                    category:
 *                      type: integer
 *                      description: The book's category ID.
 *                      example: 1
 *                    image:
 *                      type: string
 *                      description: The book's image url.
 *                      example: https://github.com/Timcodingeur/Projet-JS/blob/main/Image/Image-Books/OnePiece1.jpg
 *                    resume:
 *                      type: string
 *                      description: The book's resume
 *                      example: Luffy, un garçon espiègle, rêve de devenir le roi des pirates en trouvant le “One Piece”, un fabuleux trésor. Seulement, Luffy a avalé un fruit du démon qui l'a transformé en homme élastique.
 */
booksRouter.get("/", auth, (req, res) => {
  if (req.query.title) {
    if (req.query.title.length < 4) {
      const message = `Le terme de la recherche doit contenir au moins 4 caractères`;
      return res.status(400).json({ message });
    }
    let limit = 6;
    if (req.query.limit) {
      limit = parseInt(req.query.limit, 10);
    }
    return Book.findAll({
      where: { title: { [Op.like]: `%${req.query.title}%` } },
      order: ["title"],
      limit: limit,
    }).then((Books) => {
      const message = `Il y a ${Books.count}  livre qui correspondant au treme de la recherche`;
      res.json(sucess(message, Books));
    });
  }
  Book.findAll({ order: ["title"] })
    .then((Books) => {
      const message = "La liste des livres a bien été récupérée. ";
      res.json(sucess(message, Books));
    })
    .catch((error) => {
      const message =
        "La liste des livres n'a pas été récupéré. Merci de réessayer dans quelque instants.";
      res.status(500).json({ message, data: error });
    });
});
//
//route vers comments
booksRouter.get("/:id/comment", auth, async (req, res) => {
  const bookId = req.params.id;
  Book.findByPk(bookId).then((book) => {
    if (book === null) {
      const message =
        "Le livre demandé n'a pas pu être récupéré. Merci d'essayer un autre identifiant.";
      return res.status(404).json({ message });
    }
    Comment.findAll({
      where: { book: { [Op.eq]: book.id } },
    })
      .then((comments) => {
        const message = `commentaire du livre : ${book.name}`;
        res.json({ message, book: book, comment: comments });
      })
      .catch((error) => {
        const message =
          "Les commentaire du livre demandé n'ont pas pu être récupéré. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
});
/**
 * @swagger
 * /api/books/:id:
 *  get:
 *    tags: [Books]
 *    security :
 *      - bearerAuth: []
 *    summary: Retrieve one book.
 *    description: Retrieve one book. Can be used to populate a select HTML tag.
 *    responses:
 *      200:
 *        description: One book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  propreties:
 *                    id:
 *                      type: integer
 *                      description: The book ID.
 *                      example: 1
 *                    title:
 *                      type: string
 *                      description: The book's title.
 *                      example: OnePiece n°1
 *                    extrait:
 *                      type: string
 *                      description: A extract of the book.
 *                      example: Je deviendrais le rois des pirate
 *                    year:
 *                      type: date
 *                      format: date-time
 *                      description: The book's creation date.
 *                      example: null
 *                    editor:
 *                      type: integer
 *                      description: The book's editor ID.
 *                      example: 2
 *                    category:
 *                      type: integer
 *                      description: The book's category ID.
 *                      example: 1
 *                    image:
 *                      type: string
 *                      description: The book's image url.
 *                      example: https://github.com/Timcodingeur/Projet-JS/blob/main/Image/Image-Books/OnePiece1.jpg
 *                    resume:
 *                      type: string
 *                      description: The book's resume
 *                      example: Luffy, un garçon espiègle, rêve de devenir le roi des pirates en trouvant le “One Piece”, un fabuleux trésor. Seulement, Luffy a avalé un fruit du démon qui l'a transformé en homme élastique.
 */
booksRouter.get("/:id", auth, (req, res) => {
  Book.findByPk(req.params.id)
    .then((Books) => {
      if (Books === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec une autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le livredont l'id vaut ${Books.id} a bien été récupérée`;
      res.json(sucess(message, Books));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

booksRouter.get("/:id/editor", auth, async (req, res) => {
  const bookId = req.params.id;
  Book.findByPk(bookId).then((book) => {
    if (book === null) {
      const message =
        "Le livre demandé n'existe pas. Merci d'essayer un autre identifiant.";
      return res.status(404).json({ message });
    }
    Editor.findByPk(book.editor)
      .then((editor) => {
        const message = `L'editeur du livre est ${editor.nameEdit}`;
        res.json({ message, editor: editor, book: book });
      })
      .catch((error) => {
        const message =
          "L'éditeur du livre demandé n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
});

booksRouter.get("/:id/category", auth, async (req, res) => {
  const bookId = req.params.id;
  Book.findByPk(bookId).then((book) => {
    if (book === null) {
      const message =
        "Le livre demandé n'existe pas. Merci d'essayer un autre identifiant.";
      return res.status(404).json({ message });
    }
    Category.findByPk(book.category)
      .then((category) => {
        const message = `La categorie du livre : ${category.name}`;
        res.json({ message, book: book, category: category });
      })
      .catch((error) => {
        const message =
          "Le livre de la category demandé n'a pas pu être récupéré. Merci de ressayer dans quelques instant.";
        res.status(500).json({ message, data: error });
      });
  });
});

booksRouter.get("/:id/author", auth, async (req, res) => {
  const bookId = req.params.id;
  Book.findByPk(bookId).then((book) => {
    Author.findByPk(book.author).then((author) => {
      const message = `L'auteur du livre : ${author.firstname} ${author.lastname}`;
      res.json({ message, book: book, author: author });
    });
  });
});

booksRouter.post("/", auth, (req, res) => {
  Book.create(req.body)
    .then((createdBook) => {
      const message = `Le livre ${createdBook.title} a bien été crée !`;
      res.json(sucess(message, createdBook));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

booksRouter.put("/:id", auth, (req, res) => {
  const BookId = req.params.id;
  Book.update(req.body, { where: { id: BookId } })
    .then((_) => {
      return Book.findByPk(BookId).then((updateBook) => {
        if (updateBook === null) {
          const message =
            "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `Le livre ${updateBook.title} a bien été modifié`;
        res.json(sucess(message, updateBook));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

booksRouter.delete("/:id", auth, (req, res) => {
  Book.findByPk(req.params.id)
    .then((deleteBook) => {
      if (deleteBook == null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      return Book.destroy({
        where: { id: deleteBook.id },
      }).then((_) => {
        const message = `Le livre ${deleteBook.title} a bien été supprimé`;
        res.json(sucess(message, deleteBook));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { booksRouter };
