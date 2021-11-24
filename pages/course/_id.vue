<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程详情 开始 -->
    <section class="container">


        <!-- 课程所属分类 开始 -->
        <section class="path-wrap txtOf hLh30">
            <a href="#" title class="c-999 fsize14">首页</a>
            \
            <a href="/course" title class="c-999 fsize14">课程列表</a>
            \
            <span class="c-333 fsize14">{{ course.subjectLevelOne }}</span>
            \
            <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
        </section>
        <!-- /课程所属分类 结束 -->

        <!-- 课程基本信息 开始 -->
        <div>
            <article class="c-v-pic-wrap" style="height: 357px;">
                <section id="videoPlay" class="p-h-video-box">
                    <img :src="course.cover" :alt="course.title" class="dis c-v-pic">
                </section>
            </article>
            <aside class="c-attr-wrap">
                <section class="ml20 mr15">
                    <h2 class="hLh30 txtOf mt15">
                        <span class="c-fff fsize24">{{ course.title }}</span>
                    </h2>
                    <section class="c-attr-jg">
                        <span class="c-fff">价格：</span>
                        <b class="c-yellow" style="font-size:24px;">￥{{ course.price }}</b>
                    </section>
                    <section class="c-attr-mt c-attr-undis">
                        <span class="c-fff fsize14">主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
                    </section>
                    <section class="c-attr-mt of">
                        <span class="ml10 vam">
                            <em class="icon18 scIcon"/>
                            <a class="c-fff vam" title="收藏" href="#" >收藏</a>
                        </span>
                    </section>
                    <section class="c-attr-mt">
                        <span v-if="isbuy === 1">
                            <a href="#course" title="立即观看"  class="comm-btn c-btn-3">立即观看</a>
                        </span>
                        <!-- TODO: 需要完成购买 -->
                        <span v-else >
                            <a href="javascript:void(0);" @click="pay" title="立即观看" class="comm-btn c-btn-3">立即购买</a>
                        </span>
                    </section>
                </section>
            </aside>
            <aside class="thr-attr-box">
                <ol class="thr-attr-ol clearfix">
                    <li>
                        <p>&nbsp;</p>
                        <aside>
                            <span class="c-fff f-fM">购买数</span>
                            <br>
                            <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
                        </aside>
                    </li>
                    <li>
                        <p>&nbsp;</p>
                        <aside>
                            <span class="c-fff f-fM">课时数</span>
                            <br>
                            <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
                        </aside>
                    </li>
                    <li>
                        <p>&nbsp;</p>
                        <aside>
                            <span class="c-fff f-fM">浏览数</span>
                            <br>
                            <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
                        </aside>
                    </li>
                </ol>
            </aside>
            <div class="clear"/>
        </div>
        <!-- /课程基本信息 结束 -->


        <div class="mt20 c-infor-box">
            <article class="fl col-7">
            <section class="mr30">
                <div class="i-box">
                <div>
                    <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                    <a name="c-i" class="current" title="课程详情">课程详情</a>
                    </section>
                </div>
                <article class="ml10 mr10 pt20">

                    <!-- 课程详情介绍 开始 -->
                    <div>
                        <h6 class="c-i-content c-infor-title">
                            <span>课程介绍</span>
                        </h6>
                        <div class="course-txt-body-wrap">
                            <section class="course-txt-body">
                                <!-- 将内容中的html翻译过来 -->
                                <p v-html="course.description">{{ course.description }}</p>
                            </section>
                        </div>
                    </div>
                    <!-- /课程详情介绍 结束 -->

                    <!-- 课程大纲 开始-->
                    <div class="mt50" id="course">
                        <h6 class="c-g-content c-infor-title">
                            <span>课程大纲</span>
                        </h6>
                        <section class="mt20">
                            <div class="lh-menu-wrap">
                                <menu id="lh-menu" class="lh-menu mt10 mr10">
                                    <ul>
                                        <!-- 课程章节目录 -->
                                        <li v-for="chapter in chapterList" :key="chapter.id" class="lh-menu-stair">
                                            <a :title="chapter.title" href="javascript: void(0)"  class="current-1">
                                                <em class="lh-menu-i-1 icon18 mr10"/>{{ chapter.title }}
                                            </a>
                                            <ol class="lh-menu-ol" style="display: block;">
                                                <li v-for="video in chapter.children" :key="video.id" class="lh-menu-second ml30">
                                                    <div  v-if="isbuy === 1">
                                                        <a :href="'/player/'+video.videoSourceId" target="_blank" :title="video.title">
                                                            <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                                        </a>
                                                    </div>
                                                    <div v-else>
                                                        <!-- TODO: 需要完成购买 -->
                                                        <a href="javascript:void(0);" @click="pay" :title="video.title">
                                                        <span v-if="isbuy === 0" class="fr">
                                                            <i class="free-icon vam mr10">请购买</i>
                                                        </span>
                                                        <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                                    </a>
                                                    </div>
                                                </li>
                                            </ol>
                                        </li>
                                    </ul>
                                </menu>
                            </div>
                        </section>
                    </div>
                    <!-- /课程大纲 结束 -->
                </article>
                </div>
            </section>
            </article>
            <aside class="fl col-3">
            <div class="i-box">
                <!-- 主讲讲师 开始-->
                <div>
                    <section class="c-infor-tabTitle c-tab-title">
                        <a title href="javascript:void(0)">主讲讲师</a>
                    </section>
                    <section class="stud-act-list">
                        <ul style="height: auto;">
                            <li>
                                <div class="u-face">
                                    <a :href="'/teacher/'+course.teacherId" target="_blank">
                                        <img :src="course.avatar" width="50" height="50" alt>
                                    </a>
                                </div>
                                <section class="hLh30 txtOf">
                                    <a :href="'/teacher/'+course.teacherId" class="c-333 fsize16 fl" target="_blank">{{ course.teacherName }}</a>
                                </section>
                                <section class="hLh20 txtOf">
                                    <span class="c-999">{{ course.intro }}</span>
                                </section>
                            </li>
                        </ul>
                    </section>
                </div>
                <!-- /主讲讲师 结束 -->
            </div>
            </aside>
            <div class="clear"/>
        </div>
        </section>
    <!-- /课程详情 结束 -->
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
        return axios.get('http://localhost:8000//online/frontcourse/getCourseInfo/'+params.id,{
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
                course: response.data.data.course,
                chapterList: response.data.data.chapterVOList,
                isbuy: response.data.data.isbuy
            }
        })
    },
    methods:{
        pay(){

            var token = getToken();
            window.location.href='http://localhost:8000/payservice/alipay/pay/'+token +'/'+ this.course.id

        }
    }
}
</script>

<style lang="css" scoped>
.c-v-pic-wrap .p-h-video-box img{height: 346px; width: 100%;}
</style>
