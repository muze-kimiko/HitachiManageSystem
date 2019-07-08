
/* JavaScript content from app/view/compact/CompactBodyInfoPanel.js in folder common */
Ext.define('HelcPDA.view.compact.CompactBodyInfoPanel', {
	id : 'CompactBodyInfoPanel',
	extend : 'Ext.Panel',
	requires : [ 'Ext.Toolbar', 
	             'Ext.Button',
	             'Ext.Spacer',
	             'Ext.Label',
	             'Ext.dataview.List',
	             'Ext.XTemplate' ],

	config : {
		items : [
			{
		    xtype: 'toolbar',
		    docked: 'top',
		    title: '合同行详细信息',
		    items: [
		        {
		            xtype: 'button',
		            id:'backToHeadPanel',
		            ui: 'back',
		            text: '返回'
		        },
		      ]
			},
			{
                xtype: 'formpanel',
                height: '100%',
                scrollable: true,
                items: [
			{
				xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        label: '站分类',
                        labelWidth: '40%',
                        id:'STATION_TYPE',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '站',
                        labelWidth: '40%',
                        id:'STATION_ORG',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '月在保标识',
                        labelWidth: '40%',
                        id:'MONTH_GRT_FLG',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '营业梯种',
                        labelWidth: '40%',
                        id:'PRODUCT_PART',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '业务分类',
                        labelWidth: '40%',
                        id:'BUSINESS_TYPE',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '提升高度',
                        labelWidth: '40%',
                        id:'ASSET_HEIGHT',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '梯号',
                        labelWidth: '40%',
                        id:'ELEVATOR_MARK',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '所属站',
                        labelWidth: '40%',
                        id:'STATION_ORG',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '所属司',
                        labelWidth: '40%',
                        id:'COMPANY_ORG',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '所属片',
                        labelWidth: '40%',
                        id:'AREA_NAME',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '是否在保',
                        labelWidth: '40%',
                        id:'GRT_FLG',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '三包/保养月份',
                        labelWidth: '40%',
                        id:'GRT_MONTH_NUM',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '品牌',
                        labelWidth: '40%',
                        id:'BRAND',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '年检月份',
                        labelWidth: '40%',
                        id:'INSPECT_MONTH',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '门',
                        labelWidth: '40%',
                        id:'ASSET_DOOR',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'autoTextArea',
                        label: '客户',
                        labelWidth: '40%',
                        id:'ACCNT_NAME',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '急修到达时间',
                        labelWidth: '40%',
                        id:'URGENT_REQ_TIME',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '将到期或到期',
                        labelWidth: '40%',
                        id:'UPCOMING_FLG',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '合同状态',
                        labelWidth: '40%',
                        id:'STATUS',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '合同行状态',
                        labelWidth: '40%',
                        id:'LINE_STATUS',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '合同类型',
                        labelWidth: '40%',
                        id:'AGREE_TYPE',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '合同编号',
                        labelWidth: '40%',
                        id:'AGREE_NUM',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '工号',
                        labelWidth: '40%',
                        id:'ASSET_NUM',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'autoTextArea',
                        label: '地盘',
                        labelWidth: '40%',
                        id:'DOMAIN_NAME',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '大楼',
                        labelWidth: '40%',
                        id:'EDIFICE_NAME',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '城市',
                        labelWidth: '40%',
                        id:'CITY',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '层',
                        labelWidth: '40%',
                        id:'ELEVATOR_FLOOR',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'autoTextArea',
                        label: '安装地址',
                        labelWidth: '40%',
                        id:'INSTALL_ADDR',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '(终止)结束期',
                        labelWidth: '40%',
                        id:'CANCEL_DATE',
                        value: [
                        ],
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: '(延长)结束期',
                        labelWidth: '40%',
                        id:'DEFER_DATE',
                        value: [
                        ],
                        readOnly: true
                    },
                    ],
			}]}
		],

	}
});