/**
 * 合同行详细信息
 */
Ext.define('HelcPDA.model.compact.CompactBodyInfoModel',{
	extend:'Ext.data.Model',
	config:{
		fields:['STATION_TYPE','STATION_ORG','MONTH_GRT_FLG',
		        'PRODUCT_PART','BUSINESS_TYPE','ASSET_HEIGHT',
		        'ELEVATOR_MARK','COMPANY_ORG','AREA_NAME',
		        'GRT_FLG','GRT_MONTH_NUM','BRAND','INSPECT_MONTH',
		        'ACCNT_NAME','URGENT_REQ_TIME','ASSET_DOOR',
		        'UPCOMING_FLG','STATUS','LINE_STATUS',
		        'AGREE_TYPE','AGREE_NUM','ASSET_NUM',
		        'DOMAIN_NAME','EDIFICE_NAME','CITY','ELEVATOR_FLOOR',
		        'INSTALL_ADDR','CANCEL_DATE','DEFER_DATE',
		        'LINE_NOTES',]
	}
});