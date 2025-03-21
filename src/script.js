const {
  getData,
  getSortedProducts,
  categorizeProducts,
  writeFile,
} = require('./util/dataManipulation');

//IIFE (Immediately Invoked Function Expression) when the script runs
(() => {
  const data = getData('data01.json');

  const sortedProducts = getSortedProducts(data);

  const categorizedProducts = categorizeProducts(data, sortedProducts);

  writeFile(categorizedProducts);
})();
