<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <!-- 全部课程 -->
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <!-- 课程分类导航栏  开始 -->
        <section class="c-s-dl">
          <!-- 课程类别  开始-->
          <!-- 一级课程分类  开始-->
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="javascript: void(0)" @click="init()">全部</a>
                </li>
                <li v-for="(item,index) in oneLevelSubjectList" :key="index">
                  <a :title="item.title"  href="javascript: void(0)" @click="getTwoSubject(item.id)">{{item.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <!-- 一级课程分类 结束 -->

          <!-- 二级课程分类  开始-->
          <dl>
            <dt>
              <span class="c-999 fsize14"/>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="twosubject in twoLevelSubjectList" :key="twosubject.id">
                  <a :title="twosubject.title" href="javascript: void(0)" @click="getCourse(twosubject.id)">{{ twosubject.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <!-- 二级课程分类  结束-->
          <!-- 课程类别  结束-->
          <div class="clear"/>
        </section>
        <!-- 课程分类导航栏  结束 -->

        <!--  内容排序导航栏  开始-->
        
        <!--  内容排序导航栏  结束-->

        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- 数据列表 开始-->
          <article v-if="data.total>0" class="comm-course-list">
              <ul id="bna" class="of">
                  <li v-for="item in data.items" :key="item.id">
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
import course from "@/api/course"
import subject from "@/api/subject"
//设置默认的页面显示记录数
var limit = 8

export default {
  async  asyncData({ params, error }) {
    // 正确
    let [courseList, subjectList] = await Promise.all([
      course.getPageList(0,1, limit),
      subject.getAllSubject()
    ])
    
    return {
      data: courseList.data.data,
      oneLevelSubjectList: subjectList.data.data
    }
    // return course.getPageList(1, limit).then(response => {
    //   console.log(response.data.data);
    //   return { data: response.data.data }
    // });
    //  subject.getAllSubject().then(response =>{
    //   console.log(response.data.data);
    //   return {subject: response.data.data}
    // })

  },
  data() {
    return {
      twoLevelSubjectList:[{"id": '0',"title": "全部"} ],
      twoLevelSubjectId:'0'
    }
  },
  methods: {
    //初始化二级分类
    init(){
     
      this.twoLevelSubjectList =[{"id": '0',"title": "全部"} ]
      this.getCourse(0)
    },
    //根据二级id查询课程
    getCourse(twoSubjectId){
      this.twoLevelSubjectId = twoSubjectId
      course.getPageList(twoSubjectId,1, limit)
      .then(response =>{
        this.data = response.data.data
      })
    },
    //获取二级分类
    getTwoSubject(parentId){
      // alert(parentId)
      for(var i=0;i<this.oneLevelSubjectList.length;i++) {
          //获取每个一级分类
          var levelOne = this.oneLevelSubjectList[i]
          //判断value值和遍历出来的每个一级分类id值是否一样
          if(levelOne.id === parentId) {
              //获取下面二级分类，是children
              this.twoLevelSubjectList = levelOne.children
          }
      }



    },
    //分页查询
    gotoPage(page){
      //查询时页数不能小于1 和大于总页数
      // alert(this.twoLevelSubjectId)
      if(page>=1 && page<=this.data.pages)
      course.getPageList(this.twoLevelSubjectId,page, limit).then(response => {
          this.data = response.data.data
      })
    }
  }
};
</script>