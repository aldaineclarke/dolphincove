const router = require("express").Router();
const userController = require("../controllers/admin.controller");
const programController = require("../controllers/program.controller");
const bookingController = require("../controllers/booking.controller");
const { authenticated, isSuperAdmin } = require("../middleware/auth.guard");

router.get("/login", userController.getLoginPage);
router.post("/login", userController.loginUser);

router.get("/logout", authenticated, userController.logoutUser);

// User Routes
router.get("/users/", authenticated, userController.getAllUsers);
router.get("/users/add", authenticated, userController.getAddUserPage);
router.post("/users/add", authenticated, userController.addUser);
router.get("/users/edit/:id", authenticated, userController.getEditUserPage);
router.post("/users/edit/:id", authenticated, userController.updateUser);
router.get("/users/delete/:id", authenticated, userController.deleteUser);



// Tour Company Routes
router.get("/tourCompany", isSuperAdmin, userController.getTourCompanyPage);
router.get("/tourCompany/add", isSuperAdmin, userController.getAddCompanyPage);
router.post("/tourCompany/add", isSuperAdmin, userController.AddCompany);
router.get("/tourCompany/delete/:id", isSuperAdmin, userController.deleteCompany);
router.get("/tourCompany/edit/:id", isSuperAdmin, userController.getCompanyPage);
router.post("/tourCompany/edit/:id", isSuperAdmin, userController.updateCompany);

// Program Routes
router.get("/programs", isSuperAdmin, programController.getAllPrograms);
router.get("/programs/add", isSuperAdmin, programController.getAddProgramPage);
router.post("/programs/add", isSuperAdmin, programController.AddProgram);
router.get("/programs/delete/:id", isSuperAdmin, programController.deleteCompany);
router.get("/programs/edit/:id", isSuperAdmin, programController.getProgramPage);
router.post("/programs/edit/:id", isSuperAdmin, programController.updateProgram);


// Bookings Routes
router.get("/bookings", authenticated, bookingController.getAdminBookingPage);
router.get("/bookings/add", authenticated, bookingController.getBookingPage);

router.get("/bookings/edit/:id", authenticated, bookingController.getEditAdminBookingPage);
router.post("/bookings/edit/:id", authenticated, bookingController.updateBooking);


module.exports = router