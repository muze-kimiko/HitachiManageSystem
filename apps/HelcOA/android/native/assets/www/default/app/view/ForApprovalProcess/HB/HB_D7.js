
/* JavaScript content from app/view/ForApprovalProcess/HB/HB_D7.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_D7', {
	extend:'Ext.Panel',
	id:'sp_HB_D7_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		height:'100%',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置
			docked:'top',
			id:'surface_ID',
			title:'用车申请表',
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
					label:'乘车人数',
					labelWidth:'40%',
					id:'percount',
					name:'percount',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'乘车人员姓名',
					labelWidth:'40%',
					id:'passengers',
					name:'passengers',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'上车地点',
					labelWidth:'40%',
					id:'pickup',
					name:'pickup',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'预计返回地点',
					labelWidth:'40%',
					id:'destination',
					name:'destination',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'前往具体地址',
					labelWidth:'40%',
					id:'address',
					name:'address',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'预定出发时间',
					labelWidth:'40%',
					id:'ycdate',
					name:'ycdate',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'预计结束时间',
					labelWidth:'40%',
					id:'ycdate1',
					name:'ycdate1',
					readOnly:true,
				},{
					xtype:'autoTextArea',
					label:'用车事由',
					labelWidth:'40%',
					id:'usecarreason',
					name:'usecarreason',
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
						label:'司机',
						labelWidth:'40%',
						id:'driver',
						name:'driver',
						required:true,
					},{
						xtype:'autoTextArea',
						label:'车辆',
						labelWidth:'40%',
						id:'car',
						name:'car',
						required:true,
					},{
						xtype:'autoTextArea',
						label:'实际用车时间 起',
						labelWidth:'40%',
						id:'actualcardate',
						name:'actualcardate',
						required:true,
					},{
						xtype:'autoTextArea',
						label:'止',
						labelWidth:'40%',
						id:'actenddate1',
						name:'actenddate1',
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
					{ xtype:'textfield', id:'createdate', name:'createdate' },
					//以下部分字段，如果在非隐藏面板有的字段，这里必须去掉
					{ xtype:'textfield', id:'bm', name:'bm' },
					{ xtype:'textfield', id:'gangwei', name:'gangwei' },
					{ xtype:'textfield', id:'zhiwu', name:'zhiwu' },
					{ xtype:'textfield', id:'ident_id', name:'ident_id' },
					{ xtype:'textfield', id:'toco_dat', name:'toco_dat' },
					
					{ xtype:'textfield', id:'attfjpathway', name:'attfjpathway' },
					{ xtype:'textfield', id:'vers', name:'vers' },
					{ xtype:'textfield', id:'managermen', name:'managermen' }
					
				]
			}]
		}]
	}
});