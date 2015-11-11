var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*============================== LINKEDIN =====================================================*/
/* Get /api/linkedin.. Events Api data and send it out  */
router.get('/linkedin', function(req, res, next) {
	var options = {
		url: 'https://api.linkedin.com/v1/companies/6628793/updates?format=json',
		headers: {
			'User-Agent': 'MyApp(steven@basecamp.com)'
		},
		auth:{
			'bearer': 'AQUL4iTcKGlEd9pRLnX3W0O4PoBfhkrIFwwr0aDw0RAoq75PXqQBa4rmNd0E7UeR13VBIvunekW7Qh72hPoZk9hC8l_InFv3EClfTlWwdpkujeV238ICuoS-km9Sxf3ggMn1-gh4Nifl295A79RaKTfciL7MK5cGr8BqSJ2Iw-dk2SlnY2M'
		}
	};

	request(options, function(error, message, linkedinFeed){
		//console.log(linkedinFeed);
		res.json(linkedinFeed);
	}); // Closes request()
}); // Closes router.get



router.get('/api/google', function(req, res){
	request('http://google.com', function (err, response, body) {
		//console.log(body)
		$ = cheerio.load(body);
		//var header = $('ul#my-feed-post').html();
		res.json(body);
	});
});

router.get('/api/git', function(req, res){
	request('https://github.com/request/request#requestoptions-callback', function (err, response, body) {
		//console.log(body)
		$ = cheerio.load(body);
		//var header = $('ul#my-feed-post').html();
		res.json(body);
	});
});
module.exports = router;
