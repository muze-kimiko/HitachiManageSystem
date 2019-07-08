Ext.define('HelcPDA.model.report.installcomplete.InstallCompleteModel',{
	extend:'Ext.data.Model',
	config:{
		fields : ['COMPLETE_COUNT','COMPLETE_RATE','COMPLETE_TARGET'
		          ,'COMPANY_NAME','YEAR','COMPANY_ID','MONTH',
		          ]
	}
});