
/* JavaScript content from app/view/MainMenu.js in folder common */
/**
 * 基类NavigationView容器
 */
Ext.define('Helcss.view.MainMenu', {
	extend: 'Ext.Container',
	id:'MainMenu',
	requires: ['Ext.Menu','Ext.Button','Ext.Img','Ext.Container'], 
    config: {
        style: 'background-image:url(images/i_bg01.jpg); background-size:768px 1024px; -moz-background-size:768px 1024px;',
        items: [
				{
					 xtype: 'panel',
				    id:'MainMenu_formpanel_home',
				    layout: 'hbox',
				    scrollable: false,
				    width: '100%',
				    height: 135,
				    items:[{
					   	xtype: 'image',
	                    id:'MainMenu_image',
	                    height: 135,
	                    margin: '0 0 0 30',
	                    width: 153,
	                    src: 'images/i_logo01.jpg'
				    },{
				   	 	xtype: 'label',
				    	id:'MainMenu_label',
				    }]
				},
                /*{
                    xtype: 'image',
                    id:'MainMenu_image',
                    height: 135,
                    margin: '0 0 0 30',
                    width: 153,
                    src: 'images/i_logo01.jpg'
                },*/
                {
                    xtype: 'container',
                    id:'MainMenu_container',
                    height: 532,
                    margin: '136 auto 0 auto',
                    width: 532,
                    items: [
                        {
                            xtype: 'button',
                            baseCls: 'home-button',
                            height: 177,
                            id: 'menu_jianjie',
                            itemId: 'menu_jianjie',
                            style: 'background: url(images/i_button01.png); background-size:177px 177px; -moz-background-size:177px 177px; ',
                            width: 177,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">Company Profile</span><br>关于日立电梯'
                        },
                        {
                            xtype: 'image',
                            height: 177,
                            id: 'img_1',
                            showAnimation: 'flip',
                            style: 'float:left;',
                            width: 177,
                            src: 'images/i_button02.png'
                        },
                        {
                            xtype: 'button',
                            baseCls: 'home-button',
                            height: 177,
                            id: 'menu_baobiao',
                            itemId: 'menu_baobiao',
                            style: 'background: url(images/i_button03.png); background-size:178px 177px; -moz-background-size:178px 177px; ',
                            width: 178,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">Visual Reports</span><br>可视化报表'
                        },
                        {
                            xtype: 'button',
                            baseCls: 'home-button',
                            height: 177,
                            id: 'menu_jianshi',
                            itemId: 'menu_jianshi',
                            style: 'background: url(images/i_button04.png); background-size:177px 177px; -moz-background-size:177px 177px; ',
                            width: 177,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">Monitoring</span><br>遥监'
                        },
                        {
                            xtype: 'button',
                            baseCls: 'home-button',
                            height: 177,
                            id: 'menu_xunshi',
                            itemId: 'menu_xunshi',
                            style: 'background: url(images/i_button05.png); background-size:177px 177px; -moz-background-size:177px 178px; ',
                            width: 177,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">Inspection</span><br>巡查'
                        },
                        {
                            xtype: 'image',
                            height: 177,
                            id: 'img_2',
                            showAnimation: 'flip',
                            style: 'float:left;',
                            width: 178,
                            src: 'images/i_button06.png'
                        },
                        {
                            xtype: 'image',
                            height: 178,
                            id: 'img_3',
                            showAnimation: 'flip',
                            style: 'float:left;',
                            width: 177,
                            src: 'images/i_button07.png'
                        },
                        {
                            xtype: 'button',
                            baseCls: 'home-button',
                            height: 178,
                            id: 'menu_anzhuang',
                            itemId: 'menu_anzhuang',
                            style: 'background: url(images/i_button08.png); background-size:177px 178px; -moz-background-size:177px 178px; ',
                            width: 177,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">Installation Management</span><br>安装管理'
                        },
                        {
                            xtype: 'button',
                            baseCls: 'home-button',
                            height: 178,
                            id: 'menu_ditu',
                            itemId: 'menu_ditu',
                            style: 'background: url(images/i_button09.png); background-size:178px 178px; -moz-background-size:178px 178px; ',
                            width: 178,
                            labelCls: 'home-button-label',
                            pressedCls: 'home-button-pressed',
                            text: '<span class="home-button-label-eng">GPS Tracking</span><br>产品地图'
                        }
                    ]
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
                            xtype: 'button',
                            baseCls: 'home_menu_button',
                            pressedCls: 'home_menu_button_pressed',
                            height: 125,
                            width: 125,
                            margin: '0 0 0 0 ',
                            right: 0,
                            itemId: 'JS1',
                            id : "shezhi",
                            style: 'background:url(images/i_set01.png);background-size:125px 125px;'
                        }
                    ]
                }
        ],
        listeners: [
                    {
                        fn: 'onJS1Tap',
                        event: 'tap',
                        delegate: '#JS1'
                    }
                ]
    },
    
    onJS1Tap: function(image, e, eOpts) {
    	Ext.Viewport.toggleMenu('right');
    },
    
    doSetHidden: function(hidden) {
        this.callParent(arguments); 
        if (hidden) {
            Ext.Viewport.removeMenu('right');
        } else {
            Ext.Viewport.setMenu(this.menuForSide('right'), {
                side: 'right',
                reveal: true
            });
        }
    }, 
    menuForSide: function(side) {
        var items = [
            {
            	margin: '15 auto 8 auto',
                text: '修改密码',
                iconCls: 'more',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
                    var main = Ext.getCmp('updatepassword');
            		if(!main){
            			main = Ext.create('Helcss.view.UpdatePasswordView');
            		}
            		Ext.Viewport.setActiveItem(main); 
                }
            },
            {
                text: '定时刷新',
                iconCls: 'time',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
	                var main = Ext.getCmp('systimer');
	        		if(!main){
	        			main = Ext.create('Helcss.view.SystemTimerView');
	        		}
	        		Ext.Viewport.setActiveItem(main); 
	        		
	        		var obj = Ext.getCmp("systimer");
	        		obj.afterLoad();
                }
            },
            {
                //xtype: 'button',
                text: '登录',
                iconCls: 'user',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                    Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
                    var main = Ext.getCmp('login');
            		if(!main){
            			main = Ext.create('Helcss.view.LoginView');
            		}
            		Ext.Viewport.setActiveItem(main); 
                }
            }
        ];

        var className = 'Ext.Menu'; 
        return Ext.create(className, {
            items: items
        });
    },

    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('MainMenu_formpanel_home').setHeight(70);
    		var loginHtml='<div style="color:white;font-size:18pt;width:100%;height:100%">ELE-CLOUD</div>'+
			  '<div style="color:white;font-size:6pt;width:100%;height:100%">移动终端信息平台</div>';
    		Ext.getCmp('MainMenu_label').setHtml(loginHtml);
    		Ext.getCmp('MainMenu_label').setMargin('10 0 0 20');
    		//背景
    		Ext.getCmp('MainMenu').setStyle('background-image:url(images/login_bg.jpg); background-size:100% 100%;');
    		//图标
    		Ext.getCmp('MainMenu_image').setHeight(70);
    		Ext.getCmp('MainMenu_image').setWidth(80);
    		Ext.getCmp('MainMenu_image').setMargin('0 0 0 20');
    		//中部
    		Ext.getCmp('MainMenu_container').setHeight(330);
    		Ext.getCmp('MainMenu_container').setWidth(330);
    		Ext.getCmp('MainMenu_container').setMargin('50 auto 0 auto');
    		//选择 一
    		Ext.getCmp('menu_jianjie').setBaseCls('home-button-az-one2');
    		Ext.getCmp('menu_jianjie').setHeight(110);
    		Ext.getCmp('menu_jianjie').setWidth(110);
    		Ext.getCmp('menu_jianjie').setStyle('background: url(images/i_button01.png); background-size:100% 100%;');
    		//选择 二
    		Ext.getCmp('img_1').setHeight(110);
    		Ext.getCmp('img_1').setWidth(110);
    		//选择 三
    		Ext.getCmp('menu_baobiao').setBaseCls('home-button-az-one');
    		Ext.getCmp('menu_baobiao').setHeight(110);
    		Ext.getCmp('menu_baobiao').setWidth(110);
    		Ext.getCmp('menu_baobiao').setStyle('background: url(images/i_button03.png); background-size:100% 100%;');
    		//选择 四
    		Ext.getCmp('menu_jianshi').setBaseCls('home-button-az-one');
    		Ext.getCmp('menu_jianshi').setHeight(110);
    		Ext.getCmp('menu_jianshi').setWidth(110);
    		Ext.getCmp('menu_jianshi').setStyle('background: url(images/i_button04.png); background-size:100% 100%; ');
    		//选择 五
    		Ext.getCmp('menu_xunshi').setBaseCls('home-button-az-one');
    		Ext.getCmp('menu_xunshi').setHeight(110);
    		Ext.getCmp('menu_xunshi').setWidth(110);
    		Ext.getCmp('menu_xunshi').setStyle('background: url(images/i_button05.png); background-size:100% 100%; ');
    		//选择 六
    		Ext.getCmp('img_2').setHeight(110);
    		Ext.getCmp('img_2').setWidth(110);
    		//选择 七
    		Ext.getCmp('img_3').setHeight(110);
    		Ext.getCmp('img_3').setWidth(110);
    		//选择 八
    		Ext.getCmp('menu_anzhuang').setBaseCls('home-button-az-two');
    		Ext.getCmp('menu_anzhuang').setHeight(110);
    		Ext.getCmp('menu_anzhuang').setWidth(110);
    		Ext.getCmp('menu_anzhuang').setStyle('background: url(images/i_button08.png); background-size:100% 100%; ');
    		//选择 九
    		Ext.getCmp('menu_ditu').setBaseCls('home-button-az-one');
    		Ext.getCmp('menu_ditu').setHeight(110);
    		Ext.getCmp('menu_ditu').setWidth(110);
    		Ext.getCmp('menu_ditu').setStyle('background: url(images/i_button09.png); background-size:100% 100%; ');
    		//底部
    		Ext.getCmp('MainMenu_container2').setHeight(70);
    		Ext.getCmp('MainMenu_container2').setStyle('background: url(images/i_bottom_bg01.png); background-size:100% 100%; ');
    		//底部2
    		Ext.getCmp('MainMenu_image2').setMargin('53 0 0 0 ');
    		Ext.getCmp('MainMenu_image2').setWidth('100%');
    		Ext.getCmp('MainMenu_image2').setStyle('background-size:80% 100%;');
    		//右下角
    		Ext.getCmp('shezhi').setWidth(70);
    		Ext.getCmp('shezhi').setHeight(70);
    		Ext.getCmp('shezhi').setStyle('background:url(images/i_set01.png);background-size:100% 100%;');
    		
    		//九宫格字体大小控制
    		Ext.getCmp('menu_jianjie').setText('<span class="home-button-label-eng2">Company Profile</span><br><span class="home-button-label-eng2">关于日立电梯</span>');
    		Ext.getCmp('menu_baobiao').setText('<span class="home-button-label-eng2">Visual Reports</span><br><span class="home-button-label-eng2">可视化报表</span>');
    		Ext.getCmp('menu_jianshi').setText('<span class="home-button-label-eng2">Monitoring</span><br><span class="home-button-label-eng2">遥监</span>');
    		Ext.getCmp('menu_xunshi').setText('<span class="home-button-label-eng2">Inspection</span><br><span class="home-button-label-eng2">巡查</span>');
    		Ext.getCmp('menu_anzhuang').setText('<span class="home-button-label-eng2">Installation Management</span><br><span class="home-button-label-eng2">安装管理</span>');
    		Ext.getCmp('menu_ditu').setText('<span class="home-button-label-eng2">GPS Tracking</span><br><span class="home-button-label-eng2">产品地图</span>');
    	};
    }


});

 