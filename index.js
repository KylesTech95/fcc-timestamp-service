// index.js
// where your node app starts
require('dotenv').config();
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// endpoint for currentDate
app.get("/api/", function (req, res) {
  let date = new Date();
  let unix = date.getTime()
  let utc  = date.toUTCString()
  res.json({unix:unix,utc:utc})
});
// test for valid unix
const isValidUnix=(date)=>{
return date.getTime() !== null 
}
// test for valid utc
const isValidUTC=(date)=>{
  return date.toUTCString()!== "Invalid Date" 
  }
// endpoint for currentDate
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);

  if(!isValidUTC(date)){
    date = new Date(+req.params.date)
  }
  if(!isValidUnix){
    res.json({ error : "Invalid Date" })
  }
  if(date.toUTCString()==='Invalid Date'){
    res.json({ error : "Invalid Date" })
  }
  else{
    res.json({unix:date.getTime(),utc:date.toUTCString()})
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
