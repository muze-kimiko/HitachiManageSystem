
/* JavaScript content from app/view/ForApprovalProcess/HB/HB_E5.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.HB.HB_E5', {
	extend:'Ext.Panel',
	id:'sp_HB_E5_id',	//文件ID，格式:功能前缀+文件名+id，前缀：待审批(sp),已审批(ysp),已结束(yjs),我的流程(wdlc)
	requires:[ 'Ext.Toolbar','Ext.Button','Ext.Spacer','Ext.form.Panel','Ext.form.FieldSet','Ext.field.DatePicker','Ext.picker.Date','Ext.field.TextArea'],
	config:{
		layout:'vbox',
		items:[
		{
			xtype:'toolbar',		//顶部操作面板设置
			docked:'top',
			id:'surface_ID',
			title:'物流平台合同及需财务审批文件用印申请表',
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
					label:'印章名称',
					labelWidth:'40%',
					id:'yzmc',
					name:'yzmc',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'用印数量',
					labelWidth:'40%',
					id:'yzsl',
					name:'yzsl',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'用印文件类型',
					labelWidth:'40%',
					id:'ytype',
					name:'ytype',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'用印文件名称',
					labelWidth:'40%',
					id:'subject',
					name:'subject',
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
					label:'收付款情况',
					labelWidth:'40%',
					id:'sfqk',
					name:'sfqk',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'付款形式',
					labelWidth:'40%',
					id:'fktype',
					name:'fktype',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'顾客/合作方名称',
					labelWidth:'40%',
					id:'hzf',
					name:'hzf',
					readOnly:true,
				}
				,{
					xtype:'textfield',
					label:'客户/合作方星级',
					labelWidth:'40%',
					id:'xj',
					name:'xj',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'合同编号',
					labelWidth:'40%',
					id:'htbh',
					name:'htbh',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'市场费用',
					labelWidth:'40%',
					id:'fee',
					name:'fee',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'知识产权归属',
					labelWidth:'40%',
					id:'cqgs',
					name:'cqgs',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'销售类型',
					labelWidth:'40%',
					id:'xstype',
					name:'xstype',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'销售/服务数量',
					labelWidth:'40%',
					id:'fwsl',
					name:'fwsl',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'销售价格等级',
					labelWidth:'40%',
					id:'xsjgdj',
					name:'xsjgdj',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'销售服务和质保期限',
					labelWidth:'40%',
					id:'qx',
					name:'qx',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'合同审议',
					labelWidth:'40%',
					id:'htsyi',
					name:'htsyi',
					readOnly:true,
				},{
					xtype:'textfield',
					label:'原因',
					labelWidth:'40%',
					id:'reason',
					name:'reason',
					readOnly:true,
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