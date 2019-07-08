Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_QTBLXM_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields : [
		        'Id',// "1-RV0AMW"
				'MeasureBadItemComments',// "0321Test123544466677889900" （备注）
				'MeasureBadItemDesc',// "0321Test备注111222444499900"  （不良情况描述）
				'MeasureBadItemIFGood',// "Y"   （是否不良项）
				'MeasureBadItemParId',// "1-RSY5SB" （用于确定所属阶梯表）
				'MeasureBadItemReCheckDatetime',// "01/17/2017 00:00:00" （复检日期）
				'MeasureBadItemRepPersonFirstName',// "" （名）
				'MeasureBadItemRepPersonFullName',// ""  （姓名   整改责任人）
				'MeasureBadItemRepPersonLastName',// ""  （姓）
				'MeasureBadItemResponseDivision',// "检验"  （责任部门）
				'MeasureBadItemResponsePersonId',// ""
				'MeasureBadItemSeq',// "1"  (序号)
				'MeasureBadItemWorkTime',// "14"  （整改人工时）
				'MeasureBadItemZGCompleteDatetime',// "01/10/2017 00:00:00"  （整改完成日期）
				'MeasureBadItemZGDivision',// "验收"   （整改部门）
		   ]
	}
});