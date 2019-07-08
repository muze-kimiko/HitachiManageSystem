
/* JavaScript content from app/controller/OpportunityManagement/Director/ClueNewCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Director.ClueNewCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//list
			
			"list#ClueNew_id_list":{
				itemtap:'ClueNew_id_list',
				initialize:'ClueNew_id_list_XL',
			},
			
		}
	},

	ClueNew_id_list:function(dataview, index, target, record, e, eOpts){
		var yz=record.data.Id;
		if(yz=='1'){
			return;
		};
		//“代理商报备”/“主管线索处理”/“营业员线索处理”
		var obj=this;
		this.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').TDlistNum=index;
		cc.log('index:'+index);
		var dataID=record.data.Id;
		cc.log(dataID);
		getResult=function(obj,data){
				obj.BCIData=data;//用于验证
				obj.JRZGXS(obj,data);
		};
		obj.clueDirector_GGFF(obj,dataID,getResult);
	},
	
	//公共读取线索详细信息
	clueDirector_GGFF:function(obj,dataID,FangFa){
		getResult=function(obj,data){
			FangFa(obj,data);
		};
		var Trim={};
		Trim.id=dataID;
		Trim.userID=userID;
		obj.ClueDirector_list_GGFF(obj,Trim,getResult);
	},
	
	ClueDirector_list_GGFF:function(obj,Trim,FangFa){
		getResult=function(obj,data){
			FangFa(obj,data);
		};
		obj.ToDoClueDirector_ZG_DCLXS(obj,getResult,Trim,2);
	},
	
	//公共的进入详细信息页面
	//进入线索详细信息公共方法
	JRZGXS:function(obj,data){
		//线索跟踪人
		obj.xsgz='';
		//没有      有一条   有多条
		var xsggr=data.ListOfHELLead_AgentPosition.HELLead_AgentPosition;
		var xsggrZY='';
		var xsZ=[];
		if(xsggr){
			cc.log('存在');
			cc.log(xsggr);
			var xsggrNum=xsggr.length;
			if(xsggrNum==undefined){
				xsZ=[ggxs(xsggr)];
			}else{
				for(var i=0;i<xsggrNum;i++){
					xsZ[i]=ggxs(xsggr[i]);
				};
			};
			
			function ggxs(xs){
				if(xs.IsPrimaryMVG=='Y'){
					xsggrZY=xs.AgentSalesRep;
				};
				var jq=xs.AgentSalesRep;
				var xJq=jq.split(' ');
				cc.log(xJq);
				var trim={};
				trim.Name=xs.AgentPosition;//: "HEL_汕头司_报价员"
				trim.PositionId=xs.AgentPositionId;//: "1-R9I1A"
				trim.Id=xs.AgentPositionId;
				trim.ActiveLastName=xJq[0]; //"陆 佳慧"
				trim.ActiveFirstName=xJq[1];
				trim.LastName=xJq[0]; //"陆 佳慧"
				trim.FirstName=xJq[1];
				trim.PrimaryEmployeeId=xs.AgentSalesRepId;//: "1-R9I13"
				trim.ActiveLoginName=xs.AgentSalesRepLogin;//: "6405"
				trim.isPrimaryMVG=xs.IsPrimaryMVG; //"Y";
				trim.Division=xs.PrimaryOrganization;  //所属司
				
				return trim;
			};
			
		}else{
			cc.log('不存在');
		};
		cc.log('线索跟踪人');
		cc.log(xsZ);

		
		//团队成员  只有在做 "分派营业员"的时候才会用到,如果团队成员有数据,就把线索跟踪人员的数据加入进去。
		var tdcy=data.ListOfHELLead_Position.HELLead_Position;
		var XStdcy='';//主要人
		var YCtdcy=[];//所有人
		if(tdcy){
			cc.log('存在团队成员');
			var Num=tdcy.length;
			if(Num==undefined){
				YCtdcy=[td(tdcy)];
			}else{
				//转换
				for(var i=0;i<Num;i++){
					YCtdcy[i]=td(tdcy[i]);
				};
			};
			//公共方法
			function td(tdcy){
				//主要人   暂时以线索跟踪人的为准   2016-6-21
				/*if(tdcy.IsPrimaryMVG=='Y'){
					XStdcy=tdcy.SalesRep;
				};*/
				var jq=tdcy.SalesRep;
				var xJq=jq.split(' ');
				cc.log(xJq);
				var trim={};
				trim.ActiveLastName=xJq[0]; //"陆 佳慧"
				trim.ActiveFirstName=xJq[1];
				trim.LastName=xJq[0]; //"陆 佳慧"
				trim.FirstName=xJq[1];
				
				trim.IsPrimaryMVG=tdcy.IsPrimaryMVG; //"Y";
				trim.ActiveLoginName=tdcy.SalesLoginName;     //  团队成员登录ID
				trim.Id=tdcy.PositionId;                      //团队成员职位ID
				trim.PrimaryEmployeeId=tdcy.SalesRepId;      //"1-QYKBIK"

				trim.Name=tdcy.Position;//: "HEL_汕头司_报价员"
				trim.Division=tdcy.Division;  //所属司
				
				return trim;
			};
		}else{
			cc.log('不存在');
		};
		cc.log(YCtdcy);
		cc.log('团队成员=======');
		
		
		
		cc.log(data);
		cc.log(data.LeadSource);
		//判断来源
		var LeadSource=data.LeadSource;
		//线索来源
		obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource=LeadSource;
		//线索状态
		obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadStatus=data.LeadStatus;
		//商机地址
		obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').StreetAddress=data.StreetAddress;
		//线索地址
		obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').BCIImportAddress=data.BCIImportAddress;
		if(LeadSource=='经销商'){
			obj.NextView('clueHandleDirector','HelcPAD.view.OpportunityManagement.Director.ClueHandleDirector');
			//obj.getApplication().getController('login.PADMainCtrl').RK='营业员线索';
			//不同的地方
			//线索类型   线索子类型    预计签约年    预计签约月
			//线索处理时间   代理商状态   任务业绩   业绩台量
			var yc=['Clue_opptyCategory','Clue_opptySubCategory','Clue_PredictSignYear','Clue_PredictSignMonth',
			        'Clue_DealWithTime','Clue_supplierStatus','Clue_taskAchieve','Clue_achieveNum'];
			for(var i=0;i<yc.length;i++){
				Ext.getCmp(yc[i]).setHidden(false);
			};
			
			//自定义按钮
			obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').clueHandleDirectorDJFF(obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl'));
			
			//只有线索状态为“审批中” 才能执行操作  2015-12-07
			/*if(data.LeadStatus!='审批中'){
				$("#clueHandleDirector_CZZX").hide();
				$("#clueHandleDirector_SYY").addClass('kTwo ysBlue anOne');
			};*/
			
			//主管驳回意见 下拉列表
			var BH=obj.extractionData('HEL_LEAD_MGR_RJT_COMMENTS');
			cc.log(BH);
			var XLdata="[";
			XLdata+="{'value':'请选择','text':'请选择'},";
			for(var i=0;i<BH.length;i++){
				if(i!=BH.length-1){
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'},";
				}else{
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'}";
				};
			};
			XLdata+="]";
			Ext.getCmp('Clue_ManagerRejectComments').setOptions(eval(XLdata));
			
			//主管操作
			var BH=obj.extractionData('HEL_LEAD_APPROVE_OPERATE');
			cc.log('主管操作--------');
			cc.log(BH);
			var XLdata="[";
			XLdata+="{'value':'请选择','text':'请选择'},";
			for(var i=0;i<BH.length;i++){
				if(i!=BH.length-1){
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'},";
				}else{
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'}";
				};
			};
			XLdata+="]";
			Ext.getCmp('Clue_ApproveOperate').setOptions(eval(XLdata));

			//填充值
			var clueHandleDirector_BCI = Ext.getCmp('clueHandleDirector');
			var clueModel = Ext.create('HelcPAD.model.OpportunityManagement.Agents.ClueDetailModel',data);
			clueHandleDirector_BCI.setRecord(clueModel);
			
			//给予线索跟踪人
			Ext.getCmp('clueHandleDirector_XSGZR').setValue(JSON.stringify(xsZ));
			Ext.getCmp('Clue_XSGZR').setValue(xsggrZY);
			
			var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
			cc.log('线索入口:'+RK);
			if(RK=='营业员线索'){
				Ext.getCmp('clueHandleDirector_id_toolbar').setTitle('营业员处理线索');
			};
			
			//给予主要团队成员
			//cc.log('POP：'+XStdcy);
			//Ext.getCmp('Clue_TDCY').setValue(XStdcy);
			//给予团队成员
			Ext.getCmp('clueHandleDirector_TDCY').setValue(JSON.stringify(YCtdcy));
			
		}else if(LeadSource=='外部线索'){//来源 BCI
			//2015-11-30  暂时没有代理BCI接口
			//Ext.Msg.alert("温馨提示","现阶段无BCI接口,功能暂不开放");
			//return;
			obj.NextView('clueHandleDirector_BCI','HelcPAD.view.OpportunityManagement.Director.ClueHandleDirector_BCI');
			//自定义按钮
			obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').clueHandleDirectorDJFF(obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl'));
			cc.log('BCI线索详细信息');
			cc.log(data.LeadStatus);
			cc.log(data);
			var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
			cc.log('线索入口:'+RK);
			if(RK=='营业员线索'){
				Ext.getCmp('clueHandleDirector_BCI_id_toolbar').setTitle('营业员处理线索_BCI');
			};
			
			//只有线索状态为“审批中” 才能执行操作  2016-05-27
			/*if(data.LeadStatus!='审批中'){
				$("#clueHandleDirector_CZZX").hide();
				$("#clueHandleDirector_SYY").addClass('kTwo ysBlue anOne');
			};*/
			
			//填充值
			var clueHandleDirector_BCI = Ext.getCmp('clueHandleDirector_BCI');
			var clueModel = Ext.create('HelcPAD.model.OpportunityManagement.Agents.ClueDetailModel',data);
			clueHandleDirector_BCI.setRecord(clueModel);
			
			//主管驳回意见 下拉列表
			var BH=obj.extractionData('HEL_LEAD_MGR_RJT_COMMENTS');
			cc.log(BH);
			var XLdata="[";
			XLdata+="{'value':'请选择','text':'请选择'},";
			for(var i=0;i<BH.length;i++){
				if(i!=BH.length-1){
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'},";
				}else{
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'}";
				};
			};
			XLdata+="]";
			Ext.getCmp('BCI_ManagerRejectComments').setOptions(eval(XLdata));
			
			//主管操作
			var BH=obj.extractionData('HEL_LEAD_APPROVE_OPERATE');
			cc.log(BH);
			var XLdata="[";
			XLdata+="{'value':'请选择','text':'请选择'},";
			for(var i=0;i<BH.length;i++){
				if(i!=BH.length-1){
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'},";
				}else{
					XLdata+="{'value':'"+BH[i].LIS_VAL+"','text':'"+BH[i].LIS_VAL+"'}";
				};
			};
			XLdata+="]";
			Ext.getCmp('BCI_ApproveOperate').setOptions(eval(XLdata));
			
			//给予线索跟踪人
			Ext.getCmp('BCI_clueHandleDirector_XSGZR').setValue(JSON.stringify(xsZ));
			Ext.getCmp('BCI_XSGZR').setValue(xsggrZY);
			
			//给予团队成员
			Ext.getCmp('BCI_clueHandleDirector_TDCY').setValue(JSON.stringify(YCtdcy))
		};
		
	},
	
	ClueNew_id_list_XL:function(){
		var obj=this;
		Ext.getCmp('ClueNew_id_list').setPlugins([
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
		        		//var ZH=Ext.getCmp('clueListDirector_hidden').getValue();
		        		//cc.log(ZH);
		        		//查询语句
		    	    
		    			cc.log('下拉刷新语句：'+obj.getApplication().getController('login.PADMainCtrl').CXXS_ZH);
		    			
		        		var tmpStore = this.getList().getStore(); //这个方法表示调用当前list的store中的数据
		        		var tmpStoreNum=tmpStore.data.items.length;
		                cc.log(tmpStoreNum);
		                tmpStoreNum=tmpStoreNum/2;
		                cc.log(tmpStoreNum);
		                tmpStore.setData([]);
		                var Flag=true;
		                if(tmpStoreNum<20){
		                    xlsxNum=0;
		                    var htmel=['<table border=0 width=100%>',
		                               '    <tr><td width=30%>{Id}</td><td width=70%>{SubmitDate}</td></tr>',
		                               '    <tr><td width=30%>{RegistrationPerson}</td><td width=70%>{ProjectName}</td></tr>',
		                               '    <tr><td colspan=2>{AgentName}</td></tr>',
		                               '    <tr><td colspan=2>{StreetAddress}</td></tr>',
		                               '</table>'];
							Ext.getCmp('ClueNew_id_list').setItemTpl(htmel);
		                }else{
		                    xlsxNum=xlsxNum+20;
		                    Flag=false;
		                };
		                cc.log(xlsxNum);
		                //跟新
						getResult=function(result){
							try{
								//公用数据仓
								var DataClue=Ext.data.StoreManager.get('ClueDirectorXSCXStore');
								if(!DataClue){
									DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueDirectorXSCXStore');
								};
								
								var NumOutputObjects=result.invocationResult.QueryLeadPage_Output.NumOutputObjects;
								var data=result.invocationResult.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead;
								if(NumOutputObjects==0){
									DataClue.setData([{Id:'1'}]);
									var htmel=['<div style="font-size:18px;width:100%">'+
								            	'<div style="float:left;width:100%">已查询到最后一页,下拉刷新重回第一页</div>'+
								            	'</div>'];
									Ext.getCmp('ClueNew_id_list').setItemTpl(htmel);
									return;
								};
								try{
									if(data.length<=0){
										//alert(12312);
										if(NumOutputObjects==0){
											DataClue.setData([{Id:'1'}]);
											var htmel=['<div style="font-size:18px;width:100%">'+
										            	'<div style="float:left;width:100%">已查询到最后一页,刷新重回第一页</div>'+
										            	'</div>'];
											Ext.getCmp('ClueNew_id_list').setItemTpl(htmel);
											return;
										};
									};
								}catch(e){
									Ext.Msg.alert("温馨提示","系统报错,请与后台管理员联系");
									return;
								};
								//cc.log('--------=====');
								//cc.log(data);
								
								DataClue.setData(data);
							}catch(e){
								var starErr='';
								try{
									starErr=result.invocationResult.QueryLeadPage_Output.ErrorMsg;
								}catch(e){
									starErr=result.invocationResult.Fault.detail.siebdetail.errorstack.error.errormsg;
								}
								Ext.Msg.alert("温馨提示",starErr);
							};
							
						};
						var Trim={};
						Trim.NewQuery=Flag;
						Trim.SearchSpec=obj.getApplication().getController('login.PADMainCtrl').CXXS_ZH;
						Trim.PageSize='20';
						Trim.SortSpec='Created(DESCENDING)';
						
						//判断是营业员的线索查询还是主管的线索查询
						var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
						if(RK=='营业员线索'){
							Trim.ViewMode='Sales Rep';
						}else if(RK=='主管线索'){
							Trim.ViewMode='Organization';
						};
						
						Trim.StartRowNum=xlsxNum;
						Trim.userID=userID;
						Trim.adapter='HttpAdapter_PAD_Custom',  //Adapter名字
						Trim.procedure='clueListQuery',  //Adapter方法名
						cc.log(Flag);
						obj.XCX_GG_FF_NOT(obj,getResult,Trim);
		            },
		         },
		     },
		]);
		
	},
	
	ClueNew_onClack:function(obj){
		//上一页  
	    var SYY=document.getElementById('ClueNew_id_SYY');
	    SYY.onclick = function (){
	    	obj.BackView();
	    };
	    //查询
	    var CX=document.getElementById('ClueNew_id_CX');
	    CX.onclick = function (){
	    	//请线索编号
	    	var LeadId=$('#ClueNew_id_XSBH').val();
			//项目名称
	    	var ProjectName=$('#ClueNew_id_XMMC').val();
	    	//线索状态
	    	var LeadStatus=$("#ClueNew_id_select option:selected").val();
	    	//来源
	    	var Source=$("#ClueNew_id_select_Two option:selected").val();
	    	//条件
	    	var ZH='';
			if(LeadId!=''){
				if(ZH==''){
					ZH+='[HEL Lead.Id] like '+"'*"+LeadId+"*'"+'  ';
				}else{
					ZH+=' and [HEL Lead.Id] like '+"'*"+LeadId+"*'";
				};
			};
			if(ProjectName!=''){
				if(ZH==''){
					ZH+='[HEL Lead.Project Name] like '+"'*"+ProjectName+"*'"+'  ';
				}else{
					ZH+=' and [HEL Lead.Project Name] like '+"'*"+ProjectName+"*'"+'  ';
				};
			};
			if(LeadStatus!=''){
				if(ZH==''){
					ZH+='[HEL Lead.Lead Status] like  '+"'"+LeadStatus+"'"+'  ';
				}else{
					ZH+=' and [HEL Lead.Lead Status] like  '+"'"+LeadStatus+"'"+'  ';
				};
			};
			if(Source!==''){
				if(ZH==''){
					ZH+='[HEL Lead.Lead Source] like '+"'"+Source+"'";
				}else{
					ZH+=' and [HEL Lead.Lead Source] like '+"'"+Source+"'";
				};
			};
			var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
			if(RK=='营业员线索'){
				ZH+=' and EXISTS([HEL Lead.Agent Sales Rep Login] = '+"'"+userID+"')";
			};
			obj.getApplication().getController('login.PADMainCtrl').CXXS_ZH='';
			obj.getApplication().getController('login.PADMainCtrl').CXXS_ZH=ZH;
			cc.log('查询条件：'+ZH);
	    	object.getController('OpportunityManagement.Director.ClueNewCtrl').Clue_Public(obj,ZH,false);
	    };
	},

	//线索查询用于公共查询 数量 
	Clue_Public:function(obj,ggZH,GandNG){
		
		getResult=function(obj,data,NumOutputObjects){
			//公用数据仓
			var DataClue=Ext.data.StoreManager.get('ClueDirectorXSCXStore');
			if(!DataClue){
				DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueDirectorXSCXStore');
			};
			
			if(NumOutputObjects==0){
				if(!GandNG){
					Ext.Msg.alert("温馨提示","当前无待处理线索");
				};
				DataClue.setData([]);
				return;
			}
			try{
				if(data.length<=0){
					if(NumOutputObjects==0){
						Ext.Msg.alert("温馨提示","当前无待处理线索");
						DataClue.setData([]);
						return;
					}
				}
			}catch(e){
				Ext.Msg.alert("温馨提示","系统报错,请与后台管理员联系");
				return;
			}
			//改变显示数量
			/*if(GandNG){//改
				cc.log('FFFF:'+data.length);
				object.getController('login.PADMainCtrl').XSCXnum=data.length;
				document.getElementById("waitForDiscoverClues").innerHTML=data.length;
			};*/
			
			DataClue.setData(data);
			
		};
		var Trim={};
		Trim.NewQuery=true;
		Trim.SearchSpec=ggZH;
		if(GandNG){
			Trim.PageSize='100';
		}else{
			Trim.PageSize='20';
		};
		Trim.SortSpec='Created(DESCENDING)';
		//判断是营业员的线索查询还是主管的线索查询
		var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
		if(RK=='营业员线索'){
			Trim.ViewMode='Sales Rep';
		}else if(RK=='主管线索'){
			Trim.ViewMode='Manager';
		};
		Trim.userID=userID;
		Trim.StartRowNum=0;
		//有圈和没圈
		if(GandNG){
			obj.ToDoClueDirector_ZG_DCLXSNoQ(obj,getResult,Trim);
		}else{
			obj.ToDoClueDirector_ZG_DCLXS(obj,getResult,Trim,1);
		};
	
	},
});