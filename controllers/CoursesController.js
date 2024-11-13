var {courses} = require('../data/courses');
const {validationResult} = require('express-validator');


const getAllCourses = (req, res) => {
    res.json(courses);
};

const getSingleCourse = (req, res) => {
    const courseId = +req.params.courseId;
    const course = courses.find((course) => course.id === courseId)
    if(!course)
    {
        return res.status(404).json({msg: "Course Not Found!", statusCode: 404});
    }
    res.json(course);
}

const addCourse = (req, res) => {
    const course = req.body;
    
    if(!course.id)
    {
        course.id = courses.at(-1).id + 1;
    }

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json(errors.array());
    }

    courses.push(course);
    res.status(201).json({msg: "Course Created successfully!"});
}


const updateCourse = (req, res) => {
    const courseId = +req.params.courseId;
    let course = courses.find((course) => course.id === courseId);
    const findIndex = courses.findIndex((item) => item.id === courseId);

    if(!course)
    {
        return res.status(404).json({msg: "course not found"});
    }
    course = {...course, ...req.body};
    courses[findIndex] = course;
    res.status(200).json(course);
}


const deleteCourse = (req, res) => {
    const courseId = +req.params.courseId;
    const course = courses.find((course) => course.id === courseId);
    if(!course)
    {
        res.status(404).json({msg: "course not found"});
    }
    courses = courses.filter((course) => course.id !== courseId);
    res.status(200).json({msg: "course deleted successfully"});
}

module.exports = {
    getAllCourses,
    getSingleCourse,
    addCourse,
    updateCourse,
    deleteCourse
}