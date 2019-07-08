
/* JavaScript content from app/view/report/maintainbb/KeepAchievement_List_View.js in folder common */
/*
 * File: app/view/bbPanel4.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
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

Ext.define('HelcPDA.view.report.maintainbb.KeepAchievement_List_View', {
    extend: 'Ext.Panel',
    id:'keepAchievement_List_View',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '维保业绩报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'keepAchiv_back',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'info',
                        id:'info_show',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'textfield',
                        label: '时间',
                        id:'KeepAchiv_date',
                        placeHolder:'选择时间',
                        readOnly:true,
                        listeners:{
                        	focus:function(){
                        		iniMydate('KeepAchiv_date','维保时间');
                        	}
                        }
                    }
                ]
            },
            {
            	xtype:'label',
            	id:'showDate',
            	html:'报表统计年月:',
            	readOnly:true
            },
            {
                xtype: 'list',
                id:'keepAchiv_list',
                data: [
                   
                ],
                height: '100%',
                itemId: 'mylist7',
                store:'KeepAchievementListStore',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '    <tr>',
                    '    <td  style="color:#000;">{COMPANY_NAME}</td>',
                    '    <td width=50% style="padding-right:5px;text-align: right;">总台数:{NUM}</td>',
                    '  </tr>',
                    '  <tr style="height:24px">',
                    '    <td>月度预算:{BUDGET_ALL_BUDGET}</td>',
                    '    <td style="padding-right:5px;text-align: right;">年度预算:{BUDGET_ALL_BUDGET_QN}</td>',
                    '  </tr>',
                    '  <tr style="height:24px">',
                    '    <td>月完成率:{BUDGET_ALL_BUDGET_RATE}</td>',
                    '    <td style="padding-right:5px;text-align: right;">年完成率:{BUDGET_ALL_BUDGET_RATE_QN}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});



