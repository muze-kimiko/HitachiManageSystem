Ext.define('HelcPDA.view.install.ITM.ITM_EnoList_V', {
    extend: 'Ext.Panel',
    id: 'ITM_EnoList_V',
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
                title: 'ITM－工号列表',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_to_ITM_List',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'itm_batch',
                        text: '批量'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        id: 'itm_check_all',
                        text: '全选'
                    },
                    {
                        xtype: 'button',
                        id: 'itm_check_invert',
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
                id:'ITM_batch_index',
            },
            {
                xtype: 'list',
                id: 'ITM_GH_list',
                height: '100%',
                store:'ITMGHStore',
                itemTpl: [
							'<table border=0 width=100% style="color:#666">',
							'  <tr>',
							'    <td width=10% rowspan="2" id="itm_ENO_Checkbox">',
							'		<div name="itm_ENO_Checkbox" id="itm_ENO_Checkbox" class="p_judge_box" style="color:{color};">3</div>',
							'    </td>',
							'    <td width=80%>',
							'      <span style="color:#000;font-size:18px;">{ELEVATOR_NO}</span>',
							'      <span style="color:#666;font-size:15px;">批次:{SEQ_NUM}</span>',
							'    </td>',
							'  </tr>',
							'  <tr>',
							'	   <td width=120><span style="float:left;font-size:15px;">状态:</span><div style="float:left;width:90px;text-align:center;background:green;color:white;font-size:15px; "  >{P_STATUS}</div></td>',
//							'      <td width=40% style="text-align: left;font-size:15px;">状态:<span style="width:160px;margin-left:5px;background:green;color:white;border:green 2px solid;font-size:15px;">{P_STATUS}</span></td>',
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
                        delegate: '#ITM_GH_list'
                    }
                ]
    },
    
    GH_listItemTap: function(dataview, index, target, record, e, eOpts) {
        if(e.target.id==='itm_ENO_Checkbox')
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