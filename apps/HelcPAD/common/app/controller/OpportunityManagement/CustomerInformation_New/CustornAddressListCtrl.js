Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustornAddressListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#custornAddressList_new_id_FH":{
				tap:'custornAddressList_new_id_FH'
			},
			
			//确定
			"button#custornAddressList_new_id_QD":{
				tap:'custornAddressList_new_id_QD'
			},

			//list
			"list#custornAddressList_new_id_list":{
				itemtap:'custornAddressList_new_id_list'
			},
			
		}
	},
	
	//list
	custornAddressList_new_id_list:function(dataview, index, target, record, e, eOpts){
		var sele=document.getElementsByName('groupkung_custornAddressList');
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
	},
	
	//返回
	custornAddressList_new_id_FH:function(){
		this.showBackView('custornAddress_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddress');
	},
	
	//确定
	custornAddressList_new_id_QD:function(){
		var DataCs=Ext.data.StoreManager.get('CustornAddressStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressStore');
		};
		var Data=DataCs.getData();
		
		var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
		if(!DataCsTwo){
			DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
		};
		var dataTwo=DataCsTwo.getData();
		var dataTwoNum=DataCsTwo.getCount();
		//把DataCsTwo数据仓中的值放到数组中
		var ddtwo=[];
		for(var d=0;d<dataTwoNum;d++){
			ddtwo[d]=dataTwo.items[d].data;
			cc.log(d+'  '+ddtwo[d]);
		};
		var DYC='';
		if(dataTwoNum==0){
			DYC='第一次';
		};
		//获取选中的数据
		var sele=document.getElementsByName('groupkung_custornAddressList');
		var seleNum=sele.length;
		for(var i=0;i<seleNum;i++){
			//判断选中
			var checkbox=sele[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				//第一次
				if(DYC=='第一次'){
					ddtwo[dataTwoNum]=Data.items[i].data;
					dataTwoNum++;
				}else{
					//过滤重复数据
					var CFData=Data.items[i].data;
					var CFnum=0;
					for(var c=0;c<dataTwoNum;c++){
						var CCtwo=ddtwo[c].StreetAddress;
						//cc.log('CCtwo2:'+CCtwo);
						if(CFData.StreetAddress==CCtwo){
							CFnum++;
						};
					};
					if(CFnum==0){
						ddtwo[dataTwoNum]=CFData;
						dataTwoNum++;
					};
				};
			};
		};
		
		//重新加入数据
		DataCsTwo.setData(ddtwo);
		
		this.showBackView('custornAddress_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddress');
		//强制活动 选中地址页面
		var char=Ext.getCmp('custornAddress_new_id');
		var tab=char.getInnerItems();
		char.setActiveItem(tab[1]);
		
		var sele=document.getElementsByName('groupkung_custornAddress');
		var selenum=sele.length;
		for(var i=0;i<selenum;i++){
			var checkbox2 = sele[i];
			checkbox2.style.color='#ccc';
		};
		var checkbox = sele[selenum-1];
		checkbox.style.color='#e03a3e';
		
	},


});
