const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

//let result;

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
    fetchData(object  =>{
        console.log(object[0].name);
        data = object[0];
        res.render('result',{data: data});
    });
    
    /*
    let result = apiRequest(country);
    console.log('result');
    console.log(result);
    res.render('result',{data : {
        country : country}});
        */
 });
//<%= data.country %>

 function fetchData(callback){
    let apiUrl = `https://restcountries.eu/rest/v2/name/estonia?fullText=true`
    fetch(apiUrl) //Could change this to a find request to the data base directly like Teacher.find()...
        .then(res => res.json())
        .then(res => {
          return callback(res);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }

 function apiRequest(country){
    let apiUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`

    fetch(apiUrl)
    .then(response => {
        //console.log(response);
        return response.json();        
    }).then(function (data){
        //console.log(data);
        //alert(data.timezone);
        //let temp = Math.floor((data.currently.temperature-32)*5/9);
        //console.log(temp);
        //result = data;
        //console.log(data);
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
 }


app.listen(3000);