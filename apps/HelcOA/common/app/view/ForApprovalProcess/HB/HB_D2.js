Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_D2', {
	extend:'Ext.Panel',
	id:'sp_HB_D2_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置
			docked:'top',
			id:'surface_ID',
			title:'访客参观申请表',
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
					label:'所在科室',
					labelWidth:'40%',
					id:'dept',
					name:'dept',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'所在部门',
					labelWidth:'40%',
					id:'bm',
					name:'bm',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'参观活动负责人',
					labelWidth:'40%',
					id:'charity',
					name:'charity',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'参观活动负责人联系方式（手机号码）',
					labelWidth:'40%',
					id:'mobile',
					name:'mobile',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'公司内部其他参与人员',
					labelWidth:'40%',
					id:'otherpeson',
					name:'otherpeson',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'来访单位（全称）',
					labelWidth:'40%',
					id:'vistorunit',
					name:'vistorunit',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'来访目的',
					labelWidth:'40%',
					id:'visitreason',
					name:'visitreason',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'来访单位性质',
					labelWidth:'40%',
					id:'unitproperties',
					name:'unitproperties',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'来访单位与我司关系',
					labelWidth:'40%',
					id:'unitrelation',
					name:'unitrelation',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'来访人姓名、职位(最高级别)',
					labelWidth:'40%',
					id:'visitorname',
					name:'visitorname',
					readOnly:true,
				}
				,{
					xtype:'textfield',
					label:'来访人数',
					labelWidth:'40%',
					id:'visitorcount',
					name:'visitorcount',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'预计参观开始时间',
					labelWidth:'40%',
					id:'ycdate',
					name:'ycdate',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'预计参观结束时间',
					labelWidth:'40%',
					id:'ycdate1',
					name:'ycdate1',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'参观地点',
					labelWidth:'40%',
					id:'visitoradd',
					name:'visitoradd',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'其他参观地点',
					labelWidth:'40%',
					id:'otheradd',
					name:'otheradd',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'是否需要管理部人员解说',
					labelWidth:'40%',
					id:'explainorally',
					name:'explainorally',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'是否需要管理部拍照',
					labelWidth:'40%',
					id:'takepic',
					name:'takepic',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'拍摄地点及照相处理方式',
					labelWidth:'40%',
					id:'photoadd',
					name:'photoadd',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'是否需要管理部的其他协助',
					labelWidth:'40%',
					id:'ifhelp',
					name:'ifhelp',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'具体内容',
					labelWidth:'40%',
					id:'ccontent',
					name:'ccontent',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'是否需要动态参观',
					labelWidth:'40%',
					id:'ifdynamic',
					name:'ifdynamic',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'具体区域和要求',
					labelWidth:'40%',
					id:'area',
					name:'area',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'是否需准备欢迎牌',
					labelWidth:'40%',
					id:'welsign',
					name:'welsign',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'欢迎词详细内容',
					labelWidth:'40%',
					id:'signcontent',
					name:'signcontent',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'是否已预订会议室',
					labelWidth:'40%',
					id:'ifschmr',
					name:'ifschmr',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'说明会议室名',
					labelWidth:'40%',
					id:'meetingromm',
					name:'meetingromm',
					readOnly:true,
				}
				,{
					xtype:'textfield',
					label:'其他需要说明的事项',
					labelWidth:'40%',
					id:'remark',
					name:'remark',
					readOnly:true,
				}
				
				,{
					xtype:'textfield',
					label:'发通知 ',
					labelWidth:'40%',
					id:'notice',
					name:'notice',
					required:true,
				}
				,{
					xtype:'textfield',
					label:'开启参观区域的灯、空调、设备 ',
					labelWidth:'40%',
					id:'openinglight',
					name:'openinglight',
					required:true,
				},{
					xtype:'textfield',
					label:'环境巡查',
					labelWidth:'40%',
					id:'environmentalpatrol',
					name:'environmentalpatrol',
					required:true,
				},{
					xtype:'textfield',
					label:'接待讲解',
					labelWidth:'40%',
					id:'receptionexplanation',
					name:'receptionexplanation',
					required:true,
				},{
					xtype:'textfield',
					label:'全程陪同',
					labelWidth:'40%',
					id:'accompany',
					name:'accompany',
					required:true,
				},{
					xtype:'textfield',
					label:'欢迎词制作及播放',
					labelWidth:'40%',
					id:'salutatory',
					name:'salutatory',
					required:true,
				},{
					xtype:'textfield',
					label:'发通讯稿',
					labelWidth:'40%',
					id:'sendnewsletters',
					name:'sendnewsletters',
					required:true,
				},{
					xtype:'textfield',
					label:'拍照',
					labelWidth:'40%',
					id:'takepictures',
					name:'takepictures',
					required:true,
				},{
					xtype:'textfield',
					label:'多层厂房南面访客专用电梯、风机开启',
					labelWidth:'40%',
					id:'openelevator',
					name:'openelevator',
					required:true,
				},{
					xtype:'textfield',
					label:'全部收尾工作',
					labelWidth:'40%',
					id:'closeout',
					name:'closeout',
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