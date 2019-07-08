
/* JavaScript content from app/view/Remould/AssetDetail.js in folder common */
Ext.define('HelcBPM.view.Remould.AssetDetail', {
    extend: 'Ext.Container',
    id:'AssetDetail',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '工号明细',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_R_AssetDetail_back',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
            	xtype: 'tabpanel',
                height: '100%',
                id: '',
                items: [
                	{
                		xtype: 'container',
		                id: '',
		                title: '项目物料报价',
		                layout:'vbox',
		                items: [
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
				                id:'list_R_AssetDetail_WLBJ',
				                store: 'R_AssetDetail_WLBJListStore',  
				                flex:1,
				                itemTpl : [
									'<table id=\'\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
									'<tr height=\'30\'>',
									'<td width=\'16%\' class=\'bordertop borderleft\'>编码：</td>',
									'<td width=\'14%\' class=\'bordertop\'>{WlCode}</td>',
									'<td width=\'14%\' class=\'bordertop\'>物料名称：</td>',
									'<td width=\'21%\' class=\'bordertop\'>{WlName}</td>',
									'<td width=\'13%\' class=\'bordertop\'>型号规格：</td>',
									'<td width=\'20%\' class=\'bordertop borderright\'>{XhGg}</td>',
									'</tr>',
									'<tr height=\'30\'>',
									'<td class=\'paddingleft borderleft\'>单位：</td>',
									'<td class=\'paddingleft\'>{Unit}</td>',
									'<td class=\'paddingleft\'>数量：</td>',
									'<td class=\'paddingleft\'>{Num}</td>',
									'<td class=\'paddingleft\'>备注：</td>',
									'<td class=\'borderright\'>{Remark}</td>',
									'</tr>',
									'<tr height=\'30\'>',
									'<td class=\'borderleft\'>物料成本价：</td>',
									'<td class=\'paddingleft\'>{WlCbjBhs}</td>',
									'<td class=\'paddingleft\'>物料成本合计：</td>',
									'<td class=\'paddingleft\'>{WlCbHj}</td>',
									'<td class=\'paddingleft\'>物料结算价：</td>',
									'<td class=\'borderright\'>{WlJsj}</td>',
									'</tr>',
									'<tr height=\'30\'>',
									'<td class=\'borderleft borderbottom\'>物料结算价合计：</td>',
									'<td class=\'borderbottom\'>{WljsjHjHs}</td>',
									'<td class=\'borderbottom\'></td>',
									'<td class=\'borderbottom\'></td>',
									'<td class=\'borderbottom\'></td>',
									'<td class=\'borderbottom borderright\'></td>',
									'</tr>',
									'</table>'
								]
							},
		                ]
                	},
                	{
                		xtype: 'container',
		                id: '',
		                title: '项目其他物料',
		                layout:'vbox',
		                items: [
		                	{
				                xtype: 'list',
				                id:'list_R_AssetDetail_QTWLBJ',
				                store: 'R_AssetDetail_QTWLBJListStore',  
				                flex:1,
				                itemTpl : [
									'<table id=\'\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
									'<tr height=\'30\'>',
									'<td width=\'7%\' class=\'bordertop borderleft\'>编码：</td>',
									'<td width=\'15%\' class=\'bordertop\'>{QtWlCode}</td>',
									'<td width=\'21%\' class=\'bordertop\'>物料：</td>',
									'<td width=\'24%\' class=\'bordertop\'>{QtWlName}</td>',
									'<td width=\'16%\' class=\'bordertop\'>型号规格：</td>',
									'<td width=\'15%\' class=\'bordertop borderright\'>{QtXhGg}</td>',
									'</tr>',
									'<tr height=\'30\'>',
									'<td class=\'paddingleft borderleft\'>单位：</td>',
									'<td class=\'paddingleft\'>{QtUnit}</td>',
									'<td class=\'paddingleft\'>物料成本价（含税）：</td>',
									'<td class=\'paddingleft\'>{QtWlCbjBhs}</td>',
									'<td class=\'paddingleft\'>物料结算价：</td>',
									'<td class=\'borderright\'>{QtWlJsj}</td>',
									'</tr>',
									'<tr height=\'30\'>',
									'<td class=\'borderleft\'>数量：</td>',
									'<td class=\'paddingleft\'>{QtNum}</td>',
									'<td class=\'paddingleft\'>物料成本合计（含税）：</td>',
									'<td class=\'paddingleft\'>{QtWlCbHj}</td>',
									'<td class=\'paddingleft\'>物料结算价合计：</td>',
									'<td class=\'borderright\'>{QtWljsjHjHs}</td>',
									'</tr>',
									'<tr height=\'30\'>',
									'<td class=\'borderleft borderbottom\'>备注：</td>',
									'<td colSpan=5 class=\'borderbottom borderright\'>{QtRemark}</td>',
//									'<td class=\'borderbottom\'></td>',
//									'<td class=\'borderbottom\'></td>',
//									'<td class=\'borderbottom\'></td>',
//									'<td class=\'borderbottom borderright\'></td>',
									'</tr>',
									'</table>'
								]
							},
		                ]
					},
					{
                		xtype: 'container',
		                id: '',
		                title: '维修改造工费',
		                layout:'vbox',
		                items: [
		                	{
				                xtype: 'list',
				                id:'list_R_AssetDetail_GZGF',
				                store: 'R_AssetDetail_GZGFListStore',  
				                flex:1,
				                itemTpl : [
									'<table id=\'\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
									'<tr height=\'30\'>',
									'<td width=\'10%\' class=\'bordertop borderleft borderbottom\'>需求类型：</td>',
									'<td width=\'15%\' class=\'bordertop borderbottom\'>{XqType}</td>',
									'<td width=\'10%\' class=\'bordertop borderbottom\'>需求项：</td>',
									'<td width=\'15%\' class=\'bordertop borderbottom\'>{Xqx}</td>',
									'<td width=\'14%\' class=\'bordertop borderbottom\'>项目作业时间：</td>',
									'<td width=\'11%\' class=\'bordertop borderbottom\'>{XmZyTime}</td>',
									'<td width=\'10%\' class=\'bordertop borderbottom\'>项目物料：</td>',
									'<td width=\'15%\' class=\'bordertop borderright borderbottom\'>{XmWl}</td>',
									'</tr>',
									'</table>'
								]
							},
		                ]
					},
					{
                		xtype: 'container',
		                id: '',
		                title: '其他款项',
		                layout:'vbox',
		                items: [
		                	{
				                xtype: 'list',
				                id:'list_R_AssetDetail_QTKX',
				                store: 'R_AssetDetail_QTKXListStore',  
				                flex:1,
				                itemTpl : [
									'<table id=\'\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
									'<tr height=\'30\'>',
									'<td width=\'13%\' class=\'bordertop borderleft borderbottom\'>款项明细：</td>',
									'<td width=\'20%\' class=\'bordertop borderbottom\'>{KxMx}</td>',
									'<td width=\'13%\' class=\'bordertop borderbottom\'>款项价格：</td>',
									'<td width=\'20%\' class=\'bordertop borderbottom\'>{KxJg}</td>',
									'<td width=\'13%\' class=\'bordertop borderbottom\'>描述：</td>',
									'<td width=\'20%\' class=\'bordertop borderright borderbottom\'>{KxRemark}</td>',
									'</tr>',
									'</table>'
								]
							},
		                ]
					},
                ]
            },
        ]
    }
});

