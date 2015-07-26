var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');

var employee = require('../models/EmployeeSchema.js');

var Driver = require('../models/DriverSchema.js');

/*Post for New Employees*/

router.post('/',function(req,res){

	//console.log(req.body.Driver);

	/*Driver
		.find({carNumber: 'req.body.Driver'})
		.populate('_empName','_empNumber')
		.exec(function(err,Employee){
			if(err) console.log(err);

			var Employee = new employee({
					empNumber: req.body.empNumber,
					empName: req.body.empName,
				});

			res.json(Employee);
		
	});*/
	
	var Employee = new employee({
		empNumber: req.body.empNumber,
		empName: req.body.empName,
	});
	


	Employee.save(function(err){
		if(err) console.log(err);
		console.log('Employee saved successfully!');
	});
});

/* GET /todos listing. */
router.get('/:empNumber', function(req, res, next) {

	var empNumber = parseInt(req.params.empNumber);
	console.log(empNumber);
	
	Driver
		.find({employeeNumber: empNumber})
		.exec(function(err,Drivers) {
			if(err) console.log(err);

			res.json(Drivers);
			
		})
});


router.get('/', function(req, res, next) {
employee.find(function (err, Employee) {
    if (err) return next(err);
    res.json(Employee);
  });

});

/* Delete with route */

router.route('/:id')
	.delete(function(req,res){
		employee.remove({
			_id: req.params.id
		},function(err,Employee) {
			if(err)
				res.send(err);

			res.json({message:'successfully deleted'});
		
		});
	});

/* Update the root*/

router
	.put(('/:empNumber'),function(req,res){
		var EmpNumber = req.params.empNumber;
		employee.findOne({empNumber : EmpNumber}, function (err,Employee){
			if(err)
				res.send(err);

			//console.log(req.body.loc);
			Employee.empNumber = req.body.empNumber,
			Employee.empName = req.body.empName,
			Employee.Driver = req.body.Driver
			//console.log(driver.DriverName);
			Employee.save(function(err){
				if(err)
					res.send(err);
				res.json({message:'Employee Details updated'});
			})
		})
	})


module.exports = router;
