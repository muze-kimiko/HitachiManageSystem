/**
 * 安装业务录入报表
 */
Ext
		.define(
				'HelcPDA.view.report.installrecord.InstallRecord_List_View',
				{
					extend : 'Ext.Panel',
					id : 'installRecord_List_View',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.dataview.List', 'Ext.XTemplate' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '安装录入情况报表',
									items : [
											{
												xtype : 'button',
												ui : 'back',
												text : '返回',
												handler : function(button, e) {
													Ext.Viewport
															.setActiveItem(Ext
																	.getCmp('reportview_homepage'));
												}
											}, {
												xtype : 'spacer'
											} ]
								},
								{
									xtype : 'toolbar',
									docked : 'top',
									layout : {
										type : 'vbox',
										align : 'start'
									},
									items : [ {
										xtype : 'label',
										id : 'install_record_nums',
										margin : '0 0 0 20'
									}, {
										xtype : 'spacer'
									}, {
										xtype : 'label',
										id : 'install_record_date',
										margin : '0 0 0 20'
									} ]
								},
								{
									xtype : 'list',
									id : 'installRecord_list',
									data : [

									],
									height : '100%',
									store : 'InstallRecordListStore',
									itemTpl : [
											'<table border=0 width=100% style="color:#666">',
											'    <tr>',
											'    <td colspan="2" style="color:#000;">{COMPANY_NAME}</td>',
											'  </tr>',
											'  <tr style="height:38px">',
											'    <td>在制：{PROCESS}</td>',
											'    <td style="padding-right:18px;text-align: right;">已发货未进场：{DELIVERY_APPROCH}</td>',
											'  </tr>',
											'</table>' ],
									onItemDisclosure : true
								} ]
					}
				});