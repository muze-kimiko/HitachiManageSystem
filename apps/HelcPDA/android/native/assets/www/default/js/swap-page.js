
/* JavaScript content from js/swap-page.js in folder common */
  
//  $( document ).on( "swipeleft", ".ui-page", function( event ) {
//      var next = $( this ).jqmData( "next" );
//      $( ":mobile-pagecontainer" ).pagecontainer( "change", next+".html", { transition:"slide"} );
//   });
//   $( document ).on( "swiperight", ".ui-page", function( event ) {
//	      var prev = $( this ).jqmData( "prev" );
//	      $( ":mobile-pagecontainer" ).pagecontainer( "change", prev+".html", {
//	      transition:"slide",
//	      reverse:"true"} );     
//	   });
   $(document).on("pagecreate","#index",function(){
	   $("#wrapper").on("swipeleft",function(){
		   alert(12);
//		   $.mobile.changePage("page-b.html",{transition:"slide"});
	   });
	   $("#wrapper").on("swiperight",function(){
		   alert(34); 
		   $.mobile.changePage(ids[i-1]+".html",{transition:"slide",reverse:"true"});
	   });
	   
   });

    $( document ).on( "pagecontainerchange", function() {
         var current = $( ".ui-page-active" ).jqmData( "title" );
         $( "[data-role='header'] h1" ).text( current );
         $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
         $( "[data-role='navbar'] a" ).each(function() {
            if ( $( this ).text() === current ) {
                $(this).addClass("ui-btn-active");
            }
         });
      });
   
   //利用数组保存页面ID来进行循环左右滑动
//$(function() {
//	    var ids=["index","page-b","page-c","page-d"];	    	 
//	        	  $("#"+ids[i]).bind("swipeleft",function(){
//	        		  if(i===ids.length){
//	         			  i=0;
//	         		      }
//	        		  $.mobile.changePage(ids[i+1]+".html",{transition:"slide"});
//	        		  i++;
//	        	  });
//	        	  $("#"+ids[i]).bind("swiperight",function(){
//	        		  if(i===0){
//	        			  i=ids.length;
//	        		  }
//	        		  $.mobile.changePage(ids[i-1]+".html",{trnsition:"slide",reverse:"true"},true,true);
//	        		  i--;
//	        	  }); 
//
//  });

      //利用数组进行滑动页面ID保存
//$(document).ready(function(){  
//  
//    //我在一个页面中包含了5个page  
//    $page_list_object = $('.page');  
//  
//    //要切换页面的link  
//    $index_page_link_list = ['index.html#index',  
//                             'page-b.html#page-b',  
//                             'page-c.html#page-c',  
//                             'page-d.html#page-d'];  
//    //修改触发像素大小  
//    $.event.special.swipe.horizontalDistanceThreshold = 5;  
//    //给页面中的5个page都加上左右滑动事件  
//    $.each($page_list_object,function($index,$item){  
//        $(this).on("swipeleft",function(e){  
//            $current_index = $index <3 ? $index+1 : 3;  
//            $.mobile.changePage($index_page_link_list[$current_index]);  
//             e.stopImmediatePropagation();  
//            //return false;  
//  
//        });  
//        $(this).on("swiperight",function(e){  
//            $current_index = $index >0? $index-1 : 0;  
//            $.mobile.changePage($index_page_link_list[$current_index]);  
//            e.stopImmediatePropagation();  
//            //return false;  
//        });  
//    });  
//  
//});
