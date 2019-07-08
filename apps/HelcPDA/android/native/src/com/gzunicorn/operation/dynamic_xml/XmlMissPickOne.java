package com.gzunicorn.operation.dynamic_xml;
 

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.LinearLayout.LayoutParams;

public class XmlMissPickOne extends LinearLayout{
	String tag = XmlMissPickOne.class.getName();
	TextView label;
	ArrayAdapter<String> aa;
	Spinner spinner;
	public Button btn_image;
	
	public XmlMissPickOne(Context context,String labelText,String options) {
		super(context);
		label = new TextView(context);
		label.setText(labelText);
		spinner = new Spinner(context);
		String []opts = options.split("\\|");
		aa = new ArrayAdapter<String>( context, android.R.layout.simple_spinner_item,opts);
		spinner.setAdapter(aa);
		
		btn_image = new Button(context);
		btn_image.setText("指示图");
		btn_image.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		btn_image.setVisibility(View.GONE);
		
		this.setOrientation(LinearLayout.VERTICAL);
		this.addView(label);
		this.addView(spinner);
		this.addView(btn_image);
	}

	public XmlMissPickOne(Context context, AttributeSet attrs) {
		super(context, attrs); 
	}
	
	
	public String getValue()
	{
		return (String) spinner.getSelectedItem().toString();
	}

}
