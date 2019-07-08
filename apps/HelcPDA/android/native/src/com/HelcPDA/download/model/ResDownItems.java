package com.HelcPDA.download.model;
/**
 * 对应json数据格式实体
 * @author malw
 *
 */
public class ResDownItems {

	private String name;
	private String url;
	private String len;
	private String ver;
	private String local_path;
	private String md5;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getLen() {
		return len;
	}
	public void setLen(String len) {
		this.len = len;
	}
	public String getVer() {
		return ver;
	}
	public void setVer(String ver) {
		this.ver = ver;
	}
	public String getLocal_path() {
		return local_path;
	}
	public void setLocal_path(String local_path) {
		this.local_path = local_path;
	}
	public String getMd5() {
		return md5;
	}
	public void setMd5(String md5) {
		this.md5 = md5;
	}
}
