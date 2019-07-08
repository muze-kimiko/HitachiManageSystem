
/* JavaScript content from app/model/appworkspace/Contract/ContractModel.js in folder common */
/**
 * 合同资料
 */
Ext.define('HelcPAD.model.appworkspace.Contract.ContractModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		        'Attrib5',
		        'Attrib4',
		        'Attrib3',
		        'Attrib2',       //活动版本
		        'ContractType',  //两方合同
		        'Attrib9',
		        'Attrib8',
		        'Attrib7',
		        'Attrib6',
		        'FinalUser',      //汕头市四海房地产开发有限公司
		        'BigCustomer',
		        'Attrib1',        //id
		        'CustomerName',    //深圳市华星电梯技术有限公司",
		        'ContractNumber',   //AH1302499
		        'AssetNumber',      //13G024351"
		        
		        
		        //erp_search
		        'contract_no',
		        'contract_header_id',
		        'contract_type_name',
		        'final_use_unit',
		        'customer_number',
		        
		        //erp_CONTRACT_HEADERS_INFO
		        'CONTRACT_NO',
		        'CONTRACT_TYPE_NAME',
		        'SIGNER_EMP_NAME',
		        'CUSTOMER_NUMBER',
		        'LARGE_CUSTOMER',
		        'SIGNER_COMPANY_NAME',
		        'SIGNER_DATE',
		        'CUSTOMER_NAME',
		        'CM_ELEVATOR_TYPE_NAME',
		        
		        
		        //erp_elevator_info
		        'CM_FINAL_USE_UNIT',
		        'CM_INSTALL_ADDRESS',
		        'TRACKER_COMPANY_NAME',
		        'ELEVATOR_CLASS_NAME',
		        'PARAM_VALUE',
		        'EQUIPMENT_NO',
		        //工号列表（工号）
		        'ELEVATOR_NO',
		        
		        'LINE_STATUS_NAME',
		        'MAKE_ORGANIZATION_NAME',
		        'LC_SJWCRQ',
		        'LC_ZXQDFBRQ',
		        'FINAL_USE_UNIT',
		        'INSTALL_ADDRESS',
		        'ELEVATOR_VALUES',
		        'LC_GH_JHWCRQ',
		        'CURRENT_NODE_NAME',
		        'CURRENT_PROCESS_NODE',
		        'LC_JHCCRQ',
		        'LC_SJCCRQ_SC',
		        'AGE_STORE_DAYS',
		        'LC_CCRQ',
		        'SHIPPED_STATUS',
		        'HOLD_FLAG',
		        
		        //erp_elebox_list
		        'ELVBOX_NAME',
		        'ELVBOX_ID',
		        
		        //erp_BoxInfo
		        'ELVBOX_NAME',
		        'ELVBOX_DESC',
		        'MAKE_ORGANIZATION_NAME',
		        'DELIVERY_TYPE_MEANING',
		        'ELV_NEED_BY_DATE_MIR',
		        'MAKE_STORE_DATE',
		        'CONSIGNED_FLAG',
		        'HOLD_FLAG',
		        'SHIP_STATUS',
		        'STORE_DATE',
		        'INV_OUT_DATE',
		        'SIGNIN_DATE',
		        'CompliteDate',
		        'DrawingType',
		        'ContractNum',
		        'UnitNo',
		        //工号列表(工号ID)
		        'ELEVATOR_ID',
		        //新增的字段
		        'DESIGN_DAY',
		        'MAKE_DAY',
		        'DELIVERY_DATE',
		        'CURRENT_NODE_NAME',
		        'CURRENT_PROCESS_NODE',
		        'PARALLEL_CONTROL_GH',
		        'LIST_PUBLISHED_DATE',
		        'COMPLETE_CONFIRM_DATE',
		        'ONHOLD_STATUS',
		        'ONHOLD_DESC',
		        'LC_CCRQ_SC',
		        'DELIVERY_METHOD_NAME',
		        'CONSIGNED_FLAG',
		        'APPROVED_FLAG',
		        'PERCENT_RATE',
		        'ELVBOX_CONSIGNED_FLAG',
		        'ELVBOX_APPROVED_FLAG',
		        'DESIGN_END_DATE',
		        'GH_CYCLE_DATE',
		        //////
		        'PLAN_TYPE_MEANING',
		        'LIST_HOLD_FLAG',
		        'DEMAND_ARRIVE_DATE',
		        'PLAN_CONSIGN_DATE',
		        'APPROVED_FLAG',
		        'SUBINV_NAME',
		        'SCHEDULE_HEADER_ID',
		        ///////
		        'NODE_NAME',
		        'CONFIRM_DATE',
		        'SCHEDULE_NAME',
		        'SCHEDULE_DATE',
		        'MAKE_ORGANIZATION_NAME',
		        'DESIGN_ORGANIZATION_NAME',
		        'RESPER_EMP_NAME',
		        'DJ_EMP_NAME'
	]           
}
});