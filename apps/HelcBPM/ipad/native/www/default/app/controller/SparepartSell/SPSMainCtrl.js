
/* JavaScript content from app/controller/SparepartSell/SPSMainCtrl.js in folder common */
Ext.define("HelcBPM.controller.SparepartSell.SPSMainCtrl", {
	extend : "HelcBPM.controller.ApplicationController",
	config : {
		control : {
			"button#btn_SPSapprove_back":{
				tap:'btn_SPSapprove_back'
			},
			"button#btn_SPSapprove_agree":{
				tap:'btn_SPSapprove_agree'
			},
//			"button#btn_SPSapprove_reservations":{
//				tap:'btn_SPSapprove_reservations'
//			},
			"button#btn_SPSapprove_reject":{
				tap:'btn_SPSapprove_reject'
			},
		}
	},
	
	btn_SPSapprove_back:function(obj, e, opt){
		viewUtil.goLast();
	},
	
	//同意
	btn_SPSapprove_agree:function(obj, e, opt){
		this.SPS_Submit('0');
	},
	
	//保留意见
//	btn_SPSapprove_reservations: function(obj, e, opt){
//		this.SPS_Submit('1');
//	},
	
	//拒绝
	btn_SPSapprove_reject: function(obj, e, opt){
		this.SPS_Submit('-1');
	},
	
	SPS_Submit:function(type){
		var _type = type == '-1'?'-1':'0';
		var _SPS_note = Ext.getCmp("SPS_note").getValue();
		var _stepId = Ext.getCmp('h_stepId').getValue();
		var Mem = {
			'type//按钮送过来：0同意、1保留意见、-1否决':type,
			'_type//定义送过去的参数：0同意&保留意见、-1否决':_type,
		};
		console.log('Mem',Mem);
		
		if(_SPS_note == "" || _SPS_note == null || _SPS_note == undefined){
			Ext.Msg.alert("温馨提示", "请输入审批意见！");
			return ;
		}
		
		var _confirmText = '';
		
		if(_SPS_note.length > 200){
			Ext.Msg.alert("温馨提示", "审批意见不能超200字！");
			return ;
		}
		console.log('_SPS_note',_SPS_note);
		console.log('_SPS_note.lenght',_SPS_note.length);
		
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
								note				:	_SPS_note,//提交意见
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