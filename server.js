const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

let apiUrl = `https://restcountries.eu/rest/v2/name/Estonia?fullText=true`;
let country;

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
    country = req.body.country;
    apiRequest(object  =>{
        console.log(object[0]);
        let data = object[0];
        res.render('result',{data: data});
    });

 });

 function apiRequest(object){
    let apiUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
    fetch(apiUrl) 
        .then(res => res.json())
        .then(res => {
          return object(res);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

app.listen(3000);