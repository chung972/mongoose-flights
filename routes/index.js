var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongoose Flights' });
  // we could choose to just redirect straight to "/flights"; up to you if you want
  // to keep the landing page
});

module.exports = router;
