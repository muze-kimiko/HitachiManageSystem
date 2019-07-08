Ext.define("Helcss.store.chart.fault.SRFaultByYearStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.fault.SRFaultByYearModel"],
    config : {
    	model : 'Helcss.model.chart.fault.SRFaultByYearModel'
		//data : [{WANK_NUM : 100, CMF_NUM : 22, CMF_RATE : 18, CMF_IN_RATE : 28, CMF_CHECK_RATE : 38}]
    }
});