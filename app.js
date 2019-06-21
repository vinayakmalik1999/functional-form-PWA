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

/*
* Route to render HTML Page
*/
app.get('/',function(req,res){
  res.redirect('/form.html')
  //__dirname : It will resolve to  project folder.
});
//edit details routing
app.get('/form/:eId',function (req,res){

 var newId = (req.params.eId)


  axios({
   method: 'get',
   url: requestURL,
   headers: {
     EmployeeId: newId
   }})
 .then((result) => {
   res.render('index',{Id:result.data.Id, Name:result.data.FirstName + " " + result.data.LastName,Email:result.data.Email,Number:result.data.PhoneNumber,Jobtitle:result.data.JobTitle,Address:result.data.Address} , (error,html) =>{res.send(html);});
 })
 .catch((res) => {
 console.log(res);

 })

});

// used for giving access to static files
app.use(express.static('form-data'));
//starting local server
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
