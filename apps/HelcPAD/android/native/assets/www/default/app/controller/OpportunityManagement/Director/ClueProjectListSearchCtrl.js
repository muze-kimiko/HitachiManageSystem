
/* JavaScript content from app/controller/OpportunityManagement/Director/ClueProjectListSearchCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Director.ClueProjectListSearchCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			/*"button#clueProjectListSearch_FH":{
				tap:'clueProjectListSearch_FH'
			},
			
			//查询
			"button#clueProjectListSearch_CX":{
				tap:'clueProjectListSearch_CX'
			},*/
			
		}
	},
	
	//查询
	clueProjectListSearch_CX:function(){
		var obj=this;
		var JL=Ext.getCmp('clueProjectListSearch_JLBXS').getValue();
		var GJZ=Ext.getCmp('clueProjectListSearch_GJZCX').getValue();
		var ggZH='';
		if(GJZ!=''){
			//项目名称
			ggZH+='[Opportunity.Name] like '+"'*"+GJZ+"*'"+' or ';
			//客户
			ggZH+='[Opportunity.Account] like '+"'*"+GJZ+"*'"+' or ';
			//使用单位
			ggZH+='[Opportunity.Oppty Final User] like '+"'*"+GJZ+"*'"+' and ';
		};
		//坐标
		var XX=obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').MapX;
		var YY=obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').MapY;
		
		var xx1=XX-(JL*0.00900901);
		ggZH+=' [Opportunity.X Height] &gt;='+"'"+xx1+"'"+'   and ';
		var xx2=XX+(JL*0.00900901);
		ggZH+=' [Opportunity.X Height] &lt;='+"'"+xx2+"'"+'  and ';
		var yy1=YY-(JL*0.00900901);
		ggZH+=' [Opportunity.Y Coordinate] &gt;= '+"'"+yy1+"'"+'  and ';
		var yy2=YY+(JL*0.00900901);
		ggZH+=' [Opportunity.Y Coordinate] &lt;= '+"'"+yy2+"'"+' and ';
		//固定
		ggZH+=' [Opportunity.Oppty Type] = '+"'"+'设备商机'+"'";
		getResult=function(obj,data){
			cc.log('data:'+data);
			if(data==undefined){
				Ext.Msg.alert("温馨提示",JL+'米内无关联商机');
				return;
			};
			var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
			if(!DataClue){
				DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
			};
			DataClue.setData(data);
			obj.BackView();
			/*var htmel=['<table border=0 width=100%>',
			            '    <tr><td width=60%>{Name}</td><td width=20%>{OpptyStatus}</td><td width=20%>{BuildingLayer}</td></tr>',
			            '    <tr><td width=60%>{Account}</td><td width=20%>{Created}</td><td width=20%>{EvaluateElevatorQuantity}</td></tr>',
			            '    <tr><td width=60%>{OpptyFinalUser}</td><td width=20%>{SalesRep}</td><td width=20%>{EvaluateEscalatorQuantity}</td></tr>',
			            '    <tr><td width=60%>{OpptyInstallSite}</td><td width=20%></td><td width=20%>{BigCustomer}</td></tr>',
			            '</table>'];*/
			var htmel=['<table border=0 width=100% style="color:#666" class="textf">'+
						'  <tr>'+
						'     <td width=10% rowspan="2">'+
						'        <div name="groupkung_clueProjectList" class="p_judge_box2" id="conkung_clueProjectList">3</div>'+
						'     </td>'+
						'     <td width=90%>{Name}</td>'+
						'  </tr>'+
						'</table>',];
			Ext.getCmp('clueProjectList_list').setItemTpl(htmel);
			//记录查询条件
			Ext.getCmp('clueProjectList_hidden_TJ').setValue(ggZH);
		};
		cc.log('ggZH:'+ggZH);
		var Trim={
				NewQuery:true,
				SearchSpec:ggZH,
				PageSize:'20',
				SortSpec:'Created(DESCENDING)',
				ViewMode:'Manager',
				StartRowNum:'0',
				userID:userID,
		};
		
		object.getApplication().getController('OpportunityManagement.Director.ClueHandleDirector_BCICtrl').BCI_GLSJ_GGFF(obj,Trim,getResult,3);
		
	},
	
	//返回
	clueProjectListSearch_FH:function(){
		this.BackView();
	},

});