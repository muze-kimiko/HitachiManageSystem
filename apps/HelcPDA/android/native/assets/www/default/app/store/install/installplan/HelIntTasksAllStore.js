
/* JavaScript content from app/store/install/installplan/HelIntTasksAllStore.js in folder common */
/**
 * 安装任务模板,安装计划用
 * 未进场
 * 2014-4-29 xcx
 */

Ext.define('HelcPDA.store.install.installplan.HelIntTasksAllStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installplan.HelIntTasksAllModel'],
	config:{
		model:'HelcPDA.model.install.installplan.HelIntTasksAllModel'
	},
});