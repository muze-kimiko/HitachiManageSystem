
/* JavaScript content from app/controller/appworkspace/Contract/ContractCtrl.js in folder common */
/**
 * Made by lgs
 */
Ext.define('HelcPAD.controller.appworkspace.Contract.ContractCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

    config: {
        control: {
        	
        	//搜索
    		"button#appSearch":{
    			tap:'appSearch'
    		},
    		
    		//合同资料页面  返回 按钮 （有下达排产指令   的页面）
    		"button#contractList_FH":{
    			tap:'contractList_FH'
    		},
    		
    		//合同资料页面 list进入(有下达排产指令   的页面)
    		"list#contractList_list":{
    			itemtap:'contractList_list'
    		},
    		
    		//人员列表页面 返回按钮(有下达排产指令   的页面)
    		"button#contractnoList_FH":{
    			tap:'contractnoList_FH'
    		},
    		
    		//合同资料页面  返回按钮   (无下达排产指令   的页面)  
    		"button#contractDetail_FH":{
    			tap:'contractDetail_FH'
    		},

    		//erp合同资料页面  返回按钮   (无下达排产指令   的页面)  
    		"button#contractDetaillist_FH":{
    			tap:'contractDetaillist_FH'
    		},
    		
    		//合同资料页面 list进入(无下达排产指令   的页面)
    		"list#contractDetail_list":{
    			itemtap:'contractDetail_list'
    		},
    		
    		//过滤
    		"searchfield#GL_contractDetail_field":{
    			keyup:'GL_contractDetail_field',
    			clearicontap:'GL_contractDetail_field_clert'
    		},
    		
    		//箱头进度信息页面  返回按钮
    		"button#boxinfo_FH":{
    			tap:'boxinfo_FH'
    		},
    		//下达牌产指令
    		'button#schedule':{
    			tap:'schedule'
    		},
    		'button#produceApply_FH':{
    			tap:'produceApply_FH'
    		},
    		'button#produceApply_TJ':{
    			tap:'produceApply_TJ'
    		},

//   		  'tabpanel#contractDetail_tpl':{
//   			activeitemchange:'contractDetail_tpl'
//   		  },
    		'searchfield#searchfield':{
    			keyup:'searchfield',
    			clearicontap:'searchfield_c'
    		},
    		
    		//过滤工号梯号
    		'searchfield#searchno':{
    			keyup:'searchno',
    			clearicontap:'searchfield_no'
    		},
     
	
    		//合同行资料  返回
    		'button#contracthang_id_FH':{
    			tap:'contracthang_id_FH'
    		},
    		
    		'list#contractDetail_list_erp':{
    			itemtap:'contractDetail_list_erp'
    		},
    		'list#contractList_nolist':{
    			itemtap:'contractList_nolist'
    		},
    		'button#contractDetail_FH_erp':{
    			tap:'contractDetail_FH_erp'
    		},
    		
    		//技价审核详细
    		'button#CD_TechnicalApproveStatus_XX':{
    			tap:'CD_TechnicalApproveStatus_XX'
    		},
    		
    		//商务审核状态详细
    		'button#CD_PreaprSts_XX':{
    			tap:'CD_PreaprSts_XX'
    		},
    		//箱头列表详细
    		'list#boxinfo_list':{
    			itemtap:'boxinfo_list'
    		},
    		'button#BoxInfo_zt_fh':{
    	        tap:'BoxInfo_zt_fh' 
    		},
    		'button#ContractDetail_erp_bt':{
    			tap:'ContractDetail_erp_bt'},
    		'button#ContractpcjlList_FH':{
    			tap:'ContractpcjlList_FH'
    		}	
        }

    },
    
    CD_PreaprSts_XX:function(){
    	var sws=Ext.getCmp('sws').getValue();
    	var swsZF=eval("("+sws+")");
    	this.NextView('contractbusiness_siebel','HelcPAD.view.appworkspace.Contract.ContractBusiness_Siebel');
    	Ext.getCmp('CB_PreaprSts').setValue(swsZF.PreaprSts);
    	//商审收到日期
    	Ext.getCmp('CB_BpReceivedDt').setValue(fkpd(swsZF.BpReceivedDt));
    	//待盖章日期
    	Ext.getCmp('CB_BpStampingDt').setValue(fkpd(swsZF.BpStampingDt));
    	//拒绝日期
    	Ext.getCmp('CB_BpRefuseDt').setValue(fkpd(swsZF.BpRefuseDt));
    	Ext.getCmp('CB_Attrib1').setValue(swsZF.Attrib1);
    	//总部技审人员完成时间
    	Ext.getCmp('CB_PreaprFinishDt').setValue(fkpd(swsZF.PreaprFinishDt));
    	function fkpd(data){
    		if(data==''){
    			return '';
    		};
    		var datab=new Date(data);
    		return Ext.Date.format(datab,'Y-m-d H:i:s');
    	};
    },
    
    //技价审核详细
    CD_TechnicalApproveStatus_XX:function(){
    	var jjs=Ext.getCmp('jjs').getValue();
    	//cc.log('11 '+jjs);
    	var jjsZF=eval("("+jjs+")");
    	//cc.log('13 '+jjsZF.SaleResp);
    	this.NextView('contractskillprice_siebel_id','HelcPAD.view.appworkspace.Contract.ContractSkillPrice_Siebel');
    	Ext.getCmp('SP_TechnicalApproveStatus').setValue(jjsZF.TechnicalApproveStatus);
    	Ext.getCmp('SP_SaleResp').setValue(jjsZF.SaleResp);
    	//分公司营业员提交时间
    	Ext.getCmp('SP_TechSubmitDate').setValue(fkpd(jjsZF.TechSubmitDate));
    	
    	Ext.getCmp('SP_BranchTechChecker').setValue(jjsZF.BranchTechChecker);
    	
    	//分公司技术审核时间
    	Ext.getCmp('SP_BranchFinishDate').setValue(fkpd(jjsZF.BranchFinishDate));
    	Ext.getCmp('SP_Attrib3').setValue(jjsZF.Attrib3);
    	
    	//总部技审人员完成时间
    	Ext.getCmp('SP_HeadFinishDate').setValue(fkpd(jjsZF.HeadFinishDate));
    	
    	//总部营业员审核时间
    	Ext.getCmp('SP_ApproveFinishDate').setValue(fkpd(jjsZF.ApproveFinishDate));
    	
    	Ext.getCmp('SP_TechnicalApprovePerson').setValue(jjsZF.TechnicalApprovePerson);
    	
    	function fkpd(data){
    		if(data==''){
    			return '';
    		};
    		var datab=new Date(data);
    		return Ext.Date.format(datab,'Y-m-d H:i:s');
    	};
    },
    
    //进入申请发票结算单
    applyInvoice:function(){
    	this.NextView('voucherApply','HelcPAD.view.appworkspace.VoucherApply.VoucherApply');
    },
    //申请分批单
    applyPartial:function(){
    	this.NextView('batchApply','HelcPAD.view.appworkspace.BatchApply.BatchApply');
    },
    
    //申请特殊牌产 
    applySpecial:function(){
    	this.NextView('specialApply','HelcPAD.view.appworkspace.SpecialApply.SpecialApply');
    },
    
    
    //搜索  查找合同页面
    appSearch:function(){
    	var obj=this;
    	var tempArray=['appContractNo','appContractType','appCustomerName','appElevatorNo','appUseUnit','appBigCustomer'];
    	var tempValue=obj.getElement(tempArray);
    	//非空验证
        var length=tempValue.length;
        var num=0;
    	for(var i=0;i<length;i++){
    		if(tempValue[i]==''){
    			num++;
    		}else if(tempValue[i]=='请选择'){
    			num++;
    		};
    	};
    	if(num==6){
    		Ext.Msg.alert('请至少输入一项查询条件');
    		return;
    	}else{
    		//获得查询Siebel结果
    		var getResult=function(res){
    			//cc.log('e '+res.length);
    			//cc.log('e '+JSON.stringify(res));
    			
    			if(res==null||res==undefined){
    				Ext.Msg.alert("查无数据");
    				return;
    			};
    			
    			//cc.log(JSON.stringify(res));
    			//cc.log('num '+res.length);
    			if(res.length==undefined){
    				var DataCs=Ext.data.StoreManager.get('ContractStore');
        			if(!DataCs){
        				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore');
        			};
        			DataCs.setData(res);
    			}else{
    				var HTH=[];
        			for(var i=0;i<res.length;i++){
        				HTH[i]=res[i].ContractNumber;
        			};
        			var WYHT=HTH.unique3();
        			//cc.log('WYHT '+JSON.stringify(WYHT));
        			
        			//判断
        			var resDate=[];
        			//cc.log('WYHT.length  '+ WYHT.length);
        			if(WYHT[WYHT.length-1]==''){
        				//cc.log('使用单位验证');
        				for(var i=0;i<WYHT.length-1;i++){
            				for(var j=0;j<res.length;j++){
            					if(WYHT[i]==res[j].ContractNumber){
            						var sz={};
            						sz.ContractNumber=WYHT[i];
            						sz.ContractType=res[j].ContractType;
            						//sz.Attrib2=res[j].Attrib2;
            						sz.BigCustomer=res[j].BigCustomer;
            						sz.FinalUser=res[j].FinalUser;
            						resDate[i]=sz;
            						break;
            					};
            				};
            			};
        			}else{
        				for(var i=0;i<WYHT.length;i++){
            				for(var j=0;j<res.length;j++){
            					if(WYHT[i]==res[j].ContractNumber){
            						var sz={};
            						sz.ContractNumber=WYHT[i];
            						sz.ContractType=res[j].ContractType;
            						//sz.Attrib2=res[j].Attrib2;
            						sz.BigCustomer=res[j].BigCustomer;
            						sz.FinalUser=res[j].FinalUser;
            						resDate[i]=sz;
            						break;
            					};
            				};
            			};
        			};
        			
        			//cc.log(JSON.stringify(resDate));
        			var DataCs=Ext.data.StoreManager.get('ContractStore');
        			if(!DataCs){
        				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore');
        			};
        			DataCs.setData(resDate);
    			};
    			
    			
    			//cc.log('返回值： '+JSON.stringify(res[0]));
    			//cc.log('JJ :'+res[0].CustomerName);
    			obj.NextView('contractList','HelcPAD.view.appworkspace.Contract.ContractList');
    			Ext.getCmp('PAD_JK_PD').setValue('Siebel');
    		};
    		
    		
    		//获得查询erp结果
    		var getResult1=function(res){
    			cc.log('length' +res.data.length);
    			//cc.log('ssrr '+JSON.stringify(res.data[0]));
    			if(res.data.length==0){
    				Ext.Msg.alert("温馨提示","您查询的数据过多，请输入更多条件查询!");
    				return;
    			};
    			var reas=JSON.stringify(res.data[0]);
    			var ress=eval("("+reas+")");
    			if(ress==null||ress==undefined){
    				Ext.Msg.alert("温馨提示","查无数据");
    				return;
    			};
//    			cc.log('123gg'+ress.);
    			if(res.data.length==1){
    				var DataCs=Ext.data.StoreManager.get('ContractStore');
        			if(!DataCs){
        				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore');
        			};
        			DataCs.setData(ress);
    			}else{
    				//cc.log('123gg'+ress.length);
    				//cc.log('123gggg     '+ress);
    				var QCF=[];
        			for(var i=0;i<ress.length;i++){
        				QCF[i]=ress[i].contract_no;
        				//cc.log('123gg'+QCF[i]);
        			};
        			var YQQCF=QCF.unique3();
        			cc.log('QCF '+JSON.stringify(YQQCF));
        			
        			//判断
        			var resDate=[];
        			var resDateNew = [];
        			resDate = res.data;
        			var length_rd = resDate.length;
        			var str_cno = "";
        			for (var i = 0; i < length_rd; i ++) {
        				if (str_cno.indexOf(resDate[i].contract_no) == -1) {
        					resDateNew[resDateNew.length] = resDate[i];
        					//resDateNew[resDateNew.length].CONTRACT_NO = resDate[i].contract_no;
        					str_cno += resDate[i].contract_no;
        				}
        			}
//        			cc.log(JSON.stringify(resDate));
        			var DataCs=Ext.data.StoreManager.get('ContractStore');
        			if(!DataCs){
        				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore');
        			};
        			DataCs.setData(resDateNew);
    			};
    			
    			
    			obj.NextView('contractList','HelcPAD.view.appworkspace.Contract.ContractList');
    			Ext.getCmp('PAD_JK_PD').setValue('ERP');
    			Ext.getCmp('contractList_list').setItemTpl(
    				'<table border=0 width=100% style="color:#666" class="textf">'+
                    '  <tr>'+
                    '     <td width=10% rowspan="2">'+
                    '        <div name="groupkung_conlist" class="p_judge_box2" id="conkung_conlist">3</div>'+
                    '     </td>'+
                    '     <td width=90%>{contract_no}(合同编号)</td>'+
                    '  </tr>'+
                    '  <tr>'+
                    '      <td>{contract_type_name}    {final_use_unit}    {customer_number}</td>'+
                    '  </tr>'+
                    '</table>');
    			
    		};
    	
    		//查询参数  优化
    		var myParam = {};
    		myParam.appContractNo=tempValue[0];
    		if(tempValue[1]=='请选择'){
    			myParam.appContractType='';
    		}else{
    			myParam.appContractType=tempValue[1];
    		};
    		myParam.appCustomerName=tempValue[2];
    		myParam.appElevatorNo=tempValue[3];
    		myParam.appUseUnit=tempValue[4];
    		myParam.appBigCustomer=tempValue[5];
    		console.log(JSON.stringify(myParam));
    		//条件
    		var params = {};
    		//判断是ERP还是Siebel
    		var pd=Ext.getCmp('rkpd').getValue();
    		var num=0;
    		
    		if(pd=='签订阶段查询'){
    			num=1;
    			params.adpName = 'HttpAdapter_PAD_Siebel';
    			params.prodNmae = 'toSiebelcontractSeacher';
    			/*params.adpName = 'HttpAdapter_PAD_Siebel_CS';
    			params.prodNmae = 'toSiebelcontractSeacherCS';*/
    			params.prmName = myParam;
    			obj.connectServerComm(getResult,params,num);
    		}else if(pd =='履行阶段查询'){
    			num=2;

    			params.adpName = 'HttpAdapter_PAD_ERP';
    			params.prodNmae = 'toErpcontractSeacher';
    			params.prmName = myParam;
    			obj.connectServerComm(getResult1,params,num);
						
  ///////////////////////////////////////////////////////////////
    		};
    	};
    },
    
    //合同资料 返回 按钮     （有下达排产指令   的页面）
    contractList_FH:function(){
    	this.showBackView('contractSearch','HelcPAD.view.appworkspace.ContractSearch');
    },
    
    
    //合同资料页面 list进入  (无下达排产指令   的页面)
    contractList_list:function(dataview, index, target, record, e, eOpts){
    	if(event.target.id!='conkung_conlist'){
    		var obj=this;
    		//Siebel的方法
    		var getResult=function(res){
    			if(res==undefined){
    				Ext.Msg.alert('数据不存在');
    				return;
    			};
    			obj.NextView('contractDetail','HelcPAD.view.appworkspace.Contract.ContractDetail');
    	
    			//控件名
    			var KJname=['CD_ContractNumber','CD_ContractType','CD_QuoteFinalUser',
    			            'CD_OrgName','CD_PreaprSts','CD_TechnicalApproveStatus',
    			            'CD_RevNum','CD_ActiveFlg','CD_QuoteNum',
    			            'CD_PreProduct','CD_OptyName','CD_OpportunityAccount',
    			            'CD_AccountKaNumber','CD_TbjApproveStatus','CD_ServicePointStatus',
    			            'CD_ElevatorSumQuantity','CD_EscalatorSumQuantity','CD_ZTS',
    			            'CD_Attrib2'];
    			//值
    			var Zname=[res.ContractNumber,res.ContractType,res.QuoteFinalUser,
    			           res.OrgName,res.PreaprSts,res.TechnicalApproveStatus,
    			           //版本号                活动                                 商机号
    			           res.RevNum,res.ActiveFlg,res.QuoteNum,
    			           //提前排产                        商机名                            客户名
    			           res.PreProduct,res.OptyName,res.OpportunityAccount,
    			           //大客户编号                                  TBJ状态                                               增费状态
    			           res.AccountKaNumber,res.TbjApproveStatus,res.ServicePointStatus,
    			           //直梯台数                                                      扶梯台数                                                     总台量（直梯台数+扶梯台数）
    			           res.ElevatorSumQuantity,res.EscalatorSumQuantity,(parseInt(res.ElevatorSumQuantity)+parseInt(res.EscalatorSumQuantity)),
    			           //商机状态
    			           res.Attrib2];
    			var nameleng=KJname.length;
    			for(var i=0;i<nameleng;i++){
    				Ext.getCmp(KJname[i]).setValue(Zname[i]);
    			};
    			//技价审 
    			//计价审核状态     跟踪人员       
    			var jjs="{'TechnicalApproveStatus':'"+res.TechnicalApproveStatus+"','SaleResp':'"+res.SaleResp+"'," +
    			//分公司营业员提交时间		 分公司技审人员
    			"'TechSubmitDate':'"+res.TechSubmitDate+"','BranchTechChecker':'"+res.BranchTechChecker+"'," +
    			//分公司技术审核时间                总部营业员
    			"'BranchFinishDate':'"+res.BranchFinishDate+"','Attrib3':'"+res.Attrib3+"'," +
    			//总部技术审核完成日期              总部技术审核人员
    			"'HeadFinishDate':'"+res.HeadFinishDate+"','TechnicalApprovePerson':'"+res.TechnicalApprovePerson+"'," +
    			//总部营业员审核时间
    			"'ApproveFinishDate':'"+res.ApproveFinishDate+"'}";
    			Ext.getCmp('jjs').setValue(jjs);
    			//商务审
    			//商务审核状态              商审收到日期
    			var sws="{'PreaprSts':'"+res.PreaprSts+"','BpReceivedDt':'"+res.BpReceivedDt+"'," +
    			//待盖章日期                   商审拒绝日期            		
    			"'BpStampingDt':'"+res.BpStampingDt+"','BpRefuseDt':'"+res.BpRefuseDt+"'," +
    			//完成日期		        商务审核人
    			"'PreaprFinishDt':'"+res.PreaprFinishDt+"','Attrib1':'"+res.Attrib1+"'}";
    			Ext.getCmp('sws').setValue(sws);
    			//cc.log('rq1 '+res.TechSubmitDate);
    			//var data=new Date(res.TechSubmitDate);
    			//cc.log('rq2 '+Ext.Date.format(data,'Y-m-d H:i:s'));
    			//cc.log('res.PreaprSts:'+res.PreaprSts);
    			//cc.log('res.TechnicalApproveStatus:'+res.TechnicalApproveStatus);
    			//cc.log('res.ListOfHelPdaQuoteLines.HelPdaQuoteLines'+JSON.stringify(res.ListOfHelPdaQuoteLines.HelPdaQuoteLines));
    			
    			try{
    				if(res.ListOfHelPdaQuoteLines.HelPdaQuoteLines!=''&&res.ListOfHelPdaQuoteLines.HelPdaQuoteLines!=null&&res.ListOfHelPdaQuoteLines.HelPdaQuoteLines!=undefined){
    					//合同行
    	    			var DataHLine=Ext.data.StoreManager.get('ContractHLineStore');
    	    			if(!DataHLine){
    	    				DataHLine=Ext.create('HelcPAD.store.appworkspace.Contract.ContractHLineStore');
    	    			};
    	    			DataHLine.setData(res.ListOfHelPdaQuoteLines.HelPdaQuoteLines);
    	    			
    	    			var DataHLine2=Ext.data.StoreManager.get('ContractHLineStoreJL');
    	    			if(!DataHLine2){
    	    				DataHLine2=Ext.create('HelcPAD.store.appworkspace.Contract.ContractHLineStoreJL');
    	    			};
    	    			DataHLine2.setData(res.ListOfHelPdaQuoteLines.HelPdaQuoteLines);
    				}
    			}catch(err){
    				Ext.Msg.alert('合同行不存在');
    			};
    			
    		};
    		
    		//ERP的方法
    		var getResult1=function(res){
    			res=eval("(" + res +")");
    			if(res==undefined){
    				Ext.Msg.alert('数据不存在');
    				return;
    			};
    			obj.NextView('ContractDetailList_erp','HelcPAD.view.appworkspace.Contract.ContractDetailList_erp');
    			
    			var KJname=['CONTRACT_NO','CONTRACT_TYPE_NAME','SIGNER_EMP_NAME',
    			            'CUSTOMER_NUMBER','LARGE_CUSTOMER','SIGNER_COMPANY_NAME',
    			            'SIGNER_DATE','CUSTOMER_NAME','TRACKER_COMPANY_NAME','RESPER_EMP_NAME'];
    			//值
    			var Zname=[res.countract_header_info[0].CONTRACT_NO,res.countract_header_info[0].CONTRACT_TYPE_NAME,res.countract_header_info[0].SIGNER_EMP_NAME,
    			           res.countract_header_info[0].CUSTOMER_NUMBER,res.countract_header_info[0].LARGE_CUSTOMER,res.countract_header_info[0].SIGNER_COMPANY_NAME,
    			           res.countract_header_info[0].SIGNER_DATE,res.countract_header_info[0].CUSTOMER_NAME,res.elevator_list[0].TRACKER_COMPANY_NAME,res.countract_header_info[0].RESPER_EMP_NAME];
    			var nameleng=KJname.length;
    			for(var i=0;i<nameleng;i++){
    				Ext.getCmp(KJname[i]).setValue(Zname[i]);
    			};
    			var DataHeaders=Ext.data.StoreManager.get('ContractStore_erp_Headers');
    			if(!DataHeaders){
    				DataHeaders=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_Headers');
    			};
//    			res=eval("(" + res +")");
    //			cc.log('返回值res     '+res.countract_header_info[0]);
    			//cc.log('返回值3： '+JSON.stringify(res.data[0].contract_header_id));
    			DataHeaders.setData(res.elevator_list);
    			
    			var DataNolist=Ext.data.StoreManager.get('ContractStore_erp_Nolist');
    			if(!DataNolist){
    				DataNolist=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_Nolist');
    			};
    			DataNolist.setData(res.elevator_list);
    			
    			
    		};
    		
    		//查询参数
    		var myParam = {};
    		//条件
    		var params = {};
    		var num=0;
    		//判断来自哪个接口,ERP还是Siebel
    		var PAD_JK_PD=Ext.getCmp('PAD_JK_PD').getValue();
    		
    		if(PAD_JK_PD=='Siebel'){
    			var DataCs=Ext.data.StoreManager.get('ContractStore');
    			if(!DataCs){
    				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore');
    			};
        		myParam.appContractNo=DataCs.getAt(index).get('ContractNumber');
    			//alert(myParam.appContractNo);
    			num=11;
    			params.adpName = 'HttpAdapter_PAD_Siebel';
    			params.prodNmae = 'toSiebelcontractList';
    			params.prmName = myParam;
    			obj.connectServerComm(getResult,params,num);
    		}else if(PAD_JK_PD=='ERP'){
    			var DataCs=Ext.data.StoreManager.get('ContractStore');
    			if(!DataCs){
    				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore');
    			};
        		myParam.appContractNo=DataCs.getAt(index).get('contract_header_id');
//        		alert("myParam: " + myParam.appContractNo);
    			params.adpName = 'HttpAdapter_PAD_ERP';
    			params.prodNmae = 'toErpcontractNoList';
    			params.prmName = myParam;
    			obj.connectServer_erp_headers(getResult1,params);
    			///////////////////////////////////////////////////////
    		    //获取土建，布置完成时间
			    var getResult2=function(res){
			     // var resset=res.resultSet;
			      
			      var DataCs=Ext.data.StoreManager.get('ContractStore_erp_sql');
  				if(!DataCs){
  					DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_sql');
  				};
  				
  	            DataCs.setData(res.resultSet);
  	            
			    };
			    //合同号
			    var hth=DataCs.getAt(index).get('contract_no');
			    //alert(hth);
			    var params = {};
				params.adpName='SQLAdapter_erp';
				params.prodNmae='procedure3';
				params.p_elevaotr_id=hth;
				//alert(params.p_elevaotr_id);
				obj.connectServer_erp(getResult2,params);
    			
    			
    			
    			
    			
    		};
    		
    		
		}else{
			var sele=document.getElementsByName('groupkung_conlist');
			var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  };
		};
    },
    
    //合同资料页面   (无下达排产指令   的页面)   返回按钮
    contractDetail_FH:function(obj, e, eOpts){
    	//判断转向
    	var zzz=Ext.getCmp('ZhongZhuangZhan').getValue();
    	//alert(zzz);
    	if(zzz=='custominfo_id'){
    		//alert('进1');
    		this.showBackView('custominfo_id','HelcPAD.view.OpportunityManagement.CustomerInformation.CustomInfo');
    	}else{
    		//alert('进2');
    		this.showBackView('contractList','HelcPAD.view.appworkspace.Contract.ContractList');
        	//this.BackView();
        	//清空选框
    		var sele=document.getElementsByName('groupkung');
    		for(var i=0;i<sele.length;i++){
    			sele[i].style.color='#ccc';
    		};
    	};
    	
    },
    
    //erp合同资料页面   (无下达排产指令   的页面)   返回按钮
    contractDetaillist_FH:function(obj, e, eOpts){
    	this.showBackView('contractList','HelcPAD.view.appworkspace.Contract.ContractList');
    	var DataCs=Ext.data.StoreManager.get('ContractStore_erp_search');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_search');
		};
        DataCs.setData([]);
		var DataCs1=Ext.data.StoreManager.get('ContractStore_erp_elebox_list');
		if(!DataCs1){
			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_elebox_list');
		};
		DataCs1.setData([]);
    	
    },
    
    //合同资料页面 list进入(无下达排产指令   的页面)
    contractDetail_list:function(dataview, index, target, record, e, eOpts){

    	//判断是Siebel还是ERP
    	var PAD_JK_PD=Ext.getCmp('PAD_JK_PD').getValue();
    	//判断
		if(PAD_JK_PD=='Siebel'){
			obj.NextView('contracthang_id','HelcPAD.view.appworkspace.Contract.ContractHang');
			//数据仓
			var DataHLine=Ext.data.StoreManager.get('ContractHLineStore');
			if(!DataHLine){
				DataHLine=Ext.create('HelcPAD.store.appworkspace.Contract.ContractHLineStore');
			};
			//判断是直梯还是扶梯
			var TZPD=DataHLine.getAt(index).get('ProdCategory');
			//特别对待
			var czm=DataHLine.getAt(index).get('CZM');
			if(TZPD=='直梯'){
				Ext.getCmp('CHang_Jd').setHidden(true);
				Ext.getCmp('CHang_Fttsgd').setHidden(true);
				Ext.getCmp('CHang_CZM').setValue(czm);
			}else if(TZPD=='扶梯'){
				Ext.getCmp('CHang_Attrib1').setHidden(true);
				if(czm=='//'){
					Ext.getCmp('CHang_CZM').setHidden(true);
				}else{
					Ext.getCmp('CHang_CZM').setValue(czm);
				};
			};
			
			//仓数组
			var Csz=['AssetNumber','ProductName','SpNumber',
			         'Fttsgd','Jd','EquipMark',
			         'Attrib1','Attrib2'];
			//文本数组
			var WBsz=['CHang_AssetNumber','CHang_ProductName','CHang_SpNumber',
			          'CHang_Fttsgd','CHang_Jd','CHang_EquipMark',
			          'CHang_Attrib1','CHang_Attrib2'];
			
			var num=WBsz.length;
			for(var i=0;i<num;i++){
				Ext.getCmp(WBsz[i]).setValue(DataHLine.getAt(index).get(Csz[i]));
			};
			
		}else if(PAD_JK_PD=='ERP'){
			obj.NextView('boxinfo','HelcPAD.view.appworkspace.Contract.BoxInfo');
		};
    	

    },
    
    //过滤
    GL_contractDetail_field:function(obj, e, eOpts){
    	//cc.log(Ext.getCmp('GL_contractDetail_field').getValue());
    	var pd=Ext.getCmp('GL_contractDetail_field').getValue();
    	//先判断工号
    	var DataCs=Ext.data.StoreManager.get('ContractHLineStoreJL');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractHLineStoreJL');
		};
		//判断
		var num=DataCs.getCount();
		var DA=[];
		var JiSuan=0;
		for(var i=0;i<num;i++){
			var AssetNumber=DataCs.getAt(i).get('AssetNumber');
			if(AssetNumber.indexOf(pd)>=0){
				DA[JiSuan]=DataCs.getAt(i);
				JiSuan++;
			};
		};
		/*cc.log(DataCs.getAt(0));
		var DA=[];
		DA[0]=DataCs.getAt(0);
		DA[1]=DataCs.getAt(1);*/
		//修改显示数据仓
		var DataHLine=Ext.data.StoreManager.get('ContractHLineStore');
		if(!DataHLine){
			DataHLine=Ext.create('HelcPAD.store.appworkspace.Contract.ContractHLineStore');
		};
		DataHLine.setData(DA);
		
    },
    
    GL_contractDetail_field_clert:function(obj, e, eOpts ) {
    	var DataCs=Ext.data.StoreManager.get('ContractHLineStoreJL');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractHLineStoreJL');
		};
		//判断
		var num=DataCs.getCount();
		var DA=[];
		var JiSuan=0;
		for(var i=0;i<num;i++){
			DA[JiSuan]=DataCs.getAt(i);
			JiSuan++;
		};
		var DataHLine=Ext.data.StoreManager.get('ContractHLineStore');
		if(!DataHLine){
			DataHLine=Ext.create('HelcPAD.store.appworkspace.Contract.ContractHLineStore');
		};
		DataHLine.setData(DA);
    },
    
    //箱头进度信息页面  返回按钮
    boxinfo_FH:function(){
    	this.showBackView('ContractDetail_erp','HelcPAD.view.appworkspace.Contract.ContractDetail_erp');
    	var DataCs=Ext.data.StoreManager.get('ContractStore_erp_BoxInfo');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_BoxInfo');
		};
		DataCs.setData([]);
    	
    },
    
    //员工列表页面  返回按钮
    contractnoList_FH:function(){
    	this.showBackView('contractList','HelcPAD.view.appworkspace.Contract.ContractList');
    	Ext.getCmp('PAD_JK_PD').setValue('ERP');
    	//this.BackView();
    },
    
    //下达排产指令
    schedule:function(){
    	this.NextView('produceApply','HelcPAD.view.appworkspace.Contract.ProduceApply');
    },
    
    //下达指标页面的返回
    produceApply_FH:function(){
        this.showBackView('contractList','HelcPAD.view.appworkspace.Contract.ContractList');
        //this.BackView();
    },
    
    //下达指标页面的提交
    produceApply_TJ:function(){
    	Ext.Msg.alert('提交成功！');
    	this.showBackView('contractList','HelcPAD.view.appworkspace.Contract.ContractList');
    	//this.BackView();
    },
    

    searchfield:function(obj,e,eOpts){
    	var DataCs2=Ext.data.StoreManager.get('ContractStore_erp_BoxInfo_search');
		if(!DataCs2){
			DataCs2=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_BoxInfo_search');
		};
		
    	var DataCs1=Ext.data.StoreManager.get('ContractStore_erp_elebox_list');
		if(!DataCs1){
			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_elebox_list');
		};
	   
		var ve=obj.getValue();
		var i,length=DataCs2.getCount();
		//alert(DataCs2.getCount())
		var newdata=[];
		var count=0;
		for(i=0;i<length;i++){	
			var data1=DataCs2.getAt(i).get("ELVBOX_NAME");
			var data2=DataCs2.getAt(i).get("ELVBOX_DESC");
			if(data1.indexOf(ve)>=0||data2.indexOf(ve)>=0){
				newdata[count]=DataCs2.getAt(i);
				count++;
				//cc.log(obj.getValue());
			}
		}
		DataCs1.setData(newdata);
    },
    
    
    searchno:function(obj,e,eOpts){
    	var DataCs2=Ext.data.StoreManager.get('ContractStore_erp_Nolist');
    	if(!DataCs2){
    		DataCs2=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_Nolist');
    	};
    	
    	var DataCs1=Ext.data.StoreManager.get('ContractStore_erp_Headers');
		if(!DataCs1){
			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_Headers');
		};
    	
    	var ve=obj.getValue();
    	var i,length=DataCs2.getCount();
    	//alert(DataCs2.getCount())
    	var newdata=[];
    	var count=0;
    	for(i=0;i<length;i++){	
    		var data1=DataCs2.getAt(i).get("ELEVATOR_NO");
    		var data2=DataCs2.getAt(i).get("EQUIPMENT_NO");
    		if(data1.indexOf(ve)>=0 || data2.indexOf(ve)>=0){
    			newdata[count]=DataCs2.getAt(i);
    			count++;
    			//cc.log(obj.getValue());
    		}
    	}
    	DataCs1.setData(newdata);
    },

    //合同行资料 返回
    contracthang_id_FH:function(){
    	this.showBackView('contractDetail','HelcPAD.view.appworkspace.Contract.ContractDetail');
    },
    
    contractDetail_list_erp:function(dataview, index, target, record, e, eOpts){
    	var obj=this;
    	
    ///////////////////////////////////////////////////////////////////
    	var DataCs1=Ext.data.StoreManager.get('ContractStore_erp_elebox_list');
		if(!DataCs1){
			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_elebox_list');
		};
		//cc.log(DataCs1.getData());
		//cc.log(JSON.stringify(DataCs1.getCount()));
		//var i;
		var params = {};
		params.adpName='HttpAdapter_PAD_ERP';
		params.prodNmae='toERP_BoxInfo';
		//params.p_elevaotr_id=336257;
		
		var getResult2=function(res){
			res=res.ELVBOX_INFOResponse["return"];
			res=eval("(" + res +")");
		    //cc.log(res.data[0]);
		    
		    if(res==null||res==undefined){
				Ext.Msg.alert("查无数据");
				return;
			};

			var DataCs=Ext.data.StoreManager.get('ContractStore_erp_BoxInfo');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_BoxInfo');
			};
			DataCs.setData(res.data);
			
			  //显示内容
	    	var data=[];
	    	data[0]='ELVBOX_NAME';
	    	data[1]='ELVBOX_DESC';
	    	//data[2]='ELV_NEED_BY_DATE_MIR';
	    	data[2]='STORE_DATE';
	    	data[3]='PLAN_TYPE_MEANING';
	    	data[4]='SUBINV_NAME';
	    	data[5]='SIGNIN_DATE';
	    	data[6]='CONSIGNED_FLAG';
	    	data[7]='APPROVED_FLAG';
	    	data[8]='PLAN_CONSIGN_DATE';
	    	data[9]='DEMAND_ARRIVE_DATE';
	    	data[10]='HOLD_FLAG';
	    	data[11]='LIST_HOLD_FLAG';
	    	data[12]='INV_OUT_DATE';
	    	
	 
			//cc.log("dasda"+DataCs.getCount()+index);
			
	    	for(var i=0;i<data.length;i++){
	    	
	    		Ext.getCmp(data[i]).setValue(DataCs.getAt(0).get(data[i]));
	    		//Ext.getCmp(data[i]).setValue(record.get(data[i]));
	    	};
	    	Ext.getCmp('ELV_NEED_BY_DATE_MIR').setValue(DataCs.getAt(0).get('ELV_NEED_BY_DATE_MIR').substr(0,10));
			
		};
		 params.p_elevaotr_id=DataCs1.getAt(index).get("ELVBOX_ID");
		 //cc.log("kkk"+params.p_elevaotr_id);
	     obj.connectServer_erp(getResult2,params);
        this.NextView('BoxInfo_zt','HelcPAD.view.appworkspace.Contract.BoxInfo_zt');
    
        
    },
    contractList_nolist:function(dataview, index, target, record, e, eOpts){
    	
    	var Datans=Ext.data.StoreManager.get('ContractStore_erp_Headers');
		if(!Datans){
			Datans=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_Headers');
		};
    	var ghid=Datans.getAt(index).get('ELEVATOR_ID');
    	var gh=Datans.getAt(index).get('ELEVATOR_NO');
    

		//获取ERP结果
  			var getResult1=function(res){
			res=res.ELEVATOR_INFOResponse["return"];
			//cc.log(res);
			res=eval("(" + res +")");
			//cc.log(res);
		    //cc.log(res.elebox_list[0]);
			
			if(res==null||res==undefined){
				Ext.Msg.alert("查无数据");
				return;
			};
			
//			if(res.elevator_info.length==0||res.elebox_list.length==0){
//				Ext.Msg.alert("查无数据");
//				return;
//			};
			
	
			
			var DataCs=Ext.data.StoreManager.get('ContractStore_erp_search');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_search');
			};
            DataCs.setData(res.elevator_info);
			var DataCs1=Ext.data.StoreManager.get('ContractStore_erp_elebox_list');
			if(!DataCs1){
				DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_elebox_list');
			};
			DataCs1.setData(res.elebox_list);
			
			var DataCs2=Ext.data.StoreManager.get('ContractStore_erp_BoxInfo_search');
			if(!DataCs2){
				DataCs2=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_BoxInfo_search');
			};
			DataCs2.setData(res.elebox_list);
			
			//页面显示数据
			var name=[];
			name[0]='CURRENT_NODE_NAME';
			name[1]='CURRENT_PROCESS_NODE';
			name[2]='PERCENT_RATE';
			name[3]='DELIVERY_DATE';
		    name[4]='GH_CYCLE_DATE';
		    name[5]='MAKE_DAY';
		    name[6]='DESIGN_DAY';
		    name[7]='PARALLEL_CONTROL_GH';
		    
		    name[8]='LC_SJWCRQ';
		    name[9]='LIST_PUBLISHED_DATE';
		    name[10]='COMPLETE_CONFIRM_DATE';
		    name[11]='ONHOLD_STATUS';
		    name[12]='ONHOLD_DESC';
		    name[13]='LC_SJCCRQ_SC';
		    name[14]='LC_CCRQ_SC';
		    name[15]='INSTALL_ADDRESS';
		    name[16]='DELIVERY_METHOD_NAME';
		    name[17]='AGE_STORE_DAYS';
		    name[18]='CONSIGNED_FLAG';
		    name[19]='APPROVED_FLAG';
		    name[20]='ELVBOX_CONSIGNED_FLAG';
		    name[21]='ELVBOX_APPROVED_FLAG';
		    name[22]='DJ_EMP_NAME';
		    name[23]='MAKE_ORGANIZATION_NAME';
		    name[24]='DESIGN_ORGANIZATION_NAME';
            
		    for(var i=0;i<name.length;i++){
		    	
		    	Ext.getCmp(name[i]).setValue(DataCs.getAt(0).get(name[i]));

		    };


		};
		    var params = {};
			params.adpName='HttpAdapter_PAD_ERP';
			params.prodNmae='toERPcontractSeacher';
			params.p_elevaotr_id=ghid;
			//alert(params.p_elevaotr_id);
			this.connectServer_erp(getResult1,params);
			this.NextView('ContractDetail_erp','HelcPAD.view.appworkspace.Contract.ContractDetail_erp');
		///////////////////////////////////////////////////////////////////////////	
		   //带出土建，布置完成时间
			 var Datasql=Ext.data.StoreManager.get('ContractStore_erp_sql');
				if(!Datasql){
					Datasql=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_sql');
				};
			//cc.log("4555555"+Datasql.getCount()+"12132"+gh);
			
			
		    for(var i=0;i<Datasql.getCount();i++){
	              //cc.log(Datasql.getAt(i).get('UnitNo'));
			      if(Datasql.getAt(i).get('UnitNo')!=null && Datasql.getAt(i).get('UnitNo').indexOf(gh)>=0 )
			       {
			    	  var data=Datasql.getAt(i).get('CompliteDate').substr(0,10);
			    	  
			    	  //cc.log('12121111'+Datasql.getAt(0).get('CompliteDate'));
			    	  
			    	  if(Datasql.getAt(i).get('DrawingType')=='土建')
			    		  
			    		  Ext.getCmp('tjenddate').setValue(data);
			    	  else if(Datasql.getAt(i).get('DrawingType')=='布置')
			    		  Ext.getCmp('bzenddate').setValue(data);
			       };
			      //Ext.getCmp('tjenddate').setValue(DataCs.getAt(0).get('CompliteDate'));
			      };
			
    },
    contractDetail_FH_erp:function(){
    	this.showBackView('ContractDetailList_erp','HelcPAD.view.appworkspace.Contract.ContractDetailList_erp');
        
    },
    
    boxinfo_list:function(dataview, index, target, record, e, eOpts){
    	
    	this.NextView('BoxInfo_zt','HelcPAD.view.appworkspace.Contract.BoxInfo_zt');
    	//显示内容
    	var data=[];
    	data[0]='ELVBOX_NAME';
    	data[1]='ELVBOX_DESC';
    	//data[2]='ELV_NEED_BY_DATE_MIR';
    	data[2]='STORE_DATE';
    	data[3]='PLAN_TYPE_MEANING';
    	data[4]='SUBINV_NAME';
    	data[5]='SIGNIN_DATE';
    	data[6]='CONSIGNED_FLAG';
    	data[7]='APPROVED_FLAG';
    	data[8]='PLAN_CONSIGN_DATE';
    	data[9]='DEMAND_ARRIVE_DATE';
    	data[10]='HOLD_FLAG';
    	data[11]='LIST_HOLD_FLAG';
    	data[12]='INV_OUT_DATE';
    	
    	//cc.log("hahah"+record.get('plan_consign_date'));
    	for(var i=0;i<data.length;i++)
    	{
    		
    		Ext.getCmp(data[i]).setValue(record.get(data[i]));
    		
    	};
    	
    	Ext.getCmp('ELV_NEED_BY_DATE_MIR').setValue(record.get('ELV_NEED_BY_DATE_MIR').substr(0,10));
    },
    BoxInfo_zt_fh:function(){
    	var DataCs=Ext.data.StoreManager.get('ContractStore_erp_BoxInfo');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_BoxInfo');
		};
		DataCs.setData([]);
    	this.showBackView('ContractDetail_erp','HelcPAD.view.appworkspace.Contract.ContractDetail_erp');
    	
    	
    },
    ContractDetail_erp_bt:function(){
    	
    	this.NextView('ContractpcjlList','HelcPAD.view.appworkspace.Contract.ContractpcjlList');
    	var getResult1=function(res){
    	res=res.ALREADY_SCHEDULEResponse["return"];
    	res=eval("(" + res +")");
    	//cc.log(res);
    	//cc.log(res.data[0]);
    	
    	 if(res==null||res==undefined){
				Ext.Msg.alert("查无数据");
				return;
			};
		 if(res.data.length==0){
			 Ext.Msg.alert("查无数据");
			 return;
		 }
    	
    	var DataCs1=Ext.data.StoreManager.get('ContractpcjlList_pcjl');
		if(!DataCs1){
			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractpcjlList_pcjl');
		};
		DataCs1.setData(res.data);
		
    	};
    	
    	var DataCs=Ext.data.StoreManager.get('ContractStore_erp_search');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_search');
		};
		var id=DataCs.getAt(0).get('SCHEDULE_HEADER_ID');
	
		//cc.log("dasdad"+id);
    	var params = {};
		params.adpName='HttpAdapter_PAD_ERP';
		params.prodNmae='toErppcjl';
		params.p_elevaotr_id=id;
		//alert(params.p_elevaotr_id);
		this.connectServer_erp(getResult1,params);
       },
       
       ContractpcjlList_FH:function(){
    	   this.showBackView('ContractDetail_erp','HelcPAD.view.appworkspace.Contract.ContractDetail_erp');
    		var DataCs1=Ext.data.StoreManager.get('ContractpcjlList_pcjl');
    		if(!DataCs1){
    			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractpcjlList_pcjl');
    		};
    		DataCs1.setData([]);
    	   
    	   
       },
       searchfield_c:function(){
    	   var DataCs2=Ext.data.StoreManager.get('ContractStore_erp_BoxInfo_search');
   		if(!DataCs2){
   			DataCs2=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_BoxInfo_search');
   		};
   		
       	var DataCs1=Ext.data.StoreManager.get('ContractStore_erp_elebox_list');
   		if(!DataCs1){
   			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_elebox_list');
   		};
   	
   		//cc.log(DataCs2.getCount());
   		var newdata=[];
        for(var i=0;i<DataCs2.getCount();i++)
   		   {
        	    newdata[i]=DataCs2.getAt(i);
        	    
   		   };
        DataCs1.setData(newdata);
    	},
    	
    	searchfield_no:function(){
     	   var DataCs2=Ext.data.StoreManager.get('ContractStore_erp_Nolist');
     	   if(!DataCs2){
     		   DataCs2=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_Nolist');
     	   };
     	   
     	   var DataCs1=Ext.data.StoreManager.get('ContractStore_erp_Headers');
 	   		if(!DataCs1){
 	   			DataCs1=Ext.create('HelcPAD.store.appworkspace.Contract.ContractStore_erp_Headers');
 	   		};
     	   
     	   //cc.log(DataCs2.getCount());
     	   var newdata=[];
     	   for(var i=0;i<DataCs2.getCount();i++)
     	   {
     		   newdata[i]=DataCs2.getAt(i);
     		   
     	   };
     	   DataCs1.setData(newdata);
        },
});


Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
		res.push(this[i]);
			json[this[i]] = 1;
		};
	}
	return res;
};