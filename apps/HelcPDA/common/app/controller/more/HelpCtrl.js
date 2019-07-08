Ext.define('HelcPDA.controller.more.HelpCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			"button#help_send_button":{
				tap:'help_send_button'
			},
		},
	},
	
	help_send_button : function(){
		var obj = this;
		var chatMefield = Ext.getCmp('help_chat_text').getValue().trim();
		if(chatMefield != ""){
			//显示我方发送
			var newmsg="<div class='chatItem me' >" +
									" <div class='chatItemContent'> " +
										"<img class='avatar' src='images/me_head_portrait.jpg'>" +
										" <div class='cloud cloudText'> " +
											"<div class='cloudPannel' style=''> " +
												"   <div class='sendStatus'></div>  " +
														"<div class='cloudBody'>             " +
															"<div class='cloudContent'>              " +
																" <pre id='chatme' style='white-space:pre-wrap'>"+chatMefield+"</pre> " +
															"</div>       " +
													"    </div>       " +
													"    <div class='cloudArrow'></div>        " +
													" </div>     " +
										    "</div>  " +
					                 "</div>   " +
					              "</div>";				
			document.getElementById("chatcontainer").innerHTML += newmsg ;
			Ext.getCmp('help_chat_text').setValue("");
			setTimeout(obj.hold, 500);
			Ext.getCmp('chat_container').getScrollable().getScroller().scrollToEnd();
			setTimeout(function(){
				
//			显示服务器回复
				contentdata={chatMefield:chatMefield};
				var content= JSON.stringify(contentdata);
				var getResult=function(res){
					var length = res.item.length;
					if(length != 0 ){
						Ext.getCmp('help_toolbar').setTitle('帮助');
						for(var i =0;i<length;i++){
							if(i==0){
								var chatYou = res.item[i].CONTENT;
								var newmsg="<div class='chatItem you'>     <div class='chatItemContent'> <img class='avatar' src='images/you_head_portrait.jpg'>       <div class='cloud cloudText'>         <div class='cloudPannel' style=''>           <div class='sendStatus'> </div>           <div class='cloudBody'>             <div class='cloudContent'>               <pre style='white-space:pre-wrap'><div onclick='HelpDanji(this);'>"+chatYou+"</div></pre>             </div>           </div>           <div class='cloudArrow '></div>         </div>       </div>     </div>   </div>";				
								document.getElementById("chatcontainer").innerHTML += newmsg ;
							}else{
//							//如需更改第一条信息之后的格式
								var chatYou = res.item[i].CONTENT;
								var newmsg="<div class='chatItem you'>     <div class='chatItemContent'> <img class='avatar' src='images/you_head_portrait.jpg'>       <div class='cloud cloudText'>         <div class='cloudPannel' style=''>           <div class='sendStatus'> </div>           <div class='cloudBody'>             <div class='cloudContent'>               <pre style='white-space:pre-wrap'><div onclick='HelpDanji(this);'>"+chatYou+"</div></pre>             </div>           </div>           <div class='cloudArrow '></div>         </div>       </div>     </div>   </div>";				
								document.getElementById("chatcontainer").innerHTML += newmsg ;
							}
						}
					}else{
						Ext.getCmp('help_toolbar').setTitle('帮助');
						var chatYou = "暂时没有您想查询的数据";
						var newmsg="<div class='chatItem you'>     <div class='chatItemContent'> <img class='avatar' src='images/you_head_portrait.jpg'>       <div class='cloud cloudText'>         <div class='cloudPannel' style=''>           <div class='sendStatus'> </div>           <div class='cloudBody'>             <div class='cloudContent'>               <pre style='white-space:pre-wrap'>"+chatYou+"</pre>             </div>           </div>           <div class='cloudArrow '></div>         </div>       </div>     </div>   </div>";				
						document.getElementById("chatcontainer").innerHTML += newmsg ;
					}
					setTimeout(obj.hold, 500);
					
					//把聊天记录存在本地
					var chat_record = document.getElementById("chatcontainer").innerHTML;
					var query={tcode:userid+"help",tid:"help"};
					WL.JSONStore.get(collectionName).remove(query).then(function(){
						var query2={tcode:userid+"help",tid:"help",stext:chat_record};
						WL.JSONStore.get(collectionName).add(query2).then(function(){
							console.log('保存更改数据成功');  
						}).fail(function(){
							Ext.Msg.alert("删除本地数据失败");
						});
						
					});
				};
				obj.asyconnectServer(getResult, 'helpAction.do?method=toSearch', content);
				Ext.getCmp('help_toolbar').setTitle('正在查询，请稍等...');
			},1000);
			
		}else{
			Ext.getCmp('help_send_button').setDisabled(true);
		}
		
	},
	
	
	hold : function(){
		Ext.getCmp('chat_container').getScrollable().getScroller().scrollToEnd();
	},
	
	hold2 : function(){
		Ext.getCmp('help_chat_text').setValue("");
		Ext.getCmp('chat_container').getScrollable().getScroller().scrollToEnd();
	}
	
});

//鼠标点击后触发的事件
function HelpDanji($this){
	var aa=$this.innerHTML;
	var bb=aa.split('"');
	WL.App.openURL(bb[1]);
};
