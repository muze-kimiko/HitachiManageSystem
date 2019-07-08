package com.HelcPDA.download;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.Environment;
import android.os.StrictMode;
import android.preference.PreferenceManager;
import android.util.Log;

//import com.mapbar.mapdal.NativeEnv;
import com.HelcPDA.download.model.ResDownItems;
import com.HelcPDA.download.model.ResPackages;
import com.HelcPDA.download.util.Constant;

/**
 * 获取服务器json数据信息
 * 1.下载jaon保存本地
 * 2.返回授权的城市信息
 * @author malw
 *
 */
public class DownloadData {

	private static final String BASE  = "base";
	private static final String MAP   = "map";
	private SharedPreferences sp;
	private Context mContext;
	
	public DownloadData(Context context){
		mContext = context;
		sp = PreferenceManager.getDefaultSharedPreferences(mContext);
	}
	
	/**
	 * 更新和下载各省信息(json数据)
	 * @return
	 */
	/*public boolean updateDownloadData(){
		boolean flag = false;
		StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
        .detectDiskReads()
        .detectDiskWrites()
        .detectNetwork()   // or .detectAll() for all detectable problems
        .penaltyLog()
        .build());
		StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder()
        .detectLeakedSqlLiteObjects()
        .detectLeakedClosableObjects()
        .penaltyLog()
        .penaltyDeath()
        .build());
		try {
			JSONObject json = getJsonFromHttp();
			flag = write(json, NativeEnv.getRootDirectory()+ File.separator +Constant.LOCAL_DATA_JSON_NAME);
			if(flag){
				Editor editor=sp.edit();
				editor.putLong(Constant.DOWNLOAD_DATA_JSON_TIME_KEY, System.currentTimeMillis());
				editor.commit();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}*/
	
	/**
	 * 检查本地数据是否存在
	 * @return
	 */
	/*public boolean isExistLocalData(){
		File fData = new File(NativeEnv.getRootDirectory()+ File.separator + Constant.LOCAL_DATA_JSON_NAME);
		if(fData.exists()){
			return true;
		}else{
			return false;
		}
	}*/
	
	/**
	 * 获取数据上次下载时间
	 * @return
	 */
	public long getLastTime(){
		long last = sp.getLong(Constant.DOWNLOAD_DATA_JSON_TIME_KEY, 0);
		return last;
	}
	
	/**
	 * 获取本地数据
	 * @throws Exception 
	 */
	/*public List<ResPackages> getLocalData(){
		List<ResPackages> data = null;
		try {
			String str = read(NativeEnv.getRootDirectory()+ File.separator +Constant.LOCAL_DATA_JSON_NAME);
			System.out.println("");
			if(str != null){
				JSONObject json = new JSONObject(str);
				 data = getJsonToList(json);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return data; 
	}*/
	
	/**
	 * 将json数据转换成list   授权信息
	 * @param json json数据
	 * @return
	 */
	private static List<ResPackages> getJsonToList(JSONObject json){
		List<ResPackages> data = new ArrayList<ResPackages>();
		try {
			JSONObject result = json;
			String right_type  = result.getString("right_type");
			JSONArray rt_array = new JSONArray(right_type);

			//遍历right_type
			for (int i=0;i<rt_array.length();i++) {
				JSONObject rt_json = rt_array.getJSONObject(i);
				String root_path  = rt_json.getString("root_path");
				String packages   = rt_json.getString("packages");
				
				JSONArray pk_array = new JSONArray(packages);
				for(int j=0;j<pk_array.length();j++){
					JSONObject pk_json = pk_array.getJSONObject(j);
					String pname       = pk_json.getString("name");
					String aliasname   = pk_json.getString("aliasname");
					String datatype    = pk_json.getString("datatype");
					String code        = pk_json.getString("code");
					String downitems   = pk_json.getString("downitems");
					if(!MAP.equals(datatype)&&!BASE.equals(datatype)){
						continue;
					}
					ResPackages pk = new ResPackages();
					if(BASE.equals(datatype)){
						String autodown    = pk_json.getString("autodown");
						String autoserial   = pk_json.getString("autoserial");
						pk.setAutodown(autodown);
						pk.setAutoserial(autoserial);
					}else{
						String data_desc = pk_json.getString("data_desc");
						pk.setData_desc(data_desc);
					}
					pk.setName(pname);
					pk.setAliasname(aliasname);
					pk.setDatatype(datatype);
					pk.setCode("1"+code);
					
					List<ResDownItems> dilist = new ArrayList<ResDownItems>();
					JSONArray di_array = new JSONArray(downitems);
					for (int h=0;h<di_array.length();h++) {
						JSONObject di_json = di_array.getJSONObject(h);
						String dname 	  = di_json.getString("name");
						String url    	  = di_json.getString("url");
						String len   	  = di_json.getString("len");
						String ver   	  = di_json.getString("ver");
						String local_path = di_json.getString("local_path");
						String md5        = di_json.getString("md5");
						if(MAP.equals(dname)){
							ResDownItems di = new ResDownItems();
							di.setName(dname);
							di.setUrl(root_path+url);
							di.setLen(len);
							di.setVer(ver);
							di.setLocal_path(local_path);
							di.setMd5(md5);
							
							dilist.add(di);
						}
					}
					pk.setDownitems(dilist);
					data.add(pk);
				}
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return data;
	}
	
	/**
	 * 请求服务器获取json
	 * @return
	 */
	private static JSONObject getJsonFromHttp() {
		StringBuffer sb = new StringBuffer(Constant.SERVER_DATA_JSON_ROOT_URL);
    	sb.append("&bc="+Constant.MARK);
    	sb.append("&mc="+Constant.MARK);
    	Log.e("url", sb.toString());
		JSONObject result = null;
		try {
			HttpPost request = new HttpPost(sb.toString());
			HttpResponse httpResponse = new DefaultHttpClient()
					.execute(request);
			String retSrc = EntityUtils.toString(httpResponse.getEntity());
			System.out.println(retSrc);
			result = new JSONObject(retSrc);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 读取缓存
	 * 
	 * @return ret
	 * @throws Exception 
	 */
	private static String read(String path) throws Exception {
		String json = null;
		File cache = new File(path);
		// 插入内存卡 并且此路径存在
		if (cache.exists()) {
			try {
				StringBuffer sb = new StringBuffer();
				int len = 0;
				byte[] buf = new byte[1024];
				FileInputStream fis = new FileInputStream(path);
				while ((len = fis.read(buf)) != -1) {
					sb.append(new String(buf, 0, len));
				}
				fis.close();
				json = sb.toString();
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			throw new Exception("本地省份数据不存在，请重新下载省份数据");
		}
		return json;
	}

	/**
	 * 写入缓存
	 * 
	 * @param cache
	 *            cache
	 */
	private static boolean write(JSONObject json,String path) {
		try {
			if (json != null
					&& Environment.getExternalStorageState().equals(
							Environment.MEDIA_MOUNTED)) {
				String cache = json.toString();
				File cachefile = new File(path);
				FileOutputStream out = null;
				try {
					if (!cachefile.exists()) {
						// 获取文件的上一级路径
						String path_parent = cachefile.getParent();
						File file = new File(path_parent);
						// 创建文件所在文件夹路径
						if (!file.exists()) {
							file.mkdirs();
						}
					}
					// isNewFile为true继续写入 为false重新写入
					out = new FileOutputStream(cachefile, false);
					out.write(cache.getBytes());
				} catch (Exception e) {
					e.printStackTrace();
					return false;
				} finally {
					try {
						out.flush();
						out.close();
					} catch (Exception e1) {
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
