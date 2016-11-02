var express = require('express');
var router = express.Router();

var mongooseModel = require('../mongodb.cfg')
var User = mongooseModel.User
var Question = mongooseModel.Question
var Answer = mongooseModel.Answer


function send(res,flag, msg){
	res.status(200).json({flag,msg})
}

router.post('/addQuestion', (req,res)=>{
	var signerID = req.cookies.signerID;
	
	req.body.ownerID = signerID;
	req.body.createTime = new Date();
	req.body.createIP = req.ip;
	req.body.answerList = [];
	
	// 尖括号过滤，防止XSS
	req.body.description = req.body.description.replace(/</g,'&lt;');
	req.body.description = req.body.description.replace(/>/g,'&gt;');
	
	var question = new Question(req.body);
	
	question.save(function(err,result){
		if(err){
			console.log(err);
			send(res,'fail','系统异常，请重试');
		}else{
			send(res,'success','提问成功');
		}
	})
})


router.post('/addAnswer', (req, res)=>{
	var questionID = req.cookies.questionID;
	var signerID = req.cookies.signerID;
	
	req.body.ownerID = signerID;
	req.body.questionID = questionID;
	req.body.createTime = new Date();
	req.body.createIP = req.ip;
	req.body.description = req.body.description.replace(/</g,'&lt;');
	req.body.description = req.body.description.replace(/>/g,'&gt;');
	
	var ans = new Answer(req.body);
	
	ans.save(function(err,result){
		if(err){
			console.log(err);
			send(res,'fail','系统异常，请重试');
		}else{
			Question.find({_id: questionID},function(err,result_){
				if(err){
					console.log(err);
					send(res,'fail','系统异常，请重试');
				}else{
					var arr = result_[0].answerList;
					arr.push({_id: result._id});
					Question.update({_id: questionID}, {$set: {answerList: arr}}, function(err,_result){
						if(err){
							console.log(err);
							send(res,'fail','系统异常，请重试');
						}else{
							send(res,'success','回答成功');
						}
					})
				}
			})
		}
	})
	
})



router.get('/', (req,res)=>{

	Question.find({},function(err,result){
		if(err){
			console.log(err);
			send(res,'fail','系统异常，请重试');
		}else{
			console.log(result);
			res.render('index', {title: '首页', questions: result});
		}		
	}).populate({
		path: 'ownerID answerList',
		// 多级 populate
		populate: {path: 'ownerID'}
	});
	
})




module.exports = router;