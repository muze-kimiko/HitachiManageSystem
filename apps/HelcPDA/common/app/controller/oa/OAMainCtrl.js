

Ext.define('HelcPDA.controller.oa.OAMainCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入OA主界面
			OAMain_toOA:'image[id=buttonOA]',
			//进入起草菜单界面
			OAMain_toMenus:'button[id=to_Menus]',
			//起草菜单进入非标报告作业处理流程界面
			OAMain_OAReporthandle:'button[id=OA_Report_handle]',
		    //选择已提交触发申请资料事件
			OAMain_tabpanel:'container[id=OA_UNSub]',
			//保存所有数据
			OAMain_saveOAReport:'button[id=save_OAReport]',
			//提交所有数据
			OAMain_submitOAReport:'button[id=submit_OAReport]',
		    //点击未提交list，进入对应的界面
			OAMain_taplist2:'list[id=OA_list2]',
			//在线查询流程信息
			OAMain_taplist1:'list[id=OA_list1]'
		},
		control:{
			OAMain_toOA:{
				tap:'buttonOA'
			},
			OAMain_toMenus:{
				tap:'toMenus'
			},
			OAMain_OAReporthandle:{
				tap:'OAReporthandle'
			},
			OAMain_tabpanel:{
				deactivate:'OAtabpanel'
			},
			OAMain_saveOAReport:{
				tap:'saveOAReport'
			},
			OAMain_taplist2:{
				itemtap:'OAMain_taplist2'
			},
			OAMain_submitOAReport:{
				tap:'submitOAReport'
			},
			OAMain_taplist1:{
				itemtap:'OAMain_taplist1'
			}
		}
		
	},
	//进入OA主界面
	buttonOA:function(){
	  this.NextView('oAMainPanel','HelcPDA.view.oa.OAMainPanel');
	  Ext.getCmp('OA_tabpanel').setActiveItem(2);
	  var store=this.getStore('OAMainListStore','HelcPDA.store.oa.OAMainListStore');
	  var query={tid:'OA_'};
	  function getResult(res){
		  var List=findNewList(res,0);
		  store.setData(List);
	  }
	  WL_find(query,getResult);
	},
	//进入起草菜单界面
	toMenus:function(){
	  this.NextView('oAMenusView','HelcPDA.view.oa.OAMenusView');
	  
	},
	//起草界面进入非标报告作业处理流程
	OAReporthandle:function(){
	  this.NextView('oAReportDetailPanel','HelcPDA.view.oa.OAReportDetailPanel');	
	},
	//点击选择已提交触发事情
	OAtabpanel:function(oldActiveItem, obk, newActiveItem, eOpts){
	   var obj=this;
		function getResult(res){
	    	var List=findNewList(res,1);
	    	var store=obj.getStore('OAMainList1Store','HelcPDA.store.oa.OAMainList1Store');
	    	store.setData(List);
	    }
	    var content="{'USERID':'"+userid+"'}";
	  	this.connectServer(getResult, 'businessTripApplyAction.do?method=toSearch', content);
	},
	//点击保存按钮
	saveOAReport:function(){
		var obj=this;
	   function getRes(_id){
		   Ext.getCmp('OA_id').setValue(_id);
			  var query={tid:'OA_'};
			  function getResult(res){
				  var store=obj.getStore('OAMainListStore','HelcPDA.store.oa.OAMainListStore');
				  var List=findNewList(res,0);
				  store.setData(List);
			  }
			  WL_find(query,getResult); 
	   }
		saveOrReplace(getRes);
	},
	//点击list2，进入相应的界面
	OAMain_taplist2:function(obk,index,target,record,e,eOpts){
		var obj=this;
		var store=this.getStore('OAMainListStore','HelcPDA.store.oa.OAMainListStore');
		var _id=store.getAt(index).get('_id');
		var TYPE_NAME=store.getAt(index).get('TYPE_NAME');
        switch(TYPE_NAME){
        case '非标报告作业处理流程': 
        	 obj.NextView('oAReportDetailPanel','HelcPDA.view.oa.OAReportDetailPanel');		
        	 function getResult(res){
        		 Ext.getCmp('OA_id').setValue(_id);
        		 setAllValue(res);
        	 }
        	 var query={_id:_id};
        	 WL_find(query,getResult);
        	 break;
       //xcx
        case '三包申请报告':  
        	obj.showNextView('oAReportDetailPanel','HelcPDA.view.oa.OAAllAplayDetailPanel');
        	Ext.getCmp('oa_sanbao').setValue(2);
        	var query={_id:_id};
        	WL_Sanbao(query);
        	
        	break;
        
        }        
	},
	//流程处理信息查询
	OAMain_taplist1:function(obk,index,target,record,e,eOpts){
		var obj=this;
		var store=obj.getStore('OAMainList1Store','HelcPDA.store.oa.OAMainList1Store');
		function getResult(res){
			if(res.rows[0]==''||res.rows[0]==null||typeof(res.rows[0])=='undefined'){
                Ext.Msg.alert('流程暂未处理');
				return;
			}else{
			  obj.NextView('oAMainList1','HelcPDA.view.oa.OAMainList1');
			  var store1=obj.getStore('OAMainList2Store','HelcPDA.store.oa.OAMainList2Store');
			  store1.setData(res.rows);
			}
			
			//alert(JSON.stringify(res));	
		}
		var FileNo=store.getAt(index).get('FileNo');
		var content="{'FileNo':'"+FileNo+"'}";
		obj.connectServer(getResult, 'businessTripApplyAction.do?method=tosearch_info', content);
	},
	//提交所有数据
    submitOAReport:function(){
    var rows=getAllValue();
    var msg=checkData(rows);
    if(msg!=0){
    	return;
    }
    function getResult(res){
    	var _id=Ext.getCmp('OA_id').getValue();
    	if(_id==''||_id==null||typeof(_id)=='undefined'){
    		
    	}else{
    		function getRes(msg){
    			if(msg=='删除成功'){
    				updatePage();
    			}
    		}
    		 var query={_id:_id};
    		 if(res.msginfo=='保存成功'){
    			 WL_Remove(query,getRes);
             }
    	}
    }
    var content=JSON.stringify(rows);
  	this.connectServer(getResult, 'businessTripApplyAction.do?method=toAdd2', content);	
    	
  }
});


function setAllValue(res){
	Ext.getCmp('apellation').setValue(res[0].json.stext.apellation);
	Ext.getCmp('address').setValue(res[0].json.stext.address);
	Ext.getCmp('party').setValue(res[0].json.stext.party);
	Ext.getCmp('phone').setValue(res[0].json.stext.phone);
	if(res[0].json.stext.date){
		Ext.getCmp('date').setValue(new Date(res[0].json.stext.date));
	}else{
		Ext.getCmp('date').setValue(res[0].json.stext.date);	
	}
	Ext.getCmp('produceno').setValue(res[0].json.stext.produceno);
	Ext.getCmp('model').setValue(res[0].json.stext.model);
	
	Ext.getCmp('floor').setValue(res[0].json.stext.floor);
	if(res[0].json.stext.date1){
		Ext.getCmp('date1').setValue(new Date(res[0].json.stext.date1));
	}else{
		Ext.getCmp('date1').setValue(res[0].json.stext.date1);
	}
	Ext.getCmp('unit').setValue(res[0].json.stext.unit);
	if(res[0].json.stext.date2){
		Ext.getCmp('date2').setValue(new Date(res[0].json.stext.date2));
	}else{
		Ext.getCmp('date2').setValue(res[0].json.stext.date2);
	}
	Ext.getCmp('count').setValue(res[0].json.stext.count);
	Ext.getCmp('refermodel').setValue(res[0].json.stext.refermodel);
	
	Ext.getCmp('duty').setValue(res[0].json.stext.duty);
	Ext.getCmp('type').setValue(res[0].json.stext.type);
	
	Ext.getCmp('sendmobile').setValue(res[0].json.stext.sendmobile);
	Ext.getCmp('agentman').setValue(res[0].json.stext.agentman);
	
	Ext.getCmp('phone2').setValue(res[0].json.stext.phone2);
	Ext.getCmp('Subject').setValue(res[0].json.stext.Subject);
	Ext.getCmp('report').setValue(res[0].json.stext.report);
	Ext.getCmp('daili').setValue(res[0].json.stext.daili);
	
	//Ext.getCmp('').setValue();
}
function getAllValue(){
	var apellation=Ext.getCmp('apellation').getValue();
	var address=Ext.getCmp('address').getValue();
	var party=Ext.getCmp('party').getValue();
	var phone=Ext.getCmp('phone').getValue();
	var date=Ext.getCmp('date').getValue();
	var produceno=Ext.getCmp('produceno').getValue();
	var model=Ext.getCmp('model').getValue();
	
	var floor=Ext.getCmp('floor').getValue();
	var date1=Ext.getCmp('date1').getValue();
	var unit=Ext.getCmp('unit').getValue();
	var date2=Ext.getCmp('date2').getValue();
	var count=Ext.getCmp('count').getValue();
	var refermodel=Ext.getCmp('refermodel').getValue();
	
	var duty=Ext.getCmp('duty').getValue();
	var type=Ext.getCmp('type').getValue();
	
	var sendmobile=Ext.getCmp('sendmobile').getValue();
	//var agentman=Ext.getCmp('agentman').getValue();
	var agentman=usernames;
	var applydate=Ext.Date.format(new Date(),'Y-m-d h:m:s');
	var phone2=Ext.getCmp('phone2').getValue();
	var Subject=Ext.getCmp('Subject').getValue();
	var report=Ext.getCmp('report').getValue();
	var daili=Ext.getCmp('daili').getValue();
	
	
	var COMMIT_TIME=Ext.Date.format(new Date(),'Y-m-d h:m:s');
	var TYPE_NAME='非标报告作业处理流程';
	var dep='';
	var FileNo=Ext.Date.format(new Date(),'Y-m-d h:m:s');
	var jaFile=[];
	var rows={apellation:apellation,address:address,
			party:party,phone:phone,date:date,
			produceno:produceno,model:model,
			floor:floor,date1:date1,unit:unit,
			date2:date2,count:count,refermodel:refermodel,
			duty:duty,type:type,sendmobile:sendmobile,agentman:agentman,
			phone2:phone2,Subject:Subject,report:report,
			daili:daili,userid:userid,
			COMMIT_TIME:COMMIT_TIME,
			TYPE_NAME:TYPE_NAME,dep:dep,applydate:applydate,FileNo:FileNo,
			jaFile:jaFile
	};
	return rows;
}
function WL_add(query,getRes){
	 var WL_OA=WL.JSONStore.get(collectionName);
	    WL_OA.add(query).then(function(){
	    	//Ext.Msg.alert('保存成功');
	    	var query1={tcode:query.tcode};
	    	 WL_OA.find(query1).then(function(res){
	    		 getRes(res[0]._id);
	    	 });
	    }).fail(function(){
	    	Ext.Msg.alert('保存失败');
	    });
}
function WL_find(query,getResult){
	var WL_OA=WL.JSONStore.get(collectionName);
	WL_OA.find(query).then(function(res){
	     getResult(res);
	}).fail(function(){
		Ext.Msg.alert('查找失败');
	});
}
function WL_Replace(query,getRes){
 	var WL_OA=WL.JSONStore.get(collectionName);
 	_id=Ext.getCmp('OA_id').getValue();
 	WL_OA.refresh(query).then(function(){
 		Ext.Msg.alert('修改成功');
 		getRes(_id);
 	}).fail(function(){
 		Ext.Msg.alert('修改失败');
 	});
}
function WL_Remove(query,getRes){
	var WL_OA=WL.JSONStore.get(collectionName);
	WL_OA.remove(query).then(function(){
		getRes("删除成功");
	}).fail(function(){
	});
}
function  findNewList(res,num){
	//['COMMIT_TIME','TYPE_NAME','Subject','_id']
	var List=[];
	if(num==0){
	for (var i=0;i<res.length;i++){
	  var temp={};
	  if(res[i].json.stext.TYPE_NAME=='非标报告作业处理流程'){
		  temp.COMMIT_TIME=res[i].json.stext.COMMIT_TIME;
		  temp.TYPE_NAME=res[i].json.stext.TYPE_NAME;
		  temp.Subject=res[i].json.stext.Subject;
		  temp._id=res[i]._id;
		    
	  }else if(res[i].json.stext.TYPE_NAME=='三包申请报告'){
		  temp.COMMIT_TIME=res[i].json.stext.FileNo;
		  temp.TYPE_NAME=res[i].json.stext.TYPE_NAME;
		  temp.Subject=res[i].json.stext.serviceaddr;
		  temp._id=res[i]._id;
	  }else{
		  
	  }
	  List[i]=temp;
	}
	}else{
		for (var i=0,k=0;i<res.rows.length;i++,k++){
			  var temp={};
			  var obj=eval('(' + res.rows[i].TEXTS + ')');
			  if(res.rows[i].TYPE_NAME=='非标报告作业处理流程'){
				  temp.COMMIT_TIME=res.rows[i].COMMIT_TIME;
				  temp.TYPE_NAME=res.rows[i].TYPE_NAME;
				  temp.Subject=obj.Subject;
				  temp.FileNo=res.rows[i].FileNo;
				    
			  }else if(res.rows[i].TYPE_NAME=='三包申请报告'){
				  temp.COMMIT_TIME=res.rows[i].COMMIT_TIME;
				  temp.TYPE_NAME=res.rows[i].TYPE_NAME;
				  temp.Subject=obj.serviceaddr;
				  temp.FileNo=res.rows[i].FileNo;
			  }else{
				  k=--k;
				  continue;
			  }
			  List[k]=temp;
			}	
		
	}
	
	
	return List;
}
function saveOrReplace(getRes){
	var WL_OA=WL.JSONStore.get(collectionName);
	_id=Ext.getCmp('OA_id').getValue();
	var query={_id:_id};
	WL_OA.find(query).then(function(res){
		var rows=getAllValue();
		if(_id==''||_id==null||typeof(_id)=='undefined'){
			var query={tid:'OA_fb'+userid,tcode:'feibiao'+rows.COMMIT_TIME,stext:rows};
    	    WL_add(query,getRes);
    	}else{
    		var query={_id:_id,json:{tid:'OA_fb'+userid,tcode:'feibiao'+rows.COMMIT_TIME,stext:rows}};
    		WL_Replace(query,getRes);
    	}
	}).fail(function(){
		Ext.Msg.alert('查找失败');
	});
}
function checkData(rows){
	 if(rows.apellation==''||rows.apellation==null||typeof(rows.apellation)=='undefined'){
	    	Ext.Msg.alert("用户名称不能为空");
	    	return 1;
	    }
	    if(rows.address==''||rows.address==null||typeof(rows.address)=='undefined'){
	    	Ext.Msg.alert("地址不能为空");
	    	return 1;
	    } 
	    if(rows.party==''||rows.party==null||typeof(rows.party)=='undefined'){
	    	Ext.Msg.alert("当事人不能为空");
	    	return 1;
	    } 
	    if(rows.phone==''||rows.phone==null||typeof(rows.phone)=='undefined'){
	    	Ext.Msg.alert("电话不能为空");
	    	return 1;
	    } 
	    if(rows.date==''||rows.date==null||typeof(rows.date)=='undefined'){
	    	Ext.Msg.alert("期望处理日期不能为空");
	    	return 1;
	    } 
	    if(rows.produceno==''||rows.produceno==null||typeof(rows.produceno)=='undefined'){
	    	Ext.Msg.alert("生产工号不能为空");
	    	return 1;
	    } 
	    if(rows.model==''||rows.model==null||typeof(rows.model)=='undefined'){
	    	Ext.Msg.alert("电梯型号不能为空");
	    	return 1;
	    } 
	    if(rows.floor==''||rows.floor==null||typeof(rows.floor)=='undefined'){
	    	Ext.Msg.alert("层/站不能为空");
	    	return 1;
	    } 
	    if(rows.date1==''||rows.date1==null||typeof(rows.date1)=='undefined'){
	    	Ext.Msg.alert("进场日期不能为空");
	    	return 1;
	    } 
	    if(rows.date2==''||rows.date2==null||typeof(rows.date2)=='undefined'){
	    	Ext.Msg.alert("验收日期不能为空");
	    	return 1;
	    } 

	    if(rows.count==''||rows.count==null||typeof(rows.count)=='undefined'){
	    	Ext.Msg.alert("涉及台数不能为空");
	    	return 1;
	    } 
	    if(rows.refermodel==''||rows.refermodel==null||typeof(rows.refermodel)=='undefined'){
	    	Ext.Msg.alert("涉及工号、梯型不能为空");
	    	return 1;
	    } 
	    if(rows.duty==''||rows.duty==null||typeof(rows.duty)=='undefined'){
	    	Ext.Msg.alert("责任判断不能为空");
	    	return 1;
	    } 
	    if(rows.type==''||rows.type==null||typeof(rows.type)=='undefined'){
	    	Ext.Msg.alert("类别不能为空");
	    	return 1;
	    } 
	    if(rows.sendmobile==''||rows.sendmobile==null||typeof(rows.sendmobile)=='undefined'){
	    	Ext.Msg.alert("是否短信通知不能为空");
	    	return 1;
	    } 
	    if(rows.applydate==''||rows.applydate==null||typeof(rows.applydate)=='undefined'){
	    	Ext.Msg.alert("时间不能为空");
	    	return 1;
	    } 
	    if(rows.report==''||rows.report==null||typeof(rows.report)=='undefined'){
	    	Ext.Msg.alert("报告内容不能为空");
	    	return 1;
	    } 
	    if(rows.Subject==''||rows.Subject==null||typeof(rows.Subject)=='undefined'){
	    	Ext.Msg.alert("标题不能为空");
	    	return 1;
	    } 
	    if(rows.phone2==''||rows.phone2==null||typeof(rows.phone2)=='undefined'){
	    	Ext.Msg.alert("联系电话不能为空");
	    	return 1;
	    } 
	    if(rows.agentman==''||rows.agentman==null||typeof(rows.agentman)=='undefined'){
	    	Ext.Msg.alert("报告人不能为空");
	    	return 1;
	    } 
	    var cellphone=/^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
	    if(!cellphone.test(rows.phone)){
	    	Ext.Msg.alert("电话格式有误");
	    	return 1;
	    }
	    if(!cellphone.test(rows.phone2)){
	    	Ext.Msg.alert("联系电话格式有误");
	    	return 1;
	    }
	    return 0;
	    	
}



//xcx 2014-5-21 三包
function WL_Sanbao(query){
	//页面跳转
	
	
	var WL_OA=WL.JSONStore.get(collectionName);
	WL_OA.find(query).then(function(arrayResults){
		var num=arrayResults.length;
		var data=arrayResults[num-1].json.stext;
		//填充数据
		//1.电梯资料
		//标题
		Ext.getCmp('et_Subject').setValue(data.Subject);
		//三包件收货地址
		Ext.getCmp('serviceaddr').setValue(data.serviceaddr);
		//收货人
		Ext.getCmp('acceptor').setValue(data.acceptor);
		//收货人电话
		Ext.getCmp('acceptNo').setValue(data.acceptNo);
		//生产工号
		Ext.getCmp('ASSET_NUM').setValue(data.produceno);
		//用户名称
		Ext.getCmp('usersname').setValue(data.usersname);
		//电梯扶梯型号
		Ext.getCmp('typeNo').setValue(data.typeNo);
		//是否大型项目
		Ext.getCmp('ifdxm').setValue(data.ifdxm);
		//生产场地
		Ext.getCmp('scjd').setValue(data.scjd);
		//订货单位
		Ext.getCmp('dhdw').setValue(data.dhdw);
		//电机功率
		Ext.getCmp('power').setValue(data.power);
		//验收日期
		Ext.getCmp('checkdate').setValue(data.checkdate);
		//三包期
		Ext.getCmp('sertime').setValue(data.sertime);
		
		//2.故障部件资料
		//常见故障部件
		Ext.getCmp('parts').setValue(data.parts);
		//部件型号
		Ext.getCmp('partsxh').setValue(data.partsxh);
		//部件出厂编号
		Ext.getCmp('secoutno').setValue(data.secoutno);
		//其他故障部件
		Ext.getCmp('qtpart').setValue(data.qtpart);
		//部件型号
		Ext.getCmp('partxh').setValue(data.partxh);
		//图号作业
		Ext.getCmp('mapzyno').setValue(data.mapzyno);
		//其他资料
		Ext.getCmp('otherinfo').setValue(data.otherinfo);
		
		//3.故障处理情况
		//故障发生日期
		Ext.getCmp('errdate').setValue(data.errdate);
		//是否三包过的部件
		Ext.getCmp('ifsb').setValue(data.ifsb);
		//故障发生时电梯状态
		Ext.getCmp('errorstatus').setValue(data.errorstatus);
		//该部件之前三包的三包单号
		Ext.getCmp('sbdh').setValue(data.sbdh);
		//故障内容
		Ext.getCmp('errcontent').setValue(data.errcontent);
		//故障码
		Ext.getCmp('textarea').setValue(data.textarea);
		//处理方法
		Ext.getCmp('textarea2').setValue(data.textarea2);
		//处理结果
		Ext.getCmp('textarea3').setValue(data.textarea3);
		//是否短信通知
		Ext.getCmp('sendmobile').setValue(data.sendmobile);
		//报告人联络电话
		Ext.getCmp('phone').setValue(data.phone);
		
		//获取删除条件
		AllAplay_oaTime=query;
		
		//删除原有的
    	/*var options={exacte:true};//默认是false
    	WL_OA.remove(query,options).then(function(){
			console.log('删除成功');
		}).fail(function(){
			Ext.Msg.alert('删除失败');
		});*/
		
	}).fail(function(){
		Ext.Msg.alert('查找失败');
	});
}

function updatePage(){
	  var store=Ext.data.StoreManager.get('OAMainListStore');
		if (!store) { 
			store = Ext.create('HelcPDA.store.oa.OAMainListStore'); 
		}; 
	  function getResult(res){
		  var List=findNewList(res,0);
		  store.setData(List);
	  }
	  var query={tid:'OA_'};
	  WL_find(query,getResult);
}

