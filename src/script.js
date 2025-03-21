const {
  getData,
  getProducts,
  categorizeProducts,
  writeFile,
} = require('./util/dataManipulation');

//IIFE (Immediately Invoked Function Expression) when the script runs
(() => {
  const data = getData('data01.json');

  const products = getProducts(data);

  const categorizedProducts = categorizeProducts(data, products);

  writeFile(categorizedProducts);
})();
