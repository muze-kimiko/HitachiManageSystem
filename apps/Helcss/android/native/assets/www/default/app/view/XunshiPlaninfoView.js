
/* JavaScript content from app/view/XunshiPlaninfoView.js in folder common */
/**
 * XunshiPlaninfoView
 */
Ext.define('Helcss.view.XunshiPlaninfoView', {
    extend: 'Ext.Panel',
    id:'xunshiplaninfo',
    config: {
        style: '',
        items: [
            {
                xtype: 'toolbar',
                id:'xunshiplaninfo_toolbar',
                docked: 'top',
                title: '<b>保养计划</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'xs_planinfo_back',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                id:'jsinfoPanel',
                height: '100%',
                margin: '0 auto',
                width: '100%',
                items: [
                    {
                        xtype: 'fieldset',
                        padding: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id:'client',
                                label: '客户名称', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_domain',
                                label: '地盘名称', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_site',
                                label: '大楼', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_tino',
                                label: '梯号', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_no',
                                label: '工号', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_layer',
                                label: '层/站', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'person_name1',
                                label: '作业人员①', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'person_name2',
                                label: '作业人员②', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'plan_start_dt',
                                label: '作业时间', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'plan_year',
                                label: '计划年', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'plan_month',
                                label: '计划月', 
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'plan_times',
                                label: '次数', 
                                readOnly: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    initialize: function() { 
    	if(PDsystem==1){
    		Ext.getCmp('xunshiplaninfo_toolbar').setStyle('font-size:12pt');
    		Ext.getCmp('client').setLabelWidth('40%');
    		Ext.getCmp('ele_domain').setLabelWidth('40%');
    		Ext.getCmp('ele_site').setLabelWidth('40%');
    		Ext.getCmp('ele_tino').setLabelWidth('40%');
    		Ext.getCmp('ele_no').setLabelWidth('40%');
    		Ext.getCmp('ele_layer').setLabelWidth('40%');
    		Ext.getCmp('person_name1').setLabelWidth('40%');
    		Ext.getCmp('person_name2').setLabelWidth('40%');
    		Ext.getCmp('plan_start_dt').setLabelWidth('40%');
    		Ext.getCmp('plan_year').setLabelWidth('40%');
    		Ext.getCmp('plan_month').setLabelWidth('40%');
    		Ext.getCmp('plan_times').setLabelWidth('40%');
    		
    		Ext.getCmp('client').setCls('YaoJiao_size');
    		Ext.getCmp('ele_domain').setCls('YaoJiao_size');
    		Ext.getCmp('ele_site').setCls('YaoJiao_size');
    		Ext.getCmp('ele_tino').setCls('YaoJiao_size');
    		Ext.getCmp('ele_no').setCls('YaoJiao_size');
    		Ext.getCmp('ele_layer').setCls('YaoJiao_size');
    		Ext.getCmp('person_name1').setCls('YaoJiao_size');
    		Ext.getCmp('person_name2').setCls('YaoJiao_size');
    		Ext.getCmp('plan_start_dt').setCls('YaoJiao_size');
    		Ext.getCmp('plan_year').setCls('YaoJiao_size');
    		Ext.getCmp('plan_month').setCls('YaoJiao_size');
    		Ext.getCmp('plan_times').setCls('YaoJiao_size');
    	};
    	
    	myLoading.show();
    	
    	var invocationData = {  
                adapter : 'SqlAdapter',  
                procedure : 'procedure_xsplaninfo', 
                parameters : [xs_plan_id]
                
        }; 
    	
    	WL.Client.invokeProcedure(invocationData, {
            onSuccess : function (result) { 
            	var httpStatusCode = result.status;
            	if (200 == httpStatusCode) {
                    var invocationResult = result.invocationResult;
                    var isSuccessful = invocationResult.isSuccessful;
                    if (true == isSuccessful) {
                    	var resultSet = invocationResult.resultSet;
                    	console.log("resultSet:"+resultSet);  
                    	
                    	Ext.getCmp('client').setValue(resultSet[0].client);
                        Ext.getCmp('ele_domain').setValue(resultSet[0].ele_domain);
                        Ext.getCmp('ele_site').setValue(resultSet[0].ele_site);
                        Ext.getCmp('ele_tino').setValue(resultSet[0].ele_tino);
                        Ext.getCmp('ele_no').setValue(resultSet[0].ele_no);
                        
                        Ext.getCmp('ele_layer').setValue(resultSet[0].ele_layer);
                        Ext.getCmp('person_name1').setValue(resultSet[0].person_name1);
                        Ext.getCmp('person_name2').setValue(resultSet[0].person_name2);
                        Ext.getCmp('plan_start_dt').setValue(resultSet[0].plan_start_dt);
                        Ext.getCmp('plan_year').setValue(resultSet[0].plan_year);
                        
                        Ext.getCmp('plan_month').setValue(resultSet[0].plan_month);
                        Ext.getCmp('plan_times').setValue(resultSet[0].plan_times); 
                        
                        myLoading.hide();
                    } else {
                    	myLoading.hide();
                    	Ext.Msg.alert('提示','获取数据失败!');  
                    }
                } else {
                	myLoading.hide();
                	Ext.Msg.alert('提示','网络出错！'); 
                }
            },  
            onFailure : function () {
            	 myLoading.hide();
            	 Ext.Msg.alert('提示','发送请求失败'); 
            	}
        }); 
    } 
});