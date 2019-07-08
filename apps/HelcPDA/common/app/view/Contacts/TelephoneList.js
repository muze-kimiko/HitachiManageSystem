/*
 * File: app/view/TelephoneList.js
 *
 * This file was generated by Sencha Architect
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

Ext.define('HelcPDA.view.Contacts.TelephoneList', {
    extend: 'Ext.Container',
    id:'telephonelist_id',
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
                title: '联系人',
                items: [
                    {
                        xtype: 'button',
                        id:'telephonelist_id_FH',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
                xtype: 'list',
                id:'telephonelist_id_list',
                height: '100%',
                store:'TelephoneAddressStore',
                itemTpl: [
					'<table border=0 width=100% style="color:#666" class="textf">'+
					'  <tr>'+
					'     <td width=30%><div style="font-size:18px;font-weight:bold;color:black;">{PSNNAME}</div></td>'+
					'     <td width=40%>{PSNCODE}</td>'+
					'     <td width=30%>{DTEL}</td>'+
					'  </tr>'+
					'  <tr>'+
					'      <td width=100% colspan="3">{ORGNAME}</td>'+
					'  </tr>'+
					'  <tr>'+
					'      <td width=100% colspan="3">{DEPTNAME}</td>'+
					'  </tr>'+
					'  <tr>'+
					'      <td width=50% colspan="2" >'+
					'		<div ><a id="telid" href="tel:{OTEL1}">{OTEL1}</a></div>'+ 
					'      </td>'+
					'      <td width=50%>{OTEL2}</td>'+
					'  </tr>'+
					'</table>',
                    //'<div>{ORGNAME}　{DEPTNAME}　{PSNCODE}　{PSNNAME}　{DTEL}　{OTEL1}　{OTEL2}　{EMAIL2}</div>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});