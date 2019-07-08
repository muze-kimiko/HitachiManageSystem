Ext.define('HelcPDA.controller.oa.startTheProcess.QualityControl.ThreeGuaranteesCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
	config:{
		control:{
		}
	},
	

	checkvalue : function(){
		if(Ext.getCmp('bdtype').getValue()=="三包单"){
			if(Ext.getCmp('sertime').getValue()==""){
				Ext.Msg.alert("已过三包期，不需要提交流程！");
				return false;
			}else{
				var aDate;
				var d1 = Ext.getCmp('sertime').getValue();
				aDate = d1.split("-");
			    st2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
			    var aa=new Date();
		        if (aa>st2){
		        	Ext.Msg.alert("已过三包期，不需要提交流程！");
		            return false;
		        }
			}
		}
		
		return true;
	},
	
	//根据工号返回信息
	GetElevator_no_Info2 : function(obj, newDate, oldDate, eOpts){
		var obj_this = this;
		var scgh = Ext.getCmp('produceno').getValue();

		var getResult=function(res){
			var jsonObj = eval(res.html.body);
			cc.log(jsonObj);
			Ext.getCmp('usersname').setValue(jsonObj.data[0].username);
			Ext.getCmp('typeno').setValue(jsonObj.data[0].type);
			Ext.getCmp('sertime').setValue(jsonObj.data[0].sbq);
			if(jsonObj.data[0].makeadd=="null"){
				Ext.getCmp('sertime').setValue("HELC_INV");
			}else{
				Ext.getCmp('sertime').setValue(jsonObj.data[0].makeadd);
			}
		};
		var params = {};
		params.method = 'GetElevator_no_Info2';
		params.parameters = [scgh];
		obj_this.connectServer_OA(getResult,params);
	},
	
	//输入合同号后判断是否为重点项目
	GetImportant : function(obj, newDate, oldDate, eOpts){
		var obj_this = this;
		var ygh = Ext.getCmp('hth').getValue();
		var node = Ext.getCmp('node').getValue();

		if (node=="起草") {
			if(ygh != ""){
				var getResult=function(res){
					var jsonObj = eval(res.html.body);
					cc.log(jsonObj);
					if(jsonObj.data[0].contractno==ygh){
						Ext.getCmp('zd').setValue('重点项目');
					}else{
						Ext.Msg.alert('此合同号不是重点项目');
					};
				};
				var params = {};
				params.method = 'GetImportant';
				params.parameters = [ygh];
				obj_this.connectServer_OA(getResult,params);
			};
		};
	},
	
	//根据物资代码返回信息
	GetPartsInfo : function(obj, newDate, oldDate, eOpts){
		var obj_this = this;
		var parts = Ext.getCmp('parts').getValue();
		var node = Ext.getCmp('node').getValue();
		
		if (node=="起草") {
			var getResult=function(res){
				var jsonObj = eval(res.html.body);
				cc.log(jsonObj);
				if(jsonObj.data[0].b_drawing_number=="找不到相关参数"){
					Ext.getCmp('parts').setValue('');
				}else{
					Ext.getCmp('mapzyno').setValue(jsonObj.data[0].b_drawing_number);
					Ext.getCmp('secoutno').setValue(jsonObj.data[0].b_job);
					Ext.getCmp('partxh').setValue(jsonObj.data[0].b_name);
					Ext.getCmp('partsxh').setValue(jsonObj.data[0].b_description);
				}
			};
			var params = {};
			params.method = 'GetPartsInfo';
			params.parameters = [parts];
			obj_this.connectServer_OA(getResult,params);
		};
	}
	
	
	
	
	    
	    
	
	
});