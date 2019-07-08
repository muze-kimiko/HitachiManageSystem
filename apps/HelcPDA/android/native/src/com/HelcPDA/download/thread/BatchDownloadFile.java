package com.HelcPDA.download.thread;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import android.content.Context;
import android.util.Log;

import com.HelcPDA.DownloadActivity;
import com.HelcPDA.download.DownloadDB;
import com.HelcPDA.download.model.DownloadModel;
import com.HelcPDA.download.util.Constant;

/**
 * 分段多线程写入文件内容
 * 分批量下载文件 
 */

public class BatchDownloadFile implements Runnable {
	// 下载文件信息
	private DownloadModel models;
	// 数据库
	private DownloadDB downloadDB;
	// 是否是第一次下载
	private boolean first = true;
	//上下文对象
	private Context context;

	public BatchDownloadFile(Context context,String resid) {        
		this.context = context;
		downloadDB = DownloadDB.getInstance(context);
		models = downloadDB.queryItemById(resid);
		if (models.status != Constant.DOWN_STATUS_WAIT) {
			//已经下载过
			first = false;            
		}else{
			//第一次下载
			downloadDB.updateDownloadStatus(resid, Constant.DOWN_STATUS_DOWNING);
		}
	}
	
	@Override
	public void run() {
		try {
			// 首次下载，获取下载文件长度
			if (first) {
				int alen = 0;
				if(models.url != null){
					alen = getFileSize(models.url);
				}
				//下载状态改为下载中
				models.status = Constant.DOWN_STATUS_DOWNING; 
				models.startime = System.currentTimeMillis()+"";
				//将已下载数据量设置为 0
				models.size = alen;
				models.downloadsize = 0;
				//获取长度 保存到数据库中
				DownloadDB downloadDB = DownloadDB.getInstance(context);
				downloadDB.updateDownloadAllSizeAndStatus(models.resId,models);
			}
			if(models.downloadsize < models.size){
				//根据判断下载各个数据
				if(models.url != null){
						new DownloadFile(context,models.url,models.path, models.downloadsize,models.size, models.resId);
				}
				Log.i("[BatchDownloadFile]","Thread: " + models.resId + ", startPos: " + models.downloadsize
						+ ", endPos: " + models.size);
			}else{
				Log.i("[BatchDownloadFile]", "该文件下载已经完成");
			}
			Constant.ThreadId.remove(models.resId);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取下载文件的长度
	 */
	private int getFileSize(String u) {
		int fileLength = -1;
		try {
			URL url = new URL(u);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			DownloadFile.setHeader(conn);
			int stateCode = conn.getResponseCode();
			// 判断http status是否为HTTP/1.1 206 Partial Content或者200 OK
			if (stateCode != HttpURLConnection.HTTP_OK
					&& stateCode != HttpURLConnection.HTTP_PARTIAL) {
				System.out.println("Error Code: " + stateCode);
				return -2;
			} else if (stateCode >= 400) {
				System.out.println("Error Code: " + stateCode);
				return -2;
			} else {
				// 获取长度
				fileLength = conn.getContentLength();
				System.out.println("FileLength: " + fileLength);
			}
			DownloadFile.printHeader(conn);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return fileLength;
	}
}
