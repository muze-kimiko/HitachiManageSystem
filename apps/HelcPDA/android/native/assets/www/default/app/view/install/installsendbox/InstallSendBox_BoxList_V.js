
/* JavaScript content from app/view/install/installsendbox/InstallSendBox_BoxList_V.js in folder common */
/**
 * 箱头发货查询 xcx 2014-5-14
 */

Ext.define('HelcPDA.view.install.installsendbox.InstallSendBox_BoxList_V', {
    extend: 'Ext.Panel',
    id:'instsb_boxlist_view',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '箱头发货-箱头列表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id: 'btn_instsb_boxlistback'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                flex: 1,
                id: 'tp_instsb_edetail',
                items: [
                    {
                        xtype: 'container',
                        title: '查看数据',
                        items: [
                            {
                                xtype: 'formpanel',
                                height: '100%',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'tf_instsb_BList_ELEVATOR_NO',
                                                label: '工号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                label: '梯种',
                                                id: 'tf_instsb_BList_EQUIPMENT_NO',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'tf_instsb_BList_CM_ELEVATOR_TYPE_NAME',
                                                label: '设备号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '录入数据',
                        items: [
                            {
                                xtype: 'toolbar',
                                docked: 'top',
                                items: [
                                    {
                                        xtype: 'button',
                                        id: 'btn_toVolume_Boxlist',
                                        text: '批箱'
                                    },
                                    {
                                        xtype: 'spacer'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'btn_toSelAll',
                                        text: '全选'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'btn_toSelReverse',
                                        text: '反选'
                                    }
                                ]
                            },{
                            	// 用于存放合同号的隐藏域
                				xtype:'hiddenfield',
                				id:'hfinstsb_eno',
                				value:''
                			},{
                                xtype: 'list',
                                id:'instsb_boxlist',
                                height: '100%',
                                itemTpl: [
                                          '<table border=0 width=100% class="o_list_table">',
                                          '    <tr height=20>',
                                          '        <td rowspan="2" width=10%>',
                                          '            <div name="instsb_bno_check" class="p_judge_box" id="instsb_bno_checkid">3</div>',
                                          '        </td>',
                                          '        <td width=70% class="o_list_title">{MSGTITLE}</td>',
                                          '    </tr>',
                                          '    <tr height=18>',
                                          '        <td class="o_list_con_01">{MSGBODY}</td>',
                                          '    </tr>',
                                          '</table>'
                                ],
                                onItemDisclosure: true,
                                store:'InstallSendBox_list_Store'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    initialize: function() {
    	var tabp = Ext.getCmp('tp_instsb_edetail');
    	tabp.setActiveItem(tabp.getInnerItems()[0]);
    },

	// 从JSONSTORE读取数据
    loadDataJST_BoxList:function(eno){
    	// 记录工号
    	Ext.getCmp('hfinstsb_eno').setValue(eno);
		// 组建数据给List显示
		var selection_find = {tcode:'INSTALL_SENDBOX',tid:eno.substring(3).toString()};
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length < 1) {
				WL.Toast.show('找不到本地数据！请用批量进行勾单');
				return ;
			}
			var show_items = [];
			for (var i = 0; i < length; i ++) {
				var show_item = {};
				var item = arrayResults2[i].json.stext;
				var status = '';
				// 处理状态
				if (item.DATA_SOURCE == "PDA") {
					status = '已提交';
				} else if (item.DATA_SOURCE == "EBS") {
					status = '未提交';
				} else if (item.DATA_SOURCE == 'PDA_W') {
					status = '等待提交中...';
				}
				show_item.MSGTITLE = item.ELVBOX_NAME;
				show_item.MSGBODY = "设备号：" + item.EQUIPMENT_NO +
				"<br>箱头说明："+item.ELVBOX_DESC + "<br>状态："+status;
				show_items[i] = show_item;
			}
			// 展示列表
			var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
			if (!store) { 
				store = Ext.create("HelcPDA.store.install.installsendbox.InstallSendBox_list_Store"); 
			}
			store.setData(show_items);
			
			var item_ele = arrayResults2[0].json.stext;
			Ext.getCmp('tf_instsb_BList_ELEVATOR_NO').setValue(item_ele.ELEVATOR_NO);
			Ext.getCmp('tf_instsb_BList_EQUIPMENT_NO').setValue(item_ele.EQUIPMENT_NO);
			Ext.getCmp('tf_instsb_BList_CM_ELEVATOR_TYPE_NAME').setValue(item_ele.CM_ELEVATOR_TYPE_NAME);
		}).fail(function(errorObject){
		});
	},
    
});