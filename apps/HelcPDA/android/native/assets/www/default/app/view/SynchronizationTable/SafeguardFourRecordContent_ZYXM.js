
/* JavaScript content from app/view/SynchronizationTable/SafeguardFourRecordContent_ZYXM.js in folder common */


Ext.define('HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_ZYXM', {
    extend: 'Ext.Container',
    id:'SafeguardFourRecordContent_ZYXM_id',
    requires: [
		'Ext.Toolbar',
		'Ext.tab.Panel',
		'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.Spacer',
		'Ext.Button',
		'Ext.dataview.List',
		'Ext.XTemplate'
    ],

    config: {
    	layout: 'vbox',
    	/*scrollable: false,
        height:'100%',*/
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '作业项目所属数据',
                items:[{
                    xtype: 'button',
                    id:'SafeguardFourRecordContent_ZYXM_id_FH',
                    ui: 'back',
                    text: '返回'
                },{
                    xtype: 'spacer'
                },{
                    xtype: 'button',
                    id:'SafeguardFourRecordContent_ZYXM_id_TJ',
                    text: '确定',
                },
                {//当前作业项目的ID
                	id:'SafeguardFourRecordContent_ZYXM_id_ID',
                    xtype: 'hiddenfield',
                },],
            },
            {
            	id:'SafeguardFourRecordContent_ZYXM_id_Tabpanel',
                xtype: 'tabpanel',
                flex: 1,
                items: [
                    {
                    	id:'bzb_zyxm',
                        xtype: 'formpanel',
                        title: '作业项目',
                        //layout: 'vbox',
                        items: [
                            {
                                xtype: 'fieldset',
                                items: [
                                    //------------保障表 独有
									{
										id:'SafeguardFour_MeasureItemPreWork2',
									    xtype: 'textfield',
									    label: '作业前',
									    labelWidth:'40%',
									    required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
									{
										id:'SafeguardFour_MeasureItemPostWork2',
									    xtype: 'textfield',
									    label: '作业后',
									    labelWidth:'40%',
									    required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
									{//作业页前，后 条件ID
				                    	id:'SafeguardFourRecordContent_ZYXM_MeasureProjectId',
				                        xtype: 'hiddenfield',
				                    },
				                    
				                    //------------阶梯表 独有
				                    {
										id:'JTB_MeasureItemNo',
									    xtype: 'textfield',
									    label: '项目号',
									    labelWidth:'40%',
									    //required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
				                    {
										id:'JTB_MeasureItemName',
										xtype: 'autoTextArea',
										label: '项目名称',
										labelWidth:'40%',
										readOnly:true,
										hidden:true,
									},
									{
										id:'JTB_MeasureItemType',
										xtype: 'textfield',
										label: '项目类型',
										labelWidth:'40%',
										readOnly:true,
										hidden:true,
									},
									{
										id:'JTB_MeasureItemContent',
										xtype: 'autoTextArea',
										label: '作业内容',
										labelWidth:'40%',
										readOnly:true,
										hidden:true,
									},
									{
										id:'JTB_MeasureItemStandard',
										xtype: 'autoTextArea',
										label: '作业标准',
										labelWidth:'40%',
										readOnly:true,
										hidden:true,
									},
									//需填写,不自动带出
									{
										id:'JTB_MeasureItemIFGood',
										xtype: 'togglefield',
										label: '是否不良项',
										labelWidth:'40%',
										hidden:true,
									},
									{
										id:'JTB_MeasureItemResponseDivision',
									    xtype: 'textfield',
									    label: '责任部门',
									    labelWidth:'40%',
									    placeHolder: '请选择责任部门',
									    //required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
									//用作业前接口
									{
										id:'JTB_MeasureItemPreWork2',
									    xtype: 'textfield',
									    label: '判断',
									    labelWidth:'40%',
									    placeHolder: '请选择判断',
									    //required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
									{
				                        xtype: 'textfield',
				                        label: '整改完成日期',
				                        id:'JTB_MeasureItemZGCompleteDate',
				                        required:true,
				                        labelWidth:'40%',
				                        placeHolder: '请选择整改完成日期',
				                        readOnly:true,
				                        listeners:{
				                        	focus:function(){
				                        			initDate1('JTB_MeasureItemZGCompleteDate','整改完成日期');
				                        	}
				                        },
				                        hidden:true,
				                    },
				                    {
				                    	id:'JTB_MeasureItemZGWorkTime',
				                    	xtype:'numberfield',
				                    	label:'整改人工时',
				                    	labelWidth:'40%',
				                    	placeHolder:'人*小时',
				                    	required:true,
				                    	hidden:true,
				                    },
				                    {
										id:'JTB_MeasureItemZGDivision',
									    xtype: 'textfield',
									    label: '整改部门',
									    labelWidth:'40%',
									    placeHolder: '请选择整改部门',
									    //required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
				                    {
										id:'JTB_MeasureItemResponsePersonLastName',
									    xtype: 'textfield',
									    label: '整改责任人',
									    labelWidth:'40%',
									    placeHolder: '请选择整改责任人',
									    //required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
									{//整改责任人ID
				                    	id:'JTB_MeasureItemResponsePersonLastName_ID',
				                        xtype: 'hiddenfield',
				                    },
									{
				                    	id:'JTB_MeasureItemReCheckTime',
				                        xtype: 'textfield',
				                        label: '复检日期',
				                        labelWidth:'40%',
				                        placeHolder: '可输入复检日期',
				                        listeners:{
				                        	focus:function(){
				                        		initDate1('JTB_MeasureItemReCheckTime','复检日期');
				                        	}
				                        },
				                        readOnly:true,
				                        hidden:true,
				                    },
									{
										id:'JTB_MeasureItemReCheckPersonLastName',
									    xtype: 'textfield',
									    label: '复检人',
									    labelWidth:'40%',
									    placeHolder: '请选择整复检人',
									    //required:true,
									    listeners:[{
									    	fn:function(component,eOpts){
									    		var me=this;
									    		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
									    	},
									    	event:'initialize'
									    }],
									    readOnly:true,
									    hidden:true,
									},
									{//复检人ID
				                    	id:'JTB_MeasureItemReCheckPersonLastName_ID',
				                        xtype: 'hiddenfield',
				                    },
									{//写死，不用修改，只是拿来看
										xtype: 'togglefield',
										label: '是否测量项目',
										labelWidth:'40%',
										value:1,
									    readOnly:true,
										hidden:true,
									},
									
									//---------------公共的
									{//位置
				                    	id:'SafeguardFourRecordContent_ZYXM_index',
				                        xtype: 'hiddenfield',
				                    },
				                    
                                ]
                            }
                        ]
                    },
                    
                    //---------------‘保障表’和‘阶梯表’ 公用
                    {
                    	id:'bzb_jtb_lzxm',
                        xtype: 'container',
                        title: '录值项目',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'list',
                                id:'SafeguardFourRecordContent_ZYXM_id_LZXM_list',
                                margin: '0 0 0 0',
                                flex: 1,
                                store:'SynchronizationTable_LZXM_Store',
                                itemTpl: [
                                    '<div>'+
                                    '<div>录入内容 :{MeasureRecordContent}</div>'+
                                    '<div>录入值:{MeasureRecordValue}</div>'+
                                    '<div>说明:{MeasureRecordDescription}</div>'+
                                    '</div>',
                                ]
                            }
                        ]
                    },
                    //------------保障表 独有
                    {
                    	id:'bzb_fj',
                    	//hidden:true,
                        xtype: 'container',
                        title: '附件',
                        layout: 'vbox',
                        items: [
							{
							    xtype: 'segmentedbutton',
							    centered: false,
							    margin: 10,
							    items: [
							        {
							            xtype: 'button',
							            id:'SafeguardFourRecordContent_ZYXM_id_FJ_camear',
							            text: '相机'
							        },
							        {
							            xtype: 'button',
							            id:'SafeguardFourRecordContent_ZYXM_id_FJ_album',
							            text: '相册'
							        }
							    ]
							},
                            {
                                xtype: 'dataview',
                                flex: 1,
                                margin: '50 0 0 0',
                                id:'SafeguardFourRecordContent_ZYXM_id_FJ_list',
                                itemTpl: [
                                          '<div style="width:33%;height:100px;float:left;">',
                                          '<div style="width:100px;height:100px;float:left;">',
                                          '    <img style="margin:5px 5px" width="64px" height="64px" src="{MeasureItemAttachFileBuffer3}"/>',
                                          '</div>',
                                          '</div>',
                                      ],
                                 store: 'SynchronizationTable_FJ_Store',
                            }
                        ]
                    },
                ]
            }
        ]
    }

});

/*{
id:'MeasureItemNo',
xtype: 'textfield',
label: '项目号',
labelWidth:'40%',
listeners:[{
	fn:function(component,eOpts){
		var me=this;
		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
	},
	event:'initialize'
}],
//readOnly:true,
},
{
id:'MeasureItemMaxValue',
xtype: 'numberfield',
label: '作业项目最大值',
labelWidth:'40%',
},
{
id:'MeasureItemMaxValue',
xtype: 'numberfield',
label: '作业项目最小值',
labelWidth:'40%',
},
{
id:'MeasureItemLocaleFlag',
xtype: 'togglefield',
label: '地域项目',
labelWidth:'40%',
},*/