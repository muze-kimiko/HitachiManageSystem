
/* JavaScript content from app/view/oa/startTheProcess/DailyOffice/Idea/approvalOpinion.js in folder common */
/**
 * 提交处理-起草
 */
Ext.define('HelcPDA.view.oa.startTheProcess.DailyOffice.Idea.approvalOpinion', {
	extend: 'Ext.Panel',
    extend: 'Ext.Panel',
    id: 'qc_approvalOpinion_ID',
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
                title: '提交处理-起草',
                items: [
                    {
                        xtype: 'button',
                        id: 'qc_returnTravelRequest_ID',
                        text: '返回',
                        ui: 'back'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'qc_submitTravelRequest_ID',
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'list',
                flex: 1,
                id: 'qc_reutingList_ID',
                store:'approvalOpinionS',
                onItemDisclosure: true,
                itemTpl: [
                    '<table border=0 width=100%>',
                    '    <tr>',
                    '        <td style="width:50px">',
                    '			 <div name="groupCheckbox" class="p_judge_box" id="pid">3</div>',
                    '        </td>',
                    '        <td>',
                    '            <span style="font-size:20px;">{name}</span>',
                    '        </td>',
                    '    </tr>',
                    '</table>'
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
                        id: 'personnelList',
                        name: 'personnelList'
		            },{
		            	xtype: 'textfield',
		            	id: 'QC_index',
		            },{
		            	xtype: 'textfield',
		            	id: 'procname',
		            },
		            {
		            	xtype:'hiddenfield',
		            	id:'QC_View_id'
		            }
                ]
            }
        ]
      }

    });