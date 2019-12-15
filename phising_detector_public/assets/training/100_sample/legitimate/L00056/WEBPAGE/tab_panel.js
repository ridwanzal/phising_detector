$(function() {
		   $(".tab li:first-child").addClass("selected");
		   $(".panel li.p_body:not(:first)").css("display","none");
		   $(".tab li").click(function() {
									   $(".tab li").removeClass("selected");
									   $(this).addClass("selected");
									   $(".panel li.p_body").css("display","none");
									   $(".panel li.p_body:eq("+$(".tab li").index(this)+")").css("display","block");
									   });
		   });