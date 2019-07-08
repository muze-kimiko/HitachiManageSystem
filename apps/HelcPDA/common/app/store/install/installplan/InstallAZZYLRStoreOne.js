/**
 * 安装资源录入  用于查找到得服务商
 * 
 * 2014-6-12 xcx
 */

Ext.define('HelcPDA.store.install.installplan.InstallAZZYLRStoreOne',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installplan.InstallAZZYLRModel'],
	config:{
		model:'HelcPDA.model.install.installplan.InstallAZZYLRModel'
	},
});