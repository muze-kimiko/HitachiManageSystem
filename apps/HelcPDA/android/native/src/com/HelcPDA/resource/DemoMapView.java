/*package com.HelcPDA.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.graphics.PointF;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.Settings;
import android.util.AttributeSet;
import android.util.Log;
import android.view.GestureDetector;
import android.view.GestureDetector.OnGestureListener;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.HelcPDA.MapMain;
import com.HelcPDA.MapViewActivity;
import com.HelcPDA.R;
import com.mapbar.map.Annotation;
import com.mapbar.map.ArrowOverlay;
import com.mapbar.map.CalloutStyle;
import com.mapbar.map.CustomAnnotation;
import com.mapbar.map.MapRenderer;
import com.mapbar.map.MapView;
import com.mapbar.map.ModelOverlay;
import com.mapbar.map.RouteOverlay;
import com.mapbar.map.Vector2D;
import com.mapbar.mapdal.PoiFavorite;

public class DemoMapView extends MapView {
	private Context mContext;
	private static final int CAMERAS_MAX = 16;
	private boolean mInited = false;
	public static Handler mHandler;
	private static final int[] mRouteOverlayColors = { 0xffaa0000, 0xff00aa00,
			0xff0000aa, 0xff4578fc };
	// 小车
//	private IconOverlay mCarIcon = null;
	private ModelOverlay mCarOverlay = null;
	// 电子眼
	private Annotation[] mCameraAnnotations = null;
	// 箭头
	private ArrowOverlay mArrowOverlay = null;
	// 需要绘制的路线
	private RouteOverlay[] mRouteCollectionOverlays = null;
	private int mRouteOverlayNumber = 0;
	public Bitmap mBitmap = null;
	// 选中的POI
	private Annotation mPoiAnnotation = null;
	private Annotation mPositionAnnotation = null;

	private MapRenderer mRenderer = null;

	private static final float ZOOM_STEP = 0.5f;
	private Vector2D mZoomLevelRange = null;
	public static Point mClickPoint = null;
	
	


	public boolean isInited() {
		return mInited;
	}

	private void init(Context context) {
		mContext = context;
		mRouteCollectionOverlays = new RouteOverlay[4];
	}

	// TODO: 拋出異常
	public DemoMapView(Context context) {
		super(context);
		init(context);
	}

	public DemoMapView(Context context, AttributeSet attrs) {
		super(context, attrs);
		init(context);
	}
	
	public void setZoomHandler (Handler handler) {
		mHandler = handler;
	}

	@Override
	public void onSurfaceCreated(GL10 gl, EGLConfig config) {
		super.onSurfaceCreated(gl, config);
		// 防止重复创建
		if (!mInited) {
			mRenderer = super.getMapRenderer();
			if(mRenderer == null)
				return;
			Vector2D pivot = new Vector2D(0.5f, 0.82f);
			// 初始化Overlay和Annotation 添加车标
			CustomAnnotation mCustomAnnotation = new CustomAnnotation(3,
					Config.centerPoint,
					// 此参数为气泡id 不能重复
					10000 + 1, pivot, BitmapFactory.decodeResource(
							getResources(), R.drawable.gas));
			CalloutStyle calloutStyle1=mCustomAnnotation.getCalloutStyle();
			calloutStyle1.titleSize=2;
			calloutStyle1.subtitleSize=1;
			mCustomAnnotation.setCalloutStyle(calloutStyle1);
			mCustomAnnotation.setClickable(true);
			mCustomAnnotation.setSelected(true);
			mCustomAnnotation.showCallout(true);
			mCustomAnnotation.setTitle("我的位置");
			mCustomAnnotation.setSubtitle(MapMain.Address);
			mRenderer.addAnnotation(mCustomAnnotation);
			mRenderer.setWorldCenter(Config.centerPoint);
			mClickPoint = new Point(mRenderer.getWorldCenter());
			MapViewActivity.requsetList.add(mCustomAnnotation);
			// 添加点击气泡
			mPoiAnnotation = new Annotation(3, mClickPoint, 1101, pivot);
			mPositionAnnotation = new Annotation(3, mClickPoint, 1101, pivot);
			CalloutStyle calloutStyle = mPoiAnnotation.getCalloutStyle();
			calloutStyle.anchor.set(0.5f, 0.0f);
			calloutStyle.titleSize=6;
			calloutStyle.subtitleSize=4;
			mPoiAnnotation.setCalloutStyle(calloutStyle);
			mPositionAnnotation.setTitle("选取点");
			mPositionAnnotation.setCalloutStyle(calloutStyle);
			mRenderer.addAnnotation(mPoiAnnotation);
			mRenderer.addAnnotation(mPositionAnnotation);
			showAnnotation(null);
			

			// 电子眼
			mCameraAnnotations = new Annotation[CAMERAS_MAX];
			Vector2D cameraPivot = new Vector2D(0.5f, 0.9f);
			for (int i = 0; i < mCameraAnnotations.length; i++) {
				mCameraAnnotations[i] = new Annotation(3, mClickPoint, 1300,
						cameraPivot);
				mCameraAnnotations[i].setHidden(true);
				mRenderer.addAnnotation(mCameraAnnotations[i]);
			}
			mInited = true;
			//创建完毕通知
			if(mHandler!=null){
				mHandler.sendEmptyMessage(1);
			}
			mRenderer.setZoomLevel(3);
		}
	}

	
	*//**
	 * 删除箭头
	 *//*
	public void delArrow(){
		if (mArrowOverlay != null) {
			mRenderer.removeOverlay(mArrowOverlay);
			mArrowOverlay = null;
		}
	}
	
	*//**
	 * 设置路线是否开启Tmc模式
	 *//*
	public void setRouteTmc(boolean isTmc){
		if(mRouteCollectionOverlays[0] != null){
			if(isTmc){
				mRouteCollectionOverlays[0].enableTmcColors(isTmc);
			}else{
				mRouteCollectionOverlays[0].enableTmcColors(isTmc);
				mRouteCollectionOverlays[0].setColor(mRouteOverlayColors[0]);
			}
		}
	}

	*//**
	 * 将路线显示在地图上
	 * 
	 * @param index
	 *//*
	public void drawRouteToMap(int index) {
		if (mRouteCollectionOverlays != null && index < mRouteOverlayNumber) {
			mRouteCollectionOverlays[index].setHidden(false);
		}
	}

	*//**
	 * 点击气泡
	 *//*
	@Override
	public void onAnnotationClicked(Annotation annot, int area) {
		super.onAnnotationClicked(annot, area);
		Point point = new Point(mClickPoint);
		annot.showCallout(true);
		Message msg = new Message();
		PoiFavorite fav = new PoiFavorite();
		switch (area) {
		case Annotation.Area.leftButton:
			// 气泡左侧搜索周边
			annot.showCallout(false);
			Uri uri;
			if("".equals(annot.getStyleClass())){
				uri = Uri.parse("tel:");//使用styleClass 装的电话信息 
			}else{
				uri = Uri.parse("tel:"+annot.getStyleClass());
			}
			Intent intent = new Intent(Intent.ACTION_DIAL, uri);     
			MapViewActivity.mapViewActivity.startActivity(intent);  
			break;
		case Annotation.Area.rightButton:
			// 气泡右边导航按钮
			Uri uriz ;
			if("".equals(annot.getStyleClass())){
				uriz= Uri.parse("smsto:"); //使用styleClass 装的电话信息 
			}else{
				uriz= Uri.parse("smsto:"+annot.getStyleClass()); 
			}
	        Intent it = new Intent(Intent.ACTION_SENDTO, uriz);  
	        MapViewActivity.mapViewActivity.startActivity(it);
			break;
		case Annotation.Area.middleButton:
			// 气泡中间
			msg.what = 101;
			fav.name = annot.getTitle();
			fav.pos = point;
			Log.e("x坐标", annot.getPosition().x+"");
			Log.e("y坐标", annot.getPosition().y+"");
			msg.obj = fav;
			if(mHandler!=null){
				mHandler.sendMessage(msg);
			}
			annot.showCallout(false);
			break;
		case Annotation.Area.none:
		case Annotation.Area.icon:
			
		
			
		default:
			break;
		}
	}

	*//**
	 * 选择icon
	 *//*
	@Override
	public void onAnnotationSelected(Annotation arg0) {
		super.onAnnotationSelected(arg0);
		arg0.showCallout(true);
		Log.e("onAnnotationSelected","onAnnotationSelected");
		MapViewActivity.mapViewActivity.findViewById(R.id.preveBar).setVisibility(View.INVISIBLE);
	}
	

	*//**
	 * 设置车的位置，用于在模拟导航时更新车的位置使用
	 * 
	 * @param point
	 *            车所在位置
	 *//*
	public void setCarPosition(Point point) {
		if (mCarOverlay != null) {
			mCarOverlay.setPosition(point);
		}
		if (mRenderer != null) {
			mRenderer.setWorldCenter(point);
		}
	}
	
	*//**
	 * 取消icon
	 *//*
	@Override
	public void onAnnotationDeselected(Annotation annot) {
		super.onAnnotationDeselected(annot);
		annot.showCallout(false);
	}

	private void showAnnotation(Annotation annot) {
		mPoiAnnotation.showCallout(false);
		mPositionAnnotation.showCallout(false);
		if (annot != null) {
			annot.showCallout(true);
		}
	}
	
	
	*//**
	 * 点击poi
	 *//*
	@Override
	public void onPoiSelected(String name, Point point) {
		super.onPoiSelected(name, point);
		// TODO: 替換mRenderer方法
		mClickPoint.set(point.x,point.y);
		mPoiAnnotation.setTitle(name);
		mPoiAnnotation.setPosition(mClickPoint);
		showAnnotation(mPoiAnnotation);
		Log.e("onPoiSelected","onPoiSelected");
		mRenderer.beginAnimations();
		mRenderer.setWorldCenter(mClickPoint);
		mRenderer.commitAnimations(500, MapRenderer.Animation.linear);
		MapViewActivity.mapViewActivity.findViewById(R.id.preveBar).setVisibility(View.INVISIBLE);
	}

	@Override
	public void onPoiDeselected(String name, Point point) {
		super.onPoiDeselected(name, point);
		mPoiAnnotation.showCallout(false);
	}

	*//**
	 * 获取车当前的位置
	 * 
	 * @return 车当前的位置坐标
	 *//*
	public Point getCarPosition() {
		return mCarOverlay.getPosition();
	}

	*//**
	 * 在地图指定位置显示一个POI的信息
	 * 
	 * @param point
	 *            POI所在位置
	 * @param name
	 *            POI名称
	 *//*
	public void showPoiAnnotation(Point point, String name) {
		mRenderer.setWorldCenter(point);
		mClickPoint.set(point.x, point.y);
		mPoiAnnotation.setTitle(name);
		mPoiAnnotation.setPosition(point);
		showAnnotation(mPoiAnnotation);
	}

	*//**
	 * 获取当前车的角度
	 * 
	 * @return 车的较粗
	 *//*
	public float getCarOriented() {
		return (float)mCarOverlay.getHeading();
	}

	*//**
	 * 将指定的路线隐藏
	 * 
	 * @param index
	 *//*
	public void removeRouteOverlay(int index) {
		if (mRouteCollectionOverlays[index] != null) {
			mRenderer.removeOverlay(mRouteCollectionOverlays[index]);
			mRouteCollectionOverlays[index] = null;
		}
	}

	*//**
	 * 地图放大操作
	 * 
	 * @param zoomIn
	 *            放大按钮
	 * @param zoomOut
	 *            缩小按钮
	 *//*
	public void mapZoomIn(ImageView zoomIn, ImageView zoomOut) {
		float zoomLevel = mRenderer.getZoomLevel();
		if (mZoomLevelRange == null) {
			mZoomLevelRange = mRenderer.getZoomLevelRange();
		}
		zoomLevel = zoomLevel - ZOOM_STEP;
		if (zoomLevel <= mZoomLevelRange.getX()) {
			zoomLevel = mZoomLevelRange.getX();
			zoomIn.setEnabled(false);
		}
		zoomOut.setEnabled(true);
		mRenderer.beginAnimations();
		mRenderer.setZoomLevel(zoomLevel);
		mRenderer.commitAnimations(300, MapRenderer.Animation.linear);
	}

	*//**
	 * 地图缩小操作
	 * 
	 * @param zoomIn
	 *            放大按钮
	 * @param zoomOut
	 *            缩小按钮
	 *//*
	public void mapZoomOut(ImageView zoomIn, ImageView zoomOut) {
		float zoomLevel = mRenderer.getZoomLevel();
		if (mZoomLevelRange == null) {
			mZoomLevelRange = mRenderer.getZoomLevelRange();
		}
		zoomLevel = zoomLevel + ZOOM_STEP;
		if (zoomLevel >= mZoomLevelRange.getY()) {
			zoomLevel = mZoomLevelRange.getY();
			zoomOut.setEnabled(false);
		}
		zoomIn.setEnabled(true);
		mRenderer.beginAnimations();
		mRenderer.setZoomLevel(zoomLevel);
		mRenderer.commitAnimations(300, MapRenderer.Animation.linear);
	}

	*//**
	 * 检查网络wifi 2G 3G网络
	 * 
	 * @return TODO
	 *//*
	public boolean isOpenNet() {
		ConnectivityManager connManager = (ConnectivityManager) mContext
				.getApplicationContext().getSystemService(
						Context.CONNECTIVITY_SERVICE);
		NetworkInfo networkInfo = connManager.getActiveNetworkInfo();
		if (networkInfo != null) {
			return networkInfo.isAvailable();
		}
		return false;
	}
	
	*//**
	 * 检查gps是否开启
	 * @return
	 *//*
	public boolean isOpenGps(){
		return Settings.Secure.isLocationProviderEnabled(mContext.getContentResolver(), LocationManager.GPS_PROVIDER);
	}
	

	@Override
	public void onCameraChanged(int changeTye) {
		super.onCameraChanged(changeTye);
		MapRenderer render = getMapRenderer();
		if(render != null){
			if(changeTye == MapRenderer.CameraSetting.zoomLevel+MapRenderer.CameraSetting.scale){
				//地图缩放
				zoomChange();
			}
		}
	}
	
	// ////////////////////////////////////////////////
	// OnTouchListener
	// ////////////////////////////////////////////////

	@Override
	public boolean onTouch(View v, MotionEvent event) {

		if (mGestureDetector.onTouchEvent(event)) {
			return true;
		}
		int actionAndIndex = event.getAction();
		int action = actionAndIndex & MotionEvent.ACTION_MASK;
		switch(action){
		case MotionEvent.ACTION_MOVE:
			//手动无级缩放时 要注意改变放大缩小是否可用
			zoomChange();
			MapViewActivity.mapViewActivity.findViewById(R.id.preveBar).setVisibility(View.INVISIBLE);
		}
		return super.onTouch(v, event);
	}
	
	*//**
	 * 缩放级别改变
	 *//*
	public void zoomChange(){
		if(mRenderer==null)
			return;
		float zoomLevel = mRenderer.getZoomLevel();
		Message msg = new Message();
		msg.what=100;
		Bundle b = msg.getData();
		// 默认都可用
		b.putBoolean("zoomIn", true);
		b.putBoolean("zoomOut", true);
		if (mZoomLevelRange == null) {
			mZoomLevelRange = mRenderer.getZoomLevelRange();
		}
		//判断放大缩小是否可用
		if (zoomLevel <= mZoomLevelRange.getX()) {
			b.putBoolean("zoomIn", false);
		}
		if (zoomLevel >= mZoomLevelRange.getY()) {
			b.putBoolean("zoomOut", false);
		}
		// 发送消息
		if(mHandler!=null){
			mHandler.sendMessage(msg);
		}
	}

	private GestureDetector mGestureDetector = new GestureDetector(
			new OnGestureListener() {

				@Override
				public boolean onSingleTapUp(MotionEvent arg0) {
					return false;
				}

				@Override
				public void onShowPress(MotionEvent arg0) {

				}

				@Override
				public boolean onScroll(MotionEvent arg0, MotionEvent arg1,
						float arg2, float arg3) {
					return false;
				}

				@Override
				public void onLongPress(MotionEvent event) {
					int pointerCount = event.getPointerCount();
					if (pointerCount == 1) {
						MapRenderer mr = mRenderer;
						Point point = mRenderer.screen2World(new PointF(event
								.getX(), event.getY()));
						mClickPoint.set(point.x, point.y);
						Log.e("onLongPress:point.x:",""+point.x);
						Log.e("point.y",""+point.y);
						mPositionAnnotation.setPosition(mClickPoint);
						showAnnotation(mPositionAnnotation);
						mr.beginAnimations();
						mr.setWorldCenter(mClickPoint);
						mr.commitAnimations(500, MapRenderer.Animation.linear);
					}
				}

				@Override
				public boolean onFling(MotionEvent arg0, MotionEvent arg1,
						float arg2, float arg3) {
					return false;
				}

				@Override
				public boolean onDown(MotionEvent arg0) {
					return false;
				}
			});
}
*/