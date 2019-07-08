
/* JavaScript content from app/model/install/installplan/HelIntTasksAllModel.js in folder common */
/**
 * 安装任务模板,安装计划用
 * 2014-4-29 xcx
 */

Ext.define('HelcPDA.model.install.installplan.HelIntTasksAllModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		 //主表序号     安装作业ID   安装合同头ID   安装合同行ID
		 'INT_TASK_ID','TASK_ID','ENGCONTRACT_HEADER_ID','ENGCONTRACT_LINE_ID',
		 //工号ID     工程监理ID     PDA获取标识               安装合同号
		 'ELEVATOR_ID','INST_PERSON_ID','PDA_IMPORT_FLAG','ENGCONTRACT_NUMBER',
		 //工号                       客户名称ID	       客户名称                   安装地址
		 'ELEVATOR_NO','CUSTOMER_ID','CUSTOMER_NAME','INSTALL_ADDRESS',
		 //生产类型             批次                  设备号           梯种ID
		 'PRODUCE_TYPE','SEQ_NUM','EQUIPMENT_NO','CM_ELEVATOR_TYPE_ID',
		 //梯种                                                工号类型代码                           工号类型                    安装单位ID	
		 'CM_ELEVATOR_TYPE_NAME','ELEVATOR_CLASS_CODE','ELEVATOR_CLASS_NAME','INST_VENDOR_ID',
		 //吊装单位ID         搭棚单位ID            安装工法        层
		 'LIFT_VENDOR_ID','BUILD_VENDOR_ID','BUDGET_INSTALL_METHOD','PARAM_C',
		 //站                门                              载重                        速度	
		 'PARAM_Z','PARAM_M','PARAM_ZZ','PARAM_SD',
		 //提升高度                      井道总高              安装周期(合同周期)          合同要求到货日期	
		 'PARAM_TSGD','PARAM_JDZG','CONTRACT_CYCLE_DAY','DELIVERY_DATE',
		 //业务实体ID   业务实体    项目名称          最小工号发运日期	
		 'ORG_ID','Name','PROJECT_NAME','INV_OUT_DATE',
		 //计划发货日期                          作业状态	          创建日期           创建人
		 'PLAN_CONSIGN_DATE','TASK_STATUS','CREATION_DATE','CREATED_BY',
		 //最后更新日期                         最后更新人
		 'LAST_UPDATE_DATE','LAST_UPDATED_BY',
		 //格外的字段  台数
		 'NUM',
		 //版本号
		 'VERSION_NUM',
		 //状态
		 'STATUS',
		 //HEL_INT_TASK_PROCESSES_TO_PDA  表的字段
		 //出仓日期   上报日期
		 'CCRQ','COMPLETION_DATE',
		 //HEL_INT_TASKS_PROCESS_TO_EBS  表的字段      progress
		 //进场日期                            报调日期                                     报检日期
		 'ENTRANCE_DATE','REPORT_DEBUG_DATE','REPORT_CHECK_DATE',
		 //报告签写日期            技检发证日期                           移交客户日期
		 'REPORT_DATE','GOV_CHECK_DATE','SIGNED_TRANSFER_DOC_DATE',
		 
		 //附加需要的 2014-6-9
		 'YJH','WJH',
		 //附加资源录入需要  2014-6-16
		 'TASK_PROCESS_ID'
		]
	}
});
