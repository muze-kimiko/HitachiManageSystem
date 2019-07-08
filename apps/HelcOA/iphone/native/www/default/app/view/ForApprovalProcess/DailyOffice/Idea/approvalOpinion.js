
/* JavaScript content from app/view/ForApprovalProcess/DailyOffice/Idea/approvalOpinion.js in folder common */
/**
 * 审批意见
 */
Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.Idea.approvalOpinion', {
	extend: 'Ext.Panel',
    extend: 'Ext.Panel',
    id: 'approvalOpinion_ID',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.field.TextArea'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '提交处理-审批',
                items: [
                    {
                        xtype: 'button',
                        id: 'returnTravelRequest_ID',
                        text: '返回',
                        ui: 'back'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'submitTravelRequest_ID',
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                flex: 1,
                items: [
                        {
                            xtype: 'list',
                            title: '路由选择',
                            id: 'reutingList_ID',
                            store:'approvalOpinionS',
                            onItemDisclosure: true,
                            itemTpl: [
                                '<table border=0 width=100%>',
                                '    <tr>',
                                '        <td style="width:50px">',
                                '			 <div name="groupCheckbox2" class="p_judge_box" id="pid">3</div>',
                                '        </td>',
                                '        <td>',
                                '            <span style="font-size:20px;">{name}</span>',
                                '        </td>',
                                '    </tr>',
                                '</table>'
                            ]
                        },
                        {
                            xtype: 'container',
                            title: '办理意见',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'formpanel',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            items: [
                                                {
                                                    xtype: 'autoTextArea',
                                                    labelWidth: '40%',
                                                    id: 'ideaCon_ID',
                                                    label: '意见',
                                                    placeHolder: '请输入意见内容'
                                                },
                                            ]
                                        },
                                        {
                                        	xtype: 'fieldset',
                                        	title: '常用意见',
                                        	items: [
                                    	        {
                                                    xtype: 'selectfield',
                                                    id: 'select_ideaCon',
                                                    label: '常用意见',
                                                    labelWidth: '40%',
                                                    options: [
                                                              {
                                                            	  text: '请选择...',
                                                            	  value: ''
                                                              },
                                                              {
                                                                  text: '同意',
                                                                  value: '同意'
                                                              },
                                                              {
                                                                  text: '不同意',
                                                                  value: '不同意'
                                                              }
                                                          ]
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
                            id: 'nrxtProcess',
                            name: 'nrxtProcess'
                        },{
                            xtype: 'textfield',
                            id: 'nextacti',
                            name: 'nextacti'
                        },{
                            xtype: 'textfield',
                            id: 'conds',
                            name: 'conds'
                        },{
                            xtype: 'textfield',
                            id: 'LY_index',
                        },
                        {
    		            	xtype:'hiddenfield',
    		            	id:'SP_View_id'
    		            },
    		            {
                        	xtype: 'textfield',
                        	id: 'pbsj',
                        	name: 'pbsj'
                        },
                        {
                        	xtype: 'textfield',
                        	id: 'forkname',
                        	name: 'forkname'
                        },
                    ]
                }
            ]
        }

    });