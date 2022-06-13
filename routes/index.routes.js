const router = require("express").Router();
const bookingController = require("../controllers/booking.controller");
const indexController = require("../controllers/index.controller");

router.get("/", indexController.getHomePage);
router.get("/bookings", bookingController.getBookingPage)

module.exports = router