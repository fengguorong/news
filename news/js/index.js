$(function(){
// 闪屏页   
    var widths=$(window).width();
    var heights=$(window).height();
    $(".swiper-slidess").css({"height":heights+"px","width":widths+"px"});

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
//导航
    /*$(window).scroll(function(){
        var tops=$("body").scrollTop();
        if(tops<=heights){
            
        }
    })*/
//导航点击效果
    var num;
    $(".hot-list").click(function(){
        num=$(this).index();
    })
    $(".tubiao").css("color","#333");
    if(num!=0){
        $(".tubiao").eq(num).css("color","#DF3031");
    }else{
        $(".tubiao").eq(0).css("color","#DF3031");
    }
    
//menu的高度
    $(".menus").css("height",heights+"px");
    
// 移动端固定定位的问题
    var myScroll = new IScroll('#wrapper', {
        bounceEasing: 'elastic',
        bounceTime: 1200 ,
        mouseWheel:true,
        bounce:true,
        click:true
    });
    myScroll.on("scrollStart",function(){
        if(myScroll.y==myScroll.maxScrollY){
            down();
        }
        if(myScroll.y==0){
            up();
        }
    })
    var upEle=$(".up")[0];
    var downEle=$(".down")[0];
    var scroller=$(".scroller")[0];
    function up(){
        upEle.style.display="block";
        setTimeout(function(){
            upEle.style.display="none";;
        },1000)
    }
    function down(){
        downEle.style.display="block";
        myScroll.refresh();
        setTimeout(function(){
            var news=document.createElement("div");
            news.style.cssText="font-size:0.3rem;text-align:center;";
            news.innerHTML="update内容";
            $("#scroller").append(news);
            downEle.style.display="none";
            myScroll.refresh();
        },2000)
    }


//菜单栏的出现和消失
    $(".menuss-box").click(function(){
        $(".menus").css({
            animation:"menu 1s ease forwards"
        });
    })
    $(".close-nav").click(function(){
        $(".menus").css({
            animation:"menu2 1s ease forwards"
        });
    })


})