
/* JavaScript content from app/view/OpportunityManagement/Project_New/GZR/ConcernedAboutPeople.js in folder common */


Ext.define('HelcPAD.view.OpportunityManagement.Project_New.GZR.ConcernedAboutPeople', {
    extend: 'Ext.form.Panel',
    id:'ConcernedAboutPeople_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '邀请关注人',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'ConcernedAboutPeople_id_FH'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: '提交',
                        id:'ConcernedAboutPeople_id_TJ'
                    },
                ]
            },
            {
                xtype: 'fieldset',
                //id:'contractSearch_fieldset',
                //instructions: '所有可输入的查询条件均支持模糊查询',
                //title: '查询条件',
                items: [
                    {
                        xtype: 'textfield',
                       // cls:'textf',
                        labelWidth: '40%',
                        label: '关注人',
                        placeHolder: '请选择关注人',
                        id:'GZRname',
                        listeners:[{
                        	fn:function(component,eOpts){
                        		var me=this;
                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
                        	},
                        	event:'initialize'
                        }],
                        readOnly:false,
                    },
                    {//关注人ID
                    	id:'GZRnameId',
                    	xtype:'hiddenfield'
                    },
                    {//职位
                    	id:'GZRzw',
                    	xtype:'hiddenfield'
                    },
                    {//职位Id
                    	id:'GZRzwId',
                    	xtype:'hiddenfield'
                    }
                ]
            },
        ]
    }

});