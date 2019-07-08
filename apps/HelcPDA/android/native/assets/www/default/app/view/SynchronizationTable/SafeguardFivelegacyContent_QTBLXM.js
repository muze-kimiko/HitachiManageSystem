
/* JavaScript content from app/view/SynchronizationTable/SafeguardFivelegacyContent_QTBLXM.js in folder common */


Ext.define('HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_QTBLXM', {
    extend: 'Ext.form.Panel',
    id:'SafeguardFivelegacyContent_QTBLXM_id',
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
            	id:'SafeguardFivelegacyContent_QTBLXM_id_Toolbar',
                xtype: 'toolbar',
                docked: 'top',
                title: '其他不良项目',
                items:[{
                    xtype: 'button',
                    id:'SafeguardFivelegacyContent_QTBLXM_id_FH',
                    ui: 'back',
                    text: '返回'
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'button',
                    id:'SafeguardFivelegacyContent_QTBLXM_id_QD',
                    text: '',
                },],
            },
            {
                xtype: 'fieldset',
                items: [
					{
						id:'MeasureBadItemDesc',
						xtype: 'autoTextArea',
						label: '不良情况描述',
						labelWidth:'40%',
					},
					{//写死固定,后台自带不用改
						id:'ContentIfMeasure',
					    xtype: 'togglefield',
					    label: '是否不良项目',
					    labelWidth:'40%',
					    value:1,
					    readOnly:true,
					},
                    {
                    	id:'MeasureBadItemResponseDivision',
                        xtype: 'textfield',
                        label: '责任部门',
                        labelWidth:'40%',
                        listeners:[{
                        	fn:function(component,eOpts){
                        		var me=this;
                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
                        	},
                        	event:'initialize'
                        }],
                        //required:true,
                        readOnly:true,
                    },
                    {
                        xtype: 'textfield',
                        label: '整改完成日期',
                        id:'MeasureBadItemZGCompleteDatetime',
                        labelWidth:'40%',
                        placeHolder: '可输入整改完成日期',
                        listeners:{
                        	focus:function(){
                        		initDate1('MeasureBadItemZGCompleteDatetime','整改完成日期');
                        	}
                        },
                        readOnly: true,
                    },
                    {
                    	id:'MeasureBadItemWorkTime',
                        xtype: 'numberfield',
                        label: '整改人工时',
                        labelWidth:'40%',
                    },
                    {
                    	id:'MeasureBadItemZGDivision',
                        xtype: 'textfield',
                        label: '整改部门',
                        labelWidth:'40%',
                        listeners:[{
                        	fn:function(component,eOpts){
                        		var me=this;
                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
                        	},
                        	event:'initialize'
                        }],
                        //required:true,
                        readOnly:true,
                    },
                    {
                    	id:'MeasureBadItemRepPersonFullName',
                        xtype: 'textfield',
                        label: '整改责任人',
                        labelWidth:'40%',
                        listeners:[{
                        	fn:function(component,eOpts){
                        		var me=this;
                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
                        	},
                        	event:'initialize'
                        }],
                        //required:true,
                        readOnly:true,
                    },
                    {//整改责任人ID
						id:'MeasureBadItemRepPersonFullName_ID',
					    xtype: 'hiddenfield',
					},
                    {
                    	id:'MeasureBadItemReCheckDatetime',
                        xtype: 'textfield',
                        label: '复检日期',
                        labelWidth:'40%',
                        placeHolder: '可输入复检日期',
                        listeners:{
                        	focus:function(){
                        		initDate1('MeasureBadItemReCheckDatetime','复检日期');
                        	}
                        },
                        readOnly:true,
                    },
                    {
						id:'MeasureBadItemComments',
						xtype: 'autoTextArea',
						label: '备注',
						labelWidth:'40%',
					},
					
					{//存放当前数据在数据仓中位置index
						id:'QTBLXM_Hidden_index',
					    xtype: 'hiddenfield',
					},
                ]
            }
        ]
    }

});