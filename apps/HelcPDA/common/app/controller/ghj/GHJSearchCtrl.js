Ext.define('HelcPDA.controller.ghj.GHJSearchCtrl', {
	extend : 'HelcPDA.controller.ApplicationController',
	config : {
		control:{
			'button#GHJSearch_id_CX':{
				tap:'GHJSearch_id_CX'
			},
			
			//更换件查询  页面
			'button#GHJSearch_id_FH':{
				tap:'GHFH'
			},

			//更换件详细信息 页面
			'button#GHJInfo_id_FH':{
				tap:'GHFH'
			},
			
			//工号查询 页面
			'button#GHJAssetNumberSelect_id_FH':{
				tap:'GHFH'
			},
			
			//工号详细信息 页面
			'button#GHJAssetNumberSelectDetail_id_FH':{
				tap:'GHFH'
			},
			
			//服务请求 页面
			'button#GHJ_SR_Select_id_FH':{
				tap:'GHFH'
			},
			
			//服务请求详细信息 页面
			'button#GHJ_SR_SelectDetail_id_FH':{
				tap:'GHFH'
			},

		}
	},
	
	//返回
	GHFH:function(){
		this.BackView();
	},
	
	//查询
	GHJSearch_id_CX:function(){
		//工号
		var GHJSearch_AssetNumber=Ext.getCmp('GHJSearch_AssetNumber').getValue();
		//物料信息
		var GHJSearch_Component=Ext.getCmp('GHJSearch_Component').getValue();
		//出库开始日期
		var GHJSearch_OutBoundDate=Ext.getCmp('GHJSearch_OutBoundDate').getValue();
		//出库结束日期
		var GHJSearch_OutBoundDate2=Ext.getCmp('GHJSearch_OutBoundDate2').getValue();
		//状态
		var GHJSearch_Status=Ext.getCmp('GHJSearch_Status').getValue();

		//查询条件
		var Tj='';
		var siebelTj='';
		if(person_id!=null){//(当登陆人不是siebel用户时加入的条件)
			//var org='1-JEXBLF';//正式的
			//var org='1-CMK0VM';
			var org=station_id;
			siebelTj=" AND [HEL Replace.Primary Organization Id]='"+org+"'";
		}
		//new
		if(true){
			if(GHJSearch_AssetNumber==''&&GHJSearch_Component==''&&GHJSearch_OutBoundDate==''&&GHJSearch_OutBoundDate2==''&&GHJSearch_Status==''){
				cc.log('无条件查询');
				Tj+="([HEL Replace.Status] =  '提交待审批' or [HEL Replace.Status] = '已派工')"+siebelTj;
			}else{
				cc.log('有条件查询');
				if(GHJSearch_AssetNumber!=''){
					Tj+="[HEL Replace.Asset Number]  LIKE '*"+GHJSearch_AssetNumber+"*'";
				};
				GHJSearch_OutBoundDate=aa(GHJSearch_OutBoundDate);
				function aa(GHJSearch_OutBoundDate){
					if(GHJSearch_OutBoundDate!=''){
						//开始日期
						GHJSearch_OutBoundDate=new Date(GHJSearch_OutBoundDate);
						GHJSearch_OutBoundDate=Ext.Date.format(GHJSearch_OutBoundDate,'m/d/Y');
						cc.log('GHJSearch_OutBoundDate:'+GHJSearch_OutBoundDate);
					}
					return GHJSearch_OutBoundDate
				};
				
				GHJSearch_OutBoundDate2=bb(GHJSearch_OutBoundDate2);
				function bb(GHJSearch_OutBoundDate2){
					if(GHJSearch_OutBoundDate2!=''){
						//结束日期
						GHJSearch_OutBoundDate2=new Date(GHJSearch_OutBoundDate2);
						GHJSearch_OutBoundDate2=Ext.Date.format(GHJSearch_OutBoundDate2,'m/d/Y');
						cc.log('GHJSearch_OutBoundDate2:'+GHJSearch_OutBoundDate2);
					}
					return GHJSearch_OutBoundDate2
				};
				
				if(GHJSearch_OutBoundDate!=''&&GHJSearch_OutBoundDate2!=''){
					if(Tj!=''){
						Tj+=' and ';
					};
					//大于等于
					Tj+="[HEL Replace.Component Outbound Date] &gt;= '"+GHJSearch_OutBoundDate+"'";
					Tj+=' and ';
					//小于等于
					Tj+="[HEL Replace.Component Outbound Date] &lt;= '"+GHJSearch_OutBoundDate2+"'";
				}else if(GHJSearch_OutBoundDate!=''&&GHJSearch_OutBoundDate2==''){//开始日期有条件
					if(Tj!=''){
						Tj+=' and ';
					};
					Tj+="[HEL Replace.Component Outbound Date] &gt;= '"+GHJSearch_OutBoundDate+"'";
				}else if(GHJSearch_OutBoundDate==''&&GHJSearch_OutBoundDate2!=''){//结束日期有条件
					if(Tj!=''){
						Tj+=' and ';
					};
					Tj+="[HEL Replace.Component Outbound Date] = '"+GHJSearch_OutBoundDate2+"'";
				};
				
				if(GHJSearch_Component!=''){
					if(Tj!=''){
						Tj+=' and ';
					};
					//物料名称
					var SearchTj1="[HEL Replace.Component Name]  LIKE '*"+GHJSearch_Component+"*'";
					//名称
					var SearchTjc2="[HEL Replace.Component Alias Name]  LIKE '*"+GHJSearch_Component+"*'";
					//物料说明
					var SearchTj3="[HEL Replace.Component Comments]  LIKE '*"+GHJSearch_Component+"*'";
					
					var ComponentTJ='(';
					ComponentTJ+=SearchTj1;
					ComponentTJ+=' or ';
					ComponentTJ+=SearchTjc2;
					ComponentTJ+=' or ';
					ComponentTJ+=SearchTj3;
					ComponentTJ+=')';
					Tj+=ComponentTJ;
				};
				
				if(GHJSearch_Status!=''){
					if(Tj!=''){
						Tj+=' and ';
					};
					Tj+="[HEL Replace.Status] =  '"+GHJSearch_Status+"'";
				}else{
					if(Tj!=''){
						Tj+=' and ';
					};
					Tj+="( [HEL Replace.Status] =  '已派工'  or [HEL Replace.Status] =  '提交待审批' )";
				};
				
				Tj+=siebelTj;
			};
		}
		
		if(false){
			
		
		if(GHJSearch_AssetNumber==''&&GHJSearch_Component==''&&GHJSearch_OutBoundDate==''&&GHJSearch_OutBoundDate2==''&&GHJSearch_Status==''){
			cc.log('无条件查询');
			Tj+=" [HEL Replace.Status] =  '提交待审批' or [HEL Replace.Status] = '已派工'";
		}else{
			cc.log('有条件查询');
			if(GHJSearch_AssetNumber!=''){
				Tj+="[HEL Replace.Asset Number]  LIKE '*"+GHJSearch_AssetNumber+"*'";
			};
			
			GHJSearch_OutBoundDate=aa(GHJSearch_OutBoundDate);
			function aa(GHJSearch_OutBoundDate){
				if(GHJSearch_OutBoundDate!=''){
					//开始日期
					GHJSearch_OutBoundDate=new Date(GHJSearch_OutBoundDate);
					GHJSearch_OutBoundDate=Ext.Date.format(GHJSearch_OutBoundDate,'m/d/Y');
					cc.log('GHJSearch_OutBoundDate:'+GHJSearch_OutBoundDate);
				}
				return GHJSearch_OutBoundDate
			};
			
			GHJSearch_OutBoundDate2=bb(GHJSearch_OutBoundDate2);
			function bb(GHJSearch_OutBoundDate2){
				if(GHJSearch_OutBoundDate2!=''){
					//结束日期
					GHJSearch_OutBoundDate2=new Date(GHJSearch_OutBoundDate2);
					GHJSearch_OutBoundDate2=Ext.Date.format(GHJSearch_OutBoundDate2,'m/d/Y');
					cc.log('GHJSearch_OutBoundDate2:'+GHJSearch_OutBoundDate2);
				}
				return GHJSearch_OutBoundDate2
			};
			
			if(GHJSearch_OutBoundDate!=''&&GHJSearch_OutBoundDate2!=''){
				if(Tj!=''){
					Tj+=' and ';
				};
				//大于等于
				Tj+="[HEL Replace.Component Outbound Date] &gt;= '"+GHJSearch_OutBoundDate+"'";
				Tj+=' and ';
				//小于等于
				Tj+="[HEL Replace.Component Outbound Date] &lt;= '"+GHJSearch_OutBoundDate2+"'";
			}else if(GHJSearch_OutBoundDate!=''&&GHJSearch_OutBoundDate2==''){//开始日期有条件
				if(Tj!=''){
					Tj+=' and ';
				};
				Tj+="[HEL Replace.Component Outbound Date] &gt;= '"+GHJSearch_OutBoundDate+"'";
			}else if(GHJSearch_OutBoundDate==''&&GHJSearch_OutBoundDate2!=''){//结束日期有条件
				if(Tj!=''){
					Tj+=' and ';
				};
				Tj+="[HEL Replace.Component Outbound Date] = '"+GHJSearch_OutBoundDate2+"'";
			};

			var ffllgg=false;
			if(GHJSearch_Status!=''){
				if(Tj!=''){
					Tj+=' and ';
				};
				Tj+="[HEL Replace.Status] =  '"+GHJSearch_Status+"'"+tjcs;
			}else{
				ffllgg=true;
				//Tj+=" or [HEL Replace.Status] = '已派工'";
			};
			
			if(GHJSearch_Component!=''){
				
				//物料名称
				var SearchTj1="[HEL Replace.Component Name]  LIKE '*"+GHJSearch_Component+"*'";
				//名称
				var SearchTj2="[HEL Replace.Component Alias Name]  LIKE '*"+GHJSearch_Component+"*'";
				//物料说明
				var SearchTj3="[HEL Replace.Component Comments]  LIKE '*"+GHJSearch_Component+"*'";
				
				if(ffllgg){
					if(Tj!=''){
						var Tj1="("+Tj+" and "+SearchTj1+" and [HEL Replace.Status] =  '提交待审批' "+tjcs+")";
						var Tj2=' or ';
						var Tj3="("+Tj+" and "+SearchTj1+" and [HEL Replace.Status] =  '已派工'"+tjcs+")";
						var Tj4=' or '
						var Tj5="("+Tj+" and "+SearchTj2+" and [HEL Replace.Status] =  '提交待审批'"+tjcs+")";
						var Tj6=' or ';
						var Tj7="("+Tj+" and "+SearchTj2+" and [HEL Replace.Status] =  '已派工'"+tjcs+")";
						var Tj8=' or '
						var Tj9="("+Tj+" and "+SearchTj3+" and [HEL Replace.Status] =  '提交待审批'"+tjcs+")";
						var Tj10=' or ';
						var Tj11="("+Tj+" and "+SearchTj3+" and [HEL Replace.Status] =  '已派工'"+tjcs+")";
						Tj='';
						Tj=Tj1+Tj2+Tj3+Tj4+Tj5+Tj6+Tj7+Tj8+Tj9+Tj10+Tj11;
					}else{
						var Tj1="("+SearchTj1+" and [HEL Replace.Status] =  '提交待审批' "+tjcs+")";
						var Tj2=' or ';
						var Tj3="("+SearchTj1+" and [HEL Replace.Status] =  '已派工'"+tjcs+")";
						var Tj4=' or '
						var Tj5="("+SearchTj2+" and [HEL Replace.Status] =  '提交待审批'"+tjcs+")";
						var Tj6=' or ';
						var Tj7="("+SearchTj2+" and [HEL Replace.Status] =  '已派工'"+tjcs+")";
						var Tj8=' or '
						var Tj9="("+SearchTj3+" and [HEL Replace.Status] =  '提交待审批'"+tjcs+")";
						var Tj10=' or ';
						var Tj11="("+SearchTj3+" and [HEL Replace.Status] =  '已派工'"+tjcs+")";
						Tj='';
						Tj=Tj1+Tj2+Tj3+Tj4+Tj5+Tj6+Tj7+Tj8+Tj9+Tj10+Tj11;
					}
				}else{
					if(Tj!=''){
						var Tj1="("+Tj+" and "+SearchTj1+tjcs+")";
						var Tj2=' or ';
						var Tj3="("+Tj+" and "+SearchTj2+tjcs+")";
						var Tj4=' or ';
						var Tj5="("+Tj+" and "+SearchTj3+tjcs+")";
						Tj='';
						Tj=Tj1+Tj2+Tj3+Tj4+Tj5;
						
					}else{
						var Tj1="("+SearchTj1+tjcs+")";
						var Tj2=' or ';
						var Tj3="("+SearchTj2+tjcs+")";
						var Tj4=' or ';
						var Tj5="("+SearchTj3+tjcs+")";
						Tj='';
						Tj=Tj1+Tj2+Tj3+Tj4+Tj5;
					};
				};
			}else{
				if(ffllgg){
					if(Tj!=''){
						var Tj2="("+Tj+" and [HEL Replace.Status] =  '提交待审批'"+tjcs+")";
						var Tj3=' or ';
						var Tj4="("+Tj+" and [HEL Replace.Status] =  '已派工'"+tjcs+")";
						Tj='';
						Tj=Tj2+Tj3+Tj4;
						
					}else{
						var Tj2="( [HEL Replace.Status] =  '提交待审批'"+tjcs+")";
						var Tj3=' or ';
						var Tj4="( [HEL Replace.Status] =  '已派工'"+tjcs+")";
						Tj='';
						Tj=Tj2+Tj3+Tj4;

					};
				};
			};
			
		};
		
		}
		cc.log('条件语句：'+Tj);
		//保存查询条件
		this.Tj=Tj;
		//控制在当前页面查询后，是跳到下一个还是回到上一页
		this.GHJSearch_id_CX_GC('向前');
	},
	
	//查询过程，拆分出来,为了公用
	GHJSearch_id_CX_GC:function(TZFX){
		cc.log('单独查询方法中的条件:'+this.Tj);
		var param={
				Flag:true,
				SearchSpec:this.Tj,
				ViewMode:'Sub-Organization',
				ViewMode:'All',
				userID:ghjuserID
		};
		var params = {
				adpName:'HttpAdapter_PDA_GHJ',
				prodName:'getReplaceListQuery',
				parameters: param
		};
		var getResult = function(result){
			cc.log(result);
			var data=result.ReplaceListQuery_Output.ListOfHelReplace.ListOfHelReplace2.HelReplace;
			//cc.log(data);
			if(data==undefined){
				Ext.Msg.alert('提示','查无数据');
				return;
			};

			var Date=Ext.data.StoreManager.get('GHJListStore');
			if(!Date){
				Date=Ext.create('HelcPDA.store.ghj.GHJListStore');
			};
			Date.setData(data);
			
			if(TZFX=='向前'){
				result.obj.NextView('GHJList_id','HelcPDA.view.ghj.GHJList');
			}else if(TZFX=='回退'){
				result.obj.BackView();
			};
		};
		
		this.getGHJ(this,getResult,params);
	},
	
	
/*	//获取数据展开一级列表
	FirstGradeList:function(){
	
	//提前data共有的部分
			var DataOne=[];
			for(var i=0;i<data.length;i++){
				DataOne[i]=data[i].ComponentId;
			};
			//cc.log('DataOne------------');
			//cc.log(DataOne);
			
			//去重复的ComponentId
			var DataOneCF=DataOne.unique3();
			//cc.log('DataOneCF');
			//cc.log(DataOneCF);
			
			//获得显示列表的值
			var listData=[];
			for(var j=0;j<DataOneCF.length;j++){
				var num=0;
				//cc.log('数据-----');
				for(var k=0;k<data.length;k++){
					//cc.log(DataOneCF[j]+'   '+data[k].ComponentId);
					if(DataOneCF[j]==data[k].ComponentId){
						num=parseInt(num)+parseInt(data[k].CompQuantity);
					};
				};
				var kh={
					AssetNumber:Ext.getCmp('GHJSearch_AssetNumber').getValue(),
					Znumber:num,
					ComponentId:DataOneCF[j],
				};
				listData[j]=kh;
			};
			//cc.log('listData一级页面显示的值');
			//cc.log(listData);
			//一级页面的值
			result.obj.listData=listData;
			//查询到的所有结果
			result.obj.ZData=data;
			//进入list页面
			result.obj.NextView('GHJList_id','HelcPDA.view.ghj.GHJList');
			//一级页面
			result.obj.FirstGradeList();
	
		var list=objectXcx.getController('HelcPDA.controller.ghj.GHJSearchCtrl').listData;
		var Date=Ext.data.StoreManager.get('GHJListStore');
		if(!Date){
			Date=Ext.create('HelcPDA.store.ghj.GHJListStore');
		};
		Date.setData(list);
		
		
		
		var html='<table border=0 width=100%>'+
        '    <tr>'+
        '		<td width=50%>{AssetNumber}</td>'+
        '		<td width=50%>{Znumber}</td>'+
        '	</tr>'+
        '</table>';
		
		Ext.getCmp('GHJList_list_id').setItemTpl(html);
	},
	
	//获取二级列表
	SecondLevelList:function(ComponentId){
		var list=objectXcx.getController('HelcPDA.controller.ghj.GHJSearchCtrl').ZData;
		//cc.log('二级列表');
		//cc.log(list);
		var listTwo=[];
		var num=0;
		for(var i=0;i<list.length;i++){
			cc.log(ComponentId+'   '+list[i].ComponentId);
			if(ComponentId==list[i].ComponentId){
				listTwo[num]=list[i];
				num++;
			};
		};
		//cc.log('二级页面数据');
		//cc.log(listTwo);
		
		var Date=Ext.data.StoreManager.get('GHJListStore');
		if(!Date){
			Date=Ext.create('HelcPDA.store.ghj.GHJListStore');
		};
		Date.setData(listTwo);
		
		var html='<table border=0 width=100%>'+
        '    <tr>'+
        '		<td width=50%>{Status}</td>'+
        '		<td width=50%>{CompQuantity}</td>'+
        '	</tr>'+
        '</table>';
		
		Ext.getCmp('GHJList_list_id').setItemTpl(html);
	},*/
	
	
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