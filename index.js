//import modules
const express = require('express');
const exphbs = require('express-handlebars');
const Greetings = require('./greet');
const bodyParser = require('body-parser');

//define instances
let app = express();
let greets = Greetings();

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
app.post('/greetings', (req, res) => {
    let enteredName = req.body.nameInput;
    let selectLanguage = req.body.whichLanguage;
    //define an object with key value pair to store inputs and render that data to home
    res.render('home', {
        display: greets.setEnteredName(selectLanguage, enteredName),
        count: greets.getEnteredNameCount()
    });
});
//define a GET route handler handle greeted users
app.get('/greeted/', (req, res) => {
    let enterName = greets.getGreetedNames();
    console.log(enterName);
    if(enterName !== undefined){
        res.render('greeted', {
            names: enterName
        });
    }
});

//define a GET route handler to check how many times a user have been greeted
app.get('/counter/:users', (req, res) => {
    let users = req.params.users;
    res.render('counter');
});

let PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});