Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_ZYXM_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields : ['Id',
		          'MeasureItemLocaleFlag',//地域项目
		          'MeasureItemMaxValue',//作业项目最大值
		          'MeasureItemMinValue',//作业项目最小值
		          'MeasureItemNo',//项目号
		          'MeasureItemYearFlag',//年限项目
		          
		          'MeasureItemPreWork2',//作业前
		          'MeasureItemPostWork2',//作业后
		          
		          {name:'ListOfHelMeasureRecordList',type:'object'},//录值项目  需要
		          {name:'ListOfHelMeasureItemAttachment',type:'object'},//附件 需要

		          //暂时不用的
		          {name:'ListOfHelMaintainPlanContentAttachment',type:'object'},
		          {name:'HelMeasureRecordList',type:'object'},
		         
		          'MeasureItemComments',
		          'MeasureItemContent',//"电梯运行正常确认"
	        	  'MeasureItemCover',//: "共同"
	        	  'MeasureItemGroupName',//: "机房作业、轿门轿厢、井道作业、厅门作业、底坑作业"
	        	  'MeasureItemIFGood',//: "N"
	        	  'MeasureItemIFPhoto',//: "N"
	        	  'MeasureItemIFRequired',//: "Y"
	        	  'MeasureItemId',//: "1-RWM9FQ"
	        	  'MeasureItemIfMeasure',//: "Y"
	        	  'MeasureItemJudge',//: ""
	        	  'MeasureItemLocation',//: "其他"
	        	  'MeasureItemName',//: "电梯运行正常确认"
	        	  'MeasureItemPeriod',//: ""
	        	  
	        	  'MeasureItemPostWorkId',//: "1-S64RO1"
	        	  
	        	  'MeasureItemPreWorkId',//: "1-S64RNZ"
	        	  'MeasureItemReCheckPersonFirstName',//: ""
	        	  'MeasureItemReCheckPersonFullName',//: ""
	        	  'MeasureItemReCheckPersonId',//: ""
	        	  'MeasureItemReCheckPersonLastName',//: ""
	        	  'MeasureItemReCheckTime',//: ""
	        	  'MeasureItemResponseDivision',//: ""
	        	  'MeasureItemResponsePersonFirstName',//: ""
	        	  'MeasureItemResponsePersonFullName',//: ""
	        	  'MeasureItemResponsePersonLastName',//: ""
	        	  'MeasureItemStandard',//: "正常运行，无异响、无故障"
	        	  'MeasureItemType',//: "直梯"
	        	  'MeasureItemZGCompleteDate',//: ""
	        	  'MeasureItemZGDivision',//: ""
	        	  'MeasureItemZGResponsePersonId',//: ""
	        	  'MeasureItemZGWorkTime',//: ""
	        	  'MeasureProjectId',//: "1-S64RLL"
	        	  
	        	  'Num',//做序号用，自加
		   ]
	}
});