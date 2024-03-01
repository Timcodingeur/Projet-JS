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

test("fetch the URL http://localhost:3000/api/products/ with the metod GET", async () => {
  expect(
    await getAllProducts("http://localhost:3000/api/products/")
  ).toStrictEqual(json);
});

test("fetch the URL http://localhost:3000/api/products/2 with the method GET", async () => {
  expect(
    await getOneProduct("http://localhost:3000/api/products/2")
  ).toStrictEqual(newJson);
});

test("fetch the URL http://localhost:3000/api/products/ with the method POST", async () => {
  expect(
    await createProduct("http://localhost:3000/api/products", {
      name: "Hello",
      price: 5.99,
      created: new Date(),
    })
  );
});

test("fetch the URL http://localhost:3000/api/products/2 with the method PUT", async () => {
  expect(
    await updateProduct("http://localhost:3000/api/products/2", {
      name: "hello",
      price: 5.99,
    })
  );
});

test("fetch the URL http://localhost:3000/api/products/1 with the method DELETE", async () => {
  expect(await deleteProduct("http://localhost:3000/api/products/1"));
});

test("Try a connection to the database", async () => {
  expect(await ConnectionToTheDatabase());
});
