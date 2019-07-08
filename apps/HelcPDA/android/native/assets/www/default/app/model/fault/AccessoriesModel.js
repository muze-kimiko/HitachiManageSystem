
/* JavaScript content from app/model/fault/AccessoriesModel.js in folder common */
Ext.define('HelcPDA.model.fault.AccessoriesModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		        'PRODUCT_BATCH','PARTS_ID','PARTS_NAMES',
		        'PRODUCT_DATE','PARTS_USED_QUANTITY',
		        'QUOTE_TIME','QUOTATION','QUOTE_STATUE',
		        'COMMENTS']
	}
});