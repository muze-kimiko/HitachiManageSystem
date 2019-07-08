package com.HelcPDA.download;

import java.util.ArrayList;
import java.util.List;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.HelcPDA.download.model.DownloadModel;
/**
 * 数据库操作类
 * @author malw
 *
 */
public class DownloadDB {
	/** TAG */
	public static final String TAG = "DownloadDB : ";

	private DatabaseHelper mDbHelper;
	private SQLiteDatabase mDatabase;

	private static DownloadDB mDBInstance = null;
	
	private static Context mContenxt;
	
//	private MarketNotifycation mn = null;
	
	/** database name*/
	private static final String DATABASE_NAME = "download.db";

	/** database version */
	private static final int DATABASE_VERSION = 102;

	/** table name */
	public static final String TABLE_NAME = "items";

	
	
	/** resource ID */
	public static final String KEY_RES_ID = "_resid";
	public static final String KEY_RES_NAME = "_name";

	/** URL */
	public static final String KEY_RES_URL = "_url";
	public static final String KEY_RES_PATH = "_urlpath";
	public static final String KEY_RES_SIZE = "_size";
	public static final String KEY_RES_DSIZE = "_downsize";

	public static final String KEY_RES_STARTIME = "_startime";
	public static final String KEY_RES_STATUSTYPE = "_statusType";
	public static final String KEY_RES_DSTATUS = "_status";

	
	/** download max number*/
	public static final int DOWNLOAD_NUM_THREE = 3;

	private static final String CREATE_DOWNLOAD_TABLE = "create table if not exists " + TABLE_NAME 
			+ " ("+KEY_RES_ID +" TEXT primary key ASC , "
			+ KEY_RES_NAME +" TEXT , " 
			
			+ KEY_RES_URL + " TEXT , " 
			+ KEY_RES_PATH + " TEXT , " 
			+ KEY_RES_SIZE +" INTEGER , " 
			+ KEY_RES_DSIZE +" INTEGER , " 
			
			+ KEY_RES_STARTIME + " TEXT, " 
			+ KEY_RES_STATUSTYPE + " INTEGER, " 
			+ KEY_RES_DSTATUS + " INTEGER);";
	
	public static int count = 0;
	
	private class DatabaseHelper extends SQLiteOpenHelper {

		DatabaseHelper(Context context) {
			super(context, DATABASE_NAME, null, DATABASE_VERSION);
		}

		
		@Override
		public void onCreate(SQLiteDatabase db) {
			db.execSQL(CREATE_DOWNLOAD_TABLE);
		}

		@Override
		public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
			db.execSQL("DROP TABLE IF EXISTS " + CREATE_DOWNLOAD_TABLE);
			onCreate(db);
		}
	}

	public synchronized static DownloadDB getInstance(Context context) {
		if (mDBInstance == null) {
			mDBInstance = new DownloadDB(context);
			mDBInstance.open();
		}
		
		return mDBInstance;
	}

	private DownloadDB(Context context) {
		DownloadDB.mContenxt = context;
//		mn = MarketNotifycation.getInstence(mContenxt);
	}
	
	private DownloadDB open() throws SQLException {
		mDbHelper = new DatabaseHelper(mContenxt);
		mDatabase = mDbHelper.getWritableDatabase();
		return this;
	}

	/** close database*/
	public void close() {
		if(mDbHelper != null) {
			mDbHelper.close();
		}
	}

	/** open database */
	private void checkAndOpenDB() {
		if (!mDatabase.isOpen())
			mDatabase = mDbHelper.getWritableDatabase();
	}

	//check the model given in parameter exists or not
	public boolean isAlreadyIn(DownloadModel downModel) {
		checkAndOpenDB();
		Cursor cursor = mDatabase.query(TABLE_NAME, null, KEY_RES_ID + "=" + downModel.resId, null, null, null, KEY_RES_STARTIME + " ASC", null);

		if (cursor != null) {
			int count = (cursor != null) ? cursor.getCount() : 0;
			if (count > 0) {
				cursor.close();
				return true;
			}

			cursor.close();
		}
		return false;
	}
	
	/** 添加一条下载信息*/
	public boolean addOneTask(DownloadModel downModel, int from) {
		try {
			checkAndOpenDB();
			mDatabase.insert(TABLE_NAME, null, modelToCV(downModel));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	/**
	 * 修改所有下载进度
	 * @param downModel
	 */
	public void updateDownloadSize(final String resid,final DownloadModel dm) {
		checkAndOpenDB();
		//MLog.d("downloadModel status: " + downModel.status);
		String where = KEY_RES_ID + "=" + resid;
		ContentValues content = new ContentValues();
		content.put(KEY_RES_DSIZE, dm.downloadsize);
		mDatabase.update(TABLE_NAME, content, where, null);
	}
	
	/**
	 * 修改所有下载进度和状态
	 * @param downModel
	 */
	public void updateDownloadAllSizeAndStatus(final String resid,final DownloadModel dm) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + resid;
		ContentValues content = new ContentValues();
		content.put(KEY_RES_SIZE, dm.size);
		content.put(KEY_RES_DSIZE, dm.downloadsize);
		content.put(KEY_RES_DSTATUS, dm.status);
		mDatabase.update(TABLE_NAME, content, where, null);
	}
	
	/**
	 * 修改下载进度
	 * @param downModel
	 */
	public void updateDownloadAnSize(final String resid,final long downsize) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + resid;
		ContentValues content = new ContentValues();
		content.put(KEY_RES_DSIZE, downsize);
		mDatabase.update(TABLE_NAME, content, where, null);
	}

	/**
	 * 修改下载状态
	 * @param downModel
	 */
	public void updateDownloadStatus(final String resid,final int status) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + resid;
		ContentValues content = new ContentValues();
		content.put(KEY_RES_DSTATUS, status);
		mDatabase.update(TABLE_NAME, content, where, null);
	}

	/**
	 * 修改下载状态类型
	 * @param downModel
	 */
	public void updateDownloadStatusType(final String resid,final int statusType) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + resid;
		ContentValues content = new ContentValues();
		content.put(KEY_RES_STATUSTYPE, statusType);
		mDatabase.update(TABLE_NAME, content, where, null);
	}
	
	/**
	 * 修改下载状态 和 状态类型
	 * @param downModel
	 */
	public void updateDownloadStatusAndStatusType(final String resid,final int status,final int statusType) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + resid;
		ContentValues content = new ContentValues();
		content.put(KEY_RES_DSTATUS, status);
		content.put(KEY_RES_STATUSTYPE, statusType);
		mDatabase.update(TABLE_NAME, content, where, null);
	}
	
	/**
	 * 修改下载进度和状态
	 * @param downModel
	 */
	public void updateDownloadSizeAndStatus(final String resid,final int downsize,final int status) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + resid;
		ContentValues content = new ContentValues();
		content.put(KEY_RES_DSIZE, downsize);
		content.put(KEY_RES_DSTATUS, status);
		mDatabase.update(TABLE_NAME, content, where, null);
	}
	

	//delete resource only for synchronizing sd card, no need to notify update and notification
	public void delete(String resId) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + resId;
		mDatabase.delete(TABLE_NAME, where, null);
	}
	
	/** 删除一条下载信息 */
	public void deleteOneTask(final DownloadModel downModel) {
		checkAndOpenDB();
		String where = KEY_RES_ID + "=" + downModel.resId;
		mDatabase.delete(TABLE_NAME, where, null);
	}
	
	
	 

	/** query downloading items */
	public DownloadModel[] queryDownloadingItems(int status) {
		DownloadModel[] downModels = null;
		checkAndOpenDB();
		Cursor cursor = mDatabase.query(TABLE_NAME, null, KEY_RES_DSTATUS + " not in (" + status + ", "
				+ status  + ")", 
				null, null, null, KEY_RES_STARTIME + " ASC", null);
		if (cursor != null) {
			cursor.moveToFirst();
			int count = (cursor != null) ? cursor.getCount() : 0;
			downModels = new DownloadModel[count];
			for (int i = 0; i < count; i++) {
				downModels[i] = GetModelFromCursor(cursor);
				cursor.moveToNext();
			}

			cursor.close();
		}
		return downModels;
	}

	/** 根据状态查询下载信息 */
	public List<DownloadModel> queryDownloadedByStatusType(int statusType) {
		List<DownloadModel> downModels = null;
		checkAndOpenDB();
		Cursor cursor = mDatabase.query(TABLE_NAME, null, KEY_RES_STATUSTYPE + "=" + statusType, null, null, null,
				KEY_RES_STARTIME + " ASC", null);
		if (cursor != null) {
			cursor.moveToFirst();
			int count = (cursor != null) ? cursor.getCount() : 0;
			downModels = new ArrayList<DownloadModel>();
			for (int i = 0; i < count; i++) {
				downModels.add(GetModelFromCursor(cursor));
				cursor.moveToNext();
			}

			cursor.close();
		}
		return downModels;
	}

	/** 查询所有下载信息 */
	public List<DownloadModel> queryDownloadedAllItems() {
		List<DownloadModel> downModels = null;
		checkAndOpenDB();
		Cursor cursor = mDatabase.query(TABLE_NAME, null, null, null, null, null,
				KEY_RES_STATUSTYPE+","+KEY_RES_STARTIME + " ASC", null);
		if (cursor != null) {
			cursor.moveToFirst();
			int count = (cursor != null) ? cursor.getCount() : 0;
			downModels = new ArrayList<DownloadModel>();
			for (int i = 0; i < count; i++) {
				downModels.add(GetModelFromCursor(cursor));
				cursor.moveToNext();
			}
			
			cursor.close();
		}
		return downModels;
	}
	/** 查询未下载完成的信息 */
	public List<DownloadModel> queryDownloadedIngItems(String resId) {
		List<DownloadModel> downModels = null;
		checkAndOpenDB();
		Cursor cursor = mDatabase.query(TABLE_NAME, null, KEY_RES_ID + "!=" + resId, null, null, null,
				KEY_RES_STARTIME + " ASC", null);
		if (cursor != null) {
			cursor.moveToFirst();
			int count = (cursor != null) ? cursor.getCount() : 0;
			downModels = new ArrayList<DownloadModel>();
			for (int i = 0; i < count; i++) {
				downModels.add(GetModelFromCursor(cursor));
				cursor.moveToNext();
			}
			
			cursor.close();
		}
		return downModels;
	}
	
	public boolean isModelExists(int resId) {
		checkAndOpenDB();
		Cursor cursor = mDatabase.query(TABLE_NAME, null, KEY_RES_ID + "=" + resId, null, null, null,
				null, null);
		if (cursor != null) {
			cursor.moveToFirst();
			int count = (cursor != null) ? cursor.getCount() : 0;
			if(count != 1) {
				cursor.close();
				return false;
			}
			cursor.close();
		} else {
			return false;
		}
		return true;
	}
	
	/** 根据id查询一条信息 */
	public DownloadModel queryItemById(String resId) {
		DownloadModel downloadModel = null;
		try {
			checkAndOpenDB();
			Cursor cursor = mDatabase.query(TABLE_NAME, null, KEY_RES_ID + "=" + resId, null, null, null,
					null, null);
			if (cursor != null) {
				cursor.moveToFirst();
				int count = (cursor != null) ? cursor.getCount() : 0;
				if(count != 1) {
					cursor.close();
					return downloadModel;
				}
				downloadModel = GetModelFromCursor(cursor);

				cursor.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return downloadModel;
	}

	/**
	 * 根据cursor返回downloadModel对象信息
	 * @param cursor
	 * @return
	 */
	private DownloadModel GetModelFromCursor(Cursor cursor) {
		DownloadModel model = new DownloadModel();
		
		int indexResId = cursor.getColumnIndexOrThrow(KEY_RES_ID);
		int indexName = cursor.getColumnIndexOrThrow(KEY_RES_NAME);
		
		int indexUrl  = cursor.getColumnIndexOrThrow(KEY_RES_URL);
		int indexPath  = cursor.getColumnIndexOrThrow(KEY_RES_PATH);
		int indexSize = cursor.getColumnIndexOrThrow(KEY_RES_SIZE);
		int indexDsize = cursor.getColumnIndexOrThrow(KEY_RES_DSIZE);

		int indexStartime = cursor.getColumnIndexOrThrow(KEY_RES_STARTIME);
		int statusType = cursor.getColumnIndexOrThrow(KEY_RES_STATUSTYPE);
		int indexDStatus = cursor.getColumnIndexOrThrow(KEY_RES_DSTATUS);
		
		model.resId = cursor.getString(indexResId);
		model.name = cursor.getString(indexName);
		model.size = cursor.getInt(indexSize);
		model.downloadsize = cursor.getInt(indexDsize);

		model.url = cursor.getString(indexUrl);
		model.path = cursor.getString(indexPath);
		
		model.startime = cursor.getString(indexStartime);
		model.statusType = cursor.getInt(statusType);
		model.status = cursor.getInt(indexDStatus);
		
		return model;
	}

	private ContentValues modelToCV(DownloadModel downModel) {
		if (downModel == null) {
			return null;
		}
		ContentValues content = new ContentValues();
		
		content.put(KEY_RES_ID,downModel.resId);
		content.put(KEY_RES_NAME,downModel.name);
		
		content.put(KEY_RES_URL,downModel.url);
		content.put(KEY_RES_PATH,downModel.path);
		content.put(KEY_RES_SIZE,downModel.size);
		content.put(KEY_RES_DSIZE,downModel.downloadsize);

		content.put(KEY_RES_STARTIME,downModel.startime);
		content.put(KEY_RES_STATUSTYPE,downModel.statusType);
		content.put(KEY_RES_DSTATUS,downModel.status);
		
		return content;
	}

	public class DownloadMsg {
		public int resId;
		public int downloadSize;
		public int size;
		public int status;
	}

	public void updateModelSize(DownloadModel downModel) {
		// TODO Auto-generated method stub
		checkAndOpenDB();
		//MLog.d("downloadModel status: " + downModel.status);
		String where = KEY_RES_ID + "=" + downModel.resId;
		mDatabase.update(TABLE_NAME, modelToCV(downModel), where, null);
	}
}
