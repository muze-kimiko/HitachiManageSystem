Ext.define('HelcAgent.view.more.About', {
    extend: 'Ext.Panel',
    id: 'about_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Label'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '系统信息',
                items: [
                    {
                    	id:'about_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        /*listeners:{
         	    		   tap:function(){
         	    			    var length = ViewArray.length-1;
         	    				var viewId = ViewArray[length].ViewId;
         	    				var ViewName = ViewArray[length].ViewName;
         	    				var main = Ext.getCmp(viewId);
         	    				if(!main){
         	    					 main = Ext.create(ViewName);
         	    				}
         	    				Ext.Viewport.setActiveItem(main);
         	    				ViewArray.splice(ViewArray.length-1,1);
         	    		   }
         	    	   }*/
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '日立移动信息化服务系统',
                        items: [
                            {
                                xtype: 'textfield',
                                clearIcon: false,
                                label: '版权所有',
                                labelWidth: '32%',
                                value: [
                                    '日立电梯(中国)有限公司'
                                ],
                                cls:'textf',
                                readOnly:true,
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'text_RJKF',
                                clearIcon: false,
                                label: '软件开发',
                                cls:'textf',
                                labelWidth: '32%',
                                value: [
                                    '广州市华越友联科技发展有限公司'
                                ],
                                readOnly:true,
                            },
//                            {
//                                xtype: 'label',
//                                docked: 'bottom',
//                                html: '<div style="text-align:center">当前版本:V20140612.1</div>',
//                                margin: '10 auto',
//                                style: ''
//                            }
                        ]
                    }
                ]
            }
        ]
    }

});