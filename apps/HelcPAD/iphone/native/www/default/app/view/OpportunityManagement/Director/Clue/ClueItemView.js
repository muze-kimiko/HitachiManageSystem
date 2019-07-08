
/* JavaScript content from app/view/OpportunityManagement/Director/Clue/ClueItemView.js in folder common */
Ext.define('HelcPAD.view.OpportunityManagement.Director.Clue.ClueItemView',{
    extend: 'Ext.Container',
    id:'clueItemView',
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
                    /*{
                    	id:'clueItemView_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                    	id:'clueItemView_QD',
                        xtype: 'button',
                        text: '确定'
                    },*/
                ]
            },
            {
              	id:'clueItemView_toolbar',
                  xtype: 'toolbar',
                  docked: 'top',
                  layout: 'hbox',
                  style: 'background:#EDEBF1;',
              },
            {
            	id:'clueItemViewlist',
                xtype: 'list',
                height: '100%',
                store:'ClueSelectStore',
                itemTpl: [
					'<table border=0 width=100% style="color:#666" class="textf">'+
					'  <tr>'+
					'     <td width=10% rowspan="2">'+
					'        <div name="groupkung_clueItemViewlist" class="p_judge_box2" id="conkung_clueItemViewlist">3</div>'+
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