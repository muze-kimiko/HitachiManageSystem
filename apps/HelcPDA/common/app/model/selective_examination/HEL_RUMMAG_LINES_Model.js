/**
 * 整改单行  2014-11-12 xcx 
 */

Ext.define('HelcPDA.model.selective_examination.HEL_RUMMAG_LINES_Model',{
	extend:'Ext.data.Model',
	config:{
		fields : ['HEADER_ID',
		          'LINE_ID',
		          'SEQUENCE',
		          'QUESTION_TYPE',
		          'DEDUCTIONS',
		          'COMMENTS',
		          'CREATION_DATE',
		          'DATA_SOURCE',
		          'IMPORT_STATUS'
		         ]
	}
});