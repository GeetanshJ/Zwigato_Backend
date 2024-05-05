const express= require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors");
const LocationRoute = require("../backend_zwigato/Routes/Location");
const HotelRoute = require("../backend_zwigato/Routes/HoteList");
const MulterRoute = require("../backend_zwigato/Routes//MulterRoute");

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req,res) => {
    res.send("hello");
})

app.get("/location",LocationRoute);
app.get("/hotel",HotelRoute);
app.get("/upload",MulterRoute);

app.listen(8000);