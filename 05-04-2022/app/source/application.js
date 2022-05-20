class Product {
  constructor(
    ProductRowId,
    ProductId,
    ProductName,
    Description,
    Manufacturer,
    CategoryName,
    BasePrice
  ) {
    this.ProductRowId = ProductRowId;
    this.ProductId = ProductId;
    this.ProductName = ProductName;
    this.Description = Description;
    this.Manufacturer = Manufacturer;
    this.CategoryName = CategoryName;
    this.BasePrice = BasePrice;
  }
}

function getProducts() {
  let response = fetch("http://127.0.0.1:8000/products/", {
    method: "GET",
  });
  return response;
}

function getProductByProductRowId(productRowId) {
  let response = fetch("http://127.0.0.1:8000/products/" + productRowId, {
    method: "GET",
  });
  return response;
}

function addProduct(product) {
  let response = fetch("http://127.0.0.1:8000/products/", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

function editProduct(product) {
  let response = fetch(
    "http://127.0.0.1:8000/products/" + product.ProductRowId,
    {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

function removeProduct(productRowId) {
  let response = fetch("http://127.0.0.1:8000/products/" + productRowId, {
    method: "DELETE",
  });
  return response;
}

function saveProduct() {
  const product = new Product(
    Number(document.getElementById("productRowId").value),
    document.getElementById("productId").value,
    document.getElementById("productName").value,
    document.getElementById("description").value,
    document.getElementById("categoryName").value,
    document.getElementById("manufacturerName").value,
    Number(document.getElementById("price").value)
  );
  let result = addProduct(product);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
  resetInputs();
}

function updateProduct() {
  const product = new Product(
    Number(document.getElementById("productRowId").value),
    document.getElementById("productId").value,
    document.getElementById("productName").value,
    document.getElementById("description").value,
    document.getElementById("categoryName").value,
    document.getElementById("manufacturerName").value,
    Number(document.getElementById("price").value)
  );
  let result = editProduct(product);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
  resetInputs();
}

function deleteProduct(productRowId) {
  let result = removeProduct(productRowId);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
}

function loadProduct(productRowId) {
  let result = getProductByProductRowId(productRowId);
  result
    .then((resp) => resp.json())
    .then((data) => updateInputs(data))
    .catch((error) => console.log(error));
}

window.onload = function loadProducts() {
  let result = getProducts();
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
};

function updateTable(prods) {
  let table = document.getElementById("prodTable");
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
  for (let i = 0; i < prods.length; i++) {
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    let cell9 = row.insertCell(8);

    cell1.innerHTML = prods[i].ProductRowId;
    cell2.innerHTML = prods[i].ProductId;
    cell3.innerHTML = prods[i].ProductName;
    cell4.innerHTML = prods[i].Description;
    cell5.innerHTML = prods[i].CategoryName;
    cell6.innerHTML = prods[i].Manufacturer;
    cell7.innerHTML = prods[i].BasePrice;
    cell8.innerHTML = `<button class="btn btn-danger" onclick="deleteProduct(${prods[i].ProductRowId})">Delete</button>`;
    cell9.innerHTML = `<button class="btn btn-success" onclick="loadProduct(${prods[i].ProductRowId})">Load</button>`;
  }
}

function updateInputs(product) {
  document.getElementById("productRowId").value = product.ProductRowId;
  document.getElementById("productId").value = product.ProductId;
  document.getElementById("productName").value = product.ProductName;
  document.getElementById("description").value = product.Description;
  setDropdown(document.getElementById("categoryName"), product.CategoryName);
  setDropdown(
    document.getElementById("manufacturerName"),
    product.Manufacturer
  );
  document.getElementById("price").value = product.BasePrice;
}

function setDropdown(id, val) {
  let dropdown = id;
  for (let i = 0; i < dropdown.options.length; i++) {
    if (dropdown.options[i].text === val) {
      dropdown.selectedIndex = i;
      break;
    }
  }
}

function resetInputs() {
  document.getElementById("productRowId").value = "";
  document.getElementById("productId").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("description").value = "";
  resetDropdown(document.getElementById("categoryName"));
  resetDropdown(document.getElementById("manufacturerName"));
  document.getElementById("price").value = "";
}

function resetDropdown(dropdown) {
  dropdown.selectedIndex = 0;
}
