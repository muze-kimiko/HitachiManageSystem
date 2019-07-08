
/* JavaScript content from app/view/New_More_view.js in folder common */
Ext.define('HelcPDA.view.New_More_view', {
    extend: 'Ext.Container',
    id: 'New_More_view_id',
    requires: [
        'Ext.Toolbar',
        'Ext.carousel.Carousel',
        'Ext.Panel',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        scrollable: false,
        height:'100%',
        items: [
               {
                   xtype: 'container',
                   id: 'M_GD',
                   title: '更多',
                   iconCls: 'more',
                   style: 'background-color:#f0f0f0;',
                   layout: 'vbox',
                   items: [
                       {
                           xtype: 'toolbar',
                           docked: 'top',
                           title: '更多',
	                       items: [
	                                {
	                                	xtype: 'button',
	            				        ui: 'back',
	            				        text: '主页',
	            				        id: 'backToMenus',
	            			            align:'right',
	                                },
	                            ]
                       },
                       {
                           xtype: 'container',
                           cls: 'i_Button_Box',
//                           html: '<ul> 	<li id="about" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#62bb47">i</div><div class="i_Button_List_Title">关于PDA</div><div class="i_Button_List_Isclosure">!</div></li>  	<li id="Cpassword" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#f6821f">K</div><div class="i_Button_List_Title">修改密码</div><div class="i_Button_List_Isclosure">!</div></li> 	<li id="help" class="i_Button_List"><div class="i_Button_List_Icon" style=" color:#e03a3e">?</div><div class="i_Button_List_Title">帮助</div><div class="i_Button_List_Isclosure">!</div></li> <li id="testqr" class="i_Button_List i_Button_List_NoBorder"><div class="i_Button_List_Icon" style=" color:#e03a3e">u</div><div class="i_Button_List_Title">测试二维码</div><div class="i_Button_List_Isclosure">!</div></li></ul>',
                           html: '<ul>'+ 	
                        	   '<li id="about" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#62bb47">i</div><div class="i_Button_List_Title">关于PDA</div><div class="i_Button_List_Isclosure">!</div></li>'+  	
                           	   '<li id="Cpassword" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#f6821f">K</div><div class="i_Button_List_Title">修改密码</div><div class="i_Button_List_Isclosure">!</div></li>'+ 	
                           	   '<li id="help" class="i_Button_List"><div class="i_Button_List_Icon" style=" color:#e03a3e">?</div><div class="i_Button_List_Title">帮助</div><div class="i_Button_List_Isclosure">!</div></li> </ul>',
                           margin: '0 0 10 0'
                       },
                       {
                           xtype: 'container',
                           items: [
                               {
                                   xtype: 'button',
                                   id: 'btn_loginout',
                                   baseCls: 'm_Exit_Banner',
                                   docked: 'top',
                                   labelCls: 'm_Exit_Banner_label',
                                   pressedCls: 'm_Exit_Bannerpressing',
                                   text: '退出',
                                   listeners:{
                                     tap:function(){
                                    	// 关闭定位
                                 		cordova.exec(function(rds){},function(){},'CommonPlugin','CloseGPS',[]);
                                 		
                                   	  	 function stopService(){
                                         		cordova.exec(function(res) {
                                         			//WL.Toast.show('结束定时任务');
                                         		}, function(err) {
                                         			WL.Toast.show("错误:"+err);
                                         		},"MapMain","stopService",[{USERID:userid,DeviceNo:(device.uuid).toUpperCase()}]); 
                                                 }
                                           	stopService();
                                   	var query={tcode:userid+"help",tid:"help"};
                                   	WL.JSONStore.get(collectionName).remove(query).then(function(){
                       				});
                                   	var main = Ext.getCmp('loginView');
                                  	 	if(!main){
                                  		 main = Ext.create('HelcPDA.view.LoginView');
                                  	 	}
                                  	 	Ext.Viewport.setActiveItem(main);
                                  	    ViewArray.splice(ViewArray.length-1,1);
                                  	    ViewArray = [];
                                  	 	if (commitTask!=null) {
                                  	 		window.clearInterval(commitTask);
                                  	 		commitTask = null;
//                                  	 		WL.Toast.show('定时任务已关闭');
                                  	 	}
                                
                                      }
                                   }
                               }
                           ]
                       },
                       {
                       	xtype: 'label',
                       	id: 'Label_CallLog',
                       	baseCls: 'x-label helcCalllog_label',
                       },
                       {
           				xtype:'hiddenfield',
           				id:'hfmenu_daiban_flag',
           				value:'0'
           			}
                   ]
            	   
               } 
        ]
    }

});