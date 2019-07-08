package com.gzunicorn.operation.maintainance;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.HelcPDA.R;
import com.HelcPDA.R.color;
import com.HelcPDA.util.Base64Imp;
import com.gzunicorn.operation.dynamic_xml.XmlMissCheckBox;
import com.gzunicorn.operation.dynamic_xml.XmlMissEditBox;
import com.gzunicorn.operation.dynamic_xml.XmlMissForm;
import com.gzunicorn.operation.dynamic_xml.XmlMissFormfiled;
import com.gzunicorn.operation.dynamic_xml.XmlMissPickOne;
import com.gzunicorn.operation.dynamic_xml.XmlMissRadio;
import com.gzunicorn.platform.util.CommentUtils;
import com.gzunicorn.platform.util.ReadFileUtil;
import com.gzunicorn.platform.util.FileUtil;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Instrumentation;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.Settings;
import android.text.Html;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.LinearLayout.LayoutParams;
import android.widget.Toast;

public class PrepareItem extends Activity {
	// 方便查看是哪个类放出的消息
	String TAG = PrepareItem.class.getName();
	
	String folder_url = Environment.getExternalStorageDirectory() + "/UMS/XML/";
	
//	private String IN_STORAGE_PATH = ctx.getApplicationInfo().dataDir;
	
	private XmlMissForm theForm;
	ProgressDialog progressDialog;
	Handler progressHandler;
	String name, cname, task_row_id, mp_id, HIS_COUNT, CURR_COUNT,SBL_ROW_ID;
	
	private String username = null, userid = null, versionName = null, uuid = null, nettyHost = null, httptype = "http";//keys代表流水号
	int versionCode;
	
	private int mYear;
    private int mMonth;
    private int mDay;
    static final int DATE_DIALOG_ID = 0;
    
	private boolean isComplete = false;
	
	private boolean isDownLoad = false;
	
	HashMap<Button, String> buttonMap = null;
	
	private LinearLayout ll_view;
	private Button btn_saveAndExit;
	
	private View v_menu;
	
	private PopupWindow pw;
	private boolean isShow = false;
	
	Instrumentation inst = new Instrumentation();
	private AlertDialog ad = null;
	
	// 定义路径
	String path_IMAGE = "IMAGE/.image/";
	String path_ROOT = Environment.getExternalStorageDirectory() + "/HELC";
	
	String data_id = "";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		//初始化基础信息
      	userid = "yk";
      	
      //一进来就获得当前时间并显示
        final Calendar c = Calendar.getInstance();   
        mYear = c.get(Calendar.YEAR);   
        mMonth = c.get(Calendar.MONTH);   
        mDay = c.get(Calendar.DAY_OF_MONTH);
		
        initView();
        
		Intent startingIntent = getIntent();
		// 判断是否获取传过来的 Intent
		if (startingIntent == null) {
			Log.e("错误消息：  ", "没有传数据过来");
			this.finish();
			return;
		}
		name = startingIntent.getStringExtra("name");
		cname = startingIntent.getStringExtra("cname");
		SBL_ROW_ID = startingIntent.getStringExtra("SBL_ROW_ID");
		task_row_id = startingIntent.getStringExtra("task_row_id");
		mp_id = startingIntent.getStringExtra("mp_id");
		HIS_COUNT = startingIntent.getStringExtra("HIS_COUNT");
		CURR_COUNT = startingIntent.getStringExtra("CURR_COUNT");
		isComplete = startingIntent.getBooleanExtra("plan_status",false);
		data_id = startingIntent.getStringExtra("data_id");
		String SDATA = startingIntent.getStringExtra("SDATA");
		
		/*ad = CommentUtils.getCommitDialog(PrepareItem.this, "正在获取项目数据...");
		ad.setCancelable(false);
		ad.show();*/
		if(null == name || "".equals(name)) {
			showMessage("文件名错误！");
			ad.setCancelable(true);
			ad.dismiss();
			PrepareItem.this.finish();
		}
		
		/*DataAccessService service = WorklightBundles.getInstance().getDataAccessService();
		String params = "['testAction?method=toTest','"+jo_temp.toString()+"']";
		ProcedureQName proceQname = new ProcedureQName("HttpAdapter","getStories");
		InvocationResult result = service.invokeProcedure(proceQname, params);
		com.ibm.json.java.JSONObject jo_result_wl = result.toJSON();
		System.out.println("Android_Adapter:"+jo_result_wl.toString());*/
		/*org.json.JSONObject jo_temp = new org.json.JSONObject();
		try {
			jo_temp.put("name", "yangk");
		} catch (JSONException e1) {
			e1.printStackTrace();
		}
		final WLClient wlconn = WLClient.createInstance(this);
		wlconn.connect(new MyWLConnLis("testAction.do?method=toTest",jo_temp.toString(),PrepareItem.class.getName(),"SaveXml"));*/
		
		//获取文件的版本号
		/*
		JSONObject jo_result = MySQLiteUtil.toSearSQLite("XML_VERSION", name, this);
		jo_result = CommentUtils.getStext(jo_result);
		String fileMDate = "";
		if (jo_result.length() == 0) {
			
		} else {
			fileMDate = jo_result.optString("fileMDate");
		}
		GetXMLTask gxmlTask = new GetXMLTask();
		gxmlTask.execute(fileMDate);
		*/
		
		/*String url = dealDataCenter.httptype + "://" + dealDataCenter.nettyHost + "/";
		url += "remote/maintainancePlanItemListAction.do?method=toSearchXML";
		JSONObject joKey = new JSONObject();
		try {
			joKey.put("fileName", name);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		JSONArray args = new JSONArray();
		args.put(url);
		args.put(joKey);
		args.put(null);
		AsyncTaskUtils atUtils = new AsyncTaskUtils(this, ad, args);
		atUtils.toStartTask();*/
		
		SaveXml(startingIntent.getStringExtra("DATA"));
		
		try {
			String saa = SDATA.replace("\\\"", "'").replace("\"", "");
			JSONObject jo = new JSONObject(saa);
			GetFormData(path_ROOT + "/xml/" + name+".xml",jo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	

	/*@Override
	public void HandleTaskResult(JSONObject result) {
		if (result == null) {
			showMessage("网络异常，请稍后重试！");
			PrepareItem.this.finish();
			return ;
		}
		String filePath = result.optString("xml");
		if ("".equals(filePath)) {
			showMessage("此类型项目暂无维护");
			PrepareItem.this.finish();
		}
		try {
			GetFormData(filePath);
		} catch (SAXException e) {
			e.printStackTrace();
		}
	}*/
	
	private void SaveXml(String data) {
		FileUtil.createFolder(path_ROOT + "/xml/");
		if (data != null && !data.equals("") && !data.equals("NOFILE")) {
			Base64Imp.decoderBase64File(data, path_ROOT + "/xml/" + name+".xml");			
		}
	}

	
	private class MyWLConnLis implements WLResponseListener {

		String url = "";
		String params_str = "";
		String class_name = "";
		String method = "";
		public MyWLConnLis(String url, String params, String class_name, String method) {
			this.url = url;
			this.params_str = params;
			this.class_name = class_name;
			this.method = method;
		}
		
		@Override
		public void onFailure(WLFailResponse arg0) {
		}

		@Override
		public void onSuccess(WLResponse arg0) {
			WLProcedureInvocationData invkeData = new WLProcedureInvocationData("HttpAdapter", "getStories");
//			Object[] params = new Object[]{"testAction.do?method=toTest",jo_temp.toString()};
			Object[] params = new Object[]{url,params_str};
			invkeData.setParameters(params);
			WLRequestOptions wloption = new WLRequestOptions();
			wloption.setTimeout(18000);
			WLClient wlclient = WLClient.getInstance();
			wlclient.invokeProcedure(invkeData, new MyWLInvoke(class_name, method), wloption);
		}
		
	}
	
	private class MyWLInvoke implements WLResponseListener {

		String class_name = "";
		String method_name = "";
		public MyWLInvoke(String class_name, String method) {
			this.class_name = class_name;
			this.method_name = method;
		}
		
		@Override
		public void onFailure(WLFailResponse arg0) {
		}

		@Override
		public void onSuccess(WLResponse arg0) {
			System.out.println("wlsresult: "+arg0.getResponseText());
			Method method=null;
			Class<?> className=null;
			Object obj=null;
			try {
				if (!class_name.equals("")) {
					className=Class.forName(class_name);
					obj=className.newInstance();
					method=className.getMethod(method_name, Class.forName("java.lang.String"));
				    method.invoke(obj,arg0.getResponseText());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}
	/**//*
	class GetXMLTask extends AsyncTask<Object, String, JSONObject> {
		HashSet<String> set = null;
		
		@Override
		protected JSONObject doInBackground(Object... params) {
			JSONObject joKey=new JSONObject();
			JSONObject joResult = null;
			try {
				joKey.put("fileName", name);
				String IN_STORAGE_PATH = PrepareItem.this.getApplicationInfo().dataDir + "/xml/" + name+".xml";;
				if (new File(IN_STORAGE_PATH).exists()) {
					joKey.put("fileMDate", (String)params[0]);
				} else {
					joKey.put("fileMDate", "");
				}
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			
			String url = dealDataCenter.httptype + "://" + dealDataCenter.nettyHost + "/";
			url += "remote/maintainancePlanItemListAction.do?method=toSearchXML";
			joResult = dealDataCenter.toNettyPost(url, joKey.toString(), null);
			
			return joResult;
		}

		@Override
		protected void onPostExecute(JSONObject result) {
			super.onPostExecute(result);
			ad.setCancelable(true);
			ad.dismiss();
			if (result == null) {
				showMessage("网络异常，请稍后重试！");
				PrepareItem.this.finish();
				return ;
			}
			//如果没有目录就先创建目录
			String IN_STORAGE_PATH = PrepareItem.this.getApplicationInfo().dataDir + "/xml/";
//			String filePath = folder_url;
			String filePath = IN_STORAGE_PATH;
			FileUtil.createFolder(filePath);
//			FileUtil.createFolder(IN_STORAGE_PATH);
			FileInputStream fis = null;
			FileOutputStream fos = null;
			try {
				// 虽然服务器文件有更新，但是当拿不到服务器最新的文件时还是取回本地的数据
				if (result == null) {
//					filePath = folder_url + name+".xml";
					filePath = filePath + name+".xml";
					GetFormData(filePath);
					return ;
				}
				
				filePath = filePath + name+".xml";
//				filePath = folder_url + name+".xml";
				String filePath_temp = result.optString("xml");

				if ("".equals(filePath_temp)) {
					if (!result.optBoolean("isexits")) {
						showMessage("此类型项目暂无维护");
						PrepareItem.this.finish();
						return ;
					}
				} else {
					if (!"".equals(result.optString("last_mdate"))) {
						fis = new FileInputStream(filePath_temp);
						fos = new FileOutputStream(filePath);
						int date = 0;
						while((date=fis.read()) != -1) {
							fos.write(date);
						}
						fos.flush();
						// 版本号保存进SQLite
						//MySQLiteUtil.toDeleteSQLite("tcode='XML_VERSION' and tid='"+ name +"'", "0", PrepareItem.this);
						//MySQLiteUtil.toSaveSQLite("XML_VERSION", name, "{fileMDate:'"+ result.optString("last_mdate") +"'}", "", PrepareItem.this);
					}
				}
				
				if (new File(filePath).exists()) {
					GetFormData(filePath);
				} else {
					GetFormData(filePath_temp);
				}
				
			} catch (SAXException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				try {
					if (fis != null) {
						fis.close();
					}
					if (fos != null) {
						fos.close();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
				fis = null;
				fos = null;
			}
		}
	}
	*/

	/**
	 * 解析XML文档，获取数据
	 * @param formNumber
	 * @return
	 * @throws SAXException
	 */
	private boolean GetFormData(String filePath, JSONObject jo) throws SAXException {
		
		InputStream is = null;
		InputStreamReader isr = null;
		InputSource ips = null;
		try {
//			Log.i(TAG, "打开的xml：" + filePath);
			is = new FileInputStream(new File(filePath));
			isr = new InputStreamReader(is,"GB2312");
			ips = new InputSource(isr);

			//开始解析并保存数据
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder db;
			Document dom;
			try {
				db = factory.newDocumentBuilder();
				dom = db.parse(ips);//放入流
				Element root = dom.getDocumentElement();
				NodeList forms = root.getElementsByTagName("form");

				if (forms.getLength() < 1) {
					return false;
				}
				Node form = forms.item(0);
				theForm = new XmlMissForm();

				// 获取xml文件标签
				NamedNodeMap map = form.getAttributes();
				theForm.setFormId(map.getNamedItem("id").getNodeValue());
				theForm.setFormName(map.getNamedItem("name").getNodeValue());
				theForm.setFormMsg(map.getNamedItem("message").getNodeValue());

				//
				if (map.getNamedItem("submitTo") != null) {
					theForm.setSubmitTo(map.getNamedItem("submitTo")
							.getNodeValue());
				} else {
					theForm.setSubmitTo("loopback");
				}

				NodeList fields = root.getElementsByTagName("field");

				HashSet<String> set = new HashSet<String>();
				//遍历每一个字段
				int length = fields.getLength();
				for (int i = 0; i < length; i++) {
					Node fieldNode = fields.item(i);
					NamedNodeMap attr = fieldNode.getAttributes();
					XmlMissFormfiled tempField = new XmlMissFormfiled();
					tempField.setName(attr.getNamedItem("name").getNodeValue());
					tempField.setLabel(attr.getNamedItem("label")
							.getNodeValue());
					
					tempField.setType(attr.getNamedItem("type").getNodeValue());
					if (attr.getNamedItem("required").getNodeValue().equals("Y")) {
						tempField.setRequired(true);
					} else {
						tempField.setRequired(false);
					}
					tempField.setImagename(attr.getNamedItem("image").getNodeValue());
					if (!"".equals(attr.getNamedItem("image").getNodeValue())) {
						set.add(attr.getNamedItem("image").getNodeValue());
					}
					tempField.setOptions(attr.getNamedItem("options")
							.getNodeValue());
					tempField.setScope(attr.getNamedItem("scope").getNodeValue());
					theForm.getFields().add(tempField);
				}

				DisplayForm(jo);
				
				//下载图片
				/*GetImageTask g = new GetImageTask();
				g.execute(set);*/
//				DownLoadImage(set);
			} catch (ParserConfigurationException e) {
				e.printStackTrace();
			}
			return true;

		} catch (IOException e) {
			Log.e("错误消息：  ", "Error occurred in ProcessForm:" + e.getMessage());
			e.printStackTrace();
			return false;
		} finally {
			try {
				if(isr != null) {
					isr.close();
				}
				if(is != null) {
					is.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	

	/**
	 * 把解析到的数据转化成控件显示在Activity中
	 * 
	 * @return
	 */
	private boolean DisplayForm(JSONObject jo) {
		try {
			ScrollView sv = new ScrollView(this);
			sv.setFadingEdgeLength(0);
			sv.setBackgroundColor(color.color_bg);

			final LinearLayout ll = new LinearLayout(this);
			sv.addView(ll);
			ll.setOrientation(android.widget.LinearLayout.VERTICAL);
			//装Title的TextView
			TextView tv_Title = new TextView(this);
			tv_Title.setText(theForm.getFormName());
			tv_Title.setTextColor(Color.BLACK);
			tv_Title.setLayoutParams(new LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT, 1));
			tv_Title.setGravity(Gravity.CENTER);
			tv_Title.setPadding(0, 10, 0, 10);
//			tv_Title.setBackgroundResource(color.color_bg);
			
			ll.addView(tv_Title);
			ll.setPadding(10, 0, 10, 0);
			ll.setBackgroundResource(color.color_bg);
			
			LayoutInflater inflater = LayoutInflater.from(this);
			View v = inflater.inflate(R.layout.maintainaceplanprepareproject, null);
			TextView tv = (TextView)v.findViewById(R.id.tv_title);
			tv.setText(theForm.getFormName());
			btn_saveAndExit = (Button)v.findViewById(R.id.btn_toxml);
			Button btn_homepage = (Button)v.findViewById(R.id.btn_homepage);
			btn_saveAndExit.setText("键盘");
			btn_saveAndExit.setOnClickListener(new ButtonClick_B());
//			btn_saveAndExit.setVisibility(View.GONE);
			btn_homepage.setVisibility(View.GONE);
			/*Button btn_tempsave = (Button)v.findViewById(R.id.btn_tempsave);
			btn_tempsave.setVisibility(View.GONE);*/
			Button btn_back = (Button)v.findViewById(R.id.btn_back);
			btn_back.setText("保存");
			
			
			final LinearLayout ll_layout = (LinearLayout) v.findViewById(R.id.ll_field);
			ll_layout.removeAllViews();

			int i;
			ETClick eclick = new ETClick();
			ButtonClick bclick = new ButtonClick();
			buttonMap = new HashMap<Button, String>();
			int index = 0;
			Button btn = null;
			String indexStr = "";
			for (i = 0; i < theForm.fields.size(); i++) {
				if (theForm.fields.elementAt(i).getType().equals("button")) {
					indexStr = "";
					btn = new Button(this);
					btn.setText(theForm.fields.elementAt(i).getLabel()+"项 △");
//					btn.setBackgroundColor(Color.GRAY);
					btn.setBackgroundResource(color.color_bg_spn);
					ll_layout.addView(btn);
					indexStr = ""+(index+1);
					buttonMap.put(btn, indexStr);
				}
				if (theForm.fields.elementAt(i).getType().equals("end")) {
					indexStr += "-"+index;
					buttonMap.put(btn, indexStr);
					btn.setOnClickListener(bclick);
					Button btn_temp = new Button(this);
					btn_temp.setVisibility(View.GONE);
					ll_layout.addView(btn_temp);
				}
				index ++;
				// 判断是否是EditText类型的控件
				if (theForm.fields.elementAt(i).getType().equals("text")) {
					theForm.fields.elementAt(i).obj = new XmlMissEditBox(this,
							(theForm.fields.elementAt(i).isRequired() ? Html.fromHtml("<font color='red'>★</font>")
									: "") +theForm.fields.elementAt(i).getLabel()+ ":",
							"");
					ll_layout.addView((View) theForm.fields.elementAt(i).obj);
					showImages(ll_layout,theForm.fields.elementAt(i).getImagename(),((XmlMissEditBox)theForm.fields.elementAt(i).obj).btn_image);
				}
				// 判断是否是EditText类型的控件(只能输入数字)
				if (theForm.fields.elementAt(i).getType().equals("numeric")) {
					theForm.fields.elementAt(i).obj = new XmlMissEditBox(this,
							(theForm.fields.elementAt(i).isRequired() ? Html.fromHtml("<font color='red'>★</font>")
									: "") +theForm.fields.elementAt(i).getLabel()+ ":",
							"");
					((XmlMissEditBox) theForm.fields.elementAt(i).obj)
							.makeNumeric();
					ll_layout.addView((View) theForm.fields.elementAt(i).obj);
					showImages(ll_layout,theForm.fields.elementAt(i).getImagename(),((XmlMissEditBox)theForm.fields.elementAt(i).obj).btn_image);
				}
				// 判断是否是EditText类型的控件(录入日期)
				if (theForm.fields.elementAt(i).getType().equals("date")) {
					theForm.fields.elementAt(i).obj = new XmlMissEditBox(this,
							(theForm.fields.elementAt(i).isRequired() ? Html.fromHtml("<font color='red'>★</font>")
									: "")+ theForm.fields.elementAt(i).getLabel()+":",
							"");
					((XmlMissEditBox) theForm.fields.elementAt(i).obj)
							.makeDate();
					((XmlMissEditBox) theForm.fields.elementAt(i).getObj()).txtBox.setOnClickListener(eclick);
					ll_layout.addView((View) theForm.fields.elementAt(i).obj);
					showImages(ll_layout,theForm.fields.elementAt(i).getImagename(),((XmlMissEditBox)theForm.fields.elementAt(i).obj).btn_image);
				}
				// 判断是否是Spinner类型的控件
				if (theForm.fields.elementAt(i).getType().equals("choice")) {
					theForm.fields.elementAt(i).obj = new XmlMissPickOne(this,
							(theForm.fields.elementAt(i).isRequired() ? Html.fromHtml("<font color='red'>★</font>")
									: "")+ theForm.fields.elementAt(i).getLabel()+":",
							theForm.fields.elementAt(i).getOptions());
					ll_layout.addView((View) theForm.fields.elementAt(i).obj);
					showImages(ll_layout,theForm.fields.elementAt(i).getImagename(),((XmlMissPickOne)theForm.fields.elementAt(i).obj).btn_image);
				}
				// 判断是否是Radio类型的控件
				if ("radio".equals(theForm.fields.elementAt(i).getType())) {
					if (!theForm.fields.elementAt(i).getOptions().equals("")) {
						String label = (theForm.fields.elementAt(i).isRequired() ? Html.fromHtml(" "+"<font color='red'>★</font>")
								: "")+ theForm.fields.elementAt(i).getLabel()+":";
						theForm.fields.elementAt(i).setObj(
								new XmlMissRadio(this, label, theForm.fields.elementAt(i).getOptions()));
						ll_layout.addView((View) theForm.fields.elementAt(i).getObj());
					} else {
						String label =(theForm.fields.elementAt(i).isRequired() ? Html.fromHtml("<font color='red'>★</font>")
								: "")+ theForm.fields.elementAt(i).getLabel()+ ":";
						theForm.fields.elementAt(i).setObj(
								new XmlMissRadio(this, label));
						ll_layout.addView((View) theForm.fields.elementAt(i).getObj());
					}
					showImages(ll_layout,theForm.fields.elementAt(i).getImagename(),((XmlMissRadio)theForm.fields.elementAt(i).obj).btn_image);
				}
				// 单选框
				if ("checkbox".equals(theForm.fields.elementAt(i).getType())) {
					String label = (theForm.fields.elementAt(i).isRequired() ? Html.fromHtml("<font color='red'>★</font>")
							: "")+ theForm.fields.elementAt(i).getLabel()+":";
					theForm.fields.elementAt(i).setObj(
							new XmlMissCheckBox(this, label));
					ll_layout.addView((View) theForm.fields.elementAt(i).getObj());
					showImages(ll_layout,theForm.fields.elementAt(i).getImagename(),((XmlMissCheckBox)theForm.fields.elementAt(i).obj).btn_image);
				}
//				showImages(ll_layout, theForm.fields.elementAt(i).getImagename(),theForm.fields.elementAt(i).obj);
			}

			btn_back.setOnClickListener(new OnClickListener() {
				boolean isTrue = false;
				@Override
				public void onClick(View arg0) {
					if (!isComplete) {
						//检查必输项 
						if (!CheckForm()) {
							AlertDialog.Builder bd = new AlertDialog.Builder(ll_layout
									.getContext());
							AlertDialog ad = bd.create();
							ad.setTitle("提示");
							ad.setMessage("请输入所有带★号的必填项");
							ad.show();
							return;
						}
						//检查数值的范围
						String checkStr = CheckScope();
						if (checkStr.equals("0")) {
							showMessage("不能输”-“字符");
							return ;
						}
						if (!"".equals(checkStr)) {
							AlertDialog.Builder dialog = new AlertDialog.Builder(PrepareItem.this);
							dialog.setMessage(checkStr+"\n\n是否保存");
							dialog.setTitle("提示");
							dialog.setPositiveButton("是", new DialogInterface.OnClickListener() {
								public void onClick(DialogInterface dialog, int which) {
									JSONObject json = null;
									json = theForm.getJSONResult2();
									try {
										json.put("ROW_ID", task_row_id);
										json.put("SBL_ROW_ID", SBL_ROW_ID);
//										json.put("ItemName", name.split("_")[1]);
										json.put("ItemName", cname);
									} catch (JSONException e) {
										e.printStackTrace();
									}
									saveTOSQLite(json.toString());
									PrepareItem.this.setResult(RESULT_OK);
									PrepareItem.this.finish();
									dialog.dismiss();
								}
							});
							dialog.setNegativeButton("否", new DialogInterface.OnClickListener() {
								@Override
								public void onClick(DialogInterface dialog, int which) {
									dialog.dismiss();
								}
							});
							dialog.create().show();
							/*AlertDialog.Builder bd = new AlertDialog.Builder(ll_layout
									.getContext());
							AlertDialog ad = bd.create();
							ad.setTitle("提示");
							ad.setMessage(checkStr);
							ad.show();*/
							isTrue = true;
							return;
						}
					}
					if (!isTrue) {
						JSONObject json = null;
						json = theForm.getJSONResult2();
						try {
							json.put("ROW_ID", task_row_id);
							json.put("SBL_ROW_ID", SBL_ROW_ID);
							json.put("ItemName", cname);
						} catch (JSONException e) {
							e.printStackTrace();
						}
						saveTOSQLite(json.toString());
						PrepareItem.this.setResult(RESULT_OK);
						PrepareItem.this.finish();
					}
				}
			});
			
			initData(ll_layout,jo);
			ll_view = ll_layout;
//			setContentView(sv);
			setContentView(v);
			setTitle(theForm.getFormName());

			//控制输入
			controlInput(ll_layout);
			
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			showMessage("文档有错误，请检查！");
			Log.e(TAG, "Error Displaying Form");
			return false;
		}
	}
	

	// 检查是否必输
	private boolean CheckForm() {
		try {
			int i;
			boolean good = true;
			int size = theForm.fields.size();
			for (i = 0; i < size; i++) {
				String fieldValue = (String) theForm.fields.elementAt(i)
						.getData();
				/*Log.i(TAG, theForm.fields.elementAt(i).getName() + " is ["
						+ fieldValue + "]");*/
				if (theForm.fields.elementAt(i).isRequired()) {
					if (fieldValue == null) {
						((LinearLayout)theForm.fields.elementAt(i).obj).setFocusable(true);
						((LinearLayout)theForm.fields.elementAt(i).obj).setFocusableInTouchMode(true);
						((LinearLayout)theForm.fields.elementAt(i).obj).requestFocus();
						
						((LinearLayout)theForm.fields.elementAt(i).obj).setFocusable(false);
						((LinearLayout)theForm.fields.elementAt(i).obj).setFocusableInTouchMode(false);
						good = false;
					} else {
						if (fieldValue.trim().length() == 0) {
							((LinearLayout)theForm.fields.elementAt(i).obj).setFocusable(true);
							((LinearLayout)theForm.fields.elementAt(i).obj).setFocusableInTouchMode(true);
							((LinearLayout)theForm.fields.elementAt(i).obj).requestFocus();
							
							((LinearLayout)theForm.fields.elementAt(i).obj).setFocusable(false);
							((LinearLayout)theForm.fields.elementAt(i).obj).setFocusableInTouchMode(false);
							good = false;
						}
					}

				}
			}
			return good;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	//检查输入的范围
	private String CheckScope() {
		String good = "";
		try {
			int i;
			double value = 0;
//			int scope_min = 0, scope_max = 0;
			double scope_min = 0, scope_max = 0;
			String scope = "";
			String value_str = "";
			for (i = 0; i < theForm.fields.size(); i++) {
				if ("numeric".equals((String) theForm.fields.elementAt(i).getType())) {
					scope = (String)theForm.fields.elementAt(i).getScope();
					value_str = (String)theForm.fields.elementAt(i).getData();
					if ("-".equals(value_str.trim())) {
						((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).requestFocus();
						return "0";
					}
					if (!"".equals(scope) && !"".equals(value_str)) {
						value = Double.parseDouble((String)theForm.fields.elementAt(i).getData());
						
						// 判断大于某值或者小于某个值
						if ((scope).split("~")[0].equals("")) {
							scope_max = Double.parseDouble((scope).split("~")[1]);
							if (value > scope_max) {
								((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).requestFocus();
								((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundResource(color.color_bg_met);
								return "部分输入值范围有误!";
							} else {
								((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundColor(Color.WHITE);
								continue ;
							}
						}
						if ((scope).split("~").length == 1 || (scope).split("~")[1].equals("")) {
							scope_min = Double.parseDouble((scope).split("~")[0]);
							if (value < scope_min) {
								((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).requestFocus();
								((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundResource(color.color_bg_met);
								return "部分输入值范围有误!";
							} else {
								((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundColor(Color.WHITE);
								continue ;
							}
						}
						
						// 判断值范围
						scope_min = Double.parseDouble((scope).split("~")[0]);
						scope_max = Double.parseDouble((scope).split("~")[1]);
						if (value < scope_min || value > scope_max) {
							//这里应该是定位到某输入框
							((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).requestFocus();
							((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundResource(color.color_bg_met);
							return "部分输入值范围有误!";
						} else {
							((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundColor(Color.WHITE);
						}
					}
				}
			}
			return good;
		} catch (Exception e) {
			e.printStackTrace();
			return good;
		}
	}
	
	//检查输入的范围
		private void CheckScopeAndSetColor() {
			String good = "";
			try {
				int i;
				double value = 0;
//				int scope_min = 0, scope_max = 0;
				double scope_min = 0, scope_max = 0;
				String scope = "";
				String value_str = "";
				for (i = 0; i < theForm.fields.size(); i++) {
					if ("numeric".equals((String) theForm.fields.elementAt(i).getType())) {
						scope = (String)theForm.fields.elementAt(i).getScope();
						value_str = (String)theForm.fields.elementAt(i).getData();
						if (!"".equals(scope) && !"".equals(value_str)) {
							value = Double.parseDouble((String)theForm.fields.elementAt(i).getData());
							// 判断大于某值或者小于某个值
							if ((scope).split("~")[0].equals("")) {
								scope_max = Double.parseDouble((scope).split("~")[1]);
								if (value > scope_max) {
									// 定位到某输入框
									((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundResource(color.color_bg_met);
								}
								continue ;
							}
							if ((scope).split("~").length == 1 || (scope).split("~")[1].equals("")) {
								scope_min = Double.parseDouble((scope).split("~")[0]);
								if (value < scope_min) {
									// 定位到某输入框
									((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundResource(color.color_bg_met);
								} 
								continue ;
							}
							
							// 判断大于某值或者小于某个值
							scope_min = Double.parseDouble((scope).split("~")[0]);
							scope_max = Double.parseDouble((scope).split("~")[1]);
							if (value < scope_min || value > scope_max) {
								// 定位到某输入框
								((XmlMissEditBox)theForm.fields.elementAt(i).getObj()).txtBox.setBackgroundResource(color.color_bg_met);
							} else {
							}
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	
	private void initData(LinearLayout ll, JSONObject jo) {
		JSONArray args = new JSONArray();
		JSONArray jaResult = new JSONArray();
		
		String tcode = "PLAN_PITEM";
		String listcount = "";
		String sflag = "0";
		
		args.put(" tid='"+ mp_id + "_" + task_row_id + "_" + theForm.getFormId() +"'");
		args.put(tcode);
		args.put(listcount);
		args.put(sflag);
		
		try {
			//results = DatabasePlugin.toSearchRecord(PrepareItem.this, uuid, userid, args, null);
			if(jo == null || !jo.optString("FLAG").equals("")) {
				return ;
			}
			//如果原來沒有存在SQLite里有数据，那么不用初始化数据
			jaResult = jo.optJSONArray("value");
			
			// 遍历这个results，把它放到对应的位置上
			int leng_view = ll.getChildCount();
			View  v_in;
			int index = 0;
			for (int i = 0; i < leng_view; i++) {
				if (ll.getChildAt(i) instanceof Button) {
					continue ;
				}
				v_in = ((LinearLayout)ll.getChildAt(i)).getChildAt(1);
				if (v_in instanceof RadioGroup) {
					int leng = ((RadioGroup)v_in).getChildCount();
					RadioButton rb;
					for(int j = 0; j < leng; j ++) {
						rb = (RadioButton)((RadioGroup)v_in).getChildAt(j);
						if (rb.getText().toString().equals(jaResult.optString(index))) {
							rb.setChecked(true);
							break ;
						}
					}
				}
				if (v_in instanceof EditText) {
					((EditText)v_in).setText(jaResult.optString(index));
				}
				index ++;
			}

			CheckScopeAndSetColor();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 初始化控件
	 */
	private void initView() {
		ButtonClick_B bclick_b = new ButtonClick_B();
		
		LayoutInflater inf = LayoutInflater.from(PrepareItem.this);
        v_menu = inf.inflate(R.layout.prepareitem_menu, null);
        Button btn_1 = (Button) v_menu.findViewById(R.id.btn_1);
        Button btn_2 = (Button) v_menu.findViewById(R.id.btn_2);
        Button btn_3 = (Button) v_menu.findViewById(R.id.btn_3);
        Button btn_4 = (Button) v_menu.findViewById(R.id.btn_4);
        Button btn_5 = (Button) v_menu.findViewById(R.id.btn_5);
        Button btn_6 = (Button) v_menu.findViewById(R.id.btn_6);
        Button btn_7 = (Button) v_menu.findViewById(R.id.btn_7);
        Button btn_8 = (Button) v_menu.findViewById(R.id.btn_8);
        Button btn_9 = (Button) v_menu.findViewById(R.id.btn_9);
        Button btn_0 = (Button) v_menu.findViewById(R.id.btn_0);
        Button btn_dot = (Button) v_menu.findViewById(R.id.btn_dot);
        Button btn_enter = (Button) v_menu.findViewById(R.id.btn_enter);
        Button btn_d = (Button) v_menu.findViewById(R.id.btn_d);
        Button btn_left = (Button) v_menu.findViewById(R.id.btn_left);
        Button btn_right = (Button) v_menu.findViewById(R.id.btn_right);
        Button btn_next = (Button) v_menu.findViewById(R.id.btn_next);
        
        btn_1.setOnClickListener(bclick_b);
        btn_2.setOnClickListener(bclick_b);
        btn_3.setOnClickListener(bclick_b);
        btn_4.setOnClickListener(bclick_b);
        btn_5.setOnClickListener(bclick_b);
        btn_6.setOnClickListener(bclick_b);
        btn_7.setOnClickListener(bclick_b);
        btn_8.setOnClickListener(bclick_b);
        btn_9.setOnClickListener(bclick_b);
        btn_0.setOnClickListener(bclick_b);
        btn_dot.setOnClickListener(bclick_b);
        btn_enter.setOnClickListener(bclick_b);
        btn_d.setOnClickListener(bclick_b);
        btn_left.setOnClickListener(bclick_b);
        btn_right.setOnClickListener(bclick_b);
        btn_next.setOnClickListener(bclick_b);
	}
	
	private class ETClick implements OnClickListener {

		@Override
		public void onClick(View v) {
			String current_date = ((EditText) v).getText().toString().trim();
			if (!"点击选择时间".equals(current_date) && !"".equals(current_date)) {
				String[] strs = current_date.split("-");
				mYear = Integer.parseInt(strs[0]);
				mMonth= (Integer.parseInt(strs[1]) - 1);
				mDay = Integer.parseInt(strs[2]);
			}
			CommentUtils.showDate(PrepareItem.this, ((EditText) v), mYear, mMonth, mDay);
		}
	}
	
	private class ButtonClick implements OnClickListener {

		@Override
		public void onClick(View v) {
			Button btn = (Button)v;
			if (null != buttonMap.get(btn)) {
				int start = Integer.parseInt(buttonMap.get((Button)v).split("-")[0]);
				int end = Integer.parseInt(buttonMap.get((Button)v).split("-")[1]);
				String name = btn.getText().toString().trim().split(" ")[0];
				String flag = btn.getText().toString().trim().split(" ")[1];
				if ("△".equals(flag)) {
					for (int i = start; i < end; i ++) {
						((View)theForm.fields.elementAt(i).getObj()).setVisibility(View.GONE);
					}
					btn.setText(name+" ▽");
				} else {
					for (int i = start; i < end; i ++) {
						((View)theForm.fields.elementAt(i).getObj()).setVisibility(View.VISIBLE);
					}
					btn.setText(name+" △");
				}
			}
		}
	}
	
	private class ButtonClick_B implements OnClickListener{

		@Override
		public void onClick(View v) {
			switch (v.getId()) {
			case R.id.btn_1:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_1);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_2:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_2);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_3:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_3);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_4:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_4);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_5:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_5);
					}
				}){
				}.start();
				break;
			
			case R.id.btn_6:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_6);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_7:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_7);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_8:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_8);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_9:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_9);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_0:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_0);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_dot:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_PERIOD);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_enter:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_ENTER);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_d:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_DEL);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_left:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_DPAD_LEFT);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_right:
				new Thread(new Runnable() {
					@Override
					public void run() {
						inst.sendKeyDownUpSync(KeyEvent.KEYCODE_DPAD_RIGHT);
					}
				}){
				}.start();
				break;
				
			case R.id.btn_toxml:
				ShowMenu();
				break;
				
			case R.id.btn_next:
				toNext();
				break;
			}
		}
	}
	
	private void showImage(LinearLayout ll, final String imageName) {
		FileUtil.createFolder(path_IMAGE);
		if (!"".equals(imageName) && null != imageName) {
			Button btn = new Button(this);
			btn.setText("指示图");
			ll.addView(btn);
			btn.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View v) {
					if(isDownLoad) {
						startActivity(ReadFileUtil.getImageFileIntent(path_IMAGE+imageName));
					} else {
						showMessage("图片正在下载，请稍后重试");
					}
				}
			});
		}
	}
	private void showImages(LinearLayout ll, final String imageName, Button btn) {
		FileUtil.createFolder(path_ROOT+"/PlanExplainBooks/.images");
		if (!"".equals(imageName) && null != imageName) {
			if (btn != null){
				btn.setVisibility(View.VISIBLE);
				btn.setOnClickListener(new OnClickListener() {
					@Override
					public void onClick(View v) {
						if(isDownLoad) {
							startActivity(ReadFileUtil.getImageFileIntent(path_ROOT+"/PlanExplainBooks/.images/"+imageName));
						} else {
							showMessage("图片正在下载，请稍后重试");
						}
					}
				});
			}
		}
	}
	
	
	/**
	 * 异步获数据的类 Object需要传的参数是： TextView:显示正在加载信息提示, 如果没有就传null 方法的参数
	 */
	/*class GetImageTask extends AsyncTask<Object, String, String> {
		HashSet<String> set = null;
		
		@Override
		protected String doInBackground(Object... params) {
			set = (HashSet<String>)params[0];
			DownLoadImage(set);
			return "";
		}

		@Override
		protected void onPostExecute(String result) {
			super.onPostExecute(result);
		}
	}*/
	
	/*private void DownLoadImage(HashSet<String> set) {
		JSONArray jaImage = new JSONArray();
		JSONArray jaLastDate = new JSONArray();
		JSONObject jo_result = null;
		for (String s : set) {
			jo_result = CommentUtils.getStext(MySQLiteUtil.toSearSQLite("IMAGE_VERSION", s, this));
			jaLastDate.put(jo_result.optString("fileMDate"));
			jaImage.put(s);
		}
		
		jo_result = new JSONObject();
		try {
			jo_result.put("IMAGE_NAME", jaImage);
			jo_result.put("IMAGE_MDATE", jaLastDate);
		} catch (JSONException e1) {
			e1.printStackTrace();
		}
		
		String url = dealDataCenter.httptype + "://" + dealDataCenter.nettyHost + "/";
		url += "remote/maintainancePlanItemListAction.do?method=toSearchIMAGE";
		JSONObject result = dealDataCenter.toNettyPost(url, jo_result.toString(), "");
		FileInputStream fis = null;
		FileOutputStream fos = null;
		if (null == result) {
			return ;
		}
		try {
			String path = MaintainancePlanList.ROOTPATH+"/PlanExplainBooks/.images/";
//			String path = this.getApplicationInfo().dataDir + "/PlanExplainBooks/image/";
			JSONObject jo_last_mdate = result.optJSONObject("last_mdates");
			
			for (String s : set) {
				if (!jo_last_mdate.optString(s).equals("")) {
					fis = new FileInputStream(result.optString(s));
					fos = new FileOutputStream(path+s);
					int read = 0;
					while ((read = fis.read()) != -1) {
						fos.write(read);
					}
					fos.flush();
					
					fis.close();
					fos.close();
					
					//保存进SQLite
					MySQLiteUtil.toDeleteSQLite("tcode='IMAGE_VERSION' and tid='"+ s +"'", "0", PrepareItem.this);
					MySQLiteUtil.toSaveSQLite("IMAGE_VERSION", s, "{fileMDate:'"+ jo_last_mdate.optString(s) +"'}", "", PrepareItem.this);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fis != null) {
					fis.close();
				}
				if (fos != null) {
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		isDownLoad = true;
	}*/
	
	/**
	 * 右下角菜单
	 */
	public void ShowMenu() { 
		if(!isShow) {
			LinearLayout ll_temp = (LinearLayout) v_menu.findViewById(R.id.ll_prepareitemMenu);
			int w = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
	        int h = View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED);
	        ll_temp.measure(w, h);
//	        ll_temp.setLayoutParams(new LayoutParams(android.view.ViewGroup.LayoutParams.FILL_PARENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT));
	        pw = new PopupWindow(v_menu, ll_temp.getMeasuredWidth(),ll_temp.getMeasuredHeight());
			pw.setFocusable(false);
			pw.setOutsideTouchable(true);
			pw.showAsDropDown(btn_saveAndExit);
			isShow = true;
		} else {
			pw.dismiss();
			pw = null;
			isShow = false;
		}
	}
	
	/**
	 * 焦距到下一个输入框
	 */
	public void toNext() {
		int size = theForm.fields.size(); 
		int index = -1;
		
		for (int i = 0; i < size; i++) {
			if ("numeric".equals((String) theForm.fields.elementAt(i).getType()) || "text".equals((String) theForm.fields.elementAt(i).getType()) || "date".equals((String) theForm.fields.elementAt(i).getType())) {
				EditText et = ((XmlMissEditBox)theForm.fields.elementAt(i).obj).txtBox;
				if (et.isFocused()) {
					index = i;
				}
			}
			if (index>-1 && index < i && ("numeric".equals((String) theForm.fields.elementAt(i).getType()) || "text".equals((String) theForm.fields.elementAt(i).getType()) || "date".equals((String) theForm.fields.elementAt(i).getType()))) {
				((XmlMissEditBox)theForm.fields.elementAt(i).obj).txtBox.requestFocus();
				break ;
			}
		}
	}
	
	/**
	 * 保存数据
	 * (暂存)
	 * 删掉原来的，保存最新的
	 */
	private void saveTOSQLite(String text) {
		// 保养计划内容的数据 ，这里应该是修改，所以key应该有值的
		JSONArray args = new JSONArray();
		String keys = "";
		String tcode = "PLAN_PITEM";
		String stext = "";
		String files = "";
		String status = "";
		String tid = mp_id + "_" + task_row_id + "_" + name;
		String sflag = "0";

		stext = text;
		args.put(keys);
		args.put(tcode);
		args.put(stext);
		args.put(files);
		args.put(status);
		args.put(sflag);
		args.put(tid);

		try {
			if (data_id == null) {
				data_id = "NOT";
			}
			JSONObject jo_sdata = new JSONObject();
			jo_sdata.put("tcode", tcode);
			jo_sdata.put("tid", tid);
			jo_sdata.put("stext", text);
			Intent inte = new Intent();
			inte.putExtra("sdata", jo_sdata.toString());
			inte.putExtra("data_id", data_id);
			this.setResult(RESULT_OK,inte);
			this.finish();
			/*JSONObject result = DatabasePlugin.toSaveRecord(PrepareItem.this, uuid, userid, versionCode, versionName, args, null);
			showMessage(result.optString("mes"));
			if("1".equals(result.optString("status"))) {
				this.finish();
			}*/
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除本地数据的方法，第一个是where条件，第二个参数是标志，"0"代表自己定义条件
	 * @param whereStr
	 * @param flag
	 * @return
	 */
	private boolean deleteSQLiteDate(String whereStr, String flag) {
		JSONArray args_del = new JSONArray();
		//删除sqllite计划，项目，配件
		args_del.put(whereStr);
		args_del.put(flag);
		try {
			/*JSONObject dr = DatabasePlugin.toDeleteRecord(this, uuid, userid, args_del, null);
//			showMessage(dr.optString("mes"));
			if("0".equals(dr.optString("status"))) {
				return false;
			}*/
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	
    /**
  	 * 点击back按钮时的响应
  	 */
  	@Override
  	public boolean onKeyDown(int keyCode, KeyEvent event) {
  		if (!isComplete) {
  			if(keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
  	  			CommentUtils.CommentDialog("消息", "退出此页面？未保存的信息可能丢失!", this);
  	  		}
  		}
  		return super.onKeyDown(keyCode, event);
  	}
	
	/**
	 * 显示提示信息
	 * @param msg
	 */
	public void showMessage(String msg){
    	Toast.makeText(this, msg, Toast.LENGTH_LONG).show();
    }
	
	/**
     * 控制输入
     */
    private void controlInput (LinearLayout ll) {
    	if (isComplete) {
    		int leng = ll.getChildCount();
    		View v = null;
    		for (int i = 0; i < leng; i ++) {
    			v = ll.getChildAt(i);
    			v.setEnabled(false);
        	}
    	}
    }

}
