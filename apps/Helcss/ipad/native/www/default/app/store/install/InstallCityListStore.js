
/* JavaScript content from app/store/install/InstallCityListStore.js in folder common */
Ext.define("Helcss.store.install.InstallCityListStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.XunshiSearchModel"],// 直接用巡视的list Model
    config : {
    	model : 'Helcss.model.XunshiSearchModel', 
    }
});