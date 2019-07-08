
/* JavaScript content from app/model/SynchronizationTable/SynchronizationTable_JTB_list_Model.js in folder common */
Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_JTB_list_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields: [ 
		          'ActivityId',//: "1-RSY5SA"
		          'AgreementItemId',//: "1-RSHOXM"
		          'AssetId',//: "1-RSHHWV"
		          'HELAgreeId',//: "1-RSHOTA"
		          'HELAgreementItemId',//: "1-RSHOXM"
		          'HELAssetId',//: "1-RSHHWV"
		          'HoldDivisionId',//: "1-KOLPL"
		          'HoldDivisionName',//: "上海营销公司"
		          'Id',//: "1-RSY5SB"
		          {name:'ListOfHelMeasureBaditemList',type:'object'},//其他不良项目
		          {name:'ListOfHelMeasureItemList',type:'object'},//作业项目
		          'MUG3TaskName',//: ""
		          'MeasureSource',//: "接梯"
		          'TaskName',//: "临时测试2"
		          'TaskRowId',//: "1-RFKGA1"
		          'TaskStatus',//: "未完成"
		          'TaskType',//: "接梯表"
		            
		]
	}
});