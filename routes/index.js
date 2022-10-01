var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	return res.render('index.ejs'); //no ejs now
});

module.exports = router;