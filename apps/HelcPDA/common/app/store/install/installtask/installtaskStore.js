
Ext.define("HelcPDA.store.install.installtask.installtaskStore",{
	extend:'Ext.data.Store',
	id:'installtaskStore_id',
	requires:["HelcPDA.model.install.installtask.installtaskModel"],
	config:{
		model:'HelcPDA.model.install.installtask.installtaskModel',
	
//		data:[
//		      {project_information:'抱闸大确认/未填写'},
//		      {project_information:'控制柜/未填写'},
//		      {project_information:'层门/未填写'},
//		      {project_information:'轿门/未填写'},
//		      {project_information:'钢绳检查/未填写'},
//		      {project_information:'底坑/未填写'}
//		      ]
	}
});