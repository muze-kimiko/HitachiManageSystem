Ext.define('HelcPDA.controller.ghj.GHJInfoCtrl', {
	extend : 'HelcPDA.controller.ApplicationController',
	config : {
		control:{
			'selectfield#ghj_ElevatorType':{
				 change:'ghj_ElevatorType'
			 },
			 
			 'selectfield#ghj_Type':{
				 change:'ghj_Type'
			 },

		}
	},
	
	//跟换类型变为其他
	ghj_Type:function( selectField, newValue, oldValue, eOpts ){
		if(newValue!='急修'&&newValue!='保养'){
			Ext.getCmp('ghj_SRNumber').setValue('');
			//修改记录的更换件详细信息   
			var zd=objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData;
			zd.SRNumber='';
			//重记录
			objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData=zd;
		};
	},
	
	//不同的电梯类型会有不同的  “部件所在部位”
	ghj_ElevatorType:function( selectField, newValue, oldValue, eOpts ){
		//cc.log('newValue:'+newValue);
		var four=[];
		if(newValue=='扶梯'){
			four=[{text:'请选择',value:''},
			      {text:'上机房',value:'上机房'},
			      {text:'下机房',value:'下机房'},
			      {text:'扶手带',value:'扶手带'},
			      {text:'桁架',value:'桁架'}];
		}else if(newValue=='直梯'){
			four=[{text:'请选择',value:''},
			      {text:'井道',value:'井道'},
			      {text:'厅门/层站',value:'厅门/层站'},
			      {text:'底坑',value:'底坑'},
			      {text:'机房',value:'机房'},
			      {text:'轿门/轿厢',value:'轿门/轿厢'}];
		}else{
			four=[];
		};
		Ext.getCmp('ghj_Parts').setOptions(four);
	},
	
});