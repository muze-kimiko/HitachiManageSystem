package com.HelcPDA;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.ListView;
import android.widget.TextView;

import com.HelcPDA.download.DownloadDB;
import com.HelcPDA.download.DownloadData;
import com.HelcPDA.download.DownloadService;
import com.HelcPDA.download.model.DownloadModel;
import com.HelcPDA.download.model.ResDownItems;
import com.HelcPDA.download.model.ResPackages;
import com.HelcPDA.download.util.Constant;
import com.HelcPDA.download.util.Tools;
import com.HelcPDA.resource.DemoConfig;
import com.HelcPDA.resource.DownloadAdapter;
import com.HelcPDA.R;
//import com.mapbar.mapdal.NativeEnv;

public class DownloadActivity extends Activity implements OnClickListener{

	//下载列表
	private ListView mListView;
	private DownloadAdapter mAdapter;
	private List<DownloadModel> mData = new ArrayList<DownloadModel>();
	private boolean isUpdate = true;
	private DownloadDB downloadDB;
	private boolean ischeck = true;
	
	// For Debugging
	private final static String TAG = "[DownloadActivity]";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.activity_download);
		//初始化控件
		initView();
		//初始化数据
		initData();
		//启动刷新进度条和检查状态线程
		new checkPress().start();
	}	
	
	
	/**
	 * 初始化数据
	 */
	public void initData(){/*
		//检查json文件   （根据路径查询本地文件是否存在）
		DownloadData dd = new DownloadData(this);
		if(dd.isExistLocalData()){
			long now = System.currentTimeMillis();
			long last = dd.getLastTime();
			//如果存在检查日期是否过了7天
			System.out.println(now-last);
			if ((now - last) > Tools.getMillisByDay(7)){
				//大于7天重新下载
				boolean flag = dd.updateDownloadData();
				isUpdate = true;
				if(DemoConfig.DEBUG){
					if(flag){
						Log.i(TAG, ">>>>下载数据成功");
					}else{
						Log.i(TAG, ">>>>下载数据失败");
					}
				}
			}
		}else{
			//如果不存在  则下载
			boolean flag = dd.updateDownloadData();
			isUpdate = true;
			if(DemoConfig.DEBUG){
				if(flag){
					Log.i(TAG, ">>>>下载数据成功");
				}else{
					Log.i(TAG, ">>>>下载数据失败");
				}
			}
		}
//		if(true) {
//			return ;
//		}
		//初始化数据库
		downloadDB = DownloadDB.getInstance(this);
		//获取下载链接数据       
		List<DownloadModel> dmlist = downloadDB.queryDownloadedAllItems();
		mData.addAll(dmlist);
		//授权和数据是否有更新    有更新则更新数据库信息
		if(isUpdate||true){
			//获取本地数据
			List<ResPackages> rplist = dd.getLocalData();
			if(rplist != null){
				for(ResPackages info : rplist){
					boolean eq = true;
					for(DownloadModel info2 : dmlist){
						if(info.getCode().equals(info2.resId)){
							//如果数据库中有相同的不插入
							eq = false;
							break;
						}
					}
					if(eq){
						//如果数据库中没有此省份 则插入
						insertData(info);
					}
				}
			}
		}
	*/}
	
	/**
	 * 初始化绑定控件
	 */
	public void initView(){
		TextView title = (TextView) findViewById(R.id.tv_title_text);
		title.setText("数据下载");
		findViewById(R.id.iv_title_online).setVisibility(View.GONE);
		findViewById(R.id.iv_title_back).setOnClickListener(this); // 返回按钮
		//给listview绑定数据源
		mListView = (ListView)findViewById(R.id.lv_download1);
		mAdapter = new DownloadAdapter(this,mListView,mData);
		mListView.setAdapter(mAdapter);
	}

	/**
	 * 将信息插入数据库
	 */
	private void insertData(ResPackages info){
		DownloadModel dm = new DownloadModel();
		dm.resId = info.getCode();
		dm.name  = info.getAliasname();
		//下载状态设置成等待状态
		dm.status = Constant.DOWN_STATUS_WAIT;
		//下载状态类型 设置成 未下载
		dm.statusType = Constant.DOWN_STATUS_TYPE_WAIT;
		dm.startime = System.currentTimeMillis()+"";
		for(ResDownItems info2 : info.getDownitems()){
			/*String path = info2.getLocal_path().replace("/mapbar", NativeEnv.getRootDirectory());
			if("map".equals(info2.getName())){
				dm.url = info2.getUrl();
				dm.path = path+Tools.getPathFileName(info2.getUrl());
			}*/
		}
		mData.add(dm);
		downloadDB.addOneTask(dm, 1);
	}
	
	/**
	 * 定时读取数据库下载进度信息
	 * @author malw
	 *
	 */
	class checkPress extends Thread{
		@Override
		public void run() {
			super.run();
			try {
				while(ischeck){
//					Log.i("定时检查数据库中下载信息", "定时检查数据库中下载信息");
					DownloadDB downloadDB = DownloadDB.getInstance(DownloadActivity.this);
					mData = downloadDB.queryDownloadedAllItems();
					for(DownloadModel info : mData){
						//只更新正在下载的数据
						if(info.statusType == Constant.DOWN_STATUS_TYPE_DOWNING){
							int dc = info.downloadsize;
							info.downloadsize = dc;
							//如果下载完毕  则修改状态
							if(info.size != 0 && (info.size == dc || info.size < dc) && info.status != Constant.DOWN_TATUS_SUCCESS){
								//如果数据下载完成  则更新状态    下载中   为    未下载
								info.status = Constant.DOWN_TATUS_SUCCESS;
								info.statusType = Constant.DOWN_STATUS_TYPE_SUCCESS;
								info.downloadsize = dc;
								downloadDB.updateModelSize(info);
								Message msg = new Message();
								msg.obj = info;
								msg.what = 1;
								handler.sendMessage(msg);
							}else{
								//更新进度条
								Message msg = new Message();
								msg.obj = info;
								msg.what = 0;
								handler.sendMessage(msg);
							}
						}
					}
					Thread.sleep(1000);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 修改下载进度条
	 */
	Handler handler = new Handler(){
		@Override
		public void handleMessage(Message msg) {
			DownloadModel dm = (DownloadModel)msg.obj;
			switch(msg.what){
			case 1:
				Log.i("[DownloadActivity]", "刷新listview");
				//更新列表信息
				mAdapter.setResult(mData);
				break;
			case 0:
				//改变进度条
				mAdapter.updatePercent(dm.resId, dm.downloadsize, dm.size, dm.status);
				break;
			}
			super.handleMessage(msg);
		}
	};
	
	/**
	 * 暂停所有下载任务
	 */
	private void pauseAll(){
		//退出时所有在下载的  状态都改为暂停
		Intent intent = new Intent(Constant.SERVICE_ACTION_START_ALLPAUSE);
		intent.setClass(this, DownloadService.class);
		this.startService(intent);
	}
	
	@Override
	protected void onDestroy() {
		super.onDestroy();
		ischeck = false;
		Constant.ThreadId.clear();
		//退出时所有在下载的  状态都改为暂停
		pauseAll();
	}

	@Override
	public void onClick(View v) {
		//退出时所有在下载的  状态都改为暂停
		pauseAll();
		finish();
	}
	
}
