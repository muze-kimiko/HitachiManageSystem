package com.HelcPDA;

import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.UUID;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningServiceInfo;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Point;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.widget.Toast;

import com.HelcPDA.resource.Config;
import com.HelcPDA.resource.DemoConfig;
//import com.HelcPDA.resource.DemoMapView;
import com.HelcPDA.resource.MyWLConnLis;
import com.HelcPDA.service.LocationService;
/*
import com.mapbar.android.location.CellLocationProvider;
import com.mapbar.android.location.LocationListener;
import com.mapbar.map.Annotation;
import com.mapbar.map.CalloutStyle;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.Vector2D;
import com.mapbar.mapdal.Auth;
import com.mapbar.mapdal.GpsTracker;
import com.mapbar.mapdal.MapbarGpsInfo;
import com.mapbar.mapdal.NativeEnv;
import com.mapbar.mapdal.NativeEnvParams;
import com.mapbar.mapdal.SdkAuth;
import com.mapbar.mapdal.WorldManager;
import com.mapbar.poiquery.PoiQuery;
import com.mapbar.poiquery.PoiQueryInitParams;
import com.mapbar.poiquery.ReverseGeocoder;
import com.mapbar.poiquery.ReverseGeocoder.EventHandler;
import com.mapbar.poiquery.ReverseGeocoderDetail;
*/
import com.worklight.wlclient.api.WLClient;


public class MapMain extends CordovaPlugin{

	//地图控制类
	Timer timer;
	String getStyle=null;
	int longitude,latitude;
	JSONArray temp;
	//测试key
	//public static final String KEY = "zxb284-20131219-02-Z-T-A1101";
	//正式key
	public static final String KEY = "zxb284-20131219-02-Z-F-A10010";
	//应用跟目录
	private String mAppPath = null;
	//应用名
	private  String mAppName = null;
	//dpi
	public static String Address;
	public static JSONArray args;
	private  int mDensityDpi = 0; 
	public static Point point;
//	private ReverseGeocoder mReverse;
	/** 监听对象 */
//	private CellLocationProvider mCellLocationProvider;
	/** 定位监听类 */
//	private MyLocationListener mListener;
	
	private String action=null;  //区分是定时任务还是点击地图
	
	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		this.args=args;
		this.action=action;
		String message = args.getJSONObject(0).getString("USERID");
		if(action.equals("initmapbar")){
		          getTBMap();  
		}
		if(action.equals("initTimer")){
			 String canUseMap=this.args.optJSONObject(0).optString("canUseMap");
			 Log.e("canUseMap", canUseMap);
			 if("ok".equals(canUseMap)){
				 Intent i  = new Intent(cordova.getActivity(),LocationService.class);  
				 i.putExtra("args",args.toString());
				 cordova.getActivity().startService(i);	 
			 }else{
				 Log.e("第一次拦截：非地图使用人员", "暂无此功能");
			 }
		}
		if(action.equals("stopService")){
			//关闭服务	
			Boolean istrue=isServiceExisted(cordova.getActivity(),".service.LocationService");
			if(istrue){
				Intent mIntent = new Intent("发送广播");  
	            cordova.getActivity().sendBroadcast(mIntent);  
			}else{
			}
		
			
		}
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				    callbackContext.success();
			}
		});
		return true;
	}

	   
	    
	
	 
	 public static boolean isServiceExisted(Context context, String className) {
	        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
	        List<ActivityManager.RunningServiceInfo> serviceList = activityManager.getRunningServices(Integer.MAX_VALUE);
	        if(!(serviceList.size() > 0)) {
	            return false;
	        }
	        for(int i = 0; i < serviceList.size(); i++) {
	            RunningServiceInfo serviceInfo = serviceList.get(i);
	            ComponentName serviceName = serviceInfo.service;
	            if(serviceName.getClassName().equals(className)) {
	                return true;
	            }
	            if(serviceName.getShortClassName().equals(className)) {
	                return true;
	            }
	        } 
	        return false;
	    }
	
	/**
	 * 初始化图吧定位
	 */
	private void init() {
		//判断是否有网络
		if(!isOpenNet()&&!isOpenGps()){
			//没有网络,直接进地图,提示:当前无网络
			Intent intent=new Intent(cordova.getActivity(),MapViewActivity.class);
			cordova.getActivity().startActivity(intent);
			Toast.makeText(cordova.getActivity(), "请开启网络", Toast.LENGTH_SHORT).show();
		}else{
		}
		//初始化定位
	 	initLocation();
		// 初始化POI搜索引擎
		try {
			/*// 如果授權不通過那麼將拋出異常
			PoiQueryInitParams param = new PoiQueryInitParams();
			PoiQuery.getInstance().init(param);
			mReverse = new ReverseGeocoder((EventHandler) this);
			mReverse.setMode(ReverseGeocoder.Mode.online);*/
			//Toast.makeText(cordova.getActivity(), "授权通过", Toast.LENGTH_SHORT).show();
		} catch (Exception e) {
			// ！！！此處應該添加保護，如果初始化不成功那麼後續使用PoiQuery相關功能將崩潰！！！
		}
	}
	
	/**
	 * 初始化定位
	 */
	private void initLocation() {
		try {
			/*mListener = new MyLocationListener();
			// 创建定位的CellLocationProvider
			mCellLocationProvider = new CellLocationProvider(cordova.getActivity(),KEY);
			// 添加定位的监听
			mCellLocationProvider.addLocationListener(mListener);
			// 启动基站定位
			mCellLocationProvider.enableLocation();
			// 启动gps定位
			mCellLocationProvider.enableGPS();*/
			
		} catch (Exception e) {
			//Toast.makeText(cordova.getActivity(), e.getMessage(), Toast.LENGTH_SHORT).show();
			e.printStackTrace();
		}
	}
	
	/**
	 * 定位监听类
	 * @author malw
	 */
	/*class MyLocationListener implements LocationListener{
		*//**
         * 基站定位监听结果的回调方法，对应需要调用mCellLocationProvider.enableLocation()
         *//*
		@Override
		public void onLocationChangedByCell(Location location) {
			//处理定位信息
			locationInfo(location);
		}
		
		*//**
         * GPS定位监听结果的回调方法 ，对应需要调用mCellLocationProvider.enableGPS()
         *//*
		@Override
		public void onLocationChangedByGPS(Location location) {
			//处理定位信息
			locationInfo(location);
		}
	}*/
	
	/**
	 * 更加定位经纬度 设置地图中心点和显示定位信息
	 * @param location
	 */
	public void locationInfo(Location location){
		try {
			if (location != null) {
				//获取定位经纬度
				point = new Point((int)(location.getLongitude()*1E5),(int)(location.getLatitude()*1E5));
				Bundle bundle = location.getExtras();
				 final WLClient wlconn = WLClient.createInstance(cordova.getActivity());
				 String imsi;
		            TelephonyManager telephonyManager = (TelephonyManager)cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
		    		imsi = telephonyManager.getSubscriberId();
				 if (bundle != null) {
					 Address = bundle.getString("address");
					if(Address!=null){
						//初始化点坐标
						longitude=(int)(location.getLongitude()*1E5);
						latitude=(int)(location.getLatitude()*1E5);
						if(longitude!=0&&latitude!=0){
							Point point=new Point(longitude, latitude);
							Config.centerPoint=point;
							this.args.optJSONObject(0).put("PDA3", "PDA3");
							this.args.optJSONObject(0).put("Longitude", location.getLongitude());
							this.args.optJSONObject(0).put("Latitude", location.getLatitude());
						    
						}
						if(action.equals("initTimer")){
							//发送请求到远程后台,插入数据
							UUID uuid=null;
							JSONObject obj=new JSONObject();
					            Date date=new Date();
					            obj.put("userid",args.getJSONObject(0).getString("USERID"));  
					            obj.put("deviceno",args.getJSONObject(0).getString("DeviceNo")); 
					            obj.put("latitude",location.getLatitude());
					            obj.put("longitude",(location.getLongitude()+"")+"1");
					            obj.put("PLAN_START_DT", date);
					            obj.put("ext1","0");
					            obj.put("ext2","");
					            obj.put("ext3", Address);
					            obj.put("ext4", "GPS");
					            obj.put("ext5","");
					            obj.put("imsi",imsi);
					            MapMain.args.getJSONObject(0).put("PDA3", "PDA3");
					            MapMain.args.getJSONObject(0).put("imsi", imsi);
						}else{
							if(action.equals("initmapbar")){
								MapMain.args.getJSONObject(0).put("imsi", imsi);
								Intent intent=new Intent(cordova.getActivity(),MapViewActivity.class);
								cordova.getActivity().startActivity(intent);
								action="initTimer";
							}
						}
					}
				}
				closeGPS();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 结束定位
	 */
	public void  closeGPS(){/*
		  if(mCellLocationProvider!=null){
			  try {
		        	mCellLocationProvider.disableLocation();
		        	mCellLocationProvider.clearLocationListener();	
			} catch (Exception e) {
				e.printStackTrace();
			}
	        }
	*/}
	
	/**
	 * 授权
	 */
	public void getTBMap(){
		mAppPath = Environment.getExternalStorageDirectory().getPath()+"/mapbar/app";
		// 应用程序名称，可随意设置
		mAppName = "qyfw";
		// 获取屏幕对应的DPI
		Display display = cordova.getActivity().getWindowManager().getDefaultDisplay();
		DisplayMetrics dm = new DisplayMetrics();
		display.getMetrics(dm);
		mDensityDpi = dm.densityDpi;
		NativeEnvironmentInit(mAppName,KEY);
	}

	public void NativeEnvironmentInit(String appName, String key) {/*
		NativeEnvParams params = new NativeEnvParams(mAppPath, appName,
				mDensityDpi, key, new NativeEnv.AuthCallback() {
					@Override
					public void onDataAuthComplete(int errorCode) {
						String msg = null;
						switch(errorCode){
						case Auth.Error.deviceIdReaderError:
							msg="设备ID读取错误";
							break;
						case Auth.Error.expired:
							msg="数据文件权限已经过期";
							break;
						case Auth.Error.licenseDeviceIdMismatch:
							msg="授权文件与当前设备不匹配";
							break;
						case Auth.Error.licenseFormatError:
							msg="授权文件格式错误";
							break;
						case Auth.Error.licenseIncompatible:
							msg="授权文件存在且有效，但是不是针对当前应用程序产品的";
							break;
						case Auth.Error.licenseIoError:
							msg="授权文件IO错误";
							break;
						case Auth.Error.licenseMissing:
							msg="授权文件不存在";
							break;
						case Auth.Error.none:
							msg="数据授权成功";
							break;
						case Auth.Error.noPermission:
							msg="数据未授权";
							break;
						case Auth.Error.otherError:
							msg="其他错误";
							break;
						}
					}
					
					@Override
					public void onSdkAuthComplete(int errorCode) {
						String msg=null;
						switch(errorCode){
						case SdkAuth.ErrorCode.deviceIdReaderError:
							msg="授权设备ID读取错误";
							break;
						case SdkAuth.ErrorCode.expired:
							msg="授权KEY已经过期";
							break;
						case SdkAuth.ErrorCode.keyIsInvalid:
							msg="授权KEY是无效值，已经被注销";
							break;
						case SdkAuth.ErrorCode.keyIsMismatch:
							msg="授权KEY不匹配";
							break;
						case SdkAuth.ErrorCode.keyUpLimit:
							msg="授权KEY到达激活上线";
							break;
						case SdkAuth.ErrorCode.licenseDeviceIdMismatch:
							msg="设备码不匹配";
							break;
						case SdkAuth.ErrorCode.licenseFormatError:
							msg="SDK授权文件格式错误";
							break;
						case SdkAuth.ErrorCode.licenseIoError:
							msg="SDK授权文件读取错误";
							break;
						case SdkAuth.ErrorCode.licenseMissing:
							msg="SDK授权文件没有准备好";
							break;
						case SdkAuth.ErrorCode.networkContentError:
							msg="网络返回信息格式错误";
							break;
						case SdkAuth.ErrorCode.netWorkIsUnavailable:
							msg="网络不可用，无法请求SDK验证";
							break;
						case SdkAuth.ErrorCode.none:
							msg="SDK验证通过";
							break;
						case SdkAuth.ErrorCode.noPermission:
							msg="模块没有权限";
							break;
						case SdkAuth.ErrorCode.otherError:
							msg="其他错误";
							break;
						}
					}
				});
		NativeEnv.init(cordova.getActivity().getApplicationContext(), params);
		WorldManager.getInstance().init();
		//验证完成，开始查找位置信息
		init();
	*/}
	
	/**
	 * 检查网络wifi 2G 3G网络
	 * 
	 * @return TODO
	 */
	public boolean isOpenNet() {
		ConnectivityManager connManager = (ConnectivityManager) cordova.getActivity()
				.getApplicationContext().getSystemService(
						Context.CONNECTIVITY_SERVICE);
		NetworkInfo networkInfo = connManager.getActiveNetworkInfo();
		if (networkInfo != null) {
			return networkInfo.isAvailable();
		}
		return false;
	}
	/**
	 * 检查gps是否开启
	 * @return
	 */
	public boolean isOpenGps(){
		return Settings.Secure.isLocationProviderEnabled(cordova.getActivity().getContentResolver(), LocationManager.GPS_PROVIDER);
	}
	 
	Handler handler = new Handler() {  
	    @Override  
	    public void handleMessage(Message msg) {  
	        // 要做的事情  
	    	switch(msg.what){
	    	case 100:
	    		getTBMap();   //定时查找的数据
	    		break;
	    	default:
	    		break;
	    	}
	        super.handleMessage(msg);  
	    }  
	};

	public void handleResultForCommit(String res,Activity ctx,Class Ntx){
		//隐藏加载框
		
	}
}
