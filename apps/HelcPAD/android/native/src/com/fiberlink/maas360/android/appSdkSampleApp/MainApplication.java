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
}
