
/* JavaScript content from app/controller/startTheProcess/startTheProcessCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.startTheProcessCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'qc_StartProcessCtrl_id',
	config:{
		control:{
			"list#qc_StartProcessList":{
				itemtap:'qc_StartProcessList'
			},
		}
	},
	//list跳转处理
	qc_StartProcessList:function(obj, index, target, record, e, eOpts){
		var store=Ext.data.StoreManager.get("startTheProcessS");
		store.setData([]);
		var obj_this = this;
		cc.log('----record----');
		cc.log(record.data.title);
		cc.log(JSON.stringify(record.data.title));
		var getResult=function(res){
			cc.log("----------------res-----------------");
			cc.log(res);
			var ovar = eval("("+ res.toProcessListResponse.ovar +")");
			cc.log(ovar.data);
			var userSolist=[];
			var title = record.data.title.replace(/[\/]/,',');
			var appname = "OA_"+title;
			cc.log(record.data);
			cc.log(appname);
			//OA_营业,工程业务
			var cs = 0;//下标
			for(var i=0;i<ovar.data.length;i++){
        	    if(ovar.data[i].appname==appname){
        	    	var tp_data={}; 
        	    	tp_data.bpdname=ovar.data[i].bpdname;
        	    	tp_data.appacronym=ovar.data[i].appacronym;
        	    	tp_data.appid=ovar.data[i].appid;
        	    	tp_data.appname=ovar.data[i].appname;
        	    	tp_data.bpdid=ovar.data[i].bpdid;
        	    	tp_data.cfgid=ovar.data[i].cfgid;
        	    	tp_data.id1=ovar.data[i].id1;
        	    	tp_data.snapshotcreatedon=ovar.data[i].snapshotcreatedon;
        	    	tp_data.snapshotid=ovar.data[i].snapshotid;
        	    	tp_data.snapshotname=ovar.data[i].snapshotname;
        	    	userSolist[cs]=tp_data;
        	    	cs++;
        	    }   			
			}
			if(userSolist!=[]&&userSolist!=undefined&&userSolist!=null&&userSolist!=""&&userSolist!={}){
				//跳转至此页面
				obj_this.NextView('qc_StartprocessName_id','HelcOA.view.startTheProcess.startTheProcessName');
				Ext.getCmp('qc_listTitle').setTitle(record.data.title);
			}else{
				Ext.Msg.alert("提示","此流程分类未开放！");
			}
			cc.log(userSolist);
			//set到节点选择页面的数据STORE
			var store=Ext.data.StoreManager.get("startTheProcessStore");
			if(!store){
				store=Ext.create("HelcOA.store.startTheProcess.startTheProcessStore");
			}
			
			//判断输出内容
			var listdata=[];
			var cs=0;
			for(var j=0;j<userSolist.length;j++){
				//控制输出，未完成或者要求不显示流程应不加入列表
				//日常办公
				if(record.data.title=="日常办公"){
					cc.log(userSolist[j].bpdname);
					if(userSolist[j].bpdname=="会议室申请流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="工作联络书"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="出差申请"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="用印申请"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					
					if(userSolist[j].bpdname=="合同校正章(1)用印申请"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="公务用车联络流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					
					if(userSolist[j].bpdname=="公司发文流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="公司对外合同审批流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="公司规章制度审批流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="内部法律咨询流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="接待客户工作联络流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					
					if(userSolist[j].bpdname=="法人授权"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					
					if(userSolist[j].bpdname=="物业公司对外合同审批流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					
					if(userSolist[j].bpdname=="视频设备申请"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					
					if(userSolist[j].bpdname=="境外出差申请"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="投资公司经理出差申请流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
				}
				
				//人力资源 
				if(record.data.title=="人力资源"){
					if(userSolist[j].bpdname=="丧假申请流程（派驻人员专用）"){
						listdata[cs]=userSolist[j];
						cs++;
					}
				}
				//营业/工程业务
				if(record.data.title=="营业/工程业务"){
					cc.log(userSolist[j].bpdname);
					if(userSolist[j].bpdname=="维修改造工程业务联络流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="开具发票"){
						listdata[cs]=userSolist[j];
						cs++;
					}

				};
				//提案管理
				if(record.data.title=="提案管理流程"){
					if(userSolist[j].bpdname=="提案管理流程"){
						listdata[cs]=userSolist[j];
						cs++;
					};
				};

				if(userSolist[j].bpdname=="诉讼审批流程"){
						listdata[cs]=userSolist[j];
						cs++;
				}
				
				//质量控制
				if(record.data.title=="质量控制"){
					cc.log(userSolist[j].bpdname);
					if(userSolist[j].bpdname=="开箱补缺件及不良问题反馈报告"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="三包申请报告"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].bpdname=="质量部投诉流程"){
						listdata[cs]=userSolist[j];
						cs++;
					}
				}
				if(userSolist[j].bpdname=="非标报告作业处理流程"){
						listdata[cs]=userSolist[j];
						cs++;
				}
					

				
			}
			store.setData(listdata);
			
        };
           
		var myParam = [_vt,password];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'startTheProcess';
		params.prmName = myParam;
		obj_this.connectServerComm(getResult,params);
		
		
	}
});