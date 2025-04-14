const Course = require('../../models/Course');

const searchCourses = async (req, res) => {
  try {
    const { 
      q, // search query
      category,
      minPrice,
      maxPrice,
      sort // e.g. 'price_asc', 'price_desc', 'rating', 'newest'
    } = req.query;
    
    // Build query
    let query = {};
    
    // Search in title and description
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Build sort options
    let sortOptions = {};
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOptions.price = 1;
          break;
        case 'price_desc':
          sortOptions.price = -1;
          break;
        case 'rating':
          sortOptions.averageRating = -1;
          break;
        case 'newest':
          sortOptions.createdAt = -1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      // Default sort by newest
      sortOptions.createdAt = -1;
    }
    
    const courses = await Course.find(query)
      .sort(sortOptions)
      .populate('instructor', 'name');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching courses",
      error: error.message
    });
  }
};

// Get course categories
const getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message
    });
  }
};

module.exports = {
  searchCourses,
  getCategories
};