//import modules
const express = require('express');
const exphbs = require('express-handlebars');
const Greetings = require('./greet');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

// const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

//define instances
let app = express();

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
//define a connection string to be able to connect to the database.
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetings';
const pool = new Pool({
    connectionString
    // ssl: useSSL
});
let greets = Greetings(pool);

//configure express handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

//configure public for=lder for static files
app.use(express.static('public'));
//define a GET roiute handler to render home
app.get('/', async (req, res, next) => {
    try {
        let addCountSQL = await pool.query('select * from users');
        let counts = addCountSQL.rowCount;
        res.render('home', {
            counts
        });
    } catch (error) {
        next(error.stack);
    }
});
//define a POST route handler to handle sumbitted info in the form
app.post('/greetings', async (req, res, next) => {
    try {
        //define two variables to store values from body-parsers
        let enteredNames = req.body.nameInput;
        let languages = req.body.whichLanguage;
        //Check if both inputs are empty if so return error messages
        if (enteredNames == null || enteredNames == '') {
            req.flash('error', 'Please enter a NAME in the text field..!');
        } else {
            if (languages == undefined) {
                req.flash('error', 'Please select one of the languages in one of the radio buttons..!');
            } else {
                await greets.setEnteredName(languages, enteredNames);
                await greets.getGreetedNames();
            }
        }

        res.redirect('/');
        // else if ( languages == undefined) {
        //     req.flash('error', 'Please select one of the languages in one of the radio buttons..!');
        //     // return false;
        // }
        //define an object with key value pair to store inputs and render that data to home
    } catch (error) {
        next(error.stack);
    }
});
//define a GET route handler handle greeted users
app.get('/greeted/', async (req, res, next) => {
    try {
        res.render('greeted', {
            user_name: await greets.returnGreetedNames()
        });
    } catch (error) {
        next(error.stack);
    }
});
// //define a GET route handler to check how many times a user have been greeted
app.get('/counter/:user_name', async (req, res, next) => {
    let user = req.params.user_name;
    try {
        res.render('counter', await greets.getNameCounter(user));
    } catch (error) {
        next(error.stack);
    }
});
//define a POST route to delete all users inside DB
app.get('/delete', async (req, res, next) => {
    try {
        res.render('home', await greets.resetData());
    } catch (error) {
        next(error.stack);
    }
});
//define a GET route to render HOME PAGE
app.get('/count_home', (req, res, next) => {
    try {
        res.redirect('/');
    } catch (error) {
        next(error.stack);
    }
});
//define a GET route to render GREETED PAGE
app.get('/back_greeted', (req, res, next) => {
    try {
        res.redirect('greeted');
    } catch (error) {
        next(error.stack);
    }
});
//define a GET route to render HOME PAGE from GREETED PAGE
app.get('/back_home', (req, res, next) => {
    try {
        res.redirect('/');
    } catch (error) {
        next(error.stack);
    }
});

let PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
    console.log('App successfully started on port', PORT);
});