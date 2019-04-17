<template>
  <el-container class="leftNavigation">
    <el-aside width="250px">
      <el-menu class="leftNavigationMenu"
               background-color="#545c64"
               unique-opened
               router
               text-color="#fff"
               active-text-color="#ffd04b">
        <div class="leftNavigationLogo">
          <img src="../img/logo.jpg" height="40px" width="40px"/>
        </div>
        <el-submenu v-for="menu in menuList" :index="menu.id + ''" :key="menu.id">
          <template slot="title">{{menu.name}}</template>
          <el-menu-item v-for="childrenMenu in menu.children" :index="childrenMenu.url" :key="childrenMenu.id">
            <span>{{childrenMenu.name}}</span>
          </el-menu-item>
        </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="topNavigation">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="userinfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  export default {
    data() {
      return {
        username: '',
        menuList: []
      }
    },
    created() {
      let user = JSON.parse(localStorage.getItem('user'));
      //获取用户名和头像
      this.username = user.username;
      //加载菜单
      this.loadMenus();

      //跳转到主页面
      if (this.$route.path == '/navigation') {
        this.$router.push('/index');
      }
    },
    methods: {
      loadMenus() {
        this.$axios.get(this.GLOBAL.baseurl + '/sys/res/resources', {
          withCredentials: true
        }).then(res => {
          this.menuList = res.data.data;
        }).catch(e => {
          this.$message.error(e.response.data.msg)
        })
      },
      logout() {
        this.$axios.get(this.GLOBAL.baseurl + '/logout', {
          withCredentials: true
        }).then(res => {
          this.$router.push('/login');
        }).catch(e => {
          this.$router.push('/login');
        })
      },
      //跳转到个人信息
      userinfo() {
        this.$router.push('/info');
      }
    }
  };
</script>

<style>
  .leftNavigation {
    height: 100%;
  }

  .leftNavigationLogo {
    padding: 15px;
    text-align: center;
  }

  .leftNavigationMenu {
    height: 100%;
    text-align: left;
  }

  .topNavigation {
    text-align: right;
    padding-top: 20px;
    background-color: #545c64;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
</style>
