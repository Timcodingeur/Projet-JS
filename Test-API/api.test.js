import { test, expect } from "vitest";

import getAllAuthors from "./GET-JSON/getAllAuthors.json" with { type: "json" };
import getAllBooks from "./GET-JSON/getAllBooks.json" with { type: "json" };
import getAllCategorys from "./GET-JSON/getAllCategorys.json" with { type: "json" }; 
import getAllBooksByCategory from "./GET-JSON/getAllBooksByCategory.json" with { type: "json" };
import getAllBooksByAuthor from "./GET-JSON/getAllBookByAuthor.json" with { type: "json" };

import getOneBook from "./GET-JSON/getOneBooks.json" with { type: "json" };
import getOneCategory from "./GET-JSON/getOneCategory.json" with { type: "json" };
import getOneAuthor from "./GET-JSON/getOneAuthor.json" with { type: "json" };

async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNjg4NzY2MiwiZXhwIjoxNzM4NDQ1MjYyfQ.eFAK5bGDCj7dUhNPW53q5nMmufOsysM6WzAA7x5eTzM",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  return await response.json();
}

const allGetUrl = [
  "http://localhost:3000/api/books",
  "http://localhost:3000/api/books/1",
  "http://localhost:3000/api/categorys",
  "http://localhost:3000/api/categorys/1",
  "http://localhost:3000/api/categorys/1/book",
  "http://localhost:3000/api/authors",
  "http://localhost:3000/api/authors/1",
  "http://localhost:3000/api/authors/1/book",
];

const allGetJson = [getAllBooks, getOneBook, getAllCategorys, getOneCategory, getAllBooksByCategory, getAllAuthors, getOneAuthor, getAllBooksByAuthor];

for (let i = 0; i < allGetUrl.length; i++) {
  test(`fetch the URL ${allGetUrl[i]} with the method GET`, async () => {
    expect(await getData(allGetUrl[i])).toStrictEqual(allGetJson[i]);
  });
}
