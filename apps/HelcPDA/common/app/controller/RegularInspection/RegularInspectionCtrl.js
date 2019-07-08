Ext.define('HelcPDA.controller.RegularInspection.RegularInspectionCtrl', {
    extend: 'HelcPDA.controller.ApplicationController',
    
    config: {
        control: {
        	"button#btn_RI_MainList_back": {
        		tap: 'Onbtn_RI_MainList_backTap'
        	},
        	"button#btn_RIM_back": {
        		tap: 'Onbtn_RIM_backTap'
        	},
        	"button#btn_RI_ItemList_back": {
        		tap: 'Onbtn_backTap'
        	},
        	"button#btn_RI_Item_back": {
        		tap: 'Onbtn_RI_Item_backTap'
        	},
        	"button#btn_RI_PhotoView_back": {
        		tap: 'Onbtn_RI_PhotoView_backTap'
        	},
        	"button#btn_RI_MainList_add": {
        		tap: 'Onbtn_RI_MainList_addTap'
        	},
        	"button#btn_RI_MainList_search": {
        		tap: 'Onbtn_RI_MainList_searchTap'
        	},
        	"button#btn_Overlay_RI_SearchElevatorNo_cancel": {
        		tap: 'Onbtn_Overlay_RI_SearchElevatorNo_cancelTap'
        	},
        	"button#btn_Overlay_RI_SearchElevatorNo_search": {
        		tap: 'Onbtn_Overlay_RI_SearchElevatorNo_searchTap'
        	},
        	"button#btn_Overlay_RI_SearchElevatorNo_selected": {
        		tap: 'Onbtn_Overlay_RI_SearchElevatorNo_selectedTap'
        	},
        	"button#btn_RIM_QCEngineer_search": {
        		tap: 'Onbtn_RIM_QCEngineer_searchTap'
        	},
        	"button#btn_RIM_save": {
        		tap: 'Onbtn_RIM_saveTap'
        	},
        	"button#btn_RIM_submit": {
        		tap: 'Onbtn_RIM_submitTap'
        	},
        	"button#btn_Overlay_RI_SearchPerson_cancel": {
        		tap: 'Onbtn_Overlay_RI_SearchPerson_cancelTap'
        	},
        	"button#btn_Overlay_RI_SearchPerson_search": {
        		tap: 'Onbtn_Overlay_RI_SearchPerson_searchTap'
        	},
        	"button#btn_Overlay_RI_SearchPerson_selected": {
        		tap: 'Onbtn_Overlay_RI_SearchPerson_selectedTap'
        	},
        	"button#btn_Ol_RIS_cancel": {
        		tap: 'Onbtn_Ol_RIS_cancelTap'
        	},
        	"button#btn_Ol_RIS_search": {
        		tap: 'Onbtn_Ol_RIS_searchTap'
        	},
        	"tabpanel#RI_Main":{
        		activeitemchange:'OnRI_MainItemchange'
        	},
        	"tabpanel#RI_Item":{
        		activeitemchange:'OnRI_ItemItemchange'
        	},
        	"list#L_RI_Main":{
        		itemtap:'OnL_RI_MainItemtap'
        	},
        	"list#L_RI_MainList":{
        		itemtap:'OnL_RI_MainListItemtap'
        	},
        	"list#L_RI_ItemList":{
        		itemtap:'OnL_RI_ItemListItemtap'
        	},
        	"dataview#DV_RI_Item": {
        		itemtap: 'OnDV_RI_ItemItemtap'
        	},
        	"button#btn_RI_Item_camera": {
        		tap: 'Onbtn_RI_Item_PhotoTap'
        	},
        	"button#btn_RI_Item_album": {
        		tap: 'Onbtn_RI_Item_PhotoTap'
        	},
        	"button#btn_RI_Item_save": {
        		tap: 'Onbtn_RI_Item_saveTap'
        	},
        	"button#btn_RI_PhotoView_save": {
        		tap: 'Onbtn_RI_PhotoView_saveTap'
        	},
        	"button#btn_RI_PhotoView_delete": {
        		tap: 'Onbtn_RI_PhotoView_deleteTap'
        	},
        	"container#RI_MainList":{
        		initialize : 'OnRI_MainListInit',
        	},
        }
    },
    
    OnRI_MainListInit : function(thisObj, eOpts){
    	//列表增加左滑显示按钮 开始 czq
    	Ext.getCmp('L_RI_MainList').setPlugins(
                [
                    {
                        xclass: 'plugin.SlideActions',
                        openPosition: 65,
                        buttons:[
                             {
                                xtype: 'button',
                                baseCls: 'x-button helcpda-list-button helcpda-bgColor-red',
                                text: '删除',
                                initial:function(button) {
                                	if(button.record.data.PDASubmittedFlag == 'Y'){
                                		if(button.setHidden){
                                			button.setHidden(true);
                                		}else{
                                			button.hidden = true;
                                		}
                                	}else{
                                		if(button.setHidden){
                                			button.setHidden(false);
                                		}else{
                                			button.hidden = false;
                                		}
                                	}
                                },
                                listeners: {
                                    tap: function(button, e){
                                        e.stopPropagation();
                                        return false;
                                    },
                                    scope: this
                                },
                                handler: function(button, e) {
                                    Ext.getCmp('L_RI_MainList').fireEvent('hide');
//                                    console.log(button.getRecord());
                                    var getResult = function(res){
                                    	var resp = res.DeleteCheckHeader_Output;
                                    	if(resp.SiebelStatus == 'N'){
                                    		Ext.Msg.alert('温馨提示',resp.SiebelMessage+'<br>删除失败，请刷新数据后重试！<br>如重试不成功请联系管理员！');
                                    	}else{
                                    		Ext.toast('删除成功！',2000);
                                    		Ext.getCmp('L_RI_MainList').getStore().remove(button.getRecord());
                                    	}
                                    }
                                    
                                    var parameters = {
                                		adapter   : 'HttpAdapter_RegularInspection',
                                		procedure : 'DeleteCheckHeader',
                                    	isLoading : true,
                                    	ChkElevatorId	:	button.getRecord().data.Id,
                                    };
                                    						
                                    MainCtr.getDataFromServer(getResult,parameters);
                                }
                            }
                        ]
                    }
                ]
            );
    	
    	var getResult = function(res){
    		var resp = res.QueryCheckHeaderAndLineRange_Output;
    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
    			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
    			var v_data = [];
    			if(respo.length){
    				for(var i = 0;i < respo.length;i++){
    					if(respo[i].PDASubmittedFlag == 'N'){
    						v_data.push(respo[i]);
    					}
        			}
    			}else{
    				if(respo.PDASubmittedFlag == 'N'){
						v_data.push(respo);
					}
    			}
    			
    			Ext.getCmp('L_RI_MainList').getStore().setData(v_data);
    			Ext.toast('缺省显示三个月内未提交的数据，可选择其他条件查找！',2000);
//    			Ext.getCmp('Overlay_RI_SearchList').hide();
    		}else{
    			Ext.toast('三个月内没有未提交的数据，可选择其他条件查找！',3000);
//    			Ext.Msg.alert('温馨提示','没有符合条件的数据！');
    		}
    	}
    	
    	var parameters = {
    		adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'QueryCheckHeaderAndLineRange',
        	isLoading : true,
        	PDAPersonId		:	person_id,
        	QCEngineer    	:	'',
        	AssetDomainName	:	'',
        	Status			:	'',
        	AssetNumber		:	'',
        	Created			:	Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -3),'m/d/Y'),
        };
        						
        MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_RI_PhotoView_deleteTap : function(thisObj,e,eOpts){
    	var v_Id = Ext.getCmp('H_AttachFile_Id').getValue();
    	var v_Index = Ext.getCmp('H_AttachFile_Index').getValue();
    	Ext.Msg.show({
    		title: '温馨提示',
    		message: '是否删除此图片？',
    		buttons:[{text:'不了',itemId:'no'},{text:'删除',itemId:'yes'}],
    		fn:function(buttonId){
    			if(buttonId == 'yes'){
    				var getResult = function(res){
    		    		var resp = res.DeleteCheckAtt_Output;
    		    		if(resp.SiebelStatus == 'Y'){
    		    			Ext.toast('删除成功！',2000);
    		    			Ext.getCmp('DV_RI_Item').getStore().removeAt(v_Index);
    		    			MainCtr.BackView();
    		    		}else{
    		    			Ext.Msg.alert('温馨提示','删除失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		    		}
    		    	}

    				var parameters = {
    						adapter   : 'HttpAdapter_RegularInspection',
    			    		procedure : 'DeleteCheckAtt',
    			        	isLoading : true,
    			        	Id			:	v_Id,
    			    	};
    		    						
    		    	MainCtr.getDataFromServer(getResult,parameters);
    			}
    		}
    	});
    },
    
    OnDV_RI_ItemItemtap : function(thisObj,index,target,record,e,eOpts){
//    	console.log(record.data);
    	MainCtr.NextView('RI_PhotoView','HelcPDA.view.RegularInspection.RI_PhotoView');
    	Ext.getCmp('H_AttachFile_Index').setValue(index);
    	Ext.getCmp('H_AttachFile_Id').setValue(record.data.Id);
    	Ext.getCmp('H_RIP_Filename').setValue(record.data.FileContent);
    	Ext.getCmp('T_RIP_FileName').setValue(record.data.FileType);
    	Ext.getCmp('T_RIP_Comments').setValue(record.data.Comments);
    	Ext.getCmp('RI_Con_PhotoView').setHtml('<img style="width:100%" src="data:image/'+record.data.FileExt+';base64,'+record.data.FileContent+'">');
    	if(Ext.getCmp('H_RIM_PDASubmittedFlag').getValue() == 'Y'){
    		Ext.getCmp('T_RIP_FileName').setDisabled(true);
    		Ext.getCmp('T_RIP_Comments').setDisabled(true);
    		Ext.getCmp('btn_RI_PhotoView_save').setHidden(true);
    		Ext.getCmp('btn_RI_PhotoView_delete').setHidden(true);
    	}else{
    		Ext.getCmp('btn_RI_PhotoView_delete').setHidden(false);
    	}
    },
    
    Onbtn_RI_Item_saveTap : function(thisObj,e,eOpts){
    	var v_PoorJudgmentFlag = Ext.getCmp('T_RI_Item_PoorJudgmentFlag').getValue()?'Y':'N';
    	var v_RespType = Ext.getCmp('T_RI_Item_RespType').getValue();
    	var v_FixStatus = Ext.getCmp('T_RI_Item_FixStatus').getValue();
    	var v_FixDate = Ext.getCmp('T_RI_Item_FixDate').getValue()?Ext.Date.format(Ext.getCmp('T_RI_Item_FixDate').getValue(),'m/d/Y'):'';
//    	var v_PoorJudgmentComments = Ext.getCmp('T_RI_Item_PoorJudgmentComments').getValue();
    	var v_Comments = Ext.getCmp('T_RI_Item_Comments').getValue();
    	var v_procedure = 'InsertCheckLineAndAtt';
    	if(Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() != ''){
    		v_procedure = 'UpdateCheckLineAndAtt';
    	}
    	
    	if(v_PoorJudgmentFlag == ''){
    		Ext.Msg.alert('温馨提示','请选择是否A级不良！');
    		return;
    	}else if(v_PoorJudgmentFlag == 'N'){
    		if(v_Comments == ''){
    			Ext.Msg.alert('温馨提示','[是否A级不良]为否时,[备注说明]必需！');
        		return;
    		}
    	}
    	if(v_RespType == ''){
    		Ext.Msg.alert('温馨提示','请选择责任分类！');
    		return;
    	}
    	if(v_FixStatus == ''){
    		Ext.Msg.alert('温馨提示','请选择整改情况！');
    		return;
    	}else if(v_FixStatus != '未整改'){
    		if(v_FixDate == '' || v_FixDate == null){
        		Ext.Msg.alert('温馨提示','[整改情况]为[已整改]或[已发函]时[整改时间]必填！');
        		return;
        	}
    	}
    	
    	var getResult = function(res){
    		var resp;
    		if(Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() != ''){
    			resp = res.UpdateCheckLineAndAtt_Output;
    		}else{
    			resp = res.InsertCheckLineAndAtt_Output;
    		}
    		if(resp.SiebelStatus == 'Y'){
    			if(Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() == ''){
    				Ext.getCmp('H_RI_Item_ChkElevatorItemId').setValue(resp.ChkElevatorItemId);
    			}
    			Ext.getCmp('H_tab_RIM_Input').setValue('');
    			Ext.getCmp('H_RI_Item_SaveFlag').setValue('');
    			Ext.toast('保存数据成功！', 3000);
    		}else{
    			Ext.Msg.alert('温馨提示','保存数据失败！<br>('+resp.SiebelMessage+')');
    		}
    	}

    	var parameters = {
			adapter   : 'HttpAdapter_RegularInspection',
    		procedure : v_procedure,
        	isLoading : true,
        	ChkElevatorId		:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
        	ChkElevatorItemId	:	Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue(),
        	ChkCheckListId		:	Ext.getCmp('H_RI_Item_Id').getValue(),
        	FixStatus			:	v_FixStatus,
        	FixDate				:	v_FixDate,
        	PoorJudgmentFlag	:	v_PoorJudgmentFlag,
        	RespType			:	v_RespType,
//        	PoorJudgmentComments:	v_PoorJudgmentComments,
        	PoorJudgmentComments:	'',
        	Comments			:	v_Comments,
//        	Code				:	Ext.getCmp('H_RI_Item_Code').getValue(),
//        	PoorJudgmentStandard:	Ext.getCmp('FS_RI_Item').getTitle(),
        	/*
        	Att					:{
        		FileName		:	v_T_RIP_FileName,
        		FileContent		:	v_H_RIP_Filename,
//        		FileType		:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
        		Comments		:	v_T_RIP_Comments,
        		FileExt			:	'PNG',
        	}
        	*/
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_RIM_saveTap : function(thisObj,e,eOpts){
        var getResult = function(res){
    		var resp = res.UpdateCheckHeader_Output;
    		if(resp.SiebelStatus == 'Y'){
    			Ext.toast('保存数据成功！', 3000);
    			Ext.getCmp('H_RIM_RefreshFlag').setValue('Y');
    		}else{
    			Ext.Msg.alert('温馨提示','保存数据失败！<br>('+resp.SiebelMessage+')');
    		}
    	}

    	var parameters = {
			adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'UpdateCheckHeader',
        	isLoading : true,
        	MaintenanceLeader	:	Ext.getCmp('T_RIM_MaintenanceLeader').getValue(),
            ActualCheckDate		:	Ext.getCmp('T_RIM_ActualCheckDate').getValue()?Ext.Date.format(Ext.getCmp('T_RIM_ActualCheckDate').getValue(),'m/d/Y'):'',
            AgreementItemId		:	Ext.getCmp('H_RIM_AgreementItemId').getValue(),
            QCEngineerId		:	Ext.getCmp('T_RIM_QCEngineerId').getValue(),
            ChkElevatorId		:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
            YearOfJob			:	Ext.getCmp('T_RIM_YearOfJob').getValue()?Ext.Date.format(Ext.getCmp('T_RIM_YearOfJob').getValue(),'Y'):'',
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_RIM_submitTap : function(thisObj,e,eOpts){
    	if(!Ext.getCmp('T_RIM_YearOfJob').getValue()){
    		Ext.Msg.alert('温馨提示','请输入[统计周期（财年）]并保存后，再提交！');
    		return;
    	}
    	if(!Ext.getCmp('T_RIM_ActualCheckDate').getValue()){
    		Ext.Msg.alert('温馨提示','请输入[实际检查时间]并保存后，再提交！');
    		return;
    	}
    	if(!Ext.getCmp('T_RIM_QCEngineerId').getValue()){
    		Ext.Msg.alert('温馨提示','请输入[检查工程师]并保存后，再提交！');
    		return;
    	}
    	if(!Ext.getCmp('T_RIM_MaintenanceLeader').getValue()){
    		Ext.Msg.alert('温馨提示','请输入[保养组长]并保存后，再提交！');
    		return;
    	}
    	var getResult = function(res){
    		var resp = res.QueryCheckHeaderAndLine_Output;
    		var items_info = '';
    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
    			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
        		if(respo.ListOfHelChkElevatorItemOut != ''){
        			var v_items = respo.ListOfHelChkElevatorItemOut.HelChkElevatorItemOut;
        			if(v_items.length){
        				for(var i = 0;i < v_items.length;i++){
        					if(v_items[i].PoorJudgmentFlag == 'Y'){
        						items_info += '<br>'+v_items[i].Code+' | '+v_items[i].PoorJudgmentStandard;
        					}
        				}
        			}else{
        				if(v_items.PoorJudgmentFlag == 'Y'){
        					items_info += '<br>'+v_items.Code+' | '+v_items.PoorJudgmentStandard;
        				}
        			}
        			if(items_info != ''){
        				items_info = '该电梯A级不良项目：' + items_info;
        			}else{
        				items_info = '该电梯无A级不良项目';
        			}
        		}else{
        			items_info = '该电梯无A级不良项目';
        		}
    		}else{
    			items_info = '该电梯A级不良项目获取失败！';
    		}
    		
    		Ext.Msg.show({
    			title: '温馨提示',
    			message: items_info + '<br><br>提交成功后将不能再修改数据！<br>是否继续？',
    			buttons: [{text:'取消', itemId:'no'},{text:'提交', itemId:'yes'}],
    			fn: function(buttonId) {
    				if(buttonId == 'yes'){
    					var getResult = function(res){
    			    		var resp = res.UpdateCheckHeader_Output;
    			    		if(resp.SiebelStatus == 'Y'){
    			    			Ext.getCmp('H_RIM_RefreshFlag').setValue('Y');
    			    			
    			    			var getResult = function(res){
    	    			    		var resp = res.SubmitCheckHeader_Output;
    	    			    		if(resp.SiebelStatus == 'Y'){
    	    			    			Ext.toast('数据提交成功！', 3000);
    	    			    			MainCtr.BackView();
    	    			    			var getResult_1 = function(res){
    	    			    	    		var resp = res.QueryCheckHeaderAndLineRange_Output;
    	    			    	    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
    	    			    	    			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
    	    			    	    			var v_data = [];
    	    			    	    			if(respo.length){
    	    			    	    				for(var i = 0;i < respo.length;i++){
    	    			    	    					if(respo[i].PDASubmittedFlag == 'N'){
    	    			    	    						v_data.push(respo[i]);
    	    			    	    					}
    	    			    	        			}
    	    			    	    			}else{
    	    			    	    				if(respo.PDASubmittedFlag == 'N'){
    	    			    							v_data.push(respo);
    	    			    						}
    	    			    	    			}
    	    			    	    			
    	    			    	    			Ext.getCmp('L_RI_MainList').getStore().setData(v_data);
    	    			    	    			Ext.toast('缺省显示三个月内未提交的数据，可选择其他条件查找！',2000);
//    	    			    	    			Ext.getCmp('Overlay_RI_SearchList').hide();
    	    			    	    		}else{
    	    			    	    			Ext.toast('三个月内没有未提交的数据，可选择其他条件查找！',3000);
//    	    			    	    			Ext.Msg.alert('温馨提示','没有符合条件的数据！');
    	    			    	    		}
    	    			    	    	}
    	    			    	    	
    	    			    	    	var parameters_1 = {
    	    			    	    		adapter   : 'HttpAdapter_RegularInspection',
    	    			    	    		procedure : 'QueryCheckHeaderAndLineRange',
    	    			    	        	isLoading : true,
    	    			    	        	PDAPersonId		:	person_id,
    	    			    	        	QCEngineer    	:	'',
    	    			    	        	AssetDomainName	:	'',
    	    			    	        	Status			:	'',
    	    			    	        	AssetNumber		:	'',
    	    			    	        	Created			:	Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -3),'m/d/Y'),
    	    			    	        };
    	    			    	        						
    	    			    	        MainCtr.getDataFromServer(getResult_1,parameters_1);
    	    			    		}else{
    	    			    			Ext.Msg.alert('温馨提示','数据提交失败！<br>('+resp.SiebelMessage+')');
    	    			    		}
    	    			    	}

    	    			    	var parameters = {
    	    						adapter   : 'HttpAdapter_RegularInspection',
    	    			    		procedure : 'SubmitCheckHeader',
    	    			        	isLoading : true,
    	    			        	ChkElevatorId	:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
    	    			    	};
    	    			    						
    	    			    	MainCtr.getDataFromServer(getResult,parameters);
    			    		}else{
    			    			Ext.Msg.alert('温馨提示','保存数据失败，提交终止！<br>('+resp.SiebelMessage+')');
    			    		}
    			    	}

    			    	var parameters = {
    						adapter   : 'HttpAdapter_RegularInspection',
    			    		procedure : 'UpdateCheckHeader',
    			        	isLoading : true,
    			        	MaintenanceLeader	:	Ext.getCmp('T_RIM_MaintenanceLeader').getValue(),
    			            ActualCheckDate		:	Ext.getCmp('T_RIM_ActualCheckDate').getValue()?Ext.Date.format(Ext.getCmp('T_RIM_ActualCheckDate').getValue(),'m/d/Y'):'',
    			            AgreementItemId		:	Ext.getCmp('H_RIM_AgreementItemId').getValue(),
    			            QCEngineerId		:	Ext.getCmp('T_RIM_QCEngineerId').getValue(),
    			            ChkElevatorId		:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
    			            YearOfJob			:	Ext.getCmp('T_RIM_YearOfJob').getValue()?Ext.Date.format(Ext.getCmp('T_RIM_YearOfJob').getValue(),'Y'):'',
    			    	};
    			    						
    			    	MainCtr.getDataFromServer(getResult,parameters);
    					
    					
    				}
    			}
    		});
    	}
    	
    	var parameters = {
			adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'QueryCheckHeaderAndLine',
        	isLoading : true,
        	Id		  : Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_RI_PhotoView_saveTap : function(thisObj,e,eOpts){
    	var v_T_RIP_FileName = Ext.getCmp('T_RIP_FileName').getValue();
    	if(v_T_RIP_FileName == ''){
    		v_T_RIP_FileName = '附件';
//    		Ext.Msg.alert('温馨提示','请输入名称！');
//    		return;
    	}
    	var v_T_RIP_Comments = Ext.getCmp('T_RIP_Comments').getValue();
    	var v_H_RIP_Filename = Ext.getCmp('H_RIP_Filename').getValue();
    	
    	var v_PoorJudgmentFlag = Ext.getCmp('T_RI_Item_PoorJudgmentFlag').getValue()?'Y':'N';
    	var v_RespType = Ext.getCmp('T_RI_Item_RespType').getValue();
    	var v_FixStatus = Ext.getCmp('T_RI_Item_FixStatus').getValue();
    	var v_FixDate = Ext.getCmp('T_RI_Item_FixDate').getValue()?Ext.Date.format(Ext.getCmp('T_RI_Item_FixDate').getValue(),'m/d/Y'):'';
//    	var v_PoorJudgmentComments = Ext.getCmp('T_RI_Item_PoorJudgmentComments').getValue();
    	var v_Comments = Ext.getCmp('T_RI_Item_Comments').getValue();
    	
    	if(v_PoorJudgmentFlag == ''){
    		Ext.Msg.alert('温馨提示','请选择是否A级不良！');
    		return;
    	}else if(v_PoorJudgmentFlag == 'N'){
    		if(v_Comments == ''){
    			Ext.Msg.alert('温馨提示','[是否A级不良]为否时,[备注说明]必需！');
        		return;
    		}
    	}
    	if(v_RespType == ''){
    		Ext.Msg.alert('温馨提示','请选择责任分类！');
    		return;
    	}
    	if(v_FixStatus == ''){
    		Ext.Msg.alert('温馨提示','请选择整改情况！');
    		return;
    	}else if(v_FixStatus != '未整改'){
    		if(v_FixDate == '' || v_FixDate == null){
        		Ext.Msg.alert('温馨提示','[整改情况]为[已整改]或[已发函]时[整改时间]必填！');
        		return;
        	}
    	}
    	
    	var getResult = function(res){
    		var resp = res.UpdateCheckLineAndAtt_Output;
    		if(resp.SiebelStatus == 'Y'){
    			Ext.toast('保存附件成功！',3000);
    			var getResult_1 = function(res){
    				var resp = res.QueryCheckAtt_Output;
    				var v_data = [];
    				if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkAttInOut.HelChkAttInOut){
    					var respo = resp.ListOfHelChkAttInOut.HelChkAttInOut;
    					if(respo.length){
    						for(var i = 0;i < respo.length;i++){
            					v_data.push(respo[i]);
        					}
    					}else{
    						v_data.push(respo);
    					}
    	    			
    					Ext.getCmp('H_tab_AttList').setValue('Y');
    				}
    				
    				Ext.getCmp('DV_RI_Item').getStore().setData(v_data);
    			}

    			var parameters_1 = {
    				adapter   : 'HttpAdapter_RegularInspection',
    	    		procedure : 'QueryCheckAtt',
    	        	isLoading : true,
    	        	ChkElevatorItemId    : Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue(),
    			};
    								
    			MainCtr.getDataFromServer(getResult_1,parameters_1);
//    			if(Ext.getCmp('H_AttachFile_Id').getValue() == ''){
//    				
//    			}else{
//    				var v_record = Ext.getCmp('DV_RI_Item').getStore().getAt(Ext.getCmp('H_AttachFile_Index').getValue());
//    				v_record.set('FileType',Ext.getCmp('T_RIP_FileName').getValue());
//    				v_record.set('Comments',Ext.getCmp('T_RIP_Comments').getValue());
//    			}
    			MainCtr.BackView();
    		}else{
    			Ext.Msg.alert('温馨提示','保存附件失败！<br>('+resp.SiebelMessage+')');
    		}
    	}

    	var parameters = {
			adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'UpdateCheckLineAndAtt',
        	isLoading : true,
        	ChkElevatorItemId	:	Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue(),
        	ChkCheckListId		:	Ext.getCmp('H_RI_Item_Id').getValue(),
        	FixStatus			:	v_FixStatus,
        	FixDate				:	v_FixDate,
        	PoorJudgmentFlag	:	v_PoorJudgmentFlag,
        	RespType			:	v_RespType,
//        	PoorJudgmentComments:	v_PoorJudgmentComments,
        	PoorJudgmentComments:	'',
        	Comments			:	v_Comments,
        	Att					:{
        		Id				:	Ext.getCmp('H_AttachFile_Id').getValue(),
        		FileContent		:	v_H_RIP_Filename,
        		FileType		:	v_T_RIP_FileName,
        		Comments		:	v_T_RIP_Comments,
        		FileExt			:	'PNG',
        	}
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_RI_Item_PhotoTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() == ''){
    		Ext.Msg.alert('温馨提示','请先保存当前项目再进行附件操作！');
    		return;
    	}
    	var v_source = thisObj.id == 'btn_RI_Item_camera'?'CAMEAR':'ALBUM';
    	var parm = {
    		callback : function(filename){
    			if(filename != ''){
    				MainCtr.NextView('RI_PhotoView','HelcPDA.view.RegularInspection.RI_PhotoView');
    				Ext.getCmp('H_RIP_Filename').setValue(filename);
    				Ext.getCmp('RI_Con_PhotoView').setHtml('<img style="width:100%" src="data:image/png;base64,'+filename+'">');
    			}
    		},
    		source : v_source,
    		direction : 'BACK',
    	};
    	phone.takePhoto(parm);
    },
    
    OnL_RI_ItemListItemtap : function(thisObj,index,target,record,e,eOpts){
//    	console.log(record.data);
    	var getResult = function(res){
    		var resp = res.QueryCheckHeaderAndLine_Output;
    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
    			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
    			MainCtr.NextView('RI_Item','HelcPDA.view.RegularInspection.RI_Item');
    	    	Ext.getCmp('FS_RI_Item').setTitle(record.data.PoorJudgmentStandard);
    	    	Ext.getCmp('H_RI_Item_Id').setValue(record.data.Id);
    	    	
    			
    	    	var items = respo.ListOfHelChkElevatorItemOut;
    	    	if(items){
    	    		var item = items.HelChkElevatorItemOut;
    	    		if(item.length){
    	    			for(var i = 0;i < item.length;i++){
    	    				if(record.data.Code == item[i].Code){
    	    					Ext.getCmp('H_RI_Item_ChkElevatorItemId').setValue(item[i].Id);
    	    					Ext.getCmp('T_RI_Item_PoorJudgmentFlag').setValue(item[i].PoorJudgmentFlag == 'Y'?1:0);
    	    					Ext.getCmp('T_RI_Item_RespType').setValue(item[i].RespType);
    	    					Ext.getCmp('T_RI_Item_FixStatus').setValue(item[i].FixStatus);
    	    					Ext.getCmp('T_RI_Item_FixDate').setValue(item[i].FixDate == ''?'':new Date(item[i].FixDate));
//    	    					Ext.getCmp('T_RI_Item_PoorJudgmentComments').setValue(item[i].PoorJudgmentComments);
    	    					Ext.getCmp('T_RI_Item_Comments').setValue(item[i].Comments);
    	    				}
    	    			}
    	    		}else{
    	    			if(record.data.Code == item.Code){
	    	    			Ext.getCmp('H_RI_Item_ChkElevatorItemId').setValue(item.Id);
	    					Ext.getCmp('T_RI_Item_PoorJudgmentFlag').setValue(item.PoorJudgmentFlag == 'Y'?1:0);
	    					Ext.getCmp('T_RI_Item_RespType').setValue(item.RespType);
	    					Ext.getCmp('T_RI_Item_FixStatus').setValue(item.FixStatus);
	    					Ext.getCmp('T_RI_Item_FixDate').setValue(item.FixDate == ''?'':new Date(item.FixDate));
//	    					Ext.getCmp('T_RI_Item_PoorJudgmentComments').setValue(item.PoorJudgmentComments);
	    					Ext.getCmp('T_RI_Item_Comments').setValue(item.Comments);
    	    			}
    	    		}
    	    	}
    	    	
    	    	if(Ext.getCmp('H_RIM_PDASubmittedFlag').getValue() == 'Y'){
    	    		Ext.getCmp('FS_RI_Item').setDisabled( true );
    	    		Ext.getCmp('btn_RI_Item_save').setHidden(true);
    	    		Ext.getCmp('btn_RI_Item_camera').setHidden(true);
    	    		Ext.getCmp('btn_RI_Item_album').setHidden(true);
    	    	}
    	    	
    	    	Ext.getCmp('H_RI_Item_SaveFlag').setValue('');
    		}else{
    			Ext.Msg.alert('温馨提示','获取数据失败，请稍候重试！');
    		}
    	}
    	
    	var parameters = {
			adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'QueryCheckHeaderAndLine',
        	isLoading : true,
        	Id		  : Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnL_RI_MainItemtap : function(thisObj,index,target,record,e,eOpts){
//    	console.log(record.data);
    	var v_data = [];
    	if(record.data.Datas){
    		var v_datas = record.data.Datas; 
			for(var i = 0;i < v_datas.length;i++){
				v_data.push({
					CheckItem:v_datas[i].CheckItem,
					Code:v_datas[i].Code,
					Code_sort:parseFloat(v_datas[i].Seq),
					ElevatorType:v_datas[i].ElevatorType,
					Id:v_datas[i].Id,
					Location:v_datas[i].Location,
					PoorJudgmentStandard:v_datas[i].PoorJudgmentStandard,
				});
			}
    		
			MainCtr.NextView('RI_ItemList','HelcPDA.view.RegularInspection.RI_ItemList');
			Ext.getCmp('TB_RI_ItemList').setTitle(Ext.getCmp('TB_RI_ItemList').getTitle().getTitle()+'('+record.data.Location+')');
			Ext.getCmp('L_RI_ItemList').getStore().setData(v_data);
			Ext.getCmp('L_RI_ItemList').getStore().sort('Code_sort');
    	}
    },
    
    OnL_RI_MainListItemtap : function(thisObj,index,target,record,e,eOpts){
//    	console.log(record.data);
    	var getResult = function(res){
    		var resp = res.QueryCheckHeaderAndLine_Output;
    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
    			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
    			MainCtr.NextView('RI_Main','HelcPDA.view.RegularInspection.RI_Main');
    			
    			Ext.getCmp('T_RIM_AssetNumber').setValue(respo.AssetNumber);
        		Ext.getCmp('T_RIM_Category').setValue(respo.Category);
        		Ext.getCmp('T_RIM_ProductName').setValue(respo.ProductName);
        		Ext.getCmp('T_RIM_AssetEdificeName').setValue(respo.AssetEdificeName);
        		Ext.getCmp('T_RIM_AssetDomainName').setValue(respo.AssetDomainName);
        		Ext.getCmp('T_RIM_AccountMPType').setValue(respo.AccountMPType);
        		Ext.getCmp('T_RIM_MajorAgreementIdentify').setValue(respo.MajorAgreementIdentify);
        		Ext.getCmp('H_RIM_HoldDivisionId').setValue(respo.HoldDivisionId);
        		Ext.getCmp('H_RIM_ChkElevatorId').setValue(respo.Id);
        		Ext.getCmp('H_RIM_AgreementItemId').setValue(respo.AgreementItemId);
        		Ext.getCmp('H_RIM_PDASubmittedFlag').setValue(respo.PDASubmittedFlag);
        		
        		if(respo.YearOfJob != '')Ext.getCmp('T_RIM_YearOfJob').setValue(new Date(respo.YearOfJob));
        		if(respo.ActualCheckDate != '')Ext.getCmp('T_RIM_ActualCheckDate').setValue(new Date(respo.ActualCheckDate));
        		Ext.getCmp('T_RIM_QCEngineerName').setValue(respo.QCEngineer);
        		Ext.getCmp('T_RIM_QCEngineerId').setValue(respo.QCEngineerId);
        		Ext.getCmp('T_RIM_MaintenanceLeader').setValue(respo.MaintenanceLeader);
        		
        		if(respo.PDASubmittedFlag == 'Y'){
        			Ext.getCmp('btn_RIM_save').setHidden(true);
        			Ext.getCmp('btn_RIM_submit').setHidden(true);
        			Ext.getCmp('btn_RIM_QCEngineer_search').setHidden(true);
        			Ext.getCmp('FS_RIM_Input').setDisabled( true );
        			Ext.toast('已提交的数据不支持再修改！',3000);
        		}
        		
        		//获取上次定检信息
        		var getResult_1 = function(res){
        			var resp = res.QueryLastCheckInfo_Output;
        			if(resp.SiebelStatus == 'Y'){
        				Ext.getCmp('T_RIM_Last_ActualCheckDate').setValue(resp.ActualCheckDate);
        				Ext.getCmp('T_RIM_Last_Status').setValue(resp.Status);
        				Ext.getCmp('T_RIM_Last_QCEngineers').setValue(resp.QCEngineer);
        				Ext.getCmp('T_RIM_Last_ElevatorItemCount').setValue(resp.ElevatorItemCount);
        			}
        		}
        		
        		var parameters_1 = {
    				adapter   : 'HttpAdapter_RegularInspection',
    	    		procedure : 'QueryLastCheckInfo',
    	        	isLoading : false,
    	        	AssetNumber	: respo.AssetNumber,
    			};
    								
    			MainCtr.getDataFromServer(getResult_1,parameters_1);
    		}else{
    			Ext.Msg.alert('温馨提示','获取数据失败，请稍候重试！');
    		}
    	}
    	
    	var parameters = {
			adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'QueryCheckHeaderAndLine',
        	isLoading : true,
        	Id		  : record.data.Id,
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
    },
    
    OnRI_MainItemchange : function(thisObj,value,oldValue,eOpts){
    	if(value.id == 'tab_CheckList' && Ext.getCmp('H_tab_CheckList').getValue() == ''){
    		var getResult = function(res){
				var resp = res.QueryCheckList_Output;
				var v_data = [];
				var v_subdata = [];
				var v_mark;
				if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkCheckListOut.HelChkCheckListOut){
					var respo = resp.ListOfHelChkCheckListOut.HelChkCheckListOut;
	    			for(var i = 0;i < respo.length;i++){
    					v_mark = 'N';
    					for(var ii = 0;ii < v_data.length;ii++){
    						if(v_data[ii].Location == respo[i].Location){
    							v_subdata = v_data[ii].Datas;
    							v_subdata.push(respo[i]);
    							v_data[ii].Datas = v_subdata;
    							v_mark = 'Y';
    							break;
    						}
    					}
    					if(v_mark == 'N'){
    						v_subdata = [];
							v_subdata.push(respo[i]);
	    					v_data.push({
		    					Location:respo[i].Location,
		    					Datas:v_subdata,
		    				});
    					}
					}
//	    			console.log('v_data',v_data);
	    			
					Ext.getCmp('H_tab_CheckList').setValue('Y');
				}else{
					Ext.Msg.alert('温馨提示','没有符合条件的数据！');
				}
				
				Ext.getCmp('L_RI_Main').getStore().setData(v_data);
			}

			var parameters = {
				adapter   : 'HttpAdapter_RegularInspection',
	    		procedure : 'QueryCheckList',
	        	isLoading : true,
	        	ElevatorType    : Ext.getCmp('T_RIM_Category').getValue(),
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
    	}
    	
    	if(value.id == 'tab_RIM_Input' && Ext.getCmp('H_tab_RIM_Input').getValue() == ''){
    		var getResult = function(res){
        		var resp = res.QueryCheckHeaderAndLine_Output;
        		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
        			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
            		var items_info = '无不良项目';
            		if(respo.ListOfHelChkElevatorItemOut != ''){
            			items_info = '不良项目：';
            			var v_items = respo.ListOfHelChkElevatorItemOut.HelChkElevatorItemOut;
            			if(v_items.length){
            				v_items.sort(function(a,b){
		    					return a.PoorJudgmentFlag < b.PoorJudgmentFlag?1:-1;
		    				});
            				for(var i = 0;i < v_items.length;i++){
            					items_info += '<br>'+(v_items[i].PoorJudgmentFlag=='Y'?'A级':'非A级')+' | '+v_items[i].Code+' | '+v_items[i].PoorJudgmentStandard;
            				}
            			}else{
            				items_info += '<br>'+(v_items.PoorJudgmentFlag=='Y'?'A级':'非A级')+' | '+v_items.Code+' | '+v_items.PoorJudgmentStandard;
            			}
            		}
            		Ext.getCmp('FS_RIM_Input').setInstructions(items_info);
            		
            		Ext.getCmp('H_tab_RIM_Input').setValue('Y');
        		}
        	}
        	
        	var parameters = {
    			adapter   : 'HttpAdapter_RegularInspection',
        		procedure : 'QueryCheckHeaderAndLine',
            	isLoading : true,
            	Id		  : Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
    		};
    							
    		MainCtr.getDataFromServer(getResult,parameters);
    	}
    },
    
    OnRI_ItemItemchange : function(thisObj,value,oldValue,eOpts){
    	if(value.id == 'tab_AttList' 
    		&& Ext.getCmp('H_tab_AttList').getValue() == '' 
    		&& Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() != ''){
    		var getResult = function(res){
				var resp = res.QueryCheckAtt_Output;
				var v_data = [];
				if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkAttInOut.HelChkAttInOut){
					var respo = resp.ListOfHelChkAttInOut.HelChkAttInOut;
					if(respo.length){
						for(var i = 0;i < respo.length;i++){
	    					v_data.push(respo[i]);
						}
					}else{
						v_data.push(respo);
					}
	    			
					Ext.getCmp('H_tab_AttList').setValue('Y');
				}else{
//					Ext.Msg.alert('温馨提示','没有符合条件的数据！');
					Ext.toast('此项目没有附件',2000);
				}
				
				Ext.getCmp('DV_RI_Item').getStore().setData(v_data);
			}

			var parameters = {
				adapter   : 'HttpAdapter_RegularInspection',
	    		procedure : 'QueryCheckAtt',
	        	isLoading : true,
	        	ChkElevatorItemId    : Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue(),
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
    	}
    },
    
    Onbtn_Overlay_RI_SearchPerson_selectedTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('L_Overlay_RI_SearchPerson').getSelectionCount() > 0){
    		console.log(Ext.getCmp('L_Overlay_RI_SearchPerson').getSelection()[0].data);
    		var v_data = Ext.getCmp('L_Overlay_RI_SearchPerson').getSelection()[0].data;
			
    		Ext.getCmp('T_RIM_QCEngineerName').setValue(v_data.FullName);
    		Ext.getCmp('T_RIM_QCEngineerId').setValue(v_data.Id);
    		
    		Ext.getCmp('Overlay_RI_SearchPerson').hide();
    		Ext.getCmp('L_Overlay_RI_SearchPerson').getStore().setData([]);
    		
    	}else{
    		Ext.Msg.alert('温馨提示','请先选择人员！');
    	}
    },
    
    Onbtn_Ol_RIS_cancelTap : function(thisObj,e,eOpts){
    	Ext.getCmp('Overlay_RI_SearchList').hide();
    },
    
    Onbtn_Ol_RIS_searchTap : function(thisObj,e,eOpts){
    	var v_AssetNumber = Ext.getCmp('t_Ol_RIS_AssetNumber').getValue();
    	var v_QCEngineer = Ext.getCmp('t_Ol_RIS_QCEngineer').getValue();
    	var v_Status = Ext.getCmp('t_Ol_RIS_Status').getValue();
    	var v_Created = Ext.getCmp('t_Ol_RIS_Created').getValue();
    	var v_DomainName = Ext.getCmp('t_Ol_RIS_DomainName').getValue();
    	
    	var getResult = function(res){
    		var resp = res.QueryCheckHeaderAndLineRange_Output;
    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
    			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
    			var v_data = [];
    			if(respo.length){
    				for(var i = 0;i < respo.length;i++){
    					v_data.push(respo[i]);
//        				v_data.push({
//        					AccountMPType:respo[i].AccountMPType,
//        					ActualCheckDate:respo[i].ActualCheckDate,
//        					AgreeId:respo[i].AgreeId,
//        					AgreementItemId:respo[i].AgreementItemId,
//        					ApprovedDate:respo[i].ApprovedDate,
//        					ApprovedUserFstName:respo[i].ApprovedUserFstName,
//        					ApprovedUserId:respo[i].ApprovedUserId,
//        					ApprovedUserLastName:respo[i].ApprovedUserLastName,
//        					ApprovedUserName:respo[i].ApprovedUserName,
//        					AreaId:respo[i].AreaId,
//        					AreaName:respo[i].AreaName,
//        					AssetDomainName:respo[i].AssetDomainName,
//        					AssetEdificeName:respo[i].AssetEdificeName,
//        					AssetId:respo[i].AssetId,
//        					AssetNumber:respo[i].AssetNumber,
//        					BusinessType:respo[i].BusinessType,
//        					Category:respo[i].Category,
//        					DomainId:respo[i].DomainId,
//        					EdificeId:respo[i].EdificeId,
//        					HoldDivisionId:respo[i].HoldDivisionId,
//        					HoldDivisionName:respo[i].HoldDivisionName,
//        					HoldStationId:respo[i].HoldStationId,
//        					HoldStationName:respo[i].HoldStationName,
//        					Id:respo[i].Id,
//        					ListOfHelChkElevatorItemOut:respo[i].ListOfHelChkElevatorItemOut,
//        					MaintenanceLeader:respo[i].MaintenanceLeader,
//        					MajorAgreementIdentify:respo[i].MajorAgreementIdentify,
//        					PDASubmittedFlag:respo[i].PDASubmittedFlag,
//        					PDAUserId:respo[i].PDAUserId,
//        					ProductId:respo[i].ProductId,
//        					ProductName:respo[i].ProductName,
//        					QCEngineer:respo[i].QCEngineer,
//        					QCEngineerFstName:respo[i].QCEngineerFstName,
//        					QCEngineerId:respo[i].QCEngineerId,
//        					QCEngineerLastName:respo[i].QCEngineerLastName,
//        					Status:respo[i].Status,
//        					YearOfJob:respo[i].YearOfJob,
//        				});
        			}
    			}else{
    				v_data.push(respo);
//    				v_data.push({
//    					AccountMPType:respo.AccountMPType,
//    					ActualCheckDate:respo.ActualCheckDate,
//    					AgreeId:respo.AgreeId,
//    					AgreementItemId:respo.AgreementItemId,
//    					ApprovedDate:respo.ApprovedDate,
//    					ApprovedUserFstName:respo.ApprovedUserFstName,
//    					ApprovedUserId:respo.ApprovedUserId,
//    					ApprovedUserLastName:respo.ApprovedUserLastName,
//    					ApprovedUserName:respo.ApprovedUserName,
//    					AreaId:respo.AreaId,
//    					AreaName:respo.AreaName,
//    					AssetDomainName:respo.AssetDomainName,
//    					AssetEdificeName:respo.AssetEdificeName,
//    					AssetId:respo.AssetId,
//    					AssetNumber:respo.AssetNumber,
//    					BusinessType:respo.BusinessType,
//    					Category:respo.Category,
//    					DomainId:respo.DomainId,
//    					EdificeId:respo.EdificeId,
//    					HoldDivisionId:respo.HoldDivisionId,
//    					HoldDivisionName:respo.HoldDivisionName,
//    					HoldStationId:respo.HoldStationId,
//    					HoldStationName:respo.HoldStationName,
//    					Id:respo.Id,
//    					ListOfHelChkElevatorItemOut:respo.ListOfHelChkElevatorItemOut,
//    					MaintenanceLeader:respo.MaintenanceLeader,
//    					MajorAgreementIdentify:respo.MajorAgreementIdentify,
//    					PDASubmittedFlag:respo.PDASubmittedFlag,
//    					PDAUserId:respo.PDAUserId,
//    					ProductId:respo.ProductId,
//    					ProductName:respo.ProductName,
//    					QCEngineer:respo.QCEngineer,
//    					QCEngineerFstName:respo.QCEngineerFstName,
//    					QCEngineerId:respo.QCEngineerId,
//    					QCEngineerLastName:respo.QCEngineerLastName,
//    					Status:respo.Status,
//    					YearOfJob:respo.YearOfJob,
//    				});
    			}
    			
    			Ext.getCmp('L_RI_MainList').getStore().setData(v_data);
    			Ext.getCmp('Overlay_RI_SearchList').hide();
    		}else{
    			Ext.Msg.alert('温馨提示','没有符合条件的数据！');
    		}
    	}
    	
    	var parameters = {
    		adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'QueryCheckHeaderAndLineRange',
        	isLoading : true,
        	PDAPersonId		:	person_id,
        	QCEngineer    	:	v_QCEngineer,
        	AssetDomainName	:	v_DomainName,
        	Status			:	v_Status,
        	AssetNumber		:	v_AssetNumber,
        	Created			:	Ext.Date.format(v_Created,'m/d/Y'),
        };
        						
        MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_Overlay_RI_SearchPerson_searchTap : function(thisObj,e,eOpts){
    	var v_Person = Ext.getCmp('t_Overlay_RI_SearchPerson_Person').getValue();
    	
    	if(v_Person == ''){
    		Ext.Msg.alert('温馨提示','请输入关键字！');
    		return;
    	}
    	
    	var getResult = function(res){
    		var resp = res.QueryMaintenancePerson_Output;
    		var v_data = [];
    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkMaintenancePersonOut.PersonOut){
    			var respo = resp.ListOfHelChkMaintenancePersonOut.PersonOut;
    			if(respo.length){
    				for(var i = 0;i < respo.length;i++){
//	    				v_data.push({
//	    					Id:respo[i].Id,
//	    					AreaId:respo[i].AreaId,
//	    					AreaName:respo[i].AreaName,
//	    					CompanyId:respo[i].CompanyId,
//	    					CompanyName:respo[i].CompanyName,
//	    					EmployeeNum:respo[i].EmployeeNum,
//	    					FirstName:respo[i].FirstName,
//	    					FullName:respo[i].FullName,
//	    					GroupId:respo[i].GroupId,
//	    					GroupName:respo[i].GroupName,
//	    					LastName:respo[i].LastName,
//	    					MF:respo[i].MF,
//	    					MaintainingPosition:respo[i].MaintainingPosition,
//	    					MaitainingPersonType:respo[i].MaitainingPersonType,
//	    					StationId:respo[i].StationId,
//	    					StationName:respo[i].StationName,
//	    					UserType:respo[i].UserType,
//	    					WorkPhone:respo[i].WorkPhone,
//	    				});
    					v_data.push(respo[i]);
					}
    			}else{
    				v_data.push(respo);
    			}
    		}else{
    			Ext.Msg.alert('温馨提示','没有符合条件的数据！');
    		}
    		
    		Ext.getCmp('L_Overlay_RI_SearchPerson').getStore().setData(v_data);
    	}
    	
    	var parameters = {
    		adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'QueryMaintenancePerson',
        	isLoading : true,
        	PersonName : v_Person,
        	DivisionId    : Ext.getCmp('H_RIM_HoldDivisionId').getValue(),
        };
        						
        MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_Overlay_RI_SearchPerson_cancelTap : function(thisObj,e,eOpts){
    	Ext.getCmp('L_Overlay_RI_SearchPerson').getStore().setData([]);
    	Ext.getCmp('Overlay_RI_SearchPerson').hide();
    },
    
    Onbtn_RIM_QCEngineer_searchTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('Overlay_RI_SearchPerson')){
			Ext.getCmp('Overlay_RI_SearchPerson').destroy();
		}
		var ol_RI_SearchPerson = Ext.Viewport.add(Ext.create('HelcPDA.view.RegularInspection.Overlay_RI_SearchPerson'));
		ol_RI_SearchPerson.show();
    },
    
    Onbtn_Overlay_RI_SearchElevatorNo_selectedTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('L_Overlay_RI_SearchElevatorNo').getSelectionCount() > 0){
    		var v_data = Ext.getCmp('L_Overlay_RI_SearchElevatorNo').getSelection()[0].data;
    		
    		//获取上次定检信息
    		var getResult = function(res){
    			var l_resp = res.QueryLastCheckInfo_Output;
    			var last_info = '[上次定检信息]';
    			if(l_resp.SiebelStatus == 'Y'){
    				last_info += '<br>实际检查时间：'+l_resp.ActualCheckDate;
    				last_info += '<br>状态：'+l_resp.Status;
    				last_info += '<br>检查工程师：'+l_resp.QCEngineer;
    				last_info += '<br>A级不良项目数：'+l_resp.ElevatorItemCount;
    			}else{
    				last_info += '<br>信息获取失败！';
    			}
    			
    			Ext.Msg.show({
					title: '温馨提示',
					message: last_info + '<br><br>是否继续新建定检数据？',
					buttons: [{text:'取消', itemId:'no'},{text:'继续', itemId:'yes'}],
					fn: function(buttonId) {
						if(buttonId == 'yes'){
							var getResult_1 = function(res){
				    			try{
									var resp = res.InsertCheckHeader_Output;
					    			if(resp.SiebelStatus == 'Y'){
					    				MainCtr.NextView('RI_Main','HelcPDA.view.RegularInspection.RI_Main');
					    				
					    	    		Ext.getCmp('T_RIM_AssetNumber').setValue(v_data.AssetNumber);
					    	    		Ext.getCmp('T_RIM_Category').setValue(v_data.Category);
					    	    		Ext.getCmp('T_RIM_ProductName').setValue(v_data.ProductName);
					    	    		Ext.getCmp('T_RIM_AssetEdificeName').setValue(v_data.AssetEdificeName);
					    	    		Ext.getCmp('T_RIM_AssetDomainName').setValue(v_data.AssetDomainName);
					    	    		Ext.getCmp('T_RIM_AccountMPType').setValue(v_data.AccountMPType);
					    	    		Ext.getCmp('T_RIM_MajorAgreementIdentify').setValue(v_data.MajorAgreementIdentify);
					    	    		Ext.getCmp('H_RIM_HoldDivisionId').setValue(v_data.HoldDivisionId);
					    	    		Ext.getCmp('H_RIM_ChkElevatorId').setValue(resp.ChkElevatorId);
					    	    		Ext.getCmp('H_RIM_AgreementItemId').setValue(v_data.Id);
					    	    		//取消新建时默认带出当前用户的名称和ID 171121 czq
//					    	    		Ext.getCmp('T_RIM_QCEngineerName').setValue(usernames);
//					    	    		Ext.getCmp('T_RIM_QCEngineerId').setValue(person_id);
					    	    		Ext.getCmp('H_RIM_RefreshFlag').setValue('Y');
					    	    		Ext.getCmp('T_RIM_Last_ActualCheckDate').setValue(l_resp.ActualCheckDate);
					    				Ext.getCmp('T_RIM_Last_Status').setValue(l_resp.Status);
					    				Ext.getCmp('T_RIM_Last_QCEngineers').setValue(l_resp.QCEngineer);
					    	    		
					    	    		Ext.getCmp('Overlay_RI_SearchElevatorNo').hide();
					    	    		Ext.getCmp('L_Overlay_RI_SearchElevatorNo').getStore().setData([]);
					    	    		
					    			}else{
					    				Ext.Msg.alert('温馨提示','新建数据失败！<br>('+resp.SiebelMessage+')');
					    			}
								}catch(error){
									Ext.Msg.alert('温馨提示','出现异常，但数据已创建，请退回到[定期检查]界面重新搜索数据！<br>'+error);
								}
				    		}
				        	
				        	var parameters_1 = {
				        		adapter   : 'HttpAdapter_RegularInspection',
				        		procedure : 'InsertCheckHeader',
				            	isLoading : true,
				            	PDAUserId : person_id,
				            	AgreementItemId	: v_data.Id,
				            };
				            						
				            MainCtr.getDataFromServer(getResult_1,parameters_1);
						}
					}
				});
			}
    		
    		var parameters = {
				adapter   : 'HttpAdapter_RegularInspection',
	    		procedure : 'QueryLastCheckInfo',
	        	isLoading : true,
	        	AssetNumber	: v_data.AssetNumber,
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
    	}else{
    		Ext.Msg.alert('温馨提示','请先选择工号！');
    	}
    },
    
    Onbtn_Overlay_RI_SearchElevatorNo_searchTap : function(thisObj,e,eOpts){
    	var v_AssetNumber = Ext.getCmp('t_Overlay_RI_SearchElevatorNo_AssetNumber').getValue();
    	
    	if(v_AssetNumber == '' || v_AssetNumber.length < 4){
    		Ext.Msg.alert('温馨提示','请先输入足够的工号字符！');
    		return;
    	}
    	
    	var getResult = function(res){
    		var resp = res.QueryAssetNumber_Output;
    		var v_data = [];
    		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkAgreementItemSimpleOut.HelChkAgreementItemSimpleOut){
    			var respo = resp.ListOfHelChkAgreementItemSimpleOut.HelChkAgreementItemSimpleOut;
    			if(respo.length){
    				for(var i = 0;i < respo.length;i++){
//        				v_data.push({
//        					AccountMPType:respo[i].AccountMPType,
//        					AgreeId:respo[i].AgreeId,
//        					AreaId:respo[i].AreaId,
//        					AreaName:respo[i].AreaName,
//        					AssetDomainName:respo[i].AssetDomainName,
//        					AssetEdificeName:respo[i].AssetEdificeName,
//        					AssetId:respo[i].AssetId,
//        					AssetNumber:respo[i].AssetNumber,
//        					BusinessType:respo[i].BusinessType,
//        					Category:respo[i].Category,
//        					DomainId:respo[i].DomainId,
//        					EdificeId:respo[i].EdificeId,
//        					HoldDivisionId:respo[i].HoldDivisionId,
//        					HoldDivisionName:respo[i].HoldDivisionName,
//        					HoldStationId:respo[i].HoldStationId,
//        					HoldStationName:respo[i].HoldStationName,
//        					Id:respo[i].Id,
//        					MajorAgreementIdentify:respo[i].MajorAgreementIdentify,
//        					ProductId:respo[i].ProductId,
//        					ProductName:respo[i].ProductName,
//        				});
        				v_data.push(respo[i]);
    				}
    			}else{
    				v_data.push(respo);
    			}
    		}else{
    			Ext.Msg.alert('温馨提示','没有符合条件的数据！');
    		}
    		
    		Ext.getCmp('L_Overlay_RI_SearchElevatorNo').getStore().setData(v_data);
    	}
    	
    	var parameters = {
    		adapter   : 'HttpAdapter_RegularInspection',
    		procedure : 'QueryAssetNumber',
        	isLoading : true,
        	AssetNumber : v_AssetNumber,
        	PersonId    : person_id,
        };
        						
        MainCtr.getDataFromServer(getResult,parameters);
    },
    
    Onbtn_Overlay_RI_SearchElevatorNo_cancelTap : function(thisObj,e,eOpts){
    	Ext.getCmp('L_Overlay_RI_SearchElevatorNo').getStore().setData([]);
    	Ext.getCmp('Overlay_RI_SearchElevatorNo').hide();
    },
    
    Onbtn_RI_MainList_addTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('Overlay_RI_SearchElevatorNo')){
			Ext.getCmp('Overlay_RI_SearchElevatorNo').destroy();
		}
		var ol_RI_SearchElevatorNo = Ext.Viewport.add(Ext.create('HelcPDA.view.RegularInspection.Overlay_RI_SearchElevatorNo'));
		ol_RI_SearchElevatorNo.show();
    },
    
    Onbtn_RI_MainList_searchTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('Overlay_RI_SearchList')){
//			Ext.getCmp('Overlay_RI_SearchList').destroy();
    		Ext.getCmp('Overlay_RI_SearchList').show();
		}else{
			var ol_RI_SearchList = Ext.Viewport.add(Ext.create('HelcPDA.view.RegularInspection.Overlay_RI_SearchList'));
			ol_RI_SearchList.show();
		}
    },
    
    Onbtn_backTap : function(thisObj,e,eOpts){
    	MainCtr.BackView();
    },
    
    Onbtn_RI_Item_backTap : function(thisObj,e,eOpts){
    	if(Ext.getCmp('H_RI_Item_SaveFlag').getValue() == 'Y'){
        	Ext.Msg.show({
	    		title: '温馨提示',
	    		message: '检测到[是否A级不良]曾经修改！<br>即将返回上一页面，是否保存？',
	    		buttons: [{text:'直接返回', itemId:'no'},{text:'保存数据', itemId:'yes'}],
	    		fn: function(buttonId) {
					if(buttonId == 'yes'){
						//aabb
						var v_PoorJudgmentFlag = Ext.getCmp('T_RI_Item_PoorJudgmentFlag').getValue()?'Y':'N';
				    	var v_RespType = Ext.getCmp('T_RI_Item_RespType').getValue();
				    	var v_FixStatus = Ext.getCmp('T_RI_Item_FixStatus').getValue();
				    	var v_FixDate = Ext.getCmp('T_RI_Item_FixDate').getValue()?Ext.Date.format(Ext.getCmp('T_RI_Item_FixDate').getValue(),'m/d/Y'):'';
//				    	var v_PoorJudgmentComments = Ext.getCmp('T_RI_Item_PoorJudgmentComments').getValue();
				    	var v_Comments = Ext.getCmp('T_RI_Item_Comments').getValue();
				    	var v_procedure = 'InsertCheckLineAndAtt';
				    	if(Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() != ''){
				    		v_procedure = 'UpdateCheckLineAndAtt';
				    	}
				    	
				    	if(v_PoorJudgmentFlag == ''){
				    		Ext.Msg.alert('温馨提示','请选择是否A级不良！');
				    		return;
				    	}else if(v_PoorJudgmentFlag == 'N'){
				    		if(v_Comments == ''){
				    			Ext.Msg.alert('温馨提示','[是否A级不良]为否时,[备注说明]必需！');
				        		return;
				    		}
				    	}
				    	if(v_RespType == ''){
				    		Ext.Msg.alert('温馨提示','请选择责任分类！');
				    		return;
				    	}
				    	if(v_FixStatus == ''){
				    		Ext.Msg.alert('温馨提示','请选择整改情况！');
				    		return;
				    	}else if(v_FixStatus != '未整改'){
				    		if(v_FixDate == '' || v_FixDate == null){
				        		Ext.Msg.alert('温馨提示','[整改情况]为[已整改]或[已发函]时[整改时间]必填！');
				        		return;
				        	}
				    	}
				    	
				    	var getResult = function(res){
				    		var resp;
				    		if(Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() != ''){
				    			resp = res.UpdateCheckLineAndAtt_Output;
				    		}else{
				    			resp = res.InsertCheckLineAndAtt_Output;
				    		}
				    		if(resp.SiebelStatus == 'Y'){
				    			if(Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue() == ''){
				    				Ext.getCmp('H_RI_Item_ChkElevatorItemId').setValue(resp.ChkElevatorItemId);
				    			}
				    			Ext.getCmp('H_tab_RIM_Input').setValue('');
				    			Ext.toast('保存数据成功！', 3000);
				    			
				    			Ext.getCmp('DV_RI_Item').getStore().setData([]);
				            	MainCtr.BackView();
				    		}else{
				    			Ext.Msg.alert('温馨提示','保存数据失败！<br>('+resp.SiebelMessage+')');
				    		}
				    	}

				    	var parameters = {
							adapter   : 'HttpAdapter_RegularInspection',
				    		procedure : v_procedure,
				        	isLoading : true,
				        	ChkElevatorId		:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
				        	ChkElevatorItemId	:	Ext.getCmp('H_RI_Item_ChkElevatorItemId').getValue(),
				        	ChkCheckListId		:	Ext.getCmp('H_RI_Item_Id').getValue(),
				        	FixStatus			:	v_FixStatus,
				        	FixDate				:	v_FixDate,
				        	PoorJudgmentFlag	:	v_PoorJudgmentFlag,
				        	RespType			:	v_RespType,
//				        	PoorJudgmentComments:	v_PoorJudgmentComments,
				        	PoorJudgmentComments:	'',
				        	Comments			:	v_Comments,
//				        	Code				:	Ext.getCmp('H_RI_Item_Code').getValue(),
//				        	PoorJudgmentStandard:	Ext.getCmp('FS_RI_Item').getTitle(),
				        	/*
				        	Att					:{
				        		FileName		:	v_T_RIP_FileName,
				        		FileContent		:	v_H_RIP_Filename,
//				        		FileType		:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
				        		Comments		:	v_T_RIP_Comments,
				        		FileExt			:	'PNG',
				        	}
				        	*/
				    	};
				    						
				    	MainCtr.getDataFromServer(getResult,parameters);
					}else{
						Ext.getCmp('DV_RI_Item').getStore().setData([]);
		            	MainCtr.BackView();
					}
				}
	    	});
    	}else{
    		Ext.getCmp('DV_RI_Item').getStore().setData([]);
        	MainCtr.BackView();
    	}
    },
    
    Onbtn_RI_MainList_backTap : function(thisObj,e,eOpts){
//    	Ext.Msg.show({
//			title: '温馨提示',
//			message: '即将返回上一页面，是否保存？',
//			buttons: [{text:'直接返回', itemId:'no'},{text:'保存数据', itemId:'yes'}],
//			fn: function(buttonId) {
//				if(buttonId == 'yes'){
//					//
//				}
//			}
//		});
    	Ext.getCmp('L_RI_MainList').getStore().setData([]);
    	MainCtr.BackView();
    },
    
    Onbtn_RI_PhotoView_backTap : function(thisObj,e,eOpts){
//    	Ext.Msg.show({
//    		title: '温馨提示',
//    		message: '即将返回上一页面，是否保存？',
//    		buttons: [{text:'直接返回', itemId:'no'},{text:'保存数据', itemId:'yes'}],
//    		fn: function(buttonId) {
//				if(buttonId == 'yes'){
//					//
//				}
//			}
//    	});
    	MainCtr.BackView();
    },
    
    Onbtn_RIM_backTap : function(thisObj,e,eOpts){
    	Ext.Msg.show({
    		title: '温馨提示',
    		message: '即将返回上一页面，是否保存？',
    		buttons: [{text:'直接返回', itemId:'no'},{text:'保存返回', itemId:'yes'}],
    		fn: function(buttonId) {
				if(buttonId == 'yes'){
					var getResult = function(res){
			    		var resp = res.UpdateCheckHeader_Output;
			    		if(resp.SiebelStatus == 'Y'){
			    			Ext.toast('保存数据成功！', 3000);
			    			Ext.getCmp('H_RIM_RefreshFlag').setValue('Y');
			    			
			    			MainCtr.BackView();
					    	if(Ext.getCmp('H_RIM_RefreshFlag').getValue() == 'Y'){
					    		var getResult_1 = function(res){
					        		var resp = res.QueryCheckHeaderAndLineRange_Output;
					        		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
					        			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
					        			var v_data = [];
					        			if(respo.length){
					        				for(var i = 0;i < respo.length;i++){
					        					if(respo[i].PDASubmittedFlag == 'N'){
					        						v_data.push(respo[i]);
					        					}
					            			}
					        			}else{
					        				if(respo.PDASubmittedFlag == 'N'){
					    						v_data.push(respo);
					    					}
					        			}
					        			
					        			Ext.getCmp('L_RI_MainList').getStore().setData(v_data);
					        			Ext.toast('缺省显示三个月内未提交的数据，可选择其他条件查找！',2000);
					//        			Ext.getCmp('Overlay_RI_SearchList').hide();
					        		}else{
					        			Ext.toast('三个月内没有未提交的数据，可选择其他条件查找！',3000);
					//        			Ext.Msg.alert('温馨提示','没有符合条件的数据！');
					        		}
					        	}
					        	
					        	var parameters_1 = {
					        		adapter   : 'HttpAdapter_RegularInspection',
					        		procedure : 'QueryCheckHeaderAndLineRange',
					            	isLoading : true,
					            	PDAPersonId		:	person_id,
					            	QCEngineer    	:	'',
					            	AssetDomainName	:	'',
					            	Status			:	'',
					            	AssetNumber		:	'',
					            	Created			:	Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -3),'m/d/Y'),
					            };
					            						
					            MainCtr.getDataFromServer(getResult_1,parameters_1);
					    	}
			    		}else{
			    			Ext.Msg.alert('温馨提示','保存数据失败！<br>('+resp.SiebelMessage+')');
			    		}
			    	}
			
			    	var parameters = {
						adapter   : 'HttpAdapter_RegularInspection',
			    		procedure : 'UpdateCheckHeader',
			        	isLoading : true,
			        	MaintenanceLeader	:	Ext.getCmp('T_RIM_MaintenanceLeader').getValue(),
			            ActualCheckDate		:	Ext.getCmp('T_RIM_ActualCheckDate').getValue()?Ext.Date.format(Ext.getCmp('T_RIM_ActualCheckDate').getValue(),'m/d/Y'):'',
			            AgreementItemId		:	Ext.getCmp('H_RIM_AgreementItemId').getValue(),
			            QCEngineerId		:	Ext.getCmp('T_RIM_QCEngineerId').getValue(),
			            ChkElevatorId		:	Ext.getCmp('H_RIM_ChkElevatorId').getValue(),
			            YearOfJob			:	Ext.getCmp('T_RIM_YearOfJob').getValue()?Ext.Date.format(Ext.getCmp('T_RIM_YearOfJob').getValue(),'Y'):'',
			    	};
			    						
			    	MainCtr.getDataFromServer(getResult,parameters);
				}else{
					MainCtr.BackView();
			    	if(Ext.getCmp('H_RIM_RefreshFlag').getValue() == 'Y'){
			    		var getResult_1 = function(res){
			        		var resp = res.QueryCheckHeaderAndLineRange_Output;
			        		if(resp.SiebelStatus == 'Y' && resp.ListOfHelChkElevatorOut.HelChkElevatorOut){
			        			var respo = resp.ListOfHelChkElevatorOut.HelChkElevatorOut;
			        			var v_data = [];
			        			if(respo.length){
			        				for(var i = 0;i < respo.length;i++){
			        					if(respo[i].PDASubmittedFlag == 'N'){
			        						v_data.push(respo[i]);
			        					}
			            			}
			        			}else{
			        				if(respo.PDASubmittedFlag == 'N'){
			    						v_data.push(respo);
			    					}
			        			}
			        			
			        			Ext.getCmp('L_RI_MainList').getStore().setData(v_data);
			        			Ext.toast('缺省显示三个月内未提交的数据，可选择其他条件查找！',2000);
			//        			Ext.getCmp('Overlay_RI_SearchList').hide();
			        		}else{
			        			Ext.toast('三个月内没有未提交的数据，可选择其他条件查找！',3000);
			//        			Ext.Msg.alert('温馨提示','没有符合条件的数据！');
			        		}
			        	}
			        	
			        	var parameters_1 = {
			        		adapter   : 'HttpAdapter_RegularInspection',
			        		procedure : 'QueryCheckHeaderAndLineRange',
			            	isLoading : true,
			            	PDAPersonId		:	person_id,
			            	QCEngineer    	:	'',
			            	AssetDomainName	:	'',
			            	Status			:	'',
			            	AssetNumber		:	'',
			            	Created			:	Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -3),'m/d/Y'),
			            };
			            						
			            MainCtr.getDataFromServer(getResult_1,parameters_1);
			    	}
				}
			}
    	});
    },
});
