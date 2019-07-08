
/* JavaScript content from app/view/ForApprovalProcess/DailyOffice/OverseasTrip.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.OverseasTrip', {
	extend : 'Ext.Panel',
	id : 'sp_OverseasTrip_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date',
			'Ext.field.TextArea','Ext.field.Select' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '境外出差申请',
			items : [
                     {
                     	xtype: 'button',
                         iconCls: 'home', 
                         id: 'returnHome_ID'
                     },
                     {
                         xtype: 'spacer'
                     },
                     {
                         xtype: 'button',
                         id: 'idea_ID',
                         text: '下一步'
                     }
                 ]
		}, {
			xtype : 'formpanel',
			flex : 1,
			id: 'fp',
			items : [ {
				xtype : 'fieldset',
				title : '领队',
				items : [{
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '编号',
					labelWidth : '40%',
					placeHolder : '请输入编号',
				},{
					xtype: 'textfield',
                    id: 'createdate',
                    name:'createdate',
                    label: '申请日期',
                    labelWidth: '40%',
                    placeHolder: '点击设置时间',
//                    disabled:true
                    readOnly:true
//                  readOnly:true,
//                     listeners:{
//                        focus:function(){
//                           initDate(Ext.getCmp('createdate').getValue(),'申请日期','createdate');
//                        }
//                     }
				},{
					xtype : 'textfield',
					id : 'ygh',
					name : 'ygh',
					label : '员工编号',
					required:true,
					labelWidth : '40%',
					placeHolder : '请输入员工编号',
				},{
					xtype : 'textfield',
					label : '姓名',
					labelWidth : '40%',
					id : 'query_xm',
					name : 'query_xm',
					placeHolder : '请输入姓名名称',
					readOnly:true
				},{
					xtype : 'textfield',
					label : '部门',
//					readOnly:true,
					labelWidth : '40%',
					id:'dep',
					name:'dep',
					placeHolder : '请输入部门名称',
					required:true,
					readOnly:true
				},{
					xtype : 'textfield',
					label : '标题',
					labelWidth : '40%',
					required : true,
					readOnly:true,
					name : 'subject',
					id : 'subject',
					placeHolder : '请输入标题'
				}]
			}, {
				xtype : 'fieldset',
				title : '人员数量',
				items : [ {
					xtype : 'textfield',
					label : '一类人人数',
					labelWidth : '40%',
					id : 'peonum',
					name : 'peonum',
					required : true,
					readOnly:true,
					placeHolder : '请输入一类人人数'
				}, {
					xtype : 'textfield',
					label : '二类人人数',
					labelWidth : '40%',
					id : 'peonum2',
					name : 'peonum2',
					required : true,
					readOnly:true,
					placeHolder : '请输入二类人人数'
				}, {
					xtype : 'textfield',
					label : '三类人人数',
					labelWidth : '40%',
					id : 'peonum3',
					name : 'peonum3',
					required : true,
					readOnly:true,
					placeHolder : '请输入三类人人数'
				}]
			},{
				xtype : 'fieldset',
				title : '出访时间',
				items : [ {
					xtype : 'textfield',
					label : '出发时间',
					id : 'starttime',
					labelWidth : '40%',
					placeHolder : '请选择出发时间',
					name : 'starttime',
					required : true,
					readOnly : true,
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('starttime', '出发时间');
						}
					}
				},{
					xtype : 'textfield',
					label : '返回时间',
					id : 'rettime',
					labelWidth : '40%',
					placeHolder : '请选择返回时间',
					name : 'rettime',
					required : true,
					readOnly : true,
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('rettime', '返回时间');
						}
					}
				},
				{
						xtype : 'selectfield',
						label : '办理签证',
						required : true,
						readOnly:true,
						id : 'qz_type',
						name : 'qz_type',
						labelWidth : '40%',
						placeHolder : '请选择是否办理签证',
						options : [{
							text : '需办理',
							value:'需办理',
						}, {
							text : '不需办理',
							value:'不需办理'
						}],
				}]
			},{
				xtype : 'fieldset',
				title : '出访国家(地区)',
				items : [{
					xtype : 'selectfield',
					label : '出访地区',
					id : 'qystyle',
					name : 'qystyle',
					labelWidth : '40%',
					required:true,
					readOnly:true,
					placeHolder : '请选择出访地区',
					options : [ {
						text : '请选择出访地区',
						value : ''
					}, {
						text : '亚洲',
						value : '亚洲'
					}, {
						text : '欧洲',
						value : '欧洲'
					}, {
						text : '美洲',
						value : '美洲'
					} , {
						text : '非洲',
						value : '非洲'
					} , {
						text : '大洋洲太平洋岛屿',
						value : '大洋洲太平洋岛屿'
					}],
					listeners:{
						change:function(select,newValue,oldValue){
							addSelectOptions(newValue);
						}
					}
				},{
					xtype : 'selectfield',
					label : '出访国家',
					id : 'country',
					name : 'country',
					scrollable:true,
					readOnly:true,
					labelWidth : '40%',
					required:true,
					placeHolder : '请选择出访国家',
				},{
					xtype:'textfield',
					label:'出访城市',
					id:'addr',
					name:'addr',
					placeHolder:'请输入出访城市',
					labelWidth : '40%',
					required:true,
					readOnly:true,
				},{
					xtype : 'selectfield',
//					label : '是否不良出差',
					label : '不良出差',
					id : 'ifbl',
					name : 'ifbl',
					readOnly:true,
					labelWidth : '40%',
					options : [{
						text:'否',
						value:'否',
					},{
						text:'是',
						value:'是'
					}]
				},{
					xtype : 'selectfield',
					label : '出访类型',
					id : 'cc_type',
					name : 'cc_type',
					labelWidth : '40%',
					required:true,
					readOnly:true,
					options : [{
						text:'出差',
						value:'出差',
					},{
						text:'培训',
						value:'培训'
					}]
				}]
		},
//		{
//			xtype:'fieldset',
//			title:'飞机票',
//			items:[{
//				xtype : 'textfield',
//				label : '费用说明',
//				labelWidth : '40%',
//				id : 'fysm1',
//				readOnly:true,
//				name : 'fysm1',
//				placeHolder : '请输入费用说明'
//			},{
//				xtype : 'textnumfield',
//				label : '费用小计',
//				labelWidth : '40%',
//				id : 'fyxj1',
//				name : 'fyxj1',
//				readOnly:true,
//				value:0,
//				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '自费垫付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				name : 'fyfs1',
//				disabled:true,
//				value:'自费垫付',
////				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '公司预付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				name : 'fyfs1',
//				disabled:true,
//				value:'公司预付',
////				placeHolder : '请输入公司预付'
//			},{
//				xtype : 'checkboxfield',
//				label : '旅行社付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				name : 'fyfs1',
//				disabled:true,
//				value:'旅行社付',
////				placeHolder : '请输入公司预付'
//			}]
//		},{
//			xtype:'fieldset',
//			title:'交通费',
//			items:[{
//				xtype : 'textfield',
//				label : '费用说明',
//				labelWidth : '40%',
//				id : 'fysm2',
//				name : 'fysm2',
//				readOnly:true,
//				placeHolder : '请输入费用说明'
//			},{
//				xtype : 'textnumfield',
//				label : '费用小计',
//				labelWidth : '40%',
//				readOnly:true,
//				id : 'fyxj2',
//				name : 'fyxj2',
//				value:0,
//				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '自费垫付',
//				labelWidth : '40%',
//				disabled:true,
////				id : 'fyfs1',
//				name : 'fyfs2',
//				value:'自费垫付',
////				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '公司预付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs2',
//				value:'公司预付',
////				placeHolder : '请输入公司预付'
//			},{
//				xtype : 'checkboxfield',
//				label : '旅行社付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs2',
//				value:'旅行社付',
////				placeHolder : '请输入公司预付'
//			}]
//		},{
//			xtype:'fieldset',
//			title:'住宿费',
//			items:[{
//				xtype : 'textfield',
//				label : '费用说明',
//				labelWidth : '40%',
//				id : 'fysm3',
//				readOnly:true,
//				name : 'fysm3',
//				placeHolder : '请输入费用说明'
//			},{
//				xtype : 'textnumfield',
//				label : '费用小计',
//				labelWidth : '40%',
//				id : 'fyxj3',
//				readOnly:true,
//				name : 'fyxj3',
//				value:0,
//				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '自费垫付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs3',
//				value:'自费垫付',
////				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '公司预付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs3',
//				value:'公司预付',
////				placeHolder : '请输入公司预付'
//			},{
//				xtype : 'checkboxfield',
//				label : '旅行社付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs3',
//				value:'旅行社付',
////				placeHolder : '请输入公司预付'
//			}]
//		},{
//			xtype:'fieldset',
//			title:'餐费',
//			items:[{
//				xtype : 'textfield',
//				label : '费用说明',
//				labelWidth : '40%',
//				id : 'fysm4',
//				readOnly:true,
//				name : 'fysm4',
//				placeHolder : '请输入费用说明'
//			},{
//				xtype : 'textnumfield',
//				label : '费用小计',
//				labelWidth : '40%',
//				id : 'fyxj4',
//				readOnly:true,
//				name : 'fyxj4',
//				value:0,
//				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '自费垫付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs4',
//				value:'自费垫付',
////				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '公司预付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs4',
//				value:'公司预付',
////				placeHolder : '请输入公司预付'
//			},{
//				xtype : 'checkboxfield',
//				label : '旅行社付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs4',
//				value:'旅行社付',
////				placeHolder : '请输入公司预付'
//			}]
//		},{
//			xtype:'fieldset',
//			title:'其他',
//			items:[{
//				xtype : 'textfield',
//				label : '费用说明',
//				labelWidth : '40%',
//				id : 'fysm5',
//				readOnly:true,
//				name : 'fysm5',
//				placeHolder : '请输入费用说明'
//			},{
//				xtype : 'textnumfield',
//				label : '费用小计',
//				labelWidth : '40%',
//				id : 'fyxj5',
//				readOnly:true,
//				name : 'fyxj5',
//				value:0,
//				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '自费垫付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs5',
//				value:'自费垫付',
////				placeHolder : '请输入费用小计'
//			},{
//				xtype : 'checkboxfield',
//				label : '公司预付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs5',
//				value:'公司预付',
////				placeHolder : '请输入公司预付'
//			},{
//				xtype : 'checkboxfield',
//				label : '旅行社付',
//				labelWidth : '40%',
////				id : 'fyfs1',
//				disabled:true,
//				name : 'fyfs5',
//				value:'旅行社付',
////				placeHolder : '请输入公司预付'
//			}]
//		},
		{
			xtype : 'fieldset',
			title :'预计费用(原币)',
			items : [{
                xtype: 'selectfield',
                id: 'plant',
                name: 'plant',
                readOnly:true,
                label: '乘坐飞机',
                labelWidth: '40%',
                placeHolder: '请选择是否乘坐飞机',
                options: [
                          {
                              text: '是',
                              value: '是'
                          },
                          {
                              text: '否',
                              value: '否'
                          }
                      ]
            },{
				xtype:'textfield',
				id:'fee',
				name:'fee',
				readOnly:true,
				label:'交通费',
				labelWidth : '40%',
				placeHolder:'(含机票及当地交通费用)',
			},{
				xtype:'textfield',
				id:'otherfee',
				name:'otherfee',
				label:'预计其他费',
				labelWidth : '40%',
				required:true,
				readOnly:true,
				value:0,
				placeHolder:'请输入预计其他费用',
			},{
				xtype:'textfield',
				id:'prefee',
				name:'prefee',
				label:'预计费用',
				readOnly:true,
				labelWidth : '40%',
				placeHolder:'(含交通、住宿、补贴)',
			},{
				xtype:'textfield',
				id:'feesum',
				name:'feesum',
				readOnly:true,
				label:'预计总费用',
				labelWidth : '40%',
//				readOnly:true,
				placeHolder:'请输入预计总费用',
			},{
				xtype : 'selectfield',
				label : '币种',
				labelWidth : '40%',
				name : 'biz',
				id : 'biz',
				required:true,
				readOnly:true,
//				readOnly:true,
				placeHolder : '请选择币种',
				options:[{
					text:'请选择币种',
					value:''
				},{
					text:'美元',
					value:'美元'
				},{
					text:'日元',
					value:'日元'
				},{
					text:'港元',
					value:'港元'
				},{
					text:'欧元',
					value:'欧元'
				},{
					text:'英镑',
					value:'英镑'
				}]
			}]
		},{
			xtype:'fieldset',
			title:'预约请款',
			items:[{
				xtype: 'selectfield',
                id: 'book_money',
                name: 'book_money',
                label: '是否预约',
                readOnly:true,
                labelWidth: '40%',
                placeHolder: '请选择是否预约请款',
                options: [
                          {
                        	  text: '否',
                        	  value: '否',
                          },
                          {
                              text: '是',
                              value: '是'
                          }
                 ],
//                 listeners : {
//                	 change:function(select,newValue,oldValue){
//							if(newValue=='是'){
//								Ext.getCmp('yyje').setDisabled(false);
//								Ext.getCmp('feesum2').setDisabled(false);
//								Ext.getCmp('yyje').focus();
//							}else{
//								Ext.getCmp('yyje').setDisabled(true);
//								Ext.getCmp('feesum2').setDisabled(true);
//							}
//						}
//					}
			},{
				xtype:'textfield',
				id:'yyje',
				name:'yyje',
				label:'预约金额',
				labelWidth : '40%',
				readOnly:true,
				placeHolder:'请输入预约请款金额',
			},{
				xtype:'textfield',
				id:'feesum2',
				name:'feesum2',
				label:'预计总费用',
				readOnly:true,
				required:true,
				labelWidth : '40%',
				placeHolder:'请输入预计总费用',
			}]
		},{

			xtype:'fieldset',
			title:'研发项目',
			items:[{
				xtype: 'selectfield',
                id: 'ifyfxm',
                readOnly:true,
                name: 'ifyfxm',
//                label: '是否为研发项目',
                label: '是否为研发',
                labelWidth: '40%',
                placeHolder: '请选择是否为研发项目',
                options: [
                          {
                        	  text: '否',
                        	  value: '否',
                          },
                          {
                              text: '是',
                              value: '是'
                          }
                 ],
//                 listeners : {
//                	 change:function(select,newValue,oldValue){
//							if(newValue=='是'){
//								Ext.getCmp('projectno').setDisabled(false);
//								Ext.getCmp('projectname').setDisabled(false);
//								Ext.getCmp('projectno').focus();
//							}else{
//								Ext.getCmp('projectno').setDisabled(true);
//								Ext.getCmp('projectname').setDisabled(true);
//							}
//						}
//					}
			},{
				xtype:'textfield',
				id:'projectno',
				name:'projectno',
				readOnly:true,
				label:'研发项目号',
				labelWidth : '40%',
				placeHolder:'请输入研发项目号',
			},{
				xtype:'textfield',
				id:'projectname',
				name:'projectname',
				label:'研发项目名',
				labelWidth : '40%',
				readOnly:true,
				placeHolder:'请输入研发项目名称',
			}]
		},{
			xtype:'fieldset',
			title:'',
			items:[{
				xtype:'textfield',
				label:'出差参照',
				labelWidth : '40%',
				readOnly:true,
				placeHolder:'出差标准参照',
			}]
		},{
			xtype:'autoTextArea',
			id:'reason_textarea',
			name:'reason_textarea',
			label:'出访任务',
			labelWidth : '40%',
			required:true,
			readOnly:true,
			placeHolder:'请输入出访任务及理由',
		},{
			xtype:'fieldset',
			instructions:'提示:请申请人在规章制度 “QG/GH-13-01 境外出差管理规则”中下载“ 出访人员行程及情况登记表 ”表格，并请务必按要求填写完毕后附加在附件中，否则无法协助办理相关的手续。谢谢！',
		},
//		{
//			xtype:'fieldset',
//			title:'审批人意见',
//			items:[{
//			xtype:'textfield',
//			label:'部长',
//			labelWidth : '40%',
//			readOnly:true,
//			placeHolder:'',
//		},{
//			xtype:'textfield',
//			label:'总经理',
//			labelWidth : '40%',
//			readOnly:true,
//			placeHolder:'',
//		},{
//			xtype:'textfield',
//			label:'人力资源部',
//			labelWidth : '40%',
//			readOnly:true,
//			placeHolder:'',
//		},{
//			xtype:'textfield',
//			label:'副总裁',
//			labelWidth : '40%',
//			readOnly:true,
//			placeHolder:'',
//		},{
//			xtype:'textfield',
//			label:'总裁',
//			labelWidth : '40%',
//			readOnly:true,
//			placeHolder:'',
//		},{
//			xtype:'textfield',
//			label:'综合管理科',
//			labelWidth : '40%',
//			readOnly:true,
//			placeHolder:'',
//		}]
//		}
		{
			xtype:'fieldset',
			title:'总裁办主任意见',
			items:[{
				xtype:'selectfield',
				id:'radio113',
				name:'radio113',
				label: '护照签证',
                labelWidth: '40%',
				options:[{
					text:'因公护照签证',
					value:'因公护照签证'
				},{
					text:'因私护照商务签证',
					value:'因私护照商务签证'
				}]
			},
//			{
//				xtype:'textfield',
//				label:'意见',
//				labelWidth : '40%',
//				readOnly:true,
//				disabled:true,
//				placeHolder:'',
//			}
			]
		},
//			{
//			xtype:'fieldset',
//			title:'护照申领程序',
//			items:[{
//				xtype:'textfield',
//				label:'外事经办人',
////				label:'外事经办人处理情况',
//				labelWidth : '40%',
//				readOnly:true,
//				placeHolder:'',
//			},{
//				xtype:'textfield',
//				label:'总经理',
//				labelWidth : '40%',
//				readOnly:true,
//				placeHolder:'',
//			},{
//				xtype:'textfield',
//				label:'总裁办主任',
//				labelWidth : '40%',
//				readOnly:true,
//				placeHolder:'',
//			},{
//				xtype:'textfield',
//				label:'经办人签收',
//				labelWidth : '40%',
//				readOnly:true,
//				placeHolder:'',
//			}]
//		},
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
            xtype: 'fieldset',
            hidden: true,
            items: [ {
            	xtype:'textfield',
            	id:'button206',
            	name:'button206',
            },{
                xtype: 'textfield',
                id: 'conds',
                name: 'conds',
                value:'nocon'
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
            	id: 'agentman',
            	name: 'agentman'
            },
            {
                xtype: 'textfield',
                id: 'ygbh',
                name: 'ygbh'
            },
            {
            	xtype: 'textfield',
            	id: 'dept',
            	name: 'dept'
            },{
            	xtype:'textfield',
            	id:'query_zw',
            	name:'query_zw'
            },
            {
                xtype: 'textfield',
                id: 'form',
                name: 'form',
                value:'processfile'
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
            },{
            	xtype:'textfield',
            	id:'endprocessdate',
            	name:'endprocessdate'
            },
            
            
            
            
            
            {
                xtype: 'textfield',
                id: 'idea',
                name: 'idea'
            },
            {
            	xtype: 'textfield',
            	id: 'kzname',
            	name: 'kzname'
            },
            {
            	xtype: 'textfield',
            	id: 'kzno',
            	name: 'kzno'
            },
            {
            	xtype: 'textfield',
            	id: 'bzname',
            	name: 'bzname'
            },
            {
            	xtype: 'textfield',
            	id: 'bzno',
            	name: 'bzno'
            },
            {
            	xtype: 'textfield',
            	id: 'bbzname',
            	name: 'bbzname'
            },
            {
            	xtype: 'textfield',
            	id: 'bbzno',
            	name: 'bbzno'
            },{
            	xtype:'textfield',
            	id:'staytime',
            	name:'staytime'
            },
            {
            	xtype: 'textfield',
            	id: 'zjlname',
            	name: 'zjlname'
            },
            {
            	xtype: 'textfield',
            	id: 'zjlno',
            	name: 'zjlno'
            },
            {
            	xtype: 'textfield',
            	id: 'guoji',
            	name: 'guoji'
            },
            {
            	xtype: 'textfield',
            	id: 'sendreader',
            	name: 'sendreader'
            },
            {
            	xtype: 'textfield',
            	id: 'query_bm',
            	name: 'query_bm'
            },
            {
            	xtype: 'textfield',
            	id: 'gwlist',
            	name: 'gwlist'
            },
            {
            	xtype: 'textfield',
            	id: 'fs1',
            	name: 'fs1'
            },{
            	xtype: 'textfield',
            	id: 'fs2',
            	name: 'fs2'
            },{
            	xtype: 'textfield',
            	id: 'fs3',
            	name: 'fs3'
            },{
            	xtype: 'textfield',
            	id: 'zs1',
            	name: 'zs1'
            },{
            	xtype: 'textfield',
            	id: 'zs2',
            	name: 'zs2'
            },{
            	xtype: 'textfield',
            	id: 'zs3',
            	name: 'zs3'
            },{
            	xtype: 'textfield',
            	id: 'bt1',
            	name: 'bt1'
            },{
            	xtype: 'textfield',
            	id: 'bt2',
            	name: 'bt2'
            },{
            	xtype:'textfield',
            	id:'bt3',
            	name:'bt3'
            },{
            	xtype: 'button',
            	id: 'checkfee',
            	name: 'checkfee'
            },{
            },{
            	xtype: 'button',
            	id: 'otherfee7',
            	name: 'otherfee7'
            },{
            	xtype: 'textfield',
            	id: 'ext1',
            	name: 'ext1'
            },{
            	xtype:'textfield',
            	id:'pi_flag',
            	name:'pi_flag'
            },{
            	xtype:'textfield',
            	id:'cfg_id',
            	name:'cfg_id'
            },{
            	xtype:'textfield',
            	id:'createflag',
            	name:'createflag'
            },{
            	xtype:'textfield',
            	id:'sta',
            	name:'sta'
            }]
        }]
	}]
	}
});