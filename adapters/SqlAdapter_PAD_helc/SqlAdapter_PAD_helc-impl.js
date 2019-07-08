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
 
var procedure1Statement = WL.Server.createSQLStatement("select COLUMN1, COLUMN2 from TABLE1 where COLUMN3 = ?");
function procedure1(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
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

//值列表
var queryByEmpStatement1 = WL.Server.createSQLStatement("select * from siebel.cx_app_lov_v");

//最新时间
var queryByEmpStatement2 = WL.Server.createSQLStatement("select max (LAST_UPD) as MASTIME from siebel.cx_app_lov_v");

function padXLLB() {
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement1,//对应下面的SQL语句
			parameters : []
		});
};

function padZXSJ() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : queryByEmpStatement2,//对应下面的SQL语句
		parameters : []
	});
};