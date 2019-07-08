
Ext.define("HelcPDA.store.maintain.maintenProStroe",{
	extend:'Ext.data.Store',
	id:'store_id',
	requires:["HelcPDA.model.maintain.maintenProModel"],
	config:{
		model:'HelcPDA.model.maintain.maintenProModel',
	
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