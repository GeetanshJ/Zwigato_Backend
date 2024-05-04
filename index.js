const express= require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors");
const LocationRoute = require("../backend_zwigato/Routes/Location");
const HotelRoute = require("../backend_zwigato/Routes/HoteList");

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req,res) => {
    res.send("hello");
})

app.get("/location",LocationRoute);
app.get("/hotel",HotelRoute);

app.listen(8000);