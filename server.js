const express = require('express'); // for express framework
const mongoose = require('mongoose'); // for interacting with MongoDB
const bodyParser = require('body-parser'); // for middleware

//api routes
const users = require('./routes/api/users');

//express initialization
const app = express();

//Body parser middleware (used to read values from )
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB configuration
const db = require('./config/keys').mongoURI

//Connection to MongoDB
mongoose
.connect(db, {useNewUrlParser:true})
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));

//Using apis
app.use('/api/users', users);

//Setting server and port
const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server running on port ${port}`));
