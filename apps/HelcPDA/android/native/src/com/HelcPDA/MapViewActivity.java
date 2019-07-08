package com.HelcPDA;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ConfigurationInfo;
import android.content.res.Configuration;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.location.Location;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.HelcPDA.resource.Config;
import com.HelcPDA.resource.DemoConfig;
//import com.HelcPDA.resource.DemoMapView;
import com.HelcPDA.resource.MessageBox;
import com.HelcPDA.resource.MyWLConnLis;
/*
import com.mapbar.android.location.CellLocationProvider;
import com.mapbar.android.location.LocationListener;
import com.mapbar.map.CalloutStyle;
import com.mapbar.map.CustomAnnotation;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.Overlay;
import com.mapbar.map.PolylineOverlay;
import com.mapbar.map.Vector2D;
import com.mapbar.mapdal.NativeEnv;
import com.mapbar.mapdal.WorldManager;
import com.mapbar.poiquery.PoiQuery;
import com.mapbar.poiquery.PoiQueryInitParams;
import com.mapbar.poiquery.ReverseGeocoder;
import com.mapbar.poiquery.ReverseGeocoder.EventHandler;
*/
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;


/**
 * 地图视图
 * 
 * @author malw
 * 
 */
public class MapViewActivity extends Activity implements OnClickListener {

	//地图控制类
//	private DemoMapView mDemoMapView;
	//地图渲染
//	private MapRenderer mRenderer;
	// 地图放大缩小控件
	public ImageView mZoomInImageView = null;
	private ImageView mZoomOutImageView = null;
	//在线离线切换
	private Button mBtnOnline,nearliy,allOfMine,btn_left2dmap,btn_right3dmap,btn_day,
	below_time,below_Man,my_detail,upload_on,upload_off,uploap_card,send_card;
	private RelativeLayout preveBar;
	//在线或离线
	private boolean online = Config.online;
	// For Debugging
	private final static String TAG = "[MapViewActivity]";
	private TextView title; 
	//传递的页面和参数
	public static String requestPage,imsi;
	public static JSONObject requestData;
	public static JSONArray requestArray;
//	public static List<CustomAnnotation> requsetList=new ArrayList<CustomAnnotation>();  //地图保存点list
//	public static List<PolylineOverlay> requestLine=new ArrayList<PolylineOverlay>();   //地图保存
	//坐标信息
	private int longitude,latitude;
	//下属相关信息
	public static String[] tempArray;   //属下信息
	public static String[] tempPersonId=new String[0];
	public static JSONArray tempBelowManArray;  //路径详细信息
	public static String[] tempBelowArray;  //
	public static int index_below=0;// 模拟数据下标
	public static Timer timer,timer1,timer2,timer3;  //再用或未用的定时器
	public static MapViewActivity mapViewActivity;   
	//周围的人的相关信息
	public static JSONArray tempArroudPeople;
	public static String[] tempArroudArray;  //周围的人的信息
	//UUID
	//public static String uuids;
	
	public  ProgressDialog progressDialog;   //正在加载中,加载框 
	public static String[] tempArroudPersonId;
	protected static JSONArray tempArroudOnePeople;
	public static int Paremeter=0;
	public static String whichPage="";  //判断是哪个页面进入路径详细信息页面(MapActiv或者BelowActivity)
	
	//选择时间使用到的参数
	private static final int DATE_DIALOG_ID = 1;  
    private static final int SHOW_DATAPICK = 0;  
    private int mYear;  
    private int mMonth;  
    private int mDay,mapStyle;    //地图样式  
    
    private WLClient wlconn;
    private String myLocation,work_upload;  //标示 我的位置 ,上班打卡;
	public static String isBleowChoicse,belowChoiseWho; //是否下属轨迹
	public static String bleowTitle,myContent;  //下属或自己轨迹的标题,我的资料
	
	public static Toast toastn,toasty,myDetail,workToast;  //上传提示信息
	public  final String KEY = "zxb284-20131219-02-Z-F-A10010";
	
    @Override
	protected void onCreate (Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		 getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		 requestWindowFeature(Window.FEATURE_NO_TITLE);
		 setContentView(R.layout.activity_mapview);
		 
		 mapViewActivity=this;
		 toastn = Toast.makeText(MapViewActivity.this, "距离上次提交不足5分钟,请稍候提交",Toast.LENGTH_SHORT);    
		 toasty = Toast.makeText(MapViewActivity.this, "上传成功",Toast.LENGTH_SHORT);    
		 myDetail=Toast.makeText(MapViewActivity.this, myContent,Toast.LENGTH_SHORT);
		 workToast=Toast.makeText(MapViewActivity.this, "打卡成功",Toast.LENGTH_SHORT);
		 //初始化地图
		initMap();
		//初始化控件
		initView();
		
		//获取imsi
		 wlconn = WLClient.createInstance(MapViewActivity.this);
		//获取周围的人的信息
		try {
			Log.e("MapMain.args","zz:"+MapMain.args.getJSONObject(0).toString());
			wlconn.connect(new MyWLConnLis("empLocationAction.do?method=toSearchNearEmp", MapMain.args.getJSONObject(0).toString(),MapViewActivity.class.getName(),"handleResArroudPeople",MapViewActivity.this,BelowManActivity.class,"1"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		//获取下属信息
		try {
			wlconn.connect(new MyWLConnLis("empLocationAction.do?method=toSearchEmpFromHR", MapMain.args.getJSONObject(0).toString(),MapViewActivity.class.getName(),"handleResultForCommit",MapViewActivity.this,BelowManActivity.class,"1"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			wlconn.connect(new MyWLConnLis1("empLocationAction.do?method=toSearchMyInfo", MapMain.args.getJSONObject(0).toString(),MapViewActivity.class.getName(),"handleResMyInfo",MapViewActivity.this,MapViewActivity.class,"我的资料",progressDialog));
		} catch (Exception e) {
			e.printStackTrace();
		}
		//加载框,第二次进报错
		showProgressDialog(MapViewActivity.this,"提示","正在加载中,请稍候"); 
	
		timer=new Timer();
		timer.schedule(new Task(), 4000);
		
		//初始化时间
	    setDateTime();  
	    requestPage=null;
	    MapViewActivity.tempArray=new String[0];  
        TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
 	    imsi = telephonyManager.getSubscriberId();
 	    
// 	    ActivityManager am=(ActivityManager)getSystemService(MapViewActivity.this.ACCESSIBILITY_SERVICE);
// 	    ConfigurationInfo info=am.getDeviceConfigurationInfo();
//	    Log.e("info版本",""+"版本"+info.reqGlEsVersion);
    }
   
	private void setDateTime() {
		final Calendar c = Calendar.getInstance();  
	       mYear = c.get(Calendar.YEAR);  
	       mMonth = c.get(Calendar.MONTH);  
	       mDay = c.get(Calendar.DAY_OF_MONTH);  
	}


	private class Task extends TimerTask{
		@Override
		public void run() {
			timer.cancel();
			hideProgressDialog(); //隐藏加载框	
		}
	}	
	private class Task1 extends TimerTask{
		@Override
		public void run() {
			timer.cancel();
			hideProgressDialog(); //隐藏加载框	
		}
	}	
	
	private void initMap () {
		try {
			if (DemoConfig.DEBUG) {
				Log.d(TAG, "Before - Initialize the GLMapRenderer Environment");
			}
			// 加载地图
			/*mDemoMapView = (DemoMapView) findViewById(R.id.glView_mapview);
			mDemoMapView.setZoomHandler(handler);*/
		} catch (Exception e) {
			e.printStackTrace();
			new MessageBox(this, false).showDialog(e.getMessage());
		}
	}

	/**
	 * 用于接收DemoMapView的消息
	 * 
	 */
	private Handler handler = new Handler() {
		@Override
		public void handleMessage (Message msg) {
			super.handleMessage(msg);
			switch(msg.what){
			case 1:
				//地图控件加载完毕
				/*mRenderer = mDemoMapView.getMapRenderer();
				mRenderer.setDataMode(MapRenderer.DataMode.both);*/
				break;
			case 100:
				//监听地图缩放 修改按钮状态
				Bundle b = msg.getData();
				mZoomInImageView.setEnabled(b.getBoolean("zoomIn"));
				mZoomOutImageView.setEnabled(b.getBoolean("zoomOut"));
				break;
			case MapViewActivity.SHOW_DATAPICK:  
	             showDialog(DATE_DIALOG_ID);  
	             break;
			}
		}
	};


	/**
	 * 初始化控件
	 */
	private void initView () {
		title= (TextView) findViewById(R.id.tv_title_text);
		title.setText("地图视图");
		title.setClickable(true);
		title.setOnClickListener(this);
		mBtnOnline = (Button)findViewById(R.id.iv_title_online);
		mBtnOnline.setText(Config.getOnlineText(online));
		mBtnOnline.setOnClickListener(this);
		nearliy=(Button)findViewById(R.id.nearliy);   //点击附近
		nearliy.setOnClickListener(this);
		allOfMine=(Button)findViewById(R.id.allofmine); //点击我的
		allOfMine.setOnClickListener(this);
		
		preveBar=(RelativeLayout)findViewById(R.id.preveBar);
		
		below_time=(Button)findViewById(R.id.below_time);
		below_time.setOnClickListener(this);   //属下轨迹
		below_Man=(Button)findViewById(R.id.below_Man);
		below_Man.setOnClickListener(this);   //属下
		my_detail=(Button)findViewById(R.id.my_detail);
		my_detail.setOnClickListener(this);   //资料
		
		uploap_card=(Button)findViewById(R.id.uploap_card);//打卡
		uploap_card.setOnClickListener(this); 
		upload_on=(Button)findViewById(R.id.upload_on);
		upload_on.setOnClickListener(this); 
		upload_off=(Button)findViewById(R.id.upload_off);
		upload_off.setOnClickListener(this); 
		
		findViewById(R.id.my_location).setOnClickListener(this);;
		findViewById(R.id.btn_2dmap).setOnClickListener(this); // 
		findViewById(R.id.btn_3dmap).setOnClickListener(this); // 
		btn_left2dmap=(Button)findViewById(R.id.btn_left2dmap);
		btn_left2dmap.setOnClickListener(this); // 人
		btn_right3dmap=(Button)findViewById(R.id.btn_right3dmap);
		btn_right3dmap.setOnClickListener(this); // 轨迹
		btn_day=(Button)findViewById(R.id.btn_day);
		btn_day.setOnClickListener(this); // 位置上传
		findViewById(R.id.iv_title_back).setOnClickListener(this); // 
		mZoomInImageView = (ImageView) findViewById(R.id.btn_zoom_in); // 
		mZoomOutImageView = (ImageView) findViewById(R.id.btn_zoom_out); // 
		mZoomInImageView.setOnClickListener(this);
		mZoomOutImageView.setOnClickListener(this);
		
		//二期工号提取坐标
		send_card=(Button)findViewById(R.id.send_card);
		send_card.setOnClickListener(this);
		//验证权限
		try {
			if(MapMain.args.optJSONObject(0).optString("isLeader").equals("false")){
				findViewById(R.id.btn_3dmap).setVisibility(View.GONE);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	

	/**
	 * 点击事件监听
	 */
	@Override
	public void onClick (View v) {
		switch (v.getId()) {
		case R.id.nearliy:    //附近
			if(preveBar.getVisibility()==View.VISIBLE){
				preveBar.setVisibility(View.INVISIBLE);
			}else{
				preveBar.setVisibility(View.VISIBLE);   //布局
				btn_left2dmap.setVisibility(View.VISIBLE); //人
				btn_right3dmap.setVisibility(View.INVISIBLE); //轨迹
				btn_day.setVisibility(View.INVISIBLE);//上传
				my_detail.setVisibility(View.GONE);
				below_time.setVisibility(View.GONE);
				below_Man.setVisibility(View.GONE);
				upload_on.setVisibility(View.GONE);
				upload_off.setVisibility(View.GONE);
				send_card.setVisibility(View.GONE);
			}
			break;
		case R.id.allofmine:  //我的
			 if(preveBar.getVisibility()==View.VISIBLE){
				preveBar.setVisibility(View.INVISIBLE);
			}else{
			   preveBar.setVisibility(View.VISIBLE);
			   btn_left2dmap.setVisibility(View.GONE);
			   btn_right3dmap.setVisibility(View.VISIBLE);
			   my_detail.setVisibility(View.VISIBLE);
			   btn_day.setVisibility(View.VISIBLE);
			   below_time.setVisibility(View.GONE);
			   below_Man.setVisibility(View.GONE);
			   upload_on.setVisibility(View.GONE);
			   upload_off.setVisibility(View.GONE);
			   send_card.setVisibility(View.GONE);
			}
			break;
		case R.id.btn_3dmap:
			// 进入属下菜单
			if(preveBar.getVisibility()==View.VISIBLE){
				preveBar.setVisibility(View.INVISIBLE);
			}else{
			   preveBar.setVisibility(View.VISIBLE);
			   btn_left2dmap.setVisibility(View.GONE);
			   btn_right3dmap.setVisibility(View.GONE);
			   btn_day.setVisibility(View.GONE);
			   my_detail.setVisibility(View.GONE);
			   below_time.setVisibility(View.VISIBLE);
			   below_Man.setVisibility(View.VISIBLE);
			   upload_on.setVisibility(View.GONE);
			   upload_off.setVisibility(View.GONE);
			   send_card.setVisibility(View.GONE);
			}
			break;	
		case R.id.uploap_card: 
			//菜单-上传
			if(preveBar.getVisibility()==View.VISIBLE){
				preveBar.setVisibility(View.INVISIBLE);
			}else{
			   preveBar.setVisibility(View.VISIBLE);
			   btn_left2dmap.setVisibility(View.GONE);
			   btn_right3dmap.setVisibility(View.GONE);
			   btn_day.setVisibility(View.GONE);
			   my_detail.setVisibility(View.GONE);
			   below_time.setVisibility(View.GONE);
			   below_Man.setVisibility(View.GONE);
			   upload_on.setVisibility(View.VISIBLE);
			   upload_off.setVisibility(View.VISIBLE);
			   send_card.setVisibility(View.VISIBLE);
			}
	        break;
		case R.id.upload_on:
			//上班上传
			dialog("上班");
			preveBar.setVisibility(View.INVISIBLE);
			break;
		case R.id.upload_off:
			//下班上传
			dialog("下班");
			preveBar.setVisibility(View.INVISIBLE);
			break;
		case R.id.send_card:
			//打卡
			break;
		case R.id.below_time:
			//属下选择轨迹
			belowChoiseWho="yes";
			isBleowChoicse="yes";    //判定是否属下点击
			preveBar.setVisibility(View.INVISIBLE);
			//数据已经加载，跳到属下页面，else 重新加载
			if(MapViewActivity.tempArray.length>0){
				Intent intent1=new Intent(); 
				intent1.setClass(MapViewActivity.this,BelowManActivity.class);
				MapViewActivity.this.startActivity(intent1); 
			}else{
				//获取下属信息
				try {
					wlconn.connect(new MyWLConnLis("empLocationAction.do?method=toSearchEmpFromHR", MapMain.args.getJSONObject(0).toString(),MapViewActivity.class.getName(),"handleForSecondCommit",MapViewActivity.this,BelowManActivity.class,"1"));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		
			break;
		case R.id.below_Man:
			// 进入属下位置页面
			belowChoiseWho="no";
			isBleowChoicse="yes";
			preveBar.setVisibility(View.INVISIBLE);
			//数据已经加载，跳到属下页面，else 重新加载
			if(MapViewActivity.tempArray.length>0){
				Intent intent3=new Intent(); 
				intent3.setClass(MapViewActivity.this,BelowManActivity.class);
				MapViewActivity.this.startActivity(intent3);	
			}else{
				//获取下属信息
				try {
					//Toast.makeText(this, "res:"+MapMain.args.getJSONObject(0).toString(), Toast.LENGTH_SHORT).show();
					wlconn.connect(new MyWLConnLis("empLocationAction.do?method=toSearchEmpFromHR", MapMain.args.getJSONObject(0).toString(),MapViewActivity.class.getName(),"handleForSecondCommit",MapViewActivity.this,BelowManActivity.class,"1"));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			 
			break;
		case R.id.iv_title_online:
			if(online){
				online = false;
//				mRenderer.setDataMode(MapRenderer.DataMode.offline);
			}else{
				online =  true;
//				mRenderer.setDataMode(MapRenderer.DataMode.online);
			}
			mBtnOnline.setText(Config.getOnlineText(online));
			break;
		case R.id.my_location:  
			//查找我的位置
			preveBar.setVisibility(View.INVISIBLE);
			myLocation="mine";
			work_upload="";
			init();
			break;
		case R.id.my_detail:
			//资料
			preveBar.setVisibility(View.INVISIBLE);
			new AlertDialog.Builder(this).setTitle("我的资料").setMessage(myContent+",本机SIM卡串码:"+imsi)
            .setPositiveButton("确定",new DialogInterface.OnClickListener() {//设置确定的按键
                 @Override
                 public void onClick(DialogInterface dialog, int which) {
                 }
             }).show();
			break;
		case R.id.btn_day:
			//上传当前位置  
			myLocation="";
			work_upload="";
			preveBar.setVisibility(View.INVISIBLE);
			init();
			showProgressDialog(MapViewActivity.this,"提示","正在加载中,请稍候"); 
			break;
		case R.id.btn_2dmap:
			// 进入离线数据下载页面
			preveBar.setVisibility(View.INVISIBLE);
			Intent intent = new Intent(this,DownloadActivity.class);
			startActivity(intent);
			break;
		case R.id.btn_left2dmap:
			// 进入周围的人界面
			preveBar.setVisibility(View.INVISIBLE);
			Intent intent2=new Intent(); 
			intent2.setClass(MapViewActivity.this,ArroudPeopleActivity.class);
		    MapViewActivity.this.startActivity(intent2); 
			break;
		case R.id.btn_right3dmap:
			// 我的轨迹
			isBleowChoicse="";
			preveBar.setVisibility(View.INVISIBLE);
			Message msg1=new Message();
			msg1.what = MapViewActivity.SHOW_DATAPICK;
			handler.sendMessage(msg1);
			break;
		case R.id.btn_zoom_in:
			// 放大地图操作
			preveBar.setVisibility(View.INVISIBLE);
//			mDemoMapView.mapZoomIn(mZoomInImageView, mZoomOutImageView);
			// }
			break;
		case R.id.btn_zoom_out:
			// 地图缩小
			preveBar.setVisibility(View.INVISIBLE);
//			mDemoMapView.mapZoomOut(mZoomInImageView, mZoomOutImageView);
			// }
			break;
		case R.id.iv_title_back:
			finish();
			break;
		case R.id.tv_title_text:
			mapStyle++;
			if(mapStyle>=5){
				mapStyle=0;
			}
			switch(mapStyle){
			case 0:
				// 白天视图
//				mRenderer.setStyleClass("DEFAULT");
				break;
			case 1:
				/*// 正北朝上2D视图
				mRenderer.beginAnimations();
				mRenderer.setHeading(0); // 设置角度 0 ~ 360
				mRenderer.setElevation(90); // 设置2d 3d角度
				mRenderer.commitAnimations(2000, MapRenderer.Animation.linear);*/
				break;
			case 2:
				/*// 正北朝上3D视图
				mRenderer.beginAnimations();
				mRenderer.setHeading(0);
				mRenderer.setElevation(27.5f);
				mRenderer.commitAnimations(2000, MapRenderer.Animation.linear);*/
				break;
			case 3:
				// 左转35度2D视图
				/*
				mRenderer.beginAnimations();
				mRenderer.setHeading(35);
				mRenderer.setElevation(90);
				mRenderer.commitAnimations(2000, MapRenderer.Animation.linear);*/
				break;
			case 4:
				// 右转56度3D视图
				/*
				mRenderer.beginAnimations();
				mRenderer.setHeading(304);
				mRenderer.setElevation(27.5f);
				mRenderer.commitAnimations(2000, MapRenderer.Animation.linear);*/
				break;
			
			}
			
			break;
		}
	}
	
	protected void dialog(final String msg) {
                  new AlertDialog.Builder(this).setTitle("打卡上传").setMessage("确定要"+msg+"打卡")
	                             .setPositiveButton("确定",new DialogInterface.OnClickListener() {//设置确定的按键
	                                  @Override
	                                  public void onClick(DialogInterface dialog, int which) {
	                                	  showProgressDialog(MapViewActivity.this,"提示","正在加载中,请稍候");
	                                	 if("上班".equals(msg)){
	                                    	 work_upload=msg;
	                                    	 myLocation="mine";
	                                    	 init();
	                                     }else{
	                                    	 work_upload=msg;
	                                    	 myLocation="mine";
	                                    	 init();
	                                     }
	                                  }
	                              })
	                             .setNegativeButton("取消",new DialogInterface.OnClickListener() {//设置取消按键
	                                 @Override
	                                 public void onClick(DialogInterface dialog, int which) {
	                                     
	                                	 
	                                 }
	                            }).setCancelable(false).show();
                             //设置按返回键是否响应返回，这是是不响应 //显示  
	}
	                            
	                            
	 

	 @Override
	 public void onPause () {
         super.onPause();
         // 其他操作
         /*// 暂停地图
         if(mDemoMapView != null) {
        	 mDemoMapView.onPause();
         }*/
         // 其他操作
	 }
	
	 @Override
	 public void onResume () {
         super.onResume();
         // 其他操作
         //清除地图上的点
         // 恢复地图
         /*
         if (mDemoMapView != null) {
        	 mDemoMapView.onResume();
         }
         // 其他操作
         if(requestPage=="BelowManActivity"){
        	 addOnePoint(requsetList, tempBelowManArray, R.drawable.hotel, tempBelowManArray.length(), 10000);
         }
         if(requestPage=="BelowManActivityAll"){
        	 requestPage=null;
        	//正式打点
        	 addPoint(requsetList, tempBelowManArray, R.drawable.hotel, tempBelowManArray.length(), 10000);
         }
         if(requestPage=="ArroudPeopleOne"){
        	 requestPage=null;
        	 addOnePoint(requsetList, tempArroudOnePeople, R.drawable.hotel, tempArroudOnePeople.length(), 10000);
         }
         if(requestPage=="ArroudPeopleAll"){
        	 requestPage=null;
        	 addPoint(requsetList, tempArroudPeople, R.drawable.hotel, tempArroudPeople.length(), 10000);
         }
         if(requestPage=="BelowManDetaillLActivity"){
        	 addLinePoint(requsetList, tempBelowManArray, R.drawable.hotel, tempBelowManArray.length(), 10500);
         }
       
         */
	 }
	 

	
	@Override
	public void onConfigurationChanged (Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
	}


	/**
	 * 销毁
	 */
	@Override
	public void onDestroy () {
		super.onDestroy();/*
        if (mDemoMapView!=null) {
        	// 此Activity销毁时，销毁地图控件
     	    mDemoMapView.onDestroy();
        }
          mDemoMapView = null;*/
        // 其它资源的清理
        // ...
      
	}
	
	//带线路的点
	/*
	private void addLinePoint(List<CustomAnnotation> requsetListz,
			JSONArray array, int vid, int count, int start) {
		Vector2D pivot = new Vector2D(0.5f, 0.82f);
		//清除地图上的点
		clearPoint();
		//开始打点
	    Point[] points=new Point[count];
		if(count<=0){
			Toast.makeText(this, "暂无信息", Toast.LENGTH_SHORT).show();
		}
		for (int i = 0; i < count; i++) {
			Double tempMLON=(array.optJSONObject(i).optDouble("MLON"));
			Double tempMLAT=(array.optJSONObject(i).optDouble("MLAT"));
			String to1=Double.toString(tempMLON);
			Double tempMLON1=Double.parseDouble(to1.substring(0,to1.length()-1));
			if(tempMLON!=0&&tempMLAT!=0){
				int MLON=(int)(tempMLON1*1E5);
				int MLAT=(int)(tempMLAT*1E5);
				points[i]=new Point(MLON,MLAT);
				CustomAnnotation mCustomAnnotation = null;
			    mCustomAnnotation = new CustomAnnotation(4,new Point(MLON, MLAT),
						start + i, pivot, BitmapFactory.decodeResource(getResources(),whtchPng(i))); 
				CalloutStyle calloutStyle=mCustomAnnotation.getCalloutStyle();
				calloutStyle.titleSize=2;
				calloutStyle.subtitleSize=1;
				calloutStyle.leftIcon = 105;//气泡左侧的图标为空
				calloutStyle.rightIcon = 106;
				mCustomAnnotation.setStyleClass(array.optJSONObject(i).optString("PHONENO"));
				mCustomAnnotation.setCalloutStyle(calloutStyle);
				mCustomAnnotation.setClickable(true);
				  if(requestPage=="BelowManActivity"||requestPage=="BelowManDetaillLActivity"){
					mCustomAnnotation.setTitle(array.optJSONObject(i).optString("TIME")+"-"+array.optJSONObject(i).optString("USERNAME")+"("+array.optJSONObject(i).optString("USERID")+")");
				  }else{
					mCustomAnnotation.setTitle(array.optJSONObject(i).optString("USERNAME"));
				  }
					String arrayString=array.optJSONObject(i).optString("CONTENT");
					if(arrayString.contains("n时")){
						arrayString=array.optJSONObject(i).optString("CONTENT").substring(0, arrayString.indexOf("n时"));
					}
			    mCustomAnnotation.setSubtitle(arrayString);
				mCustomAnnotation.showCallout(true);
				mRenderer.addAnnotation(mCustomAnnotation);
				mRenderer.setWorldCenter(new Point(MLON, MLAT));
				requsetList.add(mCustomAnnotation);
	      }
		}
		int length1=points.length;
		for(int i=0;i<length1;i++){
			if(i!=length1-1){
				  PolylineOverlay polLine	= new PolylineOverlay(new Point[] {
						  points[i],
						  points[i+1] },false);
				   polLine.setColor(0xffaa0000);
				   polLine.setStrokeStyle(Overlay.StrokeStyle.solid);
				   polLine.setWidth(5.0f);
				   mRenderer.addOverlay(polLine);
				   requestLine.add(polLine);	
			}
		}
		
	}
*/

	//真实单点
	/*
	public void addOnePoint(List<CustomAnnotation> list,JSONArray array, int vid, int count,
			int start) {
		Vector2D pivot = new Vector2D(0.5f, 0.82f);
		//清除地图上的点
		clearPoint();
		//开始打点
		if(count<=0){
			Toast.makeText(this, "暂无信息", Toast.LENGTH_SHORT).show();
		}
		for (int i = 0; i < count; i++) {
			Double tempMLON=(array.optJSONObject(i).optDouble("MLON"));
			Double tempMLAT=(array.optJSONObject(i).optDouble("MLAT"));
		
			if(tempMLON!=0&&tempMLAT!=0){
				int MLON=(int)(tempMLON*1E5);
				int MLAT=(int)(tempMLAT*1E5);
				CustomAnnotation mCustomAnnotation = new CustomAnnotation(4,
						new Point(MLON, MLAT),
						start + i, pivot, BitmapFactory.decodeResource(
								getResources(), vid));
				CalloutStyle calloutStyle=mCustomAnnotation.getCalloutStyle();
				calloutStyle.titleSize=2;
				calloutStyle.subtitleSize=1;
				calloutStyle.leftIcon = 105;//气泡左侧的图标为空
				calloutStyle.rightIcon = 106;
				mCustomAnnotation.setCalloutStyle(calloutStyle);
				mCustomAnnotation.setClickable(true);
				  if(requestPage=="BelowManActivity"){
					mCustomAnnotation.setTitle(array.optJSONObject(i).optString("TIME")+"-"+array.optJSONObject(i).optString("USERNAME")+"("+array.optJSONObject(i).optString("USERID")+")");
				  }else{
					mCustomAnnotation.setTitle(array.optJSONObject(i).optString("USERNAME")+"("+array.optJSONObject(i).optString("USERID")+")");
				  }
					String arrayString=array.optJSONObject(i).optString("CONTENT");
					if(arrayString.contains("n时")){
						arrayString=array.optJSONObject(i).optString("CONTENT").substring(0, arrayString.indexOf("n时"));
					}
					mCustomAnnotation.setStyleClass(array.optJSONObject(i).optString("PHONENO"));
					mCustomAnnotation.setSubtitle(arrayString);
					mCustomAnnotation.showCallout(true);
				mRenderer.addAnnotation(mCustomAnnotation);
				mRenderer.setWorldCenter(new Point(MLON,MLAT));
				requsetList.add(mCustomAnnotation);
			}
		}
		
	}
	*/
	//真实多点
	/*
	public void addPoint (List<CustomAnnotation> list,JSONArray array, int vid, int count,
			int start) {
		Vector2D pivot = new Vector2D(0.5f, 0.82f);
		// 随机添加7个点
		clearPoint();
		if(count<=0){
			Toast.makeText(this, "暂无信息", Toast.LENGTH_SHORT).show();
		}
		for (int i = 0; i < count; i++) {
			Double tempMLON=(array.optJSONObject(i).optDouble("MLON"));
			Double tempMLAT=(array.optJSONObject(i).optDouble("MLAT"));
			if(tempMLON!=0&&tempMLAT!=0){
				int MLON=(int)(tempMLON*1E5);
				int MLAT=(int)(tempMLAT*1E5);
				CustomAnnotation mCustomAnnotation = new CustomAnnotation(4,
						new Point(MLON, MLAT),
						start + i, pivot, BitmapFactory.decodeResource(
								getResources(), vid));
				mCustomAnnotation.setClickable(true);
				CalloutStyle calloutStyle=mCustomAnnotation.getCalloutStyle();
				calloutStyle.titleSize=2;
				calloutStyle.subtitleSize=1;
				calloutStyle.leftIcon = 105;//气泡左侧的图标为空
				calloutStyle.rightIcon = 106;
				mCustomAnnotation.setCalloutStyle(calloutStyle);
				mCustomAnnotation.setStyleClass(array.optJSONObject(i).optString("PHONENO"));
				mCustomAnnotation.setTitle(array.optJSONObject(i).optString("USERNAME")+"("+array.optJSONObject(i).optString("USERID")+")");
				String arrayString=array.optJSONObject(i).optString("CONTENT");
				if(arrayString.contains("n时")){
					arrayString=array.optJSONObject(i).optString("CONTENT").substring(0, arrayString.indexOf("n时"));
				}
				mCustomAnnotation.setSubtitle(arrayString);
				mCustomAnnotation.showCallout(true);
				mRenderer.addAnnotation(mCustomAnnotation);
				mRenderer.setWorldCenter(new Point(MLON,MLAT));
				requsetList.add(mCustomAnnotation);
			}
		}
		
	}
	*/
//	//清除地图上的点/线
	public void clearPoint(){/*
		if(requsetList.size()>0){
			for(CustomAnnotation info:requsetList){
				//info.setSelected(false);
				mRenderer.removeAnnotation(info);
				//info.setHidden(true);
			}
			requsetList.clear();
		}
		if(requestLine.size()>0){
			for(PolylineOverlay pol:requestLine){
				mRenderer.removeOverlay(pol);
			}
			requestLine.clear();
		}
	*/}
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
	    	   if("yes".equals(isBleowChoicse)){/*
	    		   if((requestPage=="BelowManActivity"&&requsetList.size()>0)||requestPage=="BelowManDetaillLActivity"){
		        	    String tempID;
				        try {
				        	Log.e("MapViewActivity.tempPersonId", MapViewActivity.tempPersonId+"");
				        	  if(MapViewActivity.tempPersonId.length>0){
				        		  tempID=MapViewActivity.tempPersonId[index_below];
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
						showProgressDialog(MapViewActivity.this,"提示","正在加载中,请稍候"); 
				        wlconn = WLClient.createInstance(MapViewActivity.this);
				        wlconn.connect(new MyWLConnLis1("empLocationAction.do?method=toSearchEmpWholeDay",obj.toString(),MapViewActivity.class.getName(),"handleResultForCommit3",MapViewActivity.this,BelowManDetailActivity.class,"轨迹信息",progressDialog)); //定时查找的数据
		          }else{
				        try {
				        	        String tempID=MapMain.args.getJSONObject(0).getString("USERID");
								    obj.put("DATE", mYear+"-"+(mMonth+1)+"-"+mDay);
									obj.put("USERID",tempID);
									obj.put("imsi", imsi);
									//加载框,第二次进报错
									showProgressDialog(MapViewActivity.this,"提示","正在加载中,请稍候"); 
							        wlconn = WLClient.createInstance(MapViewActivity.this);
							        wlconn.connect(new MyWLConnLis1("empLocationAction.do?method=toSearchEmpWholeDay",obj.toString(),MapViewActivity.class.getName(),"handleResultForCommit3",MapViewActivity.this,BelowManDetailActivity.class,"轨迹信息",progressDialog)); //定时查找的数据
						} catch (JSONException e) {
							e.printStackTrace();
						}
		          }
	    	   */}else{
	    		   try{
	    			MapViewActivity.bleowTitle="";
	    		    String tempID=MapMain.args.getJSONObject(0).getString("USERID");
				    obj.put("DATE", mYear+"-"+(mMonth+1)+"-"+mDay);
					obj.put("USERID",tempID);
					obj.put("imsi", imsi);
					//加载框,第二次进报错
					showProgressDialog(MapViewActivity.this,"提示","正在加载中,请稍候"); 
			        wlconn = WLClient.createInstance(MapViewActivity.this);
			        wlconn.connect(new MyWLConnLis1("empLocationAction.do?method=toSearchEmpWholeDay",obj.toString(),MapViewActivity.class.getName(),"handleResultForCommit3",MapViewActivity.this,BelowManDetailActivity.class,"轨迹信息",progressDialog)); //定时查找的数据 
	    		   }catch(JSONException e){
	    			   e.printStackTrace();
	    		   }
	    	   }
	    	   MapViewActivity.whichPage="MapViewActivity";    //判定调过去的是哪一页？
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
		    //(回传)查找的全部下属名称
			public void handleResultForCommit(String res,Activity ctx,Class Ntx){
				try {
					String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
					String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
					JSONArray BelowManArray=new JSONArray(str1);
					MapViewActivity.requestArray=BelowManArray;
					int length=BelowManArray.length();
					MapViewActivity.tempArray=new String[length];
					MapViewActivity.tempPersonId=new String[length];
					for(int i=0;i<length;i++){
						MapViewActivity.tempArray[i]=(String)BelowManArray.optJSONObject(i).opt("PERSON_NAME");
						MapViewActivity.tempPersonId[i]=(String)BelowManArray.optJSONObject(i).opt("PERSON_ID");
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
	        }
			
			 //(回传)查找的全部下属名称  二次加载。
			public void handleForSecondCommit(String res,Activity ctx,Class Ntx){
				try {
					String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
					String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
					JSONArray BelowManArray=new JSONArray(str1);
					MapViewActivity.requestArray=BelowManArray;
					int length=BelowManArray.length();
					MapViewActivity.tempArray=new String[length];
					MapViewActivity.tempPersonId=new String[length];
					for(int i=0;i<length;i++){
						MapViewActivity.tempArray[i]=(String)BelowManArray.optJSONObject(i).opt("PERSON_NAME");
						MapViewActivity.tempPersonId[i]=(String)BelowManArray.optJSONObject(i).opt("PERSON_ID");
					}
					Intent intent=new Intent(ctx,Ntx);
					startActivity(intent);
				} catch (JSONException e) {
					e.printStackTrace();
				}
	        }
		
			//(回传)查找的周围的人的名称  
			public void handleResArroudPeople(String res,Activity ctx,Class Ntx){
				try {
					String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
					String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
				    tempArroudPeople=new JSONArray(str1);
				    tempArroudOnePeople=tempArroudPeople;
					int length=tempArroudPeople.length();
					MapViewActivity.tempArroudArray=new String[length];
					MapViewActivity.tempArroudPersonId=new String[length];
					for(int i=0;i<length;i++){
						MapViewActivity.tempArroudArray[i]=(String)tempArroudPeople.optJSONObject(i).opt("USERNAME");
						MapViewActivity.tempArroudPersonId[i]=(String)tempArroudPeople.optJSONObject(i).opt("CONTENT");
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			
			//周围的人第一次没加载成功进行第二次加载
			public void handleArroudSecondPeople(String res,Activity ctx,Class Ntx){
				try {
					//Log.e("周围的人的结果集：",""+res);
					String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
					String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
				    tempArroudPeople=new JSONArray(str1);
				    tempArroudOnePeople=tempArroudPeople;
					int length=tempArroudPeople.length();
					MapViewActivity.tempArroudArray=new String[length];
					MapViewActivity.tempArroudPersonId=new String[length];
					for(int i=0;i<length;i++){
						MapViewActivity.tempArroudArray[i]=(String)tempArroudPeople.optJSONObject(i).opt("USERNAME");
						MapViewActivity.tempArroudPersonId[i]=(String)tempArroudPeople.optJSONObject(i).opt("CONTENT");
					}
					Intent intent=new Intent(ctx,Ntx);
					startActivity(intent);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			
		public void handleResultForCommit1(String res,Activity ctx,Class Ntx){
			//隐藏加载框
			JSONArray array = null;
			try {
				String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
				String str1=jsonstr.substring(jsonstr.indexOf("["),jsonstr.indexOf("]")+1);
				//Log.e("单个下属裁剪后资料","信息:"+str1);
				array = new JSONArray(str1);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			int length=array.length();
			if(length>0){
				MapViewActivity.tempBelowManArray=new JSONArray();
				MapViewActivity.tempBelowManArray=array;
				MapViewActivity.requestPage="BelowManActivityAll";//单个下属标示
			}else{
				MapViewActivity.requestPage=null;//单个下属标示
				Toast.makeText(this, "暂无信息", Toast.LENGTH_SHORT).show();
			}
			
		}
		 //单个下属回调
		public void handleResultForCommit3(String res,Activity ctx,Class Ntx){
			//隐藏加载框
			JSONArray array = null;
			try {
				String jsonstr = res.replace("\"{", "{").replace("}\"", "}").replace("\"", "'").replace("\\", "");
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
		}
		
		private int whtchPng(int i) {
			int k=0;
			switch(i){
			case 0:   k=R.drawable.pin_1;  break;
			case 1:   k=R.drawable.pin_2;  break;
			case 2:   k=R.drawable.pin_3;  break;
			case 3:   k=R.drawable.pin_4;  break;
			case 4:   k=R.drawable.pin_5;  break;
			case 5:   k=R.drawable.pin_6;  break;
			case 6:   k=R.drawable.pin_7;  break;
			case 7:   k=R.drawable.pin_8;  break;
			case 8:   k=R.drawable.pin_9;  break;
			case 9:   k=R.drawable.pin_10; break;
			case 10:  k=R.drawable.pin_11; break;
			case 11:  k=R.drawable.pin_12; break;
			case 12:  k=R.drawable.pin_13; break;
			case 13:  k=R.drawable.pin_14; break;
			case 14:  k=R.drawable.pin_15; break;
			case 15:  k=R.drawable.pin_16; break;
			case 16:  k=R.drawable.pin_17; break;
			case 17:  k=R.drawable.pin_18; break;
			case 18:  k=R.drawable.pin_19; break;
			case 19:  k=R.drawable.pin_20; break;
			case 20:  k=R.drawable.pin_21; break;
			case 21:  k=R.drawable.pin_22; break;
			case 22:  k=R.drawable.pin_23; break;
			case 23:  k=R.drawable.pin_24; break;
			case 24:  k=R.drawable.pin_25; break;
			case 25:  k=R.drawable.pin_26; break;
			case 26:  k=R.drawable.pin_27; break;
			case 27:  k=R.drawable.pin_28; break;
			case 28:  k=R.drawable.pin_29; break;
			case 29:  k=R.drawable.pin_30; break;
			case 30:  k=R.drawable.pin_31; break;
			case 31:  k=R.drawable.pin_32; break;
			case 32:  k=R.drawable.pin_33; break;
			case 33:  k=R.drawable.pin_34; break;
			case 34:  k=R.drawable.pin_35; break;
			case 35:  k=R.drawable.pin_36; break;
			case 36:  k=R.drawable.pin_37; break;
			case 37:  k=R.drawable.pin_38; break;
			case 38:  k=R.drawable.pin_39; break;
			case 39:  k=R.drawable.pin_40; break;
			case 40:  k=R.drawable.pin_41; break;
			case 41:  k=R.drawable.pin_42; break;
			case 42:  k=R.drawable.pin_43; break;
			case 43:  k=R.drawable.pin_44; break;
			case 44:  k=R.drawable.pin_45; break;
			case 45:  k=R.drawable.pin_46; break;
			case 46:  k=R.drawable.pin_47; break;
			case 47:  k=R.drawable.pin_48; break;
			case 48:  k=R.drawable.pin_49; break;
			case 49:  k=R.drawable.pin_50; break;
				default:
					k=R.drawable.pin_50_;
					break;
			}
			return k;
			
		}
		
		
		//mapMain
		
//		public MyLocationListener mListener;
//		public CellLocationProvider mCellLocationProvider;
		
		private void init() {
			//初始化定位
			Log.e("1","1");
			initLocation();
			// 初始化POI搜索引擎
			if (DemoConfig.DEBUG) {
				//Log.d(TAG, "Before - Initialize the POIQuery Environment");
			}
			try {
				// 如果授權不通過那麼將拋出異常
				//
//				PoiQueryInitParams param = new PoiQueryInitParams();
//				PoiQuery.getInstance().init(param);
				Log.e("2","2");
			} catch (Exception e) {
				// ！！！此處應該添加保護，如果初始化不成功那麼後續使用PoiQuery相關功能將崩潰！！！
				if (DemoConfig.DEBUG) {
					Log.e(TAG,
							"Error on initializing the PoiQuery Environment -> Reason: "
									+ e.getMessage());
				}
				new MessageBox(this, false).showDialog(e.getMessage());
			}
		}
		
		/**
		 * 初始化定位
		 */
		private void initLocation() {
			try {
				/*//Toast.makeText(cordova.getActivity(), "开始定位", Toast.LENGTH_SHORT).show();
				mListener = new MyLocationListener();
				// 创建定位的CellLocationProvider
				mCellLocationProvider = new CellLocationProvider(this,KEY);
				// 添加定位的监听
				mCellLocationProvider.addLocationListener(mListener);
				// 启动基站定位
				mCellLocationProvider.enableLocation();
				// 启动gps定位
				mCellLocationProvider.enableGPS();*/
				Log.e("3","3");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		/**
		 * 定位监听类
		 * @author malw
		 */
		/*
		class MyLocationListener implements LocationListener{
			*//**
	         * 基站定位监听结果的回调方法，对应需要调用mCellLocationProvider.enableLocation()
	         *//*
			@Override
			public void onLocationChangedByCell(Location location) {
				//处理定位信息
				locationInfo(location);
			}
			
			*//**
	         * GPS定位监听结果的回调方法 ，对应需要调用mCellLocationProvider.enableGPS()
	         *//*
			@Override
			public void onLocationChangedByGPS(Location location) {
				//处理定位信息
				locationInfo(location);
			}
		}*/
		
		/**
		 * 更加定位经纬度 设置地图中心点和显示定位信息
		 * @param location
		 */
		public void locationInfo(Location location){
			try {
				if (location != null) {
					//获取定位经纬度
					//设置车标和地图中心点位置
					Log.e("4","4");
					MapMain.point = new Point((int)(location.getLongitude()*1E5),(int)(location.getLatitude()*1E5));
					Bundle bundle = location.getExtras();
					if (bundle != null) {
						MapMain.Address = bundle.getString("address");
						if(MapMain.Address!=null){
							//初始化点坐标
							longitude=(int)(location.getLongitude()*1E5);
							latitude=(int)(location.getLatitude()*1E5);
							if(longitude!=0&&latitude!=0){
								//开始重新画点
					    		clearPoint();
								Point point=new Point(longitude, latitude);
								Config.centerPoint=point;
								MapMain.args.optJSONObject(0).put("PDA3", "PDA3");
								MapMain.args.optJSONObject(0).put("Longitude", location.getLongitude());
								MapMain.args.optJSONObject(0).put("Latitude",location.getLatitude());
								JSONObject obj=new JSONObject();
								TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
							 	imsi = telephonyManager.getSubscriberId();
						            Date date=new Date();
						            obj.put("userid",MapMain.args.getJSONObject(0).getString("USERID"));  
						            obj.put("deviceno",MapMain.args.getJSONObject(0).getString("DeviceNo")); 
						            obj.put("latitude",location.getLatitude());
						            obj.put("longitude",(location.getLongitude()+"")+"1");
						            obj.put("PLAN_START_DT", date);
						            obj.put("ext1","0");
						            obj.put("ext2","");
						            obj.put("ext3", MapMain.Address);
						            obj.put("ext4", "GPS");
						            obj.put("ext5","");
						            obj.put("imsi",imsi);
						            	 final WLClient wlconn = WLClient.createInstance(this);
								            if("上班".equals(work_upload)){
								            	 obj.put("ext5","up");
								            	 try {
										    			wlconn.connect(new MyWLConnLis1("usersLocationAction.do?method=addWorkLocation", obj.toString(),MapViewActivity.class.getName(),"handleResultForWork",MapViewActivity.this,MapViewActivity.class,"上班",progressDialog));
										    		} catch (Exception e) {
										    			e.printStackTrace();
										    		}
								            }else if("下班".equals(work_upload)){
								            	obj.put("ext5","down");
								            	try {
								            		wlconn.connect(new MyWLConnLis1("usersLocationAction.do?method=addWorkLocation", obj.toString(),MapViewActivity.class.getName(),"handleResultForWork",MapViewActivity.this,MapViewActivity.class,"下班",progressDialog));
									    		} catch (Exception e) {
									    			e.printStackTrace();
									    		}
								            }else{
								            	   if("mine".equals(myLocation)){
										            }else{
											    		try {
											    			wlconn.connect(new MyWLConnLis1("usersLocationAction.do?method=addLocation", obj.toString(),MapViewActivity.class.getName(),"handleResultForCommitz",MapViewActivity.this,MapViewActivity.class,"我的位置",progressDialog));
											    		} catch (Exception e) {
											    			e.printStackTrace();
											    		}
										            }
								            }
								            /*
						    		Vector2D pivot = new Vector2D(0.5f, 0.82f);
									CustomAnnotation mCustomAnnotation = new CustomAnnotation(3,
											Config.centerPoint,
											10000 + 1, pivot, BitmapFactory.decodeResource(
													getResources(), R.drawable.gas));
									CalloutStyle calloutStyle1=mCustomAnnotation.getCalloutStyle();
									calloutStyle1.titleSize=2;
									calloutStyle1.subtitleSize=1;
									mCustomAnnotation.setCalloutStyle(calloutStyle1);
									mCustomAnnotation.setClickable(true);
									mCustomAnnotation.setSelected(true);
									mCustomAnnotation.showCallout(true);
									mCustomAnnotation.setTitle("我的位置");
									mCustomAnnotation.setSubtitle(MapMain.Address);
									mRenderer.addAnnotation(mCustomAnnotation);
									mRenderer.setWorldCenter(Config.centerPoint);
									requsetList.add(mCustomAnnotation);*/
						    		closeGPS();
							}
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		/**
		 * 结束定位
		 */
		public void  closeGPS(){/*
			  if(mCellLocationProvider!=null){
				  try {
			        	mCellLocationProvider.disableLocation();
			        	mCellLocationProvider.clearLocationListener();	
				} catch (Exception e) {
					e.printStackTrace();
				}
		        }
		*/}
			
		
		//单独加载信息
		class MyWLConnLis1 implements WLResponseListener {

			String url = "";
			String params_str = "";
			String class_name = "";
			String method = "";
			Activity ctxn;
		    Class Ntx;
			String flag = "";
		    ProgressDialog progressDialog;   //正在加载中,加载框 
			public MyWLConnLis1(String url, String params, String class_name, String method, Activity ctx,Class Ntx, String flag,ProgressDialog progressDialog) {
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
//					ctx.finish();
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
							  String tempV=tempString.substring(tempString.indexOf("{msgid"),tempString.indexOf("responseID"));
							  String tempC=tempV.substring(0,tempV.indexOf("}"))+"}";
							  obk= new JSONObject(tempC);
								} catch (JSONException e) {
									e.printStackTrace();
								}
							if("我的资料".equals(flag)){
								   myContent=obk.optString("msginfo");
								   myDetail.setText(obk.optString("msginfo"));
								   myDetail.show();
							}else if("上班".equals(flag)){
									MapViewActivity.workToast.setText(obk.optString("msginfo"));
									MapViewActivity.workToast.show();
							}else if("下班".equals(flag)){
									MapViewActivity.workToast.setText(obk.optString("msginfo"));
									MapViewActivity.workToast.show();
							}else if("我的位置".equals(flag)){
							    	if("0".equals(obk.optString("msgid"))){
							    	MapViewActivity.toasty.show();
							    	}else{
							    	MapViewActivity.toastn.show();
							    	}
							}else if("轨迹信息".equals(flag)){
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
						}
					} catch (Exception e) {
						e.printStackTrace();
					}finally{
					}
				}
			}
		
		
		}

	
}
