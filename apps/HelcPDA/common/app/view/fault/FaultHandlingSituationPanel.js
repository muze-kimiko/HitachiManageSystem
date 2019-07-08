/*
 * File: app/view/FaultHandlingSituationPanel.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcPDA.view.fault.FaultHandlingSituationPanel', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '审核情况',
                items: [
                    {
                        xtype: 'button',
                        id:'buttonbk_id',
                        
                        text: '返回',
                        listeners:{
                       	 tap:function(){
                       		 var obj=Ext.getCmp('FaultFHDP');
                       		 {
                       		 if(!obj){
                       			 obj=Ext.create('HelcPDA.view.fault.FaultHandlingDetailPanel');                       		 
                       	            }
                       	       }
                           Ext.Viewport.setActiveItem(obj);
                        }
                    }
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                height: '100%',
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '活动号',
                                id:'Activity_id',
                                labelWidth: '50%',
                                value: [
                                   
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '审核状态',
                                id:'STARTUS_ID',
                                labelWidth: '50%',
                                value: [
                                   
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '站长',
                                id:'STATIONMASTER_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '站长确认时间',
                                id:'STATIONMASTER_TIME_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '驳回原因',
                                id:'REJECT_CAUSE_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '技术审核人',
                                id:'TECHNICAL_AUDIT_ID',
                                labelWidth: '50%',
                                value: [
                                  
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '技术审核时间',
                                id:'AUDIT_DATE_ID',
                                labelWidth: '50%',
                                value: [
                                   
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '故障现象',
                                id:'FAULT_CAUSE_ID',
                                labelWidth: '50%',
                                value: [
                                      
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '故障对策',
                                id:'FAULT_RESOURCE_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '故障原因',
                                id:'FAULT_REASON_ID',
                                labelWidth: '50%',
                                value: [
                                 
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '故障分析',
                                id:'REASON_ANALYSE_ID',
                                labelWidth: '50%',
                                value: [
                                 
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '故障定义',
                                id:'FAULT_DEFINITION_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '不良类别',
                                id:'QUESTION_CATEGORY_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '不良分类',
                                id:'QUESTION_TYPE_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '自责他责',
                                id:'DUTY_BELONG_TO_ID',
                                labelWidth: '50%',
                                value: [
                                   
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '是否故障',
                                id:'FAULT_ID',
                                labelWidth: '50%',
                                value: [
                                  
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '责任分类',
                                id:'DUTY_TYPE_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '机器分类',
                                id:'MACHINE_TYPE_ID',
                                labelWidth: '50%',
                                value: [
                                   
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '第一分类',
                                id:'FIRST_TYPE_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '第二分类',
                                id:'SECOND_TYPE_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '第三分类',
                                id:'THIRD_TYPE_ID',
                                labelWidth: '50%',
                                value: [
                                   
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '原因分类',
                                id:'REASON_TYPE_ID',
                                labelWidth: '50%',
                                value: [
                                   
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '原因一分类',
                                id:'REASON_ONE_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '原因二分类',
                                id:'REASON_TWO_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '原因确认',
                                id:'REASON_CONFIRM_ID',
                                labelWidth: '50%',
                                value: [
                                    
                                ],
                                readOnly: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    initialize: function() {
    	var ATobj=Ext.getCmp('ACTIVITYID');
    	 Activity=ATobj.getValue();
    //	Activity='1-51Q2J2';
    	console.log(Activity);
    	console.log(person_id);
	//alert("ATobj: "+ATobj.getValue());
	//	console.log(ATobj.getValue());
//		var invocationData = {  
//                adapter : 'HttpAdapter_PDA',  
//                procedure : 'getStories', 
//                parameters : ['gzdaichuliAction.do?method=toSearch_bhe',"{'ACTIVITY_ID':'"+Activity+"','person_id':'"+person_id+"'}"]
//        };  
    	var invocationData = {  
                adapter : 'SqlAdapter_PDA',  
                procedure : 'Audit_Case', 
                parameters : [Activity]
        };  
    	 console.log('aa');
    	WL.Client.invokeProcedure(invocationData, {
            onSuccess : function (result) { 
    						var invocationResult=result.invocationResult;
    						console.log(result);
    						var isSuccessful=invocationResult.isSuccessful;
    						if(isSuccessful==true){
    							var resultSet=invocationResult.resultSet;
    							console.log(resultSet.length);
    							console.log('aabbcc');
    							if(resultSet.length==0){
    								WL.Toast.show('没有数据');
    							alert('没有数据');
    							}else{
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
    							}
    							
    							
    						
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