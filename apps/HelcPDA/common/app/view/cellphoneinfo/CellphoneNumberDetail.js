Ext.define('HelcPDA.view.cellphoneinfo.CellphoneNumberDetail', {
	extend : 'Ext.Panel',
	id : 'cellphoneNumberDetailID',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.Text' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '电话信息',
			items : [ {
				xtype : 'button',
				ui : 'back',
				id : 'btn_BackToInputNumber',
				text : '返回'
			}]
		}, {
			xtype : 'formpanel',
			height : '100%',
			items : [ {
				xtype : 'fieldset',
				title : '<p id="title_Name" style="text-align:left;">详细信息</p>',
				items : [ {
					xtype : 'textfield',
					label : '电话号码',
					id : 'cellphoneNumber',
					labelWidth : '60%',
					value : [],
					readOnly : true
				}, {
					xtype : 'textfield',
					label : '运营商',
					id : 'carrieroperator',
					labelWidth : '60%',
					value : [],
					readOnly : true
				},{
					xtype : 'textfield',
					label : '可用网络',
					id : 'networkType',
					labelWidth : '60%',
					value : [],
					readOnly : true
				}]
			}]
		} ]
	}
});