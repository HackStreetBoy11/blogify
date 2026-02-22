const express = require('express');
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')

const userRoute = require('./routes/user')

const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('home');
})
app.use('/user', userRoute);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server started at port:${port}`)
})

