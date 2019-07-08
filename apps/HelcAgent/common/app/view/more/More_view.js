Ext.define('HelcAgent.view.more.More_view', {
    extend: 'Ext.Container',
    id: 'more_view_id',
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
                   title: '设置',
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
	            				        id: 'appws_FH',
	            			            align:'right',
	                                },
	                            ]
                       },
                       {
                           xtype: 'container',
                           cls: 'i_Button_Box',
//                           html: '<ul> 	<li id="about" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#62bb47">i</div><div class="i_Button_List_Title">关于PDA</div><div class="i_Button_List_Isclosure">!</div></li>  	<li id="Cpassword" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#f6821f">K</div><div class="i_Button_List_Title">修改密码</div><div class="i_Button_List_Isclosure">!</div></li> 	<li id="help" class="i_Button_List"><div class="i_Button_List_Icon" style=" color:#e03a3e">?</div><div class="i_Button_List_Title">帮助</div><div class="i_Button_List_Isclosure">!</div></li> <li id="testqr" class="i_Button_List i_Button_List_NoBorder"><div class="i_Button_List_Icon" style=" color:#e03a3e">u</div><div class="i_Button_List_Title">测试二维码</div><div class="i_Button_List_Isclosure">!</div></li></ul>',
                           html: '<ul>'+ 	
                        	   '<li id="about" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#62bb47">i</div><div class="i_Button_List_Title">关于PAD</div><div class="i_Button_List_Isclosure">!</div></li>'+  	
                           	   '<li id="Cpassword" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#f6821f">K</div><div class="i_Button_List_Title">修改密码</div><div class="i_Button_List_Isclosure">!</div></li>',	
                           	   /*'<li id="help" class="i_Button_List"><div class="i_Button_List_Icon" style=" color:#e03a3e">?</div><div class="i_Button_List_Title">帮助</div><div class="i_Button_List_Isclosure">!</div></li> </ul>',*/
                           margin: '0 0 10 0'
                       },
                       /*{
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
                               }
                           ]
                       },*/
                       {
                       	xtype: 'label',
                       	id: 'Label_CallLog',
                       	baseCls: 'x-label helcCalllog_label',
                       },
                   ]
            	   
               } 
        ]
    }

});