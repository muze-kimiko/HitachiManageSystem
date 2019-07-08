Ext.define('HelcBPM.view.Remould.Remould_Approve', {
    extend: 'Ext.Container',
    id:'Remould_Approve',
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
                title: '维修改造报价审批',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_Rapprove_back',
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
                                        labelWidth:120,
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
                                        labelWidth:120,
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
                                        id: 'ClientType',
                                        style: 'float: left',
                                        width: '50%',
                                        labelWidth:120,
                                        label: '客户类型：',
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
                                        labelWidth:120,
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
	                                    id: 'WlCbjHz',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '物料成本价汇总：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'GfBzjHz',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '工费标准价汇总：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
			                            xtype: 'textfield',
			                            id: 'HjBzj',
			                            style: 'float: left',
			                            labelWidth:160,
			                            width: '33%',
			                            label: '合计标准价：',
			                            labelWrap : true,
			                            readOnly: true
			                        },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'WlJsjHz',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '物料结算价汇总：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'GfQwjHz',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '工费期望价汇总：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
			                            xtype: 'textfield',
			                            id: 'HjQwcjj',
			                            style: 'float: left',
			                            labelWidth:160,
			                            width: '33%',
			                            label: '合计期望成交价：',
			                            labelWrap : true,
			                            readOnly: true
			                        },
			                        {
	                                    xtype: 'textfield',
	                                    id: 'WlBzjHz',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '物料标准价汇总：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'GfjgFl',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '工费价格浮率(%)：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
			                            xtype: 'textfield',
			                            id: 'XmFl',
			                            style: 'float: left',
			                            labelWidth:160,
			                            width: '33%',
			                            label: '项目浮率(%)：',
			                            labelWrap : true,
			                            readOnly: true
			                        },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'WlQwjHz',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '物料期望价汇总：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'HjQtfy',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '合计其他费用：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
	                                {
                                        xtype: 'autoTextArea',
                                        id: 'BjRemark',
                                        style: 'width: 33%;float: left',
//                                        width: '99%',
                                        labelWidth:160,
                                        label: '报价说明：',
                                        readOnly: true
                                    },
			                        {
	                                    xtype: 'textfield',
	                                    id: 'WljgFl',
	                                    style: 'float: left',
	                                    labelWidth:170,
	                                    width: '33%',
	                                    label: '物料价格浮率(%)：',
	                                    labelWrap : true,
	                                    readOnly: true
	                                },
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
			                    id:'list_R_ghbjmx',
			                    store: 'R_ghbjmxListStore',  
			                    flex:1,
			                    itemTpl: [
									'<table id=\'\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing=\'0\'>',
                                    '<tr height=\'30\'>',
                                    '<td width=\'12%\' class=\'bordertop borderleft\'>报价行ID：</td>',
                                    '<td width=\'17%\' class=\'bordertop\'>{LineId}</td>',
                                    '<td width=\'20%\' class=\'bordertop\'>单台物料成本价：</td>',
                                    '<td width=\'17%\' class=\'bordertop\'>{DtwlCbj}</td>',
                                    '<td width=\'16%\' class=\'bordertop\'>工费标准价：</td>',
                                    '<td width=\'17%\' class=\'bordertop borderright\'>{GfBzj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'paddingleft borderleft\'>生产工号：</td>',
                                    '<td class=\'paddingleft\'>{Gh}</td>',
                                    '<td class=\'paddingleft\'>单台物料结算价：</td>',
                                    '<td class=\'paddingleft\'>{DtwlJsj}</td>',
                                    '<td class=\'paddingleft\'>工费期望价：</td>',
                                    '<td class=\'borderright\'>{GfQwj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>梯种型号：</td>',
                                    '<td class=\'paddingleft\'>{TzXh}</td>',
                                    '<td class=\'paddingleft\'>单台物料标准价：</td>',
                                    '<td class=\'paddingleft\'>{DtwlBzj}</td>',
                                    '<td class=\'paddingleft\'>其他费用总价：</td>',
                                    '<td class=\'borderright\'>{QtfyZj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>层/站/门：</td>',
                                    '<td class=\'paddingleft\'>{Czm}</td>',
                                    '<td class=\'paddingleft\'>单台物料期望价：</td>',
                                    '<td class=\'paddingleft\'>{DtwlQwj}</td>',
                                    '<td class=\'paddingleft\'>单台电梯标准价：</td>',
                                    '<td class=\'borderright\'>{DtdtBzj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td class=\'borderleft\'>提升高度：</td>',
                                    '<td class=\'paddingleft\'>{Tsgd}</td>',
                                    '<td class=\'paddingleft\'>单台物料价格浮率(%)：</td>',
                                    '<td class=\'paddingleft\'>{DtwlJgFl}</td>',
                                    '<td class=\'paddingleft\'>期望价合计：</td>',
                                    '<td class=\'borderright\'>{QwjHj}</td>',
                                    '</tr>',
                                    '<tr height=\'30\'>',
                                    '<td colSpan=\'6\' class=\'borderleft borderbottom borderright\'><a href=\'#\' onclick="ToWGMaterialDetail(\'{Gh}\',\'{TzXh}\',\'{LineId}\')" >展开物料明细>>></a></td>',
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
	                                    labelWidth:120,
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
	                                    labelWidth:120,
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
	                                    id: 'SpClientType',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:120,
	                                    label: '客户类型：',
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
	                                    labelWidth:120,
	                                    label: '报价版本：',
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
	                                    width: '50%',
	                                    labelWidth:160,
	                                    label: '审批浮率(%)：',
	                                    readOnly: true,
	                                },
	                                {
	                                    xtype: 'textfield',
	                                    id: 'SpType',
	                                    style: 'float: left',
	                                    width: '50%',
	                                    labelWidth:120,
	                                    label: '审批类型：',
	                                    readOnly: true
	                                },
	                                {
	                                    xtype: 'autoTextArea',
	                                    id: 'R_note',
	                                    style: 'float: left',
	                                    inputCls:'input-backgroundcolor-FFF8DC',
	                                    width: '100%',
	                                    labelWidth:160,
	                                    label: '审批意见：'
	                                }
								]
							},
			                {
			                    xtype: 'fieldset',
			                    title: '本次审批历史',
			                    margin: '',
			                    padding: 5,
			                    html: '<table id="Remould_Table_History" style=\'text-align:center;\' align=\'center\' width=\'100%\' border=\'1\' cellpadding=\'0\' cellspacing="0">' +
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
			                        {xtype:'hiddenfield',	id:'h_dataPanelMan2',	value:''},
			                        {xtype:'hiddenfield',	id:'h_BjSjID',	value:''},
			                        {xtype: 'spacer'},
			                        {
			                            xtype: 'button',
			                            style: 'float: left',
			                            id:'btn_Rapprove_agree',
			                            ui: 'confirm',
			                            width: '30%',
			                            height: '60px',
			                            text: '同意'
			                        },
			                        {xtype: 'spacer'},
			                        {
			                            xtype: 'button',
			                            style: 'float: left',
			                            id:'btn_Rapprove_reject',
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

