
/* JavaScript content from app/view/SynchronizationTable/SafeguardFourRecordContent_ZYXM_List.js in folder common */


Ext.define('HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_ZYXM_List', {
    extend: 'Ext.Container',
    id:'SafeguardFourRecordContent_ZYXM_List_id',
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
                id:'SafeguardFourRecordContent_ZYXM_List_Toolbar',
                docked: 'top',
                title: '',//作业前,后
                items:[{
                    xtype: 'button',
                    id:'SafeguardFourRecordContent_ZYXM_List_id_FH',
                    ui: 'back',
                    text: '返回'
                },
                {
  	        	  xtype:'spacer'
  	          	},
  	          	{
  	        	  xtype:'button',
  	        	  id:'SafeguardFourRecordContent_ZYXM_List_id_QD',
  	        	  text:'确定',
  	          	}],
            },
            {
                xtype: 'list',
                id:'SafeguardFourRecordContent_ZYXM_List_id_list',
                flex: 1,
                store:'SynchronizationTable_ZYXM_List_Store',
                itemTpl: [
					'<table border=0 width=100% style="color:#666" class="textf">'+
					'  <tr>'+
					'     <td width=10% rowspan="2">'+
					'        <div name="ZYXM_ZY_Name" class="p_judge_box2">3</div>'+
					'     </td>'+
					'     <td width=90%>{PreWorkCheck}{PostWork}</td>'+
					'  </tr>'+
					'</table>',
			    ],
            }
        ]
    }

});