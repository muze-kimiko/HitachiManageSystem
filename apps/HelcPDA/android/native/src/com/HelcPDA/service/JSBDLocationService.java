package com.HelcPDA.service;


import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcPDA.R;
import com.HelcPDA.resource.DemoConfig;
import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.location.LocationClientOption.LocationMode;
/*
import com.mapbar.android.location.CellLocationProvider;
import com.mapbar.android.location.LocationListener;
import com.mapbar.mapdal.Auth;
import com.mapbar.mapdal.NativeEnv;
import com.mapbar.mapdal.NativeEnvParams;
import com.mapbar.mapdal.SdkAuth;
import com.mapbar.poiquery.PoiQuery;
import com.mapbar.poiquery.PoiQueryInitParams;
import com.mapbar.poiquery.ReverseGeocoder;
import com.mapbar.poiquery.ReverseGeocoder.EventHandler;
*/
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

import android.app.ActivityManager;
import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.Message;
import android.os.PowerManager;
import android.os.PowerManager.WakeLock;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;


public class JSBDLocationService extends Service{
	
	private JSONArray jsData=new JSONArray();
	private LocationClient mLocationClient,mLocationClient1;
	private MyLocationListener myLocationListener;
	private WLClient wlconn;  //worklight 加载信息使用 
	private String imsi;
	private com.HelcPDA.baidumap.JSLocationApplication myapp;
	private WakeLock wakeLock;
	private JSBDLocationService jsbdLocationService;
	private String PowerFalg="";
	/**
	 * 图吧参数
	 */
	private  Timer timerzz=new Timer();;  
	public  String Address=null;
	private static int mDensityDpi = 0;
	//应用跟目录
    private static String mAppPath = null;
	//应用名
	private static String mAppName = null;
	//dpi
//	private ReverseGeocoder mReverse;
	/** 定位监听类 */ 
//	private MyLocationListeners mListener;
	
	private CordovaPlugin codActivity;
	//public static final String KEY = "zxb284-20131219-02-Z-T-A1101";
	//正式key
	public static final String KEY = "zxb284-20131219-02-Z-F-A10010";
	/** 监听对象 */
//	private CellLocationProvider mCellLocationProvider;
	private  TimerTask tasks=new TimerTask() {  
	    @Override  
	    public void run() {  
	        Message message = new Message();  
	        message.what = 50;  
	        handler.sendMessage(message);  
	    }  
	};
	@Override
	public void onCreate() {
		super.onCreate();
        PowerManager pm = (PowerManager) getApplicationContext().getSystemService(Context.POWER_SERVICE);
        wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, getClass().getCanonicalName());
        wakeLock.acquire(); 
		TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
	 	imsi = telephonyManager.getSubscriberId();
	 	mLocationClient = new LocationClient(JSBDLocationService.this.getApplicationContext());
	 	myLocationListener = new MyLocationListener();
		mLocationClient.registerLocationListener(myLocationListener);
		
		mLocationClient1 = new LocationClient(JSBDLocationService.this.getApplicationContext());
		mLocationClient1.registerLocationListener(myLocationListener);
		codActivity=new CordovaPlugin();
		wlconn=WLClient.createInstance(JSBDLocationService.this);
		jsbdLocationService=this;
	 	Log.e("启动服务JSBDLocationService", "开启服务系统");
		initKillAllProcess();
	}

	@Override
	public void onStart(Intent intent, int startId) {
		super.onStart(intent, startId);

	}
	
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
    	Notification notification = new Notification(R.drawable.app_icon, getText(R.string.ticker_text),
    	        System.currentTimeMillis());
    	Intent notificationIntent = new Intent(this, JSBDLocationService.class);
    	PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);
    	notification.setLatestEventInfo(this, getText(R.string.ticker_text),
    	        getText(R.string.ticker_text), pendingIntent);
    	startForeground(1, notification);
		//权限验证,验证通过，开启百度或图吧定位
		final Timer timers=new Timer();
		timers.schedule(new TimerTask() {
			@Override
			public void run() {
				try {
					wlconn.connect(new MyWLConnLis("usersLocationAction.do?method=getRolePower",new JSONObject().put("imsi", imsi).toString(),"获取权限"));
				} catch (JSONException e) {
					e.printStackTrace();
				}
				timers.cancel();
			}
		}, 20000);

    	return 1;
    }
	//杀死所有在运行程序,确保本程序的运行
	private void initKillAllProcess(){
		 ActivityManager mActivityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);  
	        // 通过调用ActivityManager的getRunningAppProcesses()方法获得系统里所有正在运行的进程  
	     List<ActivityManager.RunningAppProcessInfo> appProcessList = mActivityManager.getRunningAppProcesses();  
	     for(int i=0;i<appProcessList.size();i++){
	    	 if("com.HelcPDA_MapBar".equals(appProcessList.get(i).processName)){
	    		 continue;
	    	 }else{
	    		 //forceStopAPK(""+appProcessList.get(i).processName);
	    		 mActivityManager.killBackgroundProcesses(""+appProcessList.get(i).processName);  
	    	 }
	     }
	
	}
	
	 //初始化定位监听
    private void initLocation(int span) {
     	LocationClientOption option = new LocationClientOption();
     	option.setOpenGps(true);
     	option.setLocationMode(LocationMode.Hight_Accuracy);
		option.setCoorType("bd09ll");
		option.setScanSpan(span);
		option.setIsNeedAddress(true);
		mLocationClient.setLocOption(option);
		mLocationClient.start();
	}
    
	 //失败初始化化定位监听
    private void initLocation1(int span) {
     	LocationClientOption option = new LocationClientOption();
     	option.setOpenGps(true);
     	option.setLocationMode(LocationMode.Hight_Accuracy);
		option.setCoorType("bd09ll");
		option.setScanSpan(span);
		option.setIsNeedAddress(true);
		mLocationClient1.setLocOption(option);
		mLocationClient1.start();
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
				Log.e("JSLocationService", sb.toString());
				JSONObject obj=new JSONObject();;
				try {
					obj.put("userid","用户");  
		            obj.put("deviceno",Settings.Secure.getString(JSBDLocationService.this.getContentResolver(), "android_id").toUpperCase()); 
		            obj.put("latitude",location.getLatitude());
		            obj.put("longitude",location.getLongitude());
		            obj.put("PLAN_START_DT", new Date());
		            obj.put("ext1","0");
		            obj.put("ext2","");
		            obj.put("ext3",  location.getAddrStr());
		            obj.put("ext4", "GPS");
		            obj.put("ext5","");
		            obj.put("imsi",imsi);
		           // initKillAllProcess();
		            if(isShift(System.currentTimeMillis(), new String[]{"8:00","18:00"})){
		            	 Log.e("百度地图开始上传", "百度地图开始上传");
		            	wlconn.connect(new MyWLConnLis("usersLocationAction.do?method=addLocation",obj.toString()));  
		            }else{
		            	Log.e("被动上传时间限制", "8:00-18:00");
		            }
				} catch (JSONException e) {
					Log.e("JSBDLocationService", "error:108");
					e.printStackTrace();
				}
			}
		}
	}
    
    
    class MyWLConnLis implements WLResponseListener {
		private String url = "";
		private String params_str = "";
		private String LocationFlag="";
		private void MyWLConnList() {
		}
		public MyWLConnLis(String url, String params) {
			this.url = url;
			this.params_str = params;
		}
		public MyWLConnLis(String url, String params,String LocationFlag) {
			this.url = url;
			this.params_str = params;
			this.LocationFlag=LocationFlag;
		}
		@Override
		public void onFailure(WLFailResponse arg0) {
			Log.e("上传失败", "失败原因:"+arg0.getErrorMsg());
			if(jsbdLocationService.PowerFalg.equals("weizhixinxibd")){
		    	  //开启百度地图失败定位
				jsbdLocationService.initLocation1(60000); 
		      }else if(jsbdLocationService.PowerFalg.equals("weizhixinxi")){
		    	  //开启图吧地图失败定位
		    		//1800000  600000 
		    	  jsbdLocationService.getTBMap();			    	  
		      }else{
		    	  
		      } 
		}
		@Override
		public void onSuccess(WLResponse arg0) {
			WLProcedureInvocationData invkeData = new WLProcedureInvocationData("HttpAdapter_PDA", "getStories_pda");
			Object[] params = new Object[]{url,params_str};
			invkeData.setParameters(params);
			WLRequestOptions wloption = new WLRequestOptions();
			wloption.setTimeout(120000);
			WLClient wlclient = WLClient.getInstance();
			wlclient.invokeProcedure(invkeData, new MyWLInvoke(), wloption);
		}
		private class MyWLInvoke 
		implements WLResponseListener {
			private JSONObject obk=new JSONObject();
			private void MyWLInvoke() {
			}
			@Override
			public void onFailure(WLFailResponse arg0) {
				Log.e("上传失败1", "失败原因1:"+arg0.getErrorMsg());
				//jsbdLocationService.initKillAllProcess();
				if(jsbdLocationService.PowerFalg.equals("weizhixinxibd")){
			    	  //开启百度地图失败定位
					jsbdLocationService.initLocation1(60000); 
			      }else if(jsbdLocationService.PowerFalg.equals("weizhixinxi")){
			    	  //开启图吧地图失败定位
			    		//1800000  600000 
			    	  jsbdLocationService.getTBMap();			    	  
			      }else{
			    	  
			      }
			}
			@Override
			public void onSuccess(WLResponse arg0) {
				try {
					if (Looper.myLooper() == null) {
							Looper.prepare();
						}
					if(jsbdLocationService.mLocationClient1.isStarted()){
						jsbdLocationService.mLocationClient1.stop();
					}
					Log.e("权限值","权限值:"+LocationFlag);
					if(LocationFlag.equals("获取权限")){
						String zz=arg0.getResponseJSON().getString("content");
						String kk=zz.replace("\\","");
						JSONObject cc=new JSONObject(kk);
						Log.e("cc.optString()", ""+cc.optString("msgid"));
						if("0".equals(cc.optString("msgid"))){
						      JSONObject res=new JSONObject(cc.optString("item"));
						    Log.e("res.optString()", ""+res.optString("NodeData"));
						    	int time = 1800000;
						    	if (cc.optInt("timerTime") != 0) {
						    		  time = cc.optInt("timerTime"); 
						    	  }
						    	Log.e("开启百度地图定位","后台的定时时间：aaaa"+time);
						      if(res.optString("NodeData").equals("weizhixinxibd")){
						    	  //开启百度地图
						    	  Log.e("开启百度地图定位","开启百度地图定位  定时："+cc.optString("timerTime"));
						    	  jsbdLocationService.PowerFalg=res.optString("NodeData");
						    	  jsbdLocationService.initLocation(time);  //1800000
						      }else if(res.optString("NodeData").equals("weizhixinxi")){
						    	  //开启图吧地图  1800000  600000 
						    	  jsbdLocationService.PowerFalg=res.optString("NodeData");
						    	  jsbdLocationService.timerzz.schedule(jsbdLocationService.tasks,1000,time); 
						        }else{
						    	  Log.e("当前账号无权限或者","imsi并未登记");
						      }
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}finally{
				}
			}
		}
	} 
    
  //时间段验证，看是否在某一时间段。
    public boolean isShift(final long currTime, String[] timeSlot) { 
        Calendar tempCalendar = Calendar.getInstance(); 
	    tempCalendar.setTimeInMillis(currTime); 
	    String[] tmpArray = timeSlot[0].split(":"); 
	    long startTime, stopTime; 
	    tempCalendar.clear(Calendar.HOUR_OF_DAY); 
        tempCalendar.clear(Calendar.MINUTE); 
	    tempCalendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(tmpArray[0])); 
	    tempCalendar.set(Calendar.MINUTE, Integer.parseInt(tmpArray[1])); 
	    startTime = tempCalendar.getTimeInMillis(); 
	    tmpArray = timeSlot[1].split(":"); 
	    int stopHour = Integer.parseInt(tmpArray[0]), stopMinute = Integer.parseInt(tmpArray[1]); 
	    if (stopHour == 0) { 
	    tempCalendar.add(Calendar.DAY_OF_MONTH, 1); 
	     } 
	    tempCalendar.clear(Calendar.HOUR_OF_DAY); 
	    tempCalendar.clear(Calendar.MINUTE); 
	    tempCalendar.set(Calendar.HOUR_OF_DAY, stopHour); 
	    tempCalendar.set(Calendar.MINUTE, stopMinute); 
	    stopTime = tempCalendar.getTimeInMillis(); 
	    if(startTime<currTime&&currTime<=stopTime){
	    	return true;
	    }else{
	    	return false;
	    }
	    }
   
    /**
     * 图吧地图,上传区域
     */
    
	Handler handler = new Handler() {  
	    @Override  
	    public void handleMessage(Message msg) {  
	        // 要做的事情  
	    	switch(msg.what){
	    	case 50:
	    		getTBMap();   //定时查找的数据
	    		break;
	    	default:
	    		break;
	    	}
	        super.handleMessage(msg);  
	    }  
	};
    private void initLocation() {
		try {
			//mListener = new MyLocationListeners();
			/*
			// 创建定位的CellLocationProvider
			mCellLocationProvider = new CellLocationProvider(JSBDLocationService.this,KEY);
			// 添加定位的监听
			mCellLocationProvider.addLocationListener(mListener);
			// 启动基站定位
			mCellLocationProvider.enableLocation();
			// 启动gps定位
			mCellLocationProvider.enableGPS();*/
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 定位监听类
	 * @author malw
	 */
	/*class MyLocationListeners implements LocationListener{
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
				//设置车标和地图中心点位置
				int longitude,latitude;
				Bundle bundle = location.getExtras();
				if (bundle != null) {
					Address = bundle.getString("address");
					if(Address!=null){
						//初始化点坐标
						longitude=(int)(location.getLongitude()*1E5);
						latitude=(int)(location.getLatitude()*1E5);
							//发送请求到远程后台,插入数据
							JSONObject obj=new JSONObject();
					            Date date=new Date();
					            obj.put("userid","用户");  
					            obj.put("deviceno",Settings.Secure.getString(JSBDLocationService.this.getContentResolver(), "android_id").toUpperCase()); 
					            obj.put("latitude",location.getLatitude());
					            Log.e("latitude",""+location.getLatitude());
					            Log.e("location.getLongitude()", ""+location.getLongitude());
					            obj.put("longitude",(location.getLongitude()+"")+"1");
					            obj.put("PLAN_START_DT", date);
					            obj.put("ext1","0");
					            obj.put("ext2","");
					            obj.put("ext3", Address);
					            obj.put("ext4", "GPS");
					            obj.put("ext5","");
					            obj.put("imsi",imsi);
						    	try {
						    		if(isShift(System.currentTimeMillis(), new String[]{"8:00","18:00"})){
						    			  wlconn.connect(new MyWLConnLis("usersLocationAction.do?method=addLocation", obj.toString(),""));
						    			}else{
						    				Log.e("时间段限制8:00-18:00", "不在规定的时间段,不需要被动上传时间");
						    			}
						    		} catch (Exception e) {
						    			e.printStackTrace();
						    		}	
					            }
					}
				}
				closeGPS();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void  closeGPS(){
		  /*if(mCellLocationProvider!=null){
			  try {
		        	mCellLocationProvider.disableLocation();
		        	mCellLocationProvider.clearLocationListener();	
			} catch (Exception e) {
				e.printStackTrace();
			}
	        }*/
	}
	
	/**
	 * 授权
	 */
	public void getTBMap(){
		mAppPath = Environment.getExternalStorageDirectory().getPath()+"/mapbar/app";
		// 应用程序名称，可随意设置
		mAppName = "qyfw";
		// 获取屏幕对应的DPI
		DisplayMetrics dm = new DisplayMetrics();
		WindowManager wmManager=(WindowManager) getSystemService(Context.WINDOW_SERVICE);  
		Display display = wmManager.getDefaultDisplay();
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
						Log.e("权限信息1", ""+msg);
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
						Log.e("权限信息2", ""+msg);
					}
				});
		//验证完成，开始查找位置信息
		init();
	*/}
	
	/**
	 * 初始化图吧定位
	 */
	private void init() {
		//初始化定位
		initLocation();
		// 初始化POI搜索引擎
		if (DemoConfig.DEBUG) {
			//Log.d(TAG, "Before - Initialize the POIQuery Environment");
		}
		try {
			// 如果授權不通過那麼將拋出異常
//			PoiQueryInitParams param = new PoiQueryInitParams();
//			PoiQuery.getInstance().init(param);
//			mReverse = new ReverseGeocoder((EventHandler) this);
//			mReverse.setMode(ReverseGeocoder.Mode.online);
		} catch (Exception e) {
			// ！！！此處應該添加保護，如果初始化不成功那麼後續使用PoiQuery相關功能將崩潰！！！
		   e.printStackTrace();
		}
	}
	

	@Override
	public void onDestroy() {
//		mLocationClient.stop();
//		if (wakeLock != null) { 
//            wakeLock.release(); 
//            wakeLock = null; 
//        }
//		stopForeground(true);
//		this.stopSelf();
		Intent intent= new Intent(JSBDLocationService.this,JSBDLocationService.class);
		startService(intent);
		super.onDestroy();
	}

	

	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}
}
