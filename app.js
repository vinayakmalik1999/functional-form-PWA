const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
var session = require('client-sessions');
const axios = require('axios');
const requestURL = "https://kt-dev.outsystemscloud.com/PWABack/rest/EmployeeDetail/GET";

// setting view engine template to pug
app.set('view engine', 'pug')
//function to get ID from URL passed

//using axios to get data from URL
axios({
  method: 'get',
  url: requestURL,
  headers: {
    EmployeeId: '1'
  }})
.then((res) => {
  console.log(res.data);
});
/*
* Route to render HTML Page
*/
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/form-data/form.html'));
  //__dirname : It will resolve to  project folder.
});
//edit details routing
app.get('/form/*',function (req,res){
  
  res.render('index', {title: 'Hey'},);

});

// used for giving access to static files
app.use(express.static('form-data'));
//starting local server
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
