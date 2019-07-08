
/* JavaScript content from app/controller/report/installrecord/InstallRecordCtrl.js in folder common */
/**
 * 安装业务录入控制器
 */
Ext
		.define(
				'HelcPDA.controller.report.installrecord.InstallRecordCtrl',
				{
					extend : 'HelcPDA.controller.ApplicationController',
					id : 'installRecordCtrl',
					config : {
						refs : {
							// 进入安装业务录入报表界面
							to_installRecordReport : 'button[id=Report_Install_Record]',
							// 点击list的一条记录，进入详细界面
							to_list_InstallRecordItem : 'list[id=installRecord_list]',

							to_infoshow : 'button[id=irDetail_info_show]'
						},
						control : {
							to_installRecordReport : {
								tap : 'toInstallRecordReport'
							},
							to_list_InstallRecordItem : {
								itemtap : 'to_list_InstallRecordItem'
							},
							'button#btn_rpir_detailback' : {
								tap : 'backToInstallRecordList'
							}, // 说明show
							to_infoshow : {
								tap : 'to_infoshow'
							}
						}
					},
					backToInstallRecordList : function() {
						this
								.showBackView('installRecord_List_View',
										'HelcPDA.view.report.installrecord.InstallRecord_List_View');
					},
					// 点击一条记录，进入详细界面
					to_list_InstallRecordItem : function(obk, index, target,
							record, e, eOpts) {
						this
								.NextView('installRecord_List_Detail_View',
										'HelcPDA.view.report.installrecord.InstallRecord_List_Detail_View');
						var store = this
								.getStore('InstallRecordListStore',
										'HelcPDA.store.report.installrecord.InstallRecordListStore');
						var COMPANY_NAME = store.getAt(index).get(
								'COMPANY_NAME');
						Ext.getCmp('DELIVERY_APPROCH').setValue(
								store.getAt(index).get('DELIVERY_APPROCH'));
						Ext.getCmp('PROCESS').setValue(
								store.getAt(index).get('PROCESS'));
						Ext.getCmp('MONTH_SHIPMENT').setValue(
								store.getAt(index).get('MONTH_SHIPMENT'));
						Ext.getCmp('IN_THE_ENTRY').setValue(
								store.getAt(index).get('IN_THE_ENTRY'));
						
						var inTheRateOf = parseFloat(store.getAt(index).get('IN_THE_RATE_OF'));
						Ext.getCmp('IN_THE_RATE_OF').setValue(formatNumber(inTheRateOf));
						
						Ext.getCmp('AT_THE_ENTRY').setValue(
								store.getAt(index).get('AT_THE_ENTRY'));
						
						var atTheRateOf =  parseFloat(store.getAt(index).get('AT_THE_RATE_OF'));
						Ext.getCmp('AT_THE_RATE_OF').setValue(formatNumber(atTheRateOf));
						
						Ext.getCmp('DEBUGGING_T0_ENTRY').setValue(
								store.getAt(index).get('DEBUGGING_T0_ENTRY'));
						
						var debuggingRate = parseFloat(store.getAt(index).get('DEBUGGING_RATE'));
						Ext.getCmp('DEBUGGING_RATE').setValue(formatNumber(debuggingRate));
						
						Ext.getCmp('ADJUSTABLE_BACK').setValue(
								store.getAt(index).get('ADJUSTABLE_BACK'));
						Ext.getCmp('DEBUGGING_COMPLETED_ENTRY').setValue(
								store.getAt(index).get(
										'DEBUGGING_COMPLETED_ENTRY'));
						
						var debugCompletion = parseFloat(store.getAt(index).get('DEBUG_COMPLETION'));
						Ext.getCmp('DEBUG_COMPLETION').setValue(formatNumber(debugCompletion));
						
						
						Ext.getCmp('ACCEPTANCE_TO_ENTRY').setValue(
								store.getAt(index).get('ACCEPTANCE_TO_ENTRY'));
						
						var inspectionRate = parseFloat(store.getAt(index).get('INSPECTION_RATE'));
						Ext.getCmp('INSPECTION_RATE').setValue(formatNumber(inspectionRate));
						
						Ext.getCmp('CHECK_BACK').setValue(
								store.getAt(index).get('CHECK_BACK'));
						Ext.getCmp('THE_INSPECTION_COMPLETION').setValue(
								store.getAt(index).get(
										'THE_INSPECTION_COMPLETION'));
						
						var checkCompletion = parseFloat(store.getAt(index).get('CHECK_COMPLETION'));
						Ext.getCmp('CHECK_COMPLETION').setValue(formatNumber(checkCompletion));
						
						Ext.getCmp('SCORE').setValue(
								store.getAt(index).get('SCORE'));
						document
								.getElementById('installRecordDetail_title_Name').innerHTML = COMPANY_NAME
								+ '';
					},
					toInstallRecordReport : function() {
						this
								.NextView('installRecord_List_View',
										'HelcPDA.view.report.installrecord.InstallRecord_List_View');
						var getResult = function(res) {
							console.log(JSON.stringify(res));
							var datads = Ext.data.StoreManager
									.get('InstallRecordListStore');

							if (!datads) {
								datads = Ext
										.create('HelcPDA.store.report.installrecord.InstallRecordListStore');
							}
							var str = res.item.rows;

							if (str.length == 0) {
								WL.Toast.show("没有数据");
								return;
							}

							datads.setData(str, this);

							Ext.getCmp('installRecord_list').setStore(datads);

							Ext.getCmp('install_record_nums').setHtml(
									"当前报表记录总数:" + (res.item.count) + "条");
							Ext.getCmp('install_record_date').setHtml(
									"报表统计时间:" + (res.item.count_date));
						};

						var content = {
							key1 : userid
						};
						this
								.connectServer(
										getResult,
										'installAction.do?method=toSearchHelIntInputReport',
										JSON.stringify(content));
					},
					// 说明show
					to_infoshow : function() {

						var bbk = Ext.Msg
								.show({
									title : '说明',
									modal : true,
									html : '录入量以对应节点的录入日期制作为统计（当月1日至当月月底）已发货未进场、在制、本月发货数据来源于ERP，录入量来源于PDA。'
											+ '<br/>进场率：进场录入/本月发货（实际进场日期为当月）'
											+ '<br/>报调率：报调录入/在制'
											+ '<br/>调试率：调试到达录入/在制'
											+ '<br/>调试完成率：调试完成录入/在制'
											+ '<br/>检验率：检验到达录入/在制'
											+ '<br/>检验完成率：检验完成录入/在制'
											+ '<br/>分值=进场率+报调率+调试率+调试完成率+检验率+检验完成率'
											+ '<br/>备注：数据来源于ERP，每天晚上更新一次。'
								});
						bbk.show();
					}
				});

function formatNumber(n) {
	var i = (n * 100).toString().substring(0, 4) + "%";
	return i;
}