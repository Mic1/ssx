const logger = require('morgan'),
  cors = require('cors'),
  http = require('http'),
  express = require('express'),
  errorhandler = require('errorhandler'),
  dotenv = require('dotenv'),
  bodyParser = require('body-parser'),
  jwt = require('express-jwt'),
  config = require('./config');

const app = express();



dotenv.load();

app.use(bodyParser.json());
app.use(cors());

app.use(function (err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});



if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler());
}

const jwtCheck = jwt({
  secret: config.secret
});


app.use(require('./store')/*, jwtCheck*/);

const port = process.env.PORT || 5001;

require('./initdb')();

http.createServer(app).listen(port, function (_err) {
  console.log(`listening in http://localhost:${port}`);
});

