
/* JavaScript content from app/controller/ghj/GHJListCtrl.js in folder common */
Ext.define('HelcPDA.controller.ghj.GHJListCtrl', {
	extend : 'HelcPDA.controller.ApplicationController',
	config : {
		control:{
			'list#GHJList_list_id':{
				itemtap:'GHJList_list_id'
			},
			
			'button#GHJList_id_FH':{
				tap:'GHJList_id_FH'
			},

		}
	},
	
	GHJList_id_FH:function(){
		this.BackView();
	},
	
	GHJList_list_id:function( theList, index, target, record, e, eOpts ){
		
		var id=record.data.Id;
		var status=record.data.Status;
		//cc.log('id:'+id+'    '+'status:'+status);
		
		var param={
				Flag:true,
				Id:id,
				userID:ghjuserID
		};
		var params = {
				adpName:'HttpAdapter_PDA_GHJ',
				prodName:'getReplaceDetQuery',
				parameters: param
		};
		var getResult = function(result){
			//cc.log(result);
			var data=result.ReplaceDetQuery_Output.ListOfHelReplaceDetail.ListOfHelReplace.HelReplace;
			cc.log(data);
			//记录更换件工号详细信息
			result.obj.ZongData=data;
			//页面跳转
			result.obj.NextView('GHJInfo_id','HelcPDA.view.ghj.GHJInfo');
			//初始化值列表
			result.obj.XLLB_ghj_selectfield();
			
			//显示详细信息
			var GHJInfo = Ext.getCmp('GHJInfo_id');
			var ghjeModel = Ext.create('HelcPDA.model.ghj.GHJInfoModel',data);
			GHJInfo.setRecord(ghjeModel);
			
			//初始化自定义按钮
			result.obj.ZDYAN_ghj_button();
			
			//所属站比较特别
			Ext.getCmp('ghj_Organization').setValue(data.ListOfHELReplace_Organization.HELReplace_Organization.Organization);
			
			//特殊的
			//更换日期      yyyy-M-d 
			Ext.getCmp('ghj_ReplaceDate').setValue(ZHtime(data.ReplaceDate));
			//技监发证日期      yyyy-M-d 
			Ext.getCmp('ghj_TechRegisteredDate').setValue(ZHtime(data.TechRegisteredDate));
			//移交客户日期    暂时   yyyy-M-d 
			Ext.getCmp('ghj_HandoverToAccountDate').setValue(ZHtime(data.HandoverToAccountDate));
			//移交维保日期    暂时   yyyy-M-d 
			Ext.getCmp('ghj_HandoverToMDate').setValue(ZHtime(data.HandoverToMDate));
			//出库日期           暂时    yyyy-M-d h-m-s
			Ext.getCmp('ghj_OutBoundDate').setValue(ZHtime(data.OutBoundDate));
			//申请日期      yyyy-M-d 
			Ext.getCmp('ghj_ApplicantDate').setValue(ZHtime(data.ApplicantDate));
			//录入日期      yyyy-M-d h-m-s
			Ext.getCmp('ghj_Updated').setValue(ZHtime(data.Updated));
			
			//时间转换方法
			function ZHtime(time){
				if(time!=''){
					time=new Date(time);
					time=Ext.Date.format(time,'Y-m-d');
				};
				//cc.log(time);
				return time;
			};
			
			//单选框
			var DXK=[data.HighTemperature,data.Wet,data.Wind,data.HighBasicity,data.AirPollution,data.Other,data.Normal];
			var DXKname=['ghj_HighTemperature','ghj_Wet','ghj_Wind','ghj_HighBasicity','ghj_AirPollution','ghj_Other','ghj_Normal'];
			for(var i=0;i<7;i++){
				if(DXK[i]=='Y'){
					Ext.getCmp(DXKname[i]).check();
				};
			};
			
			//判断数据来源是否为分公司
			if(data.ComponentDataSource=='分公司领料'){
				Ext.getCmp('GHJInfo_id_FS_EBS').setHidden(false);
			};
			
			//设置只读控件
			result.obj.getReadOnlyFangFa(data.Status);
			
		};
		
		this.getGHJ(this,getResult,params);
		
	},
	
	//更换件状态不同,可用控件只读也不同
	getReadOnlyFangFa:function(xz){
		cc.log('当前更换件状态：'+xz);
		if(xz=='已派工'||xz=='已备用'){//基础信息一部分可写入
			Ext.getCmp('ghj_ReplaceBy').setReadOnly(false);
			Ext.getCmp('ghj_Type').setReadOnly(false);
			Ext.getCmp('ghj_RunTime').setReadOnly(false);
			Ext.getCmp('ghj_UsedQuantity').setReadOnly(false);
			Ext.getCmp('ghj_PreventiveReplaceFlg').setReadOnly(false);
			Ext.getCmp('ghj_FaultReason').setReadOnly(false);
			Ext.getCmp('ghj_CostExplanation').setReadOnly(false);
			Ext.getCmp('ghj_ResponsibilityDivision').setReadOnly(false);
			Ext.getCmp('ghj_ElevatorType').setReadOnly(false);
			Ext.getCmp('ghj_Parts').setReadOnly(false);
			Ext.getCmp('ghj_Floor').setReadOnly(false);
			Ext.getCmp('ghj_ReplaceDate').setReadOnly(false);
			
			//自动添加更换人和更换时间
			Ext.getCmp('ghj_ReplaceBy').setValue(usernames);
			var time=new Date();
			time=Ext.Date.format(time,'Y-m-d');
			Ext.getCmp('ghj_ReplaceDate').setValue(time);
			
			//是否找到物料科编码为  否  物料编码可编写
			/*if(data.ComponentFoundFlag=='否'){
				Ext.getCmp('ghj_ComponentName').setReadOnly(false);
			};*/
		}else if(xz=='已审核'||xz=='提交待审批'){//全部只读
			
		};
	},
	
	//初始化自定义按钮
	//业务逻辑
	//已派工                提交    收回    保存
	//已备用                提交    保存                     --不会查出来了
	//提交待审批        收回
	//已审核                都没有                              --不会查出来了
	//回收只能做一次
	ZDYAN_ghj_button:function(){
		var status=Ext.getCmp('ghj_Status').getValue();
		cc.log('状态：'+status);
		var data=this.ZongData;
		//cc.log(data);
		//html
		var html='';
		var height=0;
		if(status=='已派工'){
			/*if(data.LastStatus=='提交待审批'){
				html='<div style="width=100%">'+
				 '<div class="anOneDiv">'+
		 		 	'<div class="ysZhOne anOne"  onclick="objectXcx.getController(\'ghj.GHJListCtrl\').GH_select();" style="width:46%;">工号查询</div>'+
		 		 	'<div class="ysZhTwo anOne"  onclick="objectXcx.getController(\'ghj.GHJListCtrl\').GH_SR_select();" style="width:46%;">服务请求</div>'+
		 		 '</div>'+
	   	  		 '<div class="anOneDiv">'+
	   	  		 	'<div class="ysZhThree anOne" onclick="objectXcx.getController(\'ghj.GHJListCtrl\').getTJ();" style="width:46%;">提交</div>'+
	   	  		 	'<div class="ysZhFive anOne" onclick="objectXcx.getController(\'ghj.GHJListCtrl\').getBC();" style="width:46%;">保存</div>'+
			     '</div>'+
		     '</div>';
			}else{*/
				html='<div style="width=100%">'+
				 '<div class="anOneDiv">'+
		 		 	'<div class="ysZhOne anOne"  onclick="objectXcx.getController(\'ghj.GHJListCtrl\').GH_select();" style="width:46%;">工号查询</div>'+
		 		 	'<div class="ysZhTwo anOne"  onclick="objectXcx.getController(\'ghj.GHJListCtrl\').GH_SR_select();" style="width:46%;">服务请求</div>'+
		 		 '</div>'+
	   	  		 '<div class="anOneDiv">'+
	   	  		 	'<div class="ysZhThree anOne" onclick="objectXcx.getController(\'ghj.GHJListCtrl\').getBCandgetTJ();" style="width:46%;">提交</div>'+
	   	  		 	'<div class="ysZhFour anOne" onclick="objectXcx.getController(\'ghj.GHJListCtrl\').getHS();" style="width:46%;">收回</div>'+
			     '</div>'+
		     '</div>';
			//};
			height=80;
		}else if(status=='提交待审批'){
			html='<div style="width=100%">'+
				 	 '<div class="anOneDiv">'+
			 		 	 '<div class="ysZhOne anOne"  onclick="objectXcx.getController(\'ghj.GHJListCtrl\').GH_select();" style="width:29%;">工号查询</div>'+
			 		 	 '<div class="ysZhTwo anOne"  onclick="objectXcx.getController(\'ghj.GHJListCtrl\').GH_SR_select();" style="width:29%;">服务请求</div>'+
			 		 	 '<div class="ysZhFour anOne" onclick="objectXcx.getController(\'ghj.GHJListCtrl\').getHS();" style="width:29%;">收回</div>'+
		 		 	 '</div>'+
	             '</div>';
			height=50;
		};
		
		Ext.getCmp('GHJInfo_id_Toolbar').setHtml(html);
		//面板高度
		Ext.getCmp('GHJInfo_id_Toolbar').setHeight(height);
	},
	
	//工号查询
	GH_select:function(){
		cc.log('进入工号查询');
		this.NextView('GHJAssetNumberSelect_id','HelcPDA.view.ghj.ghjFunction.GHJAssetNumberSelect');
	},
	
	//服务请求查询
	GH_SR_select:function(){
		cc.log('进入服务请求查询');
		this.NextView('GHJ_SR_Select_id','HelcPDA.view.ghj.ghjFunction.GHJ_SR_Select');
		//只有更换类型为急修才能选择服务请求编号
		var type=Ext.getCmp('ghj_Type').getValue();
		if(type=='急修'){
			Ext.getCmp('GHJ_SR_Select_id_QD').setHidden(false);
		};
		//下拉列表
		//服务请求来源
		var one=[{text:'请选择',value:''},
		         {text:'电话（口头）投诉',value:'电话（口头）投诉'},
		         {text:'热线受理',value:'热线受理'},
		         {text:'电话',value:'电话'},
		         {text:'书面投诉',value:'书面投诉'},
		         {text:'110报出',value:'110报出'},
		         {text:'传真',value:'传真'},
		         {text:'MAS报出',value:'MAS报出'},
		         {text:'维保管理部受理',value:'维保管理部受理'},
		         {text:'其他部门接收',value:'其他部门接收'},
		         {text:'工程本部接收',value:'工程本部接收'},
		         {text:'品质保证部接收',value:'品质保证部接收'},
		         {text:'96333报出',value:'96333报出'},
		         {text:'保养站受理',value:'保养站受理'},
		         {text:'传真受理',value:'传真受理'},
		         {text:'回访反馈',value:'回访反馈'},
		         {text:'非故障',value:'非故障'},
		         {text:'计划安排',value:'计划安排'},
		         {text:'公司对策',value:'公司对策'},
		         {text:'用户报出',value:'用户报出'},
		         {text:'投诉',value:'投诉'},
		         {text:'分公司受理',value:'分公司受理'}];
		Ext.getCmp('SR_ServiceRequestSource').setOptions(one);
		
		//是否困人
		var two=[{text:'请选择',value:''},
		         {text:'是',value:'是'},
				 {text:'否',value:'否'}];
		Ext.getCmp('SR_BoxUp').setOptions(two);
		
		//所属司
		var three=[{text:'请选择',value:''},
		         {text:'A备用',value:'A备用'},
		         {text:'三亚分公司',value:'三亚分公司'},
		         {text:'上海分公司',value:'上海分公司'},
		         {text:'上海工程公司',value:'上海工程公司'},
		         {text:'上海营销公司',value:'上海营销公司'},
		         {text:'东莞分公司',value:'东莞分公司'},
		         {text:'临沂分公司',value:'临沂分公司'},
		         {text:'云南分公司',value:'云南分公司'},
		         {text:'佛山分公司',value:'佛山分公司'},
		         {text:'内蒙古工程公司',value:'内蒙古工程公司'},
		         {text:'北京工程公司',value:'北京工程公司'},
		         {text:'北京服务公司',value:'北京服务公司'},
		         {text:'北京营销公司',value:'北京营销公司'},
		         {text:'南充分公司',value:'南充分公司'},
		         {text:'南沙分公司',value:'南沙分公司'},
		         {text:'南通分公司',value:'南通分公司'},
		         {text:'吉林工程公司',value:'吉林工程公司'},
		         {text:'唐山分公司',value:'唐山分公司'},
		         {text:'四川分公司',value:'四川分公司'},
		         {text:'四川营销工程',value:'四川营销工程'},
		         {text:'增城分公司',value:'增城分公司'},
		         {text:'天津工程公司',value:'天津工程公司'},
		         {text:'宁夏分公司',value:'宁夏分公司'},
		         {text:'安庆分公司',value:'安庆分公司'},
		         {text:'安徽分公司',value:'安徽分公司'},
		         {text:'安阳分公司',value:'安阳分公司'},
		         {text:'宜昌分公司',value:'宜昌分公司'},
		         {text:'山东分公司',value:'山东分公司'},
		         {text:'山西工程公司',value:'山西工程公司'},
		         {text:'广州分公司',value:'广州分公司'},
		         {text:'广西分公司',value:'广西分公司'},
		         {text:'惠州分公司',value:'惠州分公司'},
		         {text:'扬州分公司',value:'扬州分公司'},
		         {text:'新疆分公司',value:'新疆分公司'},
		         {text:'杭州工程公司',value:'杭州工程公司'},
		         {text:'杭州销售公司',value:'杭州销售公司'},
		         {text:'柳州分公司',value:'柳州分公司'},
		         {text:'榆林分公司',value:'榆林分公司'},
		         {text:'汕头分公司',value:'汕头分公司'},
		         {text:'江苏分公司',value:'江苏分公司'},
		         {text:'江西分公司',value:'江西分公司'},
		         {text:'河北工程公司',value:'河北工程公司'},
		         {text:'河南分公司',value:'河南分公司'},
		         {text:'泉州分公司',value:'泉州分公司'},
		         {text:'洛阳分公司',value:'洛阳分公司'},
		         {text:'济宁分公司',value:'济宁分公司'},
		         {text:'海南日立',value:'海南日立'},
		         {text:'淮安分公司',value:'淮安分公司'},
		         {text:'深圳分公司',value:'深圳分公司'},
		         {text:'深圳工程公司',value:'深圳工程公司'},
		         {text:'深圳销售公司',value:'深圳销售公司'},
		         {text:'港立上海司',value:'港立上海司'},
		         {text:'港立深圳司',value:'港立深圳司'},
		         {text:'湖北分公司',value:'湖北分公司'},
		         {text:'湖南分公司',value:'湖南分公司'},
		         {text:'湛江分公司',value:'湛江分公司'},
		         {text:'潍坊分公司',value:'潍坊分公司'},
		         {text:'烟台分公司',value:'烟台分公司'},
		         {text:'珠海分公司',value:'珠海分公司'},
		         {text:'甘肃分公司',value:'甘肃分公司'},
		         {text:'盐城分公司',value:'盐城分公司'},
		         {text:'福建分公司',value:'福建分公司'},
		         {text:'绵阳分公司',value:'绵阳分公司'},
		         {text:'自贡分公司',value:'自贡分公司'},
		         {text:'芜湖分公司',value:'芜湖分公司'},
		         {text:'苏州分公司',value:'苏州分公司'},
		         {text:'莆田分公司',value:'莆田分公司'},
		         {text:'蚌埠分公司',value:'蚌埠分公司'},
		         {text:'衡阳分公司',value:'衡阳分公司'},
		         {text:'襄阳分公司',value:'襄阳分公司'},
		         {text:'贵州分公司',value:'贵州分公司'},
		         {text:'赣州分公司',value:'赣州分公司'},
		         {text:'辽宁分公司',value:'辽宁分公司'},
		         {text:'遵义分公司',value:'遵义分公司'},
		         {text:'郴州分公司',value:'郴州分公司'},
		         {text:'重庆营销工程',value:'重庆营销工程'},
		         {text:'锦州分公司',value:'锦州分公司'},
		         {text:'陕西分公司',value:'陕西分公司'},
		         {text:'青岛分公司',value:'青岛分公司'},
		         {text:'青海分公司',value:'青海分公司'},
				 {text:'黑龙江分公司',value:'黑龙江分公司'}];
		Ext.getCmp('SR_Company').setOptions(three);
		
		//服务请求是根据故障编号查询出来的
		var ghj_AssetNumber=this.ZongData.AssetNumber;
		cc.log('ghj_AssetNumber:'+ghj_AssetNumber);
		if(ghj_AssetNumber!=''){
			var tj="[Service Request.Asset Number] ='"+ghj_AssetNumber+"' ";
			//tj+=" order by [Service Request.Start Time]";
			objectXcx.getController('HelcPDA.controller.ghj.ghjFunction.GHJ_SR_SelectCtrl').sr_selectFF(tj);
		};
	},
	
	//收回
	getHS:function(){
		cc.log('进入收回');
		var obj=this;
		Ext.Msg.show({
			title: '温馨提示',
			message:'是否要收回本条更换件?',
			buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					
					var date=objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData;
					cc.log('Id:'+date.Id+'  '+'ComponentId:'+date.ComponentId);
					var param={
							Flag:true,
							Id:date.Id,
							userID:ghjuserID,
							ComponentId:date.ComponentId,
					};
					var params = {
							adpName:'HttpAdapter_PDA_GHJ',
							prodName:'getReplaceRegain',
							parameters: param
					};
					var getResult = function(result){
						cc.log(result);
						var Msg=result.ReplaceRegain_Output.ErrorMsg;
						Ext.Msg.alert('温馨提示',Msg);
						if(Msg=='收回成功'){
							objectXcx.getController('HelcPDA.controller.ghj.GHJSearchCtrl').GHJSearch_id_CX_GC('回退');
						};
					};
					obj.getGHJ(obj,getResult,params);
					
				};
			},
		});
	},
	
	//先保存在提交
	getBCandgetTJ:function(){
		var obj=this;
		//提交验证
		cc.log('进入提交验证');
		var flag=true;
		/**
		 * 验证方法
		 */
		//更换类型
		var type=Ext.getCmp('ghj_Type').getValue();
		//数量
		var CompQuantity=Ext.getCmp('ghj_CompQuantity').getValue();
		//使用数量
		var UsedQuantity=Ext.getCmp('ghj_UsedQuantity').getValue();
		//故障原因
		var FaultReason=Ext.getCmp('ghj_FaultReason').getValue();
		//部件所在部位
		var Parts=Ext.getCmp('ghj_Parts').getValue();
		//部件所在楼层
		var Floor=Ext.getCmp('ghj_Floor').getValue();
		//责任划分
		var ResponsibilityDivision=Ext.getCmp('ghj_ResponsibilityDivision').getValue();
		//服务请求编号
		var SRNumber=Ext.getCmp('ghj_SRNumber').getValue();
		
		if(UsedQuantity>CompQuantity){
			Ext.Msg.alert('温馨提示','使用数量不能大于数量！');
			//flag=false;
			return;
		};
		
		if(type=='急修'){
			if(SRNumber==''){
				Ext.Msg.alert('温馨提示','更换件类型为急修，必须填写服务请求编号！');
				//flag=false;
				return;
			};
		};
		
		if(Parts=='厅门/层站'){
			if(Floor==''){
				Ext.Msg.alert('温馨提示','部件所在部位为厅门/层站时,部件所在楼层必填！');
				//flag=false;
				return;
			};
		};
		
		if(type=='急修'||type=='保养'){
			if(ghj_FaultReason==''){
				Ext.Msg.alert('温馨提示','更换件类型为急修或保养时，故障原因、责任划分、环境因素、部件所在部位字段必填！');
				//flag=false;
				return;
			};
			
			if(ResponsibilityDivision==''){
				Ext.Msg.alert('温馨提示','更换件类型为急修或保养时，故障原因、责任划分、环境因素、部件所在部位字段必填！');
				//flag=false;
				return;
			};
			
			if(Parts==''){
				Ext.Msg.alert('温馨提示','更换件类型为急修或保养时，故障原因、责任划分、环境因素、部件所在部位字段必填！');
				//flag=false;
				return;
			};
			
			//环境因素
			var hjys=['ghj_HighTemperature','ghj_Wet','ghj_Wind','ghj_HighBasicity','ghj_AirPollution','ghj_Other','ghj_Normal'];
			var num=0;
			for(var i=0;i<hjys.length;i++){
				var zz=Ext.getCmp(hjys[i]).getChecked();
				//cc.log(zz);
				if(zz){
					num++;
				};
			};
			if(num==0){
				Ext.Msg.alert('温馨提示','环境因素至少选中一个！');
				flag=false;
				//return;
			};
			
			if(UsedQuantity>=5){
				Ext.Msg.show({//要不第一,要不最后
					title: '温馨提示',
					message:'该更换件使用数量有问题，请核实，是否继续？',
					buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
					fn: function(buttonId) {
						console.log('先进这');
						if(buttonId == 'yes'){
							console.log('非急修保养,就一次2');
							obj.getBC(obj);
							return;
						}else{
							return;
						};
					},
				});
			}else{
				Ext.Msg.show({
					title: '温馨提示',
					message:'是否要提交本条更换件?',
					buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
					fn: function(buttonId) {
						if(buttonId == 'yes'){
							console.log('非急修保养,就一次4');
							obj.getBC(obj);
						};
					},
				});
			};
		}else{
			Ext.Msg.show({
			title: '温馨提示',
			message:'是否要提交本条更换件?',
			buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					console.log('非急修保养,就一次3');
					obj.getBC(obj);
				};
			},
			});
		};
		
		
	},
	
	//提交   半完成
	getTJ:function(obj){
		//return;
		var date=objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData;
		cc.log('Id:'+date.Id+'  '+'ComponentId:'+date.ComponentId);
		var param={
				Flag:true,
				Id:date.Id,
				userID:ghjuserID,
				ComponentId:date.ComponentId,
		};
		var params = {
				adpName:'HttpAdapter_PDA_GHJ',
				prodName:'getReplaceSubmit',
				parameters: param
		};
		var getResult = function(result){
			myLoading.hide();
			cc.log(result);
			
			var Msg=result.ReplaceSubmit_Output.ErrorMsg;
			if(Msg=='提交成功'){
				objectXcx.getController('HelcPDA.controller.ghj.GHJSearchCtrl').GHJSearch_id_CX_GC('回退');
			}else{
				Ext.Msg.alert('温馨提示',Msg);
			};
		};
		obj.getGHJTwo(obj,getResult,params);
		
	},
	
	//保存  不需要提示
	//保存注意事项,如果网页修改服务请求编号成功后，手机端要的更换件数据要重新涮洗，不然保存会出错。
	getBC:function(obj){
		cc.log('进入保存');
		//return;
		var date=objectXcx.getController('HelcPDA.controller.ghj.GHJListCtrl').ZongData;
		cc.log('Id:'+date.Id);
		//可修改的数据
		/**
		 * 基础信息
		 */
		//服务请求编号
		var ghj_SRNumber=Ext.getCmp('ghj_SRNumber').getValue();
		
		//更换人
		var ghj_ReplaceBy=Ext.getCmp('ghj_ReplaceBy').getValue();
		//更换类型
		var ghj_Type=Ext.getCmp('ghj_Type').getValue();
		//电梯运行次数(次)
		var ghj_RunTime=Ext.getCmp('ghj_RunTime').getValue();
		if(ghj_RunTime==null){
			ghj_RunTime='';
		};
		//使用数量
		var ghj_UsedQuantity=Ext.getCmp('ghj_UsedQuantity').getValue();
		//更换日期
		var ghj_ReplaceDate=Ext.getCmp('ghj_ReplaceDate').getValue();
		if(ghj_ReplaceDate!=null&&ghj_ReplaceDate!=''){
			ghj_ReplaceDate=new Date(ghj_ReplaceDate);
			ghj_ReplaceDate=Ext.Date.format(ghj_ReplaceDate,'m/d/Y');
		}else{
			ghj_ReplaceDate='';
		};
		
		//是否预防更换      xl
		var ghj_PreventiveReplaceFlg=Ext.getCmp('ghj_PreventiveReplaceFlg').getValue();
		//故障原因故障原因故障原因故障原因
		var ghj_FaultReason=Ext.getCmp('ghj_FaultReason').getValue();
		//费用说明      xl
		var ghj_CostExplanation=Ext.getCmp('ghj_CostExplanation').getValue();
		//责任划分     xl
		var ghj_ResponsibilityDivision=Ext.getCmp('ghj_ResponsibilityDivision').getValue();
		//电梯类型  xl
		var ghj_ElevatorType=Ext.getCmp('ghj_ElevatorType').getValue();
		//部件所在部位      xl
		var ghj_Parts=Ext.getCmp('ghj_Parts').getValue();
		//部件所在楼层  
		var ghj_Floor=Ext.getCmp('ghj_Floor').getValue();
		
		/**
		 * 环境因素
		 */
		//高温
		var ghj_HighTemperature=FangHuiZhi(Ext.getCmp('ghj_HighTemperature').getChecked());
		//潮湿
		var ghj_Wet=FangHuiZhi(Ext.getCmp('ghj_Wet').getChecked());
		//大风
		var ghj_Wind=FangHuiZhi(Ext.getCmp('ghj_Wind').getChecked());
		//高咸碱度
		var ghj_HighBasicity=FangHuiZhi(Ext.getCmp('ghj_HighBasicity').getChecked());
		//空气污染
		var ghj_AirPollution=FangHuiZhi(Ext.getCmp('ghj_AirPollution').getChecked());
		//其他
		var ghj_Other=FangHuiZhi(Ext.getCmp('ghj_Other').getChecked());
		//正常使用
		var ghj_Normal=FangHuiZhi(Ext.getCmp('ghj_Normal').getChecked());
		
		function FangHuiZhi(flag){
			if(flag){
				return 'Y';
			}else{
				return '';
			};
		};
		
		/**
		 * 合同工号信息
		 */
		//工号
		var ghj_AssetNumber=Ext.getCmp('ghj_AssetNumber').getValue();
		//工号地盘
		var ghj_AssetDomainName=Ext.getCmp('ghj_AssetDomainName').getValue();
		//工号大楼
		var ghj_AssetEdificeName=Ext.getCmp('ghj_AssetEdificeName').getValue();
		//工号地址
		var ghj_AssetAddress=Ext.getCmp('ghj_AssetAddress').getValue();
		//合同号
		var ghj_AgreementNumber=Ext.getCmp('ghj_AgreementNumber').getValue();
		//梯种
		var ghj_ProductName=Ext.getCmp('ghj_ProductName').getValue();
		//梯种型号
		var ghj_ProductPart=Ext.getCmp('ghj_ProductPart').getValue();
		//梯号
		var ghj_ElevatorMark=Ext.getCmp('ghj_ElevatorMark').getValue();
		//合同类型
		var ghj_AgreementBusinessType=Ext.getCmp('ghj_AgreementBusinessType').getValue();
		//技监发证日期
		var ghj_TechRegisteredDate=Ext.getCmp('ghj_TechRegisteredDate').getValue();
		//移交客户日期
		var ghj_HandoverToAccountDate=Ext.getCmp('ghj_HandoverToAccountDate').getValue();
		//移交维保日期
		var ghj_HandoverToMDate=Ext.getCmp('ghj_HandoverToMDate').getValue();
		//所属司 不用改-----
		var ghj_CompanyOrganization=Ext.getCmp('ghj_CompanyOrganization').getValue();
		//所属站 不用改-----
		var ghj_Organization=Ext.getCmp('ghj_Organization').getValue();
		
		//是否找到物料科编码为  否  物料编码可编写
		var ghj_ComponentName=Ext.getCmp('ghj_ComponentName').getValue();
		
		var param={
				Flag:true,
				userID:ghjuserID,
				Id:date.Id,
				ReplaceBy:ghj_ReplaceBy,
				Type:ghj_Type,
				RunTime:ghj_RunTime,
				UsedQuantity:ghj_UsedQuantity,
				ReplaceDate:ghj_ReplaceDate,
				PreventiveReplaceFlg:ghj_PreventiveReplaceFlg,
				FaultReason:ghj_FaultReason,
				CostExplanation:ghj_CostExplanation,
				ResponsibilityDivision:ghj_ResponsibilityDivision,
				ElevatorType:ghj_ElevatorType,
				Parts:ghj_Parts,
				Floor:ghj_Floor,
				HighTemperature:ghj_HighTemperature,
				Wet:ghj_Wet,
				Wind:ghj_Wind,
				HighBasicity:ghj_HighBasicity,
				AirPollution:ghj_AirPollution,
				Other:ghj_Other,
				Normal:ghj_Normal,
				AssetNumber:ghj_AssetNumber,
				AssetDomainName:ghj_AssetDomainName,
				AssetEdificeName:ghj_AssetEdificeName,
				AssetAddress:ghj_AssetAddress,
				AgreementNumber:ghj_AgreementNumber,
				ProductName:ghj_ProductName,
				ProductPart:ghj_ProductPart,
				ElevatorMark:ghj_ElevatorMark,
				AgreementBusinessType:ghj_AgreementBusinessType,
				TechRegisteredDate:ghj_TechRegisteredDate,
				HandoverToAccountDate:ghj_HandoverToAccountDate,
				HandoverToMDate:ghj_HandoverToMDate,
				CompanyOrganization:ghj_CompanyOrganization,
				Organization:ghj_Organization,
				//服务请求编号
				SRNumber:ghj_SRNumber,
				SRId:date.SRId,
				//服务请求编号
				SRNumber:ghj_SRNumber,
				SRId:date.SRId,
				//物料编码
				//ComponentName:ghj_ComponentName,
		};
		cc.log('保存的值----------');
		cc.log(param);
		var params = {
				adpName:'HttpAdapter_PDA_GHJ',
				prodName:'getReplaceDetUpdate',
				parameters: param
		};
		
		
		/*Ext.Msg.show({
			title: '温馨提示',
			message:'是否要提交本条更换件?',
			buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){*/
					myLoading.show();
					var getResult = function(result){
						cc.log(result);
						try{
							var datd=result.ReplaceDetUpdate_Output.ListOfHelReplaceDetail.ListOfHelReplace.HelReplace;
							//Ext.Msg.alert('温馨提示','保存成功');
							obj.getTJ(obj);
						}catch(e){
							var Msg=result.Fault.faultstring;
							Ext.Msg.alert('温馨提示','保存失败:'+Msg);
							objectXcx.getController('HelcPDA.controller.ghj.GHJSearchCtrl').GHJSearch_id_CX_GC('回退');
						};
					};
					obj.getGHJTwo(this,getResult,params);
		/*		};
			},
		});*/
	},
	
	//为跟换件下拉列表填充值
	XLLB_ghj_selectfield:function(){
		//更换类型
		var one=[
		         {text:'保养',value:'保养'},
		         {text:'急修',value:'急修'},
		         {text:'改造',value:'改造'},
		         {text:'大修',value:'大修'},
		         {text:'安装',value:'安装'},
		         {text:'其他',value:'其他'}];
		Ext.getCmp('ghj_Type').setOptions(one);
		
		//责任划分
		var two=[{text:'请选择',value:''},
		         {text:'保养不良',value:'保养不良'},
		         {text:'安装不良',value:'安装不良'},
		         {text:'维改不良',value:'维改不良'},
		         {text:'产品不良',value:'产品不良'},
		         {text:'使用不良',value:'使用不良'},
		         {text:'顾客设备不良',value:'顾客设备不良'},
		         {text:'开发不良',value:'开发不良'}];
		Ext.getCmp('ghj_ResponsibilityDivision').setOptions(two);
		
		//电梯类型
		var three=[{text:'请选择',value:''},
		         {text:'扶梯',value:'扶梯'},
		         {text:'直梯',value:'直梯'},
		         {text:'部件',value:'部件'},
		         {text:'ITM',value:'ITM'},
		         {text:'组件',value:'组件'},
		         {text:'配件',value:'配件'},];
		Ext.getCmp('ghj_ElevatorType').setOptions(three);
		
		//更换件状态
		var five=[{text:'待提交',value:'待提交'},
				   {text:'已派工',value:'已派工'},
				   {text:'已备用',value:'已备用'},
				   {text:'提交待审批',value:'提交待审批'},
				   {text:'已审核',value:'已审核'}];
		Ext.getCmp('ghj_Status').setOptions(five);
		
		//数据来源    暂时用不到啊
		if(false){
			var five=[{text:'工程总部带领',value:'工程总部带领'},
					   {text:'分公司领料',value:'分公司领料'},
					   {text:'外部购入',value:'外部购入'}];
			Ext.getCmp('five').setOptions(five);	
		};
		
		//大客户标示
		var six=[{text:'万科企业股份有限公司',value:'万科企业股份有限公司'},
				   {text:'上海世茂',value:'上海世茂'},
				   {text:'世纪金源',value:'世纪金源'},
				   {text:'中冶京诚（北京）',value:'中冶京诚（北京）'},
				   {text:'中南控股有限公司',value:'中南控股有限公司'},
				   {text:'仁恒置地集团',value:'仁恒置地集团'},
				   {text:'佳兆业集团',value:'佳兆业集团'},
				   {text:'保利房地产（广州）',value:'保利房地产（广州）'},
				   {text:'北京信达房产',value:'北京信达房产'},
				   {text:'北京当代节能置业',value:'北京当代节能置业'},
				   {text:'华润置地有限公司',value:'华润置地有限公司'},
				   {text:'合生创展（广州）',value:'合生创展（广州）'},
				   {text:'大连万达集团股份有限公司',value:'大连万达集团股份有限公司'},
				   {text:'大连亿达地产',value:'大连亿达地产'},
				   {text:'安徽利港置业',value:'安徽利港置业'},
				   {text:'富力集团（广州）',value:'富力集团（广州）'},
				   {text:'广州恒大地产',value:'广州恒大地产'},
				   {text:'新世界中国地产',value:'新世界中国地产'},
				   {text:'景瑞房地产(上海）',value:'景瑞房地产(上海）'},
				   {text:'武汉名流地产',value:'武汉名流地产'},
				   {text:'江苏新城房产股份有限公司',value:'江苏新城房产股份有限公司'},
				   {text:'沿海地产投资（中国）有限公司',value:'沿海地产投资（中国）有限公司'},
				   {text:'深圳招商地产',value:'深圳招商地产'},
				   {text:'深圳花样年',value:'深圳花样年'},
				   {text:'碧桂园控股（广州）',value:'碧桂园控股（广州）'},
				   {text:'远洋房地产',value:'远洋房地产'},
				   {text:'长春亚泰集团',value:'长春亚泰集团'},
				   {text:'雅居乐（中山）',value:'雅居乐（中山）'},
				   {text:'龙光集团',value:'龙光集团'},
				   {text:'方兴地产(中国)有限公司',value:'方兴地产(中国)有限公司'},
				   {text:'中信地产',value:'中信地产'},
				   {text:'卓越置业集团有限公司',value:'卓越置业集团有限公司'},
				   {text:'重庆协信控股集团',value:'重庆协信控股集团'},
				   {text:'珠江投资',value:'珠江投资'},
				   {text:'越秀城建',value:'越秀城建'},
				   {text:'美的地产',value:'美的地产'},
				   {text:'珠江实业有限公司',value:'珠江实业有限公司'},
				   {text:'广电房地产',value:'广电房地产'},
				   {text:'时代地产',value:'时代地产'},
				   {text:'普通',value:'普通'},
				   {text:'潜在大客户',value:'潜在大客户'}];
		Ext.getCmp('ghj_KAMpType').setOptions(six);
		
		//是否找到物料编码
		var seven=[{text:'是',value:'是'},
				   {text:'否',value:'否'}];
		Ext.getCmp('ghj_ComponentFoundFlag').setOptions(seven);
		
		//是否预防更换
		var eight=[{text:'请选择',value:''},
		           {text:'是',value:'是'},
				   {text:'否',value:'否'}];
		Ext.getCmp('ghj_PreventiveReplaceFlg').setOptions(eight);
		
		//另加
		//费用说明
		var nine=[{text:'请选择',value:''},
			      {text:'有偿',value:'有偿'},
			      {text:'免费',value:'免费'}];
		Ext.getCmp('ghj_CostExplanation').setOptions(nine);
	},


});