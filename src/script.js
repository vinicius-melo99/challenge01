const path = require('path');
const fs = require('fs');
const {
  getData,
  getUniqueSortedProducts,
  categorizeProducts,
} = require('./util/dataManipulation');

//IIFE (Immediately Invoked Function Expression) when the script runs
(() => {
  const data = getData('data01.json');

  let uniqueSortedProducts = getUniqueSortedProducts(data);

  const final = categorizeProducts(data, uniqueSortedProducts);

  const outputPath = path.resolve(__dirname, 'output/output.json');

  fs.writeFileSync(outputPath, JSON.stringify(final, null, 2), 'utf8');

  console.log(`Arquivo escrito em: ${outputPath}`);
})();
