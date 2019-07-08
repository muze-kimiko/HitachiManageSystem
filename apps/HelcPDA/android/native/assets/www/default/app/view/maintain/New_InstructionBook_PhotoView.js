
/* JavaScript content from app/view/maintain/New_InstructionBook_PhotoView.js in folder common */
/**
 * 
 */
Ext.define('HelcPDA.view.maintain.New_InstructionBook_PhotoView',{
	extend: 'Ext.form.Panel',
	
	requires: [
	    'Ext.Toolbar',
	    'Ext.form.FieldSet',
	    'Ext.field.Text',
	    'Ext.field.Hidden',
	],
	
	config: {
		id: 'New_InstructionBook_PhotoView',
		layout: 'vbox',
		items: [
		    {
		    	xtype: 'toolbar',
		    	docked: 'top',
		    	title: '查看',
		    	items: [
		    	    {
		    	    	xtype: 'button',
		    	    	id: 'Back_btn_New_InstructionBook_PhotoView',
		    	    	ui: 'back',
		    	    	text: '返回',
		    	    },
//		    	    {
//		    	    	xtype: 'spacer',
//		    	    },
//		    	    {
//		    	    	xtype: 'button',
//		    	    	id: 'Save_btn_PhotoView',
//		    	    	text: '保存',
//		    	    },
		    	]
		    },
//		    {
//		    	xtype: 'fieldset',
//		    	items: [
//		    	    {
//		    	    	xtype: 'hiddenfield',
//		    	    	id: 'H_Filename',
//		    	    },
//		    	    {
//		    	    	xtype: 'textfield',
//		    	    	id: 'T_MeasureItemAttachFileName',
//		    	    	label: '名称<font color=\'red\'>*</font>',
//		    	    },
//		    	    {
//		    	    	xtype: 'textfield',
//		    	    	id: 'T_MeasureItemAttachComments',
//		    	    	label: '注释'
//		    	    },
//		    	]
//		    },
		    {
		    	xtype: 'container',
		    	id: 'Con_New_InstructionBook_PhotoView',
		    	flex: 1,
		    	margin: 5,
		    },
		]
	}
});