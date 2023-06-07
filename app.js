const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require("./config/database")
const session = require('express-session');


mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log(`${connected}Connected to databasee` +config.database)
});

mongoose.connection.on('error', (err) => {
    console.log(`${red_error}Database error:` +err)
});

//#region Colors
// Colors for console log
const magneta_main = '\x1b[38;5;39m';
const red_error = '\x1b[31m';
const connected = '\x1b[38;5;82m';

//#endregion


const app = express();



const users = require('./routes/users');
const database = require('./config/database');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);











app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log(`${magneta_main}Server started on port ` + port)
});