
/* JavaScript content from app/controller/Remould/RemouldMainCtrl.js in folder common */
Ext.define("HelcBPM.controller.Remould.RemouldMainCtrl", {
	extend : "HelcBPM.controller.ApplicationController",
	config : {
		control : {
			"button#btn_Rapprove_back":{
				tap:'btn_Rapprove_back'
			},
			"button#btn_R_AssetDetail_back":{
				tap:'btn_R_AssetDetail_back'
			},
			"button#btn_Rapprove_agree":{
				tap:'btn_Rapprove_agree'
			},
			"button#btn_Rapprove_reject":{
				tap:'btn_Rapprove_reject'
			},
		}
	},
	
	btn_Rapprove_back:function(obj, e, opt){
		viewUtil.goLast();
	},
	
	btn_R_AssetDetail_back:function(obj, e, opt){
		viewUtil.goLast();
	},
	
	//同意
	btn_Rapprove_agree:function(obj, e, opt){
		this.R_Submit('0');
	},
	
	//拒绝
	btn_Rapprove_reject: function(obj, e, opt){
		this.R_Submit('-1');
	},
	
	R_Submit:function(type){
		var _type = type == '-1'?'-1':'0';
		var _R_note = Ext.getCmp("R_note").getValue();
		var _stepId = Ext.getCmp('h_stepId').getValue();
		var Mem = {
			'type//按钮送过来：0同意、1保留意见、-1否决':type,
			'_type//定义送过去的参数：0同意&保留意见、-1否决':_type,
		};
		console.log('Mem',Mem);
		
		if(_R_note == "" || _R_note == null || _R_note == undefined){
			Ext.Msg.alert("温馨提示", "请输入审批意见！");
			return ;
		}
		
		var _confirmText = '';
		
		if(_R_note.length > 200){
			Ext.Msg.alert("温馨提示", "审批意见不能超200字！");
			return ;
		}
		console.log('_R_note',_R_note);
		console.log('_R_note.lenght',_R_note.length);
		
		Ext.Msg.show({
			title: '温馨提示',
			message: _confirmText += '确认要提交吗？',
			maxWidth:'30em',
//			buttons: [{text:'<font color="#FF0000">否</font>', itemId:'no'},{text:'是', itemId:'yes'}],
			buttons: [{text:'否', itemId:'no'},{text:'是', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					var getResult = function(res){
					var resp = res;
					console.log('updateDocument',resp);
					if(resp.code == 200){
						var getResult_1 = function(res){
							var resp = res;
							console.log('submitTask',resp);
							if(resp.code == 200){
								Ext.toast('提交成功！',2000);
								viewUtil.goLast(); // 回待审批列表界面
								HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List();
								HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List_YB();
								HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List_YWC();
							}else{
								var _msg = Ext.JSON.decode( resp.msg, true );
								if(!_msg){
									Ext.Msg.alert('温馨提示', '提交出错！('+resp.msg+')');
								}else{
									Ext.Msg.alert('温馨提示', '提交出错！('+_msg.mobile+')');
								}
								return ;
							}
						}
				
						var parameters_1 = {
							adapter			: 'HttpAdapter_BPM_AWH',
							procedure		: 'submitTask_new',
							isLoading		: true,
							_pars	  : {
								documentId			:	Ext.getCmp('h_docUid').getValue(),
								appId				:	Ext.getCmp('h_appId').getValue(),
								taskId				:	Ext.getCmp('h_taskId').getValue(),
								nextOwners			:	"{}",
								nextNodes			:	"{}",
								nextOwnerNames		:	"{}",
								rollbackGroupType	:	"",
								//condi:'0：同意或保留意见 -1：否决'
								params				:	"{condi:'"+_type+"'}",
								autoCommit			:	"",
								note				:	_R_note,//提交意见
								token				:	token
							},
						};
											
						MainCtr.getDataFromServer(getResult_1,parameters_1);
					}else{
						Ext.Msg.alert('温馨提示', '保存出错！('+resp.msg+')');
						return ;
					}
				}
		
				var parameters = {
					adapter	:'HttpAdapter_BPM_AWH',
					procedure : 'updateDocument_new',
					isLoading : true,
					_pars	  : {
						params:"{docUid:'"+Ext.getCmp('h_docUid').getValue()+"',appId:'"+Ext.getCmp('h_appId').getValue()+"',docData:{condi:'"+_type+"'}}",
						token:token
					},
				};
									
				MainCtr.getDataFromServer(getResult,parameters);
				}
			}
		});
	},
});

function ToWGMaterialDetail(_gh,_ghtzxh,_lineid){
	var _bjsjid = Ext.getCmp('h_BjSjID').getValue();
	var __controlled = Ext.getCmp('h_dataPanelMan').getValue().indexOf(empNum) > -1?false:true;
	var __controlled2 = Ext.getCmp('h_dataPanelMan2').getValue().indexOf(empNum) > -1?false:true;
	console.log('bjsjid',_bjsjid);
	console.log('lineid',_lineid);
	var getResult = function(res){
		console.log('res',res);
		if(res.code == '0'){
			viewUtil.goNext('MaterialDetail','HelcBPM.view.Remould.AssetDetail');
			Ext.getCmp('D_Gh').setValue(_gh);
			Ext.getCmp('D_GhTzXh').setValue(_ghtzxh);
			var _data = [];
			if(res.data[0].length){
				for(var i = 0;i < res.data[0].length;i++){
					_data.push({
						WlCode:res.data[0][i].WlCode,
						WlName:res.data[0][i].WlName,
						XhGg:res.data[0][i].XhGg,
						Unit:res.data[0][i].Unit,
						WlCbjBhs:__controlled2?'■■■■■■':res.data[0][i].WlCbjBhs,
						WlJsj:__controlled?'■■■■■■':res.data[0][i].WlJsj,
						Num:res.data[0][i].Num,
						WlCbHj:__controlled2?'■■■■■■':res.data[0][i].WlCbHj,
						WljsjHjHs:__controlled?'■■■■■■':res.data[0][i].WljsjHjHs,
						Remark:res.data[0][i].Remark
					})
				}
			}
			Ext.getCmp('list_R_AssetDetail_WLBJ').getStore().setData(_data);
			
			var _data1 = [];
			if(res.data[1].length){
				for(var i = 0;i < res.data[1].length;i++){
					_data1.push({
						QtWlCode:res.data[1][i].QtWlCode,
						QtWlName:res.data[1][i].QtWlName,
						QtXhGg:res.data[1][i].QtXhGg,
						QtUnit:res.data[1][i].QtUnit,
						QtWlCbjBhs:__controlled2?'■■■■■■':res.data[1][i].QtWlCbjBhs,
						QtWlJsj:__controlled?'■■■■■■':res.data[1][i].QtWlJsj,
						QtNum:res.data[1][i].QtNum,
						QtWlCbHj:__controlled2?'■■■■■■':res.data[1][i].QtWlCbHj,
						QtWljsjHjHs:__controlled?'■■■■■■':res.data[1][i].QtWljsjHjHs,
						QtRemark:res.data[1][i].QtRemark
					})
				}
			}
			Ext.getCmp('list_R_AssetDetail_QTWLBJ').getStore().setData(_data1);
			
			var _data2 = [];
			if(res.data[2].length){
				for(var i = 0;i < res.data[2].length;i++){
					_data2.push({
						XqType:res.data[2][i].XqType,
						Xqx:res.data[2][i].Xqx,
						XmZyTime:res.data[2][i].XmZyTime,
						XmWl:res.data[2][i].XmWl
					})
				}
			}
			Ext.getCmp('list_R_AssetDetail_GZGF').getStore().setData(_data2);
			
			var _data3 = [];
			if(res.data[3].length){
				for(var i = 0;i < res.data[3].length;i++){
					_data3.push({
						KxMx:res.data[3][i].KxMx,
						KxJg:res.data[3][i].KxJg,
						KxRemark:res.data[3][i].KxRemark
					})
				}
			}
			Ext.getCmp('list_R_AssetDetail_QTKX').getStore().setData(_data3);
		}
	}
	
	var parameters = {
		adapter		:'HttpAdapter_BPM_AWH',
		procedure	: 'getWGDetailList',
		isLoading	: true,
		_pars		: {
			jsonString:"{bjSjId:'"+_bjsjid+"',lineId:'"+_lineid+"'}",
		},
	};
									
	MainCtr.getDataFromServer(getResult,parameters);
}