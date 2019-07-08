Ext.define('HelcPDA.view.MenusView',{
	id:'MenusView_id',
	extend: 'Ext.tab.Panel',
    //alias: 'widget.tabpanel',
    requires: [
        'Ext.Img',
        'Ext.carousel.Carousel',
        'Ext.Label',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.tab.Bar'
    ],

    config: {
        items: [
            {
                xtype: 'container',
                id: 'M_ZY',
                title: '主页',
                iconCls: 'home',
                style: 'background-color:#f0f0f0;',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: '主页'
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        layout: 'vbox',
                        scrollable: 'vertical',
                        items: [
                            {
                                xtype: 'container',
                                height: 150,
                                style: 'background:#999 url(images/i_banner02.png);background-size:450px 150px;',
                                items: [
                                    {
                                        xtype: 'container',
                                        height: '100%',
                                        style: 'float:left;clear:none;',
                                        width: '23%',
                                        items: [
                                            {
                                                xtype: 'image',
                                                cls: 'i_Banner_Title',
                                                margin: '20 auto 0 auto',
                                                src: 'images/i_banner_title.png'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        height: '100%',
                                        style: 'float:left;clear:none;',
                                        width: '75%',
                                        items: [
                                            {
                                                xtype: 'carousel',
                                                id:'OA_Info',
                                                directionLock: true,
                                                height: 55,
                                                margin: '25 5 0 0',
                                                style: 'float:left',
                                                width: '98%',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        height: '100%',
                                                        style: '',
                                                        width: '100%',
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                cls: 'i_Banner_Con',
                                                                html: '日立移动办公-第三期最新公告消息标题-第三期最新公告消息标题'
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                cls: 'i_Banner_date',
                                                                html: '今天'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        height: '100%',
                                                        style: '',
                                                        width: '100%',
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                cls: 'i_Banner_Con',
                                                                html: '日立移动办公-第三期最新公告消息标题-第三期最新公告消息标题'
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                cls: 'i_Banner_date',
                                                                html: '2014-04-12'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'button',
                                                baseCls: 'i_Banner_more',
                                                height: 16,
                                                style: 'float:left;',
                                                text: '更多>>'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                height: 68,
//                                html: "<div style='display:none' id='BYJH' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg01'>\\</div><div class='i_Button_IconFont'>保养计划</div></div> <div style='display:none' id='JXCL' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg02'>e</div><div class='i_Button_IconFont'>急修处理</div></div> <div style='display:none' id='AZXM' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg03'>b</div><div class='i_Button_IconFont'>安装项目</div></div> <div style='display:none' id='BGLC' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg04'>;</div><div class='i_Button_IconFont'>办公流程</div></div>",
                                html: "<div style='display:none' id='BYJH' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg01'>\\</div><div class='i_Button_IconFont'>保养计划</div></div> <div style='display:none' id='JXCL' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg02'>e</div><div class='i_Button_IconFont'>急修处理</div></div> <div style='display:none' id='AZXM' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg03'>b</div><div class='i_Button_IconFont'>安装项目</div></div> <div style='display:none' id='ZXBZ' class='i_Button_IconBorder'><div class='i_Button_Icon i_Button_Icon_bg04'>;</div><div class='i_Button_IconFont'>专项保障</div></div>",
                                margin: '0 0 10 0',
                                style: 'background-color:#fff;border-bottom: #ddd solid 1px;border-top: #ddd solid 1px;'
                            },
                            {
                                xtype: 'container',
                                cls: 'i_Button_Box',
//                                html: "<ul > 	<li id='DTJSJ' class='i_Button_List'  style='position:relative;'><div class='i_Button_List_Icon' style='color:#62bb47'>c</div><div class='i_Button_List_Title'>待提交数</div><span id='menu_wtd_count' class='t_badge' style='right:34px;top:12px'></span><div class='i_Button_List_Isclosure'>!</div></li> <li id='AZCX' class='i_Button_List'  style='position:relative;'><div class='i_Button_List_Icon' style='color:#62bb47'>c</div><div class='i_Button_List_Title'>安装查询</div><span class='t_badge' style='right:34px;top:12px'></span><div class='i_Button_List_Isclosure'>!</div></li> <li style='display:none' id='TJBB' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#62bb47'>Z</div><div class='i_Button_List_Title'>统计报表</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GZYD' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>!</div><div class='i_Button_List_Title'>故障引导</div><div class='i_Button_List_Isclosure'>!</div></li> </ul>",
                                html: "<ul > " +
                                		"<li id='OALC' style='display:none' class='i_Button_List'  style='position:relative;'><div class='i_Button_List_Icon' style='color:#854107'>O</div><div class='i_Button_List_Title'>OA起草</div><span class='t_badge' style='right:34px;top:12px'></span><div class='i_Button_List_Isclosure'>!</div></li>	" +
                                		"<li id='PZZG' class='i_Button_List'  style='position:relative;'><div class='i_Button_List_Icon' style='color:#ff6666'>h</div><div class='i_Button_List_Title'>品证整改</div><span class='t_badge' style='right:34px;top:12px'></span><div class='i_Button_List_Isclosure'>!</div></li>	" +
                                		"<li id='DTJSJ' class='i_Button_List'  style='position:relative;'><div class='i_Button_List_Icon' style='color:#62bb47'>c</div><div class='i_Button_List_Title'>待提交数</div><span id='menu_wtd_count' class='t_badge' style='right:34px;top:12px'></span><div class='i_Button_List_Isclosure'>!</div></li> " +
                                		"<li id='AZCX' class='i_Button_List'  style='position:relative;'><div class='i_Button_List_Icon' style='color:#62bb47'>c</div><div class='i_Button_List_Title'>安装查询</div><span class='t_badge' style='right:34px;top:12px'></span><div class='i_Button_List_Isclosure'>!</div></li> " +
                                		"<li style='display:none' id='TJBB' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#62bb47'>Z</div><div class='i_Button_List_Title'>统计报表</div><div class='i_Button_List_Isclosure'>!</div></li> 	" +
                                		"<li style='display:none' id='GZYD' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>!</div><div class='i_Button_List_Title'>故障引导</div><div class='i_Button_List_Isclosure'>!</div></li> </ul>",
                                margin: '0 0 10 0'
                            },
                            {
                                xtype: 'container',
                                id: 'XX_container',
                                hidden: true,
                                cls: 'i_Button_Box',
                                html: "<ul> 	<li style='display:none'  id='KHXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#009ddc'>F</div><div class='i_Button_List_Title'>客户信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='HTXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#62bb47'>F</div><div class='i_Button_List_Title'>合同信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='DTXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#f6821f'>F</div><div class='i_Button_List_Title'>电梯信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='JSFY' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style=' color:#e03a3e'>F</div><div class='i_Button_List_Title'>技术附页</div><div class='i_Button_List_Isclosure'>!</div></li> </ul>",
                                margin: '0 0 10 0'
                            },
                            {
                                xtype: 'container',
                                cls: 'i_Button_Box',// <li id='TAZX' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#009ddc'>N</div><div class='i_Button_List_Title' >提案文化在线</div><div class='i_Button_List_Isclosure'>!</div></li>
                                html: "<ul> 	 	<li style='display:none' id='WZXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GHP' class='i_Button_List'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li>		<li id='XZPDA' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#009ddc'>~</div><div class='i_Button_List_Title' >下载PDA2.0</div><div class='i_Button_List_Isclosure'>!</div></li>	</ul>",
                                margin: '0 0 10 0'
                            },
                            {
                                xtype: 'container',
                                cls: 'i_Button_Box',
//                                html: "<ul> 	 	" +
//                                		"<li style='display:none' id='WZXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	" +
//                                		"<li style='display:none' id='GHP' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li> " +
//                                		"</ul>",
//                              html: "<ul><li id='WZXX' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li>  </ul>",
//                              html: "<ul><li style='display:none' id='WZXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GHP' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li> </ul>",
                                html: "<ul><li style='display:none' id='WZXXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >图吧地图</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GHP' class='i_Button_List'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li>		<li id='TAZX' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#009ddc'>N</div><div class='i_Button_List_Title' >提案文化在线</div><div class='i_Button_List_Isclosure'>!</div></li>	</ul>",
                                html: "<ul> " +
                                		"<li style='display:none' id='BYCC' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#62bb47'>!</div><div class='i_Button_List_Title'>保养抽查</div><div class='i_Button_List_Isclosure'>!</div></li> " +
                                		"<li style='display:none' id='CCZG_CC' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#62bb47'>!</div><div class='i_Button_List_Title'>抽查整改</div><div class='i_Button_List_Isclosure'>!</div></li> " +
                                		"</ul>",
                                margin: '0 0 10 0'
                            }, 
//                            {
//                                xtype: 'container',
//                                cls: 'i_Button_Box',
//                                html: "<ul><li id='BDDT' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >百度地图</div><div class='i_Button_List_Isclosure'>!</div></li>  </ul>",
////                              html: "<ul><li style='display:none' id='WZXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GHP' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li> </ul>",
////                              html: "<ul><li id='WZXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GHP' class='i_Button_List'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li>		<li id='TAZX' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#009ddc'>N</div><div class='i_Button_List_Title' >提案文化在线</div><div class='i_Button_List_Isclosure'>!</div></li>	</ul>",
//                                margin: '0 0 10 0'
//                            },
                            {
                                xtype: 'container',
                                cls: 'i_Button_Box',
                                html: "<ul><li id='DTView' style='display:none' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li>  </ul>",
//                              html: "<ul><li style='display:none' id='WZXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GHP' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li> </ul>",
//                              html: "<ul><li id='WZXX' class='i_Button_List'><div class='i_Button_List_Icon' style='color:#fbb726'>@</div><div class='i_Button_List_Title' >位置信息</div><div class='i_Button_List_Isclosure'>!</div></li> 	<li style='display:none' id='GHP' class='i_Button_List'><div class='i_Button_List_Icon' style=' color:#f6821f'>~</div><div class='i_Button_List_Title'>下载GHP应用</div><div class='i_Button_List_Isclosure'>!</div></li>		<li id='TAZX' class='i_Button_List i_Button_List_NoBorder'><div class='i_Button_List_Icon' style='color:#009ddc'>N</div><div class='i_Button_List_Title' >提案文化在线</div><div class='i_Button_List_Isclosure'>!</div></li>	</ul>",
                                margin: '0 0 10 0'
                            },
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'backlog_v',
                title: '待办<span name=sumDB class="t_badge_title"></span>',
                iconCls: 'backlog',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: '待办'
                    },
                    {
                        xtype: 'list',
                        id: 'backlog_list',
                        store: 'BacklogStore',
                        flex: 1,
                        itemTpl: [
                            '<table width="94%" border="0" cellpadding="0" cellspacing="0">',
                            '  <tr style="height:26px;">',
                            '      <td style="width:28px;"><div class="t_badge_Icon" style="color:{color}">{icon}</div></td>',
                            '      <td>{TASK_NAME}<font style="margin-left:10px;font-size:10pt;color:#3d4245">{PLAN_START_DT}</font></td>',
                            '      <td style="width:20px;position:relative;"><span class="t_badge">{COUNT}</span></td>',
                            '  </tr>',
                            '</table>'
                        ],
                        onItemDisclosure: true
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'M_XX',
                title: '消息<span id="sumxxx" class="t_badge_title"></span>',
                iconCls: 'news',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: '消息'
                    },
                    {
                        xtype: 'list',
                        id: 'msglistt',
                        flex: 1,
                        store: 'MessageStore',
                        itemTpl: [
                            '<table width="94%" border="0" cellpadding="0" cellspacing="0">',
                            '  <tr>',
                            '    <td width="10%"><span class="i_Button_List_Icon" style="color:{COLOR}">w</span></td>',
                            '    <td width="40%"><font style="font-size:10pt;color:#3d4245">{MSGTITLE}</font></td>',
                            '    <td width="50%" style="text-align:right"><font style="font-size:10pt;color:#3d4245">{TIME}</font></td>',
                            '  </tr>',
                            '</table>'
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'M_CX',
                title: '查询',
                iconCls: 'search',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: '查询'
                    },
                    {
                        xtype: 'list',
                        flex: 1,
                        id:'informationList_id',
                        title: '查询',
                        cls: 'q_list',
                        itemTpl: [
                            '<div class="q_list_box">',
                            '    <div class="q_list_icon"><span style="color:{color}">{icon}</span></div>',
                            '    <div class="q_list_name">{title}</div>',
                            '</div>',
                            ''
                        ]
                    }
                ]
            },
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
                        title: '更多'
                    },
                    {
                        xtype: 'container',
                        cls: 'i_Button_Box',
//                        html: '<ul> 	<li id="about" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#62bb47">i</div><div class="i_Button_List_Title">关于PDA</div><div class="i_Button_List_Isclosure">!</div></li> 	<li id="set" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#fbb726">y</div><div class="i_Button_List_Title">设置</div><div class="i_Button_List_Isclosure">!</div></li> 	<li id="Cpassword" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#f6821f">K</div><div class="i_Button_List_Title">修改密码</div><div class="i_Button_List_Isclosure">!</div></li> 	<li id="help" class="i_Button_List i_Button_List_NoBorder"><div class="i_Button_List_Icon" style=" color:#e03a3e">?</div><div class="i_Button_List_Title">帮助</div><div class="i_Button_List_Isclosure">!</div></li> </ul>',
                        html: '<ul> 	<li id="about" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#62bb47">i</div><div class="i_Button_List_Title">关于PDA</div><div class="i_Button_List_Isclosure">!</div></li>  	<li id="Cpassword" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#f6821f">K</div><div class="i_Button_List_Title">修改密码</div><div class="i_Button_List_Isclosure">!</div></li> 	<li id="help" class="i_Button_List"><div class="i_Button_List_Icon" style=" color:#e03a3e">?</div><div class="i_Button_List_Title">帮助</div><div class="i_Button_List_Isclosure">!</div></li>  <li id="aboutDev" class="i_Button_List i_Button_List_NoBorder"><div class="i_Button_List_Icon" style=" color:#62bb45">i</div><div class="i_Button_List_Title">关于本机</div><div class="i_Button_List_Isclosure">!</div></li></ul>',
//                        html: '<ul> 	<li id="about" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#62bb47">i</div><div class="i_Button_List_Title">关于PDA</div><div class="i_Button_List_Isclosure">!</div></li>  	<li id="Cpassword" class="i_Button_List"><div class="i_Button_List_Icon" style="color:#f6821f">K</div><div class="i_Button_List_Title">修改密码</div><div class="i_Button_List_Isclosure">!</div></li> 	<li id="help" class="i_Button_List"><div class="i_Button_List_Icon" style=" color:#e03a3e">?</div><div class="i_Button_List_Title">帮助</div><div class="i_Button_List_Isclosure">!</div></li> <li id="testqr" class="i_Button_List i_Button_List_NoBorder"><div class="i_Button_List_Icon" style=" color:#e03a3e">u</div><div class="i_Button_List_Title">测试二维码</div><div class="i_Button_List_Isclosure">!</div></li></ul>',
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
                                	  // 取消MQTT订阅
                                	  	 function stopService(){
                                      		cordova.exec(function(res) {
                                      		}, function(err) {
                                      			WL.Toast.show("错误:"+err);
                                      		},"JSMapMain","关闭被动定位",[{USERID:userid,DeviceNo:(device.uuid).toUpperCase()}]); 
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
	             	           	 	}
	                               	 // 取消预订
	                               	if (Ext.os.is.Android) {
	                               		unsubscribeUser(userid);
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
        ],
        tabBar: {
            docked: 'bottom',
            ui: 'light',
            cls: 'icon_color'
        }
    },
    
    refresh_wtd : function() {
    	var selection_find = [{tcode:'UNCOMMIT',status:'1'},{tcode:'UNCOMMIT',status:'4'}];
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			//alert(length);
			if (length > 0) {
				document.getElementById('menu_wtd_count').innerHTML = length;
				document.getElementById('menu_wtd_count').className = 't_badge';
			} else {
				/*document.getElementById('menu_wtd_count').innerHTML = '0';
				document.getElementById('menu_wtd_count').className = 't_badge_non';*/
				document.getElementById('menu_wtd_count').innerHTML = '';
				document.getElementById('menu_wtd_count').className = 't_badge';
			}
		}).fail(function(errorObject){
		});
    },
    
    loadMessage : function() {
    	var selection_find = [{tcode:'SYSTEM_MESSAGE'}];
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			var ucount = 0;
			var items = [];
			for (var i = 0; i < length; i ++) {
				var item = arrayResults2[i].json.stext;
				if (item.ISREAD == 'N') {
					ucount ++;
				}
				items[i] = item;
			}
			var store = Ext.data.StoreManager.get('MessageStore');
			store.setData(items);
			if (ucount > 0) {
				if(Ext.getCmp('modules_dataview_id')){
					for(var i =0;i<Ext.getCmp('modules_dataview_id')._data.length;i++){
						if(Ext.getCmp('modules_dataview_id')._data[i].text=="消息"){
							Ext.getCmp('modules_dataview_id')._store._data.all[i].data.data = ucount;		
						}
					}
					Ext.getCmp('modules_dataview_id').refresh();
					//待办任务显示
					var data = Ext.getCmp('new_Todo_dataview').getData();
					data.push({
						TASK_ID: "message",
						color: "GREEN",
						data: ucount,
						icon: "M",
						text: "消息        "                                                 
					});
					Ext.getCmp('new_Todo_dataview').getStore().setData(data);
					Ext.getCmp('new_Todo_dataview').refresh();
				}else{
					document.getElementById('sumxx').innerHTML = ucount;
				}
			} else {
				if(Ext.getCmp('modules_dataview_id')){
					for(var i =0;i<Ext.getCmp('modules_dataview_id')._data.length;i++){
						if(Ext.getCmp('modules_dataview_id')._data[i].text=="消息"){
							Ext.getCmp('modules_dataview_id')._store._data.all[i].data.data = "none";
						}
					}
					Ext.getCmp('modules_dataview_id').refresh();
					
				}else{
					document.getElementById('sumxx').innerHTML = '';
				}
			}
		}).fail(function(errorObject){
		});
    
    	/*
    	var msgList = Ext.getCmp('');
    	if(msgList != undefined && msgList != null) {
    		var scrmsgList = msgList._scrollable._scroller;
    		scrmsgList.addListener('scrollend',function(obj, x, y, eOpts){
        		if(obj.position.y==obj.maxPosition.y){
        			var Ypos = obj.position.y;
        			Ext.getCmp('ForApprovalProcess_ID')._scrollable._scroller.scrollTo(0, Ypos);
        		}
        	},this,{});
    	}

    	var selection_find = [{tcode:'SYSTEM_MESSAGE'}];
		var options = {exact : false, sort: [{_id: WL.constant.DESCENDING}]};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			var ucount = 0;
			var items = [];
			for (var i = 0; i < length; i ++) {
				var item = arrayResults2[i].json.stext;
				if (item.ISREAD == 'N') {
					ucount ++;
				}
				items[i] = item;
			}
			var store = Ext.data.StoreManager.get('MessageStore');
			store.setData(items);
			store.setGroupField('TIME');
			store.setGroupDir('DESC').sort();
			if (ucount > 0) {
				document.getElementById('sumxx').innerHTML = ucount;
			} else {
				document.getElementById('sumxx').innerHTML = '';
			}
		}).fail(function(errorObject){
		});*/
    },

});

