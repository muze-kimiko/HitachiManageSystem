Ext.define("Helcss.store.ChartStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.ChartModel"],
    config : {
    	model : 'Helcss.model.ChartModel'
    }
});