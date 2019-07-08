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

var searchLoginlog = WL.Server.createSQLStatement("select * from (select to_char(OP_TIME,'yyyy-MM-dd HH24:mi:ss') as time,hh_login_log.* from portal.hh_login_log order by OP_TIME desc)  where username = ? and rownum<=100 ");
function loginInfo(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : searchLoginlog,
		parameters : [param]
	});
}

var insertLoginlog = WL.Server.createSQLStatement("insert into portal.hh_login_log values (?,sysdate,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
function InsertLoginLog(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertLoginlog,
		parameters : param
	});
}

var searchoperatelog = WL.Server.createSQLStatement("select * from (select to_char(OP_TIME,'yyyy-MM-dd HH24:mi:ss') as time,hh_sysop_log.* from portal.hh_sysop_log order by OP_TIME desc)  where username = ? and rownum<=100");
function operateLog(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : searchoperatelog,
		parameters : [param]
	});
}

var insertoperatelog = WL.Server.createSQLStatement("insert into portal.hh_sysop_log values (?,?,sysdate,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
function insertOperateLog(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertoperatelog,
		parameters : param
	});
}

var lastloginlog = WL.Server.createSQLStatement("select to_char(OP_TIME,'yyyy-MM-dd HH24:mi:ss') as time from (select * from hh_login_log where USERNAME=? order by OP_TIME desc )where rownum=1");
function lastLoginLog(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : lastloginlog,
		parameters : [param]
	});
}

var searchdeviceuser = WL.Server.createSQLStatement("select to_char(a.CREATION_DATE,'yyyy-MM-dd HH24:mi:ss') as time,a.ATTR_02 as lasttime,a.*,b.* from hh_devices a left join hh_device_user b on a.PUSH_NOTIFICATION_ID = b.PUSH_NOTIFICATION_ID where  OWNER_NAME= ? and rownum<=100 order by a.CREATION_DATE desc");
function deviceuser(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : searchdeviceuser,
		parameters : [param]
	});
} 

var removeDeviceSQL = WL.Server.createSQLStatement("update hh_devices set STATUS='REJECT' where DEVICE_ID=?");
function removeDevice(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : removeDeviceSQL,
		parameters : [param]
	});
}

/**
 *  查找当前登陆的设备，看是否符合规定 
 */
var checkDevByUserSQL = WL.Server.createSQLStatement("select * from hh_devices  where PUSH_NOTIFICATION_ID=? AND OWNER_NAME=? order by CREATION_DATE DESC");
function checkDevByUser(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : checkDevByUserSQL,
		parameters : param
	});
}  

/**
 * 新设备注册
 * DEVICE_ID, OWNER_NAME, OWNER_NAME, OWNER_NAME
 */
var InsertDeviceSQL = WL.Server.createSQLStatement("insert into hh_devices values (?, '', ?, 'NEW', ?, " +
		"'', 'IPAD', '', ?, sysdate, ?, sysdate, '1', '', ?, '', '', '', '', '', '' ,'' ,'')");
function InsertDevice(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : InsertDeviceSQL,
		parameters : param
	});
}

/**
 * 更新设备使用时间
 */
var UpdateDeviceTimeSQL = WL.Server.createSQLStatement("update HH_DEVICES SET ATTR_02=? where OWNER_NAME=? AND PUSH_NOTIFICATION_ID=?");
function UpdateDeviceTime(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : UpdateDeviceTimeSQL,
		parameters : param
	});
}