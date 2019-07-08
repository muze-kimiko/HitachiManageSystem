
/* JavaScript content from app/controller/install/sendingbutnoentry/Sending_No_Entry_List_Ctrl.js in folder common */
Ext
		.define(
				'HelcPDA.controller.install.sendingbutnoentry.Sending_No_Entry_List_Ctrl',
				{
					extend : 'HelcPDA.controller.ApplicationController',
					config : {
						refs : {},
						control : {
							// 进入到同步页面
							"button#btn_sending_entry_sync" : {
								tap : 'btn_sending_entry_sync'
							},
							// 同步
							"button#snel_sync_getdata_btn" : {
								tap : 'snel_sync_getdata_btn'
							},
							// 查询
							"button#SNEL_search_data_btn" : {
								tap : 'SNEL_search_data_btn'
							},
							// 返回到发货未进场首页
							"button#back_To_SNEL_View" : {
								tap : 'back_To_SNEL_View'
							},
							// 查询
							"button#SNEL_search_data_btn" : {
								tap : 'SNEL_search_data_btn'
							},
							// 进入到查询页面
							"button#btn_sending_entry_search" : {
								tap : 'btn_sending_entry_search'
							},
							// 点击第一个list进入合同层
							"list#SNEL_List" : {
								itemtap : 'SNEL_List'
							},
							// 工号反选
							"button#SNEL_Checked_Invert" : {
								tap : 'SNEL_Checked_Invert'
							},
							// 工号全选
							"button#SNEL_Checked_All" : {
								tap : 'SNEL_Checked_All'
							}
							
						}
					},

					// 工号反选
					SNEL_Checked_Invert : function() {

						var sele = document
								.getElementsByName('SNEL_JobNo_Checkbox');
						// 遍历 form
						for (var i = 0; i < sele.length; i++) {
							// 提取控件
							var checkbox = sele[i];
							var color = checkbox.style.color;
							if (checkbox.style.color == '') {
								checkbox.style.color = '#e03a3e';
							} else if (checkbox.style.color == 'rgb(204, 204, 204)') {
								// 是未选中的情况下
								checkbox.style.color = '#e03a3e';
							} else if (checkbox.style.color == 'rgb(224, 58, 62)') {
								// 是选中的情况下
								checkbox.style.color = '#ccc';
							}
							;
						}
					},
					// 工号全选
					SNEL_Checked_All : function() {
						var sele = document
								.getElementsByName('SNEL_JobNo_Checkbox');
						// 遍历 form
						for (var i = 0; i < sele.length; i++) {
							// 提取控件
							var checkbox = sele[i];
							checkbox.style.color = '#e03a3e';
						}
					},

					// 点击第一个list进入工号层
					SNEL_List : function(obj, index, target, record, e, eOpts) {
						var obj = this;
						var store = obj
								.getStore('Sending_No_Entry_List_Store',
										'HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_List_Store');
						var ENGCONTRACT_NUMBER = store.getAt(index).get(
								'ENGCONTRACT_NUMBER');

						obj.LoadSNELJobNoList(ENGCONTRACT_NUMBER);

						this
								.NextView('SNEL_JobNo_View_ID',
										'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_JobNo_View');

					},
					LoadSNELJobNoList : function(ENGCONTRACT_NUMBER) {
						var obj = this;
						var datas = [];
						var query = {
							tcode : "Sending_No_Entry_Data",
							tid : ENGCONTRACT_NUMBER
						};
						var options = {
							exact : false,
						};
						WL.JSONStore
								.get(collectionName)
								.find(query, options)
								.then(
										function(res) {
											for (var i = 0; i < res.length; i++) {
												var data = {};
												data.ELEVATOR_NO = res[i].json.stext.ELEVATOR_NO;
												if (res[i].json.stext.RECORDED) {
													data.ELEVATOR_STATUS = '已填写';
												} else {
													data.ELEVATOR_STATUS = '未填写';
												}
												data.ENGCONTRACT_NUMBER = res[i].json.stext.ENGCONTRACT_NUMBER;
												data.SEQ_NUM = res[i].json.stext.SEQ_NUM;
												datas[i] = data;
											}
											var SNELJobNotore = obj
													.getStore(
															'Sending_No_Entry_JobNo_Store',
															'HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_JobNo_Store');
											var softdatas = obj.GHsoft(datas);
											SNELJobNotore.setData(softdatas);
										});
					},

					// 排序
					GHsoft : function(datas) {
						for (var i = datas.length - 1; i > 0; i--) {
							for (var j = 0; j < i; j++) {
								if (datas[i].ELEVATOR_NO < datas[j].ELEVATOR_NO) {
									var temp = datas[i];
									datas[i] = datas[j];
									datas[j] = temp;
								}
							}
						}
						return datas;
					},

					// 返回到发货未进场首页
					back_To_SNEL_View : function() {
						this
								.showBackView('sending_no_entry_list_ID',
										'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_View');
					},

					btn_sending_entry_sync : function() {
						this
								.NextView('SNEL_Sync_ID',
										'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_Syn_View');
					},

					btn_sending_entry_search : function() {
						this
								.NextView('SNEL_Search_ID',
										'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_Search_View');
					},

					// 查询
					SNEL_search_data_btn : function() {
						
						var obj = this;
						var ENGCONTRACT_NUMBER = Ext.getCmp(
								'snel_contract_number_search').getValue();
						var ELEVATOR_NO = Ext.getCmp('snel_job_number_search')
								.getValue();
						var CUSTOMER_NAME = Ext.getCmp('snel_customer_search')
								.getValue();
						this
						.showBackView('sending_no_entry_list_ID',
								'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_View');
						var store = obj
								.getStore('Sending_No_Entry_List_Store',
										'HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_List_Store');
						var query = {
							tcode : "Sending_No_Entry_Data"
						};
						var options = {
							exact : false
						};
						WL.JSONStore
								.get(collectionName)
								.find(query, options)
								.then(
										function(res) {
											//var ENGCONTRACT_NUMBER_LIST = [];
											var res1 = [];
											var res2 = [];
											var res3 = [];
											var finalRes = [];
											var cs = 0;
											if (ENGCONTRACT_NUMBER != "") {
												for (var i = 0; i < res.length - 1; i++) {
													var json_ENGCONTRACT_NUMBER = res[i].json.stext.ENGCONTRACT_NUMBER;
													if (json_ENGCONTRACT_NUMBER
															.indexOf(ENGCONTRACT_NUMBER) >= 0) {
														res1[cs] = res[i];
														cs++;
													}
												}
												finalRes = res1;
											}
											cs = 0;
											if (ELEVATOR_NO != "") {
												for (var i = 0; i < res1.length - 1; i++) {
													var json_ELEVATOR_NO = res1[i].json.stext.ELEVATOR_NO;
													if (json_ELEVATOR_NO
															.indexOf(ELEVATOR_NO) >= 0) {
														res2[cs] = res1[i];
														cs++;
													}
												}
												finalRes = res2;
											}
											cs = 0;
											if (CUSTOMER_NAME != "") {
												for (var i = 0; i < res2.length - 1; i++) {
													var json_CUSTOMER_NAME = res2[i].json.stext.CUSTOMER_NAME;
													if (json_CUSTOMER_NAME
															.indexOf(CUSTOMER_NAME) >= 0) {
														res3[cs] = res2[i];
														cs++;
													}
												}
												finalRes = res3;
											}
											
											var list = finalRes;

											var ENGCONTRACT_NUMBER_LIST = [];
											for (var i = 0; i < list.length; i++) {
												ENGCONTRACT_NUMBER_LIST[i] = list[i].json.stext.ENGCONTRACT_NUMBER;
											}
											var UNIQ_ENGCONTRACT_NUMBER_LIST = ENGCONTRACT_NUMBER_LIST
													.unique3();
											var UNIQ_CUSTOMER_NAME = [];

											var ENGCONTRACT_NUMBER_Record_Length = [];
											var ENGCONTRACT_NUMBER_UnRecord_Length = [];
											for (var i = 0; i < UNIQ_ENGCONTRACT_NUMBER_LIST.length; i++) {
												ENGCONTRACT_NUMBER_UnRecord_Length[i] = 0;
												ENGCONTRACT_NUMBER_Record_Length[i] = 0;
												for (var j = 0; j < list.length; j++) {
													if (UNIQ_ENGCONTRACT_NUMBER_LIST[i] == list[j].json.stext.ENGCONTRACT_NUMBER) {
														UNIQ_CUSTOMER_NAME[i] = list[j].json.stext.CUSTOMER_NAME;
														if (!list[j].json.stext.RECORDED) {
															ENGCONTRACT_NUMBER_UnRecord_Length[i]++;
														} else {
															ENGCONTRACT_NUMBER_Record_Length[i]++;
														}
													}
												}
											}
											var NEW_NEED_LIST = [];
											for (var i = 0; i < UNIQ_ENGCONTRACT_NUMBER_LIST.length; i++) {
												var CNTER_NEED = {};
												CNTER_NEED.ENGCONTRACT_NUMBER = UNIQ_ENGCONTRACT_NUMBER_LIST[i];
												CNTER_NEED.CUSTOMER_NAME = UNIQ_CUSTOMER_NAME[i];
												CNTER_NEED.ENGCONTRACT_NUMBER_Length = ENGCONTRACT_NUMBER_Record_Length[i];
												CNTER_NEED.ENGCONTRACT_NUMBER_UnLength = ENGCONTRACT_NUMBER_UnRecord_Length[i];
												NEW_NEED_LIST[i] = CNTER_NEED;
											}
											store.setData(NEW_NEED_LIST);
										});
					},

					snel_sync_getdata_btn : function() {
						var obj = this;
						var store = this
								.getStore('Sending_No_Entry_List_Store',
										'HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_List_Store');
						store.setData([]);
						var removequery = {
							tcode : "Sending_No_Entry_Data"
						};
						var removeoptions = {
							exact : false
						};
						WL.JSONStore.get(collectionName).remove(removequery,
								removeoptions).then(function() {
						}).fail(function() {
							Ext.Msg.alert("删除本地数据失败");
						});

						var ENGCONTRACT_NUMBER = Ext.getCmp(
								'snel_contract_number').getValue();
						var ELEVATOR_NO = Ext.getCmp('snel_job_number')
								.getValue();
						var CUSTOMER_NAME = Ext.getCmp('snel_customer')
								.getValue();
						obj.showBackView('sending_no_entry_list_ID',
								'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_View');
						var contentdata = {
							init_person_id : init_person_id,
							ENGCONTRACT_NUMBER : ENGCONTRACT_NUMBER,
							ELEVATOR_NO : ELEVATOR_NO,
							CUSTOMER_NAME : CUSTOMER_NAME
						};
						var content = JSON.stringify(contentdata);

						function getResult(res) {

							if (res.item.length == 0) {
								WL.Toast.show("找不到对应数据");
							} else {
								var ndata = [];
								var list = res.item;
								for (var i = 0; i < list.length; i++) {
									var query = {
										tcode : "Sending_No_Entry_Data",
										tid : list[i].ENGCONTRACT_NUMBER + '_'
												+ list[i].ELEVATOR_NO + '_'
												+ list[i].SEQ_NUM,
										stext : list[i]
									};
									ndata[i] = query;
								}
								WL.JSONStore
										.get(collectionName)
										.add(ndata)
										.then(
												function() {
													// 保存成功后，另存一个list给第一次进来ITM显示用
													var query2 = {
														tcode : "Sending_No_Entry_Data"
													};
													var options2 = {
														exact : true,
													};

													WL.JSONStore
															.get(collectionName)
															.find(query2,
																	options2)
															.then(
																	function(
																			res) {
																		var list = res;

																		var ENGCONTRACT_NUMBER_LIST = [];
																		for (var i = 0; i < list.length; i++) {
																			ENGCONTRACT_NUMBER_LIST[i] = list[i].json.stext.ENGCONTRACT_NUMBER;
																		}
																		var UNIQ_ENGCONTRACT_NUMBER_LIST = ENGCONTRACT_NUMBER_LIST
																				.unique3();
																		var UNIQ_CUSTOMER_NAME = [];

																		var ENGCONTRACT_NUMBER_Record_Length = [];
																		var ENGCONTRACT_NUMBER_UnRecord_Length = [];
																		for (var i = 0; i < UNIQ_ENGCONTRACT_NUMBER_LIST.length; i++) {
																			ENGCONTRACT_NUMBER_UnRecord_Length[i] = 0;
																			ENGCONTRACT_NUMBER_Record_Length[i] = 0;
																			for (var j = 0; j < list.length; j++) {
																				if (UNIQ_ENGCONTRACT_NUMBER_LIST[i] == list[j].json.stext.ENGCONTRACT_NUMBER) {
																					UNIQ_CUSTOMER_NAME[i] = list[j].json.stext.CUSTOMER_NAME;
																					if (!list[j].json.stext.RECORDED) {
																						ENGCONTRACT_NUMBER_UnRecord_Length[i]++;
																					} else {
																						ENGCONTRACT_NUMBER_Record_Length[i]++;
																					}
																				}
																			}
																		}
																		var NEW_NEED_LIST = [];
																		for (var i = 0; i < UNIQ_ENGCONTRACT_NUMBER_LIST.length; i++) {
																			var CNTER_NEED = {};
																			CNTER_NEED.ENGCONTRACT_NUMBER = UNIQ_ENGCONTRACT_NUMBER_LIST[i];
																			CNTER_NEED.CUSTOMER_NAME = UNIQ_CUSTOMER_NAME[i];
																			CNTER_NEED.ENGCONTRACT_NUMBER_Length = ENGCONTRACT_NUMBER_Record_Length[i];
																			CNTER_NEED.ENGCONTRACT_NUMBER_UnLength = ENGCONTRACT_NUMBER_UnRecord_Length[i];
																			NEW_NEED_LIST[i] = CNTER_NEED;
																		}

																		store
																				.setData(NEW_NEED_LIST);
																		WL.Toast
																				.show("更新成功，已经是最新数据");
																		var query = {
																			tcode : "Sending_No_Entry_Data",
																			tid : "Sending_No_Entry_list"
																		};
																		var options = {
																			exact : true
																		};
																		WL.JSONStore
																				.get(
																						collectionName)
																				.remove(
																						query,
																						options)
																				.then(
																						function() {
																							// 保存第一张list界面生成的数据放在本地，离线时使用
																							var query = {
																								tcode : "Sending_No_Entry_Data",
																								tid : "Sending_No_Entry_list",
																								stext : NEW_NEED_LIST
																							};
																							WL.JSONStore
																									.get(
																											collectionName)
																									.add(
																											query)
																									.then(
																											function() {
																											})
																									.fail(
																											function(
																													err) {
																												Ext.Msg
																														.alert("第一张list添加失败");
																											});
																						});
																	});
												}).fail(function() {
											Ext.Msg.alert("删除list列表失败");
										});
							}
						}
						this.connectServer(getResult,
								'installReasonAction.do?method=toSearch',
								content);
					}
				});