const router = require("express").Router();
const userController = require("../controllers/admin.controller");
const programController = require("../controllers/program.controller");
const bookingController = require("../controllers/booking.controller");
const { authenticated } = require("../middleware/auth.guard");

router.get("/login",userController.getLoginPage);
router.post("/login",userController.loginUser);
router.get("/dashboard",userController.getDashboardPage);

// User Routes
router.get("/users/",authenticated ,userController.getAllUsers);
router.get("/users/add",authenticated ,userController.getAddUserPage);
router.post("/users/add",authenticated ,userController.addUser);
router.get("/users/edit/:id",authenticated ,userController.getEditUserPage);
router.post("/users/edit/:id",authenticated ,userController.updateUser);
router.get("/users/delete/:id",authenticated ,userController.deleteUser);



// Tour Company Routes
router.get("/tourCompany",authenticated ,userController.getTourCompanyPage);
router.get("/tourCompany/add",userController.getAddCompanyPage);
router.post("/tourCompany/add",userController.AddCompany);
router.get("/tourCompany/delete/:id",userController.deleteCompany);
router.get("/tourCompany/edit/:id",userController.getCompanyPage);
router.post("/tourCompany/edit/:id",userController.updateCompany);

// Program Routes
router.get("/programs",programController.getAllPrograms);
router.get("/programs/add",programController.getAddProgramPage);
router.post("/programs/add",programController.AddProgram);
router.get("/programs/delete/:id",programController.deleteCompany);
router.get("/programs/edit/:id",programController.getProgramPage);
router.post("/programs/edit/:id",programController.updateProgram);


// Bookings Routes
router.get("/bookings",bookingController.getAdminBookingPage);
router.get("/bookings/add",bookingController.getBookingPage);
// router.post("/bookings/add",bookingController.AddProgram);
// router.get("/bookings/delete/:id",bookingController.deleteCompany);
router.get("/bookings/edit/:id",bookingController.getEditAdminBookingPage);
router.post("/bookings/edit/:id",bookingController.updateBooking);


module.exports = router