
/* JavaScript content from app/store/install/installplan/HelIntTasksAllStoreTwo.js in folder common */
/**
 * 安装任务模板,安装计划用
 * 
 * 2014-4-29 xcx
 */

Ext.define('HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installplan.HelIntTasksAllModel'],
	config:{
		model:'HelcPDA.model.install.installplan.HelIntTasksAllModel'
	},
});