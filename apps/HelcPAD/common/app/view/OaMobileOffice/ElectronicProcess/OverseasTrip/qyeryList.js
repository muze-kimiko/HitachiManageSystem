/**
 * 起草-人员查询列表
 */
Ext.define('HelcPAD.view.OaMobileOffice.ElectronicProcess.OverseasTrip.qyeryList', {
	    extend: 'Ext.Panel',
	    id: 'qc_qyeryList_id',
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
	                title: '查询列表',
	                items: [
	                    {
	                        xtype: 'button',
	                        id: 'qc_returnPersonnelSelection_ID',
	                        text: '取消',
	                        ui: 'back'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'qc_CompleteChoice2_ID',
	                        text: '确认'
	                    }
	                ]
	            },
	            {
	                xtype: 'list',
	                flex: 1,
	                id: 'qc_qyeryList_List_ID',
                    store:'qyeryListStore',
                    itemTpl: [
                              '<table border=0 width=100%>',
                              '    <tr>',
                              '        <td>',
                              '            <span style="font-size:20px;">{value}</span>',
                              '        </td>',
                              '        <td style="width:50px">',
                              '           <div name="p_judge_color2" class="p_judge_box" id="p_judge_color2">3</div>',
                              '        </td>',
                              '    </tr>',
                              '</table>'
                          ]
	            }
	        ]
	    }

	});