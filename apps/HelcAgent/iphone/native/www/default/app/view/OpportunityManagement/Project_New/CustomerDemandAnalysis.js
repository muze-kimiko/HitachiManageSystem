
/* JavaScript content from app/view/OpportunityManagement/Project_New/CustomerDemandAnalysis.js in folder common */
/*
 * File: app/view/CustomerDemandAnalysis.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcAgent.view.OpportunityManagement.Project_New.CustomerDemandAnalysis', {
    extend: 'Ext.form.Panel',
    id:'customerdemandanalysis_new_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Select'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '商机客户需求分析',
                cls:'textf',
                items: [
                    {
                    	id:'customerdemandanalysis_new_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                    	id:'customerdemandanalysis_new_id_BC',
                        xtype: 'button',
                        text: '保存'
                    },{
                    	id:'customerDemandOpportunity',
                    	xtype:'hiddenfield'
                    },{
                    	id:'customerDemandId',
                    	xtype:'hiddenfield'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '商机客户需求分析',
                cls:'textf',
                items: [
                    {
                    	id:'customerDemandType',
                        xtype: 'selectfield',
                        label: '需求类型',
                        placeHolder: '请选择需求类型',
                        labelWidth:'40%',
                    },
                    {
                    	id:'customerDemandItem',
                        xtype: 'selectfield',
                        label: '需求项',
                        placeHolder: '请选择需求项',
                        labelWidth:'40%',
                    }
                ]
            }
        ]
    }

});