
/* JavaScript content from app/controller/ghj/ghjFunction/GHJ_SR_SelectCtrl.js in folder common */
Ext.define('HelcPDA.controller.ghj.ghjFunction.GHJ_SR_SelectCtrl', {
	extend : 'HelcPDA.controller.ApplicationController',
	config : {
		control:{

			 //查询
			 'button#GHJ_SR_Select_id_CX':{
				 tap:'GHJ_SR_Select_id_CX'
			 },
			 
			 //list
			 'list#GHJ_SR_Select_id_list':{
					itemtap:'GHJ_SR_Select_id_list'
			 },
			 
			 //确定
			 'button#GHJ_SR_Select_id_QD':{
				 tap:'GHJ_SR_Select_id_QD'
			 },
		}
	},
	
	//查询
	GHJ_SR_Select_id_CX:function(){
		//服务请求编号
		var SRNumber=Ext.getCmp('SR_SRNumber').getValue();
		//服务请求来源
		var ServiceRequestSource=Ext.getCmp('SR_ServiceRequestSource').getValue();
		//受信内容
		var Abstract=Ext.getCmp('SR_Abstract').getValue();
		//受信时间
		var StartTime=Ext.getCmp('SR_StartTime').getValue();
		//是否困人
		var BoxUp=Ext.getCmp('SR_BoxUp').getValue();
		//故障工号
		var AssetNumber=Ext.getCmp('SR_AssetNumber').getValue();
		//所属司
		var Company=Ext.getCmp('SR_Company').getValue();
		//工号地盘
		var AssetDomainName=Ext.getCmp('SR_AssetDomainName').getValue();
		//工号地址
		var AssetAddress=Ext.getCmp('SR_AssetAddress').getValue();
		
		var tj='';
		if(SRNumber!=''){
			tj+="[Service Request.SR Number] LIKE '*"+SRNumber+"*' ";
		};
		if(ServiceRequestSource!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Service Request.Service Request Source] LIKE '*"+ServiceRequestSource+"*' ";
		};
		if(Abstract!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Service Request.Abstract] LIKE '*"+Abstract+"*' ";
		};
		if(StartTime!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			//06/01/2011 11:39:43
			cc.log(StartTime);
			var StartTimeOne=new Date(StartTime);
			var StartTimeTwo=Ext.Date.format(StartTimeOne,'m/d/Y');
			cc.log('StartTime:'+StartTimeTwo);
			tj+="[Service Request.Start Time] = '"+StartTimeTwo+"' ";
		};
		if(BoxUp!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Service Request.Box Up] LIKE '*"+BoxUp+"*' ";
		};
		if(AssetNumber!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Service Request.Asset Number] LIKE '*"+AssetNumber+"*' ";
		};
		if(Company!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Service Request.Company] LIKE '*"+Company+"*' ";
		};
		if(AssetDomainName!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Service Request.Asset Domain Name] LIKE '*"+AssetDomainName+"*' ";
		};
		if(AssetAddress!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Service Request.Asset Address] LIKE '*"+AssetAddress+"*' ";
		};
		
		//tj+=" order by [Service Request.Start Time]";
		
		this.sr_selectFF(tj);
	},
	
	sr_selectFF:function(tj){
		cc.log('服务请求查询条件：'+tj);
		var param={
				Flag:true,
				SearchSpec:tj,
				PageSize:30,
				StartRowNum:0,
				NewQuery:true,
				userID:ghjuserID,
		};
		var params = {
				adpName:'HttpAdapter_PDA_GHJ',
				prodName:'getServRepQueryPage',
				parameters: param
		};
		var getResult = function(result){
			var Date=Ext.data.StoreManager.get('GHJ_SR_SelectStore');
			if(!Date){
				Date=Ext.create('HelcPDA.store.ghj.ghjFunction.GHJ_SR_SelectStore');
			};
			cc.log(result);
			var data=result.ServRepQueryPage_Output.ListOfHelServiceRequest.ServiceRequest;
			cc.log('data--------');
			cc.log(data);
			var num=result.ServRepQueryPage_Output.NumOutputObjects;
			cc.log('num:'+num);
			if(num==0){
				Ext.Msg.alert('温馨提示','查无数据！');
				Date.setData([]);
				return;
			};
			
			
			Date.setData(data);
			
			//强制转页
			var char=Ext.getCmp('GHJ_SR_Select_id');
			var tab=char.getInnerItems();
			char.setActiveItem(tab[1]);
		};
		
		this.getGHJ(this,getResult,params);
		
	},
	
	
	//list
	GHJ_SR_Select_id_list:function( theList, index, target, record, e, eOpts ){
		var obj=this;
		if(event.target.id!='conkung_GHJ_SR_Select'){
			obj.NextView('GHJ_SR_SelectDetail_id','HelcPDA.view.ghj.ghjFunction.GHJ_SR_SelectDetail');
			//cc.log(record.data);
			//赋值
			Ext.getCmp('SRD_SRNumber').setValue(record.data.SRNumber);
			Ext.getCmp('SRD_ServiceRequestSource').setValue(record.data.ServiceRequestSource);
			Ext.getCmp('SRD_Abstract').setValue(record.data.Abstract);
			var time=new Date(record.data.StartTime);
			time=Ext.Date.format(time,'Y-m-d H:i:s');
			Ext.getCmp('SRD_StartTime').setValue(time);
			Ext.getCmp('SRD_BoxUp').setValue(record.data.BoxUp);
			Ext.getCmp('SRD_AssetNumber').setValue(record.data.AssetNumber);
			Ext.getCmp('SRD_Company').setValue(record.data.Company);
			Ext.getCmp('SRD_AssetDomainName').setValue(record.data.AssetDomainName);
			Ext.getCmp('SRD_AssetAddress').setValue(record.data.AssetAddress);
		}else{
			var sele=document.getElementsByName('groupkung_GHJ_SR_Select');
			//cc.log(index);
			for(var i=0;i<sele.length;i++){
				var checkbox = sele[i];
				if(index==i){
					checkbox.style.color='#e03a3e';
				}else{
					checkbox.style.color='#ccc';
				};
			};
		};
		
	},
	
	//确定
	GHJ_SR_Select_id_QD:function(){
		//判断是否选中
		var ifXZ=0;
		//判断选中位置
		var numWZ=0;
		var sele=document.getElementsByName('groupkung_GHJ_SR_Select');
		var seleNum=sele.length;
		for(var i=0;i<seleNum;i++){
			//判断选中
			var checkbox=sele[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				ifXZ=1;
				numWZ=i;
			};
		};
		if(ifXZ==0){
			Ext.Msg.alert('温馨提示','至少选择一项');
			return;
		};
		var Date=Ext.data.StoreManager.get('GHJ_SR_SelectStore');
		if(!Date){
			Date=Ext.create('HelcPDA.store.ghj.ghjFunction.GHJ_SR_SelectStore');
		};
		var date=Date.getData();
		var bb=date.items[numWZ].data;
		
		this.BackView();
		//服务请求编号
		Ext.getCmp('ghj_SRNumber').setValue(bb.SRNumber);
		//修改记录的更换件详细信息    缺少 所属站
		var zd=objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData;
		zd.SRNumber=bb.SRNumber;
		zd.SRId=bb.Id;
		//重记录
		objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData=zd;
	},
	
});