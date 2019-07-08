
/* JavaScript content from app/view/selective_examination/CC_Query.js in folder common */
/**
 * 抽查 整改信息  xcx 2014-11-12
 */

Ext.define('HelcPDA.view.selective_examination.CC_Query', {
    extend: 'Ext.Panel',
    id:'CC_Query_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '单头数据',
                items: [{
                	xtype: 'button',
                    ui:'back',
                    text: '主页',
                    id: 'backToMenus',
				}]
            },{
		    	xtype: 'list',
                id:'CC_Query_List',
                height: '100%',
                itemId: 'CC_Query_List',
                itemTpl: [
                        '<table width="100%" border="0" cellspacing="0" cellpadding="0">',
				 	 	'  <tr>',
				 	 	'    <td width=25%>ID:{HEADER_ID}</td>',
				 	 	'    <td width=25%>编号:{RUMMAG_CODE}</td>',
				 	 	'    <td width=25%>抽查单状态:{STATUS}</td>',
				 	 	'    <td width=25%>整改状态:{MENU_STATUE}</td>',
				  	 	'  </tr>',
				  	 	'</table>'
                ],
                store:'HEL_RUMMAG_HEADER_Store',
                onItemDisclosure: true,	
		    }

            
//--------------------分离的      
        ]
    }
});