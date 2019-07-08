Ext.define('HelcPDA.controller.maintain.New_MeasureRecordCtrl', {
    extend: 'HelcPDA.controller.ApplicationController',
    
    config: {
        control: {
        	"button#btn_New_MeasureRecord": {
        		tap: 'Onbtn_New_MeasureRecordTap'
        	},
        	"list#L_New_MeasureRecord":{
        		itemtap:'OnL_New_MeasureRecordItemtap'
        	},
        	"button#CC_btn_OL_New_MeasureRecord": {
        		tap: 'OnCC_btn_OL_New_MeasureRecordTap'
        	},
        	"button#Save_btn_OL_New_MeasureRecord": {
        		tap: 'OnSave_btn_OL_New_MeasureRecordTap'
        	},
        	"button#Save_btn_New_MeasureRecord": {
        		tap: 'OnSave_btn_New_MeasureRecordTap'
        	},
        	"button#btn_New_MeasureRecord_Camera": {
        		tap: 'Onbtn_New_MeasureRecord_PhotoTap'
        	},
        	"button#btn_New_MeasureRecord_Album": {
        		tap: 'Onbtn_New_MeasureRecord_PhotoTap'
        	},
        	"button#Back_btn_PhotoView": {
        		tap: 'OnBack_btn_PhotoViewTap'
        	},
        	"button#Save_btn_PhotoView": {
        		tap: 'OnSave_btn_PhotoViewTap'
        	},
        	"dataview#DV_New_MeasureRecord_Attachment": {
        		itemtap: 'OnDV_New_MeasureRecord_AttachmentItemtap'
        	},
        	"button#Del_btn_PhotoView": {
        		tap: 'OnDel_btn_PhotoViewTap'
        	},
        	"tabpanel#New_MeasureRecord":{
        		activeitemchange:'OnNew_MeasureRecordItemchange'
        	},
        	"button#SaveNext_btn_New_MeasureRecord":{
        		tap: 'OnSaveNext_btn_New_MeasureRecordTap'
        	},
        	"dataview#DV_New_MeasureRecord_Att": {
        		itemtap: 'OnDV_New_MeasureRecord_AttItemtap'
        	},
        }
    },
    
    OnDV_New_MeasureRecord_AttItemtap : function(thisObj,index,target,record,e,eOpts){
    	this.NextView('New_InstructionBook_PhotoView','HelcPDA.view.maintain.New_InstructionBook_PhotoView');
		Ext.getCmp('Con_New_InstructionBook_PhotoView').setHtml('<img style="width:100%" src="data:'+record.data.RecFileExt+'/png;base64,'+record.data.RecFileBuffer.CDATA+'">');
    },
    
    OnSaveNext_btn_New_MeasureRecordTap : function(thisObj,e,eOpts){
    	var v_MeasureItemPreWork = Ext.getCmp('D_MeasureItemPreWork').getValue();
    	var v_MeasureItemPostWork = Ext.getCmp('D_MeasureItemPostWork').getValue();
    	var v_Id = Ext.getCmp('H_MeasureRecord_Id').getValue();
    	var v_IsRequired = Ext.getCmp('H_MeasureItemIFRequired').getValue();
    	var v_Index = Number(Ext.getCmp('H_MeasureRecordIndex').getValue())+1;
    	
    	if(v_IsRequired == 'Y'){
    		if(v_MeasureItemPreWork == '' && v_MeasureItemPostWork == ''){
        		Ext.Msg.alert('温馨提示','请选择作业前/判断或作业后的选项！');
        		return;
        	}
//        	if(v_MeasureItemPostWork == ''){
//        		Ext.Msg.alert('温馨提示','请选择作业后的选项！');
//        		return;
//        	}
    	}
    	
    	var getResult = function(res){
    		var resp = res.ItemListSynchronize_Output;
    		if(resp){
    			Ext.toast('保存成功！',2000);
//    			MainCtr.BackView();
    			var tmpRecord = Ext.getCmp('L_New_MeasureItem').getStore().getAt(Number(Ext.getCmp('H_MeasureRecordIndex').getValue()));
    			if(Ext.getCmp('D_MeasureItemPreWork').getValue() != ''){
    				tmpRecord.set('MeasureItemPreWork',Ext.getCmp('D_MeasureItemPreWork').getRecord().get('text'));
    				tmpRecord.set('MeasureItemPreWorkId',Ext.getCmp('D_MeasureItemPreWork').getValue());
    			}
    			if(Ext.getCmp('D_MeasureItemPostWork').getValue() != ''){
    				tmpRecord.set('MeasureItemPostWork',Ext.getCmp('D_MeasureItemPostWork').getRecord().get('text'));
    				tmpRecord.set('MeasureItemPostWorkId',Ext.getCmp('D_MeasureItemPostWork').getValue());
    			}
    			var record = Ext.getCmp('L_New_MeasureItem').getStore().getAt(v_Index);
//    			console.log(record);
    			if(!record){
    				Ext.Msg.alert('温馨提示','已经是最后一项作业内容！');
            		return;
    			}
    			var getResult_1 = function(res){//获取作业前选项
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
    	    		
    	    		var getResult_2 = function(res){//获取作业后选项
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
    	    			
    	    			Ext.getCmp('D_MeasureItemPreWork').setOptions(v_predata);
    	    			Ext.getCmp('D_MeasureItemPostWork').setOptions(v_postdata);
    	    			Ext.getCmp('D_MeasureItemPreWork').setValue(record.data.MeasureItemPreWorkId);
    	    			Ext.getCmp('D_MeasureItemPostWork').setValue(record.data.MeasureItemPostWorkId);
    	    			if(record.data.MeasureItemIFRequired == 'Y'){
    	    				Ext.getCmp('D_MeasureItemPreWork').setLabel('作业前/判断<font color=\'red\'>*</font>');
    	    				Ext.getCmp('D_MeasureItemPostWork').setLabel('作业后<font color=\'red\'>*</font>');
    	    			}else{
    	    				Ext.getCmp('D_MeasureItemPreWork').setLabel('作业前/判断');
    	    				Ext.getCmp('D_MeasureItemPostWork').setLabel('作业后');
    	    			}
    	    			Ext.getCmp('D_MeasureItemMaxValue').setValue(record.data.MeasureItemMaxValue);
    	    			Ext.getCmp('D_MeasureItemMinValue').setValue(record.data.MeasureItemMinValue);
    	    			Ext.getCmp('D_MeasureItemStandard').setValue(record.data.MeasureItemStandard);
    	    			Ext.getCmp('H_MeasureRecord_Id').setValue(record.data.Id);
    	    			Ext.getCmp('H_MeasureRecordAtt_Id').setValue(record.data.MeasureProjectId);
    	    			Ext.getCmp('H_MeasureItemIFRequired').setValue(record.data.MeasureItemIFRequired);
    	    			Ext.getCmp('H_MeasureRecordIndex').setValue(v_Index);
    	    			
    	    			
    	    			
    	    			if(Ext.getCmp('PLAN_STATUS').getValue() == '已完成'){
    	    				Ext.getCmp('FS_New_MeasureRecord').setDisabled(true);
    	    				Ext.getCmp('Save_btn_New_MeasureRecord').setHidden(true);
    	    				Ext.getCmp('btn_New_MeasureRecord_Camera').setHidden(true);
    	    				Ext.getCmp('btn_New_MeasureRecord_Album').setHidden(true);
    	    			}
    	    			
    	    			if(record.data.MeasureRecordIFExistsFlag != 'Y'){
    	    				Ext.getCmp('New_MeasureRecord').getTabBar().items.getAt(2).setHidden(true);
    	    			}else{
    	    				Ext.getCmp('New_MeasureRecord').getTabBar().items.getAt(2).setHidden(false);
    	    				Ext.getCmp('H_tab_MeasureRecordItem').setValue('');
    	    				Ext.getCmp('L_New_MeasureRecord').getStore().setData([]);
    	    			}
    	    			if(record.data.MeasureItemIFPhoto != 'Y'){
    	    				Ext.getCmp('New_MeasureRecord').getTabBar().items.getAt(3).setHidden(true);
    	    			}else{
    	    				Ext.getCmp('New_MeasureRecord').getTabBar().items.getAt(3).setHidden(false);
    	    				Ext.getCmp('H_tab_MeasureRecordAttachment').setValue('');
    	    				Ext.getCmp('DV_New_MeasureRecord_Attachment').getStore().setData([]);
    	    			}
    	    			Ext.getCmp('H_tab_MeasureRecordAtt').setValue('');
	    				Ext.getCmp('DV_New_MeasureRecord_Att').getStore().setData([]);
    	    		}
    	    		
    	    		var parameters_2 = {
    	    			procedure : 'PostWorkQuery',
    	    			isLoading : true,
    	    			Parent_Content_Id : record.data.MeasureProjectId,
    	    		};
    	    	    						
    	    		MainCtr.getDataFromServer(getResult_2,parameters_2);
    	    	}

    	    	var parameters_1 = {
    	    		procedure : 'PreWorkQuery',
    	    		isLoading : true,
    	    		Parent_Content_Id : record.data.MeasureProjectId,
    	    	};
    	    						
    	    	MainCtr.getDataFromServer(getResult_1,parameters_1);
    		}else{
    			Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		}
    	}

    	var parameters = {
    		procedure : 'ItemListSynchronize',
    		isLoading : true,
    		Id : v_Id,
    		MeasureItemPostWorkId : v_MeasureItemPostWork,
    		MeasureItemPreWorkId : v_MeasureItemPreWork
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnNew_MeasureRecordItemchange : function(thisObj,value,oldValue,eOpts){
//    	console.log('---OnNew_MeasureRecordItemchange');
//    	console.log(value.id);
//    	console.log(oldValue);
    	if(value.id == 'tab_MeasureRecordItem' && Ext.getCmp('H_tab_MeasureRecordItem').getValue() == ''){
    		var getResult = function(res){//获取录值项目列表
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
				Ext.getCmp('H_tab_MeasureRecordItem').setValue('Y');
			}

			var parameters = {
				procedure : 'RecordQuery',
				isLoading : true,
				Parent_Item_Id : Ext.getCmp('H_MeasureRecord_Id').getValue(),
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
    	}
    	
    	if(value.id == 'tab_MeasureRecordAttachment' && Ext.getCmp('H_tab_MeasureRecordAttachment').getValue() == ''){
    		var getResult = function(res){//获取附件列表
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
				Ext.getCmp('H_tab_MeasureRecordAttachment').setValue('Y');
			}

			var parameters = {
				procedure : 'AttachmentQuery',
				isLoading : true,
				MeasureItemParId : Ext.getCmp('H_MeasureRecord_Id').getValue(),
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
    	}
    	
    	if(value.id == 'tab_MeasureRecordAtt' && Ext.getCmp('H_tab_MeasureRecordAtt').getValue() == ''){
    		var getResult = function(res){//获取示意图附件列表
				var resp = res.ContentAttQuery_Output;
				var v_data = [];
				
				if(resp.NumOutputObjects > 0){
					var respo = resp.ListOfHelPdaMaintainingPlanContentAttachmentListIo.ListOfHelMaintainPlanContentAttachment.HelMaintainPlanContentAttachment;
					if(respo.length){
						for(var i = 0;i < respo.length;i++){
							v_data.push({
								MPContentId:respo[i].Id,
								RecFileBuffer:respo[i].RecFileBuffer,
								RecFileExt:respo[i].RecFileExt,
								RecFileName:respo[i].RecFileName,
							})
						}
					}else{
						v_data.push({
							MPContentId:respo.Id,
							RecFileBuffer:respo.RecFileBuffer,
							RecFileExt:respo.RecFileExt,
							RecFileName:respo.RecFileName,
						})
					}
				}
				
				Ext.getCmp('DV_New_MeasureRecord_Att').setData(v_data);
				Ext.getCmp('H_tab_MeasureRecordAtt').setValue('Y');
			}

			var parameters = {
				procedure : 'ContentAttQuery',
				isLoading : true,
				MPContent_Id : Ext.getCmp('H_MeasureRecordAtt_Id').getValue(),
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
    	}
    },
    
    Onbtn_New_MeasureRecordTap : function(thisObj,e,eOpts){
    	MainCtr.BackView();
    	/*屏蔽询问是否保存作业内容
    	if(Ext.getCmp('PLAN_STATUS').getValue() == '已完成'){
    		MainCtr.BackView();
    		return;
    	}
    	Ext.Msg.show({
    		title: '温馨提示',
    		message: '是否需要保存作业内容？',
    		buttons:[{text:'不了',itemId:'no'},{text:'保存',itemId:'yes'}],
    		fn:function(buttonId){
    			if(buttonId == 'yes'){
    				var v_MeasureItemPreWork = Ext.getCmp('D_MeasureItemPreWork').getValue();
    		    	var v_MeasureItemPostWork = Ext.getCmp('D_MeasureItemPostWork').getValue();
    		    	var v_Id = Ext.getCmp('H_MeasureRecord_Id').getValue();
    		    	var v_IsRequired = Ext.getCmp('H_MeasureItemIFRequired').getValue();
    	
    				if(v_IsRequired == 'Y'){
	    		    	if(v_MeasureItemPreWork == '' && v_MeasureItemPostWork == ''){
			        		Ext.Msg.alert('温馨提示','请选择作业前或作业后的选项！');
			        		return;
			        	}
	    		    	if(v_MeasureItemPostWork == ''){
	    		    		Ext.Msg.alert('温馨提示','请选择作业后的选项！');
	    		    		return;
	    		    	}
    		    	}
    		    	
    		    	var getResult = function(res){
    		    		var resp = res.ItemListSynchronize_Output;
    		    		if(resp){
    		    			Ext.toast('保存成功！',2000);
    		    			var tmpRecord = Ext.getCmp('L_New_MeasureItem').getStore().getAt(Number(Ext.getCmp('H_MeasureRecordIndex').getValue()));
			    			if(Ext.getCmp('D_MeasureItemPreWork').getValue() != ''){
			    				tmpRecord.set('MeasureItemPreWork',Ext.getCmp('D_MeasureItemPreWork').getRecord().get('text'));
			    				tmpRecord.set('MeasureItemPreWorkId',Ext.getCmp('D_MeasureItemPreWork').getValue());
			    			}
			    			if(Ext.getCmp('D_MeasureItemPostWork').getValue() != ''){
			    				tmpRecord.set('MeasureItemPostWork',Ext.getCmp('D_MeasureItemPostWork').getRecord().get('text'));
			    				tmpRecord.set('MeasureItemPostWorkId',Ext.getCmp('D_MeasureItemPostWork').getValue());
			    			}
    		    			MainCtr.BackView();
    		    		}else{
    		    			Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		    		}
    		    	}

    		    	var parameters = {
    		    		procedure : 'ItemListSynchronize',
    		    		isLoading : true,
    		    		Id : v_Id,
    		    		MeasureItemPostWorkId : v_MeasureItemPostWork,
    		    		MeasureItemPreWorkId : v_MeasureItemPreWork
    		    	};
    		    						
    		    	MainCtr.getDataFromServer(getResult,parameters);
    			}
    			if(buttonId == 'no'){
    				MainCtr.BackView();
    			}
    		}
    	});
    	*/
    },
    
    OnL_New_MeasureRecordItemtap : function(thisObj,index,target,record,e,eOpts){
    	console.log(record);
    	if(Ext.getCmp('PLAN_STATUS').getValue() == '已完成')return;
		if(Ext.getCmp('Overlay_New_MeasureRecord')){
			Ext.getCmp('Overlay_New_MeasureRecord').destroy();
		}
		var ol_new_measurerecord = Ext.Viewport.add(Ext.create('HelcPDA.view.maintain.Overlay_New_MeasureRecord'));
		ol_new_measurerecord.show();
		Ext.getCmp('H_Index').setValue(index);
		Ext.getCmp('H_Id').setValue(record.data.Id);
		Ext.getCmp('H_ParentItemId').setValue(record.data.ParentItemId);
		Ext.getCmp('D_MeasureRecordItemContent').setValue(record.data.MeasureRecordItemContent);
		Ext.getCmp('D_MeasureRecordDescription').setValue(record.data.MeasureRecordDescription);
		Ext.getCmp('D_MeasureRecordContent').setValue(record.data.MeasureRecordContent);
		Ext.getCmp('D_OL_MeasureItemMaxValue').setValue(Ext.getCmp('D_MeasureItemMaxValue').getValue());
		Ext.getCmp('D_OL_MeasureItemMinValue').setValue(Ext.getCmp('D_MeasureItemMinValue').getValue());
		Ext.getCmp('T_MeasureRecordValue').setValue(record.data.MeasureRecordValue);
    },
    
    OnCC_btn_OL_New_MeasureRecordTap : function(thisObj,e,eOpts){
    	Ext.getCmp('Overlay_New_MeasureRecord').hide();
    },
    
    OnSave_btn_OL_New_MeasureRecordTap : function(thisObj,e,eOpts){
    	var v_Index = Ext.getCmp('H_Index').getValue();
    	var v_Id = Ext.getCmp('H_Id').getValue();
    	var v_ParentItemId = Ext.getCmp('H_ParentItemId').getValue();
    	var v_MeasureRecordValue = Ext.getCmp('T_MeasureRecordValue').getValue();

    	if(v_MeasureRecordValue == ''){
    		Ext.Msg.alert('温馨提示','请填写录入值！');
    		Ext.getCmp('T_MeasureRecordValue').focus();
    		return;
    	}
    	
    	var getResult = function(res){
    		var resp = res.RecordSynchronize_Output;
    		if(resp){
    			Ext.getCmp('L_New_MeasureRecord').getStore().getAt(v_Index).set('MeasureRecordValue',v_MeasureRecordValue);
    			Ext.toast('保存成功！',2000);
    			Ext.getCmp('Overlay_New_MeasureRecord').hide();
    		}else{
    			Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		}
    	}

    	var parameters = {
    		procedure : 'RecordSynchronize',
    		isLoading : true,
    		Id : v_Id,
    		MeasureRecordValue : v_MeasureRecordValue,
    		ParentItemId : v_ParentItemId
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnSave_btn_New_MeasureRecordTap : function(thisObj,e,eOpts){
    	var v_MeasureItemPreWork = Ext.getCmp('D_MeasureItemPreWork').getValue();
    	var v_MeasureItemPostWork = Ext.getCmp('D_MeasureItemPostWork').getValue();
    	var v_Id = Ext.getCmp('H_MeasureRecord_Id').getValue();
    	var v_IsRequired = Ext.getCmp('H_MeasureItemIFRequired').getValue();
    	
    	if(v_IsRequired == 'Y'){
    		if(v_MeasureItemPreWork == '' && v_MeasureItemPostWork == ''){
        		Ext.Msg.alert('温馨提示','请选择作业前/判断或作业后的选项！');
        		return;
        	}
//        	if(v_MeasureItemPostWork == ''){
//        		Ext.Msg.alert('温馨提示','请选择作业后的选项！');
//        		return;
//        	}
    	}
    	
    	var getResult = function(res){
    		var resp = res.ItemListSynchronize_Output;
    		if(resp){
    			Ext.toast('保存成功！',2000);
    			var tmpRecord = Ext.getCmp('L_New_MeasureItem').getStore().getAt(Number(Ext.getCmp('H_MeasureRecordIndex').getValue()));
//    			if(Ext.getCmp('D_MeasureItemPreWork').getValue() != ''){
    			tmpRecord.set('MeasureItemPreWork',Ext.getCmp('D_MeasureItemPreWork').getValue() == ''?'':Ext.getCmp('D_MeasureItemPreWork').getRecord().get('text'));
    			tmpRecord.set('MeasureItemPreWorkId',Ext.getCmp('D_MeasureItemPreWork').getValue());
//    			}
//    			if(Ext.getCmp('D_MeasureItemPostWork').getValue() != ''){
    			tmpRecord.set('MeasureItemPostWork',Ext.getCmp('D_MeasureItemPostWork').getValue() == ''?'':Ext.getCmp('D_MeasureItemPostWork').getRecord().get('text'));
    			tmpRecord.set('MeasureItemPostWorkId',Ext.getCmp('D_MeasureItemPostWork').getValue());
//    			}
    			MainCtr.BackView();
    		}else{
    			Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		}
    	}

    	var parameters = {
    		procedure : 'ItemListSynchronize',
    		isLoading : true,
    		Id : v_Id,
    		MeasureItemPostWorkId : v_MeasureItemPostWork,
    		MeasureItemPreWorkId : v_MeasureItemPreWork
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_New_MeasureRecord_PhotoTap : function(thisObj,e,eOpts){
    	var v_source = thisObj.id == 'btn_New_MeasureRecord_Camera'?'CAMEAR':'ALBUM';
    	var parm = {
    		callback : function(filename){
    			if(filename != ''){
    				this.NextView('PhotoView','HelcPDA.view.maintain.PhotoView');
    				Ext.getCmp('H_Filename').setValue(filename);
    				Ext.getCmp('Con_PhotoView').setHtml('<img style="width:100%" src="data:image/png;base64,'+filename+'">');
    			}
    		},
    		source : v_source,
    		direction : 'BACK',
    	};
    	phone.takePhoto(parm);
    },
    
    OnBack_btn_PhotoViewTap : function(thisObj,e,eOpts){
    	MainCtr.BackView();
    },
    
    OnSave_btn_PhotoViewTap : function(thisObj,e,eOpts){
    	var v_MeasureItemAttachFileName = Ext.getCmp('T_MeasureItemAttachFileName').getValue();
    	if(v_MeasureItemAttachFileName == ''){
    		Ext.Msg.alert('温馨提示','请输入名称！');
    		return;
    	}
    	var v_MeasureItemAttachComments = Ext.getCmp('T_MeasureItemAttachComments').getValue();
    	var v_filename = Ext.getCmp('H_Filename').getValue();
    	
    	var getResult = function(res){
    		var resp = res.AttachmentSynchronize_Output;
    		if(resp){
    			Ext.toast('保存成功！',2000);
    			MainCtr.BackView();
    			Ext.getCmp('DV_New_MeasureRecord_Attachment').getStore().setData([]);
    			var getResult_1 = function(res){
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
    				
    				Ext.getCmp('DV_New_MeasureRecord_Attachment').getStore().setData(v_data);
    			}

    			var parameters_1 = {
    				procedure : 'AttachmentQuery',
    				isLoading : true,
    				MeasureItemParId : Ext.getCmp('H_MeasureRecord_Id').getValue(),
    			};
    								
    			MainCtr.getDataFromServer(getResult_1,parameters_1);
    		}else{
    			Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		}
    	}

    	var parameters = {
    		procedure : 'AttachmentSynchronize',
    		isLoading : true,
    		MeasureItemParId : Ext.getCmp('H_MeasureRecord_Id').getValue(),
    		MeasureItemAttachComments : v_MeasureItemAttachComments,
    		MeasureItemAttachFileExt : 'png',
    		MeasureItemAttachFileName : v_MeasureItemAttachFileName,
    		MeasureItemAttachFileBuffer : v_filename,
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnDV_New_MeasureRecord_AttachmentItemtap : function(thisObj,index,target,record,e,eOpts){
    	this.NextView('PhotoView','HelcPDA.view.maintain.PhotoView');
    	Ext.getCmp('H_AttachFile_Index').setValue(index);
    	Ext.getCmp('H_AttachFile_Id').setValue(record.data.Id);
    	Ext.getCmp('T_MeasureItemAttachFileName').setValue(record.data.MeasureItemAttachFileName);
    	Ext.getCmp('T_MeasureItemAttachComments').setValue(record.data.MeasureItemAttachComments);
    	Ext.getCmp('Con_PhotoView').setHtml('<img style="width:100%" src="data:image/'+record.data.MeasureItemAttachFileExt+';base64,'+record.data.MeasureItemAttachFileBuffer.CDATA+'">');
    	if(Ext.getCmp('PLAN_STATUS').getValue() == '已完成'){
    		Ext.getCmp('T_MeasureItemAttachFileName').setDisabled(true);
    		Ext.getCmp('T_MeasureItemAttachComments').setDisabled(true);
    		Ext.getCmp('Save_btn_PhotoView').setHidden(true);
    		Ext.getCmp('Del_btn_PhotoView').setHidden(true);
    	}else{
    		Ext.getCmp('Del_btn_PhotoView').setHidden(false);
    	}
    },
    
    OnDel_btn_PhotoViewTap : function(thisObj,e,eOpts){
    	var v_PrimaryRowId = Ext.getCmp('H_AttachFile_Id').getValue();
    	var v_Index = Ext.getCmp('H_AttachFile_Index').getValue();
    	Ext.Msg.show({
    		title: '温馨提示',
    		message: '是否删除此图片？',
    		buttons:[{text:'不了',itemId:'no'},{text:'删除',itemId:'yes'}],
    		fn:function(buttonId){
    			if(buttonId == 'yes'){
    				var getResult = function(res){
    		    		var resp = res.AttachmentDelete_Output;
    		    		if(resp.ErrorCode == 0){
    		    			Ext.toast('删除成功！',2000);
    		    			Ext.getCmp('DV_New_MeasureRecord_Attachment').getStore().removeAt(v_Index);
    		    			MainCtr.BackView();
    		    		}else{
    		    			Ext.Msg.alert('温馨提示','删除失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		    		}
    		    	}

    		    	var parameters = {
    		    		procedure : 'AttachmentDelete',
    		    		isLoading : true,
    		    		PrimaryRowId : v_PrimaryRowId,
    		    	};
    		    						
    		    	MainCtr.getDataFromServer(getResult,parameters);
    			}
    		}
    	});
    },
    
    
});
