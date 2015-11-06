var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/smartreads', function(req, res){
	request.get('https://www.linkedin.com/company/accordant-media---what-we-are-reading?trk=biz-brand-tree-co-name', function (err, response, body) {
		$ = cheerio.load(body);
		var newArray = [];
		for(var i = 0; i < 4; i++){
			newArray.push({
				head  : $('ul#my-feed-post').children().eq(i).children().children().eq(1).children().eq(1).html(),
				title : $('ul#my-feed-post').children().eq(i).children().children().eq(1).children().eq(2).children().eq(1).children().eq(0).html(),
				text  : $('ul#my-feed-post').children().eq(i).children().children().eq(1).children().eq(2).children().eq(1).children().eq(2).html()
			});
		}

		res.json(newArray);
	});
});

module.exports = router;
