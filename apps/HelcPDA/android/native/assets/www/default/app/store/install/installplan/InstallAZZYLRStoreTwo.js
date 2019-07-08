
/* JavaScript content from app/store/install/installplan/InstallAZZYLRStoreTwo.js in folder common */
/**
 * 安装资源录入  用于下拉列表框获取人员
 * 
 * 2014-6-12 xcx
 */

Ext.define('HelcPDA.store.install.installplan.InstallAZZYLRStoreTwo',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installplan.InstallAZZYLRModel'],
	config:{
		model:'HelcPDA.model.install.installplan.InstallAZZYLRModel'
	},
});