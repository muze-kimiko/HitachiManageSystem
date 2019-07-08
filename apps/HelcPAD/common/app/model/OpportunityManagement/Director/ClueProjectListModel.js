Ext.define('HelcPAD.model.OpportunityManagement.Director.ClueProjectListModel',{
	extend:'Ext.data.Model',
	config:{
		fields:['OpptySubCategory',//"商场",
		        'YCoordinate',//"12",
		        'RowId',//"1-QY2P7K",
		        'Account',//"20150526V2",
		        'AgentPerformanceStatus',//"新建",
		        'BigCustomer',//"",
		        'EvaluateEscalatorQuantity',//"12",
		        'ContractNumber',//"",
		        'OpptyInstallSite',//"建国新路77号",
		        {name:'ListOfOpportunity_Position',type:'object'},
		        //'ListOfOpportunity_Position',/*:{"Opportunity_Position'//[{"IsPrimaryMVG'//"Y","SalesRepId'//"1-R9I13","SalesLoginName'//"6405","FullName'//"陆 佳慧","SalesRep'//"陆 佳慧","PositionId'//"1-1R4I33"},{"IsPrimaryMVG'//"N","SalesRepId'//"1-R9F7N","SalesLoginName'//"0993","FullName'//"苏 雄师","SalesRep'//"苏 雄师","PositionId'//"1-R9F7V"}]},*/
		        'Name',//"20121112001",
		        'OpptyFinalUser',//"20150526V2",
		        'OpptyStatus',//"跟进",
		        'XHeight',//"121",
		        'PrimaryOrganization',//"汕头分公司",
		        'OpptyType',//"设备商机",
		        'SalesLoginName',//"6405",
		        'SalesRep',//"陆 佳慧",
		        'OpptyCategory',//"商业",
		        'SupplierOpportunity',//"",
		        'BuildingLayer',//"12",
		        'EvaluateElevatorQuantity',//"12",
		        'OpportunityNumber',//"BA07_AH15_000282",
		        'Created',  //商机创建时间	Created	2015-9-29 13:35	
		        'Id',
		  ]
		  

	}
});