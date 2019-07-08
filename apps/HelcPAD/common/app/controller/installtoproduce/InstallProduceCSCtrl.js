//测试用，到时候删除
Ext.define('HelcPAD.controller.installtoproduce.InstallProduceCSCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

	config: {
        control: {
			
        	/**
        	 * InstallProduce_List_V
        	 */
    		"button#searchId_old":{
				tap:'searchId_old',
			},
			
			"button#InstallProduce_List_VID_FH_BUTTON":{
				tap:'getFH',
			},
			
			"list#List_VID":{
				itemtap:'List_VID'
			},
			
			/**
			 * InstallProduce_EnoList_V
			 */
			"button#InstallProduce_EnoList_VID_FH_BUTTON":{
				tap:'getFH',
			},
			
			"list#EnoList":{
				itemtap:'EnoList'
			},
			
			/**
			 * InstallProduce_Detail_V
			 */
			"button#InstallProduce_Detail_VID_FH_BUTTON":{
				tap:'getFH',
			},
			
			/**
			 * InstallProduce_Query_V
			 */
			"button#InstallProduce_Query_FH_BUTTON":{
				tap:'getFH',
			},
			
			"button#searchId":{
				tap:'searchId',
			},
			
			
			
        }
    },
    
    getFH:function(){
    	this.BackView();
    },
    
    getUpdata:function(one,two,three){
    	var store=Ext.data.StoreManager.get(two);
		if(!store){
			store=Ext.create(three);
		};
		store.setData(one,this);
    },
    
    /**
	 * InstallProduce_List_V
	 */
    
    searchId_old:function(){
    	this.NextView('InstallProduce_Query_id','HelcPAD.view.installtoproduce.InstallProduce_Query_V');
    	
    },
    
    List_VID:function(obj, index, target, record, e, eOpts){
    	this.NextView('InstallProduce_EnoList_VID','HelcPAD.view.installtoproduce.InstallProduce_EnoList_V');
    	var one=[
        	     {ELEVATOR_NO:'1-46934P12',QRPC_STATUS:'完工'},
        	     {ELEVATOR_NO:'1-35U23774',QRPC_STATUS:'派工'},
        ];
        var two='InstallProduce_List_S';
        var three='HelcPDA.store.install.installtask.InstallProduce_List_S';
        this.getUpdata(one,two,three);
    	
    	
    },

    /**
	 * InstallProduce_EnoList_V
	 */
    EnoList:function(obj, index, target, record, e, eOpts){
    	this.NextView('InstallProduce_Detail_VID','HelcPAD.view.installtoproduce.InstallProduce_Detail_V');
    },
    
    /**
	 * InstallProduce_Query_V
	 */
    searchId:function(){
    	this.BackView();
    	var one=[
        	     {CONTRACT_NO:'测试1',NUM:'21'},
        	     {CONTRACT_NO:'测试2',NUM:'22'},
        	     {CONTRACT_NO:'测试3',NUM:'23'},
        	     {CONTRACT_NO:'测试4',NUM:'24'},
        	     {CONTRACT_NO:'测试5',NUM:'25'},
        	     {CONTRACT_NO:'测试6',NUM:'26'},
        ];
        var two='installtaskStore2';
        var three='HelcPDA.store.install.installtask.installtaskStore2';
        this.getUpdata(one,two,three);
    },
    

});
