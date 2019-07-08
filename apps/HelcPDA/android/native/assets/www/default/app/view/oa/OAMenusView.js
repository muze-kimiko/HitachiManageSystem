
/* JavaScript content from app/view/oa/OAMenusView.js in folder common */
Ext.define('HelcPDA.view.oa.OAMenusView',{
	requires: [
        'Ext.Button',
        'Ext.Toolbar'
    ],

	extend: 'Ext.Container',
	id:'oAMenusView',
	
	config:{
		layout: {
            type: 'vbox',
            align: 'center'
        },
		items:[
		{
            xtype: 'toolbar',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    ui: 'back',
                    text: '返回',
                    listeners:{
                        tap:function(){
                        	var main = Ext.getCmp('oAMainPanel');
                       	 	if(!main){
                       		 main = Ext.create('HelcPDA.view.oa.OAMainPanel');
                       	 	}
                       	 	Ext.Viewport.setActiveItem(main);	
                       	 Ext.getCmp('oa_sanbao').setValue(1);
                        }
                     }
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'label',
                    html: ''
                },
                {
                    xtype: 'spacer'
                }]
        },
        {
                xtype: 'button',
                id: 'OA_Report_handle',
                margin: 20,
                width: 220,
                text: '非标报告作业处理流程'
    	},{
                xtype: 'button',
                id: 'OA_All_apply',
                margin: 20,
                width: 220,
                text: '三包申请报告',
                listeners:{
                    tap:function(){
                    	var main = Ext.getCmp('oAReportDetailPanel');
                   	 	if(!main){
                   		 main = Ext.create('HelcPDA.view.oa.OAAllAplayDetailPanel');
                   	 	}
                   	 	Ext.Viewport.setActiveItem(main);	
                    }
                 }
    	}
	]

    	
	}
});















