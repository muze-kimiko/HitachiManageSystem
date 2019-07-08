
/* JavaScript content from app/view/install/installcheck/InstallatoinTasksFactoryInfoPanel.js in folder common */
Ext.define('HelcPDA.view.install.installcheck.InstallatoinTasksFactoryInfoPanel', {
    extend: 'Ext.Panel',
    id: 'installatoinTasksFactoryInfoPanel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Search'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '厂检信息',
                items: [
                    {
                    	xtype: 'button',
                        id: 'back_TasksFactory',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'menu_button',
                        handler: function(button, e) {
                            var menu = Ext.create('Ext.Menu', {
                            	items: [
								{
								    text: '菜单',
								    id: 'menu_TaskFactory',
								    handler: function() {
                                        Ext.Viewport.removeMenu('right');
                                    }
								},
                                {
                                    text: '保存',
                                    id: 'save_TaskFactory',
                                    handler: function() {
                                        Ext.Viewport.removeMenu('right');
                                    }
                                },
                                {
                                    text: '提交',
                                    id: 'commit_TaskFactory',
                                    handler: function() {
                                        Ext.Viewport.removeMenu('right');
                                    }
                                },
                                {
                                	text: '回滚',
                                	id: 'rollback_check',
                                	docked: 'bottom',
                                	handler: function() {
                                        Ext.Viewport.removeMenu('right');
                                    }
                                }
                                ]
                            });
                            
                            //如果是监理人员，菜单按钮不可点
                            if(init_person_id==''||init_person_id==null||typeof(init_person_id)=='undefined'){
                    		
                            }else{
                    			Ext.getCmp('menu_TaskFactory').setDisabled(true);
                    			Ext.getCmp('rollback_check').setDisabled(true);
                    		}


                            Ext.Viewport.setMenu(menu, {
                                side: 'right',
                                reveal: false
                            });

                            Ext.Viewport.showMenu('right');

                        },
                        iconCls: 'more',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                id: 'ITF_tab',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        id: 'itf_CKXX',
                        title: '查看信息',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                height: '100%',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype:'hiddenfield',
                                                id:'TASK_PROCESS_ID',
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'ORG_ID',
                                            },
                                            {
                                            	xtype:'hiddenfield',
                                            	id:'DEBUG_NUM',
                                            },
											{
												xtype:'hiddenfield',
												id:'TASK_ID',
											},
                                            {
                                                xtype: 'textfield',
                                                id: 'ENGCONTRACT_NUMBER',
                                                label: '安装合同号:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ELEVATOR_NO',
                                                label: '工号:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id: 'CUSTOMER_NAME',
                                                label: '客户名称:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id: 'INSTALL_ADDRESS',
                                                label: '安装地址:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PRODUCE_TYPE',
                                                label: '生产类型:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'SEQ_NUM',
                                                label: '批次:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'EQUIPMENT_NO',
                                                label: '设备号:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CM_ELEVATOR_TYPE_NAME',
                                                label: '梯种:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ELEVATOR_CLASS_NAME',
                                                label: '工号类型:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id: 'NST_VENDOR_NAME',
                                                label: '安装单位:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id: 'LIFT_VENDOR_NAME',
                                                label: '吊装单位:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id: 'BUILD_VENDOR_NAME',
                                                label: '搭棚单位:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'BUDGET_INSTALL_METHOD',
                                                label: '安装工法:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PARAM_C_Z_M',
                                                label: '层/站/门:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ZZ',
                                                label: '载重:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'SD',
                                                label: '速度:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'TSGD',
                                                label: '提升高度:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'JDZG',
                                                label: '井道高度:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'GET_CHECK_DATE',
                                                label: '接检日期:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PLAN_CHECK_DATE',
                                                label: '派检日期:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'JL_NAME',
                                                label: '监理人员:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_NAME',
                                                label: '检验人员:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'INST_PERSON_NAME',
                                                label: '安装人员:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'INSTALL_HEADER',
                                                label: '安装组长:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'TEL',
                                                label: '组长电话:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_NUM',
                                                label: '厂检次第:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PLAN_CHECK_FINISH_DATE',
                                                label: '计划完成:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_STATUS',
                                                label: '竣工菜单状态:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_APPROVED_BY',
                                                label: '审核人:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_APPROVAL_DATE',
                                                label: '审核日期:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_APPROVAL_NOTE',
                                                label: '审核意见:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'BALANCE_INDEX',
                                                label: '平衡系数(%):',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'COUNTER_WEIGHT',
                                                label: '对重块:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            }
                                        ]},
                                        {
                                            xtype: 'fieldset',
                                            title: '验收不合格项',
                                            items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'NO_HETONG',
                                                label: '合同号:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'NO_GONGHAO',
                                                label: '工号:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'NO_PICI',
                                                label: '批次:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'NO_CIDI',
                                                label: '次第:',
                                                labelWidth: '40%',
                                                readOnly: true
                                            }
                                         ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '电源电流',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_0',
                                                label: '上行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_0',
                                                label: '下行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_30',
                                                label: '上行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_30',
                                                label: '下行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_40',
                                                label: '上行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_40',
                                                label: '下行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_45',
                                                label: '上行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_45',
                                                label: '下行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_50',
                                                label: '上行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_50',
                                                label: '下行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_60',
                                                label: '上行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_60',
                                                label: '下行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_100',
                                                label: '上行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_100',
                                                label: '下行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_UP_110',
                                                label: '上行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDL_DOWN_110',
                                                label: '下行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '电机电流',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_0',
                                                label: '上行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_0',
                                                label: '下行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_30',
                                                label: '上行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_30',
                                                label: '下行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_40',
                                                label: '上行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_40',
                                                label: '下行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_45',
                                                label: '上行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_45',
                                                label: '下行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_50',
                                                label: '上行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_50',
                                                label: '下行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_60',
                                                label: '上行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_60',
                                                label: '下行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_100',
                                                label: '上行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_100',
                                                label: '下行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_UP_110',
                                                label: '上行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DJDL_DOWN_110',
                                                label: '下行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '平层数据',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_0',
                                                label: '上行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_0',
                                                label: '下行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_30',
                                                label: '上行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_30',
                                                label: '下行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_40',
                                                label: '上行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_40',
                                                label: '下行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_45',
                                                label: '上行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_45',
                                                label: '下行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_50',
                                                label: '上行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_50',
                                                label: '下行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_60',
                                                label: '上行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_60',
                                                label: '下行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_100',
                                                label: '上行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_100',
                                                label: '下行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_UP_110',
                                                label: '上行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'PCSJ_DOWN_110',
                                                label: '下行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '电流电压',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_0',
                                                label: '上行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_0',
                                                label: '下行(0%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_30',
                                                label: '上行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_30',
                                                label: '下行(30%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_40',
                                                label: '上行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_40',
                                                label: '下行(40%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_45',
                                                label: '上行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_45',
                                                label: '下行(45%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_50',
                                                label: '上行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_50',
                                                label: '下行(50%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_60',
                                                label: '上行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_60',
                                                label: '下行(60%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_100',
                                                label: '上行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_100',
                                                label: '下行(100%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_UP_110',
                                                label: '上行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'DYDY_DOWN_110',
                                                label: '下行(110%)',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'itf_CJ',
                        title: '厂检',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                id: 'check_formpanel',
                                flex: 1,
                                height: 600,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '初检输入项',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                label: '验收到达',
                                                id: 'CHECK_ARRIVE_DATE',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'CHECK_ARRIVE_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'验收到达时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('CHECK_ARRIVE_DATE').setValue();
                                                        	    		   Ext.getCmp('CHECK_ARRIVE_DATE_picker').setValue();
                                                    	    			   Ext.getCmp('CHECK_ARRIVE_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    },
                                                    listeners:{
                                                  	   show:function(){
                                                  		   var value=Ext.getCmp('CHECK_ARRIVE_DATE').getValue(); 
                                                  		   if(value==''||value==null||typeof(value)=='undefined'){
                                                  			   Ext.getCmp('CHECK_ARRIVE_DATE_picker').setValue(new Date());
                                                  		   }
                                                  	   }
                                                     }  

                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'SETUP_UNIT_SIGN_NAME',
                                                label: '初检安装组',
                                                labelWidth: '40%',
                                                placeHolder: '请输入初检安装组',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'CHEK_MAN_SIGN',
                                                        height: 40,
                                                        width: '75%',
                                                        label: '初检检查员',
                                                        labelWidth: '53%',
                                                        name: '',
                                                        placeHolder: '请签名',
                                                        readOnly: true
                                                    },
                                                    {
                                                        xtype:'hiddenfield',
                                                        id:'CHECK_MAN_SIGN',
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_CHEK_MAN_SIGN',
                                                        height: 41,
                                                        style: 'border:0;',
                                                        width: '35%',
                                                        text: '签名'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'INSTALL_CHECK_END_DATE',
                                                label: '初检完成',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                toolbar: { title:'初检完成时间'},
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'INSTALL_CHECK_END_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'初检完成时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('INSTALL_CHECK_END_DATE').setValue();
                                                    	    			   Ext.getCmp('INSTALL_CHECK_END_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '复检输入项',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                label: '复检开始',
                                                id: 'RECHECK_START_DATE',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'RECHECK_START_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'复检开始时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('RECHECK_START_DATE').setValue();
                                                    	    			   Ext.getCmp('RECHECK_START_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'SETUP_UNIT_SIGN1_NAME',
                                                label: '复检安装组',
                                                labelWidth: '40%',
                                                placeHolder: '请输入复检安装组',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'CHEK_MAN_SIGN1',
                                                        height: 40,
                                                        width: '75%',
                                                        label: '复检检查员',
                                                        labelWidth: '53%',
                                                        name: '',
                                                        placeHolder: '请签名',
                                                        readOnly: true
                                                    },
                                                    {
                                                        xtype:'hiddenfield',
                                                        id:'CHECK_MAN_SIGN1',
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_CHEK_MAN_SIGN1',
                                                        height: 41,
                                                        style: 'border:0;',
                                                        width: '35%',
                                                        text: '签名'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'RECHECK_FINISH_DATE',
                                                label: '复检完成',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'RECHECK_FINISH_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'复检完成时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('RECHECK_FINISH_DATE').setValue();
                                                    	    			   Ext.getCmp('RECHECK_FINISH_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '验收输入项',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'CHECK_DATE',
                                                label: '验收合格日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'CHECK_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'验收时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('CHECK_DATE').setValue();
                                                    	    			   Ext.getCmp('CHECK_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'REPORT_DATE',
                                                label: '报告签写',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'REPORT_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'报告签写时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('REPORT_DATE').setValue();
                                                    	    			   Ext.getCmp('REPORT_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'REPORT_ENTER_DATE',
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'AHEAD_REPORT_DATE',
                                                label: '提前签写报告',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'AHEAD_REPORT_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'提前签写报告时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('AHEAD_REPORT_DATE').setValue();
                                                    	    			   Ext.getCmp('AHEAD_REPORT_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'RE_CHECK_DATE',
                                                label: '重新报检',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'RE_CHECK_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'重新报检时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('RE_CHECK_DATE').setValue();
                                                    	    			   Ext.getCmp('RE_CHECK_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'BAD_DELIVERY_DATE',
                                                label: '超差交机',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'BAD_DELIVERY_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'超差交机时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('BAD_DELIVERY_DATE').setValue();
                                                    	    			   Ext.getCmp('BAD_DELIVERY_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'SERVICE_NUM',
                                                label: '售后服务号',
                                                labelWidth: '40%',
                                                placeHolder: '请输入售后服务号',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_COMMENTS',
                                                label: '验收备注',
                                                labelWidth: '40%',
                                                placeHolder: '请输入验收备注',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'selectfield',
                                                id: 'CHECK_ACCEPT_STATUE',
                                                label: '验收状态',
                                                labelWidth: '40%',
                                                placeHolder: '请选择',
                                                options: [
                                                    {
                                                        text: '请选择',
                                                        value: '请选择'
                                                    },
                                                    {
                                                        text: '特殊跟进',
                                                        value: '特殊跟进'
                                                    },
                                                    {
                                                        text: '检验合格',
                                                        value: '检验合格'
                                                    },
                                                    {
                                                        text: '初检退检',
                                                        value: '初检退检'
                                                    },
                                                    {
                                                        text: '复检合格',
                                                        value: '复检合格'
                                                    },
                                                    {
                                                        text: '复检退检',
                                                        value: '复检退检'
                                                    },
                                                    {
                                                        text: '安装跟进',
                                                        value: '安装跟进'
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'itf_TJ',
                        title: '退检',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                id: 'return_formpanel',
                                flex: 1,
                                height: 600,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '退检输入项',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'CHECK_RETURN_DATE',
                                                label: '退检日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'CHECK_RETURN_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'退检日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('CHECK_RETURN_DATE').setValue();
                                                    	    			   Ext.getCmp('CHECK_RETURN_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'selectfield',
                                                id: 'CHECK_RETURN_REASON',
                                                label: '退检原因',
                                                labelWidth: '40%',
                                                placeHolder: '请选择',
                                                options: [
													{
													    text: '请选择',
													    value: ''
													},
                                                    {
                                                        text: '监理',
                                                        value: 'JL'
                                                    },
                                                    {
                                                        text: '安装',
                                                        value: 'AZ'
                                                    },
                                                    {
                                                        text: '调试',
                                                        value: 'TS'
                                                    },
                                                    {
                                                        text: '制品',
                                                        value: 'ZP'
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_FORFEIT_AMT',
                                                label: ' 罚款金额',
                                                labelWidth: '40%',
                                                placeHolder: '请输入金额',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'CHECK_FORFEIT_DATE',
                                                label: '罚款日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'CHECK_FORFEIT_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'罚款日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('CHECK_FORFEIT_DATE').setValue();
                                                    	    			   Ext.getCmp('CHECK_FORFEIT_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'TJ_CJTJ_fieldset',
                                        title: '初检退检项',
                                        items: [
                                            {
                                                xtype: 'togglefield',
                                                id: 'AGREE_CHECK_ROLLBACK',
                                                label: '初检退检',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECK_PRINCIPAL_SIGN_TXT',
                                                label: '负责人签名',
                                                labelWidth: '40%',
                                                placeHolder: '请输入初检检验负责人签名',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'CHECK_PRINCIPAL_SIGN_DATE',
                                                label: '签名日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'CHECK_PRINCIPAL_SIGN_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'初检签名日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setValue();
                                                    	    			   Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '检验输入项 (复检退检审批)',
                                        items: [
                                            {
                                                xtype: 'togglefield',
                                                id: 'AGREE_RECHECK_BACKCHECK',
                                                label: '复检退检',
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECKOUT_PRINCIPAL_SIGN_NAME',
                                                label: '负责人签名',
                                                labelWidth: '40%',
                                                placeHolder: '请输入检验负责人签名',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'CHECKOUT_PRINCIPAL_SIGN_DATE',
                                                label: '签名日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'CHECKOUT_PRINCIPAL_SIGN_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'检验签名日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').setValue();
                                                    	    			   Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '工程输入项 (复检退检审批)',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'PROJECT_PRINCIPAL_SIGN_NAME',
                                                label: '负责人签名',
                                                labelWidth: '40%',
                                                placeHolder: '请输入工程负责人签名',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'PROJECT_PRINCIPAL_SIGN_DATE',
                                                label: '签名日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'PROJECT_PRINCIPAL_SIGN_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'工程负责人签名日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').setValue();
                                                    	    			   Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'itf_GJYL',
                        title: '跟进遗留',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                flex: 1,
                                height: 600,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'PRO_DETAILS',
                                                label: '项目内容',
                                                labelWidth: '40%',
                                                placeHolder: '请输入项目内容',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'LEAVE_REASON',
                                                label: '遗留原因',
                                                labelWidth: '40%',
                                                placeHolder: '请输入遗留原因',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'MATERIAL_ADDRESS',
                                                label: '物料存放位置',
                                                labelWidth: '40%',
                                                placeHolder: '请输入物料存放位置',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'spacer'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'add_GJ',
                                                        margin: 10,
                                                        width: '35%',
                                                        iconCls: 'add',
                                                        text: '添加'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'modify_GJ',
                                                        margin: 10,
                                                        width: '35%',
                                                        iconCls: 'compose',
                                                        text: '修改'
                                                    },
                                                    {
                                                        xtype: 'spacer'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                style: 'background-color:#fff；',
                                                items: [
                                                    {
                                                        xtype: 'list',
                                                        id: 'ProList',
                                                        store: 'ProListStore0',
                                                        height: 100,
                                                        itemTpl: [
                                                             '<div style="width:100%; margin:0; padding:0;">',
                                                             '    <h1 style="float:left; margin:0; padding:0;">项目名称:{PRO_DETAILS}</h1>',
                                                             '    <div style="float:right;margin:0;">',
                                                             '    <img id="1" style="width:22px;" src="images/delete01.png"/>',
                                                             '    </div>',
                                                             '</div>'
                                                        ]
                                                    },
                                                    {
                                                    	xtype:'hiddenfield',
                                                    	id:'ProhidddenListIndex',
                                                    	value:''
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'togglefield',
                                                id: 'AGREE_FOLLOWUP',
                                                label: '安装跟进',
                                                labelWidth: '40%'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'CHECKOUT_APPROVE_fieldset',
                                        title: '检验输入项',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'CHECKOUT_APPROVE_SIGN_NAME',
                                                label: '负责人签名',
                                                labelWidth: '40%',
                                                placeHolder: '请输入初检检验负责人签名',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'CHECKOUT_APPROVE_SIGN_DATE',
                                                label: '签名日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'CHECKOUT_APPROVE_SIGN_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'检验签名日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('CHECKOUT_APPROVE_SIGN_DATE').setValue();
                                                    	    			   Ext.getCmp('CHECKOUT_APPROVE_SIGN_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        instructions: '<div style="margin:0 auto;width:92%;text-align:left;">遗留项目需客户配合的内容和要求是否提供给客户</div>',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'togglefield',
                                                id: 'WHETER_APPLY_TO_CUSTOMER',
                                                label: '遗留项目提供',
                                                labelWidth: '40%'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'CUSTOMER_fieldset',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'TRANSFER_CUSTOMER_NAME',
                                                label: '移交客户姓名',
                                                labelWidth: '40%',
                                                placeHolder: '请输入移交客户姓名',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'TEL1',
                                                label: '客户电话',
                                                labelWidth: '40%',
                                                placeHolder: '请输入客户电话',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'PLAN_FINISH_DATE',
                                                label: '计划完成时间',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'PLAN_FINISH_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'计划完成时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('PLAN_FINISH_DATE').setValue();
                                                    	    			   Ext.getCmp('PLAN_FINISH_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'CHEK_SUPERVISOR_fieldset',
                                        title: '监理',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'CHEK_SUPERVISOR_SIGN1',
                                                        height: 40,
                                                        width: '75%',
                                                        label: '监理员签名',
                                                        labelWidth: '53%',
                                                        name: '',
                                                        placeHolder: '请签名'
                                                    },
                                                    {
                                                    	xtype:'hiddenfield',
                                                    	id:'SUPERVISOR_SIGN1',
                                                    },
                                                    {
                                                        xtype: 'button', 
                                                        id: 'btn_CHEK_SUPERVISOR_SIGN1',
                                                        height: 41,
                                                        style: 'border:0;',
                                                        width: '35%',
                                                        text: '签名'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'SURPERVISOR_SIGN_NAME',
                                                label: '负责人签名',
                                                labelWidth: '40%',
                                                placeHolder: '请输入工程负责人签名',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'SURPERVISOR_SIGN_DATE',
                                                label: '签名日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'SURPERVISOR_SIGN_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'监理签名日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('SURPERVISOR_SIGN_DATE').setValue();
                                                    	    			   Ext.getCmp('SURPERVISOR_SIGN_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'itf_ZP',
                        title: '转派',
                        height: '100%',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                height: 108,
                                layout: 'vbox',
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '检验人员',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'EBS_PERSON_NAME',
                                                        height: 40,
                                                        width: '80%',
                                                        label: '员工编号',
                                                        labelWidth: '42%',
                                                        name: '',
                                                        placeHolder: '请输入搜索关键字'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'search_EBS_PERSON',
                                                        height: 40,
                                                        style: 'border:0;',
                                                        width: '10%',
                                                        iconCls: 'search',
                                                        text: ''
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'commit_ZP',
                                                        height: 40,
                                                        style: 'border:0;',
                                                        width: '10%',
                                                        iconCls: 'action',
                                                        text: ''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'list',
                                id: 'ebs_person_List',
                                store: 'ProListStore1',
                                flex: 1,
                                itemTpl: [
                                          '<div style="width:100%; margin:0; padding:0;">',
                                          '    <h1 style="float:left; margin:0; padding:0;">姓名:{EBS_FULL_NAME}编号{EBS_EMPLOYEE_NUMBER}</h1>',
                                          '    <div style="float:right;margin:0;">',
                                          '    <img id="1" style="width:22px;" src="images/delete01.png"/>',
                                          '    </div>',
                                          '</div>'
                                     ]
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'ebshidddenListIndex',
                            	value:''
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'EBS_PERSON_ID',
                            },
                            {
                                xtype: 'formpanel',
                                height: 108,
                                layout: 'vbox',
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '业绩归属人员',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'EBS_PERSON_NAME1',
                                                        height: 40,
                                                        width: '90%',
                                                        label: '员工编号',
                                                        labelWidth: '42%',
                                                        name: '',
                                                        placeHolder: '请输入搜索关键字'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'ZP_CHECK_R',
                                                        height: 40,
                                                        style: 'border:0;',
                                                        width: '10%',
                                                        iconCls: 'search',
                                                        text: ''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'list',
                                id: 'YJ_list',
                                store: 'ProListStore2',
                                flex: 1,
                                itemTpl: [
                                          '<div style="width:100%; margin:0; padding:0;">',
                                          '    <h1 style="float:left; margin:0; padding:0;">姓名:{EBS_FULL_NAME}编号{EBS_EMPLOYEE_NUMBER}</h1>',
                                          '    <div style="float:right;margin:0;">',
                                          '    <img id="1" style="width:22px;" src="images/delete01.png"/>',
                                          '    </div>',
                                          '</div>'
                                     ]
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'yjhidddenListIndex',
                            	value:''
                            }
                        ]
                    }
                ]
            }
        ]
    }

});