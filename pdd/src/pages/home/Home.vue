<template>
    <div class="home">
        <ly-tab v-model="selectedId" :items="items" :options="options" @change="HandleChange" class="lyTab"></ly-tab>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "热门" },
        { label: "服饰" },
        { label: "鞋包" },
        { label: "母婴" },
        { label: "百货" },
        { label: "食品" },
        { label: "内衣" },
        { label: "女装" },
        { label: "男装" }
      ],
      options: {
        activeColor: "red"
      },
      path: [
          '/home/hot', '/home/clothes', '/home/shoes', '/home/baby', '/home/shop', '/home/foods',
          '/home/underwear', '/home/female', '/home/male'
      ]
    };
  },
  methods: {
    HandleChange(obj, index) {
        this.$router.replace(this.path[index])
    }
  }
};
</script>

<style lang="stylus" scoped>
  .home
    width 100%
    padding-top 45px    
    .lyTab 
      position fixed
      left 0
      top 0
      z-index 998      
</style>
