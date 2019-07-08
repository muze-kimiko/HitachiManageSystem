
/* JavaScript content from js/iscrollwrapper.js in folder common */
﻿/*****************************************/
/*          封装isroll.js                 */
/**************options对象说明**************/
/*         containerId:容器ID,下拉刷新部分              */
/*         pullUpId:上拉ID                */
/*         pullDownId:下拉ID              */
/*         pullDownAction:下拉事件                                  */
/*         pullUpAction:上拉事件                                         */
/*******************************************/

/************************html结构如下******************/
 //<div id="wrapper" style="position:absolute;z-index:1;top:115px;bottom:20px; width:100%;overflow:auto;">
 //  <div id="scroller">
 //	    <div id="pullDown" style="display:none;">
 //			<span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span>
 //		</div>		
 //		<div id="SearchResult" width="100%">	
 //   	</div>
 //   		<div id="pullUp" style="display:none;">
 //			<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>
 //		</div>
 //	</div>	
 //</div>
/*************************************************/
function IscrollWapper(options) {
	
	
	if(typeof options==="object"){
		
		 this.containerId = options.containerId;
		 this.pullUpId = options.pullUpId;
		 this.pullDownId = options.pullDownId;
		 this.pullDownAction = options.pullDownAction;
		 this.pullUpAction = options.pullUpAction,
		 this.contentId=options.contentId;
	}
    
    var isrcoll=(function(that) {
		var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset;

		/**
		 * 初始化iScroll控件
		 */
		function init() {
			if(that.pullDownId){
				pullDownEl = document.getElementById(that.pullDownId);
				if(pullDownEl)
					pullDownOffset = pullDownEl.offsetHeight;
			}
			
			if(that.pullUpId){
				pullUpEl = document.getElementById(that.pullUpId);	
				
				if(pullUpEl)
					pullUpOffset = pullUpEl.offsetHeight;
			}
			
			myScroll = new iScroll(that.containerId, {
				hScrollbar:false, 
				scrollbarClass: 'myScrollbar',
				useTransition: false, 
				topOffset: pullDownOffset,
				onBeforeScrollStart: function(e) { var target = e.target; while (target.nodeType != 1) target = target.parentNode; if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'BUTTON'){ e.preventDefault(); } },
				onRefresh: function () {
					if (pullDownEl && pullDownEl.className.match('loading')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					} 
				},
				onScrollMove: function () {
					
					if (this.y > 5 && pullDownEl && !pullDownEl.className.match('flip')) {
						pullDownEl.style.display='';
						pullDownEl.className = 'flip';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
						this.minScrollY = 0;
					} 
					else if (this.y < 5 && pullDownEl && pullDownEl.className.match('flip')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
						this.minScrollY = -pullDownOffset;
					}else if (this.y < (this.maxScrollY - 5) && pullUpEl && !pullUpEl.className.match('flip')) {
						pullUpEl.style.display='';
						pullUpEl.className = 'flip';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 5) && pullUpEl && pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
						this.maxScrollY = pullUpOffset;
					}	
				},
				onScrollEnd: function () {
					if (pullDownEl && pullDownEl.className.match('flip')) {
						pullDownEl.className = 'loading';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';	
						
						if(that.pullDownAction)
							that.pullDownAction();
					} else if (pullUpEl && pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';	
						
						if(that.pullUpAction)
							that.pullUpAction();	
					}
				}
			});
			
			setTimeout(function () { document.getElementById(that.containerId).style.left = '0'; }, 800);
			};
		
			return {
				init:function(){
					init();
				},
				refresh:function(){
					setTimeout(function () {
						myScroll.refresh();
					}, 1000);
				}
			};
		})(this);
	
		return isrcoll;
}
