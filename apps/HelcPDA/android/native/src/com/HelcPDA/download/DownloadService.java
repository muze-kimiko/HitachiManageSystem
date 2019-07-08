package com.HelcPDA.download;

import java.util.List;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import com.HelcPDA.download.model.DownloadModel;
import com.HelcPDA.download.thread.BatchDownloadFile;
import com.HelcPDA.download.util.Constant;

/**
 * 启动下载  暂停等操作的服务
 * @author malw
 *
 */
public class DownloadService extends Service{

	@Override
	public void onCreate() {
		super.onCreate();
	}

	@Override
	public void onStart(Intent intent, int startId) {
		if (intent == null) {
			return;
		}
		String resId = intent.getStringExtra("resid");
		String action = intent.getAction();
		if (action.equals(Constant.SERVICE_ACTION_START_NEW)) {
			//新创建的下载
			Log.i("[DownloadService]", "创建新下载");
			BatchDownloadFile down = new BatchDownloadFile(this,resId);        
			new Thread(down).start(); 
		}else if(action.equals(Constant.SERVICE_ACTION_START_START)){
			//重新运行下载任务
			Log.i("[DownloadService]", "开始下载");
			BatchDownloadFile down = new BatchDownloadFile(this,resId);        
			new Thread(down).start(); 
		}else if(action.equals(Constant.SERVICE_ACTION_START_PAUSE)){
			//修改为暂停状态
			Log.i("[DownloadService]", "暂停下载");
			Constant.ThreadId.add(resId);
		}else if(action.equals(Constant.SERVICE_ACTION_START_DELETE)){
			//删除该下载信息    数据状态已经修改    现在只需停止下载即可
			Log.i("[DownloadService]", "删除下载");
			DownloadDB downloadDB = DownloadDB.getInstance(this);
			DownloadModel dm = downloadDB.queryItemById(resId);
			//删除真正运行中的信息时   才用暂停 （因为其他状态是已经暂停状态）
			if(dm.status == Constant.DOWN_STATUS_DOWNING){
				Constant.ThreadId.add(resId);
			}
			//修改为未下载状态
			downloadDB.updateDownloadStatus(resId, Constant.DOWN_STATUS_WAIT);
		}else if(action.equals(Constant.SERVICE_ACTION_START_ALLPAUSE)){
			//下载状态全部改为暂停状态
			Log.i("[DownloadService]", "暂停全部下载");
			DownloadDB downloadDB = DownloadDB.getInstance(this);
			//查询所有正在下载的数据
			List<DownloadModel> list = downloadDB.queryDownloadedByStatusType(Constant.DOWN_STATUS_TYPE_DOWNING);
			for(DownloadModel info : list){
				if(info.status == Constant.DOWN_STATUS_DOWNING){
					Constant.ThreadId.add(info.resId);
				}
				downloadDB.updateDownloadStatus(info.resId, Constant.DOWN_STATUS_STOP);
			}
		}
		super.onStart(intent, startId);
	}

	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}
	
}
