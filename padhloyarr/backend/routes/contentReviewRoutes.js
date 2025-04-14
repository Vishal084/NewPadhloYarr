const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authenticateUser');
const isAdmin = require('../middlewares/isAdmin');

// Import course content controllers
const {
  addModule,
  addSection,
  getCourseModules,
  getModuleSections,
  markSectionCompleted
} = require('../controllers/course/courseContentController');

// Import review controllers
const {
  addReview,
  getCourseReviews
} = require('../controllers/course/reviewsController');

// Course content routes
router.post('/:courseId/modules', authenticateUser, isAdmin, addModule);
router.post('/modules/:moduleId/sections', authenticateUser, isAdmin, addSection);
router.get('/:courseId/modules', getCourseModules);
router.get('/modules/:moduleId/sections', getModuleSections);
router.post('/:courseId/sections/:sectionId/complete', authenticateUser, markSectionCompleted);

// Review routes
router.post('/:courseId/reviews', authenticateUser, addReview);
router.get('/:courseId/reviews', getCourseReviews);

module.exports = router;