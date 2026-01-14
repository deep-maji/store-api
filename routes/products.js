const express = require("express");
const router = express.Router();

const { getAllProducts, getAllProductsStatic } = require("../controllers/products");
const wraperAsync = require("../utils/wraperAsync");


router.route('/').get(wraperAsync(getAllProducts));
router.route('/static').get(wraperAsync(getAllProductsStatic));


module.exports = router;