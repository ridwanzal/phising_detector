$(document).ready(function(){
                  
    $(".tab-content > div").not(":first").hide();
    $(".tab-links div").click(function(){
        $(".tab-links div").removeClass("active");
        $(this).addClass("active");
        var tab_link_get = $(this).index();
        $(".tab-content > div").slideUp();
        $(".tab-content > div").eq(tab_link_get).slideDown();
    });
    
    /* Mobil Menu */
    $(".mobil-menu").click(function(){
        $(".header-menu").slideToggle();
    });
    
});
