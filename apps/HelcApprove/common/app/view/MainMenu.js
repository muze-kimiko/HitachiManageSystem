/**
 * 基类NavigationView容器
 */
Ext.define('HelcApprove.view.MainMenu', {
	extend: 'Ext.Container',
	id:'MainMenu',
	requires: ['Ext.Menu','Ext.Button','Ext.Img','Ext.Container'], 
    config: {
        style: 'background-image:url(images/i_bg05.jpg); background-size:100% 100%;',
        items: [
                {
                    xtype: 'image',
                    id:'MainMenu_image',
                    height: 135,
                    margin: '0 0 0 30',
                    width: 153,
                    src: 'images/i_logo01.jpg'
                },
                {
                    xtype: 'container',
                    id:'MainMenu_container',
                    height: 200,
                    margin: '120 auto 0 auto',
                    width: 532,
                    items: [
            				{
            				    xtype: 'label',
            				    html:'<p><font size="5" color="white">TBJ/增费及超点审批</font></p>',
            				    margin: '0 auto 10 auto',
            				},
                        {
							xtype: 'button',
                            baseCls: 'home-button',
                            height: 177,
                            id: 'menu_tbj',
                            itemId: 'menu_tbj',
                            style: 'background: url(images/i_button01.png); background-size:177px 177px; border:1px solid #a58a63; border-right:none; ',
                            width: 177,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">TBJ Approval</span><br><span>TBJ审批（</span><span id="sp_tbj_paddeing_count"></span><span>）</span>'
                        },
                        {
                        	xtype: 'button',
                            baseCls: 'home-button',
                            height: 177,
                            id: 'menu_cdzf',
                            itemId: 'menu_cdzf',
                            style: 'background: url(images/i_button02.png); background-size:177px 177px; border:1px solid #a58a63; border-right:none;',
                            width: 177,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">Increasing-Fee Approval</span><br>增费及超点审批（</span><span id="sp_addService_paddeing_count"></span><span>）</span>'
                        },
                        {
                        	xtype: 'button',
                            baseCls: 'home-button',
                            height: 177,
                            id: 'menu_seting',
                            itemId: 'menu_seting',
                            style: 'background: url(images/i_button03.png); background-size:177px 177px; border:1px solid #a58a63; ',
                            width: 177,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">Settings</span><br>设置'
                        }
                    ]
                },
                {
                	xtype: 'container',
                	id: 'cnt_showLoadCount',
                	margin: '0 auto 0 auto',
                    width: 532,
                	html: '<div style="font-size: 12px;color:white;">正在加载待审批数量...</div>'
                },
                {
                    xtype: 'container',
                    id:'MainMenu_container2',
                    bottom: 0,
                    height: 125,
                    style: 'background: url(images/i_bottom_bg01.png); background-size:768px 125px;',
                    width: '100%',
                    items: [
                        {
                            xtype: 'image',
                            id:'MainMenu_image2',
                            height: 14,
                            left: 10,
                            margin: '98 0 0 0 ',
                            width: 360,
                            src: 'images/i_companyName.png'
                        },
                        {
        				    xtype: 'label',
        				    html:'<font size="1" color="white">您上次登录本系统的时间为： <span id="spn_logintime"></span></font>',
        				    right: 8,
        				    bottom:12,
        				},
                    ]
                }
        ],
//        listeners: [
//                    {
//                        fn: 'onJS1Tap',
//                        event: 'tap',
//                        delegate: '#JS1'
//                    }
//                ]
    },
    
//    onJS1Tap: function(image, e, eOpts) {
//    	Ext.Viewport.toggleMenu('right');
//    },
//    
//    doSetHidden: function(hidden) {
//        this.callParent(arguments); 
//        if (hidden) {
//            Ext.Viewport.removeMenu('right');
//        } else {
//            Ext.Viewport.setMenu(this.menuForSide('right'), {
//                side: 'right',
//                reveal: true
//            });
//        }
//    }, 
//    menuForSide: function(side) {
//        var items = [
//            {
//            	margin: '15 auto 8 auto',
//                text: '修改密码',
//                iconCls: 'more',
//                scope: this,
//                handler: function() {
//                    Ext.Viewport.hideMenu(side);
//                    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
//                    var main = Ext.getCmp('updatepassword');
//            		if(!main){
//            			main = Ext.create('Helcss.view.UpdatePasswordView');
//            		}
//            		Ext.Viewport.setActiveItem(main); 
//                }
//            },
//            {
//                text: '定时刷新',
//                iconCls: 'time',
//                scope: this,
//                handler: function() {
//                    Ext.Viewport.hideMenu(side);
//                    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
//	                var main = Ext.getCmp('systimer');
//	        		if(!main){
//	        			main = Ext.create('Helcss.view.SystemTimerView');
//	        		}
//	        		Ext.Viewport.setActiveItem(main); 
//	        		
//	        		var obj = Ext.getCmp("systimer");
//	        		obj.afterLoad();
//                }
//            },
//            {
//                //xtype: 'button',
//                text: '登录',
//                iconCls: 'user',
//                scope: this,
//                handler: function() {
//                    Ext.Viewport.hideMenu(side);
//                    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
//                    var main = Ext.getCmp('login');
//            		if(!main){
//            			main = Ext.create('Helcss.view.LoginView');
//            		}
//            		Ext.Viewport.setActiveItem(main); 
//                }
//            }
//        ];
//
//        var className = 'Ext.Menu'; 
//        return Ext.create(className, {
//            items: items
//        });
//    },

    initialize: function() {
//    	if(PDsystem==1){
//    		//背景
//    		Ext.getCmp('MainMenu').setStyle('background-image:url(images/i_bg01.jpg); background-size:100% 100%;');
//    		//图标
//    		Ext.getCmp('MainMenu_image').setHeight(70);
//    		Ext.getCmp('MainMenu_image').setWidth(80);
//    		Ext.getCmp('MainMenu_image').setMargin('0 0 0 20');
//    		//中部
//    		Ext.getCmp('MainMenu_container').setHeight(300);
//    		Ext.getCmp('MainMenu_container').setWidth(300);
//    		Ext.getCmp('MainMenu_container').setMargin('136 auto 0 auto');
//    		//选择 一
//    		Ext.getCmp('menu_jianjie').setBaseCls('home-button-az-one');
//    		Ext.getCmp('menu_jianjie').setHeight(100);
//    		Ext.getCmp('menu_jianjie').setWidth(100);
//    		Ext.getCmp('menu_jianjie').setStyle('background: url(images/i_button01.png); background-size:100% 100%;');
//    		//选择 二
//    		Ext.getCmp('img_1').setHeight(100);
//    		Ext.getCmp('img_1').setWidth(100);
//    		//选择 三
//    		Ext.getCmp('menu_baobiao').setBaseCls('home-button-az-one');
//    		Ext.getCmp('menu_baobiao').setHeight(100);
//    		Ext.getCmp('menu_baobiao').setWidth(100);
//    		Ext.getCmp('menu_baobiao').setStyle('background: url(images/i_button03.png); background-size:100% 100%;');
//    		//选择 四
//    		Ext.getCmp('menu_jianshi').setBaseCls('home-button-az-one');
//    		Ext.getCmp('menu_jianshi').setHeight(100);
//    		Ext.getCmp('menu_jianshi').setWidth(100);
//    		Ext.getCmp('menu_jianshi').setStyle('background: url(images/i_button04.png); background-size:100% 100%; ');
//    		//选择 五
//    		Ext.getCmp('menu_xunshi').setBaseCls('home-button-az-one');
//    		Ext.getCmp('menu_xunshi').setHeight(100);
//    		Ext.getCmp('menu_xunshi').setWidth(100);
//    		Ext.getCmp('menu_xunshi').setStyle('background: url(images/i_button05.png); background-size:100% 100%; ');
//    		//选择 六
//    		Ext.getCmp('img_2').setHeight(100);
//    		Ext.getCmp('img_2').setWidth(100);
//    		//选择 七
//    		Ext.getCmp('img_3').setHeight(100);
//    		Ext.getCmp('img_3').setWidth(100);
//    		//选择 八
//    		Ext.getCmp('menu_anzhuang').setBaseCls('home-button-az-two');
//    		Ext.getCmp('menu_anzhuang').setHeight(100);
//    		Ext.getCmp('menu_anzhuang').setWidth(100);
//    		Ext.getCmp('menu_anzhuang').setStyle('background: url(images/i_button08.png); background-size:100% 100%; ');
//    		//选择 九
//    		Ext.getCmp('menu_ditu').setBaseCls('home-button-az-one');
//    		Ext.getCmp('menu_ditu').setHeight(100);
//    		Ext.getCmp('menu_ditu').setWidth(100);
//    		Ext.getCmp('menu_ditu').setStyle('background: url(images/i_button09.png); background-size:100% 100%; ');
//    		//底部
//    		Ext.getCmp('MainMenu_container2').setHeight(70);
//    		Ext.getCmp('MainMenu_container2').setStyle('background: url(images/i_bottom_bg01.png); background-size:100% 100%; ');
//    		//底部2
//    		Ext.getCmp('MainMenu_image2').setMargin('53 0 0 0 ');
//    		Ext.getCmp('MainMenu_image2').setWidth('100%');
//    		Ext.getCmp('MainMenu_image2').setStyle('background-size:80% 100%;');
//    		//右下角
//    		Ext.getCmp('shezhi').setWidth(70);
//    		Ext.getCmp('shezhi').setHeight(70);
//    		Ext.getCmp('shezhi').setStyle('background:url(images/i_set01.png);background-size:100% 100%;');
//    	};
    }


});

 