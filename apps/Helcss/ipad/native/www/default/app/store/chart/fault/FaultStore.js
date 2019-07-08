
/* JavaScript content from app/store/chart/fault/FaultStore.js in folder common */
Ext.define("Helcss.store.chart.fault.FaultStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.fault.FaultModel"],
    config : {
    	model : 'Helcss.model.chart.fault.FaultModel'
		//data : [{WANK_NUM : 100, CMF_NUM : 22, CMF_RATE : 18, CMF_IN_RATE : 28, CMF_CHECK_RATE : 38}]
    }
});