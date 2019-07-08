package com.HelcPDA.download.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

//import com.mapbar.mapdal.NativeEnv;

import android.os.Environment;
/**
 * 常量类
 * @author malw
 *
 */
public class Constant {

	/**下载数据基础地址**/
	public static final String SERVER_DATA_JSON_ROOT_URL="http://mapbarhome.mapbar.com/app/?tp=128&mdn=nav_46_ec_tri";
	/** 数据保存路径 **/
	public static final String LOCAL_DATA_JSON_NAME = "data.wop";
	/**品牌**/
	public static final String MARK = "QYFW";
	/**品牌型号**/
	public static final String MODEL = MARK;
	/**数据更新时间**/
	public static final String DOWNLOAD_DATA_JSON_TIME_KEY = "down_data_json_time_key";
	/** 运行线程下的资源id **/
	public static List<String> ThreadId = new ArrayList<String>();
	/** sdcard根目录 **/
	//手机根目录  Environment.getRootDirectory().toString();
	//sd卡根目录 Environment.getExternalStorageDirectory().toString()
	public final static String root_path =  Environment.getExternalStorageDirectory().toString();
	/** 下载中 **/
	public final static int DOWN_STATUS_TYPE_DOWNING = 1;
	/** 已下载 **/
	public final static int DOWN_STATUS_TYPE_SUCCESS = 2;
	/** 未下载 **/
	public final static int DOWN_STATUS_TYPE_WAIT = 3;
	/** 正在下载 **/
	public final static int DOWN_STATUS_DOWNING = 0;
	/** 暂停 正在下载**/
	public final static int DOWN_STATUS_STOP = 1;
	/** 下载失败  正在下载**/
	public final static int DOWN_STATUS_FAIL = 2;
	/** 下载成功  已下载**/
	public final static int DOWN_TATUS_SUCCESS = 3;
	/** 等待  未下载**/
	public final static int DOWN_STATUS_WAIT = 4;
	/** 新任务下载 **/
	public final static String SERVICE_ACTION_START_NEW = "com.mapbar.download.new";
	/** 重新运行 **/
	public final static String SERVICE_ACTION_START_START = "com.mapbar.download.start";
	/** 暂停 **/
	public final static String SERVICE_ACTION_START_PAUSE = "com.mapbar.download.pause";
	/** 删除 **/
	public final static String SERVICE_ACTION_START_DELETE = "com.mapbar.download.delete";
	/** 全部暂停 **/
	public final static String SERVICE_ACTION_START_ALLPAUSE = "com.mapbar.download.allpause";
}
