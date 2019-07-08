
/* JavaScript content from app/model/ghj/ghjFunction/GHJAssetNumberSelectModel.js in folder common */
Ext.define('HelcPDA.model.ghj.ghjFunction.GHJAssetNumberSelectModel',{
	extend:'Ext.data.Model',
	config:{
		
		fields : [ 
	'AssetAddress',
	'AssetDomainName',
	'AssetNumber',
	'CompanyOrganization',
	'EdificeName',
	'Id',
	'ListOfPosition',
	'ProductName',
	'ProductPart',
	{name:'ListOfAssetMgmt-Asset_Organization',type:'object'},

		]
	}
});