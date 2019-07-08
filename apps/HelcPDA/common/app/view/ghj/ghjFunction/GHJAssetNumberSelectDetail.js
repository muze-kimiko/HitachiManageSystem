Ext.define('HelcPDA.view.ghj.ghjFunction.GHJAssetNumberSelectDetail', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
    	id:'GHJAssetNumberSelectDetail_id',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '工号详细信息',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'GHJAssetNumberSelectDetail_id_FH'
                    },
                    {
                        xtype: 'spacer'
                    },
                ]
            },
            {
                xtype: 'fieldset',
                items: [
					{
						id:'NSD_AssetNumber',
					    xtype: 'textfield',
					    label: '工号',
					    readOnly:true,
					    labelWidth:120,
					},
                    {
						id:'NSD_ProductPart',
                        xtype: 'textfield',
                        label: '梯种型号',
                        labelWidth:120,
                        readOnly:true,
                    },
                    {
                    	id:'NSD_ProductName',
                        xtype: 'textfield',
                        label: '梯种',
                        labelWidth:120,
                        readOnly:true,
                    },
                    {
                    	id:'NSD_CompanyOrganization',
                        xtype: 'textfield',
                        label: '所属司',
                        labelWidth:120,
                        readOnly:true,
                    },
                    {
                    	id:'NSD_Organization2',
                        xtype: 'textfield',
                        label: '所属站',
                        labelWidth:120,
                        readOnly:true,
                    },
                    {
                    	id:'NSD_AssetAddress',
                        xtype: 'textfield',
                        label: '地址',
                        labelWidth:120,
                        readOnly:true,
                    },
                    {
                    	id:'NSD_EdificeName',
                        xtype: 'textfield',
                        label: '大楼',
                        labelWidth:120,
                        readOnly:true,
                    },
                    {
                    	id:'NSD_AssetDomainName',
                        xtype: 'textfield',
                        label: '地盘',
                        labelWidth:120,
                        readOnly:true,
                    },
                    
                ]
            }
        ]
    }

});