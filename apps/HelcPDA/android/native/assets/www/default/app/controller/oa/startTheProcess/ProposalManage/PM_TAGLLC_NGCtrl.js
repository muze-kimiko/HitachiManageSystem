
/* JavaScript content from app/controller/oa/startTheProcess/ProposalManage/PM_TAGLLC_NGCtrl.js in folder common */
Ext.define('HelcPDA.controller.oa.startTheProcess.ProposalManage.PM_TAGLLC_NGCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
	config:{
		control:{
		}
	},
	
	commit : function(){
		var obj_this = this;
		var flag = true;
		var subject = Ext.getCmp('subject');
		var node = Ext.getCmp('node').getValue();
	    
		if(node=="提案"){
			if(subject.getValue()!=""){
				if(subject.getValue=="日立楼宇设备制造（天津）有限公司"){
					subject.setValue("(天津工厂)"+subject.getValue());
				}
				else if(subject.getValue=="广州工厂"){
					subject.setValue("(广州工厂)"+subject.getValue());
				}
				else if(subject.getValue=="日立电梯（成都）有限公司"){
					subject.setValue("(成都工厂)"+subject.getValue());
				}
				else if(subject.getValue=="日立电梯（广州）自动扶梯有限公司"){
					subject.setValue("(天津工厂)"+subject.getValue());
				}
				else if(subject.getValue=="日立楼宇设备制造（天津）有限公司"){
					subject.setValue("(扶梯工厂)"+subject.getValue());
				}
				else if(subject.getValue=="日立电梯（上海）有限公司"){
					subject.setValue("(上海工厂)"+subject.getValue());
				}
				else if(subject.getValue=="日立电梯电机(广州)有限公司"){
					subject.setValue("(日立电机)"+subject.getValue());
				}
				else if(subject.getValue=="广州日滨科技发展有限公司"){
					subject.setValue("(广州日滨)"+subject.getValue());
				}
				else if(subject.getValue=="日立电梯（中国）有限公司"){
					subject.setValue("(总部)"+subject.getValue());
				}else{
					subject.setValue("(分公司)"+subject.getValue());
				}
				
			}else{		
				if(subject.getValue=="日立楼宇设备制造（天津）有限公司"){
					subject.setValue("天津工厂");
				}
				else if(subject.getValue=="广州工厂"){
					subject.setValue("广州工厂");
				}
				else if(subject.getValue=="日立电梯（成都）有限公司"){
					subject.setValue("成都工厂");
				}
				else if(subject.getValue=="日立电梯（广州）自动扶梯有限公司"){
					subject.setValue("天津工厂");
				}
				else if(subject.getValue=="日立楼宇设备制造（天津）有限公司"){
					subject.setValue("扶梯工厂");
				}
				else if(subject.getValue=="日立电梯（上海）有限公司"){
					subject.setValue("上海工厂");
				}
				else if(subject.getValue=="日立电梯电机(广州)有限公司"){
					subject.setValue("日立电机");
				}
				else if(subject.getValue=="广州日滨科技发展有限公司"){
					subject.setValue("广州日滨");
				}
				else if(subject.getValue=="日立电梯（中国）有限公司"){
					subject.setValue("总部");
				}else{
					subject.setValue("分公司");
				}
				
			}
		}
			
			if(obj_this.checkvalue26()==false){
				flag = false;
				return flag;
			}
			
			obj_this.caljifen();
			obj_this.worry();
			return flag;
	},
	
	worry : function(){
		var result="nocon";
		var cheoss = Ext.getCmp('cheoss').getValue();
		var node = Ext.getCmp('node').getValue();
		    
		if(node=="员工关系科初审"){
     	   var ishg = Ext.getCmp('ishg').getValue(); 
		   if(ishg=="合格"){
		      result="y3";
		    }
		    else if(ishg=="合格采纳"){
		      result="y2";
		    }
		    else if(ishg=="合格并结束流转"){        
		            result="y1";
		         }else{        
		            result="@";
		         }	 
		}

		if(node=="被分派人分析报告"){
		   if(cheoss=="送交相关部门负责人"){
		      result="y1";
		    }
			else{        
		           result="@";
		         }	 
		}
		Ext.getCmp('conds').setValue(result);
	},
	


	checkvalue26 : function() {
		var flag = true;
		var node = Ext.getCmp('node').getValue();
		if (node=="员工关系科初审") {
			if(Ext.getCmp('ishg').getValue()==""){
				Ext.Msg.alert('请选择评价!');
				flag = false;
			}
		}
		if (node=="相关部门负责人") {
			if(Ext.getCmp('iscn1').getValue()=="采纳"&&Ext.getCmp('ssy').getValue()==""){
				Ext.Msg.alert('请选择实施人!');
				flag = false;
			}
		}
		
//		if (node=="本部门直接负责人意见")
//		{
//			Ext.getCmp('iscn1').setValue();
//	     }
		if (node=="直属领导处理") {
			if(Ext.getCmp('iscn').getValue()==""){
				Ext.Msg.alert('请选择是否采纳该提案!');
				flag = false;
			}
		}
		if (node=="项目责任人描述实施过程及成果") {
			if (Ext.getCmp('gsqzy').getValue()=="" ||Ext.getCmp('gsqzy1').getValue()=="" || Ext.getCmp('gsqzy2').getValue()=="" ||Ext.getCmp('gsqzy3').getValue()=="") {
				flag = false;
			}
		}

		if (node=="相关部门提案评审小组组长") {
			if (Ext.getCmp('fena').getValue()=="" ||Ext.getCmp('fenb').getValue()=="" ||Ext.getCmp('jsx').getValue()=="" ||
					Ext.getCmp('cxx').getValue()=="" ||Ext.getCmp('yjnd').getValue()=="" ||Ext.getCmp('syx').getValue()=="" )
	           {
				Ext.Msg.alert('请输入相关信息，再提交!');
				flag = false;
			}
		}
		
		return flag;
	},
	
	
	caljifen : function(){
		 var node = Ext.getCmp('node').getValue();
		 var x;
		 if (node=="相关部门提案评审小组组长") {	
			x=parseFloat(Ext.getCmp('fena').getValue()) + parseFloat(Ext.getCmp('fenb').getValue()) + parseFloat(Ext.getCmp('jsx').getValue()) + parseFloat(Ext.getCmp('cxx').getValue()) + parseFloat(Ext.getCmp('yjnd').getValue()) + parseFloat(Ext.getCmp('syx').getValue());
			Ext.getCmp('zongfen').setValue(x.toString());
			this.calgrade();
		 }	
	},

	
	calgrade :function(){
		var node = Ext.getCmp('node').getValue();
		var x;
		if (node=="相关部门提案评审小组组长") {	
			x=parseFloat(Ext.getCmp('zongfen').getValue());
			if (x<=60) {
				Ext.getCmp('pingji').setValue('7');
			}
			if (x>60 && x<=80) {
				Ext.getCmp('pingji').setValue('6');
			}
			if (x>80 && x<=100) {
				Ext.getCmp('pingji').setValue('5');
			}
			if (x>100 && x<=120) {
				Ext.getCmp('pingji').setValue('4');
			}
			if (x>120 && x<=150) {
				Ext.getCmp('pingji').setValue('3');
			}
			if (x>150 && x<=180) {
				Ext.getCmp('pingji').setValue('2');
			}
			if (x>181 ) {
				Ext.getCmp('pingji').setValue('1');
			}
	 }	
	}
	
	
	
	
});