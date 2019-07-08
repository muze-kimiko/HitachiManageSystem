
/* JavaScript content from app/view/SynchronizationTable/SafeguardOneQueryList.js in folder common */

Ext.define('HelcPDA.view.SynchronizationTable.SafeguardOneQueryList', {
    extend: 'Ext.Container',
    id:'SafeguardOneQueryList_id',
    requires: [
        'Ext.Toolbar',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                id:'Safeguard1QueryList_id_Toolbar',
                items:[{
                    xtype: 'button',
                    id:'Safeguard_FH',
                    ui: 'back',
                    text: '返回'
                },
                //测试，可删
                {
  	        	  xtype:'spacer'
  	          	},
  	          	/*{
  	        	  xtype:'button',
  	        	  id:'Safeguard_CS',
  	        	  text:'测试用',
  	          	}*/],
            },
            {
                xtype: 'list',
                id:'SafeguardOneQueryList_id_List',
                flex: 1,
                /*store:'',
                itemTpl: [
                ],*/
                onItemDisclosure: true,
            }
        ]
    }

});