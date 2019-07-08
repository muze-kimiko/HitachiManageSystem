/**
 * JS_baoyang_Store
 */
Ext.define("Helcss.store.JS_baoyang_Store", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.JsModel"],
    config : {
    	model : 'Helcss.model.JsModel', 
       filters: {property:'ele_status',value:'保养'}
       
    }
});