Ext.define('HelcPDA.view.install.installprocess.InstallProcess_EnoList_V', {
    extend: 'Ext.Panel',
    id: 'installProcess_EnoList_V',
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
                title: '安装过程查询－工号列表',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_to_processlist',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        handler: function(button, e) {
                            var menu = Ext.create('Ext.Menu', {
                                items: [
                                {
                                    text: '批吊搭',
                                    id: 'ipd_batch_Init',
	                            	handler: function() {
	                                    Ext.Viewport.removeMenu('right');
	                                }
                                },
                                {
                                    text: '批进场',
                                    id: 'ipd_batch_Enter',
                                    handler: function() {
	                                    Ext.Viewport.removeMenu('right');
	                                }
                                },
                                {
                                    text: '批安装',
                                    id: 'ipd_batch_Install',
                                    handler: function() {
	                                    Ext.Viewport.removeMenu('right');
	                                }
                                }
                                ]
                            });

                            Ext.Viewport.setMenu(menu, {
                                side: 'right',
                                reveal: false
                            });

                            Ext.Viewport.showMenu('right');

                        },
                        itemId: 'mybutton8',
                        iconCls: 'more',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        id: 'ipd_check_all',
                        text: '全选'
                    },
                    {
                        xtype: 'button',
                        id: 'ipd_check_invert',
                        text: '反选'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        width: '10%',
                        iconCls: 'action',
                        text: '',
                        margin: '0 15 0 0',
                        listeners:{
                            tap:function(){
                            	var ViewId = Ext.Viewport.getActiveItem().id;
                        		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
                        		ViewArray.push({ViewId:ViewId,ViewName:ViewName});
                        		var viewName=Ext.getCmp('wfc_list_view');
                        		   if(viewName){
                        			   viewName.destroy();
                        		   }
                        	    Ext.Viewport.setActiveItem(Ext.create('HelcPDA.view.waitingdata.WaitingForCommitData_List_V'));
    							var obj_v = Ext.getCmp('wfc_list_view');
    							obj_v.loadDataJST();
                            }
                        }
                    }
                ]
            },
            {
                xtype:'hiddenfield',
                id:'ip_E_XB',
            },
            {
                xtype: 'list',
                id: 'GH_list',
                height: '100%',
                store:'ProcessGHStore',
                itemTpl: [
							'<table border=0 width=100% style="color:#666">',
							'  <tr>',
							'    <td width=10% rowspan="2" id="ipd_ENO_Checkbox">',
							'		<div name="ipd_ENO_Checkbox" id="ipd_ENO_Checkbox" class="p_judge_box" style="color:{color};">3</div>',
							'    </td>',
							'    <td width=80%>',
							'      <span style="color:#000;font-size:18px;">{ELEVATOR_NO}</span>',
							'      <span style="color:#666;font-size:15px;">批次:{SEQ_NUM}</span>',
							'    </td>',
							'  </tr>',
							'  <tr>',
							'<td width=120><span style="float:left;font-size:15px;">状态:</span><div style="float:left;width:160px;text-align:center;background:green;color:white;font-size:15px; "  >{P_STATUS}</div></td>',
//							'      <td width=40% style="text-align: left">状态:<span style="margin-left:5px;background:green;color:white;border:green 2px solid;">{P_STATUS}</span></td>',
							'  </tr>',
							'</table>'
							
                ],
                onItemDisclosure: true
            }
        ],
        listeners: [
                    {
                        fn: 'GH_listItemTap',
                        event: 'itemtap',
                        delegate: '#GH_list'
                    }
                ]
    },
    
    GH_listItemTap: function(dataview, index, target, record, e, eOpts) {
        if(e.target.id==='ipd_ENO_Checkbox')
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