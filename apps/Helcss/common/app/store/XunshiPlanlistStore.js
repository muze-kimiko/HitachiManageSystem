/**
 * XunshiPlanlistStore
 */
Ext.define("Helcss.store.XunshiPlanlistStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.XunshiPlanlistModel"],
    config : {
    	model : 'Helcss.model.XunshiPlanlistModel', 
    }
});