const express = require('express');
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const Blog = require('./models/blog')

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})
app.use('/user', userRoute);
app.use('/blog', blogRoute);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server started at port:${port}`)
})

