import Storage from "./Storage.js";

const showAddNewCategoryFromBtn = document.querySelector(
  ".ask-add-new-category"
);
const categoryCancelBtn = document.querySelector(".cancel-btn");
const categoryAddBtn = document.querySelector("#add-new-category");
const categoryTitle = document.querySelector("#title-category");
const categoryDescription = document.querySelector("#description-category");

class CategoryView {
  constructor() {
    showAddNewCategoryFromBtn.addEventListener("click", (e) =>
      this.showAddNewCategoryFrom(e)
    );
    categoryAddBtn.addEventListener("click", (e) => this.addNewCategory(e));
    categoryCancelBtn.addEventListener("click", (e) =>
      this.cancelAddNewCategory(e)
    );
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
    this.hideAddNewCategoryForm();
  }
  cancelAddNewCategory(e) {
    e.preventDefault();
    categoryTitle.value = "";
    categoryDescription.value = "";
    showAddNewCategoryFromBtn.nextElementSibling.className = "hidden";
    showAddNewCategoryFromBtn.classList.remove("hidden");
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    const selectOptionCategories = document.querySelector(
      "#select-category-el"
    );
    let result = `<option value="default">انتخاب دسته بندی</option>`;
    this.categories.forEach((c) => {
      result += `<option value=${c.id}>${c.title}</option>`;
    });
    selectOptionCategories.innerHTML = result;
  }
  showAddNewCategoryFrom(e) {
    showAddNewCategoryFromBtn.nextElementSibling.className = "add-new-category";
    e.target.classList.add("hidden");
  }
  hideAddNewCategoryForm() {
    showAddNewCategoryFromBtn.nextElementSibling.className = "hidden";
    showAddNewCategoryFromBtn.classList.remove("hidden");
  }
}

export default new CategoryView();
