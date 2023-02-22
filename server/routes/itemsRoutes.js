const { db } = require("../db");

const router = require("express").Router();


router.get('/:id', (req, res) => {
    const productId  = req.params.id;
    const q = "SELECT * FROM itemstable WHERE `pid` = ? "
 
    db.query(q,[productId] ,(err,data) => {
     if(err) return res.status(500).send(err);
 
     return res.status(200).json(data);
     });
 })

 router.post('/add/:producttypeid' , (req, res) => {
    const productTypeId = req.params.producttypeid
    const q = "INSERT INTO itemstable(`name` , `serial_number` , `pid`) VALUES (?)"

    const values = [
        req.body.name,
        req.body.serial_number,
        productTypeId
    ]

    db.query(q, [values] , (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("item added successfully")
    })
})

router.put("/update/:id" , (req , res) => {
    const itemId = req.params.id;
    const q = "UPDATE itemstable SET `name` = ? , `serial_number` = ? WHERE `id` = ? "

    const values = [
        req.body.name,
        req.body.serial_number,
    ]

    db.query(q, [...values , itemId] , (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("item edited successfully")
    })
})

router.delete("/delete/:id" , (req, res) => {
    const itemId = req.params.id;
    const q = "DELETE FROM itemstable WHERE `id` = ?"

    db.query(q, [itemId], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("item deleted successfully")
    })
})

router.put('/sold/:id' , (req , res) => {
    const itemId = req.params.id
    const q = "UPDATE itemstable SET `sold` = NOT `sold` WHERE `id` = ?"

    db.query(q, [itemId] , (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("item Sold radio successfull")
    })
})



module.exports = router;