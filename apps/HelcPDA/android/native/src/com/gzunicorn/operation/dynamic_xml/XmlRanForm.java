package com.gzunicorn.operation.dynamic_xml;

 

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory; 
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
   
import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.LinearLayout.LayoutParams;

public class XmlRanForm extends Activity{
	String tag = XmlRanForm.class.getName();
	private XmlMissForm theForm;
	ProgressDialog progressDialog;
	Handler progressHandler;
	@Override
	protected void onCreate(Bundle savedInstanceState) { 
		super.onCreate(savedInstanceState);
		 String formNumber = "";
//		 将上一个 Intent 检索出来并赋值
		 Intent startingIntent = getIntent();
 
//		 判断是否获取传过来的 Intent
		 if(startingIntent == null) {
	        	Log.e(tag,"No Intent?  We're not supposed to be here...");
	        	finish();
	        	return;
	        }
//	        如果	Intent 存在，就获取传过来的值 ，并赋值给 formNumber
		 formNumber = startingIntent.getStringExtra("formNumber");
//		 根据传参判断是否找到动态加载文件，如果找到开始加载标签数据，如果没有找到，给出提示
		 try { 
			if (GetFormData(formNumber)) { 
				DisplayForm();
				}else {
					Log.e(tag,"Couldn't parse the Form.");
		    		AlertDialog.Builder bd = new AlertDialog.Builder(this);
		    		AlertDialog ad = bd.create();
		    		ad.setTitle("Error");
		    		ad.setMessage("Could not parse the Form data");
		    		ad.show();
				}
		} catch (SAXException e) { 
			e.printStackTrace();
		}
		 
		 
		 

		 
		 
	}
	
	//根据传参判断是否找到需要加载的xml文件
	private boolean GetFormData(String formNumber) throws SAXException  { 
		try {
			//getAssets() 方法直接指定路径到 assets 目录下，open()方法中指点	assets 目录下需要打开的文件路径
			InputStream is =this.getAssets().open("servername/xmlgui" + formNumber + ".xml");
 
			
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder db;
			Document dom ;
			try {
				db = factory.newDocumentBuilder();
				dom= db.parse(is);
				Element root = dom.getDocumentElement();
				NodeList forms = root.getElementsByTagName("form");
				
				if (forms.getLength() < 1) {
					// nothing here??
					Log.e(tag,"No form, let's bail");
					return false;
				}
				Node form = forms.item(0);
				theForm = new XmlMissForm();
				
				//获取xml文件标签 
				NamedNodeMap map = form.getAttributes();
				theForm.setFormId(map.getNamedItem("id").getNodeValue());
				theForm.setFormName(map.getNamedItem("name").getNodeValue());
				
				if (map.getNamedItem("submitTo") != null){
					theForm.setSubmitTo(map.getNamedItem("submitTo").getNodeValue()); 
				}else{
					theForm.setSubmitTo("loopback");
				}
				
				NodeList fields = root.getElementsByTagName("field");
				
				for (int i=0;i<fields.getLength();i++) {
					Node fieldNode = fields.item(i);
					NamedNodeMap attr = fieldNode.getAttributes();
					XmlMissFormfiled tempField =  new XmlMissFormfiled();
					tempField.setName(attr.getNamedItem("name").getNodeValue());
					tempField.setLabel(attr.getNamedItem("label").getNodeValue());
					tempField.setType(attr.getNamedItem("type").getNodeValue());
					if (attr.getNamedItem("required").getNodeValue().equals("Y"))
						tempField.setRequired(true);
					else
						tempField.setRequired(false);
					tempField.setOptions(attr.getNamedItem("options").getNodeValue());
					theForm.getFields().add(tempField);
				}
				
				
			} catch (ParserConfigurationException e) { 
				e.printStackTrace();
			} 
			 return true; 
			
		} catch (IOException e) {
			Log.e(tag,"Error occurred in ProcessForm:" + e.getMessage());
			e.printStackTrace();
			return false;
		} 
		
	}
	
	private boolean DisplayForm()
	{
		
		try
		{
			ScrollView sv = new ScrollView(this);
			
	        final LinearLayout ll = new LinearLayout(this);
	        sv.addView(ll);
	        ll.setOrientation(android.widget.LinearLayout.VERTICAL);
	        
	        // walk thru our form elements and dynamically create them, leveraging our mini library of tools.
	        int i;
	        for (i=0;i<theForm.fields.size();i++) {
	        	if (theForm.fields.elementAt(i).getType().equals("text")) {
	        		theForm.fields.elementAt(i).obj = new XmlMissEditBox(this,(theForm.fields.elementAt(i).isRequired() ? "*" : "") + theForm.fields.elementAt(i).getLabel(),"");
	        		ll.addView((View) theForm.fields.elementAt(i).obj);
	        	}
	        	if (theForm.fields.elementAt(i).getType().equals("numeric")) {
	        		theForm.fields.elementAt(i).obj = new XmlMissEditBox(this,(theForm.fields.elementAt(i).isRequired() ? "*" : "") + theForm.fields.elementAt(i).getLabel(),"");
	        		((XmlMissEditBox)theForm.fields.elementAt(i).obj).makeNumeric();
	        		ll.addView((View) theForm.fields.elementAt(i).obj);
	        	}
	        	if (theForm.fields.elementAt(i).getType().equals("choice")) {
	        		theForm.fields.elementAt(i).obj = new XmlMissPickOne(this,(theForm.fields.elementAt(i).isRequired() ? "*" : "") + theForm.fields.elementAt(i).getLabel(),theForm.fields.elementAt(i).getOptions());
	        		ll.addView((View) theForm.fields.elementAt(i).obj);
	        	}
	        }
	        
	        
	        Button btn = new Button(this);
	        btn.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
	        
	        ll.addView(btn);
	        
	        btn.setText("Submit");
	        btn.setOnClickListener(new Button.OnClickListener() {
	        	public void onClick(View v) {
//	        		 检查提示必输项
	        		if (!CheckForm())
	        		{
	        			AlertDialog.Builder bd = new AlertDialog.Builder(ll.getContext());
	            		AlertDialog ad = bd.create();
	            		ad.setTitle("Error");
	            		ad.setMessage("Please enter all required (*) fields");
	            		ad.show();
	            		return;

	        		}
	        		
//	        		System.out.println("QQQQQQQQQQQ"+SubmitForm());
//	        		只显示结果，即不还传参类的
	        		if (theForm.getSubmitTo().equals("loopback")) {
	        			// just display the results to the screen 
	        			String formResults = theForm.getFormattedResults();
//	        			Log.i(tag,formResults);
	        			AlertDialog.Builder bd = new AlertDialog.Builder(ll.getContext());
	            		AlertDialog ad = bd.create();
	            		ad.setTitle("Results");
	            		ad.setMessage(formResults);
	            		ad.show();
	            		return;
	        			
	        		} else { 
	        			if (!SubmitForm()) { 
		        			AlertDialog.Builder bd = new AlertDialog.Builder(ll.getContext());
		            		AlertDialog ad = bd.create();
		            		ad.setTitle("Error");
		            		ad.setMessage("Error submitting form");
		            		ad.show();
		            		return;
	        			}
	        		}
	        		
	        	}
	        } );
	        
	        setContentView(sv);
	        setTitle(theForm.getFormName());
	        
	        return true;

		} catch (Exception e) {
			Log.e(tag,"Error Displaying Form");
			return false;
		}
	}
	
//	检查是否必输
	private boolean CheckForm()
	{
		try {
			int i;
			boolean good = true;
			
			
			for (i=0;i<theForm.fields.size();i++) {
				String fieldValue = (String) theForm.fields.elementAt(i).getData();
				Log.i(tag,theForm.fields.elementAt(i).getName() + " is [" + fieldValue + "]");
				if (theForm.fields.elementAt(i).isRequired()) {
					if (fieldValue == null) {
						good = false;
					} else {
						if (fieldValue.trim().length() == 0) {
							good = false;
						}
					}
						
				}
			}
			return good;
		} catch(Exception e) {
			Log.e(tag,"Error in CheckForm()::" + e.getMessage());
			e.printStackTrace();
			return false;
		}
	}
	
//	数据提交判断
	private boolean SubmitForm()
	{
		try {
			boolean ok = true;
            this.progressDialog = ProgressDialog.show(this, theForm.getFormName(), "Saving Form Data", true,false);
            System.out.println("this.progressHandler:  "+this.progressHandler);
            this.progressHandler = new Handler() {

                @Override
                public void handleMessage(Message msg) {
                    // process incoming messages here
                	System.out.println("msg.what:  "+msg.what);
                    switch (msg.what) {
                        case 0:
                            // update progress bar
                            progressDialog.setMessage((String) msg.obj);
                            System.out.println("(String) msg.obj:  "+(String) msg.obj);
                            break;
                        case 1:
                            progressDialog.cancel();
                            finish();
                            break;
                        case 2:
                        	progressDialog.cancel();
                        	break;
                    }
                    super.handleMessage(msg);
                }

            };

            Thread workthread = new Thread(new TransmitFormData(theForm));

            workthread.start();

			return ok;	
		} catch (Exception e) {
			Log.e(tag,"Error in SubmitForm()::" + e.getMessage());
			e.printStackTrace();
            // tell user we failed....
            Message msg = new Message();
            msg.what = 1;
            this.progressHandler.sendMessage(msg);

			return false;
		}
		
	}
	
	private class TransmitFormData implements Runnable
	{
        XmlMissForm _form;
        Message msg;
        TransmitFormData(XmlMissForm form) {
            this._form = form;
        }

        public void run() {

            try { 
            	msg = new Message();
                msg.what = 0;
                msg.obj = ("Connecting to Server");
                progressHandler.sendMessage(msg);

                URL url = new URL(_form.getSubmitTo());
                URLConnection conn = url.openConnection();
                conn.setDoOutput(true);
                BufferedOutputStream wr = new BufferedOutputStream(conn.getOutputStream());
                String data = _form.getFormEncodedData();
//                System.out.println("AAAAAAAAAAAA ");
//                System.out.println("data.getBytes(): "+data.getBytes());
               
                wr.write(data.getBytes());
                wr.flush();
                wr.close();
 
                msg = new Message();
                msg.what = 0;
                msg.obj = ("Data Sent");
                progressHandler.sendMessage(msg);

                // Get the response
                BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line = "";
                Boolean bSuccess = false;
                while ((line = rd.readLine()) != null) {
                    if (line.indexOf("SUCCESS") != -1) {
                        bSuccess = true;
                    }
                    // Process line...
                    Log.v(tag, line);
                }
                wr.close();
                rd.close();

                if (bSuccess) {
                    msg = new Message();
                    msg.what = 0;
                    msg.obj = ("Form Submitted Successfully");
                    progressHandler.sendMessage(msg);

                    msg = new Message();
                    msg.what = 1;
                    progressHandler.sendMessage(msg);
                    return;

                }
            } catch (Exception e) {
                Log.d(tag, "Failed to send form data: " + e.getMessage());
                msg = new Message();
                msg.what = 0;
                msg.obj = ("Error Sending Form Data");
                progressHandler.sendMessage(msg);
            }
            msg = new Message();
            msg.what = 2;
            progressHandler.sendMessage(msg);
        }

	}

}


