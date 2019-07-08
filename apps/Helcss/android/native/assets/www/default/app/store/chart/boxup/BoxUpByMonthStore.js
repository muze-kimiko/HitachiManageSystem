
/* JavaScript content from app/store/chart/boxup/BoxUpByMonthStore.js in folder common */
Ext.define("Helcss.store.chart.boxup.BoxUpByMonthStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.boxup.BoxUpByMonthModel"],
    config : {
    	model : 'Helcss.model.chart.boxup.BoxUpByMonthModel'
		//data : [{WANK_NUM : 100, CMF_NUM : 22, CMF_RATE : 18, CMF_IN_RATE : 28, CMF_CHECK_RATE : 38}]
    }
});