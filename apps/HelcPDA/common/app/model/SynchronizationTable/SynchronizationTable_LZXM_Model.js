Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_LZXM_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields : [
		          'MeasureRecordValue',//录入值
		          'MeasureRecordContent',//录入内容
		          'MeasureRecordDescription',//说明
		          'MeasureRecordItemContent',//作业内容
		          'ParentItemId',//用于判断属于那个作业项目
		          
		          
		          'RecordItemId',
		          'Id',
		          'MeasureRecordId',
		          'MeasureRecordValue',
	        	  'RecordItemContent',
	        	  
	        	  
		   ]
	}
});