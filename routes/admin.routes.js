const router = require("express").Router();
const userController = require("../controllers/admin.controller");

router.get("/login",userController.getLoginPage);

module.exports = router