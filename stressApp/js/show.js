$(function(){
	var widths=$(window).width();
    var heights=$(window).height();
   /* $(".swiper-slidess").css({"height":heights+"px","width":widths+"px"});*/

    function resize(origin){
        var html= document.getElementsByTagName("html")[0];
        html.style.fontSize=widths/origin*100+"px";
    }
    resize(750);
	$(".show-more-dian").on("touchstart",function(){
		$(this).next().slideToggle(200);
	})
})
