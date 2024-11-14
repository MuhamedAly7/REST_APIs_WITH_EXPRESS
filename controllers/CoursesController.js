const {validationResult} = require('express-validator');

const Course = require("../models/course_model");


const getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};


const getSingleCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if(!course)
        {
            return res.status(404).json({msg: "Course Not Found!", statusCode: 404});
        }
        res.json(course);
    }
    catch(err) {
        return res.status(400).json({msg: "invalid Object ID"});
    }
}


const addCourse = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json(errors.array());
    }

    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({msg: "Course Created successfully!"});
}


const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.updateOne({_id: req.params.courseId}, {$set: {...req.body}});
        return res.status(200).json(updatedCourse);
    }
    catch(err) {
        return res.status(400).json({error: err})
    }
}


const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.deleteOne({_id: req.params.courseId});
        return res.status(200).json(deletedCourse);
    }
    catch(err) {
        return res.status(400).json({error: err})
    }
}

module.exports = {
    getAllCourses,
    getSingleCourse,
    addCourse,
    updateCourse,
    deleteCourse
}