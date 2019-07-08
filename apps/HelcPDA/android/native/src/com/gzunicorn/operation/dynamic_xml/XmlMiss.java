package com.gzunicorn.operation.dynamic_xml;


import com.HelcPDA.R; 
import android.app.Activity;
import android.content.Intent;
import android.nfc.Tag;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class XmlMiss extends Activity{
	final String tag = XmlMiss.class.getName();

	@Override
	protected void onCreate(Bundle savedInstanceState) { 
		super.onCreate(savedInstanceState);
		setContentView(R.layout.xmlmiss);
		 Button btnRunForm = (Button) this.findViewById(R.id.btnRunForm);
		 btnRunForm.setOnClickListener(new OnClickListener() { 
			@Override
			public void onClick(View v) {
				EditText formNumber = (EditText) findViewById(R.id.formNumber);
        		Log.i(tag,"Attempting to process Form # [" + formNumber.getText().toString() + "]");
        		Intent newFormInfo = new Intent(XmlMiss.this,XmlRanForm.class);
        		newFormInfo.putExtra("formNumber", formNumber.getText().toString());
        		startActivity(newFormInfo);
				
			}
		});
		
		
	}

}
