package com.fiberlink.maas360.android.appSdkSampleApp;

import android.os.Bundle;
import android.widget.TextView;

import com.HelcOA.R;
import com.fiberlink.maas360.android.dlpsdk.MaaS360DLPSDK;
import com.fiberlink.maas360.android.dlpsdk.MaaS360SecureActivity;

public class ScreenshotActivity extends MaaS360SecureActivity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.screenshot_layout);

		TextView text = (TextView) findViewById(R.id.takeScreenshotText);
		text.append(" \n Value : "
				+ (MaaS360DLPSDK.getInstance().isRestrictScreenshot() ? "Restricted"
						: "Allowed"));
	}
}
