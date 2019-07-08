Ext
		.define(
				'HelcPDA.controller.install.sendingbutnoentry.SNEL_Detail_Ctrl',
				{
					extend : 'HelcPDA.controller.ApplicationController',
					config : {
						refs : {},
						control : {
							// 返回到ITM工号列表
							"button#back_To_SNEL_jobNo_View" : {
								tap : 'back_To_SNEL_jobNo_View'
							},
							"list#SNEL_JobNo_List" : {
								itemtap : 'SNEL_JobNo_List'
							},
							// 提交ITM
							"button#commit_SNED_View" : {
								tap : 'commit_SNED_View'
							}
						}
					},
					// 返回到SNEL工号列表
					back_To_SNEL_jobNo_View : function() {
						this
								.showBackView('SNEL_JobNo_View_ID',
										'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_JobNo_View');
					},
					SNEL_JobNo_List : function(obj, index, target, record, e,
							eOpts) {
						var obj = this;
						if (event.target.id != "SNEL_JobNo_Checkbox") {
							obj
									.NextView('SNEL_Detail_View_ID',
											'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_Detail_View');
							var SNELJobNoStore = obj
									.getStore('Sending_No_Entry_JobNo_Store',
											'HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_JobNo_Store');
							var ENGCONTRACT_NUMBER = SNELJobNoStore
									.getAt(index).get('ENGCONTRACT_NUMBER');
							var ELEVATOR_NO = SNELJobNoStore.getAt(index).get(
									'ELEVATOR_NO');

							var SEQ_NUM = SNELJobNoStore.getAt(index).get(
									'SEQ_NUM');

							var sned_hidden_value = ENGCONTRACT_NUMBER + '_'
									+ ELEVATOR_NO + '_' + SEQ_NUM;
							Ext.getCmp('sned_hidden_ID').setValue(
									sned_hidden_value);

							var query = {
								tcode : "Sending_No_Entry_Data",
								tid : sned_hidden_value
							};
							var options = {
								exact : false
							};
							WL.JSONStore
									.get(collectionName)
									.find(query, options)
									.then(
											function(res) {
												var show = {};
												show = res[0].json.stext;
												var snel_UNENTRANCE_REASON = show.VALUE.UNENTRANCE_REASON;

												// 获取单选项
												var rdioItmesArray = Ext
														.getCmp(
																'SNEL_Detail_Radiofield_ID')
														.getInnerItems();

												Ext
														.getCmp('SNEL_Txt_Memo')
														.setValue(
																show.VALUE.UNENTRANCE_COMMENTS);

												if (snel_UNENTRANCE_REASON == null
														|| snel_UNENTRANCE_REASON == '') {
													rdioItmesArray[0].check();
												} else {
													// 被选中的选项
													for (var i = 0; i < rdioItmesArray.length; i++) {
														if (rdioItmesArray[i]
																.getValue() == snel_UNENTRANCE_REASON) {
															rdioItmesArray[i]
																	.check();
															break;
														}
													}
												}
											});
						} else {

						}

					},
					commit_SNED_View : function() {
						var obj = this;
						var show = {};
						var value = {};
						var ENGCONTRACT_NUMBER = '';
						var sned_Hidden_ID_Value = Ext.getCmp('sned_hidden_ID')
								.getValue();
						var end_point = sned_Hidden_ID_Value.indexOf('_');
						ENGCONTRACT_NUMBER = sned_Hidden_ID_Value.substring(0,
								end_point);
						// alert('sned_Hidden_ID_Value：' + sned_Hidden_ID_Value
						// + ',indexof：' + sned_Hidden_ID_Value.indexOf('_') +
						// ',ENGCONTRACT_NUMBER: ' + ENGCONTRACT_NUMBER);

						var query = {
							tcode : "Sending_No_Entry_Data",
							tid : sned_Hidden_ID_Value
						};
						var options = {
							exact : false
						};
						WL.JSONStore
								.get(collectionName)
								.find(query, options)
								.then(
										function(res) {
											show = res[0].json.stext;
											// 后台需要数据，但不是用户输入，直接继承数据
											var snel_TASK_PROCESS_ID = show.VALUE.TASK_PROCESS_ID;
											var snel_ORG_ID = show.VALUE.ORG_ID;
											var snel_TASK_ID = show.VALUE.TASK_ID;
											var snel_SEQ_NUM = show.VALUE.SEQ_NUM;
											var snel_EBS_IMPORT_FLAG = show.VALUE.EBS_IMPORT_FLAG;
											var snel_DEBUG_NUM = show.VALUE.DEBUG_NUM;
											var snel_CHECK_NUM = show.VALUE.CHECK_NUM;
											var snel_LIFT_START_DATE = show.VALUE.LIFT_START_DATE;
											var snel_LIFT_END_DATE = show.VALUE.LIFT_END_DATE;
											var snel_BUILD_START_DATE = show.VALUE.BUILD_START_DATE;
											var snel_BUILD_END_DATE = show.VALUE.BUILD_END_DATE;
											var snel_UNENTRANCE_REASON = show.VALUE.UNENTRANCE_REASON;
											var snel_UNENTRANCE_COMMENTS = show.VALUE.UNENTRANCE_COMMENTS;
											var snel_CREATED_BY = show.VALUE.CREATED_BY;
											var snel_LAST_UPDATED_BY = init_person_id;
											// alert(snel_LAST_UPDATED_BY);
											// var snel_LAST_UPDATED_BY =
											// show.LAST_UPDATED_BY;

											// 获取单选项
											var rdioItmesArray = Ext
													.getCmp(
															'SNEL_Detail_Radiofield_ID')
													.getInnerItems();

											// 被选中的选项
											var checkedItemsValue = "";
											for (var i = 0; i < rdioItmesArray.length; i++) {
												if (rdioItmesArray[i]
														.isChecked()) {
													checkedItemsValue = rdioItmesArray[i]
															.getValue();
												}
											}

											snel_UNENTRANCE_REASON = checkedItemsValue;

											/*
											 * if(sss instanceof Array){
											 * alert('Array类型'); }else{
											 * alert(typeof sss); }
											 * console.log("items"+sss); for(var
											 * i=0;i<sss.length;i++){
											 * console.log("itemsValue="+sss[i].getName()); }
											 */

											if (Ext.getCmp('SNEL_Txt_Memo')
													.getValue() != null) {
												snel_UNENTRANCE_COMMENTS = Ext
														.getCmp('SNEL_Txt_Memo')
														.getValue();
											}

											if (snel_UNENTRANCE_REASON == 'N'
													&& snel_UNENTRANCE_COMMENTS == 'J') {
												Ext.Msg.alert("提交失败，请填写备注");
												return;
											}

											value = {
												TASK_PROCESS_ID : snel_TASK_PROCESS_ID,
												ORG_ID : snel_ORG_ID,
												TASK_ID : snel_TASK_ID,
												SEQ_NUM : snel_SEQ_NUM,
												EBS_IMPORT_FLAG : snel_EBS_IMPORT_FLAG,
												DEBUG_NUM : snel_DEBUG_NUM,
												CHECK_NUM : snel_CHECK_NUM,
												LIFT_START_DATE : snel_LIFT_START_DATE,
												LIFT_END_DATE : snel_LIFT_END_DATE,
												BUILD_START_DATE : snel_BUILD_START_DATE,
												BUILD_END_DATE : snel_BUILD_END_DATE,
												UNENTRANCE_REASON : snel_UNENTRANCE_REASON,
												UNENTRANCE_COMMENTS : snel_UNENTRANCE_COMMENTS,
												CREATED_BY : snel_CREATED_BY,
												LAST_UPDATED_BY : snel_LAST_UPDATED_BY
											};

											var contentdata = {
												init_person_id : init_person_id,
												show : show,
												value : value
											};
											var content = JSON
													.stringify(contentdata);
											var getResult = function(res) {
												WL.Toast.show("提交成功");
												show.VALUE.UNENTRANCE_REASON = snel_UNENTRANCE_REASON;
												show.VALUE.UNENTRANCE_COMMENTS = snel_UNENTRANCE_COMMENTS;
												show.LAST_UPDATED_BY  = snel_LAST_UPDATED_BY;
												// 数据
												var query1 = {
													tcode : "Sending_No_Entry_Data",
													tid : sned_Hidden_ID_Value
												};
												var options = {
													exact : false
												};
												WL.JSONStore
														.get(collectionName)
														.remove(query1, options)
														.then(
																function() {
																	var query2 = {
																		tcode : "Sending_No_Entry_Data",
																		tid : sned_Hidden_ID_Value,
																		stext : show
																	};
																	WL.JSONStore
																			.get(
																					collectionName)
																			.add(
																					query2)
																			.then(
																					function() {
																						console
																								.log('保存更改数据成功');
																						obj
																								.LoadSNELJobNoList(ENGCONTRACT_NUMBER);

																						obj
																								.NextView(
																										'SNEL_JobNo_View_ID',
																										'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_JobNo_View');

																					})
																			.fail(
																					function() {
																						Ext.Msg
																								.alert("删除本地数据失败");
																					});
																});
											};
											obj
													.connectServer(
															getResult,
															'installReasonAction.do?method=toAdd',
															content);
										});
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
					}
				});