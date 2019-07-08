
/* JavaScript content from app/controller/report/installweekly/InstallWeeklyCtrl.js in folder common */
/**
 * 安装周期报表控制器
 */
Ext
		.define(
				'HelcPDA.controller.report.installweekly.InstallWeeklyCtrl',
				{
					extend : 'HelcPDA.controller.ApplicationController',
					id : 'installWeeklyCtrl',
					config : {
						refs : {
							// 进入安装周期报表界面
							to_installWeeklyReport : 'button[id=Report_Install_Weekly]',
							// 点击list的一条记录，进入详细界面
							to_list_InstallWeeklyItem : 'list[id=installWeekly_list]',

							to_infoshow : 'button[id=iwDetail_info_show]'

						},
						control : {
							to_installWeeklyReport : {
								tap : 'toInstallWeeklyReport'
							},
							to_list_InstallWeeklyItem : {
								itemtap : 'to_list_InstallWeeklyItem'
							},

							'button#btn_rpiw_detailback' : {
								tap : 'BackToInstallWeeklyList'
							},
							// 说明show
							to_infoshow : {
								tap : 'to_infoshow'
							}
						}

					},

					BackToInstallWeeklyList : function() {
						this
								.showBackView('installWeekly_List_View',
										'HelcPDA.view.report.installweekly.InstallWeekly_List_View');
					},

					toInstallWeeklyReport : function() {
						this.NextView('installWeekly_List_View','HelcPDA.view.report.installweekly.InstallWeekly_List_View');
						var getResult = function(res) {
							console.log(JSON.stringify(res));
							var datads = Ext.data.StoreManager
									.get('InstallWeeklyListStore');
							if (!datads) {
								datads = Ext
										.create('HelcPDA.store.report.installweekly.InstallWeeklyListStore');
							}
							var str = res.item.rows;

							if (str.length == 0) {
								WL.Toast.show("没有数据");
								return;
							}

							datads.setData(str, this);
							Ext.getCmp('installWeekly_list').setStore(datads);
							Ext.getCmp('install_weekly_nums').setHtml(
									"当前报表记录总数:" + (res.item.count) + "条");
							Ext.getCmp('install_weekly_due_date').setHtml(
									"报表统计截止时间点:" + (res.item.count_date));
						};

						var content = {
							key1 : 'yk'
						};
						this
								.connectServer(
										getResult,
										'installAction.do?method=toSearchWeeklyInstall',
										JSON.stringify(content));

					},
					// 点击一条记录，进入详细界面
					to_list_InstallWeeklyItem : function(obk, index, target,
							record, e, eOpts) {
						this
								.NextView('installWeekly_List_Detail_View',
										'HelcPDA.view.report.installweekly.InstallWeekly_List_Detail_View');
						var store = this
								.getStore('InstallWeeklyListStore',
										'HelcPDA.store.report.installweekly.InstallWeeklyListStore');
						var OPERATING_UNIT = store.getAt(index).get(
								'OPERATING_UNIT');
						Ext.getCmp('ENTER_CYCLE').setValue(
								store.getAt(index).get('ENTER_CYCLE'));
						Ext.getCmp('REPORT_INST_CYCLE').setValue(
								store.getAt(index).get('REPORT_INST_CYCLE'));
						Ext.getCmp('REPORT_DEBUG_CYCLE').setValue(
								store.getAt(index).get('REPORT_DEBUG_CYCLE'));
						Ext.getCmp('BAO_REPORT_CYCLE').setValue(
								store.getAt(index).get('BAO_REPORT_CYCLE'));
						Ext.getCmp('BAO_CHECK_CYCLE').setValue(
								store.getAt(index).get('BAO_CHECK_CYCLE'));
						Ext.getCmp('GOV_CHECK_CYCLE').setValue(
								store.getAt(index).get('GOV_CHECK_CYCLE'));
						Ext.getCmp('CHECK_COMPLETE_CYCLE').setValue(
								store.getAt(index).get('CHECK_COMPLETE_CYCLE'));
						Ext.getCmp('CCRQ_COMPLETE_CYCLE').setValue(
								store.getAt(index).get('CCRQ_COMPLETE_CYCLE'));
						document.getElementById('title_Name').innerHTML = OPERATING_UNIT
								+ '';
					},
					// 说明show
					to_infoshow : function() {

						var bbk = Ext.Msg
								.show({
									title : '说明',
									modal : true,
									html : '进场周期：<br/>进场日期-公司发货期（最后箱头出仓日期）'+
										  '<br/>安装周期：<br/>报调日期-进场日期' + 
										  '<br/>调试周期：<br/>报检日期-报调日期' + 
										  '<br/>厂检周期：<br/>报告签写时间-报检日期'+
										  '<br/>技检周期：<br/>技监检验日期-报技检日期' + 
										  '<br/>技检发证周期：<br/>技监局发证日期-技监检验日期' + 
										  '<br/>上报完工周期：<br/>上报完工期-技监发证日期' + 
										  '<br/>以上数据为当前所有在制工号的平均周期'+ 
										  '<br/>发货至上报完工周期：<br/>统计为本年度已确认完工工号的平均周期。（上报完工期-公司发货期）'
								});
						bbk.show();
					}
				});