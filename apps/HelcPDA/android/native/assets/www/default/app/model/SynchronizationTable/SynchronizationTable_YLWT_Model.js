
/* JavaScript content from app/model/SynchronizationTable/SynchronizationTable_YLWT_Model.js in folder common */
Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_YLWT_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields : ['Id', //遗留问题的ID
		          'Searchspec',
		          'MeasureLegacyOverproofReason',//超差问题
		          'MeasureLegacyParId',
		          'MeasureLegacyProjectItemId',
		          'MeasureLegacyProjectNo',//项目号
		          'MeasureLegacySpotSituation',//现场情况
		            
		]
	}
});