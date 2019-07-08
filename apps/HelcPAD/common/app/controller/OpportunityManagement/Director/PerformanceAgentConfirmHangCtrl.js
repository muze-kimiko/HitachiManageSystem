Ext.define('HelcPAD.controller.OpportunityManagement.Director.PerformanceAgentConfirmHangCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#performanceAgentConfirmHang_HF":{
				tap:'performanceAgentConfirmHang_HF'
			},
			
			//修改
			"button#performanceAgentConfirmHang_BC":{
				tap:'performanceAgentConfirmHang_BC'
			},
			
		}
	},
	
	//修改
	performanceAgentConfirmHang_BC:function(){
		var obj=this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否执行当前操作?',
			   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					   obj.perXg(obj);
				   }
			   }
		});
	},
	
	perXg:function(obj){
		
		var obj=this;
		var sm=Ext.getCmp('PAC_Comments').getValue();
		getResult=function(result){			
			result.obj.BackView();
			result.obj.BackView();
			Ext.Msg.alert("温馨提示","执行成功");
			//perSx(obj);
		};
		
		var ZZ=obj.getApplication().getController('OpportunityManagement.Director.PerformanceAgentConfirmCtrl').recordData;
		//cc.log(ZZ);
		//cc.log(ZZ.OpptyId2);
		var Data={};
		Data.userID=userID;
		Data.OptyId=ZZ.OpptyId2;
		Data.Id=ZZ.Id;
		Data.Comments=sm;
		Data.Organization='Organization';
		
		var trim={};
		trim.adpName='HttpAdapter_PAD_Custom';
		trim.prodName='ZGxgdlsyj';
		trim.parameters=Data;
		trim.obj=obj,
		//return;
		obj.XCX_GG_FF(getResult,trim,1);
	},
	
	
	//返回
	performanceAgentConfirmHang_HF:function(){
		this.BackView();
		Ext.getCmp('performanceAgentConfirm_toolbar').setHidden(false);
	},

});