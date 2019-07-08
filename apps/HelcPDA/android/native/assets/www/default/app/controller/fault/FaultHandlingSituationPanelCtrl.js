
/* JavaScript content from app/controller/fault/FaultHandlingSituationPanelCtrl.js in folder common */
Ext.define('HelcPDA.controller.fault.FaultHandlingSituationPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'fauhspanctrl_id',
	config:{
		refs:{
			buttonint:'button[id=buttonback_id]'
		},
		control:{
			buttonint:{
				tap:'intnil'
			}
		}
	},
	intnil:function(){
		var ATobj=Ext.getCmp('ACTIVITYID');
		alert("ATobj: "+ATobj);
	//	console.log(ATobj.getValue());
		var invocationData = {  
                adapter : 'SqlAdapter',  
                procedure : 'Audit_Case', 
                parameters : []
        };  
    	WL.Client.invokeProcedure(invocationData, {
            onSuccess : function (result) { 
    						var invocationResult=result.invocationResult;
    						var isSuccessful=invocationResult.isSuccessful;
    						if(isSuccessful==true){
    							var resultSet=invocationResult.resultSet;
    							console.log(resultSet[0].ACTIVITY_ID);
    							var obj1=Ext.getCmp('Activity_id');
    							obj1.setValue(resultSet[0].ACTIVITY_ID);
    							var obj2=Ext.getCmp('STARTUS_ID');
    							obj2.setValue(resultSet[0].STARTUS);
    							var obj3=Ext.getCmp('STATIONMASTER_ID');
    							obj3.setValue(resultSet[0].STATIONMASTER_ID);
    							var obj4=Ext.getCmp('STATIONMASTER_TIME_ID');
    							obj4.setValue(resultSet[0].STATIONMASTER_TIME);
    							var obj5=Ext.getCmp('REJECT_CAUSE_ID');
    							obj5.setValue(resultSet[0].REJECT_CAUSE);
    							var obj6=Ext.getCmp('TECHNICAL_AUDIT_ID');
    							obj6.setValue(resultSet[0].TECHNICAL_AUDIT_ID);
    							var obj7=Ext.getCmp('AUDIT_DATE_ID');
    							obj7.setValue(resultSet[0].AUDIT_DATE);
    							var obj8=Ext.getCmp('FAULT_CAUSE_ID');
    							obj8.setValue(resultSet[0].FAULT_CAUSE);
    							var obj9=Ext.getCmp('FAULT_RESOURCE_ID');
    							obj9.setValue(resultSet[0].FAULT_RESOURCE);
    							var obj10=Ext.getCmp('FAULT_REASON_ID');
    							obj10.setValue(resultSet[0].FAULT_REASON);
    							var obj11=Ext.getCmp('REASON_ANALYSE_ID');
    							obj11.setValue(resultSet[0].REASON_ANALYSE);
    							var obj12=Ext.getCmp('FAULT_DEFINITION_ID');
    							obj12.setValue(resultSet[0].FAULT_DEFINITION);
    							var obj13=Ext.getCmp('QUESTION_CATEGORY_ID');
    							obj13.setValue(resultSet[0].QUESTION_CATEGORY);
    							var obj14=Ext.getCmp('QUESTION_TYPE_ID');
    							obj14.setValue(resultSet[0].QUESTION_TYPE);
    							var obj15=Ext.getCmp('DUTY_BELONG_TO_ID');
    							obj15.setValue(resultSet[0].DUTY_BELONG_TO);
    							var obj16=Ext.getCmp('FAULT_ID');
    							obj16.setValue(resultSet[0].FAULT);
    							var obj17=Ext.getCmp('DUTY_TYPE_ID');
    							obj17.setValue(resultSet[0].DUTY_TYPE);
    							var obj18=Ext.getCmp('MACHINE_TYPE_ID');
    							obj18.setValue(resultSet[0].MACHINE_TYPE);
    							var obj19=Ext.getCmp('FIRST_TYPE_ID');
    							obj19.setValue(resultSet[0].FIRST_TYPE);
    							var obj20=Ext.getCmp('SECOND_TYPE_ID');
    							obj20.setValue(resultSet[0].SECOND_TYPE);
    							var obj21=Ext.getCmp('THIRD_TYPE_ID');
    							obj21.setValue(resultSet[0].THIRD_TYPE);
    							var obj22=Ext.getCmp('REASON_TYPE_ID');
    							obj22.setValue(resultSet[0].REASON_TYPE);
    							var obj23=Ext.getCmp('REASON_ONE_ID');
    							obj23.setValue(resultSet[0].REASON_ONE);
    							var obj24=Ext.getCmp('REASON_TWO_ID');
    							obj24.setValue(resultSet[0].REASON_TWO);
    							var obj25=Ext.getCmp('REASON_CONFIRM_ID');
    							obj25.setValue(resultSet[0].REASON_CONFIRM);
    							
    							
    						
                } else {
                	
                	Ext.Msg.alert('提示','网络出错！'); 
                }
            },  
            onFailure : function () {
            	
            	 Ext.Msg.alert('提示','发送请求失败'); 
            	}
        });
	}
});
