package com.gzunicorn.operation.dynamic_xml;

import com.HelcPDA.R;
import com.HelcPDA.R.color;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.LinearLayout.LayoutParams;

/**
 * 这是一个Radio布局
 * @author user1
 */
public class XmlMissRadio extends LinearLayout {

	private TextView tv_label;
	private RadioGroup rg;
	public Button btn_image;

	public XmlMissRadio(Context context, AttributeSet attrs) {
		super(context, attrs);
	}
	
	public XmlMissRadio(Context context, String label) {
		super(context);
		LayoutInflater inflater = LayoutInflater.from(context);
		View v = inflater.inflate(R.layout.dynamic_radiogroup, null);
		
		//在构造函数里构造起控件和布局
		//标签
		tv_label = new TextView(context);
		tv_label.setBackgroundResource(color.color_bg_key);
		tv_label.setText(label);
		tv_label.setTextColor(Color.BLACK);
		
		
		//控件
		/*rg = new RadioGroup(context);
		rb1 = new RadioButton(context);
		rb1.setTextColor(Color.BLACK);rb1.setTextSize(15);
		rb2 = new RadioButton(context);
		rb2.setTextColor(Color.BLACK);
		rb3 = new RadioButton(context);
		rb3.setTextColor(Color.BLACK);
		rb1.setText("好");
		rb2.setText("否");
		rb3.setText("无此项目");
		rg.addView(rb1);
		rg.addView(rb2);
		rg.addView(rb3);*/
		rg = (RadioGroup) v.findViewById(R.id.rg);
		
		btn_image = new Button(context);
		btn_image.setText("指示图");
		btn_image.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		btn_image.setVisibility(View.GONE);
		
		this.setOrientation(LinearLayout.VERTICAL);
		this.setBackgroundResource(color.color_bg);
		this.addView(tv_label);
		this.addView(rg);
		this.addView(btn_image);
	}
	
	public XmlMissRadio(Context context, String label, String option) {
		super(context);
		// 在构造函数里构造起控件和布局
		// 标签
		tv_label = new TextView(context);
		tv_label.setBackgroundResource(color.color_bg_key);
		tv_label.setText(label);
		tv_label.setTextColor(Color.BLACK);
		
		String[] opt = option.split("\\|");
		//控件
		rg = new RadioGroup(context);
		RadioButton rb = null;
		int leng = opt.length;
		for (int i = 0; i < leng; i ++) {
			rb = new RadioButton(context);
			rb.setText(opt[i]);
			rb.setTextColor(Color.BLACK);
			rg.addView(rb);
		}
		
		btn_image = new Button(context);
		btn_image.setText("指示图");
		btn_image.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		btn_image.setVisibility(View.GONE);
		
		this.setOrientation(LinearLayout.VERTICAL);
		this.setBackgroundResource(color.color_bg);
		this.addView(tv_label);
		this.addView(rg);
		this.addView(btn_image);
	}
	
	public String getValue() {
		String value = "";
		int leng = rg.getChildCount();
		RadioButton rb;
		for (int i = 0; i < leng; i ++) {
			rb = (RadioButton) rg.getChildAt(i);
			if (rb.isChecked()) {
				value = rb.getText().toString();
				break ;
			}
		}
		
		if (value.equals("")) {
//			value = ((RadioButton)rg.getChildAt(0)).getText().toString();
		}
		return value;
	}
	 
	/*public void setValue(String value) {
		if(value.trim().equals(rb1.getText().toString())) {
			rb1.setSelected(true);
		}
		if(value.trim().equals(rb2.getText().toString())) {
			rb2.setSelected(true);
		}
		if(value.trim().equals(rb3.getText().toString())) {
			rb3.setSelected(true);
		}
	}*/
	
}
