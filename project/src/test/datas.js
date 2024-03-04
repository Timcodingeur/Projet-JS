const BASE_URL = "http://localhost:3000/api/products/";
const NEW_URL = "http://localhost:3000/api/products/2";

const response = await fetch(BASE_URL);
const json = await response.json();

const newResponse = await fetch(NEW_URL);
const newJson = await newResponse.json();

export { json, newJson };
