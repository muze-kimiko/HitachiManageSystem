
/* JavaScript content from app/view/startTheProcess/DailyOffice/MeetingRooms.js in folder common */
Ext.define('HelcOA.view.startTheProcess.DailyOffice.MeetingRooms', {
    extend: 'Ext.Panel',
    id:'qc_MeetingRooms_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.TextArea'
    ],

    config: {
        layout: 'vbox',
        items: [
            {xtype: 'toolbar',
                docked: 'top',
                title: '参会的分会场',
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'back_videoE',
	                        text: '取消',
	                        ui: 'back'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'commit_SvideoE',
	                        text: '确认'
	                    }
	                ]
            },
            {
                xtype: 'list',
                flex: 1,
                id: 'MeetingRoomsList',
                store:'MeetingRoomsStore',
                itemTpl: [
                          '<table border=0 width=100%>',
                          '    <tr>',
                          '        <td>',
                          '            <span style="font-size:20px;">{company}</span>',
                          '        </td>',
                          '        <td style="width:50px">',
                          '           <div name="MeetingRooms_color2" class="p_judge_box" id="MeetingRooms_color2">3</div>',
                          '        </td>',
                          '    </tr>',
                          '</table>'
                      ]
            }
        ]
    },
    
});