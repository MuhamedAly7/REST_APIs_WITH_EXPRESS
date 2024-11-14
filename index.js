require('dotenv').config();
const express = require('express');

const cors = require('cors');

const app = express();

const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpStatusText');

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
    console.log('mongodb server started');
});

// Body parser middleware
app.use(express.json());

app.use(cors());

const coursesRouter = require('./routes/coursesRoutes');
app.use('/api/courses', coursesRouter);

// Global middileware for not found routes
app.all('*', (req, res, next) => {
    res.json({status: httpStatusText.ERROR, message: "This resource not available"});
});

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: (error.StatusText || httpStatusText.ERROR), message: error.message, code: error.statusCode || 500, data: null});
});

app.listen(process.env.PORT, () => {
    console.log(`Listening to post ${process.env.PORT}`);
})