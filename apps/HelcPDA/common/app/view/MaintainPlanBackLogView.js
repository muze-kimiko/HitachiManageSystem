Ext.define('HelcPDA.view.MaintainPlanBackLogView', {
    extend: 'Ext.List',
    id:'MaintainPlanBackLogList',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '保养计划-待办',
                items: [
                    {
                        xtype: 'button',
                        id:'backToBackLog',
                        ui: 'back',
                        text: '主页 '
                    },
                   ]
            }],
           store:'MaintailPlanBackLogStore',
           itemTpl: [
               '<table width="94%" border="0" cellpadding="0" cellspacing="0">',
               '  <tr style="height:26px;">',
               '      <td style="width:28px;"><div class="t_badge_Icon" style="color:#62bb47">W</div></td>',
               '      <td>{TASK_NAME}<font style="margin-left:10px;font-size:10pt;color:#3d4245">{PLAN_START_DT}</font></td>',
               '      <td style="width:20px;position:relative;"><span class="t_badge">{COUNT}</span></td>',
               '  </tr>',
               '</table>'
           ],
           onItemDisclosure: true
    }
});