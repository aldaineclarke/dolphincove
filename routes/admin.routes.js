const router = require("express").Router();
const userController = require("../controllers/admin.controller");
const programController = require("../controllers/program.controller");
const bookingController = require("../controllers/booking.controller");

router.get("/login",userController.getLoginPage);
router.get("/dashboard",userController.getDashboardPage);

// Tour Company Routes
router.get("/tourCompany",userController.getTourCompanyPage);
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