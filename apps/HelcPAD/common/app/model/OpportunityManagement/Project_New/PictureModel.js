Ext.define('HelcPAD.model.OpportunityManagement.Project_New.PictureModel',{
	extend:'Ext.data.Model',
	config:{
		fields : ['base64src','src','Fsrc',
		          'fb' //判断是已有的还是没有的
		          ]
	}
});