/**
 * 起草流程-人员查询列表
 */
Ext.define('HelcPDA.controller.oa.startTheProcess.DailyOffice.Idea.qyeryListCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
	config:{
		control:{
			'button#qc_returnPersonnelSelection_ID':{
				tap:'qc_returnPersonnelSelection',
			 },
			 'list#qc_qyeryList_List_ID':{
				 itemtap:'qc_qyeryList_List',
			 },
			 'button#qc_CompleteChoice2_ID':{
				 tap:'qc_CompleteChoice2',
			 },
		}
	},	
	//返回上一页
	qc_returnPersonnelSelection : function(obj, e, eOpts){
		this.showBackView('qc_personnelSelection_id','HelcOA.view.startTheProcess.DailyOffice.Idea.personnelSelection');
	},	
	//选择人员
	qc_qyeryList_List : function(obj, index, target, record, e, eOpts ){
		var obj_this = this;
		cc.log('-----index----');
		cc.log(index);
		//--------------------------------------------------
		var qyeryListStore = Ext.data.StoreManager.get('qyeryListStore');
		var hasChosen=null;
		var sbenoCheck=document.getElementsByName('p_judge_color2');
		if(sbenoCheck[index].className=='p_judge_box'){
			
			if(actionform.flowto[record.data.forkname]==undefined){
				actionform.flowto[record.data.forkname]={};
				actionform.flowto[record.data.forkname].conds=record.data.conds;
			}
			if(actionform.flowto[record.data.forkname].users==undefined){
				actionform.flowto[record.data.forkname].users=[];
				actionform.flowto[record.data.forkname].users.push(record.data.key);
			}
			
			
			sbenoCheck[index].className = 'p_judge_box_clicked';
	        hasChosen=qyeryListStore.data.items[index].data;
	        cc.log('-------hasChosen-----------');
	        cc.log(hasChosen);
	        JSON.stringify(hasChosen);
			Ext.getCmp('nrxtProcess').setValue(hasChosen);
	    }else{
	    	if(actionform.flowto[record.data.forkname].users!=undefined&&actionform.flowto[record.data.forkname].users.length>0)
	    	{	
		    	//actionform.flowto[record.data.forkname].users
		    	var t_arrs=[];
		    	for(var i=0;i<actionform.flowto[record.data.forkname].users.length;i++){
		    		if(actionform.flowto[record.data.forkname].users[i]!=record.data.key)
		    		t_arrs=actionform.flowto[record.data.forkname].users[i];
		    	}
		    	actionform.flowto[record.data.forkname].users=t_arrs;
	    	}	
	    	sbenoCheck[index].className = 'p_judge_box';
	        hasChosen="";
	    };
	},
	//完成选择
	qc_CompleteChoice2 : function(obj, e, eOpts){
		var sbenoCheck=document.getElementsByName('p_judge_color2');
		
		var qyeryListStore = this.getStore('qyeryListStore','HelcPDA.store.oa.startTheProcess.DailyOffice.Idea.qyeryListStore');
		var personnelSelectionS = this.getStore('personnelSelectionS','HelcPDA.store.oa.startTheProcess.DailyOffice.Idea.personnelSelectionS');
//			personnelSelectionS.setData([]);
		var hasChosen=personnelSelectionS.data;
		cc.log('---hasChosen---');
		cc.log(hasChosen);
		var addPersonnel=null;

		var newdata = [];
		for(var i=0;i<hasChosen.length;i++){
			var item_ = {};
			item_.value = hasChosen.getAt(i).get('value');
			cc.log('------------------------------------------');
			cc.log(item_);
			item_.key = personnelSelectionS.getAt(i).get('key');
			item_.forkname = personnelSelectionS.getAt(i).get('forkname');
			item_.conds = personnelSelectionS.getAt(i).get('conds');
			item_.idx = personnelSelectionS.getAt(i).get('idx');
			item_.fork = personnelSelectionS.getAt(i).get('fork');
			newdata[newdata.length] = item_;
		} 
		
		var cs = 0;
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				cc.log(addPersonnel);
				var existFlag = false;
				var item_ = {};
				item_.value = qyeryListStore.getAt(i).get('value');
				item_.key = qyeryListStore.getAt(i).get('key');
				item_.forkname=Ext.getCmp('QC_forkname').getValue();
				item_.conds=Ext.getCmp('QC_conds').getValue();	 
				item_.idx=Ext.getCmp('QC_idx').getValue();
				
				//如果人员列表中已有选中人员，则不添加
				var PersonData = personnelSelectionS.data.items;
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
		personnelSelectionS.setData(newdata);
		
		//勾选的人员在人员列表中选中
		var sbenoCheck=document.getElementsByName('p_judge_color');
		var PersonData = personnelSelectionS.data.items;
		for(var i=0;i<PersonData.length;i++){
			for(var j=0;j<choosePerson.length;j++){
				if(PersonData[i].data.key==choosePerson[j]){
					sbenoCheck[i].className = 'p_judge_box_clicked';
				}
			}
		}
		

		cc.log(hasChosen);
		cc.log('----------nrxtProcess-------------');
		cc.log(Ext.getCmp('nrxtProcess').getValue());
		this.showBackView('qc_personnelSelection_id','HelcPDA.view.oa.startTheProcess.DailyOffice.Idea.personnelSelection');
		qyeryListStore.setData([]);
	},
});








