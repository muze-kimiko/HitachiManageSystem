Ext.define('HelcPDA.controller.report.ReportCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//单击报表list进入相应模块
			'list#report_list':{
				itemtap:'report_list'
			},
			
		}
	},
	
	
	report_list : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var title = record.data.title;
		if(title == '故障过程处理报表'){
			obj.NextView('report_hotline_sxrxHomePage','HelcPDA.view.report.HotLine.ReportHotLineHomePage');
			//删除JSON数据
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var Maintxml={tcode:'SXRX/'+userid+'/'+1};
	    	var options={exacte:true};//默认是false
	    	MaintainList.remove(Maintxml,options).then(function(){
	    		console.log('SXRX删除成功');
	    		var data="{'key1':'"+userid+"','key':'"+1+"'}";
	    		reportHotlineIFMonth=1;
	    		
	    		function Rep_hotline_HTData(result,obj){
	    			var Maintain=collectionName;
	    	    	var MaintainList=WL.JSONStore.get(Maintain);
					
					var num=result.item.rows.length;
					if(!result.item.rows||!num){
	    				var gzbgStore = obj.getStore('ReportFaultGZBGStore','HelcPDA.store.report.faultcount.ReportFaultGZBGStore');
	    				var rData = {};
	    				rData.PASSED_FAULT_AMOUNT = '无故障报告书数据';
	    				rData.SENTERED_FAULT_REPORT = '';
	    				rData.ENTERED_FAULT_REPORT = '';
	    				rData.PE_FAULT_REPORT = '';
	    				gzbgStore.setData([rData]);
	    				return ;
	    			}
	    			//本月数据
	    			var sj='本月数据总共：'+(num-1)+'条';
	    			Ext.getCmp('rep_sxrx_ZG').setHtml(sj);
	    			//数据生成时间
	    			var SCtime=result.item.rows[0].UPDATE_DATE;
	    			//var scsj='数据生成时间：'+SCtime;
	    			Ext.getCmp('rep_sxrx_time').setHtml(SCtime);
	    			if(num==2){//分公司
	    				var datads=Ext.data.StoreManager.get('ReportHotLineStore');
	    				if(!datads){
	    					datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStore');
	    				}
	    				var Sdata=result.item.rows[0];
	    				if(Sdata==null){
	    					return;
	    				};
	    				datads.setData(Sdata);
	    				
	    				//JSONStore添加时间
	    				var SHdata=[];
	    				var MainAdd={tcode:'SXRX/'+userid+'/'+reportHotlineIFMonth,tid:result.item.rows[0].COMPANY,stext:result.item.rows[0]};
	    				SHdata[0]=MainAdd;
	    				MaintainList.add(SHdata).then(function(){
	    					console.log('受信热线数据成功添加');
	    				}).fail(function(errorObject){
	    					console.log('受信热线报告数据添加失败');	
	    				});
	    			}else if(num>2){//总公司
	    				var datads=Ext.data.StoreManager.get('ReportHotLineStore');
	    				if(!datads){
	    					datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStore');
	    				};
	    				var Sdata=result.item.rows[num-1];
	    				if(Sdata==null){
	    					return;
	    				}else if(Sdata!=null){
	    					datads.setData(Sdata);
	    				};
	    				
	    				var datads=Ext.data.StoreManager.get('ReportHotLineStoreTwo');
	    				if(!datads){
	    					datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStoreTwo');
	    				};
	    				var zgs=[];
	    				for(var i=0;i<num-1;i++){
	    					zgs[i]=result.item.rows[i];
	    					if(zgs[i].sumtiring==''){
	    						zgs[i].sumtiring=0;
	    					}else if(zgs[i].sumtiring==undefined){
	    						zgs[i].sumtiring=0;
	    					};
	    				};
	    				for(var i=0;i<num-1;i++){
	    					zgs[i]=result.item.rows[i];
	    					if(zgs[i].sumarrivalam==''){
	    						zgs[i].sumarrivalam=0;
	    					}
	    				};
	    				for(var i=0;i<num-1;i++){
	    					zgs[i]=result.item.rows[i];
	    					if(zgs[i].sumfinishedam==''){
	    						zgs[i].sumfinishedam=0;
	    					}
	    				};
	    				for(var i=0;i<num-1;i++){
	    					zgs[i]=result.item.rows[i];
	    					if(zgs[i].sumsavingam==''){
	    						zgs[i].sumsavingam=0;
	    					}
	    				};
	    				datads.setData(zgs);
	    				//JSONStore添加时间
	    				var SHdata=[];
	    				//var sun=num-1;
	    				for(var i=0;i<num;i++){
	    					var MainAdd={tcode:'SXRX/'+userid+'/'+reportHotlineIFMonth,tid:result.item.rows[i].COMPANY,stext:result.item.rows[i]};
	    					SHdata[i]=MainAdd;
	    				};
	    				MaintainList.add(SHdata).then(function(){
	    					console.log('受信热线数据成功添加');
	    				}).fail(function(errorObject){
	    					console.log('受信热线数据添加失败');	
	    				});
	    			};
	    		};
	    		obj.connectServerMainTain(Rep_hotline_HTData,obj,"rexianshouxinAction..do?method=toSearch",data);
	    	}).fail(function(){
				console.log('GZBG删除失败');
			});
		};
		if(title == '保养计划报表'){
			//lgs
			obj.getApplication().getController('HelcPDA.controller.report.maintainplanbb.ReportMaintainPlanCtrl').to_list();
		};
		if(title == '故障报告书报表'){
			obj.NextView('falut_gzbgHomePage','HelcPDA.view.report.faultcount.ReportFaultGZBGHomePage');
			//删除JSON数据
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var Maintxml={tcode:'GZBG/'+userid+'/'+1};
	    	var options={exacte:true};//默认是false
	    	MaintainList.remove(Maintxml,options).then(function(){
	    		console.log('GZBG删除成功');
	    		var data="{'key1':'"+userid+"','key':'"+1+"'}";
	    		gzbgsbbBySy=1;
	    		
	    		function RepFaultData(result,obj){
	    			var Maintain=collectionName;
	    	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	    	
	    			var num=result.item.rows.length;
	    			if(!result.item.rows||!num){
	    				var gzbgStore = obj.getStore('ReportFaultGZBGStore','HelcPDA.store.report.faultcount.ReportFaultGZBGStore');
	    				var rData = {};
	    				rData.PASSED_FAULT_AMOUNT = '无故障报告书数据';
	    				rData.SENTERED_FAULT_REPORT = '';
	    				rData.ENTERED_FAULT_REPORT = '';
	    				rData.PE_FAULT_REPORT = '';
	    				gzbgStore.setData([rData]);
	    				return ;
	    			}
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
	    		};
	    		obj.connectServerMainTain(RepFaultData,obj,"gzbgsAction..do?method=toSearch",data);
	    	}).fail(function(){
				console.log('GZBG删除失败');
			});
		};
		if(title == '安装台量报表'){
			obj.NextView('falut_aztlHomePage','HelcPDA.view.report.SetsAmount.ReportSetsAZTLHomePage');
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var Maintxml={tcode:'AZTL/'+userid};
	    	var options={exacte:true};//默认是false
	    	MaintainList.remove(Maintxml,options).then(function(){
	    		console.log('AZTL删除成功');
	    		var data="{'key1':'"+userid+"'}";
	    		
	    		function aztlData_CZ(result,obj){
	    			var data=result.item.rows;
	    			var num=result.item.rows.length;
	    			var lb='当前报表记录数总共有：'+(num-1)+'条';
	    			Ext.getCmp('rep_aztl_ZS').setHtml(lb);
	    			
	    			var Maintain=collectionName;
	    	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	    	
	    			var datads=Ext.data.StoreManager.get('ReportSetsAZTLStore');
	    			if(!datads){
	    				datads=Ext.create('HelcPDA.store.report.SetsAmount.ReportSetsAZTLStore');
	    			};
	    			
	    			var datadsTwo=Ext.data.StoreManager.get('ReportSetsAZTLStoreTwo');
	    			if(!datadsTwo){
	    				datadsTwo=Ext.create('HelcPDA.store.report.SetsAmount.ReportSetsAZTLStoreTwo');
	    			};
	    			
	    			var date=[];
	    		
	    			if(num==2){
	    				for(var i=0;i<num-1;i++){
	    					date[i]={tcode:'AZTL/'+userid,tid:data[i].HT_NAME,stext:result.item.rows[i]};
	    					alert(date[i]);
	    				};
	    				datads.setData(data[0]);
	    			}else{
	    				var dataStore=[];
	    				for(var i=0;i<num;i++){
	    					if(i!=(num-1)){
	    						dataStore[i]=data[i];
	    					};
	    					date[i]={tcode:'AZTL/'+userid,tid:data[i].HT_NAME,stext:result.item.rows[i]};
	    					//alert(JSON.stringify(date[i]));
	    				};
	    				datads.setData(data[num-1]);
	    				datadsTwo.setData(dataStore);
	    			};
	    			
	    			MaintainList.add(date).then(function(){
	    				console.log('安装台量报表成功添加');
	    			}).fail(function(errorObject){
	    				console.log('安装台量报表添加失败');	
	    			});
	    		};
	    		obj.connectServerMainTain(aztlData_CZ,obj,"installAction..do?method=toSearch",data);
	    	}).fail(function(){
				console.log('AZTL删除失败');
			});
		};
		if(title == '安装周期报表'){
			obj.getApplication().getController('HelcPDA.controller.report.installweekly.InstallWeeklyCtrl').toInstallWeeklyReport();
			//obj.NextView('installWeekly_List_View','HelcPDA.view.report.installweekly.InstallWeekly_List_View');
		};
		if(title == '安装录入情况报表'){
			obj.getApplication().getController('HelcPDA.controller.report.installrecord.InstallRecordCtrl').toInstallRecordReport();
			//alert('安装录入情况报表');
		};
		if(title == '安装完工情况报表'){
			//lgs
			obj.getApplication().getController('HelcPDA.controller.report.installcomplete.InstallCompleteCtrl').installCompleteListIni();
		};
		if(title == '维保业绩'){
			//lgs
			obj.getApplication().getController('HelcPDA.controller.report.maintainbb.KeepAchievementCtrl').toKeepAchivmentBb();
		};
		
		
	}
	
	
	
	
});