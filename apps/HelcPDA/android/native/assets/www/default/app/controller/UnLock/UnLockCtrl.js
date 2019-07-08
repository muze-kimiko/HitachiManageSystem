
/* JavaScript content from app/controller/UnLock/UnLockCtrl.js in folder common */
Ext.define('HelcPDA.controller.UnLock.UnLockCtrl', {
    extend: 'HelcPDA.controller.ApplicationController',
    
    config: {
        control: {
        	"button#btn_Search_UnLockDev": {
        		tap: 'Onbtn_Search_UnLockDevTap'
        	},
        	"button#btn_Search_UnLockUser": {
        		tap: 'Onbtn_Search_UnLockUserTap'
        	},
        	"button#btn_bak_UnLock": {
        		tap: 'Onbtn_bak_UnLockTap'
        	},
        	"list#L_UnLockDev":{
        		itemtap:'OnL_UnLockDevItemtap'
        	},
        	"list#L_UnLockUser":{
        		itemtap:'OnL_UnLockUserItemtap'
        	},
        }
    },
    
    OnL_UnLockDevItemtap : function(thisObj,index,target,record,e,eOpts){
    	console.log('OnL_UnLockDevItemtap');
    	Ext.Msg.show({
    		title: '温馨提示',
    		message: '是否解锁设备：'+record.data.licname+'('+record.data.phoneno+')',
    		buttons:[{text:'取消',itemId:'no'},{text:'解锁',itemId:'yes'}],
    		fn:function(buttonId){
    			if(buttonId == 'yes'){
    				var getResult = function(res){
    		    		console.log('OnL_UnLockDevItemtap',res);
    		    		if(res.msgid == 0){
    		    			Ext.getCmp('L_UnLockDev').getStore().setData([]);
    		    		}
    		    		Ext.toast(res.msginfo,2000);
    		    	}

    				var parameters = {
			        	isLoading : true,
    					url		:	'loginAction.do?method=SetLockDev',
    					params	:	JSON.stringify({key:record.data.licid}),
			    	};
    		    						
    		    	MainCtr.getDataFromPDA(getResult,parameters);
    			}
    		}
    	});
    },
    
    Onbtn_Search_UnLockDevTap : function(thisObj,e,eOpts){
    	var _key = Ext.getCmp('st_UnLockDev').getValue();
    	if(_key == ''){
    		Ext.Msg.alert('温馨提示','请输入要查找的用户名、工号或手机号！');
        	return;
    	}
    	
    	var getResult = function(res){
			console.log('Onbtn_Search_UnLockDevTap',res);
			Ext.getCmp('L_UnLockDev').getStore().setData([]);
			if(res.length > 0){
				Ext.getCmp('L_UnLockDev').getStore().setData(res);
			}else{
				Ext.toast('没查找到符合条件的数据',2000);
			}
    	}

    	var parameters = {
        	isLoading : true,
        	url		:	'loginAction.do?method=GetLockDev',
        	params	:	JSON.stringify({key:_key}),
    	};
    						
    	MainCtr.getDataFromPDA(getResult,parameters);
    },

    OnL_UnLockUserItemtap : function(thisObj,index,target,record,e,eOpts){
    	console.log('OnL_UnLockUserItemtap');
    	Ext.Msg.show({
    		title: '温馨提示',
    		message: '是否解锁用户：'+record.data.username+'('+record.data.userid+')',
    		buttons:[{text:'取消',itemId:'no'},{text:'解锁',itemId:'yes'}],
    		fn:function(buttonId){
    			if(buttonId == 'yes'){
    				var getResult = function(res){
    		    		console.log('OnL_UnLockUserItemtap',res);
    		    		if(res.msgid == 0){
    		    			Ext.getCmp('L_UnLockUser').getStore().setData([]);
    		    		}
    		    		Ext.toast(res.msginfo,2000);
    		    	}

    				var parameters = {
			        	isLoading : true,
    					url		:	'loginAction.do?method=SetLockUser',
    					params	:	JSON.stringify({key:record.data.userid}),
			    	};
    		    						
    		    	MainCtr.getDataFromPDA(getResult,parameters);
    			}
    		}
    	});
    },
    
    Onbtn_Search_UnLockUserTap : function(thisObj,e,eOpts){
    	var _key = Ext.getCmp('st_UnLockUser').getValue();
    	if(_key == ''){
    		Ext.Msg.alert('温馨提示','请输入要查找的用户名或工号！');
        	return;
    	}
    	
    	var getResult = function(res){
			console.log('Onbtn_Search_UnLockUserTap',res);
			Ext.getCmp('L_UnLockUser').getStore().setData([]);
			if(res.length > 0){
				Ext.getCmp('L_UnLockUser').getStore().setData(res);
			}else{
				Ext.toast('没查找到符合条件的数据',2000);
			}
    	}

    	var parameters = {
        	isLoading : true,
        	url		:	'loginAction.do?method=GetLockUser',
        	params	:	JSON.stringify({key:_key}),
    	};
    						
    	MainCtr.getDataFromPDA(getResult,parameters);
    },
    
    Onbtn_bak_UnLockTap : function(thisObj,e,eOpts){
    	MainCtr.BackView();
    },
    
});
