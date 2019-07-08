package com.HelcPDA;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcPDA.MapViewActivity.MyWLConnLis1;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.SimpleAdapter;

public class SendCardActivity extends Activity implements OnClickListener{

	private Button sendCardSearch;
	private EditText editText;
	private ListView listView;
	private ImageView toPrevePage4;
	private WLClient wlconn;
	public  ProgressDialog progressDialog;   //正在加载中,加载框 
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
	    setContentView(R.id.send_card);
	    
	    initContainer();
	    
		wlconn = WLClient.createInstance(SendCardActivity.this);
	}
    
	private void initContainer() {
		sendCardSearch=(Button)findViewById(R.id.sendCard_search);
		sendCardSearch.setOnClickListener(this);
		
		editText = (EditText)findViewById(R.id.sendCard_text);
		
		listView=(ListView)findViewById(R.id.sendCard_list);
		
		toPrevePage4=(ImageView)findViewById(R.id.toPrevePage4);
		toPrevePage4.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch(v.getId()){
		case R.id.sendCard_search:
			editText.getText();
			JSONObject obj=new JSONObject();
			showProgressDialog(SendCardActivity.this, "提示", "工号查询中,请稍等");
		    wlconn.connect(new MyWLConnLis("maintainancePlanItemListAction.do?method=toSearchCompletedAssG",obj.toString(),SendCardActivity.class.getName(),"handleResultForCommit3",SendCardActivity.this,SendCardActivity.class,"工号查询",progressDialog)); //定时查找的数据
			break;
		case R.id.toPrevePage4:
			break;
		  
		default:
			break;
		}
		
	}
	/*
	   * 提示加载
	   */
	  public  void showProgressDialog(Activity activity,String title, String message) {
	    if (progressDialog == null) {
	      progressDialog = ProgressDialog.show(activity, title,
	          message, true, false);
	    } else if (progressDialog.isShowing()) {
	    	 progressDialog.dismiss();
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
	//单独加载信息
	class MyWLConnLis implements WLResponseListener {
				String url = "";
				String params_str = "";
				String class_name = "";
				String method = "";
				Activity ctxn;
			    Class Ntx;
				String flag = "";
			    ProgressDialog progressDialog;   //正在加载中,加载框 
				public MyWLConnLis(String url, String params, String class_name, String method, Activity ctx,Class Ntx, String flag,ProgressDialog progressDialog) {
					this.url = url;
					this.params_str = params;
					this.class_name = class_name;
					this.method = method;
					this.ctxn = ctx;
					this.Ntx=Ntx;
					this.flag = flag;	
					this.progressDialog=progressDialog;
				}
				
				private void MyWLConnList1() {
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
					JSONObject obk=new JSONObject();
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
//						ctx.finish();
						try {
							if (!class_name.equals("") && !method_name.equals("")) {
								if (Looper.myLooper() == null) {
									Looper.prepare();
								}
								 if (progressDialog != null && progressDialog.isShowing()) {
								      progressDialog.dismiss();
								    }
								 try {
								  String tempString=arg0.getResponseText();
								  Log.e("arg0",tempString);
								  String tempV=tempString.substring(tempString.indexOf("{msgid"),tempString.indexOf("responseID"));
								  String tempC=tempV.substring(0,tempV.indexOf("}"))+"}";
								  obk= new JSONObject(tempC);
								  Log.e("b1","b1");
									} catch (Exception e) {
										e.printStackTrace();
									}
								if("工号查询".equals(flag)){
//									ArrayList datalist=new ArrayList();
//									int length=MapViewActivity.tempArroudArray.length;
//									for(int i=0;i<length;i++){
//										Map map = new HashMap<String, String>();
//										map.put("value", MapViewActivity.tempArroudArray[i]);
//										datalist.add(map);
//									}
//									MySimpleAdapter myadapter = new MySimpleAdapter(ctx,datalist, R.layout.lv_element_mapemp_mar, new String[]{"value"}, new int[]{R.id.tv_msg});
//									listView.setAdapter(myadapter);
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
