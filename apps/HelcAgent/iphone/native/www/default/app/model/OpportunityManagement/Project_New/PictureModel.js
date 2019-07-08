
/* JavaScript content from app/model/OpportunityManagement/Project_New/PictureModel.js in folder common */
Ext.define('HelcAgent.model.OpportunityManagement.Project_New.PictureModel',{
	extend:'Ext.data.Model',
	config:{
		fields : ['base64src','src','Fsrc',
		          'fb' //判断是已有的还是没有的
		          ]
	}
});