
/* JavaScript content from app/view/map/MapMainView.js in folder common */
Ext.define('HelcPDA.view.map.MapMainView', {
    extend: 'Ext.Panel',
    id:'mapMainView',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '位置信息',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'mapBack'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        cls: 'l_icon_box',
                        items: [
                            {
                                xtype: 'button',
                                text:'',
                                id:'around_people',
                                cls: [
                                    'l_icon_button',
                                    'l_icon_button_bg01',
                                    'l_icon_button_current'
                                ],
                                pressedCls: 'x-button-pressing l_icon_button_click'
                            },
                            {
                                xtype: 'button',
                                text:'',
                                id:'low_Employee',
                                cls: [
                                    'l_icon_button',
                                    'l_icon_button_bg02'
                                ],
                                pressedCls: 'x-button-pressing l_icon_button_click'
                            },
                            {
                                xtype: 'button',
                                text:'',
                                id:'time_search',
                                cls: [
                                    'l_icon_button',
                                    'l_icon_button_bg03'
                                ],
                                pressedCls: 'x-button-pressing l_icon_button_click'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        bottom: 120,
                        id:'My_location',
                        text:'',
                        cls: [
                            'l_icon_button',
                            'l_icon_button_bg04'
                        ],
                        left: 15,
                        pressedCls: 'x-button-pressing l_icon_button_click'
                    },
                    	{
                    		xtype: 'dataview',
                            id: 'map_listV',
                            width:"100%",
                        	height:80,
                        	bottom:0,
                            scrollable: 'horizontal',
                            store :'MapAroundEmpStore1',
                            data:[
                                  ],
                            itemTpl : ['<div class="l_list_box">',
                            '	<div>{USERID}</div>',
                            '	<div>{USERNAME}</div>',
                            '</div>'
                            ],
                            cls: 'dataview-horizontal',
                            style: "background: #eee",
                            selectedCls : 'seldataviewcss',
                            inline: {
                                wrap: false
                            }
                    }
                    ,
                    {
                    	xtype : 'panel',
                    	id : 'mapbar',
                    	flex : 9,
                    	html : '<div id="baimap" style="width:100%;height:860px;background:#ccc;border-bottom: #aaa solid 1px;"></div>'
                    },
                    {
                    	xtype:'hiddenfield',
                    	id:'PERSON_ID',
                    	value:''
                    },
                    {
                    	xtype:'hiddenfield',
                    	id:'PERSON_NAME',
                    	value:''
                    }
                    
                ]
            }
        ]
    }

});