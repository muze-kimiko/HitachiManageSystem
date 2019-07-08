/**
 * Made by lgs
 * 1.地图为公共模块哦。
 * 2.当有坐标时MapX,MapY不为空，定位当前坐标显示位置文本。
 * 3.当做定位坐标时,返回的时候清空MapX,MapY(为null或''),
 * 确定才有值，回传当前定位地址，坐标保留在MapX,MapY
 * 4.当提交定位地址成功后，记得要清空MapX,MapY.
 * 5.当退出提交地址这个页面时,也要记得清空MapX,MapY.
 */

Ext.define('HelcPAD.controller.map.MapCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

	config: {
        control: {
			'button#opptyNewMap_FH':{
				tap:'opptyNewMap_FH'
			},
			
			'button#opptyNewMap_QD':{
				tap:'opptyNewMap_QD'
			},
			
        },
        
    },
    
    //确定
    opptyNewMap_QD:function(){
    	var obj=this;
    	if(MapX!=null&&MapY!=null){
    		Ext.Msg.show({
    			title: '温馨提示',
    			message: '是否确认当前坐标?',
    			buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
    			fn: function(buttonId) {
    				if(buttonId == 'yes'){
    					//回调地址
    					var PADMapAddress=obj.getApplication().getController('map.MapCtrl').PADMapAddress;
    					//控件名
    					var PADMapKJname=obj.getApplication().getController('map.MapCtrl').PADMapKJname;
    					//alert(PADMapAddress+'  '+PADMapKJname);
    					
    					//用于确定后悔重新定位
    					obj.getApplication().getController('map.MapCtrl').PADMapXG='Y';
    					
    					//清空地址
    					obj.getApplication().getController('map.MapCtrl').Saddress=null;
    					obj.getApplication().getController('map.MapCtrl').SHaddress=null;
    					
    					obj.BackView();
    					Ext.getCmp(PADMapKJname).setValue(PADMapAddress);
    				};
    			}
    		});
    		
    	}else{
    		Ext.Msg.alert("温馨提示","请先定位");
    	};
    },
    
    //返回
    opptyNewMap_FH:function(){
    	this.BackView();
    	MapX=null;
    	MapY=null;
    	/*MapX=6.8;
    	MapY=6.81;*/
    },
	
    //处理方法
    MapCtrl_JRDT:function(){
    	//地图宽高
		//var html='<div id="baimap" style="width:'+MapWidth+'px;height:'+(MapHeight-45)+'px;margin:0px;background-color:yellow;">77</div>';
    	var html='<div>'+
		 '<div id="address" class="dwAddress"></div>'+
		 '<div><input type="text" id="addressSelect" size="20" style="width:100%;height:24px;"></div>'+
		 '<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:100%;height:auto; display:none;"></div>'+
		 '<div id="baimap" style="width:'+MapWidth+'px;height:'+(MapHeight-45-30-24)+'px;margin:0px;background-color:yellow;float:left;">77</div>'+
		 '</div>';
    	
    	Ext.getCmp('mapbar1').setHtml(html);
		cc.log(html);
		//alert(MapWidth+' '+MapHeight);
    	//地图功能
    	var obj=this;
    	
    	//2015-12-08  增加修改判断
    	obj.PADMapXG;
    	
    	obj.PADMapKJname;
    	if(MapX!=null&&MapX!=''&&MapY!=null&&MapY!=''){
    		//屏蔽确定按钮
    		Ext.getCmp('opptyNewMap_QD').setHidden(true);
    		if(obj.PADMapXG=='Y'){
        		Ext.getCmp('opptyNewMap_QD').setHidden(false);
        	};
    	}else{
    		//取消屏蔽确定按钮
    		Ext.getCmp('opptyNewMap_QD').setHidden(false);
    	};
    	
    	
    	//公共部分
    	var mapli = new BMap.Map("baimap",19);
    	//添加默认缩放平移控件
    	mapli.addControl(new BMap.NavigationControl());  
    	// 尺寸显示
    	mapli.addControl(new BMap.ScaleControl()); 
    	//添加默认缩略地图控件
    	mapli.addControl(new BMap.OverviewMapControl());              
    	mapli.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
    	
    	/*var size = new BMap.Size(10, 20);
    	mapli.addControl(new BMap.CityListControl({
    		anchor : BMAP_ANCHOR_TOP_RIGHT,
	        offset : size,
    	}));*/
    	
    	try{
    		// 添加定位控件    geolocationControl(公共的)
    		var geolocationControl = new BMap.GeolocationControl();
    		mapli.addControl(geolocationControl);
    		geolocationControl.addEventListener("locationSuccess", function(e){
    			// 定位成功事件
    			if(e.addressComponent.province==e.addressComponent.city){	
    				obj.PADMapAddress= e.addressComponent.city +','+ e.addressComponent.district +','+ e.addressComponent.street +','+ e.addressComponent.streetNumber;
    			}else{
    				obj.PADMapAddress= e.addressComponent.province +','+ e.addressComponent.city +','+ e.addressComponent.district +','+ e.addressComponent.street +','+ e.addressComponent.streetNumber;
    			};
    			//显示位置
    			var addressText = obj.PADMapAddress;
    			var searchOpptyStatus = document.getElementById('address');
    			searchOpptyStatus.innerHTML = addressText.replace(/,/g,'');
    			MapX=e.point.lng;
    			MapY=e.point.lat;
    			
    			/*point=new BMap.Point(MapX,MapY);
        		mapli.centerAndZoom(point,19);
        		 var size = new BMap.Size(50, 50);
        		 var offset = new BMap.Size(5,5);
                 var icon = new BMap.Icon('images/hotel.png', size, {anchor: offset});
        		
        		// 创建标注  更标注图片
        		marker = new BMap.Marker(point, {icon:icon});
        		mapli.addOverlay(marker);     
        		marker.show();*/
    			
    		});
    		geolocationControl.addEventListener("locationError",function(e){
    			// 定位失败事件
    			alert(e.message);
    		});
    	}catch(e){
    		alert('定位失败，请检测是否开启GPS!');
    	}
    	
    	//查询地址
    	//不添加坐标，直接跳转位置
    	try{
    		function G(id){
    			return document.getElementById(id);
    		}
    		
    		//创建一个自动完成对象
        	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        			{"input" : "addressSelect"
        			,"location" : mapli
        		});

    		ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
    		var str = "";
    			var _value = e.fromitem.value;
    			var value = "";
    			if (e.fromitem.index > -1) {
    				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    			}    
    			str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
    			
    			value = "";
    			if (e.toitem.index > -1) {
    				_value = e.toitem.value;
    				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    			}    
    			str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    			G("searchResultPanel").innerHTML = str;
    		});

    		var myValue;
    		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    		var _value = e.item.value;
    			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    			G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    			
    			var searchOpptyStatus = document.getElementById('address');
				searchOpptyStatus.innerHTML = myValue.replace(/,/g,'');
				
    			setPlace();
    		});
    		
    		function setPlace(){
    			mapli.clearOverlays();    //清除地图上所有覆盖物
    			function myFun(){
    				var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
    				mapli.centerAndZoom(pp, 18);
    				//marker = new BMap.Marker(pp);
    				//mapli.addOverlay(marker);    //添加标注
    				//记录坐标
    				//MapX=pp.lng;
        			//MapY=pp.lat;
    				G("addressSelect").blur();
    			}
    			var local = new BMap.LocalSearch(mapli, { //智能搜索
    			 onSearchComplete: myFun
    			});
    			local.search(myValue);
    		}
    	}catch(e){
    		Ext.Msg.alert('提示','搜索功能加载失败');
    	}
    	
    	
    	if (Ext.os.is.Android) {
    		obj.getMapAZ(obj,mapli);
    	}else if(Ext.os.is.iOS){
    		obj.getMapIOS(obj,mapli);
    	};
    	
    	
    },
    
    //苹果专用地图
    getMapIOS:function(obj,mapli){
    	//alert('进入苹果');
    	var marker=null;
    	//定位当前位置
    	if(MapX!=null&&MapX!=''&&MapY!=null&&MapY!=''){
    		//显示坐标
    		point=new BMap.Point(MapX,MapY);
    		mapli.centerAndZoom(point,19);
    		marker = new BMap.Marker(point);  // 创建标注
    		mapli.addOverlay(marker);     
    		marker.show();
    		
    		
    		//获取当前坐标的具体位置
    		var geoc = new BMap.Geocoder(); 
    		var pt = point;
    		geoc.getLocation(pt, function(rs){
    			var addComp = rs.addressComponents;
    			if(addComp.province==addComp.city){
    				obj.PADMapAddress= addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
    			}else{
    				obj.PADMapAddress= addComp.province +','+ addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
				};
				//显示位置
				var addressText = obj.PADMapAddress;
				//alert('坐标地址'+addressText.replace(/,/g,''));
				var searchOpptyStatus = document.getElementById('address');
				searchOpptyStatus.innerHTML = addressText.replace(/,/g,'');
    		});
    		
    		if(obj.PADMapXG=='Y'){
    			mapli.addEventListener("onclick",function(e){
        			if(point!=null){
        				//删除坐标
        				mapli.removeOverlay(marker);
        			};
        			point=new BMap.Point(e.point.lng, e.point.lat);
        			//创建坐标
        			marker = new BMap.Marker(point);  // 创建标注
        			//添加
        			mapli.addOverlay(marker);     
        			marker.show();
        			MapX=e.point.lng;
        			MapY=e.point.lat;
        			
        			
        			//获取当前坐标的具体位置
            		var geoc = new BMap.Geocoder(); 
            		var pt = point;
            		geoc.getLocation(pt, function(rs){
            			var addComp = rs.addressComponents;
            			if(addComp.province==addComp.city){
            				obj.PADMapAddress= addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
            			}else{
            				obj.PADMapAddress= addComp.province +','+ addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
        				};
        				//显示位置
        				var addressText = obj.PADMapAddress;
        				//alert('坐标地址'+addressText.replace(/,/g,''));
        				var searchOpptyStatus = document.getElementById('address');
        				searchOpptyStatus.innerHTML = addressText.replace(/,/g,'');
            		});
            		
        			
        		});
    		};
    		
    	}else{
    		
    		//先默认
    		mapli.centerAndZoom(new BMap.Point(116.404, 39.915), 19);
    		
    		//判断是否有要求地址传递过来，没有默认广州，有显示传递地址
    		obj.Saddress;   //省
    		obj.SHaddress;  //详细地址
    		if(obj.Saddress){
    			var myGeo = new BMap.Geocoder();      
    			// 将地址解析结果显示在地图上，并调整地图视野    
    			myGeo.getPoint(obj.SHaddress,function(point){      
    				if (point) {      
    					mapli.centerAndZoom(point, 19);      
    					
    					//获取当前坐标的具体位置
    	        		var geoc = new BMap.Geocoder(); 
    	        		var pt = point;
    	        		geoc.getLocation(pt, function(rs){
    	        			var addComp = rs.addressComponents;
    	        			if(addComp.province==addComp.city){
    	        				obj.PADMapAddress= addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
    	        			}else{
    	        				obj.PADMapAddress= addComp.province +','+ addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
    	    				};
    	    				//显示位置
    	    				var addressText = obj.PADMapAddress;
    	    				//alert('坐标地址'+addressText.replace(/,/g,''));
    	    				var searchOpptyStatus = document.getElementById('address');
    	    				searchOpptyStatus.innerHTML = addressText.replace(/,/g,'');
    	    				
    	    				//显示坐标
    	                	mapli.removeOverlay(marker);
    	                	marker = new BMap.Marker(pt);
    	                	mapli.addOverlay(marker);   
    	                	marker.show();
    	                	
    	                	//获取坐标
    	            		MapX=point.lng;
    	        			MapY=point.lat;
    	        			
    	        			
    	        		});
    				}      
    			}, obj.Saddress);
    		}else{
    			//根据IP获取城市  
                var myCity = new BMap.LocalCity();  
                myCity.get(getCityByIP);  
                //根据IP获取城市  
                function getCityByIP(rs) {  
                    var cityName = rs.name;  
                    mapli.centerAndZoom(cityName,19);
                    
                    mapli.addEventListener("onclick",function(e){
            			if(point!=null){
            				//删除坐标
            				mapli.removeOverlay(marker);
            			};
            			point=new BMap.Point(e.point.lng, e.point.lat);
            			//创建坐标
            			marker = new BMap.Marker(point);  // 创建标注
            			//添加
            			mapli.addOverlay(marker);     
            			marker.show();
            			MapX=e.point.lng;
            			MapY=e.point.lat;
            			
            			
            			//获取当前坐标的具体位置
                		var geoc = new BMap.Geocoder(); 
                		var pt = point;
                		geoc.getLocation(pt, function(rs){
                			var addComp = rs.addressComponents;
                			if(addComp.province==addComp.city){
                				obj.PADMapAddress= addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
                			}else{
                				obj.PADMapAddress= addComp.province +','+ addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
            				};
            				//显示位置
            				var addressText = obj.PADMapAddress;
            				//alert('坐标地址'+addressText.replace(/,/g,''));
            				var searchOpptyStatus = document.getElementById('address');
            				searchOpptyStatus.innerHTML = addressText.replace(/,/g,'');
                		});
                		
            			
            		});
                    
                };
    		};
    		
    		
    	};
    },
    
    //安卓专用地图
    getMapAZ:function(obj,mapli){
    	var marker=null;
    	//定位当前位置
    	if(MapX!=null&&MapX!=''&&MapY!=null&&MapY!=''){
    		
    		//显示坐标
    		point=new BMap.Point(MapX,MapY);
    		mapli.centerAndZoom(point,19);
    		marker = new BMap.Marker(point);  // 创建标注
    		mapli.addOverlay(marker);     
    		marker.show();
    		//
    		//获取当前坐标的具体位置
    		var geoc = new BMap.Geocoder(); 
    		var pt = point;
    		geoc.getLocation(pt, function(rs){
    			var addComp = rs.addressComponents;
    			if(addComp.province==addComp.city){
    				obj.PADMapAddress= addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
    			}else{
    				obj.PADMapAddress= addComp.province +','+ addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
				};
				//显示位置
				var addressText = obj.PADMapAddress;
				//alert('坐标地址'+addressText.replace(/,/g,''));
				var searchOpptyStatus = document.getElementById('address');
				searchOpptyStatus.innerHTML = addressText.replace(/,/g,'');
    		});
    		
    		if(obj.PADMapXG=='Y'){
    			//点击定位坐标
    			mapli.addEventListener('touchend', function (e) {
                	var point=new BMap.Point(e.point.lng,e.point.lat);
                	/*mapli.removeOverlay(marker);
                	marker = new BMap.Marker(point);
                	mapli.addOverlay(marker);   
                	marker.show();
                	//获取坐标
            		MapX=e.point.lng;
        			MapY=e.point.lat;*/
                	//alert('停止'+e.point.lng);
                	ZBandWZTwo(point);
                });
                
    		};
    		
    	}else{//获取当前位置
    		//先默认
    		mapli.centerAndZoom(new BMap.Point(116.404, 39.915), 19);
    		
    		//判断是否有要求地址传递过来，没有默认广州，有显示传递地址
    		obj.Saddress;   //省
    		obj.SHaddress;  //详细地址
    		if(obj.Saddress){
    			var myGeo = new BMap.Geocoder();      
    			// 将地址解析结果显示在地图上，并调整地图视野    
    			myGeo.getPoint(obj.SHaddress,function(point){      
    				if (point) {      
    					mapli.centerAndZoom(point, 19);      
    					ZBandWZTwo(point);
    				}      
    			}, obj.Saddress);
    		}else{
    			//根据IP获取城市  
                var myCity = new BMap.LocalCity();  
                myCity.get(getCityByIP);  
                //根据IP获取城市  
                function getCityByIP(rs) {  
                    var cityName = rs.name;  
                    mapli.centerAndZoom(cityName,19);
                    //alert("根据IP定位您所在的城市为:" + cityName);  
                    
                    mapli.addEventListener('touchend', function (e) {
                    	var point=new BMap.Point(e.point.lng,e.point.lat);
                    	/*mapli.removeOverlay(marker);
                    	marker = new BMap.Marker(point);
                    	mapli.addOverlay(marker);   
                    	marker.show();
                    	//获取坐标
                		MapX=e.point.lng;
            			MapY=e.point.lat;*/
                    	//alert('停止'+e.point.lng);
                    	ZBandWZTwo(point);
                    });

                };  
    		};
    		
    	};
    	
    	
    	//根据坐标获取所在位置
        function ZBandWZTwo(point){
        	var pt = point;
        	var geoc = new BMap.Geocoder(); 
      		geoc.getLocation(pt, function(rs){
    			var addComp = rs.addressComponents;
    			if(addComp.province==addComp.city){
    				obj.PADMapAddress= addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
    			}else{
    				obj.PADMapAddress= addComp.province +','+ addComp.city +','+ addComp.district +','+ addComp.street +','+ addComp.streetNumber;
				};
				//显示位置
				var addressText = obj.PADMapAddress;
				//alert('坐标地址'+addressText.replace(/,/g,''));
				var searchOpptyStatus = document.getElementById('address');
				searchOpptyStatus.innerHTML = addressText.replace(/,/g,'');
				
				//显示坐标
            	mapli.removeOverlay(marker);
            	marker = new BMap.Marker(pt);
            	mapli.addOverlay(marker);   
            	marker.show();
            	
            	//获取坐标
        		MapX=point.lng;
    			MapY=point.lat;
      		});
      		
        };
    },
    
    
    
    
    
    
    /*公共的调用代码
     * this.NextView('map_id','HelcPAD.view.map.Map');
	MapX='116.331398';
	MapY='39.897445';
	obj.getApplication().getController('map.MapCtrl').PADMapKJname='clueSearchDirector_ProjectName';
	obj.getApplication().getController('map.MapCtrl').MapCtrl_JRDT();*/
    
    
});


//进入地图模块 1是定位，2是获取坐标
/*function MapCtrl_JRDT(num){
	
	//Ext.Viewport.add(Ext.create('HelcPAD.view.map.Map'));
	//初始化坐标
	var mapli = new BMap.Map("baimap");
	mapli.centerAndZoom('广州',12);
	mapli.enableScrollWheelZoom();
	//添加默认缩放平移控件
	mapli.addControl(new BMap.NavigationControl());  
	// 尺寸显示
	mapli.addControl(new BMap.ScaleControl()); 
	//添加默认缩略地图控件
	//mapli.addControl(new BMap.OverviewMapControl());              
	mapli.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));

	var marker=null;
	if(num==1){//通过坐标定位
		point=new BMap.Point(MapX,MapY);
		marker = new BMap.Marker(point);  // 创建标注
		mapli.addOverlay(marker);     
		marker.show();
	}else{//定位获取坐标
		mapli.addEventListener("onclick",function(e){
			if(point!=null){
				//删除坐标
				mapli.removeOverlay(marker);
			};
			//alert(e.point.lng+ "," + e.point.lat);
			point=new BMap.Point(e.point.lng, e.point.lat);
			//创建坐标
			marker = new BMap.Marker(point);  // 创建标注
			//添加
			mapli.addOverlay(marker);     
			marker.show();
			MapX=e.point.lng;
			MapY=e.point.lat;
		});
	};
};*/


