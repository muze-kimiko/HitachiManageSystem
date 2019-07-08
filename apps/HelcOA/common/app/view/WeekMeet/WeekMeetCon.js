Ext.define('HelcOA.view.WeekMeet.WeekMeetCon', {
    extend: 'Ext.Panel',
    id: 'WeekMeetCon_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        listeners:{
                          	tap:function(){
                          		var obj1=Ext.getCmp('WeekMeet_id');
                           		if(!obj1){
                           			obj1=Ext.create('HelcOA.view.WeekMeet.WeekMeet');
                           		}
                           		Ext.Viewport.setActiveItem(obj1);
                           	}
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                scrollable: true,
                flex: 1,
                padding: 10,
                items: [

                        {
                            xtype: 'label',
                            id: 'weekmeet_subject',
                            style: 'font-size:14pt;color:#9d4a02;text-align:center'
                        },
                        {
                            xtype: 'label',
                            id: 'startdate',
                            margin: '15 0 0 0',
                            style: 'color:#666',
                        },
                        {
                        	xtype: 'label',
                        	id: 'appointmenttype',
                        	margin: '15 0 0 0',
                        	style: 'color:#666',
                        },
                        {
                        	xtype: 'label',
                        	id: 'stime',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
                        {
                        	xtype: 'label',
                        	id: 'etime',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
                        {
                        	xtype: 'label',
                        	id: 'chair',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
                        {
                        	xtype: 'label',
                        	id: 'address',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
                        {
                        	xtype: 'label',
                        	id: 'subject',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
                        {
                        	xtype: 'label',
                        	id: 'body',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
                        {
                        	xtype: 'label',
                        	id: 'copyto',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
                        {
                        	xtype: 'label',
                        	id: 'notes',
                        	margin: '15 0 0 0',
                        	style: 'color:#666'
                        },
//                    {
//                        xtype: 'label',
//                        html: '<p>    基于信息安全及邮件收发稳定性考虑，信息中心计划2014年6月18日19:00起调整OA邮箱发往日本总部相关域名（包括有hitachi.com、hbs.co.jp、uc.mito.hitachi.co.jp、jyou.hbs.co.jp、builcare.hbs.co.jp）的邮件经GWAN专线网络进行邮递，调整期间可能会出现邮件不能正常外发至日本总部的情况，请各位同事不要使用OA邮箱与日本总部邮箱进行通讯。调整将于2014年6月18日22:00结束，恢复与日本总部邮箱的正常通讯。由此引起的不便，敬请谅解。谢谢！<p/>',
//                        margin: '15 0 0 0',
//                        style: 'color:#666'
//                    },
//                        {
//                            xtype: 'formpanel',
//                            height: '80%',
//                            items: [
//		                        {
//		                            xtype: 'fieldset',
//		                            title: '',
//		                            items: [
//		                                {
//		                                    xtype: 'textfield',
//		                                    label: '会议',
//		                                    labelWidth: '40%',
//		                                    readOnly:true,
//		                                    value: 'sdfsd',
//		                                }
//		                            ]
//		                        },
//		                     ]
//                        }
//                    {
//                        xtype: 'label',
//                        html: '信息中心<br />2014年6月10日',
//                        margin: '20 0 0 0',
//                        style: 'text-align: right'
//                    }
                ]
            }
        ]
    }

});