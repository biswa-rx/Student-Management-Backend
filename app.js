const express  = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');

const studentRegisterRoute = require('./Routes/RegisterStudent.route');
const teacherRegisterRoute = require('./Routes/RegisterTeacher.route');

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/register_student',studentRegisterRoute);
app.use('/register_teacher',teacherRegisterRoute);

app.get('/', async(req, res, next) => {
    // console.log(req.headers['authorization'])
    res.send("Hello from express.");
})

app.use(async(req, res, next) => {
    // const error = new Error("NOT_FOUND");
    // error.status = 404;
    // next(error);
    // next(createError(404,"NOT_FOUND"));
    next(createError.NotFound())
})

app.use((err,req,res,next)=> {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});