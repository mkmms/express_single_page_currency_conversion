require('dotenv').config(); //read ENV files
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse POST data as URL encoded data
app.use(bodyParser.urlencoded({
  extended: true,
}))

// Parse POST data as JSON
app.use(bodyParser.json());


const apiRouter = require('./router/apiRouter');
// Set public folder as root
app.use(express.static('public'));
app.use('/api', apiRouter);

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

const port = process.env.PORT || 3005
app.listen(port, function () {
  console.log(`Application started on ${port}`);
})