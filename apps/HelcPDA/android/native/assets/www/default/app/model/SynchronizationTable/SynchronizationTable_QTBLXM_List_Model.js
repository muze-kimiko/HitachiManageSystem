
/* JavaScript content from app/model/SynchronizationTable/SynchronizationTable_QTBLXM_List_Model.js in folder common */
Ext.define('HelcPDA.model.SynchronizationTable.SynchronizationTable_QTBLXM_List_Model',{
	extend:'Ext.data.Model',
	config:{
		
		fields : [
		        //责任和整改和职位
		        'DisplayValue',
		        
		        //所属司、站、片、组 公用
		        'Id',
		        //所属司和所属站
		        'Name',
		        //所属片
		        'AreaName',
		        //所属组
		        'GroupName',
		   ]
	}
});