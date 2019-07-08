Ext.define('HelcPDA.view.install.installsendbox.InstallSendBox_EnoList_V', {
    extend: 'Ext.Panel',
    id: 'instsb_enolist_view',
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
                title: '发货计划－工号列表',
                items: [
                    {
                        xtype: 'button',
                        id: 'btn_instsb_backToCnoList',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn_instsb_evol',
                        text: '批量'
                    }
                ]
            },{
            	// 用于存放合同号的隐藏域
				xtype:'hiddenfield',
				id:'hfinstsb_contractno',
				value:''
			},{
            	// 用于判断是工号批量还是箱头批量
				xtype:'hiddenfield',
				id:'hfinstsb_VolFlag',
				value:''
			},{
                xtype: 'list',
                id:'instsb_enolist',
                height: '100%',
                itemTpl: [
                          '<table border=0 width=100% class="o_list_table">',
                          '    <tr height=20>',
                          '        <td rowspan="2" width=10%>',
                          '            <div name="instsb_eno_check" class="p_judge_box" id="instsb_eno_checkid">3</div>',
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
    },
    
	// 从JSONSTORE读取数据
	loadDataJST_Eno:function(contract_no){
		// 记录合同号
		Ext.getCmp('hfinstsb_contractno').setValue(contract_no);
		// 组建数据给List显示
		var selection_find = {tcode:'INSTALL_SENDBOX',tid:parseInt(contract_no.substring(2)).toString()};
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length < 1) {
				WL.Toast.show('找不到本地数据！请同步试试');
				return ;
			}
			var map_list_msg = new Map();
			var contain_str = "";
			var datalength = 0;
			var msg_items = [];
			var msg_item = {};
			for (var i = 0; i < length; i ++) {
				msg_item = {};
				var item = arrayResults2[i].json.stext;
				// 筛选已提交未提交数量
				if (item.DATA_SOURCE == "PDA") {
					datalength = map_list_msg.get(item.ELEVATOR_NO+"_LENGTH");
					if (datalength == null) {
						datalength = 0;
					}
					datalength ++;
					map_list_msg.put(item.ELEVATOR_NO+"_LENGTH",datalength);
				} else if (item.DATA_SOURCE == "EBS") {
					datalength = map_list_msg.get(item.ELEVATOR_NO+"_UNLENGTH");
					if (datalength == null) {
						datalength = 0;
					}
					datalength ++;
					map_list_msg.put(item.ELEVATOR_NO+"_UNLENGTH",datalength);
				}
				// 筛选合同号
				if (contain_str.indexOf(item.ELEVATOR_NO) == -1) {
					msg_item.ELEVATOR_NO = item.ELEVATOR_NO;
					msg_items[msg_items.length] = msg_item; 
					if (contain_str == "") {
						contain_str += item.ELEVATOR_NO;
					} else {
						contain_str += ","+item.ELEVATOR_NO;
					}
				}
			}
			// 展示列表
			var length_ = msg_items.length;
			var show_items = [];
			for (var i = 0; i < length_; i ++) {
				var show_item = {};
				msg_item = msg_items[i];
				show_item.MSGTITLE = msg_item.ELEVATOR_NO;
//				show_item.MSGBODY = "已提交箱头：" + ((map_list_msg.get(msg_item.ELEVATOR_NO+"_LENGTH")==undefined)?0:map_list_msg.get(msg_item.ELEVATOR_NO+"_LENGTH")) + " / 未提交箱头：" + ((map_list_msg.get(msg_item.ELEVATOR_NO+"_UNLENGTH")==undefined)?0:map_list_msg.get(msg_item.ELEVATOR_NO+"_UNLENGTH"));
				show_item.MSGBODY = "未提交箱头：" + ((map_list_msg.get(msg_item.ELEVATOR_NO+"_UNLENGTH")==undefined)?0:map_list_msg.get(msg_item.ELEVATOR_NO+"_UNLENGTH"));
				show_items[i] = show_item;
			}
			var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
			if (!store) { 
				store = Ext.create("HelcPDA.store.install.installsendbox.InstallSendBox_list_Store"); 
			}
			store.setData(show_items);
		}).fail(function(errorObject){
		});
	},

});