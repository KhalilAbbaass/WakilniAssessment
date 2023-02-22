const router = require("express").Router();
const {db} = require("../db")

router.get('/', (req, res) => {
   const q = "SELECT p.id, p.product_type_name, p.image, COUNT(i.id) AS count FROM producttype p LEFT OUTER JOIN itemstable i ON p.id = i.pid AND i.sold = true GROUP BY p.id , p.product_type_name, p.image "

   db.query(q, (err,data) => {
    if(err) return res.status(500).send(err);

    return res.status(200).json(data);
    });
})

router.post('/add' , (req, res) => {
    const q = "INSERT INTO producttype(`product_type_name` , `image`) VALUES (?)"

    const values = [
        req.body.product_type_name,
        req.body.image,
    ]

    db.query(q, [values] , (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("product type created successfully")
    })
})

router.put('/update/:id' , (req , res) => {
    const productId = req.params.id;
    const q = "UPDATE producttype SET `product_type_name` = ? , `image` = ? WHERE `id` = ? "

    const values = [
        req.body.product_type_name,
        req.body.image,
    ]

    db.query(q,[...values, productId], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("Product updated successfully")
    })
})

router.delete('/delete/:id' , (req, res) => {
    const productId  = req.params.id
    const q = "DELETE FROM producttype WHERE `id` = ?"

    db.query(q, [productId], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("product deleted successfully")
    })
})


module.exports = router;