
/* JavaScript content from app/view/New_Home2016.js in folder common */
Ext.define('HelcPDA.view.New_Home2016', {
    extend: 'Ext.Container',
    id:'New_Home2016',
    requires: [
        'Ext.Spacer',
        'Ext.Button',
        'Ext.tab.Panel',
        'Ext.carousel.Carousel',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.tab.Bar',
        'Ext.form.Panel'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '日立电梯工程移动办公',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'btn_message',
                        cls: 'home_chat',
//                        badgeText: '9',
                        iconCls: 'chat'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                flex: 1,
                cls: 'home_tab',
                items: [
                    {
                        xtype: 'container',
                        title: '首页',
                        iconCls: 'home',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'carousel',
                                id: 'news_carousel',
                                height: 80,
                                padding: 5,
                                items: [{}],
                            },
                            {
                                xtype: 'tabpanel',
                                id:'New_Home2016_Tabpanel',
                                flex: 1,
                                cls: 'func_tab',
                                items: [
                                    {
                                        xtype: 'container',
                                        id:'New_Home2016_Tabpanel_GZ',
                                        title: '故障',
                                        layout: 'vbox',
                                        items: [
											{
												xtype:'hiddenfield',
												id:'D_WBRY_PERSON_ID',
											},
                                            {
                                                xtype: 'list',
                                                id:'L_FaultHandling2016',
                                                store:'FaultHandlingStore2016',
                                                
//                                                allowDeselect:true,
//                                                mode:'MULTI',
                                                
                                                flex: 1,
                                                onItemDisclosure: true,
                                                itemTpl: [
													'<table border=0 width=100%>',
													'    <tr height=24>',
													'        <td colspan=3>',
													'            <span style="font-size:15px;">{SR_NUMBER}  {FAULT_DOMAIN}</span>',
													'        </td>',
													
													'    </tr>',
													'    <tr height=24>',
													'        <td colspan=2>{ABSTRACT}</td>',
													'        <td align=right style="color:#ff0000;">&nbsp{BOX_UP}  </td>',
													'    </tr>',
													'    <tr height=24>',
													'        <td width=50% style="color:#666;">{START_TIME}</td>',
													'        <td >{ASSIGN_PERSON_ID}</td>',
													'       <td align=right style="color:#ff0000;font-size:10px;">',
													'            {ISACTIVE}',
													'        </td>',
													'    </tr>',
													'    <tr height=24>',
													'        <td width=50%>',
													'            处理情况<span style="margin-left:5px;background:green;color:white;border:green 2px solid;">{STATUS}</span>',
													'        </td>',
													'        <td colspan=2>',
													'            {AUDITING_STATUS} ',
													'        </td>',
													'    </tr>',
													' </th>',
													'</table>'	
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        title: '保养',
                                        layout: 'vbox',
                                        items: [
											{
												//用于存放 MP_ID
												xtype:'hiddenfield',
												id:'hidden2MP_ID',
												value:''
											},
                                            {
                                                xtype: 'list',
                                                id:'L_MaintainPlanListHome2016',
                                                store:'MaintainPlanListHome',
                                                flex: 1,
                                                onItemDisclosure: true,
                                                itemTpl: [
													'<table border=0 width=100%>',
													'    <tr height=24>',
													'        <td colspan=2>',
													'            <span style="font-size:20px;">{PLAN_START_DT}</span>',
													'            <span style="margin-left:4px;">{ASSET_NUM}</span>',
													'            <input type="hidden" name="MP_IDname" value="{MP_ID}"> ',
													'        </td>',
													'    </tr>',
													'    <tr height=24>',
													'        <td width=50%>{DOMAIN_NAME}</td>',
													'        <td align=right></td>',
													'    </tr>',
													'    <tr height=24>',
													'        <td width=50%>{PLAN_EMP_IDS}</td>',
													'        <td align=right>{TASK_NAME}</td>',
													'    <tr height=24>',
													'        <td colspan=2>',
													 '           <span  class="{BYCSS}">{PLAN_STATUS}</span>',
													 '           <span  style="float:right;color:red">{ISACTIVE}</span>',
													'        </td>',
													'    </tr>',
													
													'</table>',
													'',
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        title: '故障报告书',
                                        layout: 'vbox',
                                        items: [
                                            {
                                                xtype: 'list',
                                                flex: 1,
                                                id:'L_FaultHandlingReport2016',
                                                store:'FaultHandlingReportStore2016',
                                                itemTpl: [
													'<table border=0 width=100%>',
													'    <tr height=24>',
													'        <td colspan=3>',
													'            <span style="font-size:15px;">{SR_NUMBER}  {FAULT_DOMAIN}</span>',
													'        </td>',
													
													'    </tr>',
													'    <tr height=24>',
													'        <td colspan=2>{ABSTRACT}</td>',
													'        <td align=right style="color:#ff0000;">&nbsp{BOX_UP}  </td>',
													'    </tr>',
													'    <tr height=24>',
													'        <td width=50% style="color:#666;">{START_TIME}</td>',
													'        <td >{PERSON_NAME}</td>',
													'       <td align=right style="color:#ff0000;font-size:10px;">',
													'            {ISACTIVE}',
													'        </td>',
													'    </tr>',
													' </th>',
													'</table>'
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                tabBar: {
                                    docked: 'top',
                                    minHeight: '2.7em'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '业绩',
                        iconCls: 'compose',
                        layout: 'vbox',
                        scrollable: false,
                        items: [
                            {
                                xtype: 'list',
                                id:'L_achievement',
                                flex: 1,
//                                data: [
//                                    {
//                                        name: '保养计划',
//                                        id: 'baoyangjihua',
//                                        icon: '\\',
//                                        color: '#00C716'
//                                    },
//                                    {
//                                        name: '急修处理',
//                                        id: 'jixiuchuli',
//                                        icon: '!',
//                                        color: '#FC3E39'
//                                    },
//                                    {
//                                        name: '安装功能',
//                                        id: 'anzhuanggongneng',
//                                        icon: 'x',
//                                        color: '#3278FF'
//                                    },
//                                    {
//                                        name: '移动遥监',
//                                        id: 'yidongyaojian',
//                                        icon: 'E',
//                                        color: '#FFE25A'
//                                    },
//                                    {
//                                        name: '位置信息',
//                                        id: 'weizhixinxi',
//                                        icon: '@',
//                                        color: '#5F9BE6'
//                                    },
//                                    
//                                ],
                                disableSelection: true,
                                itemTpl: [
                                    '<div class=\'achievement_list_icon\' style=\'color:{color}\'>{icon}</div>',
                                    '<div>{name}</div>'
                                ],
                                onItemDisclosure: true
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '专项',
                        iconCls: 'favorites',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'dataview',
                                id:'dv_special',
                                flex: 1,
                                cls: 'special_dataview',
//                                data: [
//                                    {
//                                        name: '待提交数据',
//                                        icon: 'c',
//                                        color: 'green',
//                                        num: '>9'
//                                    },
//                                    {
//                                        name: '统计报表',
//                                        icon: 'Z',
//                                        color: '#CBC811',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '品证整改',
//                                        icon: 'x',
//                                        color: '#FF6666',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '专项保障',
//                                        icon: 'S',
//                                        color: '#FFA54B',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '合同信息',
//                                        icon: 'F',
//                                        color: '#62BB47',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '保养抽查',
//                                        icon: 'l',
//                                        color: '#9669DC',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '公司通讯录',
//                                        icon: 'N',
//                                        color: '#5F9BE6',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '安装查询',
//                                        icon: 's',
//                                        color: '#FA82A5',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '配件信息',
//                                        icon: 'X',
//                                        color: '#FFA54B',
//                                        num: ''
//                                    },
//                                    {
//                                        name: '手机号码',
//                                        icon: 'q',
//                                        color: '#9669DC',
//                                        num: ''
//                                    },
//                                    
//                                ],
                                scrollable: false,
                                disableSelection: true,
                                inline: true,
                                itemTpl: [
                                    '<tpl if="num!=\'\'">',
                                    '<span id="{id}" class="DV_badge">{num}</span>',
                                    '</tpl>',
                                    '<div class="special_icon" style="color:{color}">{icon}</div>',
                                    '<div class="special_text">{name}</div>'
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '关于',
                        iconCls: 'info',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'container',
                                height: 137,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'list',
                                        id:'L_about',
                                        scrollable: false,
                                        flex: 1,
                                        data: [
                                            {
                                                name: '帮助',
                                                id: 'help'
                                            },
                                            {
                                                name: '修改密码',
                                                id: 'changePWD'
                                            },
                                            {
                                                name: '关于PDA',
                                                id: 'about'
                                            },
                                            
                                        ],
                                        height: 138,
                                        disableSelection: true,
                                        itemTpl: [
                                            '<div>{name}</div>'
                                        ],
                                        onItemDisclosure: true
                                    }
                                ]
                            },
                            {
                                xtype: 'formpanel',
                                flex: 1,
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'button',
                                        id:'btn_Exit',
                                        cls: 'exit_button',
                                        margin: '25 15 0 15',
                                        text: '退出'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                tabBar: {
                    docked: 'bottom'
                }
            }
        ]
    }

});