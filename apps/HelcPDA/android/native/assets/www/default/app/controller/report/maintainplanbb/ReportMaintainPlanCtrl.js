
/* JavaScript content from app/controller/report/maintainplanbb/ReportMaintainPlanCtrl.js in folder common */
Ext.define('HelcPDA.controller.report.maintainplanbb.ReportMaintainPlanCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'reportMaintainPlanCtrl',
	config:{
		refs:{
			//进入list页面
			to_list:'button[id=ReportMaintainPlanBb]',
			//点击上月
			to_prvelist:'button[id=preveMonth]',
			//点击进入detail
            to_ReportPlanlist1:'list[id=ReportPlan_list1]',
            //第二个list进入对应界面
            to_ReportPlanlist2:'list[id=ReportPlan_list2]',
            maintainbb_back:'button[id=maintainbb_back]',
            //点击进入分公司所有站的数据信息
            toStation_btn:'button[id=toStation_btn]'
		},
		control:{
			to_list:{
				tap:'to_list'
			},
			to_prvelist:{
				tap:'to_prvelist'
			},
			to_ReportPlanlist1:{
				itemtap:'to_ReportPlanlist1'
			},
			to_ReportPlanlist2:{
				itemtap:'to_ReportPlanlist2'
			},
			maintainbb_back:{
				tap:'maintainbb_back'
			},
			toStation_btn:{
				tap:'toStation_btn'
			}
		}
	},
	maintainbb_back:function(){
		this.BackView();
	},
  //进入对应的list界面
	to_list:function(){
		this.NextView('reportMaintainPlan_list_View','HelcPDA.view.report.maintainplanbb.ReportMaintainPlan_list_View');
		this.initData(1);
	},
	//点击上月
	to_prvelist:function(){
		var obj=this;
		this.initData(0);
		var preveMonth=Ext.getCmp('preveMonth');
		var nowMonth=Ext.getCmp('nowMonth');
		this.hiddenButton(preveMonth,nowMonth);
		nowMonth.addListener('tap',function(){
			obj.initData(1);
			obj.hiddenButton(nowMonth,preveMonth);
		});
	},
	//点击第一个list
	to_ReportPlanlist1:function(obk,index,target,record,e,eOpts){
		var store=this.getStore('ReportMaintainPlanStore','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStore');
		//Ext.getCmp('ReportPlan_list2').setSelectedCls('');
		//Ext.getCmp('ReportPlan_list1').setSelectedCls('x-item-selected');
		this.NeedData(index,store);
	},
	//点击第二个list
	to_ReportPlanlist2:function(obk,index,target,record,e,eOpts){
		var store=this.getStore('ReportMaintainPlanStore1','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStore1');
		//Ext.getCmp('ReportPlan_list1').setSelectedCls('');
		//Ext.getCmp('ReportPlan_list2').setSelectedCls('x-item-selected');
		if(record.get('ENTERED_AP')=='无保养计划数据')
			return;
		this.NeedData(index,store);
	},
	toStation_btn:function(){
		this.getApplication().getController('HelcPDA.controller.report.maintainplanbb.ReportMaintainPlanStationCtrl').to_list();
	},
   //进入页面对数据进行初始化
    initData:function(key){
    	var obj=this;
		var store=this.getStore('ReportMaintainPlanStore','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStore');
		var store1=this.getStore('ReportMaintainPlanStore1','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStore1');
	    function getResult(res){
	    	if(res.item.rows.length!='undefined'&&res.item.rows.length>0){
	    		var list=[];
	    		for(var i=0;i<(res.item.rows.length-1);i++){
	    			var temp={};
	    			temp=res.item.rows[i];
//	    			console.log("temp:  "+JSON.stringify(temp));
	    			list[i]=temp;
	    		}
	    		store.setData(res.item.rows[res.item.rows.length-1]);
		    	store1.setData(list);
		    	obj.handleJSONstore(res.item.rows,key);
		    	if(key==0){
		    		Ext.getCmp('Crea_Mesg').setHtml("上月数据总共:"+(res.item.rows.length-1)+"条");
		    	}else{
		    		Ext.getCmp('Crea_Mesg').setHtml("本月数据总共:"+(res.item.rows.length-1)+"条");
		    	}
		    	Ext.getCmp('Crea_datatime').setHtml("数据生成时间:"+res.item.rows[0].UPDATE_DATE);
		    	//HandleJSONStore
	    	}else{
	    		var maintainPlanStore  = obj.getStore('ReportMaintainPlanStore1','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStore1');
	    		var rData = {};
	    		rData.ENTERED_AP = '无保养计划数据';
	    		Ext.getCmp('Crea_Mesg').setHidden(true);
	    		Ext.getCmp('Crea_datatime').setHtml(true);
	    		Ext.getCmp('preveMonth').setHidden(true);
	    		Ext.getCmp('nowMonth').setHidden(true);
	    		Ext.getCmp('reportMaintainPlan_list_ViewToolOne').setHidden(true);
	    		Ext.getCmp('reportMaintainPlan_list_ViewToolTwo').setHidden(true);
	    		Ext.getCmp('ReportPlan_list1').setHidden(true);
	    		var listReportPlan = Ext.getCmp('ReportPlan_list2');
	    		listReportPlan.setItemTpl('<div>{ENTERED_AP}</div>');
	    		listReportPlan.setOnItemDisclosure(false);
	    		maintainPlanStore.setData([rData]);
	    		return ;
	    		//showJSONStore
	    		function getResult1(res){
			    var list1=[];
			    for(var i=0;i<(res.length-1);i++){
			    	var temp={};
	    			temp=res[i].json.stext;
			    	list1[i]=temp;
			    }
	    		  store.setData(res[res.length-1].json.stext);
				  store1.setData(list1);
				  if(key==0){
					  Ext.getCmp('Crea_Mesg').setHtml("上月数据总共:"+res.length-1+"条");
				  }else{
					  Ext.getCmp('Crea_Mesg').setHtml("本月数据总共:"+res.length-1+"条");
				  }
			      Ext.getCmp('Crea_datatime').setHtml("数据生成时间:"+res[res.length-1].json.stext.UPDATE_DATE);
	    		  alert(JSON.stringify(res[0].json.stext.UPDATE_DATE));
	    		}
	    		obj.showOrFindJSONstore(getResult1,key);
	    	}
	    }
		var content={key1:userid,key:key};
		this.connectServer(getResult,'byjhAction.do?method=toSearch', JSON.stringify(content));
	},
	hiddenButton:function(button1,button2){
		button1.setHidden(true);
		button2.setHidden(false);
	},
	handleJSONstore:function(data,key){
		var obj=this;
		function getResult(){
			obj.addJSONstore(data,key);
		}
		this.removeJSONstore(getResult,key);
	},
	addJSONstore:function(data,key){
    //add JSOnstore
	var	WL_hand=WL.JSONStore.get(collectionName);
	var query=this.NeedAddQuery(data,key);
	WL_hand.add(query).then(function(){
		//Ext.Msg.alert("添加成功");
	}).fail(function(){
		
	});
	},
	showOrFindJSONstore:function(getResult1,key){
	 //show JSOnstore
		var	WL_hand=WL.JSONStore.get(collectionName);
		var query={tcode:key};
		WL_hand.find(query).then(function(res){
			getResult1(res);
//			WL_hand.findAll().then(function(res){
//				alert(res.length);
//				console.log(JSON.stringify(res));
//			});
		}).fail(function(){
			
		});	
		
	},
	removeJSONstore:function(getResult,key){
	    //findJSONstore,if exit remove
		var obj=this;
		function getResult1(res){
				//removeJSONstore
				if(res!='undefined'&&res.length>0){
					var	WL_hand=WL.JSONStore.get(collectionName);
					var query={tcode:key,tid:'ReportMainTainPlan'+userid};
					WL_hand.remove(query).then(function(){
						getResult();
					}).fail(function(){
					});	
				}else{
					getResult();
				}
			}
			this.showOrFindJSONstore(getResult1,key);
			},
	NeedAddQuery:function(res,key){
		if(res!='undefined'&&res.length>0){
			var query=[];
			for(var i=0;i<res.length;i++){
				var temp={};
				temp.tid='ReportMainTainPlan'+userid;
				temp.tcode=key+"planbb"+res[i].COMPANY;
				temp.stext=res[i];
				query[i]=temp;
			}
			return query;
		}
		
	},
	NeedData:function(index,store){
		var obj=this;
		var PUNCTUAL_AP_RATE=store.getAt(index).get('PUNCTUAL_AP_RATE');
		var PUNCTUAL_AP=store.getAt(index).get('PUNCTUAL_AP');
		//
		var COMPANY=store.getAt(index).get('COMPANY');
	    var ENTERED_AP=store.getAt(index).get('ENTERED_AP');
	    var PLAINTED_PLAN=store.getAt(index).get('PLAINTED_PLAN'); 
	    var ELV_AMOUNT=store.getAt(index).get('ELV_AMOUNT');
//        var TOTAL_RATE=obj.getResent(PLAINTED_PLAN,ELV_AMOUNT,(PLAINTED_PLAN/ELV_AMOUNT)*100+'');
//        var LuR_RATE=obj.getResent(ENTERED_AP,ELV_AMOUNT,(ENTERED_AP/ELV_AMOUNT)*100+'');
//        var ANS_RATE=obj.getResent(PUNCTUAL_AP,ELV_AMOUNT,(PUNCTUAL_AP/ELV_AMOUNT)*100+'');
        var TOTAL_RATE=store.getAt(index).get('TOTAL_RATE');
        var LuR_RATE=store.getAt(index).get('LuR_RATE');
        var ANS_RATE=store.getAt(index).get('ANS_RATE');
        obj.NextView('reportMaintainPlan_detail_View','HelcPDA.view.report.maintainplanbb.ReportMaintainPlan_detail_View');
        if(COMPANY=="合计")
        	Ext.getCmp("toStation_btn").setHidden(true);
	    Ext.getCmp('ENTERED_AP').setValue(ENTERED_AP);
	    Ext.getCmp('PLAINTED_PLAN').setValue(PLAINTED_PLAN);
	    Ext.getCmp('ELV_AMOUNT').setValue(ELV_AMOUNT);
	    Ext.getCmp('TOTAL_RATE').setValue(TOTAL_RATE);
	    Ext.getCmp('LuR_RATE').setValue(LuR_RATE);
	    Ext.getCmp('PUNCTUAL_AP').setValue(PUNCTUAL_AP);
	    Ext.getCmp('ANS_RATE').setValue(ANS_RATE);
	    Ext.getCmp('rp_company_id').setValue(store.getAt(index).get('COMPANY_ID'));
	    document.getElementById('title_Name').innerHTML=COMPANY+'';
	   // Ext.getCmp('title_Name').setTitle(COMPANY);
	},
	getResent:function(tempValue,tempValue1,rent){
		 var array=[];
	        array=rent.split(".");
	        var temp=0;
	        if(typeof(array[1])=='undefined'||array[1].length==0){
	        	
	        }else if(array[1].length==1){
	        	temp=array[1].substring(0,1);
	        }else{
	        	temp=array[1].substring(0,2);        	
	        }
	        var hasPlanTolRen=0; 
	        if(tempValue==0){
	        	hasPlanTolRen=0;
	        }else if(tempValue1==0){
	        	hasPlanTolRen=0;
	        }
	        else{
	        	hasPlanTolRen=parseInt(array[0])+'.'+temp+"%";
	        }
	        return hasPlanTolRen;
	}
	
});



