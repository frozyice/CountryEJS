const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index')
});


app.get('/result',(req,res)=>{
    res.render('result')
});

app.post("/result", function(req, res){
    var country = req.body.country;
    console.log(country);
    res.render('result',{data : {
        country : country}});
 });

app.listen(3000);