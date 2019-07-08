package com.gzunicorn.operation.dynamic_xml;

import com.HelcPDA.R.color;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.LinearLayout.LayoutParams;

/**
 * 这是一个Radio布局
 * @author user1
 */
public class XmlMissCheckBox extends LinearLayout {

	private TextView tv_label;
	private CheckBox cb;
	public Button btn_image;

	public XmlMissCheckBox(Context context, AttributeSet attrs) {
		super(context, attrs);
	}
	
	public XmlMissCheckBox(Context context, String label) {
		super(context);
		//在构造函数里构造起控件和布局
		//标签
		tv_label = new TextView(context);
		tv_label.setText(label);
		tv_label.setBackgroundResource(color.color_bg_key);
		tv_label.setTextColor(Color.BLACK);
		
		//控件
		cb = new CheckBox(context);
		cb.setText("不合格");
		cb.setTextColor(Color.BLACK);
		
		btn_image = new Button(context);
		btn_image.setText("指示图");
		btn_image.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		btn_image.setVisibility(View.GONE);
		
		this.setOrientation(LinearLayout.VERTICAL);
		this.addView(tv_label);
		this.addView(cb);
		this.addView(btn_image);
	}
	
	public String getValue() {
		String value = "";
		if(cb.isChecked()) {
			value = "1";
		} else{
			value = "0";
		}
		return value;
	}
	 

}
