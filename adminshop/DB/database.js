let mongoose = require('mongoose');

const mongdodb_url = 'mongodb+srv://smartshop:12345@cluster0.ry2ed.mongodb.net/SmartShop';

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(mongdodb_url, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(() => {
            console.log('Database connection successfully!');
        })
        .catch(err => {
            console.log('Database connection error!');
        })
    }
}

module.exports = new Database();