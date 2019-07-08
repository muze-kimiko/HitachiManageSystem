/**
 * 待处理故障列表 数据仓  2014-4-15 xcx
 */
Ext.define('HelcPDA.model.fault.FaultHandlingModel',{
	extend:'Ext.data.Model',
	config:{
		//---待处理故障列表 
		//受信地盘  受信内容  发生时间  处理情况
		//派工人员Id  是否困人  故障报告
		fields:['FAULT_DOMAIN','ABSTRACT','HAPPEN_TIME','STATUS',
		        'ASSIGN_PERSON_ID','BOX_UP','AUDITING_STATUS',
		        //活动ID
		        'ACTIVITY_ID',
		        //派工信息   
		        //受信时间   （受信地盘已有）   受信大楼            受信地址  （ 受信内容已有）   联系人姓名
		        'START_TIME','FAULT_EDIFICE','FAULT_ADDRESS','CONTACT_NAME',
		        //联系人电话                         工号                          所属公司名                    所属站名
		        'CONTACT_PHONE#','ASSET_NUM','COMPANY_NAME','STATION_NAME',
		        //业务分类       服务请求来源                                        梯种型号                                    层
		        'AREA','SERVICE_REQUEST_SOURCE','PRODUCT_PART','ELEVATOR_FLOOR',
		        //站        （ 发生时间   已有 ）                     受信故障状态                             客户
		        'ELEVATOR_STOP','HOTLINE_FAULT_STATUS','ACCNT_NAME',
		        //预约时间                          所有者               (派工人员 已有 )  ( 活动号已有)
		        'BOOKING_TIME','LOGIN_ID',
		        //派单时间                    服务请求编号
		        'ASSIGN_TIME','SR_NUMBER',
		        //一些不知道有什么用的字段,但还是存放起来
		        // 所属公司ID                                                所属站ID   
		        'COMPANY_ID','ACCOUNT_ID','ACTION_ORG_ID','PID','NUM2','STATION_ID',
		        'NUM4','POSITION_TYPE','ASSET_ID','NUM3','WBRY_PERSON_ID',
		        //判断是否装遥监
		        'ISACTIVE',
		        //判断是否是在调查
		        'COMPLETE_STATUS',
		        //是否退单
		        'IS_CHARGEBACK'
		        ]
	}
});