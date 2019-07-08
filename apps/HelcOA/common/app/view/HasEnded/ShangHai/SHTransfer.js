Ext.define('HelcOA.view.HasEnded.ShangHai.SHTransfer', {
	extend : 'Ext.Panel',
	id : 'qc_SHTransfer_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		            {
		                xtype: 'toolbar',
		                docked: 'top',
		                id: 'yjs_surface_ID',
		                title: '',
		                items: [
		                        {
		                        	xtype: 'button',
		                        	text: '返回',
		                            ui: 'back',
		                            id: 'yjs_returnHasEnded'
		                        },
		                ]
		            },
		            {
		    			xtype : 'formpanel',
		    			flex : 1,
		    			id: 'fp',
		    			items : [ {
		    				xtype : 'fieldset',
		    				title : '',
		    				items : [
		    				{
		    					xtype : 'autoTextArea',
		    					label : '标题',
		    					labelWidth : '40%',
		    					id : 'subject',
		    					name : 'subject',
		    					required : true,
		    					placeHolder : '请输入标题'
		    				},
		    				{
		    					xtype : 'textfield',
		    					id : 'agentman',
		    					name : 'agentman',
		    					label : '申请人',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入申请人'
		    				},
		    				{
		    					xtype : 'textfield',
		    					id : 'xqbm',
		    					name : 'xqbm',
		    					label : '需求部门',
		    					required : true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入需求部门'
		    				},
		    				{
		    					xtype : 'textfield',
		    					id : 'xqgw',
		    					name : 'xqgw',
		    					label : '需求岗位',
		    					required : true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入需求岗位'
		    				},				
		    				{
		    					xtype : 'textfield',
		    					id : 'ddrygh',
		    					name : 'ddrygh',
		    					label : '拟调动人员工编号',
		    					labelWidth : '40%',
		    					placeHolder : '请输入拟调动人员工编号'
		    				},				
		    				{
		    					xtype : 'textfield',
		    					id : 'ddryname',
		    					name : 'ddryname',
		    					label : '姓名',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入姓名'
		    				},				
		    				{
		    					xtype : 'textfield',
		    					id : 'ddrysex',
		    					name : 'ddrysex',
		    					label : '性别',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入性别'
		    				},				
		    				{
		    					xtype : 'textfield',
		    					id : 'ddryage',
		    					name : 'ddryage',
		    					label : '年龄',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入年龄'
		    				},			
		    				{
		    					xtype : 'textfield',
		    					id : 'ddryxl',
		    					name : 'ddryxl',
		    					label : '学历',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入学历'
		    				},			
		    				{
		    					xtype : 'textfield',
		    					id : 'ddryzy',
		    					name : 'ddryzy',
		    					label : '专业',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入专业'
		    				},			
		    				{
		    					xtype : 'textfield',
		    					id : 'ddryxbm',
		    					name : 'ddryxbm',
		    					label : '现部门',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入现部门'
		    				},			
		    				{
		    					xtype : 'textfield',
		    					id : 'ddryxgw',
		    					name : 'ddryxgw',
		    					label : '现岗位',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入现岗位'
		    				},		
		    				{
		    					xtype : 'textfield',
		    					id : 'ddryrssj',
		    					name : 'ddryrssj',
		    					label : '入司时间',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入入司时间'
		    				},			
		    				{
		    					xtype : 'textfield',
		    					id : 'dgsj',
		    					name : 'dgsj',
		    					label : '拟到岗时间',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入拟到岗时间',
		                        listeners:{
		                        	focus:function(){
		                        		initDate(Ext.getCmp('dgsj').getValue(),'拟到岗时间','dgsj');
		                        	}
		                        }
		    				},		
		    				{
		    					xtype : 'textfield',
		    					id : 'phone',
		    					name : 'phone',
		    					label : '申请人联系电话',
		    					readOnly:true,
		    					labelWidth : '40%',
		    					placeHolder : '请输入申请人联系电话'
		    				},		
		    				]
		    			}, 
		    			{
		    				xtype : 'fieldset',
		    				hidden : true,
		    				items : [
		    				{
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
		    					xtype:'textfield',
		    					id:'ext1',
		    					name:'ext1'
		    				}, {
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
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'needzc',
		    					name: 'needzc'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'agentpeofdep',
		    					name: 'agentpeofdep'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'depflag',
		    					name: 'depflag'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'fileno',
		    					name: 'fileno'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'tiaojian01',
		    					name: 'tiaojian01'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'gwlist',
		    					name: 'gwlist'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'agentdep',
		    					name: 'agentdep'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'createdate',
		    					name: 'createdate'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'depflag1',
		    					name: 'depflag1'
		    				},
		    				{
		    					xtype: 'textfield',
		    					id: 'dept',
		    					name: 'dept'
		    				}]
		    			}]
		    		}]
		    	}
		    });