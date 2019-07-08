
/* JavaScript content from app/controller/report/installcomplete/InstallCompleteCtrl.js in folder common */
Ext.define('HelcPDA.controller.report.installcomplete.InstallCompleteCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'installCompleteCtrl',
	config:{
		refs:{
			//进入List界面
			to_List:'button[id=installcomplete]',
			//选择时间
			//choice_time:'datepickerfield[id=choiceTime]',
			//选择公司
//			choice_company:'selectfield[id=choiceCompany]',
			//选择其中的一条信息
			choice_oneMessage:'list[id=installCom_List]',
			//detail界面选择一条信息	
			detailchoice_oneMessage:'textfield[id=Install_date]',
			instalComplet_back:'button[id=instalComplet_back]'
		},
		control:{
			to_List:{
				tap:'installCompleteListIni'
			},
			//choice_time:{
			//	change:'choiceTimeFunc'
			//},
//			choice_company:{
//				change:'choiceCompaneFunc'
//			},
			choice_oneMessage:{
				itemtap:'choiceOneMessage'
			},
			detailchoice_oneMessage:{
				change:'detailChoiceOnemsg'
			},
			instalComplet_back:{
				tap:'instalComplet_back'
			}
		}
	},
	instalComplet_back:function(){
		this.BackView();
	},
	//进入list页面
	installCompleteListIni:function(){
		var obj=this;
		this.NextView('installComplete_List_View','HelcPDA.view.report.installcomplete.InstallComplete_List_View');
		var store=this.getStore('InstallCompleteStore','HelcPDA.store.report.installcomplete.InstallCompleteStore');
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var choiceCompany=Ext.getCmp('choiceCompany');
		 function getResult(res){
				console.log(JSON.stringify(res));
				var list1=[];
				for(var i=0;i<res.item.length;i++){
					if(res.item[i].COMPANY_NAME=='全国'){
						list1[0]=res.item[i];
						res.item.splice(i,1);
					}
				}
				for(var i=0;i<res.item.length;i++){
				    	   list1[i+1]=res.item[i];
				       
				}
				store.setData(list1);
				Ext.getCmp('choiceTime').setValue(date);
				Ext.getCmp('choiceTime').addListener('change',function(){
					var store=obj.getStore('InstallCompleteStore','HelcPDA.store.report.installcomplete.InstallCompleteStore');
					var choiceCompany=Ext.getCmp('choiceCompany');
					var companyId='';
					var value=choiceCompany.getValue();
					if(value==''||value==null||typeof(value)=='undefined'){
						companyId='ALL';
					}else{
						companyId=value;
					}
					var choiceTime=Ext.getCmp('choiceTime').getValue();
					var year=choiceTime.getFullYear();
					var month=choiceTime.getMonth()+1;
					function getResult(res){
						var list1=[];
						for(var i=0;i<res.item.length;i++){
							if(res.item[i].COMPANY_NAME=='全国'){
								list1[0]=res.item[i];
								res.item.splice(i,1);
							}
						}
						for(var i=0;i<res.item.length;i++){
						    	   list1[i+1]=res.item[i];
						       
						}
						store.setData(list1);
					}
					var content={userid:userid,year:year,month:month,companyId:companyId};
					obj.connectServer(getResult,'reportInstallCompleted.do?method=toSearch', JSON.stringify(content));
				});
				choiceCompany.setOptions(res.COMPANY);
				choiceCompany.addListener('change',function(){
					var store=obj.getStore('InstallCompleteStore','HelcPDA.store.report.installcomplete.InstallCompleteStore');
					var choiceCompany=Ext.getCmp('choiceCompany').getValue();
					var choiceTime=Ext.getCmp('choiceTime').getValue();
					var companyId=choiceCompany;
					var year=choiceTime.getFullYear();
					var month=choiceTime.getMonth()+1;
					function getResult(res){
						var list1=[];
						for(var i=0;i<res.item.length;i++){
							if(res.item[i].COMPANY_NAME=='全国'){
								list1[0]=res.item[i];
								res.item.splice(i,1);
							}
						}
						for(var i=0;i<res.item.length;i++){
						    	list1[i+1]=res.item[i];
						}
						
						store.setData(list1);
					}
					var content={userid:userid,year:year,month:month,companyId:companyId};
					obj.connectServer(getResult,'reportInstallCompleted.do?method=toSearch', JSON.stringify(content));
					
				});
		 }
		var content={userid:userid,year:year,month:month};
	    this.connectServer(getResult,'reportInstallCompleted.do?method=toSearch', JSON.stringify(content));
	},
	//选择时间触发的事件
	//choiceTimeFunc:function(obk,newValue,oldValue,eOpts){
		
	//},
	//选择公司触发事件
//	choiceCompaneFunc:function(obk,newValue,oldValue,eOpts){
//		var store=this.getStore('InstallCompleteStore','HelcPDA.store.report.installcomplete.InstallCompleteStore');
//		var choiceCompany=Ext.getCmp('choiceCompany').getValue();
//		var choiceTime=Ext.getCmp('choiceTime').getValue();
//		var companyId=choiceCompany;
//		var year=choiceTime.getFullYear();
//		var month=choiceTime.getMonth()+1;
//		function getResult(res){
//			store.setData(res.item);
//		}
//		var content={userid:userid,year:year,month:month,companyId:companyId};
//		this.connectServer(getResult,'reportInstallCompleted.do?method=toSearch', JSON.stringify(content));
//	},
	//选择其中的一条信息
	choiceOneMessage:function(obk,index,target,record,e,eOpts){
		var obj=this;
		var store=this.getStore('InstallCompleteStore','HelcPDA.store.report.installcomplete.InstallCompleteStore');
		var year=store.getAt(index).get('YEAR');
		var month=store.getAt(index).get('MONTH');
		var titleName=store.getAt(index).get('COMPANY_NAME');
		var companyId=store.getAt(index).get('COMPANY_ID');
		function getResult(res){
			console.log(JSON.stringify(res));
			obj.NextView('installComplete_Detail_View','HelcPDA.view.report.installcomplete.InstallComplete_Detail_View');
		    var store1=obj.getStore('InstallCompleteStore1','HelcPDA.store.report.installcomplete.InstallCompleteStore1');
		    if(res.item[0].YEAR.length>0){
		    	res.item[0].YEAR=res.item[0].YEAR+'年';
		        res.item[0].MONTH=res.item[0].MONTH+'月';
		    }
		   document.getElementById('detail_title').innerHTML=titleName+"";
		    store1.setData(res.item);
		}
		var content={userid:userid,year:year,month:month,companyId:companyId};
		this.connectServer(getResult,'reportInstallCompleted.do?method=toSearchDetail', JSON.stringify(content));
	},
	//详细界面选择日期
	detailChoiceOnemsg:function(){
		var Install_date=Ext.getCmp('Install_date').getValue();
		var store1=this.getStore('InstallCompleteStore1','HelcPDA.store.report.installcomplete.InstallCompleteStore1');
		var timeArray=Install_date.split('-');
	    var year=timeArray[0];
	    var month=timeArray[1];
	    var companyId=store1.getAt(0).get('COMPANY_ID');
	    if(timeArray[1]=='全部')
	    {
	    	month="ALL";
	    }
	    var   COMPANY_NAME=document.getElementById('detail_title').innerHTML;
	    if(month=='ALL'&&COMPANY_NAME=='全国'){
	    	function getResult(res){
				console.log(JSON.stringify(res));
				for(var i=0;i<res.item.length;i++){
			    if(res.item[i].YEAR.length>0){
			    	res.item[i].YEAR=res.item[i].YEAR+'年';
			        res.item[i].MONTH=res.item[i].MONTH+'月';
			    }
			    if(res.item[i].MONTH=='ALL月')
			    	res.item[i].MONTH='';
				}
				Ext.getCmp('install_QGZB').setValue(res.QGZB);
				Ext.getCmp('install_QGZB').setHidden(false);
			    store1.setData(res.item);
			}
		    var content={userid:userid,year:year,month:month,companyId:companyId};
			this.connectServer(getResult,'reportInstallCompleted.do?method=toSearchDetailQG', JSON.stringify(content));
	
	    }else{
	    	function getResult1(res){
				console.log(JSON.stringify(res));
				for(var i=0;i<res.item.length;i++){
			    if(res.item[i].YEAR.length>0){
			    	res.item[i].YEAR=res.item[i].YEAR+'年';
			        res.item[i].MONTH=res.item[i].MONTH+'月';
			    }
			    if(res.item[i].MONTH=='ALL月')
			    	res.item[i].MONTH='';
				}
				var NUMCOMPLETE_COUNT=0;
				var NUMCOMPLETE_TARGET=0;
				var COMPLETE_RATE=0;
				if(res.item.length>1){
					for(var i=0;i<res.item.length;i++){
						NUMCOMPLETE_COUNT+=parseInt(res.item[i].COMPLETE_COUNT);
						NUMCOMPLETE_TARGET+=parseInt(res.item[i].COMPLETE_TARGET);
					}
					 COMPLETE_RATE=(parseInt(NUMCOMPLETE_COUNT)/parseInt(NUMCOMPLETE_TARGET))*100;
					 COMPLETE_RATE=COMPLETE_RATE.toString().substring(0,4);
					 var QGZB="累计指标:"+NUMCOMPLETE_TARGET+" 完工量:"+NUMCOMPLETE_COUNT+" 完成率:"+COMPLETE_RATE+"%";
					Ext.getCmp('install_QGZB').setValue(QGZB);
					Ext.getCmp('install_QGZB').setHidden(false);
				}else{
					Ext.getCmp('install_QGZB').setValue('');
					Ext.getCmp('install_QGZB').setHidden(true);
				}
				
			    store1.setData(res.item);
			}
		    var content={userid:userid,year:year,month:month,companyId:companyId};
			this.connectServer(getResult1,'reportInstallCompleted.do?method=toSearchDetail', JSON.stringify(content));
	
	    }
	    	}
});

