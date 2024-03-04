import { test, expect } from "vitest";
import { json, newJson } from "./datas.js";
import { ConnectionToTheDatabase } from "./connectionToTheDb.js";
import {
  getOneProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./fetch.js";

const BASE_URL = "http://localhost:3000/api/books/";
const NEW_URL = "http://localhost:3000/api/books/2";

test(`fetch the URL ${BASE_URL} with the metod GET `, async () => {
  expect(await getAllProducts(BASE_URL)).toStrictEqual(json);
});

test(`fetch the URL ${NEW_URL} with the method GET `, async () => {
  expect(await getOneProduct(NEW_URL)).toStrictEqual(newJson);
});

test(`fetch the URL ${NEW_URL} with the method DELETE`, async () => {
  expect(await deleteProduct(NEW_URL));
});

test(`fetch the URL ${BASE_URL} with the method POST`, async () => {
  expect(
    await createProduct(BASE_URL, {
      title: "Narutone n°1",
      extrait:
        "- Qu'est-ce que c'est... ... ce fameux serment ? - C'est de ne jamais dire qu'en réalité, tu es le démon-renard.",
      year: new Date(2002, 10, 3, 1, 2, 3, 4),
      editor: 1,
      image:
        "https://github.com/Timcodingeur/Projet-JS/blob/main/Image/Image-Books/Naruto1.jpg",
      resume:
        "Ce manga raconte l'histoire d'un jeune ninja du village de konoha qui s'appelle naruto uzumaki. Cet enfant est le pire élève de l'académie et n'est pas très aimé des villageois à cause d'un lourd secret qui le suit depuis sa naissance.",
      created: new Date(),
    })
  );
});

test(`fetch the URL ${NEW_URL} with the method PUT`, async () => {
  expect(
    await updateProduct(NEW_URL, {
      title: "Naruto n°1",
      extrait:
        "- Qu'est-ce que c'est... ... ce fameux serment ? - C'est de ne jamais dire qu'en réalité, tu es le démon-renard.",
      year: new Date(2002, 10, 3, 1, 2, 3, 4),
      editor: 1,
      image:
        "https://github.com/Timcodingeur/Projet-JS/blob/main/Image/Image-Books/Naruto1.jpg",
      resume:
        "Ce manga raconte l'histoire d'un jeune ninja du village de konoha qui s'appelle naruto uzumaki. Cet enfant est le pire élève de l'académie et n'est pas très aimé des villageois à cause d'un lourd secret qui le suit depuis sa naissance.",
    })
  );
});

test("Try a connection to the database", async () => {
  expect(await ConnectionToTheDatabase());
});
