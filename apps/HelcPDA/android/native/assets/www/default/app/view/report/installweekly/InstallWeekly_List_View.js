
/* JavaScript content from app/view/report/installweekly/InstallWeekly_List_View.js in folder common */
/**
 * 安装周期报表
 */
Ext.define('HelcPDA.view.report.installweekly.InstallWeekly_List_View',
				{
					extend : 'Ext.Panel',
					id : 'installWeekly_List_View',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.dataview.List', 'Ext.XTemplate' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '安装周期报表',
									items : [
											{
												xtype : 'button',
												ui : 'back',
												text : '返回',
												handler : function(button, e) {
													Ext.Viewport.setActiveItem(Ext.getCmp('reportview_homepage'));
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
										id : 'install_weekly_nums',
										margin : '0 0 0 20'
									}, {
										xtype : 'spacer'
									}, {
										xtype : 'label',
										id : 'install_weekly_due_date',
										margin : '0 0 0 20'
									} ]
								},
								{
									xtype : 'list',
									id : 'installWeekly_list',
									height : '100%',
									store : 'InstallWeeklyListStore',
									itemTpl : [
											'<table border=0 width=100% style="color:#666">',
											'    <tr>',
											'    <td colspan="2" style="color:#000;">{OPERATING_UNIT}</td>',
											'  </tr>',
											'  <tr style="height:38px">',
											'    <td>进场周期：{ENTER_CYCLE}</td>',
											'    <td style="padding-right:18px;text-align: right;">发货至上报完工周期：{CCRQ_COMPLETE_CYCLE}</td>',
											'  </tr></table>' ],
									onItemDisclosure : true
								} ]
					}
				});