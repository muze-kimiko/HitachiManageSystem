
Ext.define('HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddressList', {
    extend: 'Ext.Container',
    id:'custornAddressList_new_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '业务联系地址',
                cls:'textf',
                items: [
                    {
                    	id:'custornAddressList_new_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                    	id:'custornAddressList_new_id_QD',
                        xtype: 'button',
                        text: '确定'
                    },
                ]
            },
            {
            	id:'custornAddressList_new_id_list',
                xtype: 'list',
                height: '100%',
                store:'CustornAddressStore',
                itemTpl: [
					'<table border=0 width=100% style="color:#666" class="textf">'+
					'  <tr>'+
					'     <td width=10% rowspan="3">'+
					'        <div name="groupkung_custornAddressList" class="p_judge_box2" id="conkung_custornAddressList">3</div>'+
					'     </td>'+
					'     <td width=80%>{Country}  {Province}  {City}  {County}</td>'+
					'     <td width=10%></td>'+
					'  </tr>'+
					'  <tr>'+
					'      <td>{StreetAddress}</td>'+
					'  </tr>'+
					'</table>',
                    
                ],
                //onItemDisclosure: true
            }
        ]
    }

});