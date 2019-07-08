package com.HelcOA;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcOA.util.Base64Imp;

import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore.Images.ImageColumns;
import android.util.Log;


public class FileUpLoad extends CordovaPlugin {
	public boolean execute(String action,JSONArray args,CallbackContext callbackContext)throws JSONException{
		//判断是图片转换为base64字符串，还是，base64字符串转换为图片
		String PD=action;
		Log.e("测试",PD);
		if(PD.equals("upload")){//图片转换为base64字符串
			Log.e("传入的",args.toString());
			JSONObject ob=(JSONObject) args.get(0);
			String path=ob.getString("READSRC");
			Log.e("传入的2",path);
			//path = Environment.getExternalStorageDirectory() + path;  //用于获取绝对路径
			String data=Base64Imp.encodeBase64File(path);
			Log.e("结果",data);
			callbackContext.success(data);
			return true;
		}else if(PD.equals("uritofile")){
	        String ag=(String) args.get(0);
	        Log.e("hehe",ag);
            Uri uri=Uri.parse(ag);
			final String scheme = uri.getScheme();
			String data = null;
			if ( scheme == null )
			data = uri.getPath();
			else if ( ContentResolver.SCHEME_FILE.equals( scheme ) ) {
			data = uri.getPath();
			} else if ( ContentResolver.SCHEME_CONTENT.equals( scheme ) ) {
			Cursor cursor = cordova.getActivity().getContentResolver().query( uri, new String[] { ImageColumns.DATA }, null, null, null );
			if ( null != cursor ) {
			if ( cursor.moveToFirst() ) {
			int index = cursor.getColumnIndex( ImageColumns.DATA );
			if ( index > -1 ) {
			data = cursor.getString( index );
			}
		}
			cursor.close();
			}
        }
			callbackContext.success(data);
			return true;
		};
		return false;
	}
}
