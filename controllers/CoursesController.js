const {validationResult} = require('express-validator');

const Course = require("../models/course_model");
const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json({status: httpStatusText.SUCCESS, data: {courses}});
};


const getSingleCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if(!course)
        {
            return res.status(404).json({status: httpStatusText.FAIL, data: {course: null}});
        }
        res.json({status: httpStatusText.SUCCESS, data: {course}});
    }
    catch(err) {
        return res.status(400).json({status: httpStatusText.ERROR, data: null, message: err.message, code: 400});
    }
}


const addCourse = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({status: httpStatusText.FAIL, message: errors.array()});
    }

    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({status: httpStatusText.SUCCESS, data: {course: newCourse}});
}


const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.updateOne({_id: req.params.courseId}, {$set: {...req.body}});
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {course: updatedCourse}});
    }
    catch(err) {
        return res.status(400).json({status: httpStatusText.ERROR, message: err.message})
    }
}


const deleteCourse = async (req, res) => {
    try {
        await Course.deleteOne({_id: req.params.courseId});
        return res.status(200).json({status: httpStatusText.SUCCESS, data: null});
    }
    catch(err) {
        return res.status(400).json({status: httpStatusText.ERROR, data: null, message: err.message})
    }
}

module.exports = {
    getAllCourses,
    getSingleCourse,
    addCourse,
    updateCourse,
    deleteCourse
}