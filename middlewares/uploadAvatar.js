const multer = require("multer");
const path = require("path");

if ("../assets/uploads")
  var diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../assets/uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `tomei-${file.originalname}`);
    },
  });

var uploadAvatar = multer({ storage: diskStorage });
module.exports = uploadAvatar;
