
/* JavaScript content from app/controller/Maintain/MaintainMainCtrl.js in folder common */
Ext.define("HelcBPM.controller.Maintain.MaintainMainCtrl", {
	extend : "HelcBPM.controller.ApplicationController",
	config : {
		control : {
			"button#btn_Mapprove_back":{
				tap:'btn_Mapprove_back'
			},
			"button#btn_M_MaterialDetail_back":{
				tap:'btn_M_MaterialDetail_back'
			},
			"button#btn_Mapprove_agree":{
				tap:'btn_Mapprove_agree'
			},
			"button#btn_Mapprove_reject":{
				tap:'btn_Mapprove_reject'
			},
		}
	},
	
	btn_Mapprove_back:function(obj, e, opt){
		viewUtil.goLast();
	},
	
	btn_M_MaterialDetail_back:function(obj, e, opt){
		viewUtil.goLast();
	},
	//同意
	btn_Mapprove_agree:function(obj, e, opt){
		this.M_Submit('0');
	},
	
	//拒绝
	btn_Mapprove_reject: function(obj, e, opt){
		this.M_Submit('-1');
	},
	
	M_Submit:function(type){
		var _type = type == '-1'?'-1':'0';
		var _M_note = Ext.getCmp("M_note").getValue();
		var _stepId = Ext.getCmp('h_stepId').getValue();
		var Mem = {
			'type//按钮送过来：0同意、1保留意见、-1否决':type,
			'_type//定义送过去的参数：0同意&保留意见、-1否决':_type,
		};
		console.log('Mem',Mem);
		
		if(_M_note == "" || _M_note == null || _M_note == undefined){
			Ext.Msg.alert("温馨提示", "请输入审批意见！");
			return ;
		}
		
		var _confirmText = '';
		
		if(_M_note.length > 200){
			Ext.Msg.alert("温馨提示", "审批意见不能超200字！");
			return ;
		}
		console.log('_M_note',_M_note);
		console.log('_M_note.lenght',_M_note.length);
		
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
								note				:	_M_note,//提交意见
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

function ToWXMaterialDetail(_gh,_ghtzxh,_lineid){
	var _bjsjid = Ext.getCmp('h_BjSjID').getValue();
	var __controlled = Ext.getCmp('h_dataPanelMan').getValue().indexOf(empNum) > -1?false:true;
	console.log('bjsjid',_bjsjid);
	console.log('gh',_gh);
	console.log('lineid',_lineid);
	var getResult = function(res){
		console.log('res',res);
		if(res.code == '0'){
			viewUtil.goNext('MaterialDetail','HelcBPM.view.Maintain.MaterialDetail');
			Ext.getCmp('D_Gh').setValue(_gh);
			Ext.getCmp('D_GhTzXh').setValue(_ghtzxh);
			var _data = [];
			if(res.data.length){
				for(var i = 0;i < res.data.length;i++){
					_data.push({
						WlCode:res.data[i].WlCode,
						DkhXyjHs:res.data[i].DkhXyjHs,
						DkhZkl:res.data[i].DkhZkl,
						DgWlQwj:res.data[i].DgWlQwj,
						WlName:res.data[i].WlName,
						GcBzCb:__controlled?'■■■■■■':res.data[i].GcBzCb,
						DgwlQwjHs:res.data[i].DgwlQwjHs,
						Num:res.data[i].Num,
						YjFgsCgCb:__controlled?'■■■■■■':res.data[i].YjFgsCgCb,
						WlQwjHj:res.data[i].WlQwjHj,
						SpJsFs:res.data[i].SpJsFs,
						YjXsLrl:__controlled?'■■■■■■':res.data[i].YjXsLrl,
						SjHj:res.data[i].SjHj,
						Sp1:res.data[i].Sp1,
						Spl:res.data[i].Spl,
						WlqwjHjHs:res.data[i].WlqwjHjHs,
						Sp2:res.data[i].Sp2,
						SplZh:res.data[i].SplZh,
						WlhFl:res.data[i].WlhFl
					})
				}
			}
			Ext.getCmp('list_M_MaterialDetail').getStore().setData(_data);
		}
	}
	
	var parameters = {
		adapter		:'HttpAdapter_BPM_AWH',
		procedure	: 'getWXDetailList',
		isLoading	: true,
		_pars		: {
			jsonString:"{bjSjId:'"+_bjsjid+"',lineId:'"+_lineid+"'}",
		},
	};
									
	MainCtr.getDataFromServer(getResult,parameters);
}

