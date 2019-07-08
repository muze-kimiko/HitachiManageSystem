/*
 * File: app/view/CustomCreate.js
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

Ext.define('HelcPAD.view.OpportunityManagement.EntryClient.CustomCreate', {
    extend: 'Ext.form.Panel',
    id:'customcreate_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '录入客户',
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
                        text: '上传附件'
                    },
                    {
                        xtype: 'button',
                        text: '提交审批'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '客户资料',
                items: [
                    {
                        xtype: 'textfield',
                        label: '本次申请类型',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择本次申请类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '名称',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入客户名称'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户属性',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择客户属性'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户性质',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入客户性质'
                    },
                    {
                        xtype: 'textfield',
                        label: '保养合同标识',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择保养合同标识'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户类型',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择客户类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户子类型',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择客户子类型'
                    },
                    {
                        xtype: 'textfield',
                        label: '大客户',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入大客户'
                    },
                    {
                        xtype: 'textfield',
                        label: '父客户',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入父客户'
                    },
                    {
                        xtype: 'textfield',
                        label: '大客户编号',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入大客户编号'
                    },
                    {
                        xtype: 'textfield',
                        label: '信用评级',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择信用评级'
                    },
                    {
                        xtype: 'textfield',
                        label: '证照详细地址',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入证照详细地址'
                    },
                    {
                        xtype: 'textfield',
                        label: '是否特批',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择是否特批'
                    },
                    {
                        xtype: 'textfield',
                        label: '组织机构代码/身份证号',
                        cls:'textf',
                        labelWidth: '45%',
                        placeHolder: '请输入机构代码/身份证号'
                    },
                    {
                        xtype: 'textfield',
                        label: '组织机构代码/身份证效期',
                        cls:'textf',
                        labelWidth: '50%',
                        placeHolder: '请输入组织机构代码/身份证效期'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户分类',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择客户分类'
                    },
                    {
                        xtype: 'textfield',
                        label: '客户类别',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择客户类别'
                    },
                    {
                        xtype: 'textfield',
                        label: '国家税务登记证号',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入国家税务登记证号'
                    },
                    {
                        xtype: 'textfield',
                        label: '是否小规模纳税人',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择是否小规模纳税人'
                    },
                    {
                        xtype: 'textfield',
                        label: '国家/地区',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择国家/地区'
                    },
                    {
                        xtype: 'textfield',
                        label: '省/(直辖)市',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择省/(直辖)市'
                    },
                    {
                        xtype: 'textfield',
                        label: '城市',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请选择城市'
                    },
                    {
                        xtype: 'textfield',
                        label: '业务联系地址',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入业务联系地址'
                    },
                    {
                        xtype: 'textfield',
                        label: '邮政编码',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入邮政编码'
                    },
                    {
                        xtype: 'textfield',
                        label: '联系人',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入联系人'
                    },
                    {
                        xtype: 'textfield',
                        label: '主要电话号码',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入主要电话号码'
                    },
                    {
                        xtype: 'textfield',
                        label: '主要传真号码',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入主要传真号码'
                    },
                    {
                        xtype: 'textfield',
                        label: '开户银行名称',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入开户银行名称'
                    },
                    {
                        xtype: 'textfield',
                        label: '开户银行帐号',
                        cls:'textf',
                        labelWidth: '40%',
                        placeHolder: '请输入开户银行帐号'
                    }
                ]
            }
        ]
    }

});