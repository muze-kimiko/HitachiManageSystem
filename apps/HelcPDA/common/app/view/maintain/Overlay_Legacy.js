Ext.define('HelcPDA.view.maintain.Overlay_Legacy', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.SegmentedButton',
        'Ext.Button'
    ],
    config: {
        centered: true,
        height: '90%',
        id: 'Overlay_Legacy',
        width: '90%',
        hideOnMaskTap: true,
        modal: true,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '遗留问题'
            },
            {
                xtype: 'fieldset',
                margin: '-20 0 0 0',
                title: '查找项目',
                items: [
//					{
//						xtype: 'hiddenfield',
//						id: 'H_Index',
//					},
//					{
//						xtype: 'hiddenfield',
//						id: 'H_Id',
//					},
//					{
//						xtype: 'hiddenfield',
//						id: 'H_MeasureLegacyProjectItemId',
//					},
					{
						xtype: 'textfield',
						label: '关键字',
						labelWidth:105,
						id:'S_Value',
						placeHolder: '项目名称或项目号',
					},
//					{
//						xtype: 'textfield',
//						label: '项目号',
//						labelWidth:105,
//						id:'S_ContentProjectTaskNo',
//					},
					{
						xtype: 'button',
						margin: 5,
						text: '查找',
						id: 'S_btn_Legacy',
					}
                ]
            },
            {
            	xtype: 'fieldset',
            	margin: '-20 0 0 0',
            	title: '遗留项目信息',
            	items: [
            	    {
            	    	xtype: 'selectfield',
            	    	label: '项目号<font color=\'red\'>*</font>',
            	    	labelWidth: 105,
            	    	id: 'T_ContentProjectTaskNo',
            	    },
            	    {
            	    	xtype: 'autoTextArea',
            	    	label: '项目名称',
            	    	labelWidth: 105,
            	    	readOnly: true,
            	    	id: 'T_ContentName',
            	    },
            	    {
            	    	xtype: 'autoTextArea',
            	    	label: '作业标准',
            	    	labelWidth: 105,
            	    	readOnly: true,
            	    	id: 'T_ContentOperateStandard',
            	    },
            	    {
            	    	xtype: 'autoTextArea',
            	    	label: '现场情况<font color=\'red\'>*</font>',
            	    	labelWidth: 105,
            	    	id: 'T_MeasureLegacySpotSituation'
            	    },
            	    {
            	    	xtype: 'autoTextArea',
            	    	label: '超差原因<font color=\'red\'>*</font>',
            	    	labelWidth: 105,
            	    	id: 'T_MeasureLegacyOverproofReason',
            	    },
            	]
            },
            {
                xtype: 'segmentedbutton',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        id: 'CC_btn_OL_Legacy',
                        flex: 1,
                        text: '取消'
                    },
                    {
                        xtype: 'button',
                        flex: 1,
                        id: 'Save_btn_OL_Legacy',
                        text: '保存'
                    }
                ]
            }
        ]
    }
});
