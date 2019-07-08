/**
 * XsSeachStore
 */
Ext.define("Helcss.store.XsSeachStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.XunshiSearchModel"],
    config : {
    	model : 'Helcss.model.XunshiSearchModel', 
    }
});