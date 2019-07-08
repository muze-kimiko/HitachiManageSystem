
/* JavaScript content from app/controller/install/sendingbutnoentry/SNEL_Batch_Detail_Ctrl.js in folder common */
var SNED_Batch_Index = [];
Ext
		.define(
				'HelcPDA.controller.install.sendingbutnoentry.SNEL_Batch_Detail_Ctrl',
				{
					extend : 'HelcPDA.controller.ApplicationController',
					config : {
						refs : {},
						control : {
							// 批量
							"button#SNEL_Batch_Button" : {
								tap : 'SNEL_Batch_Button'
							},
							// 批量提交
							"button#commit_SNED_Batch_View" : {
								tap : 'commit_SNED_Batch_View'
							},
							//返回
							"button#batch_Back_To_SNEL_jobNo_View" : {
								tap : 'batch_Back_To_SNEL_jobNo_View'
							}
						}
					},
					
					// 返回到SNEL工号列表
					batch_Back_To_SNEL_jobNo_View : function() {
						this
								.showBackView('SNEL_JobNo_View_ID',
										'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_JobNo_View');
					},
					
					// 批量
					SNEL_Batch_Button : function() {
						var obj = this;
						var checkBoxItems = document
								.getElementsByName('SNEL_JobNo_Checkbox');
						var selectedMark = 0;
						var unSelectedMark = 0;
						var selectedItemsArray = [];// 存储下标

						for (var i = 0; i < checkBoxItems.length; i++) {
							// 提取控件
							var checkboxItem = checkBoxItems[i];
							// 检查是复选框是否被选中
							if (checkboxItem.style.color == 'rgb(224, 58, 62)') {
								selectedItemsArray[selectedMark] = i;
								selectedMark++;
							} else {
								unSelectedMark++;
							}
						}
						if (unSelectedMark == checkBoxItems.length) {
							Ext.Msg.alert('请至少选中一个工号');
						} else {
							this
									.NextView('SNEL_Batch_Detail_View_ID',
											'HelcPDA.view.install.sendingbutnoentry.SNEL_Batch_Detail_View');

						}

						SNED_Batch_Index = selectedItemsArray;
					},

					// 批处理提交
					commit_SNED_Batch_View : function() {
						var obj = this;
						var index = SNED_Batch_Index;
						var SNE_JobNo_Store = obj
								.getStore("Sending_No_Entry_JobNo_Store",
										"HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_JobNo_Store");
						var content = [];
						var k = 0;
						//var k = 0 ;

						// 取到合同号下所有工号信息
						var WL_process = WL.JSONStore.get(collectionName);
						var ENGCONTRACT_NUMBER = SNE_JobNo_Store
								.getAt(index[0]).get('ENGCONTRACT_NUMBER');
						var query = {
							tcode : "Sending_No_Entry_Data",
							tid : ENGCONTRACT_NUMBER
						};
						var options = {
							exact : false,
						};
						
						
						WL_process
								.find(query, options)
								.then(
										function(res_value) {
											for (var i = 0; i < index.length; i++) {
												var ELEVATOR_NO = SNE_JobNo_Store
														.getAt(index[i]).get(
																'ELEVATOR_NO');
												var SEQ_NUM = SNE_JobNo_Store.getAt(
														index[i])
														.get('SEQ_NUM');
												for (var j = 0; j < res_value.length; j++) {
													if (ELEVATOR_NO == res_value[j].json.stext.ELEVATOR_NO
															&& SEQ_NUM == res_value[j].json.stext.SEQ_NUM) {
														// 获取单选项
														var rdioItmesArray = Ext
																.getCmp(
																		'SNEL_Batch_Detail_Radiofield_ID')
																.getInnerItems();

														// 被选中的选项
														var checkedItemsValue = '';
														for (var i = 0; i < rdioItmesArray.length; i++) {
															if (rdioItmesArray[i]
																	.isChecked()) {
																checkedItemsValue = rdioItmesArray[i]
																		.getValue();
															}
														}

														var snel_UNENTRANCE_REASON = '';
														snel_UNENTRANCE_REASON = checkedItemsValue;

														if (Ext
																.getCmp(
																		'SNEL_Batch_Txt_Memo')
																.getValue() != null) {
															snel_UNENTRANCE_COMMENTS = Ext
																	.getCmp(
																			'SNEL_Batch_Txt_Memo')
																	.getValue();
														}

														if (snel_UNENTRANCE_REASON == 'N'
																&& snel_UNENTRANCE_COMMENTS == '') {
															Ext.Msg
																	.alert("提交失败，请填写备注");
															return;
														}

														// 把页面上的数据更新到本地
														res_value[j].json.stext.VALUE.UNENTRANCE_REASON = snel_UNENTRANCE_REASON;
														res_value[j].json.stext.VALUE.UNENTRANCE_COMMENTS = snel_UNENTRANCE_COMMENTS;
														res_value[j].json.stext.VALUE.LAST_UPDATED_BY =  init_person_id;
														var show = res_value[j].json.stext;
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

														var value = {
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
														content[k] = contentdata;
														k++;
													}
												}

											}
											//console.log(content);
											//alert("content.length="+content.length);
											//alert(k);

											var getResult = function(res) {
												var str = res.msginfo;
												Ext.Msg.alert(str);
												obj
														.LoadSNELJobNoList(ENGCONTRACT_NUMBER);
												obj
														.NextView(
																'SNEL_JobNo_View_ID',
																'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_JobNo_View');
											};
											obj
													.connectServer(
															getResult,
															'installReasonAction.do?method=toBatchAdd',
															JSON
																	.stringify(content));

											// 刷新JSONSTORE数据
											WL_process
													.replace(res_value)
													.then(
															function(
																	arrayResults2) {
																WL.Toast
																		.show('保存成功！');
															})
													.fail(
															function(
																	errorObject) {
																Ext.Msg
																		.alert("删除本地状态失败");
															});
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