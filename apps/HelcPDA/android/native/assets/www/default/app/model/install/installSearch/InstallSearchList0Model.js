
/* JavaScript content from app/model/install/installSearch/InstallSearchList0Model.js in folder common */
Ext.define('HelcPDA.model.install.installSearch.InstallSearchList0Model',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		        //安装要使用的信息
		      'UserID','UserName',
		        //排产要使用的信息
              'STATUS','CONTRACT_NO','ELEVATOR_NO','INIT_PERSON_ID','ENGCONTRACT_NUMBER'   
		        ]
	}
});
