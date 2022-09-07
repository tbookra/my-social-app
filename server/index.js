const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

dotenv.config();

mongoose.connect('mongodb://localhost:27017/social-app', ()=>{
    console.log('mongoose is connected');
});

// middlewares:
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.get('/', (req,res) => {
    res.send('welcome to social server')
})
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

app.listen(8800, () => {
  console.log("server is running on 8800");
});
