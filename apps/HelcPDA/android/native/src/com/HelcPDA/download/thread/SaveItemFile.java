package com.HelcPDA.download.thread;

import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * 随机写入一段文件
 * * <b>function:</b> 写入文件、保存文件 
 * * @file SaveItemFile.java 
 * * @package com.hoo.download 
 * * @project
 * * @email
 * * @version 1.0
 */
public class SaveItemFile {
	// 存储文件
	private RandomAccessFile itemFile;

	public SaveItemFile() throws IOException {
		this("", 0);
	}

	/**
	 * * @param name 文件路径、名称 
	 * * @param pos 写入点位置 position 
	 * * @throws IOException
	 */
	public SaveItemFile(String name, long pos) throws IOException {
		itemFile = new RandomAccessFile(name, "rw");
		// 在指定的pos位置开始写入数据
		itemFile.seek(pos);
	}

	/**
	 *  <b>function:</b> 同步方法写入文件
	 * @param buff 缓冲数组 
	 * @param start 起始位置
	 * @param length 长度 * @return
	 * @throws IOException 
	 */
	public synchronized int write(byte[] buff, int start, int length) throws IOException {
		int i = -1;
		itemFile.write(buff, start, length);
		i = length;
		return i;
	} 

	public void close() throws IOException {
		if (itemFile != null) {
			itemFile.close();
		}
	}
}
