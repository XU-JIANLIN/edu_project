<template>
  <div id="aCoursesList" class="bg-fa of">
    <!--  开始 -->
    <section class="container">
      <header class="comm-title">
        <!-- 文章-->
        <h2 class="fl tac">
          <span class="c-333">发现</span>
        </h2>
      </header>
      <section class="c-sort-box">
      <section class="c-s-dl">
            <!-- 未登录显示 -->
            <ul class="h-r-login">
              <li v-if="!loginInfo.accesstoken" id="no-login">
                <a href="/login" title="登录">
                    <el-button type="warning">请先登录</el-button>
                </a>
                    
              </li>
              <!-- 登录成功显示 -->
              <li v-if="loginInfo.accesstoken" id="is-login-two" class="h-r-user">
                  <a href="/community/article" title="发布文章">
                  <el-button type="primary">发布文章</el-button>
                </a>
                <!--
                <a href="/login" title="登录">
                  <el-button type="success">我的文章</el-button>
                </a>
                -->
              </li>
              <!-- /未登录显示第1 li；登录后显示第2 li -->
            </ul>
          <div class="clear"/>
        </section>
  
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- 数据列表 开始-->
          <article v-if="data.total>0" class="comm-course-list">
                  <di v-for="item in data.items" :key="item.id">
                    <div style="margin-bottom:30px">
                      <h3 class="hLh30">
                          <span class="fsize24 c-333" >
                            <el-link type="primary" :href="'/community/'+item.id" :title="item.title" style="font-size:20px">
                              {{ item.title }}
                            </el-link>
                          </span>
                      </h3>

                      <section class="mt10">
                        <el-image
                              style="width: 80px; height: 80px"
                              :src="item.avatar"
                              :alt="item.title"></el-image>
                          <span class="t-tag-bg">{{ item.replyCount }}个回复 • {{ item.viewCount }} 次浏览 • {{item.gmtCreate}}</span>
                      </section>
                      <el-divider></el-divider>
                      <div class="clear"/>
                  </div>
                  </di>
                  
              <div class="clear"/>
              <!-- 分割 -->
          </article>
          <!-- /数据列表 结束-->
        </div>

        <!-- 公共分页 开始 -->
        <div>
            <div class="paging">
                <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
                <a
                  :class="{undisable: !data.hasPrevious}"
                  href="#"
                  title="首页"
                  @click.prevent="gotoPage(1)">首</a>
                <a
                  :class="{undisable: !data.hasPrevious}"
                  href="#"
                  title="前一页"
                  @click.prevent="gotoPage(data.current-1)">&lt;</a>
                <a
                  v-for="page in data.pages"
                  :key="page"
                  :class="{current: data.current == page, undisable: data.current == page}"
                  :title="'第'+page+'页'"
                  href="#"
                  @click.prevent="gotoPage(page)">{{ page }}</a>
                <a
                  :class="{undisable: !data.hasNext}"
                  href="#"
                  title="后一页"
                  @click.prevent="gotoPage(data.current+1)">&gt;</a>
                <a
                  :class="{undisable: !data.hasNext}"
                  href="#"
                  title="末页"
                  @click.prevent="gotoPage(data.pages)">末</a>
                <div class="clear"/>
            </div>
        </div>
        <!-- /公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import community from "@/api/community"
import member from '@/api/member'
import { getToken, setToken, removeToken } from '@/utils/auth'
import axios from 'axios'
//设置默认的页面显示记录数
var limit = 5

export default {
  asyncData({ params, error }) {
    console.log(params)
    return community.getPageList(1, limit).then(response => {
      console.log(response.data.data);
      return { data: response.data.data }
    });
  },
  data() {
    return {
      token: '',
      loginInfo: {},
    }
  },
  created() {
    // console.log(this.$route.query.token)

    // TODO: 登录获取信息
    this.token = getToken()
    // console.log(this.token)
    if (this.token) {
      this.showInfo(this.token)
    }
  },
  methods: {
    showInfo() {
      member.getInfoByToken(this.token).then(response => {
        const loginInfo = response.data.data.loginInfo
        if (loginInfo) { // token未过期
          this.loginInfo = response.data.data.loginInfo
        } else {
          this.$router.push({ path: '/' })
        }
      })
    },
    //分页查询
    gotoPage(page){
      //查询时页数不能小于1 和大于总页数
      // alert(this.twoLevelSubjectId)
      if(page>=1 && page<=this.data.pages)
      community.getPageList(page, limit).then(response => {
        console.log( response.data.data)
          this.data = response.data.data

      })
    }
  }
};
</script>