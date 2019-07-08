
/* JavaScript content from app/view/report/installweekly/InstallWeekly_List_Detail_View.js in folder common */
/**
 * 
 */

Ext.define(
				'HelcPDA.view.report.installweekly.InstallWeekly_List_Detail_View',
				{
					extend : 'Ext.Panel',
					id : 'installWeekly_List_Detail_View',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.form.FieldSet',
							'Ext.field.Text' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '安装周期报表详细',
									items : [
											{
												xtype : 'button',
												ui : 'back',
												id : 'btn_rpiw_detailback',
												text : '返回'
											}, {
												xtype : 'spacer'
											}, {
												xtype : 'button',
												iconCls : 'info',
												id : 'iwDetail_info_show',
												text : ''
											}
											]
								},
								{
									xtype : 'formpanel',
									height : '100%',
									items : [ {
										xtype : 'fieldset',
										title : '<p id="title_Name" style="text-align:center;"></p>',
										// id : '',
										items : [ {
											xtype : 'textfield',
											label : '进场周期',
											id : 'ENTER_CYCLE',
											labelWidth : '60%',
											 value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '安装周期',
											id : 'REPORT_INST_CYCLE',
											labelWidth : '60%',
											 value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '调试周期',
											id : 'REPORT_DEBUG_CYCLE',
											labelWidth : '60%',
											 value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '厂检周期',
											id : 'BAO_REPORT_CYCLE',
											labelWidth : '60%',
											 value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '技检周期',
											id : 'BAO_CHECK_CYCLE',
											labelWidth : '60%',
											 value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '技检发证周期',
											id : 'GOV_CHECK_CYCLE',
											labelWidth : '60%',
											 value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '上报完工周期',
											id : 'CHECK_COMPLETE_CYCLE',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '发货至上报完工周期',
											id : 'CCRQ_COMPLETE_CYCLE',
											labelWidth : '60%',
											value : [],
											readOnly : true
										} ]
									} ]
								} ]
					}
				});
