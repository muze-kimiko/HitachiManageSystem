/**
 * JianKongView
 */ 
Ext.define('Helcss.view.JianKongView', {
    extend: 'Ext.Container',
    id:'jiankong',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
        'Ext.Img',
        'Ext.field.Search',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '<b>电梯信息</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'jk_back',
                        ui: 'back',
                        text: '返回'
                    } 
                ]
            },
            {
                xtype: 'panel',
                docked: 'top',
                height: 49,
                items: [
                    {
                        xtype: 'image',
                        height: 49,
                        src: 'images/01.jpg'
                    }
                ]
            }, 
          {
              xtype: 'formpanel', 
              height: '18%', 
              margin: '10 0 0 0',
              width: '100%',
              height: '450px',
              items: [
                  {
                      xtype: 'fieldset',
                      padding: '',
                      items: [
                          {
                              xtype: 'textfield', 
                              label: '地址',
                              id:'jk_address',
                              value: '广州市番禺区(测试)',
                              readOnly: true
                          },
                          {
                              xtype: 'textfield', 
                              label: '工号',
                              id:'jk_ele_no',
                              value: '12G003345(测试)',
                              readOnly: true
                          },
                          {
                              xtype: 'textfield', 
                              label: '监视状态',
                              id:'jk_status',
                              value: '正在连接监视终端...',
                              readOnly: true
                          } 
                            ]
                        }
                  ]
            },
            {
                xtype: 'panel',
                height: '100%',
                padding: '5 0 0 0',
                style: 'background:#efeff4;',
                items: [
                    {
                        xtype: 'panel',
                        padding: '5 0 0 0',
                        style: 'background:#000;',
                        width: '100%',
                        height: 435, 
                        items: [
                            {
                                xtype: 'panel',
                                id:'showfloor',
                                height: 85,
                                tpl: [ 
                                        '<div style="float:left; margin:33px 0 0 180px;"><img width="20px" height="21px" src="{upOrdown}" /></div><b style="float:left;margin:33px 0 0 30px;width:70px;text-align: right;color:green;">{floor}</b>',
                                ], 
                                style: 'float:left;margin-left:15px;background-image:url(images/elevator2.jpg);background-repeat:no-repeat',
                                width: '95%'
                                 
                            }, 
                            {
                                xtype: 'panel',
                                id:'showimage',
                                height: 360, 
                                width: 480,
                                tpl: [ 
                                        '<div style="margin: 0 auto; width:480px; hright:360px;"><img src="{changepick}"/></div>'
                                  ],
                                style: 'float:left;margin-left:15px;'
                            },
                            {xtype: 'panel',
                            id:'toppanel',
                            data: '{"name" : "gengx"},', 
                            height: 280, 
                            width: 180, 
                            style: 'float:right;margin:20px 40px; 0 0',
                            tpl: [ 
'<div style="width:240px">',
'  <div class="{open}">开门</div><div class="{up}">上行</div>',
'  <div class="{close}">关门</div><div class="{down}">下行</div>',
'  <div class="trapped_people">困人</div><div class="{overhaul}">检修</div>',
'  <div class="led led_green">设备有效</div><div class="led led_off">电源异常</div>',
'  <div class="led led_off">不能起动</div><div class="led led_off">门异常</div>',
'</div>'                                  
//            					'<div style="width:100%;">',
//            					'<table width="100%" height="180" cellpadding="0" cellspacing="0" border="0" style="text-align:center;font-size:16pt;color:#fff;">',
//            					'<tr>',
//            					'<td>开门</td>',
//            					'<td><img id="L1" align="absmiddle" width="20px" height="20px" src="{open}"/></td>',
//            					'<td width:"5px"></td>',
//            					'<td>上行</td>',
//            					'<td><img id="L2" align="absmiddle" width="20px" height="20px" src="{up}"/></td>',
//            					'</tr height="10px"><tr>',
//            					'<td>关门</td>',
//            					'<td><img id="L3" align="absmiddle" width="20px" height="20px" src="{close}"/></td>',
//            					'<td width:"5px"></td>',
//            					'<td>下行</td>',
//            					'<td><img id="L4" align="absmiddle" width="20px" height="20px" src="{down}"/></td>',
//            					'</tr height="10px"><tr>',
//            					'<td>困人</td>',
//            					'<td><img id="L5" align="absmiddle" width="20px" height="20px" src="{trapped_people}"/></td>',
//            					'<td width:"5px"></td>',
//            					'<td>检修</td>',
//            					'<td><img id="L6" align="absmiddle" width="20px" height="20px" src="{overhaul}"/></td>',
//            					'</tr>',
//            					'</table>',
//            					'</div>'
                            ]
                        } 
                            
                        ]
                    }
                ]
            }
        ]
 
    },
    initialize: function() {
    	Ext.getCmp('jk_address').setValue(jk_address);
        Ext.getCmp('jk_ele_no').setValue(jk_ele_no);
    	Ext.getCmp('showfloor').setData({upOrdown:'images/arrow_down.png',floor:'1'}); 
    	Ext.getCmp('showimage').setData({changepick:'images/elevator_2.gif'}); 
    	Ext.getCmp('toppanel').setData({open:'led led_off',
    		                            up:'led led_off',
    		                            close:'led led_off',
    		                            down:'led led_off',
    		                            trapped_people:'led led_off',
    		                            overhaul:'led led_off'
    		                            	
    		                            	
    	}); 
    	if(PDsystem==1){
    		Ext.getCmp('toppanel').setData({open:'led_az led_off',
                up:'led_az led_off',
                close:'led_az led_off',
                down:'led_az led_off',
                trapped_people:'led_az led_off',
                overhaul:'led_az led_off',
                }); 
    	}
    }
 
});