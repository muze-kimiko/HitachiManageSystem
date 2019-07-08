/**
 *  保养抽查 监视器  xcx  2014-11-11
 */
var IDandNAME;
Ext.define('HelcPDA.controller.selective_examination.CC_SelectCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			
			/**
			 * *****************************抽查 选择表
			 */
			
			//保存
			"button#CC_Select_id_BC":{
				tap:'CC_Select_id_BC'
			},
			
			//提交
			"button#CC_Select_id_TJ":{
				tap:'CC_Select_id_TJ'
			},
			
			//查询
			"button#CC_Select_id_CX":{
				tap:'CC_Select_id_CX'
			},
			
			//获取查找到的工号结果
			"#CC_Select_GH":{
				itemtap:'CC_Select_GH'
			},
			
			//当工号改变时的事件
			'textfield#BYGH_ID':{
				//改变时发生的事件
				change:'BYGH_ID_XG'
			},
			
			//新增抽查不良内容
			"button#CC_Select_id_ZJ":{
				tap:'CC_Select_id_ZJ'
			},
			
			//整改内容
			"button#CC_Select_id_AddZGNR":{
				tap:'CC_Select_id_AddZGNR'
			},
			
			//单击list的删除
			"list#CC_Select_List_CCXX":{
				itemtap:'CC_Select_List_CCXX'
			},
			
			//单击整改内容的list
			"list#CC_Select_List_ZGCDNR":{
				itemtap:'CC_Select_List_ZGCDNR'
			},
			
			//整改内容弹出框  确认按钮
			"button#CC_ZGRN_QD":{
				tap:'CC_ZGRN_QD'
			},
			
			//整改内容弹出框  关闭按钮
			"button#CC_Main_PLAN_ZGNR":{
				tap:'CC_Main_PLAN_ZGNR'
			},
			
			//整改内容 提交
			"button#CC_Select_id_TJZGNR":{
				tap:'CC_Select_id_TJZGNR'
			},
			
			//保养人员ID  查询
			"button#CC_SEL_MAINTAIN_PERSON_ID_CX":{
				tap:'CC_SEL_MAINTAIN_PERSON_ID_CX'
			},
			
			//保养确认人     查询
			"button#CC_SEL_AFFIRM_PERSON_CX":{
				tap:'CC_SEL_AFFIRM_PERSON_CX'
			},
			
			//抽查人ID  查询
			"button#CC_SEL_RUMMAGER_ID_CX":{
				tap:'CC_SEL_RUMMAGER_ID_CX'
			},
			
			//分公司整改人ID  查询
			"button#CC_SEL_BRANCH_MAINTAINER_ID_CX":{
				tap:'CC_SEL_BRANCH_MAINTAINER_ID_CX'
			},
			
			//整改确认人  查询
			"button#CC_SEL_CONFIRM_PERSON_ID":{
				tap:'CC_SEL_CONFIRM_PERSON_ID'
			},
			
			//list
			"list#CC_Select_GH2":{
				itemtap:'CC_Select_GH2'
			},
			/**
			 **************************************** 抽查 基础数据
			 */
			
			//返回
			"button#CC_List_id_FH":{
				tap:'CC_List_id_FH'
			},
			
			//确定
			"button#CC_List_id_QD":{
				tap:'CC_List_id_QD'
			},
			
			//单击list产生的事件      判断是否选中
			"list#CC_Select_List":{
				itemtap:'CC_Select_List'
			},
			
			
			/**
			 **************************************** 抽查 单头数据
			 */
			
			//选择list
			"list#CC_Query_List":{
				itemtap:'CC_Query_List'
			},
		},
	},
	
	/*****************************************************************************
	 * 抽查 选择表
	 */
	CC_Select_GH2:function(dataview, index, target, record, e, eOpts){
		var datads=Ext.data.StoreManager.get('CC_LIST_Store');
		if(!datads){
			datads=Ext.create('HelcPDA.store.selective_examination.CC_LIST_Store');
		};
		if(IDandNAME=='CC_SEL_MAINTAIN_PERSON_ID'){//保养人员ID
			Ext.getCmp('CC_SEL_MAINTAIN_PERSON_ID').setValue(datads.getAt(index).get('ID'));
		};
		if(IDandNAME=='CC_SEL_AFFIRM_PERSON'){//保养确认人 
			Ext.getCmp('CC_SEL_AFFIRM_PERSON').setValue(datads.getAt(index).get('NAME'));
		};
		if(IDandNAME=='CC_SEL_RUMMAGER_ID'){//抽查人ID
			Ext.getCmp('CC_SEL_RUMMAGER_ID').setValue(datads.getAt(index).get('ID'));
		};
		if(IDandNAME=='CC_SEL_BRANCH_MAINTAINER_ID'){//分公司整改人ID
			Ext.getCmp('CC_SEL_BRANCH_MAINTAINER_ID').setValue(datads.getAt(index).get('ID'));
		};
		if(IDandNAME=='CC_SEL_CONFIRM_PERSON'){//分公司整改人ID
			Ext.getCmp('CC_SEL_CONFIRM_PERSON').setValue(datads.getAt(index).get('NAME'));
		};
		
		var listPanel=Ext.getCmp('CC_Select_MB2');
		listPanel.hide();
	},
	
	CC_SEL_CONFIRM_PERSON_ID:function(){
		var name=Ext.getCmp('CC_SEL_CONFIRM_PERSON').getValue();
		this.CC_YanZhen('',name);
		IDandNAME='CC_SEL_CONFIRM_PERSON';
	},
	
	CC_SEL_BRANCH_MAINTAINER_ID_CX:function(){
		var id=Ext.getCmp('CC_SEL_BRANCH_MAINTAINER_ID').getValue();
		this.CC_YanZhen(id,'');
		IDandNAME='CC_SEL_BRANCH_MAINTAINER_ID';
	},
	
	CC_SEL_RUMMAGER_ID_CX:function(){
		var id=Ext.getCmp('CC_SEL_RUMMAGER_ID').getValue();
		this.CC_YanZhen(id,'');
		IDandNAME='CC_SEL_RUMMAGER_ID';
	},
	
	CC_SEL_AFFIRM_PERSON_CX:function(){
		var name=Ext.getCmp('CC_SEL_AFFIRM_PERSON').getValue();
		this.CC_YanZhen('',name);
		IDandNAME='CC_SEL_AFFIRM_PERSON';
	},
	
	CC_SEL_MAINTAIN_PERSON_ID_CX:function(){
		var id=Ext.getCmp('CC_SEL_MAINTAIN_PERSON_ID').getValue();
		this.CC_YanZhen(id,'');
		IDandNAME='CC_SEL_MAINTAIN_PERSON_ID';
	},
	
	//公共的ID和Name验证方法
	CC_YanZhen:function(id,name){
		//查询结果
		function station_CC(json){
			cc.log('看看:'+JSON.stringify(json));
			var msg=json.msginfo;
			if(msg=='查询失败'){
				Ext.Msg.alert('查询失败');
				return;
			};
			if(msg=='查询成功'){
				var num_cc=json.items.length;
				if(num_cc==0){
					Ext.Msg.alert('查无数据');
					return;
				};
			};
			if(!ovlay_MainTain2){
				ovlay_MainTain2=Ext.Viewport.add({
					xtype:'panel',
					id:'CC_Select_MB2',
       		     	hideOnMaskTap: true,
       		     	style:'height:80%;width:90%;',
	     	        centered: true,
       		     	modal: true,
       		     	items:[{
       		     		xtype:'fieldset',
    		            style:'height:100%;width:100%;',
    		            items:[{
    		               xtype:'list',     		
 		        		   id:'CC_Select_GH2',
 		        		   store:'CC_LIST_Store',
 		        		   style:'height:100%;width:100%;',
 		        		   itemTpl:
 		        			   [
 		        		          '<div>{ID}   {NAME}<div>',
 		        		       ]
    		            }] 	
    		         }]
				});
				//
			}else{
				ovlay_MainTain2.show();
			};
			
			/*alert(num);
			var sj=Ext.getCmp('CC_Select_GH');
			sj.setData(json.person);*/
			var datads=Ext.data.StoreManager.get('CC_LIST_Store');
			if(!datads){
				datads=Ext.create('HelcPDA.store.selective_examination.CC_LIST_Store');
			};
			//先清空
			datads.setData([]);
			//在添加新的数据
			datads.setData(json.items);
		};
		//查询条件
		var tiaojian="{'ID':'"+id+"','NAME':'"+name+"'}";
		//查询方法
		this_obj=this;
		this_obj.connectServer(station_CC,"baoYangChouChaAction.do?method=toSearchIdAndName",tiaojian);
	},
	
	
	//保存
	CC_Select_id_BC:function(){
		this_obj=this;
		this_obj.AddandInsert(1,'保存数据?',this_obj);
	},
	
	//提交
	CC_Select_id_TJ:function(){
		this_obj=this;
		var flag=this_obj.CC_Select_id_TJ_YZ();
		//提交判断
		if(flag){
			return;
		};
		this_obj.AddandInsert(2,'提交数据?',this_obj);
	},
	
	//提交的验证方法
	CC_Select_id_TJ_YZ:function(){
		//保养工号
		var bygh=Ext.getCmp('BYGH_ID').getValue();
		if(bygh==''){
			Ext.Msg.alert('请输入电梯工号');
			/*WL.Toast.show('请输入保养工号');*/
			return true;
		};
		//抽查单编号
		var ccdbh=Ext.getCmp('CC_SEL_RUMMAG_CODE').getValue();
		if(ccdbh==''){
			Ext.Msg.alert('请输入抽查单编号');
			/*WL.Toast.show('请输入抽查单编号');*/
			return true;
		};
		//保养人员ID
		var byryid=Ext.getCmp('CC_SEL_MAINTAIN_PERSON_ID').getValue();
		if(byryid==''){
			Ext.Msg.alert('请输入保养人员ID');
			/*WL.Toast.show('请输入保养人员ID');*/
			return true;
		};
		//整改状态
		var zgzt=Ext.getCmp('CC_SEL_MENU_STATUE').getValue();
		if(zgzt==''){
			Ext.Msg.alert('请输入整改状态');
			/*WL.Toast.show('请输入整改状态');*/
			return true;
		};
		
		//验证输入的值必须是正整型
		var reg=/^\+?[1-9][0-9]*$/;
		//保养评定分数
		var bypdfs=Ext.getCmp('CC_SEL_MP_POINTS').getValue();
		if(bypdfs!=''){
			if(!reg.test(bypdfs)){
				Ext.Msg.alert('请输入整数');
				//WL.Toast.show('请输入整改状态');
				return true;
			}
		};
		
		return false;
	},
	
	//保存与提交
	AddandInsert:function(index,ifTS,this_obj){
		//获取“整改单头”数据
		var ZGDT={};
		/**必填this_obj
		 */
		//保养工号
		ZGDT.ASSET_NUM=Ext.getCmp('BYGH_ID').getValue();
		//合同号
		ZGDT.AGREE_NUM=Ext.getCmp('CC_HTH').getValue();
		//所属司
		ZGDT.BRANCH_NAME=Ext.getCmp('CC_SSS').getValue();
		//抽查单编号
		ZGDT.RUMMAG_CODE=Ext.getCmp('CC_SEL_RUMMAG_CODE').getValue();
		//抽查单状态
		ZGDT.STATUS='已提交';
		//保养人员ID
		ZGDT.MAINTAIN_PERSON_ID=Ext.getCmp('CC_SEL_MAINTAIN_PERSON_ID').getValue();
		//数据来源
		ZGDT.DATA_SOURCE='PDA';
		//导入状态
		ZGDT.IMPORT_STATUS='N';
		//整改状态
		ZGDT.MENU_STATUE=Ext.getCmp('CC_SEL_MENU_STATUE').getValue();
		//发起部门
		ZGDT.SECTION_SOURCE=Ext.getCmp('CC_SEL_SECTION_SOURCE').getValue();
		
		
		/**非必填
		 */
		//所属站
		ZGDT.STATION_NAME=Ext.getCmp('CC_SSZ').getValue();
		//抽查人ID
		ZGDT.RUMMAGER_ID=Ext.getCmp('CC_SEL_RUMMAGER_ID').getValue();
		//抽查日期(是可选还是当天)
		//ZGDT.RUMMAGER_DATE=Ext.getCmp('CC_SEL_RUMMAGER_DATE').getValue();
		//预计完成日期
		ZGDT.PREDICT_COMPLETE_DATE=Ext.getCmp('CC_SEL_PREDICT_COMPLETE_DATE').getValue();
		//alert(ZGDT.PREDICT_COMPLETE_DATE);
		//保养人员等级
		ZGDT.MAINTAIN_PESRON_LEVEL=Ext.getCmp('CC_SEL_MAINTAIN_PESRON_LEVEL').getValue();
		//保养确认人
		ZGDT.AFFIRM_PERSON=Ext.getCmp('CC_SEL_AFFIRM_PERSON').getValue();
		//保养确认时间
		ZGDT.AFFIRM_DATE=Ext.getCmp('CC_SEL_AFFIRM_DATE').getValue();
		//分公司整改人ID
		ZGDT.BRANCH_MAINTAINER_ID=Ext.getCmp('CC_SEL_BRANCH_MAINTAINER_ID').getValue();
		//分公司整改完成日期
		ZGDT.BRANCH_COMPLETE_DATE=Ext.getCmp('CC_SEL_BRANCH_COMPLETE_DATE').getValue();
		//整改确认人
		ZGDT.CONFIRM_PERSON=Ext.getCmp('CC_SEL_CONFIRM_PERSON').getValue();
		//整改确认时间
		ZGDT.CONFIRM_DATE=Ext.getCmp('CC_SEL_CONFIRM_DATE').getValue();
		//审核人
		ZGDT.APPROVE_PERSON=Ext.getCmp('CC_SEL_APPROVE_PERSON').getValue();
		//审核时间
		ZGDT.APPROVE_DATE=Ext.getCmp('CC_SEL_APPROVE_DATE').getValue();
		//审核意见
		ZGDT.APPROVE_ADVISE=Ext.getCmp('CC_SEL_APPROVE_ADVISE').getValue();
		//保养评定分数
		ZGDT.MP_POINTS=Ext.getCmp('CC_SEL_MP_POINTS').getValue();
		//安装不良数量
		ZGDT.SETUP_QUESTION_QTY=Ext.getCmp('CC_SEL_SETUP_QUESTION_QTY').getValue();
		//保养不良数量
		ZGDT.MP_QUESTION_QTP=Ext.getCmp('CC_SEL_MP_QUESTION_QTP').getValue();
		//客户不良数量
		ZGDT.CUST_QUESTION_QTY=Ext.getCmp('CC_SEL_CUST_QUESTION_QTY').getValue();
		//其它不良数量
		ZGDT.OTHERS_QUESTION_QTY=Ext.getCmp('CC_SEL_OTHERS_QUESTION_QTY').getValue();
		//总部确认
		ZGDT.HQ_CONFIRM_FLG=Ext.getCmp('CC_SEL_HQ_CONFIRM_FLG').getValue();
		//总部确认人
		ZGDT.HQ_CONFIRM_PERSON=Ext.getCmp('CC_SEL_HQ_CONFIRM_PERSON').getValue();
		//总部确认时间
		ZGDT.HQ_CONFIRM_DATE=Ext.getCmp('CC_SEL_HQ_CONFIRM_DATE').getValue();
		//创建人
		ZGDT.CREATED_BY=Ext.getCmp('CC_SEL_CREATED_BY').getValue();
		//创建人所在组织
		ZGDT.CREATED_BY_ORG=Ext.getCmp('CC_SEL_CREATED_BY_ORG').getValue();
		
		//获取“整改单行”数据
		var ZGDH=[];
		var datads=Ext.data.StoreManager.get('HEL_RUMMAG_LINES_Store');
		if(!datads){
			datads=Ext.create('HelcPDA.store.selective_examination.HEL_RUMMAG_LINES_Store');
		};
		//获取store长度
		var data=datads.getData();
		var num=data.length;
		console.log('整改单行的长度: '+num);
		//获取结果
		for(var i=0;i<num;i++){
			var trim={};
			trim.SEQUENCE=datads.getAt(i).get('SEQUENCE');
			trim.DEDUCTIONS=datads.getAt(i).get('DEDUCTIONS');
			trim.QUESTION_TYPE=datads.getAt(i).get('QUESTION_TYPE');
			if(datads.getAt(i).get('COMMNETS')==undefined||datads.getAt(i).get('COMMNETS')==null||datads.getAt(i).get('COMMNETS')==''){
				//alert('i='+i+'  -'+datads.getAt(i).get('COMMENTS'));
				trim.COMMNETS='';
			}else{
				trim.COMMNETS=datads.getAt(i).get('COMMNETS');
			};
			
			
			ZGDH[i]=trim;
		};
		
		//插入的数据
		var cr={};
		cr.dt=ZGDT;
		cr.dh=ZGDH;
		
		console.log('保养抽查数据:'+JSON.stringify(cr));
		
		//手机上用
		/*navigator.notification.confirm(ifTS,function(btn){
 			if(btn ==2){
				//方向
				if(index==1){	//保存
					this_obj.CC_BaoChun(cr,this_obj);
				}else if(index==2){	//提交
					this_obj.CC_TiJiao(cr,this_obj);
				};
			}else{
 				return;
 			}
 		},"提示","取消,确定");*/
		
		Ext.Msg.confirm('消息',ifTS,function(btn){
			if (btn == 'yes'){
				//方向
				if(index==1){	//保存
					this_obj.CC_BaoChun(cr,this_obj);
				}else if(index==2){	//提交
					this_obj.CC_TiJiao(cr,this_obj);
				};
			}else{
				return;
			};
    	});
		
	},
	
	//保存
	CC_BaoChun:function(cr,this_obj){
		alert('保存成功');
	},
	
	//提交
	CC_TiJiao:function(cr,this_obj){
		//提交结果
		function station_CC_TiJiao(json){
			if(json.msginfo=='提交成功'){
				//alert(json.msginfo);
				WL.Toast.show(json.msginfo);
				this_obj.BackView();
			}else{
				//alert('提交失败');
				WL.Toast.show(json.msginfo);
				return;
			};
		};
		this_obj.connectServer(station_CC_TiJiao,"baoYangChouChaAction.do?method=toAdd",JSON.stringify(cr));
	},
	
	//查询
	CC_Select_id_CX:function(){
		var id=Ext.getCmp('BYGH_ID').getValue();
		//查询结果
		function station_CC(json){
			var msg=json.msginfo;
			var num_cc=json.num;
			var qjqcx=json.person;
			if(msg=='查询失败'){
				alert('查询失败');
				return;
			};
			if(msg=='查询成功'){
				if(num_cc==0){
					alert(qjqcx);
					return;
				};
			};
			if(!ovlay_MainTain2){
				ovlay_MainTain2=Ext.Viewport.add({
					xtype:'panel',
					id:'CC_Select_MB',
       		     	hideOnMaskTap: true,
       		     	style:'height:80%;width:90%;',
	     	        centered: true,
       		     	modal: true,
       		     	items:[{
       		     		xtype:'fieldset',
    		            style:'height:100%;width:100%;',
    		            items:[{
    		               xtype:'list',     		
 		        		   id:'CC_Select_GH',
 		        		   store:'CC_LIST_Store',
 		        		   style:'height:100%;width:100%;',
 		        		   itemTpl:
 		        			   [
 		        		          '<div>{ASSET_ID}<div>',
 		        		       ]
    		            }] 	
    		         }]
				});
				//
			}else{
				ovlay_MainTain2.show();
			};
			
			/*alert(num);
			var sj=Ext.getCmp('CC_Select_GH');
			sj.setData(json.person);*/
			var datads=Ext.data.StoreManager.get('CC_LIST_Store');
			if(!datads){
				datads=Ext.create('HelcPDA.store.selective_examination.CC_LIST_Store');
			}
			datads.setData(json.person);
		};
		//查询条件
		var tiaojian="{'ASSET_ID':'"+id+"'}";
		//查询方法
		this_obj=this;
		this_obj.connectServer(station_CC,"maintainancePlanItemListAction.do?method=toSearchFour",tiaojian);
	},
	
	//选中查询结果
	CC_Select_GH:function(dataview, index, target, record, e, eOpts){
		var datads=Ext.data.StoreManager.get('CC_LIST_Store');
		if(!datads){
			datads=Ext.create('HelcPDA.store.selective_examination.CC_LIST_Store');
		};
		//获取结果
		var ASSET_ID=datads.getAt(index).get('ASSET_ID');
		var AGREEMENT_ID=datads.getAt(index).get('AGREEMENT_ID');
		var COMPANY_NAME=datads.getAt(index).get('COMPANY_NAME');
		var STATION_NAME=datads.getAt(index).get('STATION_NAME');
		Ext.getCmp('BYGH_ID').setValue(ASSET_ID);
		Ext.getCmp('CC_HTH').setValue(AGREEMENT_ID);
		Ext.getCmp('CC_SSS').setValue(COMPANY_NAME);
		Ext.getCmp('CC_SSZ').setValue(STATION_NAME);

		var listPanel=Ext.getCmp('CC_Select_MB');
		listPanel.hide();
	},
	
	//当工号改变时的事件
	BYGH_ID_XG:function(obj, newValue, oldValue, eOpts ){
		if(newValue==''){
			Ext.getCmp('CC_HTH').setValue();
			Ext.getCmp('CC_SSS').setValue();
			Ext.getCmp('CC_SSZ').setValue();
		};
	},
	
	//新增抽查不良内容
	CC_Select_id_ZJ:function(){
		this_obj=this;
		this_obj.NextView('CC_List_id','HelcPDA.view.selective_examination.CC_List');
		Ext.getCmp('CC_List_id_IF').setValue('ZGDH');
		this_obj.CC_Select_id_GGFF(this_obj);
	},
	
	//整改内容
	CC_Select_id_AddZGNR:function(){
		this_obj=this;
		this_obj.NextView('CC_List_id','HelcPDA.view.selective_examination.CC_List');
		Ext.getCmp('CC_List_id_IF').setValue('ZGCDNR');
		this_obj.CC_Select_id_GGFF(this_obj);
	},
	
	//进入基础数据页面的公共方法
	CC_Select_id_GGFF:function(this_obj){
		function station(json){
			var RLDate = Ext.data.StoreManager.get("MV_CX_MAIN_RAN_INS_Store"); 
			if (!RLDate) { 
				RLDate = Ext.create("HelcPDA.store.selective_examination.MV_CX_MAIN_RAN_INS_Store"); 
			};
			RLDate.setData(json.items);
			
			var num=json.items.length;
			for(var i=0;i<num;i++){
				var data=json.items[i].ROW_ID;
				var aa=document.getElementById(data);
				//拆分
				var szs=new Array();
				szs=json.items[i].STANDARD_DEDUCTION.split(";");
				
				aa.options.length=0;
				for(var j=0;j<szs.length;j++){
					aa.options[j]=new Option(szs[j],szs[j]);
				};
			
			};
		};
		this_obj.connectServer(station,"baoYangChouChaAction.do?method=toSearch");
	},
	
	//单击list的删除
	CC_Select_List_CCXX:function(obj, index, target, record, e, eOpts ){
		this_obj=this;
		if(event.target.id=='dzx'){
			/*navigator.notification.confirm('删除人员？',function(btn){
	 			if(btn ==2){
	 				this_obj.list_delete(index);
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");*/
			
			Ext.Msg.confirm('消息','删除抽查选项？',function(btn){
				if (btn == 'yes'){
					this_obj.list_delete(index);
				}else{
						return;
				};
    		});
		};
	},
	
	//单击整改内容的list
	CC_Select_List_ZGCDNR:function(obj, index, target, record, e, eOpts ){
		this_obj=this;
		//取得下标
		var Lines = Ext.data.StoreManager.get("HEL_CHANGE_MENU_Store"); 
		if (!Lines) { 
			Lines = Ext.create("HelcPDA.store.selective_examination.HEL_CHANGE_MENU_Store"); 
		};
		var SEQUENCE=Lines.getAt(index).get('SEQUENCE');
		if(event.target.id=='dzxnr'){
			Ext.Msg.confirm('消息','删除整改内容？',function(btn){
				if (btn == 'yes'){
					this_obj.list_delete_ZGNR(index);
				}else{
					return;
				};
    		});
		}else if(event.target.id==SEQUENCE){
			this_obj.CC_ZGNR_SRK(index);
		};
	},
	
	//整改内容输入框
	CC_ZGNR_SRK:function(index){
		ovlay_MainTain3=Ext.Viewport.add({
			xtype:'panel',
			id:'statPanel_ZGCC',
			height:'56%',
	     	width: '90%',
			hideOnMaskTap: false,
 	            centered: true,
		     	modal: true,
		     	style: 'background:#ccc',
		        items: [{
		                xtype: 'container',
		                height: '100%',
		                margin: '100 auto 0 auto',
		                padding: '',
		                style: 'background:#fff',
		                width: '100%',
		                layout: 'vbox',
		                items: [
		                    {
		                        xtype: 'toolbar',
		                        docked: 'top',
		                        title: '整改内容',
		                        items: [
		                            {
		                                xtype: 'spacer'
		                            },
		                            {
		                                xtype: 'button',
		                                iconCls: 'delete',
		                                text: '',
		                                id:'CC_Main_PLAN_ZGNR',
		                            }
		                        ]
		                    },
		                    {
		                        xtype: 'formpanel',
		                        padding: 10,
		                        height: '85%',
		                        items: [
		                            {
		                                xtype: 'textareafield',
		                                id:'CC_DZGNR_XR',
		                                height:'100%',
		                                maxRows:8,
		                                margin: '0 0 10 0'
		                            },{
		                            	//用于存放list下标
		                				xtype:'hiddenfield',
		                				id:'hidden_CC_index',
		                				value:''
		                			},
		                        ]
		                    },
		                    {
		                    	xtype: 'button',
	                            id:'CC_ZGRN_QD',
	                            margin: '2% 5% 2% 5%',
	                            width: '90%',
	                            height:'11%',
	                            text: '确定'
                            },
		                ]
		            }]
		});
		//添加下标
		Ext.getCmp('hidden_CC_index').setValue(index);
	},
	
	//整改内容弹出框  确认按钮
	CC_ZGRN_QD:function(){
		//获得整改内容的值
		var zz=Ext.getCmp('CC_DZGNR_XR').getValue();
		//获取下标
		var index=Ext.getCmp('hidden_CC_index').getValue();
		//条件
		var Lines = Ext.data.StoreManager.get("HEL_CHANGE_MENU_Store"); 
		if (!Lines) { 
			Lines = Ext.create("HelcPDA.store.selective_examination.HEL_CHANGE_MENU_Store"); 
		};
		
		//修改
		var ss=Lines.getAt(index);
		if(zz!=''){
			ss.set('MENU_CONTENT',zz);
		}else if(zz==''){
			ss.set('MENU_CONTENT','双击输入整改内容!');
		};
		//可有可无
		ss.commit();
		
		
		//判断
		/*
		//修改数据
		var OldDATA=Lines.getData();
		var OldDATANum=OldDATA.length;
		var NewDATA=[];
		if(zz!=''){
			for(var i=0;i<OldDATANum;i++){
				var trim={};
				trim.SEQUENCE=OldDATA.items[i].data.SEQUENCE;
				trim.TASK_NAME=OldDATA.items[i].data.TASK_NAME;
				trim.HEADER_ID=OldDATA.items[i].data.HEADER_ID;
				if(i==index){
					trim.MENU_CONTENT=zz;
				}else{
					trim.MENU_CONTENT=OldDATA.items[i].data.MENU_CONTENT;
				};
				NewDATA[i]=trim;
			};
		}else if(zz==''){
			for(var i=0;i<OldDATANum;i++){
				var trim={};
				trim.SEQUENCE=OldDATA.items[i].data.SEQUENCE;
				trim.TASK_NAME=OldDATA.items[i].data.TASK_NAME;
				trim.HEADER_ID=OldDATA.items[i].data.HEADER_ID;
				if(i==index){
					trim.MENU_CONTENT='双击输入整改内容!';
				}else{
					trim.MENU_CONTENT=OldDATA.items[i].data.MENU_CONTENT;
				};
				NewDATA[i]=trim;
			};
		};
		Lines.setData(NewDATA);*/
		//关闭
		var statPanel_ZGCC=Ext.getCmp('statPanel_ZGCC');
		if(statPanel_ZGCC){
			statPanel_ZGCC.destroy();
		};
	},
	
	//整改内容弹出框  关闭按钮
	CC_Main_PLAN_ZGNR:function(){
		//清空
		Ext.getCmp('CC_DZGNR_XR').setValue();
		//关闭
		var statPanel_ZGCC=Ext.getCmp('statPanel_ZGCC');
		if(statPanel_ZGCC){
			statPanel_ZGCC.destroy();
		};
	},
	
	//删除方法
	list_delete:function(index){
		//alert('进来了'+index);
		var Lines = Ext.data.StoreManager.get("HEL_RUMMAG_LINES_Store"); 
		if (!Lines) { 
			Lines = Ext.create("HelcPDA.store.selective_examination.HEL_RUMMAG_LINES_Store"); 
		};
		//获得删除条件
		var SEQUENCE=Lines.getAt(index).get('SEQUENCE');
		//删除数据
		var OldDATA=Lines.getData();
		var OldDATANum=OldDATA.length;
		var NewDATA=[];
		for(var i=0;i<OldDATANum;i++){
			if(OldDATA.items[i].data.SEQUENCE!=SEQUENCE){
				var trim={};
				trim.SEQUENCE=OldDATA.items[i].data.SEQUENCE;
				trim.DEDUCTIONS=OldDATA.items[i].data.DEDUCTIONS;
				trim.QUESTION_TYPE=OldDATA.items[i].data.QUESTION_TYPE;
				trim.COMMNETS=OldDATA.items[i].data.COMMNETS;
				NewDATA[i]=trim;
			};
		};
		Lines.setData(NewDATA);
	},
	
	//删除整改内容list
	list_delete_ZGNR:function(index){
		var Lines = Ext.data.StoreManager.get("HEL_CHANGE_MENU_Store"); 
		if (!Lines) { 
			Lines = Ext.create("HelcPDA.store.selective_examination.HEL_CHANGE_MENU_Store"); 
		};
		//获得删除条件
		var SEQUENCE=Lines.getAt(index).get('SEQUENCE');
		//删除数据
		var OldDATA=Lines.getData();
		var OldDATANum=OldDATA.length;
		var NewDATA=[];
		for(var i=0;i<OldDATANum;i++){
			if(OldDATA.items[i].data.SEQUENCE!=SEQUENCE){
				var trim={};
				trim.SEQUENCE=OldDATA.items[i].data.SEQUENCE;
				trim.TASK_NAME=OldDATA.items[i].data.TASK_NAME;
				trim.HEADER_ID=OldDATA.items[i].data.HEADER_ID;
				trim.MENU_CONTENT=OldDATA.items[i].data.MENU_CONTENT;
				trim.RUMMAG_CODE=OldDATA.items[i].data.RUMMAG_CODE;
				NewDATA[i]=trim;
			};
		};
		Lines.setData(NewDATA);
	},
	
	//整改内容 提交 
	CC_Select_id_TJZGNR:function(){
		alert('整改内容提交');
		var Lines = Ext.data.StoreManager.get("HEL_CHANGE_MENU_Store"); 
		if (!Lines) { 
			Lines = Ext.create("HelcPDA.store.selective_examination.HEL_CHANGE_MENU_Store"); 
		};

		var OldDATA=Lines.getData();
		var OldDATANum=OldDATA.length;
		var NewDATA=[];
		for(var i=0;i<OldDATANum;i++){
			var trim={};
			trim.SEQUENCE=OldDATA.items[i].data.SEQUENCE;
			trim.TASK_NAME=OldDATA.items[i].data.TASK_NAME;
			trim.HEADER_ID=OldDATA.items[i].data.HEADER_ID;
			if(OldDATA.items[i].data.MENU_CONTENT=='双击输入整改内容!'){
				trim.MENU_CONTENT='';
			}else{
				trim.MENU_CONTENT=OldDATA.items[i].data.MENU_CONTENT;
			};
			trim.RUMMAG_CODE=OldDATA.items[i].data.RUMMAG_CODE;
			NewDATA[i]=trim;
		};
		
		function station_CC_ZGNR_TiJiao(json){
			console.log(JSON.stringify(json));
			if(json.msginfo=='提交成功'){
				//alert(json.msginfo);
				WL.Toast.show(json.msginfo);
			}else{
				//alert('提交失败');
				WL.Toast.show(json.msginfo);
				return;
			};
		};
		this_obj=this;
		this_obj.connectServer(station_CC_ZGNR_TiJiao,"baoYangChouChaAction.do?method=toAddZGNR",JSON.stringify(NewDATA));
	},
	
	/*****************************************************************************
	 * 抽查 基础数据
	 */
	
	//返回
	CC_List_id_FH:function(){
		this.showBackView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
	},
	
	//确定
	CC_List_id_QD:function(){
		/**
		 ************************************* 公共的
		 */
		//基础数据
		var RLDate = Ext.data.StoreManager.get("MV_CX_MAIN_RAN_INS_Store"); 
		if (!RLDate) { 
			RLDate = Ext.create("HelcPDA.store.selective_examination.MV_CX_MAIN_RAN_INS_Store"); 
		};
		//获取长度
		var DATATwo=RLDate.getData();
		var num=DATATwo.length;
		//获取选中的下标
		var numCC=[];
		var sele=document.getElementsByName('groupCheckboxinstall');
		var shu=0;
		for(var i=0;i<num;i++){
			var checkbox = sele[i];
			 if(checkbox.style.color=='rgb(224, 58, 62)'){
				 numCC[shu]=i;
				 shu++;
			 };
		};
		/**
		 ****************************************/
		
		//判断移到哪个数据仓
		var flag_IF=Ext.getCmp('CC_List_id_IF').getValue();
		if(flag_IF=='ZGDH'){//新增抽查不良内容
			//被选择的数据
			//SEQUENCE 序号
			//QUESTION_TYPE 责任分类
			//DEDUCTIONS 扣分
			//COMMENTS 备注
			var dataSJ=[];
			for(var k=0;k<numCC.length;k++){
				var id=numCC[k];
				
				var trim={};
				trim.SEQUENCE=DATATwo.items[id].data.SUCCESSION;
				/**获取扣分的值
				 */
				var ROW_ID=DATATwo.items[id].data.ROW_ID;
				var row=document.getElementById(ROW_ID);
				var index=row.selectedIndex;
				var kf=row.options[index].value;
				//console.log('kf  '+kf);
				trim.DEDUCTIONS=kf;
				/**************
				 */
				trim.QUESTION_TYPE=DATATwo.items[id].data.QUESTION_TYPE;
				trim.COMMENTS=DATATwo.items[id].data.COMMENTS;
				dataSJ[k]=trim;
			};
			
			//为插入数据
			var RLDate_HRL = Ext.data.StoreManager.get("HEL_RUMMAG_LINES_Store"); 
			if (!RLDate_HRL) { 
				RLDate_HRL = Ext.create("HelcPDA.store.selective_examination.HEL_RUMMAG_LINES_Store"); 
			};
			//判断是否第一次
			var HRL=RLDate_HRL.getData();
			var num_HRL=HRL.length;
			//alert(num_HRL);
			if(num_HRL==0){
				this.showBackView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
				RLDate_HRL.setData(dataSJ);
			}else if(num_HRL>0){
				this.showBackView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
				//把数据仓中的数据放入数组
				var DataStore=[];
				for(var s=0;s<num_HRL;s++){
					var trim={};
					trim.SEQUENCE=RLDate_HRL.getAt(s).get('SEQUENCE');
					trim.DEDUCTIONS=RLDate_HRL.getAt(s).get('DEDUCTIONS');
					trim.QUESTION_TYPE=RLDate_HRL.getAt(s).get('QUESTION_TYPE');
					if(RLDate_HRL.getAt(s).get('COMMNETS')==undefined||RLDate_HRL.getAt(s).get('COMMNETS')==null||RLDate_HRL.getAt(s).get('COMMNETS')==''){
						trim.COMMNETS='';
					}else{
						trim.COMMNETS=RLDate_HRL.getAt(s).get('COMMNETS');
					};
					DataStore[s]=trim;
				};
				RLDate_HRL.setData([]);
				var flag=false;
				//要添加进来的数据
				for(var y=0;y<dataSJ.length;y++){
					var js=0;
					//获取已有的数据
					for(var g=0;g<num_HRL;g++){
						//要添加的
						var ROW_ID=dataSJ[y].SEQUENCE;
						//原有的
						var ROW_ID2=DataStore[g].SEQUENCE;
						//console.log('ROW_ID '+ROW_ID);
						//console.log('ROW_ID2  '+ROW_ID2);
						if(ROW_ID==ROW_ID2){//有
							DataStore[g].DEDUCTIONS=dataSJ[y].DEDUCTIONS;
							//HRL.items[g].data.DEDUCTIONS=dataSJ[y].DEDUCTIONS;
							//RLDate_HRL.getAt(g).data.DEDUCTIONS=dataSJ[y].DEDUCTIONS;
							//console.log('DD  '+HRL.items[g].data.DEDUCTIONS);
						}else{//无
							js++;
							//alert('进来');
							if(js==num_HRL){
								//alert('新增');
								flag=true;
							};
						};
					};
					if(flag){
						//alert('新增了');
						DataStore[num_HRL]=dataSJ[y];
						num_HRL++;
						js=0;
						flag=false;
					};
				};
				//this.showBackView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
				//Ext.getCmp('CC_Select_List').setData(DataStore);
				RLDate_HRL.setData([]);
				RLDate_HRL.setData(DataStore);
				Ext.getCmp('CC_Select_List_CCXX').refresh();
			};
		}else if(flag_IF=='ZGCDNR'){//整改内容
			/**
			 * 获取数据
			 */
			this.showBackView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
			//获得抽查单编号
			var ccdbh=Ext.getCmp('CC_SEL_RUMMAG_CODE').getValue();
			//抽查单头
			var HEADER_ID=Ext.getCmp('CC_SEL_HEADER_ID').getValue();
			var dataZG=[];
			for(var k=0;k<numCC.length;k++){
				var id=numCC[k];
				var trim={};
				trim.HEADER_ID=HEADER_ID;
				trim.SEQUENCE=DATATwo.items[id].data.SUCCESSION;
				trim.TASK_NAME=DATATwo.items[id].data.TASK_NAME;
				trim.RUMMAG_CODE=ccdbh;
				//整改菜单内容
				trim.MENU_CONTENT='双击输入整改内容!';
				dataZG[k]=trim;
			};
			/**
			 * 插入数据
			 */
			//为插入数据
			var RLDate_HRL = Ext.data.StoreManager.get("HEL_CHANGE_MENU_Store"); 
			if (!RLDate_HRL) { 
				RLDate_HRL = Ext.create("HelcPDA.store.selective_examination.HEL_CHANGE_MENU_Store"); 
			};
			//判断是否第一次
			var HRL=RLDate_HRL.getData();
			var num_HRL=HRL.length;
			//alert(num_HRL);
			if(num_HRL==0){
				//this.showBackView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
				RLDate_HRL.setData(dataZG);
			}else if(num_HRL>0){
				//this.showBackView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
				//把数据仓中的数据放入数组
				var DataStore2=[];
				for(var s=0;s<num_HRL;s++){
					var trim={};
					trim.HEADER_ID=RLDate_HRL.getAt(s).get('HEADER_ID');
					trim.SEQUENCE=RLDate_HRL.getAt(s).get('SEQUENCE');
					trim.TASK_NAME=RLDate_HRL.getAt(s).get('TASK_NAME');
					trim.RUMMAG_CODE=ccdbh;
					//整改菜单内容
					if(RLDate_HRL.getAt(s).get('MENU_CONTENT')==undefined||RLDate_HRL.getAt(s).get('MENU_CONTENT')==null||RLDate_HRL.getAt(s).get('MENU_CONTENT')==''){
						trim.MENU_CONTENT='';
					}else{
						trim.MENU_CONTENT=RLDate_HRL.getAt(s).get('MENU_CONTENT');
					};
					DataStore2[s]=trim;
				};
				RLDate_HRL.setData([]);
				var flag=false;
				//要添加进来的数据
				for(var y=0;y<dataZG.length;y++){
					var js=0;
					//获取已有的数据
					for(var g=0;g<num_HRL;g++){
						//要添加的
						var ROW_ID=dataZG[y].SEQUENCE;
						//原有的
						var ROW_ID2=DataStore2[g].SEQUENCE;
						if(ROW_ID==ROW_ID2){//有
							DataStore2[g].MENU_CONTENT=dataZG[y].MENU_CONTENT;
						}else{//无
							js++;
							if(js==num_HRL){
								flag=true;
							};
						};
					};
					if(flag){
						DataStore2[num_HRL]=dataZG[y];
						num_HRL++;
						js=0;
						flag=false;
					};
				};
				RLDate_HRL.setData([]);
				RLDate_HRL.setData(DataStore2);
				Ext.getCmp('CC_Select_List_ZGCDNR').refresh();
			};
		};
	},
	
	//单击list产生的事件
	CC_Select_List:function(obj, index, target, record, e, eOpts ){
		if(event.target.id=='pid_CC'){
			var sele=document.getElementsByName('groupCheckboxinstall');
			console.log(sele.length);
			 var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  };
		};
	},
	
	
	/****************************************************************
	 *** 抽查 单头数据
	 */
	
	//选中list数据显示信息
	CC_Query_List:function(dataview, index, target, record, e, eOpts){
		this_obj=this;
		var RLDate = Ext.data.StoreManager.get("HEL_RUMMAG_HEADER_Store"); 
		if (!RLDate) { 
			RLDate = Ext.create("HelcPDA.store.selective_examination.HEL_RUMMAG_HEADER_Store"); 
		};
		var HEADER_ID=RLDate.getAt(index).get('HEADER_ID');
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var Maintxml={tcode:'DTDH'};
		var options={
				exacte:false,//默认
				};
		MaintainList.find(Maintxml,options).then(function(arrayResults){
			console.log('数据查询成功');
			var dataDT=[];
			dataDT=arrayResults[0].json.stext.DT;
			var dataDH=[];
			dataDH=arrayResults[0].json.stext.DH;
			//console.log('rr  =='+JSON.stringify(dataDH));
			var dtNum=dataDT.length;
			var dhNum=dataDH.length;
			//alert(dhNum);
			//获得满足需求的数据
			var newDT=[];
			var newDH=[];
			for(var i=0;i<dtNum;i++){
				var HEADER_ID_dt=dataDT[i].HEADER_ID;
				if(HEADER_ID==HEADER_ID_dt){
					newDT[0]=dataDT[i];
				};
			};
			
			var dhi=0;
			for(var j=0;j<dhNum;j++){
				var HEADER_ID_dt=dataDH[j].HEADER_ID;
				if(HEADER_ID==HEADER_ID_dt){
					//alert(HEADER_ID_dt+'  '+HEADER_ID);
					newDH[dhi]=dataDH[j];
					dhi++;
				};
			};
			
			//console.log('newDH  '+JSON.stringify(newDH));
			console.log('newDT  '+JSON.stringify(newDT[0]));
			//进入公共方法
			this_obj.CC_Query_XianShiSJ(this_obj,newDT[0],newDH);
			
		}).fail(function(errorObject){
			WL.Toast.show('获取数据失败');
		});
	},
	
	//显示获取的数据  一个公共方法
	CC_Query_XianShiSJ:function(obj,DT,DH){
		//跳转
		obj.NextView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
		
		/*****单头
		 */
		//抽查单头ID
		Ext.getCmp('CC_SEL_HEADER_ID').setValue(DT.HEADER_ID);
		//抽查单编号
		Ext.getCmp('CC_SEL_RUMMAG_CODE').setValue(DT.RUMMAG_CODE);
		//抽查单状态
		Ext.getCmp('CC_SEL_STATUS').setValue(DT.STATUS);
		//整改状态
		Ext.getCmp('CC_SEL_MENU_STATUE').setValue(DT.MENU_STATUE);
		//发起部门
		Ext.getCmp('CC_SEL_SECTION_SOURCE').setValue(DT.SECTION_SOURCE);
		//合同号
		Ext.getCmp('CC_HTH').setValue(DT.AGREE_NUM);
		//保养工号
		Ext.getCmp('BYGH_ID').setValue(DT.ASSET_NUM);
		//所属司
		Ext.getCmp('CC_SSS').setValue(DT.BRANCH_NAME);
		//所属站
		Ext.getCmp('CC_SSZ').setValue(DT.STATION_NAME);
		//抽查人ID
		Ext.getCmp('CC_SEL_RUMMAGER_ID').setValue(DT.RUMMAGER_ID);
		//抽查日期
		Ext.getCmp('CC_SEL_RUMMAGER_DATE').setValue(DT.RUMMAGER_DATE);
		//预计完成日期
		Ext.getCmp('CC_SEL_PREDICT_COMPLETE_DATE').setValue(DT.PREDICT_COMPLETE_DATE);
		//保养人员ID
		Ext.getCmp('CC_SEL_MAINTAIN_PERSON_ID').setValue(DT.MAINTAIN_PERSON_ID);
		//保养人员等级
		Ext.getCmp('CC_SEL_MAINTAIN_PESRON_LEVEL').setValue(DT.MAINTAIN_PESRON_LEVEL);
		//保养确认人
		Ext.getCmp('CC_SEL_AFFIRM_PERSON').setValue(DT.AFFIRM_PERSON);
		//保养确认时间
		Ext.getCmp('CC_SEL_AFFIRM_DATE').setValue(DT.AFFIRM_DATE);
		//分公司整改人ID
		Ext.getCmp('CC_SEL_BRANCH_MAINTAINER_ID').setValue(DT.BRANCH_MAINTAINER_ID);
		//分公司整改完成日期
		Ext.getCmp('CC_SEL_BRANCH_COMPLETE_DATE').setValue(DT.BRANCH_COMPLETE_DATE);
		//整改确认人
		Ext.getCmp('CC_SEL_CONFIRM_PERSON').setValue(DT.CONFIRM_PERSON);
		//整改确认时间
		Ext.getCmp('CC_SEL_CONFIRM_DATE').setValue(DT.CONFIRM_DATE);
		//提交时间
		Ext.getCmp('CC_SEL_SUBMIT_DATE').setValue(DT.SUBMIT_DATE);
		//审核人
		Ext.getCmp('CC_SEL_APPROVE_PERSON').setValue(DT.APPROVE_PERSON);
		//审核时间
		Ext.getCmp('CC_SEL_APPROVE_DATE').setValue(DT.APPROVE_DATE);
		//审核意见
		Ext.getCmp('CC_SEL_APPROVE_ADVISE').setValue(DT.APPROVE_ADVISE);
		//保养评定分数
		Ext.getCmp('CC_SEL_MP_POINTS').setValue(DT.MP_POINTS);
		//安装不良数量
		Ext.getCmp('CC_SEL_SETUP_QUESTION_QTY').setValue(DT.SETUP_QUESTION_QTY);
		//保养不良数量
		Ext.getCmp('CC_SEL_MP_QUESTION_QTP').setValue(DT.MP_QUESTION_QTP);
		//客户不良数量
		Ext.getCmp('CC_SEL_CUST_QUESTION_QTY').setValue(DT.CUST_QUESTION_QTY);
		//其它不良数量
		Ext.getCmp('CC_SEL_OTHERS_QUESTION_QTY').setValue(DT.OTHERS_QUESTION_QTY);
		//总部确认
		Ext.getCmp('CC_SEL_HQ_CONFIRM_FLG').setValue(DT.HQ_CONFIRM_FLG);
		//总部确认人
		Ext.getCmp('CC_SEL_HQ_CONFIRM_PERSON').setValue(DT.HQ_CONFIRM_PERSON);
		//总部确认时间
		Ext.getCmp('CC_SEL_HQ_CONFIRM_DATE').setValue(DT.HQ_CONFIRM_DATE);
		//创建人
		Ext.getCmp('CC_SEL_CREATED_BY').setValue(DT.CREATED_BY);
		//创建人所在组织
		Ext.getCmp('CC_SEL_CREATED_BY_ORG').setValue(DT.CREATED_BY_ORG);
		//数据来源
		Ext.getCmp('CC_SEL_DATA_SOURCE').setValue(DT.DATA_SOURCE);
		//导入状态
		Ext.getCmp('CC_SEL_IMPORT_STATUS').setValue(DT.IMPORT_STATUS);
		//记录创建时间
		Ext.getCmp('CC_SEL_CREATION_DATE').setValue(DT.CREATION_DATE);
		//隐藏最后更新时间
		Ext.getCmp('CC_SEL_LAST_UPDATE_DATE').setValue(DT.LAST_UPDATE_DATE);
		
		//console.log('==='+JSON.stringify(DH));
		//单行
		var RLDate_HRL = Ext.data.StoreManager.get("HEL_RUMMAG_LINES_Store"); 
		if (!RLDate_HRL) { 
			RLDate_HRL = Ext.create("HelcPDA.store.selective_examination.HEL_RUMMAG_LINES_Store"); 
		};
		RLDate_HRL.setData(DH);
	},
	
});