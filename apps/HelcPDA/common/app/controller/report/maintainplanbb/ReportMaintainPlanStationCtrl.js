Ext.define('HelcPDA.controller.report.maintainplanbb.ReportMaintainPlanStationCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'reportMaintainPlanStationCtrl',
	requires:['HelcPDA.view.report.maintainplanbb.ReportMaintainPlanStation_list_View'],
	config:{
		refs:{
			//进入list页面
			//to_list:'button[id=ReportMaintainPlanBb]',
			//点击上月
			to_prvelist:'button[id=preveMonthSta]',
	        //进入对应站的详细数据界面
	        to_ReportPlanlist2:'list[id=ReportPlanStation_list2]',
	        maintainbbsta_back:'button[id=maintainbbsta_back]',
		},
		control:{
			
			to_prvelist:{
				tap:'to_prvelist'
			},
			to_ReportPlanlist2:{
				itemtap:'to_ReportPlanlist2'
			},
			maintainbbsta_back:{
				tap:'maintainbbsta_back'
			},
		}
	},
	maintainbbsta_back:function(){
		this.BackView();
	},
	to_list:function(){
		this.NextView('reportMaintainPlanStation_list_View','HelcPDA.view.report.maintainplanbb.ReportMaintainPlanStation_list_View');
		this.initData(1);
	},
	//点击上月
	to_prvelist:function(){
		var obj=this;
		this.initData(0);
		var preveMonth=Ext.getCmp('preveMonthSta');
		var nowMonth=Ext.getCmp('nowMonthSta');
		this.hiddenButton(preveMonth,nowMonth);
		nowMonth.addListener('tap',function(){
			obj.initData(1);
			obj.hiddenButton(nowMonth,preveMonth);
		});
	},
	//点击第二个list
	to_ReportPlanlist2:function(obk,index,target,record,e,eOpts){
		var store=this.getStore('ReportMaintainPlanStationStore1','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStationStore1');
		//Ext.getCmp('ReportPlan_list1').setSelectedCls('');
		//Ext.getCmp('ReportPlan_list2').setSelectedCls('x-item-selected');
		this.NeedData(index,store);
	},
	//进入页面初化分公司所有站数据
    initData:function(key){
    	var COMPANY = document.getElementById('title_Name').innerHTML;
    	var COMPANY_ID = Ext.getCmp('rp_company_id').getValue();
    	//var obj=this;
		var store=this.getStore('ReportMaintainPlanStationStore','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStationStore');
		var store1=this.getStore('ReportMaintainPlanStationStore1','HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStationStore1');
		
	    var getResult = function(res){
	    	
	    	if(res.item.rows.length!='undefined'&&res.item.rows.length>0){
	    		var list=[];
	    		for(var i=0;i<(res.item.rows.length-1);i++){
	    			var temp={};
	    			temp=res.item.rows[i];
	    			console.log("jsonstringifytemp:     "+JSON.stringify(temp));
	    			list[i]=temp;
	    		}
	    		
	    		store.setData(res.item.rows[res.item.rows.length-1]);
		    	store1.setData(list);
		    	//obj.handleJSONstore(res.item.rows,key);
		    	if(key==0){
		    		Ext.getCmp('CreaSta_Mesg').setHtml("上月数据总共:"+(res.item.rows.length-1)+"条");
		    	}else{
		    		Ext.getCmp('CreaSta_Mesg').setHtml("本月数据总共:"+(res.item.rows.length-1)+"条");
		    	}
		    	Ext.getCmp('CreaSta_datatime').setHtml("数据生成时间:"+res.item.rows[0].UPDATE_DATE);
		    	//HandleJSONStore
	    	}else{
	    		Ext.Msg.alert('请链接网络后重试！');
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
					  Ext.getCmp('CreaSta_Mesg').setHtml("上月数据总共:"+res.length-1+"条");
				  }else{
					  Ext.getCmp('CreaSta_Mesg').setHtml("本月数据总共:"+res.length-1+"条");
				  }
			      Ext.getCmp('CreaSta_datatime').setHtml("数据生成时间:"+res[res.length-1].json.stext.UPDATE_DATE);
	    		  alert(JSON.stringify(res[0].json.stext.UPDATE_DATE));
	    		}
	    		//obj.showOrFindJSONstore(getResult1,key);
	    	}
	    };
	    var content={company:COMPANY,company_id:COMPANY_ID,key:key};
		this.connectServer(getResult,'byjhAction.do?method=toSearchStation', JSON.stringify(content));
		
	},
	NeedData:function(index,store){
		var obj=this;
		var PUNCTUAL_AP_RATE=store.getAt(index).get('PUNCTUAL_AP_RATE');
		var PUNCTUAL_AP=store.getAt(index).get('PUNCTUAL_AP');
		//
		var STATION=store.getAt(index).get('STATION');
	    var ENTERED_AP=store.getAt(index).get('ENTERED_AP');
	    var PLAINTED_PLAN=store.getAt(index).get('PLAINTED_PLAN'); 
	    var ELV_AMOUNT=store.getAt(index).get('ELV_AMOUNT');
//        var TOTAL_RATE=obj.getResent(PLAINTED_PLAN,ELV_AMOUNT,(PLAINTED_PLAN/ELV_AMOUNT)*100+'');
//        var LuR_RATE=obj.getResent(ENTERED_AP,ELV_AMOUNT,(ENTERED_AP/ELV_AMOUNT)*100+'');
//        var ANS_RATE=obj.getResent(PUNCTUAL_AP,ELV_AMOUNT,(PUNCTUAL_AP/ELV_AMOUNT)*100+'');
        var TOTAL_RATE=store.getAt(index).get('TOTAL_RATE');
        var LuR_RATE=store.getAt(index).get('LuR_RATE');
        var ANS_RATE=store.getAt(index).get('ANS_RATE');
        obj.NextView('reportMaintainPlanStation_detail_View','HelcPDA.view.report.maintainplanbb.ReportMaintainPlanStation_detail_View');
	    Ext.getCmp('STA_ENTERED_AP').setValue(ENTERED_AP);
	    Ext.getCmp('STA_PLAINTED_PLAN').setValue(PLAINTED_PLAN);
	    Ext.getCmp('STA_ELV_AMOUNT').setValue(ELV_AMOUNT);
	    Ext.getCmp('STA_TOTAL_RATE').setValue(TOTAL_RATE);
	    Ext.getCmp('STA_LuR_RATE').setValue(LuR_RATE);
	    Ext.getCmp('STA_PUNCTUAL_AP').setValue(PUNCTUAL_AP);
	    Ext.getCmp('STA_ANS_RATE').setValue(ANS_RATE);
	    document.getElementById('sta_title_Name').innerHTML=STATION+'';
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
	},hiddenButton:function(button1,button2){
		button1.setHidden(true);
		button2.setHidden(false);
	}
});