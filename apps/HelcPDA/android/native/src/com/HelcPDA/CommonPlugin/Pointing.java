package com.HelcPDA.CommonPlugin;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.text.SimpleDateFormat;  
import java.util.Calendar;  
import java.util.Date;  
import java.util.EmptyStackException;  
  







import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
  
import org.apache.cordova.PluginResult;
import org.json.JSONArray;  
import org.json.JSONException;  
import org.json.JSONObject;  
  






import org.xml.sax.InputSource;

import com.HelcPDA.util.Base64Imp;
import com.gzunicorn.platform.util.FileUtil;

import android.content.Intent;  
import android.database.Cursor;  
import android.net.Uri;  
import android.os.Environment;
import android.provider.CallLog;  
import android.provider.Contacts;  
import android.provider.ContactsContract;  
import android.text.format.DateFormat;  
import android.util.Log;  
  
/** 
 * Grab call log data 
 *  
 */  
public class Pointing extends CordovaPlugin {  
  
    /** List Action */  
    private static final String ACTION = "decoderFile";  
    private static String content = "";  
    FileInputStream fis = null;
	FileOutputStream fos = null;
	BufferedReader br = null;
	BufferedWriter bw = null;
	
    @Override  
    public boolean execute(String action,JSONArray args,CallbackContext callbackContext)
			throws JSONException{  
        if (ACTION.equals(action)) {
        	Base64Imp base64 = new Base64Imp();
        	FileUtil.createFolder(Environment.getExternalStorageDirectory() + "/UMS/XML/");
        	base64.decoderBase64File(args.getString(0), Environment.getExternalStorageDirectory() + "/UMS/XML/PointingBook.txt");

        	try {
        		fis = new FileInputStream(Environment.getExternalStorageDirectory() + "/UMS/XML/PointingBook.txt");
        		Reader reader = new InputStreamReader(fis,"GB2312");
        		InputSource ips = new InputSource(reader);
        		br = new BufferedReader(ips.getCharacterStream());
        		String item;
        		content = "";
        		while ((item=br.readLine()) != null) {
        			content += item;
        			content += "\br";
        		}
        		br.close();
        		fis.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
        	
        	callbackContext.success(content);
            return true;
        } else {  
            return false; 
        }  
    }  
  
}  