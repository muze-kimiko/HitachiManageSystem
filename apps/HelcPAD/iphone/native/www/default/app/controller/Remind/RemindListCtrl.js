
/* JavaScript content from app/controller/Remind/RemindListCtrl.js in folder common */
Ext.define('HelcPAD.controller.Remind.RemindListCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

	config: {
        control: {
        	//返回
			'button#cemindList_FH':{
				tap:'cemindList_FH'
			},
			
			//删除
			'button#cemindList_QD':{
				tap:'cemindList_QD'
			},
			
			//list
			'list#cemindListlist':{
				itemtap:'cemindListlist'
			},
			
			//关闭弹出框
			'button#RemindListPanel_id_GB':{
				tap:'RemindListPanel_id_GB',
			},
        }
	},
	
	RemindListPanel_id_GB:function(){
		var listPanel=Ext.getCmp('RemindListPanel_id');
		listPanel.destroy();
	},
	
	//查询JSONstore中是否有提醒数据,并添加到列表上
	JRremindList:function(){
		var MaintainList=WL.JSONStore.get(collectionName);
		var query={tcode:'TX'};
		var options={
			exacte:false,//默认
			limit:200,//查询最大条数
		};
		MaintainList.find(query,options).then(function(arrayResults){
			console.log('A:'+arrayResults);
			if(arrayResults==''){
				return;
			};
			var Data=arrayResults[0].json.XX;
			cc.log(Data);
			var DataRemind=Ext.data.StoreManager.get('RemindListStore');
			if(!DataRemind){
				DataRemind=Ext.create('HelcPAD.store.Remind.RemindListStore');
			};
			DataRemind.setData(Data);
		}).fail(function(errorObject){
			WL.Toast.show("获取提醒消息失败！");
		});
	},
	
	//list
	cemindListlist:function( list, index, target, record, e, eOpts ){
		if(event.target.id!='conkung_cemindListlist'){
			Ext.Viewport.add({
				xtype:'panel',
				id:'RemindListPanel_id',
				hideOnMaskTap: false,
		 	    centered: true,
				modal: true,
				height:250,
				width: '90%',
				style: 'background:#ccc',
				items: [{
					xtype: 'container',
				    height: '100%',
				    margin: '100 auto 0 auto',
				    padding: '',
				    style: 'background:#fff',
				    width: '100%',
				    layout: 'vbox',
				    items: [{
				    	xtype: 'toolbar',
				        docked: 'top',
				        title: '提醒内容',
				        items: [{
				        	xtype: 'spacer'
				        },{
				        	xtype: 'button',
				            iconCls: 'delete',
				            id:'RemindListPanel_id_GB',
				        }]
				    },{
				    	xtype: 'formpanel',
				        padding: 10,
				        height: 200,
				        items: [{
				        	xtype: 'fieldset',
							cls:'textf',
							items: [
							{
								id:'RemindListPanel_TXNR',
			                    xtype: 'textareafield',
			                    maxRows: 4,
			                    height :185,
			                    readOnly:true,
			                }
							]
				        }]
				    }]
				}]
			});
			
			//为弹出框添加内容
			cc.log(record.data.message);
			Ext.getCmp('RemindListPanel_TXNR').setValue(record.data.message);
			
		}else{
			var sele=document.getElementsByName('groupkung_cemindListlist');
			var checkbox = sele[index];
			if(checkbox.style.color==''){
				checkbox.style.color='#e03a3e';
			}else if(checkbox.style.color=='rgb(204, 204, 204)'){
				//是未选中的情况下
				checkbox.style.color='#e03a3e';
			}else if(checkbox.style.color=='rgb(224, 58, 62)'){
				//是选中的情况下
				checkbox.style.color='#ccc';
			};
		};
	
	},
	
	//确定
	cemindList_QD:function(){
		var DataRemind=Ext.data.StoreManager.get('RemindListStore');
		if(!DataRemind){
			DataRemind=Ext.create('HelcPAD.store.Remind.RemindListStore');
		};
		var DRdata=DataRemind.getData();
		if(DRdata.length==0){
			WL.Toast.show("没有可删除消息！");
			return;
		};
    	Ext.Msg.show({
			   title: '温馨提示',
			   message: '确认删除所选提醒?',
			   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					   /*var DataRemind=Ext.data.StoreManager.get('RemindListStore');
						if(!DataRemind){
							DataRemind=Ext.create('HelcPAD.store.Remind.RemindListStore');
						};
						var DRdata=DataRemind.getData();*/
						//cc.log('DRdata');
						//cc.log(DRdata.items);
						//cc.log(DRdata.items[1].data);
						var newData=[];
						var newNum=0;
					   //所选删除提醒  list
					   var sele=document.getElementsByName('groupkung_cemindListlist');
					   var num=sele.length;
					   for(var i=0;i<num;i++){
						   var checkbox = sele[i];
						   if(checkbox.style.color=='rgb(224, 58, 62)'){
						   }else{
							   newData[newNum]=DRdata.items[i].data;
							   newNum++;
						   };
					   };
					   DataRemind.setData(newData);
					   
					   //删除JSONStore
					   var MaintainList=WL.JSONStore.get(collectionName);
					   var query={tcode:'TX'};
					   var options={
					   		exacte:false,//默认
					   		limit:200,//查询最大条数
					   };
					   MaintainList.remove(query,options).then(function(){
							cc.log('提醒信息删除成功');
							var Maintxml={tcode:'TX',XX:newData,};
							MaintainList.add(Maintxml).then(function(){
								//WL.Toast.show("提醒消息添加成功！");
							}).fail(function(errorObject){
								WL.Toast.show("提醒消息添加失败！");
							});
					   }).fail(function(){
							WL.Toast.show("提醒消息删除失败");
					   });
					   
				   };
			   }
		});
	},
	
	//返回
	cemindList_FH:function(){
		this.BackView();
	},
		
});