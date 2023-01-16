'use strict';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/audio-files', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    }).then(() => console.log('Connected to Mongodb......'));
}

