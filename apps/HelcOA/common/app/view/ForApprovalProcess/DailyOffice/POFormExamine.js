Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.POFormExamine', {
    extend: 'Ext.Panel',
    id: 'sp_POFormExamine_id',
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
                id: 'surface_ID',
                title: 'EPR-采购订单',
                items: [
                        {
                        	xtype: 'button',
                            iconCls: 'home',
                            id: 'returnHome_ID'
                        },
                        {
                            xtype: 'spacer'
                        },
                        {
                            xtype: 'button',
                            id: 'idea_ID',
                            text: '下一步'
                        }
                    ]
            },
            {
                xtype: 'tabpanel',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        title: '订单头',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                id: 'fp',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '采购订单头信息',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'emp_no',
                                                label: '员工编号',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'po_header_id',
                                                label: '订单头',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'po_number',
                                                label: '订单号',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id: 'vendor_name',
                                                label: '供应商',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'vendor_site_code',
                                                label: '供应商地点',
                                                labelWidth: '40%',
                                                required: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'sent_time',
                                                label: '发送日期',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'amount',
                                                label: 'PO金额',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'create_by',
                                                label: '编制人',
                                                labelWidth: '40%'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '订单行',
                        height: '100%',
                        items: [
                            {
                                xtype: 'panel',
                                height: '100%',
                                layout: 'vbox',
                                items: [
                                    {
                                    	xtype: 'list',
                                        flex: 1,
                                        itemTpl: [
						                    '<table border=0 width=100% style="color:#666">',
											'    <tr height=20>',
											'        <td width=70%>',
											'            <span style="color:#000;font-size:18px;">{item_number}&nbsp&nbsp</span>',
											'            <span style="color:#666;font-size:15px;">单价({unit_meas_lookup_code}):{unit_price}</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'	     <td width=70%>',
											'            <span style="color:#666;font-size:15px;">{item_description}</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'	     <td width=70%>',
											'            <span style="color:#666;font-size:15px;">数量:{quantity}&nbsp&nbsp&nbsp</span>',
											'            <span style="color:#666;font-size:15px;">总额:{line_amount}</span>',
											'        </td>',
											'    </tr>',
											'    <tr height=18>',
											'		 <td width=70%>',
											'            <span class="i_Button_List_right" style="color:#666;font-size:15px;">{need_by_date}</span>',
											'        </td>',
						                    '    </tr>',
											'</table>'
                                        ],
                                        onItemDisclosure: false,
                                        store:'POFormStore',
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
                                                id: 'PO_arrow_up',
                                                iconCls: 'arrow_left',
                                                text: ''
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'PO_page',
                                                disabled: true,
                                                text: '0/0'
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'PO_arrow_down',
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
            {
                xtype: 'fieldset',
                hidden: true,
                items: [
                    {
                        xtype: 'textfield',
                        id: 'conds',
                        name: 'conds'
                    },
                    {
                        xtype: 'textfield',
                        id: 'userid',
                        name: 'userid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'type',
                        name: 'type'
                    },
                    {
                        xtype: 'textfield',
                        id: 'username',
                        name: 'username'
                    },
                    {
                        xtype: 'textfield',
                        id: 'node',
                        name: 'node'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'dept',
                    	name: 'dept'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'fileno',
                    	name: 'fileno'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'subject',
                    	name: 'subject'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'agentman',
                    	name: 'agentman'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'createdate',
                    	name: 'createdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'ctime',
                        name: 'ctime'
                    },
                    {
                        xtype: 'textfield',
                        id: 'piid',
                        name: 'piid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'processname',
                        name: 'processname'
                    },
                    {
                        xtype: 'textfield',
                        id: 'curauthor',
                        name: 'curauthor'
                    },
                    {
                        xtype: 'textfield',
                        id: 'dealmen',
                        name: 'dealmen'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'needzc',
                    	name: 'needzc'
                    },
                    {
                        xtype: 'textfield',
                        id: 'ygbh',
                        name: 'ygbh'
                    },
                    {
                        xtype: 'textfield',
                        id: 'form',
                        name: 'form'
                    },
                    {
                        xtype: 'textfield',
                        id: 'arcpath',
                        name: 'arcpath'
                    },
                    {
                        xtype: 'textfield',
                        id: 'arcdate',
                        name: 'arcdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'idea',
                        name: 'idea'
                    },
                    {
                        xtype: 'textfield',
                        id: 'endprocessdate',
                        name: 'endprocessdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'createdate',
                        name: 'createdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'audit_list',
                        name: 'audit_list'
                    },
                    {
                        xtype: 'textfield',
                        id: 'taskid',
                        name: 'taskid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'mast',
                        name: 'mast'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'firflow',
                    	name: 'firflow'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'ext1',
                    	name: 'ext1'
                    }
                ]
            }
        ]
    }

});