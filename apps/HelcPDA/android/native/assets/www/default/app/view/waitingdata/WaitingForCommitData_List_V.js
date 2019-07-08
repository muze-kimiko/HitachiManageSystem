
/* JavaScript content from app/view/waitingdata/WaitingForCommitData_List_V.js in folder common */

Ext.define('HelcPDA.view.waitingdata.WaitingForCommitData_List_V', {
    extend: 'Ext.Panel',
    id:'wfc_list_view',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: '待提交数据',
                items: [
                    {
                        xtype: 'button',
                        id: 'backToMenus',
                        text: '返回',
                        ui: 'back'
                    },
                    {
                        xtype: 'spacer'
                    },{
                        xtype: 'button',
                        id: 'btn_wfcd_commit',
                        text: '提交'
                    }
                ]
            },{
                        xtype: 'list',
                        id:'wfcd_list',
                        height: '100%',
                        itemTpl: [
                                  '<table border=0 width=100% class="o_list_table"s>',
                                  '    <tr height=20>',
                                  '        <td width=70%>',
                                  '            <span class="o_list_title">{msg_title}</span>  <span class="o_list_con_01">{msg_result}</span>',
                                  '        </td>',
                                  '    </tr>',
                                  '    <tr height=18>',
                                  '        <td><span class="o_list_con_01">{msg_body}</span></td>',
                                  '    </tr>',
                                  '</table>'
                        ],
                        onItemDisclosure: true,
                        store:'WaitingForCommitDataStore'
                        
            },
        ]
    },
	// 从JSONSTORE读取数据
	loadDataJST:function(){
		var selection_find = [{tcode:'UNCOMMIT',status:'1'},{tcode:'UNCOMMIT',status:'4'}];
		options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var store = Ext.data.StoreManager.get("WaitingForCommitDataStore");
			if (!store) {
				store = Ext.create("Helcss.store.waitingdata.WaitingForCommitDataStore");
			}
			var length = arrayResults2.length;
			var item_msgs = [];
			if (length < 1) {
				WL.Toast.show('找不到需要提交的数据！');
				store.setData(item_msgs);
				return ;
			}
			for (var i = 0; i < length; i ++) {
				var item = arrayResults2[i].json.ext1.msg;
				item.id = arrayResults2[i]._id;
				item_msgs[item_msgs.length] = item;
				if(item.msg_result.indexOf('失败') == -1) {
					item.msg_result = '正在等待提交...';					
				}
			}
			store.setData(item_msgs);
		}).fail(function(errorObject){
		});
	},

});

