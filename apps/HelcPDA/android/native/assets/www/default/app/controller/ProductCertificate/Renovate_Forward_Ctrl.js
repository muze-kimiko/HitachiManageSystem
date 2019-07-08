
/* JavaScript content from app/controller/ProductCertificate/Renovate_Forward_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.ProductCertificate.Renovate_Forward_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			//批转派
			"button#btn_batch_forward":{
				tap:'btn_batch_forward'
			},
			//进入转派
			"button#Forward_Renovate_Project":{
				tap:'Forward_Renovate_Project'
			},
			//提交转派
			"button#RP_Forward_commit":{
				tap:'RP_Forward_commit'
			},
			//提交转派(批量)
			"button#RPB_Forward_commit":{
				tap:'RPB_Forward_commit'
			},
			//根据条件搜索人员
			"button#RP_search_btn":{
				tap:'RP_search_btn'
			},
			//根据条件搜索人员(批量)
			"button#RPB_search_btn":{
				tap:'RPB_search_btn'
			},
		}
	},
	//提交转派(批量)
	RPB_Forward_commit : function(){
		var index = Ext.getCmp('RPB_XB').getValue().split(',');
		var store = this.getStore('RP_LineStore','HelcPDA.store.ProductCertificate.RP_LineStore');
		var contents=[];
		var FORWARD_PERSON_FROM_NUM = userid;
		var FORWARD_PERSON_TO_NUM = Ext.getCmp('RPB_persons').getValue();
		if(FORWARD_PERSON_TO_NUM==null){
			Ext.Msg.alert("请选择转派人员");
			return;
		}
		
		for(var i=0;i<index.length;i++){
			var UNIQUENESS_ID=store.data.items[index[i]].data.UNIQUENESS_ID;
			var ELEVATOR_NO=store.data.items[index[i]].data.ELEVATOR_NO;
			var contentdata={UNIQUENESS_ID:UNIQUENESS_ID,ELEVATOR_NO:ELEVATOR_NO,FORWARD_PERSON_FROM_NUM:FORWARD_PERSON_FROM_NUM,FORWARD_PERSON_TO_NUM:FORWARD_PERSON_TO_NUM};
			contents[i] = contentdata;
		}
		console.log(contents);
		var content = JSON.stringify(contents);
		var getPerson = function(res) {
			WL.Toast.show("转派成功,请返回");
		};
		this.connectServer(getPerson,'renovateProjectAction.do?method=toVolumeForward', content);
	},
	
	//提交转派
	RP_Forward_commit : function(){
		var UNIQUENESS_ID = Ext.getCmp('RP_UNIQUENESS_ID').getValue();
		var ELEVATOR_NO = Ext.getCmp('RP_ELEVATOR_NO').getValue();
		var FORWARD_PERSON_FROM_NUM = userid;
		var FORWARD_PERSON_TO_NUM = Ext.getCmp('RP_persons').getValue();
		if(FORWARD_PERSON_TO_NUM==null){
			Ext.Msg.alert("请选择转派人员");
			return;
		}
		var contentdata={UNIQUENESS_ID:UNIQUENESS_ID,ELEVATOR_NO:ELEVATOR_NO,FORWARD_PERSON_FROM_NUM:FORWARD_PERSON_FROM_NUM,FORWARD_PERSON_TO_NUM:FORWARD_PERSON_TO_NUM};
		var content = JSON.stringify(contentdata);
		var getPerson = function(res) {
			WL.Toast.show("转派成功，请返回");
		};
		this.connectServer(getPerson,'renovateProjectAction.do?method=toForward', content);
	},
	
	
	//根据条件搜索人员
	RP_search_btn : function(){
		var UserId = Ext.getCmp('RP_forward_search').getValue();
		if(UserId==""){
			Ext.Msg.alert('请输入查询条件');
			return;
		}
		var contentdata={UserId:UserId};
		var content = JSON.stringify(contentdata);
		var getArea = function(res) {
			console.log(res);
//			res.rows2.push({text:'请选择',value:''});
			if(res.rows2.length!=0){
				WL.Toast.show('查找成功，请选择人员');
				Ext.getCmp('RP_persons').setOptions(res.rows2);
//				Ext.getCmp('RP_persons').setValue('');
			}else{
				WL.Toast.show('找不到对应人员');
			}
			
		};
		this.connectServer(getArea,'renovateProjectAction.do?method=toSearchUsers', content);
		
	},
	
	
	//根据条件搜索人员(批量)
	RPB_search_btn : function(){
		var UserId = Ext.getCmp('RPB_forward_search').getValue();
		if(UserId==""){
			Ext.Msg.alert('请输入查询条件');
			return;
		}
		var contentdata={UserId:UserId};
		var content = JSON.stringify(contentdata);
		var getArea = function(res) {
			console.log(res);
//			res.rows2.push({text:'请选择',value:''});
			if(res.rows2.length!=0){
				WL.Toast.show('查找成功，请选择人员');
				Ext.getCmp('RPB_persons').setOptions(res.rows2);
//				Ext.getCmp('RPB_persons').setValue('');
			}else{
				WL.Toast.show('找不到对应人员');
			}
			
		};
		this.connectServer(getArea,'renovateProjectAction.do?method=toSearchUsers', content);
		
	},
	
	//进入转派 
	Forward_Renovate_Project : function(){
		var RP_ELV_RENO_STATUS_flag = Ext.getCmp('RP_ELV_RENO_STATUS_flag').getValue();
		if(RP_ELV_RENO_STATUS_flag=="RECTIFIED"||RP_ELV_RENO_STATUS_flag=="APPROVED"||RP_ELV_RENO_STATUS_flag=="UNRECTIFIED"
			||RP_ELV_RENO_STATUS_flag=="已整改"||RP_ELV_RENO_STATUS_flag=="已审核"||RP_ELV_RENO_STATUS_flag=="不能整改"){
			WL.Toast.show('无法转派,该工号已经做过整改');
			return;
		}
		this.NextView('Renovate_Project_Forward_id','HelcPDA.view.ProductCertificate.Renovate_Project_Forward');
	},
	
	//批转派
	btn_batch_forward : function(){
		var RP_LineStore = this.getStore('RP_LineStore','HelcPDA.store.ProductCertificate.RP_LineStore');
		var sele=document.getElementsByName('ipd_ENO_Checkbox');
		var count=0;
		var counts=0;
		var isRenovate=false;
		var xb=[];//存储下标
		for( var i = 0; i <sele.length; i++)  {  
		    // 提取控件  
		    var checkbox = sele[i];  
		    // 检查是否是指定的控件  
		    if (checkbox.style.color=='rgb(224, 58, 62)')  
		      {  
		    	xb[counts]=i;
		    	counts++;
		    	if(RP_LineStore.getAt(i).get('ELV_RENO_STATUS')=="已整改"||RP_LineStore.getAt(i).get('ELV_RENO_STATUS')=="无法整改"||RP_LineStore.getAt(i).get('ELV_RENO_STATUS')=="已审核"){
		    		isRenovate=true;
		    	}
		      }else{
		    	  count++;  
		      }
		 };
		 if(count==sele.length){
			 WL.Toast.show('请至少选中一个工号');
			 return;
		 }else{
			 if(isRenovate){
				 WL.Toast.show("已整改/无法整改工号无法转派！");
				 return;
			 }
			 this.NextView('Renovate_Project_Batch_Forward_id','HelcPDA.view.ProductCertificate.Renovate_Project_Batch_Forward');
			 var newXB=xb;
			 Ext.getCmp('RPB_XB').setValue(newXB);
		 };
		 
	}
	
	
});