//factory function returns a category object
const generateCategory = (categoryName, data) => ({
  category: categoryName,
  count: 1,
  products: generateProducts(categoryName, data),
});

//factory function returns a product object
const generateProducts = (title, data) => {
  return data
    .filter((product) => product.title === title)
    .map(({ title, supermarket, price }) => ({
      title,
      supermarket,
      price,
    }));
};

module.exports = {
  generateCategory,
  generateProducts,
};
