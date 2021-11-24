<template>
  
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" style="background: #040B1B;" v-for="item in lunbotus" :key="item.id">
                <a target="_blank" :href=" 'http://'+item.cover">
                    <img :src=" item.photo" :alt="item.name">
                </a>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 幻灯片 结束 -->
    
    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">最新课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="item in newCourseList" :key="item.id">
                      <div class="cc-l-wrap">
                          <section class="course-img">
                              <img :src="item.cover" class="img-responsive" :alt="item.title">
                              <div class="cc-mask">
                                  <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                              </div>
                          </section>
                          <h3 class="hLh30 txtOf mt10">
                              <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{ item.title }}</a>
                          </h3>
                          <section class="mt10 hLh20 of">
                              <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                                  <i class="c-fff fsize12 f-fA">免费</i>
                              </span>
                              <span v-else class="fr jgTag bg-red">
                                  <i class="c-fff fsize12 f-fA">￥{{ item.price }}</i>
                              </span>
                              <span class="fl jgAttr c-ccc f-fA">
                                  <i class="c-999 f-fA">{{ item.viewCount }}人学习</i>
                                  <i class="c-999 f-fA">9634评论</i>
                              </span>
                          </section>
                      </div>
                  </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course/" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="item in goodTeacher" :key="item.id">
                      <section class="i-teach-wrap">
                          <div class="i-teach-pic">
                              <a :href="'/teacher/'+item.id" :title="item.name">
                                  <img :src="item.avatar" :alt="item.name" height="142" hright="142">
                              </a>
                          </div>
                          <div class="mt10 hLh30 txtOf tac">
                              <a :href="'/teacher/'+item.id" :title="item.name" class="fsize18 c-666">{{ item.name }}</a>
                          </div>
                          <div class="hLh30 txtOf tac">
                              <span class="fsize14 c-999" >{{ item.career }}</span>
                          </div>
                          <div class="mt15 i-q-txt">
                              <p class="c-999 f-fA">{{ item.intro }}</p>
                          </div>
                      </section>
                  </li>
                
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher/" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import index from "@/api/index"

export default {
  asyncData({ params, error }) {

        return index.getLunbotu().then(respoense => {
          return { 
              lunbotus: respoense.data.data
              
          }
        })

  },
  data () {
    return {
      goodTeacher:[],
      newCourseList:[],
      swiperOption: {

        direction: 'horizontal',//横向切换，默认：vertical（纵向切换）
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:true,//修改swiper的父元素时，自动初始化swiper 
        loop:true,
        //配置分页
        pagination: {
          el: '.swiper-pagination',//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,//默认true
        },
      
      },
    }
  },
  created() {
    this.getNewCourse()
    this.getGoodTeacher()
  },
  methods:{
    //查询最新课程
    getNewCourse(){
      index.getNewCourse()
        .then(respoense =>{
          this.newCourseList = respoense.data.data
        })
    },
    // 获取权重较高的老师
    getGoodTeacher(){
      index.getGoodTeacher()
        .then(respoense =>{
          this.goodTeacher = respoense.data.data
        })
    }

  }
}
</script>
<style scoped>
.swiper-wrapper img{
  width: 1263px;
  height: 480px;
}
</style>