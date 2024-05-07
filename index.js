const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const LocationRoute = require("../backend_zwigato/Routes/Location");
const HotelRoute = require("../backend_zwigato/Routes/HoteList"); // Corrected typo in route file name
const MulterRoute = require("../backend_zwigato/Routes/MulterRoute"); // Corrected typo in route file name
const MenuList = require("../backend_zwigato/Routes/MenuList"); // Corrected typo in route file name
const Categories = require("../backend_zwigato/Routes/Categories"); // Corrected typo in route file name

app.use(express.static('public/uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/location", LocationRoute);
app.get("/hotel", HotelRoute);
app.use("/owner", MulterRoute);
app.get("/menu", MenuList);
app.get("/categories", Categories);

app.listen(8000);
