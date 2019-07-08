
/* JavaScript content from app/view/install/sendingbutnoentry/Sending_No_Entry_List_View.js in folder common */
/**
 * 
 */

Ext
		.define(
				'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_View',
				{
					extend : 'Ext.Panel',
					id : 'sending_no_entry_list_ID',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.tab.Panel', 'Ext.dataview.List',
							'Ext.XTemplate' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '已发货未进场列表',
									items : [ {
										xtype : 'button',
										id : 'back_Instll_project_list',
										text : '返回',
										ui : 'back',
									}, {
										xtype : 'spacer'
									}, {
										xtype : 'button',
										id : 'btn_sending_entry_sync',
										iconCls : 'arrow_down',
									}, {
										xtype : 'button',
										id : 'btn_sending_entry_search',
										iconCls : 'search',
									} ]
								},
								{
									xtype : 'list',
									id : 'SNEL_List',
									height : '100%',
									itemTpl : [
											'<table border=0 width=100%>',
											'    <tr>',
											'        <td width=70%>',
											'            <span style="color:#666">{ENGCONTRACT_NUMBER}/{CUSTOMER_NAME}</span>',
											//'            <span style="color:#666">工号台数:{NUM}</span>',
											'        </td>',
											'    </tr>',
											'    <tr>',
											'        <td><span style="color:#666">已填写原因数:{ENGCONTRACT_NUMBER_Length}/未填写原因数：{ENGCONTRACT_NUMBER_UnLength}</span></td>',
											'    </tr>', '</table>' ],
									onItemDisclosure : true,
									store : 'Sending_No_Entry_List_Store'

								}
						]
					}

				});