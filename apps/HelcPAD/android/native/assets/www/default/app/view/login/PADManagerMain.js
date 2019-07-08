
/* JavaScript content from app/view/login/PADManagerMain.js in folder common */
Ext.define('HelcPAD.view.login.PADManagerMain',{
	extend: 'Ext.Container',
    id:'padManagerMain',
    requires: [
        'Ext.Panel',
        'Ext.Img',
        'Ext.Button',
        'Ext.carousel.Carousel',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],
    config:{
    	cls: 'mainmenu_c',
        layout: 'vbox',
        scrollable: null,
        height: '100%',//另加
        items:[
			{
                xtype: 'carousel',
                flex: 1,
                margin: '0 auto 20 auto',
                activeItem: 1,
                scrollable: null,
                indicator:false,
                //height: '100%',//另加
                items: [
                    {
                        xtype: 'dataview',
                        /*data: [
							{
								text: '待处理商机',
							    icon: '15.png',
							    class: 'active',
							    remindId:'waitForHandlerOppty',
							    reminded:'display:block;',
							    remiondNum:19
							},
                        ],*/
                        scrollable: null,
                        id:'opportunityManager',
                        itemTpl: [
                            '<div  style="position: relative;"><img class=\'mainmenu_c_icon {class}\' src=\'icons/{icon}\'/>',
                                '<div name="{remindId}" class="circle" style="width: 40px; height: 40px; border-radius: 20px;left: 66%; top: 1%;{reminded}">',
                                	'<div style="text-align:center;margin-top:8px;font-weight: bold;color:white;font-size: 1.5em;font-family:Droid Sans Fallback;" id="{remindId}">{remindNum}</div>',
                                '</div>',
                            '</div>',
                            '<div class="mainmenu_c_text {class}">{text}</div>',
                            ''
                        ]
                    },
                    
                ]
            }
        ]
    }
});