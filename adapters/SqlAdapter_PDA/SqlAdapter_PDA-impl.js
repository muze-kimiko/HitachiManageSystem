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
var Find_Departure_Time = WL.Server.createSQLStatement("select START_TIME  from  HEL_START WHERE ACTIVITY_ID=?"
);
function Departure_Time(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement :Find_Departure_Time,
		parameters : [param]
	});
}
var Find_Arrival_Time = WL.Server.createSQLStatement("select ARRIVE_TIME  from  HEL_BE_PRESENT WHERE ACTIVITY_ID=?"
);
function Arrival_Time(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement :Find_Arrival_Time,
		parameters : [param]
	});
}
var Find_Save_Time = WL.Server.createSQLStatement("select RESCUE_TIME from  HEL_SAVE  WHERE ACTIVITY_ID=?"
);
function Save_Time(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement :Find_Save_Time,
		parameters : [param]
	});
}
var Find_Completion_Time = WL.Server.createSQLStatement("select REPAIR_COMPLETE_TIME  from  HEL_FINISHED WHERE ACTIVITY_ID=?"
);
function Completion_Time(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement :Find_Completion_Time,
		parameters : [param]
	});
}
var Find_Audit_Case = WL.Server.createSQLStatement("SELECT S.*,W.PERSON_NAME AS STATIONMASTER_NAME,EMP_LAST_NAME+J.EMP_FIRST_NAME AS TECHNICAL_AUDIT_NAME FROM FAULT_SBL_REPORT  AS S LEFT JOIN FAULT_PDA_REPORT AS G ON S.ACTIVITY_ID=G.ACTIVITY_ID LEFT JOIN HEL_SBL_MS_MP_INTF  W ON S.STATIONMASTER_ID=W.PERSON_ID LEFT JOIN HEL_SBL_EMPLOYEE  J ON S.TECHNICAL_AUDIT_ID=J.SBL_ROW_ID where S.ACTIVITY_ID=?"
);
function Audit_Case(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement :Find_Audit_Case,
		parameters : [param]
	});
}
var Insert_Departure_Time = WL.Server.createSQLStatement("insert into HEL_START (START_TIME,LOGIN_ID,STATUS_START_TIME,ACTIVITY_ID) values(?,?,?,?) "
);
function insertDeparture_Time(param,param2,param3,param4) {
	return WL.Server.invokeSQLStatement({
		preparedStatement :Insert_Departure_Time,
		parameters : [param,param2,param3,param4]
	});
}
