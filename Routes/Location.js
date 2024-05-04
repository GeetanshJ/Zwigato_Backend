const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/Location",(req,res) => {
    let location_sql = `select * from locations`;
    db.query(location_sql,(err,results) => {
        if(err){
            throw err;
        }

        else{
            res.send("200",{locate : results})
        }
    })
})
module.exports = router;