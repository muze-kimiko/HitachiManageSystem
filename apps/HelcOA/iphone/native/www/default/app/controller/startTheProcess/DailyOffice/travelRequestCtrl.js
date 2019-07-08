
/* JavaScript content from app/controller/startTheProcess/DailyOffice/travelRequestCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.DailyOffice.travelRequestCtrl',{
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
	    var ifyfxm=Ext.getCmp('ifyfxm').getValue();
	    var query_bm=Ext.getCmp('query_bm').getValue();
	    var projectno=Ext.getCmp('projectno').getValue();
	    var feesum=Ext.getCmp('feesum').getValue();
	    var pcode="";
	    if (ifyfxm=="是") {
	        ifyfxm="项目国内差旅费";
	    }else{
	        ifyfxm="业务差旅费";
	    } 
	    
	    pcode=pcode+"<?xml version="+'"1.0"' +" encoding="+'"utf-8"'+"?>"+"<OABudgetParameter"+" xmlns="+'"www.epochsoft.com.cn"'+" xmlns:xsi="+'"http://www.w3.org/2001/XMLSchema-instance"'+" xmlns:xsd="+'"http://www.w3.org/2001/XMLSchema"'+">";
	    pcode=pcode+"<ApplicantDept>"+query_bm+"</ApplicantDept>"+"<DimAccount>"+ifyfxm+"</DimAccount>"+"<DimEntity>"+query_bm+"</DimEntity>";
	    pcode=pcode+"<DimProject>"+projectno+"</DimProject>"+"<FormName>"+"普通业务报销单据"+"</FormName>"+"<DimYear>"+y+"</DimYear>"+"<DimPeriod>"+m+"</DimPeriod>";
	    pcode=pcode+"<Amount>"+feesum+"</Amount>"+"<Quantity>"+""+"</Quantity>"+"<BillName>"+"境内出差申请单"+"</BillName>"+"<Currency>"+"人民币"+"</Currency>"+"</OABudgetParameter>";//将表单内容拼成xml组成一个参数
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