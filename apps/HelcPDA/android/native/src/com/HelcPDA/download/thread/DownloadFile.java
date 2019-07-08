package com.HelcPDA.download.thread;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import android.content.Context;
import android.util.Log;

import com.HelcPDA.download.DownloadDB;
import com.HelcPDA.download.model.DownloadModel;
import com.HelcPDA.download.util.Constant;

/**
 * 数据下载类
 * @author malw
 *
 */
public class DownloadFile extends Thread {        
	//上下文对象
	private Context mContext;
	//文件文件url
	private String url;    
	//下载文件起始位置      
	private long startPos;    
	//下载文件结束位置    
	private long endPos;    
	//线程id    
	private String threadId;   
	
	//是否下载完成
	private boolean isDownloadOver = true;     
	private SaveItemFile itemFile;        
	private static final int BUFF_LENGTH = 1024;  
	private DownloadModel models;
	
	private DownloadDB downloadDB;
	
	public DownloadFile(){
		
	}
	
	/**
	 * 根据url 起始位置 下载数据
	 * @param context 上下文对象
	 * @param url 下载文件url     
	 * @param name 文件名称     
	 * @param startPos 下载文件起点    
	 * @param endPos 下载文件结束点     
	 * @param threadId 线程id     
	 * @throws IOException     */     
	public DownloadFile(Context context,String url, String name, long startPos, long endPos, String threadId) throws IOException {        
		super();        
		isDownloadOver = true;
		this.mContext = context;
		this.url = url;        
		this.startPos = startPos;        
		this.endPos = endPos;        
		this.threadId = threadId; 
		//判断是否有此目录 没有则创建   
		File file = new File(name);
		File pfile = file.getParentFile();
		if(!pfile.exists()){
			pfile.mkdir();
		}
		this.itemFile = new SaveItemFile(name, startPos);    
		downloadDB = DownloadDB.getInstance(mContext);
		models = downloadDB.queryItemById(threadId);
		
		//开始读取下载信息
		while (endPos > startPos && isDownloadOver) {            
			try {                
				URL rurl = new URL(this.url);                
				HttpURLConnection conn = (HttpURLConnection) rurl.openConnection();                               
				// 设置连接超时时间为10000ms                
				conn.setConnectTimeout(10000);                
				// 设置读取数据超时时间为10000ms                
				conn.setReadTimeout(10000);                                
				setHeader(conn);                                
				String property = "bytes=" + startPos + "-";                
				conn.setRequestProperty("RANGE", property);                                
				//输出log信息               
				System.out.println("开始 " + threadId + "：" + property + endPos);                
				//printHeader(conn);                                
				//获取文件输入流，读取文件内容                
				InputStream is = conn.getInputStream();                                 
				byte[] buff = new byte[BUFF_LENGTH];                
				int length = -1;                
				System.out.println("#start#Thread: " + threadId + ", startPos: " + startPos + ", endPos: " + endPos);    
				long l = System.currentTimeMillis();
				while ((length = is.read(buff)) > 0 && startPos < endPos && isDownloadOver) {                    
					try {
						//写入文件内容，返回最后写入的长度                     
						startPos += itemFile.write(buff, 0, length);
						long n = System.currentTimeMillis(); 
						if((n - l) > 1000){
							//一秒钟更新下进度
							downloadDB.updateDownloadAnSize(threadId,startPos);
						}
						Log.i("[DownloadFile]",Constant.ThreadId+"=="+threadId+"=="+startPos+"=="+endPos);
					} catch (Exception e) {
						e.printStackTrace();
						this.isDownloadOver = false;  
						downloadDB.updateDownloadStatus(threadId,Constant.DOWN_STATUS_FAIL);
						Log.e("[DownloadFile]","################异常终止下载任务################");
						break;
					}
					//如果包含threadId  则暂停
					if(Constant.ThreadId.contains(threadId)){
						this.isDownloadOver = false;
						Log.i("[DownloadFile]","------------暂停下载任务-------------");
						break;
					}
				}                
				Log.e("[DownloadFile]","#over#Thread: " + threadId + ", startPos: " + startPos + ", endPos: " + endPos);                
				Log.e("[DownloadFile]","Thread " + threadId + " is execute over!");                
				} catch (MalformedURLException e) {                
					e.printStackTrace();            
				} catch (IOException e) {                
					e.printStackTrace();            
				} finally {                
					try {                    
						if (itemFile != null) {                        
							itemFile.close();                    
						}                
					} catch (IOException e) {                    
							e.printStackTrace();                
					}            
				}        
			}      
		//读取完毕修改数据库信息
		downloadDB.updateDownloadAnSize(threadId,startPos);
	}        
	
	/**     
	 * <b>function:</b> 打印头部信息  
	 * @param conn HttpURLConnection     
	 */    
	public static void printHeader(URLConnection conn) {        
		int i = 1;        
		while (true) {            
			String header = conn.getHeaderFieldKey(i);            
			i++;            
			if (header != null) {                
				System.out.println(header + ":" + conn.getHeaderField(i));            
			} else {                
					break;            
			}        
			
		}    
	}        
	
	/**     
	 * <b>function:</b> 请求头部  
	 * @param con     
	 */     
	public static void setHeader(URLConnection conn) {        
		conn.setRequestProperty("User-Agent", "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3");        
		conn.setRequestProperty("Accept-Language", "en-us,en;q=0.7,zh-cn;q=0.3");        
		conn.setRequestProperty("Accept-Encoding", "utf-8");        
		conn.setRequestProperty("Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.7");        
		conn.setRequestProperty("Keep-Alive", "300");        
		conn.setRequestProperty("connnection", "keep-alive");        
		conn.setRequestProperty("If-Modified-Since", "Fri, 02 Jan 2009 17:00:05 GMT");        
		conn.setRequestProperty("If-None-Match", "\"1261d8-4290-df64d224\"");        
		conn.setRequestProperty("Cache-conntrol", "max-age=0");        
		conn.setRequestProperty("Referer", "http://www.baidu.com");    
	}        
	public boolean isDownloadOver() {        
		return isDownloadOver;    
	}        
	public long getStartPos() {        
		return startPos;    
	}     
	public long getEndPos() {        
		return endPos;    
	}
	public DownloadModel getModels() {
		return models;
	}
	public void setModels(DownloadModel models) {
		this.models = models;
	}

	public String getThreadId() {
		return threadId;
	}

	public void setThreadId(String threadId) {
		this.threadId = threadId;
	}
}
