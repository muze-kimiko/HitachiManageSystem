package com.gzunicorn.operation.dynamic_xml;

import com.HelcPDA.R.color;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.LinearLayout.LayoutParams;

/**
 * 这是一个Radio布局
 * @author user1
 */
public class XmlMissCheckBox_Menu extends LinearLayout implements OnClickListener {

	private TextView tv_label;
	public CheckBox cb,cb2;
	public Button btn_image, btn_explain;

	public XmlMissCheckBox_Menu(Context context, AttributeSet attrs) {
		super(context, attrs);
	}
	
	public XmlMissCheckBox_Menu(Context context, String label) {
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
		cb.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		cb.setOnClickListener(this);
		cb2 = new CheckBox(context);
		cb2.setText("无此项");
		cb2.setTextColor(Color.BLACK);
		cb2.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		cb2.setOnClickListener(this);
		LinearLayout ll_cb = new LinearLayout(context);
		ll_cb.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.CLIP_TO_PADDING_MASK));
		ll_cb.addView(cb);
		ll_cb.addView(cb2);
		
		btn_image = new Button(context);
		btn_image.setText("图表");
		btn_image.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
		btn_image.setVisibility(View.GONE);
		btn_explain = new Button(context);
		btn_explain.setText("标准");
		btn_explain.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
//		btn_explain.setVisibility(View.GONE);
		
		
		
		LinearLayout ll = new LinearLayout(context);
		ll.addView(ll_cb);
//		ll.addView(cb2);
		ll.addView(btn_explain);
		ll.addView(btn_image);
		
		this.setOrientation(LinearLayout.VERTICAL);
		this.addView(tv_label);
		this.addView(ll);
	}
	
	public String getValue() {
		String value = "";
		if(cb.isChecked()) {
			value = "0";
		} else if (cb2.isChecked()) {
			value = "1";
		}
		return value;
	}

	@Override
	public void onClick(View v) {
		CheckBox cb_t = (CheckBox) v;
		if (cb_t.getText().toString().trim().equals("不合格")) {
			cb2.setChecked(false);
		} else if (cb_t.getText().toString().trim().equals("无此项")) {
			cb.setChecked(false);
		}
	}

}
