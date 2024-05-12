const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/:locationID/:categoryID",(req,res) => {
    let id = req.params.categoryID;
    let id1 = req.params.locationID;


    let sql = `  select hotels.* from hotels where hotelID in (Select hotelID from hotel_categories where categoryID = ? and locationID = ?);  `;

    db.query(sql,[id,id1],(err,result) => {
        if(err) throw err;

        else{
            res.status(200).send({catSelected:result});
        }
    })
})

module.exports = router;