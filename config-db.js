'use strict';

const mongoose = require('mongoose');

const arcDB = mongoose.connect("mongodb://localhost/ARC", (err) => {
    if(err) console.log(err);

    console.log(`The connection has been established on mongodb://localhost/ARC`);
});

exports.arcDB = arcDB;