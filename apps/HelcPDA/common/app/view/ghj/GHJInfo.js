
Ext.define('HelcPDA.view.ghj.GHJInfo', {
    extend: 'Ext.form.Panel',
    id:'GHJInfo_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Checkbox',
        'Ext.field.TextArea'
    ],

    config: {
        items: [
            {
            	id:'header',
                xtype: 'toolbar',
                docked: 'top',
                title: '更换件详细信息',
                items: [
                        {
                        	id:'GHJInfo_id_FH',
                            xtype: 'button',
                            ui: 'back',
                            text: '返回'
                        },{
                        	xtype:'spacer'
                        },
               ]
            },
            {
            	id:'GHJInfo_id_Toolbar',
            	xtype:'toolbar',
            	docked:'top',
            	layout:'hbox',
            	style:'background:#EDEBF1;',
            },
            {
                xtype: 'fieldset',
                title: '基础信息',
                items: [
                    {
                    	id:'ghj_Status',
                    	name:'Status',
                        xtype: 'selectfield',
                        label: '更换件状态',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_SRNumber',
                    	name:'SRNumber',
                        xtype: 'textfield',
                        label: '服务请求编号',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_CompQuantity',
                    	name:'CompQuantity',
                        xtype: 'numberfield',
                        label: '数量',
                        labelWidth:180,
                        required:true,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ReplaceBy',
                    	name:'ReplaceBy',
                        xtype: 'textfield',
                        label: '更换人',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_Type',
                    	name:'Type',
                        xtype: 'selectfield',
                        label: '更换类型',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_RunTime',
                    	name:'RunTime',
                        xtype: 'numberfield',
                        label: '电梯运行次数(次)',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_UsedQuantity',
                    	name:'UsedQuantity',
                        xtype: 'numberfield',
                        label: '使用数量',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ReplaceDate',
                        xtype: 'textfield',
                        label: '更换日期',
                        labelWidth:180,
                        placeHolder: '',
                        listeners:{
                        	focus:function(){
                        			if(!Ext.getCmp('ghj_ReplaceDate').getReadOnly()){
                        				initDate1('ghj_ReplaceDate','更换日期');
                        			};
                        	}
                        },
                        readOnly:true,
                    },
                    {
                    	id:'ghj_PreventiveReplaceFlg',
                    	name:'PreventiveReplaceFlg',
                        xtype: 'selectfield',
                        label: '是否预防更换 ',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_FaultReason',
                    	name:'FaultReason',
                        xtype: 'textfield',
                        label: '故障原因',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_CostExplanation',
                    	name:'CostExplanation',
                        xtype: 'selectfield',
                        label: '费用说明',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ResponsibilityDivision',
                    	name:'ResponsibilityDivision',
                        xtype: 'selectfield',
                        label: '责任划分',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ElevatorType',
                    	name:'ElevatorType',
                    	xtype: 'selectfield',
                    	label: '电梯类型',
                    	labelWidth:180,
                    	placeHolder: '',
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_Parts',
                    	name:'Parts',
                        xtype: 'selectfield',
                        label: '部件所在部位',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_Floor',
                    	name:'Floor',
                        xtype: 'textfield',
                        label: '部件所在楼层',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                ],
                instructions:'多楼层时，请用‘,’分隔',
            },
            {
                xtype: 'fieldset',
                title: '环境因素',
                cls:'textf',
                items: [
                    {
                    	id:'ghj_HighTemperature',
                    	xtype:'checkboxfield',
                    	label:'高温',
                    	labelWidth:180,
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_Wet',
                        xtype: 'checkboxfield',
                        label: '潮湿',
                        labelWidth: 180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_Wind',
                        xtype: 'checkboxfield',
                        label: '大风',
                        labelWidth: 180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_HighBasicity',
                        xtype: 'checkboxfield',
                        label: '高咸碱度',
                        labelWidth: 180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_AirPollution',
                        xtype: 'checkboxfield',
                        label: '空气污染',
                        labelWidth: 180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_Other',
                        xtype: 'checkboxfield',
                        label: '其他',
                        labelWidth: 180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_Normal',
                        xtype: 'checkboxfield',
                        label: '正常使用',
                        labelWidth: 180,
                        readOnly:true,
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '合同工号信息',
                cls:'textf',
                items: [
                    {
                    	id:'ghj_AssetNumber',
                    	name:'AssetNumber',
                        xtype: 'textfield',
                        label: '工号',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_AssetDomainName',
                    	name:'AssetDomainName',
                        xtype: 'textfield',
                        label: '工号地盘',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_AssetEdificeName',
                    	name:'AssetEdificeName',
                        xtype: 'textfield',
                        label: '工号大楼',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_AssetAddress',
                    	name:'AssetAddress',
                    	xtype:'textfield',
                    	label:'工号地址',
                    	labelWidth:180,
                    	placeHolder:'',
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_AgreementNumber',
                    	name:'AgreementNumber',
                    	xtype:'textfield',
                    	label:'合同号',
                    	labelWidth:180,
                    	placeHolder:'',
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_ProductName',
                    	name:'ProductName',
                    	xtype:'textfield',
                    	label:'梯种',
                    	labelWidth:180,
                    	placeHolder:'',
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_ProductPart',
                    	name:'ProductPart',
                    	xtype:'textfield',
                    	label:'梯种型号',
                    	labelWidth:180,
                    	placeHolder:'',
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_ElevatorMark',
                    	name:'ElevatorMark',
                        xtype: 'textfield',
                        label: '梯号',
                        labelWidth:180,
                        placeHolder: '',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_AgreementBusinessType',
                    	name:'AgreementBusinessType',
                        xtype: 'textfield',
                        label: '合同类型 ',                        
                        labelWidth:180,
                        placeHolder:'',
                        readOnly:true,
                    },
                    {
                    	id:'ghj_TechRegisteredDate',
                        xtype: 'textfield',
                        label: '技监发证日期',
                        labelWidth:180,
                        placeHolder: '',
                        listeners:{
                        	focus:function(){
                        		if(!Ext.getCmp('ghj_TechRegisteredDate').getReadOnly()){
                        			initDate1('ghj_TechRegisteredDate','技监发证日期');
                        		};
                        	}
                        },
                        readOnly:true,
                    },
                    {
                    	id:'ghj_HandoverToAccountDate',
                        xtype: 'textfield',
                        label: '移交客户日期',
                        labelWidth:180,
                        placeHolder: '',
                        listeners:{
                        	focus:function(){
                        		if(!Ext.getCmp('ghj_HandoverToAccountDate').getReadOnly()){
                        			initDate1('ghj_HandoverToAccountDate','移交客户日期');
                        		};
                        	}
                        },
                        readOnly:true,
                    },
                    {
                    	id:'ghj_HandoverToMDate',
                        xtype: 'textfield',
                        label: '移交维保日期',
                        labelWidth:180,
                        placeHolder: '',
                        listeners:{
                        	focus:function(){
                        		if(!Ext.getCmp('ghj_HandoverToMDate').getReadOnly()){
                        			initDate1('ghj_HandoverToMDate','移交维保日期');
                        		};
                        	}
                        },
                        readOnly:true,
                    },
                    {
                    	id:'ghj_CompanyOrganization',
                    	name:'CompanyOrganization',
                        xtype: 'textfield',
                        label: '所属司',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_Organization',
                    	name:'Organization',
                        xtype: 'textfield',
                        label: '所属站',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_AreaName',
                    	name:'AreaName',
                    	xtype:'textfield',
                    	label:'所属片',
                    	labelWidth:180,
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_GroupName',
                    	name:'GroupName',
                    	xtype:'textfield',
                    	label:'所属组',
                    	labelWidth:180,
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_KAMpType',
                    	name:'KAMpType',
                        xtype: 'selectfield',
                        label: '大客户标识',
                        labelWidth:180,
                        readOnly:true,
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '更换件信息',
                cls:'textf',
                items: [
					{
						id:'ghj_ComponentFoundFlag',
						name:'ComponentFoundFlag',
					    xtype: 'selectfield',
					    label: '是否找到物料编码',
					    labelWidth:180,
					    placeHolder: '',
					    readOnly:true,
					},
					{
						id:'ghj_ComponentName',
						name:'ComponentName',
					    xtype: 'textfield',
					    label: '物料名称',
					    labelWidth:180,
					    readOnly:true,
					},
					{
						id:'ghj_ComponentReceiptor',
						name:'ComponentReceiptor',
					    xtype: 'textfield',
					    label: '领料人',
					    labelWidth:180,
					    readOnly:true,
					},
                    {
						id:'ghj_RecordedByFullName',
						name:'RecordedByFullName',
                        xtype: 'textfield',
                        label: '录入人',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ComponentCode',
						name:'ComponentCode',
                        xtype: 'textfield',
                        label: '物料编码',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ComponentAliasName',
                    	name:'ComponentAliasName',
                        xtype: 'textfield',
                        label: '名称',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ComponentCompDescription',
						name:'ComponentCompDescription',
                        xtype: 'textfield',
                        label: '型号规格',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_Updated',
                        xtype: 'textfield',
                        label: '录入日期',
                        labelWidth:180,
                        placeHolder: '',
                        listeners:{
                        	focus:function(){
                        		if(!Ext.getCmp('ghj_Updated').getReadOnly()){
                        			initDate1('ghj_Updated','录入日期');
                        		};
                        	}
                        },
                        readOnly:true, 
                    },
                    {
                    	id:'ComponentComp',
						name:'ComponentComp',
                        xtype: 'textfield',
                        label: '图号',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ComponentComments',
						name:'ComponentComments',
                        xtype: 'textfield',
                        label: '物料说明',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ComponentCompUnit',
                    	name:'ComponentCompUnit',
                        xtype: 'textfield',
                        label: '单位',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_OutBoundDate',
                        xtype: 'textfield',
                        label: '出库日期',
                        labelWidth:180,
                        placeHolder: '',
                        listeners:{
                        	focus:function(){
                        		if(!Ext.getCmp('ghj_OutBoundDate').getReadOnly()){
                        			initDate1('ghj_OutBoundDate','出库日期');
                        		};
                        	}
                        },
                        readOnly:true,
                    },
                ]
            },
            {//当数据来源为“分公司领料”才有EBS信息
                id:'GHJInfo_id_FS_EBS',
            	xtype: 'fieldset',
                title: 'EBS信息',
                hidden:true,
                items: [
                    {
                    	id:'ghj_ComponentEBSContractNumber',
                    	name:'ComponentEBSContractNumber',
                        xtype: 'textfield',
                        label: 'EBS合同号',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ComponentOrderNumber',
                    	name:'ComponentOrderNumber',
                        xtype: 'textfield',
                        label: '订单号',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ComponentShipmentNumber',
                    	name:'ComponentShipmentNumber',
                    	xtype: 'textfield',
                    	label: '出库单号',
                    	labelWidth:180,
                    	readOnly:true,
                    },
                    {
                    	id:'ghj_Applicant',
                    	name:'Applicant',
                        xtype: 'textfield',
                        label: '申请人',
                        labelWidth:180,
                        readOnly:true,
                    },
                    {
                    	id:'ghj_ApplicantDate',
                        xtype: 'textfield',
                        label: '申请日期',
                        labelWidth:180,
                        listeners:{
                        	focus:function(){
                        		if(!Ext.getCmp('ghj_ApplicantDate').getReadOnly()){
                        			initDate1('ghj_ApplicantDate','申请日期');
                        		};
                        	}
                        },
                        readOnly:true,
                    },
                ]
            },
            {//网页上没有的我自己添加上去的
                xtype: 'fieldset',
                title: '来源',
                items: [
                    {
                    	id:'ghj_ComponentDataSource',
                    	name:'ComponentDataSource',
                        xtype: 'textfield',
                        label: '数据来源',
                        labelWidth:180,
                        readOnly:true,
                    },
                ]
            },
        ]
    }

});