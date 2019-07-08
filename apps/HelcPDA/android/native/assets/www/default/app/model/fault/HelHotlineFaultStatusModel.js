
/* JavaScript content from app/model/fault/HelHotlineFaultStatusModel.js in folder common */
/**
 *  受信故障状态 模板   xcx 2014-4-21
 */

Ext.define('HelcPDA.model.fault.HelHotlineFaultStatusModel',{
	extend:'Ext.data.Model',
	config:{ // 受信状态                          编码                     电梯类型
		fields:['STATUS','LANGUAGE_CODE','REMARKS']
	}
});