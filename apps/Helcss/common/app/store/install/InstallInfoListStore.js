Ext.define("Helcss.store.install.InstallInfoListStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.install.InstallInfoListModel"],
    config : {
    	model : 'Helcss.model.install.InstallInfoListModel', 
    }
});