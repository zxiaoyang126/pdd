var express = require('express');
var router = express.Router();
var api = require('../dao/pdd_api');
var svgCaptcha = require('svg-captcha');
var request = require('request')

var userList = {}; //定义用户对象，存储所有用户

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/getHomeCarousel', api['getHomeCarousel']);
router.get('/api/getRecommend', api['recommend']);
router.get('/api/addRecommend', api['addRecommend']);

//获取图片验证码
router.get('/api/getCaptcha', (req, res) => {
  var captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1i',
    noise: 2,
    color: true
  });
  res.type('svg');
  res.send(captcha.data)  
})


//获取短信验证码
router.get('/api/getPhoneCode', (req, res) => {

  var code = randomNumber(6);//随机产生验证码
  var phoneNumber = req.query.phoneNumber;//获取用户手机号

  if(phoneNumber == '18888888888') {
    userList[phoneNumber] = code;//存储用户名手机与对应验证码
    res.json({success_code: 200, message: code});

  } else {
    res.json({err_code: 0, message: '手机验证失败'})
  }  

})

//登陆校对手机号与验证码是否相符
router.post('/api/login', (req, res) => {
  let phone = req.body.phone;
  let code = req.body.code;
  
  if(userList[phone] == code) {//验证码与手机匹配成功   
    delete userList[phone];
    api['queryUserByPhone'](req, res);

  } else {//验证码错误    
    res.json({err_code: 0, message: '验证码错误'})
  }
})

//获取用户登陆状态
router.get('/api/isLogin', function (req, res) {
  if(req.session.userId) {
    console.log('有session')
    api['queryUserById'](req, res);
  } else {
    console.log('没有session')
    res.send('')
  }
})

//退出登陆
router.get('/api/logout', (req, res) => {
  delete req.session.userId;
  console.log('退出登陆')
  res.send('成功退出')
})

//更新用户信息
router.post('/api/updataUserInfo', api['updataUserInfo'])

//添加商品到购物车内
router.post('/api/addToCart', api['addToCart'])

//获取购物车数据
router.get('/api/getCartData', api['getCartData'])



//随机生产验证码
function randomNumber(length) {
  var arr = [0,1,2,3,4,5,6,7,8,9];
  var str = ''
  for(var i = 0; i < length; i++) {
    var index = Math.floor(Math.random()*10);
    str += arr[index]
  }

  return str;
}

module.exports = router;
