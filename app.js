const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
var session = require('client-sessions');


/*
* Route to render HTML Page
*/
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/form-data/form.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/form/*',function (req,res){

    res.sendFile(path.join(__dirname+'/form-data/form.html'),

  );

});


app.use(express.static('form-data'));

app.listen(process.env.port || 3000);
console.log('Running at Port 3000');


function foo(index){

}
