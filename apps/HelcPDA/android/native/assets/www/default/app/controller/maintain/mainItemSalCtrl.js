
/* JavaScript content from app/controller/maintain/mainItemSalCtrl.js in folder common */
Ext.define('HelcPDA.controller.maintain.mainItemSalCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'oo',
	config:{

		control:{
			"list#maintenacePej":{
	           	itemtap:'doProject' 
	        },
	        "list#maintenacePej_MuCe":{
	           	itemtap:'doProject_MuCe' 
	        },
			"button#CC_btn_OL_Brake":{
				tap: 'OnCC_btn_OL_BrakeTap'
			},
			"button#Save_btn_OL_Brake":{
				tap: 'OnSave_btn_OL_BrakeTap'
			},
		}
	},
	
	doProject_MuCe:function(obj, index, target, record, e, eOpts){
		if(record.data.IS_MUG3!='Y'){
//			Ext.Msg.alert('温馨提示','此作业项目为目测项目，<br>详见指示书内容！');
			console.log(record.data);
			var v_Parent_Measure_Id = record.data.TemplateTaskSubId;
			
			var getResult = function(res){
				var resp = res.MeasureProjectQuery_Output;
	    		var v_data = [];
	    		if(resp.NumOutputObjects > 0){
	    			var respo = resp.ListOfHelPdaMaintainingPlanMeasureProjectListIo.ListOfHelMeasureProject.HelMeasureProject;
	    			if(respo.length){
	    				for(var i = 0;i< resp.NumOutputObjects;i++){
	    					v_data.push({
	    						MeasureProjectContent:respo[i].MeasureProjectContent,
	        					MeasureProjectContentName:respo[i].MeasureProjectContentName,
	        					MeasureProjectNo:respo[i].MeasureProjectNo,
	        					MeasureProjectRequest:respo[i].MeasureProjectRequest,
	        					MeasureProjectStandard:respo[i].MeasureProjectStandard,
	        					Children:respo[i].ListOfHelMaintainPlanContentAttachment,
	    					})
	    				}
	    			}else{
	    				v_data.push({
	    					MeasureProjectContent:respo[i].MeasureProjectContent,
        					MeasureProjectContentName:respo[i].MeasureProjectContentName,
        					MeasureProjectNo:respo[i].MeasureProjectNo,
        					MeasureProjectRequest:respo[i].MeasureProjectRequest,
        					MeasureProjectStandard:respo[i].MeasureProjectStandard,
        					Children:respo[i].ListOfHelMaintainPlanContentAttachment,
	    				})
	    			}
	    			
	    			this.NextView('New_InstructionBookL2','HelcPDA.view.maintain.New_InstructionBookL2');
	    			Ext.getCmp('L_New_InstructionBookL2').getStore().setData(v_data);
	    		}else{
	    			Ext.Msg.alert('温馨提示','没有相关指示书内容！');
	    		}
			}

			var parameters = {
				procedure : 'MeasureProjectQuery',
				isLoading : true,
				Parent_Measure_Id : v_Parent_Measure_Id,
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
		}else{
			Ext.Msg.alert('温馨提示','此作业项目为MUG3项目，不需要填写测量表，<br>只需要处理保养计划实际作业内容！');
		}
	},
	
	OnCC_btn_OL_BrakeTap : function(thisObj,e,eOpts){
		Ext.getCmp('Overlay_Brake').hide();
	},
	
	OnSave_btn_OL_BrakeTap : function(thisObj,e,eOpts){
		console.log(Ext.getCmp('L_Brake').getSelection());
		if(Ext.getCmp('L_Brake').getSelectionCount() > 0){
			var v_tmp = Ext.getCmp('L_Brake').getSelection()[0].data;
			
			var getResult = function(res){
				if(res.BrakekPick_Output){
					Ext.toast('执行成功！',2000);
					if(Ext.getCmp('H_Brake_Index').getValue() > -1){
						var v_record = Ext.getCmp('maintenacePej').getStore().getAt(Ext.getCmp('H_Brake_Index').getValue());
						v_record.set('TASKNAME_DISPLAY',v_tmp.TaskDescription);
						v_record.set('TASK_DESCRIPTION',v_tmp.TaskDescription);
						v_record.set('TASK_NAME',v_tmp.TaskName);
						v_record.set('ID',v_tmp.Id);
					}
					Ext.getCmp('Overlay_Brake').hide();
				}else{
					Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！');
				}
			}

			var parameters = {
				procedure : 'BrakekPick',
				isLoading : true,
				NewBrakeId : v_tmp.Id,
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
		}else{
			Ext.Msg.alert('温馨提示','请先选择抱闸测量表！');
		}
	},
	
	  doProject:function(obj, index, target, record, e, eOpts){
		  console.log('---doProject');
		  console.log(record.data);
		  //从JSONStore读取数据到页面上
		     //存储下标
	    	Ext.getCmp('store_index').setValue(index);
	    	Ext.getCmp('hidden2Task_row_Id').setValue(record.data.TASK_ROW_ID);
	    	
	    	if(record.data.IS_MUG3!='Y'){
	    		if(record.data.XCNAME_DISPLAY == '' && record.data.TASKNAME_DISPLAY != ''){
	    			var getResult = function(res){
	    				var resp = res.ItemListQuery_Output;
	    				var v_data = [];
	    				if(resp.NumOutputObjects > 0){
	    					var respo = resp.ListOfHelPdaMaintainingPlanMeasureItemListIo.HelMeasureItemList;
	    					if(respo.length){
	    						for(var x = 0;x < respo.length;x++){
	    							v_data.push({
	    								Id:respo[x].Id,
	    								MeasureItemContent:respo[x].MeasureItemContent,
	    								MeasureItemCover:respo[x].MeasureItemCover,
	    								MeasureItemGroupName:respo[x].MeasureItemGroupName,
	    								MeasureItemIFPhoto:respo[x].MeasureItemIFPhoto,
	    								MeasureItemIFRequired:respo[x].MeasureItemIFRequired,
	    								MeasureItemId:respo[x].MeasureItemId,
	    								MeasureItemIfMeasure:respo[x].MeasureItemIfMeasure,
	    								MeasureItemJudge:respo[x].MeasureItemJudge,
	    								MeasureItemJudgeId:respo[x].MeasureItemJudgeId,
	    								MeasureItemLocaleFlag:respo[x].MeasureItemLocaleFlag,
	    								MeasureItemLocation:respo[x].MeasureItemLocation,
	    								MeasureItemMaxValue:respo[x].MeasureItemMaxValue,
	    								MeasureItemMinValue:respo[x].MeasureItemMinValue,
	    								MeasureItemName:respo[x].MeasureItemName,
	    								MeasureItemNo:respo[x].MeasureItemNo,
	    								MeasureItemPostWork:respo[x].MeasureItemPostWork,
	    								MeasureItemPostWorkId:respo[x].MeasureItemPostWorkId,
	    								MeasureItemPreWork:respo[x].MeasureItemPreWork,
	    								MeasureItemPreWorkId:respo[x].MeasureItemPreWorkId,
	    								MeasureItemRequire:respo[x].MeasureItemRequire,
	    								MeasureItemStandard:respo[x].MeasureItemStandard,
	    								MeasureItemType:respo[x].MeasureItemType,
	    								MeasureItemYearFlag:respo[x].MeasureItemYearFlag,
	    								MeasureProjectId:respo[x].MeasureProjectId,
	    								MeasureRecordIFExistsFlag:respo[x].MeasureRecordIFExistsFlag,
	    								Is_Work:respo[x].MeasureItemPostWork != '' || respo[x].MeasureItemPreWork !=''?1:0,
	    							});
	    						}
	    					}else{
	    						v_data.push({
	    							Id:respo.Id,
	    							MeasureItemContent:respo.MeasureItemContent,
	    							MeasureItemCover:respo.MeasureItemCover,
	    							MeasureItemGroupName:respo.MeasureItemGroupName,
	    							MeasureItemIFPhoto:respo.MeasureItemIFPhoto,
	    							MeasureItemIFRequired:respo.MeasureItemIFRequired,
	    							MeasureItemId:respo.MeasureItemId,
	    							MeasureItemIfMeasure:respo.MeasureItemIfMeasure,
	    							MeasureItemJudge:respo.MeasureItemJudge,
	    							MeasureItemJudgeId:respo.MeasureItemJudgeId,
	    							MeasureItemLocaleFlag:respo.MeasureItemLocaleFlag,
	    							MeasureItemLocation:respo.MeasureItemLocation,
	    							MeasureItemMaxValue:respo.MeasureItemMaxValue,
	    							MeasureItemMinValue:respo.MeasureItemMinValue,
	    							MeasureItemName:respo.MeasureItemName,
	    							MeasureItemNo:respo.MeasureItemNo,
	    							MeasureItemPostWork:respo.MeasureItemPostWork,
	    							MeasureItemPostWorkId:respo.MeasureItemPostWorkId,
	    							MeasureItemPreWork:respo.MeasureItemPreWork,
	    							MeasureItemPreWorkId:respo.MeasureItemPreWorkId,
	    							MeasureItemRequire:respo.MeasureItemRequire,
	    							MeasureItemStandard:respo.MeasureItemStandard,
	    							MeasureItemType:respo.MeasureItemType,
	    							MeasureItemYearFlag:respo.MeasureItemYearFlag,
	    							MeasureProjectId:respo.MeasureProjectId,
	    							MeasureRecordIFExistsFlag:respo.MeasureRecordIFExistsFlag,
	    							Is_Work:respo.MeasureItemPostWork != '' || respo.MeasureItemPreWork !=''?1:0,
	    						});
	    					}
	    				}
	    				
	    				this.NextView('New_MeasureItem','HelcPDA.view.maintain.New_MeasureItem');
	    				Ext.getCmp('H_MeasureItemId').setValue(record.data.ID);
	    				Ext.getCmp('H_MeasureItem_Index').setValue(index),
	    				Ext.getCmp('L_New_MeasureItem').getStore().setData(v_data);
	    				Ext.getCmp('L_New_MeasureItem').getStore().sort([{property:'Is_Work',direction:'ASC'},{property:'MeasureItemNo',direction:'ASC'},])
	    				
	    				if(Ext.getCmp("PLAN_STATUS").getValue() == '已完成'){
	    					Ext.getCmp('Submit_btn_New_MeasureItem').setHidden(true);
	    					Ext.getCmp("TB_Legacy").setHidden(true);
	    				}
	    				var getResult_1 = function(res){
	        				var resp = res.LegacyQuery_Output;
	        				var v_data = [];
	        				if(resp.NumOutputObjects > 0){
	        					var respo = resp.ListOfHelPdaMaintainingPlanMeasureLegacyListIo.HelMeasureLegacy;
	        					if(respo.length){
	        						for(var i = 0;i < respo.length;i++){
	        							v_data.push({
	        								Id:respo[i].Id,
	        								MeasureLegacyOverproofReason:respo[i].MeasureLegacyOverproofReason,
	        								MeasureLegacyParId:respo[i].MeasureLegacyParId,
	        								MeasureLegacyProjectNo:respo[i].MeasureLegacyProjectNo,
	        								MeasureLegacySeq:respo[i].MeasureLegacySeq,
	        								MeasureLegacySpotSituation:respo[i].MeasureLegacySpotSituation,
	        							});
	        						}
	        					}else{
	        						v_data.push({
	    								Id:respo.Id,
	    								MeasureLegacyOverproofReason:respo.MeasureLegacyOverproofReason,
	    								MeasureLegacyParId:respo.MeasureLegacyParId,
	    								MeasureLegacyProjectNo:respo.MeasureLegacyProjectNo,
	    								MeasureLegacySeq:respo.MeasureLegacySeq,
	    								MeasureLegacySpotSituation:respo.MeasureLegacySpotSituation,
	    							});
	        					}
	        				}
	        				
	        				Ext.getCmp('L_LegacyList').getStore().setData(v_data);
	        			}

	        			var parameters_1 = {
	        				procedure : 'LegacyQuery',
	        				isLoading : true,
	        				Measure_Legacy_ParId : record.data.ID,
	        			};
	        								
	        			MainCtr.getDataFromServer(getResult_1,parameters_1);
	    			}

	    			var parameters = {
	    				procedure : 'ItemListQuery',
	    				isLoading : true,
	    				MeasureItem_Id : record.data.ID,
	    			};
	    								
	    			MainCtr.getDataFromServer(getResult,parameters);
//	    			if(record.data.TASK_TYPE != '抱闸解体测量表'){
//	    				
//	    			}else{
//	    				//选择抱闸实绩测量表类型
//	    				console.log('---选择抱闸解体测量表');
//	    			}
	    			
	    		}else if(record.data.XCNAME_DISPLAY != '' && record.data.TASKNAME_DISPLAY == ''){
	    			//显示指示书
	    			this.getApplication().getController('maintain.MaintenaceDetailCtrl').New_Pointing();
	    		}
	    	}else{
	    		Ext.Msg.alert('温馨提示','此作业项目为MUG3项目，不需要填写测量表，<br>只需要处理保养计划实际作业内容！');
	    	}
	    	
/*	    	
	    	var getResult = function(res){
	    		var project=Ext.getCmp('New_MeasureItem');
				 if(project){
					 project.destroy(); 
				 }
				 project=Ext.create('HelcPDA.view.maintain.New_MeasureItem');
				 Ext.Viewport.setActiveItem(project);
	    	}

	    	var parameters = {
	    		procedure : 'ItemListQuery',
	    		isLoading : true,
	    		MeasureItem_Id : record.data.TASK_ROW_ID,
	    	};
	    						
	    	MainCtr.getDataFromServer(getResult,parameters);
*/	    	
	    	/*
			 var project=Ext.getCmp('New_MeasureItem');
			 if(project){
				 project.destroy(); 
			 }
			 project=Ext.create('HelcPDA.view.maintain.New_MeasureItem');
			 Ext.Viewport.setActiveItem(project);
			 */
			 
/*			 
			//用于存放选工号最新启动次数
			 var curr_one=Ext.getCmp('CURR_COUNT_index').getValue();
			 Ext.getCmp('CURR_COUNT_index2').setValue(curr_one);
			 //alert('curr_one:'+curr_one);
			 
			 var ob=Ext.getCmp('hidden2_maintem_Tid');
			 var val=ob.getValue();
             var MP_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue();
			 
			 
			var coll=WL.JSONStore.get(collectionName);
			var data={tcode:'MAINITEM',tid:MP_ID+'/'};
			var options={};
			coll.find(data,options).then(function(arrayResults){
				var abs=arrayResults[index].json;
				var result=abs.stext;

				var obj=Ext.getCmp('textfield_id');
				var value=result.TASK_NAME;
				obj.setValue(value);
				var obj1=Ext.getCmp('textfield_id1');
				var value1=result.PLAN_STATUS;
				obj1.setValue(value1);
				var obj2=Ext.getCmp('textfield_id2');
				var value2=result.TASK_DESCRIPTION;
				obj2.setValue(value2);
				var obj3=Ext.getCmp('textfield_id3');
				var value3=result.TASK_STAND_TIME;
				obj3.setValue(value3);
				var obj4=Ext.getCmp('textfield_id4');
				var value4=result.TASK_RADIX;
				obj4.setValue(value4);
				var mi_sbl_row_id=Ext.getCmp('mi_sbl_row_id');
				mi_sbl_row_id.setValue(result.SBL_ROW_ID);
				var obj5=Ext.getCmp('sel');
				var value5=result.PLAN_TIMES;
				obj5.setValue(value5);

				var coll=WL.JSONStore.get(collectionName);
				var data={tcode:'mainxmlName'};
				var zhi=null;
				var options={};
				coll.find(data,options).then(function(arrayResults){
					var akb=arrayResults[0].json;
				    zhi=akb.stext;
					var pc=Ext.getCmp('t_button2');
					pc.setHidden(false);
					var flag=0;
					for(var i=0;i<zhi.MNAMELIST.length;i++){
						if(zhi.MNAMELIST[i].indexOf(value)!=-1){
							flag=1;
							Ext.getCmp('hf_spc_flag').setValue('MNAME');
							break;
						}else{
							flag=0;
						};
					};
					
					if(flag==0){
						for(var i=0;i<zhi.MOTHERNAME.length;i++){
							if(zhi.MOTHERNAME[i].indexOf(value)!=-1){
								flag=1;
								Ext.getCmp('hf_spc_flag').setValue('LNAME');
								break;
							};
						};
						if(flag==0){
							pc.setHidden(true);
							Ext.getCmp('hf_spc_flag').setValue('NAME');
							//当整备项目不存在的时候 xcx  2014-7-9
//							var data1="[{'value':'"+'已完成'+"','text':'"+'已完成'+"'}]";
//							Ext.getCmp('sel').setOptions(eval(data1));
						};
					};
						                
				}).fail(function(errorObject){
					WL.Toast.show(errorObject);
				});
		}).fail(function(errorObject){
			WL.Toast.show("查找出错");
		});
*/		
	},
	
	
		 //全部删除JSONStore里面的数据
		 doit:function(){
		//	 var collectionName='user';
			 var coll=WL.JSONStore.get(collectionName);
				coll.removeCollection().then(function(){
				}).fail(function(errorObject){
					alert('55');
				});

		 }
});