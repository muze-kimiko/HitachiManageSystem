/**
 * SynchronizationTable_ZYXM_Store  保障表的作业项目由这个数据仓装载
 * SynchronizationTable_LZXM_Store(录入值)和SynchronizationTable_FJ_Store(附件)的数据来自于点击,作业项目
 * 当完成作业项目的填写时，会把SynchronizationTable_LZXM_Store(录入值)和SynchronizationTable_FJ_Store(附件)的数据，重新覆盖SynchronizationTable_ZYXM_Store
 */
Ext.define('HelcPDA.controller.SynchronizationTable.SafeguardTwoContentCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		
		control:{
			
			"button#SafeguardTwoContent_id_TJ":{
				tap:'SafeguardTwoContent_id_TJ'
			},
			
			"button#SafeguardTwoContent_id_BC":{
				tap:'SafeguardTwoContent_id_BC'
			},
			
			"list#SafeguardTwoContent_id_list_ZYXM":{
				itemtap:'SafeguardTwoContent_id_list_ZYXM'
			},
			
			/*"button#ZYXM_add":{
				tap:'ZYXM_add'
			},*/
			
			
			"list#SafeguardTwoContent_id_list_YLWT":{
				itemtap:'SafeguardTwoContent_id_list_YLWT'
			},
			
			"button#YLWT_Add":{
				tap:'YLWT_Add'
			},
			
			"list#SafeguardTwoContent_id_list_QTBLXM":{
				itemtap:'SafeguardTwoContent_id_list_QTBLXM'
			},
			
			"button#QTBLXM_Add":{
				tap:'QTBLXM_Add'
			},
			
			
		}
	},
	
	//判断是保障表还是监视器
	getBzbandJsq:function(){
		console.log('激活成功---------------------');
		//全局  分辨是保障表还是阶梯表
		SafeguardName=objectXcx.getController('HelcPDA.controller.MenusViewCtrl').SafeguardName;
	},
	
	/**
	 * ---------------提交 Start
	 */
	//提交
	SafeguardTwoContent_id_TJ:function(){
		var obj=this;
		var ID=Ext.getCmp('SafeguardTwoContent_Hidden_ID').getValue();
		
		if(SafeguardName=='保障表'){
			this.SafeguardTwoContent_id_TJ_BZB(obj,ID);
		}else if(SafeguardName=='接梯表'){
			this.SafeguardTwoContent_id_TJ_JTB(obj,ID);
		};
		
		
	},
	
	//保障表 提交
	SafeguardTwoContent_id_TJ_BZB:function(obj,ID){
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getBZMeasureSynchronizeTJ';
		param.parameters=ID;
		
		console.log('提交的值----------------');
		console.log(param);
		
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			try{
				var msg=result.Envelope.Body.BZMeasureSubmit_Output.ErrorMsg;
				obj.getWXTS(msg);
				return;
			}catch(e){
				console.log('----------提交成功！');
				WL.Toast.show('提交成功！');
			}
			obj.BackView();
			obj.BackView()
		};
		obj.getSafeguard(getResult,param);
	},
	
	//阶梯表 提交
	SafeguardTwoContent_id_TJ_JTB:function(obj,ID){
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getJTMeasureSubmit';
		param.parameters=ID;
		
		console.log('提交的值----------------');
		console.log(param);
		
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			try{
				var msg=result.Envelope.Body.JTMeasureSubmit_Output.ErrorMsg;
				if(msg){
					obj.getWXTS(msg);
					return;					
				}
			}catch(e){
				console.log('----------提交成功！');
				WL.Toast.show('提交成功！');
			}
			obj.BackView();
			obj.BackView()
		};
		obj.getSafeguard(getResult,param);
	},
	
	/**
	 * ---------------提交 End
	 */
	
	
	/**
	 * ---------------保存 Start
	 */
	
	//保存
	SafeguardTwoContent_id_BC:function(){
		var obj=this;
		if(SafeguardName=='保障表'){
			this.SafeguardTwoContent_id_BC_BZB(obj);
		}else if(SafeguardName=='接梯表'){
			this.SafeguardTwoContent_id_BC_JTB(obj);
		};
	},
	
	//保障表    当作业项目是多个的时候有点问题，需在看看  2017-3-31
	SafeguardTwoContent_id_BC_BZB:function(obj){
		//集合
		var paramData={};
		//ID
		paramData.Id=Ext.getCmp('SafeguardTwoContent_Hidden_ID').getValue();
		//alert(Ext.getCmp('SafeguardTwoContent_Hidden_ID').getValue());
		//遗留问题
		var LSYLWTstore=this.getStore('SynchronizationTable_YLWT_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_YLWT_Store');
		var LSYLWTnum=LSYLWTstore.getCount();
		var LSYLWTdata=[];
		for(var i=0;i<LSYLWTnum;i++){
			var ylwt={};
			ylwt.Id=LSYLWTstore.getData().items[i].data.Id;
			ylwt.MeasureLegacyOverproofReason=LSYLWTstore.getData().items[i].data.MeasureLegacyOverproofReason;
			ylwt.MeasureLegacyProjectNo=LSYLWTstore.getData().items[i].data.MeasureLegacyProjectNo;
			ylwt.MeasureLegacySpotSituation=LSYLWTstore.getData().items[i].data.MeasureLegacySpotSituation;
			LSYLWTdata[i]=ylwt;
		};
		paramData.LSYLWT=LSYLWTdata;
		
		//作业项目
		var ZYXMstore=this.getStore('SynchronizationTable_ZYXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_ZYXM_Store');
		var ZYXMnum=ZYXMstore.getCount();
		var ZYXMdata=[];
		console.log('------作业项目');
		console.log(ZYXMstore);
		console.log(ZYXMnum);
		/*//录入值
		var LRZstore=this.getStore('SynchronizationTable_LZXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_LZXM_Store');
		var LRZnum=LRZstore.getCount();
		
		//附件
		var FJstore=this.getStore('SynchronizationTable_FJ_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_FJ_Store');
		var FJnum=FJstore.getCount();
		
		console.log('---------------录入值');
		console.log(LRZstore);
		console.log(LRZnum);
		
		console.log('---------------附件');
		console.log(FJstore);
		console.log(FJnum);*/
		
		for(var i=0;i<ZYXMnum;i++){
			var zyxm={};
			zyxm.Id=ZYXMstore.getData().items[i].data.Id;
			zyxm.MeasureItemPreWork2=ZYXMstore.getData().items[i].data.MeasureItemPreWork2;
			zyxm.MeasureItemPostWork2=ZYXMstore.getData().items[i].data.MeasureItemPostWork2;
			
			//录入值
			var lrzData=ZYXMstore.getData().items[i].data.ListOfHelMeasureRecordList.HelMeasureRecordList;
			console.log('---------------录入值');
			console.log(lrzData);
			//记录录入值
			var LrzArray=[];
			try{
				var LrzNum=lrzData.length;
				if(LrzNum==undefined){//只有一个
					console.log('进入单个');
					var LRZ={};
					LRZ.Id=lrzData.Id;
					LRZ.MeasureRecordValue=lrzData.MeasureRecordValue;
					LrzArray[0]=LRZ;
				}else{//多个
					console.log('进入多个');
					for(var l=0;l<LrzNum;l++){
						var LRZ={};
						LRZ.Id=lrzData[l].Id;
						LRZ.MeasureRecordValue=lrzData[l].MeasureRecordValue;
						LrzArray[l]=LRZ;
					}
				}
				
			}catch(e){//没有数据
			};
			zyxm.LRZ=LrzArray;
			
			//附件
			var fjData=ZYXMstore.getData().items[i].data.ListOfHelMeasureItemAttachment.HelMeasureItemAttachment;
			console.log('---------------附件');
			console.log(fjData);
			var FjArray=[];
			try{
				var FjNum=fjData.length;
				if(FjNum==undefined){//只有一个
					console.log('进入单个');
					FjArray[0]=fjData;
				}else{//多个
					console.log('进入多个');
					for(var l=0;l<FjNum;l++){
						FjArray[l]=fjData[l];
					}
				}
				
			}catch(e){//没有数据
			};
			zyxm.FJ=FjArray;
			
			//通过录入值的RecordItemId和作业项目的Id，判断录入值所属
			//var LRZdata=[];
			//var LRZnumber=0;
			//console.log('作业项目ID:'+zyxm.Id);
			/*
			for(var l=0;l<LRZnum;l++){
				//console.log(ZYXMstore.getData().items[i].data.Id+'     '+LRZstore.getData().items[l].data.ParentItemId);
				var aa=ZYXMstore.getData().items[i].data.Id;
				var bb=LRZstore.getData().items[l].data.ParentItemId;
				if(aa==bb){
					LRZdata[LRZnumber]=LRZstore.getData().items[l].data;
					LRZnumber++;
				}
			}
			zyxm.LRZ=LRZdata;
			
			//通过附件的MeasureItemParId和作业项目的Id，判断附件所属
			var FJdata=[];
			var FJnumber=0;
			for(var f=0;f<FJnum;f++){
				var aa=ZYXMstore.getData().items[i].data.Id;
				var bb=FJstore.getData().items[f].data.MeasureItemParId;
				var cc=FJstore.getData().items[f].data.Id;
				console.log('cc:'+cc);
				if(aa==bb&&cc==undefined){
					FJdata[FJnumber]=FJstore.getData().items[f].data;
					FJnumber++;
				}
			};
			zyxm.FJ=FJdata;*/
			
			ZYXMdata[i]=zyxm;
		};
		paramData.ZYXM=ZYXMdata;
		
		console.log(paramData);
		//return;
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getBZMeasureSynchronize';
		param.parameters=paramData;
		
		console.log('提交的值----------------');
		console.log(param);
		//return;
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			try{
				var ErrorFlag=result.Envelope.Body.BZMeasureSynchronize_Output.ListOfHelMeasureLiftelevatorBz.HelMaintainingPlanActionTask;
				obj.getWXTS('保存成功');
			}catch(e){
				obj.getWXTS('保存失败');
			};
		};
		obj.getSafeguard(getResult,param);
	},
	
	//阶梯表
	SafeguardTwoContent_id_BC_JTB:function(obj){
		//传递的值
		var paramData={};
		//ID
		paramData.Id=Ext.getCmp('SafeguardTwoContent_Hidden_ID').getValue();
		
		//其他不良项目
		var QTBLXMstore=this.getStore('SynchronizationTable_QTBLXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_Store');
		console.log(QTBLXMstore);
		var QTBLXMTnum=QTBLXMstore.getCount();
		var QTBLXMdata=[];
		for(var i=0;i<QTBLXMTnum;i++){
			var qtblxm={};
			qtblxm.Id=QTBLXMstore.getData().items[i].data.Id;
			qtblxm.MeasureBadItemDesc=QTBLXMstore.getData().items[i].data.MeasureBadItemDesc;
			qtblxm.MeasureBadItemResponseDivision=QTBLXMstore.getData().items[i].data.MeasureBadItemResponseDivision;
			qtblxm.MeasureBadItemZGCompleteDatetime=getTime(QTBLXMstore.getData().items[i].data.MeasureBadItemZGCompleteDatetime);
			qtblxm.MeasureBadItemWorkTime=QTBLXMstore.getData().items[i].data.MeasureBadItemWorkTime;
			qtblxm.MeasureBadItemZGDivision=QTBLXMstore.getData().items[i].data.MeasureBadItemZGDivision;
			qtblxm.MeasureBadItemResponsePersonId=QTBLXMstore.getData().items[i].data.MeasureBadItemResponsePersonId;
			qtblxm.MeasureBadItemReCheckDatetime=getTime(QTBLXMstore.getData().items[i].data.MeasureBadItemReCheckDatetime);
			qtblxm.MeasureBadItemComments=QTBLXMstore.getData().items[i].data.MeasureBadItemComments;
			QTBLXMdata[i]=qtblxm;
		};
		paramData.QTBLXM=QTBLXMdata;
		
		//日期转换
		function getTime(time){
			if(time){
				var data=new Date(time);
				var dd=Ext.Date.format(data,'m/d/Y H:i:s');
				return dd;
			}
			return time;
		}
		
		//作业项目
		var ZYXM_JTBstore=this.getStore('SynchronizationTable_ZYXM_JTB_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_ZYXM_JTB_Store');
		console.log(ZYXM_JTBstore);
		//作业长度
		var ZYXM_JTBnum=ZYXM_JTBstore.getCount();
		//作业项目
		var ZYXM_JTBdata=[];
		//录入值
		//var LRZ_JTBdata=[];
		for(var j=0;j<ZYXM_JTBnum;j++){
			var ZYXM={};
			//作业项目
			var ZYXMData=ZYXM_JTBstore.getData().items[j].data;
			//console.log('----作业项目');
			//console.log(ZYXMData);
			
			//录入值
			var LrzData=ZYXMData.ListOfHelMeasureRecordList.HelMeasureRecordList;
			//console.log('----录入值');
			//console.log(LrzData);
			var LrzArray=[];
			try{
				var LrzNum=LrzData.length;
				if(LrzNum==undefined){//只有一个
					var LRZ={};
					LRZ.Id=LrzData.Id;
					LRZ.MeasureRecordValue=LrzData.MeasureRecordValue;
					LrzArray[0]=LRZ;
				}else{//多个
					for(var l=0;l<LrzNum;l++){
						var LRZ={};
						LRZ.Id=LrzData[l].Id;
						LRZ.MeasureRecordValue=LrzData[l].MeasureRecordValue;
						LrzArray[l]=LRZ;
					}
				}
				
			}catch(e){//没有数据
			};
			ZYXM.LRZ=LrzArray;
			//作业项目
			ZYXM.Id=ZYXMData.Id;
			ZYXM.MeasureItemNo=ZYXMData.MeasureItemNo;
			ZYXM.MeasureItemName=ZYXMData.MeasureItemName;
			ZYXM.MeasureItemType=ZYXMData.MeasureItemType;
			ZYXM.MeasureItemContent=ZYXMData.MeasureItemContent;
			ZYXM.MeasureItemStandard=ZYXMData.MeasureItemStandard;
			ZYXM.MeasureItemIFGood=ZYXMData.MeasureItemIFGood;
			ZYXM.MeasureItemResponseDivision=ZYXMData.MeasureItemResponseDivision;
			ZYXM.MeasureItemPreWork2=ZYXMData.MeasureItemPreWork2;
			ZYXM.MeasureItemZGCompleteDate=ZYXMData.MeasureItemZGCompleteDate;
			ZYXM.MeasureItemZGWorkTime=ZYXMData.MeasureItemZGWorkTime;
			ZYXM.MeasureItemZGDivision=ZYXMData.MeasureItemZGDivision;
			ZYXM.MeasureItemZGResponsePersonId=ZYXMData.MeasureItemZGResponsePersonId;//整改责任人只要传ID
			ZYXM.MeasureItemReCheckTime=ZYXMData.MeasureItemReCheckTime;
			ZYXM.MeasureItemReCheckPersonId=ZYXMData.MeasureItemReCheckPersonId;//修改复检人只要传ID
			//作业项目
			ZYXM_JTBdata[j]=ZYXM;
		};
		paramData.ZYXM=ZYXM_JTBdata;
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getJTMeasureSynchronize';
		param.parameters=paramData;
		
		console.log('提交的值----------------');
		console.log(param);
		//return;
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			try{
				var ErrorFlag=result.Envelope.Body.JTMeasureSynchronize_Output.ListOfHelEaiPdaMeasure.HelMeasureList;
				obj.getWXTS('保存成功');
			}catch(e){
				obj.getWXTS('保存失败');
			};
		};
		obj.getSafeguard(getResult,param);
	},
	/**
	 * ---------------保存 End
	 */
	
	
	//作业项目list
	//如果没有查询作业项目,那么,保存时就没有录入值和附件
	SafeguardTwoContent_id_list_ZYXM:function(obj,index,target,record,e,eOpts){
		console.log(record);
		this.NextView('SafeguardFourRecordContent_ZYXM_id','HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_ZYXM');
		
		//显示页签
		var fj=Ext.getCmp('SafeguardFourRecordContent_ZYXM_id_Tabpanel');
		var tab=fj.getInnerItems();
		fj.setActiveItem(tab[0]);
		
		//位置
		Ext.getCmp('SafeguardFourRecordContent_ZYXM_index').setValue(index);
		
		if(SafeguardName=='保障表'){
			this.getSafeguardTwoContent_id_list_ZYXM_bzb(record);
		}else if(SafeguardName=='接梯表'){
			//隐藏附件页签
			fj.getTabBar().getComponent(2).hide();
			this.getSafeguardTwoContent_id_list_ZYXM_jtb(record);
		};
		//激活表判断
		objectXcx.getController('SynchronizationTable.SafeguardFourRecordContent_ZYXMCtrl').getBzbandJsq();
 	},
 	
 	//保障表入口
 	getSafeguardTwoContent_id_list_ZYXM_bzb:function(record){
 		/**
 		 * 填值
 		 */
 		//作业前
		Ext.getCmp('SafeguardFour_MeasureItemPreWork2').setValue(record.data.MeasureItemPreWork2);
		//作业后
		Ext.getCmp('SafeguardFour_MeasureItemPostWork2').setValue(record.data.MeasureItemPostWork2);
		//作业前，后的查询条件
		Ext.getCmp('SafeguardFourRecordContent_ZYXM_MeasureProjectId').setValue(record.data.MeasureProjectId);
		//当前作业项目的ID
		Ext.getCmp('SafeguardFourRecordContent_ZYXM_id_ID').setValue(record.data.Id);
		
		/**
		 * 显示
		 */
		//作业前
		Ext.getCmp('SafeguardFour_MeasureItemPreWork2').setHidden(false);
		//作业后
		Ext.getCmp('SafeguardFour_MeasureItemPostWork2').setHidden(false);
		
		
		/**
		 * 填值
		 */
		//添加录入值
		var LRZstore=this.getStore('SynchronizationTable_LZXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_LZXM_Store');
		LRZstore.setData(record.data.ListOfHelMeasureRecordList.HelMeasureRecordList);
		//console.log('录入值---------------');
		//console.log(record.data.ListOfHelMeasureRecordList.HelMeasureRecordList);

		
		//添加附件
		var FJstore=this.getStore('SynchronizationTable_FJ_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_FJ_Store');
		var FJstoreNum=LRZstore.getCount();
		var FJData=record.data.ListOfHelMeasureItemAttachment;
		if(FJData){//判断是否有值
			var FJsz=[];
			try{
				var FJnum=FJData.HelMeasureItemAttachment.length;
				var OneFj=FJData.HelMeasureItemAttachment;
				if(FJnum==undefined){
					if(OneFj.MeasureItemAttachFileBuffer){
						OneFj.MeasureItemAttachFileBuffer2=OneFj.MeasureItemAttachFileBuffer.CDATA;
					}
					OneFj.MeasureItemAttachFileBuffer3='data:image/jpeg;base64,'+OneFj.MeasureItemAttachFileBuffer2;
					FJsz[0]=OneFj;
				};
				//多个
				var num=0;
				for(var i=0;i<FJnum;i++){
					if(OneFj[i].MeasureItemAttachFileBuffer){
						OneFj[i].MeasureItemAttachFileBuffer2=OneFj[i].MeasureItemAttachFileBuffer.CDATA;
					}
					OneFj[i].MeasureItemAttachFileBuffer3='data:image/jpeg;base64,'+OneFj[i].MeasureItemAttachFileBuffer2;
					FJsz[num]=OneFj[i];
					num++;
				};
			}catch(e){
				//多个
				var num=0;
				for(var i=0;i<FJnum;i++){
					if(OneFj[i].MeasureItemAttachFileBuffer){
						OneFj[i].MeasureItemAttachFileBuffer2=OneFj[i].MeasureItemAttachFileBuffer.CDATA;
					}
					OneFj[i].MeasureItemAttachFileBuffer3='data:image/jpeg;base64,'+OneFj[i].MeasureItemAttachFileBuffer2;
					FJsz[num]=OneFj[i];
					num++;
				};
			};
			FJstore.setData(FJsz);
			//console.log('附件-------------');
			//console.log(FJsz);
			
		};
			
 	},
 	
 	//阶梯表入口
 	getSafeguardTwoContent_id_list_ZYXM_jtb:function(record){
 		//作业前，后的查询条件
		Ext.getCmp('SafeguardFourRecordContent_ZYXM_MeasureProjectId').setValue(record.data.MeasureProjectId);
		
		var SafeguardArray=["JTB_MeasureItemNo",
		                    "JTB_MeasureItemName",
		                    "JTB_MeasureItemType",
		                    "JTB_MeasureItemContent",
		                    "JTB_MeasureItemStandard",
		                    "JTB_MeasureItemIFGood",
		                    "JTB_MeasureItemResponseDivision",
		                    "JTB_MeasureItemPreWork2",
		                    "JTB_MeasureItemZGCompleteDate",
		                    "JTB_MeasureItemZGWorkTime",
		                    "JTB_MeasureItemZGDivision",
		                    "JTB_MeasureItemResponsePersonLastName",
		                    "JTB_MeasureItemResponsePersonLastName_ID",
		                    "JTB_MeasureItemReCheckTime",
		                    "JTB_MeasureItemReCheckPersonLastName",
		                    "JTB_MeasureItemReCheckPersonLastName_ID",
		                    ];
		var SafeguardValue=[
							record.data.MeasureItemNo,
							record.data.MeasureItemName,
							record.data.MeasureItemType,
							record.data.MeasureItemContent,
							record.data.MeasureItemStandard,
							record.data.MeasureItemIFGood,
							record.data.MeasureItemResponseDivision,
							record.data.MeasureItemPreWork2,
							record.data.MeasureItemZGCompleteDate,
							record.data.MeasureItemZGWorkTime,
							record.data.MeasureItemZGDivision,
							//显示只要名字就好
							record.data.MeasureItemResponsePersonLastName,
							//修改整改人需要ID
							record.data.MeasureItemZGResponsePersonId,
							record.data.MeasureItemReCheckTime,
							//显示只要名字就好
							record.data.MeasureItemReCheckPersonLastName,
							//修改复检人需要ID
							record.data.MeasureItemReCheckPersonLastName_ID,
							];
		//显示作业项目控件
		for(var i=0;i<SafeguardArray.length;i++){
			Ext.getCmp(SafeguardArray[i]).setHidden(false);
		}
		//填值
 		for(var i=0;i<SafeguardValue.length;i++){
 			if(i==5){
 				if(SafeguardValue[i]=='Y'){
 					Ext.getCmp(SafeguardArray[i]).setValue(1);
 				}else{
 					Ext.getCmp(SafeguardArray[i]).setValue(0);
 				}
 			}else if(i==8){
 				Ext.getCmp(SafeguardArray[i]).setValue(ZHtime(SafeguardValue[i]));
 			}else if(i==13){
 				Ext.getCmp(SafeguardArray[i]).setValue(ZHtime(SafeguardValue[i]));
 			}else{
 				Ext.getCmp(SafeguardArray[i]).setValue(SafeguardValue[i]);
 			}
 		}
 		
 		//时间转换方法
		function ZHtime(time){
			if(time!=''){
				time=new Date(time);
				time=Ext.Date.format(time,'Y-m-d');
			};
			//cc.log(time);
			return time;
		};
		//添加录入值
		var LRZstore=this.getStore('SynchronizationTable_LZXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_LZXM_Store');
		LRZstore.setData(record.data.ListOfHelMeasureRecordList.HelMeasureRecordList);
 	},
	
	//作业项目 增加按钮
	/*ZYXM_add:function(){
		this.NextView('SafeguardFourRecordContent_ZYXM_id','HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_ZYXM');
		Ext.getCmp('SafeguardFourRecordContent_ZYXM_id_TJ').setText('保存');
	},*/
	
	//遗留问题list
	SafeguardTwoContent_id_list_YLWT:function(obj,index,target,record,e,eOpts){
		//console.log(record);
		//console.log(index);
		var YLWTDelete=objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').YLWTDelete;
		console.log(YLWTDelete);
		if(YLWTDelete=='删除'){
			var ID=record.data.Id;
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_YLWTCtrl').SafeguardFivelegacyContent_YLWT_id_Delete(index,ID);
		}else{
			this.NextView('SafeguardFivelegacyContent_YLWT_id','HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_YLWT');
			Ext.getCmp('SafeguardFivelegacyContent_YLWT_id_TJ').setText('修改');
			Ext.getCmp('SafeguardFivelegacyContent_YLWT_id_Toolbar').setTitle('修改遗留问题');
			Ext.getCmp('YLWT_MeasureLegacyProjectNo').setValue(record.data.MeasureLegacyProjectNo);
			Ext.getCmp('YLWT_MeasureLegacySpotSituation').setValue(record.data.MeasureLegacySpotSituation);
			Ext.getCmp('YLWT_MeasureLegacyOverproofReason').setValue(record.data.MeasureLegacyOverproofReason);
			//位置
			Ext.getCmp('SafeguardFivelegacyContent_YLWT_index').setValue(index);
			
		};
	},

	//遗留问题  增加按钮
	YLWT_Add:function(){
		this.NextView('SafeguardFivelegacyContent_YLWT_id','HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_YLWT');
		Ext.getCmp('SafeguardFivelegacyContent_YLWT_id_TJ').setText('保存');
		Ext.getCmp('SafeguardFivelegacyContent_YLWT_id_Toolbar').setTitle('新建遗留问题');
	},

	//其他不良项目
	SafeguardTwoContent_id_list_QTBLXM:function(obj,index,target,record,e,eOpts){
		//判断是否删除
		var QTBLXMDelete=objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').QTBLXMDelete;
		console.log(QTBLXMDelete);
		if(QTBLXMDelete=='删除'){
			var ID=record.data.Id;
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').SafeguardFivelegacyContent_QTBLXM_Delete(index,ID);
		}else{
			this.NextView('SafeguardFivelegacyContent_QTBLXM_id','HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_QTBLXM');
			Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_id_QD').setText('修改');
			Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_id_Toolbar').setTitle('修改其他不良项');
			//位置
			Ext.getCmp('QTBLXM_Hidden_index').setValue(index);

			/**
			 * 填值
			 */
			Ext.getCmp('MeasureBadItemDesc').setValue(record.data.MeasureBadItemDesc);
			Ext.getCmp('MeasureBadItemResponseDivision').setValue(record.data.MeasureBadItemResponseDivision);
			Ext.getCmp('MeasureBadItemZGCompleteDatetime').setValue(ZHtime(record.data.MeasureBadItemZGCompleteDatetime));
			Ext.getCmp('MeasureBadItemWorkTime').setValue(record.data.MeasureBadItemWorkTime);
			Ext.getCmp('MeasureBadItemZGDivision').setValue(record.data.MeasureBadItemZGDivision);
			Ext.getCmp('MeasureBadItemRepPersonFullName').setValue(record.data.MeasureBadItemRepPersonFullName);
			Ext.getCmp('MeasureBadItemReCheckDatetime').setValue(ZHtime(record.data.MeasureBadItemReCheckDatetime));
			Ext.getCmp('MeasureBadItemComments').setValue(record.data.MeasureBadItemComments);
			
			//时间转换方法
			function ZHtime(time){
				if(time!=''){
					time=new Date(time);
					time=Ext.Date.format(time,'Y-m-d');
				};
				//cc.log(time);
				return time;
			};
			
		};
	},
	
	//其他不良项目 增加按钮
	QTBLXM_Add:function(){
		this.NextView('SafeguardFivelegacyContent_QTBLXM_id','HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_QTBLXM');
		Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_id_QD').setText('保存');
		Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_id_Toolbar').setTitle('新建其他不良项目');
	},

});