Ext.define('HelcPAD.model.OpportunityManagement.Director.ClueDirectorModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
			'AgentName',// "上海仓灵实业有限公司"
			'Id',// "1-QY1W71"
			'LeadStatus',// "关联成功"
			{name:'ListOfHELLead_AgentPosition',type:'object'},// Object
			'OpptyNumber',// "BA07_AH15_000280"
			'ProjectName',// "双十一测试01"
			'RegistrationPerson',// "苏 雄师"
			'StreetAddress',// "建国新路77号"
			'SubmitDate',// "11/11/2015 10,//42,//20"
		]
	}
});