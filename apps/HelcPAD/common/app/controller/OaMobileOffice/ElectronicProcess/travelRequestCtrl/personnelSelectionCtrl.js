/**
 * 起草流程-人员选择
 */
Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.travelRequestCtrl.personnelSelectionCtrl',{
	extend:'HelcPAD.controller.ApplicationController_OA',
	id:'qc_personnelSelectionCtrl_ID',
	config:{
		control:{
			'button#qc_returnApprovaOpinion_ID':{
				tap:'qc_personnelSelection',
			 },
			 'list#qc_Camdodates_ID':{
				 itemtap:'qc_Camdodates',
			 },
			 'button#qc_CompleteChoice_ID':{
				 tap:'qc_CompleteChoice',
			 },
			 'button#qx_inquire_ID':{
				 tap:'qc_staffQuery',
			 }
		}
	},	
	//返回上一页
	qc_personnelSelection : function(obj, e, eOpts){
		this.showBackView('qc_approvalOpinion_ID','HelcOA.view.startTheProcess.DailyOffice.Idea.approvalOpinion');
		choosePerson = [];
//		var sbenoCheck=document.getElementsByName('groupCheckbox');
//		var personnelSelectionS = Ext.data.StoreManager.get('personnelSelectionS');
//		var approvalOpinionS = Ext.data.StoreManager.get('approvalOpinionS');
//		for(var i=0;i<approvalOpinionS.data.items.length;i++){
//			
//			sbenoCheck[i].className="p_judge_box";
//		
//		}
//		actionform.flowto={};
//		try{
//			actionform.flowto=personnelSelectionS.data.items[0].data.fork}catch(e){}
//		for(var i=0;i<approvalOpinionS.data.items.length;i++){
//			if(actionform.flowto[approvalOpinionS.data.items[i].data.forkname]!=undefined&&actionform.flowto[approvalOpinionS.data.items[i].data.forkname].conds!=undefined&&actionform.flowto[approvalOpinionS.data.items[i].data.forkname].conds==approvalOpinionS.data.items[i].data.conds)
//			{
//				if(actionform.flowto[approvalOpinionS.data.items[i].data.forkname].users!=undefined&&actionform.flowto[approvalOpinionS.data.items[i].data.forkname].users!=null&&actionform.flowto[approvalOpinionS.data.items[i].data.forkname].users.length!=0){
//					
//					sbenoCheck[i].className="p_judge_box_clicked";
//				
//				}else{
//					
//					sbenoCheck[i].className="p_judge_box";
//					
//				}
//				
//			}
//			
//		}
		
	
	},
	//选择人员
	qc_Camdodates : function(obj, index, target, record, e, eOpts ){
		cc.log("-------------index-----------");
		cc.debug=1;
		//--------------------------------------------------
		var personnelSelectionS = Ext.data.StoreManager.get('personnelSelectionS');
		var hasChosen=null;
		var sbenoCheck=document.getElementsByName('p_judge_color');
		if(sbenoCheck[index].className=='p_judge_box'){
			if(actionform.flowto[record.data.forkname]==undefined){
				actionform.flowto[record.data.forkname]={};
				}
				actionform.flowto[record.data.forkname].conds=record.data.conds;
			
				if(actionform.flowto[record.data.forkname].users==undefined||actionform.flowto[record.data.forkname].users==""||actionform.flowto[record.data.forkname].users==null){
					actionform.flowto[record.data.forkname].users=[];
					}
				actionform.flowto[record.data.forkname].users.push(record.data.key);
			
			
			
			sbenoCheck[index].className = 'p_judge_box_clicked';
	        hasChosen=personnelSelectionS.data.items[index].data;
	        cc.log('-------hasChosen-----------');
	        cc.log(hasChosen);
	        cc.log('-------actionform.flowto-----------');
	        cc.log(actionform.flowto);
	        JSON.stringify(hasChosen);
			Ext.getCmp('nrxtProcess').setValue(hasChosen);
	    }else{
	    	if(actionform.flowto[record.data.forkname].users!=undefined&&actionform.flowto[record.data.forkname].users.length>0)
	    	{	
	    	//actionform.flowto[record.data.forkname].users
	    	var t_arrs=[];
	    	for(var i=0;i<actionform.flowto[record.data.forkname].users.length;i++){
	    		if(actionform.flowto[record.data.forkname].users[i]!=record.data.key)
	    		t_arrs.push(actionform.flowto[record.data.forkname].users[i]);
	    	}
	    	actionform.flowto[record.data.forkname].users=t_arrs;
	    	}	
	    		sbenoCheck[index].className = 'p_judge_box';
	        hasChosen="";
	    };
	},
	//完成选择
	qc_CompleteChoice : function(obj, e, eOpts){
		var blag=false;
		var personCheck = [];
		var persons = [];
		var cs = 0;
		var store = this.getStore('personnelSelectionS','HelcOA.store.startTheProcess.DailyOffice.Idea.personnelSelectionS');
		var data = store.data.items;
		var sbenoCheck=document.getElementsByName('p_judge_color');
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				persons[cs]=data[i].data.key;
				blag=true;
				personCheck[cs]=i;
				cs++;
			}
		}
		
		actionform.flowto.fork.users=persons;
		
		
		if(!blag){
			Ext.Msg.alert('提示','请选择人员！');
			return;
		}else{
			//当multflag等于1的时候可以多选，multqty为多选时最多可以选择的最大人数
			var multflag = Ext.getCmp('QC_multflag').getValue();
			var multqty = Ext.getCmp('QC_multqty').getValue();
			cc.log('multflag: '+multflag+"	multqty: "+multqty);
			if(multflag == '1'){
				if(cs>multqty){
					Ext.Msg.alert('最多只能选择'+multqty+'人');
					return;
				}
			}
			
//			var store = this.getStore('personnelSelectionS','HelcOA.store.startTheProcess.DailyOffice.Idea.personnelSelectionS');
			var storeData = new Array();
			var name = Ext.getCmp('QC_name1').getValue();
			personnelList[name] = name;
			Ext.apply(storeData,store.data.items);
			personnelList[name+'data'] = storeData;
			personnelList[name+'check'] = personCheck;
			this.showBackView('qc_approvalOpinion_ID','HelcOA.view.startTheProcess.DailyOffice.Idea.approvalOpinion');

			var obj_nextacti = Ext.getCmp('nextacti').getValue();
			var sbenoCheck=document.getElementsByName('groupCheckbox');
			if(obj_nextacti=="fo"){
				//单选
				for(var i=0; i<sbenoCheck.length; i++){
					if(index!=i){
						sbenoCheck[i].className = 'p_judge_box';
					}else{
						actionform.flowto={};
						actionform.flowto[record.data.forkname]={};
						actionform.flowto[record.data.forkname].conds=record.data.conds;
						actionform.flowto[record.data.forkname].users=[];
					}
				}
			}else if(obj_nextacti=="fm"){
				//多选
			}else if(obj_nextacti=="fa"){
				//全选
			}
			var index = Ext.getCmp('QC_index').getValue();
			sbenoCheck[index].className = 'p_judge_box_clicked';
		}
	},
	
	//人员查询
	qc_staffQuery : function(obj, e, eOpts){
		
		var qx_inquireCon = Ext.getCmp('qx_inquireCon_ID').getValue();
		if(qx_inquireCon==""){
			Ext.Msg.alert("请输入查询条件");
			WL.Toast.show("请输入查询条件");
			return;
		}
		
		var store=Ext.data.StoreManager.get("qyeryListStore");
		if(!store){
			store=Ext.create("HelcOA.store.startTheProcess.DailyOffice.Idea.qyeryListStore");
		}
		store.setData([]);
		
		function getResult(result) {
			cc.log(result.SEARPEOReturn.CDATA);
			
			var s,str;
			var userSolist=[];
			s=result.SEARPEOReturn.CDATA;
			if(s!=null&&s!=undefined){
				
				str=s.split(",");//把是变成数组
				
				//给qyeryListStore循环传入数据
	        	for(var nb=0;nb<str.length;nb++){

	        		var tempArr=str[nb].split("*");//根据*分割
	        		cc.log(tempArr);
	        		
	        		
	        		var tp_data={};
	        		tp_data.value = tempArr[0];
	        		tp_data.key = tempArr[1];
	        		tp_data.forkname=Ext.getCmp('QC_forkname').getValue();
	        		tp_data.conds=Ext.getCmp('QC_conds').getValue();	 
	        		tp_data.idx=Ext.getCmp('QC_idx').getValue();
	        	    userSolist.push(tp_data);
	        	}
				store.setData(userSolist);
				
				//已勾选过的人员，自动勾选
				var sbenoCheck=document.getElementsByName('p_judge_color2');
				for(var i =0;i<choosePerson.length;i++){
					for(var j=0;j<userSolist.length;j++){
						if(choosePerson[i]==userSolist[j].key){
							sbenoCheck[j].className='p_judge_box_clicked';
						}
					}
				}
				
			}else{
				Ext.Msg.alert('提示','查无此数据！');
			}
		};
		var myParam = [qx_inquireCon];
		var params = {};
		params.adpName = 'HttpAdapter_OA';
		params.prodNmae = 'staffQuery';
		params.prmName = myParam;
		this.connectServerComm(getResult,params);
		this.NextView('qc_qyeryList_id','HelcOA.view.startTheProcess.DailyOffice.Idea.qyeryList');
	},
	
});