const express = require('express');
const http = require('http');
const cors = require('cors');


require('dotenv').config();
require('./api/db/connect')();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define all routes
// const usersRoute = require('./api/resources/users/users.route');
const storiesRoute = require('./api/resources/stories/stories.route');
const categoriesRoute = require('./api/resources/categories/categories.route');

// app.use('/api/users', usersRoute);
app.use('/api/stories', storiesRoute);
app.use('/api/categories', categoriesRoute);

const server = http.createServer(app);

server.listen(port, () => {
    console.clear();
    console.log(`Listening on port : ${port}`);
});