
/* JavaScript content from app/controller/maintain/New_MeasureItemCtrl.js in folder common */
Ext.define('HelcPDA.controller.maintain.New_MeasureItemCtrl', {
    extend: 'HelcPDA.controller.ApplicationController',
    
    config: {
        control: {
        	"button#btn_New_MeasureItem": {
        		tap: 'Onbtn_New_MeasureItemTap'
        	},
        	"list#L_New_MeasureItem":{
        		itemtap:'OnL_New_MeasureItemItemtap'
        	},
        	"list#L_LegacyList": {
        		itemtap:'OnL_LegacyListItemtap'
        	},
        	"button#Add_btn_Legacy": {
        		tap: 'OnAdd_btn_LegacyTap'
        	},
        	"button#S_btn_Legacy": {
        		tap: 'OnS_btn_LegacyTap'
        	},
        	"button#CC_btn_OL_Legacy": {
        		tap: 'OnCC_btn_OL_LegacyTap'
        	},
        	"button#Save_btn_OL_Legacy": {
        		tap: 'OnSave_btn_OL_LegacyTap'
        	},
        	"selectfield#T_ContentProjectTaskNo": {
        		change: 'OnT_ContentProjectTaskNoChange'
        	},
        	"tabpanel#New_MeasureItem": {
        		initialize: 'OnNew_MeasureItemInitialize'
        	},
        	"button#Submit_btn_New_MeasureItem": {
        		tap: 'OnSubmit_btn_New_MeasureItemTap'
        	},
        }
    },
    
    OnSubmit_btn_New_MeasureItemTap : function(thisObj,e,eOpts){
    	var v_sMeasureId = Ext.getCmp('H_MeasureItemId').getValue();
    	var v_index = Ext.getCmp('H_MeasureItem_Index').getValue();
    	
    	var getResult = function(res){
    		var resp = res.ItemListSubmit_Output;
    		if(resp.ErrorMsg){
    			Ext.Msg.show({
    				title:'温馨提示',
    				message:resp.ErrorMsg,
    				buttons:[{text:'确定',itemId:'ok'}],
    				fn:function(buttonId){
    					if(buttonId == 'ok'){
    						if(resp.ErrorMsg.indexOf('成功') > -1){
    							MainCtr.BackView();
    							Ext.getCmp('maintenacePej').getStore().getAt(v_index).set('PLAN_STATUS','已完成');
    						}
    					}
    				}
    			})
    		}
    	}

    	var parameters = {
    		procedure : 'ItemListSubmit',
    		isLoading : true,
    		sMeasureId : v_sMeasureId,
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnNew_MeasureItemInitialize : function(component,eOpts){
//    	console.log('---OnNew_MeasureItemInitialize');
        Ext.getCmp('L_LegacyList').setPlugins(
            [
                {
                    xclass: 'plugin.SlideActions',
                    openPosition: 50,
                    buttons:[
                         {
                            xtype: 'button',
                            baseCls: 'x-button helcpda-list-button helcpda-bgColor-red',
                            text: '删除',
                            listeners: {
                                tap: function(button, e){
                                    e.stopPropagation();
                                    return false;
                                },
                                scope: this
                            },
                            handler: function(button, e) {
                                Ext.getCmp('L_LegacyList').fireEvent('hide');
                                console.log(button.getRecord());
                                var getResult = function(res){
                                	var resp = res.LegacyDelete_Output;
                                	if(resp.ErrorCode == 0){
                                		Ext.toast('删除成功！',2000);
                		    			Ext.getCmp('L_LegacyList').getStore().remove(button.getRecord());
                                	}else{
                                		Ext.Msg.alert('温馨提示','删除失败，请稍后重试！<br>如重试不成功请联系管理员！');
                                	}
                                }

                                var parameters = {
                                	procedure : 'LegacyDelete',
                                	isLoading : true,
                                	PrimaryRowId : button.getRecord().data.Id,
                                };
                                					
                                MainCtr.getDataFromServer(getResult,parameters);
                            }
                        }
                    ]
                }
            ]
        );
    },
    
    OnCC_btn_OL_LegacyTap : function(thisObj,e,eOpts){
    	Ext.getCmp('Overlay_Legacy').hide();
    },
    
    Onbtn_New_MeasureItemTap : function(thisObj,e,eOpts){
    	MainCtr.BackView();
    },
    
    OnL_New_MeasureItemItemtap : function(thisObj,index,target,record,e,eOpts){
    	console.log(record);
    	var getResult = function(res){//获取作业前选项
    		var resp = res.PreWorkQuery_Output;
    		var v_predata = [];
    		if(resp.NumOutputObjects > 0){
    			var respo = resp.ListOfHelPdaMaintainingPlanSelectProjectPreWorkIo.HelMaintainPlanSelectProject;
    			if(respo.length){
    				for(var i = 0;i < respo.length;i++){
    					if(respo[i].PreWorkCheck != ''){
    						v_predata.push({
        						text:respo[i].PreWorkCheck,
        						value:respo[i].Id,
        					});
    					}
    				}
    			}else{
    				if(respo.PreWorkCheck != ''){
    					v_predata.push({
    						text:respo.PreWorkCheck,
    						value:respo.Id,
    					});
    				}
    			}
    			
    			v_predata.unshift({text:'请选择',value:''});
    		}
    		
    		var getResult_1 = function(res){//获取作业后选项
    			var resp = res.PostWorkQuery_Output;
    			var v_postdata = [];
    			
    			if(resp.NumOutputObjects > 0){
        			var respo = resp.ListOfHelPdaMaintainingPlanSelectProjectPostWorkIo.HelMaintainPlanSelectProject;
        			if(respo.length){
        				for(var i = 0;i < respo.length;i++){
        					if(respo[i].PostWork != ''){
        						v_postdata.push({
            						text:respo[i].PostWork,
            						value:respo[i].Id,
            					});
        					}
        				}
        			}else{
        				if(respo.PostWork != ''){
        					v_postdata.push({
        						text:respo.PostWork,
        						value:respo.Id,
        					});
        				}
        			}
        			
        			v_postdata.unshift({text:'请选择',value:''});
        		}
    			
    			this.NextView('New_MeasureRecord','HelcPDA.view.maintain.New_MeasureRecord');
    			Ext.getCmp('D_MeasureItemPreWork').setOptions(v_predata);
    			Ext.getCmp('D_MeasureItemPostWork').setOptions(v_postdata);
    			Ext.getCmp('D_MeasureItemPreWork').setValue(record.data.MeasureItemPreWorkId);
    			Ext.getCmp('D_MeasureItemPostWork').setValue(record.data.MeasureItemPostWorkId);
    			if(record.data.MeasureItemIFRequired == 'Y'){
    				Ext.getCmp('D_MeasureItemPreWork').setLabel(Ext.getCmp('D_MeasureItemPreWork').getLabel()+'<font color=\'red\'>*</font>');
    				Ext.getCmp('D_MeasureItemPostWork').setLabel(Ext.getCmp('D_MeasureItemPostWork').getLabel()+'<font color=\'red\'>*</font>');
    			}
    			Ext.getCmp('D_MeasureItemMaxValue').setValue(record.data.MeasureItemMaxValue);
    			Ext.getCmp('D_MeasureItemMinValue').setValue(record.data.MeasureItemMinValue);
//    			Ext.getCmp('D_MeasureItemGroupName').setValue(record.data.MeasureItemGroupName);
//    			Ext.getCmp('D_MeasureItemLocation').setValue(record.data.MeasureItemLocation);
//    			Ext.getCmp('D_MeasureItemName').setValue(record.data.MeasureItemName);
//    			Ext.getCmp('D_MeasureItemNo').setValue(record.data.MeasureItemNo);
//    			Ext.getCmp('D_MeasureItemType').setValue(record.data.MeasureItemType);
//    			Ext.getCmp('D_MeasureItemCover').setValue(record.data.MeasureItemCover);
//    			Ext.getCmp('D_MeasureItemContent').setValue(record.data.MeasureItemContent);
    			Ext.getCmp('D_MeasureItemStandard').setValue(record.data.MeasureItemStandard);
//    			Ext.getCmp('D_MeasureItemLocaleFlag').setValue(record.data.MeasureItemLocaleFlag);
//    			Ext.getCmp('D_MeasureItemYearFlag').setValue(record.data.MeasureItemYearFlag);
    			Ext.getCmp('H_MeasureRecord_Id').setValue(record.data.Id);
    			Ext.getCmp('H_MeasureRecordAtt_Id').setValue(record.data.MeasureProjectId);
    			Ext.getCmp('H_MeasureItemIFRequired').setValue(record.data.MeasureItemIFRequired);
    			Ext.getCmp('H_MeasureRecordIndex').setValue(index);
    			Ext.getCmp('L_New_MeasureRecord').getStore().setData([]);
    			Ext.getCmp('DV_New_MeasureRecord_Attachment').getStore().setData([]);
    			Ext.getCmp('H_tab_MeasureRecordAtt').setValue('');
				Ext.getCmp('DV_New_MeasureRecord_Att').getStore().setData([]);
    			
    			if(Ext.getCmp('PLAN_STATUS').getValue() == '已完成'){
    				Ext.getCmp('FS_New_MeasureRecord').setDisabled(true);
    				Ext.getCmp('Save_btn_New_MeasureRecord').setHidden(true);
    				Ext.getCmp('SaveNext_btn_New_MeasureRecord').setHidden(true);
    				Ext.getCmp('btn_New_MeasureRecord_Camera').setHidden(true);
    				Ext.getCmp('btn_New_MeasureRecord_Album').setHidden(true);
    			}
    			
    			if(record.data.MeasureRecordIFExistsFlag != 'Y'){
    				Ext.getCmp('New_MeasureRecord').getTabBar().items.getAt(2).setHidden(true);
    				
    			}
    			if(record.data.MeasureItemIFPhoto != 'Y'){
    				Ext.getCmp('New_MeasureRecord').getTabBar().items.getAt(3).setHidden(true);
    				
    			}
    			
    			/*
    			if(record.data.MeasureRecordIFExistsFlag == 'Y'){
    				var getResult_2 = function(res){//获取录值项目列表
    					var resp = res.RecordQuery_Output;
    					var v_data = [];
    					
    					if(resp.NumOutputObjects > 0){
    						var respo = resp.ListOfHelPdaMaintainingPlanMeasureItemRecordListIo.HelMeasureRecordList;
    						if(respo.length){
    							for(var i = 0;i < respo.length;i++){
    								v_data.push({
    									Id : respo[i].Id,
    									MeasureRecordContent : respo[i].MeasureRecordContent,
    									MeasureRecordDescription : respo[i].MeasureRecordDescription,
    									MeasureRecordId : respo[i].MeasureRecordId,
    									MeasureRecordItemContent : respo[i].MeasureRecordItemContent,
    									MeasureRecordValue : respo[i].MeasureRecordValue,
    									ParentItemId : respo[i].ParentItemId,
    									RecordItemId : respo[i].RecordItemId,
    								});
    							}
    						}else{
    							v_data.push({
	    							Id : respo.Id,
									MeasureRecordContent : respo.MeasureRecordContent,
									MeasureRecordDescription : respo.MeasureRecordDescription,
									MeasureRecordId : respo.MeasureRecordId,
									MeasureRecordItemContent : respo.MeasureRecordItemContent,
									MeasureRecordValue : respo.MeasureRecordValue,
									ParentItemId : respo.ParentItemId,
									RecordItemId : respo.RecordItemId,
    							});
    						}
    					}
    					
    					Ext.getCmp('L_New_MeasureRecord').getStore().setData(v_data);
    					
    					var getResult_3 = function(res){//获取附件列表
    	    				var resp = res.AttachmentQuery_Output;
    	    				var v_data = [];
    	    				
    	    				if(resp.NumOutputObjects > 0){
    	    					var respo = resp.ListOfHelPdaMaintainingPlanMeasureItemAttachmentIo.HelMeasureItemAttachment;
    	    					if(respo.length){
    	    						for(var i = 0;i < respo.length;i++){
    	    							v_data.push({
    	    								Id:respo[i].Id,
    	    								MeasureItemAttachComments:respo[i].MeasureItemAttachComments,
    	    								MeasureItemAttachDockStatus:respo[i].MeasureItemAttachDockStatus,
    	    								MeasureItemAttachFileBuffer:respo[i].MeasureItemAttachFileBuffer,
    	    								MeasureItemAttachFileDate:respo[i].MeasureItemAttachFileDate,
    	    								MeasureItemAttachFileExt:respo[i].MeasureItemAttachFileExt,
    	    								MeasureItemAttachFileName:respo[i].MeasureItemAttachFileName,
    	    								MeasureItemAttachFileSize:respo[i].MeasureItemAttachFileSize,
    	    								MeasureItemAttachFileSrcPath:respo[i].MeasureItemAttachFileSrcPath,
    	    								MeasureItemAttachFileSrcType:respo[i].MeasureItemAttachFileSrcType,
    	    								MeasureItemParId:respo[i].MeasureItemParId,
    	    							})
    	    						}
    	    					}else{
    	    						v_data.push({
    	    							Id:respo.Id,
    	    							MeasureItemAttachComments:respo.MeasureItemAttachComments,
    	    							MeasureItemAttachDockStatus:respo.MeasureItemAttachDockStatus,
    	    							MeasureItemAttachFileBuffer:respo.MeasureItemAttachFileBuffer,
    	    							MeasureItemAttachFileDate:respo.MeasureItemAttachFileDate,
    	    							MeasureItemAttachFileExt:respo.MeasureItemAttachFileExt,
    	    							MeasureItemAttachFileName:respo.MeasureItemAttachFileName,
    	    							MeasureItemAttachFileSize:respo.MeasureItemAttachFileSize,
    	    							MeasureItemAttachFileSrcPath:respo.MeasureItemAttachFileSrcPath,
    	    							MeasureItemAttachFileSrcType:respo.MeasureItemAttachFileSrcType,
    	    							MeasureItemParId:respo.MeasureItemParId,
    	    						})
    	    					}
    	    				}
    	    				
    	    				Ext.getCmp('DV_New_MeasureRecord_Attachment').setData(v_data);
    	    			}

    	    			var parameters_3 = {
    	    				procedure : 'AttachmentQuery',
    	    				isLoading : true,
    	    				MeasureItemParId : record.data.Id,
    	    			};
    	    								
    	    			MainCtr.getDataFromServer(getResult_3,parameters_3);
    				}

    				var parameters_2 = {
    					procedure : 'RecordQuery',
    					isLoading : true,
    					Parent_Item_Id : record.data.Id,
    				};
    									
    				MainCtr.getDataFromServer(getResult_2,parameters_2);
    			}
    			*/
    		}
    		
    		var parameters_1 = {
    			procedure : 'PostWorkQuery',
    			isLoading : true,
    			Parent_Content_Id : record.data.MeasureProjectId,
    		};
    	    						
    		MainCtr.getDataFromServer(getResult_1,parameters_1);
    	}

    	var parameters = {
    		procedure : 'PreWorkQuery',
    		isLoading : true,
    		Parent_Content_Id : record.data.MeasureProjectId,
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnAdd_btn_LegacyTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('Overlay_Legacy')){
			Ext.getCmp('Overlay_Legacy').destroy();
		}
		var ol_legacy = Ext.Viewport.add(Ext.create('HelcPDA.view.maintain.Overlay_Legacy'));
		ol_legacy.show();
    },
    
    OnS_btn_LegacyTap : function(thisObj,e,eOpts){
    	var v_Value = Ext.getCmp('S_Value').getValue();
    	
    	if(v_Value == ''){
    		Ext.Msg.alert('温馨提示','请先输入查找条件！');
    		return;
    	}
    	
    	var getResult = function(res){
    		var resp = res.ProjectNoQuery_Output;
    		var v_data = [];
    		if(resp.NumOutputObjects > 0){
    			if(resp.NumOutputObjects > 100){
    				Ext.Msg.alert('温馨提示','查找到的数据过多（超过100条），<br>请改变查找的关键字！');
    				return;
    			}else{
    				var respo = resp.ListOfHelPdaMaintainingPlanProjectnoPicklistIo.HelMaintainPlanContents;
    				if(respo.length){
    					for(var i = 0;i < respo.length;i++){
    						v_data.push({
    							text:respo[i].ContentProjectTaskNo+'/'+respo[i].ContentName,
    							value:respo[i].Id,
    							ContentProjectTaskNo:respo[i].ContentProjectTaskNo,
    							ContentName:respo[i].ContentName,
    							ContentOperateStandard:respo[i].ContentOperateStandard,
    						})
    					}
    				}else{
    					v_data.push({
							text:respo.ContentProjectTaskNo+'/'+respo.ContentName,
							value:respo.Id,
							ContentProjectTaskNo:respo.ContentProjectTaskNo,
							ContentName:respo.ContentName,
							ContentOperateStandard:respo.ContentOperateStandard,
						})
    				}
    				v_data.sort(function(a,b){
    					return a.ContentProjectTaskNo > b.ContentProjectTaskNo?1:-1;
    				});
    			}
    			v_data.unshift({text:'请选择',value:'',ContentName:'',ContentOperateStandard:''});
    		}else{
    			v_data.unshift({text:'无可用项目',value:'',ContentName:'',ContentOperateStandard:''});
    		}
    		Ext.getCmp('T_ContentProjectTaskNo').setValue('');
    		Ext.getCmp('T_ContentProjectTaskNo').setOptions(v_data);
    		Ext.getCmp('T_ContentProjectTaskNo').focus();
    	}

    	var parameters = {
    		procedure : 'ProjectNoQuery',
    		isLoading : true,
    		Content_Value : v_Value.toUpperCase(),
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnT_ContentProjectTaskNoChange : function(thisObj,newValue,oldValue,eOpts){
    	if(thisObj._options){
    		for(var i = 0;i < thisObj._options.length;i++){
        		if(thisObj._options[i].value == newValue){
        			Ext.getCmp('T_ContentName').setValue(thisObj._options[i].ContentName);
        			Ext.getCmp('T_ContentOperateStandard').setValue(thisObj._options[i].ContentOperateStandard);
        		}
        	}
    	}
    },
    
    OnSave_btn_OL_LegacyTap : function(thisObj,e,eOpts){
    	var v_ContentProjectTaskNo = Ext.getCmp('T_ContentProjectTaskNo').getValue();
    	console.log('项目号:'+v_ContentProjectTaskNo);
    	if(v_ContentProjectTaskNo == '' || v_ContentProjectTaskNo == null){
    		Ext.Msg.alert('温馨提示','请选择项目号！');
    		return;
    	}
    	var v_MeasureLegacyOverproofReason = Ext.getCmp('T_MeasureLegacyOverproofReason').getValue();
    	if(v_MeasureLegacyOverproofReason == ''){
    		Ext.Msg.alert('温馨提示','请录入超差原因！');
    		return;
    	}
    	var v_MeasureLegacySpotSituation = Ext.getCmp('T_MeasureLegacySpotSituation').getValue();
    	if(v_MeasureLegacySpotSituation == ''){
    		Ext.Msg.alert('温馨提示','请录入现场情况！');
    		return;
    	}
    	var v_Id = Ext.getCmp('H_MeasureItemId').getValue();
    	
    	var getResult = function(res){
    		var resp = res.LegacyUpsert_Output;
    		if(resp.ListOfHelPdaMaintainingPlanMeasureLegacyListIOWithParent){
    			Ext.toast('保存成功！',2000);
    			Ext.getCmp('Overlay_Legacy').hide();
    			
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
    				Measure_Legacy_ParId : v_Id,
    			};
    								
    			MainCtr.getDataFromServer(getResult_1,parameters_1);
    		}else{
    			Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！')
    		}
    	}

    	var parameters = {
    		procedure : 'LegacyUpsert',
    		isLoading : true,
    		Id : v_Id,
    		MeasureLegacyParId : v_Id,
    		MeasureLegacyProjectItemId : v_ContentProjectTaskNo,
    		MeasureLegacySpotSituation : v_MeasureLegacySpotSituation,
    		MeasureLegacyOverproofReason : v_MeasureLegacyOverproofReason,
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnL_LegacyListItemtap : function(thisObj,index,target,record,e,eOpts){
    	if(Ext.getCmp("PLAN_STATUS").getValue() == '已完成')return;
    	if(Ext.getCmp('Overlay_Legacy')){
			Ext.getCmp('Overlay_Legacy').destroy();
		}
		
		var getResult = function(res){
    		var resp = res.ProjectNoQuery_Output;
    		var v_data = [];
    		if(resp.NumOutputObjects > 0){
    			var respo = resp.ListOfHelPdaMaintainingPlanProjectnoPicklistIo.HelMaintainPlanContents;
    			v_data.push({
					text:respo.ContentProjectTaskNo+'/'+respo.ContentName,
					value:respo.Id,
					ContentProjectTaskNo:respo.ContentProjectTaskNo,
					ContentName:respo.ContentName,
					ContentOperateStandard:respo.ContentOperateStandard,
				})
				
				var ol_legacy = Ext.Viewport.add(Ext.create('HelcPDA.view.maintain.Overlay_Legacy'));
    			ol_legacy.show();
    			
    			Ext.getCmp('T_ContentProjectTaskNo').setOptions(v_data);
    			Ext.getCmp('T_MeasureLegacySpotSituation').setValue(record.data.MeasureLegacySpotSituation);
    			Ext.getCmp('T_MeasureLegacyOverproofReason').setValue(record.data.MeasureLegacyOverproofReason);
    		}
    	}

    	var parameters = {
    		procedure : 'ProjectNoQuery',
    		isLoading : true,
    		Content_Value : record.data.MeasureLegacyProjectNo.toUpperCase(),
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
});
