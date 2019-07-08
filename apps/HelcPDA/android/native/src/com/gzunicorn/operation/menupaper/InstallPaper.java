package com.gzunicorn.operation.menupaper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

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

import android.app.AlertDialog;
import android.app.Instrumentation;
import android.app.ProgressDialog;
import android.app.TabActivity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextPaint;
import android.text.TextWatcher;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.PopupWindow;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.Spinner;
import android.widget.TabHost;
import android.widget.TabHost.OnTabChangeListener;
import android.widget.TabHost.TabContentFactory;
import android.widget.TabHost.TabSpec;
import android.widget.TabWidget;
import android.widget.TextView;
import android.widget.Toast;

import com.HelcPDA.R;
import com.HelcPDA.R.color;
import com.HelcPDA.util.Base64Imp;
import com.gzunicorn.operation.dynamic_xml.XmlMissCheckBox_Menu;
import com.gzunicorn.operation.dynamic_xml.XmlMissEditBox_Menu;
import com.gzunicorn.operation.dynamic_xml.XmlMissForm;
import com.gzunicorn.operation.dynamic_xml.XmlMissFormfiled;
import com.gzunicorn.operation.dynamic_xml.XmlMissPickOne;
import com.gzunicorn.operation.dynamic_xml.XmlMissRadio_Menu;
import com.gzunicorn.platform.util.CommentUtils;
import com.gzunicorn.platform.util.DateUtil;
import com.gzunicorn.platform.util.FileUtil;
import com.gzunicorn.platform.util.ReadFileUtil;
import com.worklight.jsonstore.api.JSONStoreCollection;
import com.worklight.jsonstore.api.JSONStoreFindOptions;
import com.worklight.jsonstore.api.JSONStoreQueryPart;
import com.worklight.jsonstore.api.JSONStoreQueryParts;
import com.worklight.jsonstore.api.WLJSONStore;
import com.worklight.jsonstore.exceptions.JSONStoreException;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

public class InstallPaper extends TabActivity {
	// 方便查看是哪个类放出的消息
	String TAG = InstallPaper.class.getName();
	
	String folder_url = Environment.getExternalStorageDirectory() + "/UMS/XML/";
	String ROOTPATH = Environment.getExternalStorageDirectory() + "/UMS";
	String path_ROOT = Environment.getExternalStorageDirectory() + "/HELC";
	
	private XmlMissForm theForm;
	private XmlMissCheckBox_Menu xmcbm;
	ProgressDialog progressDialog;
	Handler progressHandler;
	
	private ArrayList<XmlMissForm> listForm = null;
	private ArrayList<LinearLayout> list_Ll = null;
	
	int versionCode;
	
    static final int DATE_DIALOG_ID = 0;
    public final static String TCODE_mTS_ISCOMMIT = "MENU_TS_ISCOMMIT";
    public final static String TCODE_mCJ_ISCOMMIT = "MENU_CJ_ISCOMMIT";
    public final static String TCODE_mFJ_ISCOMMIT = "MENU_FJ_ISCOMMIT";
    
	private boolean isComplete = false;
	
	private boolean isDownLoad = false;
	
	private LinearLayout ll_view;
	private Button btn_saveAndExit;
	
	private View v_menu;
	
	private PopupWindow pw;
	private boolean isShow = false;
	private TabHost tabhost;
	Instrumentation inst = new Instrumentation();
	
	private AlertDialog ad = null;
	private String moduleFlag = "CJ";
	private String strResultKey;
	private String collectionName;
	private JSONObject jo_data, jo_Commit_Data;
	
	private AlertDialog ad_commit = null, ad_getdata = null;
	
	private String fileName = "MENUPAPER";
	private String title = "";
	
	AlertDialog.Builder dialogt;
	private EditText et_;
	
	private String tid_commit;
	
	private String JL_JY = "";
	String filedata = ""; 
	String data_id = "";
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		listForm = new ArrayList<XmlMissForm>();
		list_Ll = new ArrayList<LinearLayout>();
		jo_Commit_Data = new JSONObject();
		ad = CommentUtils.getCommitDialog(InstallPaper.this, "正在获取项目数据...");
		ad.setCanceledOnTouchOutside(false);
		ad_getdata = CommentUtils.getCommitDialog(this, "正在加载历史数据...");

		//初始化基础信息
      	versionCode = 0;
      	try{
      	PackageInfo info;
      	info = InstallPaper.this.getPackageManager().getPackageInfo(
      			InstallPaper.this.getPackageName(), 0);
      	versionCode = info.versionCode;
      	} catch(Exception e) {
      		e.printStackTrace();
      	}
      	
      	Intent startingIntent = getIntent();
      	if (startingIntent.getStringExtra("moduleFlag") != null) {
      		tid_commit = startingIntent.getStringExtra("TID");
      		moduleFlag = startingIntent.getStringExtra("moduleFlag");
      		/*if (startingIntent.getStringExtra("ELEVATOR_CLASS_CODE").contains("直")) {//判断直梯还是扶梯
      			fileName += "_ZT";
      			title += "直梯";
      		} else if (startingIntent.getStringExtra("ELEVATOR_CLASS_CODE").contains("扶")) {
      			fileName += "_FT";
      			title += "扶梯";
      		} else {
      			fileName = "MENUPAPER_ZT4U";
      			title += "直梯";
      		}
      		
      		if (moduleFlag.equals("CJ")) {
      			title += "初检";
      		} else if (moduleFlag.equals("FJ")) {
      			title += "复检";
      		}*/
      		fileName = startingIntent.getStringExtra("filename");
      		title = startingIntent.getStringExtra("title");
      		data_id = startingIntent.getStringExtra("data_id");
      		try {
    			jo_data = new JSONObject();
    			jo_data.put("TASK_ID", startingIntent.getStringExtra("task_id"));
    			jo_data.put("SEQ_NUM", startingIntent.getStringExtra("seq_num"));
				jo_data.put("TASK_PROCESS_ID", startingIntent.getStringExtra("task_process_id"));
				jo_data.put("ORG_ID", startingIntent.getStringExtra("org_id"));
				jo_data.put("DEBUG_NUM", startingIntent.getStringExtra("debug_num"));
				jo_data.put("INST_PERSON_ID", startingIntent.getStringExtra("init_person_id"));
				jo_data.put("EBS_USER_ID", startingIntent.getStringExtra("ebs_user_id"));
				collectionName = startingIntent.getStringExtra("collectionName");
				filedata = startingIntent.getStringExtra("filedata");
    		} catch (JSONException e) {
    			e.printStackTrace();
    		}
		}
      	
        initView();
        SaveXml(filedata);
        DisplayForm(startingIntent.getStringExtra("SDATA"));
        
		// 当是扶梯的时候或者当速度字段不空的时候就跳过直梯速度选择
		/*if (fileName.contains("FT")) {
			ad.show();
			SaveXml(filedata);
			return ;
		} else if (startingIntent.getStringExtra("PARAM_SD")!=null && !"".equals(startingIntent.getStringExtra("PARAM_SD"))) {
			//获取文件的版本号
			if (Integer.parseInt(startingIntent.getStringExtra("PARAM_SD"))/60 < 4) {
				fileName += "4D";
				title += "(V < 4m/s)";
			} else {
				fileName += "4U";
				title += "(V ≥ 4m/s)";
			}
			ad.show();
			SaveXml(filedata);
			return ;
		}
		
		dialogt = new AlertDialog.Builder(InstallPaper.this);
		dialogt.setMessage("请选择直梯速度类型");
		dialogt.setPositiveButton("<4m/s", new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog, int which) {
				dialogt.setCancelable(true);
				dialog.dismiss();
				fileName += "4D";
				ad.show();
				title += "(V < 4m/s)";
				SaveXml(filedata);
			}
		});
		dialogt.setNegativeButton("≥4m/s", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				dialogt.setCancelable(true);
				dialog.dismiss();
				fileName += "4U";
				ad.show();
				title += "(V ≥ 4m/s)";
				SaveXml(filedata);
			}
		});
		dialogt.create().show();*/
		
		JL_JY = startingIntent.getStringExtra("JL_JY");
	}
	

	class GetXMLTask extends AsyncTask<Object, String, JSONObject> {
		HashSet<String> set = null;
		
		@Override
		protected JSONObject doInBackground(Object... params) {
			JSONObject joKey=new JSONObject();
			JSONObject joResult = null;
			try {
				String filePath = InstallPaper.this.getApplicationInfo().dataDir + "/xml/menupaper/" + fileName + ".xml";
				if (new File(filePath).exists()) {
					joKey.put("fileMDate", (String)params[0]);					
				} else {
					joKey.put("fileMDate", "");
				}
				joKey.put("FILENAME", fileName);
				joKey.put("DATA", jo_data);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			
			/*String url = dealDataCenter.httptype + "://" + dealDataCenter.nettyHost + "/";
			url += "remote/instllMenudPaperAction.do?method=toSearchXML";
			joResult = dealDataCenter.toNettyPost(url, joKey.toString(), null);*/
			
			//更新服务器上的不良项录入数据
			/*if (joResult != null && !"".equals(joResult.optString("LAST_UPDATE_DATE"))) {
				try {
					String str_d1 = joResult.optString("LAST_UPDATE_DATE").replace("_", ":");
					Date d1 = DateUtil.parse(str_d1, DateUtil.DateTimeFormat_YMDHMS);
					JSONArray ja_values = CommentUtils.getStextJA(MySQLiteUtil.toSearSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), InstallPaper.this));
					if (ja_values.length() > 0) {//如果本地数据存在的情况下就比较
						String str_date = ja_values.optJSONObject(ja_values.length()-1).optString("LAST_UPDATE_DATE");
						Date d2 = DateUtil.parse(str_date, DateUtil.DateTimeFormat_YMDHMS);
						if (d1.compareTo(d2) > 0) {//如果服务器上的时间大于PDA SQLite存放数据时候的时间就让服务器上的数据代替掉本地的数据
							if (joResult.optJSONArray("itemValue") != null) {
								Log.i(TAG, "开始保存服务器上的菜单纸..." + joResult.optJSONArray("itemValue").toString());
								MySQLiteUtil.toDeleteSQLite(" tcode='MENU_PITEM_"+ fileName +"' and tid='"+ jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM") +"'", "0", InstallPaper.this);
								MySQLiteUtil.toSaveSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), joResult.optJSONArray("itemValue").toString(), "", InstallPaper.this);
							}
						}
					} else {
						MySQLiteUtil.toDeleteSQLite(" tcode='MENU_PITEM_"+ fileName +"' and tid='"+ jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM") +"'", "0", InstallPaper.this);
						MySQLiteUtil.toSaveSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), joResult.optJSONArray("itemValue").toString(), "", InstallPaper.this);
					}
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}*/
			
			return joResult;
		}

		@Override
		protected void onPostExecute(JSONObject result) {
			super.onPostExecute(result);
			ad.setCancelable(true);
			ad.dismiss();
			/*if (result == null) {
				showMessage("网络异常，请稍后重试！");
				PrepareItem.this.finish();
				return ;
			}*/
			//如果没有目录就先创建目录
//			String filePath = folder_url;
			String filePath = InstallPaper.this.getApplicationInfo().dataDir + "/xml/menupaper/";
			FileUtil.createFolder(filePath);
			FileInputStream fis = null;
			FileOutputStream fos = null;
			try {
				if (result == null) {
					filePath = filePath + fileName + ".xml";
					GetFormData(filePath);
					return ;
				}
				filePath = filePath + fileName + ".xml";
				String filePath_temp = result.optString("xml");
				if ("".equals(filePath_temp)) {
					if (!result.optBoolean("isexits")) {
						showMessage("此类型项目暂无维护");
						InstallPaper.this.finish();
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
						//保存进SQLite
						/*MySQLiteUtil.toDeleteSQLite("tcode='XML_VERSION' and tid='"+ fileName +"'", "0", InstallPaper.this);
						MySQLiteUtil.toSaveSQLite("XML_VERSION", fileName, "{fileMDate:'"+ result.optString("last_mdate") +"'}", "", InstallPaper.this);*/
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
	
	private void SaveXml(String data) {
		String myDir = path_ROOT + "/xml/menu/";
		FileUtil.createFolder(myDir);
		File f = new File(myDir + fileName+".xml");
		try {
			if ((data != null && !data.equals("") && !data.equals("NOFILE"))) {
				Base64Imp.decoderBase64File(data, myDir + fileName+".xml");
				GetFormData(myDir + fileName+".xml");
			} else if (f.exists()) {
				GetFormData(myDir + fileName+".xml");
			} else {
				CommentUtils.showMessage(this, "无此项目！");
				this.finish();
				return;
			}
		} catch (SAXException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 解析XML文档，获取数据
	 * @param formNumber
	 * @return
	 * @throws SAXException
	 */
	private boolean GetFormData(String filePath) throws SAXException {
		InputStream is = null;
		InputStreamReader isr = null;
		InputSource ips = null;
		HashSet<String> set = new HashSet<String>();
		try {
			is = new FileInputStream(new File(filePath));
			isr = new InputStreamReader(is,"GB2312");
			ips = new InputSource(isr);

			//开始解析并保存数据
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder db;
			Document dom;
				db = factory.newDocumentBuilder();
				dom = db.parse(ips);//放入流
				Element root = dom.getDocumentElement();
				NodeList forms = root.getElementsByTagName("form");

				if (forms.getLength() < 1) {
					return false;
				}
				int length = forms.getLength();
				//遍历所有的FORM
				Node form = null;
				for (int j = 0; j < length; j ++) {
					form = forms.item(j);
					theForm = new XmlMissForm();

					// 获取xml文件标签
					NamedNodeMap map = form.getAttributes();
					theForm.setFormId(map.getNamedItem("id").getNodeValue());
					theForm.setFormName(map.getNamedItem("label").getNodeValue());

					NodeList fields = ((Element)form).getElementsByTagName("field");

					
					//遍历Form每一个字段
					int length_1 = fields.getLength();
					for (int i = 0; i < length_1; i++) {
						Node fieldNode = fields.item(i);
						NamedNodeMap attr = fieldNode.getAttributes();
						XmlMissFormfiled tempField = new XmlMissFormfiled();
//						tempField.setName(attr.getNamedItem("name").getNodeValue());
						tempField.setLabel(attr.getNamedItem("label").getNodeValue());
						
						tempField.setType(attr.getNamedItem("texttype").getNodeValue());
						tempField.setImagename(attr.getNamedItem("image").getNodeValue());
						if (!"".equals(attr.getNamedItem("image").getNodeValue())) {
							set.add(attr.getNamedItem("image").getNodeValue());
						}
						tempField.setInst_type(attr.getNamedItem("type").getNodeValue());
						tempField.setInst_type_id(attr.getNamedItem("typeid").getNodeValue());
						tempField.setNum(attr.getNamedItem("num").getNodeValue());
						tempField.setNum_id(attr.getNamedItem("numid").getNodeValue());
						tempField.setModule(attr.getNamedItem("module").getNodeValue());
						tempField.setOptions(attr.getNamedItem("node_code").getNodeValue());
						tempField.setComment(attr.getNamedItem("comment").getNodeValue());
						tempField.setInputText(attr.getNamedItem("inputtext").getNodeValue());
						if (!attr.getNamedItem("module").getNodeValue().contains(moduleFlag)) {//如果不属于这个模块的就隐藏掉
							continue ;
						}
						if (attr.getNamedItem("numid").getNodeValue().equals("2181") && moduleFlag.equals("TS")) {
							continue ;
						}
						theForm.getFields().add(tempField);
					}
					listForm.add(theForm);
				}
				is.close();
				isr.close();
				
				// 拿上次或者上个节点输入的数据
				
				
				//下载图片
				/*GetImageTask g = new GetImageTask();
				g.execute(set);*/
			
		}  catch (ParserConfigurationException e) {
			showMessage("配置文档有错误，请联系信息中心！");
			e.printStackTrace();
		} catch (IOException e) {
			Log.e("错误消息：  ", "Error occurred in ProcessForm:" + e.getMessage());
			e.printStackTrace();
			return false;
		} finally {
			try {
				if(is != null) {
					is.close();
				}
				if(isr != null) {
					isr.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return true;
	}
	

	/**
	 * 把解析到的数据转化成控件显示在Activity中
	 * 
	 * @return
	 */
	private boolean DisplayForm(String value) {
		ArrayList<String> list_title = new ArrayList<String>();
		ArrayList<TabContentFactory> list_tcf = new ArrayList<TabContentFactory>();
		try {
			ScrollView sv = new ScrollView(this);
			sv.setFadingEdgeLength(0);
			sv.setBackgroundColor(color.color_bg);

			LayoutInflater inflater = LayoutInflater.from(this);
			View v = inflater.inflate(R.layout.install_menupaper, null);
			((TextView)v.findViewById(R.id.tv_title)).setText(title);//改变标题
			Button btn_back = (Button)v.findViewById(R.id.btn_back);
			Button btn_view = (Button)v.findViewById(R.id.btn_view);
			Button btn_submit = (Button)v.findViewById(R.id.btn_submit);
			ButtonClick bclick = new ButtonClick();
			btn_view.setOnClickListener(bclick);
			btn_submit.setOnClickListener(bclick);
			if (JL_JY != null && JL_JY .equals("Y")) {
				btn_submit.setEnabled(false);
			}
			
			int length_out = listForm.size();
			/**/
			for (int k = 0; k < length_out; k ++) {
				final LinearLayout ll_field = new LinearLayout(this);
				ll_field.setLayoutParams(new LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT,android.view.ViewGroup.LayoutParams.MATCH_PARENT));
				ll_field.setOrientation(LinearLayout.VERTICAL);
				
				theForm = listForm.get(k);
				int index = 0;
				Button btn = null;
				String indexStr = "";
				for (int i = 0; i < theForm.fields.size(); i++) {
					if (theForm.fields.elementAt(i).getType().equals("button")) {
						indexStr = "";
						btn = new Button(this);
						btn.setText(theForm.fields.elementAt(i).getLabel()+"项 △");
						btn.setBackgroundResource(color.color_bg_spn);
						ll_field.addView(btn);
						indexStr = ""+(index+1);
					}
					if (theForm.fields.elementAt(i).getType().equals("end")) {
						indexStr += "-"+index;
						btn.setOnClickListener(bclick);
						Button btn_temp = new Button(this);
						btn_temp.setVisibility(View.GONE);
						ll_field.addView(btn_temp);
					}
					index ++;
					// 判断是否是EditText类型的控件
					if (theForm.fields.elementAt(i).getType().equals("text")) {
						theForm.fields.elementAt(i).obj = new XmlMissEditBox_Menu(this, theForm.fields.elementAt(i).getLabel()+ ":",
								"");
						ll_field.addView((View) theForm.fields.elementAt(i).obj);
						showImages(ll_field,theForm.fields.elementAt(i).getImagename(),((XmlMissEditBox_Menu)theForm.fields.elementAt(i).obj).btn_image);
						showExplain(theForm.fields.elementAt(i).getComment().replace("##*", "\n"), ((XmlMissEditBox_Menu)theForm.fields.elementAt(i).obj).btn_explain);
					}
					// 判断是否是EditText类型的控件(只能输入数字)
					if (theForm.fields.elementAt(i).getType().equals("numeric")) {
						theForm.fields.elementAt(i).obj = new XmlMissEditBox_Menu(this, theForm.fields.elementAt(i).getLabel()+ ":",
								"");
						((XmlMissEditBox_Menu) theForm.fields.elementAt(i).obj)
								.makeNumeric();
						ll_field.addView((View) theForm.fields.elementAt(i).obj);
						showImages(ll_field,theForm.fields.elementAt(i).getImagename(),((XmlMissEditBox_Menu)theForm.fields.elementAt(i).obj).btn_image);
					}
					// 判断是否是Spinner类型的控件
					if (theForm.fields.elementAt(i).getType().equals("choice")) {
						theForm.fields.elementAt(i).obj = new XmlMissPickOne(this, theForm.fields.elementAt(i).getLabel()+":",
								theForm.fields.elementAt(i).getOptions());
						ll_field.addView((View) theForm.fields.elementAt(i).obj);
						showImages(ll_field,theForm.fields.elementAt(i).getImagename(),((XmlMissPickOne)theForm.fields.elementAt(i).obj).btn_image);
					}
					// 判断是否是Radio类型的控件
					if ("radio".equals(theForm.fields.elementAt(i).getType())) {
						if (!theForm.fields.elementAt(i).getOptions().equals("")) {
							String label =  theForm.fields.elementAt(i).getLabel()+":";
							theForm.fields.elementAt(i).setObj(
									new XmlMissRadio_Menu(this, label, theForm.fields.elementAt(i).getOptions()));
							ll_field.addView((View) theForm.fields.elementAt(i).getObj());
						} else {
							String label = theForm.fields.elementAt(i).getInst_type()+theForm.fields.elementAt(i).getNum()+theForm.fields.elementAt(i).getLabel()+ ":";
							theForm.fields.elementAt(i).setObj(
									new XmlMissRadio_Menu(this, label));
							ll_field.addView((View) theForm.fields.elementAt(i).getObj());
						}
						showImages(ll_field,theForm.fields.elementAt(i).getImagename(),((XmlMissRadio_Menu)theForm.fields.elementAt(i).obj).btn_image);
					}
					// 单选框
					if ("checkbox".equals(theForm.fields.elementAt(i).getType())) {
						String label = theForm.fields.elementAt(i).getInst_type() + theForm.fields.elementAt(i).getNum() + theForm.fields.elementAt(i).getLabel()+":";
						theForm.fields.elementAt(i).setObj(new XmlMissCheckBox_Menu(this, label));
						ll_field.addView((View) theForm.fields.elementAt(i).getObj());
						if (theForm.fields.elementAt(i).getInst_type().equals("F")) {
//							((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj()).cb.setText("产生费用");
//							((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj()).cb2.setText("不产生费用");
							((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj()).cb.setText("当天检验不合格");
							((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj()).cb2.setText("当天检验合格");
							((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj()).cb.setOnClickListener(bclick);
							((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj()).cb2.setOnClickListener(bclick);
						}else{
							((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj()).cb2.setVisibility(View.INVISIBLE);
						}
						if (theForm.fields.elementAt(i).getNum_id().equals("2181")) {
							xmcbm = (XmlMissCheckBox_Menu)theForm.fields.elementAt(i).getObj();
						}
						toAddViewText(theForm.fields.elementAt(i).getInputText(),(XmlMissCheckBox_Menu)theForm.fields.elementAt(i).obj);
						showImages(ll_field,theForm.fields.elementAt(i).getImagename(),((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).obj).btn_image);
						showExplain(theForm.fields.elementAt(i).getComment().replace("##*", "\n"), ((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).obj).btn_explain);
					}
				}

				ll_view = ll_field;
				
				TabContentFactory tcf = new TabContentFactory() {
					@Override
					public View createTabContent(String tag) {
						ScrollView svv = new ScrollView(InstallPaper.this);
						svv.addView(ll_field);
						return svv;
					}
				};
				
				if (ll_field.getChildCount() > 0) {
					list_title.add(theForm.getFormName());
					list_tcf.add(tcf);
				}
				list_Ll.add(ll_field);
			}
			
			
			btn_back.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View arg0) {
					boolean isTrue = false;
					JSONArray ja_value = null;
					if (!isComplete) {
						ja_value = saveTOSQLite("1");
						backAndPutData(ja_value);
						isTrue = true;
							return;
					}
					if (!isTrue) {
						ja_value = saveTOSQLite("1");
						backAndPutData(ja_value);
					}
				}
			});
			
			
			//初始化数据
			/*GetInputDataTask gidt = new GetInputDataTask();
			gidt.execute();*/
			initData(value);
			
			//设置显示
			setContentView(v);
			tabhost = this.getTabHost();
			TabSpec ts_pfList = null;
			TabWidget twidget = tabhost.getTabWidget();
			int length = list_tcf.size();
			for (int j = 0; j<length; j ++) {
				RelativeLayout tabIndicator = (RelativeLayout) LayoutInflater.from(this).inflate(R.layout.indicator_tab, twidget, false);
				TextView tvTab = (TextView)tabIndicator.getChildAt(0);
				tvTab.setText(list_title.get(j));
				ts_pfList = tabhost.newTabSpec("m"+j);
				ts_pfList.setIndicator(tabIndicator);
				ts_pfList.setContent(list_tcf.get(j));
				tabhost.addTab(ts_pfList);
			}
			//设置显示出来的标签信息
			tabhost.setCurrentTabByTag("m0");
			tabCSS();
			
			tabhost.setOnTabChangedListener(new OnTabChangeListener() {
				@Override
				public void onTabChanged(String tabId) {
					tabCSS();
				}
			});

			//控制输入
			controlInput(new LinearLayout(this));
			
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			Log.e(TAG, "Error Displaying Form");
			return false;
		}
	}
	
	private void backAndPutData(JSONArray ja_value) {
		JSONObject jo_sdata = new JSONObject();
		try {
			jo_sdata.put("tcode", "MENU_PITEM_"+fileName);
			jo_sdata.put("tid", jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"));
			jo_sdata.put("stext", ja_value.toString());
		} catch (JSONException e) {
			e.printStackTrace();
		}
		Intent inte = new Intent();
		inte.putExtra("sdata", jo_sdata.toString());
		inte.putExtra("data_id", data_id);
		inte.putExtra("returnStatus", "NOVALUE");
		InstallPaper.this.setResult(RESULT_OK,inte);
		InstallPaper.this.finish();
	}
	
	/**
	 * @param strComment
	 * @param ll_item
	 */
	private void toAddViewText(String strComment, XmlMissCheckBox_Menu ll_item) {
		if ("".equals(strComment)) {
			return ;
		}
		String[] msg = strComment.split("_");
		LinearLayout ll = new LinearLayout(this);
		ll.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		ll.setOrientation(LinearLayout.VERTICAL);
//		LinearLayout ll_son = null;
		int length = msg.length;
		TextView tv = null;
		Spinner sp = null;
		EditText et = null;
		ArrayAdapter<String> ad_planState = null;
		T_Touch ttouch = new T_Touch();
		TextChange tc = new TextChange();
		/*for (int i = 0; i < length; i ++) {
			tv = new TextView(this);
			tv.setText(msg[i]);
			tv.setTextColor(Color.BLACK);
			if (i == length - 1) {
				ll.addView(tv);
				if (strComment.lastIndexOf("_") == (strComment.length() - 1)) {
					et = new EditText(this);
					et.setLayoutParams(new LayoutParams(50, ViewGroup.LayoutParams.WRAP_CONTENT));
					et.setFilters(new InputFilter[]{new InputFilter.LengthFilter(10)});
					et.setOnTouchListener(ttouch);
					et.addTextChangedListener(tc);
					ll.addView(et);
				}
				continue ;
			}
			et = new EditText(this);
			et.setLayoutParams(new LayoutParams(50, ViewGroup.LayoutParams.WRAP_CONTENT));
			et.setOnTouchListener(ttouch);
//			et.setOnClickListener(teclick);
			et.addTextChangedListener(tc);
			ll.addView(tv);
			ll.addView(et);
		}*/
		String strTemp = "";
		length = strComment.length();
		String strUnit = "";
		int index_temp = 0;
		TextView tv1 = null;
		
		strTemp = strComment.substring(0);
		while (true) {//遇到"_"就生成输入框，遇到{}就生成下拉框,中间的文字用TextView显示
			if (strTemp.contains("_")) {
				index_temp = strTemp.indexOf("_");
				tv1 = new TextView(this);
				tv1.setText(strTemp.substring(0, index_temp));
				tv1.setTextColor(Color.RED);
				ll.addView(tv1);
				et = new EditText(this);
				et.setLayoutParams(new LayoutParams(50, ViewGroup.LayoutParams.WRAP_CONTENT));
				et.setOnTouchListener(ttouch);
				et.addTextChangedListener(tc);
				ll.addView(et);
				if (index_temp != strTemp.length()) {
					strTemp = strTemp.substring(index_temp+1);
				} else {
					strTemp = "";
				} 
			} else if (strTemp.contains("{")) {
				int int_star = 0;
				int int_end = 0;
				
				int_star = strTemp.indexOf("{");
				tv1 = new TextView(this);
				tv1.setTextColor(Color.RED);
				tv1.setText(strTemp.substring(0, int_star));
				ll.addView(tv1);
				
				int_end =  strTemp.indexOf("}");
				String temp = strTemp.substring(int_star+1, int_end);
				sp = new Spinner(this);
				ad_planState = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, temp.split(","));
				ad_planState.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
				sp.setAdapter(ad_planState);
				ll.addView(sp);
				if (index_temp != strTemp.length()) {
					index_temp = int_end+1;
					strTemp = strTemp.substring(index_temp);
				} else {
					strTemp = "";
				} 
			} else {
				if (!strTemp.equals("")) {
					tv1 = new TextView(this);
					tv1.setText(strTemp);
					tv1.setTextColor(Color.RED);
					ll.addView(tv1);
				}
				break;
			}
		}
		
		ll_item.addView(ll);
	}
	
	private class TextChange implements TextWatcher {
		@Override
		public void afterTextChanged(Editable arg0) {
		}
		@Override
		public void beforeTextChanged(CharSequence arg0, int arg1, int arg2,
				int arg3) {
		}
		@Override
		public void onTextChanged(CharSequence s, int start, int before,
				int count) {
			if (et_.getText().toString().trim().length() > 1) {
				et_.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
			} else {
				et_.setLayoutParams(new LayoutParams(50, ViewGroup.LayoutParams.WRAP_CONTENT));
			}
		}
	}
	
	private class T_Touch implements OnTouchListener {
		@Override
		public boolean onTouch(View v, MotionEvent event) {
			et_ = (EditText) v;
			return false;
		}
	}

	private void initData(String value) {
		ad_commit = CommentUtils.getCommitDialog(this, null);
		JSONArray ja_values = null;
		try {
			ja_values = new JSONArray(value);
		} catch (JSONException e1) {
			e1.printStackTrace();
		}
//		JSONArray ja_values = CommentUtils.getStextJA(MySQLiteUtil.toSearSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), this));
		
		try {
			// 遍历这个results，把它放到对应的位置上
			int length = list_Ll.size();
			int index_value=0;
			LinearLayout ll_layout = null;
			JSONObject jo_value = null;
			for (int k = 0; k < length; k ++) {
				ll_layout = list_Ll.get(k);
				theForm = listForm.get(k);
				int leng_view = ll_layout.getChildCount();
				View  v_in;
				for (int i = 0; i < leng_view; i++) {
					jo_value = ja_values.optJSONObject(index_value);
					/*if (!moduleFlag.equals("TS") && ll_layout.getChildAt(i) instanceof CheckBox) {//不产生二次费用的勾选框
						((CheckBox)ll_view.getChildAt(ll_view.getChildCount() - 1)).setChecked(jo_value.optBoolean("VALUE"));
						continue ;
					}*/
					if (ll_layout.getChildAt(i) instanceof Button) {
						continue ;
					}
					if (jo_value == null || !theForm.fields.elementAt(i).getNum_id().equals(jo_value.optString("NUM_ID"))) {
						continue ;
					}
					if (((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).obj).getChildCount() > 2 && !"".equals(jo_value.optString("VALUE_ITEM"))) {
						TextView tv = new TextView(this);
						tv.setTextColor(Color.RED);
						tv.setText("上一次的填写：" + jo_value.optString("VALUE_ITEM"));
						((XmlMissCheckBox_Menu)theForm.fields.elementAt(i).obj).addView(tv);
					}
					v_in = ((LinearLayout)ll_layout.getChildAt(i)).getChildAt(1);
					if (v_in instanceof RadioGroup) {
						int leng = ((RadioGroup)v_in).getChildCount();
						RadioButton rb;
						for(int j = 0; j < leng; j ++) {
							rb = (RadioButton)((RadioGroup)v_in).getChildAt(j);
							if (rb.getText().toString().equals(jo_value.optString("VALUE"))) {
								rb.setChecked(true);
								break ;
							}
						}
					}
					if (v_in instanceof LinearLayout) {// checkbox
//						Log.i(TAG, " ALL FROM SQLITE ：" + jo_value.toString());
						if ("0".equals(jo_value.optString("VALUE"))) {
							((CheckBox)((LinearLayout)((LinearLayout)v_in).getChildAt(0)).getChildAt(0)).setChecked(true);
						} else if ("1".equals(jo_value.optString("VALUE"))) {
							((CheckBox)((LinearLayout)((LinearLayout)v_in).getChildAt(0)).getChildAt(1)).setChecked(true);
						}
					}
					if (v_in instanceof EditText) {
						((EditText)v_in).setText(jo_value.optString("VALUE"));
					}
					index_value ++;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 初始化控件
	 */
	private void initView() {
		LayoutInflater inf = LayoutInflater.from(InstallPaper.this);
        v_menu = inf.inflate(R.layout.prepareitem_menu, null);
        
	}
	
	private class ButtonClick implements OnClickListener {

		@Override
		public void onClick(View v) {
			if (v instanceof CheckBox) {
				CheckBox cb_t = (CheckBox) v;
				if (cb_t.getText().toString().trim().equals("产生费用")) {
					xmcbm.cb2.setChecked(false);
				} else if (cb_t.getText().toString().trim().equals("不产生费用")) {
					xmcbm.cb.setChecked(false);
				}
			}
			switch (v.getId()) {
			case R.id.btn_view:
				toStatisticsView("2");
				break;
				
			case R.id.btn_submit:
				if (!moduleFlag.equals("TS") && !validInput()) {
					return ;
				}
				//saveTOSQLite("");
				CommentUtils.CommitDialog(null,null,InstallPaper.this, ad_commit, new CommDataTask());
				toStatisticsView("1");
//				newCommitDataTask();
				break;

			default:
				break;
			}
		}
	}
	
	private void toStatisticsView (String flag) {
		LayoutInflater inft = LayoutInflater.from(this);
		View v = inft.inflate(R.layout.table_test, null);
		TextView tv_az_A = (TextView) v.findViewById(R.id.tv_az_A);
		TextView tv_az_B = (TextView) v.findViewById(R.id.tv_az_B);
		TextView tv_az_C = (TextView) v.findViewById(R.id.tv_az_C);
		TextView tv_az_BC = (TextView) v.findViewById(R.id.tv_az_BC);
		TextView tv_ts_A = (TextView) v.findViewById(R.id.tv_ts_A);
		TextView tv_ts_B = (TextView) v.findViewById(R.id.tv_ts_B);
		TextView tv_ts_C = (TextView) v.findViewById(R.id.tv_ts_C);
		TextView tv_ts_BC = (TextView) v.findViewById(R.id.tv_ts_BC);
		TextView tv_ZP = (TextView) v.findViewById(R.id.tv_ZP);
		TextView tv_jl_A = (TextView) v.findViewById(R.id.tv_jl_A);
		TextView tv_jl_B = (TextView) v.findViewById(R.id.tv_jl_B);
		TextView tv_jl_C = (TextView) v.findViewById(R.id.tv_jl_C);
		TextView tv_jl_BC = (TextView) v.findViewById(R.id.tv_jl_BC);
		
		int int_az_a = 0,int_az_b = 0,int_az_c = 0, int_az_bc = 0;
		int int_ts_a = 0,int_ts_b = 0,int_ts_c = 0, int_ts_bc = 0;
		int int_jl_a = 0,int_jl_b = 0,int_jl_c = 0, int_jl_bc = 0;
		int int_zp_a = 0,int_zp_b = 0,int_zp_c = 0, int_zp_bc = 0;
		int int_zp = 0;
		
		int length = listForm.size();
		XmlMissForm form = null;
		StringBuffer sb_item = new StringBuffer(100);
		XmlMissFormfiled xmlfield = null;
		int index = 1;
		for (int i = 0; i < length; i ++) {
			form = listForm.get(i);
			int size = form.getFields().size();
			for (int j = 0; j < size; j ++) {
				xmlfield = form.getFields().elementAt(j);
				if (xmlfield.getType().equals("button") || xmlfield.getType().equals("end")) {
					continue ;
				}
				//如果没填数据或者是无此项
				if (xmlfield.getData() == null || "".equals(xmlfield.getData()) || "1".equals(xmlfield.getData())) {
					continue ;
				}
				try {
					sb_item.append((index++)+"，"+xmlfield.getInst_type()+xmlfield.getNum()+xmlfield.getLabel()+"\n");
					if (xmlfield.getInst_type().contains("A")) {
						if (xmlfield.getOptions().equals("INSTALL")) {
							int_az_a ++;
						} else if (xmlfield.getOptions().equals("DEBUG")) {
							int_ts_a ++;
						} else if (xmlfield.getOptions().equals("ZP")) {
							int_zp_a ++;
						} else if (xmlfield.getOptions().equals("JL")) {
							int_jl_a ++;
						}
						continue;
					} else if (xmlfield.getInst_type().contains("B")) {
						if (xmlfield.getOptions().equals("INSTALL")) {
							int_az_b ++;
						} else if (xmlfield.getOptions().equals("DEBUG")) {
							int_ts_b ++;
						} else if (xmlfield.getOptions().equals("ZP")) {
							int_zp_b ++;
						} else if (xmlfield.getOptions().equals("JL")) {
							int_jl_b ++;
						}
						continue;
					} else if (xmlfield.getInst_type().contains("C")) {
						if (xmlfield.getOptions().equals("INSTALL")) {
							int_az_c ++;
						} else if (xmlfield.getOptions().equals("DEBUG")) {
							int_ts_c ++;
						} else if (xmlfield.getOptions().equals("ZP")) {
							int_zp_c ++;
						} else if (xmlfield.getOptions().equals("JL")) {
							int_jl_c ++;
						}
						continue;
					} else if (xmlfield.getInst_type().contains("Z")) {
						int_zp ++;
					} else if (xmlfield.getInst_type().contains("补充")) {
							if (xmlfield.getOptions().equals("INSTALL")) {
								int_az_bc ++;
							} else if (xmlfield.getOptions().equals("DEBUG")) {
								int_ts_bc ++;
							} else if (xmlfield.getOptions().equals("ZP")) {
								int_zp_bc ++;
							} else if (xmlfield.getOptions().equals("JL")) {
								int_jl_bc ++;
							}
							continue;
						}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		tv_az_A.setText(int_az_a + " 条");
		tv_az_B.setText(int_az_b + " 条");
		tv_az_C.setText(int_az_c + " 条");
		tv_az_BC.setText(int_az_bc + " 条");
		tv_ts_A.setText(int_ts_a + " 条");
		tv_ts_B.setText(int_ts_b + " 条");
		tv_ts_C.setText(int_ts_c + " 条");
		tv_ts_BC.setText(int_ts_bc + " 条");
		tv_ZP.setText(int_zp + " 条");
		tv_jl_A.setText(int_jl_a + " 条");
		tv_jl_B.setText(int_jl_b + " 条");
		tv_jl_C.setText(int_jl_c + " 条");
		tv_jl_BC.setText(int_jl_bc + " 条");
		
		String strResultMsg = "";
		if (moduleFlag.equals("CJ")) {
			//检验结果
			if (int_az_a+int_ts_a+int_jl_a+int_zp_a > 0) {//int_zp+int_jl_bc
				strResultKey = "初检退检";
				strResultMsg = "初检退检！！\n";
			} else if (((int_az_b+int_ts_b+int_jl_b+int_zp_b+int_az_c+int_ts_c+int_jl_c+int_zp_c) <= 40 && (int_az_b+int_ts_b+int_jl_b+int_zp_b+int_az_c+int_ts_c+int_jl_c+int_zp_c) > 0) || (int_zp+int_jl_bc+int_az_bc+int_ts_bc) > 0) {
				strResultKey = "初检复检";
				strResultMsg = "初检复检！";
			} else {
				strResultKey = "检验合格";
				strResultMsg = "检验合格";
			}
			if (xmcbm != null && xmcbm.cb2.isChecked()) {
				strResultKey = "检验合格";
				strResultMsg = "检验合格";
			}
		} else if (moduleFlag.equals("FJ")) {
			//检验结果
			if (int_az_b+int_ts_b+int_jl_b+int_zp_b == 0 && int_az_c+int_ts_c+int_jl_c+int_zp_c <= 5 && int_az_c+int_ts_c+int_jl_c+int_zp_c > 0) {
				strResultKey = "安装跟进";
				strResultMsg = "安装跟进！\n";
			} else if (int_az_b+int_ts_b+int_jl_b+int_zp_b > 0 || int_az_c+int_ts_c+int_jl_c+int_zp_c > 5) {
				strResultKey = "复检退检";
				strResultMsg = "复检退检！！";
			} else {
				strResultKey = "复检合格";
				strResultMsg = "复检合格";
			}
			if (xmcbm != null && xmcbm.cb2.isChecked()) {
				strResultKey = "复检合格";
				strResultMsg = "复检合格";
			}
		}
/*		String strResultMsg = "";
		//检验结果
		if (int_az_a+int_ts_a+int_jl_a+int_zp_a > 0) {
			if (moduleFlag.equals("CJ")) {
				strResultKey = "初检退检";
			} else {
				strResultKey = "复检退检";
			}
			strResultMsg = "退检！！\n";
		} else if ((int_az_b+int_ts_b+int_jl_b+int_zp_b+int_az_c+int_ts_c+int_jl_c+int_zp_c) <= 40 && (int_az_b+int_ts_b+int_jl_b+int_zp_b+int_az_c+int_ts_c+int_jl_c+int_zp_c) > 0) {
			if (moduleFlag.equals("CJ")) {
				strResultKey = "初检复检";
			} else {
				strResultKey = "安装跟进";
			}
			strResultMsg = "复检！";
		} else {
			if (moduleFlag.equals("CJ")) {
				strResultKey = "检验合格";
			} else {
				strResultKey = "复检合格";
			}
			strResultMsg = "检验合格";
		}
*/		
		JSONArray ja_Statistics = new JSONArray();
		try {
			if (int_az_a != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "INSTALL");
				jo_Statistics.put("SORT", "A");
				jo_Statistics.put("VALUE", int_az_a);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_az_b != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "INSTALL");
				jo_Statistics.put("SORT", "B");
				jo_Statistics.put("VALUE", int_az_b);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_az_c != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "INSTALL");
				jo_Statistics.put("SORT", "C");
				jo_Statistics.put("VALUE", int_az_c);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_az_bc != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "INSTALL");
				jo_Statistics.put("SORT", "补充");
				jo_Statistics.put("VALUE", int_az_bc);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_ts_a != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "DEBUG");
				jo_Statistics.put("SORT", "A");
				jo_Statistics.put("VALUE", int_ts_a);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_ts_b != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "DEBUG");
				jo_Statistics.put("SORT", "B");
				jo_Statistics.put("VALUE", int_ts_b);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_ts_c != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "DEBUG");
				jo_Statistics.put("SORT", "C");
				jo_Statistics.put("VALUE", int_ts_c);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_ts_bc != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "DEBUG");
				jo_Statistics.put("SORT", "补充");
				jo_Statistics.put("VALUE", int_ts_bc);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_jl_a != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "A");
				jo_Statistics.put("SORT", "补充");
				jo_Statistics.put("VALUE", int_jl_a);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_jl_b != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "JL");
				jo_Statistics.put("SORT", "C");
				jo_Statistics.put("VALUE", int_jl_b);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_jl_c != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "JL");
				jo_Statistics.put("SORT", "C");
				jo_Statistics.put("VALUE", int_jl_c);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_jl_bc != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "JL");
				jo_Statistics.put("SORT", "补充");
				jo_Statistics.put("VALUE", int_jl_bc);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_zp_a != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "ZP");
				jo_Statistics.put("SORT", "A");
				jo_Statistics.put("VALUE", int_zp_a);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_zp_b != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "ZP");
				jo_Statistics.put("SORT", "B");
				jo_Statistics.put("VALUE", int_zp_b);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_zp_c != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "ZP");
				jo_Statistics.put("SORT", "C");
				jo_Statistics.put("VALUE", int_zp_c);
				ja_Statistics.put(jo_Statistics);
			}
			if (int_zp_bc != 0) {
				JSONObject jo_Statistics = new JSONObject(); 
				jo_Statistics.put("ITEM", "ZP");
				jo_Statistics.put("SORT", "补充");
				jo_Statistics.put("VALUE", int_zp_bc);
				ja_Statistics.put(jo_Statistics);
			}
			jo_Commit_Data.put("STATISTICS", ja_Statistics);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		if ("1".equals(flag)) {
			CommentUtils.CommentDialogSimple3("提示", "统计结果为:" + strResultMsg, this, v);
		} else if ("2".equals(flag)) {
			CommentUtils.CommentDialogSimple2("提示", "勾选的不良项有:\n" + sb_item.toString(), this, "");
		}
	}
	
	/*private String getCJResult() {
		
	}*/
	
	
	private void showImages(LinearLayout ll, final String imageName, Button btn) {
		FileUtil.createFolder(ROOTPATH+"/menu/.imagemenu");
		if (!"".equals(imageName) && null != imageName) {
			if (btn != null){
				btn.setVisibility(View.VISIBLE);
				btn.setOnClickListener(new OnClickListener() {
					@Override
					public void onClick(View v) {
						if(isDownLoad) {
							startActivity(ReadFileUtil.getImageFileIntent(ROOTPATH+"/menu/.imagemenu/"+imageName));
						} else {
							showMessage("图片正在下载，请稍后重试");
						}
					}
				});
			}
		}
	}
	
	private void showExplain(final String msg, Button btn) {
		if (btn != null && !"".equals(msg) && null != msg) {
			btn.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View v) {
					CommentUtils.CommentDialogSimple("标准", msg, InstallPaper.this,null);
				}
			});
		} else {
			btn.setVisibility(View.GONE);
		}
	}
	
	/**
	 * 异步获数据的类 Object需要传的参数是： TextView:显示正在加载信息提示, 如果没有就传null 方法的参数
	 */
	class GetInputDataTask extends AsyncTask<Object, String, String> {
		
		@Override
		protected void onPreExecute() {
			super.onPreExecute();
			ad_getdata.show();
			ad_getdata.setCancelable(false);
		}
		
		@Override
		protected String doInBackground(Object... params) {
			JSONArray ja = new JSONArray();
			JSONObject joKey = new JSONObject();
			boolean isToUpdate = false;
			try {
				joKey.put("DATA", jo_data);
				joKey.put("INT_ROW_ID", 0);
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			
			/*String url = dealDataCenter.httptype + "://" + dealDataCenter.nettyHost + "/";
			url += "remote/instllMenudPaperAction.do?method=toSearch";
			JSONObject jo_Result = dealDataCenter.toNettyPost(url, joKey.toString(), null);*/
			/*int count = jo_Result.optInt("count");
			// 判断是否要去更新数据
			if (jo_Result != null && !"".equals(jo_Result.optString("LAST_UPDATE_DATE"))) {
				try {
					String str_d1 = jo_Result.optString("LAST_UPDATE_DATE").replace("_", ":");
					Date d1 = DateUtil.parse(str_d1, DateUtil.DateTimeFormat_YMDHMS);
					JSONArray ja_values = CommentUtils.getStextJA(MySQLiteUtil.toSearSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), InstallPaper.this));
					if (ja_values.length() > 0) {//如果本地数据存在的情况下就比较
						String str_date = ja_values.optJSONObject(ja_values.length()-1).optString("LAST_UPDATE_DATE");
						Date d2 = DateUtil.parse(str_date, DateUtil.DateTimeFormat_YMDHMS);
						if (d1.compareTo(d2) > 0) {//如果服务器上的时间大于PDA SQLite存放数据时候的时间就让服务器上的数据代替掉本地的数据
							isToUpdate = true;
						}
					} else {
						isToUpdate = true;
					}
				} catch (ParseException e) {
					e.printStackTrace();
				}
			} else {
				return null;
			}
			// 当本地的数据比服务器的数据旧，而且服务器有数据
			Log.i(TAG, "是否去拿服务器上的数据：" + (count > 0 && isToUpdate));
			if (count > 0 && isToUpdate) {
				JSONArray ja_temp = null;
				ja_temp = jo_Result.optJSONArray("itemValue");
				int count_ = ja_temp.length();
				// 每次叠加进本地的JSONArray
				for (int j = 0; j < count_; j ++) {
					ja.put(ja_temp.optJSONObject(j));
				}
				// 分多少次去拿菜单的数据
				for (int i = 0; i < count/50; i ++) {
					try {
						joKey.put("INT_ROW_ID", jo_Result.optInt("INT_ROW_ID"));
						joKey.put("COUNT", jo_Result.optInt("count"));
					} catch (JSONException e) {
						e.printStackTrace();
					}
					jo_Result = dealDataCenter.toNettyPost(url, joKey.toString(), null);
					ja_temp = jo_Result.optJSONArray("itemValue");
					if (ja_temp != null) {
						count_ = ja_temp.length();
						// 每次叠加进本地的JSONArray
						for (int j = 0; j < count_; j ++) {
							ja.put(ja_temp.optJSONObject(j));
						}
					}
				}
			}
			Log.i(TAG, "录入的菜单个数：" + ja.length());
			if (ja.length() > 0) {
				Log.i(TAG, "开始保存服务器上的菜单纸..." + ja.toString());
				MySQLiteUtil.toDeleteSQLite(" tcode='MENU_PITEM_"+ fileName +"' and tid='"+ jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM") +"'", "0", InstallPaper.this);
				MySQLiteUtil.toSaveSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), ja.toString(), "", InstallPaper.this);
			}*/
			return "";
		}

		@Override
		protected void onPostExecute(String result) {
			super.onPostExecute(result);
//			initData();
			ad_getdata.setCancelable(true);
			ad_getdata.dismiss();
		}
	}
	
	
	/**
	 * 异步获数据的类 Object需要传的参数是： TextView:显示正在加载信息提示, 如果没有就传null 方法的参数
	 */
	class GetImageTask extends AsyncTask<Object, String, String> {
		HashSet<String> set = null;
		
		@Override
		protected String doInBackground(Object... params) {
			set = (HashSet<String>)params[0];
//			DownLoadImage(set);
			return "";
		}

		@Override
		protected void onPostExecute(String result) {
			super.onPostExecute(result);
			// 删除旧文件夹的图片
			String path = ROOTPATH+"/menu/image/";
			FileUtil.deleteDirectory(path, true);
		}
	}
	
	private void newCommitDataTask() {
		final WLClient wlconn = WLClient.createInstance(InstallPaper.this);
		wlconn.connect(new MyWLConnLis("instllMenudPaperAction.do?method=toAdd",jo_Commit_Data.toString(),InstallPaper.class.getName(),"handleResultForCommit"));
	}
	
	public void handleResultForCommit (String result) {
		ad_commit.setCancelable(true);
		ad_commit.dismiss();
		try {
			JSONObject jo_result = new JSONObject(result.replace("/*-secure-", "").replace("*/", ""));
			if (Looper.myLooper() == null) {
				Looper.prepare();
			}
			JSONObject jo_result2 = new JSONObject(jo_result.optString("content"));
			JSONObject jo_sdata = new JSONObject();
			if (jo_result.optInt("statusCode")==200 && jo_result2.optInt("msgid") == 0) {
				showMessage("保存成功！");
				jo_sdata.put("tcode", "MENU_PITEM_"+fileName);
				jo_sdata.put("tid", jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"));
				jo_sdata.put("stext", saveTOSQLite("").toString());
				Intent inte = new Intent();
				inte.putExtra("sdata", jo_sdata.toString());
				inte.putExtra("data_id", data_id);
				inte.putExtra("returnStatus", strResultKey);
				InstallPaper.this.setResult(RESULT_OK,inte);
				InstallPaper.this.finish();
			} else {
				showMessage("保存失败！请重试");
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
	}
	
	
	
	
	
	
	public class MyWLConnLis implements WLResponseListener {

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
			WLProcedureInvocationData invkeData = new WLProcedureInvocationData("HttpAdapter_PDA", "getStories_pda");
//			Object[] params = new Object[]{"testAction.do?method=toTest",jo_temp.toString()};
			Object[] params = new Object[]{url,params_str};
			invkeData.setParameters(params);
			WLRequestOptions wloption = new WLRequestOptions();
			wloption.setTimeout(18000);
			WLClient wlclient = WLClient.getInstance();
			wlclient.invokeProcedure(invkeData, new MyWLInvoke(class_name, method), wloption);
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
				handleResultForCommit(arg0.getResponseText());
			}
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	class CommDataTask extends AsyncTask<Object, String, JSONObject> {
		
		@Override
		protected void onPreExecute() {
			super.onPreExecute();
		}
		
		@Override
		protected JSONObject doInBackground(Object... params) {
			/*JSONArray ja_values = CommentUtils.getStextJA(MySQLiteUtil.toSearSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), InstallPaper.this));
			String url = dealDataCenter.httptype + "://" + dealDataCenter.nettyHost + "/";
			url += "remote/instllMenudPaperAction.do?method=toAdd";
			*/
			try {
				jo_Commit_Data.put("DATA", jo_data);
				jo_Commit_Data.put("VALUE", saveTOSQLite(""));
				jo_Commit_Data.put("INST_PERSON_ID", jo_data.optString("INST_PERSON_ID"));
				jo_Commit_Data.put("EBS_USER_ID", jo_data.optString("EBS_USER_ID"));
				jo_Commit_Data.put("DEBUG_NUM", jo_data.optString("DEBUG_NUM"));
				if (moduleFlag.equals("TS")) {
					jo_Commit_Data.put("SORT_", "调试");	
				} else if (moduleFlag.equals("CJ")) {
					jo_Commit_Data.put("SORT_", "初检");
				} else if (moduleFlag.equals("FJ")) {
					jo_Commit_Data.put("SORT_", "复检");
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
			/*JSONObject result = dealDataCenter.toNettyPost(url, jo_Commit_Data.toString(),
					null);*/
			
			// 离线提交
			JSONObject result = null;
			/*
			StringBuffer sb_msg = new StringBuffer();
			if (moduleFlag.equals("TS")) {
				sb_msg.append("操作模块：安装调试菜单纸");
			} else if (moduleFlag.equals("CJ")) {
				sb_msg.append("操作模块：安装初检菜单纸");
			} else if (moduleFlag.equals("FJ")) {
				sb_msg.append("操作模块：安装复检菜单纸");
			}
			sb_msg.append("\n操作时间：" + DateUtil.getTodayAndTime());
			sb_msg.append("\n条数：1");
			JSONObject result = MySQLiteUtil.toSaveSQLite(SysConfig.M_INSTALL_PAPER, moduleFlag+jo_data.optString("TASK_PROCESS_ID"), "1", jo_Commit_Data.toString(), "",
					url , SysConfig.M_INSTALL_PAPER, sb_msg.toString(), InstallPaper.this);*/
			final WLClient wlconn = WLClient.createInstance(InstallPaper.this);
			wlconn.connect(new MyWLConnLis("instllMenudPaperAction.do?method=toAdd",jo_Commit_Data.toString(),InstallPaper.class.getName(),"handleResultForCommit"));
			return result;
		}

		@Override
		protected void onPostExecute(JSONObject result) {
			super.onPostExecute(result);
//			String commitMsg = "提交成功！";
//			ad_commit.setCancelable(true);
			if (null == result) {
//				ad_commit.dismiss();
			} else if (1 == result.optInt("msgid")) {
//				ad_commit.dismiss();
			}
//			showMessage(commitMsg);
//			ad_commit.dismiss();
			
			String tcode = null;
			if ("TS".equals(moduleFlag)) {
				tcode = TCODE_mTS_ISCOMMIT;
			} else if ("CJ".equals(moduleFlag)) {
				tcode = TCODE_mCJ_ISCOMMIT;
			} else if ("FJ".equals(moduleFlag)) {
				tcode = TCODE_mFJ_ISCOMMIT;
			}
			/*MySQLiteUtil.toDeleteSQLite("tcode='"+ tcode +"' and tid='"+ tid_commit +"'", "0", InstallPaper.this);
			MySQLiteUtil.toSaveSQLite(tcode, tid_commit, "{'ISCOMMIT',true}", "", InstallPaper.this);*/
		}
	}
	
/*	private void DownLoadImage(HashSet<String> set) {
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
		url += "remote/instllMenudPaperAction.do?method=toSearchIMAGE";
		JSONObject result = dealDataCenter.toNettyPost(url, jo_result.toString(), "");
		FileInputStream fis = null;
		FileOutputStream fos = null;
		if (null == result) {
			return ;
		}
		try {
			String path = MaintainancePlanList.ROOTPATH+"/menu/.imagemenu/";
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
					MySQLiteUtil.toDeleteSQLite("tcode='IMAGE_VERSION' and tid='"+ s +"'", "0", InstallPaper.this);
					MySQLiteUtil.toSaveSQLite("IMAGE_VERSION", s, "{fileMDate:'"+ jo_last_mdate.optString(s) +"'}", "", InstallPaper.this);
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
	/*new
	private void DownLoadImage(HashSet<String> set) {
		JSONArray jaImage = new JSONArray();
		JSONArray jaLastDate = new JSONArray();
		JSONObject jo_result = null;
		
		JSONStoreCollection collection = WLJSONStore.getInstance(InstallPaper.this).getCollectionByName(collectionName);
		
		for (String s : set) {
			try{
				JSONStoreQueryPart queryPart = new JSONStoreQueryPart();
				queryPart.addLike("tcode", "IMAGE_VERSION");
				queryPart.addLike("tid", s);
				JSONStoreQueryParts query = new JSONStoreQueryParts();
				query.addQueryPart(queryPart);
				JSONStoreFindOptions options = new JSONStoreFindOptions();
				
				List<JSONObject> results = collection.findDocuments(query, options);
				jaLastDate.put(results.get(0).optString("fileMDate"));
				jaImage.put(s);
			}catch(JSONStoreException e) { // handle failure
				System.out.println("---JSONStoreException DownLoadImage");
			}
			
		}
		
		jo_result = new JSONObject();
		try {
			jo_result.put("IMAGE_NAME", jaImage);
			jo_result.put("IMAGE_MDATE", jaLastDate);
		} catch (JSONException e1) {
			e1.printStackTrace();
		}
		
		final WLClient wlconn = WLClient.createInstance(InstallPaper.this);
		wlconn.connect(new MyWLConnLis("instllMenudPaperAction.do?method=toSearchIMAGE_WL",jo_result.toString(),InstallPaper.class.getName(),"handleResultForDownLoadImage"));
		
		String url = dealDataCenter.httptype + "://" + dealDataCenter.nettyHost + "/";
		url += "remote/instllMenudPaperAction.do?method=toSearchIMAGE";
		JSONObject result = dealDataCenter.toNettyPost(url, jo_result.toString(), "");
		FileInputStream fis = null;
		FileOutputStream fos = null;
		if (null == result) {
			return ;
		}
		try {
			String path = MaintainancePlanList.ROOTPATH+"/menu/.imagemenu/";
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
					MySQLiteUtil.toDeleteSQLite("tcode='IMAGE_VERSION' and tid='"+ s +"'", "0", InstallPaper.this);
					MySQLiteUtil.toSaveSQLite("IMAGE_VERSION", s, "{fileMDate:'"+ jo_last_mdate.optString(s) +"'}", "", InstallPaper.this);
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
	}
	*/
	
	public void handleResultForDownLoadImage (String result) {
		try {
			JSONObject jo_result = new JSONObject(result.replace("/*-secure-", "").replace("*/", ""));
			if (Looper.myLooper() == null) {
				Looper.prepare();
			}
			JSONObject jo_result2 = new JSONObject(jo_result.optString("content"));
			JSONObject jo_sdata = new JSONObject();
			if (jo_result.optInt("statusCode")==200 && jo_result2.optInt("msgid") == 0) {
				
				
				jo_sdata.put("tcode", "MENU_PITEM_"+fileName);
				jo_sdata.put("tid", jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"));
				jo_sdata.put("stext", saveTOSQLite("").toString());
				Intent inte = new Intent();
				inte.putExtra("sdata", jo_sdata.toString());
				inte.putExtra("data_id", data_id);
				inte.putExtra("returnStatus", strResultKey);
				InstallPaper.this.setResult(RESULT_OK,inte);
				InstallPaper.this.finish();
			} else {
				showMessage("保存失败！请重试");
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 保存数据
	 * (暂存)
	 * 删掉原来的，保存最新的
	 */
	private JSONArray saveTOSQLite(String flag) {
		int length = listForm.size();
		XmlMissForm form = null;
		JSONObject jo_value = null;
		JSONArray ja_value = new JSONArray();
		XmlMissFormfiled xmlfield = null;
		for (int i = 0; i < length; i ++) {
			form = listForm.get(i);
			int size = form.getFields().size();
			for (int j = 0; j < size; j ++) {
				jo_value = new JSONObject();
				xmlfield = form.getFields().elementAt(j);
				if (xmlfield.getType().equals("button") || xmlfield.getType().equals("end")) {
					continue ;
				}
				//如果没填数据的就不保存数据
				if (xmlfield.getData() == null || "".equals(xmlfield.getData())) {
					continue ;
				}
				try {
					jo_value.put("INST_TYPE_ID", xmlfield.getInst_type_id());
					jo_value.put("INST_TYPE", xmlfield.getInst_type());
					jo_value.put("NUM", xmlfield.getNum());
					jo_value.put("LABEL", xmlfield.getLabel());
					jo_value.put("NUM_ID", xmlfield.getNum_id());
					jo_value.put("MENU_TYPE", xmlfield.getOptions());//阶段类型，属于哪个阶段
					jo_value.put("VALUE", xmlfield.getData());
//					jo_value.put("VALUE", "0");
					jo_value.put("LAST_UPDATE_DATE", DateUtil.getTodayAndTime());
					if (((XmlMissCheckBox_Menu)xmlfield.obj).getChildCount() > 2) {
						LinearLayout ll_temp = (LinearLayout) ((XmlMissCheckBox_Menu)xmlfield.obj).getChildAt(2);
						String str_temp = "";
						View v = null;
						String str_et = "";
						String str_et_input = "";
						for (int kk = 0 ; kk < ll_temp.getChildCount(); kk ++) {
							v = ll_temp.getChildAt(kk);
							if (v instanceof EditText) {
								if (!"".equals(((EditText)v).getText().toString())) {
									str_temp += ((EditText)v).getText().toString();
									str_et = ((EditText)v).getText().toString();
									continue ;
								}
								str_et_input+= ((EditText)v).getText().toString()+",";
							}
							if (v instanceof TextView) {
								str_temp += ((TextView)v).getText().toString();
								continue ;
							}
							if (v instanceof Spinner) {
								str_temp += ((Spinner)v).getSelectedItem().toString();
								str_et = ((Spinner)v).getSelectedItem().toString();
								str_et_input+= ((Spinner)v).getSelectedItem().toString()+",";
								continue ;
							}
						}
						if (!"".equals(str_et)) {//如果填了最新的数据就取最新的，如果没有填就取以前填的数据，如果从来都没有填就不取
							jo_value.put("VALUE_ITEM", str_temp);
						} else if (((XmlMissCheckBox_Menu)xmlfield.obj).getChildCount() > 3) {
							TextView tv = (TextView) ((XmlMissCheckBox_Menu)xmlfield.obj).getChildAt(3);
							String str_tv = tv.getText().toString(); 
							jo_value.put("VALUE_ITEM", str_tv.substring(str_tv.indexOf("：")+1));
						} 
						Log.i(TAG, "输入的值：" + str_et_input);
						jo_value.put("INPUT_VALUE", str_et_input);
					}
					ja_value.put(jo_value);
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}
		return ja_value;
		/*
		if (!moduleFlag.equals("TS") && ((CheckBox)ll_view.getChildAt(ll_view.getChildCount() - 1)).isChecked()) {
			jo_value = new JSONObject();
			try {
				jo_value.put("VALUE", ((CheckBox)ll_view.getChildAt(ll_view.getChildCount() - 1)).isChecked());
				jo_value.put("VALUE_", "二次费用");
				} catch (Exception e) {
					e.printStackTrace();
				}
			ja_value.put(jo_value);
		}*/
		/*MySQLiteUtil.toDeleteSQLite(" tcode='MENU_PITEM_"+ fileName +"' and tid='"+ jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM") +"'", "0", this);
		MySQLiteUtil.toSaveSQLite("MENU_PITEM_"+fileName, jo_data.optString("TASK_ID")+"_"+jo_data.optString("SEQ_NUM"), ja_value.toString(), flag, this);*/
	}
	

    /**
  	 * 点击back按钮时的响应
  	 */
  	@Override
  	public boolean onKeyDown(int keyCode, KeyEvent event) {
  		if (!isComplete) {
  			if(keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
  				AlertDialog.Builder dialog = new AlertDialog.Builder(this);
  				dialog.setMessage("退出此页面？");
  				dialog.setTitle("消息");
  				dialog.setPositiveButton("是", new DialogInterface.OnClickListener() {
  					public void onClick(DialogInterface dialog, int which) {
  						toStatisticsView("");
  						Intent inte = new Intent();
  						Bundle dundle = new Bundle();
  						dundle.putString("return", "");
//  						inte.setClass(InstallPaper.this, Changjian2_TbaHostActivity.class);
  						//inte.setClass(InstallPaper.this, Changjian2_TbaHostActivity.class);
  						inte.putExtras(dundle); //yk
  						InstallPaper.this.setResult(0, inte);
  						dialog.dismiss();
  						InstallPaper.this.finish();
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
    
    private boolean validInput() {
    	if (!moduleFlag.equals("TS") && !xmcbm.cb.isChecked() && !xmcbm.cb2.isChecked()) {
//    		if (!moduleFlag.equals("TS") && !fileName.contains("FT") && !xmcbm.cb.isChecked() && !xmcbm.cb2.isChecked()) {
    		showMessage("提选择是否产生二次费用！");
    		return false;
    	}
    	return true;
    }
    
    /**
     * 点击样式改变
     */
    public void tabCSS() {
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

}
