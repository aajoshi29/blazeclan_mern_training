class ProductInfo {
  ProductId = "";
  ProductName = "";
  CategoryName = "";
  Description = "";
  Manufacturer = "";
  Price = 0;
}

const handler1 = {
  set(target, prop, val) {
    let categories = ["Electrical", "Electronics"];
    if (prop === "ProductId" && !val.startsWith("CLT1--Prd-")) {
      throw new Error("Product Id must start with CLT1--Prd-");
    }
    if (prop === "CategoryName" && !categories.includes(val)) {
      throw new Error(
        "Category Name must be either Electrical or Electronics."
      );
    } else {
      target[prop] = val;
      return true;
    }
  },
};

const handler2 = {
  set(target, prop, val) {
    let categories = [
      "Electrical",
      "Electronics",
      "Civil",
      "Mechanical",
      "Chemical",
    ];
    let manufacturers = ["HP", "Bajaj", "TATA", "LnT"];
    if (prop === "ProductId" && !val.startsWith("CLT2--Prd-")) {
      throw new Error("Product Id must start with CLT2--Prd-");
    }
    if (prop === "CategoryName" && !categories.includes(val)) {
      throw new Error(
        "Category Name must be either Electrical, Electronics, Civil, Mechanical or Chemical."
      );
    }
    if (prop === "Manufacturer" && !manufacturers.includes(val)) {
      throw new Error("Manufacturer must be either HP, Bajaj, TATA or LnT.");
    } else target[prop] = val;
    return true;
  },
};

const productInfo = new ProductInfo();
const proxyObject1 = new Proxy(productInfo, handler1);
const proxyObject2 = new Proxy(productInfo, handler2);

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
