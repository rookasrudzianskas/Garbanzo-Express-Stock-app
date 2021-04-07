const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//pk_be5627477eda4219ab8663c382811c82
//create call api func
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_be5627477eda4219ab8663c382811c82', { json: true }, (err, res, body) => {
        if(err) {return console.log(err);}
        if(res.statusCode === 200) {
            // console.log(body);
            finishedAPI(body);
        };
    });
};

const otherStuff = "This is other stuff";

//Set handlebars middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set index handlebar routes
app.get('/', function (req, res) {
    call_api(function(doneAPI){
            res.render('home', {
            stock: doneAPI
        });
    }, "fb");
});

//Set index hadebark index POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,

        });
    }, req.body.stock_ticker);
});

//create about apge rount

app.get('/about.html', function (req, res) {
    res.render('about');
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log("Server listening on port " + PORT));