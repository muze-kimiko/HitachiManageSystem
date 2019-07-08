
/* JavaScript content from app/controller/oa/startTheProcess/DailyOffice/Idea/approvalOpinionCtrl.js in folder common */
/**
 * 审批意见
 */
Ext.define('HelcPDA.controller.oa.startTheProcess.DailyOffice.Idea.approvalOpinionCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
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
				sbenoCheck[index].className = 'p_judge_box_clicked'
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
				store=Ext.create("HelcPDA.store.oa.startTheProcess.DailyOffice.Idea.personnelSelectionS");
			}
			
			if(typeof(personnelList["QC_"+vdata.name])!=undefined && personnelList["QC_"+vdata.name]!=null && personnelList["QC_"+vdata.name]=="QC_"+vdata.name){
				obj_this.showBackView('qc_personnelSelection_id','HelcOA.view.startTheProcess.DailyOffice.Idea.personnelSelection');
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
					
					
					obj_this.NextView('qc_personnelSelection_id','HelcPDA.view.oa.startTheProcess.DailyOffice.Idea.personnelSelection');
					//默认选中带出来的所有人
					if(userSolist.length!=0){
						var sbenoCheck=document.getElementsByName('p_judge_color');
						for(var nb=0;nb<userSolist.length;nb++){
							sbenoCheck[nb].className='p_judge_box_clicked';
							var personnelSelectionS = obj_this.getStore('personnelSelectionS','HelcPDA.store.oa.startTheProcess.DailyOffice.Idea.personnelSelectionS');
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
		var bpdname=Ext.getCmp('qc_bpdname').getValue();
		//分类：日常办公
		if(bpdname=="工作联络书"){
			var dataArray = ['phone','e_date','subject','neirong_textarea'];
			this.setDataFromIds(dataArray);
		}
	
		if(bpdname=="出差申请"){
			var dataArray = ['ygh','tiaojian01','peonum','query_xm','query_bm','phone','query_zw','phone_sfz','place','starttime','rettime','plant','area',
			                 'sendmobile','prefee','book_money','yyje','otherfee','feesum','ifyfxm',
			                 'projectno','projectname','reason_textarea','report_form','way','subject','sendnumber',
			                 'pdano','ifbl','kzname','kzno','bzname','bzno','bbzname','bbzno','zjlname','zjlno','waypath','firflow','secflow','thiflow','forflow','sta',
			                 ];
			this.setDataFromIds(dataArray);
		}
		
		if(bpdname=="用印申请"){
			var dataArray = ['fileno','createdate','fenshu','subject','sqliyou_textarea'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="合同校正章(1)用印申请"){
			var dataArray = ['piid','fileno','agentman','dept','createdate','fenshu','sqliyou_textarea','subject'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="公司对外合同审批流程"){
			var dataArray = ['fileno','subject','mycontractno','nextcontractno','contracttype',
	                            'addr','zbflag','zbxm','contractyear','paytype','threeflag','htfs', 'bano','tsbano',
	                            'lxdh','sqliyou_textarea','dept','caiwureason_textarea','zfpage','zfname','hqflag', 
	                            'hqleader','reportdate','agentman','createdate','cwflag','fwflag','fjflag'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname == "公司发文流程"){
			//判断流程类型
			var lx=Ext.getCmp('fwtype').getValue();
			var dataArray='';
			if(lx=='公司发文'){
				dataArray = ['subject','fwtype','writ','wdbh','ngbm','miji',
				             'showss','bcnx','fwfj','fs','zs','cs',
				             'cb','bzr','bzsj','shr','shsj','pzr','pzsj','bzh',
				             'bzhsj','zhaiyao_textarea','zwdoc','jcacl','readpeo'];
			}else if(lx=='规章制度'){
				dataArray = ['subject','fwtype','writ','wdbh','ngbm','miji',
			                 'showss','bcnx','fwfj','fs','zs','cs',
			                 'cb','bzr','bzsj','shr','shsj','pzr','pzsj','bzh',
			                 'bzhsj','zhaiyao_textarea','zwdoc','jcacl','readpeo','catalogname'];
			};
			this.setDataFromIds(dataArray);
		}
		if(bpdname == "公司规章制度审批流程"){
			var dataArray = ['piid','fileno','createdate','subject','fwtype','hqflag','smflag','hqsl','hqdep1','hqdep2','hqdep3','hqdep4','hqdep5',
			                 'lastdate','phone','wjml','wdbh','bbh','dep','bzsj','zhaiyao_textarea',
			                 'zcbzr','zcbsj','agentman','dept','arcpathid','pigeonhole','cabinet','shr','shsj','pzr','pzsj','bzh','bzhsj','sxdate','miji','showss','bcnx','jcacl',
			                 'inherit','managerman_1','editman_1','printer_1','readman_1','listuser_1','zwdocunid','mlid','ofileid','zwflag'
			                 ];
			this.setDataFromIds(dataArray);
		}
		if(bpdname == "会议室申请流程"){
			var dataArray = ['piid','fileno','dept','agentman','createdate','subject','phone','zcr',
			                 'startdate','shour','sminu','eminu','ehour','usehour',
			                 'meetcontect_textarea','meetpeo','meetpeo1','rs','address',
			                 'meetsocure1','meetsocure2','meetsocure3','meetsocure4','meetsocure5',
			                 'meetsocure6','nextsoure','meetclass','pfr','fhtjfalg',
			                 'meetingids','meetsubject','selclassid','selfalg','startwz','sycd'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname == "内部法律咨询流程"){
			var dataArray = ['fileno','dept','agentman','createdate','zxlx','subject','reason_textarea',
			                 'tel','email','sendreader','completeddate','recycle'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname == "公务用车联络流程"){
//			'ch','sj2','sjtel'
				var dataArray = ['fileno','subject','agentman','dept',
				                 'ycdate','sj','ycdate1','sj1','lxr','ycrs','place',
				                 'sendmobile','sendnumber','xicheng_textarea','reasion_textarea', 
				                 'lxrdh','createdate'];
				this.setDataFromIds(dataArray);
		}
		if(bpdname=="物业公司对外合同审批流程"){
			var dataArray = ['fileno','tiaojian01','tiaojian02','subject','mycontractno','nextcontractno','contracttype',
	                            'addr','zbflag','zbxm','contractyear','paytype','threeflag','htfs', 
	                            'lxdh','sqliyou_textarea','dept','caiwureason_textarea','zfpage','zfname','hqflag', 
	                            'hqleader','reportdate','agentman','createdate','cwflag','fwflag','fjflag'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="接待客户工作联络流程"){
			var dataArray = ['fileno','ccompany','num','company','subject','lfkh','zw','tel',
			                 'lfkh1','zw1','tel1','lfkh2','zw2','tel2','pt','dh','qtqk','yyy','ssqy',
			                 'isneed1','jdate','isneed1','hb','stime','etime','isneed2','cdate','time2',
			                 'isneed3','czdate','time3','isneed4','ycdate','time4','isneed5','sendreader',
			                 'hotel','room','ycdate1','ycdate2','hbthing_textarea','zftype','agentman','time',
			                 'sendmobile','sendnumber','jsname','cphao','slname','lxtel','ccdate','didian',
			                 'sltime','lxr','lxrdh','call_textarea','typeq1'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="境外出差申请"){
//			radio113 
			var dataArray = ['piid','fileno','ygh','query_xm','dep','createdate','peonum','peonum2','peonum3','subject','starttime','rettime',
			                 'qz_type','qystyle','country','button206','addr','ifbl','cc_type','biz','plant','fee','prefee',
			                 'fysm1','fyxj1','fysm2','fyxj2','fysm3','fyxj3','fysm4','fyxj4','fysm5','fyxj5',
			                 'otherfee','feesum','book_money','yyje','feesum2','ifyfxm','projectno','projectname','reason_textarea','radio113',
			                 'kzname','staytime','query_zw','kzno','bzname','bzno','bbzname','bbzno','zjlname','zjlno','guoji','sendreader',
			                 'query_bm','gwlist','fs1','fs2','fs3','zs1','zs2','zs3','bt1','bt2','bt3','sta'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="法人授权"){
			var dataArray = ['fileno','agentman','dept','createdate','bsqr','phone','qwwcsj','zms','yxnyq','yxnyz','subject','sqly'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="投资公司经理出差申请流程"){
//			seluser91
			var dataArray = ['fileno','agentman','dept','phone','sendreader','subject',
	                         'place','starttime','staytime','items','visitor','reason_textarea','report_form',
	                         'kzname','kzno','bzname','bzno','bbzname','bbzno','zjlname','zjlno', 
	                         'waypath','firflow','secflow','thiflow','forflow','createdate'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="视频设备申请"){
			var dataArray = ['addrmain','agentman','hytype','createdate','dept','draftsdate','edate','etime','fileno','leader','lxdh','lxr','meetingrooms','sdate','sendreader','stime','subject','summary','zjdep'];
			this.setDataFromIds(dataArray);
		}
		//分类：营业/工程业务
		if(bpdname=="维修改造工程业务联络流程"){
			var dataArray = ['fileno','apellation','address','party','phone','date','count','regh',
			                 'refermodel','refercz','referhigh','leibie','type','sendmobile',
			                 'agentman','dept','createdate','phone2','subject','ywtype','report_textarea',
			     		    'qwsjdate','qwdate','tecdocid','remark','qwdate2','sendreader',
			     		    'createbypda','nextprocessuser','Fnextprocess','qwdategcbz','qwdate3','qwdatebgr'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="开箱补缺件及不良问题反馈报告"){
			var dataArray = ['fileno','subject','zd','ts','bldate','type1','yhmc','qwclqx','level','dpm','bjm','wtm',
			                 'jjdz','yb','shr','phone','shr_2','phone_2','scgh','azdw','azzz','elastatus',
			                 'dftxh','hth','jcrq','sgh','kxy','xh_1','dhrq_1','ym_1','xuh_1','lbjmc_1','thzy_1',
			                 'gg_1','dw_1','zxsl_1','qdsl_1','qhsl_1','xh_2','dhrq_2','ym_2','xuh_2','lbjmc_2',
			                 'thzy_2','gg_2','dw_2','zxsl_2','qdsl_2','qhsl_2','xh_3','dhrq_3','ym_3','xuh_3',
			                 'lbjmc_3','thzy_3','gg_3','dw_3','zxsl_3','qdsl_3','qhsl_3','xh_4','dhrq_4','ym_4',
			                 'xuh_4','lbjmc_4','thzy_4','gg_4','dw_4','zxsl_4','qdsl_4','qhsl_4','xh_5','dhrq_5',
			                 'ym_5','xuh_5','lbjmc_5','thzy_5','gg_5','dw_5','zxsl_5','qdsl_5','qhsl_5','xh_6',
			                 'dhrq_6','ym_6','xuh_6','lbjmc_6','thzy_6','gg_6','dw_6','zxsl_6','qdsl_6','qhsl_6',
			                 'xh_7','dhrq_7','ym_7','xuh_7','lbjmc_7','thzy_7','gg_7','dw_7','zxsl_7','qdsl_7',
			                 'qhsl_7','xh_8','dhrq_8','ym_8','xuh_8','lbjmc_8','thzy_8','gg_8','dw_8','zxsl_8',
			                 'qdsl_8','qhsl_8','beizhu_textarea','agentman','dept','createdate','bgrphone','scjd',
//			                 'gb','implement_date','gb_leader','gb_list',
//			                 'tldh','tldate','qaleader','sj_list','nextprocessuser','fnextprocess',
			                 
//			                 'wlgc_1','wlgc_2','wlgc_3','wlgc_4','wlgc_5','wlgc_6','wlgc_7','wlgc_8',
//			                 'decision','sj','sj_leader','bjmc_1','xha_1','blxz_1','zrdep_1','blyy_1','qrr_1','blfl_1',
//			                 'xs_1','tz_1','bjmc_2','xha_2','blxz_2','zrdep_2','blyy_2','qrr_2','blfl_2','xs_2',
//			                 'tz_2','bjmc_3','xha_3','blxz_3','zrdep_3','blyy_3','qrr_3','blfl_3','xs_3','tz_3',
//			                 'bjmc_4','xha_4','blxz_4','zrdep_4','blyy_4','qrr_4','blfl_4','xs_4','tz_4','bjmc_5',
//			                 'xha_5','blxz_5','zrdep_5','blyy_5','qrr_5','blfl_5','xs_5','tz_5','bjmc_6','xha_6',
//			                 'blxz_6','zrdep_6','blyy_6','qrr_6','blfl_6','xs_6','tz_6','bjmc_7','xha_7','blxz_7',
//			                 'zrdep_7','blyy_7','qrr_7','blfl_7','xs_7','tz_7','bjmc_8','xha_8','blxz_8','zrdep_8',
//			                 'blyy_8','qrr_8','blfl_8','xs_8','tz_8',
			                 ];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="三包申请报告"){
			var dataArray = ['bdtype','subject','fileno','serviceaddr','acceptor','acceptno','produceno',
			                 'usersname','hth','zd','scjd','dhdw','typeno','power','checkdate','sertime',
			                 'parts','partxh','secoutno','partsxh','mapzyno','otherinfo','errdate','ifsb',
			                 'errorstatus','sbdh','errcontent','textarea2','textarea3','agentman','dept',
			                 'createdate','sendmobile','sendnumber','phone'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="质量部投诉流程"){
			var dataArray = ['fileno','subject','customname','tsflag','tel','contractno','tsdate','tscontect_textarea',
			                 'agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="非标报告作业处理流程"){
			var dataArray = ['piid','fileno','apellation','address','party','phone','date','model','floor','produceno',
			                 'date1','unit','date2','count','refermodel','duty','type','sendmobile','sendnumber',
			                 'agentman','dept','phone2','subject','report_textarea','newmeasure_textarea',
			                 'phone3','assort','sendreader','createdate',
			                 'createbypda','nextprocessuser','Fnextprocess'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="开具发票"){
			var dataArray = ['piid','fileno','sendmobile','sendnumber','agentman','dept','hth','gh','subject','pjlx',
			                 'pjqk','zfrq','kpje','kpbl','kpjegc','kpdf','kpjeyf','htzxqksm','yyyq_textarea'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="诉讼审批流程"){
			var dataArray = ['piid','fileno','dept','agentman','createdate','subject','yyleader',
			                 'isapply','applytime','lshfileno','hth','xmxz','bydw','dwmc1','fzr1','lxr1',
			                 'dwdz1','phone1','yb1','dwmc2','fzr2','lxr2','dwdz2','phone2','yb2','htdep',
			                 'httype','date','ts1','ts2','htmoney1','paymoney1','notpaymoney1','money1',
			                 'money2','money3','money4','money5','money6','date1','htmoney2','paymoney2',
			                 'notpaymoney2','money11','money12','money13','money14','money15','htmoney3',
			                 'paymoney3','notpaymoney3','money21','htmoney4','paymoney4','notpaymoney4','money31',
			                 'ortherdate1','ortherdate2','ortherdate3','paydate','paymoney','iskeep',
			                 'bcsm_textarea','reason_textarea'];
			this.setDataFromIds(dataArray);
		}
//分类：提案管理流程
		if(bpdname=="提案管理流程"){
			var dataArray = ['cheoss','ext1','fileno','agentman','no','sname','createdate','gsm','dep',
			                 'dep2','dep3','tel','hzr','taly','titype','zhuanti','subject','xzzy_textarea',
			                 'gszy_textarea','xgzy_textarea','conds','userid','username','node',
			                 'ctime','piid','processname','curauthor','dealmen','ygbh','form','arcpath',
			                 'arcdate','endprocessdate'];
			this.setDataFromIds(dataArray);
		}
	},
	
	
	
	
	//提交的data数据组装
	setDataFromIds : function(dataArray){
		var obj_this = this;
		var taskid = Ext.getCmp('taskid').getValue();
		var action="submit";
		var _notice="";
		var _ext="";
		var ovar="";
		var procname=Ext.getCmp('qc_bpdname').getValue();
		
		//data数据
		var data={"audit":{
			"userid":Ext.getCmp('userid').getValue(),
			"dept":OA_dept,
			"type":Ext.getCmp('type').getValue(),
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
		
		//改变
		data.mast.agentman=OA_usernames;
		data.mast.dept=OA_dept;
		data.mast.ygbh=OA_ygbh;
		//flowto数据
		_flowto=actionform.flowto;
		
		
		//query数据
		var query={
				"ext1":"OA_PDA",
				"df_id":OA_df_id,
				"piid":Ext.getCmp('piid').getValue(),
				"billno":Ext.getCmp('fileno').getValue(),
				"subject":Ext.getCmp('subject').getValue(),
				"df_name":OA_df_usernames,
				"df_time":Ext.getCmp('createdate').getValue(),
				"dep_name":Ext.getCmp('dept').getValue(),
		};

		cc.log("data+query");
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
						cc.log('提交成功，正在等待返回...');
						WL.Toast.show("提交成功，正在等待返回...");
						setTimeout(function(){
							obj_this.NextView('qc_StartProcess_id','HelcPDA.view.oa.startTheProcess.startTheProcess');
							var ViewId = Ext.getCmp('QC_View_id').getValue();
							var viewName=Ext.getCmp(ViewId);
							if(viewName){
								viewName.destroy();
							}
						},500);
						personnelList.name = null;
						personnelList={};
						choosePerson = [];
					};
					var content ={method:'DrafterSubmit' , param:[_vt , taskid , action,_flowto , data ,query , _notice ,_ext ,procname]};
					
					obj2.connectServer4(getResult3,content,1);
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


