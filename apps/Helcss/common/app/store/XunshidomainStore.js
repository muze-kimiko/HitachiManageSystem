/**
 * XunshidomainStore
 */
Ext.define("Helcss.store.XunshidomainStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.XunshidomainModel"],
    config : {
    	model : 'Helcss.model.XunshidomainModel', 
    }
});