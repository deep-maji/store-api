require('dotenv').config()

const ExpressError = require("./utils/ExpressError");
const productsRouter = require("./routes/products");
const connectDB = require("./db/connect");
const express = require("express");
const app = express();



// middleare
app.use(express.json()); // is middleware that allows your Express application to read and process JSON data sent in HTTP requests.


// routes

app.use("/api/v1/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Hello Wolrd!");
})

// error middleware
// Handel not matched root
app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
})

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  
  let { statusCode = 500, message = "Something went wrong." } = err;
  res.status(statusCode).json({ msg: message });
});


// DB_Connect 
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

