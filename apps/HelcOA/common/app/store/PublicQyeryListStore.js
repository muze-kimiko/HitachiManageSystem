/**
 * 起草-人员查询列表
 */
Ext.define("HelcOA.store.PublicQyeryListStore",{
	extend:'Ext.data.Store',
	requires:["HelcOA.model.PublicQyeryListModel"],
	config:{
		model:'HelcOA.model.PublicQyeryListModel',
	}
});