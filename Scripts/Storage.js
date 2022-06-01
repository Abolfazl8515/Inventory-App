export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    return savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
  }
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }
  static saveProducts(productsToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((c) => c.id === productsToSave.id);
    if (existedItem) {
      existedItem.title = productsToSave.title;
      existedItem.category = productsToSave.category;
      existedItem.quantity = productsToSave.quantity;
    } else {
      productsToSave.id = new Date().getTime();
      productsToSave.createdAt = new Date().toISOString();
      savedProducts.push(productsToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static removeProduct(id) {
    const savedProducts = this.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id != id);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
