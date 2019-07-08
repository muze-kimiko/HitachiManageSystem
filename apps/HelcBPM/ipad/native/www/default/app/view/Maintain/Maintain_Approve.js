
/* JavaScript content from app/view/Maintain/Maintain_Approve.js in folder common */
Ext.define('HelcBPM.view.Maintain.Maintain_Approve', {
    extend: 'Ext.Container',
    id:'Maintain_Approve',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.TextArea',
        'Ext.Spacer'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '维护修理报价审批',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_Mapprove_back',
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
                        xtype: 'formpanel',
                        id: '',
                        title: '报价信息总览',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '项目情况',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'BjSjNo',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:130,
                                        label: '商机编号：',
                                        readOnly: true,
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'BjClientName',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:120,
                                        label: '客户：',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'BjSjName',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:130,
                                        label: '商机名称：',
                                        readOnly: true,
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'HtType',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:120,
                                        label: '合同类型：',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'BjWbClientName',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:130,
                                        label: '维保大客户：',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'DtNum',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:120,
                                        label: '电梯台量：',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'BjVersion',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:130,
                                        label: '报价版本：',
                                        readOnly: true
                                    },
								]
							},
                        	{
                                xtype: 'fieldset',
                                title: '报价情况',
                                items: [
	                                {
	                                    xtype: 'textfield',
	                                    id: 'WlZhSplHj',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33.33%',
	                                    label: '物料折后SPL合计：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'WlQwJHj',
	                                    style: 'float: left',
	                                    labelWidth:210,
	                                    width: '33.33%',
	                                    label: '物料期望价合计(含税)：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'ZxrgfHz',
	                                    style: 'float: left',
	                                    labelWidth:160,
	                                    width: '33.33%',
	                                    label: '专项人工费汇总：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'BjSpFl',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33.33%',
	                                    label: '审批浮率(%)：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'OrderMoney',
	                                    style: 'float: left',
	                                    labelWidth:220,
	                                    width: '33.33%',
	                                    label: '订单税金：',
	                                    labelWrap : true,
	                                    readOnly: true,
	                                    hidden: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'OrderCountNum',
	                                    style: 'float: left',
	                                    labelWidth:160,
	                                    width: '33.33%',
	                                    label: '订单总金额：',
	                                    labelWrap : true,
	                                    readOnly: true,
	                                    hidden: true
	                                },
			                        {
			                            xtype: 'textfield',
			                            id: 'OrderCountNumHs',
			                            style: 'float: left',
			                            labelWidth:210,
			                            width: '33.33%',
			                            label: '订单总金额(含税)：',
			                            labelWrap : true,
			                            readOnly: true
			                        },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'BjSpType',
	                                    style: 'float: left',
	                                    labelWidth:120,
	                                    width: '33.33%',
	                                    label: '审批类型：',
	                                    labelWrap : true,
	                                    readOnly: true,
	                                    hidden: true
	                                },
//	                                {
//			                            xtype: 'textfield',
//			                            id: '',
//			                            style: 'float: left',
//			                            inputCls:'align-right',
//			                            labelWidth:200,
//			                            width: '33.33%',
//			                            label: '空白',
//			                            labelCls:'font_white',
//			                            labelWrap : true,
//			                            readOnly: true
//			                        },
			                        {
                                        xtype: 'autoTextArea',
                                        id: 'BjRemark',
                                        style: 'width: 33%;float: left',
                                        labelWidth:160,
                                        label: '报价说明：',
                                        readOnly: true
                                    }
	                            ]
	                        }
                        ]
                    },
	                {
		                xtype: 'container',
		                id: '',
		                title: '工号报价明细',
		                layout:'vbox',
		                items: [
			            	{
			                    xtype: 'list',
			                    id:'list_M_ghbjmx',
			                    store: 'M_ghbjmxListStore',  
			                    flex:1,
			                    itemTpl: [
									'<table id=\'\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
                                    '<tr height=\'30\'>',
                                    '<td width=\'12%\' class=\'bordertop borderleft\'>报价行ID：</td>',
                                    '<td width=\'15%\' class=\'bordertop\'>{LineId}</td>',
                                    '<td width=\'21%\' class=\'bordertop\'>梯种型号：</td>',
                                    '<td width=\'15%\' class=\'bordertop\'>{GhTzXh}</td>',
                                    '<td width=\'22%\' class=\'bordertop\'>电梯状态：</td>',
                                    '<td width=\'15%\' class=\'bordertop borderright\'>{GhDtZt}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>生产工号：</td>',
                                    '<td class=\'paddingleft\'>{Gh}</td>',
                                    '<td class=\'paddingleft\'>工号SPL折后：</td>',
                                    '<td class=\'paddingleft\'>{GhSplZh}</td>',
                                    '<td class=\'paddingleft\'>工号物料期望价浮率(%)：</td>',
                                    '<td class=\'borderright\'>{GhWlQwjFl}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>产品类别：</td>',
                                    '<td class=\'paddingleft\'>{GhCpLb}</td>',
                                    '<td class=\'paddingleft\'>物料期望价合计(含税)：</td>',
                                    '<td class=\'paddingleft\'>{GhWlQwjHjHs}</td>',
                                    '<td class=\'paddingleft\'>专项人工费：</td>',
                                    '<td class=\'borderright\'>{GhZxRgf}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td colSpan=\'6\' class=\'borderleft borderbottom\'><a href=\'#\' onclick="ToWXMaterialDetail(\'{Gh}\',\'{GhTzXh}\',\'{LineId}\')" >展开物料明细>>></a></td>',
                                    '</tr>',
                                    '</table>'
			                    ],
			                },
		                ]
	            	},
                    {
	                    xtype: 'formpanel',
	                    id: '',
	                    title: '审批信息',
	                    items: [
	                        {
	                            xtype: 'fieldset',
	                            title: '项目情况',
	                            items: [    
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpSjNo',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:130,
	                                    label: '商机编号：',
	                                    readOnly: true,
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpClientName',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:120,
	                                    label: '客户：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpSjName',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:130,
	                                    label: '商机名称：',
	                                    readOnly: true,
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpHtType',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:120,
	                                    label: '合同类型：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpWbClientName',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:130,
	                                    label: '维保大客户：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpDtNum',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:120,
	                                    label: '电梯台量：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpBjVersion',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:130,
	                                    label: '报价版本：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'autoTextArea',
	                                    id: 'SpBjRemark',
	                                    style: 'width: 50%;float: left',
	                                    labelWidth:120,
	                                    label: '报价说明：',
	                                    readOnly: true
	                                }
								]
							},
	                        {
	                            xtype: 'fieldset',
	                            title: '审批信息',
	                            items: [    
	                                {
	                                	xtype: 'textfield',
	                                    id: 'SpFl',
	                                    style: 'float: left',
	                                    width: '33.3%',
	                                    labelWidth:140,
	                                    label: '审批浮率(%)：',
	                                    readOnly: true,
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpType',
	                                    style: 'float: left',
	                                    width: '33.3%',
	                                    labelWidth:120,
	                                    label: '审批类型：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'XsLrlGs',
	                                    style: 'float: left',
	                                    width: '33.3%',
	                                    labelWidth:160,
	                                    label: '销售利润估算率：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'autoTextArea',
	                                    id: 'M_note',
	                                    style: 'float: left',
	                                    inputCls:'input-backgroundcolor-FFF8DC',
	                                    width: '100%',
	                                    labelWidth:140,
	                                    label: '审批意见：'
	                                }
								]
							},
			                {
			                    xtype: 'fieldset',
			                    title: '本次审批历史',
			                    margin: '',
			                    padding: 5,
			                    html: '<table id="Maintain_Table_History" style=\'text-align:center;\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing="0">' +
		                    		'<tr>' +
		                    		'<td class="tbl_nobr_one">环节</td>' +
		                    		'<td class="tbl_nobr_one">参与人</td>' +
		                    		'<td class="tbl_nobr_one">审批操作</td>' +
		                    		'<td class="tbl_nobr_one">审批日期</td>' +
		                    		'<td class="tbl_nobr_one">审批意见</td>' +
		                    		'</tr>' +
		                    		'</table>',
			                },
			                {
			                    xtype: 'container',
			                    id: '',
			                    height: '100%',
			                    margin: 20,
			                    layout: 'hbox',
			                    items: [
			                        {xtype:'hiddenfield',	id:'h_docUid',	value:''},
			                        {xtype:'hiddenfield',	id:'h_appId',	value:''},
			                        {xtype:'hiddenfield',	id:'h_taskId',	value:''},
			                        {xtype:'hiddenfield',	id:'h_stepId',	value:''},
			                        {xtype:'hiddenfield',	id:'h_BjSjID',	value:''},
			                        {xtype:'hiddenfield',	id:'h_dataPanelMan',	value:''},
			                        {xtype: 'spacer'},
			                        {
			                            xtype: 'button',
			                            style: 'float: left',
			                            id:'btn_Mapprove_agree',
			                            ui: 'confirm',
			                            width: '30%',
			                            height: '60px',
			                            text: '同意'
			                        },
			                        {xtype: 'spacer'},
			                        {
			                            xtype: 'button',
			                            style: 'float: left',
			                            id:'btn_Mapprove_reject',
			                            ui: 'decline',
			                            width: '30%',
			                            height: '60px',
			                            text: '拒绝'
			                        },
			                        {xtype: 'spacer'}
			                    ]
			                }
	         
	                    ]
                },
                    {
                        xtype: 'container',
                        scrollable :'vertical',
                        id: '',
                        title: '审批历史',
                        html: '<div id="div_scroll_history" class="div_scroll">' +
                        		'<table id="tbl_History" style=\'text-align:center;\' width=\'100%\' align=\'center\' border=\'1\' cellpadding=\'0\' cellspacing="0">' +
                        		'<tr height=\'30\'>' +
                        		'<td class="tbl_nobr">提交次第</td>' +
                        		'<td class="tbl_nobr">参与人</td>' +
                        		'<td class="tbl_nobr">审批操作</td>' +
                        		'<td class="tbl_nobr">审批日期</td>' +
                        		'<td class="tbl_nobr">审批意见</td>' +
                        		'</tr>' +
                        		'</table>' +
                        		'</div>',
                        padding: 5
                    }
                ]
            }
        ]
    }
});

