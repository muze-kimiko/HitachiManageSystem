
/* JavaScript content from app/controller/message/MessageCtrl.js in folder common */

/* JavaScript content from app/controller/message/MessageCtrl.js in folder common */
Ext.define('HelcPDA.controller.message.MessageCtrl', {
	extend:'HelcPDA.controller.ApplicationController',
    config: {
        control: {
           "list#msglist": {
                itemtap: 'onListItemTap',
                itemtaphold: 'onListItemTapHold'
            }
        }
    },

    toReceiveMsg : function(msgbody) {
    	var obj = this;
    	var msgtitle;
    	if (msgbody.length > 8) {
    		msgtitle = msgbody.substring(0,8);
    	} else {
    		msgtitle = msgbody;
    	}
    	var msgcolor = '#666';
    	var msgtime = obj.formatDate(new Date(),'');
    		
    	var msgdata = {};
    	msgdata.MSGTITLE = msgtitle;
    	msgdata.MSGBODY = msgbody;
    	msgdata.TIME = msgtime;
    	msgdata.COLOR = msgcolor;
    	msgdata.ISREAD = 'N';
    	var data = {tcode:'SYSTEM_MESSAGE',tid:msgtime,stext:item}
    	WL.JSONStore.get(collectionName).add(data).then(function(){
    		var M_XX = Ext.getCmp('M_XX');
    		if (M_XX == null) {
    			return ;
    		}
    		// 增加提示数量
    		var sumxx = document.getElementById('sumxx').innerHTML;
    		if (sumxx != null && sumxx != '') {
    			sumxx = sumxx + 1;
    		} else {
    			sumxx = 1;
    		}
    		// 刷新列表
		}).fail(function(errorObject){
		});
    },
    
    
    
    onListItemTap: function(obj, index, target, record, e, eOpts) {
    	if(!obj.holdTime || (obj.holdTime - new Date()>1000)) {
	    	var store = Ext.data.StoreManager.get('MessageStore');
	    	//alert(store.getAt(index).get('MSGBODY'));
	    	ovlay_MainTain3=Ext.Viewport.add({
				xtype:'panel',
				id:'ovlayMsg',
				height:'80%',
		     	width: '90%',
				hideOnMaskTap: false,
	 	            centered: true,
			     	modal: true,
			     	style: 'background:#ccc',
			        items: [{
			                xtype: 'container',
			                height: '100%',
			                margin: '100 auto 0 auto',
			                padding: '',
			                style: 'background:#fff',
			                width: '100%',
			                layout: 'vbox',
			                items: [
			                    {
			                        xtype: 'toolbar',
			                        docked: 'top',
			                        title: '消息',
			                        items: [
			                            {
			                                xtype: 'spacer'
			                            },
			                            {
			                                xtype: 'button',
			                                iconCls: 'delete',
			                                text: '',
			                                id:'MESSAGE_CLOSE',
			                                listeners:{
			                                	tap: function() {
			                                		var ovlayMsg=Ext.getCmp('ovlayMsg');
			                            			if(ovlayMsg){
			                            				ovlayMsg.destroy();
			                            			};
			                                	}
			                                }
			                            }
			                        ]
			                    },
			                    {
			                        xtype: 'formpanel',
			                        padding: 10,
			                        height: '100%',
			                        scrollable: true,
			                        items: [
			                            {
			                                xtype: 'label',
			                                height: '100%',
			                                scrollable: true,
			                                html: '<div id="messageBody"></div>',
			                                margin: '0 0 10 0'
			                            }
			                        ]
			                    }
			                ]
			            }]
			});
	    	var messageBody = document.getElementById('messageBody');
	    	messageBody.innerHTML = store.getAt(index).get('MSGBODY');
	    	//messageBody.innerHTML = "1、向客户咨询最近电梯的使用情况nl2、电梯运行舒适感、有无杂音nl3、开关门nl4、机房、滑轮间环境nl5、手动紧急操作装置（盘车装置）nl6、控制柜各仪表检查（启动次数?运行时间nl7、清除TCDnl8、曳引机nl9、减速机nl10、制动器各销轴部位nl11、制动器间隙nl12、抱闸芯 应可用手转动nl13、编码器（旋转编码器）nl14、限速器各销轴部位及开关nl15、远程监控设备 nl16、轿厢照明、风扇、应急照明nl17、轿厢检修开关、急停开关1、向客户咨询最近电梯的使用情况nl2、电梯运行舒适感、有无杂音nl3、开关门nl4、机房、滑轮间环境nl5、手动紧急操作装置（盘车装置）nl6、控制柜各仪表检查（启动次数?运行时间nl7、清除TCDnl8、曳引机nl9、减速机nl10、制动器各销轴部位nl11、制动器间隙nl12、抱闸芯 应可用手转动nl13、编码器（旋转编码器）nl14、限速器各销轴部位及开关nl15、远程监控设备 nl16、轿厢照明、风扇、应急照明nl17、轿厢检修开关、急停开关9、减速机nl10、制动器各销轴部位nl11、制动器间隙nl12、抱闸芯 应可用手转动nl13、编码器（旋转编码器）nl14、限速器各销轴部位及开关nl15、远程监控设备 nl16、轿厢照明、风扇、应急照明nl17、轿厢检修开关、急停开关9、减速机nl10、制动器各销轴部位nl11、制动器间隙nl12、抱闸芯 应可用手转动nl13、编码器（旋转编码器）nl14、限速器各销轴部位及开关nl15、远程监控设备 nl16、轿厢照明、风扇、应急照明nl17、轿厢检修开关、急停开关9、减速机nl10、制动器各销轴部位nl11、制动器间隙nl12、抱闸芯 应可用手转动nl13、编码器（旋转编码器）nl14、限速器各销轴部位及开关nl15、远程监控设备 nl16、轿厢照明、风扇、应急照明nl17、轿厢检修开关、急停开关9、减速机nl10、制动器各销轴部位nl11、制动器间隙nl12、抱闸芯 应可用手转动nl13、编码器（旋转编码器）nl14、限速器各销轴部位及开关nl15、远程监控设备 nl16、轿厢照明、风扇、应急照明nl17、轿厢检修开关、急停开关";
	    	//messageBody.style.height=(22*(store.getCount()))+'px';
	    	
	    	// 判断是否已经读过，如果读过就不需要更新JsonStore
	    	if (store.getAt(index).get('ISREAD') == 'Y') {
	    		return ;
	    	}
	    	var selection_find = [{tcode:'SYSTEM_MESSAGE',tid:store.getAt(index).get('TIME')}];
			var options = {exact : false};
			WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
				var length = arrayResults2.length;
				if (length < 1) {
					return ;
				}
				var item = arrayResults2[0];
				item.json.stext.COLOR = '#eee';
				item.json.stext.ISREAD = 'Y';
				var options = {};
				WL.JSONStore.get(collectionName).refresh(item,options).then(function(arrayResults2){
	//				WL.Toast.show('保存成功！');
//					var vobj = Ext.getCmp('MenusView_id');
					objj.loadMessage();
				}).fail(function(errorObject){
					alert(errorObject);
				});	
			}).fail(function(errorObject){
			});
    	}
    },
    
    onListItemTapHold: function(obj, index, target, record, e, eOpts) {
    	obj.holdTime = new Date();
		navigator.notification.confirm("提示",function(btn){
			obj.holdTime = undefined;
 			if(btn ==2){
 				// 删除消息
 				var query={tcode:'SYSTEM_MESSAGE',tid:record.get('TIME')};
            	WL.JSONStore.get(collectionName).remove(query).then(function(){
            		WL.Toast.show('删除成功！');
            		var M_XX = Ext.getCmp('MenusView_id');
            		try{
            			objj.loadMessage();
            		}catch(e) {
            			alert('出错：'+e);
            		}
				});
 			}else{
 				return;
 			}
 		},"确定要删除此消息？","取消,确定");
		/*target.onBefore('tap',function(e){
    		e.stopEvent();
    	},this,{single:true}){
    	}*/
    }
});