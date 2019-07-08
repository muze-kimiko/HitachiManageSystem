
/* JavaScript content from app/view/report/maintainplanbb/ReportMaintainPlanStation_list_View.js in folder common */
Ext.define('HelcPDA.view.report.maintainplanbb.ReportMaintainPlanStation_list_View',{
	extend: 'Ext.Panel',
	id:'reportMaintainPlanStation_list_View',
    requires: [
               'Ext.Toolbar',
               'Ext.Button',
               'Ext.Spacer',
               'Ext.Label',
               'Ext.dataview.List',
               'Ext.XTemplate'
           ],

           config: {
               layout: 'vbox',
               items: [
                   {
                       xtype: 'toolbar',
                       docked: 'top',
                       title: '保养计划报表',
                       items: [
                           {
                               xtype: 'button',
                               ui: 'back',
                               id:'maintainbbsta_back',
                               text: '返回',
                           },
                           {
                               xtype: 'spacer'
                           },
                           {
                               xtype: 'button',
                               id:'preveMonthSta',
                               text: '上月'
                           },
                           {
                               xtype: 'button',
                               id:'nowMonthSta',
                               hidden:true,
                               text: '本月'
                           }
                       ]
                   },
                   {
                       xtype: 'toolbar',
                       docked: 'top',
                       layout:{
                               type:'vbox'
                       },
                       items: [
                           {
                               xtype: 'label',
                               id:'CreaSta_Mesg',
                               margin: '0 0 0 20'
                           },
                           {
                               xtype: 'spacer'
                           },
                           {
                               xtype: 'label',
                               id:'CreaSta_datatime',
                               hidden:true,
                               margin: '0 20 0 0'
                           }
                       ]
                   },
                   {
                       xtype: 'toolbar',
                       docked: 'top',
                       items: [
                           {
                               xtype: 'list',
                               data: [
                               ],
                               height: 60,
                               draggable:false,
                               width: '100%',
                               style:'background:#EDEBF1;',
                               id:'ReportPlanStation_list1',
                               store:'ReportMaintainPlanStationStore',
                               selectedCls:'',
                               itemTpl: [
                                   '<table border=0 width=100% style="color:#666">',
                                   '  <tr>',
                                   '    <td colspan="2" rowspan="2" width=60% style="color:#000;text-align:center;vertical-align: middle;">{STATION}</td>',
                                   '  </tr>',
                                   '</table>'
                               ],
                               
                           }
                       ]
                   },
                   {
                       xtype: 'list',
                       height: '100%',
                       id:'ReportPlanStation_list2',
                       store:'ReportMaintainPlanStationStore1',
                       selectedCls:'',
                       deselectOnContainerClick:true,
                       itemTpl: [
                           '<table border=0 width=100% style="color:#666">',
                           '  <tr>',
                           '    <td colspan="2" width=60% style="color:#000;">{STATION}</td>',
                           '  </tr>',
                           '  <tr>',
                           '    <td width=50%>应编制计划:{ELV_AMOUNT}</td>',
//                           '    <td width=50% style="padding-right:5px;text-align: right;">已录入实绩:{ENTERED_AP}</td>',
                           '    <td width=50% style="padding-right:5px;text-align: right;">已编制保养计划率:{TOTAL_RATE}</td>',
                           '  </tr>',
                           '</table>'
                       ],
                       onItemDisclosure: true
                   }
               ]
           }

});