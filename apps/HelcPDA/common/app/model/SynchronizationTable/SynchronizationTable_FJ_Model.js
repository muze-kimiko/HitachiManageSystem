Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_FJ_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields : ['MeasureItemParId',//定位附件所属作业项目
		          'Id',// 选填
		          'MeasureItemAttachFileName',//附件名称
		          //object 内的
		          //AttachmentIsTextData: "false"
		          //CDATA    base64
		          //ContentId: "1-Q4T3Q"
		          //EndOfData: "true"
		          //Extension: "png"
		          //TimedOut: "false"
		          {name:'MeasureItemAttachFileBuffer',type:'object'},//附件base64
		          'MeasureItemAttachFileBuffer2',//专门装载base64  用于保持或修改
		          'MeasureItemAttachFileBuffer3',//用于显示
		          'MeasureItemAttachFileExt',//: "png"
		          
		          
		          'MeasureItemAttachComments',
		          'Created',//时间   : "03/16/2017 10:46:08"
		          'CreatedFullName',//,: "Administrator Siebel"
		          'MeasureItemAttachFileDate',//时间 : "03/16/2017 10:46:08"
		          'MeasureItemAttachFileSize',//: "12466"
		          'MeasureItemAttachFileSrcPath',//: ""
		          'MeasureItemAttachFileSrcType',//: "FILE"
		          
		          ]
	}
});