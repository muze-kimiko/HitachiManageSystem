
/* JavaScript content from app/view/selective_examination/CC_Select.js in folder common */
/**
 * 抽查 选择表  xcx   2014-11-11
 */

Ext.define('HelcPDA.view.selective_examination.CC_Select', {
    extend: 'Ext.Panel',
    id:'CC_Select_id',
    requires: [
		'Ext.Toolbar',
		'Ext.Button',
		'Ext.Spacer',
		'Ext.tab.Panel',
		'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.field.Search',
		'Ext.dataview.List',
		'Ext.XTemplate',
		'Ext.field.DatePicker',
		'Ext.picker.Date'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '保养抽查查询',
                items: [
                    {
                    	 xtype: 'button',
                         ui:'back',
                         text: '主页',
                         id: 'backToMenus',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text:'...',
                        handler: function(button, e) {
                            var menu = Ext.create('Ext.Menu', {
                                items: [
                                {
                                	id:'CC_Select_id_BC',
                                	hidden:true,
                                    text: '保存',
                                    iconCls: 'refresh',
                                    handler:function(button,e){
                                   	 Ext.Viewport.hideMenu('right');
                                   }
                                },
                                {
                                    text: '提交',
                                    iconCls: 'locate',
                                    id:'CC_Select_id_TJ',
                                    handler:function(button,e){
                                      	 Ext.Viewport.hideMenu('right');
                                     }
                                }
                                ]
                            });

                            Ext.Viewport.setMenu(menu, {
                                side: 'right',
                                reveal: false
                            });
                            Ext.Viewport.showMenu('right');
                        },
                  }
                ]
            },
            {	
            	xtype: 'tabpanel',
            	id:'CC_Select_id_tabpanel',
                flex: 1,
                items: [
                    //左边
	                {
	                	xtype: 'container',
	                    title: '整改单头',
	                    height: '100%',
	                    layout: 'vbox',
	                    items: [
							{
								xtype:'formpanel',
							    height: '100%',
							    items:[{
							    	xtype:'fieldset',
							    	title:'   查询信息      查找结果是前20,请尽量精确查询',
							        items:[{
							         	xtype: 'textfield',
									 	label: '电梯工号',
									 	id:'BYGH_ID',
									 	required: true,
									 	labelWidth: '40%',
									 	placeHolder: '请输入电梯工号',
									},{
							         	xtype: 'textfield',
									 	label: '合同号',
									 	id:'CC_HTH',
									 	labelWidth: '40%',
									 	required: true,
									 	readOnly: true
									},{
							         	xtype: 'textfield',
									 	label: '所属司',
									 	id:'CC_SSS',
									 	labelWidth: '40%',
									 	required: true,
									 	readOnly: true
									},{
							         	xtype: 'textfield',
									 	label: '所属站',
									 	id:'CC_SSZ',
									 	labelWidth: '40%',
									 	readOnly: true
									},{
		                                xtype: 'panel',
		                                layout: {
		                                    type: 'hbox',
		                                    align: 'center'
		                                },
		                                items: [
		                                    {
		                                        xtype: 'spacer'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        id:'CC_Select_id_CX',
		                                        margin: '15 0',
		                                        width: '90%',
		                                        text: '查询'
		                                    },
		                                    {
		                                        xtype: 'spacer'
		                                    }
		                                ]
		                            }]
							    },
							    //第二部分
							    {
									xtype: 'fieldset',
			                        title: '单头信息',
			                        items: [{
			                        	xtype: 'textfield',
			                        	id:'CC_SEL_HEADER_ID',
		                                label: '抽查单头ID',
		                                labelWidth: '40%',
			                        },{
			                        	xtype: 'textfield',
			                        	id:'CC_SEL_RUMMAG_CODE',
		                                label: '抽查单编号',
		                                labelWidth: '40%',
		                                required: true,
		                                placeHolder: '请输入抽查单编号',
			                        },{
			                        	xtype: 'textfield',
			                        	id:'CC_SEL_STATUS',
		                                label: '抽查单状态',
		                                labelWidth: '40%',
		                                required: true,
		                                readOnly: true	
			                        },{
							         	xtype: 'textfield',
							         	id:'CC_SEL_MENU_STATUE',
									 	label: '整改状态',
									 	labelWidth: '40%',
									 	placeHolder: '请输入整改状态',
									 	required: true,
									},{
							         	xtype: 'selectfield',
							         	id:'CC_SEL_SECTION_SOURCE',
									 	label: '发起部门',
									 	labelWidth: '40%',
									 	required: true,
									 	options: [
				                          {
				                              text: '分公司',
				                              value: '分公司'
				                          },
				                          {
				                        	  text: '质量部',
				                              value: '质量部'
				                          }
				                        ],
				                        usePicker: 'auto'
									}]
								},
								//第三部分
								{
									xtype: 'fieldset',
			                        title: '抽查人信息',
			                        items: [{
							         	xtype: 'textfield',
							         	id:'CC_SEL_RUMMAGER_ID',
									 	label: '抽查人ID',
									 	labelWidth: '40%',
									 	placeHolder: '请输入抽查人ID',
									 	style: 'float:left',
									 	width:'80%',
									},{
										id:'CC_SEL_RUMMAGER_ID_CX',
			                        	xtype:'button',
			                        	text:'查询',
			                        	width:'20%',
			                        	style: 'float:left',
			                        	margin: '4 0 0 0',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_RUMMAGER_DATE',
									 	label: '抽查日期',
									 	labelWidth: '40%',
									 	width:'100%',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_PREDICT_COMPLETE_DATE',
									 	label: '预计完成日期',
									 	labelWidth: '40%',
									 	width:'100%',
									 	placeHolder: '请输预计完成日期',
									 	listeners:{
		                                	focus:function(){
		                                		initDate1('CC_SEL_PREDICT_COMPLETE_DATE','预计完成日期');
		                                	}
		                                }
									}]
								},
								//第四部分
								{
									xtype: 'fieldset',
			                        title: '保养人信息',
			                        items: [{
							         	xtype: 'textfield',
							         	id:'CC_SEL_MAINTAIN_PERSON_ID',
									 	label: '保养人员ID',
									 	labelWidth: '50%',
									 	placeHolder: '请输入保养人员ID',
									 	required: true,
									 	style: 'float:left',
									 	width:'80%',
									},{
										id:'CC_SEL_MAINTAIN_PERSON_ID_CX',
			                        	xtype:'button',
			                        	text:'查询',
			                        	width:'20%',
			                        	style: 'float:left',
			                        	margin: '4 0 0 0',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_MAINTAIN_PESRON_LEVEL',
									 	label: '保养人员等级',
									 	labelWidth: '40%',
									 	placeHolder: '请输入保养人员等级',
									 	width:'100%',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_AFFIRM_PERSON',
									 	label: '保养确认人',
									 	labelWidth: '50%',
									 	placeHolder: '请输入保养确认人',
									 	style: 'float:left',
									 	width:'80%',
									},{
										id:'CC_SEL_AFFIRM_PERSON_CX',
			                        	xtype:'button',
			                        	text:'查询',
			                        	width:'20%',
			                        	style: 'float:left',
			                        	margin: '4 0 0 0',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_AFFIRM_DATE',
									 	label: '保养确认时间',
									 	labelWidth: '40%',
									 	width:'100%',
									 	placeHolder: '请输入保养确认时间',
									 	listeners:{
		                                	focus:function(){
		                                		initDate1('CC_SEL_AFFIRM_DATE','保养确认时间');
		                                	}
		                                }
									}]
								},
								//第五部分
								{
									xtype: 'fieldset',
			                        title: '整改信息',
			                        items: [{
							         	xtype: 'textfield',
							         	id:'CC_SEL_BRANCH_MAINTAINER_ID',
									 	label: '分公司整改人ID',
									 	labelWidth: '50%',
									 	placeHolder: '请输入分公司整改人ID',
									 	style: 'float:left',
									 	width:'80%',
									},{
										id:'CC_SEL_BRANCH_MAINTAINER_ID_CX',
			                        	xtype:'button',
			                        	text:'查询',
			                        	width:'20%',
			                        	style: 'float:left',
			                        	margin: '4 0 0 0',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_BRANCH_COMPLETE_DATE',
									 	label: '分公司整改完成日期',
									 	labelWidth: '55%',
									 	width:'100%',
									 	placeHolder: '请输入分公司整改完成日期',
									 	listeners:{
		                                	focus:function(){
		                                		initDate1('CC_SEL_BRANCH_COMPLETE_DATE','请输入分公司整改完成日期');
		                                	}
		                                }
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_CONFIRM_PERSON',
									 	label: '整改确认人',
									 	labelWidth: '40%',
									 	placeHolder: '请输入整改确认人',
									 	style: 'float:left',
									 	width:'80%',
									 	
									},{
										id:'CC_SEL_CONFIRM_PERSON_ID',
			                        	xtype:'button',
			                        	text:'查询',
			                        	width:'20%',
			                        	style: 'float:left',
			                        	margin: '4 0 0 0',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_CONFIRM_DATE',
									 	label: '整改确认时间',
									 	labelWidth: '40%',
									 	width:'100%',
									 	placeHolder: '请输入整改确认时间',
									 	listeners:{
		                                	focus:function(){
		                                		initDate1('CC_SEL_CONFIRM_DATE','整改确认时间');
		                                	}
		                                }
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_SUBMIT_DATE',
									 	label: '提交时间',
									 	labelWidth: '40%',
									 	width:'100%',
									 	placeHolder: '请输入整改确认时间',
									 	listeners:{
		                                	focus:function(){
		                                		initDate1('CC_SEL_SUBMIT_DATE','提交时间');
		                                	}
		                                }
									}]
								},
								//第六部分
								{
									xtype: 'fieldset',
			                        title: '审核信息',
			                        items: [{
							         	xtype: 'textfield',
							         	id:'CC_SEL_APPROVE_PERSON',
									 	label: '审核人',
									 	labelWidth: '40%',
									 	placeHolder: '请输入审核人',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_APPROVE_DATE',
									 	label: '审核时间',
									 	labelWidth: '40%',
									 	placeHolder: '请输入审核时间',
									 	listeners:{
		                                	focus:function(){
		                                		initDate1('CC_SEL_APPROVE_DATE','审核时间');
		                                	}
		                                }
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_APPROVE_ADVISE',
									 	label: '审核意见',
									 	labelWidth: '40%',
									 	placeHolder: '请输入审核意见',
									}]
								},
								//第七部分
								{
									xtype: 'fieldset',
			                        title: '评定信息',
			                        items: [{
							         	xtype: 'textfield',
							         	id:'CC_SEL_MP_POINTS',
									 	label: '保养评定分数',
									 	labelWidth: '40%',
									 	placeHolder: '请输入保养评定分数',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_SETUP_QUESTION_QTY',
									 	label: '安装不良数量',
									 	labelWidth: '40%',
									 	placeHolder: '请输入安装不良数量',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_MP_QUESTION_QTP',
									 	label: '保养不良数量',
									 	labelWidth: '40%',
									 	placeHolder: '请输入保养不良数量',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_CUST_QUESTION_QTY',
									 	label: '客户不良数量',
									 	labelWidth: '40%',
									 	placeHolder: '请输入客户不良数量',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_OTHERS_QUESTION_QTY',
									 	label: '其它不良数量',
									 	labelWidth: '40%',
									 	placeHolder: '请输入其它不良数量',
									}]
								},
								//第八部分
								{
									xtype: 'fieldset',
			                        title: '总部信息',
			                        items: [{
							         	xtype: 'selectfield',
							         	id:'CC_SEL_HQ_CONFIRM_FLG',
									 	label: '总部确认',
									 	labelWidth: '40%',
									 	options: [
						                          {
						                              text: '请选择',
						                              value: ''
						                          },
						                          {
						                        	  text: '是',
						                              value: 'Y'
						                          },
						                          {
						                        	  text: '否',
						                              value: 'N'
						                          }
						                        ],
						                        usePicker: 'auto'
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_HQ_CONFIRM_PERSON',
									 	label: '总部确认人',
									 	labelWidth: '40%',
									 	placeHolder: '请输入总部确认人',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_HQ_CONFIRM_DATE',
									 	label: '总部确认时间',
									 	labelWidth: '40%',
									 	placeHolder: '请输入总部确认时间',
									 	listeners:{
		                                	focus:function(){
		                                		initDate1('CC_SEL_HQ_CONFIRM_DATE','总部确认时间');
		                                	}
		                                }
									}]
								},
								//第九部分
								{
									xtype: 'fieldset',
			                        title: '要隐藏的信息',
			                        items: [{
							         	xtype: 'textfield',
							         	id:'CC_SEL_CREATED_BY',
									 	label: '创建人',
									 	labelWidth: '40%',
									 	placeHolder: '请输入创建人',
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_CREATED_BY_ORG',
									 	label: '创建人所在组织',
									 	labelWidth: '40%',
									 	placeHolder: '请输入创建人所在组织',
									},
									//重要
									{
							         	xtype: 'textfield',
							         	id:'CC_SEL_DATA_SOURCE',
									 	label: '数据来源',
									 	labelWidth: '40%',
									 	required: true,
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_IMPORT_STATUS',
									 	label: '导入状态',
									 	labelWidth: '40%',
									 	required: true,
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_CREATION_DATE',
									 	label: '记录创建时间',
									 	labelWidth: '40%',
									 	required: true,
									},{
							         	xtype: 'textfield',
							         	id:'CC_SEL_LAST_UPDATE_DATE',
									 	label: '最后更新时间',
									 	labelWidth: '40%',
									 	required: true,
									}]
								}]
							}
	                    ]	
	                },
	                //中间
	                {
	                	xtype: 'container',
	                    title: '抽查选项',
	                    height: '100%',
	                    layout: 'vbox',
	                    items: [
	                    {
                        	xtype: 'list',
	                        id:'CC_Select_List_CCXX',
	                        height: '90%',
	                        //itemId: 'CC_Select_List_CCXX',
	                        itemTpl: [
							  	 	'<table width="100%" border="0" cellspacing="0" cellpadding="0">',
									'  <tr>',
									'    <td width=31%>序号:{SEQUENCE}</td>',
									'    <td width=30%>扣分:{DEDUCTIONS}</td>',
									'    <td width=30%>责任分类:{QUESTION_TYPE}</td>',
									'    <td width=30%>备注:{COMMENTS}</td>',
									'    <td width=9% style="text-align: right;"><img id="dzx" style="width:22px;" src="images/delete01.png"/></td>',
									'  </tr>',
								'</table>'
	                        ],
	                        onItemDisclosure: true,
	                        store:'HEL_RUMMAG_LINES_Store',
	                    },{
	                    	xtype: 'button',
                            id:'CC_Select_id_ZJ',
                            margin: '2% 5% 2% 5%',
                            width: '90%',
                            height:'6%',
                            text: '新增抽查不良内容'
	                    }
	                   ]
	                },
	                //右边
	                {
	                	xtype: 'container',
	                	id:'CC_Select_id_container_right',
	                    title: '整改内容',
	                    height: '100%',
	                    layout: 'vbox',
	                    //hidden: false,
	                    items: [{
	                    	xtype: 'list',
	                        id:'CC_Select_List_ZGCDNR',
	                        height: '90%',
	                        //itemId: 'CC_Select_List2',
	                        itemTpl: [
	                            '<table width="100%" border="0" cellspacing="0" cellpadding="0">',
	                            '  <tr>',
	                            '    <td width=9%>{SEQUENCE}</td>',
	                            '    <td width=82%>{TASK_NAME}</td>',
	                            '    <td width=9% rowspan="2" style="text-align: right;"><img id="dzxnr" style="width:22px;" src="images/delete01.png"/></td>',
						  	 	'  </tr>',
						  	 	'  <tr>',
	                            //'    <td width=9%>11</td>',
	                            '    <td width=91% colspan="2"><div id="{SEQUENCE}">{MENU_CONTENT}</div></td>',
						  	 	'  </tr>',
						  	 	'</table>'
	                        ],
	                        onItemDisclosure: true,
	                        store:'HEL_CHANGE_MENU_Store',
	                    },{
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [{
                                xtype: 'spacer'
                            },{
                            	xtype: 'button',
                                id:'CC_Select_id_AddZGNR',
                                margin: '15 0',
                                width: '40%',
                                text: '整改内容'
                            },{
                                xtype: 'spacer'
                            },{
                                xtype: 'button',
                                id:'CC_Select_id_TJZGNR',
                                margin: '15 0',
                                width: '40%',
                                text: '提交'
                            },{
                                xtype: 'spacer'
                            }]
                        }]	
	                }]
	         },
//--------------------分离的                
        ]
    }
/*
	initData: function () {
		var zgnr=Ext.getCmp('CC_Select_id_container_right');
		zgnr.setHidden(true);
	},*/

});