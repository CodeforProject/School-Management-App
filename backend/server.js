const express=require('express')
const cors = require('cors');
const studentRoute = require('./routes/studentRoutes');

const classRoute = require('./routes/classRoutes');
const teacherRoute = require('./routes/teacherRoutes');


const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

app.use(cors({ origin: 'https://school-managment-app.vercel.app' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});


app.get('/api/students', (req, res) => {
    res.json(students);
});

app.use('/api/student', studentRoute);
app.use('/api/class', classRoute);
app.use('/api/teacher',teacherRoute);

app.listen(process.env.PORT,console.log("serverconnected"))