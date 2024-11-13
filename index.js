const express = require('express');
const app = express();

// Body parser middleware
app.use(express.json());

const coursesRouter = require('./routes/coursesRoutes');
app.use('/api/courses', coursesRouter);


app.listen('5000', () => {
    console.log('Listening to post 5000');
})