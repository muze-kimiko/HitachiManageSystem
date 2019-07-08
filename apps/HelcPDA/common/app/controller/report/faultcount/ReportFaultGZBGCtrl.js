/**
 * 故障报告书报表  监视器  xcx 2014-5-22
 */
//是本月还是上月
var gzbgsbbBySy;

Ext.define('HelcPDA.controller.report.faultcount.ReportFaultGZBGCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入故障报告书  没用了 
			Report_Fault_GZBGButton:'button[id=Report_Fault_GZBGButton]',
			
			
			/************************************************************************************
			 * 故障报告书报表 1   页面
			 * */
			
			//故障报告书 返回
			Rep_fault_GZBG_FHbutton:'button[id=Rep_fault_GZBG_FHbutton]',

			//故障报告书 上月
			Rep_fault_GZBG_SYbutton:'button[id=Rep_fault_GZBG_SYbutton]',
			
			/**
			 **故障报告书报表 1   页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 故障报告书报表 2   页面
			 * */
			
			//故障报告书2  返回
			falut_gzbgCount_FHbutton:'button[id=falut_gzbgCount_FHbutton]',

			//故障报告书3  返回
//			Rep_fault_GZBGStation_FHbutton:'button[id=Rep_fault_GZBGStation_FHbutton]',

			/**
			 **故障报告书报表 2   页面
			 ************************************************************************************/
			
			
			

		},
		control:{
			
			//进入故障报告书 没用了
			Report_Fault_GZBGButton:{
				tap:'Report_Fault_GZBGButton'
			},
			
			
			/************************************************************************************
			 * 故障报告书报表 1   页面
			 * */
			
			//故障报告书 返回
			'button#Rep_fault_GZBG_FHbutton':{
				tap:'Rep_fault_GZBG_FHbutton'
			},
			
			//故障报告书所属站 返回
			'button#Rep_fault_GZBGStation_FHbutton':{
				tap:'Rep_fault_GZBGStation_FHbutton'
			},

			//故障报告书 上月 
			'button#Rep_fault_GZBG_SYbutton':{
				tap:'Rep_fault_GZBG_SYbutton'
			},
			
			//单击获取详细信息  上
			'list#rep_FaultGZBGStore':{
				itemtap:'rep_FaultGZBGStore'
			},
			
			//单击获取详细信息  下
			'list#rep_FaultGZBGStoreTwo':{
				itemtap:'rep_FaultGZBGStoreTwo'
			},
			
			/**
			 **故障报告书报表 1   页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 故障报告书报表 2   页面
			 * */

			//故障报告书2  返回
			'button#falut_gzbgCount_FHbutton':{
				tap:'falut_gzbgCount_FHbutton'
			},
			
			//故障报告书 查询所属站信息
			'button#search_gzbbstation_button':{
				tap:'search_gzbbstation_button'
			},
			
			
			/**
			 **故障报告书报表 2   页面
			 ************************************************************************************/
			
		},
	},
	
	/************************************************************************************
	 * 故障报告书报表 1   页面
	 * */
	
	//故障报告书 返回
	Rep_fault_GZBG_FHbutton:function(){
		//alert(12);
		this.BackView();
//		this.showBackView("reportview_homepage","HelcPDA.view.report.ReportView");
	},
	
	//故障报告书所属站 返回
	Rep_fault_GZBGStation_FHbutton:function(){
		this.showBackView("falut_gzbgCount","HelcPDA.view.report.faultcount.ReportFaultGZBGCount");
//		Ext.getCmp('searchcompanyid').setValue('');
	},

	//故障报告书 上月 
	Rep_fault_GZBG_SYbutton:function(){
		var test=Ext.getCmp('Rep_fault_GZBG_SYbutton').getText();
		this_obj=this;
		if(test=='本月'){
			Ext.getCmp('Rep_fault_GZBG_SYbutton').setText('上月');
			this_obj.RepFaultData(this_obj,1);
		}else if(test=='上月'){
			Ext.getCmp('Rep_fault_GZBG_SYbutton').setText('本月');
			this_obj.RepFaultData(this_obj,0);
		}
	},
	
	//获取数据
	RepFaultData:function(obj,id){
		//删除JSON数据
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var Maintxml={tcode:'GZBG/'+userid+'/'+id};
    	var options={exacte:true};//默认是false
    	MaintainList.remove(Maintxml,options).then(function(){
    		console.log('GZBG删除成功');
    		var data="{'key1':'"+userid+"','key':'"+id+"'}";
    		gzbgsbbBySy=id;
    		obj.connectServerMainTain(obj.RepFaultData2,obj,"gzbgsAction.do?method=toSearch",data);
    	}).fail(function(){
			console.log('GZBG删除失败');
		});
	},
	
	//处理得到的数据
	RepFaultData2:function(result,obj){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	
		var num=result.item.rows.length;
		//本月数据
		var sj='本月数据('+(num-1)+')';
		Ext.getCmp('rep_gzbgHP_BYSJ').setHtml(sj);
		//数据生成时间
		var SCtime=result.item.rows[0].UPDATE_DATE;
		Ext.getCmp('rep_gzbgHP_SCSJ').setHtml(SCtime);
		
		if(num==2){//分公司
			var datads=Ext.data.StoreManager.get('ReportFaultGZBGStore');
			if(!datads){
				datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStore');
			}
			var Sdata=result.item.rows[0];
			if(Sdata.PASSED_FAULT_AMOUNT==''){
				Sdata.PASSED_FAULT_AMOUNT=0;
			}
			datads.setData(Sdata);
			
			//JSONStore添加时间
			var SHdata=[];
			/*var sun=num-1;
			for(var i=0;i<sun;i++){
				var MainAdd={tcode:'FGS_GZBG/'+userid+'/'+gzbgsbbBySy,tid:result.item.rows[i].COMPANY,stext:result.item.rows[i]};
				SHdata[i]=MainAdd;
			};*/
			var MainAdd={tcode:'GZBG/'+userid+'/'+gzbgsbbBySy,tid:result.item.rows[0].COMPANY,stext:result.item.rows[0]};
			SHdata[0]=MainAdd;
			MaintainList.add(SHdata).then(function(){
				console.log('故障报告数据成功添加');
			}).fail(function(errorObject){
				console.log('故障报告数据添加失败');	
			});
			
		}else if(num>2){//总公司
			var datads=Ext.data.StoreManager.get('ReportFaultGZBGStore');
			if(!datads){
				datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStore');
			}
			var Sdata=result.item.rows[num-1];
			if(Sdata.PASSED_FAULT_AMOUNT==''){
				Sdata.PASSED_FAULT_AMOUNT=0;
			}
			datads.setData(Sdata);
			
			var datads=Ext.data.StoreManager.get('ReportFaultGZBGStoreTwo');
			if(!datads){
				datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStoreTwo');
			};
			var zgs=[];
			for(var i=0;i<num-1;i++){
				zgs[i]=result.item.rows[i];
				if(zgs[i].PASSED_FAULT_AMOUNT==''){
					zgs[i].PASSED_FAULT_AMOUNT=0;
				}
			};
			datads.setData(zgs);
			
			//JSONStore添加时间
			var SHdata=[];
			//var sun=num-1;
			for(var i=0;i<num;i++){
				var MainAdd={tcode:'GZBG/'+userid+'/'+gzbgsbbBySy,tid:result.item.rows[i].COMPANY,stext:result.item.rows[i]};
				SHdata[i]=MainAdd;
			};
			MaintainList.add(SHdata).then(function(){
				console.log('故障报告数据成功添加');
			}).fail(function(errorObject){
				console.log('故障报告数据添加失败');	
			});
			
		};
	},
	
	//单击获取详细信息  上
	rep_FaultGZBGStore:function(dataview, index, target, record, e, eOpts){
		var datads=Ext.data.StoreManager.get('ReportFaultGZBGStore');
		if(!datads){
			datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStore');
		};
		var COMPANY=datads.getAt(index).get('COMPANY');
		obj_this=this;
		var hiddenbutton2=0;
		this.GZBGStoreCL(obj_this,COMPANY,hiddenbutton2);
	},
	
	//单击获取详细信息  下
	rep_FaultGZBGStoreTwo:function(dataview, index, target, record, e, eOpts){
		if(record.get('PASSED_FAULT_AMOUNT')=='无故障报告书数据')
			return ;
		var datads=Ext.data.StoreManager.get('ReportFaultGZBGStoreTwo');
		if(!datads){
			datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStoreTwo');
		};
		var COMPANY=datads.getAt(index).get('COMPANY');
		var COMPANY_ID=datads.getAt(index).get('COMPANY_ID');
		var COUNT_REGION=datads.getAt(index).get('COUNT_REGION');
		Ext.getCmp('searchcompanyid').setValue(COMPANY_ID);
		Ext.getCmp('SearchCountRegion').setValue(COUNT_REGION);
		console.log('SearchCountRegion~~~   '+Ext.getCmp('SearchCountRegion').getValue()+'~~~~');
		obj_this=this;
		var hiddenbutton2=1;
		this.GZBGStoreCL(obj_this,COMPANY,hiddenbutton2);
	},
	
	//详细信息处理方法
	GZBGStoreCL:function(obj,COMPANY,hiddenbutton2){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'GZBG/'+userid+'/'+gzbgsbbBySy,tid:COMPANY};
    	console.log('COMPANY   '+COMPANY);
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			//页面跳转
			obj.NextView("falut_gzbgCount","HelcPDA.view.report.faultcount.ReportFaultGZBGCount");
			if(hiddenbutton2==0){
				Ext.getCmp('search_gzbbstation_button').setHidden(true);
			}else{
				Ext.getCmp('search_gzbbstation_button').setHidden(false);
			}
			var  data=arrayResults[0].json.stext;
			console.log('arrayResults   '+JSON.stringify(data));
			var titleZZ=document.getElementById("gzbgLR");
			titleZZ.innerHTML=data.COMPANY;
			
			//判断是否为正整数   zhj
			var patrn=/^[0-9]*[1-9][0-9]*$/;
			
			//1
			var one=data.SENTERED_FAULT_REPORT;
			if(one==''||one==null||typeof(one)=="undefined")
				one=0;
			Ext.getCmp('gzbgCount_ONE').setValue(one);
			
			//2
			var two=data.ENTERED_FAULT_REPORT;
			if(two==''||two==null||typeof(two)=="undefined"){
				two=0;
			};
			Ext.getCmp('gzbgCount_TWO').setValue(two);
			
			//3
			var threezh=data.PE_FAULT_REPORT;
			if(threezh==''||threezh==null||typeof(threezh)=="undefined"){
				threezh=0;
			};
			Ext.getCmp('gzbgCount_PE_FAULT_REPORT').setValue(threezh);
			
			var three;
			if(one==0)
				three=0;
			else
			   three=two/one;
			three=Math.round(three*100000)/1000;
			if(three>10){
				if (patrn.test(three)){
					three=three.toString();
					three=three.substring(0, 5);
					three=three+'.0';
				}else{
					three=three.toString();
					three=three.substring(0, 5);
				};
			}else if(three<10){
				if (patrn.test(three)){
					three=three.toString();
					three=three.substring(0, 4);
					three=three+'.0';
				}else{
					three=three.toString();
					three=three.substring(0, 4);
				};
			};
			three=three+'%';
			if(three=='0%'){
				three=0;
			}
//			Ext.getCmp('gzbgCount_THREE').setValue(three);
			Ext.getCmp('gzbgCount_THREE').setValue(data.ENTERED_FAULT_REPORT_RATE);
			
			// 按时录入故障报告书率
			if(one==0)
				ontime_rate=0;
			else
			   ontime_rate = data.PE_FAULT_REPORT/one;
			ontime_rate=Math.round(ontime_rate*100000)/1000;
			if(ontime_rate>10){
				if (patrn.test(ontime_rate)){
					ontime_rate=ontime_rate.toString();
					ontime_rate=ontime_rate.substring(0, 5);
					ontime_rate=ontime_rate+'.0';
				}else{
					ontime_rate=ontime_rate.toString();
					ontime_rate=ontime_rate.substring(0, 5);
				};
			}else if(ontime_rate<10){
				if (patrn.test(ontime_rate)){
					ontime_rate=ontime_rate.toString();
					ontime_rate=ontime_rate.substring(0, 4);
					ontime_rate=ontime_rate+'.0';
				}else{
					ontime_rate=ontime_rate.toString();
					ontime_rate=ontime_rate.substring(0, 4);
				};
			};
			ontime_rate=ontime_rate+'%';
			if(ontime_rate=='0%'){
				ontime_rate=0;
			}
			console.log('ontime_rate:  '+ontime_rate);
//			Ext.getCmp('gzbgCount_ONTIME_RATE').setValue(ontime_rate);
			Ext.getCmp('gzbgCount_ONTIME_RATE').setValue(data.PE_FAULT_REPORT_RATE);
			
			//4
			var four=data.PASSED_FAULT_AMOUNT;
			if(four==''||four==null||typeof(four)=="undefined"){
				four=0;
			};
			Ext.getCmp('gzbgCount_FOUR').setValue(four);
			
			//5
			//var five=(four/one).toFixed(4)*100+'%';
			var five;
			if(one==0)
				five=0;
			else
			   five=four/one;
			five=Math.round(five*100000)/1000;
			
			if(five>10){
				if (patrn.test(five)){
					five=five.toString();
					five=five.substring(0, 5);
					five=five+'.0';
				}else{
					five=five.toString();
					five=five.substring(0, 5);
				};
			}else if(five<10){
				if (patrn.test(five)){
					five=five.toString();
					five=five.substring(0, 4);
					five=five+'.0';
				}else{
					five=five.toString();
					five=five.substring(0, 4);
				};
				/*five=five.toString();
				five=five.substring(0, 4);*/
			};
			
			
			
			five=five+'%';
			if(five=='0%'){
				five=0;
			}
			Ext.getCmp('gzbgCount_FIVE').setValue(five);
			
			//alert(JSON.stringify(data));
		}).fail(function(errorObject){
			alert("查询数据失败");
		});
	},
	
	/**
	 **故障报告书报表 1   页面
	 ************************************************************************************/
	
	
	/************************************************************************************
	 * 故障报告书报表 2   页面
	 * */

	//故障报告书2  返回
	falut_gzbgCount_FHbutton:function(){
		this.showBackView("falut_gzbgHomePage","HelcPDA.view.report.faultcount.ReportFaultGZBGHomePage");
	},
	
	//故障报告书 查询所属站信息
	search_gzbbstation_button:function(){
		var companyid=Ext.getCmp('searchcompanyid').getValue();
		var CountRegion=Ext.getCmp('SearchCountRegion').getValue();
		console.log("CountRegion: " + CountRegion);
		var obj = this;
		obj.NextView('falut_gzbgStationPage','HelcPDA.view.report.faultcount.ReportFaultGZBGStationPage');
		
//		var Maintain=collectionName;
//    	var MaintainList=WL.JSONStore.get(Maintain);
//    	var Maintxml={tcode:'GZBG/'+userid+'/'+1};
//    	var options={exacte:true};//默认是false
//    	MaintainList.remove(Maintxml,options).then(function(){
//    		console.log('GZBG删除成功');
    		var data="{'key1':'"+userid+"','key':'"+CountRegion+"','key2':'"+companyid+"'}";
    		gzbgsbbBySy=1;
    		
    		function RepFaultData(result,obj){
//    			var Maintain=collectionName;
//    	    	var MaintainList=WL.JSONStore.get(Maintain);
    			var num=result.item.rows.length;
    				
    				var datads=Ext.data.StoreManager.get('ReportFaultGZBGStoreStation');
    				if(!datads){
    					datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStoreStation');
    				};
    				console.log(result.item.rows[0].STATION_NAME);
    				console.log("PASSED_FAULT_AMOUNT:   "+result.item.rows[0].PASSED_FAULT_AMOUNT);
    				console.log(result.item.rows[0].STATION_NAME);
    				var zgs=[];
    				for(var i=0;i<num;i++){
    					zgs[i]=result.item.rows[i];
    					if(zgs[i].PASSED_FAULT_AMOUNT==''){
    						zgs[i].PASSED_FAULT_AMOUNT=0;
    						console.log(zgs[i].PASSED_FAULT_AMOUNT);
    					}
    					if(zgs[i].ENTERED_FAULT_REPORT==''){
    						zgs[i].ENTERED_FAULT_REPORT=0;
    						console.log(zgs[i].ENTERED_FAULT_REPORT);
    					}
//    					zgs[i].ENTERED_FAULT_REPORT_RATE=Math.round(zgs[i].ENTERED_FAULT_REPORT/zgs[i].SENTERED_FAULT_REPORT*100000)/1000;
//    					zgs[i].ENTERED_FAULT_REPORT_RATE=parseFloat(zgs[i].ENTERED_FAULT_REPORT_RATE).toFixed(2)+'%';
    					zgs[i].PASSED_FAULT_RATE=Math.round(zgs[i].PASSED_FAULT_AMOUNT/zgs[i].SENTERED_FAULT_REPORT*100000)/1000;
    					zgs[i].PASSED_FAULT_RATE=parseFloat(zgs[i].PASSED_FAULT_RATE).toFixed(2)+'%';
    					console.log("zgs: " + zgs[i].ENTERED_FAULT_REPORT_RATE);
    					
    				
    				};
    				console.log("zgs: " + JSON.stringify(zgs));
    				datads.setData(zgs);
    				
    				//JSONStore添加时间
//    				var SHdata=[];
//    				//var sun=num-1;
//    				for(var i=0;i<num;i++){
//    					var MainAdd={tcode:'GZBG/'+userid+'/'+gzbgsbbBySy,tid:result.item.rows[i].COMPANY,stext:result.item.rows[i]};
//    					SHdata[i]=MainAdd;
//    				};
//    				MaintainList.add(SHdata).then(function(){
//    					console.log('故障报告数据成功添加');
//    				}).fail(function(errorObject){
//    					console.log('故障报告数据添加失败');	
//    				});
    		};
    		obj.connectServerMainTain(RepFaultData,obj,"gzbgsAction..do?method=toSearchStation",data);
//    	}).fail(function(){
//			console.log('GZBG删除失败');
//		});
	
	},
	
	
	/**
	 **故障报告书报表 2   页面
	 ************************************************************************************/
	
	//进入故障报告书  不用了
	//1是本月  0 是上月
	Report_Fault_GZBGButton:function(){
		this_obj=this;
		this_obj.RepFaultData(this_obj,1);
	},

});