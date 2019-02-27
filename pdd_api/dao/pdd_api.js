var dbutil = require('./dbutil');

//获取首页轮播图
function getHomeCarousel(res, res) {
    var sqlStr = 'select * from homecarousel ;';
    var connection = dbutil.createConnection();
    connection.connect();

    connection.query(sqlStr, function (err, data) {

        if(err == null) {            
            res.json({statusCode: 200, message: data})
        } else {
            console.log(err)
        }
    });

    connection.end();
}


//批量向数据库添加数据
function addRecommend(req, res) {
    
    var data = require('../data/recommend').data;
    var temp_all_arr = [];
    for(var i = 0; i < data.length; i++) {
        var goods = data[i];
        var temp = [];        
        temp.push(goods.goods_id);
        temp.push(goods.short_name);
        temp.push(goods.goods_name);
        temp.push(goods.thumb_url);
        temp.push(goods.hd_thumb_url);
        temp.push(goods.image_url);
        temp.push(goods.price);
        temp.push(goods.normal_price);
        temp.push(goods.market_price);
        temp.push(goods.sales_tip);

        temp_all_arr.push(temp);
    };
    var sqlStr = "insert into recommend (`goods_id`, `goods_name`, `short_name`, `thumb_url`, `hd_thumb_url`, `image_url`, `price`, `normal_price`, `market_price`, `sales_tip`) values ? ";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sqlStr, [temp_all_arr], function (err, data) {
        
        if(err == null) {
            console.log('success')
            res.writeHead(200);
            res.end('success');
        } else {
            console.log(err)
        }
    })
    connection.end();   
}

//获取推荐列表数据
function recommend(req, res) {
    var params = req.query;  

    var page = parseInt(params.page) || 1;
    var count = parseInt(params.count) || 20;
    page = (page - 1) * count;

    var sqlStr = 'select * from recommend limit ?, ?';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sqlStr, [page, count], function (err, data) {
        if(err == null) {

            setTimeout(() => {
                res.json({statusCode: 200, message: data})
            }, 2000)
            
        }
    })
    connection.end();
}


//根据手机查询用户
function queryUserByPhone(req, res) {

    var phone = req.body.phone;
    var sqlStr = 'select * from userInfo where user_phone = ? ;';

    var connection = dbutil.createConnection();
    connection.connect();

    connection.query(sqlStr, [phone], (err, result) => {
        if(err == null && result.length > 0) {//如果查到了
            console.log('查到了')
            req.session.userId = result[0].id;
            res.cookie('id', result[0].id);
            res.json({
                success_code: 200,
                message: {
                    user_name: result[0].user_name,
                    user_id: result[0].id,
                    user_phone: result[0].user_phone,
                    user_address: result[0].user_address,
                    user_birthday: result[0].user_birthday,
                    user_sex: result[0].user_sex,
                    user_sign: result[0].user_sign
                }
            })
        } else {//没有查到
            addUser(phone)
        }

    })
    connection.end();
}

//添加用户
function addUser(req ,res) {
    var phone = req.body.phone;    
    var sqlStr = 'insert into userInfo (`user_phone`, `user_name`) values (?, ?) ;';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sqlStr, [phone, phone], (err, result) => {
        if(err == null) {            
            res.cookie('userId', result.insertId);
            req.session.userId = result.insertId;
            res.json({
                success_code: 200,
                message: {
                    user_name: result[0].user_name,
                    user_id: result[0].id,
                    user_phone: result[0].user_phone,
                    user_address: result[0].user_address,
                    user_birthday: result[0],user_birthday,
                    user_sex: result[0].user_sex,
                    user_sign: result[0].user_sign
                }
            })
        }
    })
    connection.end();
}


function queryUserById(req, res) {
    var useId = req.session.userId;
    var sqlStr = 'select * from userInfo where id = ? ;';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sqlStr, [useId], (err, result) => {
        if(err == null && result.length > 0) {//如果查到了            
            res.json({
                success_code: 200,
                message: {
                    user_name: result[0].user_name,
                    user_id: result[0].id,
                    user_phone: result[0].user_phone,
                    user_address: result[0].user_address,
                    user_birthday: result[0].user_birthday,
                    user_sex: result[0].user_sex,
                    user_sign: result[0].user_sign
                }
            })
        }

    })
    connection.end();
}

//更新用户信息
function updataUserInfo(req, res) {
    console.log(req.body.userName, req.body.userId)
    var sqlStr = 'update userinfo set user_name=?, user_sex=?, user_address=?, user_birthday=?, user_sign=? where id=? ;';
    var userInfoList = [
        req.body.userName,
        req.body.userSex,
        req.body.userAddress,
        req.body.userBirthday,
        req.body.userSign,
        req.body.userId
    ];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sqlStr, userInfoList, function (err, result) {

        if(err == null) {
            console.log(result);
            res.send('信息更新成功')
        } else {
            console.log(err);
            res.send('信息更新失败')
        }
    })
    connection.end();
}


//添加商品到购物车
function addToCart(req, res) {
    
    var goodsId = req.body.goodsId;
    console.log(goodsId)

    var queryStr = 'select * from shoppingcart where goods_id = ? ;';
    var addStr = 'insert into shoppingcart (`goods_id`, `goods_name`, `goods_count`, `thumb_url`, `goods_price`) values (?, ?, ?, ?, ?) ;';
    var updataStr = 'update shoppingcart set goods_count = ? where goods_id = ? ;';

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryStr, goodsId, function (err, data) {

        console.log(data)

        if(err == null && data.length > 0) {
            //数据库已经存在，该商品数量++
            console.log('数据库已经存在')
            
            var count = data[0].goods_count + 1;
            console.log(count);

            var connection = dbutil.createConnection();
            connection.connect();
            connection.query(updataStr, [count, goodsId], function (err, data) {
                if(err == null) {                    
                    res.json({success_code: 200, message: '添加购物车成功'})
                }
            })
            connection.end();

        } else if (err == null && data.length == 0) {
            //数据库没有，添加该商品
            var params = [
                req.body.goodsId,
                req.body.goodsName,
                req.body.goodsCount,
                req.body.thumbUrl,
                req.body.goodsPrice
            ];

            var connection = dbutil.createConnection();
            connection.connect();
            connection.query(addStr, params, function (err, data) {               
                if(err == null) {
                    res.json({success_code: 200, message: '添加购物车成功'})
                } else {
                    console.log('err')
                    console.log(err)
                }
            })
            connection.end();
        } 
    })

    connection.end();

}

function getCartData(req, res) {
    var sqlStr = 'select * from shoppingcart ;';
    var connection = dbutil.createConnection();
    connection.connect();

    connection.query(sqlStr, function (err, data) {
        if(err == null) {
            res.json({success_code: 200, data: data})
        }
    })
    connection.end();
}

module.exports = {
    getHomeCarousel,
    recommend,
    addRecommend,
    queryUserByPhone,
    queryUserById,
    updataUserInfo,
    addToCart,
    getCartData
}