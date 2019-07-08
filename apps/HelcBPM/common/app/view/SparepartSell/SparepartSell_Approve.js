Ext.define('HelcBPM.view.SparepartSell.SparepartSell_Approve', {
    extend: 'Ext.Container',
    id:'SparepartSell_Approve',
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
                title: '配件销售报价审批',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_SPSapprove_back',
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
                                        id: 'BjOrderNo',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:120,
                                        label: '订单编号：',
                                        readOnly: true,
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'BjClientName',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:130,
                                        label: '客户：',
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'BjBjVersion',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:120,
                                        label: '报价版本：',
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
                                        xtype: 'autoTextArea',
                                        id: 'BjOrderName',
                                        style: 'float: left',
                                        width: '100%',
                                        labelWidth:120,
                                        label: '订单备注：',
                                        readOnly: true
                                    }
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
	                                    labelWidth:200,
	                                    width: '33.33%',
	                                    label: '物料折后SPL合计：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'WlQwJHj',
	                                    style: 'float: left',
	                                    labelWidth:220,
	                                    width: '33.33%',
	                                    label: '物料期望价合计(含税)：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'BjSpFl',
	                                    style: 'float: left',
	                                    labelWidth:130,
	                                    width: '33.33%',
	                                    label: '审批浮率(%)：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'OrderCountMoney',
	                                    style: 'float: left',
	                                    labelWidth:200,
	                                    width: '33.33%',
	                                    label: '订单总金额（含税）：',
	                                    labelWrap : true,
	                                    readOnly: true,
	                                    hidden:	true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'OrderMoney',
	                                    style: 'float: left',
	                                    labelWidth:200,
	                                    width: '33.33%',
	                                    label: '订单税金：',
	                                    labelWrap : true,
	                                    readOnly: true,
	                                    hidden:	true
	                                },
			                        {
			                            xtype: 'textfield',
			                            id: '',
			                            style: 'float: left',
			                            labelWidth:200,
			                            width: '33.33%',
			                            label: '空白',
			                            labelCls:'font_white',
			                            labelWrap : true,
			                            readOnly: true,
			                            hidden:	true
			                        },
//                                    {
//                                        xtype: 'textareafield',
//                                        id: 'BjRemark',
//                                        style: 'float: left',
//                                        width: '100%',
//                                        labelWidth:200,
//                                        label: '报价说明：',
//                                        readOnly: true
//                                    }
	                            ]
	                        }
                        ]
                    },
	                {
		                xtype: 'container',
		                id: '',
		                title: '配件报价明细',
		                layout:'vbox',
		                items: [
		                	/*
		                    {
		                    	xtype: 'formpanel',
		                        height: 248,
		                        scrollable: false,
		                        items: [
		                            {
		                            	xtype: 'fieldset',
		                                title: '项目情况',
		                                items: [
		                                    {
		                                        xtype: 'textfield',
		                                        id: '',
		                                        style: 'float: left',
		                                        inputCls:'align-right',
		                                        width: '50%',
		                                        labelWidth:120,
		                                        label: '订单编号：',
		                                        readOnly: true,
		                                    },
		                                    {
		                                        xtype: 'textfield',
		                                        id: '',
		                                        style: 'float: left',
		                                        inputCls:'align-right',
		                                        width: '50%',
		                                        labelWidth:120,
		                                        label: '客户：',
		                                        readOnly: true
		                                    },
		                                    {
		                                        xtype: 'textfield',
		                                        id: '',
		                                        style: 'float: left',
		                                        inputCls:'align-right',
		                                        width: '50%',
		                                        labelWidth:120,
		                                        label: '报价版本：',
		                                        readOnly: true
		                                    },
		                                    {
		                                        xtype: 'textfield',
		                                        id: '',
		                                        style: 'float: left',
		                                        inputCls:'align-right',
		                                        width: '50%',
		                                        labelWidth:120,
		                                        label: '维保大客户：',
		                                        readOnly: true
		                                    },
		                                    {
		                                        xtype: 'textareafield',
		                                        id: '',
		                                        style: 'float: left',
		                                        width: '100%',
		                                        labelWidth:120,
		                                        label: '订单备注：',
		                                        readOnly: true
		                                    }
										]
		                            },
		                            {
		                            	xtype: 'fieldset',
		                                title: '物料明细',
		                            }
		                        ]
							},
							*/
			            	{
			                    xtype: 'list',
			                    id:'list_pjbjmx',
			                    store: 'pjbjmxListStore',  
			                    flex:1,
			                    itemTpl: [
			                    /*
			                        //'<tpl if="GhNo%2==1">',
									//'<table style=\'background-color: aliceblue;\' align=\'center\' width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'>',
									//'<tpl else>',
									'<table id=\'{WlCode}\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
									//'</tpl>',
                                    '<tr height=\'30\'>',
                                    '<td width=\'12%\' rowSpan=\'2\' class=\'bordertop borderleft bigfont\'>编码：</td>',
                                    '<td width=\'19%\' rowSpan=\'2\' class=\'bordertop bigfont\'>{WlCode}</td>',
                                    '<td width=\'19%\' class=\'bordertop\'>大客户折扣率：</td>',
                                    '<td width=\'15%\' class=\'bordertop\'>{DkhZkl}</td>',
                                    '<td width=\'19%\' class=\'bordertop\'>单个物料期望价（不含税）：</td>',
                                    '<td width=\'15%\' class=\'bordertop borderright\'>{DgWlQwj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
//                                    '<td style=\'border-left:1.0pt solid black;padding-left:5px\'>物料:</td>',
//                                    '<td style=\'text-align:left;padding-left:5px;\'><a href=\'#\' onclick="javascript:ShowWL(\'{WlCode}\',\'{WlName}\');">点击查看物料</a></td>',
                                    '<td class=\'paddingleft\'>大客户协议价（含税）：</td>',
                                    '<td class=\'paddingleft\'>{DkhXyjHs}</td>',
                                    '<td class=\'paddingleft\'>单个物料期望价（含税）：</td>',
                                    '<td class=\'borderright\'>{DgwlQwjHs}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>物料：</td>',
                                    '<td colSpan=\'5\' class=\'borderright\'>{WlName}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>数量：</td>',
                                    '<td class=\'paddingleft\'>{Num}</td>',
                                    '<td class=\'paddingleft\'>工厂标准成本：</td>',
                                    '<td class=\'paddingleft\'>{GcBzCb}</td>',
                                    '<td class=\'paddingleft\'>物料期望价合计（不含税）：</td>',
                                    '<td class=\'borderright\'>{WlQwjHj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>SP计算方式：</td>',
                                    '<td class=\'paddingleft\'>{SpJsFs}</td>',
                                    '<td class=\'paddingleft\'>（预计）分公司采购成本：</td>',
                                    '<td class=\'paddingleft\'>{YjFgsCgCb}</td>',
                                    '<td class=\'paddingleft\'>税金合计：</td>',
                                    '<td class=\'borderright\'>{SjHj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>SP1：</td>',
                                    '<td class=\'paddingleft\'>{Sp1}</td>',
                                    '<td class=\'paddingleft\'>（预计）销售利润率：</td>',
                                    '<td class=\'paddingleft\'>{YjXsLrl}</td>',
                                    '<td class=\'paddingleft\'>物料期望价合计（含税）：</td>',
                                    '<td class=\'borderright\'>{WlqwjHjHs}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>SP2：</td>',
                                    '<td class=\'paddingleft\'>{Sp2}</td>',
                                    '<td class=\'paddingleft\'>SPL：</td>',
                                    '<td class=\'paddingleft\'>{Spl}</td>',
                                    '<td class=\'paddingleft\'>物料行浮率（%）：</td>',
                                    '<td class=\'borderright\'>{WlhFl}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft borderbottom\'>SPL折后：</td>',
                                    '<td class=\'borderbottom\'>{SplZh}</td>',
                                    '<td class=\'borderbottom\'></td>',
                                    '<td class=\'borderbottom\'></td>',
                                    '<td class=\'borderbottom\'></td>',
                                    '<td class=\'borderbottom borderright\'></td>',
                                    '</tr>',
                                    '</table>'
                                */
			                    
									'<table id=\'{WlCode}\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
                                    '<tr height=\'30\'>',
                                    '<td width=\'20%\' class=\'bordertop borderleft\'>编码：</td>',
                                    '<td width=\'12%\' class=\'bordertop\'>{WlCode}</td>',
                                    '<td width=\'14%\' class=\'bordertop\'>物料：</td>',
                                    '<td colSpan=\'3\' class=\'bordertop borderright\'>{WlName}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'paddingleft borderleft\'>数量：</td>',
                                    '<td class=\'paddingleft\'>{Num}</td>',
                                    '<td class=\'paddingleft\'>SP1：</td>',
                                    '<td class=\'paddingleft\'>{Sp1}</td>',
                                    '<td width=\'22%\' class=\'paddingleft\'>单个物料期望价(含税)：</td>',
                                    '<td width=\'17%\' class=\'borderright\'>{DgwlQwjHs}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>工厂标准成本：</td>',
                                    '<td class=\'paddingleft\'>{GcBzCb}</td>',
                                    '<td class=\'paddingleft\'>SP2：</td>',
                                    '<td class=\'paddingleft\'>{Sp2}</td>',
                                    '<td class=\'paddingleft\'>物料期望价合计(含税)：</td>',
                                    '<td class=\'borderright\'>{WlqwjHjHs}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>(预计)分公司采购成本：</td>',
                                    '<td class=\'paddingleft\'>{YjFgsCgCb}</td>',
                                    '<td class=\'paddingleft\'>SPL：</td>',
                                    '<td class=\'paddingleft\'>{Spl}</td>',
                                    '<td class=\'paddingleft\'>物料行浮率(%)：</td>',
                                    '<td class=\'borderright\'>{WlhFl}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft borderbottom\'>SP计算方式：</td>',
                                    '<td class=\'borderbottom\'>{SpJsFs}</td>',
//                                    '<td class=\'paddingleft\'>大客户协议价（含税）：</td>',
//                                    '<td class=\'paddingleft\'>{DkhXyjHs}</td>',
                                    '<td class=\'borderbottom\'>大客户折扣率：</td>',
                                    '<td class=\'borderbottom\'>{DkhZkl}</td>',
                                    '<td class=\'borderbottom\'>(预计)销售利润率(%)：</td>',
                                    '<td class=\'borderbottom borderright\'>{YjXsLrl}</td>',
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
	                                    id: 'SpOrderNo',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:120,
	                                    label: '订单编号：',
	                                    readOnly: true,
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpClientName',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:130,
	                                    label: '客户：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpBjVersion',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:120,
	                                    label: '报价版本：',
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
	                                    xtype: 'autoTextArea',
	                                    id: 'SpOrderName',
	                                    style: 'float: left',
	                                    width: '100%',
	                                    labelWidth:120,
	                                    label: '订单备注：',
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
	                                    labelWidth:130,
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
	                                    labelWidth:240,
	                                    label: '(预计)订单销售利润率(%)：',
	                                    readOnly: true
	                                },
//	                                {
//	                                    xtype: 'textfield',
//	                                    id: '',
//	                                    style: 'float: left',
//	                                    width: '50%',
//	                                    labelWidth:160,
//	                                    label: '空白',
//			                            labelCls:'font_white',
//	                                    readOnly: true
//	                                },
	                                {
	                                    xtype: 'autoTextArea',
	                                    id: 'SPS_note',
	                                    style: 'float: left',
	                                    inputCls:'input-backgroundcolor-FFF8DC',
	                                    width: '100%',
	                                    labelWidth:130,
	                                    label: '审批意见：'
	                                }
								]
							},
			                {
			                    xtype: 'fieldset',
			                    title: '本次审批历史',
			                    margin: '',
			                    padding: 5,
			                    html: '<table id="SparepartSell_Table_History" style=\'text-align:center;\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing="0">' +
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
			                        {xtype:'hiddenfield',	id:'h_dataPanelMan',	value:''},
			                        {xtype: 'spacer'},
			                        {
			                            xtype: 'button',
			                            style: 'float: left',
			                            id:'btn_SPSapprove_agree',
			                            ui: 'confirm',
			                            width: '30%',
			                            height: '60px',
			                            text: '同意'
			                        },
			                        {xtype: 'spacer'},
			                        {
			                            xtype: 'button',
			                            style: 'float: left',
			                            id:'btn_SPSapprove_reject',
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

