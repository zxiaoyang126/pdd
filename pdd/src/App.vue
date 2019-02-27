<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>    
    <tab-bar v-show="this.$route.meta.showTabBar"></tab-bar>
  </div>
</template>

<script>
import TabBar from './components/Tabbar'
import { mapMutations } from 'vuex' 
export default {
  name: 'App',
  components: {
    TabBar
  },
  methods: {
    ...mapMutations({
      addUserInfo: 'addUserInfo'
    })
  },
  beforeCreate() {    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:3000/api/isLogin', true);
    xhr.withCredentials = true;
    xhr.send();
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) {
        console.log(JSON.parse( xhr.responseText ).message)
        this.addUserInfo(JSON.parse( xhr.responseText ).message)
      }
    }
  }
}
</script>

<style lang="stylus">  
  a 
    text-decoration none
  #app
    background #f5f5f5
    width 100%
    height 100% 
    
</style>
