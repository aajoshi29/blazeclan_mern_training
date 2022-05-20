"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var productMap = new Map();
var categoryMap = new Map();
var manufacturerMap = new Map();
var productId = 101;

function saveProduct() {
  var product = {
    ProductId: "P".concat(productId),
    ProductName: document.getElementById("productName").value,
    CategoryName: document.getElementById("categoryName").value,
    ManufacturerName: document.getElementById("manufacturerName").value,
    Price: Number(document.getElementById("price").value)
  };
  productMap.set("P".concat(productId), product);
  generateCategoryMap(product);
  generateManufacturerMap(product);
  console.log("ProductMap:");
  console.log(productMap);
  console.log("CategoryMap:");
  console.log(categoryMap);
  console.log("ManufacturerMap:");
  console.log(manufacturerMap);
  document.getElementById("productName").value = "";
  document.getElementById("price").value = "";
  productId++;
}

function generateCategoryMap(product) {
  if (categoryMap.has(product.CategoryName)) {
    categoryMap.set(product.CategoryName, [].concat(_toConsumableArray(categoryMap.get(product.CategoryName)), [product]));
  } else {
    categoryMap.set(product.CategoryName, [product]);
  }
}

function generateManufacturerMap(product) {
  if (manufacturerMap.has(product.ManufacturerName)) {
    manufacturerMap.set(product.ManufacturerName, [].concat(_toConsumableArray(manufacturerMap.get(product.ManufacturerName)), [product]));
  } else {
    manufacturerMap.set(product.ManufacturerName, [product]);
  }
}
