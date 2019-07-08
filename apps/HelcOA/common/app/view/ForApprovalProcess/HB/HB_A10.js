Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_A10', {
	extend:'Ext.Panel',
	id:'sp_HB_A10_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置sx
			docked:'top',
			id:'surface_ID',
			title:'请假申请单',
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
					xtype:'autoTextArea',
					label:'申请人',
					labelWidth:'40%',
					id:'agentman',
					name:'agentman',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'申请日期',
					labelWidth:'40%',
					id:'createdate',
					name:'createdate',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'所属部门',
					labelWidth:'40%',
					id:'bm',
					name:'bm',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'所属科室',
					labelWidth:'40%',
					id:'dept',
					name:'dept',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'职级',
					labelWidth:'40%',
					id:'zhiwu',
					name:'zhiwu',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'岗位',
					labelWidth:'40%',
					id:'gangwei',
					name:'gangwei',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'请假事由',
					labelWidth:'40%',
					id:'reason',
					name:'reason',
					readOnly:true,
				}]
			},
			{
				xtype:'fieldset',
				title:'',		//隐藏面板部分，放置隐藏字段
				items:[
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype0',name:'jqtype0',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std0',name:'std0',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end0',name:'end0',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts0',name:'ts0',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype1',name:'jqtype1',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std1',name:'std1',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end1',name:'end1',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts1',name:'ts1',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype2',name:'jqtype2',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std2',name:'std2',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end2',name:'end2',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts2',name:'ts2',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype3',name:'jqtype3',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std3',name:'std3',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end3',name:'end3',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts3',name:'ts3',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype4',name:'jqtype4',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std4',name:'std4',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end4',name:'end4',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts4',name:'ts4',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype5',name:'jqtype5',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std5',name:'std5',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end5',name:'end5',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts5',name:'ts5',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype6',name:'jqtype6',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std6',name:'std6',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end6',name:'end6',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts6',name:'ts6',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype7',name:'jqtype7',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std7',name:'std7',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end7',name:'end7',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts7',name:'ts7',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype8',name:'jqtype8',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std8',name:'std8',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end8',name:'end8',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts8',name:'ts8',readOnly:true,},
					
					{xtype:'textfield',label:'假期类型',labelWidth:'40%',id:'jqtype9',name:'jqtype9',readOnly:true,},
					{xtype:'textfield',label:'考勤开始时间',labelWidth:'40%',id:'std9',name:'std9',readOnly:true,},
					{xtype:'textfield',label:'考勤结束时间',labelWidth:'40%',id:'end9',name:'end9',readOnly:true,},
					{xtype:'textfield',label:'共计考勤时间（天）',labelWidth:'40%',id:'ts9',name:'ts9',readOnly:true,},
					
					{xtype:'textfield',label:'共计请假天数',labelWidth:'40%',id:'ts',name:'ts',readOnly:true,}
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
					{ xtype:'textfield', id:'toco_dat', name:'toco_dat' },
				]
			}]
		}]
	}
});