
/* JavaScript content from app/store/chart/boxup/BoxUpByYearStore.js in folder common */
Ext.define("Helcss.store.chart.boxup.BoxUpByYearStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.boxup.BoxUpByYearModel"],
    config : {
    	model : 'Helcss.model.chart.boxup.BoxUpByYearModel'
		//data : [{WANK_NUM : 100, CMF_NUM : 22, CMF_RATE : 18, CMF_IN_RATE : 28, CMF_CHECK_RATE : 38}]
    }
});