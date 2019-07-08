
/* JavaScript content from app/view/fault/FaultHandlingReportPanelAccessories.js in folder common */
Ext.define('HelcPDA.view.fault.FaultHandlingReportPanelAccessories', {
    extend: 'Ext.Panel',
    id: 'faultHandlingReportPanelAccessories',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.field.Search',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '配件',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_FRP',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        handler: function(button, e) {
                           var viewName=Ext.getCmp('menu');
                 		   if(viewName){
                 			   viewName.destroy();
                 		   }
                            var menu = Ext.create('Ext.Menu', {
                            	id : 'menu',
                                items: [
                                {
                                    text: '增加',
                                    id: 'add_Accessories',
                                    iconCls: 'add',
                                    handler:function(button,e){
                                   		Ext.Viewport.hideMenu('right');
                                    }
                                },
                                {
                                    text: '修改',
                                    id: 'modify_Accessories',
                                    iconCls: 'refresh',
                                    handler:function(button,e){
                                      	 Ext.Viewport.hideMenu('right');
                                    }
                                },
                                {
                                    text: '取消',
                                    id: 'cancel_Accessories',
                                    iconCls: 'delete',
                                    handler:function(button,e){
                                   		Ext.Viewport.hideMenu('right');
                                    }
                                }
                                ]
                            });

                            Ext.Viewport.setMenu(menu, {
                                side: 'right',
                                reveal: false
                            });

                            Ext.Viewport.showMenu('right');

                        },
                        itemId: 'mybutton6',
                        iconCls: 'more',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'searchfield',
                        id: 'accessoriesField',
                        width: '76%',
                        placeHolder: '输入名称或图号...'
                    },
                    {
                        xtype: 'button',
                        id: 'searchAccessories',
                        margin: 10,
                        iconCls: 'search',
                        text: '搜索'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                id: 'Access_tab',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        id: 'Access_info',
                        title: '物料信息',
                        height: '100%',
                        scrollable: true,
                        items: [
                            {
                                xtype: 'formpanel',
                                height: 800,
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        items: [
											{
											    xtype: 'hiddenfield',
											    id: 'PARTS_ID',
											    valur:'',
											},
                                            {
                                                xtype: 'textfield',
                                                id: 'accessoriesName',
                                                label: '名称',
                                                readOnly:true,
                                                required: true,
                                                placeHolder: '请输入名称'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'accessories_quantity',
                                                itemId:"phoneNumber",
                                                component:{xtype:"input",type:"tel"},
                                                label: '数量',
                                                required: true,
                                                placeHolder: '请输入数量',
                                                listeners:{
                                               	 change:function(obk,newValue,oldValue,eOpts){
                                               		if(oldValue==''&&newValue!=''){
                                               			isOk()==true?obk.setValue(''):true;
                                               		}else if(oldValue!=''&&newValue!=''){
                                               			isOk()==true?obk.setValue(oldValue):true;
                                               		}else if(oldValue!=''&&newValue==''){
                                               		}else{
                                               			
                                               		}
                                               		function isOk(){
                                               			 if(!(/^\+?[1-9][0-9]*$/g.test(newValue))){
                                                   			return true;
                                                   		 }else{
                                                   			return false;
                                                   		 }
                                               		}
                                               		
                                               	 }
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'part_NUM',
                                                label: '批号',
                                                placeHolder: '请输入产品批号',
                                                readOnly: false
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'accessories_Remark',
                                                label: '备注',
                                                placeHolder: '请输入物料备注',
                                                readOnly: false
                                            },
                                            {   xtype:'textfield',
                                            	label: '生产',
                                                placeHolder: '请输入生产日期',
                                                id:'produce_Time',
                                                readOnly:true,
                                                listeners:{
                                                	focus:function(){
                                                		need_text_id='produce_Time';
                                                		initDate(Ext.getCmp('produce_Time').getValue(),'生产日期');
                                            			picker_show.show();
                                                	}
                                                }
                                            },
                                            {   xtype:'textfield',
                                            	label: '报价',
                                                placeHolder: '请输入报价日期',
                                                id:'quotation_Time',
                                                readOnly:true,
                                                listeners:{
                                                	focus:function(){
                                                		need_text_id='quotation_Time';
                                                		initDate(Ext.getCmp('quotation_Time').getValue(),'报价日期');
                                            			picker_show.show();
                                                	}
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'base_List',
                                                label: '底单',
                                                placeHolder: '请输入底单'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'quote_Statue',
                                                label: '状态',
                                                placeHolder: '请输入备件状态'
                                            },
                                            {
                                                xtype: 'panel',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'spacer'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'Commit_Accessories',
                                                        margin: '15 0',
                                                        width: '90%',
                                                        text: '提交'
                                                    },
                                                    {
                                                        xtype: 'spacer'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '<div id="Fault_AccContainer"></div>',
                        height: '100%',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'list',
                                flex: 1,
                                id:'accessoriesList',
                                store:'AccessoriesStore',
                                itemTpl: [
                                    '<div style="width:100%; margin:0; padding:0;">',
                                    '    <h1 style="float:left; margin:0; padding:0;">{PARTS_NAMES}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{PARTS_USED_QUANTITY}</h1>',
                                    '    <div style="float:right;margin:0;">',
                                    '    <img id="1" style="width:22px;" src="images/delete01.png"/>',
                                    '    </div>',
                                    '</div>'
                                ]
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'AcchidddenListIndex',
                            	value:''
                            }
                        ]
                    }
                ]
            }
        ]
    }

});