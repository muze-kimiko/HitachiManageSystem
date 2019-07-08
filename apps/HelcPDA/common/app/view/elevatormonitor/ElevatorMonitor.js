Ext.define('HelcPDA.view.elevatormonitor.ElevatorMonitor', {
    extend: 'Ext.Container',
    id:'ElevatorMonitor_id',
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
                title: '实时监控',
                items: [
                    {
                    	 xtype: 'button',
                         ui:'back',
                         text: '主页',
                         id: 'backToMenus',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'search',
                        //id:'searCH_ID',
                    }
                ]
            },{
            	xtype:'container',
            	html: '<div>实时监控</div><div style="float:left;"><div><button type="button">连接</button><button type="button">断开</button></div>'+
	       		 '<div>10G019598</div>'+
	       		 '<div>北京万科金隅7栋3单元2梯</div></div><div style="float:right;"><div><span>连接状态</span><span>O</span></div><div>图片</div></div>'+
	       		 '<div>遥监设备状态</div>'+
	       		 '<div><table></table></div>'+
	       		 '<div>电梯运行状态</div>'+
	       		'<div><table></table></div>'
            }
        ]
    }

});