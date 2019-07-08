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

var queryByEmpStatement1 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, a.mobile2, " +
		"a.email1, a.email2, a.orgname, trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city"+ 
		" from view_address a "+
		" left join  ldap_address_psn b"+ 
		" on a.PK_PSNBASDOC=b.pk_psnbasdoc"+ 
		" where ( (a.psncode like ?) "+
		" or (a.psnname like ?) "+
		" or (upper(a.psnnamepinyin)  like   upper(?) )  )"+ 
		" order by orgname,deptname desc,psncode asc");
var queryByEmpStatement2 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, a.mobile2, " +
		" a.email1, a.email2, a.orgname, trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city"+ 
		" from view_address a "+
		" left join  ldap_address_psn b"+ 
		" on a.PK_PSNBASDOC=b.pk_psnbasdoc"+ 
		" where ( (a.psncode like ?) "+
		" or (a.psnname like ?) "+
		" or (upper(a.psnnamepinyin) like upper(?)))"+ 
		" and  (a.pk_corp=? or a.email2 like ?)  "+
		" order by orgname,deptname desc,psncode asc");
function queryByEmp(param1,param2,param3) {
	if(param2 == null){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement1,
			parameters : [param1,param1,param1]
		});
	}else{
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement2,
			parameters : [param1,param1,param1,param2,param3]
		});
	}
	
}


//姓名或编号
var queryByEmpStatement3 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, " +
		 "a.mobile2, a.email1, a.email2, a.orgname, " +
		 "trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city " +
		 "from view_address a left join  " +
		 "ldap_address_psn b on a.PK_PSNBASDOC=b.pk_psnbasdoc  " +
		 "where ( (a.psncode like ?) or " +
		 "(a.psnname like ?) or (upper(a.psnnamepinyin)  like   " +
		 "upper(?) )  ) and (a.pk_corp like ?   or a.email2 like ? ) order by " +
		 "orgname,deptname desc,psncode asc "
);
//姓名或编号2
var queryByEmpStatement4 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, " +
		 "a.mobile2, a.email1, a.email2, a.orgname, " +
		 "trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city " +
		 "from view_address a left join  " +
		 "ldap_address_psn b on a.PK_PSNBASDOC=b.pk_psnbasdoc  " +
		 "where ( (a.psncode like ?) or " +
		 "(a.psnname like ?) or (upper(a.psnnamepinyin)  like   " +
		 "upper(?) )  ) order by " +
		 "orgname,deptname desc,psncode asc "
);
//部门名称查询
var queryByEmpStatement5 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, a.mobile2, a.email1, a.email2, a.orgname," +
		" trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city from view_address" +
		" a left join  ldap_address_psn b on a.PK_PSNBASDOC=b.pk_psnbasdoc   " +
		"where ( a.deptname like ? or b.f1_deptdocnm like ? or " +
		"b.f2_deptdocnm like ? or b.f3_deptdocnm like ? or b.f4_deptdocnm" +
		" like ? or b.f5_deptdocnm like ? ) and (a.pk_corp like ?   or a.email2 like ? ) order by " +
		"orgname,deptname desc,psncode asc"
);
//部门名称查询2
var queryByEmpStatement6 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, a.mobile2, a.email1, a.email2, a.orgname," +
		" trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city from view_address" +
		" a left join  ldap_address_psn b on a.PK_PSNBASDOC=b.pk_psnbasdoc   " +
		"where ( a.deptname like ? or b.f1_deptdocnm like ? or " +
		"b.f2_deptdocnm like ? or b.f3_deptdocnm like ? or b.f4_deptdocnm" +
		" like ? or b.f5_deptdocnm like ? ) order by " +
		"orgname,deptname desc,psncode asc"
);

//电话号码查询
var queryByEmpStatement7 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, a.mobile2, a.email1, a.email2, a.orgname," +
		" trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city from view_address " +
		"a left join  ldap_address_psn b on a.PK_PSNBASDOC=b.pk_psnbasdoc  " +
		"where (  (a.dtel like ?) or (a.otel1 like ?) or (a.otel2 like ?)  )" +
		" and (a.pk_corp like ?   or a.email2 like ? ) order by orgname,deptname desc,psncode asc"
);
//电话号码查询2
var queryByEmpStatement8 = WL.Server.createSQLStatement("select a.psnname, a.psncode, a.dtel, a.otel1, a.otel2, a.mobile1, a.mobile2, a.email1, a.email2, a.orgname," +
		" trim(b.f5_deptdocnm) ||' '||trim(b.f4_deptdocnm) ||' '||trim(b.f3_deptdocnm) ||' '||trim(b.f2_deptdocnm) ||' '||trim(b.f1_deptdocnm) ||' '||a.deptname deptname, a.city from view_address " +
		"a left join  ldap_address_psn b on a.PK_PSNBASDOC=b.pk_psnbasdoc  " +
		"where (  (a.dtel like ?) or (a.otel1 like ?) or (a.otel2 like ?)  )" +
		" order by orgname,deptname desc,psncode asc"
);

//特殊号码
var queryByEmpStatement9 = WL.Server.createSQLStatement("select psnname, psncode, dtel, otel1, otel2, mobile1, mobile2, email1, email2, orgname, deptname, city from view_address" +
		"  where (email like 'special%') and ( (psnname like ?) or (dtel like ?) or (otel1 like ?) )  order by orgname,deptname desc,psncode asc"
);

//全部
var queryByEmpStatement10 = WL.Server.createSQLStatement("select psnname, psncode, dtel, otel1, otel2, mobile1, mobile2, email1, email2, orgname, deptname, city from view_address  where 1=0  order by orgname,deptname desc,psnname asc"
);

//公司通讯录查询
function procedure_Three(num,one,two,three,four) {
	if(num==0){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement10,//对应下面的SQL语句
			parameters : []
		});
	}else if(num==1){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement4,//对应下面的SQL语句
			parameters : [one,two,two]
		});
	}else if(num==2){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement3,//对应下面的SQL语句
			parameters : [one,two,two,three,four]
		});
	}else if(num==3){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement6,//对应下面的SQL语句
			parameters : [two,two,two,two,two,two]
		});
	}else if(num==4){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement5,//对应下面的SQL语句
			parameters : [two,two,two,two,two,two,three,four]
		});
	}else if(num==5){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement8,//对应下面的SQL语句
			parameters : [two,two,two]
		});
	}else if(num==6){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement7,//对应下面的SQL语句
			parameters : [two,two,two,three,four]
		});
	}else if(num==7){
		return WL.Server.invokeSQLStatement({
			preparedStatement : queryByEmpStatement9,//对应下面的SQL语句
			parameters : [two,two,two]
		});
	}
	//one,two,two,three,four
	//'%%','%%','%%','%%','%%'
}


