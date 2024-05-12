const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/:locationID/:hotelID/:categoryID",(req,res) => {
    let id_location = req.params.locationID;
    let id_hotel = req.params.hotelID;
    let id_cat = req.params.categoryID;

    let sql = `  SELECT * FROM menuList WHERE  locationID = ? and hotelID = ? and categoryID = ?  `;

    db.query(sql,[id_location,id_hotel,id_cat],(err,result) => {
        if(err) throw err;

        else{
            res.status(200).send({catHotelItemSelected:result});
        }
    })
})

module.exports = router;