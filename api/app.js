require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
    express.json()(req, res, err => {
        if (err) {
            console.error(err);
            res.status(400).json({
                message: 'Bad Request'
            }); // Bad Request
        }
        next();
    });
});


// Services Routes
const quizRoute = require('./routes/QuizRoute');
app.use('/api/quiz', quizRoute);


const classRoute = require('./routes/ClassRoute');
app.use('/api/class', classRoute);





// Server Side Error
app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json({
            message: error.message
        });
});

module.exports = app;