const connect = require("./db/connect");

connect();
const Products = require('./models/product');
const jsonProducts = require('./products.json');


async function init() {
  try {
    await Products.deleteMany();
    await Products.insertMany(jsonProducts);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log("Error in data inserting ", error.message);
    process.exit(1);
  }
}

init();