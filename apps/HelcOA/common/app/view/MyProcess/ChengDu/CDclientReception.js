Ext.define('HelcOA.view.MyProcess.ChengDu.CDclientReception', {
	extend : 'Ext.Panel',
	id : 'wdlc_CDclientReception_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			title : '成都公务用车',
			items : [
			{
		        xtype: 'button',
		        id: 'wdlc_returnMyProcess',
		        text: '返回',
		        ui: 'back'
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
				items : [ {
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '单号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入单号'
				},
				{
					xtype : 'textfield',
					label : '来访单位',
					labelWidth : '40%',
					name : 'ccompany',
					id : 'ccompany',
					required : true,
					readOnly:true,
					
					placeHolder : '请输入来访单位'
				},
				{
					xtype : 'textfield',
					label : '人数',
					labelWidth : '40%',
					name : 'num',
					id : 'num',
					required : true,
					readOnly:true,
					placeHolder : '请输入人数'
				},
				{
					xtype : 'textfield',
					label : '所属部门',
					labelWidth : '40%',
					name : 'ssbm',
					id : 'ssbm',
					required : true,
					readOnly:true,
					placeHolder : '请输入所属部门'
				},
				{
					xtype : 'textfield',
					label : '项目名称',
					labelWidth : '40%',
					name : 'subject',
					id : 'subject',
					required : true,
					readOnly:true,
					placeHolder : '请输入项目名称'
				},
				{
                     xtype: 'fieldset',
                     title: '',
                     items: [
                         {
                             xtype: 'textfield',
                             id: 'lfkh',
                             name: 'lfkh',
                             label: '来访客户1',
                             required: true,
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入来访客户1'
                         },
                         {
                             xtype: 'textfield',
                             id: 'zw',
                             name: 'zw',
                             label: '职务1',
                             required:true,
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入职务1'
                         },
                         {
                             xtype: 'textfield',
                             id: 'tel',
                             name: 'tel',
                             label: '电话1',
                             required: true,
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入电话1'
                         },
						 {
                             xtype: 'textfield',
                             id: 'lfkh1',
                             name: 'lfkh1',
                             label: '来访客户2',
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入来访客户2'
                         },
                         {
                             xtype: 'textfield',
                             id: 'zw1',
                             name: 'zw1',
                             label: '职务2',
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入职务2'
                         },
                         {
                             xtype: 'textfield',
                             id: 'tel1',
                             name: 'tel1',
                             label: '电话2',
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入电话2'
                         },
						 {
                             xtype: 'textfield',
                             id: 'lfkh2',
                             name: 'lfkh2',
                             label: '来访客户3',
                             labelWidth: '40%',
         					readOnly:true,
                             placeHolder: '请输入来访客户3'
                         },
                         {
                             xtype: 'textfield',
                             id: 'zw2',
                             name: 'zw2',
                             label: '职务3',
                             labelWidth: '40%',
         					readOnly:true,
                             placeHolder: '请输入职务3'
                         },
                         {
                             xtype: 'textfield',
                             id: 'tel2',
                             name: 'tel2',
                             label: '电话3',
                             labelWidth: '40%',
         					readOnly:true,
                             placeHolder: '请输入电话3'
                         },  
                     ]
                 },
				{
                     xtype: 'fieldset',
                     title: '',
                     items: [
                         {
                             xtype: 'textfield',
                             id: 'pt',
                             name: 'pt',
                             label: '陪同人员',
                             required: true,
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入陪同人员'
                         },
                         {
                             xtype: 'textfield',
                             id: 'dh',
                             name: 'dh',
                             label: '电话',
                             required:true,
         					readOnly:true,
                             labelWidth: '40%',
                             placeHolder: '请输入电话'
                         },
                         {
							xtype: 'selectfield',
							id: 'qtqk',
							label: '签梯情况',
							required : true,
							readOnly:true,
							labelWidth: '40%',
							placeHolder: '请选择签梯情况',
							options: [										          
								{
									text: '',
									value: ''
								}, 
								{
									text: '已签约',
									value: '已签约'
								},
								{
									text: '跟踪中',
									value: '跟踪中'
								}
						]
							},
                     ]
                 },
				 {
                     xtype: 'fieldset',
                     title: '接站',
                     items: [
                        {
							xtype: 'selectfield',
							id: 'isneed1',
							label: '要/不要',
							readOnly:true,
							labelWidth: '40%',
							placeHolder: '请选择签梯情况',
							options: [										          
										{
											text: '',
											value: ''
										}, 
										{
											text: '要',
											value: '要'
										},
										{
											text: '不要',
											value: '不要'
										}
									]
						},
						{
							xtype : 'textfield',
							label : '日期',
							labelWidth : '40%',
							name : 'jdate',
							id : 'jdate',
							readOnly:true,
							placeHolder : '请输入时间',
							dateFormat: 'Y-m-d',
							listeners:{
								focus:function(){
									initDate2('jdate','时间');
								}
							}
						},
						 {
							 xtype: 'textfield',
							 id: 'stime',
							 name: 'stime',
								readOnly:true,
							 label: '起飞',
							 labelWidth: '40%',
							 placeHolder: '请输入起飞'
						 },
							{
								xtype : 'autoTextArea',
								label : '拟选型号台数',
								labelWidth : '40%',
								name : 'xhts',
								readOnly:true,
								required: true,
								id : 'xhts',
								placeHolder : '请输入其它接待要求'
							},
						{
							xtype : 'autoTextArea',
							label : '其它接待要求',
							labelWidth : '40%',
							name : 'call_textarea',
							readOnly:true,
							id : 'call_textarea',
							placeHolder : '请输入其它接待要求'
						},						 
                     ]
                 },
				{
                     xtype: 'fieldset',
                     title: '接机牌',
                     items: [
    				 {
    							 xtype: 'textfield',
    							 id: 'hb',
    							 name: 'hb',
    							 label: '航班',
    								readOnly:true,
    							 labelWidth: '40%',
    							 placeHolder: '请输入航班'
    					 },
						 {
							 xtype: 'textfield',
							 id: 'stime',
							 name: 'stime',
								readOnly:true,
							 label: '起飞',
							 labelWidth: '40%',
							 placeHolder: '请输入起飞'
						 },
						{
							 xtype: 'textfield',
							 id: 'etime',
							 name: 'etime',
								readOnly:true,
							 label: '到达',
							 labelWidth: '40%',
							 placeHolder: '请输入到达'
						 },						 
                     ]
                 },
				{
                     xtype: 'fieldset',
                     title: '参观工厂',
                     items: [
                       {
							xtype: 'selectfield',
							id: 'isneed2',
							label: '要/不要',
							labelWidth: '40%',
							readOnly:true,
							placeHolder: '请选择接站',
							options: [										          
								{
									text: '',
									value: ''
								}, 
								{
									text: '要',
									value: '要'
								},
								{
									text: '不要',
									value: '不要'
								}
						]
						}, 
						{
							xtype : 'textfield',
							label : '日期',
							labelWidth : '40%',
							name : 'cdate',
							id : 'cdate',
							readOnly:true,
							placeHolder : '请输入时间',
							dateFormat: 'Y-m-d',
							listeners:{
								focus:function(){
									initDate2('cdate','时间');
								}
							}
						},	
						{
							 xtype: 'textfield',
							 id: 'time2',
							 name: 'time2',
							 label: '日期',
							 labelWidth: '40%',
								readOnly:true,
							 placeHolder: '请输入日期'
						 },						
                     ]
                 },
				{
                     xtype: 'fieldset',
                     title: '参观总部',
                     items: [
                       {
							xtype: 'selectfield',
							id: 'isneed3',
							label: '要/不要',
							readOnly:true,
							labelWidth: '40%',
							placeHolder: '请选择接站',
							options: [										          
								{
									text: '',
									value: ''
								}, 
								{
									text: '要',
									value: '要'
								},
								{
									text: '不要',
									value: '不要'
								}
						]
						}, 
						{
							xtype : 'textfield',
							label : '日期',
							labelWidth : '40%',
							name : 'czdate',
							id : 'czdate',
							readOnly:true,
							placeHolder : '请输入时间',
							dateFormat: 'Y-m-d',
							listeners:{
								focus:function(){
									initDate2('czdate','时间');
								}
							}
						},	
						{
							 xtype: 'textfield',
							 id: 'time3',
							 name: 'time3',
							 label: '日期',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入日期'
						 },						
                     ]
                 },
				{
                     xtype: 'fieldset',
                     title: '参观工程本部',
                     items: [
                       {
							xtype: 'selectfield',
							id: 'isneed4',
							label: '要/不要',
							labelWidth: '40%',
							readOnly:true,
							placeHolder: '请选择接站',
							options: [										          
								{
									text: '',
									value: ''
								}, 
								{
									text: '要',
									value: '要'
								},
								{
									text: '不要',
									value: '不要'
								}
						]
						}, 
						{
							xtype : 'textfield',
							label : '日期',
							labelWidth : '40%',
							name : 'ycdate',
							readOnly:true,
							id : 'ycdate',
							placeHolder : '请输入时间',
							dateFormat: 'Y-m-d',
							listeners:{
								focus:function(){
									initDate2('ycdate','时间');
								}
							}
						},	
						{
							 xtype: 'textfield',
							 id: 'time4',
							 name: 'time4',
							 label: '日期',
							 labelWidth: '40%',
								readOnly:true,
							 placeHolder: '请输入日期'
						 },	
						{
							xtype : 'autoTextArea',
							label : '需回避事项',
							labelWidth : '40%',
							name : 'hbthing_textarea',
							readOnly:true,
							id : 'hbthing_textarea',
							placeHolder : '请输入需回避事项'
						},					
                     ]
                 },
				 {
                     xtype: 'fieldset',
                     title: '安排住宿',
                     items: [
                       {
							xtype: 'selectfield',
							id: 'isneed5',
							readOnly:true,
							label: '要/不要',
							labelWidth: '40%',
							placeHolder: '请选择接站',
							options: [										          
								{
									text: '',
									value: ''
								}, 
								{
									text: '要',
									value: '要'
								},
								{
									text: '不要',
									value: '不要'
								}
						]
						}, 
						{
							xtype : 'textfield',
							label : '日期',
							labelWidth : '40%',
							readOnly:true,
							name : 'ycdate1',
							id : 'ycdate1',
							placeHolder : '请输入时间',
							dateFormat: 'Y-m-d',
							listeners:{
								focus:function(){
									initDate2('ycdate1','时间');
								}
							}
						},	
						{
							 xtype: 'textfield',
							 id: 'hotel',
							 name: 'hotel',
								readOnly:true,
							 label: '宾馆',
							 labelWidth: '40%',
							 placeHolder: '请输入宾馆'
						 }					
                     ]
                 },
				 
				 {
                     xtype: 'fieldset',
                     title: '订房人员',
                     items: [
                    {
					xtype : 'panel',
					layout : 'hbox',
					title: '订房人员',
					items : [
					{
						xtype : 'autoTextArea',
						id : 'sendreader',
						name : 'sendreader',
						readOnly:true,
						width : '90%',
						labelWidth : '48%',
						label : '订房人员',
					},
					{
						xtype : 'button',
						id : 'seluser245',
						readOnly:true,
						height : 41,
						style : 'border:0;',
						width : '10%',
						iconCls : 'search',
						text : '选择',
						listeners : {
							tap : function() {
								object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('sendreader');
							}
						}
						}
						]
					},
						{
							xtype : 'textfield',
							label : '日期',
							labelWidth : '40%',
							name : 'ycdate2',
							readOnly:true,
							id : 'ycdate2',
							placeHolder : '请输入时间',
							dateFormat: 'Y-m-d',
							listeners:{
								focus:function(){
									initDate2('ycdate2','时间');
								}
							}
						},	
						{
							 xtype: 'textfield',
							 id: 'room',
							 name: 'room',
							 label: '标准入房数',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入标准入房数'
						 },	
						{
							 xtype: 'textfield',
							 id: 'zftype',
								readOnly:true,
							 name: 'zftype',
							 label: '接待费用支付方式',
							 labelWidth: '40%',
							 placeHolder: '请输入接待费用支付方式'
						 }						
						 ]
					 },
				 {
                     xtype: 'fieldset',
                     title: '',
                     items: [
                       {
							xtype: 'selectfield',
							id: 'isneed5',
							label: '要/不要',
							readOnly:true,
							labelWidth: '40%',
							placeHolder: '请选择接站',
							options: [										          
								{
									text: '',
									value: ''
								}, 
								{
									text: '要',
									value: '要'
								},
								{
									text: '不要',
									value: '不要'
								}
						]
						}, 
						{
							xtype : 'textfield',
							label : '日期',
							readOnly:true,
							labelWidth : '40%',
							name : 'ycdate1',
							id : 'ycdate1',
							placeHolder : '请输入时间',
							dateFormat: 'Y-m-d',
							listeners:{
								focus:function(){
									initDate2('ycdate1','时间');
								}
							}
						},	
						{
							 xtype: 'textfield',
							 id: 'hotel',
							 name: 'hotel',
								readOnly:true,
							 label: '宾馆',
							 labelWidth: '40%',
							 placeHolder: '请输入宾馆'
						 }					
                     ]
                 },
					
					 {
                     xtype: 'fieldset',
                     title: '',
                     items: [
                      	{
							 xtype: 'textfield',
							 id: 'agentman',
							 name: 'agentman',
								readOnly:true,
							 label: '申请人',
							 labelWidth: '40%',
							 placeHolder: '请输入申请人'
						 },
                      	{
							 xtype: 'textfield',
							 id: 'createdate',
							 name: 'createdate',
								readOnly:true,
							 label: '申请时刻',
							 labelWidth: '40%',
							 placeHolder: '请输入申请时刻'
						 },
                      	{
							 xtype: 'textfield',
							 id: 'jsname',
							 name: 'jsname',
							 label: '接送人姓名',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入接送人姓名'
						 },
                      	{
							 xtype: 'textfield',
							 id: 'cphao',
							 name: 'cphao',
							 label: '车牌号',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入车牌号'
						 },
                      	{
							 xtype: 'textfield',
							 id: 'slname',
							 name: 'slname',
							 label: '受理人',
							 labelWidth: '40%',
								readOnly:true,
							 placeHolder: '请输入受理人'
						 },
                      	{
							 xtype: 'textfield',
							 id: 'lxtel',
							 name: 'lxtel',
							 label: '接送人电话',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入接送人电话'
						 }	,
                      	{
							 xtype: 'textfield',
							 id: 'ccdate',
							 name: 'ccdate',
							 label: '出车日期',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入出车日期'
						 }	,
                      	{
							 xtype: 'textfield',
							 id: 'didian',
							 name: 'didian',
							 label: '出车地点',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入出车地点'
						 }	,
                      	{
							 xtype: 'textfield',
							 id: 'sltime',
							 name: 'sltime',
							 label: '出车时间',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入出车时间'
						 }	,
                      	{
							 xtype: 'textfield',
							 id: 'lxr',
							 name: 'lxr',
							 label: '联系人',
							 labelWidth: '40%',
								readOnly:true,
							 placeHolder: '请输入联系人'
						 }		,
                      	{
							 xtype: 'textfield',
							 id: 'lxrdh',
							 name: 'lxrdh',
							 label: '联系人电话',
								readOnly:true,
							 labelWidth: '40%',
							 placeHolder: '请输入联系人电话'
						 }						 
                     ]
                 },

				 
			]},
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
					id : 'agentman',
					name : 'agentman'
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
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate'
				},{
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
				},{
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
                    id: 'agentpeofdep',
                    name: 'agentpeofdep',
                },
				{
                    xtype: 'textfield',
                    id: 'depflag',
                    name: 'depflag',
                },
				{
                    xtype: 'textfield',
                    id: 'tiaojian01',
                    name: 'tiaojian01',
                },
				{
                    xtype: 'textfield',
                    id: 'needzc',
                    name: 'needzc',
                },
				{
                    xtype: 'textfield',
                    id: 'dept',
                    name: 'dept',
                }]
			}]
		}]
	}
});