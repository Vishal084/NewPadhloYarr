// const express = require('express');
// const router = express.Router();
// const { authenticateUser } = require('../middlewares/authenticateUser');

// // Import controllers
// const { 
//     addToCart, 
//     removeFromCart, 
//     getCartItems, 
//     addToWishlist, 
//     removeFromWishlist, 
//     getWishlistItems,
//     moveToCart
//   } = require("../controllers/user/cartWishlist");


// const updateProgress = require("../controllers/user/updateProgress");

// // const {
// //     processCheckout,
// //     confirmPurchase,
// //     getPurchasedCourses
// //   } = require("../controllers/user/paymentController");


// // Progress routes
// router.post("/progress", authenticateUser, updateProgress);



// // Cart routes
// router.post("/cart", authenticateUser, addToCart);
// router.delete("/cart/:courseId", authenticateUser, removeFromCart);
// router.get("/cart", authenticateUser, getCartItems);



// // Wishlist routes
// router.post("/wishlist", authenticateUser, addToWishlist);
// router.delete("/wishlist/:courseId", authenticateUser, removeFromWishlist);
// router.get("/wishlist", authenticateUser, getWishlistItems);
// router.post("/wishlist/:courseId/move-to-cart", authenticateUser, moveToCart);

// // // Payment and checkout routes
// // router.post("/checkout", authenticateUser, processCheckout);
// // router.post("/confirm-purchase", authenticateUser, confirmPurchase);
// // router.get("/purchased-courses", authenticateUser, getPurchasedCourses);

// module.exports = router;






const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authenticateUser');

// Import controllers
const { 
  addToCart, 
  removeFromCart, 
  getCartItems, 
  addToWishlist, 
  removeFromWishlist, 
  getWishlistItems,
  moveToCart
} = require("../controllers/user/cartWishlist");

const updateProgress = require("../controllers/user/updateProgress");

// Progress routes
router.post("/progress", authenticateUser, updateProgress);

// Cart routes
router.get("/cart", authenticateUser, getCartItems);       // Get cart items
router.post("/cart", authenticateUser, addToCart);         // Add to cart
router.delete("/cart/:courseId", authenticateUser, removeFromCart); // Remove from cart

// Wishlist routes
router.get("/wishlist", authenticateUser, getWishlistItems);       // Get wishlist items
router.post("/wishlist", authenticateUser, addToWishlist);         // Add to wishlist
router.delete("/wishlist/:courseId", authenticateUser, removeFromWishlist); // Remove from wishlist
router.post("/wishlist/:courseId/move-to-cart", authenticateUser, moveToCart); // Move to cart

module.exports = router;