Ext.define('HelcPAD.controller.OpportunityManagement.Director.Clue.ClueItemViewCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#clueItemView_FH":{
				tap:'clueItemView_FH'
			},
			
			//list
			"list#clueItemViewlist":{
				itemtap:'clueItemViewlist'
			},
			
			//确定
			"button#clueItemView_QD":{
				tap:'clueItemView_QD'
			},
		}
	},
	
	//确定
	clueItemView_QD:function(){
		var sele=document.getElementsByName('groupkung_clueItemViewlist');
		//选择
		var store = this.getStore('ClueSelectStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueSelectStore');
		var r = [];
		var total = 0;
		var numYZ=sele.length;
		for(var i=0;i<sele.length;i++){
			if(sele[i].style.color=='rgb(224, 58, 62)'){
				r[total++] = store.getAt(i).data;
				numYZ--;
			};
		};
		//验证按确定的时候是否有选中
		cc.log(numYZ+'   '+sele.length);
		if(numYZ==sele.length){
			Ext.Msg.alert('温馨信息','至少选中一位人员');
			return;
		}
		cc.log(r);
		//结果
		var storeJG = this.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore');
		cc.log(storeJG);
		storeJG.addData(r);
		cc.log(storeJG);
		this.BackView();
		
		//强制选择标签处于活动状态
	    var tp_chart=Ext.getCmp('cluePeopleSelectView');
	    cc.log(tp_chart);
	    var itemid=tp_chart.getActiveItem().getId();
	    cc.log('itemid:'+itemid);
	    var tab=tp_chart.getInnerItems();
	    tp_chart.setActiveItem(tab[1]);
	},
	
	//list
	clueItemViewlist:function( list, index, target, record, e, eOpts ){
		var sele=document.getElementsByName('groupkung_clueItemViewlist');
		var checkbox = sele[index];
		 if(checkbox.style.color==''){
    		  checkbox.style.color='#e03a3e';
    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
    		  //是未选中的情况下
    		  checkbox.style.color='#e03a3e';
    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
    		//是选中的情况下
    		  checkbox.style.color='#ccc';
    	  }
	},
	
	//返回
	clueItemView_FH:function(){
		this.BackView();	
	},
	
});