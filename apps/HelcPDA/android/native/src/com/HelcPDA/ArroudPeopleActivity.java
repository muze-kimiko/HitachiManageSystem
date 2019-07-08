package com.HelcPDA;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONObject;

import com.HelcPDA.R;
import com.HelcPDA.resource.MyWLConnLis;
//import com.mapbar.map.MapRenderer;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Toast;

public class ArroudPeopleActivity extends Activity {

	private Button fiveHud,ohouHud,sthouhud,arroudPeple;
	private ImageView toPrevePage3;
	private ListView listview;
	public  ProgressDialog progressDialog1;
	private Timer timer1;
	private ArrayAdapter adapter;
	public  ProgressDialog progressDialog;   //正在加载中,加载框 
	@Override
	protected void onCreate(Bundle savedInstanceState) {
        setContentView(R.layout.arroud_people);		
 		
        initContainer();
    	if(MapViewActivity.tempArroudArray!=null&&MapViewActivity.tempArroudArray.length>0){
			listview=(ListView)findViewById(R.id.arroudPeople_list);
			ArrayList datalist=new ArrayList();
			int length=MapViewActivity.tempArroudArray.length;
			for(int i=0;i<length;i++){
				Map map = new HashMap<String, String>();
				map.put("value", MapViewActivity.tempArroudArray[i]);
				datalist.add(map);
			}
			MySimpleAdapter myadapter = new MySimpleAdapter(this,datalist, R.layout.lv_element_mapemp_mar, new String[]{"value"}, new int[]{R.id.tv_msg});
			listview.setAdapter(myadapter);
			listview.setOnItemClickListener(ItemOnclick1());
    	}else{
			Toast.makeText(this, "暂无周边信息", Toast.LENGTH_SHORT).show();
		}
        
        
		super.onCreate(savedInstanceState);
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
	private void initContainer() {
		fiveHud=(Button)findViewById(R.id.fiveHundrend);
		ohouHud=(Button)findViewById(R.id.thoundHundrend);
		sthouhud=(Button)findViewById(R.id.sthoundHundrend);
		arroudPeple=(Button)findViewById(R.id.iv_title_allarroudPeople);
		toPrevePage3=(ImageView)findViewById(R.id.toPrevePage3);
		fiveHud.setOnClickListener(Onclick());
		ohouHud.setOnClickListener(Onclick());
		sthouhud.setOnClickListener(Onclick());
		toPrevePage3.setOnClickListener(Onclick());
		arroudPeple.setOnClickListener(Onclick());
		initButton();
	}
	private void initButton() {
		if(MapViewActivity.Paremeter==1000){
			ohouHud.setTextColor(R.color.white);
		}else if(MapViewActivity.Paremeter==2000){
			sthouhud.setTextColor(R.color.white);
		}else{
			fiveHud.setTextColor(R.color.white);
		}
		MapViewActivity.Paremeter=0;
	}
	public OnClickListener Onclick(){
		OnClickListener os=new OnClickListener() {
			@Override
			public void onClick(View v) {
				switch(v.getId()){
				case R.id.fiveHundrend:  //500查找数据
					MapViewActivity.Paremeter=500;
//					Toast.makeText(ArroudPeopleActivity.this, "请稍等...", 4000).show();
					showProgressDialog(ArroudPeopleActivity.this,"提示","正在加载中,请稍候"); 
					final WLClient wlconn0 = WLClient.createInstance(ArroudPeopleActivity.this);
					try {
						MapMain.args.getJSONObject(0).put("meter", 500);
						wlconn0.connect(new MyWLConnLis2("empLocationAction.do?method=toSearchNearEmp", MapMain.args.getJSONObject(0).toString(),ArroudPeopleActivity.class.getName(),"handleResArroudPeople",ArroudPeopleActivity.this,ArroudPeopleActivity.class,"2",progressDialog));
					} catch (Exception e) {
						e.printStackTrace();
					}
					break;
				case R.id.thoundHundrend: //1000米查找数据
					MapViewActivity.Paremeter=1000;
//					Toast.makeText(ArroudPeopleActivity.this, "请稍等...", 4000).show();
					showProgressDialog(ArroudPeopleActivity.this,"提示","正在加载中,请稍候"); 
					final WLClient wlconn1 = WLClient.createInstance(ArroudPeopleActivity.this);
					try {
						MapMain.args.getJSONObject(0).put("meter", 1000);
						wlconn1.connect(new MyWLConnLis2("empLocationAction.do?method=toSearchNearEmp", MapMain.args.getJSONObject(0).toString(),ArroudPeopleActivity.class.getName(),"handleResArroudPeople",ArroudPeopleActivity.this,ArroudPeopleActivity.class,"2",progressDialog));
					} catch (Exception e) {
						e.printStackTrace();
					}
					break;
				case R.id.sthoundHundrend: //2000米查找数据
					MapViewActivity.Paremeter=2000;
//					Toast.makeText(ArroudPeopleActivity.this, "请稍等...", 4000).show();
					showProgressDialog(ArroudPeopleActivity.this,"提示","正在加载中,请稍候"); 
					final WLClient wlconn2 = WLClient.createInstance(ArroudPeopleActivity.this);
					try {
						MapMain.args.getJSONObject(0).put("meter", 2000);
						wlconn2.connect(new MyWLConnLis2("empLocationAction.do?method=toSearchNearEmp", MapMain.args.getJSONObject(0).toString(),ArroudPeopleActivity.class.getName(),"handleResArroudPeople",ArroudPeopleActivity.this,ArroudPeopleActivity.class,"2",progressDialog));
					} catch (Exception e) {
						e.printStackTrace();
					}
					break;
				case R.id.iv_title_allarroudPeople: //查找所有人的信息 
					if(MapViewActivity.tempArroudPeople.length()>0){
						MapViewActivity.requestPage="ArroudPeopleAll";
					}
					finish();
					
					break;
				case R.id.toPrevePage3:	
				   //返回上一页
					finish();
					break;
					default:
						break;
				}
			}
		};
		
		return os;
	}
	public class Task1 extends TimerTask{
		@Override
		public void run() {
			timer1.cancel();
		}
		
	}
	private OnItemClickListener ItemOnclick1(){
		OnItemClickListener itemClickListener=new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				MapViewActivity.requestPage="ArroudPeopleOne";
				MapViewActivity.index_below=arg2;
				JSONObject temp=MapViewActivity.tempArroudPeople.optJSONObject(arg2);
				MapViewActivity.tempArroudOnePeople=new JSONArray();
				MapViewActivity.tempArroudOnePeople.put(temp);
				finish();
			}
	
		};
		return itemClickListener;
	}
	
		private Handler handler = new Handler() {
			@Override
			public void handleMessage (Message msg) {
				super.handleMessage(msg);
				switch(msg.what){
				case 5:
				 	if(MapViewActivity.tempArroudArray!=null&&MapViewActivity.tempArroudArray.length>0){
			     	    finish();
			     	   startActivity(new Intent(ArroudPeopleActivity.this,ArroudPeopleActivity.class));
			    	}else{
						Toast.makeText(ArroudPeopleActivity.this, "暂无周边信息", Toast.LENGTH_SHORT).show();
					}
					break;
					default:
						  break;
				}
			}
		};
		
		//(回传)查找的周围的人的名称
//		public void handleResArroudPeople(String res,Activity ctx,Class Ntx){
//			try {
//				//Log.e("周围的人的结果集：",""+res);
//				String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
//				String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
//				MapViewActivity.tempArroudPeople=new JSONArray(str1);
//			    MapViewActivity.tempArroudOnePeople=MapViewActivity.tempArroudPeople;
//				int length=MapViewActivity.tempArroudPeople.length();
//				MapViewActivity.tempArroudArray=new String[length];
//				MapViewActivity.tempArroudPersonId=new String[length];
//				for(int i=0;i<length;i++){
//					MapViewActivity.tempArroudArray[i]=(String)MapViewActivity.tempArroudPeople.optJSONObject(i).opt("USERNAME");
//					MapViewActivity.tempArroudPersonId[i]=(String)MapViewActivity.tempArroudPeople.optJSONObject(i).opt("CONTENT");
//				}
//				Intent intent=new Intent(ctx,Ntx);
//				ctx.finish();
//				ctx.startActivity(intent);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
		
		//单独加载信息
		class MyWLConnLis2 implements WLResponseListener {

			String url = "";
			String params_str = "";
			String class_name = "";
			String method = "";
			Activity ctxn;
		    Class Ntx;
			String flag = "";
			ProgressDialog progressDialog;
			public MyWLConnLis2(String url, String params, String class_name, String method, Activity ctx,Class Ntx, String flag,ProgressDialog progressDialog) {
				this.url = url;
				this.params_str = params;
				this.class_name = class_name;
				this.method = method;
				this.ctxn = ctx;
				this.Ntx=Ntx;
				this.flag = flag;	
				this.progressDialog=progressDialog;
			}
			
			private void MyWLConnList2() {
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
//					ctx.finish();
					try {
						if (!class_name.equals("") && !method_name.equals("")) {
							if (Looper.myLooper() == null) {
								Looper.prepare();
							}
							try {
								//Log.e("周围的人的结果集：",""+res);
								 if (progressDialog1 != null && progressDialog1.isShowing()) {
								      progressDialog1.dismiss();
								    }
								String jsonstr = arg0.getResponseText().replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
								String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
								MapViewActivity.tempArroudPeople=new JSONArray(str1);
							    MapViewActivity.tempArroudOnePeople=MapViewActivity.tempArroudPeople;
								int length=MapViewActivity.tempArroudPeople.length();
								MapViewActivity.tempArroudArray=new String[length];
								MapViewActivity.tempArroudPersonId=new String[length];
								for(int i=0;i<length;i++){
									MapViewActivity.tempArroudArray[i]=(String)MapViewActivity.tempArroudPeople.optJSONObject(i).opt("USERNAME");
									MapViewActivity.tempArroudPersonId[i]=(String)MapViewActivity.tempArroudPeople.optJSONObject(i).opt("CONTENT");
								}
								Intent intent=new Intent(ctx,Ntx);
								ctx.finish();
								ctx.startActivity(intent);
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
