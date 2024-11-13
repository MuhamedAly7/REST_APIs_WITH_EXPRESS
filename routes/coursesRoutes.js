
const express = require('express');

const router = express.Router();

const coursesController = require('../controllers/CoursesController');


// Body validator
const {body} = require('express-validator');
const { validationSchema } = require('../middlewares/validationSchema');


router.route('/')
            .get(coursesController.getAllCourses)
            .post(validationSchema(), coursesController.addCourse);


router.route('/:courseId')
                .get(coursesController.getSingleCourse)
                .patch(coursesController.updateCourse)
                .delete(coursesController.deleteCourse);

module.exports = router;