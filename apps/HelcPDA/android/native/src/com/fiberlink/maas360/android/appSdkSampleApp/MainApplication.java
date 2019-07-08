package com.fiberlink.maas360.android.appSdkSampleApp;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Service;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Environment;
import android.os.Vibrator;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.GeofenceClient;
import com.baidu.location.LocationClient;
import com.baidu.mapapi.SDKInitializer;
import com.fiberlink.maas360.android.dlpsdk.MaaS360SecureApplication;
import com.fiberlink.maas360sdk.external.IMaaS360SDKListener;

/**
 * Application subclass
 * 
 * @author dsunder
 */
public class MainApplication extends MaaS360SecureApplication
{
	public JSONArray jsData;
    public LocationClient mLocationClient;
	public GeofenceClient mGeofenceClient;
	public MyLocationListener mMyLocationListener;
	public Vibrator mVibrator;
	public String LocationFlag;
	public Toast toast;
	public String imsi;
    /**
     * Singleton application instance.
     */
    private static MainApplication mApplication;
    
    /**
     * Shared preferences.
     */
    private SharedPreferences mPrefs;
    
    /**
     * The SDK listener instance.
     */
    private final IMaaS360SDKListener mListener = new SDKListener();
    
    /**
     * Foreground activity.
     */
    private MainActivity mForegroundActivity;

    /**
     * {@inheritDoc}
     */
    @Override
    public void onCreate()
    {
        super.onCreate();
        mApplication = this;
        mPrefs = getSharedPreferences("myAppPreferences", Context.MODE_PRIVATE);
        try {
           
                File newFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath(), "TestSDKFile.txt");
                newFile.createNewFile();
                newFile.setWritable(true);
                
                FileWriter fw = new FileWriter(newFile);
                fw.write("Hello World");
                fw.close();
           
        }
        catch (IOException e) {
            Log.e("testapp","io exception");
        }
        
        SDKInitializer.initialize(getApplicationContext());  
		mLocationClient = new LocationClient(this.getApplicationContext());
		mMyLocationListener = new MyLocationListener();
		mLocationClient.registerLocationListener(mMyLocationListener);
		mGeofenceClient = new GeofenceClient(getApplicationContext());
		mVibrator =(Vibrator)getApplicationContext().getSystemService(Service.VIBRATOR_SERVICE);
		toast=Toast.makeText(MainApplication.this, "", Toast.LENGTH_SHORT);
		TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
  	    imsi=telephonyManager.getSubscriberId();
    }
    
    public synchronized void saveLog(String message)
    {
        mPrefs.edit().putString("SavedLog", message).commit();
    }
    
    public synchronized String readLog()
    {
        return mPrefs.getString("SavedLog", "");
    }
    
    public synchronized void appendLog(String message)
    {
        String value = readLog();
        saveLog(value + message + "\n\n");
    }

    /**
     * @return SDK Listener instance.
     */
    public IMaaS360SDKListener getSDKListener()
    {
        return mListener;
    }
    
    /**
     * Set the foreground activity.
     */
    public synchronized void setForegroundActivity(MainActivity activity)
    {
        mForegroundActivity = activity;
    }
    
    /**
     * @return Foreground activity.
     */
    public synchronized MainActivity getForegroundActivity()
    {
        return mForegroundActivity;
    }
    
    /**
     * @return Shared singleton instance of the application.
     */
    public static MainApplication getApplication()
    {
        return mApplication;
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

				JSONObject obj = new JSONObject();
				try {
					obj.put("Longitude", location.getLongitude());
					obj.put("Latitude", location.getLatitude());
					obj.put("Address", location.getAddrStr());
					jsData.optJSONObject(0).put("Longitude",location.getLongitude());
					jsData.optJSONObject(0).put("Latitude",location.getLatitude());
					jsData.optJSONObject(0).put("Address",location.getAddrStr());
				} catch (JSONException e) {
					Log.e("定我的位置出错", "error");
					e.printStackTrace();
				}
				// 分发信息
				

			}
		}
	}
     
}
