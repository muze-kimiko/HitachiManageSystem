
/* JavaScript content from app/view/WeekMeet/WeekMeet.js in folder common */
Ext.define('HelcOA.view.WeekMeet.WeekMeet', {
    extend: 'Ext.Panel',
    id: 'WeekMeet_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '一周活动',
                items: [
                        {
                            xtype: 'button',
                            id:'b_home',
                            iconCls: 'home',
                            listeners:{
                            	tap:function(){
                            		var obj1=Ext.getCmp('Menus_id');
                            		if(!obj1){
                            			obj1=Ext.create('HelcOA.view.Menus');
                            		}
                            		Ext.Viewport.setActiveItem(obj1);
                            	}
                            }
                        }
                    ]
            },
            {
                xtype: 'list',
                flex: 1,
                id: 'WeekMeetList',
                itemTpl: [
                    '<table border=0 class="i_Button_List i_News_List">',
                    '  <tr>',
                    '      <td  class="i_Button_List_Title" style="color:{color}">{subject}</td>',
                    '  </tr>',
                    '  <tr>',
                    '      <td class="i_Button_List_right">{startdate}  {stime}</td>',
                    '  </tr>',
                    '</table>'
                ],
                store:'WeekMeetStore'
            }
        ]
    },
    
});