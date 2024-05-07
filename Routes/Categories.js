const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/categories",(req,res) => {
    let sql = `select  * from categories  `;

    db.query(sql,(err,result) => {
        if(err) throw err;

        else{
            res.status(200).send({cat:result});
        }
    })
})

module.exports = router;