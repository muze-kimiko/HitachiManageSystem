
Ext.define('HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_QTBLXM_List', {
	extend: 'Ext.Panel',
	id:'SafeguardFivelegacyContent_QTBLXM_List_id',
    requires: [
        'Ext.Toolbar',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Spacer',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
              id:'SafeguardFivelegacyContent_QTBLXM_List_id_toolbar',
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '',
	          items: [{
	        	  id:'SafeguardFivelegacyContent_QTBLXM_List_id_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer'
	          }]
	      },
	      {
			    xtype: 'list',
			    height: '100%',
			    id:'SafeguardFivelegacyContent_QTBLXM_List_id_list',
			    store:'SynchronizationTable_QTBLXM_List_Store',
			    itemTpl: [
			          '<div>{DisplayValue}{Name}{AreaName}{GroupName}</div>'
			    ],
			},
        ]
    }

});