
/* JavaScript content from app/store/chart/boxup/BoxUpStore.js in folder common */
Ext.define("Helcss.store.chart.boxup.BoxUpStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.boxup.BoxUpModel"],
    config : {
    	model : 'Helcss.model.chart.boxup.BoxUpModel'
		//data : [{WANK_NUM : 100, CMF_NUM : 22, CMF_RATE : 18, CMF_IN_RATE : 28, CMF_CHECK_RATE : 38}]
    }
});