Ext.define('HelcPDA.view.report.ReportView',{
	extend: 'Ext.Panel',
	id:'reportview_homepage',
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
               title: '报表信息',
               items: [
                   {
                       xtype: 'button',
                       ui: 'back',
                       text: '主页',
                       id: 'backToMenus',
                   },
                   {
                       xtype: 'spacer'
                   }
               ]
           },
           {
               xtype: 'list',
               id: 'report_list',
               flex: 1,
//               data: [
//                   {
//                       title: '故障过程处理报表',
//                       color: '#62bb47',
//                       number: '1',
//                       icon: 'Z'
//                   },
//                   {
//                       title: '保养计划报表',
//                       color: '#fbb726',
//                       number: '1',
//                       icon: 'Z'
//                   },
//                   {
//                       title: '故障报告书报表',
//                       color: '#f6821f',
//                       number: '3',
//                       icon: 'Z'
//                   },
//                   {
//                       title: '安装台量报表',
//                       color: '#e03a3e',
//                       number: '1',
//                       icon: 'Z'
//                   },
//                   {
//                       title: '安装周期报表',
//                       color: '#963d97',
//                       number: '2',
//                       icon: 'Z'
//                   },
//                   {
//                       title: '安装录入情况报表',
//                       color: '#009ddc',
//                       number: '3',
//                       icon: 'Z'
//                   },
//                   {
//                       title: '安装完工情况报表',
//                       color: '#62bb47',
//                       number: '1',
//                       icon: 'Z'
//                   },
//                   {
//                       title: '维保业绩',
//                       color: '#fbb726',
//                       number: '2',
//                       icon: 'Z'
//                   }
//               ],
               itemTpl: [
                   '<table width="94%" border="0" cellpadding="0" cellspacing="0">',
                   '  <tr style="height:26px;">',
                   '      <td style="width:28px;"><div class="t_badge_Icon" style="color:{color}">{icon}</div></td>',
                   '      <td>{title}<font style="margin-left:10px;font-size:10pt;color:#3d4245">{time}</font></td>',
                   '  </tr>',
                   '</table>'
                   ],
                   onItemDisclosure: true
               }
           ]
       }

   });