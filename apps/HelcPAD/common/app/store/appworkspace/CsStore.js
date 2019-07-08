/**
 * 安装任务模板,安装计划用
 * 未进场
 * 2014-4-29 xcx
 */

Ext.define('HelcPAD.store.appworkspace.CsStore',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.appworkspace.CsModel'],
	config:{
		model:'HelcPAD.model.appworkspace.CsModel'
	},
});