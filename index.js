const express = require('express');
const routes = require('./routes/api');
const port = process.env.PORT || 3000;

// set up express app
const app = express();

// MongooDB connection
require('./config/db');


// Middlewares
app.use(express.urlencoded({extended : true }));
app.use(express.json());


// Routes
app.use('/api',routes);

// ERROR HANDLING MIDDLEWARES
app.use((error, req, res, next) => {
    res.status(422).send({error: error.message});
    // console.log(error.message);
})


// Home route
app.get('/', (req, res) => {
   console.log("IN HOME ROUTE");
   res.end();
})


// Server running
app.listen(port, ()=>{
    console.log(`app running at ${port}`);
})