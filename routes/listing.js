const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

//Index Route
router.get("/listing", wrapAsync(listingController.index));

//New Route
router.get("/listings/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/listing/:id", wrapAsync(listingController.showListing));

//Create Route
router.post(
  "/listings",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//Edit route
router.get(
  "/listings/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//Update route
router.put(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//Delete route
router.delete(
  "/listings/:id",
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
