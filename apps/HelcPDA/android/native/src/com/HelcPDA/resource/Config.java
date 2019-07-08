package com.HelcPDA.resource;

import android.graphics.Point;

public class Config {
	
	//默认在线或离线
	public static boolean online = true;
	//默认地图中心点
	public static Point centerPoint = new Point(1132916,2301515);
	//逆地理坐标
	public static Point inverSePoint = centerPoint;
	//来自哪个界面
	public static String BelowMan="none";
	//Search
	public static String SEARCH_DEFAULT_CITY = "广州市";
	public static String SEARCH_DEFAULT_PROVINCE = "广东省";
	public static String SEARCH_BY_KEY_TEXT = "酒店";
	public static String SEARCH_BY_TYPE_TEXT = "停车场";
	public static String SEARCH_BY_NEAR_TEXT = "酒店";
	//导航
	
	public static String getOnlineText(boolean isonline){
		if(isonline){
			return "在线";
		}else{
			return "离线";
		}
	}
}
