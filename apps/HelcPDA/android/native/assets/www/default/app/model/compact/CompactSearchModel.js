
/* JavaScript content from app/model/compact/CompactSearchModel.js in folder common */
/**
 * 合同信息查询
 */
Ext.define('HelcPDA.model.compact.CompactSearchModel',{
	extend:'Ext.data.Model',
	config:{
		// 合同编号  名称
		fields:['AGREE_NUM','AGREE_NAME']
	}
});