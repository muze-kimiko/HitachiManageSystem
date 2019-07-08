/**
 * 整改菜单内容  2014-11-12 xcx 
 */

Ext.define('HelcPDA.model.selective_examination.HEL_CHANGE_MENU_Model',{
	extend:'Ext.data.Model',
	config:{
		fields : ['HEADER_ID',
		          'LINE_ID',
		          'SEQUENCE',
		          'TASK_NAME',
		          'MENU_CONTENT',
		          'CREATION_DATE',
		          'DATA_SOURCE',
		          'IMPORT_STATUS',
		          'RUMMAG_CODE'
		         ]
	}
});