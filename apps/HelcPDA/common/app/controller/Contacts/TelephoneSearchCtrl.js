Ext.define('HelcPDA.controller.Contacts.TelephoneSearchCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			
			//查询
			"button#telephonesearch_id_seach":{
				tap:'telephonesearch_id_seach',
			},
			
			//返回按钮
			"button#telephonesearch_id_FH":{
				tap:'telephonesearch_id_FH',
			}
		}
	},
	
	
	//查询
	telephonesearch_id_seach : function(){
		var this_obj=this;
		var tempArray=['telephonesearch_id_company','telephonesearch_id_name','telephonesearch_id_department','telephonesearch_id_number','telephonesearch_id_SpecialNumber'];
    	var tempValue=this_obj.getElement(tempArray);
    	//公共
    	var selcomp=Ext.getCmp('telephonesearch_id_company').getValue();
   		var abbr_name=BbTJ(selcomp);
    	//顺序验证
       if(tempValue[1]!=''){
    	   //正则表达式
    	   var zong=/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[\w])*$/;
    	   var zw=/^[\u4E00-\uFA29]*$/;
    	   var zm=/^[A-Za-z]*$/;
    	   if(!zong.test(tempValue[1])){
    		   return;
    	   };
  		   if(zw.test(tempValue[1])){
  			 if(tempValue[1].length<2||tempValue[1].length>5){
      		   Ext.Msg.alert('提示','正常输入应该为2-5个字母或2-5汉字或4-5个数字。');
      		   return;
  			 };
  			   //alert('中文');
  		   }else if(zm.test(tempValue[1])){
  			 if(tempValue[1].length<2||tempValue[1].length>5){
        		   Ext.Msg.alert('提示','正常输入应该为2-5个字母或2-5汉字或4-5个数字。');
        		   return;
  			 };
  			 //alert('字母');
  		   }else if(tempValue[1].length<4||tempValue[1].length>5){
    		   Ext.Msg.alert('提示','正常输入应该为2-5个字母或2-5汉字或4-5个数字。');
    		   return;
  		   };
    	  
    	   //条件
    	   var pcode='';
    	   var pformat='00000000';
    	   var cond=tempValue[1];
    	   if ( cond.length >=4 && cond.length <=8) {
    			pcode=pformat.substring(0, pformat.length - cond.length)+cond;
    		}else{
    			pcode=cond;
    		};
    		
    		var KH_Data={};
    		KH_Data.pcode='%'+pcode+'%';//可能经过处理的姓名或编号
    		KH_Data.cond='%'+cond+'%';//姓名或编号
    		KH_Data.selcomp='%'+selcomp+'%';//公司编号
    		KH_Data.cond_selcomp='%'+abbr_name+'%';//公司名
    		if(abbr_name==''){
    			this_obj.connectSql_TXL(fn,'1',KH_Data);
    		}else{
    			this_obj.connectSql_TXL(fn,'2',KH_Data);
    		};
    		
   		}else if(tempValue[2]!=''){
   			if(tempValue[2].length < 3 || tempValue[2].length > 8){
     		   Ext.Msg.alert('提示','输入的关键字应该为3-8个字符。');
     		   return;
     	   };
     	  var KH_Data={};
     	  KH_Data.cond='%'+tempValue[2]+'%';//部门
     	  KH_Data.selcomp='%'+selcomp+'%';//公司编号
     	  KH_Data.cond_selcomp='%'+abbr_name+'%';//公司名
     	  
     	  if(abbr_name==''){
 			this_obj.connectSql_TXL(fn,'3',KH_Data);
     	  }else{
 			this_obj.connectSql_TXL(fn,'4',KH_Data);
     	  };
   		}else if(tempValue[3]!=''){
   			if (tempValue[3].length != 4 && tempValue[3].length != 5 && tempValue[3].length != 8 )  {
   				Ext.Msg.alert('提示','输入的电话号码应该为4位或5位或8位数字，请重新输入。');
   				return false;
   			};
   			
   			var KH_Data={};
   			KH_Data.cond='%'+tempValue[3];//号码
   			KH_Data.selcomp='%'+selcomp+'%';//公司编号
   			KH_Data.cond_selcomp='%'+abbr_name+'%';//公司名
   			if(abbr_name==''){
   	 			this_obj.connectSql_TXL(fn,'5',KH_Data);
   	     	}else{
   	 			this_obj.connectSql_TXL(fn,'6',KH_Data);
   	     	};
   		}else if(tempValue[4]!=''){
   			var KH_Data={};
   			KH_Data.cond='%'+tempValue[4]+'%';//号码
   	 		this_obj.connectSql_TXL(fn,'7',KH_Data);
   		}else{
   			var KH_Data={};
   			this_obj.connectSql_TXL(fn,'0',KH_Data);
   		};
   		
   		//共同条件
   		function BbTJ(selcomp){
   			var abbr_name;
   			if ("0000"==selcomp) {
   				abbr_name="";
   			} else {
   				cond_selcomp=" and  (a.pk_corp='" + selcomp + "'  ";
   				if ('1001'==selcomp){
   	   				abbr_name = "总公司";
   	   			}else if ('1074'==selcomp){
   	   				abbr_name = "广州工厂";
   	   			}else if ('1058'==selcomp){
   	   				abbr_name = "扶梯工厂";
   	   			}else if ('1042'==selcomp){
   	   				abbr_name = "日滨科技";
   	   			}else if ('1002'==selcomp){
   	   				abbr_name = "上海工厂";
   	   			}else if ('1003'==selcomp){
   	   				abbr_name = "天津工厂";
   	   			}else if ('1059'==selcomp){
   	   				abbr_name = "成都工厂";
   	   			}else if ('1041'==selcomp){
   	   				abbr_name = "日立电机";
   	   			}else if ('1062'==selcomp){
   	   				abbr_name = "日立安防";
   	   			}else{
   	   				abbr_name = "未定义";
   	   			};
   			};
   			return abbr_name;
   		};
   		
   		//调用公共查询方法
		function fn(result) {
			if(result==null||result==''){
				Ext.Msg.alert('提示','查无数据');
				return;
			};
			var num=result.length;
			//alert(num);
			if(num==0){
				Ext.Msg.alert('提示','查无数据');
				return;
			};
			this_obj.NextView('telephonelist_id','HelcPDA.view.Contacts.TelephoneList');
			var datads=Ext.data.StoreManager.get('TelephoneAddressStore');
			if(!datads){
				datads=Ext.create('HelcPAD.store.Contacts.TelephoneAddressStore');
			};
			//跟新
			var data=[];
			for(var i=0;i<num;i++){
				var sj={};
				sj.ORGNAME=result[i].ORGNAME;
				sj.DEPTNAME=result[i].DEPTNAME;
				if(result[i].PSNCODE==null){
					sj.PSNCODE=result[i].PSNCODE;
				}else{
					sj.PSNCODE='('+result[i].PSNCODE+')';
				};
				sj.PSNNAME=result[i].PSNNAME;
				if(result[i].DTEL==null){
					sj.DTEL=result[i].DTEL;
				}else{
					sj.DTEL='TEL：'+result[i].DTEL;
				};
				sj.OTEL1=result[i].OTEL1;
				sj.OTEL2=result[i].OTEL2;
				sj.EMAIL2=result[i].EMAIL2;
				data[i]=sj;
			};
			
			datads.setData(data);
		};
   		
	},
	
	//返回按钮
	telephonesearch_id_FH:function(){
		this.BackView();
	},
	
	
});