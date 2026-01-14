const ExpressError = require("../utils/ExpressError")
const Products = require('../models/product');

const getAllProductsStatic = async (req, res) => {

  const products = await Products.find({ price: { $gt: 30 } }).sort('price').select('name price').limit(4);
  res.status(200).json({ products, nHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = (featured === "true") ? true : false
  }

  if (name) {
    queryObject.name = { $regex: queryObject.name, $options: 'i' }
  }

  if (company) {
    queryObject.company = company;
  }

  // numericFilters 
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
    }

    const regExp = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regExp, (match) => `-${operatorMap[match]}-`);

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    });

    console.log(queryObject);

  }

  let result = Products.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  else {
    result = result.sort('createdAt');
  }

  // fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }



  // Paging
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.limit(limit).skip(skip);


  const products = await result;

  res.status(200).json({ products, nHits: products.length })
}



module.exports = {
  getAllProducts, getAllProductsStatic
}