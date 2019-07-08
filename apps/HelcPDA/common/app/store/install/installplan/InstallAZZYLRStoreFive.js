/**
 * 安装资源录入  用于装载安装人员
 * 
 * 2014-6-12 xcx
 */

Ext.define('HelcPDA.store.install.installplan.InstallAZZYLRStoreFive',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installplan.InstallAZZYLRModel'],
	config:{
		model:'HelcPDA.model.install.installplan.InstallAZZYLRModel'
	},
});