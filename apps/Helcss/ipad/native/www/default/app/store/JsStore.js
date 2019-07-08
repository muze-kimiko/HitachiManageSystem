
/* JavaScript content from app/store/JsStore.js in folder common */
/**
 * JsStore
 */
Ext.define("Helcss.store.JsStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.JsModel"],
    config : {
    	model : 'Helcss.model.JsModel',
//    	data:[{ele_no:'aaaaa',ele_domain:'aaaaa',ele_site:'aaaaa',ele_tino:'aaaaa',ele_checkdate:'aaaaa',ele_tyle:'aaaaa',ele_layer:'aaaaa',ele_station:'aaaaa',ele_status:'aaaaa'},
//  	          {ele_no:'aaaaa',ele_domain:'BBBB',ele_site:'aaaaa',ele_tino:'aaaaa',ele_checkdate:'aaaaa',ele_tyle:'aaaaa',ele_layer:'aaaaa',ele_station:'aaaaa',ele_status:'aaaaa'}
//             ]
//    filters: {property:'ele_status',value:'保养'}
      filters: {property:'ele_status',value:'异常'}
    }
});