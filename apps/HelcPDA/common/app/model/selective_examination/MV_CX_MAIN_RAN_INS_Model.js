/**
 * 整改 基础数据 2014-11-12 xcx 
 */

Ext.define('HelcPDA.model.selective_examination.MV_CX_MAIN_RAN_INS_Model',{
	extend:'Ext.data.Model',
	config:{
		fields : ['ROW_ID',
		          'CREATED',
		          'CREATED_BY',
		          'LAST_UPD',
		          'LAST_UPD_BY',
		          'MODIFICATION_NUM',
		          'CONFLICT_ID',
		          'DB_LAST_UPD',
		          'COMMNETS',
		          'DB_LAST_UPD_SRC',
		          'GLOBAL_TASK_DEMAND',
		          'HOSTLING_TASK_DEMAND',
		          'STANDARD_DEDUCTION',
		          'STATUS',
		          'SUCCESSION',
		          'TASK_COMMENTS',
		          'TASK_EXPLAIN',
		          'TASK_GROUP_NAME',
		          'TASK_NAME',
		          'TASK_TYPE',
		          'QUESTION_TYPE',
		          'PRINT_FLG',
		          'TEMP',
		         ]
	}
});