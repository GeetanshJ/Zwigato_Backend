const multer = require("multer");
const express = require("express")
const router = express.Router();
const db = require("../utils/Database")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });

router.post("/", upload.single("hotel_image"), (req, res) => {
    const{partnerID,name, address, contact_number, images,email,locationID} = req.body;
    let imageFileName = "";
    let imageMimeType = "";
    try {
        imageFileName = req.file.filename;
        imageMimeType = req.file.mimetype;
    } catch (error) {
        console.log(error);
    }
    const sql = `INSERT INTO hotels (partnerID,name, address, contact_number, images,email,locationID) VALUES (?, ?, ?, ?, ?, ?,?)`;
    const values = [partnerID,name, address, contact_number, imageFileName,email,locationID];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting hotel details:", err);
            res.redirect("/"); 
        } else {
            console.log("Hotel details inserted successfully.");
            res.redirect("/"); // Redirect to home page after successful insertion
        }
    });
});


module.exports = router;
