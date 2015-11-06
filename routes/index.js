var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/smartreads', function(req, res){
	var options = {
		uri: 'https://www.linkedin.com/company/accordant-media---what-we-are-reading',
		timeout: 2000,
		followAllRedirects: true
	};
	request(options, function (err, response, body) {
		console.log('URL' + response.request.uri.href);
		console.log(body);
		$ = cheerio.load(body);
		var header = $('ul#my-feed-post').html();
		var newArray = [];
		for(var i = 0; i < 4; i++){
			newArray.push({
				head  : $('ul#my-feed-post').children().eq(i).children().children().eq(1).children().eq(1).html(),
				title : $('ul#my-feed-post').children().eq(i).children().children().eq(1).children().eq(2).children().eq(1).children().eq(0).html(),
				text  : $('ul#my-feed-post').children().eq(i).children().children().eq(1).children().eq(2).children().eq(1).children().eq(2).html()
			});
		}
		//console.log(header);
		res.json(body);
	});
});

router.get('/api/google', function(req, res){
	request('http://google.com', function (err, response, body) {
		console.log(body)
		$ = cheerio.load(body);
		//var header = $('ul#my-feed-post').html();
		res.json(body);
	});
});

router.get('/api/git', function(req, res){
	request('https://github.com/request/request#requestoptions-callback', function (err, response, body) {
		console.log(body)
		$ = cheerio.load(body);
		//var header = $('ul#my-feed-post').html();
		res.json(body);
	});
});
module.exports = router;
