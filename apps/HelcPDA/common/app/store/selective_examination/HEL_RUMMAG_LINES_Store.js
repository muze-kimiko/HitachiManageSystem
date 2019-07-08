/**
 * xcx 2014-11-12
 */

Ext.define('HelcPDA.store.selective_examination.HEL_RUMMAG_LINES_Store',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.selective_examination.HEL_RUMMAG_LINES_Model'],
	config:{
		model:'HelcPDA.model.selective_examination.HEL_RUMMAG_LINES_Model'
	},
});