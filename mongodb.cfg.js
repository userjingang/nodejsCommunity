
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/nodeHome')

mongoose.Promise = Promise

var db = mongoose.connection

db.on('open', function(){
	console.log('数据库连接成功')
})
db.on('error', function(){
	console.log('数据库连接失败')
})

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	passwd: String,
	gender: Boolean,
	email: String,
	birthday: Date,
	registerIP: String
})
var questionSchema = new Schema({
	description: String,
	createTime: Date,
	createIP: String,
	ownerID: {type: Schema.Types.ObjectId, ref:'users'},
	answerList: [{type: Schema.Types.ObjectId, ref:'answers'}]
})
var answerSchema = new Schema({
	description: String,
	createTime: Date,
	createIP: String,
	ownerID: {type: Schema.Types.ObjectId, ref:'users'},
	questionID: {type: Schema.Types.ObjectId, ref:'questions'}
})

var User = mongoose.model('users', userSchema)
var Question = mongoose.model('questions', questionSchema)
var Answer = mongoose.model('answers', answerSchema)

module.exports = {User, Question, Answer}
