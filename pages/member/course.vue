<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <!-- 我的课程 -->
        <h2 class="fl tac">
          <span class="c-333">我的课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total==0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam">还没有购买观看相关的课程...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- 数据列表 开始-->
          <article v-if="total>0" class="comm-course-list">
              <ul id="bna" class="of">
                  <li v-for="item in items" :key="item.id">
                      <div class="cc-l-wrap">
                          <section class="course-img">
                              <img :src="item.cover" class="img-responsive" :alt="item.title">
                              <div class="cc-mask">
                                  <a :href="'/course/'+item.id" title="继续学习" class="comm-btn c-btn-1">继续学习</a>
                              </div>
                          </section>
                          <h3 class="hLh30 txtOf mt10">
                              <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{ item.title }}</a>
                          </h3>
                          <section class="mt10 hLh20 of">
                              <span class="fl jgAttr c-ccc f-fA">
                                  <i class="c-999 f-fA">{{ item.viewCount }}人学习</i>
                                  |
                                  <i class="c-999 f-fA">9634评论</i>
                              </span>
                          </section>
                      </div>
                  </li>
              </ul>
              <div class="clear"/>
          </article>
          <!-- /数据列表 结束-->
        </div>
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from "@/api/course"
import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
    middleware: 'authenticated',
    
    asyncData({ params, error,store,redirect}) {

        console.log("输出author="+store.state.auth)
        return axios.get('http://localhost:8000/online/frontcourse/Membercourse/',{
            headers:{
                'Authorization':store.state.auth
            }})
        // return course.getById(params.id,store.state.auth)
        .then(response => {
            console.log(response.data)
            if(response.data.status == 401){
                console.log("跳转")
                return redirect('/login')
            }
            return { 
                items: response.data.data.items,
                total: response.data.data.total   
            }
        })
    },
}
</script>