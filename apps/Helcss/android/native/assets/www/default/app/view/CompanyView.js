
/* JavaScript content from app/view/CompanyView.js in folder common */
Ext.define('Helcss.view.CompanyView', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
        'Ext.Img'
    ],

    config: {
        id: 'CompanyView',
        itemId: 'companyview',
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id:'CompanyView_toolbar',
                docked: 'top',
                title: '<b>关于日立</b>',
                items: [
                    {
                        xtype: 'button',
                        handler: function(button, e) {
                        	var main = Ext.getCmp('mainmenu');
                    		if(!main){
                    			main = Ext.create('Helcss.view.MainMenu');
                    		}
                    		Ext.Viewport.setActiveItem(main);
                    	},
                        id: 'ProfileBack',
                        itemId: 'profileback',
                        ui: 'back',
                        text: '首页'
                    }
                ]
            },
            {
                xtype: 'panel',
                scrollable: 'vertical',
                flex: 1,
                id: 'html_frame',
                html: '<div class="a-main">   <div class="a-con"> 	<div class="a-logo"><img src="aboutus_images/aboutUs_logo.png" width="222" height="111"  alt=""/></div>     <div class="a-title">     	<span>公司介绍</span>         <div class="a-title-line"></div>         <div class="a-title-eng">         <span>Company</span><br><span>Profile</span>         </div>     </div>     <div class="a-introduce01"> 		<h1>1个总部</h1> 		<div><img src="aboutus_images/aboutUs_01.png" width="225" height="377"  alt=""/><div>广州中信广场</div></div> 		<p>日立电梯（中国）有限公司成立于1996年，总部设在广州。通过集团化管理，整合资源，优化研发及制造网络，日立电梯拓展遍布全国的营销及服务网络，致力于为中国提供安全、舒适、便捷的楼宇交通解决方案。</p>     </div>     <div class="a-introduce02"> 		<h1>5+1研发体系</h1> 		<p>日立电梯（中国）有限公司充分整合了亚洲研发中心、上海研发中心、扶梯研发中心、日立电梯电机、日滨科技，以及日本水户研发中心六个研发机构的资源，形成5+1研发网络体系，共同开发具有自主知识产权的高端电扶梯产品技术，实现资源共享最大化。</p>         <ul>         	<li style="left:0px; top:50px;"><img src="aboutus_images/aboutUs_09.png" width="306" height="291"  alt=""/></li>         	<li style="right:0px; top:0px;"><img src="aboutus_images/aboutUs_10.png" width="293" height="335"  alt=""/></li>         	<li style="left:0px; top:380px;"><img src="aboutus_images/aboutUs_13.png" width="381" height="338"  alt=""/></li>         	<li style="right:0px; top:290px;"><img src="aboutus_images/aboutUs_12.png" width="268" height="403"  alt=""/></li>         	<li style="left:0px; top:700px;"><img src="aboutus_images/aboutUs_11.png" width="349" height="449"  alt=""/></li>         	<li style="right:0px; top:700px;"><img src="aboutus_images/aboutUs_14.png" width="348" height="334"  alt=""/></li>         </ul>    	</div>     <div class="a-introduce03"> 		<h1>5+2网络制造基地</h1> 		<p>日立电梯（中国）有限公司拥有5家整梯制造基地以及2家主机、控制系统等核心部件的制造基地。通过行业领先的信息资源平台，不断完善采购供应链，整合精益制造模式，构建覆盖全国的高效环保物流网络，集规模化、信息化、智能化管理于一体，为顾客提供先进、优质、可靠的产品及服务。</p>         <ul>         	<li><img src="aboutus_images/aboutUs_02.png" width="220" height="140"  alt=""/><samp>日立电梯(广州大石)</samp></li>         	<li><img src="aboutus_images/aboutUs_03.png" width="220" height="140"  alt=""/><samp>日立电梯(上海)</samp></li>         	<li><img src="aboutus_images/aboutUs_04.png" width="220" height="140"  alt=""/><samp>日立电梯(天津)</samp></li>         	<li><img src="aboutus_images/aboutUs_05.png" width="220" height="140"  alt=""/><samp>日立电梯(成都)</samp></li>         	<li><img src="aboutus_images/aboutUs_06.png" width="220" height="140"  alt=""/><samp>日立电梯(广州科学城)</samp></li>         	<li><img src="aboutus_images/aboutUs_07.png" width="220" height="140"  alt=""/><samp>日立电梯电机(广州科学城)</samp></li>         	<li><img src="aboutus_images/aboutUs_08.png" width="220" height="140"  alt=""/><samp>日滨科技(广州科学城)</samp></li>         </ul>     </div>   <div class="a-bottom"><img src="aboutus_images/aboutUs_logo2.png" width="389" height="75"  alt=""/></div>   <div class="clear"></div>   </div> </div>',
            }
        ]
    },
    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('CompanyView_toolbar').setStyle('font-size:12pt');
    		
    		var html='<div class="a-main-az">'+
    					'<div class="a-con">'+
    						'<div class="a-logo">'+
    							'<img src="aboutus_images/aboutUs_logo.png" width="30%;" height="5%;"  alt=""/>'+
    						'</div>'+
    						'<div class="a-title">'+
    							'<span>公司介绍</span>'+
    							'<div class="a-title-line"></div>'+
    							'<div class="a-title-eng"> '+
    								'<span>Company</span>'+
    								'<br>'+
    								'<span>Profile</span>'+
    							'</div>'+
    						'</div> '+
    						'<div class="a-introduce01-az">'+
    							'<h1>1个总部</h1>'+
    							/*'<div>'+
    								'<img src="aboutus_images/aboutUs_01.png" width="100%" height="377"  alt=""/>'+
    								'<div>广州中信广场</div>'+
    							'</div>'+*/
    							'<p>日立电梯（中国）有限公司成立于1996年，总部设在广州。通过集团化管理，整合资源，优化研发及制造网络，日立电梯拓展遍布全国的营销及服务网络，致力于为中国提供安全、舒适、便捷的楼宇交通解决方案。</p>'+
    						'</div> '+
    						'<div class="a-introduce02-az">'+
    							'<h1>5+1研发体系</h1>'+
    							'<p>日立电梯（中国）有限公司充分整合了亚洲研发中心、上海研发中心、扶梯研发中心、日立电梯电机、日滨科技，以及日本水户研发中心六个研发机构的资源，形成5+1研发网络体系，共同开发具有自主知识产权的高端电扶梯产品技术，实现资源共享最大化。</p>'+
    							/*'<ul>'+
    								'<li style="left:0px; top:10px;">'+
    									'<img src="aboutus_images/aboutUs_09.png" width="90%px" height="350px"  alt=""/>'+
    								'</li>'+
    								'<li style="right:0px; top:340px;">'+
    									'<img src="aboutus_images/aboutUs_10.png" width="90%px" height="350px"  alt=""/>'+
    								'</li>'+
    								'<li style="left:0px; top:700px;">'+
    									'<img src="aboutus_images/aboutUs_13.png" width="90%px" height="350px"  alt=""/>'+
    								'</li>'+
    								'<li style="right:0px; top:1000px;">'+
    									'<img src="aboutus_images/aboutUs_12.png" width="90%px" height="350px"  alt=""/>'+
    								'</li> '+
    								'<li style="left:0px; top:1680px;">'+
    									'<img src="aboutus_images/aboutUs_11.png" width="90%px" height="350px"  alt=""/>'+
    								'</li>'+
    								'<li style="right:0px; top:1350px;">'+
    									'<img src="aboutus_images/aboutUs_14.png" width="90%px" height="350px"  alt=""/>'+
    								'</li>'+
    							'</ul> '+*/
    						'</div>'+
    						'<div class="a-introduce03">'+
    							'<h1>5+2网络制造基地</h1>'+
    							'<p>日立电梯（中国）有限公司充分整合了亚洲研发中心、上海研发中心、扶梯研发中心、日立电梯电机、日滨科技，以及日本水户研发中心六个研发机构的资源，形成5+1研发网络体系，共同开发具有自主知识产权的高端电扶梯产品技术，实现资源共享最大化。</p>'+
    							/*'<ul>'+
    								'<li>'+
    									'<img src="aboutus_images/aboutUs_02.png" width="220" height="140"  alt=""/>'+
    									'<samp>日立电梯(广州大石)</samp>'+
    								'</li>'+
    								'<li>'+
    									'<img src="aboutus_images/aboutUs_03.png" width="220" height="140"  alt=""/>'+
    									'<samp>日立电梯(上海)</samp>'+
    								'</li>'+
    								'<li>'+
										'<img src="aboutus_images/aboutUs_04.png" width="220" height="140"  alt=""/>'+
										'<samp>日立电梯(天津)</samp>'+
									'</li>'+
									'<li>'+
										'<img src="aboutus_images/aboutUs_05.png" width="220" height="140"  alt=""/>'+
										'<samp>日立电梯(成都)</samp>'+
									'</li>'+
									'<li>'+
										'<img src="aboutus_images/aboutUs_06.png" width="220" height="140"  alt=""/>'+
										'<samp>日立电梯(广州科学城)</samp>'+
									'</li>'+
									'<li>'+
										'<img src="aboutus_images/aboutUs_07.png" width="220" height="140"  alt=""/>'+
										'<samp>日立电梯电机(广州科学城)</samp>'+
									'</li>'+
									'<li>'+
										'<img src="aboutus_images/aboutUs_08.png" width="220" height="140"  alt=""/>'+
										'<samp>日滨科技(广州科学城)</samp>'+
									'</li>'+
								'</ul>'+*/		
							'</div>'+
							'<div class="a-bottom2">'+
								'<img src="images/177-1155.jpg" width="100%" height="100%"  alt=""/>'+
								'<div>广州中信广场</div>'+
							'</div>'+
							'<div class="a-bottom2">'+
								'<img src="aboutus_images/aboutUs_logo2.png" width="100%" height="75"  alt=""/>'+
							'</div>'+
							'<div class="clear"></div>'+
		    			'</div>  '+
    				'</div>';
    		Ext.getCmp('html_frame').setHtml(html);
    	};
    },
    
});

//Ext.define('Helcss.view.CompanyView', {
//    extend: 'Ext.Panel',
//
//    config: {
//        style: 'background-color:#fff;',
//        items: [
//            {
//                xtype: 'toolbar',
//                docked: 'top',
//                title: '<b style="font-size:18pt;">公司简介</b>',
//                //style: 'padding-top:15pt; height:60pt',
//                items: [
//                    {
//                        xtype: 'button',
//                        itemId: 'mybutton', 
//                        ui: 'back',
//                        text: '<div style="font-size:18pt;">首页</div>'
//                    }
//                ]
//            },
//            {
//                xtype: 'image',
//                height: 300,
//                width: '100%',
//                src: 'images/CITIC.jpg'
//            },
//            {
//                xtype: 'container',
//                height: '100%',
//                margin: '36 auto 0 auto',
//                width: '96%',
//                style: 'font-size:18px;line-height:36px;text-indent:36px;',
//                html: '<p>日立电梯（中国）有限公司成立于1996年，总部设在广州。日立电梯（中国）有限公司作为日立集团海外最大的电梯事业基地，多年来一直致力于各类电梯、扶梯、自动人行道、建筑智能化系统的研发、制造、安装、维修、保养、进口贸易服务，综合实力多年稳居国内行业三甲之列，跻身中国外商投资企业500强。</p><p>日立电梯（中国）有限公司目前已形成“一个总部、5+1全球研发体系、5+2网络制造基地、超过70个营分公司遍布全国”的战略格局，成为“网络研发、网络制造、网络营销服务”三位一体的集团化管控企业。</p>'
//            }
//        ],
//        listeners: [
//                    {
//                        fn: 'onMybuttonTap',
//                        event: 'tap',
//                        delegate: '#mybutton'
//                    }
//                ]
//            },
//
//        onMybuttonTap: function(button, e, eOpts) {
//        	var main = Ext.getCmp('mainmenu');
//    		if(!main){
//    			main = Ext.create('Helcss.view.MainMenu');
//    		}
//    		Ext.Viewport.setActiveItem(main);
//        } 
//
//});