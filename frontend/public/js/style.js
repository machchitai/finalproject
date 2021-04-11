
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
    //if hover item-sales and item-home then all-item-hidden is display none
    $(".item-sales").hover(function(){
        $(".all-item-hidden").css("display","none");
    })
    $(".item-home").hover(function(){
        $(".all-item-hidden").css("display","none");
    })
    $(".header").hover(function(){},function(){
        $(".all-item-hidden").css("display","none");
    })

    //if hover all-item-menu then all-item-hidden is display block
    $(".all-item-menu").hover(function(){
        $(".all-item-hidden").css("display","block");
        $(".all-item-hidden").css("animation","fade-in 0.5s");
      },function(){

        $(".all-item-hidden").hover(function(){
            $(".all-item-hidden").css("display","block");
            $(".all-item-hidden").css("animation","fade-in 0.5s");
            },function(){
            $(".all-item-hidden").css("display","none");
        });
    });
    //scroll Top to Header and edit header
    
    $(window).scroll(function(event) {
    
        var pos_body = $('html,body').scrollTop();
        //console.log(pos_body);
        if(pos_body > 125){
            $(".header").css("position","fixed");
            $('body').css('padding-top','110px');
            /* $(".header").css("animation","move-down 1s"); */
        } else {
            $(".header").css("position","relative");
            $(".header").css("top","0");
            $('body').css('padding-top','0');
        }
        if (pos_body > 127) {
            $(".header").css("animation","move-down 1s");
            $(".header").css("animation-fill-mode","both");
        }
        if(pos_body > 200){
            $(".button-scroll-top").css("animation","move-in 0.3s");
            $(".button-scroll-top").css("animation-fill-mode","both");
        }else{
            $(".button-scroll-top").css("animation","move-out 0.3s");
            $(".button-scroll-top").css("animation-fill-mode","both");
        }
    });


    function sticky_scroll() {

        var a = $('#infor-product').outerWidth(), // Tính độ rộng của widget cần cố định
    
            //b = 0, // Tính độ cao của widget nằm trên
    
            c = a + 'px', // Đặt độ rộng bằng px của widget cần cố định
    
            d = $('.header').outerHeight(), // Tính độ cao của thanh menu cố định nằm trên, nếu menu không cố định đặt d = 0
    
            e = $(window).scrollTop(),
    
            f = $(".footer").offset().top,
    
            g = 0,
    
            h = $("#infor-product").height(), // Độ cao của widget cần cố định
    
            i = 400; // Đặt độ cao tính từ footer tới chân widget quảng cáo để cố định 20 không cần thay đổi
    
        if (e + h > f - i) 
    
            $('#infor-product').css({top: (e + h - f + i) * -1}) 
        else if (e > g) {
    
            $('#infor-product').css('position', 'fixed').css('top', d).css('width', c)
    
        } else {
    
          $('#infor-product').css('position', '').css('top', '').css('width', '')
    
        }
    
      }
    
    $(function() {

        $(window).scroll(sticky_scroll)

        sticky_scroll()

    })

    // buy now hidden
    $('.btn-buy-now').click(function() {
        $('.buy-now-hidden-box').css('display','block');
        $('.box-blur').css('display','block');
    })
    $('.box-blur').click(function() {
        $('.buy-now-hidden-box').css('display','none');
        $('.box-blur').css('display','none');
    })
    $('.btn-close-buy-now').click(function() {
        $('.buy-now-hidden-box').css('display','none');
        $('.box-blur').css('display','none');
    })
});