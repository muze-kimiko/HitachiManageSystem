package com.HelcPDA.resource;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.HelcPDA.R;
import com.HelcPDA.download.DownloadDB;
import com.HelcPDA.download.DownloadService;
import com.HelcPDA.download.model.DownloadModel;
import com.HelcPDA.download.util.Constant;
import com.HelcPDA.download.util.Tools;

/**
 * 地图导航数据下载页Item
 * @author malw
 *
 */
public class DownloadAdapter extends BaseAdapter {

	private List<DownloadModel> mData = new ArrayList<DownloadModel>();
	private ListView mListView = null;
	private LayoutInflater mInflater;
	private DownloadViewItem itemViewHolder = null;
	private DownloadDB downloadDB;
	private boolean down1 = true;
	private boolean down2 = true;
	private boolean down3 = true;
	
	/** Context */
	private Context mContext;
	
	public DownloadAdapter(Context context,ListView listView,List<DownloadModel> data) {
		this.mInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		this.mListView = listView;
		this.mContext = context;
		this.mData = data;
		downloadDB = DownloadDB.getInstance(context);
	}

	@Override
	public int getCount() {
		return mData.size();
	}
	
	@Override
	public Object getItem(int position) {
		return position;
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		final DownloadModel model = mData.get(position);
		if(convertView == null) {
			//绑定控件
			convertView = mInflater.inflate(R.layout.item_download_list, null);
			itemViewHolder = new DownloadViewItem();
			itemViewHolder.downloadText = (TextView) convertView.findViewById(R.id.manage_download_list_item_text);
			itemViewHolder.nameTextView = (TextView) convertView.findViewById(R.id.manage_downloading_text_title);
			itemViewHolder.progressBar = (ProgressBar)convertView.findViewById(R.id.manage_downloading_progress_bar);
			itemViewHolder.percentage = (TextView) convertView.findViewById(R.id.manage_downloading_progress_text);
			itemViewHolder.downloadButton = (Button) convertView.findViewById(R.id.download);
			itemViewHolder.mDelDownloadButton = (Button) convertView.findViewById(R.id.download_del);
			itemViewHolder.mPauseDownloadButton = (Button) convertView.findViewById(R.id.download_pause);
			itemViewHolder.mDownloadedTextView = (TextView) convertView.findViewById(R.id.downloaded);
			itemViewHolder.mDownloadIngLayout = (LinearLayout) convertView.findViewById(R.id.downloading);
			
			convertView.setTag(itemViewHolder);
		} else {
			itemViewHolder = (DownloadViewItem) convertView.getTag();
		}
		
		if(model != null){
			itemViewHolder.id = model.resId;
			itemViewHolder.type = model.statusType;
			//数据省份名称
			itemViewHolder.nameTextView.setText(model.name);
			switch(model.statusType){
			case Constant.DOWN_STATUS_TYPE_SUCCESS:
				//已下载
				//隐藏 现在下载按钮
				itemViewHolder.downloadButton.setVisibility(View.GONE);
				//显示已经下载提示
				itemViewHolder.mDownloadedTextView.setVisibility(View.VISIBLE);
				//隐藏正在下载面板
				itemViewHolder.mDownloadIngLayout.setVisibility(View.GONE);
				//添加下载分类标签
				if(down1){
					
					itemViewHolder.downloadText.setText("已下载("+getStatusCount(Constant.DOWN_STATUS_TYPE_SUCCESS)+")");
					itemViewHolder.downloadText.setVisibility(View.VISIBLE);
					down1 = false;
				}else{
					itemViewHolder.downloadText.setVisibility(View.GONE);
				}
				break;
			case Constant.DOWN_STATUS_TYPE_DOWNING:
				//下载中
				//隐藏 现在下载按钮
				itemViewHolder.downloadButton.setVisibility(View.GONE);
				//隐藏 已经下载提示
				itemViewHolder.mDownloadedTextView.setVisibility(View.GONE);
				//显示正在下载面板
				itemViewHolder.mDownloadIngLayout.setVisibility(View.VISIBLE);
				//添加下载分类标签
				if(down2){
					itemViewHolder.downloadText.setText("下载中("+getStatusCount(Constant.DOWN_STATUS_TYPE_DOWNING)+")");
					itemViewHolder.downloadText.setVisibility(View.VISIBLE);
					down2 = false;
				}else{
					itemViewHolder.downloadText.setVisibility(View.GONE);
				}
				//根据状态修改按钮文字
				if(model.status == Constant.DOWN_STATUS_DOWNING || model.status == Constant.DOWN_STATUS_WAIT){
					itemViewHolder.mPauseDownloadButton.setText("暂停");
				}else if(model.status == Constant.DOWN_STATUS_STOP){
					itemViewHolder.mPauseDownloadButton.setText("继续");
				}else if(model.status == Constant.DOWN_STATUS_FAIL){
					itemViewHolder.mPauseDownloadButton.setText("失败");
				}
				break;
			case Constant.DOWN_STATUS_TYPE_WAIT:
				//未下载
				//显示现在下载按钮
				itemViewHolder.downloadButton.setVisibility(View.VISIBLE);
				//隐藏正在下载面板
				itemViewHolder.mDownloadIngLayout.setVisibility(View.GONE);
				//隐藏 已经下载提示
				itemViewHolder.mDownloadedTextView.setVisibility(View.GONE);
				//添加下载分类标签
				if(down3){
					itemViewHolder.downloadText.setText("未下载("+getStatusCount(Constant.DOWN_STATUS_TYPE_WAIT)+")");
					itemViewHolder.downloadText.setVisibility(View.VISIBLE);
					down3 = false;
				}else{
					itemViewHolder.downloadText.setVisibility(View.GONE);
				}
				break;
			}
		}
		
		//修改进度条
		int download = model.downloadsize;
		if(model.size == 0) {
			itemViewHolder.progressBar.setProgress(0);
		} else {
			itemViewHolder.progressBar.setMax(model.size);
			itemViewHolder.progressBar.setProgress(download);
		}
		
		String percent = "";
		String hasDownSize = "";
		double kSize = (double)download /1024;
		if(kSize >= 1000) {
			double dSize = (double)download /1024 / 1024;
			hasDownSize = new DecimalFormat("###,###.##M").format(dSize);
		} else {
			hasDownSize = new DecimalFormat("###K").format(kSize);
		}
		percent += "(" + hasDownSize + "/";
		double tSize = (double)model.size / 1024 / 1024;
		String totalSize = new DecimalFormat("###,###.##M").format(tSize);
		percent += totalSize + ")";
		String percentage = "";
		
		//if size equals 0 , set percentage = 0,to avoid the "NaN" 
		if(model.size == 0) {
			percentage = "0";
		} else {
			double per = ((double)download / model.size) * 100;
			percentage = new DecimalFormat("##").format(per);
		}
		percent = percentage + "%" + percent;
		itemViewHolder.percentage.setText(percent);
		
		//未下载时    点击现在下载
		itemViewHolder.downloadButton.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				if(!checkNet()){
					return;
				}
				//修改状态为下载中
				downloadDB.updateDownloadStatusType(model.resId , Constant.DOWN_STATUS_TYPE_DOWNING);
				//刷新listview列表信息
				setResult(downloadDB.queryDownloadedAllItems());
				Intent intent = new Intent(Constant.SERVICE_ACTION_START_NEW);
				intent.putExtra("resid", model.resId);
				intent.setClass(mContext, DownloadService.class);
				mContext.startService(intent);
			}
		});
		
		//下载时    点击暂停
		itemViewHolder.mPauseDownloadButton.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				if(!checkNet()){
					return;
				}
				DownloadModel cmodel = downloadDB.queryItemById(model.resId);
				Intent intent = null;
				if(cmodel.status == Constant.DOWN_STATUS_DOWNING){
					//修改状态为暂停状态
					downloadDB.updateDownloadStatus(model.resId, Constant.DOWN_STATUS_STOP);
					//更新按钮文字
					updateButton(model.resId,Constant.DOWN_STATUS_STOP);
					//如果是下载状态   则暂停
					intent = new Intent(Constant.SERVICE_ACTION_START_PAUSE);
				}else {
					if(!checkNet()){
						return;
					}
					//修改状态为暂停状态
					downloadDB.updateDownloadStatus(model.resId, Constant.DOWN_STATUS_DOWNING);
					//更新按钮文字
					updateButton(model.resId,Constant.DOWN_STATUS_DOWNING);
					//如果是暂停或失败状态   则改成下载
					intent = new Intent(Constant.SERVICE_ACTION_START_START);
				}
				intent.putExtra("resid", model.resId);
				intent.setClass(mContext, DownloadService.class);
				mContext.startService(intent);
			}
		});
		
		//删除下载的信息
		itemViewHolder.mDelDownloadButton.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				new AlertDialog.Builder(mContext)
				.setTitle("提示")
				.setMessage("确定要删除["+model.name+"]的数据吗？")
				.setPositiveButton("确定",
						new DialogInterface.OnClickListener() {
							public void onClick (DialogInterface dialog,int which) {
								//修改下载状态  和   下载状态类型    设置未
								downloadDB.updateDownloadStatusType(model.resId, Constant.DOWN_STATUS_TYPE_WAIT);
								//刷新listview列表信息
								setResult(downloadDB.queryDownloadedAllItems());
								Intent intent = new Intent(Constant.SERVICE_ACTION_START_DELETE);
								intent.putExtra("resid", model.resId);
								intent.setClass(mContext, DownloadService.class);
								mContext.startService(intent);
							}
						})
				.setNegativeButton("取消",
						new DialogInterface.OnClickListener() {
							public void onClick (DialogInterface dialog,int which) {
							}
						}).show();
			}
		});
		
		convertView.setTag(itemViewHolder);
		return convertView;
	}
	
	/**
	 * 检查网络
	 * @return
	 */
	private boolean checkNet(){
		boolean flag = Tools.getNetworkStatus(mContext);
		if(!flag){
			Toast.makeText(mContext, "请开启网络后再进行下载", Toast.LENGTH_SHORT).show();
		}
		return flag;
	}
	
	
	/**
	 * 更改进度条
	 */
	public void updatePercent(String resId, int downloadSize, int size, int status) {
		synchronized (mListView) {
			int count = mListView.getChildCount();
			for(int i=0; i<count; i++) {
				Object view = mListView.getChildAt(i).getTag();
				if(view instanceof DownloadViewItem) {
					DownloadViewItem viewHolder = (DownloadViewItem)view;
					if(viewHolder.id.equals(resId)) {
						//根据状态修改按钮文字
						if(status == Constant.DOWN_STATUS_DOWNING || status == Constant.DOWN_STATUS_WAIT){
							itemViewHolder.mPauseDownloadButton.setText("暂停");
						}else if(status == Constant.DOWN_STATUS_STOP){
							itemViewHolder.mPauseDownloadButton.setText("继续");
						}else if(status == Constant.DOWN_STATUS_FAIL){
							itemViewHolder.mPauseDownloadButton.setText("失败");
						}
						if(size == 0) {
							viewHolder.progressBar.setProgress(0);
						} else {
							viewHolder.progressBar.setMax(size);
							viewHolder.progressBar.setProgress(downloadSize);
						}
						
						if(mListView.isShown() == false) {
							return;
						}
						
						String percent = "";
						String hasDownSize = "";
						double kSize = (double)downloadSize /1024;
						if(kSize >= 1000) {
							double dSize = (double)downloadSize /1024 / 1024;
							hasDownSize = new DecimalFormat("###,###.##M").format(dSize);
						} else {
							hasDownSize = new DecimalFormat("###K").format(kSize);
						}
						percent += "(" + hasDownSize + "/";
						double tSize = (double)size / 1024 / 1024;
						String totalSize = new DecimalFormat("###,###.##M").format(tSize);
						percent += totalSize + ")";
						String percentage = "";
						
						//if size equals 0 , set percentage = 0,to avoid the "NaN" 
						if(size == 0) {
							percentage = "0";
						} else {
							double per = ((double)downloadSize / size) * 100;
							percentage = new DecimalFormat("##").format(per);
						}
						percent = percentage + "%" + percent;
						viewHolder.percentage.setText(percent);
						break;
					}
				}
			}
		}
	}
	
	/**
	 * 更改按钮
	 */
	public void updateButton(String resId, int status) {
		synchronized (mListView) {
			int count = mListView.getChildCount();
			for(int i=0; i<count; i++) {
				Object view = mListView.getChildAt(i).getTag();
				if(view instanceof DownloadViewItem) {
					DownloadViewItem itemViewHolder = (DownloadViewItem)view;
					if(itemViewHolder.id.equals(resId)) {
						//根据状态修改按钮文字
						if(status == Constant.DOWN_STATUS_DOWNING || status == Constant.DOWN_STATUS_WAIT){
							itemViewHolder.mPauseDownloadButton.setText("暂停");
						}else if(status == Constant.DOWN_STATUS_STOP){
							itemViewHolder.mPauseDownloadButton.setText("继续");
						}else if(status == Constant.DOWN_STATUS_FAIL){
							itemViewHolder.mPauseDownloadButton.setText("失败");
						}
						break;
					}
				}
			}
		}
	}
	
	//刷新listview列表信息
	public synchronized void setResult(List<DownloadModel> result) {
		if(result != null) {
			if(mData != null) {
				synchronized (mData) {
					mData = result;
					down1 = down2 = down3 = true;
					this.notifyDataSetChanged();
				}
			}
		}
	}
	
	/**
	 * 获取对应状态信息数量
	 */
	public int getStatusCount(int status){
		int count = 0;
		for(DownloadModel info : mData){
			if(info.statusType == status){
				count++;
			}
		}
		return count;
	}
	
	public class DownloadViewItem {
		public TextView downloadText;

		public int type ;
		
		public String id = "";
		// ** 下载文件名称*/
		public TextView nameTextView;
		
		// ** 下载进度条*/
		public ProgressBar progressBar;
		
		// ** 下载百分比*/
		public TextView percentage;
		
		// ** 文件大小*/
		public TextView textSize;

		// ** 下载按钮 */
		public Button downloadButton;
		
		// ** 删除下载按钮 */
		private Button mDelDownloadButton;
		
		// ** 暂停下载按钮 */
		private Button mPauseDownloadButton;
		
		// ** 已下载提示 */
		private TextView mDownloadedTextView;
		
		//** 正在下载区域 */
		private LinearLayout mDownloadIngLayout;
	}
}
