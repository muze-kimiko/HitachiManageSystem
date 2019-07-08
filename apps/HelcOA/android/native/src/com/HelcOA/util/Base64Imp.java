package com.HelcOA.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import com.HelcOA.util.encoder.BASE64Decoder;
import com.HelcOA.util.encoder.BASE64Encoder;

public class Base64Imp {

	/*
	 * public static void main(String[] args) { String result =
	 * encodeBase64File("D:/HitachiMiss_Database/xml/1-7LXO_底坑.xml");
	 * //System.out.println("result: "+result.length());
	 * decoderBase64File(result,"F:/a.xml"); }
	 */

	public static String encodeBase64File(String path) {
		File file = new File(path);
		FileInputStream fis = null;
		byte[] buffer = null;
		try {
			fis = new FileInputStream(file);
			buffer = new byte[(int) file.length()];
			// System.out.println("before: "+(int)file.length());
			fis.read(buffer);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return new BASE64Encoder().encode(buffer);
	}

	public static void decoderBase64File(String baseString, String path) {
		FileOutputStream fos = null;
		try {
			byte[] buffer = new BASE64Decoder().decodeBuffer(baseString);
			fos = new FileOutputStream(path);
			fos.write(buffer);
			fos.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

}
