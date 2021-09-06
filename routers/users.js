const router = require("express").Router();
const UserControllers = require("../controllers/users.js");
const uploadAvatar = require("../middlewares/uploadAvatar");

router.post("/signup", uploadAvatar.single("file"), UserControllers.signUp);

module.exports = router;
