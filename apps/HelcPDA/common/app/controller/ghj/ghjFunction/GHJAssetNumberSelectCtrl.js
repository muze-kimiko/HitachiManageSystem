//数量
var xlsxNum=0;
//下拉条件
var XLtj='';

Ext.define('HelcPDA.controller.ghj.ghjFunction.GHJAssetNumberSelectCtrl', {
	extend : 'HelcPDA.controller.ApplicationController',
	config : {
		control:{
			//确定
			'button#GHJAssetNumberSelect_id_QD':{
				tap:'GHJAssetNumberSelect_id_QD'
			 },

			 //查询
			 'button#GHJAssetNumberSelect_id_CX':{
				 tap:'GHJAssetNumberSelect_id_CX'
			 },
			 
			 //list
			 'list#GHJAssetNumberSelect_id_list':{
					itemtap:'GHJAssetNumberSelect_id_list',
					initialize:'GHJAssetNumberSelect_id_list_XL'
			 },
			 
			 
		}
	},
	
	//确定
	GHJAssetNumberSelect_id_QD:function(){
		//判断是否选中
		var ifXZ=0;
		//判断选中位置
		var numWZ=0;
		var sele=document.getElementsByName('groupkung_GHJAssetNumberSelect');
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
		var Date=Ext.data.StoreManager.get('GHJAssetNumberSelectStore');
		if(!Date){
			Date=Ext.create('HelcPDA.store.ghj.ghjFunction.GHJAssetNumberSelectStore');
		};
		var date=Date.getData();
		var bb=date.items[numWZ].data;
		//cc.log(bb);
		
		//地盘  要还是不要  AssetDomainName: "广铁东山口"
		//工号
		Ext.getCmp('ghj_AssetNumber').setValue(bb.AssetNumber);
		//梯种型号
		Ext.getCmp('ghj_ProductPart').setValue(bb.ProductPart);
		//梯种
		Ext.getCmp('ghj_ProductName').setValue(bb.ProductName);
		//所属司
		Ext.getCmp('ghj_CompanyOrganization').setValue(bb.CompanyOrganization);
		//所属站
		//cc.log('所属站：'+bb["ListOfAssetMgmt-Asset_Organization"]["AssetMgmt-Asset_Organization"].Organization2);
		Ext.getCmp('ghj_Organization').setValue(bb["ListOfAssetMgmt-Asset_Organization"]["AssetMgmt-Asset_Organization"].Organization2);
		//地址
		Ext.getCmp('ghj_AssetAddress').setValue(bb.AssetAddress);
		//大楼
		Ext.getCmp('ghj_AssetEdificeName').setValue(bb.EdificeName);
		//地盘
		Ext.getCmp('ghj_AssetDomainName').setValue(bb.AssetDomainName);
		//修改记录的更换件详细信息     所属站  不做重新记录
		var zd=objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData;
		//cc.log(zd);
		zd.AssetNumber=bb.AssetNumber;
		zd.ProductPart=bb.ProductPart;
		zd.ProductName=bb.ProductName;
		zd.CompanyOrganization=bb.CompanyOrganization;
		zd.AssetAddress=bb.AssetAddress;
		zd.AssetEdificeName=bb.EdificeName;
		zd.AssetDomainName=bb.AssetDomainName;
		//重记录
		objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData=zd;
		this.BackView();
	},
	
	//查询
	GHJAssetNumberSelect_id_CX:function(){
		//工号
		var AssetNumber=Ext.getCmp('NS_AssetNumber').getValue();
		//梯型
		//var ProductPart=Ext.getCmp('NS_ProductPart').getValue();
		//梯种
		//var ProductName=Ext.getCmp('NS_ProductName').getValue();
		//所属司
		//var CompanyOrganization=Ext.getCmp('NS_CompanyOrganization').getValue();
		//所属站
		//var Organization=Ext.getCmp('NS_Organization').getValue();
		//地址
		var AssetAddress=Ext.getCmp('NS_AssetAddress').getValue();
		//地盘
		var AssetDomainName=Ext.getCmp('NS_AssetDomainName').getValue();
		//大楼
		var EdificeName=Ext.getCmp('NS_EdificeName').getValue();
		
		var tj='';
		if(AssetNumber!=''){
			tj+= "[Asset Mgmt - Asset.Asset Number] LIKE '*"+AssetNumber+"*'"; 
		};
		/*if(ProductPart!=''){
			tj+="[Asset Mgmt - Asset.Product Part] LIKE '*"+ProductPart+"*'";
		};
		if(ProductName!=''){
			tj+="[Asset Mgmt - Asset.Product Name] LIKE '*"+ProductName+"*'";
		};
		if(CompanyOrganization!=''){
			tj+="[Asset Mgmt - Asset.Company Organization] LIKE '*"+CompanyOrganization+"*'";
		};
		if(Organization!=''){
			tj+="[Position.Organization] LIKE '*"+Organization+"*'";
		};*/
		if(AssetAddress!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Asset Mgmt - Asset.Asset Address] LIKE '*"+AssetAddress+"*'";
		};
		if(AssetDomainName!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Asset Mgmt - Asset.Asset Domain Name] LIKE '*"+AssetDomainName+"*'";
		};
		if(EdificeName!=''){
			if(tj!=''){
				tj+=' AND ';
			};
			tj+="[Asset Mgmt - Asset.Edifice Name] LIKE '*"+EdificeName+"*'";
		};
		//station_id='1-JEXBLF';
		tj+=" AND [Asset Mgmt - Asset.Primary Organization Id]='"+station_id+"'";
		XLtj=tj;
		//cc.log('查询条件：'+tj);
		xlsxNum=0;
		var param={
				Flag:true,
				NewQuery:true,
				SearchSpec:tj,
				PageSize:30,
				StartRowNum:xlsxNum,
				userID:ghjuserID,
		};
		var params = {
				adpName:'HttpAdapter_PDA_GHJ',
				prodName:'getQueryPageAssetInf',
				parameters: param
		};
		var getResult = function(result){
			cc.log(result);
			var data=result.QueryPageAssetInf_Output.ListOfHelEaiAppAssetManagementInformation["ListOfAssetMgmt-Asset"]["AssetMgmt-Asset"];
			cc.log(data);
			
			var Date=Ext.data.StoreManager.get('GHJAssetNumberSelectStore');
			if(!Date){
				Date=Ext.create('HelcPDA.store.ghj.ghjFunction.GHJAssetNumberSelectStore');
			};
			Date.setData(data);
			
			//强制转页
			var char=Ext.getCmp('GHJAssetNumberSelect_id');
			var tab=char.getInnerItems();
			char.setActiveItem(tab[1]);
		};
		
		this.getGHJ(this,getResult,params);
		
	},
	
	//list
	GHJAssetNumberSelect_id_list:function( theList, index, target, record, e, eOpts ){
		var obj=this;
		if(event.target.id!='conkung_GHJAssetNumberSelect'){
			obj.NextView('GHJAssetNumberSelectDetail_id','HelcPDA.view.ghj.ghjFunction.GHJAssetNumberSelectDetail');
			cc.log(record.data);
			//赋值
			Ext.getCmp('NSD_AssetNumber').setValue(record.data.AssetNumber);
			Ext.getCmp('NSD_ProductPart').setValue(record.data.ProductPart);
			Ext.getCmp('NSD_ProductName').setValue(record.data.ProductName);
			Ext.getCmp('NSD_CompanyOrganization').setValue(record.data.CompanyOrganization);
			Ext.getCmp('NSD_Organization2').setValue(record.data["ListOfAssetMgmt-Asset_Organization"]["AssetMgmt-Asset_Organization"].Organization2);//所属站
			Ext.getCmp('NSD_AssetAddress').setValue(record.data.AssetAddress);
			Ext.getCmp('NSD_EdificeName').setValue(record.data.EdificeName);
			Ext.getCmp('NSD_AssetDomainName').setValue(record.data.AssetDomainName);
		}else{
			var sele=document.getElementsByName('groupkung_GHJAssetNumberSelect');
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
	
	//下拉查询
	GHJAssetNumberSelect_id_list_XL:function(){
		var obj=this;
		Ext.getCmp('GHJAssetNumberSelect_id_list').setPlugins([
			{
		       	autoSnapBack: false,
		        lastUpdatedText: '上次刷新:&nbsp;',
		        lastUpdatedDateFormat:"Y-m-d H:i",  
		        loadedText: '已刷新',
		        loadingText: '正在刷新...',
		        pullText: '下拉刷新...',
		        releaseText: '放开开始刷新...',
		        type: 'pullrefresh', //状态
		        listeners : {
		        	latestfetched : function() {
		        		var tmpStore = this.getList().getStore(); //这个方法表示调用当前list的store中的数据
		        		var tmpStoreNum=tmpStore.data.items.length;
		                cc.log(tmpStoreNum);
		                tmpStoreNum=tmpStoreNum/2;
		                cc.log(tmpStoreNum);
		                tmpStore.setData([]);
		                var Flag=true;
		                if(tmpStoreNum<30){
		                    xlsxNum=0;
		                    var htmel=['<table border=0 width=100% style="color:#666" class="textf">'+
		   							'  <tr>'+
									'     <td width=10% rowspan="2">'+
									'        <div name="groupkung_GHJAssetNumberSelect" class="p_judge_box2" id="conkung_GHJAssetNumberSelect">3</div>'+
									'     </td>'+
									'     <td width=90%>{AssetNumber}</td>'+
									'  </tr>'+
									'  <tr>'+
									'      <td width=90%>{AssetAddress}</td>'+
									'  </tr>'+
									'</table>',];
							Ext.getCmp('GHJAssetNumberSelect_id_list').setItemTpl(htmel);
							
		                }else{
		                    xlsxNum=xlsxNum+30;
		                    Flag=false;
		                };
		                cc.log(xlsxNum);

		                //跟新
						getResult=function(result){
							try{
								//公用数据仓
								var Date=Ext.data.StoreManager.get('GHJAssetNumberSelectStore');
								if(!Date){
									Date=Ext.create('HelcPDA.store.ghj.ghjFunction.GHJAssetNumberSelectStore');
								};
								var data=result.QueryPageAssetInf_Output.ListOfHelEaiAppAssetManagementInformation["ListOfAssetMgmt-Asset"]["AssetMgmt-Asset"];
								Date.setData(data);
							}catch(e){
								Ext.Msg.alert("温馨提示","系统报错,请与后台管理员联系");
							};
							
						};
						
						var param={
								Flag:true,
								NewQuery:Flag,
								SearchSpec:XLtj,
								PageSize:30,
								StartRowNum:xlsxNum,
								userID:ghjuserID,
						};
						var params = {
								adpName:'HttpAdapter_PDA_GHJ',
								prodName:'getQueryPageAssetInf',
								parameters: param
						};
						obj.getGHJ(obj,getResult,params);
		            },
		         },
		     },
		]);
	},
	
	
});