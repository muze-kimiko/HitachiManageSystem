package com.helc.helcapprove;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.Properties;
import java.util.logging.Logger;

import org.json.JSONObject;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
/**
 * 系统配置
 *
 */
public class SystemSetting {

    public static void main(String[] args) throws Exception {
    	
    }
    
    public static String SearchInfo(String param){
    	Logger lg = Logger.getLogger("SystemSetting");
    	//生成文件对象
    	File pf = new File("/server/SystemSetting.properties");
    	lg.warning("lg: " + pf.exists());
    	
    	//生成文件输入流
    	FileInputStream inpf = null;
    	try{
    		inpf = new FileInputStream(pf);
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	
    	//生成properties对象
    	Properties p = new Properties();
    	try{
    		p.load(inpf);
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	lg.warning("areaPoint="+p.getProperty("permission"));
		return "permission="+p.getProperty("permission");
	}
    
}