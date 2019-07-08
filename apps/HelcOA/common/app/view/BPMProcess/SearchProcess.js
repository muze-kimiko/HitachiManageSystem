Ext.define('HelcOA.view.BPMProcess.SearchProcess', {
    extend: 'Ext.Panel',
    id: 'SearchProcess_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'BPM流程查询',
                items: [
                        {
                        	xtype: 'button',
                            iconCls: 'home',
                            id: 'returnHome_ID'
                        }
                    ]
            },
            {
                xtype: 'tabpanel',
                id: 'sp_tab',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        title: '查询条件',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '查询条件',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'sp_fenlei',
                                                label: '分类',
                                                labelWidth: '40%',
                                                options: [
                                                          {
                                                              text: '请选择',
                                                              value: ''
                                                          }
                                                      ]
                                            },
                                            {
                                            	xtype: 'selectfield',
                                            	id: 'sp_proc_name',
                                            	label: '流程',
                                            	labelWidth: '40%',
                                            	options: [
                                            	          {
                                            	        	  text: '请选择',
                                            	        	  value: ''
                                            	          }
                                            	      ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'sp_subject',
                                                label: '标题',
                                                labelWidth: '40%',
                                                placeHolder: '请输入标题'
                                            },
                                            {
                                            	xtype: 'textfield',
                                            	id: 'sp_billno',
                                            	label: '单号',
                                            	labelWidth: '40%',
                                            	placeHolder: '请输入单号'
                                            },
                                            {
                                            	xtype: 'textfield',
                                            	id: 'sp_df_man',
                                            	label: '起草人',
                                            	labelWidth: '40%',
                                            	placeHolder: '请输入起草人'
                                            },
                                            {
                                                xtype: 'button',
                                                id:'search_ERP_info',
                                                margin: '15 auto',
                                                width: '90%',
                                                text: '查询'
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'sp_cont',
                        title: '流程列表',
                        height: '100%',
                        items: [
                            {
                                xtype: 'panel',
                                height: '100%',
                                layout: 'vbox',
                                items: [
                                    {
                                    	xtype: 'list',
                                    	id: 'SearchProcess_list',
                                        flex: 1,
                                        itemTpl: [
						                    '<table border=0 width=100% style="color:#666">',
											'    <tr height=20>',
											'        <td width=70%>',
											'            <span style="color:#000;font-size:18px;">{subject}&nbsp&nbsp</span>',
											'            <span style="color:#666;font-size:15px;">({billno}):{unit_price}</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'	     <td width=70%>',
											'            <span style="color:#666;font-size:15px;">流程状态:{flag}</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'	     <td width=70%>',
											'            <span style="color:#666;font-size:15px;">当前状态:{activity_name}</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'	     <td width=70%>',
											'            <span style="color:#666;font-size:15px;">处理人:{hd_man}&nbsp&nbsp&nbsp</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'	     <td width=70%>',
											'            <span style="color:#666;font-size:15px;">起草人:{df_man}</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'		 <td width=70%>',
											'            <span class="i_Button_List_right" style="color:#666;font-size:15px;">{arr_time}</span>',
											'        </td>',
						                    '    </tr>',
											'</table>'
                                        ],
                                        onItemDisclosure: true,
                                        store:'BPMProcessStore',
                                    },
                                    {
                                        xtype: 'toolbar',
                                        docked: 'bottom',
                                        items: [
                                            {
                                                xtype: 'spacer'
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'BPMP_arrow_up',
                                                iconCls: 'arrow_left',
                                                text: ''
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'BPMP_page',
                                                disabled: true,
                                                text: '0/0'
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'BPMP_arrow_down',
                                                iconCls: 'arrow_right',
                                                text: ''
                                            },
                                            {
                                                xtype: 'spacer'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    }

});