Ext.define('HelcPDA.model.fault.FaultAppearanceModel',{
	extend:'Ext.data.Model',
	config:{
		fields:['FAULT_CAUSE','FAULT_RESOURCE','FAULT_REASON','REASON_ANALYSE','SOLUTION',
		        //新增字段
		        'Fault_Floor_Number']
	}
});