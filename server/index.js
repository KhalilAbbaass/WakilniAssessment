const express = require("express");

const productRoute = require("./routes/productRoutes");
const itemsRoute = require("./routes/itemsRoutes")

const app = express();
app.use(express.json());

app.use('/api/products' , productRoute)
app.use('/api/items' , itemsRoute)

app.listen(6000, () => {
    console.log("Backend server is running on port 6000")
})