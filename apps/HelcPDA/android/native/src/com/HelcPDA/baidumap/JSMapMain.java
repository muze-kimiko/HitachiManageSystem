package com.HelcPDA.baidumap;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.HelcPDA.service.JSBDLocationService;
import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.location.LocationClientOption.LocationMode;
import com.fiberlink.maas360.android.appSdkSampleApp.MainApplication;

import android.content.Intent;
import android.util.Log;

public class JSMapMain extends CordovaPlugin {

	private CallbackContext callbackContext1;
	private MainApplication myapp;
	private LocationClient mLocationClient;
	private MyLocationListener mMyLocationListener;

	@Override
	public boolean execute(String ComName, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		Log.e("进入地图", "进入地图" + ComName);
		myapp = ((MainApplication) cordova.getActivity().getApplication());
		myapp.LocationFlag = ComName;
		myapp.jsData = args;
		this.callbackContext1 = callbackContext;
		if (ComName.equals("开启被动定位")) {
			Intent i = new Intent(cordova.getActivity(),
					JSBDLocationService.class);
			i.putExtra("jsData", args.toString());
			cordova.getActivity().startService(i);
			callbackContext.success();
			return true;
		}
		if (ComName.equals("关闭被动定位")) {
			// Intent i = new
			// Intent(cordova.getActivity(),JSBDLocationService.class);
			// cordova.getActivity().stopService(i);
			// callbackContext.success();
			return true;
		}
		if (ComName.equals("进入离线")) {
			Intent z = new Intent(cordova.getActivity(), OfflineActivity.class);
			z.putExtra("jsData", args.toString());
			cordova.getActivity().startActivity(z);
			callbackContext.success();
			return true;
		}
		if (ComName.equals("打卡开始定位")) {
			mLocationClient = new LocationClient(cordova.getActivity());
			mMyLocationListener = new MyLocationListener();
			mLocationClient.registerLocationListener(mMyLocationListener);
			initLocation(1100);
			return true;
		}
		Intent intent = new Intent().setClass(cordova.getActivity(),
				JSBaiduMapActivity.class);
		this.cordova.startActivityForResult(this, intent, 1);
		PluginResult mPlugin = new PluginResult(PluginResult.Status.NO_RESULT);
		mPlugin.setKeepCallback(true);
		callbackContext.sendPluginResult(mPlugin);
		if (ComName.equals("进入地图")) {

		} else if (ComName.equals("全部周围的人")) {
			Log.e("全部周围的人", "全部周围的人" + myapp.jsData.toString());
			int length = args.length();
			for (int i = 0; i < length; i++) {
				Log.e("数据：", "数据：" + args.optJSONObject(i).toString());
			}
		} else if (ComName.equals("我的轨迹")) {
			// myapp.jsData=new
			// JSONArray(myapp.jsData.optJSONObject(0).optString("MineRoult"));
		} else {
		}

		return true;
	}

	// onActivityResult为第二个Activity执行完后的回调接收方法
	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		String jsData = "";
		if (intent != null) {
			jsData = intent.getStringExtra("jsData");
		}
		JSONObject obj;
		JSONArray backArray = new JSONArray();
		switch (resultCode) { // resultCode为回传的标记，我在第二个Activity中回传的是RESULT_OK
		case 0:
			try {
				obj = new JSONObject(jsData);
				obj.put("LocationFlag", "正常返回");
				obj.put("imsi", myapp.imsi);
				obj.put("PDA3", "PDA3");
				backArray.put(obj);
				callbackContext1.success(backArray);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			break;
		case 1:
			try {
				obj = new JSONObject(jsData);
				obj.put("LocationFlag", "周围的人");
				obj.put("imsi", myapp.imsi);
				obj.put("PDA3", "PDA3");
				backArray.put(obj);
				callbackContext1.success(backArray);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			break;
		case 2:
			try {
				obj = new JSONObject(jsData);
				obj.put("LocationFlag", "我的信息");
				obj.put("imsi", myapp.imsi);
				obj.put("PDA3", "PDA3");
				backArray.put(obj);
				callbackContext1.success(backArray);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			break;
		case 3:
			try {
				obj = new JSONObject(jsData);
				obj.put("LocationFlag", "返回主页");
				obj.put("imsi", myapp.imsi);
				obj.put("PDA3", "PDA3");
				backArray.put(obj);
				callbackContext1.success(backArray);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			break;
		case 4:
			try {
				obj = new JSONObject(jsData);
				obj.put("LocationFlag", "工号打卡");
				obj.put("imsi", myapp.imsi);
				obj.put("PDA3", "PDA3");
				backArray.put(obj);
				callbackContext1.success(backArray);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			break;
		case 5:
			try {
				obj = new JSONObject(jsData);
				obj.put("LocationFlag", "电梯打卡");
				obj.put("imsi", myapp.imsi);
				obj.put("PDA3", "PDA3");
				backArray.put(obj);
				callbackContext1.success(backArray);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			break;
		default:
			// cordova.getActivity().finish();
			break;
		}
	}

	// 初始化定位监听
	private void initLocation(int span) {
		LocationClientOption option = new LocationClientOption();
		option.setOpenGps(true);
		option.setLocationMode(LocationMode.Hight_Accuracy);
		option.setCoorType("bd09ll");
		option.setScanSpan(span);
		option.setIsNeedAddress(true);
		mLocationClient.setLocOption(option);
		mLocationClient.start();
	}

	public class MyLocationListener implements BDLocationListener {
		@Override
		public void onReceiveLocation(BDLocation location) {
			// Receive Location
			if (location == null) {
			} else {
				StringBuffer sb = new StringBuffer(256);
				sb.append("time : ");
				sb.append(location.getTime());
				sb.append("\nerror code : ");
				sb.append(location.getLocType());
				sb.append("\nlatitude : ");
				sb.append(location.getLatitude());// 纬度
				sb.append("\nlontitude : ");
				sb.append(location.getLongitude());// 经度
				sb.append("\nradius : ");
				sb.append(location.getRadius());
				if (location.getLocType() == BDLocation.TypeGpsLocation) {
					sb.append("\nspeed : ");
					sb.append(location.getSpeed());
					sb.append("\nsatellite : ");
					sb.append(location.getSatelliteNumber());
					sb.append("\ndirection : ");
					sb.append("\naddr : ");
					sb.append(location.getAddrStr());
					sb.append(location.getDirection());
				} else if (location.getLocType() == BDLocation.TypeNetWorkLocation) {
					sb.append("\naddr : ");
					sb.append(location.getAddrStr());
					sb.append("\noperationers : ");
					sb.append(location.getOperators());
				}
				Log.e("BaiduLocationApiDem", sb.toString());

				JSONObject obj = new JSONObject();
				try {
					obj.put("Time", location.getTime());
					obj.put("Longitude", location.getLongitude() + "");
					obj.put("Latitude", location.getLatitude() + "");
					obj.put("Address", location.getAddrStr());
					obj.put("imsi", myapp.imsi);
					obj.put("LocationFlag", "打卡开始定位返回");
					mLocationClient.stop();
					callbackContext1.success(obj);
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
	}

}
