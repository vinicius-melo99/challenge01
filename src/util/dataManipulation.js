const fs = require('fs');
const path = require('path');
const {
  clearString,
  removeUnits,
  getStringSimilarity,
  getKeywordSimilarity,
} = require('./stringManipulation');
const { generateCategory, generateProducts } = require('./factoryFunctions');

//function to get data of a JSON file
const getData = (filename) => {
  const filePath = path.resolve(__dirname, `../data/${filename}`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  //get data of json on that specific path
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return data;
};

// function that returns all products and sort them
const getProducts = (data) => {
  return data.map((product) => product.title);
};

const writeFile = (file) => {
  const outputDir = path.resolve(__dirname, '../output');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputPath = path.resolve(__dirname, '../output/output.json');

  try {
    fs.writeFileSync(outputPath, JSON.stringify(file, null, 2), 'utf8');
    console.log(`Arquivo escrito em: ${outputPath}`);
  } catch (e) {
    console.log(`Erro ao escrever o arquivo: ${e}`);
  }
};

//function that creates and return a list of product categories, with each item containing its name, price, and the supermarket it belongs to.
const categorizeProducts = (data, sortedProducts) => {
  let final = [];

  for (let i = 0; i < sortedProducts.length; i++) {
    const currentString = sortedProducts[i];

    if (!currentString) {
      continue;
    }

    const newCategory = generateCategory(currentString, data);

    final.push(newCategory);

    for (let x = i + 1; x < sortedProducts.length; x++) {
      const comparedString = clearString(
        [...sortedProducts[x].split(' ')].sort().join('').toLocaleLowerCase(),
      );

      if (!comparedString) {
        continue;
      }

      const currentString = clearString(
        [...sortedProducts[i].split(' ')].sort().join('').toLocaleLowerCase(),
      );

      const similarity = getStringSimilarity(currentString, comparedString);

      if (similarity > 70) {
        const keywordsSimilarity = getKeywordSimilarity(
          sortedProducts[x],
          sortedProducts[i],
        );

        if (keywordsSimilarity <= 75) continue;

        const finalIndex = final.length - 1;

        final[finalIndex].count += 1;

        const products = generateProducts(sortedProducts[x], data);

        products.forEach((product) => {
          const finalProducts = final[finalIndex].products;
          const alreadyAdded = finalProducts.filter(
            (finalProduct) =>
              finalProduct.title === product.title &&
              finalProduct.supermarket === product.supermarket,
          );

          if (!alreadyAdded.length) {
            final[finalIndex].products.push(product);
          }
        });

        sortedProducts[x] = '';
      }
    }
  }

  return final;
};

module.exports = {
  getData,
  getProducts,
  generateCategory,
  clearString,
  removeUnits,
  categorizeProducts,
  writeFile,
};
