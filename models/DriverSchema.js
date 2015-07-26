var mongoose = require('mongoose'),
Schema = mongoose.Schema

var DriverSchema = new mongoose.Schema({

	carNumber : {type : String, required : true, unique : true},
	
	DriverName : {type : String, required : true},
	
	loc : {
		type: [Number],
		index:'2d'
	},

	employeeNumber : [{type : Schema.Types.Number, ref : 'employee'}]

});

/*var EmployeeSchema = new mongoose.Schema({

	empNumber : {type : String, required : true, ref: 'Driver'},

	empName : {type : String, required:true},

	Driver : {type : Schema.Types.ObjectId, ref : 'Driver'}
});
*/
//var employee = mongoose.model('employee',EmployeeSchema);

var Driver = mongoose.model('Driver',DriverSchema);

//module.exports = employee;

module.exports = Driver;