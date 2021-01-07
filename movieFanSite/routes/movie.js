var express = require('express');
var router = express.Router();
const request = require('request');
const { response } = require('../app');

/* == Get Movie Detail Page ===*/

router.get('/:id', function(req, res, next) {
  console.log("id is "+req.params.id);
});




module.exports = router;

