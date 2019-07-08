/**
 * JianshiinfoView
 */
Ext.define('Helcss.view.JianshiinfoView', {
    extend: 'Ext.Panel',
    id:'jianshiinfo',
    config: {
        items: [
            {
                xtype: 'toolbar',
//                docked: 'top',
                title:'<b>电梯信息</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'jsinfo_back',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button', 
                        id:'ssjs',
//                        docked: 'right',
                        text: '实时监视开始'
                    },
                    {
                        xtype: 'button', 
                        id:'ssjs_over',
//                        docked: 'right',
                        text: '实时监视结束'
                    }
                ]
            },
            {
                xtype: 'formpanel', 
                baseCls: 'x-form myform',
                height: 450,
                margin: '0 auto',
                width: '100%',
                scrollable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                id:'city',
                                label: '城市',
//                                value: '西安',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_domain',
                                label: '地盘名称',
//                                value: '万科城',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_site',
                                label: '大楼',
//                                value: '9号楼2单元',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_no',
                                label: '电梯工号',
//                                value: '10G005414',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_tyle',
                                label: '梯型',
//                                value: '直梯',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_layer',
                                label: '层/站',
//                                value: '18-18',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_checkdate',
                                label: '计划年检',
//                                value: '12-01',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_status',
                                label: '电梯状态',
//                                value: '正常',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'jk_status',
                                label: '监视状态',
//                                value: '正常',
                                readOnly: true
                            }  
                        ]
                    }
                ]
            },
            {
                xtype: 'image',
                bottom: 0,
                height: 470,
                width: '100%',
                src: 'images/hyaline.png'
            },
            {
                xtype: 'panel',
                padding: '75 0 0 0',
                style: 'background:#000;',
                width: '100%',
                height: 532, 
                items: [
                    {
                        xtype: 'panel',
                        id:'showfloor_bak',
                        height: 85,
//                      html: '<div style="float:left; margin:33px 0 0 180px;"><img width="20px" height="21px" src="images/arrow_down.png" /></div><b style="float:left;margin:33px 0 0 30px;width:70px;text-align: right;color:green;">{floor}</b>',
//                        tpl: [ 
//                                '<div style="float:left; margin:33px 0 0 180px;"><img width="20px" height="21px" src="{upOrdown}" /></div><b style="float:left;margin:26px 0 0 30px;width:70px;text-align: right;color:green; font-size:22pt;">{floor}</b>',
//                        ], 
                        style: 'float:left;margin-left:15px;background-image:url(images/elevator2.png);background-repeat:no-repeat',
                        width: '95%'
                         
                    }, 
//                    {
//                        xtype: 'panel',
//                        id:'showimage',
//                        height: 360, 
//                        width: 480,
//                        tpl: [ 
//                                '<div style="margin: 0 auto; width:480px; hright:360px;"><img src="{changepick}"/></div>'
//                          ],
//                        style: 'float:left;margin-left:15px;'
//                    },
                    {
                        xtype: 'container',
                        id:'showimage',
                        height: 360, 
                        width: 480,
//                        tpl: [ 
//                                '<div style="margin: 0 auto; width:480px; hright:360px;"><img src="{changepick}"/></div>'
//                          ],
//                        style: 'float:left;margin-left:15px;'
                        html:'<iframe width="480" height="360" src="Op_Cls_Door.html" id="sencha_content" name="sencha_content" style="border:none;"></iframe>',
                        style: 'float:left;margin-left:15px;',
                        items: [
                                {
                                    xtype: 'container',
                                    id:'showfloor',
                                    height: 66,
                                    left: 355,
//                                  style: 'background:url(images/arrow_down.png)',
                                    top: 115,
                                    width: 42,
                                    tpl: [ 
                                    '<div srtle="position: relative;"><div style="position: absolute;top:23px;left:0;width:100%;text-align: center;z-index:2">{floor}</div><img style="position: absolute;top:0;left:0;z-index:1;" src="{upOrdown}"/></div>'
                                    ]
//                                    items: [
//                                        {
//                                            xtype: 'label',
//                                            id:'showfloor',
//                                            height: 20,
//                                            html: '<div style="text-align: center;">{floor}</div>',
//                                            tpl:[
//                                                 '<div style="text-align: center;">{floor}</div>'
//                                            ],
//                                            margin: '23 auto'
//                                        }
//                                    ]
                                }
                            ]
                    },
                    {xtype: 'panel',
                    id:'toppanel',
                    data: '{"name" : "gengx"},', 
                    height: 280, 
                    width: 240, 
                    style: 'float:right;margin:0 15px 0 0',
                    tpl: [                           
'<div style="width:240px">',
'  <div class="{open}">开门</div><div class="{up}">上行</div>',
'  <div class="{close}">关门</div><div class="{down}">下行</div>',
'  <div class="{trapped_people}">困人</div><div class="{overhaul}">检修</div>',
'  <div class="{sbyx}">设备有效</div><div class="{dyyc}">电源异常</div>',
'  <div class="{bnqd}">不能起动</div><div class="{kgmyc}">门异常</div>',
'</div>'                                  
                    ]
                } 
                    
                ]
            }
        ]
    },
    initialize: function() {   
    	myLoading.show();  
    	
    	Ext.getCmp('ssjs_over').hide(); 
    	 
    	Ext.getCmp('showfloor').setData({upOrdown:'images/arrow_static.png',floor:'1'}); 
    	Ext.getCmp('showimage').setData({changepick:'images/elevator_2.png'}); 
    	Ext.getCmp('toppanel').setData({open:'led led_off',
    		                            up:'led led_off',
    		                            close:'led led_off',
    		                            down:'led led_off',
    		                            trapped_people:'led led_off',
    		                            overhaul:'led led_off',
    		                            sbyx:'led led_off',
    		                            dyyc:'led led_off',
    		                            bnqd:'led led_off',
    		                            kgmyc:'led led_off'}); 
    	
    	var invocationData = {  
                adapter : 'SqlAdapter',  
                procedure : 'procedure_jsListinfo', 
                parameters : [js_ele_no]
                
        }; 
    	
    	WL.Client.invokeProcedure(invocationData, {
            onSuccess : function (result) { 
            	var httpStatusCode = result.status;
            	if (200 == httpStatusCode) {
                    var invocationResult = result.invocationResult;
                    var isSuccessful = invocationResult.isSuccessful;
                    if (true == isSuccessful) {
                    	var resultSet = invocationResult.resultSet;
                    	console.log("resultSet:"+resultSet);  
                    	
                    	Ext.getCmp('city').setValue(resultSet[0].city);
                        Ext.getCmp('ele_domain').setValue(resultSet[0].ele_domain);
                        Ext.getCmp('ele_site').setValue(resultSet[0].ele_site);
                        Ext.getCmp('ele_no').setValue(resultSet[0].ele_no);
                        Ext.getCmp('ele_tyle').setValue(resultSet[0].ele_tyle);
                        Ext.getCmp('ele_layer').setValue(resultSet[0].ele_layer);
                        Ext.getCmp('ele_checkdate').setValue(resultSet[0].ele_checkdate);
                        Ext.getCmp('ele_status').setValue(resultSet[0].ele_status);
                    	
                        myLoading.hide();
                    	 
                    } else {
                    	myLoading.hide();
                    	Ext.Msg.alert('提示','获取数据失败!');  
                    }
                } else {
                	myLoading.hide();
                	Ext.Msg.alert('提示','网络出错！'); 
                }
            },  
            onFailure : function () {
            	 myLoading.hide();
            	 Ext.Msg.alert('提示','发送请求失败'); 
            	}
        });
    	
    	
//    	var invocationData = {  
//                adapter : 'HttpAdapter',  
//                procedure : 'getStories',
//                parameters : ['jianshiAction.do?method=SearchBy', "{'userid':'','ele_no':"+"'"+js_ele_no+"'"+"}"]
//        }; 
// 
//    	WL.Client.invokeProcedure(invocationData, {
//            onSuccess : function (result) { 
//            	var httpStatusCode = result.status;
//            	if (200 == httpStatusCode) {
//                    var invocationResult = result.invocationResult;
//                    var isSuccessful = invocationResult.isSuccessful;
//                    if (true == isSuccessful) {
//                    	var status = invocationResult.status.code;
//                    	if (status == 250) {
//                            var result = invocationResult.content; 
//                            // 转化成JSON对象
//                            var json = eval("("+ result +")");
//                            
//                            Ext.getCmp('city').setValue(json.rows[0].city);
//                            Ext.getCmp('ele_domain').setValue(json.rows[0].ele_domain);
//                            Ext.getCmp('ele_site').setValue(json.rows[0].ele_site);
//                            Ext.getCmp('ele_no').setValue(json.rows[0].ele_no);
//                            Ext.getCmp('ele_tyle').setValue(json.rows[0].ele_tyle);
//                            Ext.getCmp('ele_layer').setValue(json.rows[0].ele_layer);
//                            Ext.getCmp('ele_checkdate').setValue(json.rows[0].ele_checkdate);
//                            Ext.getCmp('ele_status').setValue(json.rows[0].ele_status);
//                  
//                    	} else {
////                    		alert("服务器出错！");
//                    	}
//                    } else {
////                    	alert("网络出错！");
//                    }
//                } else {
////                	alert("网络出错！");
//                }
//            },  
//            onFailure : function () {alert('ff');}
//        });
    	
 
    }

});