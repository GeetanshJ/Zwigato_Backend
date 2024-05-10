const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/:locationID/:hotelID/:categoryID",(req,res) => {
    let id = req.params.categoryID;
    let id_hotel = req.params.hotelID;
    let id_location = req.params.id_location;

    console.log(id);

    let sql = `  SELECT * FROM menuList WHERE hotelID = ?  and categoryID =? and locationID = ?`;

    db.query(sql,[id_hotel,id,id_location],(err,result) => {
        if(err) throw err;

        else{
            res.status(200).send({catHotelItemSelected:result});
        }
    })
})

module.exports = router;