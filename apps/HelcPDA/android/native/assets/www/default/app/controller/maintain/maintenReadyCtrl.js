
/* JavaScript content from app/controller/maintain/maintenReadyCtrl.js in folder common */
var ovlay;
Ext.define('HelcPDA.controller.maintain.maintenReadyCtrl',{
	 extend:'HelcPDA.controller.ApplicationController',
     config:{
    	 refs:{
    		 button_id:'button[id=go_home_id]'
    		 
    	 },
    	 control:{
    		 button_id:{
    				 tap:'doProject'
    		  },
    			 
    		  '#list_id' : {
				itemtap : 'prepareItemTap'
			}
    	 }
     },
     
     doProject:function(){
		 var project=Ext.getCmp('maintenance_id');
		 if(!project){
			 project=Ext.create('HelcPDA.view.maintain.maintenance_item');
		 }
		 Ext.Viewport.setActiveItem(project);
		 //Ext.getCmp('pj').destroy();
	 },
	
	 /**
	  * 整备项目点击
	  */
	 prepareItemTap: function (obj, index, target, record, e, eOpts) {
	 	// 获取必要信息
	 	var sto=Ext.data.StoreManager.get("maintenProStroe");
		if(!sto){
			sto=Ext.create("HelcPDA.store.maintain.maintenProStroe");
		};
		
		var sto_bz=Ext.data.StoreManager.get('MaintenaceReplaceStore');
	    if(!sto_bz){
	    	sto_bz=Ext.create('HelcPDA.store.maintain.MaintenaceReplaceStore');
	    }
	    var temp_name = '';
	    var temp_id = '';
		var id_ = sto.getAt(index).get('project_id');
		var name = sto.getAt(index).get('project_information').split("/")[0];
		
		if ((sto_bz.getCount()>index) && (!ovlay.isHidden())) {
			temp_name = sto_bz.getAt(index).get('part_num');
			id_ = sto_bz.getAt(index).get('id_');
			name = temp_name;
		}
		var filename = id_+"_"+name;
		if (temp_name!='竖式抱闸解体' && temp_name!='横式抱闸解体' && name == '抱闸解体') {
			if(!ovlay){
	        		 ovlay=Ext.Viewport.add({
	        		     xtype:'panel',
	        		     id:'listPanel',
	        		     style:'height:80%;width:90%;',
	     	             hideOnMaskTap: true,
	     	             centered: true,
	     	             modal: true,
	        		     items:[
	        		            {xtype:'fieldset',
	        		            	style:'height:100%;width:100%;',
	        		             items:[{
	        		            	xtype:'list',     		
	     		        		    id:'list_id',
	     		        		    store:'MaintenaceReplaceStore',
	     		        		    style:'height:100%;width:100%;',
	     		        		    itemTpl:[
	     		        		            '<div>{part_num}<div>'
	     		        		            ]
	        		            }] 
	        		            }
	        		            ]
	        	});
	        	}
	        	ovlay.show();
	    		var data_bz=[{part_num:'竖式抱闸解体',id_:id_},{part_num:'横式抱闸解体',id_:id_}];
	    		sto_bz.setData(data_bz);
		} else {
			if (ovlay) {
				ovlay.hide();
			}
		}
		
		var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
		var MP_ID2=Ext.getCmp('hidden2_stext_MP_ID').getValue();
		var ASSET_NUM = Ext.getCmp("ASSET_NUM").getValue();
		var HIS_COUNTs = Ext.getCmp("HIS_COUNT").getValue();
		var CURR_COUNTs = Ext.getCmp("CURR_COUNT").getValue();
		var mi_sbl_row_id=Ext.getCmp('mi_sbl_row_id').getValue();
		var fileMDate = '';
		var obj = this;
		
		// 查找文件最后更新日期
		var selection={tcode:'XML_VERSION',tid:filename};
		var options = {};
		WL.JSONStore.get(collectionName).find(selection,options).then(function(arrayResults){
			if (arrayResults.length > 0) {
				fileMDate = arrayResults[0].json.stext.fileMDate;
			}
			
			// 检查服务器文件更新
	 		obj.connectServer(handlerResult,"maintainancePlanItemListAction.do?method=toSearchXML_PDA3","{fileName:'"+ filename +"',fileMDate:'"+ fileMDate +"'}");
	 		function handlerResult(result) {
	 			if (!result.isexits) {
	 				WL.Toast.show('暂无此项目！');
	 				return ;
				}
				if (result.filedt != "NOFILE" && arrayResults.length > 0) {
					// 刷新最新的进JSONSTORE
					var nstext = arrayResults[0].json.stext;
					nstext.fileMDate = result.last_mdate;
					var ndata = {tcode:'XML_VERSION',tid:filename,stext:nstext};
					var udata = {_id:arrayResults[0]._id, json:ndata};
					WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
					}).fail(function(errorObject){
						alert(errorObject);
					});					
				} else if (result.filedt != "NOFILE") {
					// 保存进JSONSTORE
					var nstext = {fileMDate:result.last_mdate};
					var ndata = {tcode:'XML_VERSION',tid:filename,stext:nstext};
					WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
					}).fail(function(errorObject){
						alert(errorObject);
					});					
				}
				
				var selection_find = {tcode:'PLAN_PITEM',tid:MP_ID2+'_'+TASK_ROW_ID2+'_'+filename};
				options = {};
				WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
						var sdata_id = 'NOT';
						var sdata = {FLAG:'NOT'};
						if (arrayResults2.length > 0) {
							sdata_id = ''+arrayResults2[0]._id;
							sdata = arrayResults2[0].json.stext;
						}
						// 进入文件
		 				var param = {SDATA:JSON.stringify(sdata),DATA:result.filedt,name:filename,cname:name,SBL_ROW_ID:mi_sbl_row_id,task_row_id:TASK_ROW_ID2,mp_id:MP_ID2,HIS_COUNT:HIS_COUNTs,CURR_COUNT:CURR_COUNTs,data_id:sdata_id};
						WL.NativePage.show('com.gzunicorn.operation.maintainance.PrepareItem', obj.handlerActionResult, param);
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
				reflash();
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
				reflash();
			}).fail(function(errorObject){
				alert(errorObject);
			});	
	 	}
	 	
	 	function reflash() {
						var obj=Ext.getCmp('textfield_id');
						var value=obj.getValue();
						//alert(value);
	   
						var coll=WL.JSONStore.get(collectionName);
						var data={tcode:'mainxmlName'};
						var zhi=null;
						
						var options={
						};
						
						coll.find(data,options).then(function(arrayResults){
							var akb=arrayResults[0].json;
						     zhi=akb.stext;

								var temp =value;
								console.log(temp);
						
								var pc=Ext.getCmp('t_button2');
								pc.setHidden(false);
								var flag=0;
								for(var i=0;i<zhi.MNAMELIST.length;i++){
									if(zhi.MNAMELIST[i].indexOf(temp)!=-1){
										var pro=Ext.getCmp('main_ready_id');
										if(!pro){
											pro=Ext.create('HelcPDA.view.maintain.maintenance_ready');
										}
										Ext.Viewport.setActiveItem(pro);
										var obs=Ext.getCmp('text_id2');
										var obValue=obs.getValue();
										var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
										var MP_ID2=Ext.getCmp('hidden2_stext_MP_ID').getValue();
										var Str=MP_ID2+'_'+TASK_ROW_ID2;
							
										var data1={tcode:'PLAN_PITEM',tid:Str};
										var options={};
										var coll=WL.JSONStore.get(collectionName);
										
										coll.find(data1,options).then(function(arrayResults){
											console.log(arrayResults.length);
											if(arrayResults.length==0){
												
											}else{
												var akb=arrayResults[0].json;
												var zhi=akb.stext.values_t;
												console.log(zhi);
												var obs=Ext.getCmp('text_id2');
												obs.setValue(zhi.SASSETX_CUR_RUNNING_TIMES);
												 var obj7=Ext.getCmp('text_id3');
												 obj7.setValue(zhi.NOW_RUNNING_TIMES);
												    var obj8=Ext.getCmp('text_id4');
												    obj8.setValue(zhi.RUNNING_TIMES);
											}
											
										  
										}).fail(function(errorObject){
											alert("保持出错");
										});
										flag=1;
										break;
									}else{
										flag=0;
									}
									}
								if(flag==0){
									for(var i=0;i<zhi.MOTHERNAME.length;i++){
										if(zhi.MOTHERNAME[i].indexOf(temp)!=-1){
											var pro=Ext.getCmp('pj');
											if(!pro){
												pro=Ext.create('HelcPDA.view.maintain.maintenance_project');
											}
											Ext.Viewport.setActiveItem(pro);

											var ab=zhi.MOTHERNAME[i];
											
											var data = [];
									
											for(var i=0;i<zhi.MOTHERNAMES.length;i++){
												
												if(zhi.MOTHERNAMES[i].indexOf(ab)!=-1){
												
												for(var j=0;j<zhi.MOTHERNAMES[i].length-1;j++){
													var dataitem = {};
													var str=zhi.MOTHERNAMES[i][j];
													
													var b=str.split("_");
													
													dataitem.project_information=b[1];
													dataitem.project_id = b[0];
													data[j] = dataitem;
													
													}
												}
											}
											
											flag=1;
											break;
										}
									}
									
									var TASK_ROW_ID=Ext.getCmp('hidden2Task_row_Id').getValue();
									var MP_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue();
									var stry=MP_ID+'_'+TASK_ROW_ID;
									data1={tcode:'PLAN_PITEM',tid:stry};
									var result=null;
											
									var coll=WL.JSONStore.get(collectionName);
									var options = {exact : false};
									coll.find(data1,options).then(function(arrayResults){
										var name_data = '';
										for (var j = 0; j < arrayResults.length; j ++) {
												name_data += arrayResults[j].json.tid;
										}
											
										for (var i=0;i<data.length;i++) {
											if(name_data.indexOf(data[i].project_information)!=-1){
												data[i].project_information +='/已填写';
											}else{
												data[i].project_information +='/未填写';
											}
										}
										var sto=Ext.data.StoreManager.get("maintenProStroe");
										if(!sto){
											sto=Ext.create("HelcPDA.store.maintain.maintenProStroe");
										}
										sto.setData(data);
													
									}).fail(function(errorObject){
										alert("保存出错");
									});
									
								}
									
				                
         
								
						}).fail(function(errorObject){
							alert(errorObject);
						});
					
					
	 	}
	 }

});
