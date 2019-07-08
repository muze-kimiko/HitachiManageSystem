Ext.define('HelcAgent.view.OpportunityManagement.Project_New.SelectItemView',{
    extend: 'Ext.Container',
    id:'selectItemView',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
            	id:'selectItemViewToolbar',
                xtype: 'toolbar',
                docked: 'top',
                title: '列表项选择',
                cls:'textf',
                items: [
                    {
                    	id:'selectItemViewBack',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                    	id:'selectItemViewConfirm',
                        xtype: 'button',
                        text: '确定'
                    },
                ]
            },
            {
            	id:'selectItemlist',
                xtype: 'list',
                height: '100%',
                store:'HQSalesRepStore',
                itemTpl: [
					
					'<table border=0 width=100% style="color:#666" class="textf">'+
					'  <tr>'+
					'     <td width=10% rowspan="2">'+
					'        <div name="groupkung_selectItemList" class="p_judge_box2" id="conkung_selectItemlist">3</div>'+
					'     </td>'+
					'     <td width=90%>{ActiveLastName}{ActiveFirstName} </td>'+
					'  </tr>'+
					'  <tr>'+
					'      <td width=90%>{Division}  &nbsp; {Name}</td>'+
					'  </tr>'+
					'</table>'
                ],
            }
        ]

    }

});