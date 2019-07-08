package com.HelcPDA.download.util;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.telephony.TelephonyManager;

/**
 * 工具类
 * 
 * @author malw
 * 
 */
public class Tools {

	/**
	 * 获取下载连接中的文件名
	 * 
	 * @param url
	 * @return
	 */
	public static String getPathFileName(String url) {
		return url.substring(url.lastIndexOf("/") + 1, url.length());
	}

	/**
	 * 获取文件类型 后缀
	 * 
	 * @param url
	 * @return
	 */
	public static String getFileType(String url) {
		return url.substring(url.lastIndexOf(".") + 1, url.length());
	}

	/**
	 * 获取手机IMEI号
	 * 
	 * @return 手机IMEI号
	 */
	private static String deviceId;

	public static String getIMEI(Context context) {
		if (null != deviceId)
			return deviceId;
		TelephonyManager telMgr = (TelephonyManager) context
				.getSystemService(Context.TELEPHONY_SERVICE);
		deviceId = telMgr.getDeviceId();
		return deviceId;
	}

	/**
	 * 将imei转换成6-2-6的格式
	 * 
	 * @param imei
	 * @return
	 */
	public static String changeImei(String imei) {
		if (null == imei || "".equals(imei.trim())) {
			return " - - ";
		}
		if (imei.length() < 14) {
			imei = imei + "00000000000000";
		}
		return imei.substring(0, 6) + "-" + imei.substring(6, 8) + "-"
				+ imei.substring(8, 14);
	}

	/**
	 * 将imei转换成2-6-6的格式
	 * 
	 * @param imei
	 * @return
	 */
	public static String changeImeiTo2_6_6(String imei) {
		if (null == imei || "".equals(imei.trim())) {
			return " - - ";
		}
		if (imei.length() < 14) {
			imei = imei + "00000000000000";
		}
		return imei.substring(0, 2) + "-" + imei.substring(2, 8) + "-"
				+ imei.substring(8, 14);
	}

	/**
	 * 获取最后一个标志之后的数据
	 * 
	 * @param fileName
	 *            文件名称
	 * @param tag
	 *            分割标识
	 * @param isHaveTag
	 *            是否包含分割标识
	 * @return 最后一个标识之后的内容
	 */
	public static String getAfterLastTagString(String fileName, String tag,
			boolean isHaveTag) {
		// 文件路径无效
		if (null == fileName || "".equals(fileName.trim()) || null == tag
				|| tag.equals("")) {
			return "";
		}
		// 分割
		String[] items = fileName.split(tag);
		// 没有有效的名字
		if (items == null || items.length <= 1) {
			return fileName;
		}
		// 文件名称
		String path = "";

		if (isHaveTag) {
			path = tag + items[items.length - 1];
		} else {
			path = items[items.length - 1];
		}
		return path;
	}

	/**
	 * 根据天获取毫秒
	 * 
	 * @param day
	 * @return
	 */
	public static int getMillisByDay(int day) {
		return day * 24 * 60 * 60 * 1000;
	}

	/**
	 * wifi 2G 3G网络
	 * 
	 * @return TODO
	 */
	public static boolean getNetworkStatus(Context context) {
		ConnectivityManager connManager = (ConnectivityManager) context
				.getApplicationContext().getSystemService(
						Context.CONNECTIVITY_SERVICE);
		NetworkInfo networkInfo = connManager.getActiveNetworkInfo();
		if (networkInfo != null) {
			return networkInfo.isAvailable();
		}

		return false;

	}
}
