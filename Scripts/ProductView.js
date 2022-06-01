import CategoryView from "./CategoryView.js";
import Storage from "./Storage.js";

const numberProductEl = document.querySelector(".number-product");
const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
const titleProduct = document.querySelector("#title-product");
const quantityProduct = document.querySelector("#quantity-input");
const categoryProduct = document.querySelector("#select-category-el");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = titleProduct.value;
    const quantity = quantityProduct.value;
    const category = categoryProduct.value;
    if (!title || !quantity || category === "default") return;
    Storage.saveProducts({ title, category, quantity });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    titleProduct.value = "";
    quantityProduct.value = "";
    categoryProduct.value = "default";
    numberProductEl.textContent = Number(numberProductEl.textContent) + 1;
  }
  setApp() {
    this.products = Storage.getAllProducts();
    numberProductEl.textContent = this.products.length;
  }
  createProductsList(products) {
    const productsDOM = document.querySelector(".products");
    let result = ``;
    products.forEach((p) => {
      const selectedCategory = CategoryView.categories.find(
        (c) => c.id == p.category
      );
      result += `
          <div class="product">
              <div class="title-item">
                  <h4>${p.title}</h4>
              </div>
              <div class="info">
                  <p class="date">${new Date().toLocaleDateString("fa-IR")}</p>
                  <p class="category">${selectedCategory.title}</p>
                  <p class="quantity-product">${p.quantity}</p>
                  <button type="button" class="remove-btn" data-id="${
                    p.id
                  }"}>حذف</button>
              </div>
          </div>
            `;
    });
    productsDOM.innerHTML = result;
    const removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => this.removeProduct(e));
    });
  }
  searchProducts(e) {
    const value = e.target.value;
    e.preventDefault();
    const filteredProducts = this.products.filter((p) =>
      p.title.includes(value)
    );
    this.createProductsList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    let products = [];
    let result = ``;
    if (value === "newest") {
      products = Storage.getAllProducts("newest");
    } else if (value === "oldest") {
      products = Storage.getAllProducts("oldest");
    }
    this.createProductsList(products);
  }
  removeProduct(e) {
    Storage.removeProduct(e.target.dataset.id);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    numberProductEl.textContent = Number(numberProductEl.textContent) - 1;
  }
}

export default new ProductView();
