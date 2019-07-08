/**
 * 人员选择
 */
Ext.define('HelcOA.view.PublicPersonnelSelection', {
	    extend: 'Ext.Panel',
	    id: 'PublicPersonnelSelection_id',
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
	                title: '人员选择',
	                items: [
	                    {
	                        xtype: 'button',
	                        id: 'public_backview',
	                        text: '取消',
	                        ui: 'back'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'public_commitSel',
	                        text: '确认'
	                    }
	                ]
	            },
	            {
	                xtype: 'toolbar',
	                docked: 'top',
	                items: [
	                    {
	                        xtype: 'textfield',
	                        id: 'public_pesonS',
	                        width: '80%',
	                        label: '',
	                        placeHolder: '请输入查询条件'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'public_sreach_peson',
	                        text: '查找'
	                    }
	                ]
	            },
	            {
	                xtype: 'list',
	                flex: 1,
	                id: 'PublicPersonnelSelectionList',
                    store:'PublicPersonnelSelectionS',
                    itemTpl: [
                              '<table border=0 width=100%>',
                              '    <tr>',
                              '        <td style="width:50px">',
                              '           <div name="public_p_judge_color" class="p_judge_box" id="public_p_judge_color">3</div>',
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
	            	id:'public_text_id'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'public_ViewId'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'public_ViewName'
	            },
	        ]
	    }

	});