const router = require("express").Router();
const userController = require("../controllers/admin.controller");

router.get("/login",userController.getLoginPage);
router.get("/dashboard",userController.getDashboardPage);
router.get("/tourCompany",userController.getTourCompanyPage);
router.get("/tourCompany/add",userController.getAddCompanyPage);
router.post("/tourCompany/add",userController.AddCompany);
router.get("/tourCompany/delete/:id",userController.deleteCompany);
router.get("/tourCompany/edit/:id",userController.getCompanyPage);
router.post("/tourCompany/edit/:id",userController.updateCompany);


module.exports = router