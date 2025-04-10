const User = require("../../models/User");
const Course = require("../../models/Course");

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const user = await User.findById(userId);
    if (!user.cart.includes(courseId)) {
      user.cart.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: "Course added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const user = await User.findById(userId);
    if (!user.wishlist.includes(courseId)) {
      user.wishlist.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: "Course added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist", error: error.message });
  }
};

module.exports = {
  addToCart,
  addToWishlist
};
