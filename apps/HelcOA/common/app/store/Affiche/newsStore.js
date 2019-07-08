Ext.define("HelcOA.store.Affiche.newsStore",{
	extend:'Ext.data.Store',
	requires:["HelcOA.model.Affiche.newsModel"],
	config:{
		model:'HelcOA.model.Affiche.newsModel',
	}
});