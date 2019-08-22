jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});

	
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
});



function show(pdfPath){
        // 下面代码都是处理IE浏览器的情况 
        if (window.ActiveXObject || "ActiveXObject" in window) {
          //判断是否为IE浏览器，"ActiveXObject" in window判断是否为IE11
          //判断是否安装了adobe Reader
          for (x = 2; x < 10; x++) {
            try {
              oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');");
              if (oAcro) {
                flag = true;
              }
            } catch (e) {
                flag = false;
            }
          }
            try {
              oAcro4 = new ActiveXObject('PDF.PdfCtrl.1');
                if (oAcro4) {
                  flag = true;
                }
            } catch (e) {
                flag = false;
            }

            try {
              oAcro7 = new ActiveXObject('AcroPDF.PDF.1');
              if (oAcro7) {
                flag = true;
              }
            } catch (e) {
              flag = false;
            }

            if (flag) {//支持
              showPdf(pdfPath);
            }else {//不支持
              $("#pdfContent").append("对不起,您还没有安装PDF阅读器软件呢,为了方便预览PDF文档,请选择安装！");
              alert("对不起,您还没有安装PDF阅读器软件呢,为了方便预览PDF文档,请选择安装！");
              location = "http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.3/chs/AdbeRdr930_zh_CN.exe";
            }

        }else {
            showPdf(pdfPath);
        }
    }

    function showPdf(pdfPath){
		$("body").append
        (
            //占据整个屏幕Div
            "<div id='fullScreen' onclick='hide()'><div style='padding: 30px;font-size: 40px; text-align: right;'>✕</div></div>"
            
        );
        var screenHeight = $(window).height();

        $('#iframepage').attr('src','images/product/'+pdfPath);

        $('#iframepage').css('height',screenHeight*0.9+'px');
        var scrolltop = $(document).scrollTop();
        var objTop = (screenHeight - $('#iframepage').height())/2 + scrolltop;
        $('#iframepage').css('visibility', 'visible');
        $('#iframepage').css('top',objTop+'px');
        

        $(document.body).css({
           "overflow-x":"hidden",
           "overflow-y":"hidden"
         });      
    }

    function hide(){
        $('#iframepage').css('visibility', 'hidden');
        $('#iframepage').attr('src','');
        $(document.body).css({
               "overflow-x":"",
               "overflow-y":""
             });
        $("#fullScreen").remove();
    }

    // 居中
    function leftTop(obj){
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();
            var scrolltop = $(document).scrollTop();
            var scrollleft = $(document).scrollLeft();
            var objLeft = (screenWidth - obj.width())/2 + scrollleft  ;
            var objTop = (screenHeight - obj.height())/2 + scrolltop;
            obj.css({left: objLeft + 'px', top: objTop + 'px'});
    }
    function center(obj) {
        leftTop(obj);
        //浏览器窗口大小改变时
        $(window).resize(function() {
             leftTop(obj);
        });
        //浏览器有滚动条时的操作、
        $(window).scroll(function() {
            leftTop(obj);
        });
       
    }