import Mock from 'mockjs'
import homecasual from './homecasual.json'
import homenav from './homenav.json'
import shopList from './shopList.json'
import recommend from './recommend.json'
import search from './search.json'

Mock.mock('/api/getHomeCarousel', {
    code: 0,
    codeMsg: 'success',
    data: homecasual
})

Mock.mock('/api/getHotNav', {
    code: 0,
    codeMsg: 'success',
    data: homenav
})

Mock.mock('/api/getShopList', {
    code: 0,
    codeMsg: 'success',
    data: shopList
})

Mock.mock('/api/getRecommend', {
    code: 0,
    codeMsg: 'success',
    data: recommend
})

Mock.mock('/api/getSearchList', {
    code: 0,
    codeMsg: 'success',
    data: search
})