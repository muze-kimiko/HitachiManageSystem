Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_E2', {
	extend:'Ext.Panel',
	id:'sp_HB_E2_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置
			docked:'top',
			id:'surface_ID',
			title:'客户新增及资料变更申请审批表',
			items :[ 
				{ xtype:'button', ui:'back', text:'返回', id:'returnHome_ID' },		//待审批和已结束、已审批不同类型的view的ID是不一样的
				{ xtype:'spacer' },
				{ xtype: 'button', text:'下一步', id:'idea_ID' }	//只有待审批才有这个下一步
			]
		},
		{
			xtype:'formpanel',
			flex:1,
			id: 'fp',
			items:[
			{
				xtype:'fieldset',	//面板设置，可将不同分类的字段分开，也可以全部字段放同一面板
				title:'',			//面板说明
				items:[ {
					xtype:'textfield',			//字段类型，常用3种，textfield，selectfield，autoTextArea
					id:'fileno',				//字段ID
					name:'fileno',				//字段名
					label:'编号',				//字段说明
					labelWidth:'40%',			//说明长度
					readOnly:true,				//只读设置，可选
					required:true,				//必填检查，可选
					placeHolder:'请输入编号',	//必填检查后的提示，可选
					
				},{
					xtype:'textfield',
					label:'标题',
					labelWidth:'40%',
					id:'subject',
					name:'subject',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'发起人',
					labelWidth:'40%',
					id:'agentman',
					name:'agentman',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'发起科室',
					labelWidth:'40%',
					id:'dept',
					name:'dept',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'客户名称',
					labelWidth:'40%',
					id:'khmc',
					name:'khmc',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'申请类别',
					labelWidth:'40%',
					id:'sqtype',
					name:'sqtype',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'国名',
					labelWidth:'40%',
					id:'gm',
					name:'gm',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'公司地址',
					labelWidth:'40%',
					id:'gsaddr',
					name:'gsaddr',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'省',
					labelWidth:'40%',
					id:'gsvol',
					name:'gsvol',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'市',
					labelWidth:'40%',
					id:'gscity',
					name:'gscity',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'收货地址',
					labelWidth:'40%',
					id:'shaddr',
					name:'shaddr',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'省',
					labelWidth:'40%',
					id:'shvol',
					name:'shvol',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'市',
					labelWidth:'40%',
					id:'shcity',
					name:'shcity',
					readOnly:true,
				}
				,{
					xtype:'textfield',
					label:'税号',
					labelWidth:'40%',
					id:'taxno',
					name:'taxno',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'开户行',
					labelWidth:'40%',
					id:'bank',
					name:'bank',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'银行账号',
					labelWidth:'40%',
					id:'account',
					name:'account',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'信用额度',
					labelWidth:'40%',
					id:'creditlines',
					name:'creditlines',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'付款天数',
					labelWidth:'40%',
					id:'paymentdays',
					name:'paymentdays',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'客户类型',
					labelWidth:'40%',
					id:'khtype',
					name:'khtype',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'客户性质',
					labelWidth:'40%',
					id:'khxz',
					name:'khxz',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'运费是否客户承担',
					labelWidth:'40%',
					id:'cdyf',
					name:'cdyf',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系人',
					labelWidth:'40%',
					id:'lxr',
					name:'lxr',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系人部门',
					labelWidth:'40%',
					id:'dep',
					name:'dep',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系人职位',
					labelWidth:'40%',
					id:'zw',
					name:'zw',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系电话',
					labelWidth:'40%',
					id:'lxdh',
					name:'lxdh',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'传真',
					labelWidth:'40%',
					id:'fax',
					name:'fax',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'付款条件',
					labelWidth:'40%',
					id:'fktj',
					name:'fktj',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'客户相关证件',
					labelWidth:'40%',
					id:'khzj',
					name:'khzj',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'其他证件',
					labelWidth:'40%',
					id:'qtzj',
					name:'qtzj',
					readOnly:true,
				}
				
				,{
					xtype:'textfield',
					label:'客户编号 ',
					labelWidth:'40%',
					id:'khnum',
					name:'khnum',
					required:true,
				}
				
				]
			}, 
			
			{
				xtype:'fieldset',
				hidden:true,		//隐藏面板部分，放置隐藏字段
				items:[ 
					{ xtype:'textfield', id:'conds', name:'conds', value:'nocon' },
					{ xtype:'textfield', id:'userid', name:'userid' },
					{ xtype:'textfield', id:'type', name:'type' },
					{ xtype:'textfield', id:'username', name:'username' },
					{ xtype:'textfield', id:'idea', name:'idea' },
					{ xtype:'textfield', id:'node', name:'node' },
					{ xtype:'textfield', id:'ctime', name:'ctime' },
					{ xtype:'textfield', id:'piid', name:'piid' },
					{ xtype:'textfield', id:'processname', name:'processname' },
					{ xtype:'textfield', id:'curauthor', name:'curauthor' },
					{ xtype:'textfield', id:'dealmen', name:'dealmen' },
					{ xtype:'textfield', id:'ygbh', name:'ygbh' },
					{ xtype:'textfield', id:'form', name:'form' },
					{ xtype:'textfield', id:'arcpath', name:'arcpath' },
					{ xtype:'textfield', id:'arcdate', name:'arcdate' },
					{ xtype:'textfield', id:'endprocessdate', name:'endprocessdate' },
					{ xtype:'textfield', id:'ext1', name:'ext1' },
					{ xtype:'textfield', id:'audit_list', name:'audit_list' },
					{ xtype:'textfield', id:'taskid', name:'taskid' },
					{ xtype:'textfield', id:'mast', name:'mast' },
					{ xtype:'textfield', id:'firflow', name:'firflow' },
					{ xtype:'textfield', id:'pi_flag', name:'pi_flag' },
					{ xtype:'textfield', id:'cfg_id', name:'cfg_id' },
					{ xtype:'textfield', id:'createflag', name:'createflag' },
					//以下部分字段，如果在非隐藏面板有的字段，这里必须去掉
					
					{ xtype:'textfield', id:'gangwei', name:'gangwei' },
					{ xtype:'textfield', id:'bm', name:'bm' },
					{ xtype:'textfield', id:'ident_id', name:'ident_id' },
					{ xtype:'textfield', id:'toco_dat', name:'toco_dat' },
					{ xtype:'textfield', id:'createdate',  name:'createdate' },
					{ xtype:'textfield', id:'attfjpathway', name:'attfjpathway' },
					{ xtype:'textfield', id:'vers', name:'vers' },
					{ xtype:'textfield', id:'managermen', name:'managermen' }//,
					//{ xtype:'textfield', id:'dept',  name:'dept' }
					
					
				]
			}]
		}]
	}
});