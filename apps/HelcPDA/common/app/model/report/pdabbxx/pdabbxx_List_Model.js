Ext.define('HelcPDA.model.report.pdabbxx.pdabbxx_List_Model',{
	extend:'Ext.data.Model',
	config:{
		fields : ['AREA','COMPANY','LOGIN_TOTAL'
		          ,'LOGIN_1_2','RATE_1_2','LOGIN_3_8','RATE_3_8'
		          ,'LOGIN_9_15','RATE_9_15','LOGIN_16_30','RATE_16_30'
		          ,'LOGIN_31_60','RATE_31_60','LOGIN_60','RATE_60'
		          ,'TNAME','TASK_TYPE','COMPANY_Name','COMPANY_CODE'
		          ]
	}
});