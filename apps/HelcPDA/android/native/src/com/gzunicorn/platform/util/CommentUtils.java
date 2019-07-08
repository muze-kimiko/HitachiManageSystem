package com.gzunicorn.platform.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcPDA.R;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Environment;
import android.text.TextPaint;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.SimpleAdapter;
import android.widget.Spinner;
import android.widget.TabHost;
import android.widget.TabWidget;
import android.widget.TextView;
import android.widget.Toast;

public class CommentUtils{
	
	public static JSONObject dataObjec = null;
	
	public static final String MESSAGE = "MESSAGE";
	
	private static int mYear;
    private static int mMonth;
    private static int mDay;
    
    private static EditText current_etDate;
    private static Button current_btnDate;
    
    public static DatePickerDialog dateDialog = null;
    
    static DatePickerDialog.OnDateSetListener mDateSetListener =   
	        new DatePickerDialog.OnDateSetListener() {   
	  
	            public void onDateSet(DatePicker view, int year,    
	                                  int monthOfYear, int dayOfMonth) { 
	            	mYear = year;   
	                mMonth = monthOfYear;   
	                mDay = dayOfMonth;
	                updateDisplay();   
	            }   
	    };
	    
	 // 更新   
	    private static void updateDisplay() {
	    	StringBuffer sb = new StringBuffer();
	    	int len = sb.length();
	    	sb.delete(0, len);
	    	if (current_etDate != null) {
	    		current_etDate.setText(   //月份是从零开始所以要+1
		        		sb.append(mYear).append("-").append(mMonth+1).append("-").append(mDay).append("").toString()
		        		);
	    	} else if (current_btnDate != null) {
	    		current_btnDate.setText(   //月份是从零开始所以要+1
		        		sb.append(mYear).append("-").append(mMonth+1).append("-").append(mDay).append("").toString()
		        		);
	    	}
	    	current_etDate = null;
	    	current_btnDate = null;
	    }  
	
	public static void showDate(Context ctx,Object et, int y, int m ,int d) {
		if (et instanceof Button) {
			current_btnDate = (Button) et;
		} else {
			current_etDate = (EditText) et;			
		}
		if (y == 0) {
			Calendar c = Calendar.getInstance();   
	        mYear = c.get(Calendar.YEAR);   
	        mMonth = c.get(Calendar.MONTH);   
	        mDay = c.get(Calendar.DAY_OF_MONTH);
		} else {
			mYear = y;
			mMonth = m;
			mDay = d;
		}
		dateDialog = new DatePickerDialog(ctx, mDateSetListener, mYear, mMonth, mDay);
		dateDialog.show();
	}
	
	/**
	 * 显示信息
	 * @param ctx
	 * 		属于哪个Context
	 * @param msg
	 * 		要显示的内容
	 */
	public static void showMessage(Context ctx, String msg) {
		Toast.makeText(ctx, msg, Toast.LENGTH_LONG).show();
	}
	
	/**
     * 把存放路径的list转化成字符串
     * @param list
     * @return
     */
    public static String handleList(ArrayList<String> list) {
    	String listStr = "";
    	for (int i = 0; i < list.size(); i ++) {
    		if(i == 0) {
    			listStr += list.get(i);
    			continue ;
    		}
    		listStr += "-" + list.get(i);
    	}
    	return listStr;
    }
    
    /**
     * 把字符串转化成list
     * @return
     */
    public static ArrayList<String> handlePathString(String listStr) {
    	ArrayList<String> list = new ArrayList<String>();
    	String[] strs = listStr.split("-");
    	for (int i = 0; i < strs.length; i ++) {
    		if("".equals(strs[i]) || strs[i] == null) {
    			continue ;
    		}
    		list.add(strs[i]);
    	}
    	return list;
    }
	
	/**
	 * 改变文字颜色
	 * @param v
	 */
	public static void changeContentText(View v, int color) {

		long begin = System.currentTimeMillis();//取开始时间 单位是毫秒
		LinearLayout ll_center = null;
		if(v instanceof LinearLayout) {
			ll_center = (LinearLayout)v;
		} else {
			return ;
		}
		int count = ll_center.getChildCount();
		for(int i = 0; i < count; i +=2) {
			View vTemp = ll_center.getChildAt(i);
			if(vTemp instanceof TextView) {
				((TextView)vTemp).setTextColor(color);
			}
		}
		long end = System.currentTimeMillis();//取结束时间
	}
	
	
	/**
	 * 对话框
	 * @param title : 对话框的标题
	 * @param msg ：提示消息
	 */
	public static void CommentDialog(String title, String msg, final Activity activity) {
		AlertDialog.Builder dialog = new AlertDialog.Builder(activity);
		dialog.setMessage(msg);
		dialog.setTitle(title);
		dialog.setPositiveButton("是", new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
				activity.finish();
			}
		});
		dialog.setNegativeButton("否", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
			}
		});
		dialog.create().show();
	}
	
	/**
	 * 对话框
	 * @param title : 对话框的标题
	 * @param msg ：提示消息
	 */
	public static void CommitDialog(String title, String msg, final Activity activity, final AlertDialog ad, final AsyncTask ta) {
		AlertDialog.Builder dialog = new AlertDialog.Builder(activity);
		if (title == null || "".equals(title)) {
			dialog.setTitle("消息");
		} else {
			dialog.setTitle(title);
		}
		if (msg == null || "".equals(msg)) {
			dialog.setMessage("提交数据？");
		} else {
			dialog.setMessage(msg);
		}
		dialog.setPositiveButton("是", new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
				if (ad != null) {
					ad.show();
					ad.setCancelable(false);
					ta.execute();
				}
			}
		});
		dialog.setNegativeButton("否", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
			}
		});
		dialog.create().show();
	}
	
	/**
	 * 对话框 （数据回滚提示）
	 * @param title : 对话框的标题
	 * @param msg ：提示消息
	 */
	public static void CommitDialog2(String title, String msg, final Activity activity, final AlertDialog ad, final AsyncTask ta) {
		AlertDialog.Builder dialog = new AlertDialog.Builder(activity);
		if (title == null || "".equals(title)) {
			dialog.setTitle("消息");
		} else {
			dialog.setTitle(title);
		}
		if (msg == null || "".equals(msg)) {
			dialog.setMessage("数据回滚,任务数据返回上一个节点？");
		} else {
			dialog.setMessage(msg);
		}
		dialog.setPositiveButton("是", new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
				if (ad != null) {
					ad.show();
					ad.setCancelable(false);
					ta.execute();
				}
			}
		});
		dialog.setNegativeButton("否", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
			}
		});
		dialog.create().show();
	}
	
	/**
	 * 专门为显示工具信息和安全信息准备的提示框 （为了样式）
	 * @param title
	 * @param msg
	 * @param activity
	 */
	public static void CommentDialogSimple2(String title, String msg, final Activity activity, final String key) {
		LinearLayout ll = new LinearLayout(activity);
		ll.setPadding(50, 50, 50, 50);
		final CheckBox cb = new CheckBox(activity);
		cb.setText("今天不再提示");
		cb.setChecked(false);
		if (key != null && !"".equals(key)) {
			ll.addView(cb);
		}
		AlertDialog.Builder dialog = new AlertDialog.Builder(activity);
		dialog.setMessage(msg);
		dialog.setTitle(title);
		dialog.setView(ll);
		dialog.setNegativeButton("确定", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
				if (cb.isChecked()) {
					SharedPreferences sp = activity.getSharedPreferences(MESSAGE, 0);  
					SharedPreferences.Editor editor = sp.edit();
					editor.putString(key, DateUtil.formatDate(new Date()));
					editor.commit();  
				}
			}
		});
		dialog.create().show();
	}
	
	 /**
     * 提交提示框
     * @param activity
     * @param message
     * @return
     */
    public static AlertDialog getCommitDialog(Activity activity, String message) {
    	LayoutInflater inf = LayoutInflater.from(activity);
		View v = inf.inflate(R.layout.commit_message, null);
		AlertDialog.Builder bd = new AlertDialog.Builder(activity);
		AlertDialog ad = bd.create();
		ad.setTitle("提示");
		ad.setView(v);
		if (null!=message && !"".equals(message)) {
			((TextView)v.findViewById(R.id.textView1)).setText(message);
		}
    	
		return ad;
    }
    
    /**
	 * 显示工具信息和安全信息准备的提示框
	 * @param title
	 * @param msg
	 * @param activity
	 */
	public static void CommentDialogSimple(String title, String msg, final Activity activity, final String key) {
		LinearLayout ll = new LinearLayout(activity);
		final CheckBox cb = new CheckBox(activity);
		cb.setText("今天不再提示");
		cb.setChecked(false);
		if (key != null && !"".equals(key)) {
			ll.addView(cb);
		}
		AlertDialog.Builder dialog = new AlertDialog.Builder(activity);
		dialog.setMessage(msg);
		dialog.setTitle(title);
		dialog.setView(ll);
		dialog.setNegativeButton("确定", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
				if (cb.isChecked()) {
					SharedPreferences sp = activity.getSharedPreferences(MESSAGE, 0);  
					SharedPreferences.Editor editor = sp.edit();
					editor.putString(key, DateUtil.formatDate(new Date()));
					editor.commit();  
				}
			}
		});
		dialog.create().show();
	}
	
	/**
	 * 显示工具信息和安全信息准备的提示框,内容显示View的
	 * @param title
	 * @param msg
	 * @param activity
	 */
	public static void CommentDialogSimple3(String title, String msg, final Activity activity, View v) {
		AlertDialog.Builder dialog = new AlertDialog.Builder(activity);
		dialog.setMessage(msg);
		dialog.setTitle(title);
		dialog.setView(v);
		dialog.setNegativeButton("确定", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialog.dismiss();
			}
		});
		dialog.create().show();
	}
	
	/**
	 * 初始化下拉框的值
	 * @param value
	 * @param spn
	 */
	public static void setSpinnerValue (String value, Spinner spn) {
		int tempposition = -1;
		int length = spn.getCount();
		for (int j = 0; j < length; j++) {
			if (value.equals(spn.getItemAtPosition(j).toString())) {
				tempposition = j;
				break;
			}
		}
		if (tempposition != -1) {
			spn.setSelection(tempposition,true);
		}
	}
	
	/**
	 * 比较时间大小
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static int compareDate(String date1, String date2) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d1, d2;
		int flag = 0;
		try {
			d1 = sdf.parse(date1);
			d2 = sdf.parse(date2);
			flag = d1.compareTo(d2);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return flag;
	}
	
	/**
	 * 获取系统时间
	 * @return
	 */
	public String GetDate_Time(){
		String date="";
		SimpleDateFormat dFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		date=dFormat.format(new Date()); 
		 return  date;
	} 
	
	/**
	 * 获取系统时间
	 * @return
	 */
	public String GetDate_Times(){
		String date="";
		SimpleDateFormat dFormat= new SimpleDateFormat("yyyyMMddHHmmss");
		date=dFormat.format(new Date()); 
		 return  date;
	} 
	
	/**
     * 点击样式改变
     */
    public void tabCSS(TabHost tabhost) {
    	TextView tvTab, tv_temp;
		int current = tabhost.getCurrentTab();
		tvTab = (TextView)((RelativeLayout)tabhost.getCurrentTabView()).getChildAt(0);
		tvTab.setTextColor(Color.BLACK);
		//设置粗体
		TextPaint tp = tvTab.getPaint();
		tp.setFakeBoldText(true);
		//tvTab.setBackgroundDrawable();
		//tvTab.setBackgroundResource(R.drawable.btn_return);
		TabWidget twidget = tabhost.getTabWidget();
		int count = twidget.getChildCount();
		for(int i = 0; i < count; i++) {
			View view = twidget.getChildAt(i);
			//view.getLayoutParams().height = 35;
			tv_temp = (TextView)((RelativeLayout)twidget.getChildTabViewAt(i)).getChildAt(0);
			if(i == current){
				continue;
			} else {
				tv_temp.setTextColor(Color.GRAY);
				TextPaint tp2 = tv_temp.getPaint();
				tp2.setFakeBoldText(false);
			}
		}
    }
    
    
	
    public static JSONObject getStext(JSONObject result) {
    	JSONObject jo_result = null;
    	if (result.optJSONArray("rows").length() > 0) {
    			String temp = result.optJSONArray("rows").optJSONObject((result.optJSONArray("rows").length() - 1)).optString("stext").replace("\\", "");
    			try {
    				jo_result = new JSONObject(temp);
    			} catch (JSONException e) {
    				e.printStackTrace();
    			}
		} else {
			jo_result = new JSONObject();
		}
    	return jo_result;
    }
    
    public static JSONArray getStextJA(JSONObject result) {
    	JSONArray ja_result = null;
    	if (result.optJSONArray("rows").length() > 0) {
    			String temp = result.optJSONArray("rows").optJSONObject((result.optJSONArray("rows").length() - 1)).optString("stext").replace("\\", "");
    			try {
    				ja_result = new JSONArray(temp);
    			} catch (JSONException e) {
    				e.printStackTrace();
    			}
		} else {
			ja_result = new JSONArray();
		}
    	return ja_result;
    }
    
    public static void writeLog(String fname,String context) {
    	String logPath = Environment.getExternalStorageDirectory() + "/UMS/temp/missLog";
    	com.gzunicorn.platform.util.FileUtil.createFolder(logPath);
    	File f = new File(logPath+"/" + fname+".txt");
    	
    	OutputStreamWriter osw = null;
    	BufferedWriter bw = null;
    	FileOutputStream fos = null;
		
		try {
			if (f.exists()) {
				fos = new FileOutputStream(f, true);
				osw = new OutputStreamWriter(fos);
				bw = new BufferedWriter(osw);
				bw.newLine();
				if ("##**".equals(context)) {
					bw.newLine();
				} else {
					bw.write(context);
				}
				bw.flush();
				

			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(bw != null) {
					bw.close();
				}
				if (osw != null) {
					osw.close();
				}
				if (fos != null) {
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (f.length() > 1024) {
			if (f.exists()) {
				f.delete();
			}
		}
    }
    
    public static void setSharedPreferences(Context ctx, String flag, int mode, String key, String value) {
    	SharedPreferences sp = ctx.getSharedPreferences(flag, mode);  
		SharedPreferences.Editor editor = sp.edit();
		editor.putString(key, value);
		editor.commit();  
    }
    
    public static String getSharedPreferences(Context ctx, String flag, int mode, String key, String defaultValue) {
    	SharedPreferences sp = ctx.getSharedPreferences(flag, mode);
    	return sp.getString(key, defaultValue);
    }
    
}