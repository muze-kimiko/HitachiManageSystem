
/* JavaScript content from app/model/XunshiPlanlistModel.js in folder common */
/**
 * XunshiPlanlistModel
 */
//Ext.define('Helcss.model.XunshiPlanlistModel', {
//	extend : 'Ext.data.Model',
//	config : {
//		 fields: ['id','ele_no','plan_start_dt','person_name1','person_name2','ele_domain']
//	}
//});

Ext.define('Helcss.model.XunshiPlanlistModel', {
	extend : 'Ext.data.Model',
	config : {
		 fields: ['id','client','ele_domain','ele_site','ele_tino','ele_no',
		          'ele_layer','person_name1','person_name2','plan_start_dt','plan_end_dt',
		          'plan_end_dt','plan_year','plan_month','plan_times']
	}
});
 

 

  
 