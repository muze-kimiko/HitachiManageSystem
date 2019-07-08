
/* JavaScript content from app/view/HasEnded/BusinessService/litigationApprove.js in folder common */
Ext.define('HelcOA.view.HasEnded.BusinessService.litigationApprove', {
	extend : 'Ext.Panel',
	id : 'yjs_litigationApprove_id',
	requires : [ 'Ext.Toolbar',
	             'Ext.Button',
	             'Ext.Spacer',
	             'Ext.form.Panel',
	             'Ext.form.FieldSet',
	             'Ext.field.DatePicker',
	             'Ext.picker.Date',
	             'Ext.field.TextArea'],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'yjs_surface_ID',
			title : '诉讼审批流程',
			items : [{
		    	xtype: 'button',
		    	text: '返回',
		        ui: 'back',
		        id: 'yjs_returnHasEnded'
		    }]
		}, 
		{
			xtype : 'formpanel',
			flex : 1,
			id:'fp',
			items : [ 
			{
				xtype:'fieldset',
				title:'',
				items:[{
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '编号',
					labelWidth : '40%',
					readOnly:true,
					placeHolder : '请输入编号'
				}, {
					xtype : 'textfield',
					label : '姓名',
					labelWidth : '40%',
					id : 'agentman',
					name : 'agentman',
					readOnly:true,
					placeHolder : '请输入姓名'
				}, {
					xtype : 'textfield',
					label : '申请部门',
					labelWidth : '40%',
					id : 'dept',
					name : 'dept',
					readOnly:true,
					placeHolder : '请输入申请部门'
				},{
					xtype : 'textfield',
					label : '申请日期',
					labelWidth : '40%',
					id : 'createdate',
					name : 'createdate',
					readOnly:true,
					placeHolder : '请输入申请日期'
				},{
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                        	xtype : 'textfield',
							label : '营业部部长',
							width: '85%',
                            labelWidth: '48%',
							id : 'yyleader',
							name : 'yyleader',
							readOnly:true,
							placeHolder : '请点击选择'
                        },
                        {
                            xtype: 'button',
                            height: 41,
                            id:'seluser248',
                            name:'seluser248',
                            style: 'border:0;',
                            width: '15%',
                            readOnly:true,
                            iconCls: 'search',
                            text: '',
//                            listeners:{
//                            	tap:function(){
//                            		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('yyleader');
//                            	}
//                            }
                        }
                    ]
                },{
					xtype : 'textfield',
					label : '标题',
					labelWidth : '40%',
					id : 'subject',
					name : 'subject',
					readOnly:true,
					placeHolder : '请输入标题'
				}]
				},
				{
					xtype:'fieldset',
					title:'是否曾申请发律师函催收',
					instructions:'客户信息',
					items:[{
						xtype : 'selectfield',
						label : '曾发律师函',
//						required : true,
						readOnly:true,
						id : 'isapply',
						name : 'isapply',
						labelWidth : '40%',
						options : [{
							text:'请选择',
							value:''
						},{
							text : '否',
							value:'否'
						},{
							text : '是',
							value:'是'
						}]
					},{
						xtype:'textfield',
						label:'发出时间',
						labelWidth : '40%',
						id:'applytime',
						name:'applytime',
						readOnly:true,
						placeHolder:'请输入律师函发出时间',
//						listeners:{
//                        	focus:function(){
//                        		initDate2('applytime','发出时间');
//                        	}
//                        }
					},{
						xtype : 'textfield',
						label : '申请流水号',
						id : 'lshfileno',
						labelWidth : '40%',
						readOnly:true,
						placeHolder : '律师涵申请流程流水号',
						name : 'lshfileno',
					}]
				},
				{
					xtype : 'fieldset',
//					instructions:'合同相关信息',
					title : '注：客户信息请详实填写',
//					，以便律师函准确送达
					items : [{
						xtype : 'textfield',
						label : '合同号',
						labelWidth : '40%',
						id : 'hth',
						name : 'hth',
						readOnly:true,
						required:true,
						placeHolder : '请输入合同号'
					},{
						xtype : 'selectfield',
						label : '项目性质',
						labelWidth : '40%',
						id : 'xmxz',
						name : 'xmxz',
						required:true,
						readOnly:true,
						options:[{
							text:'请选择',
							value:''
						},{
							text:'住宅',
							value:'住宅',
						},{
							text:'写字楼',
							value:'写字楼'
						},{
							text:'商业',
							value:'商业'
						}]
					},{
						xtype : 'textfield',
						label : '合同买方名',
						id : 'dwmc1',
						name : 'dwmc1',
						labelWidth : '40%',
						required:true,
						readOnly:true,
						placeHolder : '请输入合同买方名称'
					},{
						xtype : 'textfield',
						label : '买方地址',
						id : 'dwdz1',
						name : 'dwdz1',
						labelWidth : '40%',
						required:true,
						readOnly:true,
						placeHolder : '请输入买方单位地址'
					},{
						xtype : 'textfield',
						label : '联系电话',
						id : 'phone1',
						name : 'phone1',
						labelWidth : '40%',
						required:true,
						readOnly:true,
						placeHolder : '请输入联系电话'
					},{
						xtype : 'textfield',
						label : '联系人',
						id : 'lxr1',
						name : 'lxr1',
						labelWidth : '40%',
						required:true,
						readOnly:true,
						placeHolder : '请输入联系人'
					},{
						xtype : 'textfield',
						label : '保养单位',
						id : 'bydw',
						name : 'bydw',
						labelWidth : '40%',
						readOnly:true,
						placeHolder : '请输入律师涵申请流程流水号'
					},{
						xtype : 'textfield',
						label : '法定代表人',
						id : 'fzr1',
						name : 'fzr1',
						readOnly:true,
						labelWidth : '40%',
						placeHolder : '请输入法定代表人'
					},{
						xtype : 'textfield',
						label : '邮编',
						id : 'yb1',
						name : 'yb1',
						labelWidth : '40%',
						readOnly:true,
						placeHolder : '请输入邮编'
					}]
				},
				{
					xtype : 'fieldset',
					title:'电梯使用单位',
					items:[{
						xtype : 'textfield',
						label : '使用单位',
						id : 'dwmc2',
						name : 'dwmc2',
						readOnly:true,
						labelWidth : '40%',
						placeHolder : '请输入使用单位'
					},{
						xtype : 'textfield',
						label : '负责人',
						id : 'fzr2',
						name : 'fzr2',
						labelWidth : '40%',
						readOnly:true,
						placeHolder : '请输入负责人'
					},{
						xtype : 'textfield',
						label : '联系人',
						id : 'lxr2',
						name : 'lxr2',
						readOnly:true,
						labelWidth : '40%',
						placeHolder : '请输入联系人'
					}]
				},
				{
					xtype : 'fieldset',
					title:'电梯安装地点',
					instructions:'合同相关信息',
					items:[{
						xtype : 'textfield',
						label : '安装地点',
						id : 'dwdz2',
						readOnly:true,
						name : 'dwdz2',
						labelWidth : '40%',
						placeHolder : '请输入安装地点'
					},{
						xtype : 'textfield',
						label : '联系电话',
						id : 'phone2',
						name : 'phone2',
						readOnly:true,
						labelWidth : '40%',
						placeHolder : '请输入联系电话'
					},{
						xtype : 'textfield',
						label : '邮编',
						id : 'yb2',
						name : 'yb2',
						labelWidth : '40%',
						readOnly:true,
						placeHolder : '请输入邮编'
					},{
						xtype:'selectfield',
						label:'合同应对部',
						id:'htdep',
						name:'htdep',
						required:true,
						readOnly:true,
						labelWidth:'40%',
						options:[{
							text:'请选择',
							value:''
						},{
							text:'营业部',
							value:'营业部'
						},{
							text:'大客户部',
							value:'大客户部'
						},{
							text:'大项目部',
							value:'大项目部'
						}]
					}]
				},
				{
					xtype : 'fieldset',
					title : '',
					items : [{
						xtype : 'selectfield',
						label : '合同类型',
						labelWidth : '40%',
						required : true,
						readOnly:true,
						name : 'httype',
						id : 'httype',
						options:[{
							text:'请选择',
							value:''
						},{
							text:'买卖合同',
							value:'买卖合同'
						},{
							text:'安装合同',
							value:'安装合同'
						},{
							text:'买卖附带安装合同',
							value:'买卖附带安装合同'
						},{
							text:'维保合同',
							value:'维保合同'
						},{
							text:'营销司三方合同',
							value:'营销司三方合同'
						},{
							text:'改造合同',
							value:'改造合同'
						}]
					},{
						xtype : 'textfield',
						label : '签约时间',
						id : 'date',
						name : 'date',
						labelWidth : '40%',
						placeHolder : '请选择签约时间',
						readOnly : true,
//						dateFormat : 'Y-m-d',
//						listeners:{
//							focus:function(){
//								initDate2('date','签约时间');
//							}
//						}
					},{
						xtype:'textfield',
						label:'签约台数',
						labelWidth:'40%',
						id:'ts1',
						name:'ts1',
						placeHolder:'请输入签约台数',
						required:true,
						readOnly:true,
					},{
						xtype:'textfield',
						label:'实履行台数',
						labelWidth:'40%',
						id:'ts2',
						name:'ts2',
						readOnly:true,
						placeHolder:'请输入实际履行台数',
						required:true,
					}]
				},
				{
					xtype:'fieldset',
					title:'买卖合同总额',
					items:[
					       {
					    	   xtype:'textfield',
					    	   label:'合同总额',
					    	   labelWidth:'40%',
					    	   readOnly:true,
					    	   placeHolder:'请输入买卖合同总额',
					    	   id:'htmoney1',
					    	   name:'htmoney1'
					       },{
					    	   xtype:'textfield',
					    	   id:'paymoney1',
					    	   name:'paymoney1',
					    	   label:'已付款金额',
					    	   readOnly:true,
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入已付款金额'
					       },{
					    	   xtype:'textfield',
					    	   id:'notpaymoney1',
					    	   name:'notpaymoney1',
					    	   label:'未付款金额',
					    	   readOnly:true,
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入未付款金额'
					       }
					]
				},
				{
					xtype:'fieldset',
					title:'买卖合同未付款项构成',
					items:[{
						xtype:'textfield',
						id:'money1',
						readOnly:true,
						name:'money1',
						label:'货款：定金',
						labelWidth:'40%',
						placeHolder:'请输入货款：定金',
					},{
						xtype:'textfield',
						id:'money2',
						name:'money2',
						readOnly:true,
						label:'预付款',
						placeHolder:'请输入预付款',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'money3',
						name:'money3',
						readOnly:true,
						label:'交货前应付',
						placeHolder:'请输入交货前应付款',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'money4',
						name:'money4',
						label:'货到工地付',
						readOnly:true,
						placeHolder:'请输入货到工地货应付款',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'money5',
						name:'money5',
						readOnly:true,
						label:'验收后应付',
						placeHolder:'请输入验收后应付款',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'money6',
						name:'money6',
						readOnly:true,
						label:'质保金',
						placeHolder:'请输入质保金',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'date1',
						name:'date1',
						label:'付款期限',
						labelWidth:'40%',
						readOnly : true,
//						dateFormat : 'Y-m-d',
						placeHolder:'请输入质保金付款期限',
//						listeners:{
//							focus:function(){
//								initDate2('date1','付款期限');
//							}
//						}
					}]
				},
				{
					xtype:'fieldset',
					title:'安装合同总额',
					items:[
					       {
					    	   xtype:'textfield',
					    	   label:'合同总额',
					    	   labelWidth:'40%',
					    	   readOnly:true,
					    	   placeHolder:'请输入买卖合同总额',
					    	   id:'htmoney2',
					    	   name:'htmoney2'
					       },{
					    	   xtype:'textfield',
					    	   id:'paymoney2',
					    	   name:'paymoney2',
					    	   readOnly:true,
					    	   label:'已付款金额',
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入已付款金额'
					       },{
					    	   xtype:'textfield',
					    	   id:'notpaymoney2',
					    	   name:'notpaymoney2',
					    	   label:'未付款金额',
					    	   readOnly:true,
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入未付款金额'
					       }
					]
				},
				{
					xtype:'fieldset',
					title:'安装合同未付款项构成',
					items:[{
						xtype:'textfield',
						id:'money11',
						name:'money11',
						label:'工程进场款',
						readOnly:true,
						labelWidth:'40%',
						placeHolder:'请输入工程款：进场款',
					},{
						xtype:'textfield',
						id:'money12',
						name:'money12',
						label:'进度款',
						readOnly:true,
						placeHolder:'请输入进度款',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'money13',
						name:'money13',
						label:'验收款',
						readOnly:true,
						placeHolder:'请输入验收款',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'money14',
						name:'money14',
						label:'质保金',
						readOnly:true,
						placeHolder:'请输入质保金',
						labelWidth:'40%'
					},{
						xtype:'textfield',
						id:'date2',
						name:'date2',
						label:'付款期限',
						labelWidth:'40%',
						readOnly : true,
//						dateFormat : 'Y-m-d',
						placeHolder:'请输入质保金付款期限',
//						listeners:{
//							focus:function(){
//								initDate2('date2','付款期限');
//							}
//						}
					},{
						xtype:'textfield',
						id:'money15',
						name:'money15',
						label:'附加工程款',
						placeHolder:'请输入附加工程款',
						readOnly:true,
						labelWidth:'40%'
					}]
				},
				{
					xtype:'fieldset',
					title:'维保合同总额',
					items:[
					       {
					    	   xtype:'textfield',
					    	   label:'合同总额',
					    	   labelWidth:'40%',
					    	   readOnly:true,
					    	   placeHolder:'请输入买卖合同总额',
					    	   id:'htmoney3',
					    	   name:'htmoney3'
					       },{
					    	   xtype:'textfield',
					    	   id:'paymoney3',
					    	   name:'paymoney3',
					    	   readOnly:true,
					    	   label:'已付款金额',
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入已付款金额'
					       },{
					    	   xtype:'textfield',
					    	   id:'notpaymoney3',
					    	   readOnly:true,
					    	   name:'notpaymoney3',
					    	   label:'未付款金额',
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入未付款金额'
					       }
					]
				},
				{
					xtype:'fieldset',
					title:'维保合同未付款项构成',
					items:[{
						xtype:'textfield',
						id:'money21',
						name:'money21',
						readOnly:true,
						label:'维保款',
						labelWidth:'40%',
						placeHolder:'请输入维保款',
					}]
				},
				{
					xtype:'fieldset',
					title:'改造合同总额',
					items:[
					       {
					    	   xtype:'textfield',
					    	   label:'合同总额',
					    	   readOnly:true,
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入买卖合同总额',
					    	   id:'htmoney4',
					    	   name:'htmoney4'
					       },{
					    	   xtype:'textfield',
					    	   id:'paymoney4',
					    	   name:'paymoney4',
					    	   readOnly:true,
					    	   label:'已付款金额',
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入已付款金额'
					       },{
					    	   xtype:'textfield',
					    	   id:'notpaymoney4',
					    	   name:'notpaymoney4',
					    	   label:'未付款金额',
					    	   readOnly:true,
					    	   labelWidth:'40%',
					    	   placeHolder:'请输入未付款金额'
					       }
					]
				},
				{
					xtype:'fieldset',
					instructions:'其他状况',
					title:'改造合同未付款项构成',
					items:[{
						xtype:'textfield',
						id:'money31',
						name:'money31',
						readOnly:true,
						label:'改造款',
						labelWidth:'40%',
						placeHolder:'请输入改造款',
					}]
				},
				{
					xtype:'fieldset',
					title:'',
					items:[{
						xtype:'textfield',
						label:'货到时间',
						labelWidth:'40%',
						id:'ortherdate1',
						name:'ortherdate1',
						placeHolder:'货到工地时间',
						readOnly:true,
//						dateFormat:'Y-m-d',
//						listeners:{
//							focus:function(){
//								initDate2('ortherdate1','货到时间');
//							}
//						}
					},{
						xtype:'textfield',
						label:'双方验收',
						labelWidth:'40%',
						id:'ortherdate2',
						name:'ortherdate2',
						placeHolder:'双方验收时间',
						readOnly:true,
//						dateFormat:'Y-m-d',
//						listeners:{
//							focus:function(){
//								initDate2('ortherdate2','货到时间');
//							}
//						}
					},{
						xtype:'textfield',
						label:'政府验收',
						labelWidth:'40%',
						id:'ortherdate3',
						name:'ortherdate3',
						placeHolder:'政府验收时间',
						readOnly:true,
//						dateFormat:'Y-m-d',
//						listeners:{
//							focus:function(){
//								initDate2('ortherdate3','货到时间');
//							}
//						}
					},{
						xtype:'textfield',
						label:'最终款时间',
						labelWidth:'40%',
						id:'paydate',
						name:'paydate',
						placeHolder:'最后一次付款时间',
//						dateFormat:'Y-m-d',
						required:true,
						readOnly:true,
//						listeners:{
//							focus:function(){
//								initDate2('paydate','最终付款时间');
//							}
//						}
					},{
						xtype:'textnumfield',
						label:'最终款金额',
						labelWidth:'40%',
						id:'paymoney',
						name:'paymoney',
						required:true,
						readOnly:true,
						placeHolder:'最后一次付款金额',
					},{
						xtype:'textfield',
						label:'所有权保留',
						labelWidth:'40%',
						id:'iskeep',
						name:'iskeep',
						readOnly:true,
						placeHolder:'是否保留所有权',
					}]
				},
				{
						xtype:'fieldset',
						title:'',
						items:[{
							xtype:'autoTextArea',
							label:'补充说明',
							labelWidth:'40%',
							readOnly:true,
							placeHolder:'请输入补充说明事项',
							id:'bcsm_textarea',
							name:'bcsm_textarea',
						},{
							xtype:'autoTextArea',
							label:'起诉原因',
							labelWidth:'40%',
							readOnly:true,
							placeHolder:'请输入起诉原因',
							id:'reason_textarea',
							name:'reason_textarea',
							required:true,
						}]
				},
				
				
//		{
//			xtype : 'fieldset',
//			instructions : '',
//			title : '',
//			items : [ {
//				xtype : 'container',
//				layout : {
//					type : 'hbox',
//					align : 'start',
//					pack : 'center'
//				},
//				items : [ {
//					xtype : 'button',
//					margin : 10,
//					width : 120,
//					text : '拍照'
//				}, {
//					xtype : 'button',
//					margin : 10,
//					width : 120,
//					text : '浏览'
//				} ]
//			}]
//		}, 
		{
		xtype : 'fieldset',
		hidden : true,
		items : [ {
			xtype : 'textfield',
			id : 'conds',
			name : 'conds'
		}, {
			xtype : 'textfield',
			id : 'userid',
			name : 'userid'
		}, {
			xtype : 'textfield',
			id : 'type',
			name : 'type'
		}, {
			xtype : 'textfield',
			id : 'username',
			name : 'username'
		}, {
			xtype : 'textfield',
			id : 'node',
			name : 'node'
		}, {
			xtype : 'textfield',
			id : 'ctime',
			name : 'ctime'
		}, {
			xtype : 'textfield',
			id : 'piid',
			name : 'piid'
		}, {
			xtype : 'textfield',
			id : 'processname',
			name : 'processname'
		}, {
			xtype : 'textfield',
			id : 'curauthor',
			name : 'curauthor'
		}, {
			xtype : 'textfield',
			id : 'dealmen',
			name : 'dealmen'
		}, {
			xtype : 'textfield',
			id : 'ygbh',
			name : 'ygbh'
		}, {
			xtype : 'textfield',
			id : 'form',
			name : 'form'
		}, {
			xtype : 'textfield',
			id : 'arcpath',
			name : 'arcpath'
		}, {
			xtype : 'textfield',
			id : 'arcdate',
			name : 'arcdate'
		}, {
			xtype : 'textfield',
			id : 'idea',
			name : 'idea'
		}, {
			xtype : 'textfield',
			id : 'endprocessdate',
			name : 'endprocessdate'
		},
		{
			xtype:'textfield',
			id:'ext1',
			name:'ext1'
		},{
			xtype : 'textfield',
			id : 'audit_list',
			name : 'audit_list'
		}, {
			xtype : 'textfield',
			id : 'taskid',
			name : 'taskid'
		}, {
			xtype : 'textfield',
			id : 'mast',
			name : 'mast'
		},
        {
        	xtype: 'textfield',
        	id: 'firflow',
        	name: 'firflow'
        },{
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
        },{
        	xtype:'button',
        	id:'getdep',
        	name:'getdep',
        }]
	}
		]
	}]
	}
});