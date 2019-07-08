

Ext.define('HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_YLWT', {
    extend: 'Ext.form.Panel',
    id:'SafeguardFivelegacyContent_YLWT_id',
    requires: [
        'Ext.Toolbar',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
            	id:'SafeguardFivelegacyContent_YLWT_id_Toolbar',
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                items:[{
                    xtype: 'button',
                    id:'SafeguardFivelegacyContent_YLWT_id_FH',
                    ui: 'back',
                    text: '返回'
                },{
                    xtype: 'spacer'
                },{
                    xtype: 'button',
                    id:'SafeguardFivelegacyContent_YLWT_id_TJ',
                    text: ''
                },],
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                    	id:'YLWT_MeasureLegacyProjectNo',
                        xtype: 'textfield',
                        label: '项目号',
                        labelWidth:'40%',
                        listeners:[{
                        	fn:function(component,eOpts){
                        		var me=this;
                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
                        	},
                        	event:'initialize'
                        }],
                        required:true,
                        //readOnly:true,
                    },
                    {
                    	id:'YLWT_MeasureLegacySpotSituation',
                        xtype: 'textfield',
                        label: '现场情况',
                        labelWidth:'40%',
                    },
                    {
                    	id:'YLWT_MeasureLegacyOverproofReason',
                        xtype: 'textfield',
                        label: '超差原因',
                        labelWidth:'40%',
                        required:true,
                    },
                    {
                    	id:'SafeguardFivelegacyContent_YLWT_index',
                        xtype: 'hiddenfield',
                    },
                ]
            }
        ]
    }

});