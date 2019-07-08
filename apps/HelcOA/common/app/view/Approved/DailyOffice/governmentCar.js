Ext.define('HelcOA.view.Approved.DailyOffice.governmentCar', {
	extend : 'Ext.Panel',
	id : 'ysp_governmentCar_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date',
			'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'ysp_surface_ID',
			title : '公务用车联络流程',
			items : [
                     {
                     	xtype: 'button',
                         id: 'ysp_returnApproved',
                         text: '返回',
                         ui: 'back'
                     },
                 ]
		}, {
			xtype : 'formpanel',
			flex : 1,
			id: 'fp',
			items : [ {
				xtype : 'fieldset',
				title : '申请部门填写',
				items : [ {
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '编号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入编号'
				}, {
					xtype : 'textfield',
					label : '用车部门',
					labelWidth : '40%',
					id : 'dept',
					name : 'dept',
					readOnly:true,
					placeHolder : '请输入部门名称'
				}, {
					xtype : 'textfield',
					label : '申请人',
					labelWidth : '40%',
					id : 'agentman',
					name : 'agentman',
					readOnly:true,
					placeHolder : '请输入申请人名称'
				}, {
					xtype : 'textfield',
					label : '标题',
					labelWidth : '40%',
					required : true,
					readOnly:true,
					name : 'subject',
					id : 'subject',
					placeHolder : '请输入标题'
				}, ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '用车时间',
					id : 'ycdate',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择用车时间',
					name : 'ycdate',
					required : true,
					readOnly : true,
					dateFormat : 'Y-m-d',
//					listeners : {
//						focus : function() {
//							initDate2('ycdate', '用车时间');
//						}
//					}
				}, 
				{
					xtype : 'textfield',
					label : '起',
					id : 'sj',
					labelWidth : '40%',
					name : 'sj',
					readOnly:true,
					placeHolder : '请输入详细时间',
					required : true,
				}, 
				{
					xtype : 'textfield',
					label : '返回时间',
					labelWidth : '40%',
					name : 'ycdate1',
					id : 'ycdate1',
					readOnly:true,
					placeHolder : '请选择返回日期',
					dateFormat : 'Y-m-d',
					required : true,
					readOnly : true,
//					listeners : {
//						focus : function() {
//							initDate2('ycdate1', '返回时间');
//						}
//					}
				}, 
				{
					xtype : 'textfield',
					label : '止',
					id : 'sj1',
					labelWidth : '40%',
					name : 'sj1',
					placeHolder : '请输入详细时间',
					required : true,
					readOnly:true,
				}
				]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '联系人',
					labelWidth : '40%',
					id : 'lxr',
					name : 'lxr',
					required : true,
					readOnly:true,
					placeHolder : '请输入申请人名称'
				}, {
					xtype : 'textnumfield',
					label : '联系电话',
					labelWidth : '40%',
					id : 'lxrdh',
					name : 'lxrdh',
					required : true,
					readOnly:true,
					placeHolder : '请输入联系电话'
				}, {
					xtype : 'textnumfield',
					label : '用车人数',
					labelWidth : '40%',
					id : 'ycrs',
					name : 'ycrs',
					required : true,
					readOnly:true,
					placeHolder : '请输入用车人数'
				}, {
					xtype : 'selectfield',
					label : '出车地点',
					id : 'place',
					name : 'place',
					labelWidth : '40%',
					required:true,
					readOnly:true,
					placeHolder : '请选择出车地点',
					options : [ {
						text : '请选择出车地点',
						value : ''
					}, {
						text : '中信',
						value : '中信'
					}, {
						text : '大石',
						value : '大石'
					} ]
				},{
					xtype : 'selectfield',
					label : '短信通知',
//					required : true,
					id : 'sendmobile',
					name : 'sendmobile',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择',
					options : [{
						text : '否',
						value:'否'
							
					}, {
						text : '是',
						value:'是'
					}],
					listeners:{
						change:function(select,newValue,oldValue){
							if(newValue=='是'){
								Ext.getCmp('sendnumber').setDisabled(false);
								Ext.getCmp('sendnumber').focus();
							}else{
								Ext.getCmp('sendnumber').setValue('');
								Ext.getCmp('sendnumber').setDisabled(true);
							}
						}
					}
				},]
		},{
			xtype:'textnumfield',
			label:'通知号码',
			id:'sendnumber',
			name:'sendnumber',
			placeHolder:'请输入短信通知号码',
			labelWidth : '40%',
			required:true,
			readOnly:true,
		},{
			xtype : 'fieldset',
			title :'',
			items : [ {
				xtype : 'autoTextArea',
				label : '行程',
				labelWidth : '40%',
				name : 'xicheng_textarea',
				id : 'xicheng_textarea',
				required : true,
				readOnly:true,
				placeHolder : '请输入行程'
			}, {
				xtype : 'autoTextArea',
				label : '用车理由',
				labelWidth : '40%',
				name : 'reasion_textarea',
				id : 'reasion_textarea',
				required : true,
				readOnly:true,
				placeHolder : '请输入用车理由'
			},
//			{
//				xtype:'textfield',
//				label:'领导意见',
//				labelWidth : '40%',
//				readOnly:true,
//				placeHolder:'领导意见',
//			}
			]
		},
		{
			xtype:'fieldset',
			title:'车辆管理部门填写',
			items:[
			     {
			    	xtype : 'textfield',
			    	label : '车号',
			    	labelWidth : '40%',
			    	id : 'ch',
			    	name : 'ch',
			    	readOnly:true,
//			    	required : true,
			    	placeHolder : '请输入车号'
			     },
				{
					xtype : 'textfield',
					label : '司机',
					labelWidth : '40%',
					id : 'sj2',
					name : 'sj2',
					readOnly:true,
//					required : true,
					placeHolder : '请输入司机名称'
				}, {
					xtype : 'textnumfield',
					label : '司机手机',
					labelWidth : '40%',
					id : 'sjtel',
					name : 'sjtel',
					readOnly:true,
//					required : true,
					placeHolder : '请输入司机手机'
				}
			]
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
			name : 'conds',
			value:'nocon'
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
		}, {
			xtype : 'textfield',
			id : 'createdate',
			name : 'createdate'
		},{
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
        } ]
	}]
	}]
	}
});