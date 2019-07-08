Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelectionC',{
	extend:'HelcPAD.controller.ApplicationController_OA',
	id:'PublicPersonnelSelectionC_id',
	config:{
		control:{
			//进入查找人员
			'button#public_sreach_peson':{
				tap:'public_sreach_peson',
			 },
			 //完成搜索选人
			 'button#public_CompleteChoice':{
				 tap:'public_CompleteChoice',
			 },
			 //确定选择的人员，设值
			 'button#public_commitSel':{
				 tap:'public_commitSel',
			 },
			 //返回
			 'button#public_backview':{
				 tap:'public_backview',
			 },
			 //返回选人
			 'button#public_backSelect':{
				 tap:'public_backSelect',
			 },
			//选择人员
			 'list#PublicQyeryList':{
				 itemtap:'PublicQyeryList',
			 },
			 //选择设值的人员
			 'list#PublicPersonnelSelectionList':{
				 itemtap:'PublicPersonnelSelectionList',
			 },
		}	
	},
	
	public_backSelect : function(){
		this.showBackView('PublicPersonnelSelection_id','HelcOA.view.PublicPersonnelSelection');
	},
	
	public_backview : function(){
		var ViewId = Ext.getCmp('public_ViewId').getValue();
		var ViewName = Ext.getCmp('public_ViewId').getValue();
		this.showBackView(ViewId,ViewName);
	},
	
	//选择人员后赋值方法
	selectPerson : function(textId){
		var ViewId = Ext.Viewport.getActiveItem().id;
		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		var store = this.getStore('PublicPersonnelSelectionS','HelcPAD.store.OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelection');
		store.setData([]);
		this.NextView('PublicPersonnelSelection_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelection');
		Ext.getCmp('public_ViewId').setValue(ViewId);
		Ext.getCmp('public_ViewName').setValue(ViewName);
		Ext.getCmp('public_text_id').setValue(textId);
	},
	
	//确定选择的人员，设值
	public_commitSel : function(){
		var sbenoCheck=document.getElementsByName('public_p_judge_color');
		var ViewId = Ext.getCmp('public_ViewId').getValue();
		var ViewName = Ext.getCmp('public_ViewId').getValue();
		this.showBackView(ViewId,ViewName);
		var text_id = Ext.getCmp('public_text_id').getValue();
		var store = this.getStore('PublicPersonnelSelectionS','HelcPAD.store.OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelectionS');
		var hasChosen = store.data;
		var newdata = [];
		for(var i=0;i<hasChosen.length;i++){
			var item_ = {};
			item_.value = hasChosen.getAt(i).get('value');
			item_.key = store.getAt(i).get('key');
//			item_.forkname = PublicPersonnelSelectionS.getAt(i).get('forkname');
//			item_.conds = PublicPersonnelSelectionS.getAt(i).get('conds');
//			item_.idx = PublicPersonnelSelectionS.getAt(i).get('idx');
//			item_.fork = PublicPersonnelSelectionS.getAt(i).get('fork');
			newdata[newdata.length] = item_;
		} 
		var personText = "";
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				var value = store.getAt(i).get('value');
				if(personText==""){
					personText = value;
				}else{
					personText = personText+','+value;
				}
			}
		}
		Ext.getCmp(text_id).setValue(personText);
		choosePerson = [];
	},
	
	//选择设值的人员
	PublicPersonnelSelectionList : function(obj, index, target, record, e, eOpts ){
		var sbenoCheck=document.getElementsByName('public_p_judge_color');
		if(sbenoCheck[index].className=='p_judge_box'){
			sbenoCheck[index].className = 'p_judge_box_clicked';
	    }else{
	    	sbenoCheck[index].className = 'p_judge_box';
	    };
	},
	
	
	//完成搜索选人
	public_CompleteChoice : function(){
		var sbenoCheck=document.getElementsByName('public_p_judge_color2');
		var PublicQyeryListStore = Ext.data.StoreManager.get('PublicQyeryListStore');
		var PublicPersonnelSelectionS = Ext.data.StoreManager.get('PublicPersonnelSelectionS');
		var hasChosen=PublicPersonnelSelectionS.data;

		var newdata = [];
		for(var i=0;i<hasChosen.length;i++){
			var item_ = {};
			item_.value = hasChosen.getAt(i).get('value');
			item_.key = PublicPersonnelSelectionS.getAt(i).get('key');
			item_.forkname = PublicPersonnelSelectionS.getAt(i).get('forkname');
			item_.conds = PublicPersonnelSelectionS.getAt(i).get('conds');
			item_.idx = PublicPersonnelSelectionS.getAt(i).get('idx');
			item_.fork = PublicPersonnelSelectionS.getAt(i).get('fork');
			newdata[newdata.length] = item_;
		} 
		
		var cs = 0;
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				var existFlag = false;
				var item_ = {};
				item_.value = PublicQyeryListStore.getAt(i).get('value');
				item_.key = PublicQyeryListStore.getAt(i).get('key');
//				item_.forkname=Ext.getCmp('QC_forkname').getValue();
//				item_.conds=Ext.getCmp('QC_conds').getValue();	 
//				item_.idx=Ext.getCmp('QC_idx').getValue();
				
				//如果人员列表中已有选中人员，则不添加
				var PersonData = PublicPersonnelSelectionS.data.items;
				for(var j=0;j<PersonData.length;j++){
					if(PersonData[j].data.key == item_.key){
						existFlag=true;
					}
				}
				if(existFlag==false){
					var flowtocy={};
					flowtocy[item_.forkname]={};
					flowtocy[item_.forkname].conds=item_.conds;
					flowtocy[item_.forkname].users=[];//actoy[item_.forkname].us
					//Ext.apply(t,);
					item_.fork=flowtocy;
					newdata[newdata.length] = item_; 
				}
				
				
				//存储已勾选的人员，用户再次查找时自动勾选
				choosePerson[cs]=item_.key;
				cs++;
			}
		}
		PublicPersonnelSelectionS.setData(newdata);
		
		//勾选的人员在人员列表中选中
		var sbenoCheck=document.getElementsByName('public_p_judge_color');
		var PersonData = PublicPersonnelSelectionS.data.items;
		for(var i=0;i<PersonData.length;i++){
			for(var j=0;j<choosePerson.length;j++){
				if(PersonData[i].data.key==choosePerson[j]){
					sbenoCheck[i].className = 'p_judge_box_clicked';
				}
			}
		}
		

		this.showBackView('PublicPersonnelSelection_id','HelcOA.view.PublicPersonnelSelection');
		PublicQyeryListStore.setData([]);
	},
	
	
	//选择人员
	PublicQyeryList : function(obj, index, target, record, e, eOpts ){
		var sbenoCheck=document.getElementsByName('public_p_judge_color2');
		if(sbenoCheck[index].className=='p_judge_box'){
			sbenoCheck[index].className = 'p_judge_box_clicked';
	    }else{
	    	sbenoCheck[index].className = 'p_judge_box';
	    };
	},
	
	//进入查找人员
	public_sreach_peson : function(obj, e, eOpts){
		var public_pesonS = Ext.getCmp('public_pesonS').getValue();
		if(public_pesonS==""){
			Ext.Msg.alert("请输入查询条件");
			WL.Toast.show("请输入查询条件");
			return;
		}
		
		var store = this.getStore('PublicQyeryListStore','HelcPAD.store.OaMobileOffice.ElectronicProcess.travelRequestS.PublicQyeryListStore');
		
		function getResult(result) {
			
			var s,str;
			var userSolist=[];
			s=result.SEARPEOReturn.CDATA;
			if(s!=null&&s!=undefined){
				
				str=s.split(",");
				
				//给qyeryListStore循环传入数据
	        	for(var nb=0;nb<str.length;nb++){

	        		var tempArr=str[nb].split("*");//根据*分割
	        		cc.log(tempArr);
	        		
	        		var tp_data={};
	        		tp_data.value = tempArr[0];
	        		tp_data.key = tempArr[1];
//	        		tp_data.forkname=Ext.getCmp('QC_forkname').getValue();
//	        		tp_data.conds=Ext.getCmp('QC_conds').getValue();	 
//	        		tp_data.idx=Ext.getCmp('QC_idx').getValue();
	        	    userSolist.push(tp_data);
	        	}
				store.setData(userSolist);
				
//				//已勾选过的人员，自动勾选
//				var sbenoCheck=document.getElementsByName('p_judge_color2');
//				for(var i =0;i<choosePerson.length;i++){
//					for(var j=0;j<userSolist.length;j++){
//						if(choosePerson[i]==userSolist[j].key){
//							sbenoCheck[j].className='p_judge_box_clicked';
//						}
//					}
//				}
				
			}else{
				Ext.Msg.alert('提示','查无此数据！');
			}
		};
		var myParam = [public_pesonS];
		var params = {};
		params.adpName = 'HttpAdapter_OA';
		params.prodNmae = 'staffQuery';
		params.prmName = myParam;
		this.connectServerComm(getResult,params);
		this.NextView('PublicQyeryList_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicQyeryList');
	},
	
});