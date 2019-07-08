Ext.define('HelcPDA.view.maintain.Overlay_New_MeasureRecord', {
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
        height: '80%',
        id: 'Overlay_New_MeasureRecord',
        width: '90%',
        hideOnMaskTap: true,
        modal: true,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '录值项目'
            },
            {
                xtype: 'fieldset',
                items: [
					{
						xtype: 'hiddenfield',
						id: 'H_Index',
					},
					{
						xtype: 'hiddenfield',
						id: 'H_Id',
					},
					{
						xtype: 'hiddenfield',
						id: 'H_ParentItemId',
					},
					{
						xtype: 'autoTextArea',
						label: '作业内容',
						labelWidth:100,
						id:'D_MeasureRecordItemContent',
						readOnly:true,
					},
					{
						xtype: 'autoTextArea',
						label: '说明',
						labelWidth:100,
						id:'D_MeasureRecordDescription',
						readOnly:true,
					},
					{
						xtype: 'autoTextArea',
						label: '录入内容',
						labelWidth:100,
						id:'D_MeasureRecordContent',
						readOnly:true,
					},
					{
						xtype: 'textfield',
						label: '最大值',
						id:'D_OL_MeasureItemMaxValue',
						labelWidth:100,
						readOnly:true,
					},
					{
						xtype: 'textfield',
						label: '最小值',
						id:'D_OL_MeasureItemMinValue',
						labelWidth:100,
						readOnly:true,
					},
					{
						xtype: 'textfield',
						label: '录入值<font color=\'red\'>*</font>',
						labelWidth:100,
						id:'T_MeasureRecordValue',
					},
                ]
            },
            {
                xtype: 'segmentedbutton',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        id: 'CC_btn_OL_New_MeasureRecord',
                        flex: 1,
                        text: '取消'
                    },
                    {
                        xtype: 'button',
                        flex: 1,
                        id: 'Save_btn_OL_New_MeasureRecord',
                        text: '保存'
                    }
                ]
            }
        ]
    }
});
