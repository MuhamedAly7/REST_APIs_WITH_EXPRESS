const express = require('express');
const app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/nodejs-learn';
mongoose.connect(url).then(() => {
    console.log('mongodb server started');
});

// Body parser middleware
app.use(express.json());

const coursesRouter = require('./routes/coursesRoutes');
app.use('/api/courses', coursesRouter);


app.listen('5000', () => {
    console.log('Listening to post 5000');
})