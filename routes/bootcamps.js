const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults');

// Include other resource router
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

// Reroute to other resource router
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
