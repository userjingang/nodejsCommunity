var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var mongooseModel = require('../mongodb.cfg');
var User = mongooseModel.User;
var Question = mongooseModel.Question;
var Answer = mongooseModel.Answer;


function send(res,flag, msg){
	res.status(200).json({flag,msg});
}

/*
 * 用户注册
 */
router.post('/register',(req,res)=>{
	var name = req.body.name;	
	req.body.birthday = new Date();
	req.body.registerIP = req.ip;
	req.body.passwd = crypto.createHash('md5')
							.update(req.body.passwd)
							.digest('hex')
	
	var user = new User(req.body);
	
	user.save(function(err, result){
		if(err){
			console.log(err);
			send(res,'fail','注册失败');
		}else{
			send(res,'success', '注册成功');
		}
	})
})


router.post('/checkName',(req,res)=>{
	User.find({name: req.body.name}, function(err, result){
		if(err){
			console.log(err);
			send(res,'fail','连接服务器异常');
		}else{
			if(result.length == 0){
				send(res,'success', '用户名可以使用');
			}else{
				send(res,'fail', '该用户名已被注册');
			}
		}
	})
})

/*
 * 用户登录验证
 */
router.post('/login',(req,res)=>{
// 	先验证用户名是否存在，再验证密码是否正确
	User.find({name: req.body.name}, function(err, result){
		if(err){
			console.log(err);
			send(res,'fail','连接服务器异常');
		}else{
			if(result.length == 0){
				send(res,'fail', '用户名不存在');
			}else{
				req.body.passwd = crypto.createHash('md5')
										.update(req.body.passwd)
										.digest('hex')
				if(req.body.name==result[0].name && req.body.passwd==result[0].passwd){
					res.cookie('signer',req.body.name);
					res.cookie('signerID', result[0]._id);
					send(res,'success', '登录成功');
				}else{
					send(res,'fail', '密码错误请重新输入');
				}
			}
		}
	})
	
// 	直接验证用户名和密码是否都正确
//	req.body.passwd = crypto.createHash('md5')
//							.update(req.body.passwd)
//							.digest('hex')
//	User.find({name: req.body.name, passwd: req.body.passwd}, function(err, result){
//		if(err){
//			console.log(err);
//			send(res,'fail','连接服务器异常')
//		}else{
//			if(result.length == 0){
//				send(res,'fail', '用户名或密码错误');
//			}else{
//				res.cookie('signer',req.body.name);
//				send(res,'success', '登录成功');
//			}
//		}
//	})

})



module.exports = router;