package com.HelcPDA;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcPDA.R;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;

public class BelowManDetailActivity extends Activity{

	private ImageView toPrevePage;
	private ListView listview;
	private TextView tv_title_text2;
	private Timer timer;
	private Button luj_Content;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		setContentView(R.layout.below_mandetail);
		//初始化控件
		initContainer();
		//初始化定时器
		timer=new Timer();
		timer.schedule(new Task(), 2000);
		super.onCreate(savedInstanceState);
		
	}
	class Task extends TimerTask{
		@Override
		public void run() {
			timer.cancel();
		}
	}
	
	private void initContainer() {
		toPrevePage=(ImageView)findViewById(R.id.toPrevePage2);
		toPrevePage.setOnClickListener(buttonOnclick());
		listview=(ListView)findViewById(R.id.belowManDetail_list);
		luj_Content=(Button)findViewById(R.id.luj_Content);
		tv_title_text2=(TextView)findViewById(R.id.tv_title_text2);
		tv_title_text2.setText(MapViewActivity.bleowTitle);   //显示标题
		luj_Content.setOnClickListener(buttonOnclick());
		if(MapViewActivity.tempBelowArray!=null&&MapViewActivity.tempBelowArray.length>0){
			ArrayList datalist=new ArrayList();
			int length=MapViewActivity.tempBelowArray.length;
			for(int i=0;i<length;i++){
				Map map = new HashMap<String, String>();
				map.put("value", MapViewActivity.tempBelowArray[i]);
				datalist.add(map);
			}
			MySimpleAdapter myadapter = new MySimpleAdapter(this,datalist, R.layout.lv_element_mapemp_mar, new String[]{"value"}, new int[]{R.id.tv_msg});
			listview.setAdapter(myadapter);
			listview.setOnItemClickListener(ItemOnclick());
		}else{
			Toast.makeText(this, "暂无详细信息", Toast.LENGTH_SHORT).show();
		}
	
	}
	
	/**
	 * MySimpleAdapter
	 * @author user1
	 *
	 */
	private class MySimpleAdapter extends SimpleAdapter {
		

		public MySimpleAdapter(Context context,
				List<? extends Map<String, ?>> data, int resource,
				String[] from, int[] to) {
			super(context, data, resource, from, to);
		}
		
		@Override
		public View getView(final int position, View convertView, ViewGroup parent) {
			View v = super.getView(position, convertView, parent);
			return v;
		}
	}
	private OnClickListener buttonOnclick() {
		OnClickListener clickListener=new OnClickListener() {
			@Override
			public void onClick(View v) {
				switch(v.getId()){
				case R.id.toPrevePage2:   //上一页
						try {
							//是领导进去路径详细信息的情况
//							if(MapMain.args.getJSONObject(0).getString("isLeader").equals("true")){
//								if(("MapViewActivity").equals(MapViewActivity.whichPage)){ 
//									//判断是哪个页面进入路径信息界面,如果Map页面直接进入,那么不需要结束2个页面
//									finish();
//								}else{
//									Intent intent=new Intent(BelowManDetailActivity.this,BelowManActivity.class);
//									startActivity(intent);
//									finish();	 
//								}
//								
//							}else{
								finish();
//     	                      }
						} catch (Exception e) {
							e.printStackTrace();
						}
					break;
				case R.id.luj_Content:
					MapViewActivity.requestPage="BelowManDetaillLActivity";
					finish();
					if(("MapViewActivity").equals(MapViewActivity.whichPage)){ 
						//判断是哪个页面进入路径信息界面,如果Map页面直接进入,那么不需要结束2个页面
					}else{
						BelowManActivity.belowmanactivity.finish();
					}
					break;
				default:
					break;
				}
			}
		};
		return clickListener;
	}
	
	/**
	 *   点击选择单个路径信息
	 * @return
	 */
	private OnItemClickListener ItemOnclick() {
		OnItemClickListener itemClickListener=new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				JSONObject obj=MapViewActivity.tempBelowManArray.optJSONObject(arg2);
				MapViewActivity.tempBelowManArray=new JSONArray();
				MapViewActivity.tempBelowManArray.put(obj);
				MapViewActivity.requestPage="BelowManActivity";
				finish();
				if(("MapViewActivity").equals(MapViewActivity.whichPage)){ 
					//判断是哪个页面进入路径信息界面,如果Map页面直接进入,那么不需要结束2个页面
				}else{
					BelowManActivity.belowmanactivity.finish();
				}
			}
		};
		return itemClickListener;
	}
	
}
