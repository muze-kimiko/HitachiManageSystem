var list_map=[];
Ext.define('HelcPDA.controller.map.MapCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'mapCtrl',
	config:{
		refs:{
			//进入当前页面
//			to_map:'button[id=location_info]',
			//点击周围的人
			to_around:'button[id=around_people]',
		    //点击下属
			to_belowEmployee:'button[id=low_Employee]',
			//选择下属
			to_choiceBelowEm:'list[id=choice_BelowEmployee]',
			//点击选择时间
			to_timesearch:'button[id=time_search]',
			//选择一个周围的人查看坐标信息
            to_choiceAroundList:'list[id=choice_AroundList]',
            //选择周围人的全部触发的事件
            to_choiceAroundAll:'button[id=choice_ArroudAll]',
            //查找全部下属坐标
            to_choiceAllBelowEm:'button[id=choice_AllBelowEmployee]',
            //点击list的一个数据
            to_choiceOneItem:'dataview[id=map_listV]',
            //点击我的位置
            to_myLocation:'button[id=My_location]',
            mapBack:'button[id=mapBack]',
		},
		control:{
			to_map:{
				tap:'to_map'
			},
			to_around:{
				tap:'to_around'
			},
			to_belowEmployee:{
				tap:'to_belowEmployee'
			},
			to_timesearch:{
				tap:'to_timesearch'
			},
			to_choiceAroundList:{
				itemtap:'to_choiceAroundList'
			},
			to_choiceAroundAll:{
				tap:'to_choiceAroundAll'
			},
			to_choiceBelowEm:{
				itemtap:'to_choiceBelowEm'
			},
			to_choiceAllBelowEm:{
				tap:'to_choiceAllBelowEm'
			},
			to_choiceOneItem:{
				itemtap:'to_choiceOneItem'
			},
			to_myLocation:{
				tap:'to_myLocation'
			},
			mapBack:{
				tap:'mapBack'
			}
		}
	},
	mapBack:function(){
		this.BackView();
	},
  //进入map页面
//	to_map:function(){
//		this.NextView('mapMainView','HelcPDA.view.map.MapMainView');
//		Ext.getCmp('map_listV').setHidden(true);
//		function getResult(res){
//		
//			maplet = new BMap.Map("baimap");
//	    	
//	    	/**/
//	    	maplet.enableScrollWheelZoom();
//	    	
//	    	//添加默认缩放平移控件
//	    	maplet.addControl(new BMap.NavigationControl());  
//	    	
//	    	// 尺寸显示
//	    	maplet.addControl(new BMap.ScaleControl()); 
//	    	
//	    	//添加默认缩略地图控件
//	    	maplet.addControl(new BMap.OverviewMapControl());              
//	    	maplet.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
//			
//			if(typeof(res.item[0].MLON)=='undefined'){
//				maplet.centerAndZoom(new BMap.Point(116.404269,39.916042),14);
//				var pt = new BMap.Point(116.404269,39.916042);
//			}else{
//				maplet.centerAndZoom(new BMap.Point(res.item[0].MLON,res.item[0].MLAT),14);
//				var pt = new BMap.Point(res.item[0].MLON,res.item[0].MLAT);
//			}
//		
//	    	var myIcon = new BMap.Icon("images/pin_green.png", new BMap.Size(33,33));
//	    	var marker1 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
//	    	maplet.addOverlay(marker1);
//			var infoWindow1 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+res.item[0].TITLE+"</p><p style='font-size:8px;'>手机："+res.item[0].PHONENO+"</><p style='font-size:8px;'>地址:"+res.item[0].CONTENT+"</p>");
//			marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
//
//			//maplet.setCenter(res.item[0].MLON,res.item[0].MLAT);   //设置地图中心点。center除了可以为坐标点以外，还支持城市名
//		    //map.setZoom(10);  //将视图切换到指定的缩放等级，中心点坐标不变  
//	    	
////			
////			var  mapStyle ={ 
////			        features: ["road", "building","water","land"],//隐藏地图上的poi
////			        style : "dark"  //设置地图风格为高端黑
////			    }
////			maplet.setMapStyle(mapStyle);
//	    	console.log(JSON.stringify(res));
//		}
//		var content={USERID:userid,UUID:'95E5FD9190833EEC'};
//	  	this.connectServer(getResult, 'empLocationAction.do?method=toSearchMyLocation',JSON.stringify(content));
//	},
	//周围的人
	to_around:function(){
		var obj=this;
		this.NextView('mapAroundPeopleView','HelcPDA.view.map.MapAroundPeopleView');
		Ext.getCmp('tap_500').addListener('tap',function(){
			obj.search_NearEmp(500);
		});
		Ext.getCmp('tap_1000').addListener('tap',function(){
			obj.search_NearEmp(1000);
		});
		Ext.getCmp('tap_2000').addListener('tap',function(){
			obj.search_NearEmp(2000);
		});
		this.search_NearEmp(500);
	},
	search_NearEmp:function(METER){
		var METER=500;  //设置的模拟500米
		Ext.getCmp('METER').setValue(METER);
		var store=this.getStore('MapAroundPeopleStore','HelcPDA.store.map.MapAroundPeopleStore');
		function getResult(res){
			if(res.msginfo=='获取失败'){
				WL.Toast.show('请先确认地图已加载');
				return;
			}else{
				var length=res.item.length;
				if(length==0){
					WL.Toast.show('暂无周围的人的信息');
					return;
				}
			}
			//当选择500米时开始模拟数据。
//			var item=[];
//			for(var i=0;i<10;i++){
//				var address={
//						MLON:'117.064305',MLAT:'34.514206',USERID:'sssd',USERNAME:'王晓东'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',TIME:'2013-05-28',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;
//			}
//			for(var i=10;i<18;i++){
//				var address={
//						MLON:'117.164305',MLAT:'34.414206',USERID:'sssd',USERNAME:'王晓龙+'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',TIME:'2013-05-28',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;	
//				
//			}
//			res.item=item;
			
			//
			var list=[];
			var j=0;
			list_map=res.item;
			
			var length=res.item.length;
			for(var i=1;i<length;i++){
				list[j]=res.item[i];
				j++;
			}
			store.setData(list);
		}
		//var res={};
		//getResult(res);
		var uuid='95E5FD9190833EEC';
		var content="{'USERID':'"+copy_userid+"','UUID':'"+WL.Device.getID()+"','meter':"+METER+"}";
	  	
		this.connectServer(getResult, 'empLocationAction.do?method=toSearchNearEmp',content);	
	},
	//查找周围的人的地图详细信息
	to_choiceAroundList:function(obk, index, target, record, e, eOpts){
		Ext.Viewport.setActiveItem(Ext.getCmp('mapMainView'));
		Ext.getCmp('map_listV').setHidden(true);
		var store=this.getStore('MapAroundPeopleStore','HelcPDA.store.map.MapAroundPeopleStore');
		var MLON=store.getAt(index).get('MLON');
		var MLAT=store.getAt(index).get('MLAT');
		var USERNAME=store.getAt(index).get('USERNAME');
		var PHONENO=store.getAt(index).get('PHONENO');
		var CONTENT=store.getAt(index).get('CONTENT');
		var METER=Ext.getCmp('METER').getValue();
		maplet.clearOverlays();
		var point=new BMap.Point(MLON,MLAT);
		var marker1 = new BMap.Marker(point);
		maplet.addOverlay(marker1);
		maplet.centerAndZoom(point,14);
		//设置圆
		this.to_addCircle(MLON,MLAT,METER);
		var infoWindow1 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+USERNAME+"</p><p style='font-size:8px;'>手机："+PHONENO+"</><p style='font-size:8px;'>地址："+CONTENT+" 附近</p>");
		marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
		
		
	},
	//查找全部周边的人
	to_choiceAroundAll:function(){
		Ext.Viewport.setActiveItem(Ext.getCmp('mapMainView'));
		Ext.getCmp('map_listV').setHidden(false);
		Ext.getCmp('PERSON_ID').setValue();
		maplet.clearOverlays();
		var MLON=list_map[0].MLON;
		var MLAT=list_map[0].MLAT;
		var METER=Ext.getCmp('METER').getValue();
		
		//设置圆
		this.to_addCircle(MLON,MLAT,METER);
		
		//设置自己位置
		var pt = new BMap.Point(MLON,MLAT); 
		var myIcon = new BMap.Icon("images/pin_green.png", new BMap.Size(33,33));
    	var marker1 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	
		var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+list_map[0].TITLE+"</p><p style='font-size:8px;'>地址："+list_map[0].CONTENT+" 附近</p>");
		marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow);});
		maplet.addOverlay(marker1);
		maplet.centerAndZoom(pt,14);
		var length=list_map.length;
		var list=[];
		for(var i=1,k=0;i<length;i++,k++){
			list[k]=list_map[i];
			this.to_makePoint(list_map[i]);
		}
		this.to_setDataViewList(list);
	},
	to_makePoint:function(list_map){
		var marker1 = new BMap.Marker(new BMap.Point(list_map.MLON,list_map.MLAT));
		var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+list_map.USERNAME+"</p><p style='font-size:8px;'>手机："+list_map.PHONENO+"</><p style='font-size:8px;'>地址："+list_map.CONTENT+"</p>");
		marker1.addEventListener("click", function(){
			this.openInfoWindow(infoWindow);
			var point=marker1.getPosition();
			maplet.centerAndZoom(point,14);
		});
		maplet.addOverlay(marker1);
	
	},
	//查找下属
	to_belowEmployee:function(){
		this.NextView('mapBelowPeopleView','HelcPDA.view.map.MapBelowPeopleView');
		var store=this.getStore('MapBelowEmployeeStore','HelcPDA.store.map.MapBelowEmployeeStore');
		function getResult(res){
//			//模拟下属数据。
//			var item=[];
//			for(var i=0;i<10;i++){
//				var address={
//						MLON:'117.064305',MLAT:'34.514206',USERID:'sssd',USERNAME:'下属东'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',TIME:'2013-05-28',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;
//			}
//			for(var i=10;i<18;i++){
//				var address={
//						MLON:'117.164305',MLAT:'34.414206',USERID:'sssd',USERNAME:'王下属+'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',TIME:'2013-05-28',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;	
//				
//			}
//			res.item=item;
			list_map=res.item;
			store.setData(res.item);
		}
		var content={USERID:copy_userid};
//		var res={};
//		getResult(res);
		this.connectServer(getResult, 'empLocationAction.do?method=toSearchEmpFromHR',JSON.stringify(content));	
	},
	//选择下属
	to_choiceBelowEm:function(obk, index, target, record, e, eOpts){
		var obj=this;
		Ext.Viewport.setActiveItem(Ext.getCmp('mapMainView'));
		Ext.getCmp('map_listV').setHidden(true);
		var store=this.getStore('MapBelowEmployeeStore','HelcPDA.store.map.MapBelowEmployeeStore');
		var PERSON_NAME=store.getAt(index).get('PERSON_NAME');
		var PERSON_ID=store.getAt(index).get('PERSON_ID');
		Ext.getCmp('PERSON_ID').setValue(PERSON_ID);
		Ext.getCmp('PERSON_NAME').setValue(PERSON_NAME);
		function getResult(res){
			
			maplet.clearOverlays();
			//模拟数据
//			var item=[];
//			for(var i=0;i<10;i++){
//				var address={
//						MLON:'117.064305',MLAT:'34.514206',USERID:'sssd',USERNAME:'下属东'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;
//			}
//			for(var i=10;i<18;i++){
//				var address={
//						MLON:'117.164305',MLAT:'34.414206',USERID:'sssd',USERNAME:'王下属+'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;	
//				
//			}
//			res.item=item;
			//.......
			var length=res.item.length;
			
			if(length==0){
				WL.Toast.show('当天没有相关信息');
          		return;
          	}
			for(var i=0;i<length;i++){
				obj.to_makeBelowPoint(res.item[i],PERSON_NAME);
				if(i==0){
					var point=new BMap.Point(res.item[i].MLON,res.item[i].MLAT);
					maplet.centerAndZoom(point,14);	
				}
			}
			obj.to_setDataViewList(res.item,PERSON_NAME);
		}
		var content={USERID:PERSON_ID,DATE:Ext.Date.format(new Date(),'Y-m-d')};
//		var res={};
//		getResult(res);
		this.connectServer(getResult, 'empLocationAction.do?method=toSearchEmpWholeDay',JSON.stringify(content));	
	},
	
	//查找全部下属坐标
	to_choiceAllBelowEm:function(){
		var obj=this;
		Ext.Viewport.setActiveItem(Ext.getCmp('mapMainView'));
		Ext.getCmp('PERSON_ID').setValue();
		Ext.getCmp('map_listV').setHidden(false);
		function getResult(res){
			maplet.clearOverlays();
			//模拟数据
//			var item=[];
//			for(var i=0;i<10;i++){
//				var address={
//						MLON:'117.064305',MLAT:'34.514206',USERID:'sssd',USERNAME:'下属东'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;
//			}
//			for(var i=10;i<18;i++){
//				var address={
//						MLON:'117.164305',MLAT:'34.414206',USERID:'sssd',USERNAME:'王下属+'+i+'',PHONENO:'1234',
//						CONTENT:'晓东专属',DISTANCE:'500m',TITLE:'百度地图',PERSON_NAME:'王晓东',
//						PERSON_ID:'156336'
//					}
//				item[i]=address;	
//				
//			}
//			res.item=item;
			//.......
			var length=res.item.length;
			var tempList=res.item;
			var k;
			for(var i=0;i<length;i++){
				if(tempList[i].MLON!=0&&tempList[i].MLAT!=0){
					obj.to_makePoint(res.item[i]);
					k=i;
				}
			}
				var point=new BMap.Point(res.item[k].MLON,res.item[k].MLAT);
				maplet.centerAndZoom(point,14);	
			obj.to_setDataViewList(res.item);
		}
		var content="{'SELECTED_EMP':"+JSON.stringify(list_map)+"}";
//		var res={};
//		getResult(res);
		this.connectServer(getResult, 'empLocationAction.do?method=toSearchSelectEmp',content);
	},
	//点击选择时间
	to_timesearch:function(){
		this.initChoiceTime();
	},
	initChoiceTime:function(){
		var obj=this;
		var PERSON_ID=Ext.getCmp('PERSON_ID').getValue();
		var PERSON_NAME=Ext.getCmp('PERSON_NAME').getValue();
		if(PERSON_ID==''||PERSON_ID==null||typeof(PERSON_ID)=='undefined'){
			WL.Toast.show('请先选择下属人员');
			return;
		}
		var mapPicker=Ext.getCmp('mapPicker');
		if(mapPicker){
			mapPicker.destroy();
		}
		var datePicker = Ext.create('Ext.picker.Date', {
		    id:'mapPicker',
		    modal:true,
		    slotOrder:[
                    'year',
                    'month',
                    'day'
                ],
            doneButton: '确定',
            cancelButton: '取消'
           
		});
		Ext.Viewport.add(datePicker);
		datePicker.show();
		datePicker.setValue(Ext.Date.format(new Date(),'Y-m-d'));
		datePicker.addListener('change',function(obk,value,eOpts){
			if(value!=''||value!=null||typeof(value)!='undefined'){
				value=Ext.Date.format(value,'Y-m-d');
			}
			function getResult(res){
              	var length=res.item.length;
              	maplet.clearOverlays();
              	if(length==0){
              		WL.Toast.show('当天没有相关信息');
              		return;
              	}
				for(var i=0;i<length;i++){
					obj.to_makeBelowPoint(res.item[i],PERSON_NAME);
				}			
			}
			var content={USERID:PERSON_ID,DATE:value};
		  	obj.connectServer(getResult, 'empLocationAction.do?method=toSearchEmpWholeDay',JSON.stringify(content));	
		});
	},
	to_makeBelowPoint:function(list,PERSON_NAME){
		var marker1 = new BMap.Marker(new BMap.Point(list.MLON,list.MLAT));  
		var infoWindow1 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+PERSON_NAME+"</p><p style='font-size:8px;'>时间："+list.TIME+"</><p style='font-size:8px;'>地址："+list.CONTENT+"</p>");
		marker1.addEventListener("click", function(){
			this.openInfoWindow(infoWindow1);
			var point=marker1.getPosition();
			maplet.centerAndZoom(point,14);
		});
		maplet.addOverlay(marker1);
	},
	//设置DataView的list，并添加到相应store
	to_setDataViewList:function(array,PERSON_NAME){
		var dataViewList=[];
		var k=0;
		var length=array.length;
		for(var i=0;i<length;i++){
		if(array[i].MLON!=0&&array[i].MLAT!=0){
			var temp={};
			temp.USERID=array[i].USERID;
			temp.USERNAME=array[i].USERNAME;
			temp.CONTENT=array[i].CONTENT;
			temp.PHONENO=array[i].PHONENO;
			temp.TIME=array[i].TIME;	
			temp.PERSON_NAME=PERSON_NAME;
			dataViewList[k]=temp;
			k++;
			 }
		}
		var store=this.getStore('MapAroundEmpStore1','HelcPDA.store.map.MapAroundEmpStore1');
		store.setData(dataViewList);
	},
	//点击每一项dataview触发的事件
	to_choiceOneItem:function(obk, index, target, record, e, eOpts){
		var store=this.getStore('MapAroundEmpStore1','HelcPDA.store.map.MapAroundEmpStore1');
		var time=store.getAt(0).get('TIME');
		var PERSON_NAME=store.getAt(0).get('PERSON_NAME');
		if(typeof(time)=='undefined'){
			var date = store.getAt(index);
			var ovs = maplet.getOverlays();
			var item = ovs[index+2];
			var opts = {enableMessage:false};
			var infoWindow2 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+date.get('USERNAME')+"</p><p style='font-size:8px;'>手机："+date.get('PHONENO')+"</><p style='font-size:8px;'>地址："+date.get('CONTENT')+"</p>",opts);
			item.openInfoWindow(infoWindow2);
			var point=item.getPosition();
			maplet.centerAndZoom(point,14);
		}else{
			var date = store.getAt(index);
			var ovs = maplet.getOverlays();
			var item = ovs[index];
			var opts = {enableMessage:false};
			var infoWindow2 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+date.get('USERNAME')+"</p><p style='font-size:8px;'>手机："+date.get('PHONENO')+"</><p style='font-size:8px;'>地址："+date.get('CONTENT')+"</p>",opts);
			item.openInfoWindow(infoWindow2);
			var point=item.getPosition();
			maplet.centerAndZoom(point,14);
		}
		
	},
	//添加圆
	to_addCircle:function(MLON,MLAT,METER){
		var style={strokeColor:'blue',fillColor:"blue",strokeWeight:1,fillOpacity:0.3,strokeStyle:'dashed'};
		var circle = new BMap.Circle(new BMap.Point(MLON,
				MLAT),METER,style);
		maplet.addOverlay(circle);
	},
	//点击我的位置
	to_myLocation:function(){
	    function getResult(res){
	    	Ext.getCmp('map_listV').setHidden(true);
	    	maplet.clearOverlays();
	    	var pt = new BMap.Point(res.item[0].MLON,res.item[0].MLAT);
	    	var myIcon = new BMap.Icon("images/pin_green.png", new BMap.Size(33,33));
	    	var marker1 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	    	maplet.addOverlay(marker1);
			var infoWindow1 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>"+res.item[0].TITLE+"</p><p style='font-size:8px;'>手机："+res.item[0].PHONENO+"</><p style='font-size:8px;'>地址:"+res.item[0].CONTENT+"</p>");
			marker1.addEventListener("click", function(){
				this.openInfoWindow(infoWindow1);
				var point=this.getPozition();
				maplet.centerAndZoom(point,14);
			});
	    }
	    var uuid='95E5FD9190833EEC';
		var content={USERID:userid,UUID:WL.Device.getID()};
	  	this.connectServer(getResult, 'empLocationAction.do?method=toSearchMyLocation',JSON.stringify(content));
	  	//WL.Device.getID()
	}
	
});

	
