
/* JavaScript content from app/view/ForApprovalProcess/DailyOffice/Idea/personnelSelection.js in folder common */
/**
 * 人员选择
 */
Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.Idea.personnelSelection', {
	    extend: 'Ext.Panel',
	    id: 'personnelSelection_id',
	    requires: [
	        'Ext.Toolbar',
	        'Ext.Button',
	        'Ext.Spacer',
	        'Ext.field.Text',
	        'Ext.dataview.List',
	        'Ext.XTemplate'
	    ],
	    config: {
	        style: 'background-color:#edebf1',
	        layout: 'vbox',
	        items: [
	            {
	                xtype: 'toolbar',
	                docked: 'top',
	                title: '审批流程-人员选择',
	                items: [
	                    {
	                        xtype: 'button',
	                        id: 'returnApprovaOpinion_ID',
	                        text: '取消',
	                        ui: 'back'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'CompleteChoice_ID',
	                        text: '确认'
	                    }
	                ]
	            },
	            {
	                xtype: 'toolbar',
	                id: 'select_person_TB_SP',
	                docked: 'top',
	                items: [
		                {
		                   xtype: 'textfield',
		                   id: 'inquireCon_ID',
		                   width: '80%',
		                   label: '',
		                   placeHolder: '请输入查询条件'
		                },
		                {
		                   xtype: 'button',
		                   id: 'inquire_ID',
		                   text: '查找'
		                }
		            ]
	            },
	            {
	                xtype: 'list',
	                flex: 1,
	                id: 'Camdodates_ID',
                    store:'personnelSelectionS',
                    itemTpl: [
                              '<table border=0 width=100%>',
                              '    <tr>',
                              '        <td style="width:50px">',
                              '           <div name="p_judge_color3" class="p_judge_box" id="p_judge_color3">3</div>',
                              '        </td>',
                              '        <td>',
                              '            <span style="font-size:20px;">{value}</span>',
                              '        </td>',
                              '    </tr>',
                              '</table>'
                          ]
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'SP_name'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'SP_forkname'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'SP_conds'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'SP_multqty'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'SP_multflag'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'SP_idx'
	            }
	        ]
	    }

	});