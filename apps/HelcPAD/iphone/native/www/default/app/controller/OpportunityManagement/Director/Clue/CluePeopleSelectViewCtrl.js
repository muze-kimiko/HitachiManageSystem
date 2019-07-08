
/* JavaScript content from app/controller/OpportunityManagement/Director/Clue/CluePeopleSelectViewCtrl.js in folder common */
/**
 * A页面进入当前页面
 * 1.新建 把选中的数据放入当前页面的this.ClueData这个公共变量中,A页面提交数据后要清空
 * 2.修改 A页面把已有的数据加进当前this.ClueData这个公共变量中,确认后把确认的数据覆盖this.ClueData这个公共变量,
 * 当前页面确定后,从A页面在次进入当前页面时,this.ClueData这个公共变量的数据是确认后的数据,原有的数据被覆盖了,只有在A不提交数据的清空下,
 * 重新进入A页面才被覆盖    
 * 3.当前页面确定时会清空数据仓                
 */
Ext.define('HelcPAD.controller.OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//查询
			"button#cluePeopleSelectView_CX":{
				tap:'cluePeopleSelectView_CX'
			},
			
			//返回  单纯的返回 什么都不做
			"button#cluePeopleSelectView_FH":{
				tap:'cluePeopleSelectView_FH'
			},
			
			//确认
			"button#cluePeopleSelectView_QR":{
				tap:'cluePeopleSelectView_QR'
			},
			
			//list
			"list#cluePeopleSelectViewList":{
				itemtap:'cluePeopleSelectViewList'
			},
		}
	},

	//list
	cluePeopleSelectViewList:function( list, index, target, record, e, eOpts ){
		var sele=document.getElementsByName('groupkung_cluePeopleSelectViewlist');
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
    	
    	if(checkbox.style.color='#e03a3e'){
			for(var i=0;i<sele.length;i++){
    			 if(i!=index){
    				 sele[i].style.color = '#ccc';
    			 }
    		}
		};
	},
	
	//确认
	cluePeopleSelectView_QR:function(obj){
		//存放线索人的控件ID
		this.CFID;
		//显示主要线索人的控件ID
		this.ZYID;
		cc.log(this.CFID+'  '+this.ZYID);
		//判断
		var selectConfirm = document.getElementsByName('groupkung_cluePeopleSelectViewlist');
		var store = this.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore');
		var checked = 'null';
		for(var i=0;i<selectConfirm.length;i++){
			if(selectConfirm[i].style.color=='rgb(224, 58, 62)'){
				checked = i;
			}
		}
		if(checked=='null'){
			Ext.Msg.alert('提示','请选择主要人员');
			return ;
		}
		
		store.getAt(checked).set('isPrimaryMVG','Y');
		var r = [];
		var total = 0;
		for(var i=0;i<store.getData().all.length;i++){
			r[total++] = store.getData().all[i].data; 
		}
		console.log(r);
		var saleRep = store.getAt(checked).data;
		
		//this.BackView();
		Ext.getCmp(this.CFID).setValue(JSON.stringify(r));
		Ext.getCmp(this.ZYID).setValue(saleRep.LastName+saleRep.FirstName);
		//主管操作
		Ext.getCmp('Clue_ApproveOperate').setValue('分派营业员');
		
		//公共方法
		obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').ZXDGGFF(obj);
		
	},
	
	//返回
	cluePeopleSelectView_FH:function(){
		this.BackView();
	},
	
	//查询
	cluePeopleSelectView_CX:function(){
		var obj = this;
		var lastName = Ext.getCmp('cluePeopleSelectView_lastName').getValue().trim();
		var firstName = Ext.getCmp('cluePeopleSelectView_firstName').getValue().trim();
		var loginName = Ext.getCmp('cluePeopleSelectView_salesRepLoginName').getValue().trim();
		var positionName = Ext.getCmp('cluePeopleSelectView_positionName').getValue().trim();
		var division = Ext.getCmp('cluePeopleSelectView_division').getValue().trim();
		var organization = Ext.getCmp('cluePeopleSelectView_salesRepOrganization').getValue().trim();
		var statement = "";
		var ViewMode = "Organization";
		//条件
		statement = this.statementConstructor('[Position.Active Last Name] like \'*?*\' ',lastName,statement);
		statement = this.statementConstructor('[Position.Active First Name] like \'*?*\' ',firstName,statement);
		statement = this.statementConstructor('[Position.Active Login Name] like \'*?*\' ',loginName,statement);
		statement = this.statementConstructor('[Position.Name] like\'*?*\' ',positionName,statement);
		statement = this.statementConstructor('[Position.Division] like\'*?*\' ',division,statement);
		statement = this.statementConstructor('[Position.Organization] like\'*?*\'',organization,statement);
		
		if(statement!=''){
			statement +=" AND ";
		};
			
		statement += " ([Position.Position Type] = '销售代表' AND ([Position.Org Name] = GetProfileAttr('Org.Name') OR ([Position.Org Name] = GetProfileAttr('Org.Parent Organization Name') AND [Position.Org Name]  &lt;> '营业工程总部')) OR [Position.Big Account Quote Position Flag] = 'Y')";
		console.log('线索人查询语句:'+statement);	
		
		var param = {
				SearchSpec:statement,
				ViewMode:ViewMode,
				userID:userID
		};
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'salesRepQuery',
				parameters: param
		};
		
		var getResult = function(result){
			if(!result.QuerySalesRep_Output){
				Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
				return ;
			};
			
			var data = result.QuerySalesRep_Output.ListOfPositionInterface.Position;
			
			//选择
			var storeXZ = Ext.data.StoreManager.get('ClueSelectStore');
			if(!storeXZ){
				storeXZ = Ext.create('HelcPAD.store.OpportunityManagement.Director.Clue.ClueSelectStore');
			};
			
			//结果
			var storeJG = Ext.data.StoreManager.get('ClueResultStore');
			if(!storeJG){
				storeJG = Ext.create('HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore');
			};
			if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示信息','无查询结果，请重新输入查询条件');
				return ;
			}else if(result.QuerySalesRep_Output.NumOutputObjects=='1')
				storeXZ.setData([data]);
			else{
				storeXZ.setData(data);
			};
			
			//长度
			var lengthXZ=storeXZ.getCount();
			var lengthJG=storeJG.getCount();
			//过滤
			if(lengthJG!=0){
				for(var i=0;i<lengthJG;i++){
					for(var j=0;j<lengthXZ;j++){
						var xzID=storeXZ.data.items[j].data.Id;
						var jgID=storeJG.data.items[i].data.Id;
						if(xzID==jgID){
							storeXZ.remove(storeXZ.getAt(j));
							break;
						};
					};
					lengthXZ=storeXZ.getCount();
				};
			};
			obj.NextView('clueItemView','HelcPAD.view.OpportunityManagement.Director.Clue.ClueItemView');
			
			//按钮
			obj.GZRSelectFF(obj);
		};
		
		obj.connectServer_queryOpportunity(getResult,params);
	},
	
	//按钮
	GZRSelectFF:function(obj){
		var MB=Ext.getCmp('clueItemView_toolbar');
		html='<div style="width=100%">'+
 			  '<div class="anTwoDiv">'+
 			  	'<div class="kOne ysZhOne anOne" id="clueItemView_SYY">'+SYB+'</div>'+
 			  	'<div class="kOne ysZhThree anOne" id="clueItemView_QD">确定</div>'+
 			  '</div>'+
 			  '</div>';
		cc.log(html);
		MB.setHtml(html);
		MB.setHeight(48);
		
		//上一步
		var SYY=document.getElementById('clueItemView_SYY');
		SYY.onclick = function (){
			obj.getApplication().getController('OpportunityManagement.Director.Clue.ClueItemViewCtrl').cluePeopleSelectView_FH();
		};
		
		//确定
		var QD=document.getElementById('clueItemView_QD');
		QD.onclick = function (){
			obj.getApplication().getController('OpportunityManagement.Director.Clue.ClueItemViewCtrl').clueItemView_QD();
		};
	},
	

	//构建语句
	statementConstructor:function(newContent,member,statement){
		if(member==''||member==null||member==undefined)
			return statement;
		newContent = newContent.replace('?',member);
		if(statement=='')
			statement = newContent;
		else if(statement!='')
			statement +=' AND '+newContent;
		return statement ;
	}
	
});