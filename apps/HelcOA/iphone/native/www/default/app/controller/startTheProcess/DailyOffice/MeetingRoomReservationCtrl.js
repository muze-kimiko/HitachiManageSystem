
/* JavaScript content from app/controller/startTheProcess/DailyOffice/MeetingRoomReservationCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.DailyOffice.MeetingRoomReservationCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'qc_StartProcessCtrl_id',
	config:{
		control:{
			//查找匹配的会议室
			"button#CheckMeetRoom":{
				tap:'CheckMeetRoom'
			},
			//检查资源
			"button#chk1":{
				tap:'chk1'
			},
		}
	},
	
	CheckMeetRoom : function(){
		var piid=Ext.getCmp('piid').getValue();
		var getResult=function(res){
			var data = eval(res.html.body);
			cc.log(data);
			Ext.getCmp('fhtjfalg').setValue(data.data[0].tj);
			Ext.getCmp('meetingids').setValue(data.data[0].ids);
			Ext.getCmp('selfalg').setValue('');
			Ext.getCmp('meetsubject').setValue('');
		};
		
		var params = {};
		params.method = 'CheckMeetRoom';
		params.parameters = [piid];
		this.connectServer_OA(getResult,params);
	},
	
	
	chk1 : function(){
		var unid=Ext.getCmp('piid').getValue();
		var hytj="";
		var flag;
		  
		for(var i=1;i<=6;i++){
			var meetsocure = 'meetsocure'+i;
			if(Ext.getCmp(meetsocure).getValue()=="是"){
				flag="是";
			}
			else{
				flag="*";
			}
			if (hytj==""){
	         hytj=flag;
			}
			else{
				hytj=hytj+","+flag;
			}
		}
		var addr=Ext.getCmp('address').getValue();
		
		var getResult=function(res){
			var data = eval(res.html.body);
			Ext.getCmp('fhtjfalg').setValue(data.data[0].tj);
			Ext.getCmp('meetingids').setValue(data.data[0].ids);
			Ext.getCmp('selfalg').setValue('');
			Ext.getCmp('meetsubject').setValue('');
			cc.log(data);
			cc.log(actionform);
		};
		
		var params = {};
		params.method = 'CheckMeetSocure';
		params.parameters = [unid,hytj,addr];
		this.connectServer_OA(getResult,params);
	},
	
	
	worry : function(){
		var result="nocon";
		var address=Ext.getCmp('address').getValue();
		if(Ext.getCmp('node').getValue()=="科长审批"){
		   if(address=="中信"){
		      result="@,y1";
		    }
		    else if(address=="大石"){

		      result="@,y2";
		    }
		    else 
		        {        
		            result="@,y3";
		         }
		}
		Ext.getCmp('conds').setValue(result);
		
		//分配会议室，查找匹配会议室功能实现后放到checkvalue52方法中
		if(Ext.getCmp('node').getValue()=="大石会议室"||Ext.getCmp('node').getValue()=="盈泰会议室"||Ext.getCmp('node').getValue()=="中信会议室"){
			Ext.getCmp('selfalg').setValue('2');
		}
	},
	
	
	
	checkvalue52 : function() {
//		 if(actionform.acti.node.name=="起草")
//		 {
		        if (Ext.getCmp('meetingids').getValue()=="")
		        {
		           alert('无匹配的会议室，请检查选择条件，并按‘资源检查’！');
		           return false;
		        }
		    var aDate;
		    var d1=Ext.getCmp('createdate').getValue().substring(0,10);
		    var d2 =Ext.getCmp('startdate').getValue();
		  
		   if(d1.indexOf("/")!=-1)
		   {
		   aDate = d1.split("/");
		    }
		    else
		    {
		      aDate = d1.split("-");
		   }
		  
		    d1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  
		     if(d2.indexOf("/")!=-1)
		   {
		   aDate = d2.split("/");
		    }
		    else
		    {
		      aDate = d2.split("-");
		   }

		    d2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);   
		    var days= Math.ceil((d2-d1)/(24*60*60*1000))+1;
		       if(days>15)
		       {
		          alert("不允许提前15天预约会议室！");
		          return false;
		        }
		        
		   var st1=Ext.getCmp('startdate').getValue()+" "+Ext.getCmp('shour').getValue()+":"+Ext.getCmp('sminu').getValue();
		   var st2=Ext.getCmp('startdate').getValue()+" "+Ext.getCmp('ehour').getValue()+":"+Ext.getCmp('eminu').getValue();
		   if(st1.indexOf("/")!=-1)
		   {
		   aDate = st1.split("/");
		    }
		    else
		    {
		      aDate = st1.split("-");
		   }
		 
		    st1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  
		     
		     if(st2.indexOf("/")!=-1)
		   {
		   aDate = st2.split("/");
		    }
		    else
		    {
		      aDate = st2.split("-");
		   }
		  
		   st2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);   
		        if(days==1)
		        {
		           var aa=new Date();
		           if(aa>st1)
		           {
		          // alert(aa)
		         //  alert(st1)
		          //   alert("会议开始时间有误！")
		         //    return false;
		           }
		           else
		           {
		          
		              var DT = (st1 - aa) / 1000;
		               var RH = Math.floor((DT % (60 * 60 * 24)) / (60 * 60));        //得到小时
		             var RM = Math.floor(((DT % (60 * 60 * 24)) % (60 * 60)) / 60);     //得到分钟
		               if(RH==0&&RM<15)
		               {
		                  alert("会议开始时间有误, 需要提前15分预约！");
		                  return false;
		                }
		           }
		         }
		   
		   var DT = (st2 - st1) / 1000;
		   if(DT<0)
		   {
		    alert("会议结束时间少于开始时间！");
		    return false;
		   }
		    var RH = Math.floor((DT % (60 * 60 * 24)) / (60 * 60));        //得到小时
		    var RM = Math.floor(((DT % (60 * 60 * 24)) % (60 * 60)) / 60);     //得到分钟
		         RM=RM/60;

		    Ext.getCmp('usehour').setValue(RH+RM);
		    if (Ext.getCmp('sminu').getValue()=="15")
		    {
		    	Ext.getCmp('startwz').setValue((parseInt(Ext.getCmp('shour').getValue())-8+0.25)*4+1);
		    }
		     if (Ext.getCmp('sminu').getValue()=="00")
		    {
		    	Ext.getCmp('startwz').setValue((parseInt(Ext.getCmp('shour').getValue())-8)*4+1);
		    }
		     if (Ext.getCmp('sminu').getValue()=="30")
		      {
		    	Ext.getCmp('startwz').setValue((parseInt(Ext.getCmp('shour').getValue())-8+0.5)*4+1);
		    }
		     if (Ext.getCmp('sminu').getValue()=="45")
		      {
		    	Ext.getCmp('startwz').setValue((parseInt(Ext.getCmp('shour').getValue())-8+0.75)*4+1);
		    }
		    
		    Ext.getCmp('sycd').setValue(Ext.getCmp('usehour').getValue()*4);
		    Ext.getCmp('selfalg').setValue('1');
//		  } 
		 
//		  if(Ext.getCmp('node').getValue()=="大石会议室"||Ext.getCmp('node').getValue()=="盈泰会议室"||Ext.getCmp('node').getValue()=="中信会议室")
//		  {
//		    if (Ext.getCmp('meetingids').getValue()!="")
//		    {
//		      if (Ext.getCmp('meetclass').getValue()=="")
//		      {
//		       if (confirm("你还未分配会议室，是否继续提交？"))
//		       {
//		           
//		        }
//		        else
//		        {
//		         
//		          return false;
//		         }
//		       }
//		      }
//		    
//		          if (Ext.getCmp('meetsubject').getValue()!="")
//		          {
//		           if (confirm("你是否用当前申请替换那个已批准的会议？"))
//		          {
//		      
//		            }
//		           else
//		            {
//		              return false;
//		             }
//		           }
//		   
//		    
//		    Ext.getCmp('selfalg').setValue('2');
//		     
//		  }
		}
	
	
});