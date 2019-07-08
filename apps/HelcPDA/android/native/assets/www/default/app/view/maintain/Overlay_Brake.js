
/* JavaScript content from app/view/maintain/Overlay_Brake.js in folder common */
Ext.define('HelcPDA.view.maintain.Overlay_Brake', {
    extend: 'Ext.Container',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.SegmentedButton',
        'Ext.Button',
        'Ext.XTemplate'
    ],
    config: {
        centered: true,
        height: '90%',
        id: 'Overlay_Brake',
        width: '90%',
        hideOnMaskTap: true,
        modal: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '抱闸测量表选项'
            },
            {
            	xtype: 'hiddenfield',
            	id: 'H_Brake_Index',
            },
            {
            	xtype: 'list',
            	cls: 'helcpda_selected',
            	id: 'L_Brake',
            	store: 'BrakeListStore',
            	flex: 1,
            	itemTpl:[
            	    '<div>{TaskName} / {TaskDescription}<div>'
            	]
            },
            {
                xtype: 'segmentedbutton',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        id: 'CC_btn_OL_Brake',
                        flex: 1,
                        text: '取消'
                    },
                    {
                        xtype: 'button',
                        flex: 1,
                        id: 'Save_btn_OL_Brake',
                        text: '确定'
                    }
                ]
            }
        ]
    }
});
