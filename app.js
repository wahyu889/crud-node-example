const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');



const blogRoutes = require('./routes/blogRoutes');
// express app
const app = express();

//CONNECT TO Mongodb
const dbURI = 'mongodb+srv://node1:katasandi@nodeexample.9hya4.mongodb.net/node-example=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true })
.then((result) => app.listen(3000)).catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');


/** middleware & static files */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* mongoose and mongo sandbox routes (BASIC EXAMPLE)
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New blog',
        snippet: 'about my blog',
        body: 'more about my blog'
    });
    blog.save()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) =>{
    Blog.findById('60ab9b2f4264de27f08c3b48')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})
*/

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})



app.get('/about', (req, res) => {
    res.render('about', {title: 'about'});
})


// blog routes
app.use('/blogs',blogRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})