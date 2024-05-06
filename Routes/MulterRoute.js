const multer = require("multer");
const express = require("express")
const router = express.Router()
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/hotel_images");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
    res.send("Image uploaded successfully");
});

module.exports = router;
