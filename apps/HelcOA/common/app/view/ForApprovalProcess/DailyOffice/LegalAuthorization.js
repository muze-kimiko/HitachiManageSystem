/*
 * File: app/view/DailyOffice15.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.LegalAuthorization', {
	extend : 'Ext.Panel',
	id:'sp_LegalAuthorization_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date',
			'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id: 'surface_ID',
			//title : '法人授权委托证明、法人证明书申请审批',
			items : [ {
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'returnHome_ID'
			},
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                id: 'idea_ID',
                text: '下一步'
            }
			
//			{
//				xtype : 'button',
//				handler : function(button, e) {
//					var menu = Ext.create('Ext.Menu', {
//						items : [ {
//							text : '下一步 ',
//							id : 'qc_ToSelectNode',
//							handler : function() {
//								Ext.Viewport.removeMenu('right');
//							}
//						}, {
//							text : '保存',
//							id : 'Save_useStamp',
//							handler : function() {
//								Ext.Viewport.removeMenu('right');
//							}
//						}, {
//							text : '意见',
//							id : 'useStamp_suggest',
//							handler : function() {
//								Ext.Viewport.removeMenu('right');
//							}
//						} ]
//					});
//
//					Ext.Viewport.setMenu(menu, {
//						side : 'right',
//						reveal : false
//					});
//
//					Ext.Viewport.showMenu('right');
//				},
//				itemId : 'mybutton11',
//				iconCls : 'more'
//			}
			]
		}, {
			xtype : 'formpanel',
			flex : 1,
			id: 'fp',
			items: [ {
				xtype: 'fieldset',
				title: '',
				items: [ {
					xtype: 'textfield',
                    id: 'fileno',
                    name: 'fileno',
					label: '编号',
					labelWidth: '40%',
					readOnly:true
				} ]
			}, {
				xtype: 'fieldset',
				title: '',
				items: [ {
					xtype : 'textfield',
					id:'agentman',
					name:'agentman',
					label: '申请人',
					labelWidth : '40%',
					readOnly:true
				},{ 
					xtype : 'textfield',
					id:'dept',
					name:'dept',
					label: '申请部门',
					labelWidth : '40%',
					readOnly:true
				}, {
					xtype: 'textfield',
					label: '申请日期',
					id:'createdate',
					name:'createdate',
					labelWidth : '40%',
					readOnly:true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					id : 'bsqr',
					name:'bsqr',
					label : '被授权人',
					labelWidth : '40%',
					readOnly:true
				}, {
					xtype : 'textfield',
					id:'phone',
					name:'phone',
					label : '联系电话',
					labelWidth : '40%',
					readOnly:true
				}, {
					xtype : 'textfield',
					id:'qwwcsj',
					name:'qwwcsj',
					label : '期望完成日期',
					labelWidth : '40%',
					readOnly:true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'selectfield',
					id:'zms',
					label : '法人证明书',
					labelWidth : '40%',
					readOnly:true,
					placeHolder : '是否开具法人证明书',
					options : [ {
						text : '是',
						value : '是'
					}, {
						text : '否',
						value : '否'
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				title : '有效期(年月)',
				items : [ {
					xtype : 'textfield',
					id:'yxnyq',
					name:'yxnyq',
					label : '开始',
					labelWidth : '40%',
					readOnly:true
				}, {
					xtype : 'textfield',
					id:'yxnyz',
					name:'yxnyz',
					label : '结束',
					labelWidth : '40%',
					readOnly:true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [
					{
						xtype : 'textfield',
						id:'subject',
						name:'subject',
						label : '标题 ',
						labelWidth : '40%',
						readOnly:true
					},{
					xtype : 'textareafield',
					id:'sqly',
					name:'sqly',
					label : '申请权限',
					labelWidth : '40%',
					readOnly:true
				} ]
			}, {
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
				// {
				// xtype: 'textfield',
				// id: 'createdate',
				// name: 'createdate'
				// },
				{
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
                },
                {
                	xtype: 'textfield',
                	id: 'pi_flag',
                	name: 'pi_flag'
                },
                {
                	xtype: 'textfield',
                	id: 'ext1',
                	name: 'ext1'
                },
                {
                	xtype: 'textfield',
                	id: 'managermen',
                	name: 'managermen'
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
			} ]
		} ]
	}

});