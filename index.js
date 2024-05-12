const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const LocationRoute = require("../backend_zwigato/Routes/Location");
const HotelRoute = require("../backend_zwigato/Routes/HoteList"); // Corrected typo in route file name
const MulterRoute = require("../backend_zwigato/Routes/MulterRoute"); // Corrected typo in route file name
const MenuList = require("../backend_zwigato/Routes/MenuList"); // Corrected typo in route file name
const Categories = require("../backend_zwigato/Routes/Categories"); // Corrected typo in route file name
const SelectedCategories = require("../backend_zwigato/Routes/SelectedCategories"); // Corrected typo in route file name
const specificMenu = require("../backend_zwigato/Routes/specificMenu"); // Corrected typo in route file name
const registerRoute = require('../backend_zwigato/Routes/register');
const loginRoute = require('../backend_zwigato/Routes/login');
app.use(express.static('public/uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/location", LocationRoute);
app.use("/hotel", HotelRoute);
app.use("/owner", MulterRoute);
app.use("/menu", MenuList);
app.use("/categories", Categories);
app.use("/selectedCategories", SelectedCategories);
app.use("/specificMenu", specificMenu);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.listen(8000);
