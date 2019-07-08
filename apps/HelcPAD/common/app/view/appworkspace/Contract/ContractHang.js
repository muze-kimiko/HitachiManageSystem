/**
 * 合同行详细资料
 */
Ext.define('HelcPAD.view.appworkspace.Contract.ContractHang', {
    extend: 'Ext.Container',
    id:'contracthang_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
    	layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '合同行资料',
                items: [
                    {
                    	id:'contracthang_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },{
                    	id:'btn_techParams_Search',
                        xtype: 'button',
                        cls:'textf',
                        //ui: 'back',
                        text: '技术附页'
                    },
                ]
            },
            {
	            xtype: 'formpanel',
	            flex: 1,
	            height: 600,
	            items: [
	                {
	                    xtype: 'fieldset',
//	                    title: '',
	                    items: [
	                        {
	                        	id:'CHang_AssetNumber',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '工号',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_EquipMark',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '设备编号',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_ProductName',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '梯种',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_SpNumber',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '设备型号',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_CZM',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '层/站/门',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_Attrib1',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '直梯提升高度',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_Jd',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '扶梯角度',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_Fttsgd',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '扶梯提升高度',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CHang_Attrib2',
	                        	xtype: 'autoTextArea',
                                cls:'textf',
                                labelWidth: '35%',
                                label: '使用单位',
                                readOnly:true,
	                        },
	                        /*{
	                        	id:'CHang_TechSubmitDate',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '45%',
                                label: '提交技术审核日期',
                                readOnly:true,
	                        },
	                        {
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '45%',
                                label: '工号周期分类',
                                readOnly:true,
	                        },
	                        {
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '45%',
                                label: '安装地址',
                                readOnly:true,
	                        },
	                        {
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '45%',
                                label: '梯种说明',
                                readOnly:true,
	                        },
	                        {
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '45%',
                                label: '投影长度',
                                readOnly:true,
	                        }*/
	                    ]
	                }
	            ]
            }
    ]}
});         	