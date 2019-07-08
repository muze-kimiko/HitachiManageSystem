Ext.define('HelcPDA.model.inspection.inspectionzgxxlistModel',{
	extend:'Ext.data.Model',
	config:{
		fields : ['AnnualInspectionId','UpdateFullName','RecfiticationFinishDate'
		          ,'Comments','ResponsibiltyCategory','RectificationParts','RectificationConent',
		          'Id','MachineId','SystemUpdate'
		          ]
	}
});