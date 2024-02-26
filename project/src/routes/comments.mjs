import express from "express";
import { Comment } from "../db/sequelize.mjs";
import { sucess } from "./helper.mjs";
import { ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.mjs";

const commentsRouter = express();

commentsRouter.get("/", auth, (req, res) => {
  if (req.query.name) {
    if (req.query.name.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }
    let limit = 3;
    if (req.query.limit) {
      limit = parseInt(req.query.limit, 10);
    }
    return Comment.findAll({
      where: { note: { [Op.like]: `%${req.query.name}%` } },
      order: ["note"],
      limit: limit,
    }).then((comments) => {
      const message = `Il y a ${comments.count} commentaire qui correspondant au treme de la recherche`;
      res.json(sucess(message, comments));
    });
  }
  Comment.findAll({ order: ["name"] })
    .then((products) => {
      const message = "La liste des commentaire a bien été récupérée. ";
      res.json(sucess(message, comments));
    })
    .catch((error) => {
      const message =
        "La liste des commentaire n'a pas été récupérée. Merci de réessayer dans quelque instants.";
      res.status(500).json({ message, data: error });
    });
});

commentsRouter.get("/:id", auth, (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment === null) {
        const message =
          "Le commentaire demandé n'existe pas. Merci de réessayer avec une autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le commentaire dont l'id vaut ${comment.id} a bien été récupérée`;
      res.json(sucess(message, comment));
    })
    .catch((error) => {
      const message =
        "Le commentaire n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

commentsRouter.post("/", auth, (req, res) => {
  Comment.create(req.body)
    .then((createdComment) => {
      const message = `Le produit ${createdComment.name} a bien été crée !`;
      res.json(sucess(message, createdComment));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le commentaire n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

commentsRouter.put("/:id", auth, (req, res) => {
  const commentId = req.params.id;
  Comment.update(req.body, { where: { id: commentId } })
    .then((_) => {
      return Comment.findByPk(commentId).then((updateComment) => {
        if (updateComment === null) {
          const message =
            "Le produit commentaire n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `Le commentaire ${updateComment.comment} a bien été modifié`;
        res.json(sucess(message, updateComment));
      });
    })
    .catch((error) => {
      const message =
        "Le commentaire n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

CommentsRouter.delete("/:id", auth, (req, res) => {
  Comment.findByPk(req.params.id)
    .then((deleteComment) => {
      if (deleteComment == null) {
        const message =
          "Le commentaire demandé n'existe pas. Merci de réessayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      return Comment.destroy({
        where: { id: deleteComment.id },
      }).then((_) => {
        const message = `Le commentaire ${deleteComment.comment} a bien été supprimé`;
        res.json(sucess(message, deleteComment));
      });
    })
    .catch((error) => {
      const message =
        "Le commentaire n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { commentsRouter };
