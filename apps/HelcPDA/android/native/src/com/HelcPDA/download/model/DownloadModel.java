package com.HelcPDA.download.model;

import android.graphics.drawable.Drawable;

/**
 * 下载信息存储在数据库实体
 * @author malw
 *
 */
public class DownloadModel {
	/** 资源id */
	public String resId = "";
	
	/** 资源名称 */
	public String name = null;
	
	/** 下载链接 */
	public String url = null;
	
	/** 本地保存地址 */
	public String path = null;
	
	/** 文件大小*/
	public int size = 0;
	
	/** 下载大小 */
	public int downloadsize = 0;
	
	/** 资源图标*/
	public Drawable appIcon;
	
	/**开始时间*/
	public String startime;
	
	/** 下载状态类型  1下载中   2 已下载   3 未下载 */
	public int statusType = 3;
	
	/** 状态       0 正在下载    1暂停     2失败  3 下载完成 4未下载 */
	public int status = 0;
 
	public DownloadModel() {
	}


}
