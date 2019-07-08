
/* JavaScript content from app/controller/compact/CompactCtrl.js in folder common */
/**
 * 合同信息模块的事件
 */

Ext.define('HelcPDA.controller.compact.CompactCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//进入合同模块
			"button#buttonCompact":{
				tap:'buttonCompact'
			},
			//返回到合同首页
			"button#BackToSearchPanel":{
				tap:'BackToSearchPanel'
			},
			//查询合同号
			"button#btn_compactSearch":{
				tap:'btn_compactSearch'
			},
			//合同list
			"list#Compactlist":{
				itemsingletap:'Compactlist'
			},
			//合同行list
			"list#compactBodyList":{
				itemsingletap:'compactBodyList'
			},
			//返回到合同头
			"button#backToSearchPanel":{
				tap:'backToSearchPanel'
			},
			//返回到合同头
			"button#backToHeadPanel":{
				tap:'backToHeadPanel'
			},
			//返回到主页
			"button#backToMenus":{
				tap:'backToMenus'
			},
			//返回到主页
			"button#edocToMenus":{
				tap:'edocToMenus'
			},
		},
	},
	
	buttonCompact : function(){
		this.NextView("Compactlist","HelcPDA.view.compact.CompactSearchPanel");
	},
	
	BackToSearchPanel : function(){
		this.showBackView("Compactlist","HelcPDA.view.compact.CompactSearchPanel");
	},
	
	btn_compactSearch : function(){
		var serach_Cont=Ext.getCmp("serach_Cont").getValue();
	    var content="{'AGREE_NUM':'"+serach_Cont+"'}";
	    var getResult=function(res){
	        var datads=Ext.data.StoreManager.get('CompactSearchStore');
	    	if(!datads){
	    		datads=Ext.create('HelcPDA.store.compact.CompactSearchStore');
	    	}
	    	var str=res.items;
	    	if (str.length == 0){
	    		Ext.Msg.alert("没有数据");
	    		WL.Toast.show("没有数据"); 
	    	}
	    	datads.setData(str,this);
	    	Ext.getCmp('Compactlist').setStore(datads);
	    	
	    };
	        
	    if(serach_Cont==null||serach_Cont==""||typeof(serach_Cont)=="undefined"){
	    	Ext.Msg.alert("合同编号或名称不能为空！");
	    }else{
	    	this.connectServer(getResult, 'compactAction.do?method=toSearchPart_forPDA3', content);
	    }
	},
	
	
	
	Compactlist : function(obj,index,target,record,e,eOpts){
		var obj = this;
		this.NextView("CompactHeadPanel","HelcPDA.view.compact.CompactHeadPanel");
		var compactHead_tab = Ext.getCmp('compactHead_tab');
		//左右滑动页签
		Ext.get('compactHead_tab').on('swipe',function(e,t){
			if (e.direction === 'left' && e.distance >= 20) {
				compactHead_tab.setActiveItem(Ext.getCmp('compactHead_con_row'));
		    } else if (e.direction === 'right' && e.distance >= 20) {
		    	compactHead_tab.setActiveItem(Ext.getCmp('compactHead_con_info'));
		    }
		});
		
   		var store=this.getStore('CompactSearchStore','HelcPDA.store.compact.CompactHeadStore');
   		  
   	    var agree_num=store.getAt(index).get('AGREE_NUM'); 
    	var content="{'id':'"+agree_num+"'}";

    	var getResult=function(res){
    		var str=res.item;
    		var store1 = Ext.data.StoreManager.get("CompactHeadStore");
    		if (!store1) { 
       		    store1 = Ext.create("HelcPDA.store.compact.CompactHeadStore"); 
       		  } 
    		store1.setData(str,this);
    		Ext.getCmp('AGREE_NUM').setValue(str.AGREE_NUM);
    		Ext.getCmp('AGREE_NAME').setValue(str.AGREE_NAME);
    		Ext.getCmp('ACCOUNT_ID').setValue(str.ACCOUNT_ID);
    		Ext.getCmp('SIGN_DATE').setValue(str.SIGN_DATE);
    		Ext.getCmp('AGREE_TYPE').setValue(str.AGREE_TYPE);
    		Ext.getCmp('STATUS').setValue(str.STATUS);
    		Ext.getCmp('BUSINESS_TYPE').setValue(str.BUSINESS_TYPE);
    		Ext.getCmp('MAINTAIN_CYCLE').setValue(str.MAINTAIN_CYCLE+'次/月');
    		Ext.getCmp('URGENT_REQ_TIME').setValue(str.URGENT_REQ_TIME+'分钟');
    		Ext.getCmp('FINAL_ACCOUNT').setValue(str.FINAL_ACCOUNT);
    		Ext.getCmp('COMMENTS').setValue(str.COMMENTS);
    		Ext.getCmp('SBL_ROW_ID').setValue(str.SBL_ROW_ID);

    		var str=res.body;
    		var store2=obj.getStore('CompactBodyStore','HelcPDA.store.compact.CompactBodyStore');
    		store2.setData(str,this);
    	};
    	this.connectServer(getResult, 'compactAction.do?method=toSearchTitleDetail', content);
	},
	
	compactBodyList : function(obj,index,target,record,e,eOpts){
		var obj = this;
		this.NextView('CompactBodyInfoPanel','HelcPDA.view.compact.CompactBodyInfoPanel');
		var store=this.getStore('CompactBodyStore','HelcPDA.store.compact.CompactBodyStore');
   		  
   	    var SBL_ROW_ID=store.getAt(index).get('SBL_ROW_ID'); 
    	var content="{'id':'"+SBL_ROW_ID+"'}";

    	var getResult=function(res){
    		var str=res.item;
    		var store1=obj.getStore('CompactBodyInfoStore','HelcPDA.store.compact.CompactBodyInfoStore');
    		store1.setData(str,this);
    		Ext.getCmp('STATION_TYPE').setValue(str.STATION_TYPE);
    		Ext.getCmp('STATION_ORG').setValue(str.STATION_ORG);
    		Ext.getCmp('MONTH_GRT_FLG').setValue(str.MONTH_GRT_FLG);
    		Ext.getCmp('PRODUCT_PART').setValue(str.PRODUCT_PART);
    		Ext.getCmp('BUSINESS_TYPE').setValue(str.BUSINESS_TYPE);
    		Ext.getCmp('ASSET_HEIGHT').setValue(str.ASSET_HEIGHT);
    		Ext.getCmp('ELEVATOR_MARK').setValue(str.ELEVATOR_MARK);
    		Ext.getCmp('STATION_ORG').setValue(str.STATION_ORG);
    		Ext.getCmp('COMPANY_ORG').setValue(str.COMPANY_ORG);
    		Ext.getCmp('AREA_NAME').setValue(str.AREA_NAME);
    		Ext.getCmp('GRT_FLG').setValue(str.GRT_FLG);
    		Ext.getCmp('GRT_MONTH_NUM').setValue(str.GRT_MONTH_NUM);
    		Ext.getCmp('BRAND').setValue(str.BRAND);
    		Ext.getCmp('INSPECT_MONTH').setValue(str.INSPECT_MONTH);
    		Ext.getCmp('ASSET_DOOR').setValue(str.ASSET_DOOR);
    		Ext.getCmp('ACCNT_NAME').setValue(str.ACCNT_NAME);
    		Ext.getCmp('URGENT_REQ_TIME').setValue(str.URGENT_REQ_TIME+'分钟');
    		Ext.getCmp('UPCOMING_FLG').setValue(str.UPCOMING_FLG);
    		Ext.getCmp('STATUS').setValue(str.STATUS);
    		Ext.getCmp('LINE_STATUS').setValue(str.LINE_STATUS);
    		Ext.getCmp('AGREE_TYPE').setValue(str.AGREE_TYPE);
    		Ext.getCmp('AGREE_NUM').setValue(str.AGREE_NUM);
    		Ext.getCmp('ASSET_NUM').setValue(str.ASSET_NUM);
    		Ext.getCmp('DOMAIN_NAME').setValue(str.DOMAIN_NAME);
    		Ext.getCmp('EDIFICE_NAME').setValue(str.EDIFICE_NAME);
    		Ext.getCmp('CITY').setValue(str.CITY);
    		Ext.getCmp('ELEVATOR_FLOOR').setValue(str.ELEVATOR_FLOOR);
    		Ext.getCmp('INSTALL_ADDR').setValue(str.INSTALL_ADDR);
    		Ext.getCmp('CANCEL_DATE').setValue(str.CANCEL_DATE);
    		Ext.getCmp('DEFER_DATE').setValue(str.DEFER_DATE);
    	};
    	this.connectServer(getResult, 'compactAction.do?method=toSearchBodyDetail', content);
	},
	
	backToSearchPanel : function(){
		this.showBackView("Compactlist","HelcPDA.view.compact.CompactSearchPanel");
	},
	
	backToHeadPanel : function(){
		this.showBackView("CompactHeadPanel","HelcPDA.view.compact.CompactHeadPanel");
	},
	
	backToMenus : function(){
		this.BackView();
//		var obj_menu = Ext.getCmp('MenusView_id');
//		obj_menu.refresh_wtd();
//		this.refresh_wtd();
		this.refresh_wtd2016();
	},
	
	edocToMenus : function(){
		this.BackView();
	}
});