const express = require('express');
const app = express();
const path = require('path');
var exphbs  = require('express-handlebars');
const request = require('request');

const PORT = process.env.PORT || 5000;

//pk_be5627477eda4219ab8663c382811c82
//create call api func
function call_api(finishedAPI) {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_be5627477eda4219ab8663c382811c82', { json: true }, (err, res, body) => {
        if(err) {return console.log(err);}
        if(res.statusCode === 200) {
            // console.log(body);
            finishedAPI(body);
        };
    });
};




const otherStuff = "This is otehr stuff";

//Set handlebars middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set hadnlebar routes
app.get('/', function (req, res) {
    call_api(function(doneAPI){
            res.render('home', {
            stock: doneAPI
        });
    });
});

//create about apge rount

app.get('/about.html', function (req, res) {
    res.render('about');
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log("Server listening on port " + PORT));