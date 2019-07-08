
/* JavaScript content from app/view/ForApprovalProcess/HB/HB_A15.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_A15', {
	extend:'Ext.Panel',
	id:'sp_HB_A15_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置
			docked:'top',
			id:'surface_ID',
			title:'外出申请单',
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
					xtype:'textfield',
					label:'所属部门',
					labelWidth:'40%',
					id:'bm',
					name:'bm',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'所属科室',
					labelWidth:'40%',
					id:'dept',
					name:'dept',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'职级',
					labelWidth:'40%',
					id:'zhiwu',
					name:'zhiwu',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'岗位',
					labelWidth:'40%',
					id:'gangwei',
					name:'gangwei',
					readOnly:true,
				}
				]
			},
			{
				xtype:'fieldset',
				title:'外勤情况',
				items:[
					{xtype:'textfield',label:'外勤开始时间',labelWidth:'40%',id:'stat1',name:'stat1',readOnly:true,},
					{xtype:'textfield',label:'外勤结束时间',labelWidth:'40%',id:'endt1',name:'endt1',readOnly:true,},
					{xtype:'textfield',label:'共计天数',labelWidth:'40%',id:'ts1',name:'ts1',readOnly:true,},
					{xtype:'textfield',label:'餐补次数',labelWidth:'40%',id:'cs1',name:'cs1',readOnly:true,},
					{xtype:'textfield',label:'外勤地点',labelWidth:'40%',id:'place1',name:'place1',readOnly:true,},

					{xtype:'textfield',label:'外勤开始时间',labelWidth:'40%',id:'stat2',name:'stat2',readOnly:true,},
					{xtype:'textfield',label:'外勤结束时间',labelWidth:'40%',id:'endt2',name:'endt2',readOnly:true,},
					{xtype:'textfield',label:'共计天数',labelWidth:'40%',id:'ts2',name:'ts2',readOnly:true,},
					{xtype:'textfield',label:'餐补次数',labelWidth:'40%',id:'cs2',name:'cs2',readOnly:true,},
					{xtype:'textfield',label:'外勤地点',labelWidth:'40%',id:'place2',name:'place2',readOnly:true,},

					{xtype:'textfield',label:'外勤开始时间',labelWidth:'40%',id:'stat3',name:'stat3',readOnly:true,},
					{xtype:'textfield',label:'外勤结束时间',labelWidth:'40%',id:'endt3',name:'endt3',readOnly:true,},
					{xtype:'textfield',label:'共计天数',labelWidth:'40%',id:'ts3',name:'ts3',readOnly:true,},
					{xtype:'textfield',label:'餐补次数',labelWidth:'40%',id:'cs3',name:'cs3',readOnly:true,},
					{xtype:'textfield',label:'外勤地点',labelWidth:'40%',id:'place3',name:'place3',readOnly:true,},

					{xtype:'textfield',label:'外勤开始时间',labelWidth:'40%',id:'stat4',name:'stat4',readOnly:true,},
					{xtype:'textfield',label:'外勤结束时间',labelWidth:'40%',id:'endt4',name:'endt4',readOnly:true,},
					{xtype:'textfield',label:'共计天数',labelWidth:'40%',id:'ts4',name:'ts4',readOnly:true,},
					{xtype:'textfield',label:'餐补次数',labelWidth:'40%',id:'cs4',name:'cs4',readOnly:true,},
					{xtype:'textfield',label:'外勤地点',labelWidth:'40%',id:'place4',name:'place4',readOnly:true,},

					{xtype:'textfield',label:'外勤开始时间',labelWidth:'40%',id:'stat5',name:'stat5',readOnly:true,},
					{xtype:'textfield',label:'外勤结束时间',labelWidth:'40%',id:'endt5',name:'endt5',readOnly:true,},
					{xtype:'textfield',label:'共计天数',labelWidth:'40%',id:'ts5',name:'ts5',readOnly:true,},
					{xtype:'textfield',label:'餐补次数',labelWidth:'40%',id:'cs5',name:'cs5',readOnly:true,},
					{xtype:'textfield',label:'外勤地点',labelWidth:'40%',id:'place5',name:'place5',readOnly:true,},
					
					{xtype:'textfield',label:'外勤事由',labelWidth:'40%',id:'reason',name:'reason',readOnly:true,}
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
					{ xtype:'textfield', id:'ident_id', name:'ident_id' },
					{ xtype:'textfield', id:'toco_dat', name:'toco_dat' }
				]
			}]
		}]
	}
});