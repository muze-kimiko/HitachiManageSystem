
/* JavaScript content from app/view/ProductCertificate/Renovate_Project_LineList.js in folder common */
Ext.define('HelcPDA.view.ProductCertificate.Renovate_Project_LineList', {
    extend: 'Ext.Panel',
    id: 'Renovate_Project_LineList_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '品证整改',
                items: [
                    {
                        xtype: 'button',
//                        id: 'Renvate_p_back',
                        ui: 'back',
                        text: '返回',
                        listeners:{
                        	tap:function(){
                        		objj.getApplication().getController('ProductCertificate.Renovate_Project_List_Ctrl').Renvate_p_back();
                        	}
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn_batch_forward',
                        text: '批转派',
                    },
                ]
            },
            {
                xtype: 'list',
                id: 'RP_Line_list',
                store:'RP_LineStore',
                height: '100%',
                itemTpl: [
							'<table border=0 width=100% style="color:#666">',
							'  <tr>',
							'    <td width=20% rowspan="3" id="ipd_ENO_Checkbox">',
							'		<div name="ipd_ENO_Checkbox" id="ipd_ENO_Checkbox" class="p_judge_box" style="color:{color};">3</div>',
							'    </td>',
							'    <td width=80%>',
							'      <span style="color:#000;font-size:18px;">{CONTRACT_NO}</span>',
							'    </td>',
							'  </tr>',
							'  <tr>',
							'    <td width=80%>',
							'      <span style="color:#666;font-size:15px;">工号:{ELEVATOR_NO}</span>',
							'    </td>',
							'  </tr>',
							'<td width=120><span style="float:left;font-size:15px;">状态:</span><div style="float:left;width:120px;text-align:center;background:green;color:white;font-size:15px; "  >{ELV_RENO_STATUS}</div></td>',
//							'      <td width=40% style="text-align: left">状态:<span style="margin-left:5px;background:green;color:white;border:green 2px solid;">{P_STATUS}</span></td>',
							'  </tr>',
							'</table>'
							
              ],
                onItemDisclosure: true
            },
            {
            	xtype:'hiddenfield',
            	id:'RENOVATE_PROJECT_NUM'
            },
        ],

		listeners: [
		            {
		                fn: 'RP_listItemTap',
		                event: 'itemtap',
		                delegate: '#RP_Line_list'
		            }
		        ]
    },
    
    RP_listItemTap: function(dataview, index, target, record, e, eOpts) {
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