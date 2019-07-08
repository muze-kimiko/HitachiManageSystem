
Ext.define('HelcPDA.view.SynchronizationTable.Safeguard_GG_XMH', {
    extend: 'Ext.form.Panel',
    id:'Safeguard_GG_XMH_id',
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
            	id:'header',
                xtype: 'toolbar',
                docked: 'top',
                title: '项目号详细',
                items: [{
                    xtype: 'button',
                    id:'Safeguard_GG_XMH_id_FH',
                    ui: 'back',
                    text: '返回'
                }]
            },
            {
                xtype: 'fieldset',
                title: '',
                items: [{
                	id:'ContentName',
					xtype: 'textfield',
					label: '项目名称',
					labelWidth:'40%',
				},
				{
					id:'ContentLocation',
					xtype: 'textfield',
					label: '位置',
					labelWidth:'40%',
				},
				{
					id:'ContentType',
					xtype: 'textfield',
					label: '项目类型',
					labelWidth:'40%',
				},
				{
					id:'ContentProjectTaskNo',
					xtype: 'textfield',
					label: '项目号',
					labelWidth:'40%',
				},
				{
					id:'ContentCover',
					xtype: 'textfield',
					label: '适用范围',
					labelWidth:'40%',
				},
				{
					id:'ContentOperateStandard',
					xtype: 'autoTextArea',
					label: '作业标准',
					labelWidth:'40%',
				},
				{
					id:'ContentOperateContent',
					xtype: 'autoTextArea',
					label: '作业内容',
					labelWidth:'40%',
				},
				{
                	id:'ContentProjectRequire',
					xtype: 'textfield',
					label: '项目要求',
					labelWidth:'40%',
				},
				{
					id:'ContentIfRequired',
					xtype: 'togglefield',
					label: '是否必填',
					labelWidth:'40%',
				},
				{
					id:'ContentIfMeasure',
				    xtype: 'togglefield',
				    label: '是否测量项目',
				    labelWidth:'40%',
				},{
					id:'ContentIfPhoto',
				    xtype: 'togglefield',
				    label: '是否拍照',
				    labelWidth:'40%',
				},]
            },
        ]
    }

});
