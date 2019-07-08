
/* JavaScript content from app/view/Maintain/MaterialDetail.js in folder common */
Ext.define('HelcBPM.view.Maintain.MaterialDetail', {
    extend: 'Ext.Container',
    id:'MaterialDetail',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
    	layout:'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '物料明细',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_M_MaterialDetail_back',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
            	xtype: 'formpanel',
            	height: 58,
		        scrollable: false,
		        items: [
		        	{
            			xtype: 'fieldset',
                		items: [
                    		{
                        		xtype: 'textfield',
                        		id: 'D_Gh',
                        		style: 'float: left',
                        		width: '50%',
                        		labelWidth:120,
                        		label: '生产工号：',
                        		readOnly: true,
                    		},
                    		{
                        		xtype: 'textfield',
                        		id: 'D_GhTzXh',
                        		style: 'float: left',
                        		width: '50%',
                        		labelWidth:120,
                        		label: '梯种型号：',
                        		readOnly: true
                    		},
                		]
            		},
		        ]
            },
            {
                xtype: 'list',
                id:'list_M_MaterialDetail',
                store: 'M_MaterialDetailListStore',  
                flex:1,
                itemTpl : [
					'<table id=\'\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
					'<tr height=\'30\'>',
					'<td width=\'21%\' class=\'bordertop borderleft\'>编码：</td>',
					'<td width=\'15%\' class=\'bordertop\'>{WlCode}</td>',
					'<td width=\'12%\' class=\'bordertop\'>物料：</td>',
					'<td colSpan=\'3\' class=\'bordertop borderright\'>{WlName}</td>',
					'</tr>',
					'<tr height=\'30\'>',
					'<td class=\'paddingleft borderleft\'>数量：</td>',
					'<td class=\'paddingleft\'>{Num}</td>',
					'<td class=\'paddingleft\'>SP1(物料)：</td>',
					'<td width=\'15%\' class=\'paddingleft\'>{Sp1}</td>',
					'<td width=\'21%\' class=\'paddingleft\'>单个物料期望价(含税)：</td>',
					'<td width=\'16%\' class=\'borderright\'>{DgwlQwjHs}</td>',
					'</tr>',
					'<tr height=\'30\'>',
					'<td class=\'borderleft\'>工厂标准成本：</td>',
					'<td class=\'paddingleft\'>{GcBzCb}</td>',
					'<td class=\'paddingleft\'>SP2(工时)：</td>',
					'<td class=\'paddingleft\'>{Sp2}</td>',
					'<td class=\'paddingleft\'>物料期望价合计(含税)：</td>',
					'<td class=\'borderright\'>{WlqwjHjHs}</td>',
					'</tr>',
					'<tr height=\'30\'>',
					'<td class=\'borderleft\'>(预计)分公司采购成本：</td>',
					'<td class=\'paddingleft\'>{YjFgsCgCb}</td>',
					'<td class=\'paddingleft\'>SPL：</td>',
					'<td class=\'paddingleft\'>{Spl}</td>',
					'<td class=\'paddingleft\'>物料期望价浮率：</td>',
					'<td class=\'borderright\'>{WlhFl}</td>',
					'</tr>',
					'<tr height=\'30\'>',
					'<td class=\'borderleft\'>SP计算方式：</td>',
					'<td class=\'paddingleft\'>{SpJsFs}</td>',
					'<td class=\'paddingleft\'>SPL折后：</td>',
					'<td class=\'paddingleft\'>{SplZh}</td>',
					'<td class=\'paddingleft\'>(预计)销售利润率(%)：</td>',
					'<td class=\'borderright\'>{YjXsLrl}</td>',
					'</tr>',
					'<tr height=\'30\'>',
					'<td class=\'borderleft borderbottom\'>大客户折扣率(%)：</td>',
					'<td class=\'borderbottom\'>{DkhZkl}</td>',
					'<td class=\'borderbottom\'></td>',
					'<td class=\'borderbottom\'></td>',
					'<td class=\'borderbottom\'></td>',
					'<td class=\'borderbottom borderright\'></td>',
					'</tr>',
					'</table>'
				],
            },
        ]
    }
});

