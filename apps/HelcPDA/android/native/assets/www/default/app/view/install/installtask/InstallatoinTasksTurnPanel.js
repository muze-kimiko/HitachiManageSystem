
/* JavaScript content from app/view/install/installtask/InstallatoinTasksTurnPanel.js in folder common */
/*
 * File: app/view/InstallatoinTasksTurnPanel.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcPDA.view.install.installtask.InstallatoinTasksTurnPanel', {
    extend: 'Ext.Panel',
   id:'InstallatoinTasksTurnPanel_id',
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
                title: '安装任务转派',//从转派按钮进入
                items: [
                    {
                        xtype: 'button',
                        text: '返回',
                        ui:'back',
                        id:'InstallatoinTasksTurnPanel_id_FH_BUTTON',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'Appoint_id',
                        text: '指定',
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: '记录',
                        id:'Record_id'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'allCheck_id',
                        text: '全选',
                       /* listeners:{
                        	tap:function(){
                        		alert('aa5');
                        	}
                        }*/
                    },
                    {
                        xtype: 'button',
                        id:'coverCheck_id',
                        text: '反选'
                    }
                ]
            },
            {
                xtype: 'list',
                data: [
                    
                ],
                height: '100%',
                itemId: 'mylist20',
                itemTpl: [
                          '<table border=0 width=100%  >',
                          '    <tr>',
                          '        <td rowspan="3" width=10%>',
                          '            <div name="groupCheckbox11" class="p_judge_box" id="p_judge_color" style="color:{color};">3</div>',
                          '        </td>',
                          ' 	   <td  style="color:#000;">工号:{ELEVATOR_NO}</td>',
                          '    </tr>',
                          '    <tr>',
                          '  	   <td style="color:#000;">梯种:{CM_ELEVATOR_TYPE_NAME}/</td>',
                          '    </tr>',
                          '    <tr>',
                          ' 	   <td >层:{PARAM_C}/站:{PARAM_Z}</td>',
                        //  ' 	   <td >站:{PARAM_Z}</td>',
                          ' 	   <td  style="color:#000;">批次:{SEQ_NUM}</td>',
                          '    </tr>',
                          ///站:{PARAM_Z}
                          '</table>'
                      ], 
                onItemDisclosure: false,
                store:'InstallatoinTasksListPanelStore3'
            }
            ],
            listeners: [
                {
                    fn: 'onMylist20ItemTap',
                    event: 'itemtap',
                    delegate: '#mylist20'
                }
            ]
        },

        onMylist20ItemTap: function(dataview, index, target, record, e, eOpts) {
                    if(e.target.id==='p_judge_color')
                    {
                        if(record.get('sel')==='0')
                        {
                            record.set('sel','1');
                            record.set('color','#ccc');
                        }
                        else
                        {
                            record.set('sel','0');
                            record.set('color','#e03a3e');
                        }
                    }
        }   

});