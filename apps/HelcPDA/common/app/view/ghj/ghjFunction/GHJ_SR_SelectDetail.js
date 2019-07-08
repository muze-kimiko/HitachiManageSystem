Ext.define('HelcPDA.view.ghj.ghjFunction.GHJ_SR_SelectDetail', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
    	id:'GHJ_SR_SelectDetail_id',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '服务请求详细信息',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'GHJ_SR_SelectDetail_id_FH'
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
						id:'SRD_SRNumber',
					    xtype: 'textfield',
					    label: '服务请求编号',
					    readOnly:true,
					    labelWidth:160,
					},
                    {
						id:'SRD_ServiceRequestSource',
                        xtype: 'textfield',
                        label: '服务请求来源',
                        labelWidth:160,
                        readOnly:true,
                    },
                    {
                    	id:'SRD_Abstract',
                        xtype: 'textfield',
                        label: '受信内容',
                        labelWidth:160,
                        readOnly:true,
                    },
                    {
                    	id:'SRD_StartTime',
                        xtype: 'textfield',
                        label: '受信时间',
                        labelWidth:160,
                        readOnly:true,
                    },
                    {
                    	id:'SRD_BoxUp',
                        xtype: 'textfield',
                        label: '是否困人',
                        labelWidth:160,
                        readOnly:true,
                    },
                    {
                    	id:'SRD_AssetNumber',
                        xtype: 'textfield',
                        label: '故障工号',
                        labelWidth:160,
                        readOnly:true,
                    },
                    {
                    	id:'SRD_Company',
                        xtype: 'textfield',
                        label: '所属司',
                        labelWidth:160,
                        readOnly:true,
                    },
                    {
                    	id:'SRD_AssetDomainName',
                        xtype: 'textfield',
                        label: '工号地盘',
                        labelWidth:160,
                        readOnly:true,
                    },
                    {
                    	id:'SRD_AssetAddress',
                        xtype: 'textfield',
                        label: '工号地址',
                        labelWidth:160,
                        readOnly:true,
                    },
                    
                ]
            }
        ]
    }

});