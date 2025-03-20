//factory function returns a category object
const generateCategory = (categoryName, data) => ({
  category: categoryName,
  count: 1,
  products: [
    {
      ...generateProduct(categoryName, data),
    },
  ],
});

//factory function returns a product object
const generateProduct = (title, data) => ({
  title,
  supermarket: data.find((product) => product.title === title).supermarket,
  price: data.find((product) => product.title === title).price,
});

module.exports = {
  generateCategory,
  generateProduct,
};
