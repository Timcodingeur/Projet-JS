import express from "express";
import { Category } from "../db/sequelize.mjs";
import { sucess } from "./helper.mjs";
import { ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.mjs";

const categorysRouter = express();

categorysRouter.get("/", auth, (req, res) => {
  if (req.query.name) {
    if (req.query.name.length < 4) {
      const message = `Le terme de la recherche doit contenir au moins 4 caractères`;
      return res.status(400).json({ message });
    }
    let limit = 6;
    if (req.query.limit) {
      limit = parseInt(req.query.limit, 10);
    }
    return Category.findAll({
      where: { name: { [Op.like]: `%${req.query.name}%` } },
      order: ["name"],
      limit: limit,
    }).then((Category) => {
      const message = `Il y a ${Category.count} produit qui correspondant au treme de la recherche`;
      res.json(sucess(message, Category));
    });
  }
  Category.findAll({ order: ["name"] })
    .then((Category) => {
      const message = "La liste des produits a bien été récupérée. ";
      res.json(sucess(message, Category));
    })
    .catch((error) => {
      const message =
        "La liste des produits n'a pas été récupérée. Merci de réessayer dans quelque instants.";
      res.status(500).json({ message, data: error });
    });
});

categorysRouter.get("/:id", auth, (req, res) => {
  Category.findByPk(req.params.id)
    .then((Category) => {
      if (Category === null) {
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec une autre identifiant.";
        return res.status(404).json({ message });
      }
      const message = `Le produit dont l'id vaut ${Category.id} a bien été récupérée`;
      res.json(sucess(message, Category));
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

categorysRouter.get("/:id/book", auth, async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [
      {
        model: book,
        as: "books",
      },
    ],
  });

  const message = `Categorie du livre ${category.name}`;
  res.json({ message, data: category.book });
});

categorysRouter.post("/", auth, (req, res) => {
  Category.create(req.body)
    .then((createdCategory) => {
      const message = `Le produit ${createdCategory.name} a bien été crée !`;
      res.json(sucess(message, createdCategory));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le produit n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

categorysRouter.put("/:id", auth, (req, res) => {
  const BookId = req.params.id;
  Category.update(req.body, { where: { id: BookId } })
    .then((_) => {
      return Category.findByPk(BookId).then((updateCategory) => {
        if (updateCategory === null) {
          const message =
            "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `Le produit ${updateCategory.name} a bien été modifié`;
        res.json(sucess(message, updateCategory));
      });
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

categorysRouter.delete("/:id", auth, (req, res) => {
  Category.findByPk(req.params.id)
    .then((deleteCategory) => {
      if (deleteCategory == null) {
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      return Category.destroy({
        where: { id: deleteCategory.id },
      }).then((_) => {
        const message = `Le produit ${deleteCategory.name} a bien été supprimé`;
        res.json(sucess(message, deleteCategory));
      });
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { categorysRouter };
