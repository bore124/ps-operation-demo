<script>
import {HomeOutlined, ImportOutlined, FundOutlined, UserOutlined, DownOutlined} from '@ant-design/icons-vue'
import {clearToken} from "@/utils/system.js";
import { theme } from 'ant-design-vue';
const { useToken } = theme;
import {menus} from "@/router/router-config.js";


export default {
  name: "layoutPage",
  components: {
    HomeOutlined,
    ImportOutlined,
    FundOutlined,
    UserOutlined,
    DownOutlined
  },
  data() {
    return {
      token:useToken(),
      navList: [],
      selectedKeys: [],
      activityNav: 0,
    }
  },
  watch: {
    $route() {
      console.log(this.$route.meta)
      for (let i in this.navList) {
        if (this.$route.meta.nav === this.navList[i].path||this.$route.path === this.navList[i].path) {
          this.activityNav = i
        }
      }
    }
  },
  computed: {},
  methods: {
    loginOut() {
      clearToken()
      this.$router.push("/login")
    },
  },
  mounted() {
    for (let i of menus[0].children){
      if (i?.meta.name){
        let  temp ={
          name:i.meta.name,
          path:i.path
        }
        this.navList.push(temp)

      }


    }
    for (let i in this.navList) {
      if (this.$route.meta.nav === this.navList[i].path||this.$route.path === this.navList[i].path) {
        this.activityNav = i
      }
    }

  },
}
</script>

<template>
  <a-layout>
    <a-layout-header style="height: 100px">
      <div class="header">
        <div class="header-details">
          <div class="header-icon">
            <img src="/logo.png"/>
          </div>
          <div class="school-name">巨鲲大学</div>
        </div>
        <div class="header-title">
          实训室综合管理平台
        </div>
      </div>
    </a-layout-header>
    <a-layout-Content style="min-height: calc(100vh - 213px)">
      <div class="nav"  :style="{ backgroundColor: token.token.colorPrimary }">
        <div v-for="(i,k) in navList" class="nav-item" :class="activityNav==k?'activity-nav':''">
          <router-link :to="i.path">{{ i.name }}</router-link>
        </div>
      </div>
      <a-layout style="padding:10px  24px 24px">
        <router-view></router-view>
      </a-layout>
    </a-layout-Content>
    <a-layout-footer class="footer" :style="{ backgroundColor: token.token.colorPrimary }">
      版权所有：巨鲲大学 杭州巨鲲软件有限公司
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  height: 100px;
  align-items: center;
  column-gap: 30px;
}

.header-icon {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
}

.header-icon img {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  //background: #33B713;
  display: flex;
  justify-content: flex-start;
  height: 60px;
  align-items: center;
}

.nav-item {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.nav-item:hover, .activity-nav {
  background-color: rgba(0,0,0,.3);
}

.nav-item a {
  color: white;
  width: 100%;
  height: 100%;
  line-height: 400%;
}

.school-name {
  color: white;
}

.header-details {
  column-gap: 10px;
  display: flex;
  align-items: center;
}

.header-title {
  color: white;
  font-size: 30px;
}

.footer {
  text-align: center;
  color: white;
  font-size: 30px;
}
</style>
