package com.HelcPDA.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcPDA.resource.Config;
import com.HelcPDA.resource.DemoConfig;
/*
import com.mapbar.android.location.CellLocationProvider;
import com.mapbar.android.location.LocationListener;
import com.mapbar.mapdal.Auth;
import com.mapbar.mapdal.NativeEnv;
import com.mapbar.mapdal.NativeEnvParams;
import com.mapbar.mapdal.SdkAuth;
import com.mapbar.mapdal.WorldManager;
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

import android.app.Activity;
import android.app.AlarmManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Point;
import android.location.Location;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.Message;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.widget.Toast;

public class LocationService extends Service {
	private static int ib;
	private  Timer timerzz=new Timer();;  
	private  TimerTask tasks; 
	public  String Address=null;

	private static int mDensityDpi = 0;
	//应用跟目录
    private static String mAppPath = null;
	//应用名
	private static String mAppName = null;
	//dpi
	public static JSONArray args=new JSONArray();   //传入的数据。
//	private ReverseGeocoder mReverse;
	/** 定位监听类 */ 
//	private MyLocationListener mListener;
	//public static final String KEY = "zxb284-20131219-02-Z-T-A1101";
	//正式key
	public static final String KEY = "zxb284-20131219-02-Z-F-A10010";
	/** 监听对象 */
//	private CellLocationProvider mCellLocationProvider;
	
	private CordovaPlugin codActivity;
	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}

	@Override
	public void onCreate() {
		codActivity=new CordovaPlugin();
		registerBoradcastReceiver();
		tasks = new TimerTask() {  
		    @Override  
		    public void run() {  
		        Message message = new Message();  
		        message.what = 50;  
		        handler.sendMessage(message);  
		        Log.e("成功上传", "成功上传:"+ib++);
		    }  
		};
		//1800000  600000 
		timerzz.schedule(tasks,1000*1*1,1000*60*30); 
		
		super.onCreate();
	}

	@Override
	public void onDestroy() {
		this.stopSelf();
		super.onDestroy();
	}
	//广播
	  private BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver(){  
	        @Override  
	        public void onReceive(Context context, Intent intent) {  
	            String action = intent.getAction();  
	            if(action.equals("发送广播")){  
	                stopSelf();
	                LocationService.this.unregisterReceiver(this);
	            }  
	        }  
	          
	    };
	
	 public void registerBoradcastReceiver(){  
	    	IntentFilter myIntentFilter = new IntentFilter();  
		    myIntentFilter.addAction("发送广播");  
			this.registerReceiver(mBroadcastReceiver, myIntentFilter); 
	    } 
	 
	    
	@Override
	public void onStart(Intent intent, int startId) {
		try {
			if(intent != null) {
				Bundle extras = intent.getExtras(); 
				args=new JSONArray(extras.getString("args"));
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		super.onStart(intent, startId);
	}
   
	 
	Handler handler = new Handler() {  
	    @Override  
	    public void handleMessage(Message msg) {  
	        // 要做的事情  
	    	switch(msg.what){
	    	case 50:
	    		initLocation();   //定时查找的数据
	    		break;
	    	default:
	    		break;
	    	}
	        super.handleMessage(msg);  
	    }  
	};
	
	
	private void initLocation() {
		try {
//			mListener = new MyLocationListener();
			// 创建定位的CellLocationProvider
			/*
			mCellLocationProvider = new CellLocationProvider(LocationService.this,KEY);
			// 添加定位的监听
			mCellLocationProvider.addLocationListener(mListener);
			// 启动基站定位
			mCellLocationProvider.enableLocation();
			// 启动gps定位
			mCellLocationProvider.enableGPS();
			*/
		} catch (Exception e) {
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
				//设置车标和地图中心点位置
				int longitude,latitude;
				Bundle bundle = location.getExtras();
				String imsi;
		        TelephonyManager telephonyManager = (TelephonyManager)LocationService.this.getSystemService(Context.TELEPHONY_SERVICE);
		        imsi = telephonyManager.getSubscriberId();
				if (bundle != null) {
					Address = bundle.getString("address");
					if(Address!=null){
						//初始化点坐标
						longitude=(int)(location.getLongitude()*1E5);
						latitude=(int)(location.getLatitude()*1E5);
							//发送请求到远程后台,插入数据
							JSONObject obj=new JSONObject();
					            Date date=new Date();
					            obj.put("userid",args.getJSONObject(0).getString("USERID"));  
					            obj.put("deviceno",args.getJSONObject(0).getString("DeviceNo")); 
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
					            //人员拦截
					            String canUseMap=args.optJSONObject(0).optString("canUseMap");
					            if("ok".equals(canUseMap)){
					            	final WLClient wlconn = WLClient.createInstance(LocationService.this);
						    		try {
						    			if(isShift(System.currentTimeMillis(), new String[]{"8:00","18:00"})){
						    				wlconn.connect(new MyWLConnLis1("usersLocationAction.do?method=addLocation", obj.toString(),"sadasd"));
						    			}else{
						    				Log.e("时间段限制8:00-18:00", "不在规定的时间段,不需要被动上传时间");
						    			}
						    		} catch (Exception e) {
						    			e.printStackTrace();
						    		}	
					            }else{
					            	Log.e("第二次拦截:非地图需求人员", "暂不开放地图模块");
					            }
					            
					}
				}
				closeGPS();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
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
	 * 授权
	 */
	public void getTBMap(){
		mAppPath = Environment.getExternalStorageDirectory().getPath()+"/mapbar/app";
		// 应用程序名称，可随意设置
		mAppName = "qyfw";
		// 获取屏幕对应的DPI
		Display display = codActivity.cordova.getActivity().getWindowManager().getDefaultDisplay();
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
			/*// 如果授權不通過那麼將拋出異常
			PoiQueryInitParams param = new PoiQueryInitParams();
			PoiQuery.getInstance().init(param);
			mReverse = new ReverseGeocoder((EventHandler) this);
			mReverse.setMode(ReverseGeocoder.Mode.online);*/
		} catch (Exception e) {
			// ！！！此處應該添加保護，如果初始化不成功那麼後續使用PoiQuery相關功能將崩潰！！！
		}
	}
	
	
	//单独加载信息
			class MyWLConnLis1 implements WLResponseListener {

				String url = "";
				String params_str = "";
				String class_name = "";
				String method = "";
				public MyWLConnLis1(String url, String params, String class_name) {
					this.url = url;
					this.params_str = params;
					this.class_name = class_name;
				}
				
				private void MyWLConnList1() {
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
					ArrayList<Header> al = wloption.getHeaders();
					wlclient.invokeProcedure(invkeData, new MyWLInvoke(class_name), wloption);
				}
				
				private class MyWLInvoke implements WLResponseListener {

					String class_name = "";
					String method_name = "";
					Activity ctx;
					public MyWLInvoke(String class_name) {
					}
					
					private void MyWLInvoke() {
					}
					
					@Override
					public void onFailure(WLFailResponse arg0) {
					}

					@Override
					public void onSuccess(WLResponse arg0) {
						try {
							if (!class_name.equals("") && !method_name.equals("")) {
								if (Looper.myLooper() == null) {
									Looper.prepare();
								}
							}
						} catch (Exception e) {
							e.printStackTrace();
						}finally{
						}
					}
				}
			
			
			}
	
}
