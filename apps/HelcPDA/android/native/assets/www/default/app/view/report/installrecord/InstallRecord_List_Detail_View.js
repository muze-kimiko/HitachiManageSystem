
/* JavaScript content from app/view/report/installrecord/InstallRecord_List_Detail_View.js in folder common */
/**
 * 
 */
Ext
		.define(
				'HelcPDA.view.report.installrecord.InstallRecord_List_Detail_View',
				{
					extend : 'Ext.Panel',
					id : 'installRecord_List_Detail_View',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.form.FieldSet',
							'Ext.field.Text' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '安装录入情况报表详细',
									items : [ {
										xtype : 'button',
										ui : 'back',
										id : 'btn_rpir_detailback',
										text : '返回'
									}, {
										xtype : 'spacer'
									}, {
										xtype : 'button',
										iconCls : 'info',
										id : 'irDetail_info_show',
										text : ''
									} ]
								},
								{
									xtype : 'formpanel',
									height : '100%',
									items : [ {
										xtype : 'fieldset',
										title : '<p id="installRecordDetail_title_Name" style="text-align:center"></p>',
										// id : '',
										items : [ {
											xtype : 'textfield',
											label : '已发货未进场',
											id : 'DELIVERY_APPROCH',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '在制',
											id : 'PROCESS',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '本月发货',
											id : 'MONTH_SHIPMENT',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '进场录入',
											id : 'IN_THE_ENTRY',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '进场率',
											id : 'IN_THE_RATE_OF',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '报调录入',
											id : 'AT_THE_ENTRY',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '报调率',
											id : 'AT_THE_RATE_OF',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '调试到达录入',
											id : 'DEBUGGING_T0_ENTRY',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '调试率',
											id : 'DEBUGGING_RATE',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '退调',
											id : 'ADJUSTABLE_BACK',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '调试完成录入',
											id : 'DEBUGGING_COMPLETED_ENTRY',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '完成率',
											id : 'DEBUG_COMPLETION',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '检验到达录入',
											id : 'ACCEPTANCE_TO_ENTRY',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '检验率',
											id : 'INSPECTION_RATE',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '退检',
											id : 'CHECK_BACK',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '检验完成',
											id : 'THE_INSPECTION_COMPLETION',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '完成率',
											id : 'CHECK_COMPLETION',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}, {
											xtype : 'textfield',
											label : '分值',
											id : 'SCORE',
											labelWidth : '60%',
											value : [],
											readOnly : true
										}
										]
									} ]
								} ]
					}
				});
