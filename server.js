//Install express server
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();


// Serve only the static files form the dist directory
app.use(express.static('./dist/univer-sv'));

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://univer-sv-server.herokuapp.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname, '/dist/univer-sv/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

