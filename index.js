//import modules
const express = require('express');
const exphbs = require('express-handlebars');
const Greetings = require('./greet');
const bodyParser = require('body-parser');
// const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

//define instances
let app = express();

// should we use a SSL connection
// let useSSL = false;

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
app.get('/', (req, res) => {
    res.render('home');
});
//define a POST route handler to handle sumbitted info in the form
app.post('/greetings', async (req, res, next) => {
    try {
        // let enteredName = req.body.nameInput;
        // let selectLanguage = req.body.whichLanguage;
        //define an object with key value pair to store inputs and render that data to home
        res.render('home', {
            display: await greets.setEnteredName(req.body.whichLanguage, req.body.nameInput),
            counter: await greets.getEnteredNameCount()
        });
    } catch (error) {
        next(error.stack);
    }
});
//define a GET route handler handle greeted users
// app.get('/greeted/', (req, res) => {
//     let enterName = greets.getGreetedNames();
//     if (enterName !== undefined) {
//         res.render('greeted', {
//             names: enterName
//         });
//     }
// });
// //define a GET route handler to check how many times a user have been greeted
// app.get('/counter/:users', (req, res) => {
//     let users = req.params.users;
//     res.render('counter',
//         greets.filterNames(users)
//     );
//     console.log(greets.filterNames());
// });
let PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});