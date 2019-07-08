Ext.define('HelcPDA.view.maintain.MaintenaceSendCardSearch', {
    extend: 'Ext.Panel',
    id:'maintenaceSendCardSearch',
    height:'100%',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Spacer'
    ],

    config: {
        margin: '0 auto',
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '按条件查询',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'debugbackList',
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                scrollable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '0 auto',
                        items: [
                                {
                                	xtype:'selectfield',
                                	label:'查询方式',
                                	id:'Choice_Style',
                                	labelWidth:'40%',
                                	options:[
                                	        {text:'计划工号查询',value:'计划工号查询'},
                                	        {text:'打卡数据查询',value:'打卡数据查询'},
                                	        ]
                                },
                            {
                                xtype: 'textfield',
                                label: '工号',
                                id:'ELEVATOR_NO',
                                labelWidth: '40%',
                                placeHolder: '请输入精确的工号'
                            },
						    {
                                xtype: 'textfield',
                                id:'START_TIME',
                                label: '开始日期',
                                labelWidth: '40%',
                                placeHolder: '请选择开始日期',
                                readOnly:true,
                                hidden:true,
								listeners:{
                                      focus:function(){
                                           initDate1('START_TIME','开始日期');
                                        }
                                    }
                            },
						    {
                                xtype: 'textfield',
                                id:'END_TIME',
                                label: '结束日期',
                                labelWidth: '40%',
                                readOnly:true,
                                hidden:true,
                                placeHolder: '请选择结束日期',
								listeners:{
                                         focus:function(){
                                               initDate1('END_TIME','结束日期');
                                           }
                                          }
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'spacer'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '15 0',
                                        width: '90%',
                                        id:'toSearch_history',
                                        text: '查询'
                                    },
                                    {
                                        xtype: 'spacer'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

});