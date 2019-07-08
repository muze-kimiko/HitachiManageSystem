Ext.define('HelcPAD.view.Remind.RemindList',{
    extend: 'Ext.Container',
    id:'cemindList',
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
            	id:'cemindListToolbar',
                xtype: 'toolbar',
                docked: 'top',
                title: '提醒列表',
                cls:'textf',
                items: [
                    {
                    	id:'cemindList_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                    	id:'cemindList_QD',
                        xtype: 'button',
                        text: '删除'
                    },
                ]
            },
            {
            	id:'cemindListlist',
                xtype: 'list',
                height: '100%',
                store:'RemindListStore',
                itemTpl: [
					'<table border=0 width=100% style="color:#666" class="textf">'+
					'  <tr>'+
					'     <td width=10% rowspan="2">'+
					'        <div name="groupkung_cemindListlist" class="p_judge_box2" id="conkung_cemindListlist">3</div>'+
					'     </td>'+
					'     <td width=90%>{subject} &nbsp;&nbsp;&nbsp; </td>'+
					'  </tr>'+
					'  <tr>'+
					'     <td  width=90%><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{message}</div></td>'+
					'  </tr>'+
					'</table>'
                ],
            }
        ]

    }

});