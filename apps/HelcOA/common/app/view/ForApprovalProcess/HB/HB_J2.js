Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_J2', {
	extend:'Ext.Panel',
	id:'sp_HB_J2_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置
			docked:'top',
			id:'surface_ID',
			title:'施工许可申请危险作业申请审批表',
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
					label:'作业地点',
					labelWidth:'40%',
					id:'zydd',
					name:'zydd',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'作业单位',
					labelWidth:'40%',
					id:'zydw',
					name:'zydw',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'作业开始时间',
					labelWidth:'40%',
					id:'qzdate',
					name:'qzdate',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'作业结束时间',
					labelWidth:'40%',
					id:'sgfindate',
					name:'sgfindate',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'作业负责人1',
					labelWidth:'40%',
					id:'zyfzr1',
					name:'zyfzr1',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系方式1',
					labelWidth:'40%',
					id:'phone1',
					name:'phone1',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'现场安全责任人',
					labelWidth:'40%',
					id:'fzr1',
					name:'fzr1',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系方式2',
					labelWidth:'40%',
					id:'phone2',
					name:'phone2',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'作业负责人2',
					labelWidth:'40%',
					id:'zyfzr2',
					name:'zyfzr2',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系方式',
					labelWidth:'40%',
					id:'phone12',
					name:'phone12',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'现场安全责任人',
					labelWidth:'40%',
					id:'fzr2',
					name:'fzr2',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'联系方式',
					labelWidth:'40%',
					id:'phone22',
					name:'phone22',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'作业类别',
					labelWidth:'40%',
					id:'zytype',
					name:'zytype',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'作业原因',
					labelWidth:'40%',
					id:'zyreason',
					name:'zyreason',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'可能出现的风险',
					labelWidth:'40%',
					id:'fxtype',
					name:'fxtype',
					readOnly:true,
				}
				,{
					xtype:'textfield',
					label:'详细说明',
					labelWidth:'40%',
					id:'shgsss2',
					name:'shgsss2',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'针对上述风险制定预防措施和应急预案',
					labelWidth:'40%',
					id:'yuanreason',
					name:'yuanreason',
					readOnly:true,
				}
				
				]
			}, 
			{
				xtype:'fieldset',
				title:'',
				items:[
					{
						xtype:'autoTextArea',
						label:'作业结束后情况反馈',
						labelWidth:'40%',
						id:'zyfkqk',
						name:'zyfkqk',
						required:true,
					},{
						xtype:'fieldset',
						label:'实际作业开始时间',
						labelWidth:'40%',
						id:'sjqzdate',
						name:'sjqzdate',
						required:true,
						dateFormat: 'Y-m-d',
						listeners:{
							focus:function(){
								initDate2('sjqzdate','实际作业开始时间');
							}
						}
					},{
						xtype:'fieldset',
						label:'实际作业结束时间',
						labelWidth:'40%',
						id:'sgjsdate',
						name:'sgjsdate',
						required:true,
						dateFormat: 'Y-m-d',
						listeners:{
							focus:function(){
								initDate2('sgjsdate','实际作业结束时间');
							}
						}
					},{
						xtype:'autoTextArea',
						label:'实际作业情况',
						labelWidth:'40%',
						id:'sjzyqk',
						name:'sjzyqk',
						required:true,
					}
					,  {
						xtype : 'selectfield',
						label : '是否出现上述风险（如果"是"，请详细说明情况）',
						id : 'iftype',
						name : 'iftype',
						labelWidth : '40%',
						placeHolder : '请选择',
						options : [
						{
							text : '',
							value : ''
						}, {
							text : '否',
							value: '否'
								
						}, {
							text : '是',
							value: '是'
						},],
					},{
						xtype:'autoTextArea',
						label:'检查情况',
						labelWidth:'40%',
						id:'checkqk',
						name:'checkqk',
						required:true,
					},{
						xtype:'fieldset',
						label:'实际安装时间',
						labelWidth:'40%',
						id:'sjazdate',
						name:'sjazdate',
						required:true,
						dateFormat: 'Y-m-d',
						listeners:{
							focus:function(){
								initDate2('sjazdate','实际安装时间');
							}
						}
					},{
						xtype:'fieldset',
						label:'拆除时间',
						labelWidth:'40%',
						id:'chaicdate',
						name:'chaicdate',
						required:true,
						dateFormat: 'Y-m-d',
						listeners:{
							focus:function(){
								initDate2('chaicdate','拆除时间');
							}
						}
					}
					,{
						xtype:'autoTextArea',
						label:'拆除所采取安全防护措施',
						labelWidth:'40%',
						id:'fanghucs',
						name:'fanghucs',
						required:true,
					},{
						xtype:'autoTextArea',
						label:'是否完全拆除',
						labelWidth:'40%',
						id:'sfwqcc',
						name:'sfwqcc',
						required:true,
					},
					
					{
						xtype:'fieldset',
						title:'',
						items:[
							 {
								xtype : 'selectfield',
								label : '是否送修',
								id : 'ifrepair',
								name : 'ifrepair',
								labelWidth : '40%',
								placeHolder : '请选择',
								options : [
								{
									text : '',
									value : ''
								}, {
									text : '否',
									value: '否'
										
								}, {
									text : '是',
									value: '是'
								},],
							}
						]
					},
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
					{ xtype:'textfield', id:'zhiwu', name:'zhiwu' },
					{ xtype:'textfield', id:'ident_id', name:'ident_id' },
					{ xtype:'textfield', id:'toco_dat', name:'toco_dat' },
					{ xtype:'textfield', id:'others',  name:'others' },
					{ xtype:'textfield', id:'attfjpathway', name:'attfjpathway' },
					{ xtype:'textfield', id:'vers', name:'vers' },
					{ xtype:'textfield', id:'managermen', name:'managermen' },
					{ xtype:'textfield', id:'dept',  name:'dept' },
					{ xtype:'textfield', id:'createdate', name:'createdate' }
					
					
				]
			}]
		}]
	}
});