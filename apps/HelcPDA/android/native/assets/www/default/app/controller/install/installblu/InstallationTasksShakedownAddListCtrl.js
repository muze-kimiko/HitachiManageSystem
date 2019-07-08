
/* JavaScript content from app/controller/install/installblu/InstallationTasksShakedownAddListCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installblu.InstallationTasksShakedownAddListCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'installationTasksShakedownAddListCtrl',
	config:{
		refs:{
			//进入调试菜单补录界面
			to_bulu:'button[id=TheDebugMenuPaperCollection_id]',
		    //进入选择的界面
			to_select:'list[id=blu_list1]',
			//进入厂检菜单补录的界面
			to_FacCheckbulu:'button[id=FactoryInspectionMenupaperCollection_id]',
		    //进入厂检选择界面
			to_select1:'list[id=blu_list2]',
		    //进入初检页面
			to_firstCheck:'button[id=firstCheck]',
		    //进入复检页面
			to_secondCheck:'button[id=secondCheck]'
		},
		control:{
			to_bulu:{
				tap:'to_bulu'
			},
			to_select:{
				itemtap:'to_select'
			},
			to_FacCheckbulu:{
				tap:'to_Facbulu'
			},
			to_select1:{
				itemtap:'to_select1'
			},
			/*to_firstCheck:{
				tap:'to_firstCheck'
			},
			to_secondCheck:{
				tap:'to_firstCheck'
			}*/
		}
	},
	//method
	//进入调试菜单补录
	to_bulu:function(){
		this.NextView('installationTasksShakedownAddListPanel','HelcPDA.view.install.installblu.InstallationTasksShakedownAddListPanel');
		var store=this.getStore('InstallationTasksShakedownAddListStore','HelcPDA.store.install.installblu.InstallationTasksShakedownAddListStore');
		function getResult(res){
			if(res.count==0){
				WL.Toast.show('没有查到符合的数据');
			}
			store.setData(res.rows);
		}
		var content="{'userid':'"+ebs_user_id+"'}";
	  	this.connectServer(getResult, 'menuAction.do?method=toSearch', content);
		
	},
	//调试补录详细
	to_select:function(obk, index, target, record, e, eOpts){
		// 获取必要信息
		var moduleFlag = "TS";
		var store = this.getStore('InstallationTasksShakedownAddListStore','HelcPDA.store.install.installblu.InstallationTasksShakedownAddListStore');
		var TASK_ID = store.getAt(index).get('TASK_ID');
		var TASK_PROCESS_ID = store.getAt(index).get('TASK_PROCESS_ID');
		var SEQ_NUM = store.getAt(index).get('SEQ_NUM');
		var ORG_ID = store.getAt(index).get('ORG_ID');
		var DEBUG_NUM = store.getAt(index).get('DEBUG_NUM');
		var SD= store.getAt(index).get('PARAM_SD');
		var TID = '';
		var title = '调试';
		var ELEVATOR_CLASS_NAME = store.getAt(index).get('ELEVATOR_CLASS_NAME');
		var fileMDate = '';
		var obj = this;
		var fileName = 'MENUPAPER';
		
		// 检查直扶梯
		if (ELEVATOR_CLASS_NAME.indexOf("直") != -1) {//判断直梯还是扶梯
      			fileName += "_ZT";
      			title += "直梯";
      			if (SD != '') {
      				if ((SD/60) < 4) {
						fileName += "4D";
						title += "(V < 4m/s)";
					} else {
						fileName += "4U";
						title += "(V ≥ 4m/s)";
					}
      			}
      	//06 24		
		}else if (ELEVATOR_CLASS_NAME.indexOf("扶") != -1) {		
//      	} else if (startingIntent.getStringExtra("ELEVATOR_CLASS_CODE").contains("扶")) {
      			fileName += "_FT";
      			title += "扶梯";
      	} else {
      			fileName = "MENUPAPER_ZT4U";
      			title += "直梯";
      	}
		
		// 查找文件最后更新日期
		var selection={tcode:'XML_VERSION',tid:fileName};
		var options = {};
		WL.JSONStore.get(collectionName).find(selection,options).then(function(arrayResults){
			if (arrayResults.length > 0) {
				fileMDate = arrayResults[0].json.stext.fileMDate;
			}
			// 检查服务器文件更新
	 		obj.connectServer(handlerResult,"instllMenudPaperAction.do?method=toSearchXML_PDA3","{DATA:{TASK_PROCESS_ID:'"+ TASK_PROCESS_ID +"'},FILENAME:'"+ fileName +"',fileMDate:'"+ fileMDate +"'}");
	 		function handlerResult(result) {
	 			if (!result.isexits) {
	 				WL.Toast.show('暂无此项目！');
	 				return ;
				}
				if (result.filedt != "NOFILE" && arrayResults.length > 0) {
					// 刷新最新的文件版本进JSONSTORE
					var nstext = arrayResults[0].json.stext;
					nstext.fileMDate = result.last_mdate;
					var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
					var udata = {_id:arrayResults[0]._id, json:ndata};
					WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
					}).fail(function(errorObject){
						alert(errorObject);
					});
				} else if (result.filedt != "NOFILE") {
					// 保存文件版本进JSONSTORE
							var nstext = {fileMDate:result.last_mdate};
							var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
							WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
							}).fail(function(errorObject){
								alert(errorObject);
							});					
				}
				// 查询以往填过的菜单
				var selection_find = {tcode:'MENU_PITEM_'+fileName,tid:TASK_ID+'_'+SEQ_NUM};
				options = {};
				WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
						var sdata_id = 'NOT';
						var sdata = [];
						if (arrayResults2.length > 0) {
							sdata_id = ''+arrayResults2[0]._id;
							sdata = arrayResults2[0].json.stext;
						}
						// 判断服务器上的数据是否比本地新
						var itemValue = result.itemValue;
						var DATA_LAST_UPDATE_DATE = result.LAST_UPDATE_DATE;
						if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length>0) {
							var date_server = new Date(DATA_LAST_UPDATE_DATE.replace("-","/"));
							var date_local = new Date(sdata.LAST_UPDATE_DATE);
							if (date_server > date_local) {
								sdata = result.itemValue;
							}
						} else if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length<1) {
							sdata = result.itemValue;
						}
						WL.Toast.show('正在进入菜单纸,请稍等...');
						// 进入文件
		 				var param = {SDATA:JSON.stringify(sdata),filedata:result.filedt,filename:fileName,
		 				task_id:TASK_ID,task_process_id:TASK_PROCESS_ID,seq_num:SEQ_NUM,sd:SD,org_id:ORG_ID,
		 				elevator_class_name:ELEVATOR_CLASS_NAME,moduleFlag:moduleFlag,data_id:sdata_id,title:title,
		 				debug_num:DEBUG_NUM,init_person_id:init_person_id,ebs_user_id:ebs_user_id,collectionName:collectionName};
						WL.NativePage.show('com.gzunicorn.operation.menupaper.InstallPaper', obj.handlerActionResult_Debug, param);
				}).fail(function(errorObject){
						alert(errorObject);
				});
				
		};
		}).fail(function(errorObject){
			alert(errorObject);
		});
	},
	
	handlerActionResult_Debug: function(data) {
	 	var json_data = eval("("+ data.sdata +")");
	 	var json_data_stext = eval("("+ json_data.stext +")");
	 	if (data.data_id == "NOT") {
	 		// 保存进JSONSTORE
			var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
			var options = {};
			WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
				WL.Toast.show('保存成功！');
				if(data.returnStatus != 'NOVALUE') {
				}
				// 刷新列表状态
			}).fail(function(errorObject){
				alert(errorObject);
			});	
	 	} else {
	 		// 更新进JSONSTORE
			var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
			var options = {};
			var udata = {_id:data.data_id, json:ndata};
			WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
				WL.Toast.show('保存成功！');
				if(data.returnStatus != 'NOVALUE') {
					handleFromMenuPaper_Debug(data.returnStatus);
				}
			}).fail(function(errorObject){
				alert(errorObject);
			});	
	 	}
		 	
	},
	
	//进入厂检补录页面
	to_Facbulu:function(){
		this.NextView('installatoinTasksFactoryAddListPanel','HelcPDA.view.install.installblu.InstallatoinTasksFactoryAddListPanel');
		var store=this.getStore('InstallatoinTasksFactoryAddListStore','HelcPDA.store.install.installblu.InstallatoinTasksFactoryAddListStore');
		function getResult(res){
			console.log(JSON.stringify(res));
			if(res.count==0){
				WL.Toast.show('没有查到符合的数据');
			}
			store.setData(res.rows);
		}
		var content="{'userid':'"+ebs_user_id+"'}";
	  	this.connectServer(getResult, 'menuAction.do?method=cjSearch', content);
		
	},
	//进入厂检补录详细
	to_select1:function(obk, index, target, record, e, eOpts){
		var obj=this;
		Ext.Msg.show({
		title:'请选择补录菜单类型',
		modal:true,
		hideOnMaskTap: true,
		buttons:[
		         {
		        	 xtype:'button',
		        	 text:'初检',
		             id:'firstCheck',
		             handler:function(button,e){
		               obj.to_firstCheck('CJ',index);	 
		             }
		          },
		          {
			         xtype:'button',
			         text:'复检',
			         id:'secondCheck',
			         handler:function(button,e){
			               obj.to_firstCheck('FJ',index);	 
			         }
			      }
		         ]
			
		});
	},
	//进入初检详细界面
	to_firstCheck:function(moduleFlag,index){
		Ext.Msg.setHidden(true);
		// 获取必要信息
		var store = Ext.data.StoreManager.get("InstallatoinTasksFactoryAddListStore");
		var TASK_ID = store.getAt(index).get('TASK_ID');
		var TASK_PROCESS_ID = store.getAt(index).get('TASK_PROCESS_ID');
		var SEQ_NUM = store.getAt(index).get('SEQ_NUM');
		var ORG_ID = store.getAt(index).get('ORG_ID');
		var CHECK_NUM = store.getAt(index).get('CHECK_NUM');
		var SD = store.getAt(index).get('PARAM_SD');
		var TID = '';
		var title = '初检';
		var ELEVATOR_CLASS_NAME = store.getAt(index).get('ELEVATOR_CLASS_NAME');
		var fileMDate = '';
		var obj = this;
		var fileName = 'MENUPAPER';
		// 标志是否复检
		if (moduleFlag == 'FJ') {
			title = "复检";
		}
		// 检查直扶梯
		if (ELEVATOR_CLASS_NAME.indexOf("直") != -1) {//判断直梯还是扶梯
      			fileName += "_ZT";
      			title += "直梯";
      			if (SD != '') {
      				if ((SD/60) < 4) {
						fileName += "4D";
						title += "(V < 4m/s)";
					} else {
						fileName += "4U";
						title += "(V ≥ 4m/s)";
					}
      			}
      	//06 24		
		}else if (ELEVATOR_CLASS_NAME.indexOf("扶") != -1) {	
//      	} else if (startingIntent.getStringExtra("ELEVATOR_CLASS_CODE").contains("扶")) {
      			fileName += "_FT";
      			title += "扶梯";
      	} else {
      			fileName = "MENUPAPER_ZT4U";
      			title += "直梯";
      	}
      	
		// 查找文件最后更新日期
		var selection={tcode:'XML_VERSION',tid:fileName};
		var options = {};
		WL.JSONStore.get(collectionName).find(selection,options).then(function(arrayResults){
			if (arrayResults.length > 0) {
				fileMDate = arrayResults[0].json.stext.fileMDate;
			}
			// 检查服务器文件更新
	 		obj.connectServer(handlerResult,"instllMenudPaperAction.do?method=toSearchXML_PDA3","{DATA:{TASK_PROCESS_ID:'"+ TASK_PROCESS_ID +"'},FILENAME:'"+ fileName +"',fileMDate:'"+ fileMDate +"'}");
	 		function handlerResult(result) {
	 			if (!result.isexits) {
	 				WL.Toast.show('暂无此项目！');
	 				return ;
				}
				if (result.filedt != "NOFILE" && arrayResults.length > 0) {
					// 刷新最新的文件版本进JSONSTORE
					var nstext = arrayResults[0].json.stext;
					nstext.fileMDate = result.last_mdate;
					var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
					var udata = {_id:arrayResults[0]._id, json:ndata};
					WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
					}).fail(function(errorObject){
						alert(errorObject);
					});
				} else if (result.filedt != "NOFILE") {
					// 保存文件版本进JSONSTORE
							var nstext = {fileMDate:result.last_mdate};
							var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
							WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
							}).fail(function(errorObject){
								alert(errorObject);
							});					
				}
				// 查询以往填过的菜单
				var selection_find = {tcode:'MENU_PITEM_'+fileName,tid:TASK_ID+'_'+SEQ_NUM};
				options = {};
				WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
						var sdata_id = 'NOT';
						var sdata = [];
						if (arrayResults2.length > 0) {
							sdata_id = ''+arrayResults2[0]._id;
							sdata = arrayResults2[0].json.stext;
						}
						// 判断服务器上的数据是否比本地新
						var itemValue = result.itemValue;
						var DATA_LAST_UPDATE_DATE = result.LAST_UPDATE_DATE;
						if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length>0) {
							var date_server = new Date(DATA_LAST_UPDATE_DATE.replace("-","/"));
							var date_local = new Date(sdata.LAST_UPDATE_DATE);
							if (date_server > date_local) {
								sdata = result.itemValue;
							}
						} else if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length<1) {
							sdata = result.itemValue;
						}
						WL.Toast.show('正在进入菜单纸,请稍等...');
						// 进入文件
		 				var param = {SDATA:JSON.stringify(sdata),filedata:result.filedt,filename:fileName,
		 				task_id:TASK_ID,task_process_id:TASK_PROCESS_ID,seq_num:SEQ_NUM,sd:SD,org_id:ORG_ID,
		 				elevator_class_name:ELEVATOR_CLASS_NAME,moduleFlag:moduleFlag,data_id:sdata_id,title:title,
		 				debug_num:CHECK_NUM,init_person_id:init_person_id,ebs_user_id:ebs_user_id,collectionName:collectionName};
						WL.NativePage.show('com.gzunicorn.operation.menupaper.InstallPaper', obj.handlerActionResult, param);
				}).fail(function(errorObject){
						alert(errorObject);
				});
				
		};
		}).fail(function(errorObject){
			alert(errorObject);
		});
	},
	
	handlerActionResult: function(data) {
	 	var json_data = eval("("+ data.sdata +")");
	 	var json_data_stext = eval("("+ json_data.stext +")");
	 	if (data.data_id == "NOT") {
	 		// 保存进JSONSTORE
			var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
			var options = {};
			WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
				WL.Toast.show('保存成功！');
				if(data.returnStatus != 'NOVALUE') {
					handleFromMenuPaper(data.returnStatus);
				}
				// 刷新列表状态
			}).fail(function(errorObject){
				alert(errorObject);
			});	
	 	} else {
	 		// 更新进JSONSTORE
			var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
			var options = {};
			var udata = {_id:data.data_id, json:ndata};
			WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
				WL.Toast.show('保存成功！');
				if(data.returnStatus != 'NOVALUE') {
				}
			}).fail(function(errorObject){
				alert(errorObject);
			});	
	 	}
	 	
	 },
});

