
/* JavaScript content from app/view/SparepartSell/PartDetail.js in folder common */
Ext.define('HelcBPM.view.SparepartSell.PartDetail', {
    extend: 'Ext.form.Panel',
    id:'PartDetail',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '物料明细',
                items: [
                    {
                        xtype: 'button',
                        id:'',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
            	xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        id: '',
                        style: 'float: left',
                        inputCls:'align-right',
                        width: '50%',
                        labelWidth:120,
                        label: '编码：',
                        readOnly: true,
                    },
                    {
                        xtype: 'textfield',
                        id: '',
                        style: 'float: left',
                        inputCls:'align-right',
                        width: '50%',
                        labelWidth:120,
                        label: '物料：',
                        readOnly: true
                    },
                ]
            },
            {
            	xtype: 'fieldset',
            	title: '价格参考',
            	padding: 5,
                html: '<table id="" style=\'text-align:center;\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing="0">' +
            		'<tr>' +
            		'<td colSpan=2 class="">参考时间：最近三个月</td>' +
            		'<td class="">范围：全国</td>' +
            		'</tr>' +
            		'<tr>' +
            		'<td class="">最低价</td>' +
            		'<td class="">平均价</td>' +
            		'<td class="">最高价</td>' +
            		'</tr>' +
            		'<tr>' +
            		'<td class="">1000</td>' +
            		'<td class="">1500</td>' +
            		'<td class="">1700</td>' +
            		'</tr>' +
            		'</table>',
            },
            {
            	xtype: 'fieldset',
            	title: '最近三次已审批报价（根据上述报价筛选）',
            	padding: 5,
                html: '<table id="" style=\'text-align:center;\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing="0">' +
            		'<tr>' +
            		'<td class="">组织：</td>' +
            		'<td class="">江苏司</td>' +
            		'<td class="">大客户名称：</td>' +
            		'<td class="">大客户的名称</td>' +
            		'<td class="">已审批报价：</td>' +
            		'<td class="">1520</td>' +
            		'</tr>' +
            		'</table>',
            }
        ]
    }
});

