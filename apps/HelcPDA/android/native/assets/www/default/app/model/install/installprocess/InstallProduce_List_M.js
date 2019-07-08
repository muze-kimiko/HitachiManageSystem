
/* JavaScript content from app/model/install/installprocess/InstallProduce_List_M.js in folder common */
Ext.define('HelcPDA.model.install.installprocess.InstallProduce_List_M',{
	extend:'Ext.data.Model',
	config:{
		fields:['QRPC_STATUS','ELEVATOR_NO','CONTRACT_NO','ELEVATOR_CLASS','IS_CHANGED',
		        'FROM_ELEVATOR','DELIVERY_DATE','TMPELV_DELIVERY_DATE','REFERENCE_DATE',
		        'PRESCHEDULE_CONFIRM_DATE','PRESCHEDULE_DATE','NODE_NAME','LIST_PUBLISHED_DATE',
		        'ATO_PROCESS','BRANCH_CABLE_STATUS','PROCESS_NAME','PRE_NODE_NODE_NAME',
		        'PRE_NODE_CONFIRM_DATE','SOURCE_TYPE','RESTRICT_DAY','FINAL_CONFIRM_DATE']
	}
});