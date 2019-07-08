Ext.define('HelcPAD.controller.OpportunityManagement.Director.ToDoClueNewCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//list
			"list#ToDoClueNew_id_list":{
				itemtap:'ToDoClueNew_id_list',
				initialize:'ToDoClueNew_id_list_XL'
			},
			
			
		}
	},
	
	
	ToDoClueNewDivFa:function(obj){
		//在方法中创建单击事件、
		//下一页  
	    var SYY=document.getElementById('ToDoClueNew_id_SYY');
	    SYY.onclick = function (){
	    	obj.BackView();
	    };
	    //查询
	    var CX=document.getElementById('ToDoClueNew_id_CX');
	    CX.onclick = function (){
	    	//代理商名称
	    	var AgentName=document.getElementById("ToDoClueNew_DYSMC").value;
			//项目名称
	    	var ProjectName=document.getElementById("ToDoClueNew_XMMC").value;
	    	//来源
	    	var Source=$("#ToDoClueNew_id_select option:selected").val();
	    	cc.log(AgentName);
	    	cc.log(ProjectName);
	    	cc.log(Source);
			var ZH='';
			if(AgentName!=''){
				if(ZH==''){
					ZH+='[HEL Lead.Agent Name] like '+"'*"+AgentName+"*'";
				}else{
					ZH+=' and [HEL Lead.Agent Name] like '+"'*"+AgentName+"*'";
				};
			};
			if(ProjectName!=''){
				if(ZH==''){
					ZH+='[HEL Lead.Project Name] like '+"'*"+ProjectName+"*'";
				}else{
					ZH+=' and [HEL Lead.Project Name] like '+"'*"+ProjectName+"*'";
				};
			};
			if(Source!=''&&Source!=undefined){
				if(ZH==''){
					ZH+='[HEL Lead.Lead Source] like '+"'"+Source+"'";
				}else{
					ZH+=' and [HEL Lead.Lead Source] like '+"'"+Source+"'";
				};
			};
			var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
			if(RK=='营业员线索'){
				if(ZH==''){
					ZH+='[HEL Lead.Lead Status] =  '+"'"+'处理中'+"'"+' and EXISTS([HEL Lead.Agent Sales Rep Login] = '+"'"+userID+"')";
				}else{
					ZH+=' and [HEL Lead.Lead Status] =  '+"'"+'处理中'+"'"+' and EXISTS([HEL Lead.Agent Sales Rep Login] = '+"'"+userID+"')";
				};
			}else{//主管
				if(ZH==''){
					ZH+=' [HEL Lead.Lead Status] like  '+"'"+'审批中'+"'";
				}else{
					ZH+=' and [HEL Lead.Lead Status] like  '+"'"+'审批中'+"'";
				};
			};
			obj.getApplication().getController('login.PADMainCtrl').DCLXS_ZH='';
			obj.getApplication().getController('login.PADMainCtrl').DCLXS_ZH=ZH;
			cc.log('待审批线索：'+ZH);
			getResult=function(obj){
			};
			var Trim={};
			Trim.NewQuery=true;
			Trim.SearchSpec=ZH;
			Trim.PageSize='20';
			Trim.SortSpec='Created(DESCENDING)';
			
			//判断是营业员的线索查询还是主管的线索查询
			var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
			if(RK=='营业员线索'){
				Trim.ViewMode='Sales Rep';
			}else if(RK=='主管线索'){
				Trim.ViewMode='Organization';
			};
			
			Trim.StartRowNum='0';
			Trim.userID=userID;
			obj.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').ToDoClueSearchDirector_GGFF(obj,Trim,getResult,false);
			//this.ToDoClueSearchDirector_GGFF(obj,Trim,getResult);
	    };
	},
	
	//list
	ToDoClueNew_id_list:function(dataview, index, target, record, e, eOpts){
		var yz=record.data.Id;
		if(yz=='1'){
			return;
		};
		//用于执行完后线索处理,删除list的显示位置定位
		this.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').TDlistNum=index;
		cc.log(index);
		cc.log('BB:'+record);
		var obj=this;
		getResult=function(obj,data){
			cc.log(data);
			obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').BCIData=data;
			obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').JRZGXS(obj,data);
			
		};
		
		var Trim={};
		Trim.id=record.data.Id;
		Trim.userID=userID;
		
		obj.ClueDirector_list_GGFF(obj,Trim,getResult);
	},
	
	//刷新商
	ToDoClueNew_id_list_XL:function(){
		var obj=this;
		Ext.getCmp('ToDoClueNew_id_list').setPlugins([
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
		                if(tmpStoreNum<20){
		                    xlsxNum=0;
		                    var htmel=['<table border=0 width=100%>',
		                               '    <tr><td width=30%>{Id}</td><td width=70%>{SubmitDate}</td></tr>',
		                               '    <tr><td width=30%>{RegistrationPerson}</td><td width=70%>{ProjectName}</td></tr>',
		                               '    <tr><td colspan=2>{AgentName}</td></tr>',
		                               '    <tr><td colspan=2>{StreetAddress}</td></tr>',
		                               '</table>'];
							Ext.getCmp('ToDoClueNew_id_list').setItemTpl(htmel);
		                }else{
		                    xlsxNum=xlsxNum+20;
		                    Flag=false;
		                };
		                cc.log(xlsxNum);

		                //跟新
						getResult=function(result){
							try{
								//公用数据仓
								var DataClue=Ext.data.StoreManager.get('ClueDirectorStore');
								if(!DataClue){
									DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueDirectorStore');
								};
								
								var NumOutputObjects=result.invocationResult.QueryLeadPage_Output.NumOutputObjects;
								var data=result.invocationResult.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead;
								if(NumOutputObjects==0){
									DataClue.setData([{Id:'1'}]);
									var htmel=['<div style="font-size:18px;width:100%">'+
								            	'<div style="float:left;width:100%">已查询到最后一页,下拉刷新重回第一页</div>'+
								            	'</div>'];
									Ext.getCmp('ToDoClueNew_id_list').setItemTpl(htmel);
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
											Ext.getCmp('ToDoClueNew_id_list').setItemTpl(htmel);
											return;
										};
									};
								}catch(e){
									Ext.Msg.alert("温馨提示","系统报错,请与后台管理员联系");
									return;
								};
								//cc.log('--------=====');
								//cc.log(data);
								//object.getController('login.PADMainCtrl').DCLXSnum=data.length;
								//object.getController('OpportunityManagement.Director.ToDoClueDirectorCtrl').DCLXSxs='display:block;';
								
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
						Trim.SearchSpec=obj.getApplication().getController('login.PADMainCtrl').DCLXS_ZH;
						Trim.PageSize='20';
						Trim.SortSpec='Created(DESCENDING)';
						//判断是营业员的线索查询还是主管的线索查询
						var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
						if(RK=='营业员线索'){
							Trim.ViewMode='Sales Rep';
						}else if(RK=='主管线索'){
							Trim.ViewMode='Manager';
						};
						Trim.StartRowNum=xlsxNum;
						Trim.userID=userID;
						Trim.adapter='HttpAdapter_PAD_Custom';  //Adapter名字
						Trim.procedure='clueListQuery';//Adapter方法名
						cc.log(Flag);
						obj.XCX_GG_FF_NOT(obj,getResult,Trim);
		            },
		         },
		     },
		]);
		
	},
	
	//list公共方法
	ClueDirector_list_GGFF:function(obj,Trim,FangFa){
		getResult=function(obj,data){
			FangFa(obj,data);
		};
		obj.ToDoClueDirector_ZG_DCLXS(obj,getResult,Trim,2);
	},
	
	//查询的公共方法 
	ToDoClueSearchDirector_GGFF:function(obj,Trim,FangFa,GandNG){
		cc.log('进来');
		getResult=function(obj,data,NumOutputObjects){
			//公用数据仓
			var DataClue=Ext.data.StoreManager.get('ClueDirectorStore');
			if(!DataClue){
				DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueDirectorStore');
			};
			if(NumOutputObjects==0){
				Ext.Msg.alert("温馨提示","当前无待处理线索");
				DataClue.setData([]);
				return;
			}
			try{
				if(data.length<=0){
					if(NumOutputObjects==0){
						Ext.Msg.alert("温馨提示","当前无待处理线索");
						return;
					}
				}
			}catch(e){
				Ext.Msg.alert("温馨提示","系统报错,请与后台管理员联系");
				return;
			}
			cc.log('--------=====');
			cc.log(data);
			cc.log(NumOutputObjects);
			//改变显示数量
			if(GandNG){//改
				cc.log('进来');
				if(NumOutputObjects==1){
					object.getController('login.PADMainCtrl').DCLXSnum=1;
				}else{
					object.getController('login.PADMainCtrl').DCLXSnum=data.length;
				};
			};
			
			DataClue.setData(data);
			//alert('KK:'+DataClue.getCount());
			FangFa(obj);
			
		};
		
		if(GandNG){
			obj.ToDoClueDirector_ZG_DCLXSNoQ(obj,getResult,Trim);
		}else{
			obj.ToDoClueDirector_ZG_DCLXS(obj,getResult,Trim,1);
		};
	},
	
	//查询待处理线索数量和进入
	tdcn_Public:function(obj,GandNG){
		/*var ggZH='[HEL Lead.Lead Status] =  '+"'"+'审批中'+"'"+' AND ';
		ggZH+='[HEL Lead.Lead Source] like '+"'"+'经销商'+"'"+' ';
		obj.getApplication().getController('login.PADMainCtrl').DCLXS_ZH=ggZH;*/

		getResultDCLXS=function(obj){
			document.getElementById("waitForHandlerClue").innerHTML=obj.DCLXSnum;
			cc.log('这是什么:'+obj.DCLXSnum);
		};
		//判断是营业员的线索查询还是主管的线索查询
		var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
		var Trim={};
		Trim.NewQuery=true;
		Trim.SearchSpec=obj.getApplication().getController('login.PADMainCtrl').DCLXS_ZH;
		cc.log('Trim.SearchSpec:'+Trim.SearchSpec);
		if(GandNG){
			Trim.PageSize='100';
		}else{
			Trim.PageSize='20';
		};
		Trim.SortSpec='Created(DESCENDING)';
		if(RK=='营业员线索'){
			Trim.ViewMode='Sales Rep';
		}else if(RK=='主管线索'){
			Trim.ViewMode='Organization';
		};
		Trim.StartRowNum=0;
		Trim.userID=userID;
		obj.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').ToDoClueSearchDirector_GGFF(obj,Trim,getResultDCLXS,GandNG);
	},
});