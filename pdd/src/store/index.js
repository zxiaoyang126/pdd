import Vue from 'vue'
import Vuex from 'vuex'

import {
    getHomeCarousel, 
    getHotNav, 
    getShopList, 
    getRecommend,
    getSearchList,
    getCartData
} from '../api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        homeCarouselData: [],
        hotNavData: [],
        shopListData: [],
        recommendData: [],
        searchData: [],
        userInfo: {},
        cartData: []
    },
    mutations: {
        addHomeCarouselData(state, data) {
            state.homeCarouselData = data;            
        },
        addHotNavData(state, data) {
            state.hotNavData = data;
        },
        addShopListData(state, data) {
            state.shopListData = data;
        },
        addRecommendData(state, data) {
            state.recommendData = state.recommendData.concat(data);
        },
        addSearchData(state, data) {
            state.searchData = data;
        },

        addUserInfo(state, data) {
            state.userInfo = data;           
        },
        changeUserInfo(state, obj) {
            var type = obj.type;
            var value = obj.value;           
            state.userInfo[type] = value;            
        },
        addCartData(state, data) {
            data.forEach((value, index) => {
                value.isSelected = false;
            })
            state.cartData = data;
        },
        addCount(state, goods) {
            console.log(goods)
            goods.goods_count++;           
           
        },
        subCount(state, goods) {
            console.log(goods)
            goods.goods_count--;
        },
        selectAll(state, flag) {
            state.cartData.forEach((value, index) => {
                value.isSelected = flag;
                // if(value.isSelected == null) {
                //     Vue.set(value, 'isSelected', true)
                // } else {
                //     value.isSelected = !value.isSelected;
                // }
            })            
        },
        selectSingle(state, goods) {
            
            
        }
    },    
    actions: {
        async reqHomeCarousel({commit}) {
            var result = await getHomeCarousel();            
            commit('addHomeCarouselData', result.message);
        },
        async reqHotNav({commit}) {
            var result = await getHotNav();
            commit('addHotNavData', result.data.data);
        },
        async reqShopList({commit}) {
            var result = await getShopList();           
            commit('addShopListData', result.data.goods_list);
        },
        async reqRecommend({commit}, params) {            
            var result = await getRecommend({
                page: params.page,
                count: params.count
            });
            commit('addRecommendData', result.message);
            params.callBack && params.callBack();
        },
        async resSearchList({commit}) {
            var result = await getSearchList();
            commit('addSearchData', result.data.data);
        },
        async resCartDate({commit}) {
            var result = await getCartData();
            commit('addCartData', result.data)
        }
    }
})