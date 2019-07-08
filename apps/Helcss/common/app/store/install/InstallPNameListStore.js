Ext.define("Helcss.store.install.InstallPNameListStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.install.InstallPNameListModel"],
    config : {
    	model : 'Helcss.model.install.InstallPNameListModel', 
    }
});