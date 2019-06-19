const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();


/*
* Route to render HTML Page
*/
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/form-data/form.html'));
  //__dirname : It will resolve to your project folder.
});


app.use(express.static('form-data'));

app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
