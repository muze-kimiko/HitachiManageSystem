
/* JavaScript content from app/controller/startTheProcess/QualityControl/KXBQJCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.QualityControl.KXBQJCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
		}
	},
	
	worry : function(){
		var node = Ext.getCmp('node').getValue();
		var result="nocon";
		var decision=Ext.getCmp('decision').getValue();
		if(node=="各地工厂品证处理"){

		   if(decision=="1"){
		      result="y1";
		    }
		    else if(decision=="4"){

		      result="y2";
		    }
		    else 
		        {        
		            result="y3";
		         }
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	IsImportProject : function(obj, newDate, oldDate, eOpts){
		var obj_this = this;
		var ygh = Ext.getCmp('hth').getValue();
		var node = Ext.getCmp('node').getValue();

		if (node=="起草") {
			if(ygh != ""){
				var getResult=function(res){
					var jsonObj = eval(res.html.body);
					cc.log(jsonObj);
					if(jsonObj.data[0].contractno==ygh){
						Ext.getCmp('zd').setValue('重点项目');
					}else{
						Ext.Msg.alert('此合同号不是重点项目');
					};
				};
				var params = {};
				params.method = 'GetImportant';
				params.parameters = [ygh];
				obj_this.connectServer_OA(getResult,params);
			};
		};
	},

	
	checkvalue18 : function () {        //流程提交时检查JS
		var obj_this = this;
		var typevalue = Ext.getCmp('type1').getValue();
		var node = Ext.getCmp('node').getValue();
		if (node=="起草") {
			var level = Ext.getCmp('level').getValue();
			var type1 = Ext.getCmp('type1').getValue();
			var elastatus = Ext.getCmp('elastatus').getValue();
			if(level==""){
				Ext.Msg.alert('请选择缓急程序!');
				return false;
			}
			if(type1==""){
				Ext.Msg.alert('请选择流程类型!');
				return false;
			}
			if(elastatus==""){
				Ext.Msg.alert('请选择电梯状态!');
				return false;
			}
        
	        if (typevalue=="开箱补缺件"){
	        	Ext.getCmp('qaleader').setValue("各地工厂品证处理");
	            if (Ext.getCmp('jcrq').getValue()==""){
	            	Ext.Msg.alert('请输入进场日期');
	            	return false;
	            }else if(Ext.getCmp('sgh').getValue()==""){
	            	Ext.Msg.alert('请输入监理员');
	            	return false;
	            }else if(Ext.getCmp('kxy').getValue()==""){
	            	alert('请输入开箱员');
	            	return false;
	            }
	            
	        }
	        
	        if (typevalue=="不良问题反馈" || typevalue=="装箱多件反馈"){
	        	Ext.getCmp('qaleader').setValue("不良各地工厂品证处理");
	            if (Ext.getCmp('bldate').getValue()==""){
	                Ext.Msg.alert('请输入不良问题发生日期');
	                return false;
	            }
	        }
		}
		
	    if (node=="各地工厂品证处理") {
	        var decision=Ext.getCmp('decision').getValue();
	        if(decision==""){
	        	Ext.Msg.alert('请选择决策内容');
	        	return false;
	        }
	        
	        if (decision=="1" || decision=="4"){
	            if (Ext.getCmp('sj').getValue()==""){
	                Ext.Msg.alert('请选择相关部门!');
	                return false;
	            }
//	            else{
//	                if (depinfo(frm.sj.value,frm.sj_leader,frm.sj_list,1)==false){
//	                    return false;
//	                }
//	            }
	        }
	        if (Ext.getCmp('fileno').getValue()=="-"){
	        	obj_this.getNo();
	        }
	    }
//	    if ("$!{acti.node.name}"=="品证部门判定") {
//	        if (frm.sj.value!=""){
//	            if (depinfo(frm.sj.value,frm.sj_leader,frm.sj_list,1)==false){
//	                return false;
//	            }
//	        }
//	    }
	    if (node=="相关QA专业组组长处理") {
	        if (Ext.getCmp('gb').getValue()==""){
	        	Ext.Msg.alert('请选择跟进部门');
	        	return false;
	        }
//	        else{
//	            if (depinfo(frm.gb.value,frm.gb_leader,frm.gb_list,1)==false){
//	                return false;
//	            }
//	        }
	    }
//	    if ("$!{acti.node.name}"=="品证总部最终意见") {
//	        if (frm.bjmc_1=="[object]" && frm.bjmc_1.value==""){
//	            alert('请至少填写一行内容！');
//	            frm.bjmc_1.style.background='#e8e8e8';
//	            frm.bjmc_1.focus();
//	            return false;
//	        }
//	    }
	    if (node=="报告人退料") {
	        if (Ext.getCmp('tldh').getValue()=="" || Ext.getCmp('tldate').getValue()==""){
	            Ext.Msg.alert('请填写相关信息！');
	            return false;
	        }
	    }
	    return true;
	},
	
	
	checkvalue : function(){
		var flag = true;
		if(Ext.getCmp('dpm').getValue().length>10 || Ext.getCmp('bjm').getValue().length>10 ||Ext.getCmp('wtm').getValue().length>15){
			Ext.Msg.alert("地盘名、部件名或问题/现象过长！");
			flag = false;
		}
		return flag;
	},
	
	setsubject : function(){
		Ext.getCmp('subject').setValue(Ext.getCmp('dpm').getValue()+Ext.getCmp('bjm').getValue()+Ext.getCmp('wtm').getValue());
	},
	
	getNo : function(){
		var typevalue = Ext.getCmp('type1').getValue();
		var getResult=function(res){
			var jsonObj = eval(res.html.body);
			cc.log(jsonObj);
			if (typevalue=="开箱补缺件"){
				Ext.getCmp('fileno').setValue("BQ"+jsonObj.data[0].info);
            }
            if (typevalue=="不良问题反馈" || typevalue=="装箱多件反馈"){
            	Ext.getCmp('fileno').setValue("TS"+jsonObj.data[0].info);
            }
            if (typevalue==""){
            	Ext.getCmp('fileno').setValue(jsonObj.data[0].info);
            }
		};
		var params = {};
		params.method = 'GetNo';
		params.parameters = [];
		this.connectServer_OA(getResult,params);
	},

	GetElevator_no_Info : function(obj, newDate, oldDate, eOpts){
		var obj_this = this;
		var scgh = Ext.getCmp('scgh').getValue();

		var getResult=function(res){
			var jsonObj = eval(res.html.body);
			cc.log(jsonObj);
			Ext.getCmp('dftxh').setValue(jsonObj.data[0].info);
			Ext.getCmp('scjd').setValue(jsonObj.data[0].makeadd);
		};
		var params = {};
		params.method = 'GetElevator_no_Info';
		params.parameters = [scgh];
		obj_this.connectServer_OA(getResult,params);
	},
	
	
//		var reader4=new Ext.data.JsonReader(
//		    {
//		     type:"json",
//		     root: "data" ,
//		     fields:[""]
//		});
//
//
//		    var button4 = Ext.get('getdep');
//		    button4.on('click', function(){  
//		   var frm=document.all;
//		    
//
//		 var ss4 = new Ext.data.ScriptTagProxy({
//		　
//		    url: _oa_path+"/oa/linkey_workflow_org.nsf/umigetdepinfo?openagent&dep="+dep
//		});
//		    ss4.doRequest('read',null,null,reader4,
//		       function (recordsBlock, arg, isok) {
//		       if(recordsBlock!=null)
//		      {
//		        if (recordsBlock.records.length>0)
//		        {
//		          for(i=0;i<recordsBlock.records.length;i++)
//		          {
//		            //以下是原来的逻辑***************************************
//		            if (temp1=="[object]"){
//		                temp1.value=recordsBlock.records[i].json.leader;
//		            }
//		            if (temp2=="[object]"){
//		                temp2.value=recordsBlock.records[i].json.list;
//		            }
//		            
//		            //******************************************
//		          } 
//		        }
//		       } 
//		},ss4);
//		}); 
//
//
//		var button = Ext.get('SubmitDom');
//		    button.on('click', function buttonclick(){       
//		    if(checkvalue()&&checkvalue18()){   
//		         worry();    
//		         QC_TJ($acti)
//		     
//		  }else{
//		     unLock();
//		     }
//		    });
//		});
//



	setleader : function(){
		var frm=document.all;
		depinfo(frm.sj.value,'sj_leader','sj_list',1);
	},
	
	setleader1 : function(){
		var frm=document.all;
		depinfo(frm.gb.value,'gb_leader','gb_list',1);
	},
	
	depinfo : function(dep,leader,list,flag){
	/*
	传入参数
	dep=部门名
	leader=部门领导的域名
	list=部门内用户列表的域名
	flag=是否单一部门(1代表只允许一个部门,0代表多部门)
	例子:
	depinfo('测试部门',document.all.leader,document.all.list,0)----输入部门领导及人员
	depinfo('测试部门',document.all.leader,'',0)----只输出部门领导
	*/
	    var frm=document.all;
	    if (dep.substring(dep.length-1,dep.length)==","){
	        dep=dep.substring(0,dep.length-1);
	    }
	    if (flag=="1"){
	        if (dep.indexOf(",") != -1 ){
	            alert('只允许选择一个部门,请重新选择！');
	            return false;
	        }
	    }
	    temp1=leader;
	    temp2=list;
	    deptmp=dep;
	    document.all.getdep.click();
	},


//	getleader : function(worknumber)        //取直系领导,返回页面LEVEL1~3三个域,代表三个级别的用户.空代表无相应用户.
//	{
//	    if (worknumber==""){
//	        return false;
//	    }
//	    if (worknumber!=0001) {
//	    var level1="";
//	    var level2="";
//	    var level3="";
//	    AjaxRequest.get(
//	    {
//	        'url':"/oa/hr.nsf/ajax1?readviewentries&startkey="+worknumber+"&count=1",
//	        'onSuccess':function(req) {
//	        var doc=req.responseXML.documentElement;
//	        var entries = doc.selectNodes("viewentry");
//	        if (entries.length>0) {
//	            var entrydata = entries(0).selectNodes("entrydata");
//	            if (entrydata(0).text!=worknumber) {
//	                alert('找不到你输入的工号，请输入8位员工编号。');
//	                return false;
//	            }
//	            var xm=entrydata(2).text+" "+entrydata(0).text;        //用户名称
//	            var kz=entrydata(14).text+" "+entrydata(13).text;        //科长用户名称
//	            var bz=entrydata(11).text+" "+entrydata(10).text;        //部长用户名称
//	            var bbz=entrydata(8).text+" "+entrydata(7).text;        //本部长用户名称
//	            var zjl=entrydata(16).text+" "+entrydata(15).text;    //总裁用户名称
//	            if (kz!=" ") {        //科长不为空
//	                if (kz!=xm) {        //科长不是自己,1级是科长,2级是部长,3级是本部长
//	                    level1=kz;
//	                    level2=bz;
//	                    level3=bbz;
//	                }
//	                else {        //科长是自己,进入下一层判断
//	                    if (bz!=xm) {        //判断部长不是自己,1级是部长,2级是本部长,3级是总裁
//	                        level1=bz;
//	                        level2=bbz;
//	                        level3=zjl;
//	                    }
//	                    else {        //部长是自己,进入下一层判断
//	                        if (bbz!=xm) {        //判断本部长不是自己,1级是本部长,2级是总裁,无3级领导
//	                            level1=bbz;
//	                            level2=zjl;
//	                        }
//	                        else {    //本部长是自己,1级是总裁,无2、3级领导
//	                            level1=zjl;
//	                        }
//	                    }
//	                }
//	            }
//	            else {        //科长为空
//	                if (bz!=" ") {        //部长不为空
//	                    if (bz!=xm) {        //判断部长不是自己,1级是部长,2级是本部长,3级是总裁
//	                        level1=bz;
//	                        level2=bbz;
//	                        level3=zjl;
//	                    }
//	                    else {
//	                        if (bbz!=xm) {        //判断本部长不是自己,1级是本部长,2级是总裁,无3级领导
//	                            level1=bbz;
//	                            level2=zjl;
//	                        }
//	                        else {    //本部长是自己,1级是总裁,无2、3级领导
//	                            level1=zjl;
//	                        }
//	                    }
//	                }
//	                else {        //部长为空
//	                    if (bbz!=xm) {        //判断本部长不是自己,1级是本部长,2级是总裁,无3级领导
//	                        level1=bbz;
//	                        level2=zjl;
//	                    }
//	                    else {    //本部长是自己,1级是总裁,无2、3级领导
//	                        level1=zjl;
//	                    }                
//	                }
//	            }        
//	            //alert("level1="+level1+","+"level2="+level2+","+"level3="+level3);
//	            document.all.level1.value=level1;
//	            document.all.level2.value=level2;
//	            document.all.level3.value=level3;
//	        }
//	        else{
//	            alert('找不到你输入的工号，请输入8位员工编号。');
//	            return false;
//	        }
//	    }
//	}
//	);
	    
	    
	    
	
	
});