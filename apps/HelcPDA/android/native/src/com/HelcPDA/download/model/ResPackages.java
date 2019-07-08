package com.HelcPDA.download.model;

import java.util.List;
/**
 * 对应json数据格式实体
 * @author malw
 *
 */
public class ResPackages {

	public String getData_desc() {
		return data_desc;
	}
	public void setData_desc(String data_desc) {
		this.data_desc = data_desc;
	}
	private String name;
	private String aliasname;
	private String autodown;
	private String autoserial;
	private String data_desc;
	private String datatype;
	private String code;
	private List<ResDownItems> downitems;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAliasname() {
		return aliasname;
	}
	public void setAliasname(String aliasname) {
		this.aliasname = aliasname;
	}
	public String getAutodown() {
		return autodown;
	}
	public void setAutodown(String autodown) {
		this.autodown = autodown;
	}
	public String getAutoserial() {
		return autoserial;
	}
	public void setAutoserial(String autoserial) {
		this.autoserial = autoserial;
	}
	public String getDatatype() {
		return datatype;
	}
	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public List<ResDownItems> getDownitems() {
		return downitems;
	}
	public void setDownitems(List<ResDownItems> downitems) {
		this.downitems = downitems;
	}
}
