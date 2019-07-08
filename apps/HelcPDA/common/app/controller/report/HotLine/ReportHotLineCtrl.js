/**
 * 受信热线报表  监视器  2014-5-29 xcx
 */

//用于判读是本月还是上月
var reportHotlineIFMonth;

Ext.define('HelcPDA.controller.report.HotLine.ReportHotLineCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入受信报表首页
			Report_Hotl_SXRXButton:'button[id=Report_Hotl_SXRXButton]',
			
			//受信热线报表首页 本月/上月
			Rep_hotline_SXRX_SYbutton:'button[id=Rep_hotline_SXRX_SYbutton]',
			
			//进入受信报表  1 返回
			Rep_hotline_SXRX_FHbutton:'button[id=Rep_hotline_SXRX_FHbutton]',
			
			//进入受信报表  2 返回
			hotline_sxrxCount_FHbutton:'button[id=hotline_sxrxCount_FHbutton]',
		},
		control:{
			//进入受信报表首页
			Report_Hotl_SXRXButton:{
				tap:'Report_Hotl_SXRXButton'
			},
			
			//受信热线报表首页 本月/上月
			'button#Rep_hotline_SXRX_SYbutton':{
				tap:'Rep_hotline_SXRX_SYbutton'
			},
			
			//单击获取详细信息  上
			'list#rep_HotLineSXRXStoree':{
				itemtap:'rep_HotLineSXRXStoree'
			},
			
			//单击获取详细信息  下
			'list#rep_HotLineSXRXStoreTwo':{
				itemtap:'rep_HotLineSXRXStoreTwo'
			},
			
			//进入受信报表  1 返回
			'button#Rep_hotline_SXRX_FHbutton':{
				tap:'Rep_hotline_SXRX_FHbutton'
			},
			
			//进入受信报表  2 返回
			'button#hotline_sxrxCount_FHbutton':{
				tap:'hotline_sxrxCount_FHbutton'
			},
			
			//进入受信报表  3 返回
			'button#Rep_hotline_SXRXStation_FHbutton':{
				tap:'Rep_hotline_SXRXStation_FHbutton'
			},
			
			//受信热线查询所属站信息
			'button#search_sxrxstation_button':{
				tap:'search_sxrxstation_button'
			},
			
		}
	},
	
	//进入受信报表首页
	Report_Hotl_SXRXButton:function(){
		this_obj=this;
		this_obj.Rep_hotline_HTData(this_obj,1);
	},
	
	//受信热线报表首页 本月/上月  1是本月 0是上月
	Rep_hotline_SXRX_SYbutton:function(){
		var test=Ext.getCmp('Rep_hotline_SXRX_SYbutton').getText();
		this_obj=this;
		if(test=='本月'){
			Ext.getCmp('Rep_hotline_SXRX_SYbutton').setText('上月');
			this_obj.Rep_hotline_HTData(this_obj,1);
		}else if(test=='上月'){
			Ext.getCmp('Rep_hotline_SXRX_SYbutton').setText('本月');
			this_obj.Rep_hotline_HTData(this_obj,0);
		}
	},
	
	//跟据条件去后台获取数据信息
	Rep_hotline_HTData:function(obj,id){
		//测试用
		//userid='yk';
		
		//删除JSON数据
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var Maintxml={tcode:'SXRX/'+userid+'/'+id};
    	var options={exacte:true};//默认是false
    	MaintainList.remove(Maintxml,options).then(function(){
    		console.log('SXRX删除成功');
    		var data="{'key1':'"+userid+"','key':'"+id+"'}";
    		reportHotlineIFMonth=id;
    		obj.connectServerMainTain(obj.Rep_hotline_HTData2,obj,"rexianshouxinAction..do?method=toSearch",data);
    	}).fail(function(){
			console.log('GZBG删除失败');
		});
	},
	
	//处理获取到的数据
	Rep_hotline_HTData2:function(result,obj){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	
		var num=result.item.rows.length;
		if(!result.item.rows||num==0||!num){
			var hotLineStore = obj.getStore('ReportHotLineStore','ReportHotLineStore');
			var rData = {};
			rData.sumtiring = '无受信热线数据';
			rData.sumfault = '';
			rData.sumarrival = '';
			rData.sumfinished = '';
			rData.sumsaving = '';
			rData.sumarrivalam = '';
			rData.sumfinishedam = '';
			rData.sumsavingam = '';
			rData.sumpearrivalam = '';
			rData.sumpefinishedam = '';
			rData.sumpeenteredsavingam = '';
			hotLineStore.setData([rData]);
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
			
		}
	},
	
	//单击获取详细信息  上
	rep_HotLineSXRXStoree:function(dataview, index, target, record, e, eOpts){
		var datads=Ext.data.StoreManager.get('ReportHotLineStore');
		if(!datads){
			datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStore');
		};
		var COMPANY_NAME=datads.getAt(index).get('COMPANY_NAME');
		var COMPANY=datads.getAt(index).get('COMPANY');
		obj_this=this;
		var hiddenbutton=0;
		this.rep_hotlineSXRX_CLFF(obj_this,COMPANY_NAME,COMPANY,hiddenbutton);
	},
	
	//单击获取详细信息  下
	rep_HotLineSXRXStoreTwo:function(dataview, index, target, record, e, eOpts){
		if(record.get('sumtiring') == '无受信热线数据')
			return ;
		var datads=Ext.data.StoreManager.get('ReportHotLineStoreTwo');
		if(!datads){
			datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStoreTwo');
		};
		var COMPANY_NAME=datads.getAt(index).get('COMPANY_NAME');
		var COMPANY=datads.getAt(index).get('COMPANY');
		console.log('COMPANY     '+COMPANY);	
		var COUNT_REGION=reportHotlineIFMonth;
		console.log('COUNT_REGION        '+COUNT_REGION);	
		Ext.getCmp('searchhotlinecompanyid').setValue(COMPANY);
//		Ext.getCmp('SearchhotlineCountRegion').setValue(COUNT_REGION);
		obj_this=this;
		var hiddenbutton=1;
		this.rep_hotlineSXRX_CLFF(obj_this,COMPANY_NAME,COMPANY,hiddenbutton);
	},
	
	//详细信息处理方法
	rep_hotlineSXRX_CLFF:function(obj,COMPANY_NAME,COMPANY,hiddenbutton){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'SXRX/'+userid+'/'+reportHotlineIFMonth,tid:COMPANY};
		var options={
			exact:true,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			//页面跳转
			console.log('arrayResults',arrayResults);
			obj.NextView("report_hotline_sxrxCount","HelcPDA.view.report.HotLine.ReportHotLineCount");
			if(hiddenbutton==0){
				Ext.getCmp('search_sxrxstation_button').setHidden(true);
			}else{
				Ext.getCmp('search_sxrxstation_button').setHidden(false);
			}	
			var  data=arrayResults[0].json.stext;
			var titleZZ=document.getElementById("sxrxLR");
			titleZZ.innerHTML=data.COMPANY_NAME;
			console.log('datavbn:      '+ JSON.stringify(data));	
			//判断是否为正整数
			var patrn=/^[0-9]*[1-9][0-9]*$/;
			
			//zhj
			var one=data.sumfault;
			if(one==''||one==null||typeof(one)=="undefined")
				one=0;	
			Ext.getCmp('sxrxCount_ONE').setValue(one);

			var two=data.sumarrival;
			if(two==''||two==null||typeof(two)=="undefined"){
				two=0;
			};
			Ext.getCmp('sxrxCount_TWO').setValue(two);
			
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
			};
			console.log('data',data);
			Ext.getCmp('sxrxCount_THREE').setValue(data.ENTERED_ARRIVAL_RATE);
			
			
			var sumpearrivalam=data.sumpearrivalam;
			if(sumpearrivalam==''||sumpearrivalam==null||typeof(sumpearrivalam)=="undefined"){
				sumpearrivalam=0;
			};
			Ext.getCmp('pe_sxrxCount_THREE_am').setValue(sumpearrivalam);
			var pe_sumarrival;
			if(one==0)
				pe_sumarrival=0;
			else
			    pe_sumarrival=data.sumarrivalam/one;
			console.log('pe_sumarrival:      '+pe_sumarrival);	
			pe_sumarrival=Math.round(pe_sumarrival*100000)/1000;
			if(pe_sumarrival>10){
				if (patrn.test(pe_sumarrival)){
					pe_sumarrival=pe_sumarrival.toString();
					pe_sumarrival=pe_sumarrival.substring(0, 5);
					pe_sumarrival=pe_sumarrival+'.0';
				}else{
					pe_sumarrival=pe_sumarrival.toString();
					pe_sumarrival=pe_sumarrival.substring(0, 5);
				};
			}else if(pe_sumarrival<10){
				if (patrn.test(pe_sumarrival)){
					pe_sumarrival=pe_sumarrival.toString();
					pe_sumarrival=pe_sumarrival.substring(0, 4);
					pe_sumarrival=pe_sumarrival+'.0';
				}else{
					pe_sumarrival=pe_sumarrival.toString();
					pe_sumarrival=pe_sumarrival.substring(0, 4);
				};
			};
			pe_sumarrival=pe_sumarrival+'%';
			if(pe_sumarrival=='0%'){
				pe_sumarrival=0;
			};
			Ext.getCmp('pe_sxrxCount_THREE').setValue(data.PE_ARRIVAL_RATE);
			
			var four=data.sumfinished;
			if(four==''){
				four=0;
			};
			Ext.getCmp('sxrxCount_FOUR').setValue(four);
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
			};
			five=five+'%';
			if(five=='0%'){
				five=0;
			};
			Ext.getCmp('sxrxCount_FIVE').setValue(data.ENTERED_FINISHED_RATE);
			
			var sumpefinishedam=data.sumpefinishedam;
			if(sumpefinishedam==''||sumpefinishedam==null||typeof(sumpefinishedam)=="undefined"){
				sumpefinishedam=0;
			};
			Ext.getCmp('pe_sxrxCount_FIVE_am').setValue(sumpefinishedam);
			
			var pe_sumfinished;
			if(one==0)
				pe_sumfinished=0;
			else
			    pe_sumfinished=data.sumfinishedam/one;
			pe_sumfinished=Math.round(pe_sumfinished*100000)/1000;
			if(pe_sumfinished>10){
				if (patrn.test(pe_sumfinished)){
					pe_sumfinished=pe_sumfinished.toString();
					pe_sumfinished=pe_sumfinished.substring(0, 5);
					pe_sumfinished=pe_sumfinished+'.0';
				}else{
					pe_sumfinished=pe_sumfinished.toString();
					pe_sumfinished=pe_sumfinished.substring(0, 5);
				};
			}else if(pe_sumfinished<10){
				if (patrn.test(pe_sumfinished)){
					pe_sumfinished=pe_sumfinished.toString();
					pe_sumfinished=pe_sumfinished.substring(0, 4);
					pe_sumfinished=pe_sumfinished+'.0';
				}else{
					pe_sumfinished=pe_sumfinished.toString();
					pe_sumfinished=pe_sumfinished.substring(0, 4);
				};
			};
			pe_sumfinished=pe_sumfinished+'%';
			if(pe_sumfinished=='0%'){
				pe_sumfinished=0;
			};
			
			Ext.getCmp('pe_sxrxCount_FIVE').setValue(data.PE_ENTERED_FINISHED_RATE);
			
			
			var six=data.sumtiring;
			if(six==''||six==null||typeof(six)=="undefined"){
				six=0;
			};
			Ext.getCmp('sxrxCount_SIX').setValue(six);
			
			var seven=data.sumsaving;
			if(seven==''||seven==null||typeof(seven)=="undefined"){
				seven=0;
			};
			Ext.getCmp('sxrxCount_SEVEN').setValue(seven);
			var eight;
			if(six==0)
				eight=0;
			else
			  eight=seven/six;
			eight=Math.round(eight*100000)/1000;
			if(eight>10){
				if (patrn.test(eight)){
					eight=eight.toString();
					eight=eight.substring(0, 5);
					eight=eight+'.0';
				}else{
					eight=eight.toString();
					eight=eight.substring(0, 5);
				};
			}else if(eight<10){
				if (patrn.test(eight)){
					eight=eight.toString();
					eight=eight.substring(0, 4);
					eight=eight+'.0';
				}else{
					eight=eight.toString();
					eight=eight.substring(0, 4);
				};
			};
			eight=eight+'%';
			if(eight=='0%'){
				eight=0;
			};
			//当都是0的时候
			if(seven==0&&six==0){
				eight=0;
			}
			Ext.getCmp('sxrxCount_EIGHT').setValue(data.ENTERED_SAVING_RATE);
			
			var sumpeenteredsavingam=data.sumpeenteredsavingam;
			if(sumpeenteredsavingam==''||sumpeenteredsavingam==null||typeof(sumpeenteredsavingam)=="undefined"){
				sumpeenteredsavingam=0;
			};
			Ext.getCmp('pe_sxrxCount_EIGHT_am').setValue(sumpeenteredsavingam);
			
			var pe_sumsaving;
			if(six==0)
				pe_sumsaving=0;
			else
			    pe_sumsaving=sumpeenteredsavingam/six;
			console.log("pe_sumsaving：      "+pe_sumsaving);
			pe_sumsaving=Math.round(pe_sumsaving*100000)/1000;
			console.log("pe_sumsaving123：      "+pe_sumsaving);
			if(pe_sumsaving>10){
				if (patrn.test(pe_sumsaving)){
					pe_sumsaving=pe_sumsaving.toString();
					pe_sumsaving=pe_sumsaving.substring(0, 5);
					pe_sumsaving=pe_sumsaving+'.0';
				}else{
					pe_sumsaving=pe_sumsaving.toString();
					pe_sumsaving=pe_sumsaving.substring(0, 5);
				};
			}else if(pe_sumsaving<10){
				if (patrn.test(pe_sumsaving)){
					pe_sumsaving=pe_sumsaving.toString();
					pe_sumsaving=pe_sumsaving.substring(0, 4);
					pe_sumsaving=pe_sumsaving+'.0';
				}else{
					pe_sumsaving=pe_sumsaving.toString();
					pe_sumsaving=pe_sumsaving.substring(0, 4);
				};
			};
			pe_sumsaving=pe_sumsaving+'%';
			if(pe_sumsaving=='0%'){
				pe_sumsaving=0;
			};
			//当都是0的时候
			console.log("pe_sumsaving：      "+pe_sumsaving);
			if(sumpeenteredsavingam==0&&six==0){
				pe_sumsaving=0;
			}
			
			console.log("pe_sumsaving：      "+pe_sumsaving);
			Ext.getCmp('pe_sxrxCount_EIGHT').setValue(data.PE_ENTERED_SAVING_RATE);
			
		}).fail(function(errorObject){
			console.log("查询数据失败");
		});
	},
	
	
	//受信热线 查询所属站信息
	search_sxrxstation_button:function(){
		var searchhotlinecompanyid=Ext.getCmp('searchhotlinecompanyid').getValue();
		console.log('searchhotlinecompanyid:   '+searchhotlinecompanyid);
//		var SearchhotlineCountRegion=Ext.getCmp('SearchhotlineCountRegion').getValue();
//		console.log('SearchhotlineCountRegion:   '+SearchhotlineCountRegion);
		var CountRegion=reportHotlineIFMonth;
		console.log("CountRegion: " + CountRegion);
		var obj = this;
		obj.NextView('report_hotline_sxrxStationPage','HelcPDA.view.report.HotLine.ReportHotLineStationPage');
		
//		var Maintain=collectionName;
//    	var MaintainList=WL.JSONStore.get(Maintain);
//    	var Maintxml={tcode:'GZBG/'+userid+'/'+1};
//    	var options={exacte:true};//默认是false
//    	MaintainList.remove(Maintxml,options).then(function(){
//    		console.log('GZBG删除成功');
		var data="{'key1':'"+userid+"','key':'"+CountRegion+"','key2':'"+searchhotlinecompanyid+"'}";
		gzbgsbbBySy=1;
		
		function RepFaultData(result,obj){
//    			var Maintain=collectionName;
//    	    	var MaintainList=WL.JSONStore.get(Maintain);
			var num=result.item.rows.length;
			console.log('num:    '+num);
			console.log('result.item.rows:    '+result.item.rows);
			var datads=Ext.data.StoreManager.get('ReportHotLineStationStore');
			if(!datads){
				datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStationStore');
			};
			var zgs=[];
			for(var i=0;i<num;i++){
				zgs[i]=result.item.rows[i];
				if(zgs[i].PE_ARRIVAL_RATE==''){
					zgs[i].PE_ARRIVAL_RATE='0%';
				}else{
					zgs[i].PE_ARRIVAL_RATE=result.item.rows[i].PE_ARRIVAL_RATE+'%';
				}
				
				if(zgs[i].PE_ENTERED_SAVING_RATE==''){
					zgs[i].PE_ENTERED_SAVING_RATE='0%';
					console.log(zgs[i].PE_ENTERED_SAVING_RATE);
				}else{
					zgs[i].PE_ENTERED_SAVING_RATE=result.item.rows[i].PE_ENTERED_SAVING_RATE+'%';
				}
				
				if(zgs[i].PE_ENTERED_FINISHED_RATE==''){
					zgs[i].PE_ENTERED_FINISHED_RATE='0%';
				}else{
					zgs[i].PE_ENTERED_FINISHED_RATE=result.item.rows[i].PE_ENTERED_FINISHED_RATE+'%';
				}
				
				if(zgs[i].ENTERED_ARRIVAL_RATE==''){
					zgs[i].ENTERED_ARRIVAL_RATE='0%';
				}else{
					zgs[i].ENTERED_ARRIVAL_RATE=result.item.rows[i].ENTERED_ARRIVAL_RATE+'%';
				}

				if(zgs[i].ENTERED_FINISHED_RATE==''){
					zgs[i].ENTERED_FINISHED_RATE='0%';
				}else{
					zgs[i].ENTERED_FINISHED_RATE=result.item.rows[i].ENTERED_FINISHED_RATE+'%';
				}
				
				if(zgs[i].ENTERED_SAVING_RATE==''){
					zgs[i].ENTERED_SAVING_RATE='0%';
				}else{
					zgs[i].ENTERED_SAVING_RATE=result.item.rows[i].ENTERED_SAVING_RATE+'%';
				}
				
			};
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
		obj.connectServerMainTain(RepFaultData,obj,"rexianshouxinAction..do?method=toSearchStation",data);
//    	}).fail(function(){
//			console.log('GZBG删除失败');
//		});
		
	},
	
	
	//受信报表  1 返回
	Rep_hotline_SXRX_FHbutton:function(){
		this.BackView();
//		this.showBackView('reportview_homepage','HelcPDA.view.report.ReportView');
	},
	
	//受信报表  2 返回
	hotline_sxrxCount_FHbutton:function(){
		this.showBackView('report_hotline_sxrxHomePage','HelcPDA.view.report.HotLine.ReportHotLineHomePage');
	},
	
	//受信报表  3 返回
	Rep_hotline_SXRXStation_FHbutton:function(){
		this.showBackView('report_hotline_sxrxCount','HelcPDA.view.report.HotLine.ReportHotLineCount');
//		Ext.getCmp('searchhotlinecompanyid').setValue('');
	},
	
});