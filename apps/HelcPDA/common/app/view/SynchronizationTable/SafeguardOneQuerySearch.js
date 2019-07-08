
Ext.define('HelcPDA.view.SynchronizationTable.SafeguardOneQuerySearch', {
    extend: 'Ext.form.Panel',
    id:'SafeguardOneQuerySearch_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Select'
    ],

    config: {
        items: [
            {
            	id:'SafeguardOneQuerySearch_id_toolbar',
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                items: [
                    {
                    	id:'SafeguardOneQuerySearch_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '查询条件',
                instructions:'均可模糊查询',
                items: [
                    {
                        xtype: 'textfield',
                        label: '合同号',
                        id:'AgreementNumber',
                        labelWidth: '40%',
                    },
                    {
                        xtype: 'textfield',
                        label: '工号',
                        id:'AssetNumber',
                        labelWidth: '40%',
                    },
                    {
                        xtype: 'textfield',
                        label: '所属站',
                        id:'StationName',
                        labelWidth: '40%',
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
					              id:'SafeguardOneQuerySearch_id_CX',
					              margin: '15 0',
					              width: '90%',
					              text: '查询',
					          },
					          {
					              xtype: 'spacer'
					          }
					      ]
					  },
                ]
            }
        ]
    }

});