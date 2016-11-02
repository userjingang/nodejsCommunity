var express = require('express');
var router = express.Router();


router.get('/ask', (req,res)=>{
	res.render('user/ask', {title: '提问', nav_title: '提问'});
})
router.get('/answer', (req,res)=>{
	res.render('user/answer', {title: '回答', nav_title: '回答'});
})
router.get('/login', (req,res)=>{
	res.render('user/login', {title: '登录', nav_title: '登录'});
})
router.get('/register', (req,res)=>{
	res.render('user/register', {title: '注册', nav_title: '注册'});
})
router.get('/userInfo', (req,res)=>{
	res.render('user/userInfo', {title: '用户信息', nav_title: '用户信息'});
})



module.exports = router;