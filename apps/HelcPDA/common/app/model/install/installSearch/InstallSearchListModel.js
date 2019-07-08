Ext.define('HelcPDA.model.install.installSearch.InstallSearchListModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		      'CUSTOMER_NAME','INIT_PERSON_NAME','DEBUG_EMPLOYEE_NAME','CHECK_EMPLOYEE_NAME'  
			 ,'ENGCONTRACT_NUMBER','ELEVATOR_NO','STATUS','ENTRANCE_DATE',
			'REPORT_DEBUG_DATE','DEBUG_ARRIVE_DATE','DEBUG_END_DATE','CHECK_ARRIVE_DATE','CHECK_DATE',
			'REPORT_DATE','DEBUG_NUM','CHECK_NUM',  
		      //工号台数
			  'NUM','SEQ_NUM','TASK_ID',
			  
			  //添加字段
			  'ELEVATOR_CLASS_NAME','INSTALL_ADDRESS','CCRQ','ENTRANCE_DATE',
			  'SIGNED_TRANSFER_DOC_DATE','GOV_CHECK_DATE'
			  
			  
			  //排产用
			  ,'UserID','UserName','INIT_PERSON_ID','CONTRACT_NO',
			  //箱头用
			  'ELVBOX_NAME','REPORT_CHECK_DATE'
			  
		        ]
	}
});
