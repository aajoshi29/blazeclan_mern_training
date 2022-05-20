"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = /*#__PURE__*/_createClass(function Product(ProductRowId, ProductId, ProductName, Description, Manufacturer, CategoryName, BasePrice) {
  _classCallCheck(this, Product);

  this.ProductRowId = ProductRowId;
  this.ProductId = ProductId;
  this.ProductName = ProductName;
  this.Description = Description;
  this.Manufacturer = Manufacturer;
  this.CategoryName = CategoryName;
  this.BasePrice = BasePrice;
});

function getProducts() {
  var response = fetch("http://127.0.0.1:8000/products/", {
    method: "GET"
  });
  return response;
}

function getProductByProductRowId(productRowId) {
  var response = fetch("http://127.0.0.1:8000/products/" + productRowId, {
    method: "GET"
  });
  return response;
}

function addProduct(product) {
  var response = fetch("http://127.0.0.1:8000/products/", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response;
}

function editProduct(product) {
  var response = fetch("http://127.0.0.1:8000/products/" + product.ProductRowId, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response;
}

function removeProduct(productRowId) {
  var response = fetch("http://127.0.0.1:8000/products/" + productRowId, {
    method: "DELETE"
  });
  return response;
}

function saveProduct() {
  var product = new Product(Number(document.getElementById("productRowId").value), document.getElementById("productId").value, document.getElementById("productName").value, document.getElementById("description").value, document.getElementById("categoryName").value, document.getElementById("manufacturerName").value, Number(document.getElementById("price").value));
  var result = addProduct(product);
  result.then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return updateTable(data);
  })["catch"](function (error) {
    return console.log(error);
  });
  resetInputs();
}

function updateProduct() {
  var product = new Product(Number(document.getElementById("productRowId").value), document.getElementById("productId").value, document.getElementById("productName").value, document.getElementById("description").value, document.getElementById("categoryName").value, document.getElementById("manufacturerName").value, Number(document.getElementById("price").value));
  var result = editProduct(product);
  result.then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return updateTable(data);
  })["catch"](function (error) {
    return console.log(error);
  });
  resetInputs();
}

function deleteProduct(productRowId) {
  var result = removeProduct(productRowId);
  result.then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return updateTable(data);
  })["catch"](function (error) {
    return console.log(error);
  });
}

function loadProduct(productRowId) {
  var result = getProductByProductRowId(productRowId);
  result.then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return updateInputs(data);
  })["catch"](function (error) {
    return console.log(error);
  });
}

window.onload = function loadProducts() {
  var result = getProducts();
  result.then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return updateTable(data);
  })["catch"](function (error) {
    return console.log(error);
  });
};

function updateTable(prods) {
  var table = document.getElementById("prodTable");
  var rowCount = table.rows.length;

  for (var i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }

  for (var _i = 0; _i < prods.length; _i++) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    cell1.innerHTML = prods[_i].ProductRowId;
    cell2.innerHTML = prods[_i].ProductId;
    cell3.innerHTML = prods[_i].ProductName;
    cell4.innerHTML = prods[_i].Description;
    cell5.innerHTML = prods[_i].CategoryName;
    cell6.innerHTML = prods[_i].Manufacturer;
    cell7.innerHTML = prods[_i].BasePrice;
    cell8.innerHTML = "<button class=\"btn btn-danger\" onclick=\"deleteProduct(".concat(prods[_i].ProductRowId, ")\">Delete</button>");
    cell9.innerHTML = "<button class=\"btn btn-success\" onclick=\"loadProduct(".concat(prods[_i].ProductRowId, ")\">Load</button>");
  }
}

function updateInputs(product) {
  document.getElementById("productRowId").value = product.ProductRowId;
  document.getElementById("productId").value = product.ProductId;
  document.getElementById("productName").value = product.ProductName;
  document.getElementById("description").value = product.Description;
  setDropdown(document.getElementById("categoryName"), product.CategoryName);
  setDropdown(document.getElementById("manufacturerName"), product.Manufacturer);
  document.getElementById("price").value = product.BasePrice;
}

function setDropdown(id, val) {
  var dropdown = id;

  for (var i = 0; i < dropdown.options.length; i++) {
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
