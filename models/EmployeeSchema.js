var mongoose = require('mongoose'),
Schema = mongoose.Schema;
DriverSchema = require('../models/DriverSchema.js');

var EmployeeSchema = new mongoose.Schema({

	empNumber : {type : String, required : true, ref : 'DriverSchema'},

	empName : {type : String, required:true},

});

var Employee = mongoose.model('Employee',EmployeeSchema);

module.exports = Employee;