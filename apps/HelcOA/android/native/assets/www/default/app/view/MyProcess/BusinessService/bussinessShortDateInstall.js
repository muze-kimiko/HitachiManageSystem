
/* JavaScript content from app/view/MyProcess/BusinessService/bussinessShortDateInstall.js in folder common */
Ext.define('HelcOA.view.HasEnded.BusinessService.bussinessShortDateInstall', {
    extend: 'Ext.Panel',
    id: 'yjs_bussinessShortDateInstall_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.TextArea'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'wdlc_surface_ID',
                title: '短安装期合同申报联络书',
                items: [
                        {
                            xtype: 'button',
                            ui: 'back',
                            text: '返回',
                            id: 'wdlc_returnMyProcess'
                        }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'fileno',
                                placeHolder: '请输入编号',
                                required: true,
                            	readOnly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                label: '申报单位',
                                labelWidth: '40%',
                                name: 'subject',
                            	readOnly:true,
                                placeHolder: '请输入申报单位'
                            },
                            {
                                xtype: 'textfield',
                                id: 'lxdh',
                                label: '联系电话',
                                labelWidth: '40%',
                                name: 'lxdh',
                            	readOnly:true,
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'ssqy',
                                label: '所属区域',
                                labelWidth: '40%',
                                name: 'ssqy',
                                placeHolder: '请输入所属区域'
                            },
							{
                                xtype: 'textfield',
                                id: 'jxdw',
                                label: '经销单位',
                                labelWidth: '40%',
                                name: 'jxdw',
                            	readOnly:true,
                                placeHolder: '请输入经销单位'
                            },
							{
                                xtype: 'textfield',
                                id: 'jhdate',
                                label: '申请交货时间',
                                labelWidth: '40%',
                                name: 'jhdate',
                                placeHolder: '请选择日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('jhdate','申请交货时间');
                                	}
                                }
                            },
							{
                                xtype: 'textfield',
                                id: 'htmf',
                                label: '合同买方',
                                labelWidth: '40%',
                                name: 'htmf',
                            	readOnly:true,
                                placeHolder: '请输入合同买方'
                            },
							{
                                xtype: 'textfield',
                                id: 'htno',
                                label: '合同号',
                                labelWidth: '40%',
                                name: 'htno',
                            	readOnly:true,
                                placeHolder: '请输入合同号'
                            },
							{
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'xh1',
                                    	readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '层/站/门倾角',
                                        labelWidth: '40%',
                                        id: 'czm1',
                                    	readOnly:true,
                                        placeHolder: '请输入层/站/门倾角'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '备注',
                                        labelWidth: '40%',
                                        id: 'remart1',
                                    	readOnly:true,
                                        placeHolder: '请输入备注'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '台数',
                                        labelWidth: '40%',
                                        id: 'ts1',
                                    	readOnly:true,
                                        placeHolder: '请输入台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '工期',
                                        labelWidth: '40%',
                                        id: 'gq1',
                                    	readOnly:true,
                                        placeHolder: '请输入工期'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到现场时间',
                                        labelWidth: '40%',
                                        id: 'yjdate1',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置时间',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('yjdate1','预计到现场时间');
                                        	}
                                        }
                                    },
                                ]
                            },
							{
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'xh2',
                                    	readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '层/站/门倾角',
                                        labelWidth: '40%',
                                        id: 'czm2',
                                    	readOnly:true,
                                        placeHolder: '请输入层/站/门倾角'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '备注',
                                        labelWidth: '40%',
                                        id: 'remart2',
                                    	readOnly:true,
                                        placeHolder: '请输入备注'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '台数',
                                        labelWidth: '40%',
                                        id: 'ts2',
                                    	readOnly:true,
                                        placeHolder: '请输入台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '工期',
                                        labelWidth: '40%',
                                        id: 'gq2',
                                    	readOnly:true,
                                        placeHolder: '请输入工期'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到现场时间',
                                        labelWidth: '40%',
                                        id: 'yjdate2',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置时间',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('yjdate2','预计到现场时间');
                                        	}
                                        }
                                    },
                                ]
                            },
							{
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'xh3',
                                    	readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '层/站/门倾角',
                                        labelWidth: '40%',
                                        id: 'czm3',
                                    	readOnly:true,
                                        placeHolder: '请输入层/站/门倾角'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '备注',
                                        labelWidth: '40%',
                                        id: 'remart3',
                                    	readOnly:true,
                                        placeHolder: '请输入备注'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '台数',
                                        labelWidth: '40%',
                                        id: 'ts3',
                                    	readOnly:true,
                                        placeHolder: '请输入台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '工期',
                                        labelWidth: '40%',
                                        id: 'gq3',
                                    	readOnly:true,
                                        placeHolder: '请输入工期'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到现场时间',
                                        labelWidth: '40%',
                                        id: 'yjdate3',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置时间',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('yjdate3','预计到现场时间');
                                        	}
                                        }
                                    },
                                ]
                            },
							{
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: '型号',
                                        labelWidth: '40%',
                                        id: 'xh4',
                                    	readOnly:true,
                                        placeHolder: '请输入型号'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '层/站/门倾角',
                                        labelWidth: '40%',
                                        id: 'czm4',
                                    	readOnly:true,
                                        placeHolder: '请输入层/站/门倾角'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '备注',
                                        labelWidth: '40%',
                                        id: 'remart4',
                                    	readOnly:true,
                                        placeHolder: '请输入备注'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '台数',
                                        labelWidth: '40%',
                                        id: 'ts4',
                                    	readOnly:true,
                                        placeHolder: '请输入台数'
                                    },
									{
                                        xtype: 'textfield',
                                        label: '工期',
                                        labelWidth: '40%',
                                        id: 'gq4',
                                    	readOnly:true,
                                        placeHolder: '请输入工期'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '预计到现场时间',
                                        labelWidth: '40%',
                                        id: 'yjdate4',
                                        dateFormat: 'Y-m-d',
                                        readOnly:true,
                                        placeHolder: '点击设置时间',
                                        listeners:{
                                        	focus:function(){
                                        		initDate2('yjdate4','预计到现场时间');
                                        	}
                                        }
                                    },
                                ]
                            },
                            {
    							xtype: 'fieldset',
    							title: '经办人申报内容申报内容属性',
    							items: [
    							{
    			                                xtype: 'panel',
    			                                layout: 'hbox',
    			                                items: [
    			                                    {
    			                                        xtype: 'autoTextArea',
    			                                        id:'sbtype',
    			                                        width: '85%',
    			                                        labelWidth: '48%',
    			                                        label: '洽谈商定',
    			                                        placeHolder: '请选择洽谈商定',
    			                                        readOnly:true
    			                                    },
    			                                    {
    			                                        xtype: 'button',
    			                                        id: 'S_sbtype',
    			                                        height: 41,
    			                                        style: 'border:0;',
    			                                        width: '15%',
    			                                        iconCls: 'search',
    			                                        text: '',
    			                                        disabled:true,
    			                                    }
    			                                ]
    			                            },	
    										{
    			                                xtype: 'panel',
    			                                layout: 'hbox',
    			                                items: [
    			                                    {
    			                                        xtype: 'autoTextArea',
    			                                        id:'checkbox2',
    			                                        width: '85%',
    			                                        labelWidth: '48%',
    			                                        label: '投标项目',
    			                                        placeHolder: '请选择投标项目',
    			                                        readOnly:true
    			                                    },
    			                                    {
    			                                        xtype: 'button',
    			                                        id: 'S_sbtype2',
    			                                        height: 41,
    			                                        style: 'border:0;',
    			                                        width: '15%',
    			                                        iconCls: 'search',
    			                                        text: '',
    			                                        disabled:true,
    			                                    }
    			                                ]
    			                            },	
    			                            {
    			                                xtype: 'panel',
    			                                layout: 'hbox',
    			                                items: [
    			                                    {
    			                                        xtype: 'autoTextArea',
    			                                        id:'checkbox3',
    			                                        width: '85%',
    			                                        labelWidth: '48%',
    			                                        label: '合同签订',
    			                                        placeHolder: '请选择合同签订',
    			                                        readOnly:true
    			                                    },
    			                                    {
    			                                        xtype: 'button',
    			                                        id: 'S_sbtype3',
    			                                        height: 41,
    			                                        style: 'border:0;',
    			                                        width: '15%',
    			                                        iconCls: 'search',
    			                                        text: '',
    			                                        disabled:true,
    			                                    }
    			                                ]
    			                            },	
		                      
                                    {
	                                    xtype: 'selectfield',
	                                    id: 'sendmobile',
	                                    name: 'sendmobile',
	                                    label: '是否营公司：',
	                                    labelWidth: '40%',
	                                    labelWidth: '40%',
	                                    readOnly:true,
	                                    placeHolder: '请选择是否营公司',
	                                    options: [
	                                              {
	                                                  text: '否',
	                                                  value: '否'
	                                              },
	                                              {
	                                                  text: '是',
	                                                  value: '是'
	                                              }
	                                          ]
	                                    },						
							{
								xtype : 'textfield',
								label : '要求回复时间',
								id : 'reqdate',
								labelWidth : '40%',
                            	readOnly:true,
								placeHolder : '请输入要求回复时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'reqdate',
												'要求回复时间');
									}
								}
							},
							{
                                xtype: 'autoTextArea',
                                label: '意见',
                                labelWidth: '40%',
                                placeHolder: '请输入意见',
								name: 'textarea_textarea',
								id: 'textarea_textarea'
                            }
						]
					},
                    {
                        xtype: 'fieldset',
                        hidden: true,
                        items: [
                                {
                                    xtype: 'textfield',
                                    id: 'conds',
                                    name: 'conds'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'userid',
                                    name: 'userid'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'type',
                                    name: 'type'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'username',
                                    name: 'username'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'node',
                                    name: 'node'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'ctime',
                                    name: 'ctime'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'piid',
                                    name: 'piid'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'processname',
                                    name: 'processname'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'curauthor',
                                    name: 'curauthor'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'dealmen',
                                    name: 'dealmen'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'ygbh',
                                    name: 'ygbh'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'form',
                                    name: 'form'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'arcpath',
                                    name: 'arcpath'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'arcdate',
                                    name: 'arcdate'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'idea',
                                    name: 'idea'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'endprocessdate',
                                    name: 'endprocessdate'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'audit_list',
                                    name: 'audit_list'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'taskid',
                                    name: 'taskid'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'mast',
                                    name: 'mast'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'firflow',
                                	name: 'firflow'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'pi_flag',
                                	name: 'pi_flag'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'cfg_id',
                                	name: 'cfg_id'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'createflag',
                                	name: 'createflag'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'ext1',
                                	name: 'ext1'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'getdep',
                                	name: 'getdep'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'getno',
                                	name: 'getno'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qaleader',
                                	name: 'qaleader'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'sj_list',
                                	name: 'sj_list'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'nextprocessuser',
                                	name: 'nextprocessuser'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'fnextprocess',
                                	name: 'fnextprocess'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'dept',
                                	name: 'dept'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'agentman',
                                	name: 'agentman'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'createdate',
                                	name: 'createdate'
                                }
                            ]
                    }
                ]
            }
        ]
    }
   ]
 }
});