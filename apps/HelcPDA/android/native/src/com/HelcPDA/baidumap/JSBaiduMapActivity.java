package com.HelcPDA.baidumap;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcPDA.R;
import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.location.LocationClientOption.LocationMode;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.BaiduMap.OnMapClickListener;
import com.baidu.mapapi.map.BaiduMap.OnMarkerClickListener;
import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.InfoWindow;
import com.baidu.mapapi.map.MapPoi;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.Marker;
import com.baidu.mapapi.map.MarkerOptions;
import com.baidu.mapapi.map.MyLocationConfiguration;
import com.baidu.mapapi.map.MyLocationData;
import com.baidu.mapapi.map.OverlayOptions;
import com.baidu.mapapi.map.PolylineOptions;
import com.baidu.mapapi.model.LatLng;
import com.baidu.mapapi.search.core.SearchResult;
import com.baidu.mapapi.search.geocode.GeoCodeResult;
import com.baidu.mapapi.search.geocode.GeoCoder;
import com.baidu.mapapi.search.geocode.OnGetGeoCoderResultListener;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeOption;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeResult;
import com.fiberlink.maas360.android.appSdkSampleApp.MainApplication;
//import com.google.common.io.LineReader;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnFocusChangeListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ZoomControls;

public class JSBaiduMapActivity extends Activity implements OnClickListener,OnGetGeoCoderResultListener{
	//百度地图的控件或监听
	public MapView mMapView = null;
	private View v_menu;
	private TextView voice_text;
	private Button backtoweb,backtolist,arroudPeople,mine,btn_zoom_in,btn_zoom_out,
	my_location,down,up,offline,choic_type,send_card,work_card,intermediate;
    //private ImageView btn_zoom_in,btn_zoom_out;
	public LocationClient mLocationClient;
	public MyLocationListener mMyLocationListener;
	private BaiduMap mBaiduMap;
	public JSONObject jsData=new JSONObject();
	private ProgressDialog progressDialog;
	private MainApplication myapp;
	private  com.baidu.mapapi.map.MyLocationConfiguration.LocationMode mCurrentMode;
	private BitmapDescriptor mCurrentMarker;
	public List<Marker> MaikerList;
	public Boolean shangban=false,xiaban=false;
	private WLClient wlconn;  //worklight 加载信息使用 
	private JSBaiduMapActivity jsBaiduMapActivity;
	private RelativeLayout toolbar1;
	private GeoCoder mSearch = null; // 搜索模块，也可去掉地图模块独立使用
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
        setContentView(R.layout.jsbaidumap);
        mMapView = (MapView) findViewById(R.id.bmapView);
    	myapp=((MainApplication)getApplication());
    	wlconn=WLClient.createInstance(JSBaiduMapActivity.this);
        initContainer();
        closeLogo();
        jsBaiduMapActivity=this;
	}
	
	
	private void initContainer() {
		v_menu=LayoutInflater.from(JSBaiduMapActivity.this).inflate(R.layout.menuepopwindow, null);
		mLocationClient = new LocationClient(this.getApplicationContext());
		mMyLocationListener = new MyLocationListener();
		mLocationClient.registerLocationListener(mMyLocationListener);
		backtoweb=(Button)findViewById(R.id.backtoweb);
		backtoweb.setOnClickListener(this);
		arroudPeople=(Button)findViewById(R.id.arroudPeople);
		backtolist=(Button)findViewById(R.id.backtolist);
		backtolist.setOnClickListener(this);
		arroudPeople.setOnClickListener(this);
		mine=(Button)findViewById(R.id.mine);
		mine.setOnClickListener(this);
		down=(Button)v_menu.findViewById(R.id.down);
		down.setOnClickListener(this);
		up=(Button)v_menu.findViewById(R.id.up);
		up.setOnClickListener(this);
		
		intermediate=(Button)v_menu.findViewById(R.id.intermediate);
		intermediate.setOnClickListener(this);
		
		//..
		btn_zoom_in=(Button)findViewById(R.id.btn_zoom_in);
		btn_zoom_in.setOnClickListener(this);
		btn_zoom_out=(Button)findViewById(R.id.btn_zoom_out);
		btn_zoom_out.setOnClickListener(this);
		my_location=(Button)findViewById(R.id.my_location);
		my_location.setOnClickListener(this);
		//offline=(Button)findViewById(R.id.offline);
		//offline.setOnClickListener(this);
		//新加入功能
		choic_type=(Button)findViewById(R.id.choic_type);
		choic_type.setOnClickListener(this);
		
		toolbar1=(RelativeLayout)findViewById(R.id.toolbar1);
		send_card=(Button)v_menu.findViewById(R.id.send_card);
		send_card.setOnClickListener(this);
		
		//popwindow
		work_card=(Button)v_menu.findViewById(R.id.work_card);
		work_card.setOnClickListener(this);
		
		voice_text=(TextView)findViewById(R.id.voice_text);
		
		
		if("进入地图".equals(myapp.LocationFlag)){
			initLocation(1100);
			showProgressDialog(JSBaiduMapActivity.this,"提示","正在加载地图中,请稍候");
		}else if("全部周围的人".equals(myapp.LocationFlag)){
			 try {
				manyPoint(new JSONArray(myapp.jsData.optJSONObject(0).optString("ArroudPeople")));
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}else if("我的轨迹".equals(myapp.LocationFlag)){
			 try {
				manyPoint(new JSONArray(myapp.jsData.optJSONObject(0).optString("MineRoult")));
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}else if("工号进入".equals(myapp.LocationFlag)){
			 try {
				    // 初始化搜索模块，注册事件监听
				    myapp.toast.setText("请点击地图选择工号位置");
					myapp.toast.show();
					voice_text.setVisibility(View.VISIBLE);
					voice_text.getBackground().setAlpha(150);
					mSearch = GeoCoder.newInstance();
					mSearch.setOnGetGeoCodeResultListener(this);
					String tempX=new JSONArray(myapp.jsData.optJSONObject(0).optString("obz")).optJSONObject(0).optString("MLON");
					if("暂无".equals(tempX)){
						initLocation(1100);
						showProgressDialog(JSBaiduMapActivity.this,"提示","暂无工号位置信息,正在加载地图中,请稍候");
					}else{
						manyPoint(new JSONArray(myapp.jsData.optJSONObject(0).optString("obz")));
					}
				} catch (JSONException e) {
					e.printStackTrace();
				} 
		}
		Intent intent =getIntent();
		if("查看离线".equals(intent.getStringExtra("LocationFlag"))){
			LatLng point=new LatLng(Double.parseDouble(intent.getStringExtra("x")),Double.parseDouble(intent.getStringExtra("y")));
			MapStatus mMapStatus = new MapStatus.Builder()
	        .target(point)
	        .zoom(16)
	        .build();
	        MapStatusUpdate u = MapStatusUpdateFactory.newMapStatus(mMapStatus);
	        mBaiduMap.animateMapStatus(u);
		}
	}

	@Override
	public void onClick(View v) {
		switch(v.getId()){
		case R.id.backtoweb:
			 Intent mIntent = new Intent();    
             // 设置结果，并进行传送    
			 mIntent.putExtra("jsData",jsData.toString());
             setResult(3, mIntent);  
			 finish();
			break;
		case R.id.backtolist:
			 Intent mIntent3 = new Intent();    
             // 设置结果，并进行传送    
			 mIntent3.putExtra("jsData",jsData.toString());
             setResult(0, mIntent3);  
			 finish();
			break;
		case R.id.arroudPeople:
			 Intent mIntent1 = new Intent();  
			 mIntent1.putExtra("jsData", jsData.toString());
             // 设置结果，并进行传送    
             setResult(1, mIntent1); 
			 finish();
			break;
		case R.id.mine:
			 Intent mIntent2 = new Intent();  
			 mIntent2.putExtra("jsData", jsData.toString());
             // 设置结果，并进行传送    
             setResult(2, mIntent2); 
			 finish();
			break;
		case R.id.down:
			//AlertDialog alertDiolog=
			new AlertDialog.Builder(this).setTitle("下班打卡").setMessage("确定要下班打卡吗？")
	        .setPositiveButton("确定",new DialogInterface.OnClickListener() {//设置确定的按键
	             @Override
	             public void onClick(DialogInterface dialog, int which) {
	            	mBaiduMap.clear();
	            	xiaban=true;
	     			shangban=false;
	     			initLocation(1100);
	     			showProgressDialog(JSBaiduMapActivity.this,"提示","下班打卡中,请稍候");
	             }
	         }).setNegativeButton("取消",null).setCancelable(false).show();
			break;
		case R.id.intermediate:
			//AlertDialog alertDiolog=
			new AlertDialog.Builder(this).setTitle("中途打卡").setMessage("确定要中途打卡吗？")
	        .setPositiveButton("确定",new DialogInterface.OnClickListener() {//设置确定的按键
	             @Override
	             public void onClick(DialogInterface dialog, int which) {
	            	mBaiduMap.clear();
	            	xiaban=true;
	     			shangban=true;
	     			initLocation(1100);
	     			showProgressDialog(JSBaiduMapActivity.this,"提示","中途打卡中,请稍候");
	             }
	         }).setNegativeButton("取消",null).setCancelable(false).show();
			break;	
		case R.id.up:
			new AlertDialog.Builder(this).setTitle("上班打卡").setMessage("确定要上班打卡吗？")
	        .setPositiveButton("确定",new DialogInterface.OnClickListener() {
	             @Override
	             public void onClick(DialogInterface dialog, int which) {
	            	    mBaiduMap.clear();
	            	    shangban=true;
	        			xiaban=false;
	        			initLocation(1100);
	        			showProgressDialog(JSBaiduMapActivity.this,"提示","上班打卡中,请稍候");
	             }
	         }).setNegativeButton("取消",null).setCancelable(false).show();
		
			break;
		case R.id.btn_zoom_in:
			mBaiduMap=mMapView.getMap();
			MapStatus u=mBaiduMap.getMapStatus();
			float tempzz=u.zoom;
			if(tempzz<mBaiduMap.getMaxZoomLevel()){
				tempzz+=1;
			}
			MapStatus mMapStatus = new MapStatus.Builder()
	        .target(u.target)
	        .zoom(tempzz)
	        .build();
			MapStatusUpdate mMapStatusUpdate = MapStatusUpdateFactory.newMapStatus(mMapStatus);
			mBaiduMap.animateMapStatus(mMapStatusUpdate);
			break;
		case R.id.btn_zoom_out:
			mBaiduMap=mMapView.getMap();
			MapStatus uz=mBaiduMap.getMapStatus();
			float tempzo=uz.zoom;
			if(tempzo>mBaiduMap.getMinZoomLevel()){
				tempzo-=1;
			}
			MapStatus mMapStatusz = new MapStatus.Builder()
	        .target(uz.target)
	        .zoom(tempzo)
	        .build();
			MapStatusUpdate mMapStatusUpdatez = MapStatusUpdateFactory.newMapStatus(mMapStatusz);
			mBaiduMap.animateMapStatus(mMapStatusUpdatez);
			break;
		case R.id.my_location:
			mBaiduMap.hideInfoWindow();
			mBaiduMap.clear();
			shangban=xiaban=false;
			initLocation(1100);
			showProgressDialog(JSBaiduMapActivity.this,"提示","正在定位当前位置,请稍候");
			break;
//		case R.id.offline:
//			Intent intent =new Intent(JSBaiduMapActivity.this,OfflineActivity.class);
//			startActivity(intent);
//			break;
		case R.id.choic_type:
			int viewStatus=toolbar1.getVisibility();
//			if(viewStatus==View.GONE){
//				toolbar1.setVisibility(View.VISIBLE);
//			}else{
//				toolbar1.setVisibility(View.GONE);
//			}
			ShowMenu();
			break;
		case R.id.send_card:
			 Intent mIntent4 = new Intent();    
             // 设置结果，并进行传送    
			 mIntent4.putExtra("jsData",jsData.toString());
             setResult(4, mIntent4);  
			 finish();
			break;
		case R.id.work_card:
			 Intent mIntent5 = new Intent();    
             // 设置结果，并进行传送    
			 mIntent5.putExtra("jsData",jsData.toString());
             setResult(5, mIntent5);  
			 finish();
			break;
        default:
        	break;
		}
	}
	
	public void closeLogo(){
	     int childCount = mMapView.getChildCount();
         View zoom = null;
         for (int i = 0; i < childCount; i++) {
                 View child = mMapView.getChildAt(i);
                 if (child instanceof ZoomControls) {
                         zoom = child;
                         break;
                 }
         }
         zoom.setVisibility(View.GONE);

         // 隐藏比例尺控件
         int count = mMapView.getChildCount();
         View scale = null;
         for (int i = 0; i < count; i++) {
                 View child = mMapView.getChildAt(i);
                 if (child instanceof ZoomControls) {
                         scale = child;
                         break;
                 }
         }
         scale.setVisibility(View.GONE);
         mMapView.removeViewAt(1);
         // 隐藏指南针
         mMapView.showZoomControls(false);
         mMapView.showScaleControl(false);
         //初始化点击poi事件
         mBaiduMap.setOnMapClickListener(new OnMapClickListener() {
			@Override
			public boolean onMapPoiClick(MapPoi mapoi) {
				mBaiduMap.hideInfoWindow();
				Button button = new Button(getApplicationContext());
				button.setText(""+mapoi.getName());
				mBaiduMap.showInfoWindow(new InfoWindow(button,mapoi.getPosition(),-40));
				return false;
			}
			
			@Override
			public void onMapClick(final LatLng point) {
				mBaiduMap.hideInfoWindow();
                if(myapp.LocationFlag.equals("工号进入")){
          			// 反Geo搜索
                    showProgressDialog(JSBaiduMapActivity.this,"提示","位置查找中,请稍候");
        			mSearch.reverseGeoCode(new ReverseGeoCodeOption().location(point));
                }
			}
		});
	}
	
	private void alerDialog(String title,String content){
		new AlertDialog.Builder(this).setTitle(title).setMessage(content)
        .setPositiveButton("确定",new DialogInterface.OnClickListener() {//设置确定的按键
             @Override
             public void onClick(DialogInterface dialog, int which) {
             }
         }).setNegativeButton("取消",null).setCancelable(false).show();
		
	}
	 //初始化定位监听
    private void initLocation(int span) {
    	mBaiduMap=mMapView.getMap();
    	mBaiduMap.setMyLocationEnabled(true);
     	LocationClientOption option = new LocationClientOption();
     	option.setOpenGps(true);
     	option.setLocationMode(LocationMode.Hight_Accuracy);
		option.setCoorType("bd09ll");
		option.setScanSpan(span);
		option.setIsNeedAddress(true);
//		if(option.isOpenGps()&& !isOpenNet()){
//			option.setLocationMode(LocationMode.Device_Sensors);
//		}
		mLocationClient.setLocOption(option);
		mLocationClient.start();
	}
    
	/**
	 * 右下角菜单
	 */
    private boolean isShow = false;
    private PopupWindow pw;
	public void ShowMenu() { 
		if(!isShow) {
			LinearLayout ll_temp = (LinearLayout) v_menu.findViewById(R.id.ll_exchangeMenu);
			int w = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
	        int h = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
	        ll_temp.measure(w, h);
	        pw = new PopupWindow(v_menu, ll_temp.getMeasuredWidth(),ll_temp.getMeasuredHeight());
			pw.setFocusable(false);
			pw.setOutsideTouchable(true);
			pw.showAsDropDown(choic_type);
			isShow = true;
		} else {
			pw.dismiss();
			pw = null;
			isShow = false;
		}
	}
	/**
	 * 检查网络wifi 2G 3G网络
	 * 
	 * @return TODO
	 */
	public boolean isOpenNet() {
		ConnectivityManager connManager = (ConnectivityManager) this
				.getApplicationContext().getSystemService(
						Context.CONNECTIVITY_SERVICE);
		NetworkInfo networkInfo = connManager.getActiveNetworkInfo();
		if (networkInfo != null) {
			return networkInfo.isAvailable();
		}
		return false;
	}
	
	public class MyLocationListener implements BDLocationListener {
		@Override
		public void onReceiveLocation(BDLocation location) {
			// Receive Location
			if (location == null) {
				Log.e("location为空", "location为空");
			} else {
				StringBuffer sb = new StringBuffer(256);
				sb.append("time : ");
				sb.append(location.getTime());
				sb.append("\nerror code : ");
				sb.append(location.getLocType());
				sb.append("\nlatitude : ");
				sb.append(location.getLatitude());
				sb.append("\nlontitude : ");
				sb.append(location.getLongitude());
				sb.append("\nradius : ");
				sb.append(location.getRadius());
				if (location.getLocType() == BDLocation.TypeGpsLocation) {
					sb.append("\nspeed : ");
					sb.append(location.getSpeed());
					sb.append("\nsatellite : ");
					sb.append(location.getSatelliteNumber());
					sb.append("\ndirection : ");
					sb.append("\naddr : ");
					sb.append(location.getAddrStr());
					sb.append(location.getDirection());
				} else if (location.getLocType() == BDLocation.TypeNetWorkLocation) {
					sb.append("\naddr : ");
					sb.append(location.getAddrStr());
					sb.append("\noperationers : ");
					sb.append(location.getOperators());
				}
				Log.e("BaiduLocationApiDem", sb.toString());
				if("".equals(location.getLatitude())){
					new AlertDialog.Builder(JSBaiduMapActivity.this).setTitle("提示").setMessage("没有获取定位坐标，请更换位置重定位")
			        .setPositiveButton("确定",null).show();
					return;
				}else if("".equals(location.getLongitude())){
					new AlertDialog.Builder(JSBaiduMapActivity.this).setTitle("提示").setMessage("没有获取定位坐标，请更换位置重定位")
			        .setPositiveButton("确定",null).show();
					return;
				};
				/*
				 * new AlertDialog.Builder(JSBaiduMapActivity.this).setTitle("鎻愮ず").setMessage(location.getLatitude()+"   "+location.getLongitude())
		        .setPositiveButton("纭畾",null).show();*/
				
				JSONObject obj=new JSONObject();
				try {
					jsData.put("Longitude", location.getLongitude());
					jsData.put("Latitude", location.getLatitude());
					jsData.put("Address", location.getAddrStr());
					obj.put("userid",myapp.jsData.getJSONObject(0).getString("USERID"));  
		            obj.put("deviceno",myapp.jsData.getJSONObject(0).getString("DeviceNo")); 
		            obj.put("latitude",location.getLatitude());
		            obj.put("longitude",location.getLongitude());
		            obj.put("PLAN_START_DT", new Date());
		            obj.put("ext1","0");
		            obj.put("ext2","");
		            obj.put("ext3",  location.getAddrStr());
		            obj.put("ext4", "GPS");
		            obj.put("ext5","");
		            obj.put("imsi",myapp.imsi);
		        	if(shangban==true&&xiaban==false){
						obj.put("ext5", "up");
					    wlconn.connect(new MyWLConnLis("usersLocationAction.do?method=addWorkLocation",obj.toString(),JSBaiduMapActivity.this,JSBaiduMapActivity.class,"上班打卡",progressDialog));  
						LatLng point=new LatLng(Double.parseDouble(jsData.optString("Latitude")),Double.parseDouble(jsData.optString("Longitude")));
						MyLocationData locData = new MyLocationData.Builder()
						.accuracy(location.getRadius()/2)
						// 此处设置开发者获取到的方向信息，顺时针0-360
						.direction(100).latitude(location.getLatitude())
						.longitude(location.getLongitude()).build();
				        mBaiduMap.setMyLocationData(locData);
				        mCurrentMode =  com.baidu.mapapi.map.MyLocationConfiguration.LocationMode.FOLLOWING;
				        mBaiduMap.setMyLocationConfigeration(new MyLocationConfiguration(mCurrentMode, true, mCurrentMarker));
				    	MapStatus mMapStatus = new MapStatus.Builder()
		    	        .target(point)
		    	        .zoom(16)
		    	        .build();
				        MapStatusUpdate u = MapStatusUpdateFactory.newMapStatus(mMapStatus);
				        mBaiduMap.animateMapStatus(u);
						// 分发信息
						mLocationClient.stop();
						return ;
		        	}
					if(xiaban==true&&shangban==false){
						obj.put("ext5", "down");
						wlconn.connect(new MyWLConnLis("usersLocationAction.do?method=addWorkLocation",obj.toString(),JSBaiduMapActivity.this,JSBaiduMapActivity.class,"下班打卡",progressDialog));  
						LatLng point=new LatLng(Double.parseDouble(jsData.optString("Latitude")),Double.parseDouble(jsData.optString("Longitude")));
						MyLocationData locData = new MyLocationData.Builder()
						.accuracy(location.getRadius()/2)
						// 此处设置开发者获取到的方向信息，顺时针0-360
						.direction(100).latitude(location.getLatitude())
						.longitude(location.getLongitude()).build();
				        mBaiduMap.setMyLocationData(locData);
				        mCurrentMode =  com.baidu.mapapi.map.MyLocationConfiguration.LocationMode.FOLLOWING;
				        mBaiduMap.setMyLocationConfigeration(new MyLocationConfiguration(mCurrentMode, true, mCurrentMarker));
				    	MapStatus mMapStatus = new MapStatus.Builder()
		    	        .target(point)
		    	        .zoom(16)
		    	        .build();
				        MapStatusUpdate u = MapStatusUpdateFactory.newMapStatus(mMapStatus);
				        mBaiduMap.animateMapStatus(u);
						// 分发信息
						mLocationClient.stop();
						return ;
					}
					//中途打卡
					if(shangban==true&&xiaban==true){
						obj.put("ext5", "mid");
					    wlconn.connect(new MyWLConnLis("usersLocationAction.do?method=addLocation",obj.toString(),JSBaiduMapActivity.this,JSBaiduMapActivity.class,"中途打卡",progressDialog));  
					
					    LatLng point=new LatLng(Double.parseDouble(jsData.optString("Latitude")),Double.parseDouble(jsData.optString("Longitude")));
						MyLocationData locData = new MyLocationData.Builder()
						.accuracy(location.getRadius()/2)
						// 此处设置开发者获取到的方向信息，顺时针0-360
						.direction(100).latitude(location.getLatitude())
						.longitude(location.getLongitude()).build();
				        mBaiduMap.setMyLocationData(locData);
				        mCurrentMode =  com.baidu.mapapi.map.MyLocationConfiguration.LocationMode.FOLLOWING;
				        mBaiduMap.setMyLocationConfigeration(new MyLocationConfiguration(mCurrentMode, true, mCurrentMarker));
				    	MapStatus mMapStatus = new MapStatus.Builder()
		    	        .target(point)
		    	        .zoom(16)
		    	        .build();
				        MapStatusUpdate u = MapStatusUpdateFactory.newMapStatus(mMapStatus);
				        mBaiduMap.animateMapStatus(u);
						// 分发信息
						mLocationClient.stop();
						return ;
					}
					
				} catch (JSONException e) {
					Log.e("定我的位置出错", "error");
					e.printStackTrace();
				}
				
				if (progressDialog != null && progressDialog.isShowing()) {
					progressDialog.dismiss();
				}
				LatLng point=new LatLng(Double.parseDouble(jsData.optString("Latitude")),Double.parseDouble(jsData.optString("Longitude")));
				MyLocationData locData = new MyLocationData.Builder()
				.accuracy(location.getRadius()/2)
				// 此处设置开发者获取到的方向信息，顺时针0-360
				.direction(100).latitude(location.getLatitude())
				.longitude(location.getLongitude()).build();
		        mBaiduMap.setMyLocationData(locData);
		        mCurrentMode =  com.baidu.mapapi.map.MyLocationConfiguration.LocationMode.FOLLOWING;
		        mBaiduMap.setMyLocationConfigeration(new MyLocationConfiguration(mCurrentMode, true, mCurrentMarker));
		    	MapStatus mMapStatus = new MapStatus.Builder()
    	        .target(point)
    	        .zoom(16)
    	        .build();
		        MapStatusUpdate u = MapStatusUpdateFactory.newMapStatus(mMapStatus);
		        mBaiduMap.animateMapStatus(u);
				// 分发信息
				mLocationClient.stop();
			}
		}
	}
	/*
	 * 附近的人打多个点位
	 */
	private void manyPoint(final JSONArray array) {
		mBaiduMap=mMapView.getMap();
		MaikerList=new ArrayList<Marker>();
		List<LatLng> points = new ArrayList<LatLng>();
		int length=array.length();
		for(int i=0;i<length;i++){
			Double tempY=Double.parseDouble(array.optJSONObject(i).optString("MLON"));
			Double tempX=Double.parseDouble(array.optJSONObject(i).optString("MLAT"));
			LatLng point=new LatLng(tempX,tempY);
			//不同的功能,使用不同的图片
			BitmapDescriptor bitmap;
			if(myapp.LocationFlag.equals("我的轨迹")){
				if(length<=1){
					bitmap= BitmapDescriptorFactory  
			        	    .fromResource(R.drawable.hotel);		
				}else{
					bitmap= BitmapDescriptorFactory  
			        	    .fromResource(whtchPng(i));	
					points.add(point);
				}
		  	}else{
		  		bitmap= BitmapDescriptorFactory  
		        	    .fromResource(R.drawable.gas); 
		  	}
				//构建MarkerOption，用于在地图上添加Marker  
	        	OverlayOptions option = new MarkerOptions()  
	        	    .position(point)  
	        	    .icon(bitmap);  
	        	//在地图上添加Marker，并显示  
	        	Marker m=(Marker)mBaiduMap.addOverlay(option);
	        	MaikerList.add(m);
	        if(i==0){
	        	MapStatus mMapStatus = new MapStatus.Builder()
    	        .target(point)
    	        .zoom(16)
    	        .build();
    	        //定义MapStatusUpdate对象，以便描述地图状态将要发生的变化
             MapStatusUpdate mMapStatusUpdate = MapStatusUpdateFactory.newMapStatus(mMapStatus);
                // 改变地图状态
             mBaiduMap.setMapStatus(mMapStatusUpdate);
	        }
	      }
		if(points.size()>1){
			OverlayOptions ooPolyline = new PolylineOptions().width(5)
					.color(0xAAFF0000).points(points);
			mBaiduMap.addOverlay(ooPolyline);	
		}
		mBaiduMap.setOnMarkerClickListener(new OnMarkerClickListener() {
			@Override
			public boolean onMarkerClick(Marker marker) {
				mBaiduMap.hideInfoWindow();
				int length=MaikerList.size();
				for(int i=0;i<length;i++){
					  if(MaikerList.get(i)==marker){
						  //判定是否我的轨迹，是的话显示不同
						  if(myapp.LocationFlag.equals("我的轨迹")){
							  mBaiduMap.showInfoWindow(getNewInforWindow(marker.getPosition(),array.optJSONObject(i).optString("USERNAME"),array.optJSONObject(i).optString("CONTENT")+"\n"+"时间:"+array.optJSONObject(i).optString("TIME"),array.optJSONObject(i).optString("PHONENO"))); 
						  }else if(myapp.LocationFlag.equals("工号进入")){
							    Button button = new Button(getApplicationContext());
								button.setText(""+array.optJSONObject(0).optString("ASSET_NUM"));
								mBaiduMap.showInfoWindow(new InfoWindow(button,marker.getPosition(),-40));
						  }else{
							  mBaiduMap.showInfoWindow(getNewInforWindow(marker.getPosition(),array.optJSONObject(i).optString("USERNAME"),array.optJSONObject(i).optString("CONTENT"),array.optJSONObject(i).optString("PHONENO"))); 
						  }
					  }
				}
				return false;
			}
		});
	}
	
	/*
	 * 弹出一个装载当前点的inforWindow
	 */
	public InfoWindow getNewInforWindow(LatLng point,String titles,String content,final String phone){
		View view =View.inflate(JSBaiduMapActivity.this, R.layout.infowindom,null);
	    TextView titleText=(TextView)view.findViewById(R.id.titleText);
		titleText.setText(titles);
	    TextView contentText=(TextView)view.findViewById(R.id.contentText);
	    contentText.setText(content);
	    LinearLayout fontLiner=(LinearLayout)view.findViewById(R.id.fontLiner);
	    fontLiner.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				mBaiduMap.hideInfoWindow();
			}
		});
	    
	    
	    
	    final ImageView imageleftView= (ImageView)view.findViewById(R.id.leftIcon);
	    
		imageleftView.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Uri uri;
				uri = Uri.parse("tel:"+phone);
				Intent intent = new Intent(Intent.ACTION_DIAL, uri);
				startActivity(intent);
				mBaiduMap.hideInfoWindow();
			}
		});	
		final ImageView imagerightView=(ImageView)view.findViewById(R.id.rightIcon);
		imagerightView.setOnFocusChangeListener(new OnFocusChangeListener() {
			
			@Override
			public void onFocusChange(View v, boolean hasFocus) {
				if(hasFocus){
					imagerightView.setBackgroundColor(R.color.black);
				}else{
					imagerightView.setBackgroundColor(R.color.white);
				}
			}
		});
		imagerightView.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Uri uriz ;
			    uriz= Uri.parse("smsto:"+phone); 
		        Intent intent = new Intent(Intent.ACTION_SENDTO, uriz);  
		        startActivity(intent);
		        mBaiduMap.hideInfoWindow();
			}
		});	
		return new InfoWindow(view, point, -47);
	}
	
	
	  /*
	   * 提示加载
	   */
	  public  void showProgressDialog(Activity activity,String title, String message) {
	    if (progressDialog == null) {
	    	progressDialog = ProgressDialog.show(activity, title,
	          message, true, false);
	    }else{
	    	progressDialog.setTitle(title);
	    	progressDialog.setMessage(message);
	    }
	   progressDialog.show();
	  }
	
	
	
	  class MyWLConnLis implements WLResponseListener {
			private String url = "";
			private String params_str = "";
			private Activity NowActivity;
			private Class NextClass;
			private String LocationFlag = "";
			private ProgressDialog progressDialog;   //正在加载中,加载框 
			private void MyWLConnList() {
			}
			public MyWLConnLis(String url, String params,Activity NowActivity,Class NextClass, String flag,ProgressDialog progressDialog) {
				this.url = url;
				this.params_str = params;
				this.NowActivity = NowActivity;
				this.NextClass=NextClass;
				this.LocationFlag = flag;	
				this.progressDialog=progressDialog;
			}
			@Override
			public void onFailure(WLFailResponse arg0) {
			}
			@Override
			public void onSuccess(WLResponse arg0) {
				WLProcedureInvocationData invkeData = new WLProcedureInvocationData("HttpAdapter_PDA", "getStories_pda");
				Object[] params = new Object[]{url,params_str};
				invkeData.setParameters(params);
				WLRequestOptions wloption = new WLRequestOptions();
				wloption.setTimeout(180000);
				WLClient wlclient = WLClient.getInstance();
				wlclient.invokeProcedure(invkeData, new MyWLInvoke(NowActivity,progressDialog), wloption);
			}
			private class MyWLInvoke implements WLResponseListener {
				private Activity NowActivity;
				private JSONObject obk=new JSONObject();
				private ProgressDialog progressDialog;
				private JSBaiduMapActivity activity;
				private void MyWLInvoke() {
				}
				public MyWLInvoke(Activity NowActivity,ProgressDialog progressDialog) {
					this.NowActivity = NowActivity;
					this.progressDialog=progressDialog;
				}
				
				@Override
				public void onFailure(WLFailResponse arg0) {
				}
				@Override
				public void onSuccess(WLResponse arg0) {
					try {
						if (Looper.myLooper() == null) {
								Looper.prepare();
							}
//					String tempString=arg0.getResponseText();
					String tempC=arg0.getResponseJSON().optString("content");
//				    String tempV=tempString.substring(tempString.indexOf("{msgid"),tempString.indexOf("responseID"));
//					String tempC=tempV.substring(0,tempV.indexOf("}"))+"}";
				    obk= new JSONObject(tempC);
						if("上班打卡".equals(LocationFlag)){
							myapp.toast.setText(obk.optString("msginfo"));
							myapp.toast.show();
						}else if("下班打卡".equals(LocationFlag)){
							myapp.toast.setText(obk.optString("msginfo"));
							myapp.toast.show();
						}else if("工号打卡".equals(LocationFlag)){
							myapp.toast.setText(obk.optString("msginfo"));
							myapp.toast.show();
						}else if("中途打卡".equals(LocationFlag)){
							myapp.toast.setText(obk.optString("msginfo"));
							myapp.toast.show();
						}
					}catch (Exception e) {
						e.printStackTrace();
					}finally{
						if (progressDialog != null && progressDialog.isShowing()) {
							progressDialog.dismiss();
						}
					}
				}
			}
		}
	  
	  //监听返回按键 
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		
		 if (keyCode == KeyEvent.KEYCODE_BACK
                 && event.getRepeatCount() == 0) {
			 Intent mIntent = new Intent();    
             // 设置结果，并进行传送    
			 mIntent.putExtra("jsData",jsData.toString());
             setResult(0, mIntent);  
			 finish();
             return true;
         }
		
		return super.onKeyDown(keyCode, event);
	}
	  
	  
	//Activity 生命周期--------------------------↓↓
		@Override  
	    protected void onDestroy() {  
	        super.onDestroy();  
	        //在activity执行onDestroy时执行mMapView.onDestroy()，实现地图生命周期管理  
	        Log.e("摧毁BaiduMapActivity", "摧毁了");
	        //unregisterReceiver(mBroadcastReceiver);
	        //mLocationClient.stop();
	        mBaiduMap.setMyLocationEnabled(false);
	        mMapView.onDestroy();  
	    	if(mSearch!=null){
	    		mSearch.destroy();
	    	}
	        //取消广播
	    }  
		
	    @Override  
	    protected void onResume() {  
	        super.onResume();  
	        //在activity执行onResume时执行mMapView. onResume ()，实现地图生命周期管理  
	        mMapView.onResume();  
	        }  
	    @Override  
	    protected void onPause() {  
	        super.onPause();  
	        //在activity执行onPause时执行mMapView. onPause ()，实现地图生命周期管理  
	        mMapView.onPause();  
	        }


		@Override
		public void onGetGeoCodeResult(final GeoCodeResult result) {
		}
        

		@Override
		public void onGetReverseGeoCodeResult(final ReverseGeoCodeResult result) {
			if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
				Toast.makeText(JSBaiduMapActivity.this, "抱歉，未能找到该点地址结果", Toast.LENGTH_LONG)
						.show();
				return;
			}
			if (progressDialog != null && progressDialog.isShowing()) {
				progressDialog.dismiss();
			}
			mBaiduMap.clear();
			mBaiduMap.addOverlay(new MarkerOptions().position(result.getLocation())
					.icon(BitmapDescriptorFactory.fromResource(R.drawable.hotel)));
			mBaiduMap.setMapStatus(MapStatusUpdateFactory.newLatLng(result.getLocation()));
			//Toast.makeText(JSBaiduMapActivity.this, strInfo+"地址:"+result.getAddress(), Toast.LENGTH_LONG).show();
           	
			new AlertDialog.Builder(JSBaiduMapActivity.this).setTitle("提示").setMessage("是否将坐标:("+result.getLocation().longitude+","+result.getLocation().latitude+"),地址:"+result.getAddress()+"设置为工号坐标")
            .setPositiveButton("确定",new DialogInterface.OnClickListener() {//设置确定的按键
                 @Override
                 public void onClick(DialogInterface dialog, int which) {
                     JSONObject obj=new JSONObject();
                     try{
                    	 JSONArray json=new JSONArray(myapp.jsData.optJSONObject(0).optString("obz"));
                    	 obj.put("X", result.getLocation().longitude);
                    	 obj.put("Y", result.getLocation().latitude);
                    	 obj.put("ADDRESS", result.getAddress());
                    	 obj.put("MP_ID", json.optJSONObject(0).optString("MP_ID"));
                    	 obj.put("ELEVATOR_NO", json.optJSONObject(0).optString("ASSET_NUM"));
                    	 obj.put("PERSON_ID", json.optJSONObject(0).optString("PERSON_ID"));
                     }catch(Exception e){
                    	 e.printStackTrace();
                     }
                     showProgressDialog(JSBaiduMapActivity.this,"提示","工号上传中,请稍候");
                	 wlconn.connect(new MyWLConnLis("maintainancePlanItemListAction.do?method=toADDASSETCard",obj.toString(),JSBaiduMapActivity.this,JSBaiduMapActivity.class,"工号打卡",progressDialog));          
                 }
             }).setNegativeButton("取消",null).setCancelable(false).show();
		}


		//选择图片
		  private int whtchPng(int i) {
				int k=0;
				switch(i){
				case 0:   k=R.drawable.pin_1;  break;
				case 1:   k=R.drawable.pin_2;  break;
				case 2:   k=R.drawable.pin_3;  break;
				case 3:   k=R.drawable.pin_4;  break;
				case 4:   k=R.drawable.pin_5;  break;
				case 5:   k=R.drawable.pin_6;  break;
				case 6:   k=R.drawable.pin_7;  break;
				case 7:   k=R.drawable.pin_8;  break;
				case 8:   k=R.drawable.pin_9;  break;
				case 9:   k=R.drawable.pin_10; break;
				case 10:  k=R.drawable.pin_11; break;
				case 11:  k=R.drawable.pin_12; break;
				case 12:  k=R.drawable.pin_13; break;
				case 13:  k=R.drawable.pin_14; break;
				case 14:  k=R.drawable.pin_15; break;
				case 15:  k=R.drawable.pin_16; break;
				case 16:  k=R.drawable.pin_17; break;
				case 17:  k=R.drawable.pin_18; break;
				case 18:  k=R.drawable.pin_19; break;
				case 19:  k=R.drawable.pin_20; break;
				case 20:  k=R.drawable.pin_21; break;
				case 21:  k=R.drawable.pin_22; break;
				case 22:  k=R.drawable.pin_23; break;
				case 23:  k=R.drawable.pin_24; break;
				case 24:  k=R.drawable.pin_25; break;
				case 25:  k=R.drawable.pin_26; break;
				case 26:  k=R.drawable.pin_27; break;
				case 27:  k=R.drawable.pin_28; break;
				case 28:  k=R.drawable.pin_29; break;
				case 29:  k=R.drawable.pin_30; break;
				case 30:  k=R.drawable.pin_31; break;
				case 31:  k=R.drawable.pin_32; break;
				case 32:  k=R.drawable.pin_33; break;
				case 33:  k=R.drawable.pin_34; break;
				case 34:  k=R.drawable.pin_35; break;
				case 35:  k=R.drawable.pin_36; break;
				case 36:  k=R.drawable.pin_37; break;
				case 37:  k=R.drawable.pin_38; break;
				case 38:  k=R.drawable.pin_39; break;
				case 39:  k=R.drawable.pin_40; break;
				case 40:  k=R.drawable.pin_41; break;
				case 41:  k=R.drawable.pin_42; break;
				case 42:  k=R.drawable.pin_43; break;
				case 43:  k=R.drawable.pin_44; break;
				case 44:  k=R.drawable.pin_45; break;
				case 45:  k=R.drawable.pin_46; break;
				case 46:  k=R.drawable.pin_47; break;
				case 47:  k=R.drawable.pin_48; break;
				case 48:  k=R.drawable.pin_49; break;
				case 49:  k=R.drawable.pin_50; break;
					default:
						k=R.drawable.pin_50_;
						break;
				}
				return k;
				
			}
	
	
}
