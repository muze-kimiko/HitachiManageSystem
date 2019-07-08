/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
//var procedure1Statement = WL.Server.createSQLStatement("select COLUMN1, COLUMN2 from TABLE1 where COLUMN3 = ?");
//function procedure1(param) {
//	return WL.Server.invokeSQLStatement({
//		preparedStatement : procedure1Statement,
//		parameters : [param]
//	});
//}

/***
 * 监视列表
 */
var jsListStatement = WL.Server.createSQLStatement(
		"SELECT DISTINCT elevator.ele_no,city+' '+ele_domain AS ele_domain,ele_site,ele_tino,"+
		"CASE   WHEN len(ele_checkdate)=13  THEN SUBSTRING(ele_checkdate,6,3) "+
		"WHEN len(ele_checkdate)=14  THEN SUBSTRING(ele_checkdate,6,4) "+
		"WHEN len(ele_checkdate)=16  THEN SUBSTRING(ele_checkdate,6,3) "+
		"WHEN len(ele_checkdate)=17 THEN SUBSTRING(ele_checkdate,6,4) "+
		"WHEN len(ele_checkdate)=18 THEN SUBSTRING(ele_checkdate,6,5) "+
		"ELSE ele_checkdate END ele_checkdate,"+
		"ele_tyle,ele_layer,ele_station," +
        "CASE WHEN status=0 THEN '异常' "+
        "WHEN status=1 THEN '正常' "+
        "WHEN status=2 THEN '保养' "+
        "WHEN status=3 THEN '泊梯' "+
        "WHEN status=4 THEN '无信号' "+
        "ELSE '空' END ele_status,tblEleFromYJ.UpdateDate,CONVERT(varchar(100), GETDATE(), 20) update_time "+
        "FROM msg_User,user_point,msgPoint,msgPointElevator,elevator,tblEleFromYJ  "+
        "WHERE msg_User.C_ID=user_point.userid "+
        "AND   user_point.pointid=msgPoint.C_ID "+
        "AND   msgPoint.C_ID=msgPointElevator.pointid "+
        "AND   msgPointElevator.ele_no=elevator.ele_no "+ 
        "AND   elevator.ele_no=tblEleFromYJ.ElevatorNo "+ 
        "AND   status IN ('2','0') " + 
	    "AND   elevator.ifactive=1 " + 
	    "AND   msg_User.C_USERNAME=?  "+
	    "ORDER BY tblEleFromYJ.UpdateDate desc,ele_domain,ele_site,ele_tino,ele_status "
		);
function procedure_jsList(param) { 
	return WL.Server.invokeSQLStatement({
		preparedStatement : jsListStatement,
		parameters : [param]
	});
 
}

/***
 * 监视详细
 */
var jsListinfoStatement = WL.Server.createSQLStatement(
		"SELECT DISTINCT city,ele_domain,ele_site,elevator.ele_no,ele_tyle,ele_station,CONVERT(varchar(10),ele_layer)+'/'+CONVERT(varchar(10),ele_station) as ele_layer," +
		"CASE   WHEN len(ele_checkdate)=13  THEN SUBSTRING(ele_checkdate,6,3) "+
		"WHEN len(ele_checkdate)=14  THEN SUBSTRING(ele_checkdate,6,4) "+
		"WHEN len(ele_checkdate)=16  THEN SUBSTRING(ele_checkdate,6,3) "+
		"WHEN len(ele_checkdate)=17 THEN SUBSTRING(ele_checkdate,6,4) "+
		"WHEN len(ele_checkdate)=18 THEN SUBSTRING(ele_checkdate,6,5) "+
		"ELSE ele_checkdate END ele_checkdate,"+
        "CASE WHEN status=0 THEN '异常' "+
        "WHEN status=1 THEN '正常' "+
        "WHEN status=2 THEN '保养' "+
        "WHEN status=3 THEN '泊梯' "+
        "WHEN status=4 THEN '无信号' "+
        "ELSE '空' END ele_status "+
        "FROM  elevator,tblEleFromYJ  "+
        "WHERE elevator.ele_no=tblEleFromYJ.ElevatorNo "+ 
		"AND   elevator.ele_no=?  "
		);
function procedure_jsListinfo(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : jsListinfoStatement,
		parameters : [param]
	});
}

/***
 * 巡视城市列表
 */
var xscityListStatement = WL.Server.createSQLStatement(
		"SELECT distinct elevator.city FROM msg_User,user_point,msgPoint,msgPointElevator,elevator " +
        "WHERE msg_User.C_ID=user_point.userid "+
        "AND   user_point.pointid=msgPoint.C_ID "+
        "AND   msgPoint.C_ID=msgPointElevator.pointid "+
        "AND   msgPointElevator.ele_no=elevator.ele_no  "+
        "AND   elevator.ifactive=1 " + 
        "AND   msg_User.C_USERNAME=? "+ 
        "ORDER BY city "
		);
function procedure_xscityList(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : xscityListStatement,
		parameters : [param]
	});
}

/****
 * 巡视地盘列表
 */
var xsdomainListStatement = WL.Server.createSQLStatement(
		"SELECT distinct elevator.ele_domain FROM msg_User,user_point,msgPoint,msgPointElevator,elevator " +
        "WHERE msg_User.C_ID=user_point.userid "+
        "AND   user_point.pointid=msgPoint.C_ID "+
        "AND   msgPoint.C_ID=msgPointElevator.pointid "+
        "AND   msgPointElevator.ele_no=elevator.ele_no  "+
        "AND   elevator.ifactive=1 " + 
        "AND   msg_User.C_USERNAME=? "+
        "AND   elevator.city=? "+ 
        "ORDER BY ele_domain "
        );
function procedure_xsdomainList(param,param2) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : xsdomainListStatement,
		parameters : [param,param2]
	});
}


/***
 * 巡视工号列表 procedure_xsghList
 */
var xsplanListStatement = WL.Server.createSQLStatement(
		"SELECT DISTINCT ele_no,ele_domain,ele_site,ele_tino,ele_checkdate," +
		"ele_tyle,ele_layer,ele_station,ele_status,update_time"+
		",CASE WHEN tm_type_desc='G3III' THEN 'Y' "+
		"ELSE 'N' END AS ismonitor "+
		",CASE WHEN isnull(PLAN_COUNT,'')<>'' THEN 'Y' "+
		"ELSE 'N' END AS isplan "+
		"FROM ("+
		"SELECT DISTINCT elevator.ele_no,ele_domain,ele_site,ele_tino,"+
		"CASE   WHEN len(ele_checkdate)=13  THEN SUBSTRING(ele_checkdate,6,3) "+
		"WHEN len(ele_checkdate)=14  THEN SUBSTRING(ele_checkdate,6,4) "+
		"WHEN len(ele_checkdate)=16  THEN SUBSTRING(ele_checkdate,6,3) "+
		"WHEN len(ele_checkdate)=17 THEN SUBSTRING(ele_checkdate,6,4) "+
		"WHEN len(ele_checkdate)=18 THEN SUBSTRING(ele_checkdate,6,5) "+
		"ELSE ele_checkdate END ele_checkdate,"+
		"ele_tyle,ele_layer,ele_station," +
        "CASE WHEN status=0 THEN 'status-04' "+
        "WHEN status=1 THEN 'status-01' "+
        "WHEN status=2 THEN 'status-02' "+
        "WHEN status=3 THEN 'status-03' "+
        "WHEN status=4 THEN 'status-05' "+
        "ELSE 'status-04' END ele_status,"+
        "CONVERT(varchar(100), GETDATE(), 20) update_time "+
        "FROM msg_User,user_point,msgPoint,msgPointElevator,elevator,tblEleFromYJ  "+
        "WHERE msg_User.C_ID=user_point.userid "+
        "AND   user_point.pointid=msgPoint.C_ID "+
        "AND   msgPoint.C_ID=msgPointElevator.pointid "+
        "AND   msgPointElevator.ele_no=elevator.ele_no "+ 
        "AND   elevator.ele_no=tblEleFromYJ.ElevatorNo "+
		"AND city=? AND ele_domain=? AND ifactive = 1) AS A "+
		"LEFT JOIN (SELECT tm_elevator_id,tm_type_desc FROM [10.96.128.161].[rwatch3].dbo.v_terminal) AS B "+
        "ON ele_no = B.tm_elevator_id "+
        "LEFT JOIN (SELECT ASSET_ID,COUNT(*) AS PLAN_COUNT FROM HEL_MAIN_PLAN_DATA "+
        "WHERE PLAN_STATUS IN ('已计划','已审核','已完成') "+
        "AND PLAN_START_DT BETWEEN DATEADD(DD,-DAY(GETDATE()),GETDATE())  AND DATEADD(DD,-DAY(DATEADD(M,1,GETDATE())),DATEADD(M,2,GETDATE())) "+
        "GROUP BY ASSET_ID HAVING count(*) > 0) AS C "+
        "ON ele_no = C.ASSET_ID "+
        "ORDER BY ele_site,ele_tino"
        );
function procedure_xsghList(param,param2) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : xsplanListStatement,
		parameters : [param,param2]
	});
}
 
/*****
 * 巡视保养计划列表
 */
var procedure1Statement = WL.Server.createSQLStatement(
	"SELECT  HEL_MAIN_PLAN_DATA.id,ele_no,convert(DATE,plan_start_dt) plan_start_dt,B.person_name person_name1,C.person_name person_name2,ele_domain "+
	"FROM  elevator "+
	"JOIN  HEL_MAIN_PLAN_DATA ON elevator.ele_no=HEL_MAIN_PLAN_DATA.ASSET_ID "+
	"LEFT JOIN HEL_SBL_MS_MP_INTF AS B ON HEL_MAIN_PLAN_DATA.PLAN_EMP_ID1=B.PERSON_ID "+
	"LEFT JOIN HEL_SBL_MS_MP_INTF AS C ON HEL_MAIN_PLAN_DATA.PLAN_EMP_ID2=C.PERSON_ID "+
	"WHERE 1=1 "+
	"AND   elevator.ifactive=1 "+
	"AND PLAN_STATUS IN ('已计划','已审核','已完成') "+
	"AND   PLAN_START_DT BETWEEN DATEADD(DD,-DAY(GETDATE()),GETDATE())  AND DATEADD(DD,-DAY(DATEADD(M,1,GETDATE())),DATEADD(M,2,GETDATE())) "+
	"AND ele_no=? "+
	"ORDER BY plan_start_dt ASC "
		
);
function procedure_xsplanList(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [param]
	});
}


/*****
 * 巡视保养计划详细
 */
var xsplaninfoStatement = WL.Server.createSQLStatement(
		"SELECT  HEL_MAIN_PLAN_DATA.id,client,ele_domain,ele_site,ele_tino,ele_no," +
        "convert(VARCHAR,ele_layer)+'/'+convert(VARCHAR,ele_station) ele_layer,"+
        "B.person_name person_name1,C.person_name person_name2,CONVERT(varchar(100), plan_start_dt, 23) plan_start_dt,plan_end_dt,"+
        "plan_year,plan_month,plan_times "+
        "FROM  elevator "+
        "JOIN  HEL_MAIN_PLAN_DATA ON elevator.ele_no=HEL_MAIN_PLAN_DATA.ASSET_ID "+
        "LEFT JOIN HEL_SBL_MS_MP_INTF AS B ON HEL_MAIN_PLAN_DATA.PLAN_EMP_ID1=B.PERSON_ID "+
        "LEFT JOIN HEL_SBL_MS_MP_INTF AS C ON HEL_MAIN_PLAN_DATA.PLAN_EMP_ID2=C.PERSON_ID "+
        "WHERE HEL_MAIN_PLAN_DATA.id=?  "+
        "ORDER BY ele_domain,PLAN_YEAR,PLAN_MONTH " 
);
function procedure_xsplaninfo(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : xsplaninfoStatement,
		parameters : [param]
	});
} 


/***
 * 安装城市列表
 */
var InstallCityListSta = WL.Server.createSQLStatement(
		"SELECT DISTINCT CASE WHEN isnull(city,'')='' THEN '未定义' ELSE city END AS city FROM elevator_install ORDER BY city"
		);
function procedure_InstCityList() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : InstallCityListSta,
		parameters : []
	});
}

/***
 * 安装项目列表
 */
var InstallPNameListSta = WL.Server.createSQLStatement(
		"SELECT count(PROJECT_NAME) AS counts,UNIT,PROJECT_NAME as ProjectName FROM elevator_install WHERE CITY = ? GROUP BY PROJECT_NAME,UNIT ORDER BY ProjectName"
);
function procedure_InstPNameList(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : InstallPNameListSta,
		parameters : [param]
	});
}

/***
 * 安装项目信息列表
 */
var InstallInfoListSta = WL.Server.createSQLStatement(
		"SELECT CASE WHEN isnull(b.TASK_STATUS,'')='FINISHED' THEN '已完工' WHEN isnull(GOV_CHECK_DATE,'')!='' THEN '技监已发证' WHEN isnull(CHECK_DATE,'')!='' THEN '已验收' " +
		"WHEN isnull(REPORT_CHECK_DATE,'')!='' THEN '已报检' WHEN isnull(DEBUG_END_DATE,'')!='' THEN '调试完成' WHEN isnull(REPORT_DEBUG_DATE,'')!='' THEN '已报调' " +
		"WHEN isnull(ENTRANCE_DATE,'')!='' THEN '已进场' WHEN isnull(BUILD_END_DATE,'')!='' THEN '已搭棚' WHEN isnull(LIFT_END_DATE,'')!='' THEN '吊装完成' " +
		"ELSE '未进场' END AS Status,a.ENGCONTRACT_NUMBER AS ENGCONTRACT_NUMBER,CASE WHEN ISNULL(a.CLIENT_ENGCONTRACT_NUMBER,'')='' THEN '暂无' ELSE a.CLIENT_ENGCONTRACT_NUMBER END AS CustomerName,a.ELEVATOR_NO AS ElevatorNo FROM elevator_install a " +
		"LEFT JOIN HEL_INT_TASKS_ALL b ON a.ELEVATOR_NO=b.ELEVATOR_NO AND b.INT_TASK_ID IN (SELECT max(INT_TASK_ID) FROM HEL_INT_TASKS_ALL GROUP BY ELEVATOR_NO) " +
		"LEFT JOIN HEL_INT_TASKS_PROCESS_TO_EBS c ON b.TASK_ID=c.TASK_ID AND c.INT_PROCESS_ID IN (SELECT max(INT_PROCESS_ID) FROM HEL_INT_TASKS_PROCESS_TO_EBS GROUP BY TASK_ID) " +
		"WHERE a.CITY =? AND a.PROJECT_NAME=? ORDER BY a.ELEVATOR_NO"
);
function procedure_infoList(param,param2) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : InstallInfoListSta,
		parameters : [param,param2]
	});
}

/***
 * 安装项目信息列表详细
 */
var InstallInfoListDetailSta = WL.Server.createSQLStatement(
		"SELECT CASE WHEN isnull(b.TASK_STATUS,'')='FINISHED' THEN '已完工' WHEN isnull(GOV_CHECK_DATE,'')!='' THEN '技监已发证' WHEN isnull(CHECK_DATE,'')!='' THEN '已验收' " +
		"WHEN isnull(REPORT_CHECK_DATE,'')!='' THEN '已报检' WHEN isnull(DEBUG_END_DATE,'')!='' THEN '调试完成' WHEN isnull(REPORT_DEBUG_DATE,'')!='' THEN '已报调' " +
		"WHEN isnull(ENTRANCE_DATE,'')!='' THEN '已进场' WHEN isnull(BUILD_END_DATE,'')!='' THEN '已搭棚' WHEN isnull(LIFT_END_DATE,'')!='' THEN '吊装完成' " +
		"ELSE '未进场' END AS STATUS,a.* FROM elevator_install a " +
		"LEFT JOIN HEL_INT_TASKS_ALL b ON a.ELEVATOR_NO=b.ELEVATOR_NO AND b.INT_TASK_ID IN (SELECT max(INT_TASK_ID) FROM HEL_INT_TASKS_ALL GROUP BY ELEVATOR_NO) " +
		"LEFT JOIN HEL_INT_TASKS_PROCESS_TO_EBS c ON b.TASK_ID=c.TASK_ID AND c.INT_PROCESS_ID IN (SELECT max(INT_PROCESS_ID) FROM HEL_INT_TASKS_PROCESS_TO_EBS GROUP BY TASK_ID) " +
		"LEFT JOIN LoginUser d ON b.INST_PERSON_ID=d.INIT_PERSON_ID WHERE a.ELEVATOR_NO=?"
);
function procedure_infoDetail(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : InstallInfoListDetailSta,
		parameters : [param]
	});
}




/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}

