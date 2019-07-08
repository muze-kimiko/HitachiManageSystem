
/* JavaScript content from app/controller/oa/OAAllAplayDetailPanelCtrl.js in folder common */
/**
 * 三包申请监视器 xcx  2014-5-20
 */

var ovlay_MainTainOA;

//用于记录删除数据的时间
var AllAplay_oaTime;

Ext.define('HelcPDA.controller.oa.OAAllAplayDetailPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//返回
			oaAADPgobackButton:'button[id=oaAADPgobackButton]',
			//保存
			save_OAAllAplay:'button[id=save_OAAllAplay]',
			//提交
			submit_OAAllAplay:'button[id=submit_OAAllAplay]',
			//工号查询按钮
			oaAllAplaySearchButton:'button[id=oaAllAplaySearchButton]'
		},
		control:{
			//返回
			oaAADPgobackButton:{
				tap:'oaAADPgobackButton'
			},
			//保存
			save_OAAllAplay:{
				tap:'save_OAAllAplay'
			},
			//提交
			submit_OAAllAplay:{
				tap:'submit_OAAllAplay'
			},
			//工号查询按钮
			oaAllAplaySearchButton:{
				tap:'oaAllAplaySearchButton'
			}
		},
	},
	
	//返回
	oaAADPgobackButton:function(){
		var num=Ext.getCmp('oa_sanbao').getValue();
		if(num==1){//跳回选择流程界面
			this.showNextView('oAMenusView','HelcPDA.view.oa.OAMenusView');
		}else if(num==2){//跳回首页
			this.showNextView('oAMainPanel','HelcPDA.view.oa.OAMainPanel');
		}else if(num==''){
			this.showNextView('oAMenusView','HelcPDA.view.oa.OAMenusView');
			return;
		};
		
		obj_this=this;
		//删除原有的数据
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var options={exacte:true};//默认是false
		alert('AllAplay_oaTime '+AllAplay_oaTime);
		MaintainList.remove(AllAplay_oaTime,options).then(function(){
			console.log('删除成功');
			obj_this.oaSave_JSONStore();
		}).fail(function(){
			Ext.Msg.alert('删除失败');
		});
		
	},
	//保存
	save_OAAllAplay:function(){
		obj_this=this;
		//删除原有的数据
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var options={exacte:true};//默认是false
		//alert('AllAplay_oaTime '+AllAplay_oaTime);
		MaintainList.remove(AllAplay_oaTime,options).then(function(){
			console.log('删除成功');
			obj_this.oaSave_JSONStore();
		}).fail(function(){
			Ext.Msg.alert('删除失败');
		});
	},
	//把数据保存到JSONStroe中
	oaSave_JSONStore:function(){
		//alert('进入');
		//先查询
		obj_this=this;
		var data=obj_this.dataFatch();
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	//alert("datauserid:"+data.userid);
    	var time=data.FileNo;
    	
    	var Maintxml={tcode:'sanbao/'+time,tid:'OA_sb'+userid,stext:data};
    	MaintainList.add(Maintxml).then(function(){
    		Ext.Msg.alert('保存完毕');
    		obj_this.showNextView('oAMainPanel','HelcPDA.view.oa.OAMainPanel');
    		updatePage();
    	}).fail(function(errorObject){
    		console.log('添加sanbao出错');	
		});
	},
	
	
	//提交
	submit_OAAllAplay:function(){
		//alert('提交');
		//判断是否为空
		//1.电梯资料
		//标题
		var et_Subject=Ext.getCmp('et_Subject').getValue();
		if(et_Subject==''){
			Ext.Msg.alert('标题不能为空');
			return ;
		};
		//三包件收货地址
		var serviceaddr=Ext.getCmp('serviceaddr').getValue();
		if(serviceaddr==''){
			Ext.Msg.alert('三包件收货地址不能为空');
			return ;
		};
		//收货人
		var acceptor=Ext.getCmp('acceptor').getValue();
		if(acceptor==''){
			Ext.Msg.alert('收货人不能为空');
			return ;
		};
		//收货人电话
		var acceptNo=Ext.getCmp('acceptNo').getValue();
		if(acceptNo==''){
			Ext.Msg.alert('收货人电话不能为空');
			return ;
		};
		//生产工号
		var ASSET_NUM=Ext.getCmp('ASSET_NUM').getValue();
		if(ASSET_NUM==''){
			Ext.Msg.alert('生产工号不能为空');
			return ;
		};
		//用户名称
		var usersname=Ext.getCmp('usersname').getValue();
		if(usersname==''){
			Ext.Msg.alert('用户名称不能为空');
			return ;
		};
		//电梯扶梯型号
		var typeNo=Ext.getCmp('typeNo').getValue();
		if(typeNo==''){
			Ext.Msg.alert('电梯扶梯型号不能为空');
			return ;
		};
		//是否大型项目
		var ifdxm=Ext.getCmp('ifdxm').getValue();
		if(ifdxm==''){
			Ext.Msg.alert('是否大型项目不能为空');
			return ;
		};
		//生产场地
		var scjd=Ext.getCmp('scjd').getValue();
		if(scjd==''){
			Ext.Msg.alert('生产场地不能为空');
			return ;
		};
		//订货单位
		var dhdw=Ext.getCmp('dhdw').getValue();
		if(dhdw==''){
			Ext.Msg.alert('订货单位不能为空');
			return ;
		};
		//电机功率
		var power=Ext.getCmp('power').getValue();
		if(power==''){
			Ext.Msg.alert('电机功率不能为空');
			return ;
		};
		//验收日期
		var checkdate=Ext.getCmp('checkdate').getValue();
		if(checkdate==''){
			Ext.Msg.alert('验收日期不能为空');
			return ;
		};
		//三包期
		var sertime=Ext.getCmp('sertime').getValue();
		if(sertime==''){
			Ext.Msg.alert('三包期不能为空');
			return ;
		};
		//2.故障部件资料
		//常见故障部件
		var parts=Ext.getCmp('parts').getValue();
		if(parts==''){
			Ext.Msg.alert('常见故障部件不能为空');
			return ;
		};
		//部件型号
		var partsxh=Ext.getCmp('partsxh').getValue();
		if(partsxh==''){
			Ext.Msg.alert('部件型号不能为空');
			return ;
		};
		//部件出厂编号
		var secoutno=Ext.getCmp('secoutno').getValue();
		if(secoutno==''){
			Ext.Msg.alert('部件出厂编号不能为空');
			return ;
		};
		//其他故障部件
		var qtpart=Ext.getCmp('qtpart').getValue();
		if(qtpart==''){
			Ext.Msg.alert('其他故障部件不能为空');
			return ;
		};
		//部件型号
		var partxh=Ext.getCmp('partxh').getValue();
		if(partxh==''){
			Ext.Msg.alert('部件型号不能为空');
			return ;
		};
		//图号作业
		var mapzyno=Ext.getCmp('mapzyno').getValue();
		if(mapzyno==''){
			Ext.Msg.alert('图号作业不能为空');
			return ;
		};
		//其他资料
		var otherinfo=Ext.getCmp('otherinfo').getValue();
		if(otherinfo==''){
			Ext.Msg.alert('其他资料不能为空');
			return ;
		};
		
		//3.故障处理情况
		//故障发生日期
		var errdate=Ext.getCmp('errdate').getValue();
		if(errdate==''){
			Ext.Msg.alert('故障发生日期不能为空');
			return ;
		};
		//是否三包过的部件
		var ifsb=Ext.getCmp('ifsb').getValue();
		if(ifsb==''){
			Ext.Msg.alert('是否三包过的部件不能为空');
			return ;
		};
		//故障发生时电梯状态
		var errorstatus=Ext.getCmp('errorstatus').getValue();
		if(errorstatus==''){
			Ext.Msg.alert('故障发生时电梯状态不能为空');
			return ;
		};
		//该部件之前三包的三包单号
		var sbdh=Ext.getCmp('sbdh').getValue();
		if(sbdh==''){
			Ext.Msg.alert('前三包单号不能为空');
			return ;
		};
		//故障内容
		var errcontent=Ext.getCmp('errcontent').getValue();
		if(errcontent==''){
			Ext.Msg.alert('故障内容不能为空');
			return ;
		};
		//故障码
		var textarea=Ext.getCmp('textarea').getValue();
		if(textarea==''){
			Ext.Msg.alert('故障码不能为空');
			return ;
		};
		//处理方法
		var textarea2=Ext.getCmp('textarea2').getValue();
		if(textarea2==''){
			Ext.Msg.alert('处理方法不能为空');
			return ;
		};
		//处理结果
		var textarea3=Ext.getCmp('textarea3').getValue();
		if(textarea3==''){
			Ext.Msg.alert('处理结果不能为空');
			return ;
		};
		//是否短信通知
		var sendmobile=Ext.getCmp('sendmobile').getValue();
		if(sendmobile==''){
			Ext.Msg.alert('是否短信通知不能为空');
			return ;
		};
		//报告人联络电话
		var phone=Ext.getCmp('phone').getValue();
		if(phone==''){
			Ext.Msg.alert('联络电话不能为空');
			return ;
		};
		
		var patrn=/^1[3|4|5|8][0-9]\d{4,8}$/;
		//patrn="^[1]([3][0-9]{1}|59|58|88|89)[0-9]{8}$"; 

		if (!patrn.test(phone)){
			Ext.Msg.alert('请输入正确的联络电话');
			return ;
		};
		if (!patrn.test(acceptNo)){
			Ext.Msg.alert('请输入正确的收货电话');
			return ;
		};
		
		
		obj_this=this;
		navigator.notification.confirm('确认要提交吗？',function(btn){
 			if(btn ==2){
 				var data=obj_this.dataFatch();
				obj_this.connectServerMainTain(obj_this.submit_OAAllAplayData,obj_this,"businessTripApplyAction.do?method=toAdd5",JSON.stringify(data));
 			}else{
 				return;
 			}
 		},"提示","取消,确定");
//		 Ext.Msg.confirm('你好','确认要提交吗？',function(btn){
//				if (btn == 'yes'){
//					
//					var data=obj_this.dataFatch();
//					obj_this.connectServerMainTain(obj_this.submit_OAAllAplayData,obj_this,"businessTripApplyAction.do?method=toAdd5",JSON.stringify(data));
//				}else{
//					return;
//				}
//			});
		
	},
	//提交后的结果
	submit_OAAllAplayData:function(result,obj){
		var fruit=result.msginfo;
		if(fruit=='保存成功'){
			Ext.Msg.alert(fruit);
			obj.showNextView('oAMainPanel','HelcPDA.view.oa.OAMainPanel');
			//删除原有的数据
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
			var options={exacte:true};//默认是false
			//alert('AllAplay_oaTime '+AllAplay_oaTime);
			MaintainList.remove(AllAplay_oaTime,options).then(function(){
				console.log('删除成功');
				//obj.showNextView('oAMainPanel','HelcPDA.view.oa.OAMainPanel');
	    		updatePage();
			}).fail(function(){
				Ext.Msg.alert('删除失败');
			});
			
		}else{
			Ext.Msg.alert(fruit);
		}
		
	},
	
	//工号查询按钮
	oaAllAplaySearchButton:function(){
		//alert('进入工号');
		var gh=Ext.getCmp('oa_allSCGH').getValue();
		if(gh==''){
			Ext.Msg.alert('请输入生产工号');
			return ;
		}
		
		var tiaojian="{'ASSET_NUM':'"+gh+"'}";
		
		//查询结果显示界面
		var station=function(json){
			console.log("json: "+JSON.stringify(json));
			if(json==null){
				Ext.Msg.alert('提示','请精确查找,此次查找数据过多!');
				return ;
			};
			var sum=json.count;
			//alert('sum:'+sum);
			
			if(sum==-1){
				Ext.Msg.alert('提示','请精确查找,此次查找数据过多!');
				return ;
			}
			if(sum>100){
				Ext.Msg.alert('提示','请精确查找,查找数据过多会导致程序瘫痪！');
				return ;
			}
			
			if(!ovlay_MainTainOA){
				console.log('进来list来了');
				 ovlay_MainTainOA=Ext.Viewport.add({
					xtype:'panel',
					id:'statPanelOA',
       		     	hideOnMaskTap: true,
       		     	style:'height:80%;width:90%;',
	     	        centered: true,
       		     	modal: true,
       		     	items:[{
       		     		xtype:'fieldset',
    		            style:'height:100%;width:100%;',
    		            items:[{
    		               xtype:'list',     		
 		        		   id:'oaAllAplayGH',
 		        		   store:'FaultWorkerNumberStore',
 		        		   style:'height:100%;width:100%;',
 		        		   itemTpl:
 		        			   [
 		        		          '<div>{Asset_Mum}<div>',
 		        		       ],
 		        		      listeners: {
 		    		            	itemtap:function(dataview, index, target, record, e, eOpts){
 		    		            		ovlay_MainTainOA.hide();
 		    		            		var datads=Ext.data.StoreManager.get('FaultWorkerNumberStore');
 		    		            		if(!datads){
 		    		            			datads=Ext.create('HelcPDA.store.fault.FaultWorkerNumberStore');
 		    		            		};
 		    		            		var TYPE_NO=datads.getAt(index).get('TYPE_NO');
 		    		            		var USER_NAME=datads.getAt(index).get('USER_NAME');
 		    		            		var Asset_Mum=datads.getAt(index).get('Asset_Mum');
 		    		            		
 		    		            		Ext.getCmp('usersname').setValue(USER_NAME);
 		    		            		Ext.getCmp('typeNo').setValue(TYPE_NO);
 		    		            		Ext.getCmp('ASSET_NUM').setValue(Asset_Mum);
 		    		            		
 		    		            		if(TYPE_NO=='null'){
 		    		            			Ext.getCmp('typeNo').setValue('');
 		    		            		};
 		    		            		if(USER_NAME=='null'){
 		    		            			Ext.getCmp('usersname').setValue('');
 		    		            		}
 		    		            	}
 		    		            }
    		            }],
    		            
    		         }]
				});
				//
			}else{
				//console.log('要显示吗？');
				ovlay_MainTainOA.show();
			};
			
			var datads=Ext.data.StoreManager.get('FaultWorkerNumberStore');
			if(!datads){
				datads=Ext.create('HelcPDA.store.fault.FaultWorkerNumberStore');
			}
			datads.setData(json.rows);
			console.log('数据长度:'+json.length);
			/*alert("stringinf: "+JSON.stringify(json.rows));*/
		};
		//查询方法
		this.connectServer(station,"businessTripApplyAction.do?method=tosearch_asset_num2",tiaojian);
	},
	
	
	//数据的拿取(封装好的方法)
	dataFatch:function(){
		//获取数据
		//userid
		//编号 把当前时间转换为一场串数字
		var FileNo=Ext.Date.format(new Date(),'Y-m-d H:m:s');
		//1.电梯资料
		//标题
		var et_Subject=Ext.getCmp('et_Subject').getValue();
		//三包件收货地址
		var serviceaddr=Ext.getCmp('serviceaddr').getValue();
		//收货人
		var acceptor=Ext.getCmp('acceptor').getValue();
		//收货人电话
		var acceptNo=Ext.getCmp('acceptNo').getValue();
		//生产工号
		var ASSET_NUM=Ext.getCmp('ASSET_NUM').getValue();
		//用户名称
		var usersname=Ext.getCmp('usersname').getValue();
		//电梯扶梯型号
		var typeNo=Ext.getCmp('typeNo').getValue();
		//是否大型项目
		var ifdxm=Ext.getCmp('ifdxm').getValue();
		//生产场地
		var scjd=Ext.getCmp('scjd').getValue();
		//订货单位
		var dhdw=Ext.getCmp('dhdw').getValue();
		//电机功率
		var power=Ext.getCmp('power').getValue();
		//验收日期
		var checkdate=instalPlan_HP(Ext.getCmp('checkdate').getValue());
		//三包期
		var sertime=Ext.getCmp('sertime').getValue();
		
		//2.故障部件资料
		//常见故障部件
		var parts=Ext.getCmp('parts').getValue();
		//部件型号
		var partsxh=Ext.getCmp('partsxh').getValue();
		//部件出厂编号
		var secoutno=Ext.getCmp('secoutno').getValue();
		//其他故障部件
		var qtpart=Ext.getCmp('qtpart').getValue();
		//部件型号
		var partxh=Ext.getCmp('partxh').getValue();
		//图号作业
		var mapzyno=Ext.getCmp('mapzyno').getValue();
		//其他资料
		var otherinfo=Ext.getCmp('otherinfo').getValue();
		
		//3.故障处理情况
		//故障发生日期
		var errdate=instalPlan_HP(Ext.getCmp('errdate').getValue());
		//是否三包过的部件
		var ifsb=Ext.getCmp('ifsb').getValue();
		//故障发生时电梯状态
		var errorstatus=Ext.getCmp('errorstatus').getValue();
		//该部件之前三包的三包单号
		var sbdh=Ext.getCmp('sbdh').getValue();
		//故障内容
		var errcontent=Ext.getCmp('errcontent').getValue();
		//故障码
		var textarea=Ext.getCmp('textarea').getValue();
		//处理方法
		var textarea2=Ext.getCmp('textarea2').getValue();
		//处理结果
		var textarea3=Ext.getCmp('textarea3').getValue();
		//是否短信通知
		var sendmobile=Ext.getCmp('sendmobile').getValue();
		//报告人联络电话
		var phone=Ext.getCmp('phone').getValue();
		
		
		
		
		var data={};
		data.userid=userid;//用户ID
		data.FileNo=FileNo;//编号
		data.Subject=et_Subject;
		data.serviceaddr=serviceaddr;
		data.acceptor=acceptor;
		data.acceptNo=acceptNo;
		data.produceno=ASSET_NUM;
		data.usersname=usersname;
		data.typeNo=typeNo;
		data.ifdxm=ifdxm;
		data.scjd=scjd;
		data.dhdw=dhdw;
		data.power=power;
		data.checkdate=checkdate;
		data.sertime=sertime;
		
		data.parts=parts;
		data.partsxh=partsxh;
		data.secoutno=secoutno;
		data.qtpart=qtpart;
		data.partxh=partxh;
		data.mapzyno=mapzyno;
		data.otherinfo=otherinfo;
		
		data.errdate=errdate;
		data.ifsb=ifsb;
		data.errorstatus=errorstatus;
		data.sbdh=sbdh;
		data.errcontent=errcontent;
		data.textarea=textarea;
		data.textarea2=textarea2;
		data.textarea3=textarea3;
		//没什么用的属性
		data.agentman='';
		data.repdep='';
		data.reportdate='';
		data.sendmobile=sendmobile;
		data.phone=phone;
		
		//自己添加的值
		data.TYPE_NAME='三包申请报告';
		
		
		//alert(JSON.stringify(data));
		//修改获取的时间
		function instalPlan_HP(time){
			var date=new Date(time);
			var newmonth=date.getMonth()+1;
			var newday=date.getDate();
			if(newmonth<10){
				newmonth='0'+newmonth; 
			};
			if(newday<10){
				newday='0'+newday;
			};
			var newdate=date.getFullYear()+"-"+newmonth+"-"+newday;
			return newdate;
		};
		
		return data;
	}
	
	
});