
/* JavaScript content from app/view/oa/startTheProcess/startTheProcessName.js in folder common */
//日常办公
Ext.define('HelcPDA.view.oa.startTheProcess.startTheProcessName', {
    extend: 'Ext.Panel',
    id:'qc_StartprocessName_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        style: 'background-color:#edebf1',
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id: 'qc_listTitle',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        listeners:{
                        	tap:function(){
                        		var obj1=Ext.getCmp('qc_StartProcess_id');
                        		if(!obj1){
                        			obj1=Ext.create('HelcOA.view.StartProcess.StartProcess');
                        		}
                        		Ext.Viewport.setActiveItem(obj1);
                        	}
                        }
                    }
                ]
            },
            {
                xtype: 'list',
                id:'qc_StartprocessNameList',
                flex: 1,
                itemTpl: [
                    '<table border=0 class="">',
                    '  <tr>',
                    '      <td rowspan="2" class="i_Button_List_Icon_1 i_Button_List_Icon_2" style="color:#62bb47">4</td>',
                    '      <td colspan="2" class="i_Button_List_Title">{bpdname}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
                store:'startTheProcessStore'
                	//i_Button_List
            },
            {
                xtype: 'fieldset',
                hidden: true,
                items: [
                    {
                        xtype: 'textfield',
                        id: 'qc_bpdname',
                    },
                ]
            }
        ]
    }

});