/**
 * 电话号码可用网络查询模块的事件
 */
Ext
		.define(
				'HelcPDA.controller.cellphoneinfo.CellphoneInfoCtrl',
				{
					extend : 'HelcPDA.controller.ApplicationController',
					config : {
						refs : {
							// 点击list的一条记录，进入详细界面
							to_CellphoneListItem : 'list[id=cellphoneList]'
						},
						control : {
							// 返回查询首页
							"button#backToQueryMenu" : {
								tap : 'backToQueryMenu'
							},
							// 查询合同号
							"button#btn_CellphoneSearch" : {
								tap : 'btn_CellphoneSearch'
							},
							to_CellphoneListItem : {
								itemtap : 'to_CellphoneListItem'
							},
							//返回到电话号码查询页面
							"button#btn_BackToInputNumber":{
								tap:'btn_BackToInputNumber'
							},
						}
					},
					backToQueryMenu : function() {
						this.BackView();
						var obj_menu = Ext.getCmp('MenusView_id');
						obj_menu.refresh_wtd();
					},
					btn_BackToInputNumber:function(){
						this.showBackView("cellphoneList","HelcPDA.view.cellphoneinfo.InputCellphoneNumber");
					},
					btn_CellphoneSearch : function() {
						var serach_CellphoneNumber = Ext.getCmp(
								"serach_CellphoneNumber").getValue();
						var content = "{'CellphoneNumber':'"
								+ serach_CellphoneNumber + "'}";
						var getResult = function(res) {
							var datads = Ext.data.StoreManager
									.get('InputCellphoneNumberStore');
							if (!datads) {
								datads = Ext
										.create('HelcPDA.store.cellphoneinfo.InputCellphoneNumberStore');
							}
							var str = res.items;
							if (str.length == 0) {
								Ext.Msg.alert("没有数据");
								WL.Toast.show("没有数据");
							}
							datads.setData(str, this);
							Ext.getCmp('cellphoneList').setStore(datads);
						};
						if (serach_CellphoneNumber == null
								|| serach_CellphoneNumber == ""
								|| typeof (serach_CellphoneNumber) == "undefined") {
							Ext.Msg.alert("手机号码不能为空！");
						} else {
							this
									.connectServer(
											getResult,
											'cellPhoneInfoAction.do?method=searchCellphoneNumber',
											content);
						}
					},
					// 点击一条记录，进入详细界面
					to_CellphoneListItem : function(obk, index, target, record,
							e, eOpts) {
						this
								.NextView('cellphoneNumberDetailID',
										'HelcPDA.view.cellphoneinfo.CellphoneNumberDetail');
						var store = this
								.getStore('InputCellphoneNumberStore',
										'HelcPDA.store.cellphoneinfo.InputCellphoneNumberStore');

						Ext.getCmp('cellphoneNumber').setValue(
								store.getAt(index).get('CellphoneNumber'));
						
						Ext.getCmp('carrieroperator').setValue(
								store.getAt(index).get('Carrieroperator'));
						
						Ext.getCmp('networkType').setValue(
								store.getAt(index).get('NetworkType'));
					}
				});
