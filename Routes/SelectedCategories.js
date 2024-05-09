const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/:categoryID",(req,res) => {
    let id = req.params.categoryID;
    console.log(id);
    console.log(typeof(id));

    let sql = `  select hotels.* from hotels where hotelID in (Select hotelID from hotel_categories where categoryID = ?);  `;

    db.query(sql,[id],(err,result) => {
        if(err) throw err;

        else{
            res.status(200).send({catSelected:result});
        }
    })
})

module.exports = router;