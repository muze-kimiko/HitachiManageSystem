
/* JavaScript content from app/view/install/sendingbutnoentry/Sending_No_Entry_List_Syn_View.js in folder common */
Ext
		.define(
				'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_Syn_View',
				{
					extend : 'Ext.Panel',
					id : 'SNEL_Sync_ID',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.form.Panel',
							'Ext.form.FieldSet', 'Ext.field.Text', 'Ext.Spacer' ],
					//scroll:vertical,	
					config : {
						margin : '0 auto',
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '按条件同步',
									items : [ {
										xtype : 'button',
										ui : 'back',
										text : '返回',
										handler : function(button, e) {
											Ext.Viewport
													.setActiveItem(Ext
															.getCmp('sending_no_entry_list_ID'));
										}
									} ]
								}, {
									xtype : 'formpanel',
									flex : 1,
									scrollable : false,
									height:120,
									items : [ {
										xtype : 'fieldset',
										margin : '0 auto',
										items : [ {
											xtype : 'textfield',
											id : 'snel_contract_number',
											label : '安装合同号',
											labelWidth : '40%',
											placeHolder : '请输入安装合同号'
										}, {
											xtype : 'textfield',
											label : '工号',
											id : 'snel_job_number',
											labelWidth : '40%',
											placeHolder : '请输入工号'
										}, {
											xtype : 'textfield',
											label : '客户',
											id : 'snel_customer',
											labelWidth : '40%',
											placeHolder : '请输入客户'
										}, {
											xtype : 'panel',
											layout : {
												type : 'hbox',
												align : 'center'
											},
											items : [ {
												xtype : 'spacer'
											}, {
												xtype : 'button',
												margin : '15 0',
												width : '90%',
												id : 'snel_sync_getdata_btn',
												text : '同步'
											}, {
												xtype : 'spacer'
											} ]
										} ]
									} ]
								} ]
					}
				});