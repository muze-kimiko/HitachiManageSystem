
/* JavaScript content from app/controller/startTheProcess/DailyOffice/OverseasCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.DailyOffice.OverseasCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
		}
	},
	
	
	//经过费控
	FreeControl : function(){
		var obj = this;
		var myDate=new Date();
	    var y=myDate.getFullYear();
	    var m=myDate.getMonth()+1;
	    var d=myDate.getDay();
	    var dep=Ext.getCmp('dep').getValue();
	    var projectno=Ext.getCmp('projectno').getValue();
	    var feesum=Ext.getCmp('feesum').getValue();
	    var ifyfxm=Ext.getCmp('ifyfxm').getValue();
	    var biz=Ext.getCmp('biz').getValue();
	    var cc_type=Ext.getCmp('cc_type').getValue();
	    var pcode="";
	    
	    if (ifyfxm=="是") {
	       ifyfxm="项目国外差旅费";
	    }else {
	        if (cc_type=="出差") {
	        	ifyfxm="国外出差差旅费";
	        }else {
	        	ifyfxm="出国研修差旅费";
	        }
	    }
	    
	    pcode=pcode+"<?xml version="+'"1.0"' +" encoding="+'"utf-8"'+"?>"+"<OABudgetParameter"+" xmlns="+'"www.epochsoft.com.cn"'+" xmlns:xsi="+'"http://www.w3.org/2001/XMLSchema-instance"'+" xmlns:xsd="+'"http://www.w3.org/2001/XMLSchema"'+">";
	    pcode=pcode+"<ApplicantDept>"+dep+"</ApplicantDept>"+"<DimAccount>"+ifyfxm+"</DimAccount>"+"<DimEntity>"+dep+"</DimEntity>";
	    pcode=pcode+"<DimProject>"+projectno+"</DimProject>"+"<FormName>"+"普通业务报销单据"+"</FormName>"+"<DimYear>"+y+"</DimYear>"+"<DimPeriod>"+m+"</DimPeriod>";
	    pcode=pcode+"<Amount>"+feesum+"</Amount>"+"<Quantity>"+"1"+"</Quantity>"+"<BillName>"+"境外出差申请单"+"</BillName>"+"<Currency>"+biz+"</Currency>"+"</OABudgetParameter>";//将表单内容拼成xml组成一个参数
	    pcode=encodeURIComponent(pcode);
	    
	    var getResult=function(res){
	    	var data3 = eval(res.html.body);
			var data = data3.data;
			if(data[0].State=='3'){
				Ext.Msg.alert('已超预算，请追加预算');
				return;
			}else{
				if(data[0].State=='2'){
					Ext.Msg.alert(data[0].WarningMessage);
				}
				obj.getApplication().getController('startTheProcess.startTheProcessNameCtrl').public_ToSelectNode();
			};
		};
		
		var params = {};
		params.method = 'FreeControl';
		params.parameters = [pcode];
		cc.log(params);
		this.connectServer_OA(getResult,params);
	}
	
	
});