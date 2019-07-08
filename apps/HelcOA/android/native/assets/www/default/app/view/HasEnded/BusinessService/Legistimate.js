
/* JavaScript content from app/view/HasEnded/BusinessService/Legistimate.js in folder common */
Ext.define('HelcOA.view.HasEnded.BusinessService.Legistimate', {
    extend: 'Ext.Panel',
    id: 'yjs_Legistimate_id',
    requires: [
               'Ext.Toolbar',
               'Ext.Button',
               'Ext.Spacer',
               'Ext.form.Panel',
               'Ext.form.FieldSet',
               'Ext.field.DatePicker',
               'Ext.picker.Date',
               'Ext.field.Number',
               'Ext.field.TextArea'
    ],

    config: {
        layout: 'vbox',
        items: [
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    id : 'yjs_surface_ID',
                    title: '收款不良合同申请发律师函审批表',
    				items : [ {
    					xtype : 'button',
    					ui : 'back',
    					text : '返回',
    					id : 'yjs_returnHasEnded'
    				} ]
                },
            {
                xtype: 'formpanel',
                id:'fp',
                flex: 1,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: '编号',
                                readOnly : true,
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                label: '申请部门',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入申请部门名称'
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                label: '姓名',
                                labelWidth: '40%',
                                required: true,
                                readOnly : true,
                                placeHolder: '请输入申请人名称'
                            },
                            {
								xtype : 'textfield',
								label : '申请日期',
								id : 'createdate',
								labelWidth : '40%',
								readOnly : true,
								placeHolder : '请输入申请日期',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'createdate',
												'申请日期');
									}
								}
							},
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'textfield',
                                id: 'yddep',
                                label: '应对部门',
                                labelWidth: '40%',
                                required: true,
                                readOnly : true,
                                placeHolder: '请输入应对部门名称'
                            },
                            {
                                xtype: 'textfield',
                                id: 'yyleader',
                                label: '营业总部直属部长',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入营业总部直属部长'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '注：客户信息请详实填写，以便律师函准确送达',
                        title: '客户信息',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'hth',
                                label: '合同号',
                                labelWidth: '40%',
                                required: true,
                                readOnly : true,
                                placeHolder: '请输入合同号'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'xmxz',
                                label: '项目性质',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                value: 'test1,test2',
                                readOnly: true,
                                options: [
                                    {
                                        text: '住宅',
                                        value: '住宅'
                                    },
                                    {
                                        text: '写字楼',
                                        value: '写字楼'
                                    },
                                    {
                                        text: '商业',
                                        value: '商业'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'bydw',
                                label: '保养单位',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入保养单位'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dwmc1',
                                label: '合同买方名称',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                required: true,
                                placeHolder: '请输入合同买方名称'
                            },
                            {
                                xtype: 'textfield',
                                id: 'fzr1',
                                label: '法定代表人',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入法定代表人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'lxr1',
                                label: '联系人',
                                labelWidth: '40%',
                                required: true,
                                readOnly : true,
                                placeHolder: '请输入联系人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dwdz1',
                                label: '买方单位地址',
                                labelWidth: '40%',
                                labelWrap: true,
                                required: true,
                                readOnly : true,
                                placeHolder: '请输入买房单位地址'
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone1',
                                label: '联系电话',
                                labelWidth: '40%',
                                required: true,
                                readOnly : true,
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'yb1',
                                label: '邮编',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入邮编'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dwmc2',
                                label: '电梯使用单位',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入电梯使用单位'
                            },
                            {
                                xtype: 'textfield',
                                id: 'fzr2',
                                label: '负责人',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入负责人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'lxr2',
                                label: '联系人',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入联系人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dwdz2',
                                label: '电梯安装地点',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入电梯安装地点'
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone2',
                                label: '联系电话',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'yb2',
                                label: '邮编',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'htdep',
                                label: '合同应对部门',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                required: true,
                                options: [
                                    {
                                        text: '营业部',
                                        value: '营业部'
                                    },
                                    {
                                        text: '大客户部',
                                        value: '大客户部'
                                    },
                                    {
                                        text: '大项目部',
                                        value: '大项目部'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '合同相关信息',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'httype',
                                label: '合同类型',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                required: true,
                                options: [
                                    {
                                        text: '买卖合同',
                                        value: '买卖合同'
                                    },
                                    {
                                        text: '安装合同',
                                        value: '安装合同'
                                    },
                                    {
                                        text: '买卖附带安装合同',
                                        value: '买卖附带安装合同'
                                    },
                                    {
                                        text: '维保合同',
                                        value: '维保合同'
                                    },
                                    {
                                        text: '营销司三方合同',
                                        value: '营销司三方合同'
                                    },
                                    {
                                        text: '改造合同',
                                        value: '改造合同'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                label: '签约时间',
                                id:'date',
                                labelWidth: '40%',
                                readOnly : true,
                                labelWrap: true
                            },
                            {
                                xtype: 'textfield',
                                id: 'ts1',
                                label: '签约台数',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                required: true,
                                placeHolder: '请输入签约台数'
                            },
                            {
                                xtype: 'textfield',
                                id: 'ts2',
                                label: '实际履行台数',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                required: true,
                                placeHolder: '请输入实际履行台数'
                            },
                            {
                                xtype: 'textfield',
                                label: ''
                            },
                            {
                                xtype: 'textfield',
                                id: 'htmoney1',
                                label: '买卖合同总额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入买卖合同总额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'paymoney1',
                                label: '已付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入已付款金额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'notpaymoney1',
                                label: '未付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入未付款金额'
                            },
                            {
                                xtype: 'fieldset',
                                title: '买卖合同未付款项构成',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'money1',
                                        label: '货款：定金',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入货款：定金'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'money2',
                                        label: '预付款',
                                        labelWidth: '40%',
                                        readOnly : true,
                                        placeHolder: '请输入预付款'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'money3',
                                        label: '交货前应付款',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入交货前应付款'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'money4',
                                        label: '货到工地应付款',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入货到工地应付款'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'money5',
                                        label: '验收后应付款',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入验收后应付款'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'money6',
                                        label: '质保金',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入质保金'
                                    },
                                    {
        								xtype : 'textfield',
        								label : '质保金付款期限',
        								id : 'date1',
        								labelWidth : '40%',
        								readOnly : true,
        								placeHolder : '请输入申请日期',
        								dateFormat : 'Y-m-d',
        								listeners : {
        									focus : function() {
        										initDate2(
        												'date1',
        												'质保金付款期限');
        									}
        								}
        							}
                                ]
                            },
                            {
                                xtype: 'textfield',
                                label: ''
                            },
                            {
                                xtype: 'textfield',
                                id: 'htmoney2',
                                label: '安装合同总额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入安装合同总额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'paymoney2',
                                label: '已付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入已付款金额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'notpaymoney2',
                                label: '未付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                placeHolder: '请输入未付款金额'
                            },
                            {
                                xtype: 'fieldset',
                                title: '安装合同未付款项构成',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '工程款：进场款',
                                        id:'money11',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入工程款：进场款'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '进度款',
                                        id:'money12',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入进度款'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '验收款',
                                        id:'money13',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入验收款'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '质保金',
                                        id:'money14',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入质保金'
                                    },
                                    {
        								xtype : 'textfield',
        								label : '质保金付款期限',
        								id : 'date2',
        								labelWidth : '40%',
        								readOnly : true,
        								placeHolder : '请输入申请日期',
        								dateFormat : 'Y-m-d',
        								listeners : {
        									focus : function() {
        										initDate2(
        												'date2',
        												'质保金付款期限');
        									}
        								}
        							},
                                    {
                                        xtype: 'textfield',
                                        label: '附加工程款',
                                        id:'money15',
                                        labelWidth: '40%',
                                        labelWrap: true,
                                        readOnly : true,
                                        placeHolder: '请输入附加工程款'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                label: ''
                            },
                            {
                                xtype: 'textfield',
                                id: 'htmoney3',
                                label: '维保合同总额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入维保合同总额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'paymoney3',
                                label: '已付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入已付款金额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'notpaymoney3',
                                label: '未付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入未付款金额'
                            },
                            {
                                xtype: 'fieldset',
                                title: '维保合同未付款项构成',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id: 'money21',
                                        readOnly : true,
                                        label: '维保款'
                                        	
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                label: ''
                            },
                            {
                                xtype: 'textfield',
                                id: 'htmoney4',
                                label: '改造合同总额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入维保合同总额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'paymoney4',
                                label: '已付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入已付款金额'
                            },
                            {
                                xtype: 'textfield',
                                id: 'notpaymoney4',
                                label: '未付款金额',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                placeHolder: '请输入未付款金额'
                            },
                            {
                                xtype: 'fieldset',
                                title: '改造合同未付款项构成',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'money31',
                                        readOnly : true,
                                        label: '改造款'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '',
                        title: '其他情况',
                        items: [
                            {
								xtype : 'textfield',
								label : '货到工地时间',
								id : 'ortherdate1',
								labelWidth : '40%',
								readOnly : true,
								placeHolder : '请输入货到工地时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'ortherdate1',
												'货到工地时间');
									}
								}
							},
                            {
								xtype : 'textfield',
								label : '双方验收时间',
								id : 'ortherdate2',
								labelWidth : '40%',
								readOnly : true,
								placeHolder : '请输入双方验收时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'ortherdate2',
												'双方验收时间');
									}
								}
							},
                            {
								xtype : 'textfield',
								label : '政府验收时间',
								id : 'ortherdate3',
								labelWidth : '40%',
								readOnly : true,
								placeHolder : '请输入政府验收时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'ortherdate3',
												'政府验收时间');
									}
								}
							},
                            {
								xtype : 'textfield',
								label : '最后一次付款时间',
								id : 'paydate',
								labelWidth : '40%',
								required : true,
								readOnly : true,
								placeHolder : '请输入最后一次付款时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'paydate',
												'最后一次付款时间');
									}
								}
							},
                            {
                                xtype: 'textfield',
                                label: '最后一次付款金额',
                                id:'paymoney',
                                labelWidth: '40%',
                                readOnly : true,
                                labelWrap: true
                            },
                            {
                                xtype: 'textfield',
                                label: '是否所有权保留',
                                labelWidth: '40%',
                                id:'iskeep',
                                readOnly : true,
                                labelWrap: true
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '补充说明事项',
                                labelWidth: '40%',
                                id:'bcsm_textarea',
                                readOnly : true,
                                labelWrap: true
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '申请发律师函的原因',
                                id:'reason_textarea',
                                labelWidth: '40%',
                                labelWrap: true
                            },
                            {
                                xtype: 'fieldset',
                                hidden: true,
                                items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'conds',
                                            value : 'nocon',
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
                                        	id: 'createbypda',
                                        	name: 'createbypda',
                                        	value: 0
                                        },
                                        {
                                        	xtype: 'textfield',
                                        	id: 'nextprocessuser',
                                        	name: 'nextprocessuser',
                                        },
                                        {
                                        	xtype: 'textfield',
                                        	id: 'Fnextprocess',
                                        	name: 'Fnextprocess',
                                        },
                                        {
                                        	xtype: 'textfield',
                                        	id: 'qwdategcbz',
                                        	name: 'qwdategcbz',
                                        },
                                        {
                                        	xtype: 'textfield',
                                        	id: 'qwdate3',
                                        	name: 'qwdate3',
                                        },
                                        {
                                        	xtype: 'textfield',
                                        	id: 'qwdatebgr',
                                        	name: 'qwdatebgr',
        			                    },
        			                    {
        			                    	xtype: 'textfield',
        			                    	id: 'fnextprocess',
        			                    	name: 'fnextprocess',
        					            },
        					            {
        					            	xtype: 'textfield',
        					            	id: 'ext1',
        					            	name: 'ext1',
        							    },
        							    {
        							    	xtype: 'textfield',
        							    	id: 'managermen',
        							    	name: 'managermen',
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