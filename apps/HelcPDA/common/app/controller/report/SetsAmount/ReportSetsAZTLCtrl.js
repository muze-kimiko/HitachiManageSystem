/**
 * 安装台量报表 监视器 xcx  2014-5-23
 */
Ext.define('HelcPDA.controller.report.SetsAmount.ReportSetsAZTLCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入安装台量报表页面
			Report_Sets_AZTLButton:'button[id=Report_Sets_AZTLButton]',
			
			//安装台量报表 1  返回按钮
			Rep_fault_AZTLBB_FHbutton:'button[id=Rep_fault_AZTLBB_FHbutton]',
			
			//安装台量报表 2  返回按钮
			falut_aztlCount_FHbutton:'button[id=falut_aztlCount_FHbutton]',
		},
		control:{
			//安装台量报表 1  返回按钮
			'button#Rep_fault_AZTLBB_FHbutton':{
				tap:'Rep_fault_AZTLBB_FHbutton'
			},
			
			//安装台量报表 2  返回按钮
			'button#falut_aztlCount_FHbutton':{
				tap:'falut_aztlCount_FHbutton'
			},
			
			//进入安装台量报表页面
			Report_Sets_AZTLButton:{
				tap:'Report_Sets_AZTLButton'
			},
			
			//单击获取安装台量报表详细信息  上
			'#rep_SetsAZTLStoree':{
				itemtap:'rep_SetsAZTLStoree'
			},
			
			//单击获取安装台量报表详细信息 下
			'#rep_SetsAZTLStoreTwo':{
				itemtap:'rep_SetsAZTLStoreTwo'
			},
			
		}
	},
	
	//安装台量报表 1  返回按钮
	Rep_fault_AZTLBB_FHbutton:function(){
		this.showBackView("reportview_homepage","HelcPDA.view.report.ReportView");
	},
	
	//安装台量报表 2  返回按钮
	falut_aztlCount_FHbutton:function(){
		this.showBackView("falut_aztlHomePage","HelcPDA.view.report.SetsAmount.ReportSetsAZTLHomePage");
	},
	
	
	//进入安装台量报表页面
	Report_Sets_AZTLButton:function(){
		this_obj=this;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var Maintxml={tcode:'AZTL/'+userid};
    	var options={exacte:true};//默认是false
    	MaintainList.remove(Maintxml,options).then(function(){
    		console.log('AZTL删除成功');
    		var data="{'key1':'"+userid+"'}";
    		this_obj.connectServerMainTain(this_obj.aztlData_CZ,this_obj,"installAction..do?method=toSearch",data);
    	}).fail(function(){
			console.log('AZTL删除失败');
		});
	},
	
	//获得数据后进场操作
	aztlData_CZ:function(result,obj){
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
		//
	},
	
	//单击获取安装台量报表详细信息   上
	rep_SetsAZTLStoree:function(dataview, index, target, record, e, eOpts){
		this_obj=this;
		this_obj.rep_particular_information(index,'S',this_obj);
	},
	
	//单击获取安装台量报表详细信息   下
	rep_SetsAZTLStoreTwo:function(dataview, index, target, record, e, eOpts){
		this_obj=this;
		this_obj.rep_particular_information(index,'X',this_obj);
	},
	
	//获取安装台量报表的详细信息
	rep_particular_information:function(index,ifSandX,obj){
		var datads=Ext.data.StoreManager.get('ReportSetsAZTLStore');
		if(!datads){
			datads=Ext.create('HelcPDA.store.report.SetsAmount.ReportSetsAZTLStore');
		};
		
		var datadsTwo=Ext.data.StoreManager.get('ReportSetsAZTLStoreTwo');
		if(!datadsTwo){
			datadsTwo=Ext.create('HelcPDA.store.report.SetsAmount.ReportSetsAZTLStoreTwo');
		};
		
		var HT_NAME='';
		if(ifSandX=='S'){
			HT_NAME=datads.getAt(index).get('HT_NAME');
		}else if(ifSandX=='X'){
			HT_NAME=datadsTwo.getAt(index).get('HT_NAME');
		};
		//alert(HT_NAME);
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'AZTL/'+userid,tid:HT_NAME};
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			//页面跳转
			obj.showNextView("falut_aztlCount","HelcPDA.view.report.SetsAmount.ReportSetsAZTLCount");
			//alert(arrayResults.length);
			var  data=arrayResults[0].json.stext;
			
			var titleZZ=document.getElementById("aztlLR");
			titleZZ.innerHTML=data.HT_NAME;
			
			var one=data.YIFAHUO_NOENTER;
			Ext.getCmp('aztlCount_ONE').setValue(one);
			
			var two=data.IN_THE_ENTRY;
			Ext.getCmp('aztlCount_TWO').setValue(two);
			
			var three=data.COMPLETE_COUNT;
			Ext.getCmp('aztlCount_THREE').setValue(three);
			
			var four=data.INST;
			Ext.getCmp('aztlCount_FOUR').setValue(four);
			
			var five=data.GOV_CHECK;
			Ext.getCmp('aztlCount_FIVE').setValue(five);
			
			var six=data.DEBUG_;
			Ext.getCmp('aztlCount_SIX').setValue(six);
			
			var seven=data.COMP_FILE;
			Ext.getCmp('aztlCount_SEVEN').setValue(seven);
			
			var eight=data.CHANJIAN_GOV_WU;
			Ext.getCmp('aztlCount_EIGHT').setValue(eight);
			
			var nine=data.CHANJIAN_GOV_YOU;
			Ext.getCmp('aztlCount_NINE').setValue(nine);
			
			var ten=data.MAKE_ING;
			Ext.getCmp('aztlCount_TEN').setValue(ten);
			
		}).fail(function(errorObject){
			alert("查询数据失败");
		});
		
	}


	
});