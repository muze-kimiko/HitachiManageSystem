package com.gzunicorn.operation.dynamic_xml;

import java.net.URLEncoder;
import java.util.ListIterator;
import java.util.Vector;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
 
 

public class XmlMissForm {
	private String formId;
	private String formName;
	private String submitTo;
	public Vector<XmlMissFormfiled> fields;
	private String formMsg;
	
//	构造函数
	public XmlMissForm()
	{
		this.fields = new Vector<XmlMissFormfiled>();
		formId = "";
		formName = "";
		submitTo = "loopback"; // ie, do nothing but display the results
		formMsg = "";
	}
	
	public String getFormEncodedData()
	{
		try {
		int i = 0;
		StringBuilder sb = new StringBuilder();
		sb.append("Results:\n");
		if (this.fields == null) return sb.toString();
		ListIterator<XmlMissFormfiled> li = this.fields.listIterator();
		while (li.hasNext()) {
			if (i != 0) sb.append("&");
			XmlMissFormfiled thisField = li.next();
			sb.append(thisField.name + "=");
			String encstring = new String();
			URLEncoder.encode((String) thisField.getData(),encstring);
			sb.append(encstring);
		}

		return sb.toString();
		}
		catch (Exception e) {
			return "ErrorEncoding";
		}
	}
	
	
	public String getFormattedResults()
	{
		StringBuilder sb = new StringBuilder();
		sb.append("Results:\n");
		if (this.fields == null) return sb.toString();
		ListIterator<XmlMissFormfiled> li = this.fields.listIterator();
		while (li.hasNext()) {
			sb.append(li.next().getFormattedResult() + "\n");
		}
		
		return sb.toString();
	}
	
	/**
	 * 以JSON字符串返回
	 * @return
	 */
	public String getJSONResult() {
		StringBuffer sb_date = null;
		if(fields != null) {
			sb_date = new StringBuffer("{'id':'"+ formId +"','key':[");
			int leng = fields.size();
			XmlMissFormfiled xmff = null;
			for(int i = 0; i < leng; i ++) {
				xmff = fields.elementAt(i);
				if(i == leng - 1) {
					sb_date.append("'"+xmff.getName()+"'],'value':[");
					continue ;
				}
				sb_date.append("'"+xmff.getName()+"',");
			}
			for(int i = 0; i < leng; i ++) {
				xmff = fields.elementAt(i);
				if(i == leng - 1) {
					sb_date.append("'"+xmff.getData()+"']");
					continue ;
				}
				sb_date.append("'"+xmff.getData()+"',");
			}
			sb_date.append("}");
		}
		return sb_date.toString();
	}
	
	/**
	 * 以JSON字符串返回
	 * @return
	 */
	public JSONObject getJSONResult2() {
		JSONObject jo_date = new JSONObject();
		JSONArray ja_type = null;
		JSONArray ja_key = null;
		JSONArray ja_value = null;
		if(fields != null) {
			int leng = fields.size();
			XmlMissFormfiled xmff = null;
			ja_type = new JSONArray();
			ja_key = new JSONArray();
			ja_value = new JSONArray();
			for(int i = 0; i < leng; i ++) {
				xmff = fields.elementAt(i);
				if (xmff.getType().equals("button") || xmff.getType().equals("end")) {
					continue ;
				}
				ja_type.put(xmff.getType());
				ja_key.put(xmff.getName());
				ja_value.put(xmff.getData());
			}
			try {
				jo_date.put("id", formId);
				jo_date.put("type", ja_type);
				jo_date.put("key", ja_key);
				jo_date.put("value", ja_value);
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return jo_date;
	}
	
	public JSONObject getJsonResultForMenu() {
		JSONObject jo_date = new JSONObject();
		if (fields != null) {
			int leng = fields.size();
			XmlMissFormfiled xmff = null;
			for(int i = 0; i < leng; i ++) {
				xmff = fields.elementAt(i);
				if (xmff.getType().equals("button") || xmff.getType().equals("end")) {
					continue ;
				}
				try {
					jo_date.put("INST_TYPE_ID", xmff.getInst_type_id());
					jo_date.put("INST_TYPE", xmff.getInst_type());
					jo_date.put("NUM", xmff.getNum());
					jo_date.put("NUM_ID", xmff.getNum_id());
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}
		return jo_date;
	}

	public String getFormId() {
		return formId;
	}

	public void setFormId(String formId) {
		this.formId = formId;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String getSubmitTo() {
		return submitTo;
	}

	public void setSubmitTo(String submitTo) {
		this.submitTo = submitTo;
	}

	public Vector<XmlMissFormfiled> getFields() {
		return fields;
	}

	public void setFields(Vector<XmlMissFormfiled> fields) {
		this.fields = fields;
	}

	public String getFormMsg() {
		return formMsg;
	}

	public void setFormMsg(String formMsg) {
		this.formMsg = formMsg;
	}
	

}
