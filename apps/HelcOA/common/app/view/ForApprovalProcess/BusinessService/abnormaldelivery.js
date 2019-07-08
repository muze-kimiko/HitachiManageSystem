Ext.define('HelcOA.view.ForApprovalProcess.BusinessService.abnormaldelivery', {
    extend: 'Ext.Panel',
    id: 'sp_abnormaldelivery_id',
    requires: [
               'Ext.Toolbar',
               'Ext.Button',
               'Ext.Spacer',
               'Ext.form.Panel',
               'Ext.form.FieldSet',
               'Ext.field.DatePicker',
               'Ext.picker.Date',
               'Ext.field.TextArea'
           ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'surface_ID',
                title: '非正常发货要求联络书',
                items: [
                        {
	                        xtype: 'button',
	                        id: 'returnHome_ID',
	                        text: '返回',
	                        ui: 'back'
	                    },
	                    {
	                    	xtype: 'spacer'
	                    },
	                    {
	                    	xtype: 'button',
	                    	id: 'idea_ID',
	                    	text: '下一步'
	                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '编号',
                                labelWidth: '40%',
								name: 'fileno',
								id: 'fileno',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '发往地址',
                                labelWidth: '40%',
                                placeHolder: '请输入地址',
								name: 'name3922',
								id: 'name3922',
                            },
							{
								xtype: 'textfield',
								label: '合同买方',
                                labelWidth: '40%',
                                placeHolder: '请输入买方名称',
								id: 'htmf',
								name: 'htmf',
							},
							{
								xtype: 'textfield',
								label: '付款情况',
                                labelWidth: '40%',
                                placeHolder: '请输入付款情况',
								id: 'fqqk',
								name: 'fqqk',
							},
							{
								xtype: 'textfield',
								label: '所属区域',
                                labelWidth: '40%',
                                placeHolder: '请输入所属区域',
								id: 'ssqy',
								name: 'ssqy',
							},
							{
                                xtype: 'textfield',
                                label: '合同编号',
                                labelWidth: '40%',
								required: true,
                                placeHolder: '请输入合同编号',
								name: 'subject',
								id: 'subject'
                            },
							{
								xtype: 'textfield',
								label: '使用单位',
                                labelWidth: '40%',
                                placeHolder: '请输入使用单位',
								id: 'usedep',
								name: 'usedep',
							},
							{
								xtype: 'textfield',
								label: '申报部门',
                                labelWidth: '40%',
                                placeHolder: '请输入申报部门',
								id: 'appdep',
								name: 'appdep',
							},
							{
								xtype: 'textfield',
								label: '联系电话',
                                labelWidth: '40%',
                                placeHolder: '请输入联系电话',
								id: 'phone',
								name: 'phone',
							},
							{
								xtype: 'textfield',
								label: '传真号码',
                                labelWidth: '40%',
                                placeHolder: '请输入传真号码',
								id: 'fax',
								name: 'fax',
							},
							{
								xtype: 'textfield',
								label: '客户要求提前产出时间',
                                labelWidth: '40%',
                                placeHolder: '请输入产出时间',
								id: 'cbdate',
								name: 'cbdate',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('cbdate','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '提前交货的发货方式',
                                labelWidth: '40%',
                                placeHolder: '请输入发货方式',
								id: 'jhdate',
								name: 'jhdate',
							},
							{
								xtype: 'textfield',
								label: '销售科对应人员',
                                labelWidth: '40%',
                                placeHolder: '请输入对应人员',
								id: 'seller',
								name: 'seller',
							},
							{
								xtype: 'textfield',
								label: '回复时间',
                                labelWidth: '40%',
                                placeHolder: '请输入回复时间',
								id: 'hfdate',
								name: 'hfdate',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('hfdate','期望完成');
									}		
								}
							},
						]
					},
					{
						xtype: 'fieldset',
						title: "合同履行状况",
						items: [
							{
								xtype: 'textfield',
								label: '生产工号1',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'scgh1',
								name: 'scgh1',
							},
							{
								xtype: 'textfield',
								label: '梯种1',
                                labelWidth: '40%',
                                placeHolder: '请输入梯种',
								id: 'tz1',
								name: 'tz1',
							},
							{
								xtype: 'textfield',
								label: '要求工厂产出日期1',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqrq1',
								name: 'yqrq1',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqrq1','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '预排产日期1',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'bcrq1',
								name: 'bcrq1',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('bcrq1','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '投产日期1',
                                labelWidth: '40%',
                                placeHolder: '请输入投产日期',
								id: 'tcrq1',
								name: 'tcrq1',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('tcrq1','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '计划产出日期1',
                                labelWidth: '40%',
                                placeHolder: '请输入计划产出日期',
								id: 'ccrq1',
								name: 'ccrq1',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('ccrq1','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '要求提前产出日期1',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqtqrq1',
								name: 'yqtqrq1',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqtqrq1','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '生产工号2',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'scgh2',
								name: 'scgh2',
							},
							{
								xtype: 'textfield',
								label: '梯种2',
                                labelWidth: '40%',
                                placeHolder: '请输入梯种',
								id: 'tz2',
								name: 'tz2',
							},
							{
								xtype: 'textfield',
								label: '要求工厂产出日期2',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqrq2',
								name: 'yqrq2',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqrq2','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '预排产日期2',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'bcrq2',
								name: 'bcrq2',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('bcrq2','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '投产日期2',
                                labelWidth: '40%',
                                placeHolder: '请输入投产日期',
								id: 'tcrq2',
								name: 'tcrq2',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('tcrq2','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '计划产出日期2',
                                labelWidth: '40%',
                                placeHolder: '请输入计划产出日期',
								id: 'ccrq2',
								name: 'ccrq2',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('ccrq2','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '要求提前产出日期2',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqtqrq2',
								name: 'yqtqrq2',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqtqrq2','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '生产工号3',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'scgh3',
								name: 'scgh3',
							},
							{
								xtype: 'textfield',
								label: '梯种3',
                                labelWidth: '40%',
                                placeHolder: '请输入梯种',
								id: 'tz3',
								name: 'tz3',
							},
							{
								xtype: 'textfield',
								label: '要求工厂产出日期3',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqrq3',
								name: 'yqrq3',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqrq3','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '预排产日期3',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'bcrq3',
								name: 'bcrq3',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('bcrq3','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '投产日期3',
                                labelWidth: '40%',
                                placeHolder: '请输入投产日期',
								id: 'tcrq3',
								name: 'tcrq3',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('tcrq3','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '计划产出日期3',
                                labelWidth: '40%',
                                placeHolder: '请输入计划产出日期',
								id: 'ccrq3',
								name: 'ccrq3',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('ccrq3','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '要求提前产出日期3',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqtqrq3',
								name: 'yqtqrq3',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqtqrq3','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '生产工号4',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'scgh4',
								name: 'scgh4',
							},
							{
								xtype: 'textfield',
								label: '梯种4',
                                labelWidth: '40%',
                                placeHolder: '请输入梯种',
								id: 'tz4',
								name: 'tz4',
							},
							{
								xtype: 'textfield',
								label: '要求工厂产出日期4',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqrq4',
								name: 'yqrq4',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqrq4','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '预排产日期4',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'bcrq4',
								name: 'bcrq4',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('bcrq4','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '投产日期4',
                                labelWidth: '40%',
                                placeHolder: '请输入投产日期',
								id: 'tcrq4',
								name: 'tcrq4',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('tcrq4','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '计划产出日期4',
                                labelWidth: '40%',
                                placeHolder: '请输入计划产出日期',
								id: 'ccrq4',
								name: 'ccrq4',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('ccrq4','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '要求提前产出日期4',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqtqrq4',
								name: 'yqtqrq4',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqtqrq4','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '生产工号5',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'scgh5',
								name: 'scgh5',
							},
							{
								xtype: 'textfield',
								label: '梯种5',
                                labelWidth: '40%',
                                placeHolder: '请输入梯种',
								id: 'tz5',
								name: 'tz5',
							},
							{
								xtype: 'textfield',
								label: '要求工厂产出日期5',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqrq5',
								name: 'yqrq5',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqrq5','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '预排产日期5',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'bcrq5',
								name: 'bcrq5',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('bcrq5','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '投产日期5',
                                labelWidth: '40%',
                                placeHolder: '请输入投产日期',
								id: 'tcrq5',
								name: 'tcrq5',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('tcrq5','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '计划产出日期5',
                                labelWidth: '40%',
                                placeHolder: '请输入计划产出日期',
								id: 'ccrq5',
								name: 'ccrq5',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('ccrq5','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '要求提前产出日期5',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'yqtqrq5',
								name: 'yqtqrq5',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('yqtqrq5','期望完成');
									}		
								}
							},
							{
                                xtype: 'autoTextArea',
                                label: '要求内容陈述',
                                labelWidth: '40%',
								required: true,
                                placeHolder: '请输入内容',
								name: 'yqnrcs_textarea',
								id: 'yqnrcs_textarea'
                            },
						]
					},
					{
						xtype: 'fieldset',
						title: "制造本部回复",
						items: [
							{
								xtype: 'textfield',
								label: '生产工号',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'dscgh1',
								name: 'dscgh1',
							},
							{
								xtype: 'textfield',
								label: '设计书完成日期',
                                labelWidth: '40%',
                                placeHolder: '请输入完成日期',
								id: 'designfdate1',
								name: 'designfdate1',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('designfdate1','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '回复提前产出日期',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'reptqdate1',
								name: 'reptqdate1',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('reptqdate1','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '备注',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'remart1',
								name: 'remart1',
							},
								{
								xtype: 'textfield',
								label: '生产工号2',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'dscgh2',
								name: 'dscgh2',
							},
							{
								xtype: 'textfield',
								label: '设计书完成日期2',
                                labelWidth: '40%',
                                placeHolder: '请输入完成日期',
								id: 'designfdate2',
								name: 'designfdate2',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('designfdate2','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '回复提前产出日期2',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'reptqdate2',
								name: 'reptqdate2',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('reptqdate2','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '备注2',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'remart2',
								name: 'remart2',
							},
							{
								xtype: 'textfield',
								label: '生产工号3',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'dscgh3',
								name: 'dscgh3',
							},
							{
								xtype: 'textfield',
								label: '设计书完成日期3',
                                labelWidth: '40%',
                                placeHolder: '请输入完成日期',
								id: 'designfdate3',
								name: 'designfdate3',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('designfdate3','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '回复提前产出日期3',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'reptqdate3',
								name: 'reptqdate3',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('reptqdate3','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '备注3',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'remart3',
								name: 'remart3',
							},
							{
								xtype: 'textfield',
								label: '生产工号4',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'dscgh4',
								name: 'dscgh4',
							},
							{
								xtype: 'textfield',
								label: '设计书完成日期4',
                                labelWidth: '40%',
                                placeHolder: '请输入完成日期',
								id: 'designfdate4',
								name: 'designfdate4',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('designfdate4','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '回复提前产出日期4',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'reptqdate4',
								name: 'reptqdate4',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('reptqdate4','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '备注4',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'remart4',
								name: 'remart4',
							},
							{
								xtype: 'textfield',
								label: '生产工号5',
                                labelWidth: '40%',
                                placeHolder: '请输入生产工号',
								id: 'dscgh5',
								name: 'dscgh5',
							},
							{
								xtype: 'textfield',
								label: '设计书完成日期5',
                                labelWidth: '40%',
                                placeHolder: '请输入完成日期',
								id: 'designfdate5',
								name: 'designfdate5',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('designfdate5','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '回复提前产出日期5',
                                labelWidth: '40%',
                                placeHolder: '请输入产出日期',
								id: 'reptqdate5',
								name: 'reptqdate5',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('reptqdate5','期望完成');
									}		
								}
							},
							{
								xtype: 'textfield',
								label: '备注5',
                                labelWidth: '40%',
                                placeHolder: '请输入预排产日期',
								id: 'remart5',
								name: 'remart5',
							},
							{
								xtype: 'textfield',
								label: '回复提前产出时间',
                                labelWidth: '40%',
                                placeHolder: '请输入时间',
								id: 'name24',
								name: 'name24',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('name24','期望完成');
									}		
								}
							},
						]
					},
					{
						xtype: 'fieldset',
						hidden: true,
						items: [
							{
								xtype: 'textfield',
								id: 'conds',
								name: 'conds'
							},
							{
								xtype: 'textfield',
								id: 'userid',
								name: 'userid'
							},
							{
								xtype: 'textfield',
								id: 'type',
								name: 'type'
							},
							{
								xtype: 'textfield',
								id: 'username',
								name: 'username'
							},
							{
								xtype: 'textfield',
								id: 'node',
								name: 'node'
							},
							{
								xtype: 'textfield',
								id: 'ctime',
								name: 'ctime'
							},
							{
								xtype: 'textfield',
								id: 'piid',
								name: 'piid'
							},
							{
								xtype: 'textfield',
								id: 'processname',
								name: 'processname'
							},
							{
								xtype: 'textfield',
								id: 'curauthor',
								name: 'curauthor'
							},
							{
								xtype: 'textfield',
								id: 'dealmen',
								name: 'dealmen'
							},
							{
								xtype: 'textfield',
								id: 'ygbh',
								name: 'ygbh'
							},
							{
								xtype: 'textfield',
								id: 'form',
								name: 'form'
							},
							{
								xtype: 'textfield',
								id: 'arcpath',
								name: 'arcpath'
							},
							{
								xtype: 'textfield',
								id: 'arcdate',
								name: 'arcdate'
							},
							{
								xtype: 'textfield',
								id: 'idea',
								name: 'idea'
							},
							{
								xtype: 'textfield',
								id: 'endprocessdate',
								name: 'endprocessdate'
							},
							{
								xtype: 'textfield',
								id: 'audit_list',
								name: 'audit_list'
							},
							{
								xtype: 'textfield',
								id: 'taskid',
								name: 'taskid'
							},
							{
								xtype: 'textfield',
								id: 'ext1',
								name: 'ext1',
							},
							{
								xtype: 'textfield',
								id: 'mast',
								name: 'mast'
							},
							{
								xtype: 'textfield',
								id: 'createdate',
								name: 'createdate'
							},
							{
								xtype: 'textfield',
								id: 'dept',
								name: 'dept'
							},
							{
								xtype: 'textfield',
								id: 'agentman',
								name: 'agentman'
							},
						]     	
					}
				]
			}
		]
	}
});