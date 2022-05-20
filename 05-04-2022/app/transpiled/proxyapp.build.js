"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProductInfo = /*#__PURE__*/_createClass(function ProductInfo() {
  _classCallCheck(this, ProductInfo);

  _defineProperty(this, "ProductId", "");

  _defineProperty(this, "ProductName", "");

  _defineProperty(this, "CategoryName", "");

  _defineProperty(this, "Description", "");

  _defineProperty(this, "Manufacturer", "");

  _defineProperty(this, "Price", 0);
});

var handler1 = {
  set: function set(target, prop, val) {
    var categories = ["Electrical", "Electronics"];

    if (prop === "ProductId" && !val.startsWith("CLT1--Prd-")) {
      throw new Error("Product Id must start with CLT1--Prd-");
    }

    if (prop === "CategoryName" && !categories.includes(val)) {
      throw new Error("Category Name must be either Electrical or Electronics.");
    } else {
      target[prop] = val;
      return true;
    }
  }
};
var handler2 = {
  set: function set(target, prop, val) {
    var categories = ["Electrical", "Electronics", "Civil", "Mechanical", "Chemical"];
    var manufacturers = ["HP", "Bajaj", "TATA", "LnT"];

    if (prop === "ProductId" && !val.startsWith("CLT2--Prd-")) {
      throw new Error("Product Id must start with CLT2--Prd-");
    }

    if (prop === "CategoryName" && !categories.includes(val)) {
      throw new Error("Category Name must be either Electrical, Electronics, Civil, Mechanical or Chemical.");
    }

    if (prop === "Manufacturer" && !manufacturers.includes(val)) {
      throw new Error("Manufacturer must be either HP, Bajaj, TATA or LnT.");
    } else target[prop] = val;

    return true;
  }
};
var productInfo = new ProductInfo();
var proxyObject1 = new Proxy(productInfo, handler1);
var proxyObject2 = new Proxy(productInfo, handler2);

function client1Write() {
  proxyObject1.ProductId = "CLT1--Prd-1";
  proxyObject1.ProductName = "Iron";
  proxyObject1.CategoryName = "Electrical";
  proxyObject1.Manufacturer = "Philips";
  proxyObject1.Description = "Home Use";
  proxyObject1.Price = 200;
}

function client2Write() {
  proxyObject2.ProductId = "CLT2--Prd-1";
  proxyObject1.ProductName = "HP Laptop";
  proxyObject2.CategoryName = "Electronic";
  proxyObject2.Manufacturer = "HP";
  proxyObject1.Description = "Office Use";
  proxyObject1.Price = 100000;
}

client1Write();
client2Write();
