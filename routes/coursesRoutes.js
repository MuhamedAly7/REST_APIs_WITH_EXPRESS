
const express = require('express');

const router = express.Router();

const coursesController = require('../controllers/CoursesController');


// Body validator
const {body} = require('express-validator');
const { validationSchema } = require('../middlewares/validationSchema');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utils/roles');
const allowedTo = require('../middlewares/allowedTo');


router.route('/')
            .get(coursesController.getAllCourses)
            .post(verifyToken, validationSchema(), coursesController.addCourse);


router.route('/:courseId')
                .get(coursesController.getSingleCourse)
                .patch(coursesController.updateCourse)
                .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse);

module.exports = router;