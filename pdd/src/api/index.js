import ajax from './ajax'

var BASE_URL = 'http://127.0.0.1:3000';

//获取首页轮播图数据
function getHomeCarousel() {
    return ajax('/api/getHomeCarousel');
}

//获取首页导航数据
function getHotNav() {
    return ajax('/api/getHotNav')
}

//获取商品列表数据
function getShopList() {
    return ajax('/api/getShopList')
}

//获取推荐页面数据(向自己后台请求数据)
// function getRecommend(params) {
//     return ajax(BASE_URL + '/api/getRecommend', params)
// }

//获取推荐页面数据(Mock假数据)
function getRecommend() {
    return ajax('/api/getRecommend')
}

//获取搜索页数据
function getSearchList() {
    return ajax('/api/getSearchList')
}

//获取短信验证码
function getPhoneCode(params) {
    return ajax(BASE_URL + '/api/getPhoneCode', params)
}

//登陆POST请求
function login(params) {
    return ajax(BASE_URL + '/api/login', params, 'POST')
}

//判断用户是否是登陆状态
function isLogin() {
    return ajax(BASE_URL + '/api/isLogin')
}

//更新用户信息
function updataUserInfo(params) {
    return ajax(BASE_URL + '/api/updataUserInfo', params, 'POST')
}

//添加到购物车
function addToCart(params) {
    return ajax(BASE_URL + '/api/addToCart', params, 'POST');
}

function getCartData() {
    return ajax(BASE_URL + '/api/getCartData')
}

export {
    getHomeCarousel,
    getHotNav,
    getShopList,
    getRecommend,
    getSearchList,
    getPhoneCode,
    login,
    isLogin,
    updataUserInfo,
    addToCart,
    getCartData
};