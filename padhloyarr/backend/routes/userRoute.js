const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authenticateUser');


const { addToCart, addToWishlist } = require("../controllers/user/cartWishlist");

// const authenticate = require("../middlewares/authenticateUser");


const updateProgress = require("../controllers/user/updateProgress");


router.post("/progress", authenticateUser, updateProgress);

router.post("/cart", authenticateUser, addToCart);

router.post("/wishlist", authenticateUser, addToWishlist);


module.exports = router;
