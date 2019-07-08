
/* JavaScript content from app/model/maintain/MaintainPlanListModel.js in folder common */
/**
 * 保养计划查询
 */
Ext.define('HelcPDA.model.maintain.MaintainPlanListModel',{
	extend:'Ext.data.Model',
	config:{
		// 日期   工号  地址
		//维修人员1  维修人员2  维修人员3
		//半月  是否计划  维修人员名字集合 维保编号（唯一）
		//签到       
		fields:['PLAN_START_DT','ASSET_NUM','DOMAIN_NAME','SBL_ROW_ID','PLAN_YEAR','PLAN_MONTH','PLAN_TIMES',
		        'ELEVATOR_NO','START_TIME','END_TIME','START_ADRESS','END_ADRESS','X','Y','ADDRESS','ID',
		        'PNAME1','PNAME2','PNAME3','ISACTIVE',
		        'TASK_NAME','PLAN_STATUS','PLAN_EMP_IDS','MP_ID',
		        'REGISTRATION',
		        //另外添加要用到的， 和数据库无关
		        'HHMMTime',//时和分
		        'BYCSS',
		        'PDA_UPD_DATE'
		        ]//保养用CSS]
	}
});