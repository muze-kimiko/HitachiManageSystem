
/* JavaScript content from app/model/selective_examination/CC_LIST_Model.js in folder common */
/**
 * 查询内容  2014-11-12 xcx 
 */

Ext.define('HelcPDA.model.selective_examination.CC_LIST_Model',{
	extend:'Ext.data.Model',
	config:{
		fields : [ //查询结果用数据
			          'ASSET_ID',
			          'AGREEMENT_ID',
			          'COMPANY_NAME',
			          'STATION_NAME',
			          //验证用 2015-8-19
			          'ID',
			          'NAME',
		         ]
	}
});