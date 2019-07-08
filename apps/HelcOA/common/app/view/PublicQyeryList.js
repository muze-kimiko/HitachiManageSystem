/**
 * 员查询列表
 */
Ext.define('HelcOA.view.PublicQyeryList', {
	    extend: 'Ext.Panel',
	    id: 'PublicQyeryList_id',
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
	                        id: 'public_backSelect',
	                        text: '取消',
	                        ui: 'back'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'public_CompleteChoice',
	                        text: '确认'
	                    }
	                ]
	            },
	            {
	                xtype: 'list',
	                flex: 1,
	                id: 'PublicQyeryList',
                    store:'PublicQyeryListStore',
                    itemTpl: [
                              '<table border=0 width=100%>',
                              '    <tr>',
                              '        <td>',
                              '            <span style="font-size:20px;">{value}</span>',
                              '        </td>',
                              '        <td style="width:50px">',
                              '           <div name="public_p_judge_color2" class="p_judge_box" id="public_p_judge_color2">3</div>',
                              '        </td>',
                              '    </tr>',
                              '</table>'
                          ]
	            }
	        ]
	    }

	});