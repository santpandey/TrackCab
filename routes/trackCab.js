var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');

var trackCab = require('../models/DriverSchema.js');

/*Post for New Employees*/

router.post('/',function(req,res){

	var location = [];
	location[0] = req.body.longitude;
	location[1] = req.body.latitude;

	var employeeNumbers = [];
	var employeeNumberList = req.body.employeeNumber;
	console.log(employeeNumberList.length);
	
		employeeNumbers = employeeNumberList.split(" ").map(Number);
	

	var Driver = new trackCab({
		carNumber: req.body.carNumber,
		DriverName: req.body.DriverName,
		/*loc: {
			type: [parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
		}*/

		loc : location,
		employeeNumber : employeeNumbers
	});
	
	Driver.save(function(err){
		if(err) console.log(err);
		console.log('User saved successfully!');
	});
});

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  trackCab.find(function (err, trackcab) {
    if (err) return next(err);
    res.json(trackcab);
  });
});

/* Delete with route */

router.route('/:id')
	.delete(function(req,res,next){
		trackCab.remove({
			_id: req.params.id
		},function(err,Driver) {
			if(err)
				res.send(err);

			res.json({message:'successfully deleted'});
		
		});
	});

/* Update the root*/

router
	.put(('/:carNumber'),function(req,res){
		var CarNumber = req.params.carNumber;
		trackCab.findOne({carNumber : CarNumber}, function(err, driver){

			console.log(driver);
			driver.DriverName = req.body.DriverName;
			driver.carNumber = req.body.carNumber;
			var location = [];
			location[0] = req.body.longitude;
			location[1] = req.body.latitude;
			driver.loc = location;
			console.log(driver.loc);
			var employeeNumbers = [];
			var employeeNumberList = req.body.employeeNumber;
	
		employeeNumbers = employeeNumberList.split(" ").map(Number);

			driver.employeeNumber = employeeNumbers;
			console.log(driver.employeeNumber);
			//trackCab
			driver.save(function(err){
				if(err)
					res.send(err);
				res.json({message:'Driver Details updated'});
			})

			
		})


				
	})


module.exports = router;
