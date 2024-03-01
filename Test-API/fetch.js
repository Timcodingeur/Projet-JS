async function getAllProducts(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function getOneProduct(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function createProduct(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

async function updateProduct(url, body) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

async function deleteProduct(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export {
  getOneProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
