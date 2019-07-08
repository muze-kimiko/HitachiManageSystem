
/* JavaScript content from app/store/chart/fault/SRFaultByMonthStore.js in folder common */
Ext.define("Helcss.store.chart.fault.SRFaultByMonthStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.fault.SRFaultByMonthModel"],
    config : {
    	model : 'Helcss.model.chart.fault.SRFaultByMonthModel'
		//data : [{WANK_NUM : 100, CMF_NUM : 22, CMF_RATE : 18, CMF_IN_RATE : 28, CMF_CHECK_RATE : 38}]
    }
});