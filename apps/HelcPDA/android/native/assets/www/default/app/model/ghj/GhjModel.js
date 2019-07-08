
/* JavaScript content from app/model/ghj/GhjModel.js in folder common */
Ext.define('HelcPDA.model.ghj.GhjModel',{
	extend:'Ext.data.Model',
	config:{
		
		fields : [ 
		          'Updated','Type','ReplaceBy','ComponentCode','ComponentCompDescription',
		          'SRNumber','Status','CompQuantity','Created','AssetNumber',
		          'Id',
		          {name:'ListOfHELReplace_Organization',type:'object'},
		          'CompanyOrganization','ListOfHELReplace_ComponentOrganization','ComponentId',
		          'ComponentName','ComponentOutboundDate','AssetDomainName',
		          //总数量  自加
		          'Znumber',
		          'ComponentAliasName',

		]
	}
});