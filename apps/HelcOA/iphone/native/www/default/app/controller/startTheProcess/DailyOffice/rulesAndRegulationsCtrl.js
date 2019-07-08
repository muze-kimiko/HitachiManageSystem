
/* JavaScript content from app/controller/startTheProcess/DailyOffice/rulesAndRegulationsCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.DailyOffice.rulesAndRegulationsCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
		}
	},
	
	
//	CheckRegime : function(obj, newDate, oldDate, eOpts){
//		var obj_this = this;
//		var wdbh = Ext.getCmp('wdbh').getValue();
//		var fwtype = Ext.getCmp('fwtype').getValue();
//		
//		
//		var getResult=function(res){
//			var jsonObj = eval(res.html.body);
//			cc.log(jsonObj);
//
//			var flag = jsonObj.data[0].flag;
//			var con = jsonObj.data[0].con;
//			if(fwtype=="制度修改" || fwtype=="制度废止" || fwtype=="制度修改A" ||fwtype=="制度修改B"){
//				if(flag=="0"){
//					Ext.Msg.alert(con);
//					Ext.getCmp('wdbh').setValue('');
//				}
//				if(flag=="1"){
//					if(fwtype=="制度修改" || fwtype=="制度修改A" || fwtype=="制度修改B"){
//						Ext.Msg.confirm('替换这份规章制度?',con,function(btn){
//							if (btn == 'yes'){
//								ProListStore1.removeAt(index);
//					            list.splice(index, 1);
//							}else{
//								return;
//							}
//						});
//					}
//				}
//			}
//			
//			
//		      
//            document.all.flag.value=recordsBlock.records[i].json.flag;
//            document.all.con.value=recordsBlock.records[i].json.con;
//           if(fwtype=="制度修改" || fwtype=="制度废止" || fwtype=="制度修改A" ||fwtype=="制度修改B")
//            {
//                //alert(con)
//            
//                if(flag=="0")
//                {
//                 alert(con);
//                 document.all.wdbh.value="";
//                      }
//                  if(flag=="1")
//                { 
//                 if(fwtype=="制度修改" || fwtype=="制度修改A" || fwtype=="制度修改B")
//                 {
//                   if(confirm("是否替换这份规章制度"+con+"?"))
//                   {
//                      document.all.oldreadpeo.value=text.substring(s5,s6);
//                       if(confirm("阅读权限是否和原文件一致？"))
//                       {
//                            document.all.readpeo.value=text.substring(s5,s6);
//                           }
//                           else
//                           {
//                             document.all.readpeo.value="";
//                           }
//                        }
//                        else
//                        {
//                            document.all.wdbh.value="";
//                         }
//                   }
//                    if(fwtype=="制度废止")
//                 {
//                   if(confirm("是否废止这份规章制度"+con+"?"))
//                   {
//                      document.all.oldreadpeo.value=text.substring(s5,s6);
//                       if(confirm("阅读权限是否和原文件一致？"))
//                       {
//                            document.all.readpeo.value=text.substring(s5,s6);
//                           }
//                           else
//                           {
//                             document.all.readpeo.value="";
//                           }
//                        }
//                        else
//                        {
//                            document.all.wdbh.value="";
//                         }
//                   }
//                      }
//                      if(flag!="0"&& flag!="1")
//                {
//                
//                alert("系统中已有此编号的文档："+con)
//                  document.all.wdbh.value="";
//                      }
//                    }
//                    
//                    if(fwtype=="制度首发")
//                    {
//                        if(flag!="0")
//                        {
//                           alert("系统中已存在此编号的规章制度："+con)
//                            document.all.wdbh.value="";
//                        }
//                    }
//                    con="";
//			
//			
//		};
//		var params = {};
//		params.method = 'CheckRegime';
//		params.parameters = [wdbh];
//		obj_this.connectServer_OA(getResult,params);
//	},	
	
	
	
});