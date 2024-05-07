const multer = require("multer");
const express = require("express")
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });

router.post("/hotel_details", upload.single("hotel_image"), (req, res) => {
    const hotelName = req.body.hotel_name;
    const address = req.body.address;
    const contactNumber = req.body.contact_number;
    const locationID = req.body.location_id;
    const categoryID = req.body.category_id;
    let imageFileName = "";
    let imageMimeType = "";
    try {
        imageFileName = req.file.filename;
        imageMimeType = req.file.mimetype;
    } catch (error) {
        console.log(error);
    }
    const sql = `INSERT INTO hotels (name, address, contact_number, locationID, categoryID, images) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [hotelName, address, contactNumber, locationID, categoryID, imageFileName];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting hotel details:", err);
            res.redirect("/home"); // Redirect to home page in case of error
        } else {
            console.log("Hotel details inserted successfully.");
            res.redirect("/home"); // Redirect to home page after successful insertion
        }
    });
});


module.exports = router;
