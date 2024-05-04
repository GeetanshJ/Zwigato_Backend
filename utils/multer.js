const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./public");
    },

    filename: function(req,file,cb){
        cb(null,  "./uploads/hotel_images/" + file.originalname)
    }
});

const uploads = multer({ storage: storage });