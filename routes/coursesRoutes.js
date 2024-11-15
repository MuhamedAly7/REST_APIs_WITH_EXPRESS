
const express = require('express');

const router = express.Router();

const coursesController = require('../controllers/CoursesController');


// Body validator
const {body} = require('express-validator');
const { validationSchema } = require('../middlewares/validationSchema');
const verifyToken = require('../middlewares/verifyToken');


router.route('/')
            .get(coursesController.getAllCourses)
            .post(verifyToken, validationSchema(), coursesController.addCourse);


router.route('/:courseId')
                .get(coursesController.getSingleCourse)
                .patch(coursesController.updateCourse)
                .delete(coursesController.deleteCourse);

module.exports = router;