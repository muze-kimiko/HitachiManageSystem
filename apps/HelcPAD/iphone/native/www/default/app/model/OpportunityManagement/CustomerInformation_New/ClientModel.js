
/* JavaScript content from app/model/OpportunityManagement/CustomerInformation_New/ClientModel.js in folder common */
Ext.define('HelcPAD.model.OpportunityManagement.CustomerInformation_New.ClientModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		        'AccountAttribute',  //: "直接销售",
	            'AccountKANumber',   //: "KA2009008",
	            'AccountMPType',     //: "万科",
	            'AccountNumber1',    //: "",
	            'AccountProperty',   //: "房地产开发建设经营企业",
	            'AccountStatus',     //: "有效",
	            'AccountSubType',    //: "",
	            'ApproveStatus',     //: "",
	            'BigCustomer',       //: "万科企业股份有限公司",
	            'CSN',               //: "1-6BQW7T",
	            'CurrencyCode',      //: "CNY",
	            'EBSCustomerName',   //: "万科企业股份有限公司",
	            'EBSCustomerName1',  //: "",
	            'EBSCustomerNumber', //: "BAB0017381",
	            //"ListOfAccount_Organization": {
	            //"Account_Organization": {
	            'BackOfficeDistributionChannel',     //: "",
	            'BackOfficeSalesOrganization',       //: "",
	            'IsPrimaryMVG',                      //: "Y",
	            'Location2',   //原：Location         //: "内部",
	            'Organization',                      //: "营业工程总部",
	            'OrganizationId',                    //: "1-7D3D",
	            'OrganizationIntegrationId',         //: ""
	            //}                                  
	            //},                                  
	            'Location',                          //: "19492",
	            'LoginOrganizationId',               //: "0-R9NH",
	            'Name',                              //: "万科企业股份有限公司",
	            'OrgCodeDate2',                      //: "",
	            'OrgCodeNumber2',                    //: "",
	            'ParentAccountName',                 //: "",
	            'PrimaryOrganization',               //: "营业工程总部, 内部",
	            'PrimaryOrganizationId',             //: "1-7D3D",
	            'RowId',                             //: "1-6BQW7T",
	            'Type',                              //: "大客户"

	            //自建有时候临时的有数据，正式的没数据，判断.已正式为主。
	            //用于显示客户编码和客户名称
	            'EBScn',   //编码
	            'EBSname',    //名称
	            
	            //补上
	            'ParentAccountId',  //特加
	            'Location',  //"内部"
	           
		]
	}
});