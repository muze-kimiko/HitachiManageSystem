/*
 * File: app/view/ProjectCreate.js
 *
 * This file was generated by Sencha Architect
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

Ext.define('HelcPAD.view.OpportunityManagement.EntryOpportunities.ProjectCreate', {
    extend: 'Ext.form.Panel',
    id:'projectcreate_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Checkbox',
        'Ext.field.TextArea'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '录入商机',
                items: [
                    {
                        xtype: 'button',
                        id:'appws_FH',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: '保存'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '商机资料',
                items: [
                    {
                        xtype: 'textfield',
                        label: '商机名称',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入商机名称'
                    },
                    {
                        xtype: 'textfield',
                        label: '线索类型',
                        labelWidth: '40%',
                        cls:'textf',
                        placeHolder: '请选择线索类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '商机子类型',
                        labelWidth: '40%',
                        cls:'textf',
                        placeHolder: '请选择商机子类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '商机状态',
                        labelWidth: '40%',
                        cls:'textf',
                        placeHolder: '请选择商机状态'
                    },
                    {
                        xtype: 'textfield',
                        label: '商机阶段',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择商机阶段'
                    },
                    {
                        xtype: 'textfield',
                        label: '商务预审状态',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '新建'
                    },
                    {
                        xtype: 'textfield',
                        label: '商机属性',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择商机属性'
                    },
                    {
                        xtype: 'textfield',
                        label: '跟踪人员',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '当前用户'
                    },
                    {
                        xtype: 'textfield',
                        label: '总部跟踪人员',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入总部跟踪人员'
                    },
                    {
                        xtype: 'textfield',
                        label: '信息渠道',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择信息渠道'
                    },
                    {
                        xtype: 'textfield',
                        label: '土建进度',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择土建进度'
                    },
                    {
                        xtype: 'textfield',
                        label: '项目资金（万元）',
                        labelWidth: '45%',
                        cls:'textf',
                        placeHolder: '请输入项目资金（万元）'
                    },
                    {
                        xtype: 'textfield',
                        label: '跟单组织',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '用户部门'
                    },
                    {
                        xtype: 'textfield',
                        label: '合同类型',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择合同类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '合同属性',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择合同属性'
                    },
                    {
                        xtype: 'textfield',
                        label: '框架协议编号',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入框架协议编号'
                    },
                    {
                        xtype: 'textfield',
                        label: '是否招标',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择是否招标'
                    },
                    {
                        xtype: 'textfield',
                        label: '预计签约直梯台数',
                        cls:'textf',
                        labelWidth: '45%',
                        placeHolder: '请输入预计签约直梯台数'
                    },
                    {
                        xtype: 'textfield',
                        label: '预计签约扶梯台数',
                        cls:'textf',
                        labelWidth: '45%',
                        placeHolder: '请输入预计签约扶梯台数'
                    },
                    {
                        xtype: 'textfield',
                        label: '预计签约总台数',
                        cls:'textf',
                        labelWidth: '45%',
                        placeHolder: '请输入预计签约总台数'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '联系人信息',
                items: [
                    {
                        xtype: 'textfield',
                        label: '姓氏',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择联系人信息'
                    },
                    {
                        xtype: 'textfield',
                        label: '名字',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示名字'
                    },
                    {
                        xtype: 'textfield',
                        label: '部门',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示部门'
                    },
                    {
                        xtype: 'textfield',
                        label: '职位',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示职位'
                    },
                    {
                        xtype: 'textfield',
                        label: '办公电话号码',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示办公电话号码'
                    },
                    {
                        xtype: 'textfield',
                        label: '移动电话号码',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示移动电话号码'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '大项目关注',
                items: [
                    {
                        xtype: 'checkboxfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '其它'
                    },
                    {
                        xtype: 'checkboxfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '大型综合体项目'
                    },
                    {
                        xtype: 'checkboxfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '五星级酒店'
                    },
                    {
                        xtype: 'checkboxfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '甲级写字楼'
                    },
                    {
                        xtype: 'checkboxfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '地标性建筑'
                    },
                    {
                        xtype: 'checkboxfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '高档住宅'
                    },
                    {
                        xtype: 'checkboxfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '进口大部件需求'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '项目地址信息',
                items: [
                    {
                        xtype: 'textfield',
                        label: '安装所在地分公司',
                        cls:'textf',
                        labelWidth: '45%',
                        placeHolder: '请选择安装所在地分公司'
                    },
                    {
                        xtype: 'textfield',
                        label: '安装地点',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择安装地点'
                    },
                    {
                        xtype: 'textfield',
                        label: '省/直辖市',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示省/直辖市'
                    },
                    {
                        xtype: 'textfield',
                        label: '市',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示市'
                    },
                    {
                        xtype: 'textfield',
                        label: '区/县',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示区/县'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '日期信息',
                items: [
                    {
                        xtype: 'textfield',
                        label: '创建日期',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示创建日期'
                    },
                    {
                        xtype: 'textfield',
                        label: '关闭日期',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择关闭日期'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '预约签约时间',
                items: [
                    {
                        xtype: 'textfield',
                        label: '预计签约年',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择预约签约年'
                    },
                    {
                        xtype: 'textfield',
                        label: '预计签约月',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择预计签约月'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '客户信息',
                items: [
                    {
                        xtype: 'textfield',
                        label: '客户名称',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择客户'
                    },
                    {
                        xtype: 'textfield',
                        label: '使用单位',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示使用单位'
                    },
                    {
                        xtype: 'textfield',
                        label: '大客户编号',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示大客户编号'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户类型',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示客户类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户子类型',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示客户子类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户性质',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示客户性质'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户属性',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '这里显示客户属性'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '其他信息',
                items: [
                    {
                        xtype: 'textareafield',
                        label: '说明',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入说明'
                    },
                    {
                        xtype: 'textareafield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '主管意见'
                    }
                ]
            }
        ]
    }

});