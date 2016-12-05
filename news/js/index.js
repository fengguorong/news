$(function(){
 // 闪屏页   
    var widths=$(window).width();
    var heights=$(window).height();
    $(".swiper-slide").css({"height":heights+"px","width":widths+"px"});
    function resize(origin){
        var html= document.getElementsByTagName("html")[0];
        html.style.fontSize=widths/origin*100+"px";
    }
    resize(750);
    var mySwiper = new Swiper ('.swiper-container', {

        // 如果需要滚动条
        pagination: '.swiper-pagination',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })
//首页





})