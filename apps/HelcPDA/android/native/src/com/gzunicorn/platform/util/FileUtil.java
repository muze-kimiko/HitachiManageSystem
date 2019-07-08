package com.gzunicorn.platform.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import android.content.Context;
import android.util.Log;

public class FileUtil {
	private static String TAG = FileUtil.class.getSimpleName();

	/**
	 * 创建目录
	 * @param Path
	 */
	public static void createFolder(String Path) {
		try {
			(new File(Path)).mkdirs(); // 如果文件夹不存在 则建立新文件夹
		} catch (Exception e) {
			Log.e(TAG, "createFolder Exception:" + e);
			e.printStackTrace();
		}
	}
	/**
	 * 压缩文件
	 * @param file
	 * @param zipfile
	 */
	public static void zipFile(String file, String zipfile) {
		try {
			FileInputStream in = new FileInputStream(file);
			FileOutputStream out = new FileOutputStream(zipfile);
			ZipOutputStream zipOut = new ZipOutputStream(out);
			ZipEntry entry = new ZipEntry(file);
			zipOut.putNextEntry(entry);
			int nNumber;
			byte[] buffer = new byte[512];
			while ((nNumber = in.read(buffer)) != -1)
				zipOut.write(buffer, 0, nNumber);
			zipOut.close();

			out.close();
			in.close();

		} catch (Exception e) {
			Log.e(TAG, "zipFile Exception:"+e);
		}
	}

	/**
	 * 删除文件
	 * @param sPath
	 * @return
	 */
	public static void deleteFile(String sPath) {
		File file = new File(sPath);
		if (file.isFile() && file.exists()) {
			file.delete();
		}
	}

	/**
	 * 删除目录
	 * @param sPath	要删除目录的路径
	 * @param deldir	是否删除目录本身
	 * @return
	 */
	public static void deleteDirectory(String sPath,boolean deldir) {
		File file = new File(sPath);
//		Log.d(TAG, "deleteDirectory file:"+sPath);
		if (file.isDirectory()) {
			// 删除文件夹中的所有文件包括子目录  
	        File[] files = file.listFiles();  
	        for (int i = 0; i < files.length; i++) {  
	            // 删除子文件  
	            if (files[i].isFile()) {
//	            	Log.d(TAG, "deleteDirectory delfile:"+files[i].getAbsolutePath());
	            	files[i].delete();
	            }  
	            // 删除子目录  
	            else if (files[i].isDirectory()) {  
	                deleteDirectory(files[i].getAbsolutePath(),true);  
	            }  
	        }
	        if (deldir==true){
//	        	Log.d(TAG, "deleteDirectory deldir:"+file.getAbsolutePath());
	        	file.delete();
	        }
		}
	}
	
	// 删除文件夹下所有内容，包括此文件夹
	public void delAll(File f) throws Exception {
		if (!f.exists()) {// 文件夹不存在不存在
			throw new Exception("指定目录不存在:" + f.getName());
		}
		boolean rslt = true;// 保存中间结果

		if (!(rslt = f.delete())) {// 先尝试直接删除
			// 若文件夹非空。枚举、递归删除里面内容

			File subs[] = f.listFiles();
			for (int i = 0; i <= subs.length - 1; i++) {
				if (subs[i].isDirectory())
					delAll(subs[i]);// 递归删除子文件夹内容

				rslt = subs[i].delete();// 删除子文件夹本身

			}
			rslt = f.delete();// 删除此文件夹本身

		}
		if (!rslt)
			throw new Exception("无法删除:" + f.getName());
		return;
	}

	/**
	 * 复制文件
	 * @param srcFile
	 * @param dstFile
	 * @throws Exception 
	 */
	public static void copyFile(String srcFile, String dstFile) throws Exception {
		int length = 1048891;
		FileChannel inC = null;
		FileChannel outC = null;
		FileInputStream in = null;
		FileOutputStream out = null;
		try {
	
			in = new FileInputStream(srcFile);
			out = new FileOutputStream(dstFile);
			inC = in.getChannel();
			outC = out.getChannel();
			ByteBuffer b = null;
			while (inC.position() < inC.size()) {
				if ((inC.size() - inC.position()) < length) {
					length = (int) (inC.size() - inC.position());
				} else{
					length = 1048891;
				}
				b = ByteBuffer.allocateDirect(length);
				inC.read(b);
				b.flip();
				outC.write(b);
				outC.force(false);
			}
		} catch (Exception e) {
			e.printStackTrace();
			Log.e(TAG, "copyFile Exception:"+e);
			throw e;
		} finally {
			try {
				if (in != null) {
					in.close();
				}
				if (out != null) {
					out.close();
				}
				if (inC != null && inC.isOpen()) {
					inC.close();
				}
				if (outC != null && outC.isOpen()) {
					outC.close();
				}
			} catch (Exception e) {
				Log.e(TAG, "copyFile Exception:"+e);
			}
		}
	}

	/*
	 * 复制整个文件夹内容
	 * 
	 * @param oldPath String 原文件路径 如：c:/old
	 * 
	 * @param newPath String 复制后路径 如：f:/new
	 * 
	 * @return boolean
	 */
	public static void copyFolder(String oldPath, String newPath) {
		try {
			(new File(newPath)).mkdirs(); // 如果文件夹不存在 则建立新文件夹
			File a = new File(oldPath);
			String[] file = a.list();
			File temp = null;
			for (int i = 0; i < file.length; i++) {
				if (oldPath.endsWith(File.separator)) {
					temp = new File(oldPath + file[i]);
				} else {
					temp = new File(oldPath + File.separator + file[i]);
				}
				if (temp.isFile()) {
					FileInputStream input = new FileInputStream(temp);
					FileOutputStream output = new FileOutputStream(newPath
							+ "/" + (temp.getName()).toString());
					byte[] b = new byte[1024 * 5];
					int len;
					while ((len = input.read(b)) != -1) {
						output.write(b, 0, len);
					}
					output.flush();
					output.close();
					input.close();
				}
				if (temp.isDirectory()) {// 如果是子文件夹
					copyFolder(oldPath + "/" + file[i], newPath + "/" + file[i]);
				}
			}
		} catch (Exception e) {
			Log.e(TAG, "copyFolder Exception:" + e);
			e.printStackTrace();
		}
	}

	public static void copyAssets(Context ctx,String assetDir, String dir) {
		String[] files;
		try {
			files = ctx.getResources().getAssets().list(assetDir);
		} catch (Exception e) {
			return;
		}
		File mWorkingPath = new File(dir);
		// if this directory does not exists, make one.
		if (!mWorkingPath.exists()) {
			if (!mWorkingPath.mkdirs()) {
				Log.e(TAG, "copyAssets");
			}
		}
		for (int i = 0; i < files.length; i++) {
			try {
				String fileName = files[i];
				// we make sure file name not contains '.' to be a folder.
				if (!fileName.contains(".")) {
					if (0 == assetDir.length()) {
						copyAssets(ctx,fileName, dir + fileName + "/");
					} else {
						copyAssets(ctx,assetDir + "/" + fileName, dir + fileName + "/");
					}
					continue;
				}
				File outFile = new File(mWorkingPath, fileName);
				if (outFile.exists()){
					outFile.delete();
				}
				InputStream in = null;
				if (0 != assetDir.length()){
					in = ctx.getAssets().open(assetDir + "/" + fileName);
				}
				else{
					in = ctx.getAssets().open(fileName);
				}
				OutputStream out = new FileOutputStream(outFile);
				// Transfer bytes from in to out
				byte[] buf = new byte[1024];
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}
				in.close();
				out.close();
			} catch (Exception e) {
				Log.e(TAG, "copyAssets Exception:" + e);
				e.printStackTrace();
			}
		}
	}
	/**
	 * 获取文件大小
	 * @param srcFile
	 * @throws Exception 
	 */
	public static long getFileSize(String srcFile) throws Exception {
		long fileSize=0;
		FileInputStream in = null;
		try {
			in = new FileInputStream(srcFile);
			fileSize =  in.available();
		} catch (Exception e) {
			e.printStackTrace();
			Log.e(TAG, "getFileSize Exception:"+e);
			throw e;
		} finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e) {
				Log.e(TAG, "getFileSize Exception:"+e);
			}
		}
		return fileSize;
	}
}