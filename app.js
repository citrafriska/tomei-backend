require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routers = require("./routers");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

global.__basedir = __dirname;

app.use(routers);
app.use(errorHandler);
app.use(helmet());

const uploads_dir = path.join(__dirname, "assets/uploads");
app.use("/uploads", express.static(uploads_dir));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
