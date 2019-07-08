/*
 * File: app/view/ProjectDirectorResult.js
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

Ext.define('HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResult', {
    extend: 'Ext.Container',                                            
    id:'projectdirectorresult_new_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '查找结果',
                cls:'textf',
            },{
            	xtype:'toolbar',
                docked: 'top',
                height: '6%',
                layout: 'hbox',
                style: 'background:#EDEBF1;',
                html:'<div style="width:100%;">'+
                		'<div class="anOneDiv">'+
                			'<div class="ysBlue anOne" style="width:96%;" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResultCtrl\').projectdirectorresult_new_id_FH();">'+SYB+'</div>'+
                		'</div>'+
                	'</div>',
            },{
            	id:'projectdirectorresult_new_id_list',
                xtype: 'list',
                height: '100%',
                store:'DirectorOpptyResultStore',
                cls:'textf',
                itemCls:'textf',
                width:'100%',
                style:'float:left',
                itemTpl:[
                         '<table border=0 width=100% style="color:#666"height=80>',
                         '  <tr>',
                         '    <td style="color:#000;padding-left:20px;font-size:12px;" colspan = "2">{OpportunityNumber}</td>',
                         '  </tr>',
                         '  <tr>',
                         '    <td width=40% style="padding-left:20px;font-size:12px;">{OpptyStatus}</td>',
                         '    <td width=60% style="padding-left:20px;font-size:12px;">{Name}</td>',
                         '  </tr>',
                         '  <tr>',
                         '	<td colspan = "2" style="padding-left:20px;font-size:12px;">{Account}</td>',
                         '  </tr>',
                         '</table>'
                         /*'<div><input type=\'checkbox\'>商机编号	商机名称</div>',
                         '<div>商机状态	客户名称</div>'*/
                     ],
                 plugins:[{
		            	id:'projectDirectorResultListPagPlugin',
		            	xclass: 'Ext.plugin.ListPaging',
		                autoPaging: false,
		                hidden:true,
		                loadMoreText:'<div id="projectDirectorResultListPagPluginText" style="width:100%;color:#5B5B5B;height:1%;">上拉加载更多数据</div>'
		            }]
            }
        ]
    }

});