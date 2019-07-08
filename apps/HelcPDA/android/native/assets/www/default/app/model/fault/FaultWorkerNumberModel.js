
/* JavaScript content from app/model/fault/FaultWorkerNumberModel.js in folder common */
/**
 * 服务请求录入  查询 用 2014-4-22 xcx
 */
Ext.define('HelcPDA.model.fault.FaultWorkerNumberModel',{
	extend:'Ext.data.Model',
	config:{ //    工号 /受信地盘/受信大楼/受信地址
		fields:['ASSET_NUM',
		        //oa流程用
		        'Asset_Mum','TYPE_NO','USER_NAME']
	}
});