
/* JavaScript content from app/model/compact/CompactHeadModel.js in folder common */
/**
 * 合同头信息
 */
Ext.define('HelcPDA.model.compact.CompactHeadModel',{
	extend:'Ext.data.Model',
	config:{
		// 合同编号  名称
		fields:['AGREE_NUM','AGREE_NAME','AGREE_ID',
		        'ACCOUNT_ID','SIGN_DATE','AGREE_TYPE',
		        'STATUS','BUSINESS_TYPE','MAINTAIN_CYCLE',
		        'URGENT_REQ_TIME','FINAL_ACCOUNT','COMMENTS']
	}
});