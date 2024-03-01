const response = await fetch("http://localhost:3000/api/products/");
const json = await response.json();

const newResponse = await fetch("http://localhost:3000/api/products/2");
const newJson = await newResponse.json();

export { json, newJson };
