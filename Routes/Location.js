const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/",(req,res) => {
    let location_sql = `select * from locations`;
    db.query(location_sql,(err,results) => {
        if(err){
            throw err;
        }

        else{
            res.status(200).send({locate : results});
        }
    })
})
module.exports = router;