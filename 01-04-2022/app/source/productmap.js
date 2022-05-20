let productMap = new Map();
let categoryMap = new Map();
let manufacturerMap = new Map();
let productId = 101;

function saveProduct() {
  let product = {
    ProductId: `P${productId}`,
    ProductName: document.getElementById("productName").value,
    CategoryName: document.getElementById("categoryName").value,
    ManufacturerName: document.getElementById("manufacturerName").value,
    Price: Number(document.getElementById("price").value),
  };
  productMap.set(`P${productId}`, product);
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
    categoryMap.set(product.CategoryName, [
      ...categoryMap.get(product.CategoryName),
      product,
    ]);
  } else {
    categoryMap.set(product.CategoryName, [product]);
  }
}

function generateManufacturerMap(product) {
  if (manufacturerMap.has(product.ManufacturerName)) {
    manufacturerMap.set(product.ManufacturerName, [
      ...manufacturerMap.get(product.ManufacturerName),
      product,
    ]);
  } else {
    manufacturerMap.set(product.ManufacturerName, [product]);
  }
}
