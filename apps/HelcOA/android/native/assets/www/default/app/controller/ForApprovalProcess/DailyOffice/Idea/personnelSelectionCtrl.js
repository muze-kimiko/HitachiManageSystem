
/* JavaScript content from app/controller/ForApprovalProcess/DailyOffice/Idea/personnelSelectionCtrl.js in folder common */
/**
 * 审批流程-人员选择
 */
Ext.define('HelcOA.controller.ForApprovalProcess.DailyOffice.Idea.personnelSelectionCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'personnelSelectionCtrl_ID',
	config:{
		control:{
			'button#returnApprovaOpinion_ID':{
				tap:'personnelSelection',
			 },
			 'list#Camdodates_ID':{
				 itemtap:'Camdodates',
			 },
			 'button#CompleteChoice_ID':{
				 tap:'CompleteChoice',
			 },
			 'button#inquire_ID':{
				 tap:'staffQuery',
			 }
		}
	},	
	//返回上一页
	personnelSelection : function(obj, e, eOpts){
		this.showBackView('approvalOpinion_ID','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.approvalOpinion');
		choosePerson = [];
//		var sbenoCheck=document.getElementsByName('groupCheckbox');
//		var personnelSelectionS = Ext.data.StoreManager.get('personnelSelectionS');
//		var approvalOpinionS = Ext.data.StoreManager.get('approvalOpinionS');
//		for(var i=0;i<approvalOpinionS.data.items.length;i++){
//			
//			sbenoCheck[i].className="p_judge_box";
//		
//		}
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
	Camdodates : function(obj, index, target, record, e, eOpts ){
		cc.log("-------------index-----------");
		cc.log(obj);
		
		var personnelSelectionS = Ext.data.StoreManager.get('personnelSelectionS');
		var hasChosen=null;
		var sbenoCheck=document.getElementsByName('p_judge_color3');
		if(sbenoCheck[index].className=='p_judge_box'){
			if(actionform.flowto[record.data.forkname]==undefined){
				cc.log("test430c");
				 actionform.flowto[record.data.forkname]={};
				}
				actionform.flowto[record.data.forkname].conds=record.data.conds;
			
				if(actionform.flowto[record.data.forkname].users==undefined||actionform.flowto[record.data.forkname].users==""||actionform.flowto[record.data.forkname].users==null){
						actionform.flowto[record.data.forkname].users=[];
						cc.log("test430d");
				}
				var num = 0;
				for(var i=0;i<actionform.flowto[record.data.forkname].users.length;i++){
					if(actionform.flowto[record.data.forkname].users[i]==record.data.key){
						num++
					}
				}
				if(num==0){
					actionform.flowto[record.data.forkname].users.push(record.data.key);
				}
			
			sbenoCheck[index].className = 'p_judge_box_clicked';
	        hasChosen=personnelSelectionS.data.items[index].data;
	        cc.log('-------hasChosen-----------2');
	        cc.log(hasChosen);
	        cc.log('-------actionform.flowto-----------');
	        cc.log(actionform.flowto);
	        JSON.stringify(hasChosen);
			Ext.getCmp('nrxtProcess').setValue(hasChosen);
	    }else{
	    	if(actionform.flowto[record.data.forkname].users!=undefined&&actionform.flowto[record.data.forkname].users.length>0)
	    	{	
		    	var t_arrs=[];
		    	for(var i=0;i<actionform.flowto[record.data.forkname].users.length;i++){
		    		if(actionform.flowto[record.data.forkname].users[i]!=record.data.key)
		    		t_arrs.push(actionform.flowto[record.data.forkname].users[i])
		    	}
		    	actionform.flowto[record.data.forkname].users=t_arrs;
	    	}	
	    		sbenoCheck[index].className = 'p_judge_box';
	        hasChosen="";
	    };
	},
	//完成选择
	CompleteChoice : function(obj, e, eOpts){
		var forkname = Ext.getCmp('forkname').getValue();
		var blag=false;
		var personCheck = [];
		var persons = [];
		var cs = 0;
		var store = this.getStore('personnelSelectionS','HelcOA.store.startTheProcess.DailyOffice.Idea.personnelSelectionS');
		var data = store.data.items;
		var sbenoCheck=document.getElementsByName('p_judge_color3');
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				persons[cs]=data[i].data.key;
				blag=true;
				personCheck[cs]=i;
				cs++;
			}
		}
		
		actionform.flowto[forkname].users=persons;
//		actionform.flowto.fork.users=persons;
		
		if(!blag){
			Ext.Msg.alert('提示','请选择人员！');
			return;
		}else{
			//当multflag等于1的时候可以多选，multqty为多选时最多可以选择的最大人数
			var multflag = Ext.getCmp('SP_multflag').getValue();
			var multqty = Ext.getCmp('SP_multqty').getValue();
			cc.log('multflag: '+multflag+"	multqty: "+multqty);
			if(multflag == '1'){
				if(cs>multqty){
					Ext.Msg.alert('最多只能选择'+multqty+'人');
					return;
				}
			}
			var store = this.getStore('personnelSelectionS','HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS');
			var storeData = new Array();
			var name = Ext.getCmp('SP_name').getValue();
			personnelList[name] = name;
			Ext.apply(storeData,store.data.items);
			personnelList[name+'data'] = storeData;
			personnelList[name+'check'] = personCheck;
			this.showBackView('approvalOpinion_ID','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.approvalOpinion');
			
			var obj_nextacti = Ext.getCmp('nextacti').getValue();
			var sbenoCheck=document.getElementsByName('groupCheckbox2');
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
						cc.log("test430e");
					}
				}
			}else if(obj_nextacti=="fm"){
				//多选
			}else if(obj_nextacti=="fa"){
				//全选
			}
			
			var index = Ext.getCmp('LY_index').getValue();
			sbenoCheck[index].className = 'p_judge_box_clicked';
		}
	},
	
	//人员查询
	staffQuery : function(obj, e, eOpts){
		var obj_this = this;
		var inquireCon = Ext.getCmp('inquireCon_ID').getValue();
		if(inquireCon==""){
			Ext.Msg.alert("请输入查询条件");
			WL.Toast.show("请输入查询条件");
			return;
		}
		var store=Ext.data.StoreManager.get("qyeryListStore");
		if(!store){
			store=Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.qyeryListStore");
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
	        		tp_data.forkname=Ext.getCmp('SP_forkname').getValue();
	        		tp_data.conds=Ext.getCmp('SP_conds').getValue();	 
	        		tp_data.idx=Ext.getCmp('SP_idx').getValue();
	        	    userSolist.push(tp_data);
	        	}
				store.setData(userSolist);
				
				//已勾选过的人员，自动勾选
				var sbenoCheck=document.getElementsByName('p_judge_color4');
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
		var myParam = [inquireCon];
		var params = {};
		params.adpName = 'HttpAdapter_OA';
		params.prodNmae = 'staffQuery';
		params.prmName = myParam;
		this.connectServerComm(getResult,params);
		this.NextView('qyeryList_id','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.qyeryList');
	},
});
