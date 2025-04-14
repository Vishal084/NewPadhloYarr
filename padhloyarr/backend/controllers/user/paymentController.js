const { createPaymentIntent } = require('../../config/paymentConfig');
const User = require('../../models/User');
const Course = require('../../models/Course');

// Process checkout
const processCheckout = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('cart');
    
    if (!user.cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    
    // Calculate total amount
    let totalAmount = 0;
    for (const course of user.cart) {
      totalAmount += course.price;
    }
    
    // Create payment intent with Stripe
    const paymentIntent = await createPaymentIntent(totalAmount, { userId: user._id.toString() });
    
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};

// Confirm purchase after payment
const confirmPurchase = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentIntentId } = req.body;
    
    const user = await User.findById(userId);
    
    // Move courses from cart to purchased courses
    for (const courseId of user.cart) {
      // Check if already purchased
      const alreadyPurchased = user.purchasedCourses.some(
        pc => pc.toString() === courseId.toString()
      );
      
      if (!alreadyPurchased) {
        user.purchasedCourses.push(courseId);
        
        // Initialize progress for this course
        user.progress.push({
          course: courseId,
          completedModules: [],
          completion: 0
        });
        
        // Update course students count
        await Course.findByIdAndUpdate(courseId, {
          $addToSet: { students: userId }
        });
      }
    }
    
    // Clear the cart
    user.cart = [];
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Purchase completed successfully",
      purchasedCourses: user.purchasedCourses
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm purchase", error: error.message });
  }
};

// Get purchased courses
const getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('purchasedCourses');
    
    res.status(200).json({
      purchasedCourses: user.purchasedCourses
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchased courses", error: error.message });
  }
};

module.exports = {
  processCheckout,
  confirmPurchase,
  getPurchasedCourses
};