
/* JavaScript content from app/controller/OaMobileOffice/ElectronicProcess/travelRequestCtrl/approvalOpinionCtrl.js in folder common */
/**
 * 审批意见
 */
Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.travelRequestCtrl.approvalOpinionCtrl',{
	extend:'HelcPAD.controller.ApplicationController_OA',
	id:'qc_approvalOpinionCtrl_ID',
	config:{
		control:{
			//提交用印申请
			'button#Commit_useStamp':{
				tap:'Commit_useStamp',
			},
			'button#qc_returnTravelRequest_ID':{
				tap:'qc_returnTravelRequest',
			 },
			 'button#qc_submitTravelRequest_ID':{
				tap:'qc_submitTravelRequest',
			 },
			 "list#qc_reutingList_ID":{
				itemtap:'qc_select'
			 },
		}
	},
	//返回上一页
	qc_returnTravelRequest:function(obj, e, eOpts){
		this.showBackView();
		personnelList.name = null;
		personnelList={};
		choosePerson = [];
	},
	
	//进入选人界面与选择流程
	qc_select : function(obj, index, target, record, e, eOpts){
		var obj_this = this;
		var sbenoCheck=document.getElementsByName('groupCheckbox');
		var assign = record.raw.cfg.cfg.assign;
		cc.log("---------312132-------------");
		cc.log(record);
		//单选、多选(单选=fo,多选=fm,全选=fa)
		var obj_nextacti=record._data.nextacti;
		var obj_index=0;
		if(obj_nextacti=="fo"){
			//单选
			for(var i=0; i<sbenoCheck.length; i++){
				if(index!=i){
					sbenoCheck[i].className = 'p_judge_box';
				}else{
					actionform.flowto={};
					actionform.flowto[record.data.forkname]={};
					actionform.flowto[record.data.forkname].conds=record.data.conds;
					actionform.flowto[record.data.forkname].users=[];
				}
			}
		}else if(obj_nextacti=="fm"){
			//多选
		}else if(obj_nextacti=="fa"){
			//全选
		}
		var obj_conds=record._data.conds;
		
		var approvalOpinionS = Ext.data.StoreManager.get('approvalOpinionS');
		cc.log("-------------index-----------");
		 
		var hasuser=record.raw.cfg.cfg.hasuser;
		cc.log(hasuser);
		//判断哪个是否“否决”   用hasuser 做判断
		//for(var i=0; i<sbenoCheck.length; i++){
		//	if(hasuser!="1"){
		//		break;
		//	}
		//	obj_index++;
		//}
		
		Ext.getCmp('nextacti').setValue(obj_nextacti);
		Ext.getCmp('conds').setValue(obj_conds);
		Ext.getCmp('QC_index').setValue(index);
		
		if(event.target.id!='pid'){
			if(hasuser==1){
				aa(assign,record.data,index);
			}else{
				sbenoCheck[index].className = 'p_judge_box_clicked';
				actionform.flowto={};
				actionform.flowto[record.data.forkname]={};
				actionform.flowto[record.data.forkname].conds=record.data.conds;
				actionform.flowto[record.data.forkname].users=[];
			}
		}else if(event.target.id=='pid' && sbenoCheck[index].className == 'p_judge_box_clicked'){
			sbenoCheck[index].className = 'p_judge_box';
		     }else{
			if(hasuser==1){
			
				aa(record.data,index);
				actionform.flowto={};
				actionform.flowto[record.data.forkname]={};
				actionform.flowto[record.data.forkname].conds=record.data.conds;
				actionform.flowto[record.data.forkname].users=[];
			}
		}
		
		
		
		//进入选人界面
		function aa(assign,vdata,idx){
			cc.log("---assign---");
			cc.log(assign);
			var url = record.raw.url;
			var store=Ext.data.StoreManager.get("personnelSelectionS");
			if(!store){
				store=Ext.create("HelcPAD.store.OaMobileOffice.ElectronicProcess.travelRequestS.approvalOpinionS");
			}
			
			if(typeof(personnelList["QC_"+vdata.name])!=undefined && personnelList["QC_"+vdata.name]!=null && personnelList["QC_"+vdata.name]=="QC_"+vdata.name){
				obj_this.showBackView('qc_personnelSelection_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.travelRequest.personnelSelection');
				store.setData(personnelList["QC_"+vdata.name+"data"]);
				
				var sbenoCheck=document.getElementsByName('p_judge_color');
				for(var i =0;i<personnelList["QC_"+vdata.name+"check"].length;i++){
					sbenoCheck[personnelList["QC_"+vdata.name+"check"][i]].className='p_judge_box_clicked'
				}
				Ext.getCmp('qx_inquireCon_ID').setValue();
				Ext.getCmp('QC_name1').setValue("QC_"+vdata.name);
				
			}else{
				function getResult(result) {
					var userSolist=[];
					try{
						var jsonP=eval(result.text);
						if(jsonP!=null&&jsonP!=undefined){
							cc.log("jsonP----------------------");
							//给personnelSelectionS循环传入数据
							for(var nb=0;nb<jsonP.data.length;nb++){
								var tp_data={};
								tp_data.key=jsonP.data[nb].key;
								tp_data.forkname=vdata.forkname;
								tp_data.conds=vdata.conds;
								tp_data.value=jsonP.data[nb].value;
								tp_data.idx=idx;
								var t=new Object();
								Ext.apply(t,actionform.flowto);
								tp_data.fork=t;
								
								userSolist.push(tp_data);
							}
							cc.log(userSolist);
							store.setData(userSolist);

						}
					}catch(e){
						cc.log('没有人员可供选择');
					}
					
					obj_this.NextView('qc_personnelSelection_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.travelRequest.personnelSelection');
					//默认选中带出来的所有人
					if(userSolist.length!=0){
						var sbenoCheck=document.getElementsByName('p_judge_color');
						for(var nb=0;nb<userSolist.length;nb++){
							sbenoCheck[nb].className='p_judge_box_clicked';
							var personnelSelectionS = obj_this.getStore('personnelSelectionS','HelcPAD.store.OaMobileOffice.ElectronicProcess.travelRequestS.personnelSelectionS');
							var recordData = personnelSelectionS.data.items[nb].data;
							if(actionform.flowto[recordData.forkname]==undefined){
								actionform.flowto[recordData.forkname]={};
							}
							actionform.flowto[recordData.forkname].conds=record.data.conds;
							
							if(actionform.flowto[recordData.forkname].users==undefined||actionform.flowto[recordData.forkname].users==""||actionform.flowto[recordData.forkname].users==null){
								actionform.flowto[recordData.forkname].users=[];
							}
							actionform.flowto[recordData.forkname].users.push(recordData.key);
							
					        cc.log('-------actionform.flowto-----------');
					        cc.log(actionform.flowto);
						}	
					};
					//等于1的时候可以任意选人，即有搜索功能
					if(assign.anyflag == '0'){
						Ext.getCmp('select_person_TB').setHidden(true);
						
					}
					
					//判断多选时用--当multflag等于1的时候可以多选，multqty为多选时最多可以选择的最大人数
					Ext.getCmp('QC_multflag').setValue(assign.multflag);
					Ext.getCmp('QC_multqty').setValue(assign.multqty);

					Ext.getCmp('QC_name1').setValue("QC_"+vdata.name);
					Ext.getCmp('QC_forkname').setValue(vdata.forkname);
					Ext.getCmp('QC_conds').setValue(vdata.conds);
					Ext.getCmp('QC_idx').setValue(idx);
					cc.log(actionform);
					cc.log("jsonP----------------------");
					
//					var sbenoCheck=document.getElementsByName('p_judge_color');
//					for(var nb=0;nb<userSolist.length;nb++){
//						if(actionform.flowto[userSolist[nb].forkname]!=null){
//							for(var i=0;i<actionform.flowto[userSolist[nb].forkname].users.length;i++){
//								if(userSolist[nb].key==actionform.flowto[userSolist[nb].forkname].users[i].key&&actionform.flowto[userSolist[nb].forkname].conds==userSolist[nb].conds){
//									sbenoCheck[nb].className='p_judge_box_clicked';
//								}else{
//									sbenoCheck[nb].className='p_judge_box';
//								}
//							}
//						}
//					}	
					
				};
				var myParam = [url];
				var params = {};
				params.adpName = 'HttpAdapter_OA';
				params.prodNmae = 'getStories_datas';
				params.prmName = myParam;
				obj_this.connectServerComm(getResult,params);
			}
			
			
			
		};
	},
	
	
	
	//提交审批意见
	qc_submitTravelRequest:function(obj, e, eOpts){

			var dataArray = ['ygh','tiaojian01','peonum','query_xm','query_bm','phone','query_zw','phone_sfz','place','starttime','rettime','plant','area',
			                 'sendmobile','prefee','book_money','yyje','otherfee','feesum','ifyfxm',
			                 'projectno','projectname','reason_textarea','report_form','way','subject','sendnumber',
			                 'pdano','ifbl','kzname','kzno','bzname','bzno','bbzname','bbzno','zjlname','zjlno','waypath','firflow','secflow','thiflow','forflow','sta',
			                 ];
			this.setDataFromIds(dataArray);
		
	},
	
	
	
	
	//提交的data数据组装
	setDataFromIds : function(dataArray){
		var obj_this = this;
		var taskid = Ext.getCmp('taskid').getValue();
		var action="submit";
		var _notice="";
		var _ext="";
		var ovar="";
		//var procname=Ext.getCmp('qc_bpdname').getValue();
		var procname="出差申请";
		//data数据
		var data={
			"audit":{
			//"userid":Ext.getCmp('userid').getValue(),
			"userid":OA_userid,	
			"dept":Ext.getCmp('dept').getValue(),
//			"type":Ext.getCmp('type').getValue(),
			"type":Ext.getCmp('node').getValue(),
			//"username":username,
			"username":OA_usernames,
			"node":Ext.getCmp('node').getValue(),
			"taskid":Ext.getCmp('taskid').getValue()},
			"piid":Ext.getCmp('piid').getValue(),
			"mast":{}
		};
		cc.log(dataArray);
		for(var i=0;i<dataArray.length;i++){
			var dataId = dataArray[i];
			cc.log(dataId);
			var dataMast = Ext.getCmp(dataId).getValue();
			data.mast[dataId]=dataMast;
		}
		data.mast.ext1="OA_PDA";
		for(key in actionform.data.mast){
			try{
				data.mast[key]=Ext.getCmp(key).getValue();
			}catch(e){}
		}
		//flowto数据
		_flowto=actionform.flowto;
		
		
		//alert(Ext.getCmp('ygbh').getValue());
		
		//query数据
		var query={
				"ext1":"OA_PDA",
				"df_id":Ext.getCmp('ygbh').getValue(),
				"piid":Ext.getCmp('piid').getValue(),
				"billno":Ext.getCmp('fileno').getValue(),
				"subject":Ext.getCmp('subject').getValue(),
				"df_name":Ext.getCmp('agentman').getValue(),
				"df_time":Ext.getCmp('createdate').getValue(),
				"dep_name":Ext.getCmp('dept').getValue(),
		};

		cc.log(data);
		cc.log(query);
		
		_flowto = JSON.stringify(_flowto);
		data = JSON.stringify(data);
		query = JSON.stringify(query);
		var backFunc=function (obj2){
			Ext.Msg.confirm('','确定提交？',function(btn){
				if (btn == 'yes'){
					var getResult3=function(res){
						cc.log("approval---res");
						cc.log(res);
					    var statuscode = res.msg ;
						statuscode = eval("("+statuscode.status+")");
						var jsonObj=Ext.JSON.decode(res.msg);
						if(jsonObj.status.code!="200"){
							cc.log('错误信息，无法提交');
							cc.log(jsonObj.status.msg);
							Ext.Msg.alert(jsonObj.status.msg);
							WL.Toast.show(jsonObj.status.msg);
							return;
						}else{
						cc.log('提交成功，正在等待返回...');
						if(statuscode == "200"){
							WL.Toast.show("提交成功，正在等待返回...");
							setTimeout(function(){
								obj_this.NextView('MyProcess_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.MyProcess');
								//刷新数据
								obj_this.getApplication().getController('HelcPAD.controller.OaMobileOffice.ElectronicProcess.InstallProjectCtrl').installProject_ep_id_MyLC();
								var ViewId = Ext.getCmp('QC_View_id').getValue();
								var viewName=Ext.getCmp(ViewId);
								if(viewName){
									viewName.destroy();
								}
							},500);
							personnelList.name = null;
							personnelList={};
							choosePerson = [];
						}else{
							WL.Toast.show("提交失败，请核对填入资料");
						}
						//cc.log("dddd");
						WL.Toast.show("提交成功，正在等待返回...");
						setTimeout(function(){
							obj_this.NextView('MyProcess_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.MyProcess');
							//刷新数据
							obj_this.getApplication().getController('HelcPAD.controller.OaMobileOffice.ElectronicProcess.InstallProjectCtrl').installProject_ep_id_MyLC();
							var ViewId = Ext.getCmp('QC_View_id').getValue();
							var viewName=Ext.getCmp(ViewId);
							if(viewName){
								viewName.destroy();
							}
						},500);
						personnelList.name = null;
						personnelList={};
						choosePerson = [];
					}};
					var content ={method:'DrafterSubmit' , param:[_vt , taskid , action,_flowto , data ,query , _notice ,_ext ,procname]};
					
					obj_this.connectServer4(getResult3,content,1);
					cc.log("-------content params-------");
					cc.log(content);
				}else{
					return;
				}
			});
		};
		var blag=false;
		var sbenoCheck=document.getElementsByName('groupCheckbox');
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				blag=true;
			}
		};
		if(!blag){
			Ext.Msg.alert('提示','请选择流程');
		}else{
			backFunc(this);
		}
	
	},
});


