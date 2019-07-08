
/* JavaScript content from app/model/SynchronizationTable/SynchronizationTable_XMH_Model.js in folder common */
Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_XMH_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields : ['Id',  //ID
		        'ContentCover',//适用范围
		        'ContentIfMeasure',//是否测量项目
		        'ContentIfPhoto',//是否拍照
		        'ContentIfRequired', //是否必填
		        'ContentLocation',//位置
		        'ContentName',//项目名称
		        'ContentOperateContent',//作业内容
		        'ContentOperateStandard',//作业标准
		        'ContentProjectRequire',//项目要求
		        'ContentProjectTaskNo', //项目号
		        'ContentType',//项目类型
		]
	}
});