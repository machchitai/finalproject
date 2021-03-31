
$(document).ready(function(){
    // hover tool search
    
    $("#action-search").hover(function(){
      $("#search-box-hidden").css("display","flex")
    },function(){
        $("#search-box-hidden").hover(function(){
            $("#search-box-hidden").css("display","flex")
            },function(){
            $("#search-box-hidden").css("display","none")
        });
        $("#search-box-hidden").css("display","none")
    });

    //hover tool favourite
    $("#action-save").hover(function(){
        $("#save-box-hidden").css("display","block")
      },function(){
        $("#save-box-hidden").hover(function(){
            $("#save-box-hidden").css("display","block")
            },function(){
            $("#save-box-hidden").css("display","none")
        });
        $("#save-box-hidden").css("display","none")
    });

    //support css header
    height = $(".header").height();
    $(".all-item-hidden").css("top",height)

    //hover all-item
    $(".item-sales").hover(function(){
        $(".all-item-hidden").css("display","none")
    })
    $(".item-home").hover(function(){
        $(".all-item-hidden").css("display","none")
    })
    $(".all-item-menu").hover(function(){
        $(".all-item-hidden").css("display","block")
      },function(){

        $(".all-item-hidden").hover(function(){
            $(".all-item-hidden").css("display","block")
            },function(){
            $(".all-item-hidden").css("display","none")
        });
    });
});