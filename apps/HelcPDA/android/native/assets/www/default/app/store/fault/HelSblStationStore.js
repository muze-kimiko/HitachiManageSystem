
/* JavaScript content from app/store/fault/HelSblStationStore.js in folder common */
/**
 * 站 数据仓   xcx 2014-4-18
 */
Ext.define('HelcPDA.store.fault.HelSblStationStore',{
	id:'FaultHSSStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.HelSblStationModel'],
	config:{
		model:'HelcPDA.model.fault.HelSblStationModel'
	},
});