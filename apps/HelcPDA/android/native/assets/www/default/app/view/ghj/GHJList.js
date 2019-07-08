
/* JavaScript content from app/view/ghj/GHJList.js in folder common */


Ext.define('HelcPDA.view.ghj.GHJList', {
    extend: 'Ext.Container',
    id:'GHJList_id',
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
                title: '请选择需处理单据',
                items: [
                    {
                    	id:'GHJList_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },{
                    	xtype:'spacer'
                    },
                ]
            },
            {
            	id:'GHJList_list_id',
                xtype: 'list',
                height: '100%',
                store:'GHJListStore',
                itemTpl: [
                    //工号、更换件状态、数量、
                    //出库日期、物料编码、物料名称、
                    //工号地盘、
                    //AssetNumber,Status,CompQuantity,
                    //ComponentOutboundDate,ComponentCode,ComponentName,
                    //AssetDomainName,
                    '<table border=0 width=100%>'+
                    '    <tr>'+
                    '		<td width=30%>{Status}</td>'+
                    '		<td width=35%>{AssetNumber}</td>'+
                    '		<td width=35%>{CompQuantity}</td>'+
                    '	</tr>',
                    '   <tr>'+
                    '     <td colspan=3 width=100%>{ComponentOutboundDate}</td>'+
                    '   </tr>',
                    '   <tr>'+
                    '     <td colspan=2 width=50%>{ComponentCode}</td>'+
                    '     <td width=50%>{ComponentAliasName}</td>'+
                    '   </tr>',
                    '   <tr>'+
                    '     <td colspan=3 width=100%>{AssetDomainName}</td>'+
                    '   </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});