
/* JavaScript content from app/view/OaMobileOffice/Contacts/TelephoneDetailed.js in folder common */

Ext.define('HelcPAD.view.OaMobileOffice.Contacts.TelephoneDetailed', {
    extend: 'Ext.form.Panel',
    id:'telephonedetailed_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '详细信息',
                items: [
                    {
                    	id:'telephonedetailed_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                //instructions: '所有可输入的查询条件均支持模糊查询',
                //title: '查询条件',
                items: [
                    {
                    	id:'orgname',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '公司名称',
                        readOnly: true
                    },
                    {
                    	id:'deptname',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '部门',
                        readOnly: true
                    },
                    {
                    	id:'psncode',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '员工编号',
                        readOnly: true
                    },
                    {
                    	id:'psnname',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '姓名',
                        readOnly: true
                    },
                    {
                    	id:'dtel',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '分机号码',
                        readOnly: true
                    },
                    {
                    	id:'otel1',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '直线电话1',
                        readOnly: true,
                    },
                    {
                    	id:'otel2',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '直线电话2',
                        readOnly: true
                    },
                    {
                    	id:'email2',
                        xtype: 'textfield',
                        cls:'textf',
                        labelWidth: '40%',
                        label: '备注',
                        readOnly: true
                    }
                ]
            },
        ]
    }

});