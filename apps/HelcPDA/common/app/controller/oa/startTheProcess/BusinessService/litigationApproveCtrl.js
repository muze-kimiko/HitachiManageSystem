Ext.define('HelcPDA.controller.oa.startTheProcess.BusinessService.litigationApproveCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
	config:{
		control:{
		}
	},
	
	worry : function() {
		var result="nocon";
		var isapply=Ext.getCmp('isapply').getValue();
		var httype=Ext.getCmp('httype').getValue();
		if(Ext.getCmp('node').getValue()=="法务管理科复核信息"){
		  result="@,y1";
		   if(isapply=="否"){
		      result=result+",y2";
		    }
		    if(isapply=="是"){
		      result=result+",y4";
		    }
		   if( httype=="安装合同" && httype=="维保合同" && httype=="改造合同"){        
		            result=result+",y3";
		    } 
		    
		}
		Ext.getCmp('conds').setValue(result); 
	},
	
	checkvalue35:function() {
	    if (Ext.getCmp('node').getValue()=="起草") {
	        var selhttype=Ext.getCmp('httype').getValue();
	        if (selhttype=="买卖合同"){
	            if ( Ext.getCmp('paymoney1').getValue()=="" || Ext.getCmp('notpaymoney1').getValue()=="" || Ext.getCmp('money2').getValue()=="" || Ext.getCmp('money3').getValue()=="" || 
	            Ext.getCmp('money4').getValue()=="" || Ext.getCmp('money5').getValue()=="" || Ext.getCmp('money6').getValue()=="" || 
	            Ext.getCmp('date1').getValue()==""){
	                Ext.Msg.alert('请完善买卖合同款项');
	                WL.Toast.show('请完善买卖合同款项');
	                Ext.getCmp('paymoney1').setRequired(true);
	                Ext.getCmp('notpaymoney1').setRequired(true);
	                Ext.getCmp('money2').setRequired(true);
	                Ext.getCmp('money3').setRequired(true);
	                Ext.getCmp('money4').setRequired(true);
	                Ext.getCmp('money5').setRequired(true);
	                Ext.getCmp('money6').setRequired(true);
	                Ext.getCmp('date1').setRequired(true);
	                return false;
	            }
	        }
	        if (selhttype=="安装合同"){
	            if ( Ext.getCmp('htmoney2').getValue()=="" || Ext.getCmp('paymoney2').getValue()=="" || Ext.getCmp('notpaymoney2').getValue()=="" || 
	            		Ext.getCmp('money11').getValue()=="" || Ext.getCmp('money12').getValue()=="" || Ext.getCmp('money13').getValue()=="" || 
	            		Ext.getCmp('money14').getValue()=="" || Ext.getCmp('money15').getValue()=="" || Ext.getCmp('date2').getValue()==""){
	            	Ext.Msg.alert('请完善安装合同款项');
	                WL.Toast.show('请完善安装合同款项');
	                Ext.getCmp('htmoney2').setRequired(true);
	                Ext.getCmp('paymoney2').setRequired(true);
	                Ext.getCmp('notpaymoney2').setRequired(true);
	                Ext.getCmp('money11').setRequired(true);
	                Ext.getCmp('money12').setRequired(true);
	                Ext.getCmp('money13').setRequired(true);
	                Ext.getCmp('money14').setRequired(true);
	                Ext.getCmp('money15').setRequired(true);
	                Ext.getCmp('date2').setRequired(true);
//	                Ext.getCmp('htmoney2').focus();
	                return false;
	            }
	        }
	        if (selhttype=="买卖附带安装合同"){
	            if (Ext.getCmp('paymoney1').getValue()=="" || Ext.getCmp('notpaymoney1').getValue()=="" || Ext.getCmp('money2').getValue()=="" || Ext.getCmp('money3').getValue()=="" || 
	            		Ext.getCmp('money4').getValue()=="" || Ext.getCmp('money5').getValue()=="" || Ext.getCmp('money6').getValue()=="" || 
	            		Ext.getCmp('date1').getValue()=="" || Ext.getCmp('htmoney2').getValue()=="" || Ext.getCmp('paymoney2').getValue()=="" || 
	            		Ext.getCmp('notpaymoney2').getValue()=="" || Ext.getCmp('money11').getValue()=="" || Ext.getCmp('money12').getValue()=="" || 
	            		Ext.getCmp('money13').getValue()=="" || Ext.getCmp('money14').getValue()=="" || Ext.getCmp('money15').getValue()=="" || 
	            		Ext.getCmp('date2').getValue()==""){
	            	Ext.Msg.alert('请完善买卖及安装合同款项');
	                WL.Toast.show('请完善买卖及安装合同款项');
	                Ext.getCmp('paymoney1').setRequired(true);
	                Ext.getCmp('notpaymoney1').setRequired(true);
	                Ext.getCmp('money2').setRequired(true);
	                Ext.getCmp('money3').setRequired(true);
	                Ext.getCmp('money4').setRequired(true);
	                Ext.getCmp('money5').setRequired(true);
	                Ext.getCmp('money6').setRequired(true);
	                Ext.getCmp('date1').setRequired(true);
	                Ext.getCmp('htmoney2').setRequired(true);
	                Ext.getCmp('paymoney2').setRequired(true);
	                Ext.getCmp('notpaymoney2').setRequired(true);
	                Ext.getCmp('money11').setRequired(true);
	                Ext.getCmp('money12').setRequired(true);
	                Ext.getCmp('money13').setRequired(true);
	                Ext.getCmp('money14').setRequired(true);
	                Ext.getCmp('money15').setRequired(true);
	                Ext.getCmp('date2').setRequired(true);
	                return false;
	            }
	        }
	        if (selhttype=="维保合同"){
	            if (Ext.getCmp('htmoney3').getValue()=="" || Ext.getCmp('paymoney3').getValue()=="" || Ext.getCmp('notpaymoney3').getValue()=="" || 
	            		Ext.getCmp('money21').getValue()==""){
	            	Ext.Msg.alert('请完善维保合同款项');
	                WL.Toast.show('请完善维保合同款项');
	                Ext.getCmp('htmoney3').setRequired(true);
	                Ext.getCmp('paymoney3').setRequired(true);
	                Ext.getCmp('notpaymoney3').setRequired(true);
	                Ext.getCmp('money21').setRequired(true);
//	                frm.htmoney3.focus();
	                return false;
	            }
	        }
	        if (selhttype=="改造合同"){
	            if (Ext.getCmp('htmoney4').getValue()=="" || Ext.getCmp('paymoney4').getValue()=="" || Ext.getCmp('notpaymoney4').getValue()=="" || 
	            		Ext.getCmp('money31').getValue()==""){
	            	Ext.Msg.alert('请完善改造合同款项');
	                WL.Toast.show('请完善改造合同款项');
	                Ext.getCmp('htmoney4').setRequired(true);
	                Ext.getCmp('paymoney4').setRequired(true);
	                Ext.getCmp('notpaymoney4').setRequired(true);
	                Ext.getCmp('money31').setRequired(true);
//	                Ext.getCmp('htmoney4').focus();
	                return false;
	            }
	        }
	    }
	    
//	    if (Ext.getCmp('node').getValue()=="法务管理科复核信息"){
//	        if ("诉讼审批流程"=="诉讼审批流程") {
//	            var isapply=Ext.getCmp('isapply').getValue();
//	            if (isapply==""){
//	                Ext.Msg.alert('是否曾申请发律师函');
//	                WL.Toast.show('是否曾申请发律师函');
//	                EXt.getCmp('isapply').focus();
//	                return false;
//	            }
//	            if (isapply=="是"){
//	                if (Ext.getCmp('lshfileno').getValue()=="" || Ext.getCmp('applytime').getValue()==""){
//	                    Ext.Msg.alert('请完善律师涵信息');
//		                WL.Toast.show('请完善律师涵信息');
//		                Ext.getCmp('applytime').setRequired(true);
//		                Ext.getCmp('lshfileno').setRequired(true);
//		                EXt.getCmp('lshfileno').focus();
//	                    return false;
//	                }
//	            }
//	        }
//	        if (Ext.getCmp('yyleader').getValue()==""){
//	            Ext.Msg.alert('请选择营业总部部长');
//                WL.Toast.show('请选择营业总部部长');
//                Ext.getCmp('yyleader').setRequired(true);
////	            Ext.getCmp('yyleader').focus();
//	            return false;
//	        }
//	    }
	    return true;
	},

});