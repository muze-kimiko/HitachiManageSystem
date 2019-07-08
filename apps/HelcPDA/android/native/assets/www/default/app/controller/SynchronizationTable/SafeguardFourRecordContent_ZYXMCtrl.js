
/* JavaScript content from app/controller/SynchronizationTable/SafeguardFourRecordContent_ZYXMCtrl.js in folder common */
Ext.define('HelcPDA.controller.SynchronizationTable.SafeguardFourRecordContent_ZYXMCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		
		control:{
			/**
			 * 作业项目
			 */
			
			"button#SafeguardFourRecordContent_ZYXM_id_TJ":{
				tap:'SafeguardFourRecordContent_ZYXM_id_TJ'
			},
			
			"textfield#SafeguardFour_MeasureItemPreWork2":{
				tap:'SafeguardFour_MeasureItemPreWork2'
			},
			
			"textfield#SafeguardFour_MeasureItemPostWork2":{
				tap:'SafeguardFour_MeasureItemPostWork2'
			},
			
			"button#SafeguardFourRecordContent_ZYXM_List_id_QD":{
				tap:'SafeguardFourRecordContent_ZYXM_List_id_QD'
			},
		
			"list#SafeguardFourRecordContent_ZYXM_List_id_list":{
				itemtap:'SafeguardFourRecordContent_ZYXM_List_id_list'
			},
			
			/**
			 * 录值项目
			 */
			
			"list#SafeguardFourRecordContent_ZYXM_id_LZXM_list":{
				itemtap:'SafeguardFourRecordContent_ZYXM_id_LZXM_list'
			},
			
			/**
			 * 附件
			 */
			
			"button#SafeguardFourRecordContent_ZYXM_id_FJ_camear":{
				tap:'SafeguardFourRecordContent_ZYXM_id_FJ_camear'
			},
			
			"button#SafeguardFourRecordContent_ZYXM_id_FJ_album":{
				tap:'SafeguardFourRecordContent_ZYXM_id_FJ_album'
			},
			
			"dataview#SafeguardFourRecordContent_ZYXM_id_FJ_list":{
				itemtap:'SafeguardFourRecordContent_ZYXM_id_FJ_list'
			},
			
			"button#SafeguardFourRecordContent_FJ_Img_id_SC":{
				tap:'SafeguardFourRecordContent_FJ_Img_id_SC'
			},
			
			"button#SafeguardFourRecordContent_FJ_Img_id_QD":{
				tap:'SafeguardFourRecordContent_FJ_Img_id_QD'
			},
			
			/**
			 * 阶梯表
			 */
			"textfield#JTB_MeasureItemNo":{
				tap:'JTB_MeasureItemNo'
			},
			
			"textfield#JTB_MeasureItemResponseDivision":{
				tap:'JTB_MeasureItemResponseDivision'
			},
		
			"textfield#JTB_MeasureItemPreWork2":{
				tap:'JTB_MeasureItemPreWork2'
			},
			
			"textfield#JTB_MeasureItemZGDivision":{
				tap:'JTB_MeasureItemZGDivision'
			},
			
			"textfield#JTB_MeasureItemResponsePersonLastName":{
				tap:'JTB_MeasureItemResponsePersonLastName'
			},
			
			"textfield#JTB_MeasureItemReCheckPersonLastName":{
				tap:'JTB_MeasureItemReCheckPersonLastName'
			},
			
			"textfield#JTB_MeasureItemNo":{
				tap:'JTB_MeasureItemNo'
			},
			
		}
	},
	
	//判断是保障表还是监视器
	getBzbandJsq:function(){
		console.log('激活成功2---------------------');
		//全局  分辨是保障表还是阶梯表
		SafeguardName=objectXcx.getController('HelcPDA.controller.MenusViewCtrl').SafeguardName;
	},
	
	
	//保存or修改
	SafeguardFourRecordContent_ZYXM_id_TJ:function(){
		
		if(SafeguardName=='保障表'){
			this.getDataReplacement();
		}else if(SafeguardName=='接梯表'){
			this.getDataReplacement_JTB();
		};
		
		this.BackView();
	},
	
	//替换作业项目中的数据    接梯表
	getDataReplacement_JTB:function(){
		//阶梯表都作业项目
		var ZYXM_JTBstore=this.getStore('SynchronizationTable_ZYXM_JTB_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_ZYXM_JTB_Store');
		//位置
		var index=Ext.getCmp('SafeguardFourRecordContent_ZYXM_index').getValue();
		//作业项目值
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
		var SafeguardMsg=this.getElement(SafeguardArray);
		ZYXM_JTBstore.getAt(index).set('MeasureItemNo',SafeguardMsg[0]);
		ZYXM_JTBstore.getAt(index).set('MeasureItemName',SafeguardMsg[1]);
		ZYXM_JTBstore.getAt(index).set('MeasureItemType',SafeguardMsg[2]);
		ZYXM_JTBstore.getAt(index).set('MeasureItemContent',SafeguardMsg[3]);
		ZYXM_JTBstore.getAt(index).set('MeasureItemStandard',SafeguardMsg[4]);
		if(SafeguardMsg[5]==1){
			ZYXM_JTBstore.getAt(index).set('MeasureItemIFGood','Y');			
		}else{
			ZYXM_JTBstore.getAt(index).set('MeasureItemIFGood','N');			
		}
		ZYXM_JTBstore.getAt(index).set('MeasureItemResponseDivision',SafeguardMsg[6]);
		ZYXM_JTBstore.getAt(index).set('MeasureItemPreWork2',SafeguardMsg[7]);
		ZYXM_JTBstore.getAt(index).set('MeasureItemZGCompleteDate',getTime(SafeguardMsg[8]));
		ZYXM_JTBstore.getAt(index).set('MeasureItemZGWorkTime',SafeguardMsg[9]);
		ZYXM_JTBstore.getAt(index).set('MeasureItemZGDivision',SafeguardMsg[10]);
		//整改人
		ZYXM_JTBstore.getAt(index).set('MeasureItemResponsePersonLastName',SafeguardMsg[11]);
		//整改人ID
		if(SafeguardMsg[12]){
			ZYXM_JTBstore.getAt(index).set('MeasureItemZGResponsePersonId',SafeguardMsg[12]);
		}
		ZYXM_JTBstore.getAt(index).set('MeasureItemReCheckTime',getTime(SafeguardMsg[13]));
		//复检人
		ZYXM_JTBstore.getAt(index).set('MeasureItemReCheckPersonLastName',SafeguardMsg[14]);
		//复检人ID
		if(SafeguardMsg[15]){//有值才修改
			ZYXM_JTBstore.getAt(index).set('MeasureItemReCheckPersonId',SafeguardMsg[15]);			
		}else{
			console.log('没值不修改');
		}
		
		//日期转换
		function getTime(time){
			if(time){
				var data=new Date(time);
				var dd=Ext.Date.format(data,'m/d/Y H:i:s');
				return dd;
			}
			return time;
		}
		
		//录入值
		var LRZstore=this.getStore('SynchronizationTable_LZXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_LZXM_Store');
		var lrz={};
		var lrzData=[];
		for(var i=0;i<LRZstore.getCount();i++){
			lrzData[i]=LRZstore.data.items[i].data;
		};
		lrz.HelMeasureRecordList=lrzData;
		ZYXM_JTBstore.getAt(index).set('ListOfHelMeasureRecordList',lrz);
	},
	
	
	//替换作业项目中的数据    保障表
	getDataReplacement:function(){
		//作业项目
		var ZYXMlist=Ext.data.StoreManager.get('SynchronizationTable_ZYXM_Store');
		if (!ZYXMlist) { 
			ZYXMlist = Ext.create("HelcPDA.store.SynchronizationTable.SynchronizationTable_ZYXM_Store"); 
		};
		
		//取值
		var qian=Ext.getCmp('SafeguardFour_MeasureItemPreWork2').getValue();
		var hou=Ext.getCmp('SafeguardFour_MeasureItemPostWork2').getValue();
		//位置
		var index=Ext.getCmp('SafeguardFourRecordContent_ZYXM_index').getValue();
		
		//修改
		ZYXMlist.getAt(index).set('MeasureItemPreWork2',qian);
		ZYXMlist.getAt(index).set('MeasureItemPostWork2',hou);
		
		var LRZstore=this.getStore('SynchronizationTable_LZXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_LZXM_Store');
		var lrz={};
		var lrzData=[];
		for(var i=0;i<LRZstore.getCount();i++){
			lrzData[i]=LRZstore.data.items[i].data;
		};
		lrz.HelMeasureRecordList=lrzData;
		ZYXMlist.getAt(index).set('ListOfHelMeasureRecordList',lrz);
		

		//附件
		var FJstore=this.getStore('SynchronizationTable_FJ_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_FJ_Store');
		
		var fj={};
		var fjData=[];
		for(var i=0;i<FJstore.getCount();i++){
			fjData[i]=FJstore.data.items[i].data;
		};
		fj.HelMeasureItemAttachment=fjData;
		ZYXMlist.getAt(index).set('ListOfHelMeasureItemAttachment',fj);
		
		console.log('修改后');
		console.log(ZYXMlist.data);
	},
	
	
	//作业前   条件  <MeasureProjectId>1-S64RLL</MeasureProjectId>
	SafeguardFour_MeasureItemPreWork2:function(textfield){
		var ID=Ext.getCmp('SafeguardFourRecordContent_ZYXM_MeasureProjectId').getValue();
		var TJ="[HEL Maintain Plan Select Project.Parent Content Id] = '"+ID+"'";
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getZyFront';
		param.parameters=TJ;
		ZuoYeID='SafeguardFour_MeasureItemPreWork2';
		this.getMeasureItem(this,param,'作业前');
	},
	
	//作业后
	SafeguardFour_MeasureItemPostWork2:function(textfield){
		var ID=Ext.getCmp('SafeguardFourRecordContent_ZYXM_MeasureProjectId').getValue();
		var TJ="[HEL Maintain Plan Select Project.Parent Content Id] = '"+ID+"'";
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getZyHind';
		param.parameters=TJ;
		ZuoYeID='SafeguardFour_MeasureItemPostWork2';
		this.getMeasureItem(this,param,'作业后');
	},
	
	//保障表的作业前和作业后，阶梯表的判断（作业前）公共的
	getMeasureItem:function(obj,param,Flag){
		console.log('提交的值----------------');
		console.log(param);
		//return;
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			var num=0;
			var Data=[];
			var Title='';
			if(Flag=='作业前'||Flag=='判断'){
				num=result.Envelope.Body.PreWorkQuery_Output.NumOutputObjects;
				Data=result.Envelope.Body.PreWorkQuery_Output.ListOfHelPdaMaintainingPlanSelectProjectPreWorkIo.HelMaintainPlanSelectProject;
				Title='作业前列表';
			
			}else if(Flag=='作业后'){
				num=result.Envelope.Body.PostWorkQuery_Output.NumOutputObjects;
				Data=result.Envelope.Body.PostWorkQuery_Output.ListOfHelPdaMaintainingPlanSelectProjectPostWorkIo.HelMaintainPlanSelectProject;
				Title='作业后列表';
				
			};
			
			if(num<=0){
				obj.getWXTS('查无作业数据！');
				return;
			}
			obj.NextView('SafeguardFourRecordContent_ZYXM_List_id','HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_ZYXM_List');
			var sotre=obj.getStore('SynchronizationTable_ZYXM_List_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_ZYXM_List_Store');
			sotre.setData(Data);
			Ext.getCmp('SafeguardFourRecordContent_ZYXM_List_Toolbar').setTitle(Title);							
		};
		obj.getSafeguard(getResult,param);
	},
	
	//作业前，后列表页面  确定按钮
	SafeguardFourRecordContent_ZYXM_List_id_QD:function(){
		//坐标
		var index=99999;
		var sele=document.getElementsByName('ZYXM_ZY_Name');
		
		for(var i=0;i<sele.length;i++){
			var checkbox = sele[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				//是选中的情况下
				index=i;
			}
		};
		if(index==99999){
			this.getWXTS('请选择项目号');
			return;
		};
		this.BackView();
		Ext.getCmp(ZuoYeID).setValue(ZuoYeData);
		
	},
	
	//作业前，后列表页面  list 
	SafeguardFourRecordContent_ZYXM_List_id_list:function(obj,index,target,record,e,eOpts){
		var sele=document.getElementsByName('ZYXM_ZY_Name');
		var num=sele.length;
		
		for(var i=0;i<num;i++){
			var checkbox = sele[i];
			if(i==index){
				if(checkbox.style.color==''){
					checkbox.style.color='#e03a3e';
				}else if(checkbox.style.color=='rgb(204, 204, 204)'){
					//是未选中的情况下
					checkbox.style.color='#e03a3e';
					
				}else if(checkbox.style.color=='rgb(224, 58, 62)'){
					//是选中的情况下
					checkbox.style.color='#ccc';
				}
			}else{
				checkbox.style.color = '#ccc';
			}
		};
		
		if(ZuoYeID=='SafeguardFour_MeasureItemPreWork2'||ZuoYeID=='JTB_MeasureItemPreWork2'){
			ZuoYeData=record.data.PreWorkCheck;
		}else if(ZuoYeID=='SafeguardFour_MeasureItemPostWork2'){
			ZuoYeData=record.data.PostWork;
		};
		
	},

	//录值项目    点击list
	SafeguardFourRecordContent_ZYXM_id_LZXM_list:function(obj,index,target,record,e,eOpts){
		/* 汉化提示窗口的按钮 */
        Ext.define("HelcPDA.overrides.MessageBox", {
            override: "Ext.MessageBox",
            statics: {
                OK    : {text: '确定', itemId: 'ok',  ui: 'action'},
                YES   : {text: '是',   itemId: 'yes', ui: 'action'},
                NO    : {text: '否',   itemId: 'no'},
                CANCEL: {text: '取消', itemId: 'cancel'},

                INFO    : Ext.baseCSSPrefix + 'msgbox-info',
                WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
                QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
                ERROR   : Ext.baseCSSPrefix + 'msgbox-error',

                OKCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '确定', itemId: 'ok',  ui : 'action'}
                ],
                YESNOCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '否',   itemId: 'no'},
                    {text: '是',   itemId: 'yes', ui: 'action'}
                ],
                YESNO: [
                    {text: '否', itemId: 'no'},
                    {text: '是', itemId: 'yes', ui: 'action'}
                ]
            }
        });
        
		Ext.Msg.prompt('录入内容', '',
			function(buttonId,value) {
            	if(buttonId=='ok'){
            		record.set('MeasureRecordValue',value);
                }
            },
            this,
            true,
            record.get('MeasureRecordValue') || '',
            {
            	autoCapitalize: true,
                placeHolder: '请输入录入内容',
            }
	    );
	},
	
	//照片类型.jpeg
	//相机    
	SafeguardFourRecordContent_ZYXM_id_FJ_camear:function(){
		var obj=this;
		var parm = {
			callback :function(filename){
				// 跳转至填写信息界面
				if(filename!==''){
					obj.NextView('SafeguardFourRecordContent_FJ_Img_id','HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_FJ_Img');
					Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_Src').setSrc('data:image/jpeg;base64,' +filename);
					
					//拍照才能新建附件
					Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_QD').setHidden(false);
					//拍照才能填写附件名
					Ext.getCmp('MeasureItemAttachFileName').setReadOnly(false);
				}
	        },//回调函数
	        source:'CAMEAR',// 相机或相册，CAMEAR/ALBUM
	        direction:'FRONT',// 前镜头或后镜头，FRONT/BACK
	        width:640, //width
	        height:640 // height
        };
	    phone.takePhoto(parm);

	},
	
	//相册
	SafeguardFourRecordContent_ZYXM_id_FJ_album:function(){
		var obj=this;
		var parm = {
			callback :function(filename){
				// 跳转至填写信息界面
				if(filename!==''){
					obj.NextView('SafeguardFourRecordContent_FJ_Img_id','HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_FJ_Img');
					Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_Src').setSrc('data:image/jpeg;base64,' +filename);
					
					//拍照才能新建附件
					Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_QD').setHidden(false);
					//拍照才能填写附件名
					Ext.getCmp('MeasureItemAttachFileName').setReadOnly(false);
	            }
	        },//回调函数
	        source:'ALBUM',// 相机或相册，CAMEAR/ALBUM
	        direction:'FRONT',// 前镜头或后镜头，FRONT/BACK
	        width:640, //width
	        height:640 // height
        };
	    phone.takePhoto(parm);
	},
	
	//附件 list
	SafeguardFourRecordContent_ZYXM_id_FJ_list:function(obj,index,target,record,e,eOpts){
		this.NextView('SafeguardFourRecordContent_FJ_Img_id','HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_FJ_Img');
		var src=record.data.MeasureItemAttachFileBuffer2;
		if(src!=''){
			src='data:image/jpeg;base64,'+src;
		};
		Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_Src').setSrc(src);
		Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_Index').setValue(index);
		Ext.getCmp('MeasureItemAttachFileName').setValue(record.data.MeasureItemAttachFileName);
		
		//显示删除按钮
		Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_SC').setHidden(false);
		//获取图片的ID
		ImgID=record.data.Id;
		console.log('ImgID:'+ImgID);
	},
	
	//附件删除
	SafeguardFourRecordContent_FJ_Img_id_SC:function(){
		var obj=this;
		Ext.Msg.confirm("注意", "是否确认删除?", function(n) {
            if(n=='no')return;

            
            if(ImgID==undefined){
            	var index=Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_Index').getValue();
                var FJstore=obj.getStore('SynchronizationTable_FJ_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_FJ_Store');
                FJstore.removeAt(index);
            	obj.BackView();
            }else{
            	obj.SafeguardFourRecordContent_FJ_Img_id_SC_new(obj);
            }

       });
	},
	
	//删除原有的附件
	SafeguardFourRecordContent_FJ_Img_id_SC_new:function(obj){
		
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getHELMeasureItemAttachmentDelete';
		param.parameters=ImgID;
	
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			var Msg=result.Envelope.Body.HELMeasureItemAttachmentDelete_Output.ErrorMsg;
			if(Msg==''){
				var index=Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_Index').getValue();
	            var FJstore=obj.getStore('SynchronizationTable_FJ_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_FJ_Store');
	            FJstore.removeAt(index);
	            obj.BackView();
			}else{
				obj.getWXTS('删除附件失败');
			}
		};
		obj.getSafeguard(getResult,param);
		
	},
	
	
	//附件确定
	SafeguardFourRecordContent_FJ_Img_id_QD:function(){
		var name=Ext.getCmp('MeasureItemAttachFileName').getValue();
		if(name==''){
			this.getWXTS('请输入附件名称');
			return;
		};
		var filename=Ext.getCmp('SafeguardFourRecordContent_FJ_Img_id_Src').getSrc();
		console.log(filename);
		var MeasureItemAttachFileBuffer=filename.split(",");
		//console.log(MeasureItemAttachFileBuffer[0]);
		//console.log(MeasureItemAttachFileBuffer[1]);
		//return;
		//当前作业项目的ID
		var id=Ext.getCmp('SafeguardFourRecordContent_ZYXM_id_ID').getValue();
		//添加附件
		var FJstore=this.getStore('SynchronizationTable_FJ_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_FJ_Store');
		FJstore.addData({
			MeasureItemAttachFileName:name,
			MeasureItemAttachFileBuffer2:MeasureItemAttachFileBuffer[1],
			MeasureItemAttachFileBuffer3:filename,
			MeasureItemParId:Ext.getCmp('SafeguardFourRecordContent_ZYXM_id_ID').getValue(),
		});
		this.BackView();
	},
	
	/**
	 * 阶梯表
	 */
	
	//项目号
	JTB_MeasureItemNo:function(textfield){
		
	},
	
	//责任部门
	JTB_MeasureItemResponseDivision:function(textfield){
		var obj=this;
		//jsonStore查询和增加条件
		var query={tcode:'Safeguard',tid:'HEL_MEAITEM_REPDIV'};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getResponsibleDepartment_AND_RectificationDepartment(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//接口查询条件
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').TypeFive='HEL_MEAITEM_REPDIV';
		//返回值所在位置
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Name='JTB_MeasureItemResponseDivision';
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='A';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//判断
	JTB_MeasureItemPreWork2:function(textfield){
		var ID=Ext.getCmp('SafeguardFourRecordContent_ZYXM_MeasureProjectId').getValue();
		var TJ="[HEL Maintain Plan Select Project.Parent Content Id] = '"+ID+"'";
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getZyFront';
		param.parameters=TJ;
		ZuoYeID='JTB_MeasureItemPreWork2';
		this.getMeasureItem(this,param,'判断');
	},
	
	//整改部门
	JTB_MeasureItemZGDivision:function(textfield){
		var obj=this;
		//jsonStore查询和增加条件
		var query={tcode:'Safeguard',tid:'HEL_MEAITEM_ZGDIV'};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getResponsibleDepartment_AND_RectificationDepartment(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//接口查询条件
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').TypeFive='HEL_MEAITEM_ZGDIV';
		//返回值所在位置
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Name='JTB_MeasureItemZGDivision';
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='A';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//整改责任人
	JTB_MeasureItemResponsePersonLastName:function(textfield){
		this.NextView('Safeguard_GG_People_Select_id','HelcPDA.view.SynchronizationTable.Safeguard_GG_People_Select');
		Ext.getCmp('Safeguard_GG_People_Select_id_Toolbar').setTitle('整改责任人查询');
		Ext.getCmp('GG_People_Name').setValue('JTB_MeasureItemResponsePersonLastName');
		Ext.getCmp('GG_People_Name_ID').setValue('JTB_MeasureItemResponsePersonLastName_ID');
	},
	
	//复检人
	JTB_MeasureItemReCheckPersonLastName:function(textfield){
		this.NextView('Safeguard_GG_People_Select_id','HelcPDA.view.SynchronizationTable.Safeguard_GG_People_Select');
		Ext.getCmp('Safeguard_GG_People_Select_id_Toolbar').setTitle('复检人查询');
		Ext.getCmp('GG_People_Name').setValue('JTB_MeasureItemReCheckPersonLastName');
		Ext.getCmp('GG_People_Name_ID').setValue('JTB_MeasureItemReCheckPersonLastName_ID');
	},
	
	//项目号
	JTB_MeasureItemNo:function(textfield){
		this.NextView('Safeguard_GG_XMH_Select_id','HelcPDA.view.SynchronizationTable.Safeguard_GG_XMH_Select');
		Ext.getCmp('Safeguard_GG_XMH_Select_id_Name').setValue('JTB_MeasureItemNo');
	},
	
});