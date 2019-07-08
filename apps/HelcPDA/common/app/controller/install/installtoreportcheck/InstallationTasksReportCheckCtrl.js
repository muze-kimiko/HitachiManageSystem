Ext.define('HelcPDA.controller.install.installtoreportcheck.InstallationTasksReportCheckCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//点击进入报检任务页面
			InstallatoinTasksReportCheckCtrl_toReportCheck:'button[id=InspectionTask_id]',
			//点击更新按钮
			InstallatoinTasksReportCheckCtrl_updateReportCheck:'button[id=updateReportCheck]',
		    //选择当前带合同号的
			InstallatoinTasksReportCheckCtrl_check_list:'list[id=check_list]',	
		    //点击第二个list触发的事情
			InstallatoinTasksReportCheckCtrl_check_list2:'list[id=check_list2]',
		    //全选
			InstallatoinTasksReportCheckCtrl_select_All:'button[id=select_All]',
			//反选
			InstallatoinTasksReportCheckCtrl_select_other:'button[id=select_other]',
		    //返回
			Bj_Listback:'button[id=Bj_Listback]',
			BJ_Back:'button[id=BJ_Back]'
		},
		control:{
			InstallatoinTasksReportCheckCtrl_toReportCheck:{
				tap:'toReportCheck'
			},
			InstallatoinTasksReportCheckCtrl_updateReportCheck:{
				tap:'updateReportCheck'
			},
			InstallatoinTasksReportCheckCtrl_check_list:{
				itemtap:'check_list'
			},
			InstallatoinTasksReportCheckCtrl_check_list2:{
				itemtap:'check_list2_'
			},
			InstallatoinTasksReportCheckCtrl_select_All:{
				tap:'select_All'
			},
			InstallatoinTasksReportCheckCtrl_select_other:{
				tap:'select_other'
			},
			Bj_Listback:{
				tap:'Bj_Listback'
			},
			BJ_Back:{
				tap:'BJ_Back'
			}
		}
		
	},
	BJ_Back:function(){
		this.BackView();
		bjflag=0;
	},
	Bj_Listback:function(){
     this.BackView();
	},
	//更新按钮
	updateReportCheck:function(){
		var obj=this;
		var getResult=function(res){
			var list=[];
			list=res.rows;
			//alert(JSON.stringify(list[0]));
			//搜索到相关信息
			if(list==''||list==null||typeof(list)=='undefined'){
				 WL.Toast.show("暂无新的信息");
				 return;
			}else{
				var store=obj.getStore("InstallatoinTasksReportCheckStore","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheckStore");
				var ENGCONTRACT_NUMBER_LIST=[];
				var length=list.length;
				for(var i=0;i<length;i++){
					ENGCONTRACT_NUMBER_LIST[i]=list[i].ENGCONTRACT_NUMBER;	
				}
		       var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
		       var UNIQ_CUSTOMER_NAME=[];
		       for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
		    	   for(var j=0;j<length;j++){
		    		   if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].ENGCONTRACT_NUMBER){
		    			   UNIQ_CUSTOMER_NAME[i]=list[j].CUSTOMER_NAME;
		    		   }
		    	   }
		       }
		       var NEW_NEED_LIST=[];
		       var SumSub=0;
				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
					  var CNTER_NEED={};
					  CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
					  CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
					  CNTER_NEED.NUM1=list[i].NUM1;
					  CNTER_NEED.NUM2=list[i].NUM2;
					  CNTER_NEED.NUM3=list[i].NUM3;
					  var tempNum4=0;
					  var tempNum5=0;
					for(var j=0;j<length;j++){
					if(list[j].ENGCONTRACT_NUMBER==UNIQ_ENGCONTRACT_NUMBER_LIST[i]){
						 if(list[j].FLGS=='未提交'){
							 tempNum4++;
							 
				           }else{
				        	 tempNum5++;
					      } 
						  }
					if(list[j].FLGS=='未提交'){
						SumSub++;
					}
					  }
					
					  CNTER_NEED.NUM4=tempNum4;
					  CNTER_NEED.NUM5=tempNum5;
					  CNTER_NEED.SumSub=SumSub;
					  NEW_NEED_LIST[i]=CNTER_NEED;
				  }
				store.setData(NEW_NEED_LIST);
				//开始循环计算总台数，总提交数，未提交数
				var length=NEW_NEED_LIST.length;
				var TotNum=0;
				var TotNum1=0;
				var TotNum2=0;
				for(var i=0;i<length;i++){
					TotNum+=(parseInt(NEW_NEED_LIST[i].NUM5)+parseInt(NEW_NEED_LIST[i].NUM4));//总台数
					TotNum1+=(parseInt(NEW_NEED_LIST[i].NUM5)); //总提交数
					TotNum2+=(parseInt(NEW_NEED_LIST[i].SumSub));
				}
				Ext.getCmp('NUM1').setHtml("总台数("+TotNum+")");;
				Ext.getCmp('NUM2').setHtml("已提交("+TotNum1+")");
				Ext.getCmp('NUM3').setHtml("未提交("+(TotNum-TotNum1)+")");;
			
				 var WL_check=WL.JSONStore.get(collectionName);
				 
				  
				  var query={tcode:'_check_list'+ebs_user_id,tid:'check_task'};
				  WL_check.find(query).then(function(res){
					  if(!(res==''||res==null||typeof(res)=='undefined')){
						   WL_check.remove(query).then(function(){  
						    	
							     var query={tcode:ebs_user_id+"_check"};
				                 WL_check.find(query).then(function(res){
								  if(!(res==''||res==null||typeof(res)=='undefined')){
									  WL_check.remove(query).then(function(){  
									    	addData();
									  }).fail(function(){WL.Toast.show("删除多个list列表失败");});
									 }
				                 });
						  }).fail(function(){WL.Toast.show("删除单个list列表失败");});
						  
					  }else{
						  addData();
					  }
					  });
				  
				  function  addData(){
					  //保存第一张list界面生成的数据
					  var  query1={tcode:'_check_list'+ebs_user_id,tid:'check_task',stext:NEW_NEED_LIST};
					  WL_check.add(query1).then(function(){
						//循环添加每一条到JSONStore
					  	  //当用户点击更新的时候，要清楚掉当前缓存的数据，重新赋值
							  var ndata=[];
							  for(var i=0;i<list.length;i++){
								  var query={};
								   query={tcode:ebs_user_id+"_check",tid:JSON.stringify(list[i].ENGCONTRACT_NUMBER),stext:list[i]};
							       ndata[i]=query;
							  }
							  WL_check.add(ndata).then(function(){
							  }).fail(function(err){
								  WL.Toast.show("缓存失败");
							  });
					  }).fail(function(err){
						  WL.Toast.show("第一张list添加失败");
					  });
					  
					  
				  }
			
			}
	       
		};
		 var content="{'userid':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"'}";    					
		 this.connectServer(getResult,'baojianAction.do?method=toSearch',content);
	},
	
	//点击第一个list触发的事件
	check_list:function(obk,index,target,record,e,eOpts){
		    var obj=this;   
		    var store=obj.getStore("InstallatoinTasksReportCheckStore","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheckStore");
		    var ENGCONTRACT_NUMBER=store.getAt(index).get("ENGCONTRACT_NUMBER");	
		    //开始查找对应的第二list
		   
		    obj.NextView('installationTasksReportCheckPanel1','HelcPDA.view.install.installtoreportcheck.InstallationTasksReportCheckPanel1');
		    //隐藏文本框设置值
		    Ext.getCmp('hidden_ENGCONTRACT_NUMBER').setValue(ENGCONTRACT_NUMBER);
		    var WL_task=WL.JSONStore.get(collectionName);
		    
		    var query={tcode:ebs_user_id+"_check",tid:JSON.stringify(ENGCONTRACT_NUMBER)};
		    WL_task.find(query).then(function(res){
		        var list=[];
		    	for(var i=0;i<res.length;i++){
		    		list[i]=res[i].json.stext;
		    		lists[i]=res[i].json;
		    	}
		    	var store1=obj.getStore("InstallatoinTasksReportCheck_1Store","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheck_1Store");
		    	store1.setData(list);
	
		    }).fail(function(err){
		    	WL.Toast.show("查找缓存失败");
		    });
	},
	//点击第二个list触发的事情
	check_list2_:function(obk,index,target,record,e,eOpts){
		var obj=this; 
		var store=obj.getStore("InstallatoinTasksReportCheck_1Store","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheck_1Store");
		var ELEVATOR_NO=store.getAt(index).get("ELEVATOR_NO");	
		var css=document.getElementById(ELEVATOR_NO);
		if(event.target.id==ELEVATOR_NO){
		    if(css.className =='p_judge_box_clicked'){
		    	css.className='p_judge_box';
		    }
		    else{
		    	css.className='p_judge_box_clicked';
		   }
		    return;
		}
		 css.className='p_judge_box_clicked';
		
		 this.NextView('installationTasksReportCheckDetailPanel','HelcPDA.view.install.installtoreportcheck.InstallationTasksReportCheckDetailPanel');
		//左右滑动页签
			var ITF_tab = Ext.getCmp('REPORT_CHECK_TABPANEL'); 
			//左右滑动页签
			var i =0;
			Ext.get('REPORT_CHECK_TABPANEL').on('swipe',function(e,t){
				
				if (e.direction === 'left' && e.distance >= 10) {
					ITF_tab.setActiveItem(ITF_tab.innerItems[i+1]);
					if(i==ITF_tab.innerItems.length-1){
					}else{
						i++;
					}
			    } else if (e.direction === 'right' && e.distance >= 10) {
			    	ITF_tab.setActiveItem(ITF_tab.innerItems[i-1]);
			    	if(i==0){
			    	}else{
			    		i--;
			    	}
			    }
			});
			
			ITF_tab.addListener('activeitemchange',function(obj,value,oldValue,eOpts  ){
				var itemId = value.id;
				if (itemId == 'bjcontainner_1') {
					i=0;
				}else if (itemId == 'bjcontainner_2') {
					i=1;
				}
			},this,{
			});
		 
		 
		 WL_taskCheck=WL.JSONStore.get(collectionName);
			 var query={tcode:ebs_user_id+"_check"};
			 WL_taskCheck.find(query).then(function(res){
				 var length=res.length;
					 for(var j=0;j<length;j++){
						 if(res[j].json.stext.ELEVATOR_NO==ELEVATOR_NO){
							 setElemet(res[j]);
							 list_CheckReport[0]=res[j];
						 }
				 }
			 }).fail(function(){
				 WL.Toast.show('未找到相关信息');
			 });    

	},
	//全选
	select_All:function(){
		  var store=this.getStore("InstallatoinTasksReportCheck_1Store","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheck_1Store");
		  var res=store.getData();
		  var length=res.length;
		  for(var i=0;i<length;i++){
			  var css=document.getElementById(res.getAt(i).get('ELEVATOR_NO'));
			  css.className='p_judge_box_clicked';
		  }
	},
	//反选
	select_other:function(){
		  var store=this.getStore("InstallatoinTasksReportCheck_1Store","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheck_1Store");
		  var res=store.getData();
		  var length=res.length;
		  for(var i=0;i<length;i++){
			  var css=document.getElementById(res.getAt(i).get('ELEVATOR_NO'));
			  if(css.className =='p_judge_box_clicked'){
			    	css.className='p_judge_box';
			    }
			    else{
			    	css.className='p_judge_box_clicked';
			   }
		  }
	}
});

Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
};
