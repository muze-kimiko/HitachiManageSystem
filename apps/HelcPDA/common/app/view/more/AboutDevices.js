Ext.define('HelcPDA.view.more.AboutDevices', {
    extend: 'Ext.Container',
    id: 'AboutDevices_id',
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
                title: '设备信息',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        listeners:{
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
         	    	   }
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '本机设备信息',
                        items: [
                            {
                                xtype: 'textfield',
                                clearIcon: false,
                                id: 'tf_deviceNo',
                                label: '设备号',
                                labelWidth: '32%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                clearIcon: false,
                                id: 'tf_imei',
                                label: 'IMEI',
                                labelWidth: '32%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                clearIcon: false,
                                id: 'tf_imsi',
                                label: 'IMSI',
                                readOnly: true,
                                labelWidth: '32%'
                            },
                        ]
                    }
                ]
            }
        ]
    }

});