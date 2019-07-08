/**
 * 
 */
Ext.define('HelcPDA.view.RegularInspection.RI_PhotoView',{
	extend: 'Ext.form.Panel',
	
	requires: [
	    'Ext.Toolbar',
	    'Ext.form.FieldSet',
	    'Ext.field.Text',
	    'Ext.field.Hidden',
	],
	
	config: {
		id: 'RI_PhotoView',
		layout: 'vbox',
		items: [
		    {
		    	xtype: 'toolbar',
		    	docked: 'top',
		    	title: '查看',
		    	items: [
		    	    {
		    	    	xtype: 'button',
		    	    	id: 'btn_RI_PhotoView_back',
		    	    	ui: 'back',
		    	    },
		    	    {
		    	    	xtype: 'spacer',
		    	    },
		    	    {
		    	    	xtype: 'button',
		    	    	id: 'btn_RI_PhotoView_save',
		    	    	text: '保存',
		    	    },
		    	]
		    },
		    {
		    	xtype: 'fieldset',
		    	items: [
					{
						xtype: 'hiddenfield',
						id: 'H_AttachFile_Index',
					},
					{
						xtype: 'hiddenfield',
						id: 'H_AttachFile_Id',
					},
		    	    {
		    	    	xtype: 'hiddenfield',
		    	    	id: 'H_RIP_Filename',
		    	    },
		    	    {
		    	    	xtype: 'textfield',
		    	    	id: 'T_RIP_FileName',
//		    	    	label: '名称<font color=\'red\'>*</font>',
		    	    	label: '名称',
		    	    },
		    	    {
		    	    	xtype: 'textfield',
		    	    	id: 'T_RIP_Comments',
		    	    	label: '说明'
		    	    },
		    	]
		    },
		    {
		    	xtype: 'container',
		    	id: 'RI_Con_PhotoView',
		    	flex: 1,
		    	margin: 5,
		    },
		    {
    	    	xtype: 'button',
    	    	docked: 'bottom',
    	    	margin: 5,
    	    	hidden: true,
    	    	id: 'btn_RI_PhotoView_delete',
    	    	text: '删除',
    	    },
		]
	}
});