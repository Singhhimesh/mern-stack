const express = require('express');

const app = express();

const cros = require('cors');

app.use(cros({
    origin: '*',
}));

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.4");

const postRoute = require('./routes/posts/index');

app.use('/api', postRoute);

app.listen(8000, () => {
    console.log('Server is running...');
});