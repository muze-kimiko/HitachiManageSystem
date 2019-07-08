
/* JavaScript content from app/view/ForApprovalProcess/HB/HB_A7.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_A7', {
	extend:'Ext.Panel',
	id:'sp_HB_A7_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置
			docked:'top',
			id:'surface_ID',
			title:'培训过程记录及试用期鉴定表',
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
					label:'申请人',
					labelWidth:'40%',
					id:'agentman',
					name:'agentman',
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
					label:'所属部门',
					labelWidth:'40%',
					id:'bm',
					name:'bm',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'岗位',
					labelWidth:'40%',
					id:'gangwei',
					name:'gangwei',
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
					label:'申请时间',
					labelWidth:'40%',
					id:'createdate',
					name:'createdate',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'学历',
					labelWidth:'40%',
					id:'xl',
					name:'xl',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'入司时间',
					labelWidth:'40%',
					id:'toco_dat',
					name:'toco_dat',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'试用期起止时间',
					labelWidth:'40%',
					id:'stdate',
					name:'stdate',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'到',
					labelWidth:'40%',
					id:'endate',
					name:'endate',
					readOnly:true,
				}
				
				,{
					xtype:'textfield',
					label:'所在科室意见：打分标准--- 优秀（5分），良好（3分），一般（2分），较差（0分）',
					labelWidth:'40%',
					
				},{
					xtype:'textfield',
					label:'专业知识',
					labelWidth:'40%',
					id:'fs1',
					name:'fs1',
					required:true,
				},{
					xtype:'textfield',
					label:'工作能力',
					labelWidth:'40%',
					id:'fs2',
					name:'fs2',
					required:true,
				},{
					xtype:'textfield',
					label:'工作效率',
					labelWidth:'40%',
					id:'fs3',
					name:'fs3',
					required:true,
				},{
					xtype:'textfield',
					label:'协调能力',
					labelWidth:'40%',
					id:'fs4',
					name:'fs4',
					required:true,
				},{
					xtype:'textfield',
					label:'工作态度',
					labelWidth:'40%',
					id:'fs5',
					name:'fs5',
					required:true,
				},{
					xtype:'textfield',
					label:'性格品德',
					labelWidth:'40%',
					id:'fs6',
					name:'fs6',
					required:true,
				}
				,{
					xtype:'textfield',
					label:'合计',
					labelWidth:'40%',
					id:'hjf',
					name:'hjf',
					required:true,
				}
				
				,{
					xtype:'textfield',
					label:'是否留用',
					labelWidth:'40%',
					id:'ifly',
					name:'ifly',
					required:true,
				},{
					xtype:'textfield',
					label:'是否再培训',
					labelWidth:'40%',
					id:'ifzpx',
					name:'ifzpx',
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
					
					{ xtype:'textfield', id:'ident_id', name:'ident_id' },
					{ xtype:'textfield', id:'attfjpathway', name:'attfjpathway' },
					{ xtype:'textfield', id:'managermen', name:'managermen' },
					{ xtype:'textfield', id:'subject',  name:'subject' }

				]
			}]
		}]
	}
});