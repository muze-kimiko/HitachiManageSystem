
/* JavaScript content from app/view/JianshiinfoView_AZ.js in folder common */
/**
 * JianshiinfoView_AZ
 */
Ext.define('Helcss.view.JianshiinfoView_AZ', {
    extend: 'Ext.Panel',
    id:'jianshiinfo_az',
    config: {
    	layout : 'vbox',
        items: [
            {
                xtype: 'toolbar',
                style:'font-size:12pt',
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
                        text: '监视开始'
                    },
                    {
                        xtype: 'button', 
                        id:'ssjs_over',
                        text: '监视结束'
                    }
                ]
            },
            {
                xtype: 'formpanel', 
                baseCls: 'x-form myform',
                height: 450,
                margin: '0 auto',
                width: '100%',
                scrollable: true,
                flex: 1,
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                id:'city',
                                cls:'x-form yjzy',
                                label: '城市',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_domain',
                                cls:'x-form yjzy',
                                label: '地盘名称',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_site',
                                cls:'x-form yjzy',
                                label: '大楼',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_no',
                                cls:'x-form yjzy',
                                label: '电梯工号',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_tyle',
                                cls:'x-form yjzy',
                                label: '梯型',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_layer',
                                cls:'x-form yjzy',
                                label: '层/站',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_checkdate',
                                cls:'x-form yjzy',
                                label: '计划年检',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'ele_status',
                                cls:'x-form yjzy',
                                label: '电梯状态',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id:'jk_status',
                                cls:'x-form yjzy',
                                label: '监视状态',
                                labelWidth: '40%',
                                readOnly: true
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
                                height: 270, 
                                items: [
                                    {
                                        xtype: 'panel',
                                        docked:'left',
                                        id:'showfloor_bak',
                                        height: 50,
                                        style: 'float:left;margin-left:10px;margin-top:10px;background-image:url(images/elevator2.png);background-repeat:no-repeat;background-size:220px 100%;',
                                        width: 220,
                                        items:[{
                                        	xtype: 'container',
                                            id:'showimage',
                                            height: 235, 
                                            width: 220,
                                            html:'<iframe width="220" height="235" src="Op_Cls_Door_AZ.html" id="sencha_content" name="sencha_content" style="border:none;"></iframe>',
                                            style: 'float:left;margin-left:0px;margin-top:50px;',
                                            items: [
                                                    {
                                                        xtype: 'container',
                                                        id:'showfloor',
                                                        height: 66,
                                                        left: 170,
                                                        top: 50,
                                                        width: 42,
                                                        tpl: [ 
                                                        '<div srtle="position: relative;">'+
                                                        '<div style="position: absolute;top:23px;left:0;width:100%;text-align: center;z-index:2">{floor}</div>'+
                                                        '<img style="position: absolute;top:0;left:0;z-index:1;" src="{upOrdown}"/>'+
                                                        '</div>'
                                                        ]
                                                    }
                                                ]
                                        }] 
                                    }, 
                                    /*{
                                    },*/
                                    {
	                                    xtype: 'panel',
	                                    id:'toppanel',
	                                    docked:'left',
	                                    data: '{"name" : "gengx"},', 
	                                    height: 235, 
	                                    width: 80, 
	                                    style: 'float:left;margin:10px 0 0 0;background:#000000;',
	                                    tpl: [                           
	                						'<div style="width:100%;padding:0 0 0 10px;">',
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
                    }
                ]
            },

        ]
    },
    
    
    initialize: function() {   
    	myLoading.show();  
    	
    	Ext.getCmp('ssjs_over').hide(); 
    	 
    	Ext.getCmp('showfloor').setData({upOrdown:'images/arrow_static.png',floor:'1'}); 
    	Ext.getCmp('showimage').setData({changepick:'images/elevator_2.png'}); 
    	Ext.getCmp('toppanel').setData({open:'led_az led_off',
    		                            up:'led_az led_off',
    		                            close:'led_az led_off',
    		                            down:'led_az led_off',
    		                            trapped_people:'led_az led_off',
    		                            overhaul:'led_az led_off',
    		                            sbyx:'led_az led_off',
    		                            dyyc:'led_az led_off',
    		                            bnqd:'led_az led_off',
    		                            kgmyc:'led_az led_off'}); 
    	
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
    	
 
    }

});