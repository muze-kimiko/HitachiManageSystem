
/* JavaScript content from app/view/install/installshowprocess/InstallShowProcess_CnoList_V.js in folder common */
Ext.define('HelcPDA.view.install.installshowprocess.InstallShowProcess_CnoList_V', {
    extend: 'Ext.Panel',
    id:'instsp_conlist_view',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: '安装节点查询',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_Instll_project_list',
                        text: '返回',
                        ui: 'back'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'btn_instsb_tosearch',
                        iconCls: 'arrow_down',
                        listeners:{
                        	tap:function(){
                        		var obj=Ext.getCmp('instsb_sel_v');
                        		if(!obj){
                        			obj=Ext.create('HelcPDA.view.install.installsendbox.InstallSendBox_Selection_V');
                        			
                        		}
                        		Ext.Viewport.setActiveItem(obj);
                        	}
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'search',
                        listeners:{
                        	tap:function(){
                        		var obj=Ext.getCmp('instsb_search_v');
                        		if(!obj){
                        			obj=Ext.create('HelcPDA.view.install.installsendbox.InstallSendBox_Search_V');
                        		}
                        		Ext.Viewport.setActiveItem(obj);
                        	}
                        }
                    }
                ]
            },{
                        xtype: 'list',
                        id:'instsb_list',
                        height: '100%',
                        itemTpl: [
                                  '<table border=0 width=100% class="o_list_table">',
                                  '    <tr height=20>',
                                  '        <td width=70% class="o_list_title">{MSGTITLE}</td>',
                                  '    </tr>',
                                  '    <tr height=18>',
                                  '        <td class"o_list_con_01">{MSGBODY}</td>',
                                  '    </tr>',
                                  '</table>'
                        ],
                        onItemDisclosure: true,
                        store:'InstallSendBox_list_Store'
                        
            },
        ]
    },
    
	// 从JSONSTORE读取数据
	loadDataJST:function(){
		// 组建数据给List显示
		var selection_find = {tcode:'INSTALL_SENDBOX'};
		options = {};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length < 1) {
				WL.Toast.show('找不到本地数据！请同步试试');
				return ;
			}
			var map_list_msg = new Map();
			var datalength = 0;
			var msg_items = [];
			var msg_item = {};
			var contain_str = '';
			for (var i = 0; i < length; i ++) {
				msg_item = {};
				var item = arrayResults2[i].json.stext;
				// 筛选已提交未提交数量
				if (item.DATA_SOURCE == "PDA") {
					datalength = map_list_msg.get(item.CONTRACT_NO+"_LENGTH");
					if (datalength == null) {
						datalength = 0;
					}
					datalength ++;
					map_list_msg.put(item.CONTRACT_NO+"_LENGTH",datalength);
				} else if (item.DATA_SOURCE == "EBS") {
					datalength = map_list_msg.get(item.CONTRACT_NO+"_UNLENGTH");
					if (datalength == null) {
						datalength = 0;
					}
					datalength ++;
					map_list_msg.put(item.CONTRACT_NO+"_UNLENGTH",datalength);
				}
				// 筛选合同号
				if (contain_str.indexOf(item.CONTRACT_NO) == -1) {
					msg_item.CONTRACT_NO = item.CONTRACT_NO;
					msg_item.CUSTOMER_NAME = item.CUSTOMER_NAME;
					msg_items[msg_items.length] = msg_item; 
					if (contain_str == "") {
						contain_str += item.CONTRACT_NO;
					} else {
						contain_str += ","+item.CONTRACT_NO;
					}
				}
			}
			// 展示列表
			var length_ = msg_items.length;
			var show_items = [];
			for (var i = 0; i < length_; i ++) {
				var show_item = {};
				msg_item = msg_items[i];
				show_item.MSGTITLE = msg_item.CONTRACT_NO + " / " + msg_item.CUSTOMER_NAME;
				show_item.MSGBODY = "已提交箱头：" + ((map_list_msg.get(msg_item.CONTRACT_NO+"_LENGTH")==undefined)?0:map_list_msg.get(msg_item.CONTRACT_NO+"_LENGTH")) + " / 未提交箱头：" + ((map_list_msg.get(msg_item.CONTRACT_NO+"_UNLENGTH")==undefined)?0:map_list_msg.get(msg_item.CONTRACT_NO+"_UNLENGTH"));
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

