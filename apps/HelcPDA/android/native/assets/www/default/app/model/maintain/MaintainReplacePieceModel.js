
/* JavaScript content from app/model/maintain/MaintainReplacePieceModel.js in folder common */
/**
 * 保养计划查询
 */
Ext.define('HelcPDA.model.maintain.MaintainReplacePieceModel',{
	extend:'Ext.data.Model',
	config:{
		fields : [/*'NAME',
		          'Product_Batch',
		          'Product_Date',
		          'MODEL_SPEC',
		          'FIGURE_NUM',
		          'MATERIAL_SPC',
		          'MEASURE_UNIT',
		          'Parts_Used_Quantity'
		          ,'Quote_Time',
		          'Quotation',
		          'Quote_Statue',
		          'Comments',
		          'PARTS_ID',
		          'SBL_ROW_ID',*/
		          
		          //new
		          'NAME',
		          'MODEL_SPEC',
		          'FIGURE_NUM',
		          'MATERIAL_SPC',
		          'MEASURE_UNIT',
		          
		          
		          'SBL_ROW_ID',
		          'PRODUCT_BATCH',
		          'PRODUCT_DATE',
		          'QUANTITY',//QUANTITY等于PARTS_USED_QUANTITY
		          'QUOTE_TIME',
		          'QUOTATION',
		          'QUOTE_STATUE',
		          'COMMENTS',
		          'PART_ID',//PART_ID等于PARTS_ID
		          'SBL_ROW_ID'
		          ]
	}
});