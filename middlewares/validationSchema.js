const {body} = require('express-validator');

const validationSchema = () => {
    return [
        body('title')
           .notEmpty()
           .withMessage('title is required')
           .isLength({min: 2})
           .withMessage('title at least is 2 characters')
           .custom(async (title) => {const existingTitle = await courses.find((course) => course.title === title); if (existingTitle) {
               throw new Error('Title must be unique');
             } return true;}), 
       body('price')
           .notEmpty()
           .withMessage('price is required')
        ];
}

module.exports = {
    validationSchema
}