
/* JavaScript content from app/view/install/installcheck/InstallatoinTasksFactoryPanel1.js in folder common */
Ext.define('HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1', {
    extend: 'Ext.Panel',
    id: 'installatoinTasksFactoryPanel1',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.tab.Panel'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '厂检任务',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_to_check',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'GoToWaittingData',
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
	                xtype: 'list',
	                height: '100%',
	                id:'tasksList',
	                store:'TasksFactoryStore',
	                itemTpl: [
	                    '<table border=0 width=100% style="color:#666">',
	                    '    <tr height=20>',
	                    '        <td width=70%>',
	                    '            <span style="color:#000;font-size:18px;">{ELEVATOR_NO}</span>',
	                    '            <span style="color:#666;font-size:15px;">批次:{SEQ_NUM}</span>',
	                    '            <span style="color:#666;font-size:15px;">厂检次第:{CHECK_NUM}</span>',
	                    '        </td>',
	                    '    </tr>',
	                    '    <tr height=18>',
	                    '<td width=120><span style="float:left;font-size:15px;">状态:</span><div style="float:left;width:160px;text-align:center;background:green;color:white;font-size:15px; "  >{CHANG_SATRTUS}</div></td>',
//	                    '		<td width=40% style="text-align: left">状态:<span style="margin-left:5px;background:green;color:white;border:green 2px solid;">{CHANG_SATRTUS}</span></td>',
	                    '    </tr>',
	                    '</table>'
	                ],
	                onItemDisclosure: true
            }
       ]}
});