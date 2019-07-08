
Ext.define("HelcPAD.store.installtoproduce.installtaskStore2",{
	extend:'Ext.data.Store',
	id:'installtaskStore_id2',
	requires:["HelcPAD.model.installtoproduce.installtaskModel"],
	config:{
		model:'HelcPAD.model.installtoproduce.installtaskModel',
	
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