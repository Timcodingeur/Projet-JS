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

const BASE_URL = "http://localhost:3000/api/products/";
const NEW_URL = "http://localhost:3000/api/products/2";

test(`fetch the URL ${BASE_URL} with the metod GET `, async () => {
  expect(await getAllProducts(BASE_URL)).toStrictEqual(json);
});

test(`fetch the URL ${NEW_URL} with the method GET `, async () => {
  expect(await getOneProduct(NEW_URL)).toStrictEqual(newJson);
});

test(`fetch the URL ${BASE_URL} with the method POST`, async () => {
  expect(
    await createProduct(BASE_URL, {
      name: "Hello",
      price: 5.99,
      created: new Date(),
    })
  );
});

test(`fetch the URL ${NEW_URL} with the method PUT`, async () => {
  expect(
    await updateProduct(NEW_URL, {
      name: "hello",
      price: 5.99,
    })
  );
});

test(`fetch the URL ${NEW_URL} with the method DELETE`, async () => {
  expect(await deleteProduct(NEW_URL));
});

test("Try a connection to the database", async () => {
  expect(await ConnectionToTheDatabase());
});
