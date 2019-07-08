Ext.define('HelcPDA.model.Contacts.TelephoneAddressModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		    'OTEL1',          //直线电话1
		    'EMAIL2',         //备注
		    'EMAIL1',
		    'PSNNAME',        //姓名
		    'OTEL2',         //直线电话2
		    'MOBILE1',
		    'DEPTNAME',       //部门
		    'DTEL',           //分机号码
		    'PSNCODE',        //员工编号
		    'CITY',
		    'MOBILE2',
		    'ORGNAME',       //公司名称
		]
	}
});