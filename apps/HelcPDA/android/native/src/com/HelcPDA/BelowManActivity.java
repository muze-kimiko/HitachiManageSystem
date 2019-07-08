package com.HelcPDA;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.HelcPDA.resource.MyWLConnLis;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

public class BelowManActivity extends Activity{
	private ImageView imageview;
	private ListView listview;
	private Button All,btn_test;
	private WLClient wlconn;
	private Spinner spinner;
	private ArrayAdapter<String> adapter;
	private Timer timer;
	
	private static final int DATE_DIALOG_ID = 1;  
    private static final int SHOW_DATAPICK = 0;  
    private int mYear;  
    private int mMonth;  
    private int mDay;  
    private ProgressDialog progressDialog;
	
    public static BelowManActivity  belowmanactivity;
    //正在加载中
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		setContentView(R.layout.below_man);
		belowmanactivity=this;
		imageview=(ImageView)findViewById(R.id.toPrevePage1);
		imageview.setOnClickListener(buttonOnclick());
		//全部
		All=(Button)findViewById(R.id.iv_title_allbelowMan1);
		All.setOnClickListener(buttonOnclick());
		wlconn = WLClient.createInstance(BelowManActivity.this);
		//初始化时间
		setDateTime(); 
		if(MapViewActivity.tempArray!=null&&MapViewActivity.tempArray.length>0){
			listview=(ListView)findViewById(R.id.belowMan_list);
			ArrayList datalist=new ArrayList();
			int length=MapViewActivity.tempArray.length;
			for(int i=0;i<length;i++){
				Map map = new HashMap<String, String>();
				map.put("value", MapViewActivity.tempArray[i]);
				datalist.add(map);
			}
			MySimpleAdapter myadapter = new MySimpleAdapter(this,datalist, R.layout.lv_element_mapemp_mar, new String[]{"value"}, new int[]{ R.id.tv_msg});
			listview.setAdapter(myadapter);
			listview.setOnItemClickListener(ItemOnclick());
		}else{
			Toast.makeText(this, "暂无信息", Toast.LENGTH_SHORT).show();
		}
		timer=new Timer();
		super.onCreate(savedInstanceState);
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
	
	private void initData() {
		//查找全部下属
		//加载框
		JSONObject obj=new JSONObject();
		try {
			obj.put("SELECTED_EMP",MapViewActivity.requestArray);
			obj.put("PDA3", "PDA3");
			wlconn.connect(new MyWLConnLis3("empLocationAction.do?method=toSearchSelectEmp",obj.toString(),BelowManActivity.class.getName(),"handleResultForCommit2",this,MapViewActivity.class,"全部下属",progressDialog));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private OnClickListener buttonOnclick() {
		OnClickListener onListener=new OnClickListener() {
			@Override
			public void onClick(View v) {
				switch(v.getId()){
				case R.id.toPrevePage1:   //上一页
					finish();
					break;
				case R.id.iv_title_allbelowMan1:
					//查找全部下属
					showProgressDialog(BelowManActivity.this,"提示","正在加载中,请稍候"); 
					initData();
					break;
				default:
					break;
				}
					}
		};
		return onListener;
	}
	
	
	/*
	   * 提示加载
	   */
	  public  void showProgressDialog(Activity activity,String title, String message) {
	    if (progressDialog == null) {
	      progressDialog = ProgressDialog.show(activity, title,
	          message, true, false);
	    } else if (progressDialog.isShowing()) {
	      progressDialog.setTitle(title);
	      progressDialog.setMessage(message);
	    }

	    progressDialog.show();

	  }

	  /*
	   * 隐藏提示加载
	   */
	  public  void hideProgressDialog() {

	    if (progressDialog != null && progressDialog.isShowing()) {
	      progressDialog.dismiss();
	    }

	  }
	//查找单个下属
	JSONObject obj=new JSONObject();
	private OnItemClickListener ItemOnclick(){
		OnItemClickListener itemClickListener=new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				MapViewActivity.index_below=arg2;
				String tempValue=MapViewActivity.tempArray[arg2];
				String tempID=MapViewActivity.tempPersonId[arg2];
				Date date=new Date();
		        DateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
		        String reTime = format2.format(date);
		      
		        try {
					obj.put("DATE", reTime);
					obj.put("USERID",tempID);
					obj.put("imsi", MapMain.args.getJSONObject(0).opt("imsi"));
				} catch (JSONException e1) {
					e1.printStackTrace();
				}
				try {
					Message message = new Message();  
				    //判定是属下位置还是轨迹进入
				    if("no".equals(MapViewActivity.belowChoiseWho)){
				    	message.what = 1;  
				    	handler.sendMessage(message);
				    	showProgressDialog(BelowManActivity.this,"提示","正在加载中,请稍候");
				    }else if("yes".equals(MapViewActivity.belowChoiseWho)){
				    	message.what = BelowManActivity.SHOW_DATAPICK;  
				    	handler.sendMessage(message);
				    }else{
				    	
				    }
					timer.schedule(new Task(),6000);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}; 
		
		return itemClickListener;
	}
	class Task extends TimerTask{
		@Override
		public void run() {
			timer.cancel();
		}
		
	}
	
	Handler handler = new Handler() {  
	    @Override  
	    public void handleMessage(Message msg) {  
	        // 要做的事情  
	    	switch(msg.what){
	    	case 1:
	    		wlconn.connect(new MyWLConnLis3("empLocationAction.do?method=toSearchEmpWholeDay",obj.toString(),BelowManActivity.class.getName(),"handleResultForCommit1",BelowManActivity.this,MapViewActivity.class,"单个下属",progressDialog)); //定时查找的数据
	    		break;
	    	case BelowManActivity.SHOW_DATAPICK:  
	             showDialog(DATE_DIALOG_ID);  
	             break;
	    	default:
	    		break;
	    	}
	        super.handleMessage(msg);  
	    }  
	};
  
    //单个下属回调
//	public void handleResultForCommit1(String res,Activity ctx,Class Ntx){
//		//隐藏加载框
//		JSONArray array = null;
//		try {
//			String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
//			String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
//			array = new JSONArray(str1);
//		} catch (JSONException e) {
//			e.printStackTrace();
//		}
//		int length=array.length();
//		if(length>0){
//			MapViewActivity.tempBelowManArray=new JSONArray();
//			MapViewActivity.tempBelowArray=new String[length];
//			for(int i=0;i<length;i++){
//				MapViewActivity.tempBelowArray[i]="时间:"+array.optJSONObject(i).optString("TIME")+"  地址:"+array.optJSONObject(i).optString("CONTENT");
//			}
//		}else{
//			MapViewActivity.tempBelowArray=new String[0];
//		}
//		MapViewActivity.bleowTitle= MapViewActivity.tempArray[MapViewActivity.index_below];
//		MapViewActivity.whichPage="";   //判断是哪个页面进入路径信息界面
//		MapViewActivity.tempBelowManArray=array;
//		MapViewActivity.requestPage="BelowManDetaillLActivity";
//		ctx.finish();
//	}
	//全部下属回调
//	public void handleResultForCommit2(String res,Activity ctx,Class Ntx){
//		try {
//			String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
//			String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
//			JSONArray temp=new JSONArray(str1);
//		     if(temp.length()>0){
//		    	 MapViewActivity.requestPage="BelowManActivityAll"; //全部下属标示
//			}
//			MapViewActivity.tempBelowManArray=new JSONArray();
//			MapViewActivity.tempBelowManArray=temp;
//		} catch (JSONException e) {
//			e.printStackTrace();
//		}
//	}
	
	
	private void setDateTime() {
		final Calendar c = Calendar.getInstance();  
	       mYear = c.get(Calendar.YEAR);  
	       mMonth = c.get(Calendar.MONTH);  
	       mDay = c.get(Calendar.DAY_OF_MONTH);  
	}
	
	  /**   
     * 日期控件的事件   
     */    
    private DatePickerDialog.OnDateSetListener mDateSetListener = new DatePickerDialog.OnDateSetListener() {    
	@Override
	public void onDateSet(DatePicker view, int year, int monthOfYear,
			int dayOfMonth) {
		   mYear = year;    
           mMonth = monthOfYear;    
           mDay = dayOfMonth;   
           JSONObject obj=new JSONObject();
           String imsi;
           TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
    	   imsi = telephonyManager.getSubscriberId();
    	   String tempID;
	        try {
	        	  if(MapViewActivity.tempPersonId.length>0){
	        		  tempID=MapViewActivity.tempPersonId[MapViewActivity.index_below];
	        	  }else{
	        		  tempID=MapMain.args.getJSONObject(0).getString("USERID");
	        	  }
				obj.put("DATE", mYear+"-"+(mMonth+1)+"-"+mDay);
				obj.put("USERID",tempID);
				obj.put("imsi", imsi);
			} catch (JSONException e) {
				e.printStackTrace();
			}
	    	//加载框,第二次进报错
	        MapViewActivity.whichPage="";
	        showProgressDialog(BelowManActivity.this,"提示","正在加载中,请稍候"); 
	        wlconn = WLClient.createInstance(BelowManActivity.this);
	        wlconn.connect(new MyWLConnLis3("empLocationAction.do?method=toSearchEmpWholeDay",obj.toString(),MapViewActivity.class.getName(),"handleResultForCommit3",BelowManActivity.this,BelowManDetailActivity.class,"单个下属的历史轨迹",progressDialog)); //定时查找的数据
	}    
    };   
	  
	  @Override    
	    protected Dialog onCreateDialog(int id) {    
	       switch (id) {    
	       case DATE_DIALOG_ID:    
	           return new DatePickerDialog(this, mDateSetListener, mYear, mMonth,    
	                  mDay);  
	       }  
	       return null;    
	    }    
	    
	    @Override    
	    protected void onPrepareDialog(int id, Dialog dialog) {    
	       switch (id) {    
	       case DATE_DIALOG_ID:    
	           ((DatePickerDialog) dialog).updateDate(mYear, mMonth, mDay);    
	           break;  
	       }  
	    }  
	
	  //单独加载信息
		 class MyWLConnLis3 implements WLResponseListener {

					String url = "";
					String params_str = "";
					String class_name = "";
					String method = "";
					Activity ctxn;
				    Class Ntx;
					String flag = "";
					ProgressDialog progressDialog;
					public MyWLConnLis3(String url, String params, String class_name, String method, Activity ctx,Class Ntx, String flag,ProgressDialog progressDialog) {
						this.url = url;
						this.params_str = params;
						this.class_name = class_name;
						this.method = method;
						this.ctxn = ctx;
						this.Ntx=Ntx;
						this.flag = flag;	
						this.progressDialog=progressDialog;
					}
					
					private void MyWLConnList3() {
					}
					
					@Override
					public void onFailure(WLFailResponse arg0) {
					}

					@Override
					public void onSuccess(WLResponse arg0) {
						WLProcedureInvocationData invkeData = new WLProcedureInvocationData("HttpAdapter_PDA", "getStories_pda");
						Object[] params = new Object[]{url,params_str};
						invkeData.setParameters(params);
						WLRequestOptions wloption = new WLRequestOptions();
						wloption.setTimeout(180000);
						WLClient wlclient = WLClient.getInstance();
						ArrayList<Header> al = wloption.getHeaders();
						int length = al.size();
						wlclient.invokeProcedure(invkeData, new MyWLInvoke(class_name, method, ctxn), wloption);
					}
					
					private class MyWLInvoke implements WLResponseListener {

						String class_name = "";
						String method_name = "";
						Activity ctx;
						public MyWLInvoke(String class_name, String method, Activity ctx) {
							this.class_name = class_name;
							this.method_name = method;
							this.ctx = ctx;
						}
						
						private void MyWLInvoke() {
						}
						
						@Override
						public void onFailure(WLFailResponse arg0) {
						}

						@Override
						public void onSuccess(WLResponse arg0) {
//							ctx.finish();
							try {
								if (!class_name.equals("") && !method_name.equals("")) {
									if (Looper.myLooper() == null) {
										Looper.prepare();
									}
									try {
										//Log.e("周围的人的结果集：",""+res);
										 if (progressDialog != null && progressDialog.isShowing()) {
										      progressDialog.dismiss();
										    }
										 if("全部下属".equals(flag)){
												try {
													String jsonstr = arg0.getResponseText().replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
													String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
													JSONArray temp=new JSONArray(str1);
												     if(temp.length()>0){
												    	 MapViewActivity.requestPage="BelowManActivityAll"; //全部下属标示
													}
													MapViewActivity.tempBelowManArray=new JSONArray();
													MapViewActivity.tempBelowManArray=temp;
													ctx.finish();
												} catch (JSONException e) {
													e.printStackTrace();
												}
										 }else if("单个下属".equals(flag)){
											 JSONArray array = null;
												try {
													String jsonstr =arg0.getResponseText().replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
													String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
													array = new JSONArray(str1);
												} catch (JSONException e) {
													e.printStackTrace();
												}
												int length=array.length();
												if(length>0){
													MapViewActivity.tempBelowManArray=new JSONArray();
													MapViewActivity.tempBelowArray=new String[length];
													for(int i=0;i<length;i++){
														MapViewActivity.tempBelowArray[i]="时间:"+array.optJSONObject(i).optString("TIME")+"  地址:"+array.optJSONObject(i).optString("CONTENT");
													}
												}else{
													MapViewActivity.tempBelowArray=new String[0];
												}
												MapViewActivity.bleowTitle= MapViewActivity.tempArray[MapViewActivity.index_below];
												MapViewActivity.whichPage="";   //判断是哪个页面进入路径信息界面
												MapViewActivity.tempBelowManArray=array;
												MapViewActivity.requestPage="BelowManDetaillLActivity";
												ctx.finish();
										 }else if("单个下属的历史轨迹".equals(flag)){
											//隐藏加载框
												JSONArray array = null;
												try {
													String jsonstr = arg0.getResponseText().replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
													String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
													array = new JSONArray(str1);
												} catch (JSONException e) {
													e.printStackTrace();
												}
												int length=array.length();
												if(length>0){
													MapViewActivity.tempBelowManArray=new JSONArray();
													MapViewActivity.tempBelowArray=new String[length];
													for(int i=0;i<length;i++){
														MapViewActivity.tempBelowArray[i]="时间:"+array.optJSONObject(i).optString("TIME")+"  地址:"+array.optJSONObject(i).optString("CONTENT");  
													}
													MapViewActivity.bleowTitle=array.optJSONObject(0).optString("USERNAME");  //标题
													MapViewActivity.tempBelowManArray=array;
													Log.e("MapViewActivity.whichPage:", MapViewActivity.whichPage);
												}else{
													MapViewActivity.tempBelowManArray=new JSONArray();
													MapViewActivity.tempBelowArray=new String[0];
												}
												Intent intent=new Intent(ctx,Ntx);
												ctx.startActivity(intent);
										 }else{
											 
										 }
										 
										 
									} catch (Exception e) {
										e.printStackTrace();
									}
								}
							} catch (Exception e) {
								e.printStackTrace();
							}finally{
							}
						}
					}
				}
	
}
