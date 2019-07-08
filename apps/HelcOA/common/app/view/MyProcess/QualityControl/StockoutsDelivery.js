Ext.define('HelcOA.view.MyProcess.QualityControl.StockoutsDelivery', {
    extend: 'Ext.Panel',
    id: 'wdlc_StockoutsDelivery_ID',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.TextArea'
    ],

    config: {
        layout: 'vbox',
        items: [
{
    xtype: 'toolbar',
    docked: 'top',
    id: 'wdlc_surface_ID',
    items: [
            {
                xtype: 'button',
                id: 'wdlc_returnMyProcess',
                text: '返回',
                ui: 'back'
            },
        ]
		},
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'fileno',
                                placeHolder: '请输入编号',
                                readOnly:true,
                                required: true
                            },
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                name: 'subject',
                                placeHolder: '请输入标题',
                                readOnly:true,
                                required: true
                            },							
                            {
                                xtype: 'autoTextArea',
                                id: 'reason',
                                label: '欠料发货原因',
                                labelWidth: '40%',
                                name: 'reason',
                                readOnly:true,
                                placeHolder: '请输入欠料发货原因'
                            },
                            {
                                xtype: 'textfield',
                                id: 'tzbm',
                                label: '通知部门',
                                labelWidth: '40%',
                                name: 'tzbm',
                                readOnly:true,
                                placeHolder: '请输入通知部门'
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                label: '报告人',
                                labelWidth: '40%',
                                name: 'agentman',
                                readOnly:true,
                                placeHolder: '请输入报告人'
                            },
							{
                                xtype: 'textfield',
                                id: 'dept',
                                label: '所属部门',
                                labelWidth: '40%',
                                name: 'dept',
                                readOnly:true,
                                placeHolder: '请输入所属部门'
                            },
							{
                                xtype: 'textfield',
                                id: 'createdate',
                                label: '时间',
                                labelWidth: '40%',
                                name: 'createdate',
                                placeHolder: '请选择时间',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('createdate','时间');
                                	}
                                }
                            },
							{
                                xtype: 'textfield',
                                id: 'phone',
                                label: '联系电话',
                                labelWidth: '40%',
                                name: 'phone',
                                readOnly:true,
                                placeHolder: '请输入联系电话'
                            },
							{
                                xtype: 'fieldset',
								title: '欠料情况',
                                items: [
							{
                                xtype: 'fieldset',
								title: 'NO1',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '工号',
                                        labelWidth: '40%',
                                        id: 'gh1',
                                        readOnly:true,
                                        placeHolder: '请输入工号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '涉及台数',
                                        labelWidth: '40%',
                                        id: 'ts1',
                                        readOnly:true,
                                        placeHolder: '请输入涉及台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '合同号',
                                        labelWidth: '40%',
                                        id: 'hth1',
                                        readOnly:true,
                                        placeHolder: '请输入合同号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '电梯型号',
                                        labelWidth: '40%',
                                        id: 'liftmodel1',
                                        readOnly:true,
                                        placeHolder: '请输入电梯型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '订货单位',
                                        labelWidth: '40%',
                                        id: 'orderunit1',
                                    	readOnly:true,
                                        placeHolder: '请输入订货单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '计划产出日期',
                                        labelWidth: '40%',
                                        id: 'plandate1',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置计划产出日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('plandate1','计划产出日期');
                                        	}
                                        }
                                    },
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO2',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '工号',
                                        labelWidth: '40%',
                                        id: 'gh2',
                                        readOnly:true,
                                        placeHolder: '请输入工号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '涉及台数',
                                        labelWidth: '40%',
                                        id: 'ts2',
                                        readOnly:true,
                                        placeHolder: '请输入涉及台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '合同号',
                                        labelWidth: '40%',
                                        id: 'hth2',
                                        readOnly:true,
                                        placeHolder: '请输入合同号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '电梯型号',
                                        labelWidth: '40%',
                                        id: 'liftmodel2',
                                        readOnly:true,
                                        placeHolder: '请输入电梯型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '订货单位',
                                        labelWidth: '40%',
                                        id: 'orderunit2',
                                    	readOnly:true,
                                        placeHolder: '请输入订货单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '计划产出日期',
                                        labelWidth: '40%',
                                        id: 'plandate2',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置计划产出日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('plandate2','计划产出日期');
                                        	}
                                        }
                                    },
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO3',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '工号',
                                        labelWidth: '40%',
                                        id: 'gh3',
                                        readOnly:true,
                                        placeHolder: '请输入工号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '涉及台数',
                                        labelWidth: '40%',
                                        id: 'ts3',
                                        readOnly:true,
                                        placeHolder: '请输入涉及台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '合同号',
                                        labelWidth: '40%',
                                        id: 'hth3',
                                        readOnly:true,
                                        placeHolder: '请输入合同号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '电梯型号',
                                        labelWidth: '40%',
                                        id: 'liftmodel3',
                                        readOnly:true,
                                        placeHolder: '请输入电梯型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '订货单位',
                                        labelWidth: '40%',
                                        id: 'orderunit3',
                                    	readOnly:true,
                                        placeHolder: '请输入订货单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '计划产出日期',
                                        labelWidth: '40%',
                                        id: 'plandate3',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置计划产出日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('plandate3','计划产出日期');
                                        	}
                                        }
                                    },
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO4',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '工号',
                                        labelWidth: '40%',
                                        id: 'gh4',
                                        readOnly:true,
                                        placeHolder: '请输入工号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '涉及台数',
                                        labelWidth: '40%',
                                        id: 'ts4',
                                        readOnly:true,
                                        placeHolder: '请输入涉及台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '合同号',
                                        labelWidth: '40%',
                                        id: 'hth4',
                                        readOnly:true,
                                        placeHolder: '请输入合同号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '电梯型号',
                                        labelWidth: '40%',
                                        id: 'liftmodel4',
                                        readOnly:true,
                                        placeHolder: '请输入电梯型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '订货单位',
                                        labelWidth: '40%',
                                        id: 'orderunit4',
                                    	readOnly:true,
                                        placeHolder: '请输入订货单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '计划产出日期',
                                        labelWidth: '40%',
                                        id: 'plandate4',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置计划产出日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('plandate4','计划产出日期');
                                        	}
                                        }
                                    },
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO5',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '工号',
                                        labelWidth: '40%',
                                        id: 'gh5',
                                        readOnly:true,
                                        placeHolder: '请输入工号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '涉及台数',
                                        labelWidth: '40%',
                                        id: 'ts5',
                                        readOnly:true,
                                        placeHolder: '请输入涉及台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '合同号',
                                        labelWidth: '40%',
                                        id: 'hth5',
                                        readOnly:true,
                                        placeHolder: '请输入合同号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '电梯型号',
                                        labelWidth: '40%',
                                        id: 'liftmodel5',
                                        placeHolder: '请输入电梯型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '订货单位',
                                        labelWidth: '40%',
                                        id: 'orderunit5',
                                    	readOnly:true,
                                        placeHolder: '请输入订货单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '计划产出日期',
                                        labelWidth: '40%',
                                        id: 'plandate5',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置计划产出日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('plandate5','计划产出日期');
                                        	}
                                        }
                                    },
                                ]
                            },
							]
							},
							{
                                xtype: 'fieldset',
								title: '欠料情况',
                                items: [
							{
                                xtype: 'fieldset',
								title: 'NO1',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '欠料名称',
                                        labelWidth: '40%',
                                        id: 'qlmc1',
                                        readOnly:true,
                                        placeHolder: '请输入欠料名称'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '图号',
                                        labelWidth: '40%',
                                        id: 'th1',
                                        readOnly:true,
                                        placeHolder: '请输入图号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '作业',
                                        labelWidth: '40%',
                                        id: 'zy1',
                                        readOnly:true,
                                        placeHolder: '请输入作业'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'model1',
                                        readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '数量',
                                        labelWidth: '40%',
                                        id: 'count1',
                                    	readOnly:true,
                                        placeHolder: '请输入数量'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '单位',
                                        labelWidth: '40%',
                                        id: 'unit1',
                                    	readOnly:true,
                                        placeHolder: '请输入单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到货日期',
                                        labelWidth: '40%',
                                        id: 'date1',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置预计到货日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('date1','预计到货日期');
                                        	}
                                        }
                                    },							
									{
										xtype: 'autoTextArea',
										id: 'remark1',
										label: '备注',
										labelWidth: '40%',
										name: 'remark1',
										readOnly:true,
										placeHolder: '请输入备注'
									}
									
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO2',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '欠料名称',
                                        labelWidth: '40%',
                                        id: 'qlmc2',
                                        readOnly:true,
                                        placeHolder: '请输入欠料名称'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '图号',
                                        labelWidth: '40%',
                                        id: 'th2',
                                        readOnly:true,
                                        placeHolder: '请输入图号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '作业',
                                        labelWidth: '40%',
                                        id: 'zy2',
                                        placeHolder: '请输入作业'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'model2',
                                        readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '数量',
                                        labelWidth: '40%',
                                        id: 'count2',
                                    	readOnly:true,
                                        placeHolder: '请输入数量'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '单位',
                                        labelWidth: '40%',
                                        id: 'unit2',
                                    	readOnly:true,
                                        placeHolder: '请输入单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到货日期',
                                        labelWidth: '40%',
                                        id: 'date2',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置预计到货日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('date2','预计到货日期');
                                        	}
                                        }
                                    },							
									{
										xtype: 'autoTextArea',
										id: 'remark2',
										label: '备注',
										labelWidth: '40%',
										name: 'remark2',
										readOnly:true,
										placeHolder: '请输入备注'
									}
									
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO3',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '欠料名称',
                                        labelWidth: '40%',
                                        id: 'qlmc3',
                                        readOnly:true,
                                        placeHolder: '请输入欠料名称'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '图号',
                                        labelWidth: '40%',
                                        id: 'th3',
                                        readOnly:true,
                                        placeHolder: '请输入图号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '作业',
                                        labelWidth: '40%',
                                        id: 'zy3',
                                        readOnly:true,
                                        placeHolder: '请输入作业'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'model3',
                                        readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '数量',
                                        labelWidth: '40%',
                                        id: 'count3',
                                    	readOnly:true,
                                        placeHolder: '请输入数量'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '单位',
                                        labelWidth: '40%',
                                        id: 'unit3',
                                    	readOnly:true,
                                        placeHolder: '请输入单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到货日期',
                                        labelWidth: '40%',
                                        id: 'date3',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置预计到货日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('date3','预计到货日期');
                                        	}
                                        }
                                    },							
									{
										xtype: 'autoTextArea',
										id: 'remark3',
										label: '备注',
										labelWidth: '40%',
										name: 'remark1',
										readOnly:true,
										placeHolder: '请输入备注'
									}
									
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO4',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '欠料名称',
                                        labelWidth: '40%',
                                        id: 'qlmc4',
                                        readOnly:true,
                                        placeHolder: '请输入欠料名称'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '图号',
                                        labelWidth: '40%',
                                        id: 'th4',
                                        readOnly:true,
                                        placeHolder: '请输入图号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '作业',
                                        labelWidth: '40%',
                                        id: 'zy4',
                                        readOnly:true,
                                        placeHolder: '请输入作业'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'model4',
                                        readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '数量',
                                        labelWidth: '40%',
                                        id: 'count4',
                                    	readOnly:true,
                                        placeHolder: '请输入数量'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '单位',
                                        labelWidth: '40%',
                                        id: 'unit4',
                                    	readOnly:true,
                                        placeHolder: '请输入单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到货日期',
                                        labelWidth: '40%',
                                        id: 'date4',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置预计到货日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('date4','预计到货日期');
                                        	}
                                        }
                                    },							
									{
										xtype: 'autoTextArea',
										id: 'remark4',
										label: '备注',
										labelWidth: '40%',
										name: 'remark4',
										placeHolder: '请输入备注'
									}
									
                                ]
                            },{
                                xtype: 'fieldset',
								title: 'NO5',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '欠料名称',
                                        labelWidth: '40%',
                                        id: 'qlmc5',
                                        readOnly:true,
                                        placeHolder: '请输入欠料名称'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '图号',
                                        labelWidth: '40%',
                                        id: 'th5',
                                        placeHolder: '请输入图号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '作业',
                                        labelWidth: '40%',
                                        id: 'zy5',
                                        readOnly:true,
                                        placeHolder: '请输入作业'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'model5',
                                        readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '数量',
                                        labelWidth: '40%',
                                        id: 'count5',
                                    	readOnly:true,
                                        placeHolder: '请输入数量'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '单位',
                                        labelWidth: '40%',
                                        id: 'unit5',
                                    	readOnly:true,
                                        placeHolder: '请输入单位'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到货日期',
                                        labelWidth: '40%',
                                        id: 'date5',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置预计到货日期',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('date5','预计到货日期');
                                        	}
                                        }
                                    },							
									{
										xtype: 'autoTextArea',
										id: 'remark5',
										label: '备注',
										labelWidth: '40%',
										name: 'remark5',
										readOnly:true,
										placeHolder: '请输入备注'
									}
									
                                ]
                            },
                            {
    							xtype: 'fieldset',
    							title: '材料到货情况（制造管理科填写）',
    							items: [
    							{
    			                                xtype: 'panel',
    			                                layout: 'hbox',
    			                                items: [
													{
														xtype: 'textfield',
														label: '预计到货日期',
														labelWidth: '40%',
														id: 'time1',
														dateFormat: 'Y-m-d',
														readOnly:true,
														placeHolder: '点击设置预计到货日期',
														listeners:{
															focus:function(){
																initDate2('time1','预计到货日期');
															}
														}
													},													
													{
														xtype: 'textfield',
														label: '接收人',
														labelWidth: '40%',
														id: 'jsr',
														readOnly:true,
														placeHolder: '请输入接收人'
													},
													
													{
														xtype: 'textfield',
														label: '到货地点/单位',
														labelWidth: '40%',
														id: 'address',
														readOnly:true,
														placeHolder: '请输入到货地点/单位'
													},

    			                                ]
    			                            }
						]
					},
					{
    							xtype: 'fieldset',
    							title: '材料到货情况（制造管理科填写）',
    							items: [
    							{
    			                                xtype: 'panel',
    			                                layout: 'hbox',
    			                                items: [
													{
														xtype: 'textfield',
														label: '补发时间',
														labelWidth: '40%',
														id: 'time2',
														dateFormat: 'Y-m-d',
														readOnly:true,
														placeHolder: '点击设置补发时间',
														listeners:{
															focus:function(){
																initDate2('time2','补发时间');
															}
														}
													},													
													{
														xtype: 'textfield',
														label: '收货人/单位',
														labelWidth: '40%',
														id: 'shr',
														readOnly:true,
														placeHolder: '请输入收货人/单位'
													},												
													{
														xtype: 'textfield',
														label: '到货地点/单位',
														labelWidth: '40%',
														id: 'address',
														readOnly:true,
														placeHolder: '请输入到货地点/单位'
													},													
													{
														xtype: 'textfield',
														label: '发货编号（速递时填写）',
														labelWidth: '40%',
														id: 'fhbh',
														readOnly:true,
														placeHolder: '请输入发货编号（速递时填写）'
													},

    			                                ]
    			                            }
						]
					},
                    {
                        xtype: 'fieldset',
                        hidden: true,
                        items: [
                                {
                                    xtype: 'textfield',
                                    id: 'conds',
                                    name: 'conds'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'userid',
                                    name: 'userid'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'type',
                                    name: 'type'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'username',
                                    name: 'username'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'node',
                                    name: 'node'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'ctime',
                                    name: 'ctime'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'piid',
                                    name: 'piid'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'processname',
                                    name: 'processname'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'curauthor',
                                    name: 'curauthor'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'dealmen',
                                    name: 'dealmen'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'ygbh',
                                    name: 'ygbh'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'form',
                                    name: 'form'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'arcpath',
                                    name: 'arcpath'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'arcdate',
                                    name: 'arcdate'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'idea',
                                    name: 'idea'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'endprocessdate',
                                    name: 'endprocessdate'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'audit_list',
                                    name: 'audit_list'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'taskid',
                                    name: 'taskid'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'mast',
                                    name: 'mast'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'firflow',
                                	name: 'firflow'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'pi_flag',
                                	name: 'pi_flag'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'cfg_id',
                                	name: 'cfg_id'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'createflag',
                                	name: 'createflag'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'ext1',
                                	name: 'ext1'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'getdep',
                                	name: 'getdep'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'getno',
                                	name: 'getno'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qaleader',
                                	name: 'qaleader'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'sj_list',
                                	name: 'sj_list'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'nextprocessuser',
                                	name: 'nextprocessuser'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'fnextprocess',
                                	name: 'fnextprocess'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'dept',
                                	name: 'dept'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'agentman',
                                	name: 'agentman'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'createdate',
                                	name: 'createdate'
                                }
                            ]
                    }
                ]
            }
        ]
    }
            ]
    }]
    }
 
});