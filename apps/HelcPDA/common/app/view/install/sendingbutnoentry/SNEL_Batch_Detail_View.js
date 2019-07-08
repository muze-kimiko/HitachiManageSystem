Ext.define('HelcPDA.view.install.sendingbutnoentry.SNEL_Batch_Detail_View', {
	extend : 'Ext.Panel',
	id : 'SNEL_Batch_Detail_View_ID',
	requires : [ 'Ext.field.TextArea', 'Ext.Button', 'Ext.Spacer',
			'Ext.Toolbar', 'Ext.field.Radio', 'Ext.field.Hidden' ],
	config : {
		scrollable : 'vertical',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '未进场填写原因',
			items : [ {
				xtype : 'button',
				id : 'batch_Back_To_SNEL_jobNo_View',
				ui : 'back',
				text : '返回'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'button',
				id : 'commit_SNED_Batch_View',
				text : '提交'
			} ]
		}, {
			xtype : 'fieldset',
			id : 'SNEL_Batch_Detail_Radiofield_ID',
			width:'70%',
			defaults : {
				xtype : 'radiofield',
				labelWidth: '80%'
			},
			items : [ {
				name : 'entry_Reason',						
				label : 'A：监理原因未填报进场',
				value : 'A'
			}, {
				name : 'entry_Reason',
				label : 'B：井道修整原因',
				value : 'B'
			}, {
				name : 'entry_Reason',
				label : 'C：进场录入系统（PDA）影响',
				value : 'C'
			}, {
				name : 'entry_Reason',
				label : 'D：未办理好政府告知手续，导致未进场施工',
				value : 'D'
			}, {
				name : 'entry_Reason',
				label : 'E：客户暂时不安装',
				value : 'E'
			}, {
				name : 'entry_Reason',
				label : 'F：甲方资金导致大楼烂尾、停工',
				value : 'F'
			}, {
				name : 'entry_Reason',
				label : 'G：安装合同未下达到监理PDA',
				value : 'G'
			}, {
				name : 'entry_Reason',
				label : 'H：代理商未及时提交开工报告信息',
				value : 'H'
			}, {
				name : 'entry_Reason',
				label : 'I：甲方原因（甲方自行安装）',
				value : 'I'
			}, {
				name : 'entry_Reason',
				label : 'J：甲方原因（货物下落不明）',
				value : 'J'
				//listeners : {
					//check : function(item, e) {
						//Ext.Msg.alert('请填写备注！');
						//WL.Toast.show('数据提交完成！');
						//WL.Toast.show('请填写备注！');
						//console.log('你选取 了：J其他原因（请备注）');
					//}
				//}
			}, {
				name : 'entry_Reason',
				label : 'K：安装人员不足',
				value : 'K'
			}, {
				name : 'entry_Reason',
				label : 'L：客户取消合同',
				value : 'L'
			}, {
				name : 'entry_Reason',
				label : 'M：拆梯套梯发货',
				value : 'M'
			}, {
				name : 'entry_Reason',
				label : 'N：其他原因（请备注）',
				value : 'N'
			}]
		}, {
			xtype : 'fieldset',
			id : 'batch_Fieldset2',
			title : '备注',
			items : [ {
				xtype : 'textareafield',
				id : 'SNEL_Batch_Txt_Memo',
				name : 'batch_Meno',
				clearIcon : true
			} ]
		} ]
	}
});