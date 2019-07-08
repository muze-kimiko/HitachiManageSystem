
/* JavaScript content from app/controller/ForApprovalProcess/DailyOffice/Idea/approvalOpinionCtrl.js in folder common */
/**
 * 审批意见
 */
Ext.define('HelcOA.controller.ForApprovalProcess.DailyOffice.Idea.approvalOpinionCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'approvalOpinionCtrl_ID',
	config:{
		control:{
			'button#returnTravelRequest_ID':{
				tap:'returnTravelRequest',
			 },
			 'button#submitTravelRequest_ID':{
				tap:'submitTravelRequest',
			 },
			 "list#reutingList_ID":{
				itemtap:'select'
			 },
			 "selectfield#select_ideaCon":{
				 change:'select_ideaCon'
			 },
		}
	},
	
	//改变常用意见给意见赋值
	select_ideaCon : function(obj, newValue, oldValue, eOpts){
		var idea = Ext.getCmp('ideaCon_ID').getValue();
		if(newValue != ""){
			if(idea != "" && idea !=null){
				Ext.Msg.confirm('确定','意见栏已有意见，确定覆盖吗？',function(btn){
					if (btn == 'yes'){
						Ext.getCmp('ideaCon_ID').setValue(newValue);
					}else{
						return;
					}
				});
			}else{
				Ext.getCmp('ideaCon_ID').setValue(newValue);
			}
		}
	},
	
	//返回上一页
	returnTravelRequest:function(obj, e, eOpts){
		this.showBackView();
		var _obj = Ext.getCmp(returnForm);
		Ext.Viewport.setActiveItem(_obj);
		personnelList.name = null;
		personnelList={};
		choosePerson = [];
	},
	
	//进入选人界面与选择流程
	select : function(obj, index, target, record, e, eOpts){
		var obj_this = this;
		var sbenoCheck=document.getElementsByName('groupCheckbox2');
		var assign = record.raw.cfg.cfg.assign;
		//单选、多选(单选=fo,多选=fm,全选=fa)
		var obj_nextacti=record._data.nextacti;
		var obj_conds=record._data.conds;
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
		var hasuser=record.raw.cfg.cfg.hasuser;
		
		Ext.getCmp('nextacti').setValue(obj_nextacti);
		Ext.getCmp('conds').setValue(obj_conds);
		Ext.getCmp('LY_index').setValue(index);
		Ext.getCmp('forkname').setValue(record.data.forkname);
		
		if(event.target.id!='pid'){
			if(hasuser==1){
				aa(assign,record.data,index);
			}else{
				if(sbenoCheck[index].className == 'p_judge_box_clicked'){
					sbenoCheck[index].className = 'p_judge_box';
				}else{
					sbenoCheck[index].className = 'p_judge_box_clicked'
					actionform.flowto={};
					actionform.flowto[record.data.forkname]={};
					actionform.flowto[record.data.forkname].conds=record.data.conds;
					actionform.flowto[record.data.forkname].users=[];
				}
			}
			
		}else if(event.target.id=='pid' && sbenoCheck[index].className == 'p_judge_box_clicked'){
			sbenoCheck[index].className = 'p_judge_box';
		}else{
			if(hasuser==1){
				aa(record.data,index);
			}else{
				actionform.flowto={};
				actionform.flowto[record.data.forkname]={};
				actionform.flowto[record.data.forkname].conds=record.data.conds;
				actionform.flowto[record.data.forkname].users=[];
			}
		}
		
		
		
		//进入选人界面
		function aa(assign,vdata,idx){
			var url = record.raw.url;
			var store=Ext.data.StoreManager.get("personnelSelectionS");
			if(!store){
				store=Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS");
			}
			if(typeof(personnelList["SP_"+vdata.name])!=undefined && personnelList["SP_"+vdata.name]!=null && personnelList["SP_"+vdata.name]=="SP_"+vdata.name){
				obj_this.showBackView('personnelSelection_id','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.personnelSelection');
				store.setData(personnelList["SP_"+vdata.name+"data"]);	
				
				var sbenoCheck=document.getElementsByName('p_judge_color3');
				for(var i =0;i<personnelList["SP_"+vdata.name+"check"].length;i++){
					sbenoCheck[personnelList["SP_"+vdata.name+"check"][i]].className='p_judge_box_clicked';
				}
				Ext.getCmp('inquireCon_ID').setValue();
				Ext.getCmp('SP_name').setValue("SP_"+vdata.name);
			}else{
				function getResult(result) {
					var userSolist=[];
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
					obj_this.NextView('personnelSelection_id','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.personnelSelection');
					//默认选中带出来的所有人
					if(userSolist.length!=0){
						var sbenoCheck=document.getElementsByName('p_judge_color3');
						for(var nb=0;nb<userSolist.length;nb++){
							sbenoCheck[nb].className='p_judge_box_clicked';
							var personnelSelectionS = obj_this.getStore('personnelSelectionS','HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS');
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
						Ext.getCmp('select_person_TB_SP').setHidden(true);
						
					}
					
					//判断多选时用--当multflag等于1的时候可以多选，multqty为多选时最多可以选择的最大人数
					Ext.getCmp('SP_multflag').setValue(assign.multflag);
					Ext.getCmp('SP_multqty').setValue(assign.multqty);
					
					Ext.getCmp('SP_name').setValue("SP_"+vdata.name);
					Ext.getCmp('SP_forkname').setValue(vdata.forkname);
					Ext.getCmp('SP_conds').setValue(vdata.conds);
					Ext.getCmp('SP_idx').setValue(idx);
					cc.log(actionform);
					cc.log("jsonP----------------------");
					
//					var sbenoCheck=document.getElementsByName('p_judge_color3');
					
//					for(var nb=0;nb<userSolist.length;nb++){
//						if(actionform.flowto[userSolist[nb].forkname]!=null){
//							for(var i=0;i<actionform.flowto[userSolist[nb].forkname].users.length;i++){
//								if(userSolist[nb].key==actionform.flowto[userSolist[nb].forkname].users[i]&&actionform.flowto[userSolist[nb].forkname].conds==userSolist[nb].conds){
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
			 
			
		}
		//}
	},
	
	//提交审批意见
	submitTravelRequest:function(obj, e, eOpts){
		var bpdname=Ext.getCmp('surface_ID').getTitle()._title;
 //分类：日常办公
		if(bpdname=="工作联络书"){
			var dataArray = ['phone','e_date','subject','neirong_textarea'];
			this.setDataFromIds(dataArray);
		}
	
		if(bpdname=="出差申请"){
			var dataArray = ['ygh','peonum','query_xm','query_bm','phone','query_zw','phone_sfz','place','starttime','rettime','plant','area',
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
			var dataArray = ['fileno','createdate','fenshu','subject','sqliyou_textarea'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="公司对外合同审批流程"){
//			beianno 'bano'
//			if(Ext.getCmp('node').getValue()=='审计监察部审批'){
				var dataArray = ['fileno','subject','mycontractno','nextcontractno','contracttype',
				                 'addr','zbflag','zbxm','contractyear','paytype','threeflag','htfs','beianno','bano','tsbano',
				                 'lxdh','sqliyou_textarea','dept','caiwureason_textarea','zfpage','zfname','hqflag', 
				                 'hqleader','reportdate','agentman','createdate','cwflag','fwflag','fjflag'];
				this.setDataFromIds(dataArray);
//			}else{
//				var dataArray = ['fileno','subject','mycontractno','nextcontractno','contracttype',
//				                 'addr','zbflag','zbxm','contractyear','paytype','threeflag','htfs', 
//				                 'lxdh','sqliyou_textarea','dept','caiwureason_textarea','zfpage','zfname','hqflag', 
//				                 'hqleader','reportdate','agentman','createdate','cwflag','fwflag','fjflag'];
//				this.setDataFromIds(dataArray);
//			}
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
		if(bpdname == "公务用车联络流程"){
//			if(Ext.getCmp('node').getValue()=='车辆管理部门审批'){
				var dataArray = ['ext1','fileno','subject','agentman','dept',
				                 'ycdate','sj','ycdate1','sj1','lxr','ycrs','place','ch','sj2','sjtel',
				                 'sendmobile','sendnumber','xicheng_textarea','reasion_textarea', 
				                 'lxrdh','createdate'];
				this.setDataFromIds(dataArray);
//			}else{
//				var dataArray = ['ext1','fileno','subject','agentman','dept',
//				                 'ycdate','sj','ycdate1','sj1','lxr','ycrs','place',
//				                 'sendmobile','sendnumber','xicheng_textarea','reasion_textarea',
//				                 'lxrdh','createdate'];
//				this.setDataFromIds(dataArray);
//			}
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
		if(bpdname == "内部法律咨询流程"){
			var dataArray = ['fileno','dept','agentman','createdate','zxlx','subject','reason_textarea',
			                 'tel','email','sendreader','completeddate','recycle'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="物业公司对外合同审批流程"){
//			beianno
//			if(Ext.getCmp('node').getValue()=='审计监察局审批'){
//				alert(Ext.getCmp('beianno').getValue());
				var dataArray = ['fileno','tiaojian01','tiaojian02','subject','mycontractno','nextcontractno','contracttype',
				                 'addr','zbflag','zbxm','contractyear','paytype','threeflag','htfs','beianno',
				                 'lxdh','sqliyou_textarea','dept','caiwureason_textarea','zfpage','zfname','hqflag', 
				                 'hqleader','reportdate','agentman','createdate','cwflag','fwflag','fjflag'];
				this.setDataFromIds(dataArray);
//			}else{
//				var dataArray = ['fileno','tiaojian01','tiaojian02','subject','mycontractno','nextcontractno','contracttype',
//				                 'addr','zbflag','zbxm','contractyear','paytype','threeflag','htfs', 
//				                 'lxdh','sqliyou_textarea','dept','caiwureason_textarea','zfpage','zfname','hqflag', 
//				                 'hqleader','reportdate','agentman','createdate','cwflag','fwflag','fjflag'];
//				this.setDataFromIds(dataArray);
//			}
		}
		if(bpdname=="接待客户工作联络流程"){
			var dataArray = ['fileno','ccompany','num','company','subject','lfkh','zw','tel',
			                 'lfkh1','zw1','tel1','lfkh2','zw2','tel2','pt','dh','qtqk','yyy','ssqy',
			                 'isneed1','jdate','isneed1','hb','stime','etime','isneed2','cdate','time2',
			                 'isneed3','czdate','time3','isneed4','ycdate','time4','isneed5','sendreader',
			                 'hotel','room','ycdate1','ycdate2','hbthing_textarea','zftype','agentman','time',
			                 'sendmobile','sendnumber','jsname','cphao','slname','lxtel','ccdate','didian',
			                 'sltime','lxr','lxrdh'];
			this.setDataFromIds(dataArray);
		}
		if(bpdname=="境外出差申请"){
//			button206,radio113
//			if(Ext.getCmp('node').getValue()=="总裁办主任审批"){
				var dataArray = ['piid','fileno','ygh','query_xm','dep','createdate','peonum','peonum2','peonum3','subject','starttime','rettime',
				                 'qz_type','qystyle','country','button206','addr','ifbl','cc_type','biz','plant','fee','prefee',
				                 'fysm1','fyxj1','fysm2','fyxj2','fysm3','fyxj3','fysm4','fyxj4','fysm5','fyxj5',
				                 'otherfee','feesum','book_money','yyje','feesum2','ifyfxm','projectno','projectname','reason_textarea','radio113',
				                 'kzname','staytime','query_zw','kzno','bzname','bzno','bbzname','bbzno','zjlname','zjlno','guoji','sendreader',
				                 'query_bm','gwlist','fs1','fs2','fs3','zs1','zs2','zs3','bt1','bt2','bt3','sta'];
				this.setDataFromIds(dataArray);
//			}else{
//				var dataArray = ['piid','fileno','ygh','query_xm','dep','createdate','peonum','peonum2','peonum3','subject','starttime','rettime',
//				                 'qz_type','qystyle','country','addr','ifbl','cc_type','biz','plant','fee','prefee',
//				                 'otherfee','feesum','book_money','yyje','feesum2','ifyfxm','projectno','projectname','reason_textarea',
//				                 'kzname','staytime','query_zw','kzno','bzname','bzno','bbzname','bbzno','zjlname','zjlno','guoji','sendreader',
//				                 'query_bm','gwlist','fs1','fs2','fs3','zs1','zs2','zs3','bt1','bt2','bt3','sta'];
//				this.setDataFromIds(dataArray);
//			}
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
		if(bpdname=="PO单审核"){
			var dataArray = ['fileno','create_by','emp_no','sent_time','vendor_site_code','vendor_name','po_number','po_header_id'];
			this.setDataFromIds_PO(dataArray);
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
		if(bpdname=="开具发票"){
			var dataArray = ['fileno','sendmobile','sendnumber','agentman','dept','hth','gh','subject','pjlx','pjqk','zfrq','kpje','kpbl','kpjegc','kpdf','kpjeyf','htzxqksm','yyyq_textarea'];
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
			                 'gszy_textarea','xgzy_textarea','leibie','xingshi','riqi1','ishg','iscn1',
			                 'ssy','iscn','xmzrr','gsqzy','gsqzy1','gsqzy2','gsqzy3','fena','fenb','jsx',
			                 'cxx','yjnd','syx','zongfen','pingji','conds','userid','username','node',
			                 'ctime','piid','processname','curauthor','dealmen','ygbh','form','arcpath',
			                 'arcdate','endprocessdate'];
			this.setDataFromIds(dataArray);
		}
		//分类：质量控制
		if(bpdname=="三包申请报告"){
			var dataArray = ["acceptno", "acceptor", "agentman", "checkdate", 
			                 "bdtype","depid", "dhdw", "drawno", "errcontent", "errdate", "errorstatus",
			                 "ffway", "ffway2", "fhdw", "fileno", "fnextprocess","fpzr", "zd", 
			                 "ifsb", "ifzd", "isagree2", "isneedtocreate", "issb",
			                 "isxs", "isyz", "isyz2", "iszdxm", "jjcd", "judge", "mapno", "mapzyno", "newno",
			                 "nextprocessuser", "oldbackdate", "oldbackno", "oldno", "oldoutno", 
			                 "oldreturndate", "oldreturnno", "otherinfo", "parts", "partsxh", "partxh", 
			                 "phone", "power", "produceno", "qtpart", "reportdate", "sbdh", "scjd",
			                 "secoutno", "sendmobile", "sendnumber", "sersenddate", "sersendno", "sertime",
			                 "hth","serviceaddr", "servicecause", "shrphone", "subject", "textarea", 
			                 "textarea2", "textarea3", "textarea4", "tjaddr", "typeno", "usersname", 
			                 "wlcom", "worktel", "worktel2", "wzcode", "zzjudge","createdate"];
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
			                 'gb','implement_date','gb_leader','gb_list',
			                 'tldh','tldate','qaleader','sj_list','nextprocessuser','fnextprocess',
			                 'wlgc_1','wlgc_2','wlgc_3','wlgc_4','wlgc_5','wlgc_6','wlgc_7','wlgc_8',
			                 'decision','sj','sj_leader','bjmc_1','xha_1','blxz_1','zrdep_1','blyy_1','qrr_1','blfl_1',
			                 'xs_1','tz_1','bjmc_2','xha_2','blxz_2','zrdep_2','blyy_2','qrr_2','blfl_2','xs_2',
			                 'tz_2','bjmc_3','xha_3','blxz_3','zrdep_3','blyy_3','qrr_3','blfl_3','xs_3','tz_3',
			                 'bjmc_4','xha_4','blxz_4','zrdep_4','blyy_4','qrr_4','blfl_4','xs_4','tz_4','bjmc_5',
			                 'xha_5','blxz_5','zrdep_5','blyy_5','qrr_5','blfl_5','xs_5','tz_5','bjmc_6','xha_6',
			                 'blxz_6','zrdep_6','blyy_6','qrr_6','blfl_6','xs_6','tz_6','bjmc_7','xha_7','blxz_7',
			                 'zrdep_7','blyy_7','qrr_7','blfl_7','xs_7','tz_7','bjmc_8','xha_8','blxz_8','zrdep_8',
			                 'blyy_8','qrr_8','blfl_8','xs_8','tz_8',];
			this.setDataFromIds(dataArray);
		}
		//分类:人力资源
		if(bpdname=="丧假申请流程（派驻人员专用）"){
			var dataArray = ['agentman','dept','qjr','subject','level1','kqy','phone','sendmobile','sendnumber',
			                 'startdate','enedate','reason_textarea'];
			this.setDataFromIds(dataArray);
		}
	},
	
	//提交的data数据组装
	setDataFromIds : function(dataArray){
		var obj_this = this;
		cc.log('--------------actionform------------');
		cc.log(actionform);
		var idea = Ext.getCmp('ideaCon_ID').getValue();
		var taskid = Ext.getCmp('taskid').getValue();
		var action="submit";
		var data={"audit":{
			"userid":usernames,
			"idea":idea,
			"dept":Ext.getCmp('dept').getValue(),
			"type":Ext.getCmp('type').getValue(),
			"username":actionform.curuser.fullname,
			"node":actionform.acti.node.name,
			"taskid":Ext.getCmp('taskid').getValue()
			},
			"piid":Ext.getCmp('piid').getValue(),
			"mast":{}
			};
		for(var i=0;i<dataArray.length;i++){
			var dataId = dataArray[i];
			cc.log(dataId);
			if(Ext.getCmp(dataId)){
				var dataMast = Ext.getCmp(dataId).getValue();
				data.mast[dataId]=dataMast;
			}
		}
		data.mast.ext1=Ext.getCmp('ext1').getValue();
		for(key in actionform.data.mast){
          	try{
          		data.mast[key]=Ext.getCmp(key).getValue();
          	}catch(e){}
         }
		data = JSON.stringify(data);
		cc.log("-------------data--------------");
		cc.log(data);
		var dataOne=eval("("+ data +")");
		cc.log(dataOne.audit.node.name);
		
		_flowto=actionform.flowto;
		_flowto = JSON.stringify(_flowto);
		cc.log("-------------_flowto--------------");
		cc.log(_flowto);
		
		var query={
				"ext1":Ext.getCmp('ext1').getValue(),
				"df_id":Ext.getCmp('ygbh').getValue(),
				"piid":Ext.getCmp('piid').getValue(),
				"billno":Ext.getCmp('fileno').getValue(),
				"subject":Ext.getCmp('subject').getValue(),
				"df_name":Ext.getCmp('agentman').getValue(),
				"df_time":Ext.getCmp('createdate').getValue(),
				"dep_name":Ext.getCmp('dept').getValue(),
				};
		
		query = JSON.stringify(query);
		cc.log("-------------query--------------");
		cc.log(query);
		
		var _notice="";
		var _ext="";
		var ovar="";
		var procname=Ext.getCmp('surface_ID').getTitle();
		
		cc.log('----procname----');
		cc.log(procname._title);
		procname = procname._title;
		
		var backFunc=function (obj2){
			Ext.Msg.confirm('','确定提交？',function(btn){
				if (btn == 'yes'){
					var getResult3=function(res){
						cc.log("xkc---------------------20150327");
						cc.log("-----res----");
						cc.log(res);
						var jsonObj=Ext.JSON.decode(res.msg);
						if(jsonObj.status.code!="200"){
							cc.log('错误信息，无法提交');
							cc.log(jsonObj.status.msg);
							Ext.Msg.alert(jsonObj.status.msg);
							WL.Toast.show(jsonObj.status.msg);
							return;
						}else{
							cc.log('提交成功，正在等待返回...');
							WL.Toast.show("提交成功，正在等待返回...");
							setTimeout(function(){
								obj_this.NextView('Menus_id', 'HelcOA.view.Menus');
								obj_this.getApplication().getController('loginCtrl').loadMenus(_vt,'WebServiceTest',1);
								var ViewId = Ext.getCmp('SP_View_id').getValue();
								var viewName=Ext.getCmp(ViewId);
								if(viewName){
									viewName.destroy();
								}
							},500);
							personnelList={};
							choosePerson = [];
						}
					};
					var content ={method:'ApprovalProcess' , param:[_vt , taskid , action,_flowto , data ,query , _notice ,_ext ,procname ]};
					obj2.connectServer4(getResult3,content,1);
					cc.log("-------params-------");
					cc.log(content);
				}else{
					return;
				}
			});

			cc.log(obj2);
		};
		var blag=false;
		var sbenoCheck=document.getElementsByName('groupCheckbox2');
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				blag=true;
			}
			
		}
		
		if(idea=="" || idea==null || idea==undefined){
			Ext.Msg.alert('提示','请填写意见');
		}else if(!blag){
			Ext.Msg.alert('提示','请选择流程');
		}else{
			 backFunc(this);
		}
	
	},
	
	
	

	//提交的data数据组装
	setDataFromIds_PO : function(dataArray){
		var obj_this = this;
		cc.log('--------------actionform------------');
		cc.log(actionform);
		var idea = Ext.getCmp('ideaCon_ID').getValue();
		var taskid = Ext.getCmp('taskid').getValue();
		var action="submit";
		var data={"audit":{
			"userid":usernames,
			"idea":idea,
			"dept":Ext.getCmp('dept').getValue(),
			"type":Ext.getCmp('type').getValue(),
			"username":actionform.curuser.fullname,
			"node":actionform.acti.node.name,
			"taskid":Ext.getCmp('taskid').getValue()
			},
			"piid":Ext.getCmp('piid').getValue(),
			"mast":{}
			};
		for(var i=0;i<dataArray.length;i++){
			var dataId = dataArray[i];
			var dataMast = Ext.getCmp(dataId).getValue();
			data.mast[dataId]=dataMast;
		}
		data.mast.ext1="ERP_PC";  
		for(key in actionform.data.mast){
          	try{
          		data.mast[key]=Ext.getCmp(key).getValue();
          	}catch(e){}
         }
		data = JSON.stringify(data);
		cc.log("-------------data--------------");
		cc.log(data);
		
		_flowto=actionform.flowto;
		_flowto = JSON.stringify(_flowto);
		cc.log("-------------_flowto--------------");
		cc.log(_flowto);
		
		var query={
				"ext1":"ERP_PC",
//				"df_id":Ext.getCmp('ygbh').getValue(),
				"piid":Ext.getCmp('piid').getValue(),
//				"billno":Ext.getCmp('fileno').getValue(),
				"subject":Ext.getCmp('subject').getValue(),
//				"df_name":Ext.getCmp('agentman').getValue(),
//				"df_time":Ext.getCmp('createdate').getValue(),
//				"dep_name":Ext.getCmp('dept').getValue(),
				};
		
		query = JSON.stringify(query);
		cc.log("-------------query--------------");
		cc.log(query);
		
		var _notice="";
		var _ext="";
		var ovar="";
		var procname=Ext.getCmp('surface_ID').getTitle();
		
		cc.log('----procname----');
		cc.log(procname._title);
		procname = procname._title;
		
		var backFunc=function (obj2){
			Ext.Msg.confirm('','确定提交？',function(btn){
				if (btn == 'yes'){
					var getResult3=function(res){
						cc.log("-----res----");
						cc.log(res);
						var jsonObj=Ext.JSON.decode(res.msg);
						if(jsonObj.status.code!="200"){
							cc.log('错误信息，无法提交');
							cc.log(jsonObj.status.msg);
							Ext.Msg.alert(jsonObj.status.msg);
							WL.Toast.show(jsonObj.status.msg);
							return;
						}else{
							cc.log('提交成功，正在等待返回...');
							WL.Toast.show("提交成功，正在等待返回...");
							setTimeout(function(){
								obj_this.NextView('Menus_id', 'HelcOA.view.Menus');
								obj_this.getApplication().getController('loginCtrl').loadMenus(_vt,'WebServiceTest',1);
								var ViewId = Ext.getCmp('SP_View_id').getValue();
								var viewName=Ext.getCmp(ViewId);
								if(viewName){
									viewName.destroy();
								}
							},500);
							personnelList={};
							choosePerson = [];
						}
					};
					var content ={method:'ApprovalProcess' , param:[_vt , taskid , action,_flowto , data ,query , _notice ,_ext ,procname ]};
					obj2.connectServer4(getResult3,content,1);
					cc.log("-------params-------");
					cc.log(content);
				}else{
					return;
				}
			});

			cc.log(obj2);
		};
		var blag=false;
		var sbenoCheck=document.getElementsByName('groupCheckbox2');
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				blag=true;
			}
			
		}
		
		if(idea=="" || idea==null || idea==undefined){
			Ext.Msg.alert('提示','请填写意见');
		}else if(!blag){
			Ext.Msg.alert('提示','请选择流程');
		}else{
			 backFunc(this);
		}
	
	},
});


